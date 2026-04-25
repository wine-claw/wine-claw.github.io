# Mission Control

## Purpose
Replace the old `TASK-LEDGER.md` + generic 10-minute execution loop with a more durable system for long-running work.

## Core model

Each substantial long-running effort should have:

1. A durable project folder under `projects/<slug>/`
2. A project note (`README.md` or `PROJECT.md`) that is the source of truth
3. Optional project state JSON for dashboards/automation
4. A dedicated cron job only if the project actually needs autonomous periodic progress
5. A lightweight mission-control index for at-a-glance status

## Why this replaces TASK-LEDGER.md
The old ledger mixed together:
- active work
- stale blocker history
- completed projects
- scheduler audit noise
- operational rules

That made it brittle and hard to trust.

The new system separates concerns:
- project folder = durable project truth
- project state JSON = structured status for UI/automation
- cron = exact recurring execution when required
- chat/heartbeat = summaries and alerts, not the main execution brain

## Project status model
Recommended statuses:
- `active`
- `waiting_user`
- `blocked`
- `monitoring`
- `done`
- `archived`

## Per-project durable structure
Recommended minimum for a long-running project:

```text
projects/<slug>/
  README.md
  state.json
  notes/
  outputs/
  scripts/
```

`README.md` should contain:
- purpose
- live status
- current next step
- blockers
- key links/paths
- what counts as progress
- whether autonomous cron is enabled

`state.json` should contain structured machine-readable status, for example:

```json
{
  "name": "Ezeio Logger",
  "slug": "ezeio-google-sheet-sync",
  "status": "monitoring",
  "updatedAt": "2026-03-22T11:45:00+10:30",
  "nextStep": "Verify first workbook rotation after noon",
  "blocker": null,
  "autonomous": {
    "enabled": true,
    "mechanism": "cron",
    "jobIds": ["a2c75a05-8db6-46b6-93c4-2bfc3f530da8"]
  }
}
```

## Mission Control index
The dashboard should be driven from a single small index file rather than a giant prose ledger.

Primary file:
- `/Users/wineclaw/.openclaw/workspace/projects/mission-control/index.json`

This should list the current active/monitored projects and point to their project notes.

## WhatsApp view
WhatsApp should not mirror the full dashboard continuously. Better pattern:
- on-demand summary when Simon asks
- proactive alerts only for meaningful changes:
  - newly blocked
  - input needed
  - recovered
  - milestone done
- optional scheduled summary if wanted later

Current implementation:
- summary generator: `/Users/wineclaw/.openclaw/workspace/tools/mission_control_summary.py`
- convenience wrapper: `/Users/wineclaw/.openclaw/workspace/tools/show_mission_control.py`

Workflow rule:
- if Simon asks things like `show mission control`, `mission control summary`, or `what's active?`, run the Mission Control build + summary helpers and reply with the WhatsApp-friendly summary
- keep this as a summary layer, not the primary control surface

## Mac mini dashboard
A local always-open dashboard is a good fit.
Current implementation:
- static HTML board: `/Users/wineclaw/.openclaw/workspace/projects/mission-control/dashboard.html`
- data source: `/Users/wineclaw/.openclaw/workspace/projects/mission-control/index.json`
- index builder: `/Users/wineclaw/.openclaw/workspace/tools/mission_control_build.py`
- one-click opener: `/Users/wineclaw/.openclaw/workspace/projects/mission-control/open-dashboard.command`

Current board features:
- grouped Kanban columns:
  - Active
  - Waiting User
  - Blocked
  - Monitoring
  - Done
- each card links to its project note and shows:
  - summary
  - last updated
  - next step
  - blocker
  - autonomous runner status
  - optional quick links

Refresh workflow:
- update project `state.json`
- run `python3 /Users/wineclaw/.openclaw/workspace/tools/mission_control_build.py`
- refresh the dashboard page

## Operating rule
For new long-running work:
- create/update the project folder first
- only add a cron job if exact recurring execution is actually needed
- do not reintroduce one generic master execution loop unless there is a very strong reason

## Current transition
- Old file archived as `/Users/wineclaw/.openclaw/workspace/TASK-LEDGER.archived-2026-03-22.md`
- Old `task-ledger-10-minute-check` cron removed
- Mission Control is now the replacement direction
ontrol is now the replacement direction
