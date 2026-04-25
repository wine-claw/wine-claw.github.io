# Hosted Mini-App Publishing

This folder contains the generated/managed files for publishing the 2am mini-apps.

## Target public URLs (GitHub Pages — primary)

- Gallery index: `https://wine-claw.github.io/app-gallery/`
- Stable latest link: `https://wine-claw.github.io/app-gallery/latest/`
- Per-app pages: `https://wine-claw.github.io/app-gallery/apps/<date>-<slug>/`

## Deploy target

The current deploy target is **GitHub Pages** via the `wine-claw/wine-claw.github.io` repo.

Deploy workflow:
1. The `app-gallery/` folder in the workspace is the live gallery (no separate clone needed)
2. Copy app files into `app-gallery/apps/<date>-<slug>/`
3. Update `app-gallery/index.html` with new card entries
4. Update `app-gallery/manifest.json` with app metadata
5. Update `app-gallery/latest/index.html` redirect
6. `git add -A && git commit && git push`

## Legacy paths (DEPRECATED — do not use)

- Old gallery: `https://wine-claw.github.io/mini-apps/` — was a redirect, now deleted
- Old FTP target: `grapecrushrush.com/openclaw-mini-apps/` — no longer used

## Published structure

```text
app-gallery/
  index.html
  manifest.json
  latest/index.html
  apps/<date>-<slug>/
    index.html
    assets/ (optional)
```

## Intent

- Keep the gallery mobile-friendly by default.
- Provide one stable `latest` link for the 7:50 AM brief.
- Publish each overnight mini-app into a dated folder.
- All apps must appear in the gallery index.html — overwriting without checking for existing entries is a bug.
