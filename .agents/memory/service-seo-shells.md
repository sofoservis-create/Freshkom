---
name: Service SEO shells
description: Why service pages use language-specific build-time HTML shells alongside client-side routing
---

For localized service landing pages, generate route-specific HTML in the static build and route direct requests to the matching language shell. Client-side head updates alone do not satisfy sharing previews or crawlers that do not execute JavaScript. Build-time and client metadata should use one service definition.

**Why:** The default Vite SPA fallback sends the homepage HTML to every path before JavaScript. That makes direct links share the homepage title and description even when the browser eventually renders the right page.

**How to apply:** When adding another indexable URL or language, include a matching static response and keep the path-based language mapping consistent in the server rewrite and browser navigation. Verify raw HTML for each combination, not just the hydrated preview.

Keep crawlable HTML visually intentional before JavaScript takes over; it is also the first thing visitors see on a slow refresh. Do not trade the visible fallback for an empty page just to hide a flash.

**Why:** A plain, unstyled SEO fallback briefly appeared to visitors while the client bundle loaded.

**How to apply:** Check the pre-JavaScript response and initial paint as well as the final React page when changing build-time page shells. Keep their first-screen imagery, typography, and layout reasonably aligned.