# Plan — Login Page (/login) with Supabase Google OAuth · SAA 2025

**Design:** MoMorph Login screen — https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/GzbNeVGJHz
**Decisions:** see [clarifications.md](./clarifications.md)
**Stack:** Next.js 16.2.7 (App Router) · React 19 · Tailwind v4 · `@supabase/ssr` · TypeScript

## Goal
Faithful `/login` screen + real Google OAuth via Supabase (local, self-hosted). Authenticated users land on `/todo`; unauthenticated users are sent to `/login`. Supabase is fully scaffolded but started/credentialled by the user (no Docker here).

## Two-Track Structure
Track A (UI) and Track B (backend) run in parallel — neither blocks the other. Integration happens as outputs land.

| Phase | Track | Title | Status |
|-------|-------|-------|--------|
| [phase-01](./phase-01-login-screen-ui.md) | A | Login screen UI (presentational, from Figma) | ✅ done |
| [phase-02](./phase-02-supabase-scaffold.md) | B | Supabase local scaffold + SSR clients + env | ✅ done |
| [phase-03](./phase-03-auth-flow-and-guards.md) | B | Google OAuth flow, callback, proxy guards, /todo | ✅ done |
| [phase-04](./phase-04-integration.md) | A+B | Wire UI ↔ auth (button onClick/loading, error, redirect) | ✅ done |
| [phase-05](./phase-05-test-review.md) | — | Temper (tester/debugger) + inspect (reviewer) | ⚠️ partial |

## Key Dependencies
- Track A ⟂ Track B (independent, parallel-runnable).
- phase-04 needs phase-01 UI contract (login button `onClick`/`loading`) + phase-03 auth actions.
- phase-05 runs after integration.

## Implementation Notes
- **Next.js 16 Proxy:** Next.js 16 renamed `Middleware` → `Proxy`. Phase 03 created `proxy.ts` (root) + `lib/supabase/proxy.ts` instead of `middleware.ts` — same behavior, new name.

## Out of Scope
- Real EN translations / next-intl wiring (selector is presentational, VN default).
- Full `/todo` feature (placeholder page only, enough to satisfy redirect + guard test cases).
- Running `supabase start` / providing Google OAuth credentials (user does this).

## Test-case coverage targets
Unauth sees /login · auth redirected to /todo · logout → /login · Google flow starts on button click · button disabled+loader during auth · language dropdown opens · VN default with flag+chevron · footer fixed · layout positions.
