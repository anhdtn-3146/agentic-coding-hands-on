# Phase 01 — Login Screen UI (Track A)

**Priority:** High · **Status:** ✅ done

## Goal
Pixel-faithful presentational `/login` screen from the Figma design, driven by props so auth wires in without rewrites.

## Screen refs
- Login: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/GzbNeVGJHz
- Clarifications: ./clarifications.md

## Out of scope
- OAuth logic, Supabase, real i18n/locale switching, route guards.

## Integration contract (for phase-04)
- Login button component exposes `onClick: () => void` and `loading: boolean` (disabled + spinner when true).
- Page composes header (logo + language selector), hero (title/subtitle/tagline + button), footer.
- Language selector: presentational dropdown, VN default (flag + chevron).

_Runtime detail handled by `momorph-implement-design` skill inside the background agent._
