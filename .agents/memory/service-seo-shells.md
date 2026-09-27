---
name: Service SEO shells
description: Why service pages use language-specific build-time HTML shells alongside client-side routing
---

For localized service landing pages, generate route-specific HTML in the static build and route direct requests to the matching language shell. Client-side head updates alone do not satisfy sharing previews or crawlers that do not execute JavaScript. Build-time and client metadata should use one service definition.

**Why:** The default Vite SPA fallback sends the homepage HTML to every path before JavaScript. That makes direct links share the homepage title and description even when the browser eventually renders the right page.

**How to apply:** When adding another indexable service URL or language, include a matching static response and preserve the query-language mapping in both the server rewrite and the browser language switch. Verify raw HTML for each combination, not just the hydrated preview.