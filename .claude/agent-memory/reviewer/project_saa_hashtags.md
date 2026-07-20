---
name: project-saa-hashtags
description: SAA_HASHTAGS canonical list is the shared source of truth for kudos hashtag picker + board filter
metadata:
  type: project
---

`lib/saa-hashtags.ts` exports `SAA_HASHTAGS` (8-item `as const` tuple of brand-English core-value labels, e.g. "High-performing", "Wasshoi") — canonical per MoMorph screen p9zO-c4a4x node 1002:13013. It is the single shared source for:

- `components/kudos/kudos-hashtag-input.tsx` — write-form multi-select picker (max 5, fixed list, no free text)
- `components/kudos-board/highlight-section.tsx` — board Highlight hashtag filter (deduped union of `SAA_HASHTAGS`, single-select unchanged)

Values are stored/rendered without a leading "#" in all data structures (`SAA_HASHTAGS`, `HighlightKudo.hashtags`) — the "#" is only added at render time (e.g. `` `#${h}` ``). Confirmed consistent when reviewing — no format mismatch between the canonical list and existing mock hashtag data.

Design has an intentional-but-corrected typo: Figma renders "High-perorming", code correctly uses "High-performing" per plan clarifications in `plans/260713-1046-shared-saa-hashtags/clarifications.md` — do not flag this as a bug.

**Why:** avoids re-litigating "is this data duplicated / is the # prefix inconsistent" in future reviews touching kudos hashtags.

**How to apply:** when reviewing future changes to kudos hashtag/tag features, check `lib/saa-hashtags.ts` first as the canonical source before assuming a new local list is needed.
