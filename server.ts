import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs/promises";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

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
    } = req.body;

    if (!name || !email || !phone || !fileBase64 || !fileName) {
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
        attachments: [
          {
            filename: safeFileName(fileName),
            content: extractBase64Content(fileBase64),
            encoding: "base64",
          },
        ],
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
