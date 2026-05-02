# Linkage Lab — Run Summary (2026-05-02)

## What was built
Interactive kinematic linkage sandbox. Drag joints to reshape planar linkages (crank-rocker, double-crank, Chebyshev lambda, Peaucellier straight-line, crank-slider) and watch coupler curves trace in real time.

## Features
- 5 named presets with realistic proportions
- Real-time animation with adjustable speed (0–120 RPM)
- Coupler curve tracing (toggle on/off)
- Velocity vector display (toggle on/off)
- Grashof classification readout
- Drag any free joint to reshape the mechanism
- Dark engineering theme
- Responsive (desktop + mobile)
- Touch support

## Files
- `runs/2026-05-02/linkage-lab/index.html` — single-file app
- `runs/2026-05-02/linkage-lab/BUILD-SPEC.md` — build specification

## Verification
- HTML parse: OK
- JS syntax: OK
- Gallery published: 2026-05-02 09:51 ACST (daytime, after Simon noticed it was missing)

## Issue
Build completed at 02:09 but packaging step was skipped:
- Gallery copy not done
- index.html not updated
- git push not done
- state.json not updated

This was caught when Simon asked about it. Root cause: the overnight run's final packaging checklist was not executed.

## Delegation
- worker1 (Kimi K2.6): ~90% — concept, BUILD-SPEC.md, full HTML/CSS/JS implementation
- main agent: ~10% — review, syntax check, but missed packaging

## Links
- Gallery: https://wine-claw.github.io/app-gallery/apps/2026-05-02-linkage-lab/
- Full gallery: https://wine-claw.github.io/app-gallery/
