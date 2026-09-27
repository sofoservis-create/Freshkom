import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { pageSeo } from "./src/seo/pageMeta";
import { pagePaths, localizePath, type PagePath } from "./src/seo/routes";
import type { SeoLang } from "./src/seo/serviceMeta";
import { translations } from "./src/i18n";
import { getPricingSections } from "./src/data/pricing";

const escape = (value: string) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");

function staticContent(pathname: PagePath, lang: SeoLang): string {
  const t = (key: string) => {
    const [section, item] = key.split(".");
    return (translations[lang] as unknown as Record<string, Record<string, string>>)[section][item];
  };
  const isUpholstery = pathname === "/tepovanie-komarno";
  const isWindows = pathname === "/cistenie-okien-komarno";
  const service = isUpholstery || isWindows;
  const data = pageSeo(pathname, lang, "");
  const prices = service ? getPricingSections(t).filter(section =>
    isUpholstery ? section.id !== "umyvanie-okien" : section.id === "umyvanie-okien") : [];
  const location = lang === "sk" ? "Komárne (Slovensko) a Komárome (Maďarsko)" : "Komáromban (Magyarország) és Komárnóban (Szlovákia)";
  const intro = lang === "sk"
    ? `Služby poskytujeme v ${location}. Pre cenu dopravy a termín nás kontaktujte.`
    : `Szolgáltatásaink ${location} érhetők el. A kiszállításról és az időpontról érdeklődjön nálunk.`;
  return `<main style="max-width:960px;margin:3rem auto;padding:1rem;font:16px/1.6 system-ui,sans-serif;color:#163c3e">
    <h1>${escape(service ? (data as ReturnType<typeof pageSeo>).title : pathname === "/" ? t("hero.titleLine1") + " " + t("hero.titleLine2") : t(pathname === "/cennik" ? "pricing.pageTitle" : "kontakt.pageTitle"))}</h1>
    <p>${escape(data.description)}</p><p>${escape(intro)}</p>
    ${prices.map(section => `<section><h2>${escape(section.title)}</h2><ul>${section.items.map(item => `<li>${escape(item.name)} — ${escape(item.price)}</li>`).join("")}</ul></section>`).join("")}
    <p>${lang === "sk" ? "Orientačné ceny služieb nájdete" : "Tájékoztató árainkat megtalálja"} <a href="${localizePath("/cennik", lang)}">${lang === "sk" ? "v cenníku" : "az árlistában"}</a>.</p>
    <p><a href="tel:+421909159609">+421 909 159 609</a> · <a href="mailto:info@freshkom.sk">info@freshkom.sk</a> · <a href="${localizePath("/kontakt", lang)}">${lang === "sk" ? "Kontakt" : "Kapcsolat"}</a></p>
  </main>`;
}

function pageShell(html: string, pathname: PagePath, lang: SeoLang, base: string): string {
  const data = pageSeo(pathname, lang, base);
  const meta = [
    `<link data-static-seo rel="canonical" href="${escape(data.url)}">`,
    `<link data-static-seo rel="alternate" hreflang="sk" href="${escape(data.skUrl)}">`,
    `<link data-static-seo rel="alternate" hreflang="hu" href="${escape(data.huUrl)}">`,
    `<link data-static-seo rel="alternate" hreflang="x-default" href="${escape(data.skUrl)}">`,
    `<meta data-static-seo property="og:type" content="website">`,
    `<meta data-static-seo property="og:title" content="${escape(data.title)}">`,
    `<meta data-static-seo property="og:description" content="${escape(data.description)}">`,
    `<meta data-static-seo property="og:url" content="${escape(data.url)}">`,
    `<meta data-static-seo property="og:image" content="${escape(base)}/opengraph.jpg">`,
    `<meta data-static-seo property="og:locale" content="${lang === "sk" ? "sk_SK" : "hu_HU"}">`,
    `<meta data-static-seo name="twitter:card" content="summary_large_image">`,
    ...(data.schema ? [`<script data-static-seo type="application/ld+json">${JSON.stringify(data.schema).replaceAll("<", "\\u003c")}</script>`] : []),
  ].join("\n    ");
  return html.replace(pathname === "/" ? /$^/ : /<link rel="preload" as="image"[^>]*\/>/, "")
    .replace('<html lang="sk">', `<html lang="${lang}">`)
    .replace(/<title>[^<]*<\/title>/, `<title>${escape(data.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta data-static-seo name="description" content="${escape(data.description)}" />`)
    .replace("</head>", `    ${meta}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${staticContent(pathname, lang)}</div>`);
}

function pageShellPlugin(): Plugin {
  const base = (process.env.VITE_APP_URL || "https://freshkom.sk").replace(/\/$/, "");
  const routes = pagePaths.flatMap((pathname) =>
    (["sk", "hu"] as const).map((lang) => ({
      lang,
      pathname,
      path: localizePath(pathname, lang),
      file: `${lang === "hu" ? "hu" : "sk"}${pathname === "/" ? "" : pathname.replaceAll("/", "-")}.html`,
    })),
  );
  return {
    name: "freshkom-language-html-shells",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url || "/", "http://localhost");
        if (url.searchParams.get("lang") === "hu") {
          const oldPath = url.pathname === "/hu" ? "/" : url.pathname.replace(/^\/hu(?=\/)/, "");
          if (pagePaths.some(path => path === oldPath)) {
            url.searchParams.delete("lang");
            res.statusCode = 308;
            res.setHeader("Location", localizePath(oldPath, "hu") + url.search + url.hash);
            res.end();
            return;
          }
        }
        const route = routes.find((entry) => entry.path === url.pathname);
        if (!route) return next();
        try {
          const source = fs.readFileSync(path.resolve(import.meta.dirname, "index.html"), "utf-8");
          const transformed = await server.transformIndexHtml(url.pathname, source);
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.end(pageShell(transformed, route.pathname, route.lang, base));
        } catch (error) {
          next(error);
        }
      });
    },
    closeBundle() {
      const outDir = path.resolve(import.meta.dirname, "dist");
      const indexPath = path.join(outDir, "index.html");
      if (!fs.existsSync(indexPath)) return;
      const index = fs.readFileSync(indexPath, "utf-8");
      for (const route of routes) {
        fs.writeFileSync(path.join(outDir, route.file), pageShell(index, route.pathname, route.lang, base));
      }
      // The filesystem may serve index.html for "/" before evaluating rewrites.
      fs.writeFileSync(indexPath, pageShell(index, "/", "sk", base));
    },
  };
}

function seoCanonicalPlugin(): Plugin {
  const PLACEHOLDER_DOMAIN = "https://freshkom.sk";
  return {
    name: "seo-canonical-domain",
    closeBundle() {
      const siteUrl = (process.env.VITE_APP_URL || PLACEHOLDER_DOMAIN).replace(/\/$/, "");
      if (siteUrl === PLACEHOLDER_DOMAIN) return;
      const outDir = path.resolve(import.meta.dirname, "dist");
      for (const file of ["sitemap.xml", "robots.txt"]) {
        const filePath = path.join(outDir, file);
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, "utf-8");
          fs.writeFileSync(filePath, content.replaceAll(PLACEHOLDER_DOMAIN, siteUrl));
        }
      }
    },
  };
}

const rawPort = process.env.PORT;
const port = rawPort ? Number(rawPort) : 3000;

if (rawPort && (Number.isNaN(port) || port <= 0)) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH || "/";

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    seoCanonicalPlugin(),
    pageShellPlugin(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
  server: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
