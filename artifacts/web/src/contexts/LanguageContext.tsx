import { createContext, useContext, useCallback, type ReactNode } from "react";
import { useLocation } from "wouter";
import { translations, type Lang, type TranslationKeys } from "@/i18n";
import { languageOfPath, localizePath } from "@/seo/routes";

type NestedKeyOf<T> = T extends string
  ? ""
  : {
      [K in keyof T & string]: T[K] extends string
        ? K
        : `${K}.${NestedKeyOf<T[K]>}`;
    }[keyof T & string];

type TranslationKey = NestedKeyOf<TranslationKeys>;

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current && typeof current === "object" && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }
  return typeof current === "string" ? current : path;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [location, navigate] = useLocation();
  const lang = languageOfPath(location);

  const setLang = useCallback((newLang: Lang) => {
    if (newLang !== lang) navigate(localizePath(location, newLang) + window.location.hash);
  }, [lang, location, navigate]);

  const t = useCallback(
    (key: TranslationKey): string => {
      return getNestedValue(translations[lang] as unknown as Record<string, unknown>, key);
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
