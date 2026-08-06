# Pneumatic Post Network — 2026-08-07

## Chosen mini-app
**Pneumatic Post Network** — Design and run a 19th-century underground pneumatic mail system. Add stations, lay tubes, dispatch capsules, and keep the mail moving.

## Rationale
Recent runs were: Abelian Sandpile (cellular automaton), Sundial Designer (engineering/SVG), Tree-Ring Detective (drag pattern matching), Soil Texture Wizard (classification triangle), Loom Draft Sandbox (grid pattern editor), Sourdough Starter Pet (jar simulation). To avoid clustering, tonight needed a different domain and archetype. I chose history of technology + urban infrastructure (Paris pneumatic post) with a network-builder / visual-simulation archetype. This is surprising, historically grounded, and playful — not a dense reference page.

## Research
- Paris pneumatic post operated 1866–1984; New York had a pneumatic mail network under streets; capsules were driven by compressed air / vacuum.
- Real systems reached ~10 m/s in metal tubes with pressure differential pumps.
- Reference material from Wikipedia (Paris pneumatic post) and Smithsonian article summary.

## Build notes
- Single-file HTML/CSS/JS, ~20 KB.
- Virtual 800×600 canvas with responsive scaling.
- Modes: Station, Tube, Dispatch, Delete.
- Preset loads an 8-station Paris-style network so the default state is alive.
- Capsules follow shortest path between origin and destination via BFS.
- Stats update live: stations, tubes, capsules, delivered, total tube length, pressure pumps, uptime.

## Verification
- File exists: ✅
- Size > 5 KB: ✅ (20,417 bytes)
- AI disclaimer present: ✅
- robots meta present: ✅
- JS syntax check passed: ✅ (extracted script passed `node --check`)

## Delegation
This cron required main-agent build only; no workers used.
- Main agent: 100% — concept, research, design, implementation, verification, packaging, publish, pipeline check.
- worker1 / worker2: 0% (not attempted per cron instruction).

## Status
Publish and pipeline check pending.
