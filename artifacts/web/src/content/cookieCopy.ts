export type CookieLang = "sk" | "hu";

export interface CookieCategoryCopy {
  title: string;
  description: string;
}

export interface CookieCopy {
  bannerTitle: string;
  bannerBody: string;
  acceptAll: string;
  rejectOptional: string;
  settings: string;
  privacyLink: string;
  opensNewTab: string;
  dialogTitle: string;
  dialogDescription: string;
  close: string;
  alwaysOn: string;
  off: string;
  on: string;
  necessary: CookieCategoryCopy;
  analytics: CookieCategoryCopy;
  marketing: CookieCategoryCopy;
  savedOn: string;
  saveSelection: string;
  storageFailTitle: string;
  storageFailBody: string;
}

export const cookieCopy: Record<CookieLang, CookieCopy> = {
  sk: {
    bannerTitle: "Cookies",
    bannerBody:
      "Ukladáme vašu voľbu cookies, ktorú môžete kedykoľvek zmeniť.",
    acceptAll: "Prijať všetky",
    rejectOptional: "Odmietnuť nepovinné",
    settings: "Nastavenia",
    privacyLink: "Zásady ochrany osobných údajov",
    opensNewTab: "(otvorí sa v novom okne)",
    dialogTitle: "Nastavenia cookies",
    dialogDescription:
      "Voľbu uložíme na 180 dní. Kedykoľvek ju môžete zmeniť.",
    close: "Zavrieť bez zmeny",
    alwaysOn: "Vždy zapnuté",
    off: "Vypnuté",
    on: "Zapnuté",
    necessary: {
      title: "Nevyhnutné",
      description: "Uloženie vašej voľby cookies.",
    },
    analytics: {
      title: "Analytické",
      description: "Meranie návštevnosti. Momentálne neaktívne.",
    },
    marketing: {
      title: "Marketingové",
      description: "Meranie a prispôsobenie reklamy. Momentálne neaktívne.",
    },
    savedOn: "Uložená voľba platí do",
    saveSelection: "Uložiť výber",
    storageFailTitle: "Voľbu sa nepodarilo uložiť",
    storageFailBody:
      "Váš prehliadač neumožnil uloženie. Voľba platí len do obnovenia stránky.",
  },
  hu: {
    bannerTitle: "Sütik",
    bannerBody:
      "Sütibeállításait elmentjük, és bármikor módosíthatja őket.",
    acceptAll: "Összes elfogadása",
    rejectOptional: "Opcionálisak elutasítása",
    settings: "Beállítások",
    privacyLink: "Adatvédelmi tájékoztató",
    opensNewTab: "(új ablakban nyílik meg)",
    dialogTitle: "Sütibeállítások",
    dialogDescription:
      "Választását 180 napig tároljuk. Bármikor módosíthatja.",
    close: "Bezárás változtatás nélkül",
    alwaysOn: "Mindig bekapcsolva",
    off: "Kikapcsolva",
    on: "Bekapcsolva",
    necessary: {
      title: "Szükséges",
      description: "A sütibeállítások megjegyzése.",
    },
    analytics: {
      title: "Analitikai",
      description: "Látogatottság mérése. Jelenleg inaktív.",
    },
    marketing: {
      title: "Marketing",
      description: "Hirdetések mérése és személyre szabása. Jelenleg inaktív.",
    },
    savedOn: "A mentett választás érvényes:",
    saveSelection: "Választás mentése",
    storageFailTitle: "A választást nem sikerült menteni",
    storageFailBody:
      "A böngészője nem engedte a mentést. A választás csak az oldal újratöltéséig érvényes.",
  },
};
