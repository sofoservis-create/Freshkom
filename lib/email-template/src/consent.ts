export const LEAD_CONSENT_VERSION = "freshkom-contact-2026-10-20";

export function recordLeadConsent(input: {
  privacyAcknowledged?: unknown;
  marketingConsent?: unknown;
  consentLanguage?: unknown;
}) {
  if (
    input.privacyAcknowledged !== true ||
    typeof input.marketingConsent !== "boolean" ||
    (input.consentLanguage !== "sk" && input.consentLanguage !== "hu")
  ) {
    return { success: false as const };
  }

  return {
    success: true as const,
    data: {
      privacyAcknowledged: true as const,
      marketingConsent: input.marketingConsent,
      consentLanguage: input.consentLanguage,
      consentVersion: LEAD_CONSENT_VERSION,
      consentRecordedAt: new Date().toISOString(),
    },
  };
}
