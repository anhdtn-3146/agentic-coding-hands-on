# Countdown Prelaunch Page — Plan

**Design:** MoMorph "Countdown - Prelaunch page" — https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/8PJQswPZmU (frame `2268:35127`)
**Route:** `/countdown` · **Discipline:** takumi interactive · **Status:** done (implemented + reviewed, typecheck clean, visually verified @1440)

## Decisions (see clarifications.md)
- Target datetime: `NEXT_PUBLIC_LAUNCH_AT` env constant (placeholder `2026-08-01T09:00:00+07:00`).
- Nav lock: presentational only (no hard lock). Access: unguarded (site convention).
- Units: DAYS (00–99) / HOURS (00–23) / MINUTES (00–59), 2-digit zero-pad, tick every 1s, clamp invalid→00, all-00 on completion. No seconds.
- Font: DSEG7 Classic (7-seg, SIL OFL) substituting Figma "Digital Numbers".

## Files
- `lib/countdown-config.ts` — LAUNCH_AT env constant + TODO note.
- `components/countdown/use-countdown.ts` — client hook, computes days/hours/minutes, ticks 1s, clamps.
- `components/countdown/countdown-digit-box.tsx` — one frosted digit box: DSEG7 ghost "8" + bright digit.
- `components/countdown/countdown-timer.tsx` — client: title + 3 units (2 boxes + label each).
- `app/countdown/page.tsx` — bg image (cover) + Cover gradient overlay + centered timer.
- `app/globals.css` — @font-face DSEG7.
- `public/countdown/countdown-bg.png`, `public/fonts/dseg7-classic-bold.woff2` — assets (downloaded).

## Design tokens (Figma, 1512 frame)
- Root bg #00101A. Cover: `linear-gradient(18deg, #00101A 15.48%, rgba(0,18,29,.46) 52.13%, rgba(0,19,32,0) 63.41%)`.
- Title: Montserrat 700, 36/48, white, centered — "Sự kiện sẽ bắt đầu sau".
- Time row gap 60px; unit gap 21px (col), boxes gap 21px (row); title→time gap 24px.
- Digit box: 76.8×122.88, radius 12, border .75 #FFEA9E, bg `linear-gradient(180deg,#FFF,rgba(255,255,255,.1))`, opacity .5, backdrop-blur 24.96. Digit 73.73px DSEG7 white.
- Label: Montserrat 700 36/48 white uppercase, left-aligned.

## Verify
- typecheck + playwright screenshot @1440 vs Figma; test cases: 2-digit pad, ranges, completion→00.
