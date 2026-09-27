---
name: Vercel function builds
description: Why a completed Vercel deployment does not prove the API functions compiled successfully.
---

Treat TypeScript errors in Vercel's function compilation as blocking, even if its overall deployment ends with “Build Completed” and “Deployment completed.”

**Why:** A deployment containing API TypeScript errors still went live; the affected endpoints returned `FUNCTION_INVOCATION_FAILED` instead of usable responses. A successful Vite frontend build was not evidence that the functions worked.

**How to apply:** Make the deployment's build command run a separate, failing TypeScript check for the API directory before building the frontend. Confirm the public API response after the next Git-based Vercel deployment; when a function still returns 500, obtain its runtime log rather than assuming an environment variable is missing.

Vercel's Node function loader expects CommonJS in this project's package scope. Use NodeNext module and resolution settings for the Vercel API TypeScript: it resolves workspace package exports while emitting CommonJS for the root-level function entries.

**Why:** ESNext/Bundler made the API typecheck pass, but Vercel emitted an entry file containing `import` and then tried to load that `.js` as CommonJS. Every invocation failed before reaching the handler.

**How to apply:** For changes to the Vercel API compiler setup, check both the TypeScript result and the actual emitted function entry format. A successful typecheck alone does not verify Node can load it.

A locally loadable CommonJS entry still does not prove Vercel will package its cross-workspace TypeScript dependencies. If the published function crashes before returning JSON, inspect runtime logs and dependency tracing; for a small endpoint, a self-contained Vercel function can eliminate that dependency boundary.

**Why:** Switching to NodeNext produced a valid CommonJS entry locally, but the next Vercel deployment still returned `FUNCTION_INVOCATION_FAILED` for functions importing code from other workspace packages. The build log was clean and did not explain the runtime crash.

**How to apply:** Verify the published endpoint after each Git deployment and distinguish startup failures (500 from the platform) from handler errors (JSON status from the app). Do not assume that a local typecheck or build guarantees deployed function startup.