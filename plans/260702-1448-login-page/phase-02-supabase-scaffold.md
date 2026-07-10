# Phase 02 — Supabase Local Scaffold + SSR Clients (Track B)

**Priority:** High · **Status:** ✅ done

## Goal
Scaffold a self-hostable Supabase local project with Google OAuth enabled, plus `@supabase/ssr` browser/server clients. User starts it (`supabase start`) and supplies credentials — nothing runs or is committed secret here.

## Steps
1. `npm i @supabase/ssr @supabase/supabase-js`.
2. `supabase init` (if CLI absent, hand-author `supabase/config.toml`).
3. In `config.toml`: enable `[auth.external.google]` with `client_id = "env(GOOGLE_CLIENT_ID)"`, `secret = "env(GOOGLE_SECRET)"`, and `[auth]` `site_url` + `additional_redirect_urls` including `http://localhost:3000/auth/callback`.
4. Create `lib/supabase/client.ts` (browser: `createBrowserClient`) and `lib/supabase/server.ts` (server: `createServerClient` with Next 16 `cookies()` — read Next docs for the current cookies API).
5. `.env.example`: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `GOOGLE_CLIENT_ID`, `GOOGLE_SECRET`. Ensure `.env.local` is gitignored.
6. README/setup notes: how to `supabase start`, get keys, create Google OAuth client + authorized redirect URI.

## Related files
- Create: `lib/supabase/client.ts`, `lib/supabase/server.ts`, `supabase/config.toml`, `.env.example`, `docs/supabase-setup.md`.
- Modify: `package.json`, `.gitignore` (verify `.env*.local`).

## Success criteria
- `npx tsc --noEmit` clean. Clients typed. Google provider present in config with env placeholders. No secrets committed.

## Security
- Only anon key exposed via `NEXT_PUBLIC_*`. Secrets in `env()` / `.env.local` only.

## Notes
- Read `node_modules/next/dist/docs/` for the Next 16 `cookies()` / async request API before writing server client.
