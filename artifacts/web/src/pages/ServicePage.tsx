import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowDown, ArrowRight, Check, ChevronDown, MapPin, Phone } from "lucide-react";
import SeoHead from "@/components/SeoHead";
import LeadForm from "@/components/LeadForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { getPricingSections, transportPrices } from "@/data/pricing";

type Kind = "upholstery" | "windows";

type PageCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  heroAlt: string;
  call: string;
  enquire: string;
  priceLabel: string;
  priceHint: string;
  pricingTitle: string;
  pricingIntro: string;
  allPrices: string;
  otherPrices: string;
  transportNote: string;
  whatTitle: string;
  whatIntro: string;
  features: { title: string; text: string }[];
  processTitle: string;
  steps: { title: string; text: string }[];
  faqTitle: string;
  faq: { question: string; answer: string }[];
  contactEyebrow: string;
  contactTitle: string;
  contactIntro: string;
  contactAlternative: string;
  moreTitle: string;
  moreText: string;
  otherService: string;
  allServices: string;
  contactPage: string;
};

const copy: Record<"sk" | "hu", Record<Kind, PageCopy>> = {
  sk: {
    upholstery: {
      eyebrow: "Freshkom / služby v Komárne",
      title: "Tepovanie v Komárne",
      intro: "Sedačka, kreslo, matrac či koberec? Napíšte nám, čo potrebujete vytepovať. Cenu si môžete pozrieť hneď nižšie a termín dohodneme spoločne.",
      heroAlt: "Tepovanie čalúneného nábytku – Freshkom Komárno",
      call: "Zavolať Freshkom",
      enquire: "Napísať dopyt",
      priceLabel: "Orientačný pohľad do cenníka",
      priceHint: "Cena podľa typu a veľkosti predmetu",
      pricingTitle: "Koľko stojí tepovanie?",
      pricingIntro: "Vyberte si, čo chcete vyčistiť. Nižšie sú ceny z nášho aktuálneho cenníka.",
      allPrices: "Celý cenník tepovania",
      otherPrices: "Ďalšie možnosti tepovania",
      transportNote: "Doprava sa účtuje podľa cenníka. Ak si nie ste istí výberom položky, opíšte nám ju v dopyte.",
      whatTitle: "Čo u nás môžete dať vytepovať",
      whatIntro: "V domácnosti aj v aute sú povrchy, ktoré bežné utretie nevyrieši. Vyberte si službu podľa toho, čo práve potrebujete.",
      features: [
        { title: "Sedačky a kreslá", text: "Rôzne veľkosti sedačiek, kreslá aj jedálenské stoličky." },
        { title: "Koberce a matrace", text: "Koberce podľa typu vlasu a matrace podľa veľkosti." },
        { title: "Interiér auta", text: "Sedadlá alebo celý interiér podľa položiek v cenníku." },
      ],
      processTitle: "Ako sa dohodneme",
      steps: [
        { title: "Poviete nám, čo potrebujete", text: "Vyberte položku v cenníku alebo nám pošlite krátky opis a počet kusov." },
        { title: "Dohodneme si podrobnosti", text: "Telefonicky alebo cez formulár spolu prejdeme rozsah práce a termín." },
        { title: "Prídeme za vami", text: "Tepovanie riešime priamo u vás v Komárne a okolí." },
      ],
      faqTitle: "Často sa pýtate",
      faq: [
        { question: "Ako zistím cenu za moju sedačku?", answer: "V cenníku rozlišujeme sedačky podľa veľkosti a tvaru. Ak neviete, ktorá položka zodpovedá vašej sedačke, zavolajte nám alebo ju opíšte vo formulári." },
        { question: "Tepujete aj matrace a koberce?", answer: "Áno. Ceny matracov, kobercov aj ďalších položiek tepovania nájdete na tejto stránke alebo v celom cenníku." },
        { question: "Ako dlho bude čalúnenie schnúť?", answer: "Závisí to od materiálu, stavu čalúnenia a podmienok v miestnosti. Pri dohadovaní služby vám povieme, čo je vhodné po tepovaní dodržať." },
        { question: "Musím sedačku nejako pripraviť?", answer: "Pomôže, ak z nej pred príchodom odložíte voľné veci a sprístupníte okolie. Ak máte otázky k materiálu alebo škvrnám, spomeňte ich už pri objednávaní." },
      ],
      contactEyebrow: "Dohodnime sa",
      contactTitle: "Čo potrebujete vytepovať?",
      contactIntro: "Napíšte nám, o aký predmet ide a kde sa nachádzate. Ozveme sa vám k ďalším podrobnostiam.",
      contactAlternative: "Radšej telefonicky?",
      moreTitle: "Potrebujete aj umyť okná?",
      moreText: "Pozrite si aj našu druhú službu v Komárne a ceny jednotlivých okien.",
      otherService: "Umývanie okien v Komárne",
      allServices: "Všetky služby",
      contactPage: "Kontakt",
    },
    windows: {
      eyebrow: "Freshkom / služby v Komárne",
      title: "Čistenie okien v Komárne",
      intro: "Malé okno, bežné okno, balkónové dvere alebo výklad? Pozrite si ceny podľa typu a ozvite sa nám s počtom okien. Dohodneme rozsah aj termín.",
      heroAlt: "Umývanie okien – Freshkom Komárno",
      call: "Zavolať Freshkom",
      enquire: "Napísať dopyt",
      priceLabel: "Orientačný pohľad do cenníka",
      priceHint: "Cena podľa typu okna",
      pricingTitle: "Ceny umývania okien",
      pricingIntro: "Jednotlivé typy okien a ich ceny nájdete na jednom mieste.",
      allPrices: "Celý cenník okien",
      otherPrices: "Ďalšie položky",
      transportNote: "Doprava sa účtuje podľa cenníka. Pri väčšom počte alebo neštandardnom type okien nám pošlite podrobnosti.",
      whatTitle: "Okná doma aj vo vašej prevádzke",
      whatIntro: "Každý priestor má iné okná. Pri dopyte nám stačí povedať, koľko ich je a akého sú typu.",
      features: [
        { title: "Okná v domácnosti", text: "Malé a bežné okná podľa položiek v cenníku." },
        { title: "Balkónové okná", text: "Samostatná položka pre balkónové okná a dvere." },
        { title: "Výklady", text: "Pri výkladoch dohodneme cenu podľa konkrétneho rozsahu." },
      ],
      processTitle: "Ako sa dohodneme",
      steps: [
        { title: "Spočítate okná", text: "Napíšte nám typ a približný počet okien, prípadne ďalšie dôležité podrobnosti." },
        { title: "Prejdeme rozsah", text: "Telefonicky alebo cez formulár si potvrdíme, čo potrebujete umyť a kedy vám to vyhovuje." },
        { title: "Prídeme za vami", text: "Umývanie okien riešime priamo u vás v Komárne a okolí." },
      ],
      faqTitle: "Často sa pýtate",
      faq: [
        { question: "Ako sa počíta cena umývania okien?", answer: "V cenníku sú položky podľa typu okna. Napíšte nám počet a typ vašich okien; pri výkladoch sa cena dohodne individuálne." },
        { question: "Umývate aj balkónové okná?", answer: "Áno, balkónové okná majú v našom cenníku vlastnú položku. Ak si nie ste istí zaradením, ozvite sa nám." },
        { question: "Viete umyť aj výklad prevádzky?", answer: "Áno, výklady sú v ponuke. Keďže sa ich rozmery a prístup líšia, cenu dohodneme podľa konkrétneho výkladu." },
        { question: "Čo mám uviesť v dopyte?", answer: "Pomôže nám počet a typ okien, miesto realizácie a prípadné informácie o prístupe. Ozveme sa vám, ak bude potrebné niečo doplniť." },
      ],
      contactEyebrow: "Dohodnime sa",
      contactTitle: "Koľko okien potrebujete umyť?",
      contactIntro: "Napíšte nám typ a počet okien a kde sa nachádzate. Ozveme sa vám k ďalším podrobnostiam.",
      contactAlternative: "Radšej telefonicky?",
      moreTitle: "Chcete dať vytepovať aj sedačku?",
      moreText: "Pozrite si naše tepovanie v Komárne a ceny čalúnenia, kobercov či matracov.",
      otherService: "Tepovanie v Komárne",
      allServices: "Všetky služby",
      contactPage: "Kontakt",
    },
  },
  hu: {
    upholstery: {
      eyebrow: "Freshkom / szolgáltatások Komáromban",
      title: "Kárpittisztítás Komáromban",
      intro: "Kanapé, fotel, matrac vagy szőnyeg? Írja meg, mit szeretne kitisztíttatni. Az árakat lent rögtön megnézheti, az időpontot pedig közösen egyeztetjük.",
      heroAlt: "Kárpitozott bútor tisztítása – Freshkom Komárom",
      call: "Hívja a Freshkomot",
      enquire: "Ajánlatkérés írásban",
      priceLabel: "Gyors betekintés az árlistába",
      priceHint: "Ár a tárgy típusától és méretétől függően",
      pricingTitle: "Mennyibe kerül a kárpittisztítás?",
      pricingIntro: "Válassza ki, mit szeretne kitisztíttatni. Az alábbi árak az aktuális árlistánkból származnak.",
      allPrices: "Teljes kárpittisztítási árlista",
      otherPrices: "További tisztítási lehetőségek",
      transportNote: "A kiszállítás díja az árlista szerint alakul. Ha nem biztos benne, melyik tétel illik Önre, írja le nekünk az ajánlatkérésben.",
      whatTitle: "Mit tisztíttathat nálunk?",
      whatIntro: "Otthon és az autóban is vannak felületek, amelyekhez nem elég egy gyors áttörlés. Válassza ki, mire van szüksége.",
      features: [
        { title: "Kanapék és fotelek", text: "Különféle méretű kanapék, fotelek és étkezőszékek." },
        { title: "Szőnyegek és matracok", text: "Szőnyegek a szálhossz, matracok a méret szerint." },
        { title: "Autóbelső", text: "Ülések vagy teljes belső tér az árlista tételei szerint." },
      ],
      processTitle: "Hogyan egyeztetünk?",
      steps: [
        { title: "Elmondja, mit szeretne", text: "Válasszon tételt az árlistából, vagy írjon rövid leírást és darabszámot." },
        { title: "Pontosítjuk a részleteket", text: "Telefonon vagy az űrlapon egyeztetjük a munka terjedelmét és az időpontot." },
        { title: "Önhöz megyünk", text: "Komáromban és környékén a helyszínen végezzük a tisztítást." },
      ],
      faqTitle: "Gyakori kérdések",
      faq: [
        { question: "Hogyan tudom meg a kanapém tisztításának árát?", answer: "Az árlistában a kanapékat méret és forma szerint különböztetjük meg. Ha nem tudja, melyik tétel illik az Ön kanapéjára, hívjon minket vagy írja le az űrlapon." },
        { question: "Matracot és szőnyeget is tisztítanak?", answer: "Igen. A matracok, szőnyegek és más tételek árait ezen az oldalon, illetve a teljes árlistában találja." },
        { question: "Mennyi ideig szárad a kárpit?", answer: "Ez az anyagtól, a kárpit állapotától és a helyiség körülményeitől függ. Az egyeztetés során elmondjuk, mire érdemes figyelni tisztítás után." },
        { question: "Elő kell készítenem a kanapét?", answer: "Segít, ha a mozdítható tárgyakat leveszi róla, és szabaddá teszi a környékét. Az anyaggal vagy foltokkal kapcsolatos kérdéseket már a foglaláskor jelezheti." },
      ],
      contactEyebrow: "Egyeztessünk",
      contactTitle: "Mit szeretne kitisztíttatni?",
      contactIntro: "Írja meg, milyen tárgyról van szó és hol található. Jelentkezünk a részletekkel.",
      contactAlternative: "Inkább telefonálna?",
      moreTitle: "Ablakmosásra is szüksége van?",
      moreText: "Nézze meg másik komáromi szolgáltatásunkat és az ablakok árait.",
      otherService: "Ablakmosás Komáromban",
      allServices: "Összes szolgáltatás",
      contactPage: "Kapcsolat",
    },
    windows: {
      eyebrow: "Freshkom / szolgáltatások Komáromban",
      title: "Ablakmosás Komáromban",
      intro: "Kis ablak, normál ablak, erkélyajtó vagy kirakat? Nézze meg az árakat típus szerint, és írja meg, hány ablakról van szó. Egyeztetjük a részleteket és az időpontot.",
      heroAlt: "Ablakmosás – Freshkom Komárom",
      call: "Hívja a Freshkomot",
      enquire: "Ajánlatkérés írásban",
      priceLabel: "Gyors betekintés az árlistába",
      priceHint: "Ár az ablak típusától függően",
      pricingTitle: "Ablakmosási árak",
      pricingIntro: "A különböző ablaktípusokat és áraikat egy helyen találja.",
      allPrices: "Teljes ablakmosási árlista",
      otherPrices: "További tételek",
      transportNote: "A kiszállítás díja az árlista szerint alakul. Több vagy nem szokványos ablak esetén írja meg a részleteket.",
      whatTitle: "Ablakok otthon és az üzletben",
      whatIntro: "Minden helyen másmilyen ablakok vannak. Az ajánlatkérésnél elég megadni a típusukat és a számukat.",
      features: [
        { title: "Otthoni ablakok", text: "Kis és normál ablakok az árlista tételei szerint." },
        { title: "Erkélyablakok", text: "Külön tétel az erkélyablakokhoz és -ajtókhoz." },
        { title: "Kirakatok", text: "Kirakatok esetében az árat a konkrét munka alapján egyeztetjük." },
      ],
      processTitle: "Hogyan egyeztetünk?",
      steps: [
        { title: "Összeszámolja az ablakokat", text: "Írja meg a típusukat, hozzávetőleges számukat és a fontos részleteket." },
        { title: "Pontosítjuk a munkát", text: "Telefonon vagy az űrlapon egyeztetjük, mit kell megtisztítani és mikor alkalmas Önnek." },
        { title: "Önhöz megyünk", text: "Komáromban és környékén a helyszínen végezzük az ablakmosást." },
      ],
      faqTitle: "Gyakori kérdések",
      faq: [
        { question: "Hogyan számolják ki az ablakmosás árát?", answer: "Az árlistában az ablak típusa szerint szerepelnek a tételek. Írja meg ablakai számát és típusát; kirakatoknál egyedileg egyeztetjük az árat." },
        { question: "Erkélyablakokat is mosnak?", answer: "Igen, az erkélyablakoknak külön tétele van az árlistánkban. Ha nem biztos a besorolásban, keressen minket." },
        { question: "Üzlet kirakatát is megtisztítják?", answer: "Igen, kirakatokkal is foglalkozunk. Méretük és megközelítésük eltérő lehet, ezért az árat a konkrét kirakat alapján egyeztetjük." },
        { question: "Mit írjak az ajánlatkérésbe?", answer: "Az ablakok száma és típusa, a helyszín és a megközelítéssel kapcsolatos tudnivalók segítenek. Ha további adatra van szükségünk, jelentkezünk." },
      ],
      contactEyebrow: "Egyeztessünk",
      contactTitle: "Hány ablakot szeretne lemosatni?",
      contactIntro: "Írja meg az ablakok típusát, számát és a helyszínt. Jelentkezünk a részletekkel.",
      contactAlternative: "Inkább telefonálna?",
      moreTitle: "A kanapét is kitisztíttatná?",
      moreText: "Nézze meg komáromi kárpittisztítási szolgáltatásunkat és a kanapék, szőnyegek, matracok árait.",
      otherService: "Kárpittisztítás Komáromban",
      allServices: "Összes szolgáltatás",
      contactPage: "Kapcsolat",
    },
  },
};

const PHONE = "+421 909 159 609";
const PHONE_HREF = "tel:+421909159609";
const image = (name: string) => `${import.meta.env.BASE_URL}images/optimized/${name.replace(/\.png$/, ".webp")}`;

export default function ServicePage({ kind }: { kind: Kind }) {
  const { lang, t } = useLanguage();
  const c = copy[lang][kind];
  const isUpholstery = kind === "upholstery";
  const pricingId = isUpholstery ? "tepovanie-gaucov" : "umyvanie-okien";
  const sectionIds = isUpholstery
    ? ["tepovanie-gaucov", "tepovanie-kobercov", "tepovanie-matracov", "tepovanie-aut"]
    : ["umyvanie-okien"];
  const sections = getPricingSections(t).filter((section) => sectionIds.includes(section.id));
  const mainSection = sections.find((section) => section.id === pricingId);
  const highlightedItem = mainSection?.items[isUpholstery ? 2 : 1] ?? mainSection?.items[0];
  const otherHref = isUpholstery ? "/cistenie-okien-komarno" : "/tepovanie-komarno";
  const route = (path: string, hash = "") => `${path}${lang === "hu" ? "?lang=hu" : ""}${hash}`;
  const priceHref = route("/cennik", `#${pricingId}`);

  return (
    <>
      <SeoHead page={isUpholstery ? "tepovanie" : "okna"} />

      <section className="relative overflow-hidden bg-gradient-to-br from-accent/70 via-[#f5fbf9] to-[#e8f5f3]">
        <div className="pointer-events-none absolute -right-20 -top-40 h-[460px] w-[460px] rounded-full border-[70px] border-primary/[0.035] md:h-[700px] md:w-[700px]" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 pb-10 pt-8 sm:px-6 sm:pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(380px,.82fr)] lg:items-center lg:gap-16 lg:px-8 lg:pb-16 lg:pt-16">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <div className="mb-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.17em] text-primary sm:text-xs">
              <span className="h-[2px] w-7 rounded-full bg-primary" />
              {c.eyebrow}
            </div>
            <h1 className="max-w-[710px] font-display text-[clamp(2.55rem,7vw,5.3rem)] font-extrabold leading-[1.06] tracking-[-0.045em] text-foreground">
              {c.title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground/75 sm:text-lg">{c.intro}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a data-testid="link-service-form" href="#kontakt" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/15 transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:min-h-14 sm:text-base">
                {c.enquire}<ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a data-testid="link-service-phone" href={PHONE_HREF} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-primary/25 bg-white/75 px-6 py-3 text-sm font-bold text-foreground transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:min-h-14 sm:text-base">
                <Phone className="h-4 w-4 text-primary" aria-hidden="true" />{c.call}
              </a>
            </div>
            {highlightedItem && (
              <a href="#ceny" data-testid="link-service-price-preview" className="mt-7 flex max-w-md items-center gap-4 rounded-2xl border border-primary/15 bg-white/85 p-3 shadow-sm transition-transform hover:-translate-y-0.5 sm:mt-9">
                <img src={image(highlightedItem.img)} alt="" width={64} height={64} className="h-14 w-14 shrink-0 object-contain" />
                <span className="min-w-0 flex-1">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.13em] text-primary">{c.priceLabel}</span>
                  <span className="mt-0.5 block truncate text-sm font-semibold text-foreground">{highlightedItem.name}</span>
                </span>
                <span className="shrink-0 text-lg font-extrabold text-primary">{highlightedItem.price}</span>
                <ArrowDown className="h-4 w-4 shrink-0 text-primary/60" aria-hidden="true" />
              </a>
            )}
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.12 }} className="relative hidden lg:block">
            <div className="absolute -inset-5 rounded-[3rem] border border-primary/10" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2.4rem] bg-white shadow-[0_25px_65px_-25px_rgba(16,80,80,.25)]">
              <img src={image(isUpholstery ? "hero-real-2.webp" : "item-okno-2.webp")} alt={c.heroAlt} width={650} height={500} className={`h-full w-full ${isUpholstery ? "object-cover" : "object-contain p-10"}`} />
            </div>
            <div className="absolute -bottom-4 -left-6 flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-white shadow-lg">
              <MapPin className="h-4 w-4 text-[#72ded0]" aria-hidden="true" />Komárno / Komárom
            </div>
          </motion.div>
        </div>
      </section>

      <section id="ceny" className="scroll-mt-24 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-7 flex flex-col gap-3 md:mb-9 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary">01 / {c.priceHint}</span>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{c.pricingTitle}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">{c.pricingIntro}</p>
            </div>
            <Link href={priceHref} data-testid="link-full-service-prices" className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-bold text-primary underline-offset-4 hover:underline">
              {c.allPrices}<ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          {mainSection && (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {mainSection.items.map((item, index) => (
                <div key={`${mainSection.id}-${index}`} data-testid={`price-service-${mainSection.id}-${index}`} className="group flex min-h-[102px] items-center gap-3 rounded-2xl border border-border/75 bg-[#f7faf9] p-3 transition-colors hover:border-primary/30 hover:bg-accent/40 sm:p-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-white p-1.5 sm:h-[72px] sm:w-[72px]">
                    <img src={image(item.img)} alt="" loading="lazy" width={72} height={72} className="h-full w-full object-contain transition-transform group-hover:scale-105" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold leading-snug text-foreground sm:text-base">{item.name}</h3>
                    {item.badge && <span className="mt-1 block text-[11px] font-semibold text-primary">{item.badge}</span>}
                  </div>
                  <span className="shrink-0 font-display text-lg font-extrabold tracking-tight text-primary sm:text-xl">{item.price}</span>
                </div>
              ))}
            </div>
          )}

          {isUpholstery && sections.length > 1 && (
            <div className="mt-10 border-t border-border/80 pt-8">
              <h3 className="mb-5 font-display text-xl font-bold text-foreground sm:text-2xl">{c.otherPrices}</h3>
              <div className="grid gap-6 md:grid-cols-3">
                {sections.filter((section) => section.id !== pricingId).map((section) => (
                  <div key={section.id} className="rounded-2xl bg-accent/35 p-5">
                    <h4 className="mb-3 font-display text-base font-bold text-foreground">{section.title}</h4>
                    <ul className="divide-y divide-primary/10">
                      {section.items.map((item, index) => (
                        <li key={`${section.id}-${index}`} className="flex items-start justify-between gap-3 py-2.5 text-sm">
                          <span className="text-foreground/75">{item.name}</span>
                          <strong className="shrink-0 text-primary">{item.price}</strong>
                        </li>
                      ))}
                    </ul>
                    <Link href={route("/cennik", `#${section.id}`)} data-testid={`link-prices-${section.id}`} className="mt-3 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-primary hover:underline">
                      {c.allPrices}<ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="mt-7 flex flex-col gap-4 rounded-2xl border border-primary/15 bg-accent/40 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-sm leading-relaxed text-foreground/75">
              {c.transportNote} {t("pricing.transportKomarno")}: {transportPrices.komarno}; {t("pricing.transportOutside")}: {transportPrices.outside}.
            </p>
            <a href="#kontakt" data-testid="link-price-to-form" className="inline-flex min-h-11 shrink-0 items-center gap-2 font-bold text-primary hover:underline">
              {c.enquire}<ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#f2f8f7] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary">02 / Freshkom</span>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{c.whatTitle}</h2>
              <p className="mt-4 max-w-lg leading-relaxed text-foreground/70">{c.whatIntro}</p>
              <div className="mt-6 hidden overflow-hidden rounded-3xl bg-white p-6 lg:block">
                <img src={image(isUpholstery ? "item-sedacka-3m.webp" : "item-okno-1.webp")} alt={c.heroAlt} loading="lazy" width={440} height={260} className="mx-auto h-48 w-full object-contain" />
              </div>
            </div>
            <div className="space-y-3">
              {c.features.map((feature, index) => (
                <div key={feature.title} className="flex gap-5 rounded-2xl bg-white p-5 shadow-sm sm:p-6">
                  <span className="font-display text-xl font-bold text-primary/45">0{index + 1}</span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground">{feature.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground sm:text-base">{feature.text}</p>
                  </div>
                  <Check className="ml-auto h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                </div>
              ))}
              <div className="pt-4">
                <h2 className="font-display text-2xl font-bold text-foreground">{c.processTitle}</h2>
                <ol className="mt-5 space-y-5 border-l-2 border-primary/20 pl-6">
                  {c.steps.map((step, index) => (
                    <li key={step.title} className="relative">
                      <span className="absolute -left-[33px] top-0 flex h-4 w-4 items-center justify-center rounded-full border-[3px] border-[#f2f8f7] bg-primary" />
                      <h3 className="text-sm font-bold text-foreground sm:text-base">{index + 1}. {step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[.7fr_1.3fr] lg:gap-20 lg:px-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary">03 / FAQ</span>
            <h2 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">{c.faqTitle}</h2>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {c.faq.map((entry, index) => (
              <details key={entry.question} className="group">
                <summary data-testid={`faq-service-${index}`} className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 font-semibold text-foreground marker:hidden hover:text-primary [&::-webkit-details-marker]:hidden">
                  {entry.question}<ChevronDown className="h-5 w-5 shrink-0 text-primary transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="max-w-2xl pb-5 pr-8 text-sm leading-relaxed text-muted-foreground sm:text-base">{entry.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="kontakt" className="scroll-mt-20 bg-foreground py-14 text-white sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-9 px-4 sm:px-6 lg:grid-cols-[.76fr_1.24fr] lg:gap-16 lg:px-8">
          <div className="lg:pt-8">
            <span className="text-xs font-bold uppercase tracking-[0.17em] text-[#8ce5d9]">04 / {c.contactEyebrow}</span>
            <h2 className="mt-3 max-w-md font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">{c.contactTitle}</h2>
            <p className="mt-5 max-w-md leading-relaxed text-white/70">{c.contactIntro}</p>
            <div className="mt-8 border-t border-white/15 pt-7">
              <p className="mb-3 text-sm text-white/60">{c.contactAlternative}</p>
              <a data-testid="link-contact-phone" href={PHONE_HREF} className="inline-flex min-h-12 items-center gap-3 font-display text-xl font-bold text-white hover:text-[#8ce5d9]">
                <Phone className="h-5 w-5 text-[#8ce5d9]" aria-hidden="true" />{PHONE}
              </a>
            </div>
          </div>
          <LeadForm key={kind} defaultService={isUpholstery ? "tepovanie-gaucov" : "umyvanie-okien"} />
        </div>
      </section>

      <section className="border-t border-white/10 bg-foreground py-10 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <h2 className="font-display text-2xl font-bold">{c.moreTitle}</h2>
            <p className="mt-1 text-sm text-white/60">{c.moreText}</p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm font-semibold">
            <Link href={route(otherHref)} data-testid="link-other-service" className="inline-flex min-h-11 items-center gap-2 text-[#8ce5d9] hover:underline">{c.otherService}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            <Link href={route("/", "#sluzby")} data-testid="link-all-services" className="inline-flex min-h-11 items-center text-white/75 hover:text-white hover:underline">{c.allServices}</Link>
            <Link href={route("/kontakt")} data-testid="link-contact-page" className="inline-flex min-h-11 items-center text-white/75 hover:text-white hover:underline">{c.contactPage}</Link>
          </div>
        </div>
      </section>
    </>
  );
}