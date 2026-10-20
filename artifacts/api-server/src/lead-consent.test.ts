import { test, after } from "node:test";
import assert from "node:assert/strict";
import { SubmitLeadBody } from "@workspace/api-zod";
import { db, leadsTable, pool } from "@workspace/db";
import { recordLeadConsent } from "@workspace/email-template";

after(async () => { await pool.end(); });

const base = {
  name: "Consent integration test",
  phone: "+421900000000",
  email: "consent-test@example.invalid",
  service: "ine" as const,
};

test("API contract rejects missing, false, or non-boolean privacy choices", () => {
  for (const privacyAcknowledged of [undefined, null, false, "true", 1]) {
    assert.equal(SubmitLeadBody.safeParse({ ...base, privacyAcknowledged, marketingConsent: false, consentLanguage: "sk" }).success, false);
  }
  for (const marketingConsent of [undefined, "false", "true", 0]) {
    assert.equal(SubmitLeadBody.safeParse({ ...base, privacyAcknowledged: true, marketingConsent, consentLanguage: "hu" }).success, false);
  }
});

class RollbackConsentTest extends Error {}

test("both explicit marketing choices and their audit metadata persist without creating test enquiries", async () => {
  await assert.rejects(db.transaction(async (tx) => {
    for (const consentLanguage of ["sk", "hu"] as const) {
      for (const marketingConsent of [false, true]) {
        const parsed = SubmitLeadBody.parse({ ...base, privacyAcknowledged: true, marketingConsent, consentLanguage });
        const record = recordLeadConsent(parsed);
        assert.equal(record.success, true);
        if (!record.success) throw new Error("Consent parsing failed");
        const [row] = await tx.insert(leadsTable).values({
          ...parsed,
          ...record.data,
          consentRecordedAt: new Date(record.data.consentRecordedAt),
        }).returning();
        assert.equal(row.privacyAcknowledged, true);
        assert.equal(row.marketingConsent, marketingConsent);
        assert.equal(row.consentLanguage, consentLanguage);
        assert.equal(row.consentVersion, record.data.consentVersion);
        assert.equal(row.consentRecordedAt?.toISOString(), record.data.consentRecordedAt);
      }
    }
    throw new RollbackConsentTest();
  }), RollbackConsentTest);
});
