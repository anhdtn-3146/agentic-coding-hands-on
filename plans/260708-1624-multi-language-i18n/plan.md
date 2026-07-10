# Multi-language (i18n) System — Plan

**Goal:** react-i18next multi-language across all screens. Locales: **VI (default) + EN + JA**. Translate all UI strings incl. long award descriptions (best-effort EN/JA, review-marked). Wire the existing VN/EN selector (add JA).
**Discipline:** takumi interactive · **Status:** implemented + verified (typecheck clean; VI/EN/JA confirmed on all 4 screens; fallbackLng=vi)

## Result (2026-07-08)
- Core: settings.ts, i18n.ts (fallbackLng=vi), i18n-provider.tsx, layout.tsx (cookie NEXT_LOCALE), language-selector (VN/EN/JA + persistence). DONE.
- Dictionaries: 18 files (vi/en/ja × common,nav,home,awards,login,countdown) — all populated & JSON-valid.
- Wired: nav-links, both footers, sunkudos, user-menu, notification-menu, widget, countdown-timer, login (hero, google-button), awards (keyvisual, category-nav, detail-section, detail-card), homepage (hero*, award-section, award-card).
- Convention: `useTranslation()` (no ns arg) + `t("ns:key")`. Verbatim VI = design; EN/JA best-effort (review-marked).
- Verified: awards+countdown+homepage render VI→EN→JA via cookie; `<html lang>` syncs; 0 console errors.

## Decisions (from clarification)
- Library: `i18next` + `react-i18next` (client). No URL /[locale] routing.
- Locales: `vi` (default/fallback) → `en`, `ja`. Persist via `NEXT_LOCALE` cookie (server reads it in layout → correct SSR, no flash/hydration mismatch).
- Scope: every visible UI string. Award marketing paragraphs translated best-effort, marked `// TODO: native review`.

## Architecture
- `lib/i18n/settings.ts` — locales, defaultLocale, cookieName.
- `lib/i18n/locales/{vi,en,ja}.json` — dictionaries, nested by section: `common`, `nav`, `home`, `awards`, `login`, `countdown`.
- `lib/i18n/i18n.ts` — client i18next instance (resources + initReactI18next, fallbackLng=vi).
- `components/common/i18n-provider.tsx` (client) — inits i18next with `initialLocale`, wraps children in `I18nextProvider`.
- `app/layout.tsx` (server) — read cookie → `initialLocale`, set `<html lang>`, wrap in `<I18nProvider>`.
- `language-selector.tsx` — `i18n.changeLanguage` + set cookie; add JA entry.

## Phases
- phase-01 — core infra (deps, settings, i18n instance, provider, layout, selector). See phase-01.
- phase-02 — dictionaries vi/en/ja (all sections, incl. 6 award descriptions ×3 langs). See phase-02.
- phase-03 — wire components to `t()` (add "use client" where needed). See phase-03.

## Component inventory (text-bearing → wire with t())
- Shared: nav-links, homepage/site-header + login/site-header, homepage/site-footer + login/site-footer, sunkudos-section, user-menu, notification-menu, widget-button, language-selector.
- Home: hero-section/hero-content/hero-cta/hero-info-block, award-section/award-card.
- Awards: keyvisual-banner, category-nav, award-detail-section (6 items → keys), award-detail-card (labels).
- Login: login/hero-section, google-login-button.
- Countdown: countdown-timer.
- Pages: optional per-locale `<title>` via generateMetadata (cookie) — deferred unless requested.

## Execution
Core + dictionaries authored centrally (me). Component wiring via parallel `implementer` agents with strict per-screen file ownership (shared components wired first, by me) — all against the phase-02 key scheme.

## Verify
typecheck + build; playwright per screen × per locale (VI/EN/JA) — switch via selector, confirm strings + `<html lang>` + cookie persistence.
