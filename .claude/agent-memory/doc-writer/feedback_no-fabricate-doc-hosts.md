---
name: feedback-no-fabricate-doc-hosts
description: Don't invent a doc file/tree to host a new note just because a feature seems to warrant one -- only add to docs that are already genuinely maintained
metadata:
  type: feedback
---

When a docs-impact review surfaces a plausible new note (e.g., "how to add a translation string" after an i18n feature landed), only write it if a suitable *already-maintained* doc exists to host it. Do not create a new doc file or docs subtree, and do not repurpose a file that isn't actually used as living documentation (e.g. the untouched `create-next-app` boilerplate `README.md` in this repo) just to have somewhere to put the note.

**Why:** Explicit instruction from the orchestrating task: "Consider ... ONLY if a suitable existing doc exists to host it (do not fabricate a new docs tree)." This matches the broader project reality — see [[project_docs-state]] — where most of the doc files referenced by project rules don't actually exist yet, and the team hasn't signaled they want them bootstrapped incidentally as a side effect of an unrelated feature task.

**How to apply:** In docs-impact reviews for aidd-app: if the only candidate hosts are (a) an incident-journal directory whose format doesn't fit a how-to note, or (b) unmaintained boilerplate, conclude "no changes needed" rather than editing/creating something. Only bootstrap a new doc when the user explicitly asks for that document to exist.
