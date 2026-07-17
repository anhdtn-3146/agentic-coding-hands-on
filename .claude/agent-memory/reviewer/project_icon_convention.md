---
name: project-icon-convention
description: aidd-app icon rendering convention (CustomSvgIcon vs inline SVG) — check for consistency during reviews
metadata:
  type: project
---

App icon convention (post refactor, as of 2026-07): `components/common/custom-svg-icon.tsx` (`CustomSvgIcon`) renders **file-based** SVGs from `public/` via `react-svg`, sized with `h-/w-` and recolored with `text-*` (source SVG should paint with `currentColor`). Used across `components/kudos-board/*`, `components/homepage/*`, `components/awards/*`.

Some newer one-off icons are still hand-rolled inline `<svg>` components inside the consuming file instead of going through `CustomSvgIcon` + a `public/` asset — e.g. `CheckCircle` in `components/kudos/kudos-hashtag-input.tsx` (hardcoded two-tone fill/stroke, not currentColor-based, not extracted to `public/`).

**Why:** flagged as a Minor/DRY consistency note in review of the SAA hashtag picker (branch `feat.sun-kudos`, 2026-07-13) — not a bug, but a drift from the established icon pattern.

**How to apply:** when reviewing new components with inline `<svg>` markup, check whether the project already has a `public/` SVG + `CustomSvgIcon` equivalent pattern nearby; if so, flag inline SVGs as a minor consistency gap rather than a functional issue.
