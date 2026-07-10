# Phase 03 — Google OAuth Flow + Middleware Guards + /todo (Track B)

**Priority:** High · **Status:** ✅ done · **Depends on:** phase-02 clients

## Goal
Real Google OAuth sign-in, OAuth callback code exchange, session-based route protection, and a placeholder `/todo` landing page.

## Steps
1. **Sign-in action** (`app/login/actions.ts`, server action or route): `supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: <origin>/auth/callback?next=/todo } })`; return the provider URL for client redirect. Handle failure → surface error text "Đăng nhập không thành công. Vui lòng thử lại.".
2. **Callback** (`app/auth/callback/route.ts`): `exchangeCodeForSession(code)`, then redirect to `next` (default `/todo`); on error redirect `/login?error=oauth`.
3. **Sign-out** (`app/auth/signout/route.ts`): `supabase.auth.signOut()` → redirect `/login`.
4. **Proxy** (`proxy.ts` at root + `lib/supabase/proxy.ts`): refresh session cookies (per `@supabase/ssr` SSR pattern) and guard: no session + protected route (`/todo`, `/`) → `/login`; session + `/login` → `/todo`. _(Next.js 16 renamed Middleware → Proxy)_
5. **Placeholder `/todo`** (`app/todo/page.tsx`): minimal authenticated page showing signed-in email + sign-out button.

## Related files
- Create: `app/login/actions.ts`, `app/auth/callback/route.ts`, `app/auth/signout/route.ts`, `proxy.ts` (root), `lib/supabase/proxy.ts`, `app/todo/page.tsx`.

## Success criteria (test cases)
- Unauth → /login; auth → /todo; logout → /login; button click starts Google flow; callback exchanges code and lands /todo; OAuth failure shows VN error.

## Security
- All redirect `next` targets validated to same-origin relative paths. No open redirect.
- Session read server-side via `getUser()` (not just `getSession()`) in guards.
