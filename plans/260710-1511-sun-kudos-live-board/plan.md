---
status: completed
blockedBy: []
blocks: []
---

# Plan — Sun* Kudos Live board `/sun-kudos`

**Design:** MoMorph "Sun* Kudos - Live board" — https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/MaZUn5xHXZ (frame `2940:13431`)
**Specs:** 64 items, 41 test cases downloaded. **Decisions:** see [clarifications.md](./clarifications.md)
**Stack:** Next.js 16.2.7 (App Router) · React 19 · Tailwind v4 · TypeScript · react-i18next

## Goal
Sun* Kudos live board at `/sun-kudos` (target of the awards-page banner CTA): KV banner,
write bar opening the existing KudosFormModal, HIGHLIGHT KUDOS carousel (5 cards, hashtag/
department filters), simplified-interactive Spotlight word cloud, ALL KUDOS feed (cards with
galleries, likes, copy-link, simulated infinite scroll) + stats/leaderboard sidebar.
Presentational + client-interactive; all mock data extracted from Figma design content.

## Two-Track Structure
| Phase | Track | Title | Owner | Status |
|-------|-------|-------|-------|--------|
| phase-01 | A | Top sections: KV banner, write bar, Highlight carousel | UI agent 1 (background) | ✅ done |
| phase-02 | A | ALL KUDOS feed + stats sidebar | UI agent 2 (background) | ✅ done |
| phase-03 | B | Scaffold: page shell, i18n namespaces, shared copy-link toast | orchestrator | ✅ done |
| phase-04 | B | Spotlight section (simplified interactive word cloud) | UI agent 3 (background) | ✅ done |
| phase-05 | — | Integration + temper + review + deliver | orchestrator | ✅ done |

Track A ⟂ Track B; no blocking merge point — integration happens as agents complete.

## File Ownership (conflict-free parallel execution)
- **Agent 1:** `components/kudos-board/{kv-*,highlight-*,write-kudos-bar}.tsx`, `lib/i18n/locales/*/kudos-board.json`, `public/kudos/`
- **Agent 2:** `components/kudos-board/{all-kudos-section,feed-*,sidebar-*}.tsx`, `lib/i18n/locales/*/kudos-feed.json`, `public/kudos/feed/`
- **Orchestrator:** `app/sun-kudos/page.tsx`, `spotlight-section.tsx`, `use-copy-link-toast.tsx`, i18n registration, plan files

## Reuse Map (existing, do NOT recreate)
- `components/kudos/kudos-form-modal.tsx` (`{open, onClose}`) — opened by the write bar
- `components/homepage/site-header.tsx`, `site-footer.tsx`, `widget-button.tsx` — shared chrome
- `components/kudos-board/use-copy-link-toast.tsx` — shared copy-link + toast behavior

## Out of Scope
- Backend/API/auth guard (site has no backend; established pattern)
- Kudos detail page (`Details` frame — separate run), profile pages, real Secret Box dialog
- Mobile/responsive breakpoints; EN translations beyond key parity

## Outcome
All five phases completed and verified. Three background UI agents delivered KV banner, write bar, Highlight carousel (phase-01), ALL KUDOS feed + sidebar (phase-02), and Spotlight word cloud (phase-04) with mock data extracted directly from Figma. Orchestrator scaffolded page shell and i18n (phase-03), then integrated & reviewed (phase-05). Tester validated: clean build, 0 console errors, all interactions passing. Reviewer scored 8/10 with no critical issues; all 4 recommended fixes applied (derived like-count, semantic HTML, i18n labels, unused key pruning). Ready to ship.
