#!/usr/bin/env python3
import json
from datetime import datetime, timedelta, timezone
from pathlib import Path

WORKSPACE = Path('/Users/wineclaw/.openclaw/workspace')
PROJECTS = WORKSPACE / 'projects'
TZ = timezone(timedelta(hours=10, minutes=30))
STALE_ACTIVE_HOURS = 24
STALE_MONITOR_HOURS = 72


def parse_iso(s):
    return datetime.fromisoformat(s)


def main():
    now = datetime.now(TZ)
    changed = []
    for path in PROJECTS.rglob('state.json'):
        state = json.loads(path.read_text())
        status = state.get('status')
        updated = parse_iso(state['updatedAt']) if state.get('updatedAt') else now
        age_h = (now - updated).total_seconds() / 3600
        old_blocker = state.get('blocker')
        if status == 'active' and age_h >= STALE_ACTIVE_HOURS:
            msg = f'Stale: no meaningful update for {age_h:.1f}h while active.'
            if old_blocker != msg:
                state['blocker'] = msg
                changed.append((state['name'], msg))
        elif status == 'blocked' and age_h >= STALE_MONITOR_HOURS:
            msg = f'Stale: no meaningful update for {age_h:.1f}h while blocked.'
            if old_blocker != msg:
                state['blocker'] = msg
                changed.append((state['name'], msg))
        path.write_text(json.dumps(state, indent=2) + '\n')
    print(json.dumps({'changed': changed}, indent=2))

if __name__ == '__main__':
    main()
