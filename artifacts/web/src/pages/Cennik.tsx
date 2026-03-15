import { motion } from "framer-motion";
import { Link } from "wouter";
import SeoHead from "@/components/SeoHead";
import { ArrowRight, Phone, Star, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import GoogleReviewCard from "@/components/GoogleReviewCard";
import LeadForm from "@/components/LeadForm";
import { googleReviews, GOOGLE_RATING, GOOGLE_REVIEW_COUNT } from "@/data/googleReviews";
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
      <SeoHead page="cennik" />
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
                          loading="lazy"
                          width={300}
                          height={300}
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

      <section className="py-16 bg-gradient-to-br from-accent/40 via-white to-accent/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #0d7577 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-sm font-medium text-gray-600 shadow-sm mb-5">
              <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google recenzie
            </div>
            <div className="flex items-center justify-center gap-4 mb-3">
              <span className="text-6xl font-extrabold text-foreground tracking-tight">{GOOGLE_RATING}</span>
              <div className="flex flex-col items-start gap-1">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-500">{GOOGLE_REVIEW_COUNT} {t("pricing.onGoogle")}</span>
              </div>
            </div>
            <p className="text-base text-gray-600 max-w-md mx-auto">{t("pricing.customersRate")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {googleReviews.slice(0, 3).map((review, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { delay: i * 0.12 } },
                }}
              >
                <GoogleReviewCard review={review} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="kontakt" className="py-16 relative bg-foreground text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
              {t("contactSection.title")}
            </h2>
            <p className="text-base sm:text-lg text-gray-300">
              {t("contactSection.subtitle")}
            </p>
          </div>
          <LeadForm />
        </div>
      </section>

      <section className="py-14 bg-foreground text-white border-t border-white/10">
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
              <Link href="/kontakt" className="w-full sm:w-auto">
                <Button
                  size="xl"
                  className="w-full text-lg px-10 py-7 rounded-full shadow-xl shadow-primary/30 hover:scale-105 transition-transform"
                >
                  {t("pricing.ctaButton")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="xl"
                variant="outline"
                className="w-full sm:w-auto text-lg px-10 py-7 rounded-full bg-transparent border-white/30 hover:bg-white/10 text-white group"
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
