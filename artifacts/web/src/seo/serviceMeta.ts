export type ServicePageKey = "tepovanie" | "okna";
export type SeoLang = "sk" | "hu";

export const serviceMeta = {
  tepovanie: {
    path: "/tepovanie-komarno",
    sk: {
      title: "Tepovanie Komárno – sedačky, koberce a matrace | Freshkom",
      description: "Tepovanie sedačiek, kobercov, matracov a áut v Komárne a okolí. Pozrite si ceny Freshkomu a pošlite dopyt alebo zavolajte na +421 909 159 609.",
      name: "Tepovanie v Komárne",
      type: "Tepovanie čalúnenia, kobercov, matracov a interiérov áut",
    },
    hu: {
      title: "Kárpittisztítás Komáromban – kanapé és szőnyeg | Freshkom",
      description: "Kanapé, szőnyeg, matrac és autókárpit tisztítása Komáromban és környékén. Nézze meg a Freshkom árait, kérjen ajánlatot vagy hívja a +421 909 159 609 számot.",
      name: "Kárpittisztítás Komáromban",
      type: "Kanapé-, szőnyeg-, matrac- és autókárpit-tisztítás",
    },
  },
  okna: {
    path: "/cistenie-okien-komarno",
    sk: {
      title: "Čistenie okien Komárno – domy a výklady | Freshkom",
      description: "Umývanie malých a veľkých okien, balkónových dverí aj výkladov v Komárne a okolí. Zistite ceny Freshkomu, pošlite dopyt alebo zavolajte.",
      name: "Čistenie okien v Komárne",
      type: "Umývanie okien, balkónových dverí a výkladov",
    },
    hu: {
      title: "Ablaktisztítás Komáromban – ablakok és kirakatok | Freshkom",
      description: "Kis és nagy ablakok, erkélyajtók és kirakatok tisztítása Komáromban és környékén. Nézze meg a Freshkom árait, kérjen ajánlatot vagy hívjon minket.",
      name: "Ablaktisztítás Komáromban",
      type: "Ablakok, erkélyajtók és kirakatok tisztítása",
    },
  },
} as const;

export function serviceSeo(key: ServicePageKey, lang: SeoLang, base: string) {
  const service = serviceMeta[key];
  const data = service[lang];
  const url = `${base}${service.path}${lang === "hu" ? "?lang=hu" : ""}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.name,
    serviceType: data.type,
    url,
    provider: { "@type": "CleaningService", name: "Freshkom", telephone: "+421909159609", url: base },
    areaServed: { "@type": "Place", name: lang === "sk" ? "Komárno a okolie" : "Komárom és környéke" },
  };
  return { ...data, url, skUrl: `${base}${service.path}`, huUrl: `${base}${service.path}?lang=hu`, schema };
}