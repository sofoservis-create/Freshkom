import { getGetGoogleReviewsQueryKey, useGetGoogleReviews } from "@workspace/api-client-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function useGoogleReviews() {
  const { lang } = useLanguage();
  return useGetGoogleReviews(
    { lang },
    { query: { queryKey: getGetGoogleReviewsQueryKey({ lang }), staleTime: 5 * 60 * 1000, retry: 1 } },
  );
}