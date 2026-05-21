import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs/promises";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  // API Route to send the PDF
  app.post("/api/send-anamnese", async (req, res) => {
    const { pdfBase64, name, email } = req.body;

    if (!pdfBase64) {
      return res.status(400).json({ error: "PDF data is missing" });
    }

    try {
      // Configure transporter (using environment variables)
      // For demo purposes, we'll use a mock or a real one if configured
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.example.com",
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: process.env.SMTP_FROM || '"MOVIN Physiotherapie" <noreply@movin-freiburg.de>',
        to: process.env.RECEIVER_EMAIL || "andreasboehler86@gmail.com",
        subject: `Neuer Anamnesebogen: ${name}`,
        text: `Ein neuer Anamnesebogen wurde von ${name} (${email}) eingereicht. Sie finden das Dokument im Anhang.`,
        attachments: [
          {
            filename: `Anamnesebogen_${name.replace(/\s+/g, '_')}.pdf`,
            content: pdfBase64.split("base64,")[1],
            encoding: "base64",
          },
        ],
      };

      // In a real scenario, you'd send the email. 
      // For this environment, we'll log it and return success if credentials aren't set.
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        await transporter.sendMail(mailOptions);
        res.json({ message: "Email sent successfully" });
      } else {
        console.log("SMTP credentials not set. Email content logged to console.");
        console.log("Mail Options:", { ...mailOptions, attachments: "[PDF ATTACHMENT]" });
        res.json({ message: "Email simulation successful (credentials missing)" });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  let vite: any;
  if (process.env.NODE_ENV !== "production") {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(vite.middlewares);
  } else {
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
