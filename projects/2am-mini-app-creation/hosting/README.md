# Hosted Mini-App Publishing

This folder contains the generated/managed files for publishing the 2am mini-apps.

## Target public URLs (GitHub Pages — primary)

- Gallery index: `https://wine-claw.github.io/mini-apps/`
- Stable latest link: `https://wine-claw.github.io/mini-apps/latest/`
- Per-app pages: `https://wine-claw.github.io/mini-apps/apps/<date>-<slug>/`

## Deploy target

The current deploy target is **GitHub Pages** via the `wine-claw/mini-apps` repo.

Clone: `git@github.com:wine-claw/mini-apps.git`

Deploy workflow:
1. Clone (or pull) the repo
2. Copy `index.html` into `apps/<date>-<slug>/`
3. Copy to `latest/` for the stable latest link
4. Update gallery `index.html` with new card entries
5. `git add -A && git commit -m "Add <app name> (<date>)" && git push`

## Legacy: GoDaddy FTPS (deprecated)

Previously deployed to `wine-claw.github.io/mini-apps/` via FTP. Still accessible but no longer the primary. Connection details in `secrets/grapecrushrush-openclaw-mini-apps.ftp.env`.

## Published structure

```text
index.html
latest/index.html
apps/<date>-<slug>/index.html
```

## Intent

- Keep the gallery mobile-friendly by default.
- Provide one stable `latest` link for the 8am brief.
- Publish each overnight mini-app into a dated folder.
