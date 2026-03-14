import { motion } from "framer-motion";
import { Link } from "wouter";
import { Check, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PHONE_NUMBER = "+421 917 240 819";

const pricingCategories = [
  {
    title: "Sedačky a nábytok",
    img: "service-sofa.png",
    color: "bg-primary",
    items: [
      { name: "Kreslo", price: "20 €" },
      { name: "2-miestna sedačka", price: "30 €" },
      { name: "3-miestna sedačka", price: "40 €" },
      { name: "L-ková sedačka", price: "50 €" },
      { name: "U-čková sedačka", price: "60 €" },
      { name: "Stolička", price: "5 €" },
    ],
  },
  {
    title: "Koberce",
    img: "service-carpet.png",
    color: "bg-blue-500",
    items: [
      { name: "Krátkovlasý koberec", price: "3 € / m²" },
      { name: "Dlhovlasý koberec", price: "4,50 € / m²" },
    ],
  },
  {
    title: "Matrace",
    img: "service-mattress.png",
    color: "bg-emerald-500",
    items: [
      { name: "Jednolôžkový matrac (1 strana)", price: "11 €" },
      { name: "Dvojlôžkový matrac (1 strana)", price: "22 €" },
    ],
  },
  {
    title: "Tepovanie áut",
    img: "service-car.png",
    color: "bg-violet-500",
    items: [
      { name: "Sedačky", price: "50 €" },
      { name: "Celý interiér", price: "80 €" },
    ],
  },
  {
    title: "Umývanie okien",
    img: "service-windows.png",
    color: "bg-sky-500",
    items: [
      { name: "Jednokrídlové okno", price: "10 €" },
      { name: "Dvojkrídlové okno", price: "12,50 €" },
      { name: "Trojkrídlové okno", price: "15 €" },
      { name: "Výklad", price: "Dohodou" },
    ],
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Cennik() {
  return (
    <>
      <section className="pt-20 pb-16 bg-gradient-to-b from-accent/40 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold mb-6"
          >
            Cenník služieb
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.2 } }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Transparentné ceny bez skrytých poplatkov. Všetky ceny sú konečné vrátane dopravy v Komárne.
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricingCategories.map((cat, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } },
                }}
              >
                <Card className="h-full border-0 shadow-lg rounded-3xl overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                  <div className="h-44 overflow-hidden relative">
                    <img
                      src={`${import.meta.env.BASE_URL}images/${cat.img}`}
                      alt={cat.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 ${cat.color} opacity-40 mix-blend-multiply`} />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60">
                      <h3 className="text-xl font-bold text-white">{cat.title}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <ul className="divide-y divide-gray-100">
                      {cat.items.map((item, j) => (
                        <li key={j} className="flex items-center justify-between py-3">
                          <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-primary flex-shrink-0" />
                            <span className="text-gray-700">{item.name}</span>
                          </div>
                          <span className="font-bold text-foreground whitespace-nowrap ml-3">{item.price}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-xl rounded-3xl bg-white overflow-hidden">
            <CardHeader className="bg-primary/5 p-8 border-b">
              <CardTitle className="text-2xl text-center">Dôležité informácie</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-4">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">Ceny zahŕňajú dopravu v Komárne a blízkom okolí.</p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">Pri extrémne znečistených povrchoch môže byť cena upravená individuálne.</p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">Používame profesionálne ekologické čistiace prostriedky.</p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">Pri väčšom objeme je možná zľava — neváhajte sa spýtať!</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 bg-foreground text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Máte záujem? Ozvite sa nám!
            </h2>
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
              Kontaktujte nás telefonicky alebo nám zanechajte dopyt. Radi vám pripravíme nezáväznú ponuku.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/kontakt">
                <Button
                  size="xl"
                  className="text-lg px-10 py-7 rounded-full shadow-xl shadow-primary/30 hover:scale-105 transition-transform"
                >
                  Napíšte nám dopyt
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
