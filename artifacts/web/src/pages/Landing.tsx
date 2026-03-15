import { motion } from "framer-motion";
import { Link } from "wouter";
import SeoHead from "@/components/SeoHead";
import {
  Phone,
  Sofa,
  Droplets,
  Sparkles,
  ShieldCheck,
  Clock,
  Leaf,
  ThumbsUp,
  Star,
  Car,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import LeadForm from "@/components/LeadForm";
import GoogleReviewCard, { GoogleRatingBadge } from "@/components/GoogleReviewCard";
import { googleReviews, GOOGLE_RATING, GOOGLE_REVIEW_COUNT } from "@/data/googleReviews";
import { useLanguage } from "@/contexts/LanguageContext";

const PHONE_NUMBER = "+421 917 240 819";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export default function Landing() {
  const { t } = useLanguage();

  const services = [
    {
      id: "tepovanie-gaucov",
      title: t("services.couchTitle"),
      icon: Sofa,
      desc: t("services.couchDesc"),
      img: "item-sedacka-3m.png",
    },
    {
      id: "tepovanie-kobercov",
      title: t("services.carpetTitle"),
      icon: Sparkles,
      desc: t("services.carpetDesc"),
      img: "item-koberec-kratky.png",
    },
    {
      id: "tepovanie-matracov",
      title: t("services.mattressTitle"),
      icon: ShieldCheck,
      desc: t("services.mattressDesc"),
      img: "item-matrac-1.png",
    },
    {
      id: "tepovanie-aut",
      title: t("services.carTitle"),
      icon: Car,
      desc: t("services.carDesc"),
      img: "item-auto-interier.png",
    },
    {
      id: "umyvanie-okien",
      title: t("services.windowTitle"),
      icon: Droplets,
      desc: t("services.windowDesc"),
      img: "item-okno-2.png",
    },
    {
      id: "hlbkove-cistenie",
      title: t("services.deepCleanTitle"),
      icon: Sparkles,
      desc: t("services.deepCleanDesc"),
      img: "item-sedacka-l.png",
    },
  ];

  const features = [
    { icon: Clock, title: t("features.fastServiceTitle"), desc: t("features.fastServiceDesc") },
    { icon: Leaf, title: t("features.ecoTitle"), desc: t("features.ecoDesc") },
    { icon: Droplets, title: t("features.fastDryTitle"), desc: t("features.fastDryDesc") },
    { icon: ThumbsUp, title: t("features.satisfactionTitle"), desc: t("features.satisfactionDesc") },
  ];

  const steps = [
    { step: "1", title: t("howItWorks.step1Title"), desc: t("howItWorks.step1Desc") },
    { step: "2", title: t("howItWorks.step2Title"), desc: t("howItWorks.step2Desc") },
    { step: "3", title: t("howItWorks.step3Title"), desc: t("howItWorks.step3Desc") },
  ];

  const scrollToContact = () => {
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <SeoHead page="landing" />
      <section className="relative pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent z-10" />
          <img
            src={`${import.meta.env.BASE_URL}images/hero-real.jpeg`}
            alt={t("hero.heroAlt")}
            width={1200}
            height={800}
            className="w-full h-full object-cover scale-x-[-1]"
            style={{ objectPosition: '40% 0%' }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-2xl"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-4 border border-primary/20"
            >
              {t("hero.badge")}
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-foreground leading-[1.1] mb-5"
            >
              {t("hero.titleLine1")} <br />
              <span className="text-gradient">{t("hero.titleLine2")}</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl md:text-2xl text-gray-800 font-medium mb-8 leading-relaxed max-w-xl"
            >
              {t("hero.subtitle")}
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3">
              <Button
                size="xl"
                onClick={scrollToContact}
                className="text-base sm:text-lg px-6 sm:px-8 py-6 sm:py-7 rounded-full shadow-xl shadow-primary/30 hover:scale-105 transition-transform duration-300"
              >
                {t("hero.ctaOrder")}
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="text-base sm:text-lg px-6 sm:px-8 py-6 sm:py-7 rounded-full bg-white hover:bg-gray-50 text-foreground border-border group"
                asChild
              >
                <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}>
                  <Phone className="mr-2 h-5 w-5 text-primary group-hover:animate-bounce" />
                  {t("hero.ctaCall")}
                </a>
              </Button>
            </motion.div>
            <motion.div variants={fadeInUp} className="mt-5">
              <GoogleRatingBadge rating={GOOGLE_RATING} reviewCount={GOOGLE_REVIEW_COUNT} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white relative z-20 -mt-10 mx-4 sm:mx-8 rounded-3xl shadow-xl shadow-black/5 border border-border/50 max-w-7xl lg:mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 sm:px-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              className="flex flex-col items-center text-center group"
            >
              <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-3 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <feature.icon className="h-7 w-7 sm:h-8 sm:w-8" />
              </div>
              <h3 className="font-bold text-sm sm:text-lg mb-1">{feature.title}</h3>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-14 bg-gray-50/50" id="sluzby">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{t("services.title")}</h2>
            <p className="text-base sm:text-lg text-gray-700">
              {t("services.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } },
                }}
              >
                <Card className="h-full border-0 shadow-md hover:shadow-xl transition-shadow duration-300 rounded-3xl overflow-hidden group bg-white">
                  <div className="h-44 sm:h-52 overflow-hidden bg-gray-50 p-4">
                    <img
                      src={`${import.meta.env.BASE_URL}images/${service.img}`}
                      alt={service.title}
                      loading="lazy"
                      width={400}
                      height={400}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-accent flex items-center justify-center mb-3 -mt-10 relative z-10 border-4 border-white shadow-md group-hover:scale-110 transition-transform">
                      <service.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground">{service.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/cennik">
              <Button size="lg" variant="outline" className="rounded-full text-base sm:text-lg px-8 group">
                {t("services.viewPricing")}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="lg:w-1/2"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={`${import.meta.env.BASE_URL}images/hero-real-2.jpg`}
                  alt={t("howItWorks.workAlt")}
                  loading="lazy"
                  width={600}
                  height={450}
                  className="w-full h-[350px] sm:h-[450px] object-cover"
                />
              </div>
            </motion.div>

            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-bold mb-8">{t("howItWorks.title")}</h2>
              <div className="space-y-8">
                {steps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      visible: { opacity: 1, x: 0, transition: { delay: i * 0.2 } },
                    }}
                    className="flex gap-5"
                  >
                    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary text-white flex items-center justify-center font-display font-bold text-xl sm:text-2xl shadow-lg shadow-primary/30">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold mb-1">{step.title}</h3>
                      <p className="text-base sm:text-lg text-muted-foreground">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="recenzie" className="py-16 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-3">{t("reviews.title")}</h2>
            <p className="text-base sm:text-lg text-gray-700">
              {t("reviews.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {googleReviews.slice(0, 6).map((review, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1, transition: { delay: i * 0.1 } },
                }}
              >
                <GoogleReviewCard review={review} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-3 bg-gray-50 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-gray-600">
            <span className="font-medium">{t("reviews.customersCount")}</span>
            <span className="text-gray-300">·</span>
            <span className="flex items-center gap-1">
              {GOOGLE_RATING}
              <span className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </span>
              {t("reviews.onGoogle")}
            </span>
            <span className="text-gray-300">·</span>
            <button type="button" className="text-primary font-medium cursor-pointer hover:underline bg-transparent border-none p-0" onClick={() => document.getElementById('recenzie')?.scrollIntoView({ behavior: 'smooth' })}>
              {t("reviews.showReviews")}
            </button>
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
    </>
  );
}
