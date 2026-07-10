# Clarifications — Homepage SAA behavioral logic

MoMorph: fileKey `9ypp4enmFmdK3YAFJLIu6C`, screenId `i87tDx10uM` (Homepage SAA, frame `2167:9026`). Spec: 46 items downloaded.

## Session 2026-07-06
- Q: Countdown target datetime source? → A: Hardcode `2025-12-26T18:30:00+07:00`; client ticks per minute, 2-digit 0-pad, hide "Coming soon" + freeze 00 when elapsed.
- Q: How to wire nav links / CTA buttons / award cards (target pages don't exist)? → A: On-page smooth scroll only — About→hero(#about), Awards Information→award section(#awards), Sun* Kudos→kudos banner(#kudos); logo→top; active-link highlight via scrollspy.
- Q: Scope of interactive menus (language/notification/user/widget)? → A: Presentational dropdowns only — open/close + design options (VN/EN, Profile/Sign out/Admin Dashboard, widget quick-actions); no real i18n, no notification data, no auth wiring.
- Q: Wrong frame linked (721:5580 "Dropdown Hashtag filter")? → A: Ignore it; implement Homepage behavior from screen i87tDx10uM.
