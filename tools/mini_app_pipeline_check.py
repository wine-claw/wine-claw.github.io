#!/usr/bin/env python3
from __future__ import annotations

import json
import re
import sys
import urllib.request
from pathlib import Path

WORKSPACE = Path('/Users/wineclaw/.openclaw/workspace')
PROJECT = WORKSPACE / 'projects' / '2am-mini-app-creation'
STATE_PATH = PROJECT / 'state.json'
SUMMARY_PATH = PROJECT / 'latest-summary.md'
RUNS_DIR = PROJECT / 'runs'
PUBLIC_GALLERY = 'https://wine-claw.github.io/mini-apps/'
PUBLIC_LATEST = 'https://wine-claw.github.io/mini-apps/latest/'


def fetch_text(url: str, timeout: int = 12) -> str:
    req = urllib.request.Request(url, headers={'User-Agent': 'OpenClaw mini-app check'})
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return resp.read().decode('utf-8', errors='replace')


def latest_run_dir() -> Path | None:
    if not RUNS_DIR.exists():
        return None
    days = sorted([p for p in RUNS_DIR.iterdir() if p.is_dir() and re.match(r'^\d{4}-\d{2}-\d{2}$', p.name)])
    if not days:
        return None
    day = days[-1]
    apps = sorted([p for p in day.iterdir() if p.is_dir()])
    return apps[0] if apps else None


def first_heading_after(text: str, marker: str) -> str | None:
    idx = text.find(marker)
    if idx == -1:
        return None
    sub = text[idx + len(marker):]
    for line in sub.splitlines():
        line = line.strip()
        if not line:
            continue
        cleaned = line.strip('*` ')
        cleaned = re.sub(r'\*\*\s*[—-].*$', '', cleaned).strip()
        cleaned = re.sub(r'\s+[—-].*$', '', cleaned).strip()
        return cleaned
    return None


def main() -> int:
    problems: list[str] = []
    details: dict[str, object] = {}

    # Use state.json latestRun as source of truth (handles multi-app days)
    state = json.loads(STATE_PATH.read_text()) if STATE_PATH.exists() else {}
    latest_run = state.get('latestRun', {}) if isinstance(state, dict) else {}
    state_date = latest_run.get('date')
    state_title = latest_run.get('title')
    state_path = latest_run.get('path')
    details['state_latestRun'] = latest_run

    if not state_date or not state_path:
        # Fall back to filesystem scan if state is incomplete
        latest_dir = latest_run_dir()
        if not latest_dir:
            problems.append('No dated mini-app run folder found and state.json latestRun incomplete')
            print(json.dumps({'ok': False, 'problems': problems}, indent=2))
            return 1
        expected_date = latest_dir.parent.name
        expected_slug = latest_dir.name
    else:
        expected_date = state_date
        expected_slug = Path(state_path).name if state_path else None
        if not expected_slug:
            problems.append('state.json latestRun.path missing slug')
            print(json.dumps({'ok': False, 'problems': problems}, indent=2))
            return 1
        latest_dir = Path(state_path) if Path(state_path).exists() else None
        if latest_dir and not (latest_dir / 'index.html').exists():
            problems.append(f'Missing run app entry file: {latest_dir / "index.html"}')
        elif not latest_dir:
            problems.append(f'state.json latestRun.path does not exist: {state_path}')

    expected_title_guess = expected_slug.replace('-', ' ').title()
    details['expected_run_date'] = expected_date
    details['expected_slug'] = expected_slug

    if not state_title:
        problems.append('state.json latestRun.title missing')

    summary_text = SUMMARY_PATH.read_text() if SUMMARY_PATH.exists() else ''
    summary_title = first_heading_after(summary_text, '## Chosen mini-app')
    details['summary_title'] = summary_title
    if not summary_title:
        problems.append('latest-summary.md missing chosen mini-app title')
    elif state_title and summary_title != state_title:
        problems.append(f'latest-summary.md title mismatch: summary={summary_title!r}, state={state_title!r}')

    expected_public_slug = expected_slug  # slug already includes date prefix
    details['expected_public_slug'] = expected_public_slug

    try:
        gallery_html = fetch_text(PUBLIC_GALLERY)
        details['gallery_has_expected_slug'] = expected_public_slug in gallery_html
        if expected_public_slug not in gallery_html:
            problems.append(f'Hosted gallery missing expected app slug {expected_public_slug}')
    except Exception as exc:
        problems.append(f'Hosted gallery check failed: {exc}')

    try:
        latest_html = fetch_text(PUBLIC_LATEST)
        latest_has_slug = expected_public_slug in latest_html
        # /latest/ may be a copy without the slug in the URL; check <title> too
        latest_title_match = bool(state_title and re.search(r'<title>[^<]*' + re.escape(state_title) + r'[^<]*</title>', latest_html, re.IGNORECASE))
        details['latest_has_expected_slug'] = latest_has_slug or latest_title_match
        if not latest_has_slug and not latest_title_match:
            problems.append(f'Hosted latest link does not point to expected app slug {expected_public_slug}')
    except Exception as exc:
        problems.append(f'Hosted latest check failed: {exc}')

    result = {
        'ok': not problems,
        'expected': {
            'date': expected_date,
            'slug': expected_slug,
            'title_guess': expected_title_guess,
            'public_slug': expected_public_slug,
        },
        'details': details,
        'problems': problems,
    }
    print(json.dumps(result, indent=2))
    return 0 if not problems else 1


if __name__ == '__main__':
    raise SystemExit(main())
