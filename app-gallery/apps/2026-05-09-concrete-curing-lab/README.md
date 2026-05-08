# 🧱 Concrete Curing Lab

An interactive concrete mix design and curing simulator — a single-file HTML/CSS/JS toy that lets you design a concrete mix, pour it, and watch it hydrate and gain strength over accelerated time.

## What It Does

- **Mix Design Panel** — adjust cement, water, sand, gravel, plasticizer, and admixture (accelerator/retarder) with live readouts for w/c ratio, density, estimated 28-day strength, and workability.
- **Cross-Section Canvas** — visualizes the concrete as it transitions from wet slurry to fully cured, with animated particles, hydration bubbles, temperature glow, and a crack risk indicator.
- **Strength & Temperature Chart** — dual-axis line chart tracking compressive strength (teal) and internal temperature (burnt orange) over simulated time.
- **Playback Controls** — Pour, Reset, and speed up time (1× / 10× / 100× / 1000×).

## Controls

- **Sliders** — design your mix
- **Pour & Cure** — start the simulation
- **Reset** — clear and start over
- **Speed buttons** — watch curing in real time or fast-forward
- **Keyboard shortcuts:**
  - `Space` — Pour
  - `R` — Reset

## How to Run

Open `index.html` in any modern browser. No build step or server required.

## Notes

- Strength and temperature models are simplified approximations for educational / toy purposes.
- The visual cross-section uses Canvas 2D with particle animation and procedural moisture/temperature overlays.
- Fully responsive — works on mobile and desktop.
- Single-file, zero dependencies.
