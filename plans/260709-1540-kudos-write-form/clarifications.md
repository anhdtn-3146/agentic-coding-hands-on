# Clarifications — "Viết KUDOS" write-kudos form modal

MoMorph: fileKey `9ypp4enmFmdK3YAFJLIu6C`, screen `ihQ26W78P2` ("Viết Kudo", node `520:11602`). Specs: 26 items. Requested via awards-frame URL `313:8436?momorphFrameId=6383`.

## Session 2026-07-09
- Q: Functional scope (no backend)? → A: Presentational + interactive (client state, validation; "Gửi" validates required then shows success + closes, no API)
- Q: Recipient search + Hashtag picker data? → A: Mock static lists (sample Sunners / sample hashtags) so dropdowns open + filter
- Q: Rich-text editor? → A: Presentational toolbar (B/I/S/list/link/quote, no-op) over a plain textarea
- Q: Which triggers open the form? → A: Both — widget menu "Viết Kudos" AND rules drawer "Viết KUDOS" (drawer closes first)
- Required fields gating "Gửi" (per spec H.2): Người nhận + nội dung + Hashtag (≥1)
