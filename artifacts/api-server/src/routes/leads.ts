import { Router, type IRouter } from "express";
import { db, leadsTable } from "@workspace/db";
import { SubmitLeadBody } from "@workspace/api-zod";
import { recordLeadConsent } from "@workspace/email-template";
import { sendLeadNotification } from "../email.js";
import { logger } from "../lib/logger.js";

const router: IRouter = Router();

router.post("/leads", async (req, res) => {
  const parsed = SubmitLeadBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input: " + parsed.error.message });
    return;
  }

  const consent = recordLeadConsent(parsed.data);
  if (!consent.success) {
    res.status(400).json({ error: "Privacy acknowledgement and valid consent choices are required." });
    return;
  }
  const data = {
    ...parsed.data,
    ...consent.data,
    consentRecordedAt: new Date(consent.data.consentRecordedAt),
  };
  const [lead] = await db.insert(leadsTable).values(data).returning({ id: leadsTable.id });

  sendLeadNotification(data).catch((err) => {
    logger.error({ err }, "Failed to send lead notification");
  });

  res.status(201).json({
    success: true,
    message: "Ďakujeme! Vaša požiadavka bola odoslaná. Ozveme sa vám čo najskôr.",
    id: lead.id,
  });
});

export default router;
