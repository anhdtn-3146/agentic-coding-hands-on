# Blueprint — WidgetButton open-state redesign

**Design:** MoMorph frame 7052 / screen `Sv7DFwBw1h` ("Floating Action Button - phim nổi chức năng 2") — the expanded FAB.
**Discipline:** interactive · **Clarifications:** see `clarifications.md`

## Goal
Replace the current open-state UI (single gold dropdown card of plain-text rows + persistent
pill toggle) with the design's expanded FAB: two labelled gold pill buttons above a round red
close button. Closed-state trigger pill unchanged.

## Design facts (authoritative — from node context)
- Container: flex column, `align-items:flex-end`, gap 20px, bottom-right (keeps `right:19px`).
- Both action buttons: bg `#FFEA9E`, radius **4px**, height **64px**, padding 16px, gap 8px,
  row/center. Icon 24×24 + label. Label: Montserrat 700, **24px / lh 32px**, color `#00101A`.
  - **A "Thể lệ"** — red flash icon (`/icons/widget-flash.svg`, `#B72927`). → opens SaaRulesDrawer.
  - **B "Viết KUDOS"** — pen icon (reuse existing inline `IconPen`, dark). → opens KudosFormModal.
- **C close** — 56×56, radius full, bg `#D4271D`, white × (`/icons/widget-close.svg`, 24). → closes.
- Order top→bottom: Thể lệ, Viết KUDOS, close.

## Assets (downloaded)
- `public/icons/widget-flash.svg` (new, red flash) · `public/icons/widget-close.svg` (× → currentColor).
- Pen: reuse existing inline `IconPen` (identical path) — no new asset.

## Changes
1. **`components/homepage/widget-button.tsx`**
   - Open state (`isOpen`): render the two gold pill buttons (flash+"Thể lệ", pen+"Viết KUDOS")
     then the red round × close button, replacing the dropdown-menu block. Wire onClicks:
     Thể lệ→`setRulesOpen(true)`, Viết KUDOS→`setKudosOpen(true)`, ×→`setIsOpen(false)`.
   - Closed state: keep the existing trigger pill exactly (only shown when `!isOpen`); clicking
     it opens. Keep click-outside/Esc close, drawer + modal wiring.
   - Icons via `CustomSvgIcon` (flash keeps own color; × as `text-white`).
   - Shadow: keep a subtle drop-shadow/gold-glow on pills + a soft shadow on the red circle
     (effects are not in MCP node data — matched to the existing widget's shadow for consistency).
2. **`lib/i18n/locales/{vi,en}/common.json`** — `widget.saaRules` "Thể lệ"/"Rules",
   `widget.writeKudos` "Viết KUDOS"/"Write KUDOS" (keys used only by this widget).

## Out of scope
- Closed-state trigger pill visual (unchanged). Real data/routes for the actions.

## Todo
- [ ] Rebuild open-state render in widget-button.tsx (2 pills + red close)
- [ ] Wire icons (flash asset, inline pen, close asset)
- [ ] Update vi/en widget labels
- [ ] Compile check (0 TS errors)
- [ ] Visual validation vs frame 7052 (Playwright)
- [ ] Review

## Success criteria
- Open FAB matches frame 7052 (two gold 64px pills radius 4px + red 56px round ×, right-aligned, 20px gaps).
- Thể lệ→rules drawer, Viết KUDOS→kudos form, ×→close; click-outside/Esc still close.
- Closed trigger pill unchanged; 0 TS errors.
