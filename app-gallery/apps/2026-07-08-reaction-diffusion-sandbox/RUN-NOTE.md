# 2026-07-08 — Reaction-Diffusion Sandbox

## Chosen concept
A canvas-based Gray-Scott reaction-diffusion sandbox. Paint reagent B with a brush, tweak feed/kill/diffusion rates, and watch spots, stripes, coral, maze-like and chaotic patterns self-organise in real time.

## Why this idea
- Domain shift away from recent engineering/control/cartography/viticulture runs.
- Strong "interestingness" — a visual toy that invites poking and parameter exploration.
- Self-contained, no APIs, no wine theme, lightweight single-file app.

## What was built
- 128×128 Gray-Scott simulation using direct canvas pixel manipulation.
- Laplacian convolution with toroidal wrap-around edges.
- Presets: Coral, Mitosis, Spots, Stripes, Chaos, Solitons.
- Live sliders for f, k, Du, Dv, and steps/frame.
- Brush painting of V (reagent B) via mouse and touch.
- Responsive dark UI with warning banner, robots meta, and AI disclaimers.

## Build split
- **Main agent:** 100% (cron required main-session build; no workers used)
- **worker1 / worker2:** 0%

## Verification
- File size: 17,518 bytes (> 5 KB)
- AI disclaimer present in top warning banner and bottom note
- robots meta present (`noindex, nofollow`)
- JS syntax checked by extracting `<script>` and running `node --check` (passed)
- Playwright verification:
  - Desktop layout: canvas rendering, controls readable, no overlap
  - Mobile layout: responsive, scrollable controls, touch targets present
  - Pattern changed between snapshots, confirming simulation is running
  - Brush stroke via mouse and touch modified the canvas

## Outputs
- Run path: `projects/2am-mini-app-creation/runs/2026-07-08/reaction-diffusion-sandbox/`
- Hosted app: https://wine-claw.github.io/app-gallery/apps/2026-07-08-reaction-diffusion-sandbox/
- Gallery: https://wine-claw.github.io/app-gallery/
- Latest redirect: https://wine-claw.github.io/app-gallery/latest/

## Status
Published and pipeline-checked.
