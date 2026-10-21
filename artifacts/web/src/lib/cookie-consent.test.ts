import { test } from "node:test";
import assert from "node:assert/strict";
import {
  COOKIE_CONSENT_LIFETIME, createCookieConsent, parseCookieConsent,
  hasConsentForCategory, type CookieService,
} from "./cookie-consent";

const now = Date.parse("2026-10-21T12:00:00Z");
const denied = { analytics: false, marketing: false };
const accepted = { analytics: true, marketing: true };

test("all choices, language, timestamp and expiry round-trip without personal data", () => {
  for (const language of ["sk", "hu"] as const) {
    for (const choices of [denied, accepted, { analytics: true, marketing: false }]) {
      const record = createCookieConsent(choices, language, now);
      assert.deepEqual(parseCookieConsent(JSON.stringify(record), now), record);
      assert.equal(Date.parse(record.expiresAt) - now, COOKIE_CONSENT_LIFETIME);
      assert.equal(record.necessary, true);
      assert.equal(record.language, language);
    }
  }
});

test("no optional tracking is allowed now, including after Accept all", () => {
  const record = createCookieConsent(accepted, "sk", now);
  for (const category of ["analytics", "marketing"] as const) {
    assert.equal(hasConsentForCategory(null, category, now), false);
    assert.equal(hasConsentForCategory(record, category, now), false);
  }
});

test("missing, corrupt, tampered, expired and old-notice records are rejected", () => {
  for (const value of [null, "", "{", "[]", "true", "null"]) {
    assert.equal(parseCookieConsent(value, now), null);
  }
  const record = createCookieConsent(accepted, "sk", now);
  for (const changes of [
    { schemaVersion: 0 }, { noticeVersion: "old" }, { necessary: false },
    { analytics: "true" }, { marketing: 1 }, { language: "en" },
    { recordedAt: "bad" }, { expiresAt: "bad" },
    { expiresAt: new Date(now - 1).toISOString() },
    { expiresAt: new Date(now + COOKIE_CONSENT_LIFETIME + 1).toISOString() },
    { recordedAt: new Date(now + 120_000).toISOString() },
  ]) assert.equal(parseCookieConsent(JSON.stringify({ ...record, ...changes }), now), null);
  assert.equal(parseCookieConsent(JSON.stringify(record), now + COOKIE_CONSENT_LIFETIME), null);
});

test("adding any future Google/Meta service invalidates today's permission", () => {
  const today = createCookieConsent(accepted, "hu", now);
  const futureServices: CookieService[] = [{
    id: "future-service", category: "marketing", name: "Future service",
    purpose: "A newly disclosed advertising purpose", privacyUrl: "https://example.invalid/privacy",
  }];
  assert.equal(parseCookieConsent(JSON.stringify(today), now, futureServices), null);
  assert.equal(hasConsentForCategory(today, "marketing", now, futureServices), false);
  const fresh = createCookieConsent(accepted, "hu", now, futureServices);
  assert.equal(hasConsentForCategory(fresh, "marketing", now, futureServices), true);
  assert.equal(hasConsentForCategory(fresh, "analytics", now, futureServices), false);
  const refused = createCookieConsent(denied, "sk", now, futureServices);
  assert.equal(hasConsentForCategory(refused, "marketing", now, futureServices), false);
  const changedPurpose = [{ ...futureServices[0], purpose: "A different purpose" }];
  assert.equal(parseCookieConsent(JSON.stringify(fresh), now, changedPurpose), null);
});
