---
name: Prerendered Vite CSS
description: Why Vite dev SSR needs a direct stylesheet link before hydration
---

When Vite serves prerendered React HTML through development middleware, do not rely solely on a CSS import in the browser entry point. Make the stylesheet discoverable in the HTML head. Vite's normal development CSS-module URL serves JavaScript, while the direct stylesheet variant serves `text/css`; the production build replaces the link with a hashed CSS asset.

**Why:** The HTML arrived before the client entry point loaded, so visitors briefly saw a completely unstyled page and oversized SVGs, even though the hydrated screenshot looked correct.

**How to apply:** After changing SSR or CSS loading, check the development stylesheet's response Content-Type, inspect the generated production link, and capture the initial page with JavaScript disabled at phone and desktop sizes. Keep font styles available through the same head stylesheet so they do not depend on hydration.