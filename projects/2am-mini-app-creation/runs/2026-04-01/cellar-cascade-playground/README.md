# Cellar Cascade Playground

**A mobile-first interactive systems sandbox for exploring how winery operating decisions ripple through quality, energy, throughput, aroma, and tank availability.**

---

## What Is This?

Cellar Cascade Playground is a static, no-build-step web app that simulates the downstream consequences of winery operating decisions. Adjust a set of "operating levers" — chill setpoints, pump-over intensity, SO₂ additions, and more — and watch how those decisions cascade through eight downstream outcome dimensions.

The model is deliberately **heuristic and qualitative**, not a rigorous process simulator. It's designed to spark intuition about winery systems interdependencies, not to make real production decisions.

---

## Quick Start

Open `index.html` directly in any modern browser — no server, no build step, no framework, no network calls required.

```
open cellar-cascade-playground/index.html
```

Works on mobile (optimised for portrait) and desktop.

---

## What You Can Do

### Adjust the Levers
Seven real winery operating levers on a 0–100 slider scale:

| Lever | What it Represents |
|---|---|
| 🍇 Fruit Intake Rate | Leisurely hand-pick pace → Flat-out machine rush |
| ❄️ Chill Aggressiveness | Gentle cooling → Aggressive freeze-down |
| 🔄 Pump-Over Intensity | Gentle drizzle → High turbulence |
| 🧪 SO₂ Conservatism | Minimal additions → Heavy protective doses |
| 🫧 Lees Contact Duration | No contact → Extended sur lie aging |
| 🔍 Filtration Timing | Early polish → Late keep-character |
| 📦 Packaging Speed | Careful measured → Pressured fast fill |

### Read the Ripple Board
The centre panel shows which outcomes are shifting most, which levers are causing them, and whether the shift is up or down. An explanation panel at the bottom gives a plain-English root-cause summary.

### Check the Outcomes
Eight downstream dimensions with delta-from-baseline tracking and intuitive colour-coded status:

- **Wine Quality Risk** — cumulative process stress on final quality
- **Aroma Retention** — fragile ester/terpene preservation
- **Oxidation / Micro Risk** — combined oxygen exposure and microbial stability
- **Throughput Pressure** — tank and processing line load
- **Energy Demand** — refrigeration, pumping, filtration power draw
- **Tank Availability** — free tank capacity / scheduling headroom
- **Team Stress** — human workload and pace pressure
- **Schedule Buffer** — process flexibility and float time

### Load a Scenario Preset
Five pre-built scenarios let you jump straight into a situation:

- **🍇 Baseline** — normal balanced operations
- **🔥 Hot Vintage Intake** — compressed harvest, warm fruit, rush processing
- **🥂 Premium White Focus** — minimal intervention, maximise aroma, gentle handling
- **🍷 Red Ferment Crunch** — high extraction, warm ferments, tannin management
- **📦 Bottling Week Squeeze** — end-of-batch pressure, speed over care

---

## How the Model Works

The app uses a **linear causal matrix** — each lever has a defined effect vector across all eight outcomes. Effects are interpolated between a "low lever value" and "high lever value" anchor, producing a smooth response surface.

**Important caveats:**
- The causal weights are illustrative and educational, not derived from real process data
- Non-linear interactions (e.g., temperature × SO₂ synergy) are not fully captured
- Tank geometry, grape variety, and vintage conditions are not modelled
- The app does not track time-domain behaviour (fermentation kinetics, etc.)

This is explicitly labelled an **educational heuristic tool**. Do not use it for real operational decisions.

---

## Files

```
cellar-cascade-playground/
├── index.html    — Main HTML structure
├── styles.css    — Mobile-first dark theme styling
├── app.js        — Simulation engine, causal matrix, UI rendering
└── README.md     — This file
```

---

## Verification

- HTML/CSS/JS syntax reviewed manually
- App opens directly from filesystem without errors in Chromium-based browsers
- Sliders, preset buttons, and outcome bars confirmed functional via code inspection
- No external network calls — fully offline-capable
- Deliberately kept to pure HTML/CSS/JS with no dependencies

---

## Suggested Next Steps

- Add a simple time-step simulation showing how outcomes evolve over a vintage timeline
- Include a "compare two scenarios" side-by-side mode
- Add variety-specific overlays (Shiraz vs. Chardonnay parameter shifts)
- Introduce non-linear interactions (e.g., aggressive chill + heavy SO₂ → sluggish ferment)
- Export a scenario summary as shareable text

---

**⚠️ Educational Demo Only** — Not professionally validated. Not for real winery operations.
