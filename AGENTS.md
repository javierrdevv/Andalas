# welder

Single-page Indonesian marketing site ("Andal Las · Bengkel Las Danang", `lang="id"`) built with Next.js 16 App Router + React 19 + Tailwind CSS v4. Supabase backend for CMS, admin panel at `/admin`. Smooth scroll via `lenis`, icons via `lucide-react`.

## Commands

- Dev: `npm run dev` · Build: `npm run build`
- Lint: `npm run lint` (bare `eslint`, flat config) · Typecheck (no script): `npx tsc --noEmit`
- Verify changes with build or `tsc --noEmit`; lint currently has pre-existing errors, don't treat those as yours.

## Structure

- **Main page**: `src/app/page.tsx` composing components from `src/components/`.
- **Admin panel**: `/admin` — login with password, CRUD for all site content.
  - Layout: `src/app/admin/dashboard/layout.tsx` (sidebar desktop, bottom nav mobile)
  - Pages: profile, hero, services, projects, testimonials, FAQ, calculator
  - Shared components: `src/components/admin/` (ImageUpload, ConfirmDialog)
- **API routes**: `src/app/api/auth/login/` (password auth), `src/app/api/upload/` (image upload to Supabase Storage)
- **Calculator**: `/kalkulator` — cost estimator page. Data (projects, materials, formula) is admin-editable via a single-row `calculator` table; component uses `useCalculator()` hook with hardcoded fallbacks.
- **Data layer**: `src/lib/useSupabaseData.ts` (React hooks fetching from Supabase with dummy data fallbacks)
- **Supabase**: `src/lib/supabase.ts` (client + types), `supabase-schema.sql` (full schema + seed data)
- **Auth**: `src/middleware.ts` (route protection), `src/lib/admin-auth.ts` (cookie session)
- **Placeholders**: `src/lib/placeholders.ts` (default image URLs)
- **Loading screen**: `src/components/LoadingScreen.tsx` (logo reveal with sparks, shows on every reload)
- All components are client components (`"use client"`); only the `layout.tsx` files are server components.
- Path alias `@/*` → `src/*`.

## Gotchas

- Tailwind v4 via PostCSS — no `tailwind.config.js`. Theme customization goes in CSS (`@theme`) in `src/app/globals.css`.
- Remote `<Image>` hosts whitelisted in `next.config.ts`: `images.unsplash.com`, `media.istockphoto.com`, `bqrmbqgcidgotsvprwue.supabase.co`, `www.shutterstock.com`, `image.shutterstock.com`. Adding another host requires updating `remotePatterns`.
- All user-facing copy is Indonesian; match that language.
- `CLAUDE.md` just includes this file — keep both in sync by only maintaining AGENTS.md.
- Static data lives in `src/data/welderData.ts`. It's both seed/reference AND still imported directly by some components (`FAQ.tsx`, `Testimonials.tsx`, `WeldInspector.tsx` use `FAQS_LIST`, `TESTIMONIALS_LIST`, `WELD_COMPARISON`). Other components fetch from Supabase via the hooks. Not everything routes through Supabase — check the component before assuming.
- Middleware runs in Edge Runtime — no Node.js modules (e.g., no `crypto`). Use Web APIs only.
- `sessionStorage` not used for loading screen — it shows on every reload/hard refresh by design.
- Image uploads go to Supabase Storage bucket `images`. Empty image fields fall back to placeholder Unsplash URLs.
- `ImageUpload` (shared admin component) crops local uploads client-side via `react-easy-crop` before upload. Aspect ratio is fixed per site format via the `placeholder` prop (`ASPECT_RATIOS` map in the component).

## Environment Variables (.env.local)

```
NEXT_PUBLIC_SUPABASE_URL=https://bqrmbqgcidgotsvprwue.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
ADMIN_PASSWORD=andalas2024
```

For Vercel: set these in Settings → Environment Variables, then redeploy.

## Database Setup

Run `supabase-schema.sql` in Supabase SQL Editor. Creates all tables (profile, settings, services, projects, testimonials, FAQs, calculator) with seed data and RLS policies. Safe to re-run (uses `ON CONFLICT DO UPDATE`).

## Supabase Project

- URL: `https://bqrmbqgcidgotsvprwue.supabase.co`
- Bucket: `images` (public, for uploaded images)

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
