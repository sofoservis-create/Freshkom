import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

const NOTIFY_EMAIL = "elektrikakubis@gmail.com";
const SERVICES = new Set([
  "Elektroinštalácia a rozvody",
  "Rozvádzač / istiaca skrinka",
  "Svietidlá a osvetlenie",
  "Zásuvky a vypínače",
  "Porucha / oprava",
  "Pripojenie spotrebičov",
  "Rekonštrukcia bytu / domu",
  "Drobné práce",
  "Iné",
]);

const esc = (v: string) =>
  v.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const body = req.body ?? {};
  // Honeypot: boti vyplnia skryté pole, ticho sa tvárime, že je všetko v poriadku.
  if (str(body.website, 100)) return res.status(201).json({ success: true });

  const name = str(body.name, 100);
  const phone = str(body.phone, 30);
  const email = str(body.email, 120);
  const service = str(body.service, 80);
  const message = str(body.message, 1500);

  if (body.consent !== true) return res.status(400).json({ error: "Consent is required" });
  if (name.length < 2) return res.status(400).json({ error: "Invalid name" });
  if (phone.replace(/\D/g, "").length < 6) return res.status(400).json({ error: "Invalid phone" });
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: "Invalid email" });
  if (!SERVICES.has(service)) return res.status(400).json({ error: "Invalid service" });

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    console.warn("[lead] GMAIL_USER or GMAIL_APP_PASSWORD not set");
    return res.status(503).json({ error: "Delivery unavailable" });
  }

  try {
    const transporter = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
    await transporter.sendMail({
      from: `"Elektrika Kubiš web" <${user}>`,
      to: NOTIFY_EMAIL,
      replyTo: email || undefined,
      subject: `Nový dopyt: ${name} – ${service}`,
      html: `<h2>Nový dopyt z webu</h2>
<p><strong>Meno:</strong> ${esc(name)}</p>
<p><strong>Telefón:</strong> <a href="tel:${esc(phone)}">${esc(phone)}</a></p>
<p><strong>E-mail:</strong> ${email ? esc(email) : "–"}</p>
<p><strong>Služba:</strong> ${esc(service)}</p>
<p><strong>Popis:</strong><br>${message ? esc(message).replaceAll("\n", "<br>") : "–"}</p>
<p><small>Súhlas so spracovaním údajov udelený: ${new Date().toISOString()}</small></p>`,
    });
  } catch (err) {
    console.error("[lead] send failed:", err);
    return res.status(502).json({ error: "Delivery failed" });
  }
  return res.status(201).json({ success: true });
}
