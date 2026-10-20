import { test } from "node:test";
import assert from "node:assert/strict";
import { recordLeadConsent, LEAD_CONSENT_VERSION } from "./consent";
import { buildLeadEmailHtml } from "./index";

test("privacy acknowledgement must be explicitly true", () => {
  for (const privacyAcknowledged of [undefined, null, false, "true", 1]) {
    assert.equal(recordLeadConsent({ privacyAcknowledged, marketingConsent: false, consentLanguage: "sk" }).success, false);
  }
});

test("marketing is independent and must be a real boolean", () => {
  for (const marketingConsent of [true, false]) {
    for (const consentLanguage of ["sk", "hu"]) {
      const record = recordLeadConsent({ privacyAcknowledged: true, marketingConsent, consentLanguage });
      assert.equal(record.success, true);
      if (record.success) {
        assert.equal(record.data.marketingConsent, marketingConsent);
        assert.equal(record.data.consentLanguage, consentLanguage);
        assert.equal(record.data.consentVersion, LEAD_CONSENT_VERSION);
        assert.ok(Number.isFinite(Date.parse(record.data.consentRecordedAt)));
        const html = buildLeadEmailHtml({ name: "Consent test", phone: "+421900000000", service: "cistenie-koze", ...record.data });
        assert.ok(html.includes(marketingConsent ? "Áno — e-mail a/alebo SMS" : "Nie — bez dobrovoľného súhlasu"));
        assert.ok(html.includes(record.data.consentRecordedAt));
      }
    }
  }
  for (const marketingConsent of [undefined, null, "true", "false", 0, 1]) {
    assert.equal(recordLeadConsent({ privacyAcknowledged: true, marketingConsent, consentLanguage: "sk" }).success, false);
  }
});

test("language must identify the actual localized consent notice", () => {
  for (const consentLanguage of [undefined, null, "", "en"]) {
    assert.equal(recordLeadConsent({ privacyAcknowledged: true, marketingConsent: false, consentLanguage }).success, false);
  }
});

test("historical enquiries without consent are not treated as opted in", () => {
  const html = buildLeadEmailHtml({ name: "Historical test", phone: "+421900000000", service: "ine" });
  assert.ok(html.includes("Nezaznamenané"));
  assert.ok(!html.includes("Áno — e-mail a/alebo SMS"));
});
