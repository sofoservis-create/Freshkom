import { motion } from "framer-motion";
import { Phone, Mail, Clock, MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import LeadForm from "@/components/LeadForm";
import GoogleReviewCard from "@/components/GoogleReviewCard";
import { googleReviews } from "@/data/googleReviews";

const PHONE_NUMBER = "+421 917 240 819";
const EMAIL = "freshkomsluzby@gmail.com";

const contactInfo = [
  {
    icon: Phone,
    title: "Zavolajte nám",
    value: PHONE_NUMBER,
    href: `tel:${PHONE_NUMBER.replace(/\s/g, "")}`,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    accent: "border-green-400",
    label: "Voláme PO–SOB 7:00–21:00",
  },
  {
    icon: Mail,
    title: "Napíšte nám",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    accent: "border-blue-400",
    label: "Odpovieme do 24 hodín",
  },
  {
    icon: Clock,
    title: "Pracovná doba",
    value: "PO–SOB 7:00–21:00",
    href: null,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    accent: "border-amber-400",
    label: "Každý deň okrem nedele",
  },
  {
    icon: MapPin,
    title: "Oblasť pôsobenia",
    value: "Komárno a okolie",
    href: null,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    accent: "border-violet-400",
    label: "Dochádzame do 30 km",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Kontakt() {
  return (
    <>
      <section className="pt-12 pb-6 bg-gradient-to-b from-accent/40 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-4xl font-extrabold mb-3"
          >
            Kontaktujte nás
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.2 } }}
            className="text-lg text-gray-700 max-w-2xl mx-auto"
          >
            Radi vám odpovieme na všetky otázky. Zavolajte nám alebo vyplňte formulár.
          </motion.p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-12">
            {contactInfo.map((info, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { delay: i * 0.08 } },
                }}
                className="h-full"
              >
                {info.href ? (
                  <a
                    href={info.href}
                    className={`group flex items-center gap-4 p-5 bg-white rounded-2xl shadow-md border-l-4 ${info.accent} hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 h-full`}
                  >
                    <div className={`shrink-0 h-14 w-14 rounded-2xl ${info.iconBg} ${info.iconColor} flex items-center justify-center`}>
                      <info.icon className="h-7 w-7" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">{info.title}</p>
                      <p className="font-bold text-sm sm:text-base text-gray-900 break-all leading-snug">{info.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{info.label}</p>
                    </div>
                    <ArrowRight className="shrink-0 h-4 w-4 text-muted-foreground group-hover:text-gray-600 group-hover:translate-x-0.5 transition-all" />
                  </a>
                ) : (
                  <div className={`flex items-center gap-4 p-5 bg-white rounded-2xl shadow-md border-l-4 ${info.accent} h-full`}>
                    <div className={`shrink-0 h-14 w-14 rounded-2xl ${info.iconBg} ${info.iconColor} flex items-center justify-center`}>
                      <info.icon className="h-7 w-7" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">{info.title}</p>
                      <p className="font-bold text-sm sm:text-base text-gray-900 leading-snug">{info.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{info.label}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Nezáväzný dopyt</h2>
              <p className="text-base sm:text-lg text-gray-700 mb-6">
                Vyplňte formulár a ozveme sa vám do 24 hodín s cenovou ponukou.
              </p>
              <LeadForm />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Čo hovoria naši klienti</h2>
                <p className="text-base sm:text-lg text-gray-700 mb-4">
                  Recenzie od spokojných zákazníkov na Google.
                </p>
                <div className="space-y-3">
                  {googleReviews.slice(0, 3).map((review, i) => (
                    <GoogleReviewCard key={i} review={review} compact />
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Kde nás nájdete</h2>
                <p className="text-base sm:text-lg text-gray-700 mb-4">
                  Pôsobíme v celom Komárne a okolí do 30 km. Príplatok za dopravu mimo Komárna je individuálny.
                </p>
              </div>

              <Card className="border-0 shadow-lg rounded-3xl bg-primary/5 overflow-hidden">
                <CardContent className="p-6 text-center">
                  <MapPin className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="text-lg font-bold mb-1.5">Komárno a okolie</h3>
                  <p className="text-muted-foreground text-sm mb-1">Pôsobíme v celom meste Komárno a v okruhu do 30 km.</p>
                  <p className="text-muted-foreground text-sm">Nové Zámky, Hurbanovo, Kolárovo, Štúrovo a ďalšie.</p>
                </CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://www.facebook.com/profile.php?id=61585033404394"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-3 p-3.5 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-colors group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 fill-blue-600">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span className="font-semibold text-blue-700 group-hover:underline">Facebook</span>
                </a>
                <a
                  href="https://www.instagram.com/fresh_kom/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-3 p-3.5 bg-pink-50 rounded-2xl hover:bg-pink-100 transition-colors group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 fill-pink-600">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913a5.885 5.885 0 001.384 2.126A5.868 5.868 0 004.14 23.37c.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558a5.898 5.898 0 002.126-1.384 5.86 5.86 0 001.384-2.126c.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913a5.89 5.89 0 00-1.384-2.126A5.847 5.847 0 0019.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227a3.81 3.81 0 01-.899 1.382 3.744 3.744 0 01-1.38.896c-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421a3.716 3.716 0 01-1.379-.899 3.644 3.644 0 01-.9-1.38c-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 01-2.88 0 1.44 1.44 0 012.88 0z" />
                  </svg>
                  <span className="font-semibold text-pink-700 group-hover:underline">Instagram</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
