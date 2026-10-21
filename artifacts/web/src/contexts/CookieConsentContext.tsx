import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useLanguage } from "./LanguageContext";
import {
  COOKIE_CONSENT_KEY, createCookieConsent, hasConsentForCategory, parseCookieConsent,
  type CookieCategory, type CookieChoices, type CookieConsentRecord,
} from "@/lib/cookie-consent";

interface CookieConsentContextValue {
  ready: boolean;
  consent: CookieConsentRecord | null;
  bannerVisible: boolean;
  settingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  restoreSettingsFocus: () => void;
  saveConsent: (choices: CookieChoices) => boolean;
  canUseCategory: (category: CookieCategory) => boolean;
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const { lang } = useLanguage();
  const [ready, setReady] = useState(false);
  const [consent, setConsent] = useState<CookieConsentRecord | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsOpener = useRef<string | null>(null);

  useEffect(() => {
    // Client only: server rendering and the first hydration render agree.
    try {
      setConsent(parseCookieConsent(window.localStorage.getItem(COOKIE_CONSENT_KEY)));
    } catch {
      // Storage can be blocked. Default to denied; saving reports the failure.
      setConsent(null);
    }
    setReady(true);
    const onStorage = (event: StorageEvent) => {
      if (event.key === COOKIE_CONSENT_KEY || event.key === null) {
        setConsent(parseCookieConsent(event.newValue));
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    if (!consent) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const checkExpiry = () => {
      if (!parseCookieConsent(JSON.stringify(consent))) {
        setConsent(null);
      } else {
        // JS timeouts cannot exceed about 24 days; re-arm long-lived choices.
        timer = setTimeout(checkExpiry, Math.min(Date.parse(consent.expiresAt) - Date.now(), 2_147_483_647));
      }
    };
    checkExpiry();
    const onFocus = () => {
      if (!parseCookieConsent(JSON.stringify(consent))) setConsent(null);
    };
    window.addEventListener("focus", onFocus);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("focus", onFocus);
    };
  }, [consent]);

  const openSettings = useCallback(() => {
    settingsOpener.current = document.activeElement?.id || null;
    setSettingsOpen(true);
  }, []);
  const closeSettings = useCallback(() => setSettingsOpen(false), []);
  const restoreSettingsFocus = useCallback(() => {
    requestAnimationFrame(() => {
      const opener = settingsOpener.current ? document.getElementById(settingsOpener.current) : null;
      const fallback = document.getElementById("cookie-banner-settings") ?? document.getElementById("cookie-footer-settings");
      (opener ?? fallback)?.focus({ preventScroll: true });
    });
  }, []);
  const saveConsent = useCallback((choices: CookieChoices) => {
    const record = createCookieConsent(choices, lang);
    let persisted = true;
    try {
      window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(record));
    } catch {
      persisted = false;
    }
    // Even with blocked storage, respect this choice for the current visit.
    setConsent(record);
    setSettingsOpen(false);
    return persisted;
  }, [lang]);
  const canUseCategory = useCallback(
    (category: CookieCategory) => ready && hasConsentForCategory(consent, category),
    [ready, consent],
  );
  const value = useMemo(() => ({
    ready, consent, bannerVisible: ready && !consent && !settingsOpen, settingsOpen,
    openSettings, closeSettings, restoreSettingsFocus, saveConsent, canUseCategory,
  }), [ready, consent, settingsOpen, openSettings, closeSettings, restoreSettingsFocus, saveConsent, canUseCategory]);

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) throw new Error("useCookieConsent must be used within CookieConsentProvider");
  return context;
}
