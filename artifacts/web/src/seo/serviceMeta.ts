export type ServicePageKey = "tepovanie" | "okna";
export type SeoLang = "sk" | "hu";

export const serviceMeta = {
  tepovanie: {
    path: "/tepovanie-komarno",
    sk: {
      title: "Tepovanie Komárno – sedačky, koberce a matrace | Freshkom",
      description: "Tepovanie sedačiek, kobercov, matracov a áut v Komárne (SK) aj Komárome (HU). Pozrite si ceny Freshkomu alebo zavolajte na +421 909 159 609.",
      name: "Tepovanie v Komárne",
      type: "Tepovanie čalúnenia, kobercov, matracov a interiérov áut",
    },
    hu: {
      title: "Kárpittisztítás Komáromban – kanapé és szőnyeg | Freshkom",
      description: "Kanapé, szőnyeg, matrac és autókárpit tisztítása Komáromban (HU) és Komárnóban (SK). Nézze meg árainkat, vagy hívja a +421 909 159 609 számot.",
      name: "Kárpittisztítás Komáromban",
      type: "Kanapé-, szőnyeg-, matrac- és autókárpit-tisztítás",
    },
  },
  okna: {
    path: "/cistenie-okien-komarno",
    sk: {
      title: "Čistenie okien Komárno – domy a výklady | Freshkom",
      description: "Umývanie okien, balkónových dverí a výkladov v Komárne (SK) aj Komárome (HU). Zistite ceny Freshkomu, pošlite dopyt alebo zavolajte.",
      name: "Čistenie okien v Komárne",
      type: "Umývanie okien, balkónových dverí a výkladov",
    },
    hu: {
      title: "Ablaktisztítás Komáromban – ablakok és kirakatok | Freshkom",
      description: "Ablakok, erkélyajtók és kirakatok tisztítása Komáromban (HU) és Komárnóban (SK). Nézze meg árainkat, kérjen ajánlatot vagy hívjon minket.",
      name: "Ablaktisztítás Komáromban",
      type: "Ablakok, erkélyajtók és kirakatok tisztítása",
    },
  },
} as const;

export function serviceSeo(key: ServicePageKey, lang: SeoLang, base: string) {
  const service = serviceMeta[key];
  const data = service[lang];
  const url = `${base}${lang === "hu" ? "/hu" : ""}${service.path}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.name,
    serviceType: data.type,
    url,
    provider: { "@type": "CleaningService", name: "Freshkom", telephone: "+421909159609", url: base },
    areaServed: [
      { "@type": "Place", name: "Komárno", address: { "@type": "PostalAddress", addressCountry: "SK" } },
      { "@type": "Place", name: "Komárom", address: { "@type": "PostalAddress", addressCountry: "HU" } },
    ],
  };
  return { ...data, url, skUrl: `${base}${service.path}`, huUrl: `${base}/hu${service.path}`, schema };
}