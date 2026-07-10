# Clarifications — Awards page (Hệ thống giải thưởng SAA 2025)

MoMorph: fileKey `9ypp4enmFmdK3YAFJLIu6C`, screenId `zFYDgyj_pD` (Hệ thống giải, frame `313:8436`). Specs: 22 items, 15 test cases downloaded. Same file as Homepage SAA (`i87tDx10uM`) and Login (`GzbNeVGJHz`).

## Session 2026-07-08
- Q: Access control (test ID-0/ID-1 require auth guard)? → A: Presentational, no guard — match the unguarded homepage `/`; defer real Supabase guard to a later auth epic.
- Q: Route + relationship to homepage inline awards section, where does top-nav "Award Information" point? → A: New route `/he-thong-giai`; top-nav "Award Information" navigates to it; homepage keeps its summary grid unchanged (both coexist).
- Q: Sun* Kudos banner "Chi tiết" CTA destination (spec D2.1, test ID-12/ID-14)? → A: Link to future `/sun-kudos` route (may 404 until built; test ID-14 covers friendly error).
- Q: Left category nav active-state driver (test ID-9/ID-11)? → A: Scrollspy + click — IntersectionObserver updates active item on scroll AND on click; click smooth-scrolls to section.
- Q: Award content exact text/quantity/prize values? → A: Pull verbatim from MoMorph MCP design nodes (authoritative); do not OCR the preview or invent.
- Q: Responsive scope + localization? → A: Desktop layout (max-w-[1224px]) like homepage; language selector presentational, VN default.
