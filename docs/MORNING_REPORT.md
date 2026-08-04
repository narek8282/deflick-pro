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

## Remaining limitations

- Payload CMS is documented but not live without PostgreSQL and a server host.
- File uploads are not live without media storage.
- GitHub Pages cannot run the new server features.
- Demo project records must be replaced with verified assets before public portfolio claims are expanded.

## Next three owner actions

1. Approve a free Next.js host such as Vercel and a free PostgreSQL provider such as Neon or Supabase.
2. Provide verified project assets and exact credits.
3. Provide the final business email, social links and showreel/video links.
