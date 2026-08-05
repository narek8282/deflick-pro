# DeFlick / Production + Post

Next.js production site for `deflick.pro`.

The app is built for a cinematic production/post studio experience with strong imagery, a
signature 3D lens scene, editable project data, a local `/admin` panel and a server contact API.

## Local preview

```powershell
npm install
npm run dev
```

Open `http://127.0.0.1:8177/`.

## Checks

```powershell
npm run typecheck
npm run lint
npm run build
npm run test:e2e
```

## Routes

- `/`
- `/work`
- `/work/[slug]`
- `/about`
- `/contact`
- `/privacy`
- `/admin`

## Admin

Local preview credentials:

- Login: `admin`
- Password: `admin`

Current admin changes save locally in the browser and can export JSON. For real production
editing, connect Payload CMS with PostgreSQL as documented in `docs/cms-and-deployment.md`.

## Current public content

- Business email: `info@deflick.com`
- Instagram: `https://www.instagram.com/deflick.production/`
- Facebook: `https://fb.com/deflick.production`
- Portfolio folder: `https://drive.google.com/drive/folders/1MFVtgtpsBuOWQX2C1ZdNML1yzmv3w9QY?usp=sharing`
- Temporary showreel source: `https://drive.google.com/file/d/1PgbHhn2IG8BE6hos-hox7ESjkinRtTkD/view?usp=drive_link`

## Deployment

GitHub Pages can serve the old static version, but it cannot run the Next.js contact API,
Payload CMS or server-side rate limiting. Use Vercel/Render/Fly/Cloudflare Workers plus a
PostgreSQL provider for the full production build.
