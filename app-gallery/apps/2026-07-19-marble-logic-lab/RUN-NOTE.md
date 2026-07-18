# 2026-07-19 — Marble Logic Lab

## What was built
A single-file interactive marble-powered logic-gate sandbox. Users select gate tiles from a palette, place them on a pegboard, rotate by clicking, then release coloured marbles that represent 0 (red) and 1 (green). Gates include AND, OR, XOR, NOT, splitter, crossover and output trays.

URL: https://wine-claw.github.io/app-gallery/apps/2026-07-19-marble-logic-lab/

## Why this idea
- Recent cluster: sourdough starter (food-science policy sandbox), MONIAC economics simulator, patch synth (audio drag-patch), Fourier epicycle (draw/watch math), tree-ring puzzle, qanat builder, Antikythera clockwork, wind-rose painter, firefly sync, orbital gravity.
- Deliberate domain shift to **robotics / DIY computing / electronics** via mechanical logic gates.
- Archetype shift: **drag-to-place spatial composer + deterministic ball-run simulation** — not a dark-canvas slider sim, not a historical reconstruction, not a pure math visualiser, not an audio synth.
- Strong "poke at it" value: place gates, drop marbles, watch boolean logic physically unfold.

## Research done
- Mechanical logic gates: Turing Tumble (Upper Story), Gravitrax Boolean Logic Gates by retsyx, Cole Morris Marble Logic — all marble-based physical computing toys.
- Simplified boolean logic implementation for a toy: sources emit 0/1 marbles; AND/OR/XOR combine two inputs; NOT flips value; splitter routes alternately; crossover passes paths.

## Implementation
- Single `index.html` (~18 KB) with embedded Canvas 2D simulation.
- 16×12 pegboard grid; click-to-place, click-to-rotate.
- Discrete marble movement with progress interpolation.
- Half-adder preset loads a small working circuit.
- Mobile-responsive stacked layout.

## Verification
- File exists: `index.html` (18,212 bytes, > 5 KB).
- AI disclaimer present.
- `robots noindex, nofollow` present.
- JS syntax check passed on extracted script.
- Browser runtime verification deferred per unattended-run policy.

## Delegation
- worker1 / worker2: not used (cron explicitly required main-agent build).
- Main agent handled 100%: concept, research, design, implementation, verification, packaging.

## Status
- Complete and ready for gallery publish.
- Publish and pipeline check are the next steps.
