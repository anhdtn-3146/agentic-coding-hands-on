# Clarifications — Open Secret Box (chưa mở)

## MoMorph refs
- Open secret box - chưa mở: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/frames/1466%3A7676/items?momorphFrameId=6418
- screen_id: J3-4YFIpMM | figma_node_id: 1466:7676

## Session 2026-07-13
- Q: How much of the secret-box interaction to build? → A: Closed-state modal only — faithful render of this frame incl. count=0 rule (hide instruction line, disable box click). No opening animation / badge reveal.
- Q: Which value for the footer unopened count? → A: Wire the real mock `secretBoxUnopened` stat (currently 25) from sidebar-stats into the dialog.
