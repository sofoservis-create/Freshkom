import type { GoogleReviewsResponse } from "@workspace/api-client-react";
import { useLanguage } from "@/contexts/LanguageContext";
import GoogleReviewCard, { GoogleRatingBadge } from "@/components/GoogleReviewCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function ReviewsSection({ data, isPending }: { data?: GoogleReviewsResponse; isPending: boolean }) {
  const { t } = useLanguage();

  return (
    <>
      <section id="recenzie" className="deferred-section bg-accent/30 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-3">{t("reviews.title")}</h2>
            <p className="text-base sm:text-lg text-gray-700">{t("reviews.subtitle")}</p>
            {data && (
              <div className="mt-5 flex justify-center">
                <GoogleRatingBadge rating={data.rating} reviewCount={data.reviewCount} size="lg" />
              </div>
            )}
          </div>

          {!data && <p role="status" className="text-center text-gray-600">{isPending ? t("reviews.loading") : t("reviews.unavailable")}</p>}
          {data && data.reviews.length === 0 && <p className="text-center text-gray-600">{t("reviews.noText")}</p>}
          {data && data.reviews.length > 0 && (
            <Carousel
              opts={{ align: "start", containScroll: "trimSnaps" }}
              aria-label={t("reviews.title")}
              tabIndex={data.reviews.length > 1 ? 0 : undefined}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              {data.reviews.length > 1 && (
                <div className={`mb-4 flex justify-end gap-3 ${data.reviews.length === 2 ? "md:hidden" : data.reviews.length === 3 ? "lg:hidden" : ""}`}>
                  <CarouselPrevious className="static h-11 w-11 translate-y-0 disabled:opacity-40" aria-label={t("reviews.previous")} />
                  <CarouselNext className="static h-11 w-11 translate-y-0 disabled:opacity-40" aria-label={t("reviews.next")} />
                </div>
              )}
              <CarouselContent className="items-stretch">
                {data.reviews.map((review, i) => (
                  <CarouselItem key={i} className="basis-[85%] sm:basis-[65%] md:basis-1/2 lg:basis-1/3">
                    <GoogleReviewCard review={review} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          )}
          {data && <a href={data.mapsUrl} target="_blank" rel="noopener noreferrer" className="block text-center mt-6 text-primary font-medium hover:underline">{t("reviews.openGoogle")}</a>}
        </div>
      </section>
    </>
  );
}