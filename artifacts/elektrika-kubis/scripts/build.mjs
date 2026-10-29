import { cpSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "src");
const dist = join(root, "dist");

const DEFAULT_SITE = "https://www.elektrikakubis.sk";
const fromVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
const site = (process.env.SITE_URL || fromVercel || DEFAULT_SITE).replace(/\/+$/, "");

const business = {
  name: "Elektrika Kubiš",
  owner: "Dávid Kubiš",
  phone: "+421951357127",
  email: "elektrikakubis@gmail.com",
  ico: "54649820",
};
// Jediný zdroj pravdy pre čísla: HTML, JSON-LD aj llms.txt sa generujú z týchto hodnôt.
const stats = { since: 2021, customers: "590+", cableMeters: "15 000+" };
const services = [
  ["Elektroinštalácie a rozvody", "Nové rozvody a rekonštrukcie elektroinštalácií v bytoch a rodinných domoch."],
  ["Rozvádzače a istiace skrinky", "Výmena starých poistiek za ističe a chrániče, nové rozvádzače, prepäťové ochrany."],
  ["Svietidlá a osvetlenie", "Montáž lustrov, LED svietidiel, podhľadových spotov a LED pásov."],
  ["Zásuvky a vypínače", "Výmena a pridanie zásuviek, vypínačov, USB zásuviek a stmievačov."],
  ["Hľadanie porúch a opravy", "Diagnostika a oprava porúch, vypadávajúcich ističov a nefunkčných zásuviek."],
  ["Pripojenie spotrebičov", "Elektrické pripojenie varnej dosky, rúry, ohrievača vody, umývačky či sušičky."],
  ["Elektro pri rekonštrukcii bytu", "Príprava elektriky pred omietkami a montážou kuchyne."],
  ["Drobné elektrikárske práce", "Zvončeky, domáce telefóny, vonkajšie osvetlenie a ďalšie drobné práce."],
];
const towns = ["Bratislava", "Petržalka", "Ružinov", "Nové Mesto", "Karlova Ves", "Dúbravka", "Rača", "Devínska Nová Ves", "Podunajské Biskupice", "Stupava", "Pezinok", "Senec"];

// FAQ sa berie priamo z HTML, aby sa štruktúrované dáta nikdy nerozišli s viditeľným textom.
function faqFromHtml(html) {
  const out = [];
  for (const m of html.matchAll(/<details><summary>(.*?)<\/summary><p>(.*?)<\/p><\/details>/gs)) {
    out.push({
      "@type": "Question",
      name: m[1].trim(),
      acceptedAnswer: { "@type": "Answer", text: m[2].replace(/<[^>]+>/g, "").trim() },
    });
  }
  return out;
}

function jsonLd(html) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Electrician", "LocalBusiness"],
        "@id": `${site}/#business`,
        name: business.name,
        url: `${site}/`,
        image: `${site}/og-image.jpg`,
        logo: `${site}/apple-touch-icon.png`,
        description:
          "Elektrikár v Bratislave a okolí: elektroinštalácie a rozvody, istiace skrinky a rozvádzače, svietidlá, zásuvky a hľadanie porúch v bytoch a domoch.",
        telephone: business.phone,
        email: business.email,
        identifier: { "@type": "PropertyValue", name: "IČO", value: business.ico },
        founder: { "@id": `${site}/#david` },
        // Služby sa poskytujú v Bratislave (bez ulice, ide o službu u zákazníka). Sídlo živnosti (Zvolen) je len vo viditeľnom texte.
        address: { "@type": "PostalAddress", addressLocality: "Bratislava", addressRegion: "Bratislavský kraj", addressCountry: "SK" },
        geo: { "@type": "GeoCoordinates", latitude: 48.1486, longitude: 17.1077 },
        areaServed: towns.map((name) => ({ "@type": "City", name })),
        foundingDate: String(stats.since),
        slogan: `${stats.customers} zákazníkov od roku ${stats.since}`,
        knowsLanguage: "sk",
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: business.phone,
          email: business.email,
          availableLanguage: "sk",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Elektrikárske služby",
          itemListElement: services.map(([name, description]) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name, description, areaServed: "Bratislava a okolie" },
          })),
        },
      },
      {
        "@type": "Person",
        "@id": `${site}/#david`,
        name: business.owner,
        jobTitle: "Elektrikár",
        worksFor: { "@id": `${site}/#business` },
        image: `${site}/images/david-about-1000.webp`,
        address: { "@type": "PostalAddress", addressLocality: "Bratislava", addressCountry: "SK" },
      },
      {
        "@type": "WebSite",
        "@id": `${site}/#website`,
        url: `${site}/`,
        name: business.name,
        inLanguage: "sk-SK",
        publisher: { "@id": `${site}/#business` },
      },
      {
        "@type": "WebPage",
        "@id": `${site}/#webpage`,
        url: `${site}/`,
        name: "Elektrikár Bratislava | Elektrika Kubiš",
        inLanguage: "sk-SK",
        isPartOf: { "@id": `${site}/#website` },
        about: { "@id": `${site}/#business` },
        primaryImageOfPage: `${site}/og-image.jpg`,
      },
      { "@type": "FAQPage", "@id": `${site}/#faq`, mainEntity: faqFromHtml(html) },
    ],
  };
}

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });
cpSync(src, dist, { recursive: true });

const textExt = new Set([".html", ".txt", ".xml", ".webmanifest", ".json", ".svg"]);
const lastmod = new Date().toISOString().slice(0, 10);
const fill = (s) =>
  s
    .replaceAll("__SITE_URL__", site)
    .replaceAll("__LASTMOD__", lastmod)
    .replaceAll("__SINCE__", String(stats.since))
    .replaceAll("__CUSTOMERS__", stats.customers)
    .replaceAll("__CABLE__", stats.cableMeters);
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (textExt.has(extname(p))) {
      let s = fill(readFileSync(p, "utf8"));
      if (name === "index.html") s = s.replace("__JSONLD__", JSON.stringify(jsonLd(s)).replaceAll("<", "\\u003c"));
      writeFileSync(p, s);
    }
  }
})(dist);

// sitemap.xml a llms.txt sa generujú pri každom builde (Vercel ho spúšťa po každom pushi), takže sa nikdy nerozídu s webom.
writeFileSync(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${site}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="sk" href="${site}/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${site}/"/>
  </url>
</urlset>
`,
);
writeFileSync(
  join(dist, "llms.txt"),
  `# ${business.name}

> Elektrikár ${business.owner} v Bratislave. Elektroinštalácie a rozvody, istiace skrinky a rozvádzače, svietidlá, zásuvky a hľadanie porúch v bytoch a rodinných domoch v Bratislave a okolí.

${business.name} je živnostník (IČO ${business.ico}) od roku ${stats.since} so sídlom na Prachatickej 2478/18, 960 01 Zvolen. Služby poskytuje v Bratislave a okolí. Od roku ${stats.since} pracoval pre ${stats.customers} zákazníkov a natiahol ${stats.cableMeters} metrov káblov. Cenu dohodne vopred a za prácu vystaví faktúru.

## Služby

${services.map(([n, d]) => `- ${n}: ${d}`).join("\n")}

## Oblasť pôsobenia

${towns.join(", ")}.

## Kontakt

- Telefón: +421 951 357 127
- WhatsApp: https://wa.me/421951357127
- E-mail: ${business.email}
- Sídlo živnosti: Prachatická 2478/18, 960 01 Zvolen
- Kontaktný formulár: ${site}/#kontakt

## Stránky

- [Úvodná stránka (jediná stránka webu)](${site}/)
- [Sitemap](${site}/sitemap.xml)

## Poznámka k cenám

Web neuvádza pevný cenník. Cena závisí od rozsahu práce a materiálu a dohodne sa pred začatím práce na základe popisu alebo fotky.
`,
);

console.log(`[build] elektrika-kubis → ${dist} (${site})`);
