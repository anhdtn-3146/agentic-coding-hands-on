# Phase 04 — Integration: Wire UI ↔ Auth (Track A + B)

**Priority:** High · **Status:** ✅ done · **Depends on:** phase-01 UI contract + phase-03 actions

## Goal
Connect the presentational login screen to the real auth flow with no rewrite of UI components.

## Steps
1. Wrap the login screen's button in a client component that calls the sign-in action, sets `loading=true` (button disabled + spinner) until redirect, and passes `onClick`.
2. On OAuth error (`?error=oauth` or action rejection) render the VN error message near the button: "Đăng nhập không thành công. Vui lòng thử lại.".
3. Confirm successful auth redirects to `/todo`; language selector remains presentational (no-op locale change), VN default.
4. Remove any UI-track placeholder onClick no-op.

## Related files
- Modify: login button wrapper / `app/login/page.tsx` (compose client action), possibly a small `login-button.client.tsx`.

## Success criteria
- Clicking button triggers Google OAuth, button shows loading+disabled, success → /todo, failure → VN error. `tsc --noEmit` + lint clean.
