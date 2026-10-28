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
const towns = ["Zvolen", "Sliač", "Banská Bystrica", "Detva", "Krupina", "Kremnica", "Banská Štiavnica", "Žiar nad Hronom", "Hriňová", "Podbrezová"];

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
          "Elektrikár vo Zvolene a okolí: elektroinštalácie a rozvody, istiace skrinky a rozvádzače, svietidlá, zásuvky a hľadanie porúch v bytoch a domoch.",
        telephone: business.phone,
        email: business.email,
        identifier: { "@type": "PropertyValue", name: "IČO", value: business.ico },
        founder: { "@id": `${site}/#david` },
        address: {
          "@type": "PostalAddress",
          streetAddress: "Prachatická 2478/18",
          postalCode: "960 01",
          addressLocality: "Zvolen",
          addressRegion: "Banskobystrický kraj",
          addressCountry: "SK",
        },
        geo: { "@type": "GeoCoordinates", latitude: 48.5747, longitude: 19.153 },
        areaServed: towns.map((name) => ({ "@type": "City", name })),
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
            itemOffered: { "@type": "Service", name, description, areaServed: "Zvolen a okolie" },
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
        address: { "@type": "PostalAddress", addressLocality: "Zvolen", addressCountry: "SK" },
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
        name: "Elektrikár Zvolen | Elektrika Kubiš",
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
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (textExt.has(extname(p))) {
      let s = readFileSync(p, "utf8");
      if (name === "index.html") s = s.replace("__JSONLD__", JSON.stringify(jsonLd(s)).replaceAll("<", "\\u003c"));
      writeFileSync(p, s.replaceAll("__SITE_URL__", site).replaceAll("__LASTMOD__", lastmod));
    }
  }
})(dist);

console.log(`[build] elektrika-kubis → ${dist} (${site})`);
