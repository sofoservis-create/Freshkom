import { Router, type IRouter } from "express";
import { getGoogleReviewsData } from "../google-reviews.js";

const router: IRouter = Router();

router.get("/reviews", async (req, res) => {
  const lang = req.query.lang;
  if (lang !== undefined && lang !== "sk" && lang !== "hu") {
    res.status(400).json({ error: "Invalid language" });
    return;
  }

  try {
    const data = await getGoogleReviewsData(lang === "hu" ? "hu" : "sk");
    res.setHeader("Cache-Control", "public, max-age=300, s-maxage=86400");
    res.json(data);
  } catch {
    res.status(503).json({ error: "Google reviews are temporarily unavailable" });
  }
});

export default router;