---
name: Google review identity
description: Why live Google ratings need business identity verification before appearing on Freshkom.
---

Do not assume a supplied Google Place ID belongs to Freshkom simply because the API successfully returns reviews. Verify the public business name and location before using its rating, and fail closed if the listing identity is wrong.

**Why:** A working Google API key once returned a valid rating for a different business because the configured Place ID pointed there. The site briefly showed those unrelated reviews until the listing identity was checked.

**How to apply:** Whenever changing the review source or Place ID, verify the public listing is Freshkom in Komárno before allowing its aggregate rating or review texts into UI and structured data. Do not silently fall back to arbitrary or static review figures when identity checks fail.