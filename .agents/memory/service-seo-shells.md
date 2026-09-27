---
name: Service page prerendering
description: Why localized pages should render real React HTML before the browser hydrates them
---

For localized pages, prepare the real React page as static HTML at build time and serve it for direct requests; hydrate that same tree in the browser. Keep route-specific head tags available before JavaScript and derive build-time and client metadata from the same definitions.

**Why:** The default SPA fallback sends homepage metadata to every path, while a separate simplified SEO shell visibly replaced itself during refresh. Prerendering the actual page addresses both without switching frameworks.

**How to apply:** When adding a route or language, update the build-time prerender list and host rewrites together, and verify both raw HTML and hydrated output. Avoid build-time external-data requests for reviews so deploys stay deterministic.

Keep above-the-fold elements visible in the prerendered HTML rather than giving them initial zero opacity via entrance animations; effects can animate later sections. Use route- and viewport-specific image preloads so desktop-only assets do not consume mobile bandwidth.

**Why:** Visible content before hydration and correct early resource priority matter more than a decorative entrance effect or an indiscriminate preload.

**How to apply:** Inspect initial server HTML, preload links, and first paint at mobile and desktop widths whenever hero or animation markup changes.