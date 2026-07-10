---
name: project-saa-2025-awards-site
description: aidd-app is the Sun* Annual Awards (SAA) 2025 marketing/internal site — Next.js App Router, MoMorph/Figma-driven, dark gold theme
metadata:
  type: project
---

`aidd-app` (repo root
`/home/doan.thi.ngoc.anh@sun-asterisk.com/Documents/aidd-app`) is a
presentational Next.js 16 (App Router, Turbopack) + React 19 + Tailwind v4
site for Sun* Annual Awards 2025, built pixel-perfect from a MoMorph/Figma
file (fileKey `9ypp4enmFmdK3YAFJLIu6C`, "SAA 2025 - Internal Live Coding").

**Why:** All pages so far are intentionally unauthenticated/presentational
(no Supabase auth guard) — this is a deliberate, repeatedly-confirmed
decision (real auth is deferred to a "later auth epic"), not an oversight.
Any new page in this app should default to no guard unless told otherwise.

**Conventions observed and reused across pages:**
- Dark theme `bg-[#00101A]`, gold accent `#FFEA9E`, divider `#2E3940`, glow
  `0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287` (or 0 0 14px on hover).
- Montserrat via `next/font/google`, exposed as `--font-montserrat` CSS var
  on the page root; components then use `font-(family-name:--font-montserrat)`
  (Tailwind v4 arbitrary property) OR a component-local
  `Montserrat({...}).className` — both patterns coexist, pick whichever the
  sibling component you're extending already uses.
- Layout container is `max-w-[1224px] mx-auto`, even though the Figma
  canvas is 1440px wide with 1152px content (144px side padding) — this
  1224 convention was set early and all homepage sections follow it; new
  pages should match it rather than the literal Figma number, for
  consistency over strict pixel fidelity.
- `SiteHeader` is `fixed` + translucent (`bg-[#101417]/80`), so hero
  sections start their background image at true page y=0 and only pad
  their *content* down to clear the header — see `hero-section.tsx`'s
  `pt-[184px]` comment and mirror that pattern for any new hero/banner.
- Shared icon components live in `components/common/icons.tsx` as
  `currentColor`-masked `<span>`s wrapping SVGs in `public/icons/`; extend
  this file (don't inline new `<svg>` per component) when a new icon is
  needed and the SVG asset already exists there.
- Reused components across pages: `site-header.tsx`, `site-footer.tsx`,
  `widget-button.tsx`, `sunkudos-section.tsx` (all under
  `components/homepage/`) — treat as shared UI, edit in place rather than
  forking, but check both call sites (`/` and any new page) after editing.

**Known gotcha:** [[momorph-itemname-vs-character]] — don't trust `itemName`
alone when auditing MoMorph text content for duplication/placeholder bugs.

**Pages built so far:** `/` (homepage, `app/page.tsx`), `/login`,
`/he-thong-giai` (awards detail page, added 2026-07-08 — hero banner +
sticky scrollspy category nav + 6 award detail cards + shared Sun* Kudos
promo/footer/widget). `/sun-kudos` is referenced by links but not yet built
(expected to 404 until a future task implements it).
