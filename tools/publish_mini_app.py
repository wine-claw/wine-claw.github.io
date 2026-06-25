#!/usr/bin/env python3
"""
publish_mini_app.py — Mechanical gallery publisher for 2am mini-app runs.

Usage:
  python3 publish_mini_app.py <run_dir> <date> <slug> <title> [description]

Example:
  python3 publish_mini_app.py /path/to/runs/2026-05-04/exoplanet-forge 2026-05-04 exoplanet-forge "Exoplanet Forge" "Interactive exoplanet design sandbox"

This script does ALL the packaging steps mechanically:
1. Copies app files to app-gallery/apps/<date>-<slug>/
2. Adds a card to app-gallery/index.html (top, marked Latest, removes old Latest badge)
3. Updates app-gallery/latest/index.html redirect
4. Updates app-gallery/manifest.json
5. Git add + commit + push from app-gallery/
6. Updates projects/2am-mini-app-creation/state.json
7. Updates projects/2am-mini-app-creation/latest-summary.md

If any step fails, it prints the error and exits non-zero.
"""
from __future__ import annotations

import json
import re
import shutil
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

WORKSPACE = Path('/Users/wineclaw/.openclaw/workspace')
APP_GALLERY = WORKSPACE / 'app-gallery'
PROJECT = WORKSPACE / 'projects' / '2am-mini-app-creation'
STATE_PATH = PROJECT / 'state.json'
SUMMARY_PATH = PROJECT / 'latest-summary.md'

GALLERY_BASE = 'https://wine-claw.github.io/app-gallery'
APPS_BASE = f'{GALLERY_BASE}/apps'
LATEST_URL = f'{GALLERY_BASE}/latest/'


def run_git(*args: str, cwd: Path) -> subprocess.CompletedProcess:
    r = subprocess.run(['git'] + list(args), cwd=cwd, capture_output=True, text=True, timeout=60)
    if r.returncode != 0:
        print(f'GIT ERROR: git {" ".join(args)}\nstdout: {r.stdout}\nstderr: {r.stderr}')
    return r


def main() -> int:
    if len(sys.argv) < 5:
        print(f'Usage: {sys.argv[0]} <run_dir> <date> <slug> <title> [description]')
        return 1

    run_dir = Path(sys.argv[1])
    date = sys.argv[2]       # e.g. 2026-05-04
    slug = sys.argv[3]       # e.g. exoplanet-forge
    title = sys.argv[4]      # e.g. Exoplanet Forge
    description = sys.argv[5] if len(sys.argv) > 5 else ''

    published_slug = f'{date}-{slug}'
    app_url = f'{APPS_BASE}/{published_slug}/'
    target_dir = APP_GALLERY / 'apps' / published_slug
    errors: list[str] = []

    # --- Step 1: Copy app files ---
    print(f'[1/7] Copying {run_dir} → {target_dir}')
    if not run_dir.exists():
        errors.append(f'Run directory does not exist: {run_dir}')
    else:
        if target_dir.exists():
            shutil.rmtree(target_dir)
        shutil.copytree(run_dir, target_dir)
        # Remove build notes that shouldn't be in the gallery
        for f in ['BUILD-SPEC.md', 'summary.md', 'FAILURE-NOTE.md', 'CONCEPT.md', 'AUTOMATION-REPAIR.md']:
            for p in target_dir.glob(f):
                p.unlink(missing_ok=True)
        print(f'  Copied {len(list(target_dir.rglob("*")))} files')

    # --- Step 2: Update gallery index.html ---
    print(f'[2/7] Updating gallery index.html')
    index_path = APP_GALLERY / 'index.html'
    index_html = index_path.read_text()

    # Remove "Latest" badge from existing cards
    index_html = index_html.replace(' <span class="badge">Latest</span>', '')

    # Deduplication: remove any existing card that links to the same app_url
    # This prevents duplicate entries if the script is re-run
    card_pattern = re.compile(
        r'\s*<article class="card">\s*<div class="meta">[^<]*</div>\s*<h2>[^<]*</h2>\s*<div class="actions">\s*<a class="button primary" href="' + re.escape(app_url) + r'".*?</article>',
        re.DOTALL
    )
    existing_matches = card_pattern.findall(index_html)
    if existing_matches:
        index_html = card_pattern.sub('', index_html)
        print(f'  Removed {len(existing_matches)} duplicate card(s) for {app_url}')

    # Build new card HTML
    badge = ' <span class="badge">Latest</span>'
    card = (
        f'        <article class="card">\n'
        f'          <div class="meta">{date}{badge}</div>\n'
        f'          <h2>{title}</h2>\n'
        f'          <div class="actions">\n'
        f'            <a class="button primary" href="{app_url}">Open app</a>\n'
        f'          </div>\n'
        f'          <div class="url">{app_url}</div>\n'
        f'        </article>\n'
    )

    # Insert after the grid section opening
    grid_marker = '<section class="grid">'
    if grid_marker in index_html:
        index_html = index_html.replace(grid_marker, grid_marker + '\n' + card)
        index_path.write_text(index_html)
        print('  Card added at top of gallery grid')
    else:
        errors.append('Could not find grid marker in index.html')

    # --- Step 3: Update latest redirect ---
    print(f'[3/7] Updating latest/index.html redirect')
    latest_path = APP_GALLERY / 'latest' / 'index.html'
    latest_html = (
        f'<!DOCTYPE html>\n<html>\n<head>\n'
        f'<meta charset="utf-8">\n'
        f'<meta http-equiv="refresh" content="0; url={app_url}">\n'
        f'<title>Redirect</title>\n</head>\n<body>\n'
        f'<a href="{app_url}">Click here</a>\n</body>\n</html>'
    )
    latest_path.parent.mkdir(parents=True, exist_ok=True)
    latest_path.write_text(latest_html)
    print('  Redirect updated')

    # --- Step 4: Update manifest.json ---
    print(f'[4/7] Updating manifest.json')
    manifest_path = APP_GALLERY / 'manifest.json'
    manifest = json.loads(manifest_path.read_text())

    new_app_entry = {
        'date': date,
        'title': title,
        'slug': slug,
        'publishedSlug': published_slug,
        'url': app_url,
    }
    if description:
        new_app_entry['description'] = description

    manifest['apps'].insert(0, new_app_entry)
    manifest['latest'] = {
        'date': date,
        'title': title,
        'slug': slug,
        'publishedSlug': published_slug,
        'url': app_url,
    }
    manifest_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + '\n')
    print('  Manifest updated')

    # --- Step 5: Git commit + push ---
    print(f'[5/7] Git commit + push')
    # Clean any stale lock
    lock_file = WORKSPACE / '.git' / 'index.lock'
    if lock_file.exists():
        lock_file.unlink()
        print('  Removed stale index.lock')

    r = run_git('add', f'app-gallery/apps/{published_slug}/', 'app-gallery/index.html',
                'app-gallery/latest/index.html', 'app-gallery/manifest.json', cwd=WORKSPACE)
    if r.returncode != 0:
        errors.append('git add failed')
    else:
        r = run_git('commit', '-m', f'Add {title} ({date}) — auto-published via publish_mini_app.py', cwd=WORKSPACE)
        if r.returncode != 0:
            # Might be "nothing to commit" which is fine
            if 'nothing to commit' not in r.stdout and 'nothing to commit' not in r.stderr:
                errors.append(f'git commit failed: {r.stderr}')
            else:
                print('  Nothing new to commit (already committed?)')
        else:
            # Push to both main and gh-pages to cover either Pages source branch config
            r = run_git('push', 'origin', 'main:gh-pages', cwd=WORKSPACE)
            if r.returncode != 0:
                errors.append('git push to gh-pages failed')
            else:
                print('  Pushed to origin/main:gh-pages')
            r = run_git('push', 'origin', 'main:main', cwd=WORKSPACE)
            if r.returncode != 0:
                errors.append('git push to main failed')
            else:
                print('  Pushed to origin/main:main')

    # --- Step 6: Update state.json ---
    print(f'[6/7] Updating state.json')
    state = json.loads(STATE_PATH.read_text()) if STATE_PATH.exists() else {}

    # Move old latestRun to extraRuns
    old_latest = state.get('latestRun')
    if old_latest:
        extra = state.get('extraRuns', [])
        extra.insert(0, old_latest)
        # Keep only last 5 extras
        state['extraRuns'] = extra[:5]

    now = datetime.now(timezone.utc).isoformat()
    state['summary'] = f'{date}: {title} — {description}' if description else f'{date}: {title}'
    state['updatedAt'] = now
    state['primaryLink'] = {'label': title, 'url': app_url}
    state['latestRun'] = {
        'date': date,
        'title': title,
        'kind': 'overnight',
        'notes': description,
        'path': str(run_dir),
        'entryFile': str(run_dir / 'index.html'),
        'galleryUrl': app_url,
        'delegation': state.get('latestRun', {}).get('delegation', {}),
    }
    if (run_dir / 'BUILD-SPEC.md').exists():
        state['latestRun']['buildSpecFile'] = str(run_dir / 'BUILD-SPEC.md')
    state['nextStep'] = f'Next overnight run at 2:00 AM'

    STATE_PATH.write_text(json.dumps(state, indent=2, ensure_ascii=False) + '\n')
    print('  state.json updated')

    # --- Step 7: Update latest-summary.md ---
    print(f'[7/7] Updating latest-summary.md')
    run_dir_rel = Path(run_dir).resolve().relative_to(WORKSPACE)
    summary = (
        f'# Latest Run Summary — {date}\n'
        f'\n'
        f'## Chosen mini-app\n'
        f'**{title}** — {description}\n'
        f'\n'
        f'- **Run date:** {date}\n'
        f'- **Kind:** overnight\n'
        f'- **Path:** {run_dir_rel}\n'
        f'- **Entry file:** {run_dir_rel / "index.html"}\n'
        f'\n'
        f'### Links\n'
        f'- **Hosted app:** {app_url}\n'
        f'- **Gallery:** {GALLERY_BASE}/\n'
        f'- **Latest redirect:** {LATEST_URL}\n'
    )
    SUMMARY_PATH.write_text(summary)
    print('  latest-summary.md updated')

    # --- Summary ---
    print()
    if errors:
        print('❌ ERRORS:')
        for e in errors:
            print(f'  - {e}')
        return 1
    else:
        print(f'✅ Published {title} → {app_url}')
        return 0


if __name__ == '__main__':
    raise SystemExit(main())