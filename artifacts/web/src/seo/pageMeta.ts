import { serviceMeta, serviceSeo, type SeoLang, type ServicePageKey } from "./serviceMeta";
import { localizePath, type PagePath } from "./routes";

export const pageMeta = {
  "/": {
    sk: { title: "Tepovanie a čistenie Komárno a Komárom | Freshkom", description: "Tepovanie sedačiek, kobercov a čistenie okien v Komárne (SK) aj Komárome (HU). Pozrite si ceny a kontaktujte Freshkom: +421 909 159 609." },
    hu: { title: "Kárpittisztítás és ablaktisztítás Komárom és Komárno | Freshkom", description: "Kanapé-, szőnyeg- és ablaktisztítás Komáromban (HU) és Komárnóban (SK). Nézze meg árainkat, és hívja a Freshkomot: +421 909 159 609." },
  },
  "/cennik": {
    sk: { title: "Cenník tepovania a čistenia | Freshkom", description: "Cenník tepovania a čistenia okien pre Komárno (SK) aj Komárom (HU). Sedačka od 30 €, koberec od 3 €/m². Dopravu si overte pri dopyte." },
    hu: { title: "Kárpittisztítás és ablaktisztítás árlista | Freshkom", description: "Tisztítási árlista Komáromban (HU) és Komárnóban (SK). Kanapé 30 €-tól, szőnyeg 3 €/m²-től. A kiszállítás részleteiről érdeklődjön." },
  },
  "/kontakt": {
    sk: { title: "Kontakt — tepovanie a čistenie | Freshkom", description: "Kontaktujte Freshkom pre tepovanie a čistenie v Komárne (SK) aj Komárome (HU). Telefón: +421 909 159 609, e-mail: info@freshkom.sk." },
    hu: { title: "Kapcsolat — kárpittisztítás és ablaktisztítás | Freshkom", description: "Lépjen kapcsolatba a Freshkommal Komárom (HU) és Komárno (SK) területén. Telefon: +421 909 159 609, e-mail: info@freshkom.sk." },
  },
} as const;

export function pageSeo(path: PagePath, lang: SeoLang, base: string) {
  const serviceKey = (Object.keys(serviceMeta) as ServicePageKey[]).find(key => serviceMeta[key].path === path);
  const skUrl = `${base}${localizePath(path, "sk")}`;
  const huUrl = `${base}${localizePath(path, "hu")}`;
  const url = lang === "sk" ? skUrl : huUrl;
  return serviceKey
    ? serviceSeo(serviceKey, lang, base)
    : { ...pageMeta[path as keyof typeof pageMeta][lang], skUrl, huUrl, url, schema: null };
}