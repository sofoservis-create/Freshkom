export type ServicePageKey = "tepovanie" | "okna";
export type SeoLang = "sk" | "hu";

export const serviceMeta = {
  tepovanie: {
    path: "/tepovanie-komarno",
    sk: {
      title: "Tepovanie Komárno – sedačky, koberce a matrace | Freshkom",
      description: "Tepovanie sedačiek, kobercov, matracov a áut v Komárne (SK) a okolí do 40 km. Pozrite si ceny Freshkomu alebo zavolajte na +421 909 159 609.",
      name: "Tepovanie v Komárne",
      type: "Tepovanie čalúnenia, kobercov, matracov a interiérov áut",
    },
    hu: {
      title: "Kárpittisztítás Komárom (SK) | Freshkom",
      description: "Kanapék, szőnyegek, matracok és autókárpit tisztítása Komáromban (SK) és a környező településeken, 40 km-es körzetben. Hívjon: +421 909 159 609.",
      name: "Kárpittisztítás Komáromban (SK)",
      type: "Kanapé-, szőnyeg-, matrac- és autókárpit-tisztítás",
    },
  },
  okna: {
    path: "/cistenie-okien-komarno",
    sk: {
      title: "Čistenie okien Komárno – domy a výklady | Freshkom",
      description: "Umývanie okien, balkónových dverí a výkladov v Komárne (SK) a okolí do 40 km. Zistite ceny Freshkomu alebo pošlite dopyt.",
      name: "Čistenie okien v Komárne",
      type: "Umývanie okien, balkónových dverí a výkladov",
    },
    hu: {
      title: "Ablaktisztítás Komárom (SK) | Freshkom",
      description: "Ablakok, erkélyajtók és kirakatok tisztítása Komáromban (SK) és a környező településeken, 40 km-es körzetben. Hívjon: +421 909 159 609.",
      name: "Ablaktisztítás Komáromban (SK)",
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
      { "@type": "Place", name: "Komárno (SK)", address: { "@type": "PostalAddress", addressCountry: "SK" } },
      {
        "@type": "GeoCircle",
        geoMidpoint: { "@type": "GeoCoordinates", latitude: 47.7643, longitude: 18.128 },
        geoRadius: 40000,
      },
    ],
  };
  return { ...data, url, skUrl: `${base}${service.path}`, huUrl: `${base}/hu${service.path}`, schema };
}