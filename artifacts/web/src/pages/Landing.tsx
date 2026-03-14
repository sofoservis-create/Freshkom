import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
  CheckCircle2,
  Menu,
  X
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLeadSubmission } from "@/hooks/use-leads";

const PHONE_NUMBER = "+421 900 123 456";

// Match the OpenAPI schema exactly
const leadSchema = z.object({
  name: z.string().min(2, "Meno musí obsahovať aspoň 2 znaky"),
  phone: z.string().min(9, "Zadajte platné telefónne číslo"),
  email: z.string().email("Zadajte platný email").optional().or(z.literal("")),
  service: z.enum([
    "tepovanie-gaucov",
    "tepovanie-kobercov",
    "tepovanie-matracov",
    "cistenie-caluneneho-nabytku",
    "umyvanie-okien",
    "hlbkove-cistenie",
    "ine"
  ], {
    required_error: "Prosím, vyberte druh služby",
  }),
  message: z.string().optional(),
});

type LeadFormValues = z.infer<typeof leadSchema>;

const services = [
  { id: "tepovanie-gaucov", title: "Tepovanie gaučov a sedačiek", icon: Sofa, desc: "Hĺbkové čistenie a oživenie farieb vášho obľúbeného miesta na oddych." },
  { id: "tepovanie-kobercov", title: "Tepovanie kobercov", icon: Sparkles, desc: "Odstránenie zažratej špiny, roztočov a alergénov z kobercov všetkých druhov." },
  { id: "tepovanie-matracov", title: "Tepovanie matracov", icon: ShieldCheck, desc: "Pre zdravý spánok bez prachu, potu a nepríjemných pachov." },
  { id: "cistenie-caluneneho-nabytku", title: "Čistenie čalúneného nábytku", icon: Sofa, desc: "Šetrné čistenie kresiel, stoličiek a taburetiek s dôrazom na materiál." },
  { id: "umyvanie-okien", title: "Umývanie okien a výkladov", icon: Droplets, desc: "Žiarivo čisté okná bez šmúh pre domácnosti aj firmy." },
  { id: "hlbkove-cistenie", title: "Hĺbkové čistenie", icon: Sparkles, desc: "Kompletný servis a detailné vyčistenie extrémne znečistených povrchov." },
];

const features = [
  { icon: Clock, title: "10+ rokov skúseností", desc: "Sme profesionáli v tom, čo robíme." },
  { icon: Leaf, title: "Ekologické prostriedky", desc: "Šetrné k prírode, bezpečné pre deti a zvieratá." },
  { icon: Droplets, title: "Rýchle schnutie", desc: "Vďaka silným extraktorom povrchy rýchlo schnú." },
  { icon: ThumbsUp, title: "Spokojnosť zaručená", desc: "Stovky spokojných zákazníkov v Komárne." },
];

const steps = [
  { step: "1", title: "Kontaktujte nás", desc: "Zavolajte nám alebo vyplňte krátky formulár na webe." },
  { step: "2", title: "Naplánujeme termín", desc: "Dohodneme si čas, ktorý vám bude najviac vyhovovať." },
  { step: "3", title: "Dokonalé výsledky", desc: "Prídeme, vyčistíme a vy si užívate čistý domov." },
];

const testimonials = [
  { name: "Jana Nováková", text: "Gauč po tepovaní vyzerá ako nový! Zmizli aj staré fľaky od kávy. Určite odporúčam, skvelá komunikácia a prístup.", rating: 5 },
  { name: "Peter Kováč", text: "Potreboval som narýchlo vyčistiť koberce pred sťahovaním. Páni z Freshkom prišli načas a práca bola odvedená na 100%.", rating: 5 },
  { name: "Katarína Tóthová", text: "Umývanie okien na našom rodinnom dome prebehlo bleskovo a bez jedinej šmuhy. Veľká vďaka!", rating: 5 },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { mutate: submitLead, isPending } = useLeadSubmission();

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: LeadFormValues) => {
    submitLead({ data }, {
      onSuccess: () => {
        form.reset();
      }
    });
  };

  const scrollToContact = () => {
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplets className="h-8 w-8 text-primary" />
            <span className="font-display font-bold text-2xl tracking-tight text-foreground">Freshkom</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-2 text-foreground font-medium">
              <Phone className="h-5 w-5 text-primary" />
              <a href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} className="hover:text-primary transition-colors">
                {PHONE_NUMBER}
              </a>
            </div>
            <Button size="lg" onClick={scrollToContact} className="rounded-full shadow-lg shadow-primary/25 font-semibold">
              Získať cenovú ponuku
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden p-2 text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b shadow-lg py-4 px-4 flex flex-col gap-4">
            <a href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} className="flex items-center gap-3 text-lg font-medium p-2">
              <Phone className="h-5 w-5 text-primary" /> {PHONE_NUMBER}
            </a>
            <Button className="w-full" size="lg" onClick={scrollToContact}>Získať cenovú ponuku</Button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent z-10" />
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`} 
            alt="Čistá obývačka po profesionálnom tepovaní" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-2xl"
          >
            <motion.span variants={fadeInUp} className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6 border border-primary/20">
              Komárno a okolie
            </motion.span>
            <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl font-extrabold text-foreground leading-[1.1] mb-6">
              Čisté domovy, <br/><span className="text-gradient">spokojné rodiny</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-xl">
              Profesionálne tepovanie a čistenie v Komárne a okolí. Rýchlo, dôkladne a s garanciou najvyššej kvality.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              <Button size="xl" onClick={scrollToContact} className="text-lg px-8 py-7 rounded-full shadow-xl shadow-primary/30 hover:scale-105 transition-transform duration-300">
                Objednajte teraz — je to zadarmo
              </Button>
              <Button size="xl" variant="outline" className="text-lg px-8 py-7 rounded-full bg-white hover:bg-gray-50 text-foreground border-border group" asChild>
                <a href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}>
                  <Phone className="mr-2 h-5 w-5 text-primary group-hover:animate-bounce" />
                  Zavolajte nám
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges / Why Choose Us */}
      <section className="py-16 bg-white relative z-20 -mt-10 mx-4 sm:mx-8 rounded-3xl shadow-xl shadow-black/5 border border-border/50 max-w-7xl lg:mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-8">
          {features.map((feature, i) => (
            <motion.div 
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              className="flex flex-col items-center text-center group"
            >
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50/50" id="sluzby">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Naše Služby</h2>
            <p className="text-lg text-muted-foreground">Špecializujeme sa na hĺbkové čistenie, ktoré zbaví váš nábytok škvŕn, zápachov a neviditeľných alergénov.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }
                }}
              >
                <Card className="h-full border-0 shadow-md hover:shadow-xl transition-shadow duration-300 rounded-3xl overflow-hidden group bg-white">
                  <CardContent className="p-8">
                    <div className="h-14 w-14 rounded-full bg-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <service.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                    <p className="text-muted-foreground">{service.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="lg:w-1/2"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
                <img 
                  src={`${import.meta.env.BASE_URL}images/cleaning-process.png`} 
                  alt="Proces tepovania" 
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </motion.div>
            
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-bold mb-10">Ako to funguje?</h2>
              <div className="space-y-10">
                {steps.map((step, i) => (
                  <motion.div 
                    key={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      visible: { opacity: 1, x: 0, transition: { delay: i * 0.2 } }
                    }}
                    className="flex gap-6"
                  >
                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center font-display font-bold text-2xl shadow-lg shadow-primary/30">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                      <p className="text-lg text-muted-foreground">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Čo o nás hovoria klienti</h2>
            <p className="text-lg text-muted-foreground">Spokojnosť zákazníkov je pre nás na prvom mieste.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testi, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1, transition: { delay: i * 0.1 } }
                }}
              >
                <Card className="h-full border-none shadow-lg rounded-3xl bg-white relative">
                  <CardContent className="p-8 pt-10">
                    <div className="absolute -top-5 left-8 bg-primary text-white p-2 rounded-full shadow-md">
                      <ThumbsUp className="w-5 h-5" />
                    </div>
                    <div className="flex gap-1 mb-4">
                      {[...Array(testi.rating)].map((_, j) => (
                        <Star key={j} className="w-5 h-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 italic leading-relaxed">"{testi.text}"</p>
                    <div className="font-bold text-foreground">{testi.name}</div>
                    <div className="text-sm text-muted-foreground">Overený zákazník</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture Form Section */}
      <section id="kontakt" className="py-24 relative bg-foreground text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Získajte bezplatnú cenovú ponuku</h2>
            <p className="text-lg text-gray-300">Vyplňte formulár nižšie a my sa vám ozveme s nezáväznou ponukou.</p>
          </div>

          <Card className="bg-white text-foreground rounded-3xl shadow-2xl p-2 sm:p-4">
            <CardContent className="p-6 sm:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Meno a priezvisko</FormLabel>
                          <FormControl>
                            <Input placeholder="Jozef Mak" className="h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Telefónne číslo <span className="text-destructive">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="+421 9XX XXX XXX" className="h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Email (nepovinné)</FormLabel>
                          <FormControl>
                            <Input placeholder="jozef@email.sk" type="email" className="h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Druh služby <span className="text-destructive">*</span></FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white">
                                <SelectValue placeholder="Vyberte si službu" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {services.map(s => (
                                <SelectItem key={s.id} value={s.id}>{s.title}</SelectItem>
                              ))}
                              <SelectItem value="ine">Iné / Zmiešané</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Správa / Detaily (nepovinné)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Mám záujem o vytepovanie rohovej sedačky a jedného koberca..." 
                            className="resize-none min-h-[120px] rounded-xl bg-gray-50 border-gray-200 focus:bg-white" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    size="xl" 
                    className="w-full h-16 text-lg rounded-xl shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all font-bold group"
                    disabled={isPending}
                  >
                    {isPending ? "Odosiela sa..." : (
                      <>
                        Odoslať dopyt zadarmo
                        <CheckCircle2 className="ml-2 w-6 h-6 group-hover:scale-110 transition-transform" />
                      </>
                    )}
                  </Button>
                  <p className="text-center text-sm text-muted-foreground mt-4">
                    Vaše údaje sú v bezpečí. Odošlite formulár a my sa vám ozveme čo najskôr.
                  </p>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white border-t border-white/10 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Droplets className="h-8 w-8 text-primary" />
                <span className="font-display font-bold text-2xl tracking-tight">Freshkom</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-sm">
                Profesionálna upratovacia firma pre Komárno a okolie. Naším cieľom je priniesť do vášho domova dokonalú čistotu a sviežosť.
              </p>
              <div className="flex items-center gap-3 text-lg">
                <Phone className="h-5 w-5 text-primary" />
                <a href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} className="hover:text-white transition-colors">{PHONE_NUMBER}</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">Rýchle odkazy</h4>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#sluzby" className="hover:text-primary transition-colors">Naše služby</a></li>
                <li><a href="#kontakt" className="hover:text-primary transition-colors">Cenová ponuka</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">Oblasť pôsobenia</h4>
              <p className="text-gray-400">
                Komárno a široké okolie.<br/>
                Prídeme priamo k vám domov alebo do firmy.
              </p>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Freshkom. Všetky práva vyhradené.</p>
            <p className="mt-2 md:mt-0">Tepovanie a čistenie Komárno</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
