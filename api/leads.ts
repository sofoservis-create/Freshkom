import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

const NOTIFY_EMAIL = "freshkomsluzby@gmail.com";

const serviceLabels: Record<string, string> = {
  sedacky: "Tepovanie sedačiek",
  koberce: "Tepovanie kobercov",
  matrasy: "Tepovanie matracov",
  auto: "Tepovanie auta",
  okna: "Umývanie okien",
  "hĺbkové": "Hĺbkové čistenie",
  other: "Iná služba",
};

function buildHtml(lead: { name: string; phone: string; email?: string | null; service: string; message?: string | null }): string {
  const serviceLabel = serviceLabels[lead.service] ?? lead.service;
  return `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
  <div style="background:#0d7577;padding:24px 28px">
    <h1 style="color:#fff;margin:0;font-size:22px">🧹 Nový dopyt — Freshkom</h1>
  </div>
  <div style="padding:28px;background:#fff">
    <table style="width:100%;border-collapse:collapse">
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;width:130px;font-size:14px">Meno</td>
        <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-weight:600;font-size:15px">${lead.name}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:14px">Telefón</td>
        <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-weight:600;font-size:15px">
          <a href="tel:${lead.phone}" style="color:#0d7577;text-decoration:none">${lead.phone}</a>
        </td>
      </tr>
      ${lead.email ? `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:14px">Email</td>
        <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:15px">
          <a href="mailto:${lead.email}" style="color:#0d7577;text-decoration:none">${lead.email}</a>
        </td>
      </tr>` : ""}
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:14px">Služba</td>
        <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:15px">${serviceLabel}</td>
      </tr>
      ${lead.message ? `
      <tr>
        <td style="padding:10px 0;color:#6b7280;font-size:14px;vertical-align:top">Správa</td>
        <td style="padding:10px 0;font-size:15px;white-space:pre-wrap">${lead.message}</td>
      </tr>` : ""}
    </table>
    <div style="margin-top:24px">
      <a href="tel:${lead.phone}" style="display:inline-block;background:#0d7577;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px">📞 Zavolať ${lead.name}</a>
    </div>
  </div>
  <div style="padding:16px 28px;background:#f9fafb;font-size:12px;color:#9ca3af;text-align:center">
    Freshkom · info@freshkom.sk · +421 917 240 819
  </div>
</div>`.trim();
}

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
        subject: `🧹 Nový dopyt: ${lead.name} — ${serviceLabel}`,
        html: buildHtml(lead),
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
