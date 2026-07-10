# Clarifications — Login Page (/login), SAA 2025

MoMorph: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/GzbNeVGJHz (fileKey 9ypp4enmFmdK3YAFJLIu6C, screenId GzbNeVGJHz)

## Session 2026-07-02
- Q: Machine has no Docker/Supabase CLI — how to handle Supabase local? → A: Scaffold it fully (supabase init, config.toml with Google provider, @supabase/ssr client/server code, middleware, .env.example); user runs `supabase start` + supplies Google credentials.
- Q: How much i18n for the VN/EN language selector? → A: Selector UI only, VN default, no real translation wiring; EN switching deferred.
- Q: Scope of auth redirect flow (authenticated→/todo, unauthenticated→/login)? → A: Full flow + placeholder /todo page + Next.js middleware route guards.
- Q: How to handle Google OAuth credentials? → A: Placeholders in config.toml + .env.example with setup instructions; user fills real values; nothing secret committed.
