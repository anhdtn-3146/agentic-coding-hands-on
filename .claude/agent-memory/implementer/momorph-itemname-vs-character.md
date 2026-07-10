---
name: momorph-itemname-vs-character
description: MoMorph get_node/query_by_type "itemName" can be a stale layer name copied from a master component; the real rendered text is in "character"
metadata:
  type: feedback
---

When a Figma frame has multiple instances of the same component (e.g. 6 award
cards built from 2 shared component variants), MoMorph's `itemName` field on
TEXT nodes often reflects the *master component's* original layer name, not
the per-instance override. This can look like a duplicated-placeholder bug
(e.g. every card's title/description showing "Top Talent" via `itemName`)
when the actual rendered content is correct and unique per instance.

**Always check the `character` field via `get_node`/`get_frame_node_tree`
before concluding that Figma content is duplicated/incomplete placeholder
text.** `query_by_type` and `get_overview` surface `itemName` prominently,
which can mislead a first pass into thinking there's a content gap requiring
invented copy.

Why: On the SAA 2025 "Hệ thống giải" (awards detail) screen
(fileKey `9ypp4enmFmdK3YAFJLIu6C`, screenId `zFYDgyj_pD`), `query_by_type`
TEXT results showed 4 of 6 award cards with identical "Top Talent" title +
paragraph text. Nearly escalated this as a design-content gap needing
invented Vietnamese copy. Fetching `get_node` on each text id revealed
`character` held correct, unique, real content for every card — `itemName`
was just an unrefreshed layer-name artifact from the shared component.

How to apply: when MCP text content looks suspiciously duplicated across
sibling instances of the same component, cross-check with `get_node` (or
`get_frame_node_tree` with `includeSpecs:true`) and compare `character` vs
`itemName` before treating it as a real spec ambiguity worth flagging to the
user. See [[project-saa-2025-awards-site]] for the project this came from.
