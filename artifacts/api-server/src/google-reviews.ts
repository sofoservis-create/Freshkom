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

export interface GoogleReviewsData {
  rating: number;
  reviewCount: number;
  mapsUrl: string;
  reviews: Array<{
    name: string;
    text: string;
    rating: number;
    date: string;
    authorUrl: string;
  }>;
}

const CACHE_MS = 24 * 60 * 60 * 1000;
// Public Google Maps identifier for "Freshkom | Tepovanie | Umývanie okien" in Komárno.
const FRESHKOM_PLACE_ID = "ChIJ56sh4e41zq0R5jcXUCvc6eQ";
const cache = new Map<Language, { value: GoogleReviewsData; expiresAt: number }>();
const pending = new Map<Language, Promise<GoogleReviewsData>>();

export async function getGoogleReviewsData(lang: Language): Promise<GoogleReviewsData> {
  const current = cache.get(lang);
  if (current && current.expiresAt > Date.now()) return current.value;

  const inflight = pending.get(lang);
  if (inflight) return inflight;

  const request = fetchPlace(lang);
  pending.set(lang, request);
  try {
    const value = await request;
    cache.set(lang, { value, expiresAt: Date.now() + CACHE_MS });
    return value;
  } finally {
    pending.delete(lang);
  }
}

async function fetchPlace(lang: Language): Promise<GoogleReviewsData> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = FRESHKOM_PLACE_ID;
  if (!apiKey) throw new Error("Google Places is not configured");

  const url = new URL(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`);
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
      : `https://www.google.com/maps/place/?q=place_id:${encodeURIComponent(placeId)}`;
  const reviews = (Array.isArray(place.reviews) ? place.reviews : [])
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
    }));

  return {
    rating: place.rating,
    reviewCount: place.userRatingCount!,
    mapsUrl,
    reviews,
  };
}