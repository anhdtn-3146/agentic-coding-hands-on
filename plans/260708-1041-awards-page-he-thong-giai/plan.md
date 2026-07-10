---
status: in_progress
blockedBy: []
blocks: []
---

# Plan — Awards page `/he-thong-giai` (Hệ thống giải thưởng SAA 2025)

**Design:** MoMorph "Hệ thống giải" — https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/zFYDgyj_pD (frame `313:8436`)
**Decisions:** see [clarifications.md](./clarifications.md)
**Stack:** Next.js 16.2.7 (App Router) · React 19 · Tailwind v4 · TypeScript

## Goal
Dedicated, detailed awards page at `/he-thong-giai`: keyvisual banner, section title, a **fixed left category nav (6 items) with scrollspy** (active tab follows scroll + click smooth-scroll), 6 award detail cards (zigzag layout with quantity + prize value), and the Sun* Kudos banner. Presentational (no auth guard). Reuses existing homepage chrome.

## Two-Track Structure
Track A (UI) and Track B (integration) run in parallel — neither blocks the other.

| Phase | Track | Title | Status |
|-------|-------|-------|--------|
| [phase-01](./phase-01-awards-page-ui.md) | A | Awards page UI (pixel-perfect from Figma) | ⏳ pending |
| [phase-02](./phase-02-nav-integration.md) | B | Top-nav wiring: "Award Information" → `/he-thong-giai` | ⏳ pending |

## Reuse Map (existing, do NOT recreate)
- `components/homepage/site-header.tsx` (+ `common/nav-links`, `notification-menu`, `language-selector`, `homepage/user-menu`) — top nav, reuse as-is.
- `components/homepage/site-footer.tsx` — footer, reuse as-is.
- `components/homepage/widget-button.tsx` — floating widget, reuse as-is.
- `components/homepage/sunkudos-section.tsx` — Kudos banner; only change: "Chi tiết" → `/sun-kudos`.
- Assets in `public/homepage-saa/` (`Award_BG.png`, `Award_Name_*.png`, `Keyvisual_BG.png`) and `public/icons/`.
- Fonts: Montserrat via `next/font/google` + `--font-montserrat` CSS var (established pattern in `app/page.tsx`).

## New Components (`components/awards/`)
- `keyvisual-banner.tsx` — hero banner (ROOT FURTHER + "Sun* Annual Awards 2025").
- `category-nav.tsx` — **client**; fixed/sticky left nav, IntersectionObserver scrollspy + click smooth-scroll.
- `award-detail-card.tsx` — image (336×336) + title/description/quantity/prize; `reverse` prop for zigzag.
- `award-detail-section.tsx` — section title + 6 cards with anchor ids for scrollspy.
- `app/he-thong-giai/page.tsx` — route composing header + banner + nav/content + Kudos banner + footer + widget.

## Key Dependencies
- Track A ⟂ Track B (independent, parallel-runnable). Integration is trivial (one shared nav change).
- Exact text/quantity/prize/styles come from MoMorph MCP nodes — authoritative, not OCR.

## Out of Scope
- Real auth guard / Supabase wiring (deferred — homepage is also unguarded).
- Building the `/sun-kudos` and `/sun-kudos` detail pages (CTA may 404 for now).
- Real i18n / EN translations; mobile/responsive breakpoints (desktop layout like homepage).
