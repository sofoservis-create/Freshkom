---
name: Contact consent policy
description: Keep acknowledgement, explicit marketing permission, and customer-offer notices distinct across SK/HU forms.
---

The user requires two separate initially unchecked controls in every contact form: mandatory acknowledgement of the privacy policy and optional email/SMS marketing permission. The supplied one-year notice about similar services for existing customers is informational; it must not automatically turn explicit marketing permission on.

Never infer consent for historical enquiries without a recorded choice. Record the server-side receipt time, notice language, and a notice version for new choices. A material change to consent wording must receive a new notice version; do not rewrite historical consent records to match new wording.

**Why:** Privacy acknowledgement is not marketing consent. Treating an informational customer notice or historical missing data as explicit opt-in would misrepresent what the visitor selected.

**How to apply:** Preserve false defaults after successful form resets, validate acknowledgement on every submission path, and keep historical unknown choices distinguishable from an explicit no. Capturing permission does not itself implement campaign sending, unsubscribe links, or inbound SMS STOP handling.
