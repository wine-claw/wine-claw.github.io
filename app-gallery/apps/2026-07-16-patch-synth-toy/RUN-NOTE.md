# 2am Mini-App Run Note — 2026-07-16

## Chosen mini-app
**Patch Synth Toy** — a drag-and-drop modular Web Audio synthesizer playground.

## Why this idea
- Domain rotation: recent runs were dendrochronology (history/puzzle), Fourier epicycles (math/data art), ancient mechanisms, orbital gravity, wind roses — all visual/spatial/mathematical. Tonight shifts to **music/audio/technology** (modular synth), a sensory domain not covered recently.
- Archetype: **build-and-play sandbox / weird toy** rather than calculator or visualiser.
- Interactive style: drag modules, patch cables, keyboard/touch ribbon — clearly different from recent canvas/slider apps.
- Fits Simon’s broad interests in engineering, electronics, DIY technology, and playful tools.

## What works
- Add VCO, LFO, VCA, Filter, Envelope, Delay, and Speaker modules.
- Drag modules around the rack.
- Patch output → input cables (audio, CV, gate colour-coded).
- Default playable patch loads automatically: VCO → Filter → VCA → Speaker, with Envelope → VCA CV.
- Computer keyboard ribbon (A-KL; rows) and on-screen touch ribbon trigger notes.
- Web Audio engine: oscillators, filters, envelope, delay with feedback.
- Power On button resumes AudioContext.
- Reset rebuilds the default patch.
- Double-tap module title deletes it.

## Known caveats
- CV/gate connections route into the parameter gain of the destination, which is a simplified representation of modular synthesis.
- Delay module’s wet/dry mix is fixed as a send-only delay for simplicity.
- No persistence of patches between reloads.
- No visual oscilloscope (kept scope small).

## Verification
- File exists: yes.
- Size: 29,352 bytes (>5KB).
- AI disclaimer present: yes.
- robots meta present: yes.
- JS syntax: passed (extracted script parsed via `new Function`).
- Static inspection only; audio output verification requires daytime manual check.

## Delegation
- Cron required main-agent build; no workers used.
- Main agent handled concept, research, design, implementation, verification, packaging, publish, and pipeline check (100%).
