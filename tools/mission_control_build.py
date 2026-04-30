#!/usr/bin/env python3
import json
from datetime import datetime, timedelta, timezone
from pathlib import Path

WORKSPACE = Path('/Users/wineclaw/.openclaw/workspace')
PROJECTS = WORKSPACE / 'projects'
OUT = PROJECTS / 'mission-control' / 'index.json'
TZ = timezone(timedelta(hours=10, minutes=30))
COLUMNS = ['active', 'blocked', 'complete']


def workspace_url_for(path: Path) -> str:
    rel = path.resolve().relative_to(WORKSPACE)
    return '/' + str(rel).replace('\\', '/')


def mini_app_run_links():
    runs_dir = PROJECTS / '2am-mini-app-creation' / 'runs'
    links = []
    if not runs_dir.exists():
        return links
    for day_dir in sorted([p for p in runs_dir.iterdir() if p.is_dir()], reverse=True):
        app_dirs = sorted([p for p in day_dir.iterdir() if p.is_dir()])
        if not app_dirs:
            continue
        app_dir = app_dirs[0]
        index_path = app_dir / 'index.html'
        target = index_path if index_path.exists() else app_dir
        slug_title = app_dir.name.replace('-', ' ').strip().title()
        links.append({
            'label': f'{day_dir.name} — {slug_title}',
            'url': workspace_url_for(target),
        })
    return links


def enrich_project(data):
    data = dict(data)
    note_path = Path(data.get('path', '')) if data.get('path') else None
    if note_path:
        data['folderPath'] = str(note_path.parent)
    if data.get('slug') == '2am-mini-app-creation' and data.get('autoRunLinks'):
        data['links'] = mini_app_run_links()
    if data.get('primaryLink') and isinstance(data['primaryLink'], dict):
        data['primaryLink'] = {
            'label': data['primaryLink'].get('label', 'Link'),
            'url': data['primaryLink'].get('url', ''),
        }
    if isinstance(data.get('secondaryClosedLinks'), list):
        data['secondaryClosedLinks'] = [
            {
                'label': item.get('label', 'Link'),
                'url': item.get('url', ''),
            }
            for item in data['secondaryClosedLinks']
            if isinstance(item, dict) and item.get('url')
        ]
    return data


def main():
    projects = []
    for path in PROJECTS.rglob('state.json'):
        data = json.loads(path.read_text())
        projects.append(enrich_project(data))
    projects.sort(key=lambda p: (COLUMNS.index(p.get('status')) if p.get('status') in COLUMNS else 999, (p.get('name') or '').lower()))
    payload = {
        'title': 'Wine Claw Project Tracking',
        'updatedAt': datetime.now(TZ).isoformat(),
        'columns': COLUMNS,
        'projects': projects,
    }
    OUT.write_text(json.dumps(payload, indent=2) + '\n')
    print(f'wrote {OUT}')


if __name__ == '__main__':
    main()
