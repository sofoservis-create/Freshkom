import { serviceMeta, serviceSeo, type SeoLang, type ServicePageKey } from "./serviceMeta";
import { localizePath, type PagePath } from "./routes";
import { legalDocuments, type LegalKind } from "../content/legalDocuments";

export const pageMeta = {
  "/": {
    sk: { title: "Tepovanie a čistenie okien Komárno (SK) | Freshkom", description: "Tepovanie sedačiek, kobercov a umývanie okien Komárne a okolitých obciach a mestách. Komárno a okolie do 40 km. Kontakt: +421 909 159 609." },
    hu: { title: "Kárpittisztítás és ablaktisztítás Komárom (SK) | Freshkom", description: "Kanapé-, szőnyeg- és ablaktisztítás Komáromban (SK) és a környező falvakban és városokban, 40 km-es körzetben. Freshkom: +421 909 159 609." },
  },
  "/cennik": {
    sk: { title: "Cenník tepovania a čistenia | Freshkom", description: "Orientačný cenník tepovania a umývania okien v Komárne a okolí do 40 km. Ceny sú bez DPH (23 %); dopravu si overte pri dopyte." },
    hu: { title: "Kárpittisztítás és ablaktisztítás árlista | Freshkom", description: "Tájékoztató árlista Komáromban (SK) és 40 km-es körzetében. Az árak 23% ÁFA nélkül értendők; a kiszállításról érdeklődjön." },
  },
  "/kontakt": {
    sk: { title: "Kontakt — tepovanie a čistenie | Freshkom", description: "Tepovanie v Komárne a do 40 km od mesta: Nové Zámky, Hurbanovo, Kolárovo, Veľký Meder. Kontakt: +421 909 159 609." },
    hu: { title: "Kapcsolat — kárpittisztítás és ablaktisztítás | Freshkom", description: "Kárpittisztítás Komáromban (SK) és 40 km-es körzetében: Érsekújvár, Ógyalla, Gúta, Nagymegyer. Telefon: +421 909 159 609." },
  },
} as const;

export function pageSeo(path: PagePath, lang: SeoLang, base: string) {
  const serviceKey = (Object.keys(serviceMeta) as ServicePageKey[]).find(key => serviceMeta[key].path === path);
  const skUrl = `${base}${localizePath(path, "sk")}`;
  const huUrl = `${base}${localizePath(path, "hu")}`;
  const url = lang === "sk" ? skUrl : huUrl;
  const legalKind = (Object.keys(legalDocuments) as LegalKind[]).find(key => legalDocuments[key].sk.path === path);
  if (legalKind) {
    const doc = legalDocuments[legalKind][lang];
    return {
      title: `${doc.title} | Freshkom`,
      description: doc.description,
      skUrl, huUrl, url,
      schema: {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": `${url}#webpage`,
            url,
            name: doc.title,
            description: doc.description,
            inLanguage: lang,
            publisher: { "@type": "Organization", name: "Comorno s. r. o.", alternateName: "Freshkom", url: base },
            breadcrumb: { "@id": `${url}#breadcrumb` },
            hasPart: {
              "@type": "DigitalDocument",
              name: doc.documentTitle,
              inLanguage: lang,
              encoding: {
                "@type": "MediaObject",
                contentUrl: `${base}/${doc.downloadPath}`,
                encodingFormat: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              },
            },
          },
          {
            "@type": "BreadcrumbList",
            "@id": `${url}#breadcrumb`,
            itemListElement: [
              { "@type": "ListItem", position: 1, name: lang === "sk" ? "Úvod" : "Kezdőlap", item: `${base}${lang === "hu" ? "/hu" : "/"}` },
              { "@type": "ListItem", position: 2, name: doc.title, item: url },
            ],
          },
        ],
      },
    };
  }
  return serviceKey
    ? serviceSeo(serviceKey, lang, base)
    : { ...pageMeta[path as keyof typeof pageMeta][lang], skUrl, huUrl, url, schema: null };
}