# Clarifications — Sun* Kudos Live board

MoMorph: fileKey `9ypp4enmFmdK3YAFJLIu6C`, screenId `MaZUn5xHXZ` ("Sun* Kudos - Live board", frame `2940:13431`). Specs: 64 items, 41 test cases downloaded. Requested via awards-frame URL `313:8436?momorphFrameId=6383` → routed to this screen per user choice.

## Session 2026-07-10
- Q: Which screen/logic does "Implement UI & logic" for frame 313:8436 mean, given awards page verified done? → A: Build the /sun-kudos page (Sun* Kudos - Live board, MaZUn5xHXZ), the awards banner CTA target.
- Q: Functional scope (no backend)? → A: Presentational + client-interactive; likes/filters/carousel/infinite-scroll as client state; mock data extracted from Figma design content only; no auth guard (matches prior screens).
- Q: Spotlight board (B.7) fidelity? → A: Simplified interactive — names per design, hover tooltip (name + time), '388 KUDOS' header, search input, CSS/transform pan+zoom buttons; no canvas/physics engine.
- Q: "Xem chi tiết"/content/avatar/name click targets (detail + profile pages don't exist)? → A: No-op for now, styled per design; kudos detail page is its own screen → separate run.
- Q: Sidebar "Mở quà" (D.1.8) Secret Box dialog? → A: Placeholder dialog (title + close) proving wiring; real dialog when its screen is implemented.
- Q: Route? → A: /sun-kudos (pre-wired: nav KUDOS_ROUTE + awards banner CTA already point here).
