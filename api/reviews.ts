import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getGoogleReviewsData } from "../artifacts/api-server/src/google-reviews";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  const lang = req.query.lang;
  if (lang !== undefined && lang !== "sk" && lang !== "hu") {
    return res.status(400).json({ error: "Invalid language" });
  }

  try {
    const data = await getGoogleReviewsData(lang === "hu" ? "hu" : "sk");
    res.setHeader("Cache-Control", "public, max-age=300, s-maxage=86400");
    return res.status(200).json(data);
  } catch {
    return res.status(503).json({ error: "Google reviews are temporarily unavailable" });
  }
}