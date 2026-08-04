# Deflick Pro Site

Static Awwwards-style launch site for `deflick.pro`.

## Local preview

```powershell
python -m http.server 8177
```

Open `http://127.0.0.1:8177/`.

## Publish options

- GitHub Pages: push this folder to a repository, enable Pages from `main` branch root, and point DNS to GitHub Pages.
- Netlify/Vercel/Cloudflare Pages: upload the folder or connect the repository.

When DNS access is ready, add a `CNAME` file containing `deflick.pro` or set the custom domain in GitHub Pages.
