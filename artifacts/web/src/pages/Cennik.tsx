import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Phone, Star, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import GoogleReviewCard from "@/components/GoogleReviewCard";
import { googleReviews, GOOGLE_RATING } from "@/data/googleReviews";
import { useLanguage } from "@/contexts/LanguageContext";

const PHONE_NUMBER = "+421 917 240 819";

interface PricingItem {
  name: string;
  price: string;
  img: string;
  badge?: string;
}

interface PricingSection {
  title: string;
  titleKey: string;
  items: PricingItem[];
}

function getGridClasses(count: number): string {
  if (count <= 2) return "grid-cols-2 max-w-lg mx-auto";
  if (count === 3) return "grid-cols-2 sm:grid-cols-3 max-w-3xl mx-auto";
  if (count === 4) return "grid-cols-2 sm:grid-cols-4 max-w-5xl mx-auto";
  if (count <= 6) return "grid-cols-2 sm:grid-cols-3 max-w-5xl mx-auto";
  return "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Cennik() {
  const { t } = useLanguage();

  const pricingSections: PricingSection[] = [
    {
      title: t("pricing.sectionCouches"),
      titleKey: "sectionCouches",
      items: [
        { name: t("pricing.armchair"), price: "20 €", img: "item-kreslo.png" },
        { name: t("pricing.couch2"), price: "30 €", img: "item-sedacka-2m.png" },
        { name: t("pricing.couch3"), price: "40 €", img: "item-sedacka-3m.png", badge: t("pricing.badgeMostPopular") },
        { name: t("pricing.couchL"), price: "50 €", img: "item-sedacka-l.png" },
        { name: t("pricing.couchU"), price: "60 €", img: "item-sedacka-u.png" },
        { name: t("pricing.chair"), price: "5 €", img: "item-stolicka.png" },
      ],
    },
    {
      title: t("pricing.sectionCarpets"),
      titleKey: "sectionCarpets",
      items: [
        { name: t("pricing.carpetShort"), price: "3 € / m²", img: "item-koberec-kratky.png" },
        { name: t("pricing.carpetLong"), price: "4,50 € / m²", img: "item-koberec-dlhy.png" },
      ],
    },
    {
      title: t("pricing.sectionMattresses"),
      titleKey: "sectionMattresses",
      items: [
        { name: t("pricing.mattressSingle"), price: "11 €", img: "item-matrac-1.png" },
        { name: t("pricing.mattressDouble"), price: "22 €", img: "item-matrac-2.png" },
      ],
    },
    {
      title: t("pricing.sectionCars"),
      titleKey: "sectionCars",
      items: [
        { name: t("pricing.carSeats"), price: "50 €", img: "item-auto-sedacky.png" },
        { name: t("pricing.carInterior"), price: "80 €", img: "item-auto-interier.png" },
      ],
    },
    {
      title: t("pricing.sectionWindows"),
      titleKey: "sectionWindows",
      items: [
        { name: t("pricing.window1"), price: "10 €", img: "item-okno-1.png" },
        { name: t("pricing.window2"), price: "12,50 €", img: "item-okno-2.png" },
        { name: t("pricing.window3"), price: "15 €", img: "item-okno-3.png" },
        { name: t("pricing.shopWindow"), price: t("pricing.byAgreement"), img: "item-vyklad.png" },
      ],
    },
  ];

  return (
    <>
      <section className="pt-12 pb-6 bg-gradient-to-b from-accent/40 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-extrabold mb-3"
          >
            {t("pricing.pageTitle")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.2 } }}
            className="text-lg text-gray-700 max-w-2xl mx-auto"
          >
            {t("pricing.pageSubtitle")}
          </motion.p>
        </div>
      </section>

      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {pricingSections.map((section, sIdx) => (
            <div key={sIdx}>
              {sIdx > 0 && <div className="mt-8" />}
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                variants={fadeInUp}
                className="text-xl md:text-2xl font-bold text-center mb-6 text-foreground"
              >
                {section.title}
              </motion.h2>

              <div className={`grid gap-4 md:gap-6 ${section.titleKey === "sectionWindows" ? "grid-cols-2 sm:grid-cols-4 max-w-5xl mx-auto" : getGridClasses(section.items.length)}`}>
                {section.items.map((item, iIdx) => (
                  <motion.div
                    key={iIdx}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-20px" }}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { delay: iIdx * 0.06, duration: 0.4 },
                      },
                    }}
                    className="group"
                  >
                    <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative">
                      {item.badge && (
                        <div className="absolute top-2 right-2 z-10 flex items-center gap-1 bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
                          <Award className="h-3 w-3" />
                          {item.badge}
                        </div>
                      )}
                      <div className="aspect-square overflow-hidden bg-white p-3">
                        <img
                          src={`${import.meta.env.BASE_URL}images/${item.img}`}
                          alt={item.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-3 text-center border-t border-gray-100">
                        <p className="text-sm md:text-base font-medium text-gray-800 mb-0.5 leading-tight">
                          {item.name}
                        </p>
                        <p className="text-lg md:text-xl font-bold text-primary">
                          {item.price}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-center gap-3 py-3 px-4 bg-primary/5 rounded-xl max-w-lg mx-auto">
                <span className="text-sm text-gray-700 font-medium">{t("pricing.interestedInCleaning")}</span>
                <a
                  href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
                  className="text-sm font-bold text-primary hover:underline flex items-center gap-1"
                >
                  <Phone className="h-3.5 w-3.5" />
                  {t("pricing.callUs")}
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-10 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-xl rounded-3xl bg-white overflow-hidden">
            <CardHeader className="bg-primary/5 p-6 border-b">
              <CardTitle className="text-xl text-center">{t("pricing.importantInfo")}</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-3">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">{t("pricing.info1")}</p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">{t("pricing.info2")}</p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">{t("pricing.info3")}</p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">{t("pricing.info4")}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-10 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-6"
          >
            <h2 className="text-xl md:text-2xl font-bold mb-2 flex items-center justify-center gap-2">
              {t("pricing.customersRate")} {GOOGLE_RATING}
              <span className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </span>
              {t("pricing.onGoogle")}
            </h2>
          </motion.div>

          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {googleReviews.slice(0, 3).map((review, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { delay: i * 0.1 } },
                }}
                className="min-w-[300px] flex-1 snap-center"
              >
                <GoogleReviewCard review={review} compact />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-foreground text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t("pricing.ctaTitle")}
            </h2>
            <p className="text-base text-gray-300 mb-8 max-w-2xl mx-auto">
              {t("pricing.ctaSubtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/kontakt">
                <Button
                  size="xl"
                  className="text-lg px-10 py-7 rounded-full shadow-xl shadow-primary/30 hover:scale-105 transition-transform"
                >
                  {t("pricing.ctaButton")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="xl"
                variant="outline"
                className="text-lg px-10 py-7 rounded-full bg-transparent border-white/30 hover:bg-white/10 text-white group"
                asChild
              >
                <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}>
                  <Phone className="mr-2 h-5 w-5 text-primary group-hover:animate-bounce" />
                  {PHONE_NUMBER}
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
