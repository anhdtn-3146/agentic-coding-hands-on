---
name: project-docs-state
description: Current state of ./docs in aidd-app -- only journals/ exists, no changelog/roadmap/architecture/code-standards/specs docs are maintained
metadata:
  type: project
---

As of 2026-07-08, `./docs/` in this repo (aidd-app) contains only `docs/journals/` (incident-style write-ups, e.g. `2026-07-03-oauth-integration-nextjs-proxy.md`). `docs/specs/` does not exist. The docs referenced by `.claude/rules/documentation-management.md` — `development-roadmap.md`, `project-changelog.md`, `system-architecture.md`, `code-standards.md` — do not exist in this project despite being named in the rules file.

**Why:** Confirmed across at least two separate doc-writer invocations (one earlier same-day session, one this session reviewing i18n docs-impact) that the project simply doesn't maintain these documents yet — this isn't a one-off gap, it's the current steady state.

**How to apply:** When asked to do a docs-impact review or update these files, don't assume they're missing by mistake or treat their absence as something to "fix" by creating them from scratch — only create/populate them if the user explicitly asks for that document to be established. Re-verify quickly with a `find`/`ls` each time (state can change), but don't be surprised if it's still just `journals/`. See [[feedback_no-fabricate-doc-hosts]] for the related judgment call on where to put new notes when no fitting doc exists.
