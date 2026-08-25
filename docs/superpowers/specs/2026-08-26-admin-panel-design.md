# Admin Panel Design — Andal Las

## Overview

Custom admin panel at `/admin` for the Andal Las website owner (Mas Danang) to manage all site content without touching code. Supabase as backend (database + storage), password gate for auth.

## Auth

- Single password stored in `ADMIN_PASSWORD` env var
- Login form at `/admin` → server action validates → sets encrypted cookie `admin_session`
- Middleware on `/admin/*` checks cookie validity
- No Supabase Auth, no user accounts — just a shared password

## Database (Supabase)

### Tables

**profile** (single row):
- id (uuid, PK), name, brand, role, location, address, phone, whatsapp, hours, experience_years (int), completed_projects (int)

**settings** (single row):
- id (uuid, PK), hero_image (text), about_image (text)

**services** (multiple rows):
- id (uuid, PK), title, tagline, description, image (text), materials (jsonb[]), applications (jsonb[]), sort_order (int)

**projects** (multiple rows):
- id (uuid, PK), title, category, category_label, image (text), location, year, material, description, highlight, sort_order (int)

**testimonials** (multiple rows):
- id (uuid, PK), name, role, location, comment, project, sort_order (int)

**faqs** (multiple rows):
- id (uuid, PK), question, answer, sort_order (int)

### Image Handling

- Field `image` stores URL (either Supabase Storage URL or external URL)
- Upload flow: file → Supabase Storage bucket `images` → public URL stored in DB
- URL flow: paste URL directly → stored in DB
- Placeholder: if image field is empty, frontend uses default Unsplash URLs (same ones currently in welderData.ts)

## Admin UI

### Layout
- `/admin` → login page
- `/admin/dashboard` → main admin area with navigation
- Mobile: bottom tab nav (Profile, Content, Settings)
- Desktop: sidebar nav

### Pages
1. **Profile** — edit business info (name, phone, address, etc.)
2. **Hero** — change hero image (upload or URL)
3. **Services** — list/add/edit/delete services with image upload
4. **Projects** — list/add/edit/delete portfolio items with image upload
5. **Testimonials** — list/add/edit/delete testimonials
6. **FAQ** — list/add/edit/delete FAQ items

### Form Pattern
- Each page: list view → tap to edit → form with save/cancel
- Add button (+) at top
- Delete with confirmation dialog
- Image fields: toggle between "Upload" and "URL" mode
- Preview image before save
- Sort order: drag or manual number input

### Style
- Clean, minimal, professional
- Same orange accent (#ff4a16) as frontend
- Slate/white color scheme
- Mobile-first responsive
- No generic admin template feel

## Frontend Integration

- `welderData.ts` deleted
- New `src/lib/supabase.ts` client helper
- Data fetched from Supabase in components (client-side fetch with state)
- Cache in component state, re-fetch on relevant actions
- Placeholder images for empty fields

## File Structure (new)

```
src/
├── app/
│   ├── admin/
│   │   ├── page.tsx          ← login
│   │   ├── layout.tsx        ← admin layout (nav + auth check)
│   │   └── dashboard/
│   │       ├── page.tsx      ← overview/home
│   │       ├── profile/
│   │       │   └── page.tsx
│   │       ├── hero/
│   │       │   └── page.tsx
│   │       ├── services/
│   │       │   ├── page.tsx  ← list
│   │       │   └── [id]/
│   │       │       └── page.tsx  ← edit
│   │       ├── projects/
│   │       │   ├── page.tsx
│   │       │   └── [id]/
│   │       │       └── page.tsx
│   │       ├── testimonials/
│   │       │   ├── page.tsx
│   │       │   └── [id]/
│   │       │       └── page.tsx
│   │       └── faq/
│   │           ├── page.tsx
│   │           └── [id]/
│   │               └── page.tsx
│   └── api/
│       ├── auth/
│       │   └── login/route.ts   ← server action for login
│       └── upload/route.ts      ← image upload endpoint
├── lib/
│   ├── supabase.ts              ← Supabase client
│   ├── admin-auth.ts            ← cookie helpers
│   └── placeholders.ts          ← default image URLs
├── middleware.ts                 ← admin route protection
└── components/
    └── admin/                   ← shared admin UI components
        ├── AdminNav.tsx
        ├── ImageUpload.tsx
        ├── ConfirmDialog.tsx
        └── AdminForm.tsx
```
