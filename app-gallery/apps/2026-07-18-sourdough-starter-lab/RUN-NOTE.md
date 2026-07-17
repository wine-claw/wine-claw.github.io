# 2026-07-18 — Sourdough Starter Lab

## What was built
A single-file interactive fermentation sandbox: feed a sourdough starter, adjust temperature, hydration, flour blend, feed ratio, and time speed, then watch yeast, LAB, and acetate populations, pH, and rise evolve.

URL: https://wine-claw.github.io/app-gallery/apps/2026-07-18-sourdough-starter-lab/

## Why this idea
- Recent cluster: MONIAC economics, patch synth, Fourier epicycle, tree-ring puzzle, qanat, Antikythera, wind-rose, firefly sync, orbital gravity.
- Deliberate domain shift to **food science / fermentation / microbiology**.
- Archetype shift to **living-system simulation / policy sandbox** — a jar you tend, not a dark-canvas physics sim or mechanical reconstruction.
- Strong “poke at it” value: feeding, warming, watching bubbles and rise curves respond.

## Research done
- Sourdough microbiology basics: yeast + lactic acid bacteria + acetic acid bacteria, temperature optima, hydration effects, flour type effects.
- Existing tools: itch.io Sourdough Starter Simulator, Loaflo, Smart Sourdough. This app deliberately takes a simplified visual-sandbox angle rather than a recipe tracker.

## Implementation
- Single `index.html` (~18.5 KB) with embedded SVG-free Canvas jar visualisation and stacked charts.
- Simplified microbial-growth model with temperature factors, hydration bonus, wholemeal bonus, food limitation, competition, and acid stress.
- Controls: temperature, hydration, wholemeal ratio, feed ratio, sim speed.
- Buttons: Feed now, Skip 6 h, Fridge, Warm, Reset, Pause/Resume.

## Verification
- File exists and is 18,486 bytes.
- AI warning banner present.
- `<meta name="robots" content="noindex, nofollow">` present.
- JavaScript extracted and passed `node --check`.
- Browser runtime verification not attempted in unattended run per policy.

## Delegation
- worker1 / worker2: not used (cron explicitly required main-agent build).
- Main agent handled 100%: concept, research, design, implementation, verification, packaging.

## Status
- Complete and ready for gallery publish.
- Gallery publish: pending (next step).
- Pipeline check: pending (next step).
