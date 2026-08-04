# DeFlick CMS and Deployment Notes

## Current local build

The repository now runs as a Next.js App Router project with TypeScript.

Implemented:

- `/`
- `/work`
- `/work/[slug]`
- `/about`
- `/contact`
- `/privacy`
- `/admin`
- custom 404
- contact API at `/api/contact`
- honeypot and server-side in-memory rate limiting
- admin login `admin / admin` for the local preview
- editable starter content model in `lib/content.ts`
- GSAP reveal layer
- React Three Fiber lens scene
- Playwright checks

## Payload CMS production boundary

Payload CMS should be connected when a server host and database are available.
GitHub Pages cannot run Payload, server-side form handling or PostgreSQL.

Recommended free/low-friction deployment:

- Vercel free tier for the Next.js app.
- Supabase free tier or Neon free tier for PostgreSQL.
- Payload mounted at `/admin`.

Required environment variables:

```bash
DATABASE_URI=postgresql://USER:PASSWORD@HOST:5432/deflick
PAYLOAD_SECRET=replace-with-a-long-random-secret
NEXT_PUBLIC_SITE_URL=https://deflick.pro
MUX_TOKEN_ID=
MUX_TOKEN_SECRET=
```

## Collections to implement in Payload

- Site Settings: headline, introduction, capability statement, business email, optional phone, location, social URLs.
- Projects: title, slug, client, year, category, role, summary, description, services, credits, optional awards, cover, poster, hover teaser, galleries, video fields and ordering.
- Clients: name, logo, visibility and manual order.
- Inquiries: form submissions with status and internal notes.
- Media: uploaded stills, posters, teasers and documents.

## Video fields

Each project supports:

- Mux playback ID
- Vimeo URL
- YouTube URL
- direct MP4 URL
- direct WebM URL
- uploaded short teaser
- poster image
- captions file

Rules:

- Hero and card previews autoplay muted only when visible.
- Main films require intentional play for sound.
- Audio never autoplays.
- Non-critical players are lazy loaded.
