import { motion } from "framer-motion";
import { Link } from "wouter";
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

const PHONE_NUMBER = "+421 917 240 819";

const services = [
  {
    id: "tepovanie-gaucov",
    title: "Tepovanie gaučov a sedačiek",
    icon: Sofa,
    desc: "Hĺbkové čistenie a oživenie farieb vášho obľúbeného miesta na oddych.",
    img: "item-sedacka-3m.png",
  },
  {
    id: "tepovanie-kobercov",
    title: "Tepovanie kobercov",
    icon: Sparkles,
    desc: "Odstránenie zažratej špiny, roztočov a alergénov z kobercov všetkých druhov.",
    img: "item-koberec-kratky.png",
  },
  {
    id: "tepovanie-matracov",
    title: "Tepovanie matracov",
    icon: ShieldCheck,
    desc: "Pre zdravý spánok bez prachu, potu a nepríjemných pachov.",
    img: "item-matrac-1.png",
  },
  {
    id: "tepovanie-aut",
    title: "Tepovanie áut",
    icon: Car,
    desc: "Kompletné vyčistenie sedačiek a celého interiéru vozidla.",
    img: "item-auto-interier.png",
  },
  {
    id: "umyvanie-okien",
    title: "Umývanie okien a výkladov",
    icon: Droplets,
    desc: "Žiarivo čisté okná bez šmúh pre domácnosti aj firmy.",
    img: "item-okno-2.png",
  },
  {
    id: "hlbkove-cistenie",
    title: "Hĺbkové čistenie",
    icon: Sparkles,
    desc: "Kompletný servis a detailné vyčistenie extrémne znečistených povrchov.",
    img: "item-sedacka-l.png",
  },
];

const features = [
  { icon: Clock, title: "Rýchly servis", desc: "Prídeme k vám do 48 hodín od objednania." },
  { icon: Leaf, title: "Ekologické prostriedky", desc: "Šetrné k prírode, bezpečné pre deti a zvieratá." },
  { icon: Droplets, title: "Rýchle schnutie", desc: "Vďaka silným extraktorom povrchy rýchlo schnú." },
  { icon: ThumbsUp, title: "Spokojnosť zaručená", desc: "Stovky spokojných zákazníkov v Komárne a okolí." },
];

const steps = [
  { step: "1", title: "Kontaktujte nás", desc: "Zavolajte nám alebo vyplňte krátky formulár na webe." },
  { step: "2", title: "Naplánujeme termín", desc: "Dohodneme si čas, ktorý vám bude najviac vyhovovať." },
  { step: "3", title: "Dokonalé výsledky", desc: "Prídeme, vyčistíme a vy si užívate čistý domov." },
];

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
  const scrollToContact = () => {
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section className="relative pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent z-10" />
          <img
            src={`${import.meta.env.BASE_URL}images/hero-real.jpeg`}
            alt="Freshkom technik pri tepovaní sedačky"
            className="w-full h-full object-cover object-top scale-x-[-1]"
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
              Komárno a okolie
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-foreground leading-[1.1] mb-5"
            >
              Čisté domovy, <br />
              <span className="text-gradient">spokojné rodiny</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl md:text-2xl text-gray-800 font-medium mb-8 leading-relaxed max-w-xl"
            >
              Profesionálne tepovanie a čistenie v Komárne a okolí. Rýchlo, dôkladne a s
              garanciou najvyššej kvality.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3">
              <Button
                size="xl"
                onClick={scrollToContact}
                className="text-base sm:text-lg px-6 sm:px-8 py-6 sm:py-7 rounded-full shadow-xl shadow-primary/30 hover:scale-105 transition-transform duration-300"
              >
                Objednajte teraz — je to zadarmo
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="text-base sm:text-lg px-6 sm:px-8 py-6 sm:py-7 rounded-full bg-white hover:bg-gray-50 text-foreground border-border group"
                asChild
              >
                <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}>
                  <Phone className="mr-2 h-5 w-5 text-primary group-hover:animate-bounce" />
                  Zavolajte nám
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
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Naše Služby</h2>
            <p className="text-base sm:text-lg text-gray-700">
              Špecializujeme sa na hĺbkové čistenie, ktoré zbaví váš nábytok škvŕn, zápachov a
              neviditeľných alergénov.
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
                Zobraziť kompletný cenník
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
                  alt="Freshkom pri práci"
                  className="w-full h-[350px] sm:h-[450px] object-cover"
                />
              </div>
            </motion.div>

            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-bold mb-8">Ako to funguje?</h2>
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
            <h2 className="text-3xl md:text-5xl font-bold mb-3">Čo o nás hovoria klienti</h2>
            <p className="text-base sm:text-lg text-gray-700">
              Skutočné recenzie od skutočných zákazníkov na Google.
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
            <span className="font-medium">Viac ako 40 spokojných zákazníkov</span>
            <span className="text-gray-300">·</span>
            <span className="flex items-center gap-1">
              {GOOGLE_RATING}
              <span className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </span>
              na Google
            </span>
            <span className="text-gray-300">·</span>
            <button type="button" className="text-primary font-medium cursor-pointer hover:underline bg-transparent border-none p-0" onClick={() => document.getElementById('recenzie')?.scrollIntoView({ behavior: 'smooth' })}>
              Zobraziť recenzie
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
              Získajte bezplatnú cenovú ponuku
            </h2>
            <p className="text-base sm:text-lg text-gray-300">
              Vyplňte formulár nižšie a my sa vám ozveme s nezáväznou ponukou.
            </p>
          </div>
          <LeadForm />
        </div>
      </section>
    </>
  );
}
