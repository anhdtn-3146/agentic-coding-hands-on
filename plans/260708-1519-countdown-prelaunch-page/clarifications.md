# Clarifications — Countdown Prelaunch page

MoMorph: fileKey `9ypp4enmFmdK3YAFJLIu6C`, screenId `8PJQswPZmU` (Countdown - Prelaunch page, frame `2268:35127`, momorphFrameId 6380). File: "SAA 2025 - Internal Live Coding". Specs: 5 items, 17 test cases downloaded.

## Session 2026-07-08
- Q: Target launch datetime source (spec says API, marked TODO; app has no backend)? → A: Env/config constant `NEXT_PUBLIC_LAUNCH_AT` (ISO datetime).
- Q: Actual launch datetime value? → A: Use a TODO-marked placeholder (`2026-08-01T09:00:00+07:00`) editable via env; real value swapped in later.
- Q: Navigation lock while counting down (spec: lock other pages until 0)? → A: Presentational only — no hard lock; matches unguarded rest of site; real gating deferred.
- Q: Route path? → A: `/countdown`.
- Q: Access control (test cases ACCESSING unspecified)? → A: Presentational, no auth guard (consistent with homepage/awards/login).
- Q: Seconds unit? → A: None — design shows only DAYS/HOURS/MINUTES; re-render every second, no seconds box.
- Q: Localization? → A: VI default text with EN fallback constant; no full i18n library (language selector presentational, per site convention).
