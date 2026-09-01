<?php

declare(strict_types=1);

@set_time_limit(30);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: no-referrer');

function analyticsRespond(int $status, array $payload): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function analyticsConfig(): array
{
    $path = __DIR__ . '/.analytics-config.php';
    if (!is_file($path)) {
        analyticsRespond(503, [
            'configured' => false,
            'message' => 'Google Analytics ist noch nicht für das interne Dashboard konfiguriert.',
        ]);
    }

    $config = require $path;
    if (!is_array($config)) {
        analyticsRespond(503, [
            'configured' => false,
            'message' => 'Google Analytics ist noch nicht für das interne Dashboard konfiguriert.',
        ]);
    }

    $required = ['property_id', 'client_email', 'private_key', 'dashboard_token'];
    foreach ($required as $key) {
        if (trim((string) ($config[$key] ?? '')) === '') {
            analyticsRespond(503, [
                'configured' => false,
                'message' => 'Google Analytics ist noch nicht für das interne Dashboard konfiguriert.',
            ]);
        }
    }

    $privateKey = trim((string) $config['private_key']);
    $privateKey = trim($privateKey, "\"'");
    $privateKey = str_replace('\\n', "\n", $privateKey);
    $config['private_key'] = trim($privateKey) . "\n";
    return $config;
}

function base64UrlEncode(string $value): string
{
    return rtrim(strtr(base64_encode($value), '+/', '-_'), '=');
}

function analyticsHttpRequest(string $url, string $method, array $headers, ?string $body = null): array
{
    if (function_exists('curl_init')) {
        $curl = curl_init($url);
        curl_setopt_array($curl, [
            CURLOPT_CUSTOMREQUEST => $method,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CONNECTTIMEOUT => 8,
            CURLOPT_TIMEOUT => 20,
            CURLOPT_FOLLOWLOCATION => false,
        ]);
        if ($body !== null) {
            curl_setopt($curl, CURLOPT_POSTFIELDS, $body);
        }

        $responseBody = curl_exec($curl);
        $status = (int) curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
        $error = curl_error($curl);
        curl_close($curl);

        if ($responseBody === false) {
            throw new RuntimeException('HTTP request failed: ' . $error);
        }

        return [$status, (string) $responseBody];
    }

    $context = stream_context_create([
        'http' => [
            'method' => $method,
            'header' => implode("\r\n", $headers),
            'content' => $body ?? '',
            'ignore_errors' => true,
            'timeout' => 20,
        ],
    ]);
    $responseBody = file_get_contents($url, false, $context);
    if ($responseBody === false) {
        throw new RuntimeException('HTTP request failed.');
    }

    $status = 0;
    foreach ($http_response_header ?? [] as $header) {
        if (preg_match('/^HTTP\/\S+\s+(\d{3})/', $header, $matches)) {
            $status = (int) $matches[1];
            break;
        }
    }

    return [$status, (string) $responseBody];
}

function createGoogleJwt(array $config): string
{
    $now = time();
    $header = base64UrlEncode(json_encode(['alg' => 'RS256', 'typ' => 'JWT'], JSON_THROW_ON_ERROR));
    $claims = base64UrlEncode(json_encode([
        'iss' => (string) $config['client_email'],
        'scope' => 'https://www.googleapis.com/auth/analytics.readonly',
        'aud' => 'https://oauth2.googleapis.com/token',
        'iat' => $now,
        'exp' => $now + 3600,
    ], JSON_THROW_ON_ERROR));
    $unsignedToken = $header . '.' . $claims;

    $privateKey = openssl_pkey_get_private((string) $config['private_key']);
    if ($privateKey === false) {
        throw new RuntimeException('Invalid service account private key.');
    }

    $signature = '';
    if (!openssl_sign($unsignedToken, $signature, $privateKey, OPENSSL_ALGO_SHA256)) {
        throw new RuntimeException('Could not sign Google service token.');
    }

    return $unsignedToken . '.' . base64UrlEncode($signature);
}

function getGoogleAccessToken(array $config): string
{
    $body = http_build_query([
        'grant_type' => 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        'assertion' => createGoogleJwt($config),
    ]);
    [$status, $responseBody] = analyticsHttpRequest(
        'https://oauth2.googleapis.com/token',
        'POST',
        ['Content-Type: application/x-www-form-urlencoded'],
        $body
    );

    $data = json_decode($responseBody, true);
    if ($status < 200 || $status >= 300 || !is_array($data) || empty($data['access_token'])) {
        throw new RuntimeException('Google token request failed.');
    }

    return (string) $data['access_token'];
}

function runAnalyticsReport(array $config, string $accessToken, array $payload): array
{
    [$status, $responseBody] = analyticsHttpRequest(
        'https://analyticsdata.googleapis.com/v1beta/properties/' . rawurlencode((string) $config['property_id']) . ':runReport',
        'POST',
        [
            'Authorization: Bearer ' . $accessToken,
            'Content-Type: application/json',
        ],
        json_encode($payload, JSON_THROW_ON_ERROR)
    );

    $data = json_decode($responseBody, true);
    if ($status < 200 || $status >= 300 || !is_array($data)) {
        $message = is_array($data) ? (string) ($data['error']['message'] ?? '') : '';
        throw new RuntimeException($message !== '' ? $message : 'Google Analytics report request failed.');
    }

    return $data;
}

function metricValue(?array $row, int $index): float
{
    return (float) ($row['metricValues'][$index]['value'] ?? 0);
}

function dimensionValue(?array $row, int $index): string
{
    return (string) ($row['dimensionValues'][$index]['value'] ?? '');
}

function qrRedirectStats(int $rangeDays): array
{
    $campaigns = [
        'ehc-container' => [
            'label' => 'EHC-Container',
            'analyticsCampaign' => 'ehc_container',
            'shortUrl' => '/q/ehc-container',
            'target' => '/',
        ],
        'red-sparrows-bande' => [
            'label' => 'Red Sparrows – Bande',
            'analyticsCampaign' => 'red_sparrows_bande',
            'shortUrl' => '/q/red-sparrows-bande',
            'target' => '/',
        ],
    ];
    $statsPath = __DIR__ . '/.qr-stats.json';
    $storedStats = [];

    if (is_file($statsPath) && is_readable($statsPath)) {
        $decoded = json_decode((string) file_get_contents($statsPath), true);
        if (is_array($decoded)) {
            $storedStats = $decoded;
        }
    }

    $firstDay = gmdate('Y-m-d', strtotime('-' . max(0, $rangeDays - 1) . ' days'));
    $lastDay = gmdate('Y-m-d');
    $result = [];

    foreach ($campaigns as $slug => $details) {
        $entry = is_array($storedStats[$slug] ?? null) ? $storedStats[$slug] : [];
        $days = is_array($entry['days'] ?? null) ? $entry['days'] : [];
        $rangeTotal = 0;

        foreach ($days as $date => $count) {
            if ($date >= $firstDay && $date <= $lastDay) {
                $rangeTotal += max(0, (int) $count);
            }
        }

        $result[] = [
            'campaign' => $slug,
            'label' => $details['label'],
            'analyticsCampaign' => $details['analyticsCampaign'],
            'shortUrl' => $details['shortUrl'],
            'target' => $details['target'],
            'accesses' => $rangeTotal,
            'totalAccesses' => max(0, (int) ($entry['total'] ?? 0)),
            'lastAccess' => (string) ($entry['lastAccess'] ?? ''),
        ];
    }

    return $result;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'GET') {
    header('Allow: GET');
    analyticsRespond(405, ['message' => 'Method not allowed']);
}

$config = analyticsConfig();
$providedToken = (string) ($_SERVER['HTTP_X_ANALYTICS_DASHBOARD_TOKEN'] ?? '');
if ($providedToken === '' || !hash_equals((string) $config['dashboard_token'], $providedToken)) {
    analyticsRespond(401, [
        'configured' => true,
        'message' => 'Bitte geben Sie den internen Zugriffscode ein.',
    ]);
}

$ranges = [
    '7d' => ['startDate' => '7daysAgo', 'label' => 'Letzte 7 Tage', 'days' => 7],
    '30d' => ['startDate' => '30daysAgo', 'label' => 'Letzte 30 Tage', 'days' => 30],
    '90d' => ['startDate' => '90daysAgo', 'label' => 'Letzte 90 Tage', 'days' => 90],
];
$rangeKey = (string) ($_GET['range'] ?? '30d');
$selectedRange = $ranges[$rangeKey] ?? $ranges['30d'];
$dateRanges = [['startDate' => $selectedRange['startDate'], 'endDate' => 'today']];

try {
    $accessToken = getGoogleAccessToken($config);
    $summaryReport = runAnalyticsReport($config, $accessToken, [
        'dateRanges' => $dateRanges,
        'metrics' => [
            ['name' => 'activeUsers'],
            ['name' => 'sessions'],
            ['name' => 'screenPageViews'],
            ['name' => 'averageSessionDuration'],
            ['name' => 'engagementRate'],
        ],
    ]);
    $dailyReport = runAnalyticsReport($config, $accessToken, [
        'dateRanges' => $dateRanges,
        'dimensions' => [['name' => 'date']],
        'metrics' => [['name' => 'activeUsers'], ['name' => 'sessions'], ['name' => 'screenPageViews']],
        'orderBys' => [['dimension' => ['dimensionName' => 'date']]],
        'limit' => 120,
    ]);
    $pagesReport = runAnalyticsReport($config, $accessToken, [
        'dateRanges' => $dateRanges,
        'dimensions' => [['name' => 'pagePath'], ['name' => 'pageTitle']],
        'metrics' => [['name' => 'screenPageViews'], ['name' => 'activeUsers'], ['name' => 'engagementRate']],
        'orderBys' => [['metric' => ['metricName' => 'screenPageViews'], 'desc' => true]],
        'limit' => 10,
    ]);
    $sourcesReport = runAnalyticsReport($config, $accessToken, [
        'dateRanges' => $dateRanges,
        'dimensions' => [['name' => 'sessionDefaultChannelGroup']],
        'metrics' => [['name' => 'sessions']],
        'orderBys' => [['metric' => ['metricName' => 'sessions'], 'desc' => true]],
        'limit' => 8,
    ]);
    $devicesReport = runAnalyticsReport($config, $accessToken, [
        'dateRanges' => $dateRanges,
        'dimensions' => [['name' => 'deviceCategory']],
        'metrics' => [['name' => 'sessions']],
        'orderBys' => [['metric' => ['metricName' => 'sessions'], 'desc' => true]],
        'limit' => 5,
    ]);
    $qrCampaignsReport = runAnalyticsReport($config, $accessToken, [
        'dateRanges' => $dateRanges,
        'dimensions' => [
            ['name' => 'sessionManualCampaignName'],
            ['name' => 'sessionManualMedium'],
            ['name' => 'sessionManualAdContent'],
        ],
        'metrics' => [
            ['name' => 'sessions'],
            ['name' => 'activeUsers'],
            ['name' => 'screenPageViews'],
            ['name' => 'engagementRate'],
        ],
        'dimensionFilter' => [
            'filter' => [
                'fieldName' => 'sessionManualSource',
                'stringFilter' => [
                    'matchType' => 'EXACT',
                    'value' => 'qr',
                    'caseSensitive' => false,
                ],
            ],
        ],
        'orderBys' => [['metric' => ['metricName' => 'sessions'], 'desc' => true]],
        'limit' => 20,
    ]);

    $summaryRow = $summaryReport['rows'][0] ?? null;
    analyticsRespond(200, [
        'configured' => true,
        'range' => $selectedRange['label'],
        'updatedAt' => gmdate('c'),
        'summary' => [
            'activeUsers' => metricValue($summaryRow, 0),
            'sessions' => metricValue($summaryRow, 1),
            'pageViews' => metricValue($summaryRow, 2),
            'averageSessionDuration' => metricValue($summaryRow, 3),
            'engagementRate' => metricValue($summaryRow, 4),
        ],
        'daily' => array_map(static fn (array $row): array => [
            'date' => dimensionValue($row, 0),
            'activeUsers' => metricValue($row, 0),
            'sessions' => metricValue($row, 1),
            'pageViews' => metricValue($row, 2),
        ], $dailyReport['rows'] ?? []),
        'pages' => array_map(static fn (array $row): array => [
            'path' => dimensionValue($row, 0),
            'title' => dimensionValue($row, 1),
            'pageViews' => metricValue($row, 0),
            'activeUsers' => metricValue($row, 1),
            'engagementRate' => metricValue($row, 2),
        ], $pagesReport['rows'] ?? []),
        'sources' => array_map(static fn (array $row): array => [
            'channel' => dimensionValue($row, 0),
            'sessions' => metricValue($row, 0),
        ], $sourcesReport['rows'] ?? []),
        'devices' => array_map(static fn (array $row): array => [
            'device' => dimensionValue($row, 0),
            'sessions' => metricValue($row, 0),
        ], $devicesReport['rows'] ?? []),
        'qrRedirects' => qrRedirectStats((int) $selectedRange['days']),
        'qrCampaigns' => array_map(static fn (array $row): array => [
            'campaign' => dimensionValue($row, 0),
            'medium' => dimensionValue($row, 1),
            'content' => dimensionValue($row, 2),
            'sessions' => metricValue($row, 0),
            'activeUsers' => metricValue($row, 1),
            'pageViews' => metricValue($row, 2),
            'engagementRate' => metricValue($row, 3),
        ], $qrCampaignsReport['rows'] ?? []),
    ]);
} catch (Throwable $error) {
    error_log('MOVIN Analytics dashboard failed: ' . $error->getMessage());
    $payload = [
        'configured' => true,
        'message' => 'Google Analytics Daten konnten nicht geladen werden.',
    ];
    if (str_starts_with(strtolower((string) ($_SERVER['HTTP_HOST'] ?? '')), 'staging.')) {
        $payload['detail'] = $error->getMessage();
    }
    analyticsRespond(502, $payload);
}
