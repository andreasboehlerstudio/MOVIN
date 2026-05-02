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

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(vite.middlewares);

    app.get('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        // 1. Read index.html
        let template = await fs.readFile(path.resolve(process.cwd(), 'index.html'), 'utf-8');

        // 2. Apply Vite HTML transforms
        template = await vite.transformIndexHtml(url, template);

        // 3. Load the server entry
        const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');

        // 4. Render the app HTML
        const { html: appHtml, helmetContext } = await render(url);
        const helmet = (helmetContext as any).helmet;

        // 5. Inject the app-rendered HTML and helmet tags into the template
        let helmetTags = `
          ${helmet?.title?.toString() || "<title>My Google AI Studio App</title>"}
          ${helmet?.meta?.toString() || ""}
          ${helmet?.link?.toString() || ""}
        `;

        let html = template
          .replace(`<!--app-html-->`, appHtml)
          .replace(`<title>My Google AI Studio App</title>`, helmetTags);

        // 6. Send the rendered HTML back
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      } catch (e: any) {
        // If an error is caught, let Vite fix the stack trace so it maps back
        // to your actual source code.
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
