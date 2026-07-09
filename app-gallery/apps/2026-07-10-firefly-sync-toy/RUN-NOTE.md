# 2026-07-10 — 2am Mini-App Run Note

## Concept
Built **Firefly Sync Toy** — a dark-field bioluminescent oscillator sandbox.

## Rationale
Recent runs were orbital physics, chemical patterns, mechanical linkages, vineyard canopy light, crypto, control systems, and map projections. This run rotated to **biophysics / emergent synchronization** for novelty and delight.

## What works
- Canvas-based drifting fireflies with phase oscillators.
- Neighbor coupling causes flashes to pull nearby fireflies toward sync.
- Live sync-order readout (% synchronized and descriptive label).
- Sliders for count, coupling, speed, variety, noise, and range.
- Buttons: reset, pulse all, clear sky.
- Pointer interaction: click/tap to add fireflies; double-tap to pulse nearby ones.
- Mobile-responsive control panel.
- AI disclaimer banner and robots meta present.

## Verification
- File exists: `runs/2026-07-10/firefly-sync-toy/index.html`
- Size: 14,135 bytes (> 5 KB)
- AI disclaimer present
- robots meta present
- JS syntax check passed
- Isolated browser snapshots planned/executed (see browser verification step)

## Delegation
- **Main agent only.** No worker1/worker2 used. The cron explicitly required main-session build only.
- Estimated split: main agent 100%, worker1 0%, worker2 0%.

## Durable artifacts
- `runs/2026-07-10/firefly-sync-toy/`
- `BUILD-SPEC.md`
- `RUN-NOTE.md`
- `latest-summary.md` (project root)
- `state.json` (project root)

## Publishing
Run `publish_mini_app.py` and `mini_app_pipeline_check.py` as final steps.
