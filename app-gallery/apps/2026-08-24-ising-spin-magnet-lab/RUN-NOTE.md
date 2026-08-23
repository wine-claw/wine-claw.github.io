# Run Note — 2026-08-24 — Ising Spin Magnet Lab

- **Path:** `projects/2am-mini-app-creation/runs/2026-08-24/ising-spin-magnet-lab/`
- **Entry:** `index.html`
- **Status:** built, verified, packaging via publish script

## Summary
Built a single-file interactive Ising spin magnet lab. Metropolis Monte Carlo on a 2D square lattice with temperature, field, coupling (ferro/antiferro), paint brush, presets including critical point and slow anneal, and live magnetisation history.

## Why
Domain rotation away from recent sundial / cymatics / robotics / harmonograph / mycology / Morse runs into statistical mechanics and critical phenomena. Sandbox toy, not a dense reference page.

## Verification
- exists, 29,124 bytes
- AI disclaimer present
- robots noindex/nofollow present
- `node --check` on extracted JS: pass

## Delegation
Main agent 100% (cron: do not use worker1/worker2).

## Publish
`python3 tools/publish_mini_app.py …` then `mini_app_pipeline_check.py`.
