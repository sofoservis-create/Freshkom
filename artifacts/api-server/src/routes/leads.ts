import { Router, type IRouter } from "express";
import { db, leadsTable, insertLeadSchema } from "@workspace/db";

const router: IRouter = Router();

router.post("/leads", async (req, res) => {
  const parsed = insertLeadSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input: " + parsed.error.message });
    return;
  }

  const [lead] = await db.insert(leadsTable).values(parsed.data).returning({ id: leadsTable.id });

  res.status(201).json({
    success: true,
    message: "Ďakujeme! Vaša požiadavka bola odoslaná. Ozveme sa vám čo najskôr.",
    id: lead.id,
  });
});

export default router;
