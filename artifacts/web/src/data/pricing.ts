import type { TranslationKeys } from "@/i18n";

export interface PricingItem {
  name: string;
  price: string;
  img: string;
  badge?: string;
}

export interface PricingSection {
  id: string;
  title: string;
  items: PricingItem[];
}

type PricingKey = keyof TranslationKeys["pricing"];
type Translate = (key: `pricing.${PricingKey}`) => string;

// The same catalog powers the full Cenník and both service landing pages.
export function getPricingSections(t: Translate): PricingSection[] {
  return [
    {
      id: "tepovanie-gaucov",
      title: t("pricing.sectionCouches"),
      items: [
        { name: t("pricing.armchair"), price: "20 €", img: "item-kreslo.webp" },
        { name: t("pricing.couch2"), price: "30 €", img: "item-sedacka-2m.webp" },
        { name: t("pricing.couch3"), price: "40 €", img: "item-sedacka-3m.webp", badge: t("pricing.badgeMostPopular") },
        { name: t("pricing.couchL"), price: "50 €", img: "item-sedacka-l.webp" },
        { name: t("pricing.couchU"), price: "60 €", img: "item-sedacka-u.webp" },
        { name: t("pricing.chair"), price: "5 €", img: "item-stolicka.webp" },
      ],
    },
    {
      id: "tepovanie-kobercov",
      title: t("pricing.sectionCarpets"),
      items: [
        { name: t("pricing.carpetShort"), price: "3 € / m²", img: "item-koberec-kratky.webp" },
        { name: t("pricing.carpetLong"), price: "4,50 € / m²", img: "item-koberec-dlhy.webp" },
      ],
    },
    {
      id: "tepovanie-matracov",
      title: t("pricing.sectionMattresses"),
      items: [
        { name: t("pricing.mattressSingle"), price: "11 €", img: "item-matrac-1.webp" },
        { name: t("pricing.mattressDouble"), price: "22 €", img: "item-matrac-2.webp" },
      ],
    },
    {
      id: "tepovanie-aut",
      title: t("pricing.sectionCars"),
      items: [
        { name: t("pricing.carSeats"), price: "55 €", img: "item-auto-sedacky.webp" },
        { name: t("pricing.carInterior"), price: "80 €", img: "item-auto-interier.webp" },
      ],
    },
    {
      id: "umyvanie-okien",
      title: t("pricing.sectionWindows"),
      items: [
        { name: t("pricing.windowSmall"), price: "6 €", img: "item-okno-male.webp" },
        { name: t("pricing.window1"), price: "10 €", img: "item-okno-1.webp" },
        { name: t("pricing.windowBalcony"), price: "12 €", img: "item-okno-balkon.webp" },
        { name: t("pricing.shopWindow"), price: t("pricing.byAgreement"), img: "item-vyklad.webp" },
      ],
    },
  ];
}

export const transportPrices = { komarno: "5 €", outside: "+ 0,30 € / km" } as const;