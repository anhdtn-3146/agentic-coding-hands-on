# /sun-kudos Live Board: Parallel Agents & Duplicate Logic Bugs

**Date**: 2026-07-10 16:30
**Severity**: Medium (caught in review, not shipped)
**Component**: `/sun-kudos` page, kudos feed, highlight card, spotlight sidebar
**Status**: Resolved (UNCOMMITTED pending user merge decision)

## What Happened

Implemented the Sun* Kudos Live board screen (MoMorph MaZUn5xHXZ, 64 specs / 41 test cases) using the two-track MoMorph protocol: orchestrator pre-scaffolded the page shell and shared i18n namespaces, then spawned 3 parallel background implementer agents to build feed, highlight card, and spotlight sidebar sections independently. Each agent worked with prefix-scoped file ownership (kv-/highlight- vs feed-/sidebar- vs spotlight-) against a shared dev server. Build completed with 0 console errors. Tester found 1 blocker (pre-existing ref-during-render in image-upload.tsx), fixed it. Reviewer scored 8/10, applied all 4 recommendations. Delivered UNCOMMITTED on feat.sun-kudos per user choice.

## The Brutal Truth

The review caught something that should have been impossible: both the feed and highlight card agents independently implemented the exact same like-count logic bug. Two different humans, two different code files, same mistake. This happened because parallel agents can't see each other's implementations and both had to interpret the spec. The like-count pattern — derived vs state — ended up identical in both components. Neither reviewer caught it in isolation; only the cross-cutting review comparing the two implementations exposed it. This is the hidden tax of parallelism: you trade merge conflicts for subtle duplicated bugs. If we'd run sequentially, the first agent's implementation would have been visible to the second, preventing the duplication. Parallel speed came with an invisible cost.

## Technical Details

**The Like-Count Bug (caught in review):**
- Feed card: `const likeCount = kudos.likesCount` (state from data)
- Highlight card: `const likeCount = kudos.likesCount` (identical pattern)
- Problem: UI mutated state directly via button click instead of deriving from canonical source
- Fix: Replaced both with consistent derived pattern (`const likeCount = useMemo(...)`)
- Root: Spec didn't explicitly say "derived vs state"; agents guessed independently and guessed wrong in parallel

**Pre-existing Blocker (fixed):**
- File: `components/kudos/kudos-image-upload.tsx`
- Error: ref written during render (getTextContent function captured DOM node outside useCallback)
- Solution: Wrapped in useRef + useEffect (deferred to render cycle)

**Other Technical Notes:**
- Media export failed for small non-MM_MEDIA vector icons (401/500 from MoMorph) → agents hand-authored SVGs, verified against screenshots
- 2 unused i18n keys pruned (kudosBoard.missingTitle, kudosFeed.emptyState variants)
- Dead button tab-stops replaced with spans (accessibility review)
- All aria-labels wired through t() for localization

**Other Session Outcomes:**
- `/award-info` verified against design (1-line locale fix applied)
- Chrome background extension bug fixed via `color-scheme: dark` declaration
- Hydration warning suppressed for extension-injected attributes

## What We Tried

1. **Prefix-scoped file ownership**: kv-/highlight- vs feed-/sidebar- vs spotlight-. Worked perfectly — zero merge conflicts across 3 agents. Orchestrator owned shared files (hooks, i18n, page shell). Prevented file contention entirely.
2. **Figma-only mock data**: Agents extracted text, image placeholders, sample values directly from design. No invented data. Kept implementations consistent with visual spec.
3. **Cross-cutting review**: Reviewer compared outputs across agents instead of reviewing in isolation. Caught the like-count duplication only here.
4. **Sequential fix loop**: Tester → Reviewer → Fix → Tester again. Applied all recommendations before delivery.

## Root Cause Analysis

**Why did parallel agents write the same bug?**

Parallel execution means agents cannot see each other's code. When the spec is ambiguous (like-count: should it be state or derived?), each agent makes a local decision without knowing the other made the same choice. In sequential development, the first implementation would be visible to the second, enabling consistency checking. In parallel development, consistency requires either:
- Explicit upfront spec that removes ambiguity (we had partial spec clarity, agents still guessed)
- Cross-cutting review at the end (we did this, caught the bug)
- Shared code review during implementation (not practical with parallel agents)

This isn't a bug in the protocol — it's inherent to parallelism. Speed and conflict-free file ownership come with a hidden cost: you must review across agent boundaries, not within them.

## Lessons Learned

1. **Parallel agents duplicate subtle bugs across shared logic**: When multiple agents implement similar features, identical bugs appear independently. Single-agent review misses these. Always cross-cut review parallel outputs.

2. **Prefix-scoped file ownership eliminates merge conflicts but not logic duplication**: Ownership patterns are excellent for preventing git conflicts, but don't prevent duplicate implementations. They're complementary, not redundant.

3. **MoMorph media export has limitations**: Small vector icons outside MM_MEDIA export set fail (401/500). Hand-authored SVG workaround is reliable but requires manual screenshot verification.

4. **Playwright shared browser needs dedicated tabs per agent**: Memory note exists but not enforced. Risk: tab state leakage between agents. For next parallel session, allocate one tab per agent upfront.

5. **Spec ambiguity drives independent agent decisions**: When specs leave room for interpretation (state vs derived), parallel agents will interpret separately. Tighten specs before spawning parallel agents, or accept that cross-cutting review is mandatory.

## Next Steps

1. **Commit decision**: User has not merged feat.sun-kudos to main yet. Ready when user decides.
2. **Playwright memory investigation**: Shared browser tab usage should be profiled. Current note is observational; should implement per-agent tab allocation for next parallel session.
3. **MoMorph media export wrapper**: Consider building a small utility to pre-handle export failures, auto-generate SVG fallbacks for small icons.
4. **Spec tightening template**: For future MoMorph two-track work, clarifications.md should include explicit patterns for ambiguous implementation decisions (state vs derived, error handling strategy, empty state behavior, etc.).

**Owner**: User merges at their discretion. Next parallel session should apply per-agent Playwright tabs + tighter spec pattern guidelines.
