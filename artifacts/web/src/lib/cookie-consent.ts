export type CookieCategory = "analytics" | "marketing";
export type ConsentLanguage = "sk" | "hu";
export type CookieChoices = Record<CookieCategory, boolean>;

export interface CookieService {
  id: string;
  category: CookieCategory;
  name: string;
  purpose: string;
  privacyUrl: string;
}

// No optional services are installed. Adding/changing a disclosed service
// changes the signature and invalidates earlier preferences automatically.
export const COOKIE_SERVICES: readonly CookieService[] = [];
export const COOKIE_CONSENT_KEY = "freshkom.cookie-consent";
export const COOKIE_NOTICE_VERSION = "2026-10-21";
export const COOKIE_CONSENT_LIFETIME = 180 * 24 * 60 * 60 * 1000;

export interface CookieConsentRecord extends CookieChoices {
  schemaVersion: 1;
  noticeVersion: string;
  servicesSignature: string;
  necessary: true;
  language: ConsentLanguage;
  recordedAt: string;
  expiresAt: string;
}

export function cookieServicesSignature(services: readonly CookieService[] = COOKIE_SERVICES): string {
  return JSON.stringify([...services].sort((a, b) => a.id.localeCompare(b.id)).map(
    ({ id, category, name, purpose, privacyUrl }) => ({ id, category, name, purpose, privacyUrl }),
  ));
}

export function createCookieConsent(
  choices: CookieChoices,
  language: ConsentLanguage,
  now = Date.now(),
  services: readonly CookieService[] = COOKIE_SERVICES,
): CookieConsentRecord {
  return {
    schemaVersion: 1,
    noticeVersion: COOKIE_NOTICE_VERSION,
    servicesSignature: cookieServicesSignature(services),
    necessary: true,
    analytics: choices.analytics,
    marketing: choices.marketing,
    language,
    recordedAt: new Date(now).toISOString(),
    expiresAt: new Date(now + COOKIE_CONSENT_LIFETIME).toISOString(),
  };
}

export function parseCookieConsent(
  raw: string | null,
  now = Date.now(),
  services: readonly CookieService[] = COOKIE_SERVICES,
): CookieConsentRecord | null {
  if (!raw) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== "object" || Array.isArray(value)) return null;
    const record = value as Record<string, unknown>;
    if (
      record.schemaVersion !== 1 ||
      record.noticeVersion !== COOKIE_NOTICE_VERSION ||
      record.servicesSignature !== cookieServicesSignature(services) ||
      record.necessary !== true ||
      typeof record.analytics !== "boolean" ||
      typeof record.marketing !== "boolean" ||
      (record.language !== "sk" && record.language !== "hu") ||
      typeof record.recordedAt !== "string" ||
      typeof record.expiresAt !== "string"
    ) return null;
    const recordedAt = Date.parse(record.recordedAt);
    const expiresAt = Date.parse(record.expiresAt);
    if (
      !Number.isFinite(recordedAt) || !Number.isFinite(expiresAt) ||
      recordedAt > now + 60_000 || expiresAt <= now ||
      expiresAt <= recordedAt || expiresAt - recordedAt > COOKIE_CONSENT_LIFETIME
    ) return null;
    return {
      schemaVersion: 1, noticeVersion: record.noticeVersion,
      servicesSignature: record.servicesSignature, necessary: true,
      analytics: record.analytics, marketing: record.marketing,
      language: record.language, recordedAt: record.recordedAt, expiresAt: record.expiresAt,
    };
  } catch {
    return null;
  }
}

export function hasConsentForCategory(
  consent: CookieConsentRecord | null,
  category: CookieCategory,
  now = Date.now(),
  services: readonly CookieService[] = COOKIE_SERVICES,
): boolean {
  // Preferences for an empty service list NEVER authorize future pixels.
  return services.some((service) => service.category === category)
    && !!consent
    && !!parseCookieConsent(JSON.stringify(consent), now, services)
    && consent[category] === true;
}
