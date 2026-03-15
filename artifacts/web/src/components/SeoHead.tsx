import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";

const PHONE = "+421917240819";
const EMAIL = "freshkomsluzby@gmail.com";
const FACEBOOK = "https://www.facebook.com/profile.php?id=61585033404394";
const INSTAGRAM = "https://www.instagram.com/fresh_kom/";

interface SeoHeadProps {
  page: "landing" | "cennik" | "kontakt";
}

const seoData = {
  sk: {
    landing: {
      title: "Tepovanie a Čistenie Komárno | Freshkom",
      description: "Profesionálne tepovanie sedačiek, kobercov a áut v Komárne. Rýchle schnutie, ekologické prostriedky, 4.9★ na Google. Zavolajte: +421 917 240 819.",
    },
    cennik: {
      title: "Cenník Tepovacích Služieb Komárno | Freshkom",
      description: "Transparentný cenník tepovacích a čistiacich služieb Freshkom Komárno. Tepovanie sedačky od 30 €, koberec od 3 €/m². Ceny vrátane dopravy.",
    },
    kontakt: {
      title: "Kontakt — Tepovanie Komárno | Freshkom",
      description: "Kontaktujte Freshkom Komárno — tepovanie a čistenie. Tel: +421 917 240 819, email: freshkomsluzby@gmail.com. Pracujeme PO–SOB 7:00–21:00.",
    },
  },
  hu: {
    landing: {
      title: "Kárpittisztítás és Ablaktisztítás Komárom | Freshkom",
      description: "Professzionális kárpittisztítás Komáromban. Kanapé, szőnyeg, matrac, autó tisztítás. 4.9★ Google értékelés. Hívjon: +421 917 240 819.",
    },
    cennik: {
      title: "Takarítási Árlista Komárom | Freshkom",
      description: "Freshkom Komárom takarítási árlista. Kanapétisztítás 30 €-tól, szőnyegtisztítás 3 €/m²-től. Átlátható árak, szállítás beleértve.",
    },
    kontakt: {
      title: "Kapcsolat — Kárpittisztítás Komárom | Freshkom",
      description: "Lépjen kapcsolatba a Freshkom Komárom kárpittisztítóval. Tel: +421 917 240 819. Hétfőtől szombatig 7:00–21:00.",
    },
  },
};

const paths: Record<string, string> = {
  landing: "/",
  cennik: "/cennik",
  kontakt: "/kontakt",
};

function getSiteUrl(): string {
  if (import.meta.env.VITE_APP_URL) {
    return import.meta.env.VITE_APP_URL.replace(/\/$/, "");
  }
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "";
}

function buildLocalBusinessSchema(base: string) {
  return {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "CleaningService"],
  name: "Freshkom",
  url: base || undefined,
  description: "Profesionálna firma na tepovanie sedačiek, kobercov, matracov a umývanie okien v Komárne a okolí do 30 km.",
  telephone: `+421917240819`,
  email: EMAIL,
  image: `${base}/images/hero-real.webp`,
  logo: `${base}/images/logo-mascot.webp`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Komárno",
    addressRegion: "Nitriansky kraj",
    addressCountry: "SK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 47.7643,
    longitude: 18.128,
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 47.7643,
      longitude: 18.128,
    },
    geoRadius: "30000",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "07:00",
      closes: "21:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "47",
    bestRating: "5",
  },
  priceRange: "€€",
  availableLanguage: ["Slovak", "Hungarian"],
  sameAs: [FACEBOOK, INSTAGRAM],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Tepovanie a čistenie",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tepovanie sedačiek a gaučov" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tepovanie kobercov" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tepovanie matracov" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tepovanie interiérov áut" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Umývanie okien a výkladov" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hĺbkové čistenie" } },
    ],
  },
  };
}

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Attila Sébestyen",
  jobTitle: "Zakladateľ a majiteľ",
  worksFor: {
    "@type": "LocalBusiness",
    name: "Freshkom",
  },
  image: "https://freshkom.sk/images/attila.webp",
  sameAs: [
    "https://www.instagram.com/sebestyen.atti/",
    "https://www.facebook.com/profile.php?id=61573024706738",
  ],
};

const faqSchema = {
  sk: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Koľko stojí tepovanie sedačky v Komárne?",
        acceptedAnswer: { "@type": "Answer", text: "Dvojmiestna sedačka od 30 €, trojmiestna od 40 €. Cena zahŕňa dopravu v Komárne." },
      },
      {
        "@type": "Question",
        name: "Ako dlho trvá tepovanie?",
        acceptedAnswer: { "@type": "Answer", text: "Bežné tepovanie trvá 1–2 hodiny. Sedačka vyschne do 2–4 hodín vďaka výkonným extraktorom." },
      },
      {
        "@type": "Question",
        name: "Dochádzate aj mimo Komárno?",
        acceptedAnswer: { "@type": "Answer", text: "Áno, pôsobíme v okruhu 30 km vrátane Nových Zámkov, Hurbanova, Kolárova a Štúrova. Príplatok za dopravu je individuálny." },
      },
      {
        "@type": "Question",
        name: "Sú vaše prostriedky bezpečné pre deti a zvieratá?",
        acceptedAnswer: { "@type": "Answer", text: "Áno, používame výlučne ekologické, hypoalergénne čistiace prostriedky bezpečné pre deti aj domáce zvieratá." },
      },
      {
        "@type": "Question",
        name: "Ako si môžem objednať tepovanie?",
        acceptedAnswer: { "@type": "Answer", text: "Zavolajte na +421 917 240 819, napíšte email na freshkomsluzby@gmail.com alebo vyplňte formulár na našom webe. Ozveme sa do 24 hodín." },
      },
    ],
  },
  hu: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Mennyibe kerül a kanapétisztítás Komáromban?",
        acceptedAnswer: { "@type": "Answer", text: "2 személyes kanapé 30 €-tól, 3 személyes kanapé 40 €-tól. Az ár tartalmazza a komáromi kiszállítást." },
      },
      {
        "@type": "Question",
        name: "Mennyi ideig tart a kárpittisztítás?",
        acceptedAnswer: { "@type": "Answer", text: "Az átlagos tisztítás 1–2 órát vesz igénybe. A kanapé 2–4 órán belül megszárad az erős extraktoroknak köszönhetően." },
      },
      {
        "@type": "Question",
        name: "Komáromon kívülre is kiszállnak?",
        acceptedAnswer: { "@type": "Answer", text: "Igen, 30 km-es körzetben dolgozunk, beleértve Érsekújvárt, Ógyallát, Gútát és Párkányt. A kiszállási díj egyéni." },
      },
      {
        "@type": "Question",
        name: "A tisztítószerek biztonságosak gyerekeknek és állatoknak?",
        acceptedAnswer: { "@type": "Answer", text: "Igen, kizárólag ökológiai, hipoallergén tisztítószereket használunk, amelyek biztonságosak gyerekeknek és háziállatoknak." },
      },
      {
        "@type": "Question",
        name: "Hogyan rendelhetek kárpittisztítást?",
        acceptedAnswer: { "@type": "Answer", text: "Hívjon a +421 917 240 819 számon, írjon e-mailt a freshkomsluzby@gmail.com címre, vagy töltse ki az űrlapot weboldalunkon. 24 órán belül jelentkezünk." },
      },
    ],
  },
};

export default function SeoHead({ page }: SeoHeadProps) {
  const { lang } = useLanguage();
  const data = seoData[lang][page];
  const path = paths[page];
  const base = getSiteUrl();
  const canonicalUrl = `${base}${path}${lang !== "sk" ? `?lang=${lang}` : ""}`;
  const skUrl = `${base}${path}?lang=sk`;
  const huUrl = `${base}${path}?lang=hu`;
  const ogImage = `${base}/opengraph.webp`;
  const localBusinessSchema = buildLocalBusinessSchema(base);

  const breadcrumbNames: Record<string, Record<string, string>> = {
    sk: { cennik: "Cenník", kontakt: "Kontakt" },
    hu: { cennik: "Árlista", kontakt: "Kapcsolat" },
  };

  const breadcrumbSchema =
    page !== "landing"
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: lang === "sk" ? "Úvod" : "Kezdőlap", item: `${base}/` },
            { "@type": "ListItem", position: 2, name: breadcrumbNames[lang][page] },
          ],
        }
      : null;

  return (
    <Helmet>
      <html lang={lang} />
      <title>{data.title}</title>
      <meta name="description" content={data.description} />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="sk" href={skUrl} />
      <link rel="alternate" hrefLang="hu" href={huUrl} />
      <link rel="alternate" hrefLang="x-default" href={`${base}${path}`} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={data.title} />
      <meta property="og:description" content={data.description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={lang === "sk" ? "sk_SK" : "hu_HU"} />
      <meta property="og:locale:alternate" content={lang === "sk" ? "hu_HU" : "sk_SK"} />
      <meta property="og:site_name" content="Freshkom" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={data.title} />
      <meta name="twitter:description" content={data.description} />
      <meta name="twitter:image" content={ogImage} />

      <meta name="geo.region" content="SK-NI" />
      <meta name="geo.placename" content="Komárno" />
      <meta name="geo.position" content="47.7643;18.128" />
      <meta name="ICBM" content="47.7643, 18.128" />

      <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      {page === "landing" && (
        <script type="application/ld+json">{JSON.stringify(faqSchema[lang])}</script>
      )}
      {page === "landing" && (
        <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      )}
      {breadcrumbSchema && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      )}
    </Helmet>
  );
}
