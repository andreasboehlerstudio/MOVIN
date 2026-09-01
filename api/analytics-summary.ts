import crypto from 'crypto';

type ApiRequest = {
  method?: string;
  query?: Record<string, string | string[] | undefined>;
  headers?: Record<string, string | string[] | undefined>;
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (payload: unknown) => void;
};

let googleAccessToken: { token: string; expiresAt: number } | null = null;

function getAnalyticsConfig() {
  return {
    propertyId: process.env.GA4_PROPERTY_ID,
    clientEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    privateKey: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    dashboardToken: process.env.ANALYTICS_DASHBOARD_TOKEN,
  };
}

function getSetupIssues() {
  const config = getAnalyticsConfig();
  const issues: string[] = [];
  if (!config.propertyId) issues.push('GA4_PROPERTY_ID');
  if (!config.clientEmail) issues.push('GOOGLE_SERVICE_ACCOUNT_EMAIL');
  if (!config.privateKey) issues.push('GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY');
  if (!config.dashboardToken) issues.push('ANALYTICS_DASHBOARD_TOKEN');
  return issues;
}

function getDateRange(range: string) {
  const ranges: Record<string, { startDate: string; label: string }> = {
    '7d': { startDate: '7daysAgo', label: 'Letzte 7 Tage' },
    '30d': { startDate: '30daysAgo', label: 'Letzte 30 Tage' },
    '90d': { startDate: '90daysAgo', label: 'Letzte 90 Tage' },
  };
  return ranges[range] || ranges['30d'];
}

function getQueryValue(value: string | string[] | undefined, fallback = '') {
  if (Array.isArray(value)) return value[0] || fallback;
  return value || fallback;
}

function createGoogleServiceJwt() {
  const config = getAnalyticsConfig();
  if (!config.clientEmail || !config.privateKey) {
    throw new Error('Google service account is not configured.');
  }

  const now = Math.floor(Date.now() / 1000);
  const encodedHeader = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const encodedClaimSet = Buffer.from(JSON.stringify({
    iss: config.clientEmail,
    scope: 'https://www.googleapis.com/auth/analytics.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  })).toString('base64url');
  const unsignedToken = `${encodedHeader}.${encodedClaimSet}`;
  const signature = crypto
    .createSign('RSA-SHA256')
    .update(unsignedToken)
    .sign(config.privateKey)
    .toString('base64url');

  return `${unsignedToken}.${signature}`;
}

async function getGoogleAccessToken() {
  if (googleAccessToken && googleAccessToken.expiresAt > Date.now() + 60_000) {
    return googleAccessToken.token;
  }

  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: createGoogleServiceJwt(),
    }).toString(),
  });

  const tokenData: any = await tokenResponse.json();
  if (!tokenResponse.ok || !tokenData.access_token) {
    throw new Error(tokenData.error_description || tokenData.error || 'Google token request failed.');
  }

  googleAccessToken = {
    token: tokenData.access_token,
    expiresAt: Date.now() + (Number(tokenData.expires_in || 3600) * 1000),
  };
  return googleAccessToken.token;
}

async function runAnalyticsReport(
  accessToken: string,
  payload: {
    dateRanges: Array<{ startDate: string; endDate: string }>;
    dimensions?: Array<{ name: string }>;
    metrics: Array<{ name: string }>;
    orderBys?: Array<Record<string, any>>;
    dimensionFilter?: Record<string, any>;
    limit?: number;
  }
) {
  const config = getAnalyticsConfig();
  const response = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${config.propertyId}:runReport`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }
  );

  const data: any = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || 'Google Analytics report request failed.');
  }
  return data;
}

const metricValue = (row: any, index: number) => Number(row?.metricValues?.[index]?.value || 0);
const dimensionValue = (row: any, index: number) => row?.dimensionValues?.[index]?.value || '';

const formatRows = (report: any) => (report.rows || []).map((row: any) => ({
  dimensions: row.dimensionValues?.map((value: any) => value.value) || [],
  metrics: row.metricValues?.map((value: any) => Number(value.value || 0)) || [],
}));

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method && req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const setupIssues = getSetupIssues();
  if (setupIssues.length > 0) {
    return res.status(503).json({
      configured: false,
      message: 'Google Analytics ist noch nicht fuer das interne Dashboard konfiguriert.',
      requiredEnv: setupIssues,
    });
  }

  const config = getAnalyticsConfig();
  const providedToken = getQueryValue(req.headers?.['x-analytics-dashboard-token']);
  if (providedToken !== config.dashboardToken) {
    return res.status(401).json({
      configured: true,
      message: 'Bitte geben Sie den internen Zugriffscode ein.',
    });
  }

  const selectedRange = getDateRange(getQueryValue(req.query?.range, '30d'));
  const dateRanges = [{ startDate: selectedRange.startDate, endDate: 'today' }];

  try {
    const accessToken = await getGoogleAccessToken();
    const [summaryReport, dailyReport, pagesReport, sourcesReport, devicesReport, qrCampaignsReport] = await Promise.all([
      runAnalyticsReport(accessToken, {
        dateRanges,
        metrics: [
          { name: 'activeUsers' },
          { name: 'sessions' },
          { name: 'screenPageViews' },
          { name: 'averageSessionDuration' },
          { name: 'engagementRate' },
        ],
      }),
      runAnalyticsReport(accessToken, {
        dateRanges,
        dimensions: [{ name: 'date' }],
        metrics: [
          { name: 'activeUsers' },
          { name: 'sessions' },
          { name: 'screenPageViews' },
        ],
        orderBys: [{ dimension: { dimensionName: 'date' } }],
        limit: 120,
      }),
      runAnalyticsReport(accessToken, {
        dateRanges,
        dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],
        metrics: [
          { name: 'screenPageViews' },
          { name: 'activeUsers' },
          { name: 'engagementRate' },
        ],
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 10,
      }),
      runAnalyticsReport(accessToken, {
        dateRanges,
        dimensions: [{ name: 'sessionDefaultChannelGroup' }],
        metrics: [{ name: 'sessions' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 8,
      }),
      runAnalyticsReport(accessToken, {
        dateRanges,
        dimensions: [{ name: 'deviceCategory' }],
        metrics: [{ name: 'sessions' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 5,
      }),
      runAnalyticsReport(accessToken, {
        dateRanges,
        dimensions: [
          { name: 'sessionManualCampaignName' },
          { name: 'sessionManualMedium' },
          { name: 'sessionManualAdContent' },
        ],
        metrics: [
          { name: 'sessions' },
          { name: 'activeUsers' },
          { name: 'screenPageViews' },
          { name: 'engagementRate' },
        ],
        dimensionFilter: {
          filter: {
            fieldName: 'sessionManualSource',
            stringFilter: {
              matchType: 'EXACT',
              value: 'qr',
              caseSensitive: false,
            },
          },
        },
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 20,
      }),
    ]);

    const summaryRow = summaryReport.rows?.[0];
    return res.status(200).json({
      configured: true,
      range: selectedRange.label,
      updatedAt: new Date().toISOString(),
      summary: {
        activeUsers: metricValue(summaryRow, 0),
        sessions: metricValue(summaryRow, 1),
        pageViews: metricValue(summaryRow, 2),
        averageSessionDuration: metricValue(summaryRow, 3),
        engagementRate: metricValue(summaryRow, 4),
      },
      daily: formatRows(dailyReport).map((row: any) => ({
        date: row.dimensions[0],
        activeUsers: row.metrics[0],
        sessions: row.metrics[1],
        pageViews: row.metrics[2],
      })),
      pages: (pagesReport.rows || []).map((row: any) => ({
        path: dimensionValue(row, 0),
        title: dimensionValue(row, 1),
        pageViews: metricValue(row, 0),
        activeUsers: metricValue(row, 1),
        engagementRate: metricValue(row, 2),
      })),
      sources: (sourcesReport.rows || []).map((row: any) => ({
        channel: dimensionValue(row, 0),
        sessions: metricValue(row, 0),
      })),
      devices: (devicesReport.rows || []).map((row: any) => ({
        device: dimensionValue(row, 0),
        sessions: metricValue(row, 0),
      })),
      qrRedirects: [{
        campaign: 'ehc-container',
        label: 'EHC-Container',
        analyticsCampaign: 'ehc_container',
        shortUrl: '/q/ehc-container',
        target: '/',
        accesses: 0,
        totalAccesses: 0,
        lastAccess: '',
      }, {
        campaign: 'red-sparrows-bande',
        label: 'Red Sparrows – Bande',
        analyticsCampaign: 'red_sparrows_bande',
        shortUrl: '/q/red-sparrows-bande',
        target: '/',
        accesses: 0,
        totalAccesses: 0,
        lastAccess: '',
      }],
      qrCampaigns: (qrCampaignsReport.rows || []).map((row: any) => ({
        campaign: dimensionValue(row, 0),
        medium: dimensionValue(row, 1),
        content: dimensionValue(row, 2),
        sessions: metricValue(row, 0),
        activeUsers: metricValue(row, 1),
        pageViews: metricValue(row, 2),
        engagementRate: metricValue(row, 3),
      })),
    });
  } catch (error: any) {
    return res.status(500).json({
      configured: true,
      message: 'Google Analytics Daten konnten nicht geladen werden.',
      detail: process.env.NODE_ENV === 'production' ? undefined : error.message,
    });
  }
}
