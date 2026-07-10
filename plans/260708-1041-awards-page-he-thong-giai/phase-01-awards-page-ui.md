# Phase 01 — Awards page UI (Track A)

**Screen:** Hệ thống giải — https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/zFYDgyj_pD (frame `313:8436`)
**Goal:** Pixel-perfect `/he-thong-giai` page from Figma, reusing homepage chrome. Values (text/qty/prize/styles) are authoritative from MoMorph MCP — do not OCR/invent.

## In scope
- `app/he-thong-giai/page.tsx` — compose SiteHeader + KeyvisualBanner + (fixed CategoryNav | AwardDetailSection) + SunkudosSection + SiteFooter + WidgetButton; Montserrat font vars.
- `components/awards/keyvisual-banner.tsx` — hero banner.
- `components/awards/category-nav.tsx` — **client**, fixed left nav, 6 items w/ icons, IntersectionObserver scrollspy (active = gold + underline) + click smooth-scroll.
- `components/awards/award-detail-card.tsx` — image 336×336 + title + description + "Số lượng giải thưởng" + "Giá trị giải thưởng"; `reverse` prop (zigzag).
- `components/awards/award-detail-section.tsx` — section title ("Sun* annual awards 2025" + "Hệ thống giải thưởng SAA 2025") + 6 cards, each wrapped in `<section id>` scroll targets.
- Sun* Kudos "Chi tiết" CTA → `/sun-kudos`.

## Out of scope
- Auth guard, i18n, mobile breakpoints, `/sun-kudos` page.
- Recreating SiteHeader/SiteFooter/WidgetButton/SunkudosSection — reuse existing.

## Integration contract (for Track B / scrollspy)
- Award section anchor ids (order): `top-talent`, `top-project`, `top-project-leader`, `best-manager`, `signature-2025`, `mvp`.
- CategoryNav items map 1:1 to those ids; active state driven by IntersectionObserver.

## Validate
Visual loop (momorph-implement-design Step 7); `yarn build` / tsc clean.
