# Blueprint — Change Dropdown Phòng ban

**Design:** MoMorph frame 6391 / screen `WXK5AYB_rG` ("Dropdown Phòng ban") — the open department dropdown panel.
**Discipline:** interactive · **Clarifications:** see `clarifications.md`

## Goal

Populate the department filter with the real (design) department list and restyle the shared
filter dropdown panel to match the design (centered items, raised/lit selected item, fixed
height + scroll, narrow width). Update mock card departments so selecting a department filters.

## Design facts (authoritative)

- Panel: vertical rounded box, dark bg, ~101 × 348px → fixed height, scroll on overflow.
- Items: text **centered**, white bold.
- Selected item: raised/lit box (darker inset bg, gold `#FFEA9E` text, rounded).
- Departments (6 visible, per decision): `CEVC2, CEVC3, CEVC4, CEVC1, OPD, Infra`.

## Changes

1. **`components/kudos-board/highlight-mock-data.ts`**
   - Add explicit `highlightDepartmentOptions = ["CEVC2","CEVC3","CEVC4","CEVC1","OPD","Infra"]`
     (decoupled from card data).
2. **`components/kudos-board/highlight-filter-dropdown.tsx`** (shared panel restyle)
   - Panel: fixed `max-h` (~348px) + `overflow-y-auto`, narrower width matching design.
   - Options: `text-center`.
   - Selected option: raised/lit box (inset darker bg + rounded + gold text) instead of plain
     gold text.
   - Keep click-to-toggle-clear on the active item; drop the separate footer "clear" button to
     match the design (no clear control shown).

## Out of scope

- Real API / data source for departments (mock only).
- The closed-state filter button styling (unchanged).
- Hashtag filter data (only inherits the shared panel restyle).

## Todo

- [ ] Update mock-data department options + card departments
- [ ] Restyle shared dropdown panel (center, lit selected, scroll, width)
- [ ] Compile check (`yarn tsc`/build) — no errors
- [ ] Visual validation vs design (Playwright)
- [ ] Review

## Success criteria

- Department dropdown shows the 6 design values; panel visually matches the design frame.
- Selecting a department filters the carousel to matching cards; toggling clears.
- No TypeScript/compile errors; Hashtag filter still works with the shared restyle.
