import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { serviceMeta, serviceSeo, type SeoLang, type ServicePageKey } from "./src/seo/serviceMeta";

function serviceShell(html: string, key: ServicePageKey, lang: SeoLang, base: string): string {
  const data = serviceSeo(key, lang, base);
  const escape = (value: string) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
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
    `<script data-static-seo type="application/ld+json">${JSON.stringify(data.schema).replaceAll("<", "\\u003c")}</script>`,
  ].join("\n    ");
  return html.replace(/<link rel="preload" as="image"[^>]*\/>/, "")
    .replace('<html lang="sk">', `<html lang="${lang}">`)
    .replace(/<title>[^<]*<\/title>/, `<title>${escape(data.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta data-static-seo name="description" content="${escape(data.description)}" />`)
    .replace("</head>", `    ${meta}\n  </head>`);
}

function serviceShellPlugin(): Plugin {
  const base = (process.env.VITE_APP_URL || "https://freshkom.sk").replace(/\/$/, "");
  const routes = Object.entries(serviceMeta).flatMap(([key, item]) =>
    (["sk", "hu"] as const).map((lang) => ({
      key: key as ServicePageKey,
      lang,
      path: item.path,
      file: `${item.path.slice(1)}${lang === "hu" ? "-hu" : ""}.html`,
    })),
  );
  return {
    name: "freshkom-service-html-shells",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url || "/", "http://localhost");
        const route = routes.find((entry) => entry.path === url.pathname && entry.lang === (url.searchParams.get("lang") === "hu" ? "hu" : "sk"));
        if (!route) return next();
        try {
          const source = fs.readFileSync(path.resolve(import.meta.dirname, "index.html"), "utf-8");
          const transformed = await server.transformIndexHtml(url.pathname, source);
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.end(serviceShell(transformed, route.key, route.lang, base));
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
        fs.writeFileSync(path.join(outDir, route.file), serviceShell(index, route.key, route.lang, base));
      }
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
    serviceShellPlugin(),
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
