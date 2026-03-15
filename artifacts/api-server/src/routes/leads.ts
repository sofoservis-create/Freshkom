import { Router, type IRouter } from "express";
import { db, leadsTable, insertLeadSchema } from "@workspace/db";
import { sendLeadNotification } from "../email.js";

const router: IRouter = Router();

router.post("/leads", async (req, res) => {
  const parsed = insertLeadSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input: " + parsed.error.message });
    return;
  }

  const [lead] = await db.insert(leadsTable).values(parsed.data).returning({ id: leadsTable.id });

  sendLeadNotification(parsed.data).catch((err) => {
    console.error("[email] Failed to send lead notification:", err.message);
  });

  res.status(201).json({
    success: true,
    message: "Ďakujeme! Vaša požiadavka bola odoslaná. Ozveme sa vám čo najskôr.",
    id: lead.id,
  });
});

export default router;
