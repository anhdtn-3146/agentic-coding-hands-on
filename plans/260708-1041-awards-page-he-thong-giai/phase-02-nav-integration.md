# Phase 02 — Top-nav integration (Track B)

**Goal:** Wire the top-nav "Award Information" tab to the new `/he-thong-giai` route without breaking the homepage.

## In scope — `components/common/nav-links.tsx`
- Make the component `usePathname()`-aware.
- "Award Information" → route link `/he-thong-giai` (on BOTH homepage and awards page).
- "About SAA 2025" → `/#about`, "Sun* Kudos" → `/#kudos` (cross-page hash nav from awards page; unchanged scroll behavior on homepage).
- Active state: on `/he-thong-giai`, force "Award Information" active (gold + underline). On `/`, keep existing hash scrollspy for about/kudos.
- Keep all existing visual classes (`activeClasses`/`inactiveClasses`) unchanged.

## Out of scope
- Footer nav links (leave as homepage hash anchors).
- Any change to homepage `app/page.tsx` layout.

## Integration contract
- Depends on Phase 01 anchor ids only indirectly; can run in parallel.
- Verify homepage nav still works (About/Sun* Kudos scroll; Award Information now navigates away).

## Validate
`yarn build` / tsc clean; manual check both routes' header.
