import nodemailer from "nodemailer";
import { buildLeadEmailHtml, serviceLabels, type LeadEmailData } from "@workspace/email-template";
import { logger } from "./lib/logger.js";

const NOTIFY_EMAIL = "freshkomsluzby@gmail.com";

export async function sendLeadNotification(lead: LeadEmailData): Promise<void> {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    logger.warn("Mail is not configured; inquiry and consent are saved in the database.");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
  await transporter.sendMail({
    from: `"Freshkom Web" <${user}>`,
    to: NOTIFY_EMAIL,
    subject: `Nový dopyt: ${lead.name} — ${serviceLabels[lead.service] ?? lead.service}`,
    html: buildLeadEmailHtml(lead),
    replyTo: lead.email ?? undefined,
  });
}
