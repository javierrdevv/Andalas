# welder

Single-page Indonesian marketing site ("AndalLas · Bengkel Las Danang", `lang="id"`) built with Next.js 16 App Router + React 19 + Tailwind CSS v4. No backend: no API routes, no DB, no tests. Smooth scroll via `lenis`, icons via `lucide-react`.

## Commands

- Dev: `npm run dev` · Build: `npm run build`
- Lint: `npm run lint` (bare `eslint`, flat config) · Typecheck (no script): `npx tsc --noEmit`
- Verify changes with build or `tsc --noEmit`; lint currently has pre-existing errors, don't treat those as yours.

## Structure

- One route: everything renders via `src/app/page.tsx` composing components from `src/components/`.
- All site copy/data lives in `src/data/welderData.ts` (PROFILE, services, projects, testimonials, FAQ). Edit content there, not in components.
- All components are client components (`"use client"`).
- Path alias `@/*` → `src/*`.

## Gotchas

- Tailwind v4 via PostCSS — no `tailwind.config.js`. Theme customization goes in CSS (`@theme`) in `src/app/globals.css`.
- Remote `<Image>` hosts are whitelisted in `next.config.ts` (`images.unsplash.com` only). Adding another host requires updating `remotePatterns`.
- All user-facing copy is Indonesian; match that language.
- `CLAUDE.md` just includes this file — keep both in sync by only maintaining AGENTS.md.
- `layout.tsx` is the only server component; everything else is `"use client"`. Lenis smooth scroll is set up in `SmoothScroll.tsx` (respects `prefers-reduced-motion`).
- `welderData.ts` exports typed interfaces (`ProjectItem`, `ServiceItem`, `Testimonial`, etc.). When adding/editing data entries, match the existing shape.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
