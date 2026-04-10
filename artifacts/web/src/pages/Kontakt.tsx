import { motion } from "framer-motion";
import { Phone, Mail, Clock, MapPin, ArrowRight, Shield, CheckCircle } from "lucide-react";
import SeoHead from "@/components/SeoHead";
import { Card, CardContent } from "@/components/ui/card";
import LeadForm from "@/components/LeadForm";
import GoogleReviewCard, { GoogleRatingBadge } from "@/components/GoogleReviewCard";
import { googleReviews, GOOGLE_RATING, GOOGLE_REVIEW_COUNT } from "@/data/googleReviews";
import { useLanguage } from "@/contexts/LanguageContext";

const PHONE_NUMBER = "+421 909 159 609";
const EMAIL = "info@freshkom.sk";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Kontakt() {
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: Phone,
      title: t("kontakt.callUs"),
      value: PHONE_NUMBER,
      href: `tel:${PHONE_NUMBER.replace(/\s/g, "")}`,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      accent: "border-green-400",
      label: t("kontakt.callLabel"),
    },
    {
      icon: Mail,
      title: t("kontakt.writeUs"),
      value: EMAIL,
      href: `mailto:${EMAIL}`,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      accent: "border-blue-400",
      label: t("kontakt.writeLabel"),
    },
    {
      icon: Clock,
      title: t("kontakt.workingHours"),
      value: t("kontakt.workingHoursValue"),
      href: null,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      accent: "border-amber-400",
      label: t("kontakt.workingHoursLabel"),
    },
    {
      icon: MapPin,
      title: t("kontakt.area"),
      value: t("kontakt.areaValue"),
      href: null,
      iconBg: "bg-violet-100",
      iconColor: "text-violet-600",
      accent: "border-violet-400",
      label: t("kontakt.areaLabel"),
    },
  ];

  const trustPoints = [
    t("kontakt.trustResponse"),
    t("kontakt.trustFreeQuote"),
    t("kontakt.trustNoObligation"),
  ];

  return (
    <>
      <SeoHead page="kontakt" />

      {/* Hero */}
      <section className="pt-12 pb-8 bg-gradient-to-b from-accent/40 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3"
          >
            <GoogleRatingBadge rating={GOOGLE_RATING} reviewCount={GOOGLE_REVIEW_COUNT} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 mt-4"
          >
            {t("kontakt.pageTitle")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.2 } }}
            className="text-lg text-gray-700 max-w-2xl mx-auto"
          >
            {t("kontakt.pageSubtitle")}
          </motion.p>
        </div>
      </section>

      {/* Contact info bar */}
      <section className="py-6 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {contactInfo.map((info, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { delay: i * 0.07 } },
                }}
                className="h-full"
              >
                {info.href ? (
                  <a
                    href={info.href}
                    className={`group flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 border-l-4 ${info.accent} hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 h-full`}
                  >
                    <div className={`shrink-0 h-11 w-11 rounded-xl ${info.iconBg} ${info.iconColor} flex items-center justify-center`}>
                      <info.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">{info.title}</p>
                      <p className="font-bold text-sm text-gray-900 break-all leading-snug">{info.value}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{info.label}</p>
                    </div>
                    <ArrowRight className="shrink-0 h-4 w-4 text-muted-foreground group-hover:text-gray-600 group-hover:translate-x-0.5 transition-all" />
                  </a>
                ) : (
                  <div className={`flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 border-l-4 ${info.accent} h-full`}>
                    <div className={`shrink-0 h-11 w-11 rounded-xl ${info.iconBg} ${info.iconColor} flex items-center justify-center`}>
                      <info.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">{info.title}</p>
                      <p className="font-bold text-sm text-gray-900 leading-snug">{info.value}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{info.label}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main: Form + Social proof side by side */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10 xl:gap-14 items-start">

            {/* LEFT — Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{t("kontakt.formTitle")}</h2>
              <p className="text-base sm:text-lg text-gray-600 mb-5">
                {t("kontakt.formSubtitle")}
              </p>
              {/* Trust micro-signals above form */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                {trustPoints.map((point, i) => (
                  <span key={i} className="flex items-center gap-1.5 text-xs sm:text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl px-2 sm:px-3 py-2 font-medium leading-tight h-full min-w-0 break-all">
                    <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    {point}
                  </span>
                ))}
              </div>
              <LeadForm />
            </motion.div>

            {/* RIGHT — Social proof */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ ...fadeInUp, visible: { ...fadeInUp.visible, transition: { duration: 0.5, delay: 0.15, ease: "easeOut" } } }}
              className="space-y-5 lg:sticky lg:top-6"
            >
              {/* Google rating summary */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-3xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="h-5 w-5 text-amber-600 flex-shrink-0" />
                  <p className="font-semibold text-gray-900 text-sm">{t("kontakt.reviewsTitle")}</p>
                </div>
                <div className="flex items-end gap-3 mb-1">
                  <span className="text-5xl font-extrabold text-gray-900 leading-none">{GOOGLE_RATING}</span>
                  <div className="pb-1">
                    <div className="flex gap-0.5 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 fill-amber-400 text-amber-400" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">{t("reviews.ratingsLabel")}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">{t("kontakt.reviewsSubtitle")}</p>
              </div>

              {/* Review cards */}
              <div className="space-y-3">
                {googleReviews.slice(0, 3).map((review, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                  >
                    <GoogleReviewCard review={review} compact />
                  </motion.div>
                ))}
              </div>

              {/* Service area */}
              <Card className="border border-violet-100 shadow-sm rounded-2xl bg-violet-50/50 overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-violet-100 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-4 w-4 text-violet-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-900">{t("kontakt.whereToFind")}</p>
                      <p className="text-xs text-gray-600 mt-0.5">{t("kontakt.mapDesc1")}</p>
                      <p className="text-xs text-gray-500">{t("kontakt.mapDesc2")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social links */}
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/profile.php?id=61585033404394"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-3 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-colors group border border-blue-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-blue-600">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span className="font-semibold text-sm text-blue-700">Facebook</span>
                </a>
                <a
                  href="https://www.instagram.com/fresh_kom/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-3 bg-pink-50 rounded-2xl hover:bg-pink-100 transition-colors group border border-pink-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-pink-600">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913a5.885 5.885 0 001.384 2.126A5.868 5.868 0 004.14 23.37c.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558a5.898 5.898 0 002.126-1.384 5.86 5.86 0 001.384-2.126c.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913a5.89 5.89 0 00-1.384-2.126A5.847 5.847 0 0019.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227a3.81 3.81 0 01-.899 1.382 3.744 3.744 0 01-1.38.896c-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421a3.716 3.716 0 01-1.379-.899 3.644 3.644 0 01-.9-1.38c-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 01-2.88 0 1.44 1.44 0 012.88 0z" />
                  </svg>
                  <span className="font-semibold text-sm text-pink-700">Instagram</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
