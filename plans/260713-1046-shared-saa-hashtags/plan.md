---
status: in_progress
blockedBy: []
blocks: []
---

# Plan — Shared SAA hashtag list (write-form picker + board filter)

**Designs:** MoMorph `1002:13013` (picker) + `721:5580` (board filter), file `9ypp4enmFmdK3YAFJLIu6C`.
**Decisions:** see [clarifications.md](./clarifications.md). **Stack:** Next.js 16 · React 19 · Tailwind v4 · i18n.

## Goal

One canonical SAA hashtag dataset shared by (a) the KUDOS write-form multi-select picker and
(b) the kudos-board Highlight hashtag filter — the picker rebuilt to match 1002:13013, the
filter keeping its single-select 721:5580 spec but fed by the combined list.

## Changes

1. **`lib/saa-hashtags.ts` (new)** — `SAA_HASHTAGS` canonical list (8 values).
2. **`components/kudos/kudos-hashtag-input.tsx`** — rebuild dropdown per 1002:13013: fixed multi-select
   list of `SAA_HASHTAGS`, check-in-circle on selected rows, hover highlight, max 5 (disable unselected
   at 5). Drop free-text custom input. Keep removable selected-chips for the closed state.
3. **`components/kudos-board/highlight-section.tsx`** — Hashtag filter `options` = deduped union of
   `SAA_HASHTAGS`; single-select behavior unchanged.
4. i18n: drop now-unused `kudos:hashtag.customPlaceholder`.

## Out of scope

- Rules drawer info panel (unchanged). Department filter (unchanged). Backend (mock/static data).

## Validation

Visual check of the write-form picker (open from widget "Viết Kudos") + board Hashtag filter;
tsc + lint + build; tester + reviewer.
