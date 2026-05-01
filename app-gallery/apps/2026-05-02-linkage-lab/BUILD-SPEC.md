# Linkage Lab — Build Specification

## Concept
Interactive kinematic linkage sandbox. Drag joints to reshape planar linkages, watch them animate, and trace beautiful coupler curves in real time.

## Domain
Robotics / mechanical engineering — new domain, not touched in recent runs.

## Archetype
Physics sandbox / build toy — you poke it and something surprising happens.

## Why This App
- First robotics/mechanical engineering app in the recent cluster
- Surprising physics: exact straight lines from purely rotational inputs (Peaucellier)
- Visually satisfying: smooth linkage motion, persistent coupler curve traces
- Toy-like: drag a joint, the whole mechanism reshapes instantly
- Connects to Simon's engineering background

## Presets (5)
1. **Crank-Rocker** — classic windshield wiper mechanism
2. **Double-Crank** — drag link, both cranks rotate fully
3. **Chebyshev Lambda** — approximate straight-line motion (surprising!)
4. **Peaucellier Straight-Line** — exact straight line from pure rotation (magical!)
5. **Crank-Slider** — engine piston mechanism

## Core Mechanics
- 2D canvas rendering of linkage geometry
- Forward kinematics: given crank angle θ, solve joint positions
- For four-bar: solve using law of cosines for coupler triangle
- For crank-slider: solve using right-triangle geometry
- For Peaucellier: uses geometric inversion property (OA × OB = constant)
- For Chebyshev: standard four-bar with specific proportions
- Real-time animation: crank angle increments by ω×dt each frame
- Drag interaction: when user drags a joint, recalculate link geometry (fix crank angle, solve for new positions)
- Coupler curve tracing: sample a point on the coupler link each frame, append to path array, draw as fading trail

## UI / Controls
- Large canvas occupying ~60% of viewport (centred)
- Right-side (or bottom on mobile) control panel with:
  - Preset selector buttons (5 presets)
  - Play / Pause button
  - Speed slider (0–120 RPM)
  - Trace toggle (on/off)
  - Show vectors toggle (velocity arrows)
  - Clear traces button
  - Grashof readout (classification + condition check)
- Dark engineering theme:
  - Background: #0d1117
  - Ground links: #30363d (steel grey)
  - Moving links: #58a6ff (blue) with varying opacity by link
  - Joints: #c69026 (bronze) circles with glow
  - Traces: #3fb950 (green) fading trail
  - Crank (input): #f0883e (orange) — highlighted
  - Text: #c9d1d9
  - Accent: #c69026
- AI warning banner at top

## Responsive
- Desktop: canvas on left, controls on right
- Mobile (< 768px): canvas on top, controls below, stacked
- Touch support for dragging joints

## Technical
- Single-file HTML/CSS/JS
- Canvas 2D API
- requestAnimationFrame loop
- No external dependencies
- All geometry computed in real-time
- Float precision handled carefully (avoid NaN when mechanism reaches toggle position)

## File
- `/Users/wineclaw/.openclaw/workspace/projects/2am-mini-app-creation/runs/2026-05-02/linkage-lab/index.html`

## Deliverable
A fully working single-file app that:
1. Loads with Crank-Rocker preset and animating
2. Lets user drag any free joint to reshape
3. Shows persistent coupler curve traces when enabled
4. Switches between 5 presets smoothly
5. Displays Grashof classification
6. Works on mobile and desktop
