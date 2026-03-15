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
      cennikHref: "/cennik#tepovanie-gaucov",
      title: t("services.couchTitle"),
      icon: Sofa,
      desc: t("services.couchDesc"),
      img: "item-sedacka-3m.png",
    },
    {
      id: "tepovanie-kobercov",
      cennikHref: "/cennik#tepovanie-kobercov",
      title: t("services.carpetTitle"),
      icon: Sparkles,
      desc: t("services.carpetDesc"),
      img: "item-koberec-kratky.png",
    },
    {
      id: "tepovanie-matracov",
      cennikHref: "/cennik#tepovanie-matracov",
      title: t("services.mattressTitle"),
      icon: ShieldCheck,
      desc: t("services.mattressDesc"),
      img: "item-matrac-1.png",
    },
    {
      id: "tepovanie-aut",
      cennikHref: "/cennik#tepovanie-aut",
      title: t("services.carTitle"),
      icon: Car,
      desc: t("services.carDesc"),
      img: "item-auto-interier.png",
    },
    {
      id: "umyvanie-okien",
      cennikHref: "/cennik#umyvanie-okien",
      title: t("services.windowTitle"),
      icon: Droplets,
      desc: t("services.windowDesc"),
      img: "item-okno-2.png",
    },
    {
      id: "hlbkove-cistenie",
      cennikHref: "/cennik",
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
            style={{ objectPosition: '35% 0%' }}
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
              <GoogleRatingBadge rating={GOOGLE_RATING} reviewCount={GOOGLE_REVIEW_COUNT} size="lg" />
            </motion.div>
            <motion.div variants={fadeInUp} className="mt-3">
              <a
                href="https://www.instagram.com/fresh_kom/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 fill-current flex-shrink-0"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913a5.885 5.885 0 001.384 2.126A5.868 5.868 0 004.14 23.37c.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558a5.898 5.898 0 002.126-1.384 5.86 5.86 0 001.384-2.126c.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913a5.89 5.89 0 00-1.384-2.126A5.847 5.847 0 0019.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227a3.81 3.81 0 01-.899 1.382 3.744 3.744 0 01-1.38.896c-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421a3.716 3.716 0 01-1.379-.899 3.644 3.644 0 01-.9-1.38c-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 01-2.88 0 1.44 1.44 0 012.88 0z"/></svg>
                {t("social.instagramCta")}
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
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
                <Link href={service.cennikHref} className="block h-full">
                  <Card className="h-full border-0 shadow-md hover:shadow-xl transition-shadow duration-300 rounded-3xl overflow-hidden group bg-white cursor-pointer">
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
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                        <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1.5" />
                      </div>
                      <p className="text-sm sm:text-base text-muted-foreground">{service.desc}</p>
                    </CardContent>
                  </Card>
                </Link>
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

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-center gap-10 md:gap-16 bg-accent/40 rounded-3xl px-8 py-10 md:px-14 md:py-12 border border-border/40"
          >
            <div className="flex-shrink-0">
              <img
                src={`${import.meta.env.BASE_URL}images/attila.jpg`}
                alt="Attila Sébestyen – zakladateľ Freshkom, tepovanie a umývanie okien Komárno"
                className="w-44 h-44 md:w-56 md:h-56 rounded-full object-cover object-top shadow-xl ring-4 ring-primary/20"
              />
            </div>
            <div className="text-center md:text-left">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3">
                {t("owner.tag")}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{t("owner.name")}</h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-xl mb-7">
                {t("owner.bio")}
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <a
                  href="https://www.instagram.com/sebestyen.atti/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white text-sm font-semibold shadow-md hover:scale-105 active:scale-95 transition-transform"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 fill-current flex-shrink-0"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913a5.885 5.885 0 001.384 2.126A5.868 5.868 0 004.14 23.37c.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558a5.898 5.898 0 002.126-1.384 5.86 5.86 0 001.384-2.126c.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913a5.89 5.89 0 00-1.384-2.126A5.847 5.847 0 0019.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227a3.81 3.81 0 01-.899 1.382 3.744 3.744 0 01-1.38.896c-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421a3.716 3.716 0 01-1.379-.899 3.644 3.644 0 01-.9-1.38c-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 01-2.88 0 1.44 1.44 0 012.88 0z"/></svg>
                  {t("owner.followInstagram")}
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61573024706738"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1877F2] text-white text-sm font-semibold shadow-md hover:scale-105 active:scale-95 transition-transform"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 fill-current flex-shrink-0"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  {t("owner.followFacebook")}
                </a>
              </div>
              <div className="mt-5 pt-4 border-t border-border/40 flex flex-col items-center md:items-start gap-2">
                <span className="text-xs text-gray-400">{t("social.freshkomSocials")}</span>
                <div className="flex gap-2">
                  <a
                    href="https://www.facebook.com/profile.php?id=61585033404394"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Freshkom Facebook"
                    className="h-9 w-9 rounded-full bg-gray-100 hover:bg-[#1877F2] hover:text-white text-gray-600 flex items-center justify-center transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a
                    href="https://www.instagram.com/fresh_kom/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Freshkom Instagram"
                    className="h-9 w-9 rounded-full bg-gray-100 hover:bg-gradient-to-br hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045] hover:text-white text-gray-600 flex items-center justify-center transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913a5.885 5.885 0 001.384 2.126A5.868 5.868 0 004.14 23.37c.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558a5.898 5.898 0 002.126-1.384 5.86 5.86 0 001.384-2.126c.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913a5.89 5.89 0 00-1.384-2.126A5.847 5.847 0 0019.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227a3.81 3.81 0 01-.899 1.382 3.744 3.744 0 01-1.38.896c-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421a3.716 3.716 0 01-1.379-.899 3.644 3.644 0 01-.9-1.38c-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 01-2.88 0 1.44 1.44 0 012.88 0z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
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
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-gray-400 text-sm mb-4">{t("social.followFreshkom")}</p>
            <div className="flex justify-center gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61585033404394"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="h-11 w-11 rounded-full bg-white/10 hover:bg-[#1877F2] flex items-center justify-center transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a
                href="https://www.instagram.com/fresh_kom/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="h-11 w-11 rounded-full bg-white/10 hover:bg-gradient-to-br hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045] flex items-center justify-center transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913a5.885 5.885 0 001.384 2.126A5.868 5.868 0 004.14 23.37c.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558a5.898 5.898 0 002.126-1.384 5.86 5.86 0 001.384-2.126c.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913a5.89 5.89 0 00-1.384-2.126A5.847 5.847 0 0019.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227a3.81 3.81 0 01-.899 1.382 3.744 3.744 0 01-1.38.896c-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421a3.716 3.716 0 01-1.379-.899 3.644 3.644 0 01-.9-1.38c-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 01-2.88 0 1.44 1.44 0 012.88 0z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
