---
name: Published discovery files
description: Why public machine-readable file audits can fail despite correct local source content.
---

For agent-discovery audit failures, inspect the published URL's response body and Content-Type before editing the local document.

**Why:** A PageSpeed audit reported a missing H1 and links even though the local file had an H1. The published URL returned the SPA's HTML entry page with HTTP 200 because the requested static resource was absent from that deployment. The same fallback made a missing JSON catalog look like a malformed manifest.

**How to apply:** Verify that each expected root-level static resource is included in the production build and actually returns its intended plain-text or JSON body on the published domain. A local preview or source file alone does not prove the published file exists. Lighthouse's llms.txt check also requires Markdown link syntax, not just bare URLs.