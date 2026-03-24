import { Star } from "lucide-react";
import type { GoogleReview } from "@/data/googleReviews";
import { useLanguage } from "@/contexts/LanguageContext";

function getInitials(name: string): string {
  const parts = name.split(" ");
  return parts.length >= 2
    ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
    : name.slice(0, 2).toUpperCase();
}

const GoogleLogo = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className}>
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    <path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 010-9.18l-7.98-6.19a24.08 24.08 0 000 21.56l7.98-6.19z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
  </svg>
);

interface GoogleReviewCardProps {
  review: GoogleReview;
  compact?: boolean;
}

export default function GoogleReviewCard({ review, compact = false }: GoogleReviewCardProps) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow ${compact ? "p-4" : "p-5"}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className={`${compact ? "h-9 w-9 text-sm" : "h-10 w-10 text-sm"} rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0`}
            style={{ backgroundColor: review.avatarColor }}
          >
            {getInitials(review.name)}
          </div>
          <div>
            <p className={`font-semibold text-gray-900 ${compact ? "text-sm" : "text-[15px]"} leading-tight`}>{review.name}</p>
            <p className="text-xs text-gray-500">{review.date}</p>
          </div>
        </div>
        <GoogleLogo className={compact ? "h-4 w-4" : "h-5 w-5"} />
      </div>
      <div className="flex gap-0.5 mb-2">
        {[...Array(review.rating)].map((_, j) => (
          <Star key={j} className={`${compact ? "w-3.5 h-3.5" : "w-4 h-4"} fill-amber-400 text-amber-400`} />
        ))}
      </div>
      <p className={`text-gray-700 leading-relaxed ${compact ? "text-xs line-clamp-3" : "text-sm"}`}>
        {review.text}
      </p>
    </div>
  );
}

interface GoogleRatingBadgeProps {
  rating: number;
  reviewCount: number;
  size?: "sm" | "md" | "lg";
}

export function GoogleRatingBadge({ rating, reviewCount, size = "md" }: GoogleRatingBadgeProps) {
  const { t } = useLanguage();
  const isSmall = size === "sm";
  const isLarge = size === "lg";
  return (
    <div className={`inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full shadow-sm ${isSmall ? "px-3 py-1.5" : isLarge ? "px-5 py-2.5 shadow-md" : "px-4 py-2"}`}>
      <GoogleLogo className={isSmall ? "h-4 w-4" : isLarge ? "h-6 w-6" : "h-5 w-5"} />
      <span className={`font-bold text-gray-900 ${isSmall ? "text-sm" : isLarge ? "text-xl" : "text-base"}`}>{rating}</span>
      <div className={`flex ${isLarge ? "gap-1" : "gap-0.5"}`}>
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`${isSmall ? "w-3 h-3" : isLarge ? "w-4 h-4" : "w-3.5 h-3.5"} fill-amber-400 text-amber-400`} />
        ))}
      </div>
      <span className={`text-gray-500 ${isSmall ? "text-xs" : isLarge ? "text-sm" : "text-sm"}`}>· {t("reviews.ratingsLabel")}</span>
    </div>
  );
}
