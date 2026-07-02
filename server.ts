import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs/promises";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || "3000", 10);

  app.use(express.json({ limit: '50mb' }));

  const mailRecipients = {
    contact: process.env.CONTACT_RECEIVER_EMAIL || "kontakt@movin-freiburg.de",
    career: process.env.CAREER_RECEIVER_EMAIL || "daniel.klein@movin-freiburg.de",
    anamnese: process.env.ANAMNESE_RECEIVER_EMAIL || "anamnesebogen@movin-freiburg.de",
  };

  const createTransporter = () => nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.example.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const sendMail = async (mailOptions: Record<string, any>) => {
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = createTransporter();
      await transporter.sendMail(mailOptions);
      return { sent: true };
    }

    console.log("SMTP credentials not set. Email simulated without logging personal form content.", {
      to: mailOptions.to,
      subject: mailOptions.subject,
      hasAttachments: Boolean(mailOptions.attachments),
    });
    return { sent: false, simulated: true };
  };

  const analyticsConfig = {
    propertyId: process.env.GA4_PROPERTY_ID,
    clientEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    privateKey: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    dashboardToken: process.env.ANALYTICS_DASHBOARD_TOKEN,
  };

  let googleAccessToken: { token: string; expiresAt: number } | null = null;

  const getAnalyticsSetupIssues = () => {
    const issues: string[] = [];
    if (!analyticsConfig.propertyId) issues.push("GA4_PROPERTY_ID");
    if (!analyticsConfig.clientEmail) issues.push("GOOGLE_SERVICE_ACCOUNT_EMAIL");
    if (!analyticsConfig.privateKey) issues.push("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY");
    if (!analyticsConfig.dashboardToken) issues.push("ANALYTICS_DASHBOARD_TOKEN");
    return issues;
  };

  const getAnalyticsDateRange = (range: string) => {
    const ranges: Record<string, { startDate: string; label: string }> = {
      "7d": { startDate: "7daysAgo", label: "Letzte 7 Tage" },
      "30d": { startDate: "30daysAgo", label: "Letzte 30 Tage" },
      "90d": { startDate: "90daysAgo", label: "Letzte 90 Tage" },
    };
    return ranges[range] || ranges["30d"];
  };

  const createGoogleServiceJwt = () => {
    if (!analyticsConfig.clientEmail || !analyticsConfig.privateKey) {
      throw new Error("Google service account is not configured.");
    }

    const now = Math.floor(Date.now() / 1000);
    const header = {
      alg: "RS256",
      typ: "JWT",
    };
    const claimSet = {
      iss: analyticsConfig.clientEmail,
      scope: "https://www.googleapis.com/auth/analytics.readonly",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    };
    const encodedHeader = Buffer.from(JSON.stringify(header)).toString("base64url");
    const encodedClaimSet = Buffer.from(JSON.stringify(claimSet)).toString("base64url");
    const unsignedToken = `${encodedHeader}.${encodedClaimSet}`;
    const signature = crypto
      .createSign("RSA-SHA256")
      .update(unsignedToken)
      .sign(analyticsConfig.privateKey)
      .toString("base64url");

    return `${unsignedToken}.${signature}`;
  };

  const getGoogleAccessToken = async () => {
    if (googleAccessToken && googleAccessToken.expiresAt > Date.now() + 60_000) {
      return googleAccessToken.token;
    }

    const assertion = createGoogleServiceJwt();
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion,
      }).toString(),
    });

    const tokenData: any = await tokenResponse.json();
    if (!tokenResponse.ok || !tokenData.access_token) {
      throw new Error(tokenData.error_description || tokenData.error || "Google token request failed.");
    }

    googleAccessToken = {
      token: tokenData.access_token,
      expiresAt: Date.now() + (Number(tokenData.expires_in || 3600) * 1000),
    };
    return googleAccessToken.token;
  };

  const runAnalyticsReport = async (
    accessToken: string,
    payload: {
      dateRanges: Array<{ startDate: string; endDate: string }>;
      dimensions?: Array<{ name: string }>;
      metrics: Array<{ name: string }>;
      orderBys?: Array<Record<string, any>>;
      limit?: number;
    }
  ) => {
    const response = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${analyticsConfig.propertyId}:runReport`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data: any = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || "Google Analytics report request failed.");
    }
    return data;
  };

  const metricValue = (row: any, index: number) => Number(row?.metricValues?.[index]?.value || 0);
  const dimensionValue = (row: any, index: number) => row?.dimensionValues?.[index]?.value || "";

  const formatAnalyticsRows = (report: any) => (report.rows || []).map((row: any) => ({
    dimensions: row.dimensionValues?.map((value: any) => value.value) || [],
    metrics: row.metricValues?.map((value: any) => Number(value.value || 0)) || [],
  }));

  const extractBase64Content = (dataUri: string) => {
    const marker = "base64,";
    return dataUri.includes(marker) ? dataUri.split(marker)[1] : dataUri;
  };

  const safeFileName = (name: string) => name.replace(/[^\w.\-äöüÄÖÜß ]/g, "_").replace(/\s+/g, "_");

  // Helper to find video files recursively
  async function findVideosInDir(dir: string, baseDir: string): Promise<string[]> {
    const result: string[] = [];
    try {
      const list = await fs.readdir(dir, { withFileTypes: true });
      for (const item of list) {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory()) {
          const sub = await findVideosInDir(fullPath, baseDir);
          result.push(...sub);
        } else {
          const ext = path.extname(item.name).toLowerCase();
          if ([".mp4", ".mov", ".webm", ".m4v"].includes(ext)) {
            // Convert absolute path to a URL relative to public directory
            let relative = path.relative(baseDir, fullPath);
            // Make sure it starts with a slash and uses positive slashes
            relative = "/" + relative.replace(/\\/g, "/");
            result.push(relative);
          }
        }
      }
    } catch (error) {
      console.error(`Error reading dir ${dir}:`, error);
    }
    return result;
  }

  // API Route to detect uploaded video files in /public folder
  app.get("/api/list-videos", async (req, res) => {
    try {
      const publicPath = path.join(process.cwd(), "public");
      const videos = await findVideosInDir(publicPath, publicPath);
      res.json({ videos });
    } catch (error: any) {
      console.error("Error listing videos:", error);
      res.status(500).json({ error: "Failed to list videos" });
    }
  });

  app.get("/api/analytics-summary", async (req, res) => {
    const setupIssues = getAnalyticsSetupIssues();
    if (setupIssues.length > 0) {
      return res.status(503).json({
        configured: false,
        message: "Google Analytics ist noch nicht fuer das interne Dashboard konfiguriert.",
        requiredEnv: setupIssues,
      });
    }

    const providedToken = req.headers["x-analytics-dashboard-token"];
    if (providedToken !== analyticsConfig.dashboardToken) {
      return res.status(401).json({
        configured: true,
        message: "Bitte geben Sie den internen Zugriffscode ein.",
      });
    }

    const selectedRange = getAnalyticsDateRange(String(req.query.range || "30d"));
    const dateRanges = [{ startDate: selectedRange.startDate, endDate: "today" }];

    try {
      const accessToken = await getGoogleAccessToken();
      const [summaryReport, dailyReport, pagesReport, sourcesReport, devicesReport] = await Promise.all([
        runAnalyticsReport(accessToken, {
          dateRanges,
          metrics: [
            { name: "activeUsers" },
            { name: "sessions" },
            { name: "screenPageViews" },
            { name: "averageSessionDuration" },
            { name: "engagementRate" },
          ],
        }),
        runAnalyticsReport(accessToken, {
          dateRanges,
          dimensions: [{ name: "date" }],
          metrics: [
            { name: "activeUsers" },
            { name: "sessions" },
            { name: "screenPageViews" },
          ],
          orderBys: [{ dimension: { dimensionName: "date" } }],
          limit: 120,
        }),
        runAnalyticsReport(accessToken, {
          dateRanges,
          dimensions: [{ name: "pagePath" }, { name: "pageTitle" }],
          metrics: [
            { name: "screenPageViews" },
            { name: "activeUsers" },
            { name: "engagementRate" },
          ],
          orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
          limit: 10,
        }),
        runAnalyticsReport(accessToken, {
          dateRanges,
          dimensions: [{ name: "sessionDefaultChannelGroup" }],
          metrics: [{ name: "sessions" }],
          orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
          limit: 8,
        }),
        runAnalyticsReport(accessToken, {
          dateRanges,
          dimensions: [{ name: "deviceCategory" }],
          metrics: [{ name: "sessions" }],
          orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
          limit: 5,
        }),
      ]);

      const summaryRow = summaryReport.rows?.[0];
      res.json({
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
        daily: formatAnalyticsRows(dailyReport).map((row: any) => ({
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
      });
    } catch (error: any) {
      console.error("Error loading Google Analytics report:", error);
      res.status(500).json({
        configured: true,
        message: "Google Analytics Daten konnten nicht geladen werden.",
        detail: process.env.NODE_ENV === "production" ? undefined : error.message,
      });
    }
  });

  app.get("/docs/*", (req, res, next) => {
    const docsRoot = path.resolve(process.cwd(), "public", "docs");
    const requestedPath = path.resolve(process.cwd(), "public", `.${req.path}`);

    if (!requestedPath.startsWith(docsRoot)) {
      return next();
    }

    res.sendFile(requestedPath, (error) => {
      if (error) next();
    });
  });

  app.post("/api/send-contact", async (req, res) => {
    const { name, email, phone, message, standort } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: "Required fields are missing" });
    }

    const standortLabels: Record<string, string> = {
      lorettoberg: "Freiburg - Lorettoberg",
      mooswald: "Freiburg - Mooswald",
      rust: "Europa-Park - Rust",
      egal: "Egal / Keine Präferenz",
    };

    try {
      const result = await sendMail({
        from: process.env.SMTP_FROM || '"MOVIN Website" <noreply@movin-freiburg.de>',
        to: mailRecipients.contact,
        replyTo: email,
        subject: `Neue Kontaktanfrage: ${name}`,
        text: [
          "Über das Kontaktformular wurde eine neue Anfrage eingereicht.",
          "",
          `Name: ${name}`,
          `E-Mail: ${email}`,
          `Telefon: ${phone}`,
          `Gewünschter Standort: ${standortLabels[standort] || standort || "Nicht angegeben"}`,
          "",
          "Nachricht:",
          message,
        ].join("\n"),
      });

      res.json({ message: "Contact request processed", ...result });
    } catch (error) {
      console.error("Error sending contact request:", error);
      res.status(500).json({ error: "Failed to send contact request" });
    }
  });

  app.post("/api/send-bewerbung", async (req, res) => {
    const {
      anrede,
      name,
      email,
      phone,
      message,
      einstieg,
      selectedJobTitle,
      selectedJobId,
      fileName,
      fileBase64,
      files,
    } = req.body;

    const attachmentFiles = (Array.isArray(files) && files.length > 0
      ? files
      : (fileName && fileBase64 ? [{ fileName, fileBase64 }] : []))
      .filter((file: { fileName?: string; fileBase64?: string }) => file.fileName && file.fileBase64);

    if (!name || !email || !phone || attachmentFiles.length === 0) {
      return res.status(400).json({ error: "Required fields are missing" });
    }

    try {
      const result = await sendMail({
        from: process.env.SMTP_FROM || '"MOVIN Karriere" <noreply@movin-freiburg.de>',
        to: mailRecipients.career,
        replyTo: email,
        subject: `Neue Bewerbung: ${name}`,
        text: [
          "Über das Karriereformular wurde eine neue Bewerbung eingereicht.",
          "",
          `Anrede: ${anrede || "Nicht angegeben"}`,
          `Name: ${name}`,
          `E-Mail: ${email}`,
          `Telefon: ${phone}`,
          `Gewünschte Stelle: ${selectedJobTitle || selectedJobId || "Nicht angegeben"}`,
          `Frühestmöglicher Einstieg: ${einstieg || "Nicht angegeben"}`,
          "",
          "Nachricht / Begleittext:",
          message || "Keine Nachricht angegeben.",
        ].join("\n"),
        attachments: attachmentFiles.map((file: { fileName: string; fileBase64: string }) => ({
          filename: safeFileName(file.fileName),
          content: extractBase64Content(file.fileBase64),
          encoding: "base64",
        })),
      });

      res.json({ message: "Application processed", ...result });
    } catch (error) {
      console.error("Error sending application:", error);
      res.status(500).json({ error: "Failed to send application" });
    }
  });

  // API Route to send the PDF
  app.post("/api/send-anamnese", async (req, res) => {
    const { pdfBase64, name, email } = req.body;

    if (!pdfBase64) {
      return res.status(400).json({ error: "PDF data is missing" });
    }

    try {
      const result = await sendMail({
        from: process.env.SMTP_FROM || '"MOVIN Physiotherapie" <noreply@movin-freiburg.de>',
        to: mailRecipients.anamnese,
        replyTo: email,
        subject: `Neuer Anamnesebogen: ${name}`,
        text: `Ein neuer Anamnesebogen wurde von ${name} (${email}) eingereicht. Sie finden das Dokument im Anhang.`,
        attachments: [
          {
            filename: safeFileName(`Anamnesebogen_${name}.pdf`),
            content: extractBase64Content(pdfBase64),
            encoding: "base64",
          },
        ],
      });

      res.json({ message: "Anamnese processed", ...result });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  let vite: any;
  if (process.env.NODE_ENV !== "production") {
    app.use(express.static(path.join(process.cwd(), 'public')));
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), 'public')));
    app.use(express.static(path.join(process.cwd(), 'dist'), { index: false }));
  }

  app.get('*', async (req, res, next) => {
    const url = req.originalUrl;
    
    // Ignore static asset requests that might have fallen through
    if (url.includes('.') && !url.endsWith('.html')) {
      return next();
    }

    try {
      let template: string;
      let render: any;

      if (process.env.NODE_ENV !== "production") {
        template = await fs.readFile(path.resolve(process.cwd(), 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
      } else {
        template = await fs.readFile(path.resolve(process.cwd(), 'dist/index.html'), 'utf-8');
        // In this environment, we can import the tsx file directly thanks to tsx
        render = (await import('./src/entry-server.tsx')).render;
      }

      const { html: appHtml, helmetContext } = await render(url);
      const helmet = (helmetContext as any).helmet;

      let helmetTags = `
        ${helmet?.title?.toString() || ""}
        ${helmet?.meta?.toString() || ""}
        ${helmet?.link?.toString() || ""}
        ${helmet?.script?.toString() || ""}
      `;

      let html = template
        .replace(`<!--app-html-->`, appHtml)
        .replace(/<title>.*?<\/title>/, helmetTags);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e: any) {
      if (process.env.NODE_ENV !== "production" && vite) {
        vite.ssrFixStacktrace(e);
      }
      next(e);
    }
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
