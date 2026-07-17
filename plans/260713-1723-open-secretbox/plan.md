# Blueprint — Change Open Secret Box (chưa mở)

**Design:** MoMorph frame 6418 / screen `J3-4YFIpMM` ("Open secret box- chưa mở") — the not-yet-opened modal.
**Discipline:** interactive · **Clarifications:** see `clarifications.md`

## Goal
Replace the placeholder `SidebarGiftDialog` stub with a faithful render of the *closed-state*
secret-box modal, wired to the real mock unopened count.

## Design facts (frame 6418, authoritative)
- Dark modal (near-black navy, ~`#00070C`), gold-bordered, centered overlay.
- Header (Frame 551): title **"KHÁM PHÁ SECRET BOX CỦA BẠN"** (white, bold, uppercase) + **X** close (top-right, MM_MEDIA_Close SVG).
- Divider (Rectangle 16) under header.
- Subtitle **"Click vào box để mở"** (white, centered, small).
- Box illustration (C_Box image): box SVG (`1466:7686`) layered with sparkle-effect PNG (`1466:7685`), square.
- Divider (Rectangle 18).
- Footer (D_Số box chưa mở): label **"Secretbox chưa mở"** (small white) + count **"05"** (large, bold, gold `#FFEA9E`).
- Rule (spec C/B): if unopened count = 0 → hide the "Click..." instruction AND disable the box click.

## Assets to download (MoMorph → repo)
Save under `public/kudos/secret-box/`:
- box illustration: node `1466:7686` (svg) → `box-closed.svg`
- sparkle effect: node `1466:7685` (png) → `box-effect.png`
- close icon: node `1466:7679` (svg) → reuse existing X if present, else `close.svg`
(Exact node fills/typography pulled from MoMorph during forge — no guessed values.)

## Changes
1. **`components/kudos-board/sidebar-gift-dialog.tsx`** — rebuild:
   - New prop `unopenedCount: number`.
   - Layout per design: header (title + X), divider, subtitle, box image (sparkle behind box),
     divider, footer (label + big gold count).
   - `count === 0` → omit subtitle, render box non-interactive (no pointer/hover).
   - Keep existing a11y (role=dialog, aria-modal, Esc-to-close, backdrop click, stopPropagation).
2. **`components/kudos-board/sidebar-stats.tsx`** — pass `unopenedCount={stats.secretBoxUnopened}`.
3. **`lib/i18n/locales/{en,vi}/kudos-feed.json`** — restructure `giftDialog`:
   - `title`: vi "KHÁM PHÁ SECRET BOX CỦA BẠN" / en "EXPLORE YOUR SECRET BOX"
   - `subtitle`: vi "Click vào box để mở" / en "Click the box to open"
   - `footerLabel`: vi "Secretbox chưa mở" / en "Unopened secret boxes"
   - drop now-unused `body`/`close` keys.

## Out of scope
- Opening animation, click-to-open, random badge reveal, success state (separate frames).
- Real/persisted secret-box data source (mock only).

## Todo
- [ ] Download 3 media assets to public/kudos/secret-box/
- [ ] Rebuild sidebar-gift-dialog.tsx to match design + count=0 rule
- [ ] Wire unopenedCount from sidebar-stats.tsx
- [ ] Update en/vi kudos-feed giftDialog i18n keys
- [ ] Compile check (no TS errors)
- [ ] Visual validation vs design frame (Playwright)
- [ ] Review

## Success criteria
- Modal visually matches frame 6418 (header/X, subtitle, box+sparkle, footer count).
- Footer count reflects `secretBoxUnopened`; count=0 hides subtitle + disables box click.
- No TS/compile errors; Esc + backdrop close still work.
