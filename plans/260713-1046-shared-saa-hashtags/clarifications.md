# Clarifications — Shared SAA hashtag list (picker + board filter)

MoMorph: fileKey `9ypp4enmFmdK3YAFJLIu6C`.
- `1002:13013` (screen `p9zO-c4a4x`, "Dropdown list hashtag") — multi-select "+ Hashtag / Tối đa 5" picker, 10 specs.
- `721:5580` (screen `JWpsISMAaM`, "Dropdown Hashtag filter") — single-select board filter, 4 specs.

## Session 2026-07-13
- Q: Target of frame 1002:13013 ("+ Hashtag" multi-select picker)? → A: The KUDOS write-form input `components/kudos/kudos-hashtag-input.tsx` (opened from the drawer's "Viết KUDOS"). Update its UI/logic/data to match the frame. NOT the rules drawer info panel.
- Q: Canonical shared hashtag dataset? → A: The 8 SAA core-value hashtags from 1002:13013: High-performing, Be Professional, Be Optimistic, Be A Team, Think Outside The Box, Get Risky, Go Fast, Wasshoi. (Design shows a typo "High-perorming"; use the corrected "High-performing" per the chosen option.)
- Q: Board Highlight hashtag filter (721:5580) select mode? → A: Keep single-select (click-to-filter, glow active, clear on re-click); only change its options to the combined shared list. Preserve the 721:5580 spec.
- Derived: "combine" = board filter options are the deduped union of the existing card-derived hashtags + the shared SAA_HASHTAGS. Picker drops the free-text custom-tag input (not in the 1002:13013 design); max-5 with unselected rows disabled at 5 (spec A.1/D).
