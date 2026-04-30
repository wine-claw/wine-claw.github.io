#!/usr/bin/env python3
import json
from datetime import datetime, timedelta, timezone
from pathlib import Path

WORKSPACE = Path('/Users/wineclaw/.openclaw/workspace')
PROJECTS = WORKSPACE / 'projects'
TZ = timezone(timedelta(hours=10, minutes=30))
STALE_ACTIVE_HOURS = 24
STALE_MONITOR_HOURS = 72

# Autonomous cadence overrides: read schedule from state.json and scale threshold
# Weekly cadence -> 7 days + 1 day buffer = 8 days = 192h
# Daily cadence -> 1 day + 12h buffer = 36h
CADENCE_DEFAULT_BUFFER_HOURS = 24
CADENCE_MIN_ACTIVE_HOURS = 36


def get_cadence_threshold(state):
    """Return active-project stale threshold in hours based on autonomous schedule."""
    auto = state.get('autonomous') or {}
    if not auto.get('enabled'):
        return STALE_ACTIVE_HOURS
    notes = auto.get('notes', '')
    # Weekly schedule detection
    if 'every monday' in notes.lower() or 'weekly' in notes.lower():
        return 7 * 24 + CADENCE_DEFAULT_BUFFER_HOURS  # 192h
    if 'daily' in notes.lower() or 'every day' in notes.lower():
        return 24 + CADENCE_DEFAULT_BUFFER_HOURS  # 48h
    # Default: at least the min
    return max(STALE_ACTIVE_HOURS, CADENCE_MIN_ACTIVE_HOURS)


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
        threshold = get_cadence_threshold(state) if status == 'active' else STALE_MONITOR_HOURS
        if status == 'active' and age_h >= threshold:
            msg = f'Stale: no meaningful update for {age_h:.1f}h while active.'
            if old_blocker != msg:
                state['blocker'] = msg
                changed.append((state['name'], msg))
        elif status == 'blocked' and age_h >= STALE_MONITOR_HOURS:
            msg = f'Stale: no meaningful update for {age_h:.1f}h while monitoring.'
            if old_blocker != msg:
                state['blocker'] = msg
                changed.append((state['name'], msg))
        path.write_text(json.dumps(state, indent=2) + '\n')
    print(json.dumps({'changed': changed}, indent=2))

if __name__ == '__main__':
    main()
