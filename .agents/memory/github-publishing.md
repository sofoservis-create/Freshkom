---
name: GitHub publishing checks
description: Avoid mistaking cached Git tracking refs for a successful live publication
---

Never infer that the website is already published to GitHub solely from local remote-tracking refs or a small ahead/behind count. Verify authenticated live refs and the result of the actual push.

**Why:** A cached remote branch appeared to contain the website, but the Git pane subsequently reported that the live remote branch was missing. The earlier inference of a completed sync was unsupported.

**How to apply:** Check the remote URL, live branches, and upstream configuration. If the intended branch is missing, publish it with a non-force push after authentication works. Do not blindly rename to another branch or discard remote history to suppress a missing-ref error.
