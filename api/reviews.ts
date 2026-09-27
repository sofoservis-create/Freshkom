import type { VercelRequest, VercelResponse } from "@vercel/node";

type Language = "sk" | "hu";

interface PlaceReview {
  rating?: number;
  originalText?: { text?: string };
  text?: { text?: string };
  publishTime?: string;
  authorAttribution?: { displayName?: string; uri?: string };
}

interface PlaceDetails {
  displayName?: { text?: string };
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlaceReview[];
}

// Verified public listing for Freshkom in Komárno. Do not trust an unverified
// GOOGLE_PLACE_ID: a valid ID can belong to a different business.
const FRESHKOM_PLACE_ID = "ChIJ56sh4e41zq0R5jcXUCvc6eQ";
const cache = new Map<Language, { data: unknown; expiresAt: number }>();
const pending = new Map<Language, Promise<unknown>>();

async function fetchReviews(lang: Language) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) throw new Error("Google Places is not configured");

  const url = new URL(`https://places.googleapis.com/v1/places/${FRESHKOM_PLACE_ID}`);
  url.searchParams.set("languageCode", lang);
  const response = await fetch(url, {
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "displayName,rating,userRatingCount,googleMapsUri,reviews",
    },
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error(`Google Places returned HTTP ${response.status}`);

  const place = (await response.json()) as PlaceDetails;
  if (!place.displayName?.text?.toLocaleLowerCase().includes("freshkom")) {
    throw new Error("Google Place ID does not belong to Freshkom");
  }
  if (
    typeof place.rating !== "number" ||
    !Number.isFinite(place.rating) ||
    place.rating < 0 ||
    place.rating > 5 ||
    !Number.isInteger(place.userRatingCount) ||
    (place.userRatingCount ?? -1) < 0
  ) {
    throw new Error("Google Places returned an incomplete rating");
  }

  const mapsUrl =
    typeof place.googleMapsUri === "string" && place.googleMapsUri.startsWith("https://")
      ? place.googleMapsUri
      : `https://www.google.com/maps/place/?q=place_id:${FRESHKOM_PLACE_ID}`;

  return {
    rating: place.rating,
    reviewCount: place.userRatingCount,
    mapsUrl,
    reviews: (Array.isArray(place.reviews) ? place.reviews : [])
      .filter(
        (review) =>
          typeof review.rating === "number" &&
          Number.isInteger(review.rating) &&
          review.rating >= 1 &&
          review.rating <= 5 &&
          Boolean(review.originalText?.text || review.text?.text),
      )
      .map((review) => ({
        name: review.authorAttribution?.displayName || "Google",
        text: (review.originalText?.text || review.text?.text || "").trim(),
        rating: review.rating as number,
        date: review.publishTime || "",
        authorUrl: review.authorAttribution?.uri?.startsWith("https://")
          ? review.authorAttribution.uri
          : mapsUrl,
      })),
  };
}

async function getReviews(lang: Language) {
  const current = cache.get(lang);
  if (current && current.expiresAt > Date.now()) return current.data;
  const inflight = pending.get(lang);
  if (inflight) return inflight;

  const request = fetchReviews(lang);
  pending.set(lang, request);
  try {
    const data = await request;
    cache.set(lang, { data, expiresAt: Date.now() + 24 * 60 * 60 * 1000 });
    return data;
  } finally {
    pending.delete(lang);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  const lang = req.query.lang;
  if (lang !== undefined && lang !== "sk" && lang !== "hu") {
    return res.status(400).json({ error: "Invalid language" });
  }

  try {
    const data = await getReviews(lang === "hu" ? "hu" : "sk");
    res.setHeader("Cache-Control", "public, max-age=300, s-maxage=86400");
    return res.status(200).json(data);
  } catch (error) {
    console.error("[reviews] Could not load verified Google reviews:", error);
    return res.status(503).json({ error: "Google reviews are temporarily unavailable" });
  }
}