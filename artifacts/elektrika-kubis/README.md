# Elektrika Kubiš – landing page

One-page web pre elektrikára Dávida Kubiša (Zvolen). Čisté HTML/CSS/JS bez frameworku, build len skopíruje
`src/` do `dist/` a doplní doménu + JSON-LD (`scripts/build.mjs`). Formulár posiela dopyty cez `api/lead.ts`
(Vercel Function, rovnaký princíp ako v Freshkom).

## Vercel
- **Root Directory:** `artifacts/elektrika-kubis`
- **Env:** `SITE_URL` (napr. `https://www.elektrikakubis.sk`), `GMAIL_USER`, `GMAIL_APP_PASSWORD`
- Bez `SITE_URL` sa použije `VERCEL_PROJECT_PRODUCTION_URL`, inak predvolená doména v `scripts/build.mjs`.

## Lokálne
`node scripts/build.mjs && npx serve dist` (formulár lokálne nebude odosielať, `/api/lead` beží len na Vercel).
