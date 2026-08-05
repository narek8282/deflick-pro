# Morning Report

## What was built

A new official DeFlick Production website repository based on Next.js, TypeScript, GSAP and React Three Fiber.

## How to launch

```powershell
npm install
Copy-Item .env.example .env.local
npm run build
npm run start
```

## Local preview

`http://localhost:8177/`

## Admin account

Set these in `.env.local`:

```bash
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin
```

Then open `/admin`.

## Editable from admin

- Homepage headline.
- Homepage introduction.
- Business email.
- Location.
- Project title, order, visibility and status.
- Client visibility.
- JSON export for backup.

## Actual checks

- TypeScript: passed.
- ESLint: passed.
- Production build: passed.
- Playwright: 8/8 passed on desktop and mobile.
- Lighthouse local production run:
  - Performance: 94.
  - Accessibility: 95.
  - Best Practices: 96.
  - SEO: 100.
  - LCP: 2.9 s.
  - CLS: 0.
  - TTI: 3.1 s.
  - TBT: 70 ms.
  - Note: Lighthouse produced the JSON report, then Chrome cleanup reported a temporary-directory EPERM warning on Windows.

## Screenshots

Screenshots were attempted through Playwright. Functional viewport checks passed. Final screenshot capture should be repeated after the site is deployed to a stable server URL.

## Missing real content or credentials

See `docs/CONTENT_GAPS.md`.

New owner-provided assets received on 2026-08-05:

- Business email: `info@deflick.com`.
- Instagram: `https://www.instagram.com/deflick.production/`.
- Facebook: `https://fb.com/deflick.production`.
- Portfolio folder: `https://drive.google.com/drive/folders/1MFVtgtpsBuOWQX2C1ZdNML1yzmv3w9QY?usp=sharing`.
- Showreel file: `https://drive.google.com/file/d/1PgbHhn2IG8BE6hos-hox7ESjkinRtTkD/view?usp=drive_link`.

## Remaining limitations

- Payload CMS is documented but not live without PostgreSQL and a server host.
- File uploads are not live without media storage.
- GitHub Pages cannot run the new server features.
- Demo project records must be replaced with verified assets before public portfolio claims are expanded.

## Next three owner actions

1. Create/import the project on Vercel and attach `deflick.pro`.
2. Create a free Neon or Supabase PostgreSQL database and set production env vars.
3. Review the Drive portfolio and turn verified assets into final project records.
