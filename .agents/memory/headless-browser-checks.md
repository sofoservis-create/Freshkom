---
name: Headless browser checks
description: Caveats for direct browser checks in this Replit environment
---

When checking UI through headless Chromium's debugging protocol, select a page target by both type and URL rather than taking the first target. After navigation or reload, wait for the expected hydrated DOM state, not just the URL or a node that could still belong to the old document.

**Why:** The browser exposes an extension background target before the app page, and a reload can briefly leave the old document visible. Both caused misleading failures during interactive verification.

**How to apply:** Only for direct browser-protocol checks; use a target with the app URL and poll for the expected language/control state after route changes.