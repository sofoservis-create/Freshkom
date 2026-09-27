import type { SeoLang } from "./serviceMeta";

export const pagePaths = ["/", "/cennik", "/kontakt", "/tepovanie-komarno", "/cistenie-okien-komarno"] as const;
export type PagePath = typeof pagePaths[number];

export function localizePath(path: string, lang: SeoLang): string {
  const [pathname, suffix = ""] = path.split(/(?=[?#])/, 2);
  if (lang === "sk") return `${pathname === "/hu" ? "/" : pathname.replace(/^\/hu(?=\/)/, "")}${suffix}`;
  const plain = pathname === "/hu" ? "/" : pathname.replace(/^\/hu(?=\/)/, "");
  return `${plain === "/" ? "/hu" : `/hu${plain}`}${suffix}`;
}

export function languageOfPath(path: string): SeoLang {
  return path === "/hu" || path.startsWith("/hu/") ? "hu" : "sk";
}