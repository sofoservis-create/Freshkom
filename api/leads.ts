import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";
import { buildLeadEmailHtml, serviceLabels } from "@workspace/email-template";

const NOTIFY_EMAIL = "freshkomsluzby@gmail.com";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, phone, email, service, message } = req.body ?? {};

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return res.status(400).json({ error: "Invalid name" });
  }
  if (!phone || typeof phone !== "string" || phone.trim().length < 6) {
    return res.status(400).json({ error: "Invalid phone" });
  }
  if (!service || typeof service !== "string") {
    return res.status(400).json({ error: "Invalid service" });
  }

  const lead = {
    name: String(name).trim(),
    phone: String(phone).trim(),
    email: email ? String(email).trim() : null,
    service: String(service).trim(),
    message: message ? String(message).trim() : null,
  };

  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (gmailUser && gmailPass) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: gmailUser, pass: gmailPass },
      });
      const serviceLabel = serviceLabels[lead.service] ?? lead.service;
      await transporter.sendMail({
        from: `"Freshkom Web" <${gmailUser}>`,
        to: NOTIFY_EMAIL,
        subject: `🚀 Nový dopyt: ${lead.name} — ${serviceLabel}`,
        html: buildLeadEmailHtml(lead),
        replyTo: lead.email ?? undefined,
      });
    } catch (err) {
      console.error("[leads] email send failed:", err);
    }
  } else {
    console.warn("[leads] GMAIL_USER or GMAIL_APP_PASSWORD not set — skipping email");
  }

  return res.status(201).json({ success: true, message: "Lead received", id: Date.now() });
}
