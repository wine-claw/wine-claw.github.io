# Run Summary — 2026-04-01
## Cellar Cascade Playground

**Worker:** mm-worker subagent (depth 1/1)
**Concept:** Systems-thinking / ripple-effect simulation for winery operations
**Folder:** `runs/2026-04-01/cellar-cascade-playground/`

---

## What Was Built

A fully self-contained, mobile-first static web app demonstrating how winery operating decisions create cascading downstream effects across eight outcome dimensions.

**Files created:**
- `index.html` (2.7 KB) — semantic HTML structure, Google Fonts, warning banner
- `styles.css` (10 KB) — dark wine-cellar theme, mobile-first, CSS custom properties, animations
- `app.js` (15.4 KB) — causal matrix simulation engine, slider inputs, preset system, ripple board, outcome gauges
- `README.md` (4.7 KB) — full documentation, caveats, usage guide
- `run-summary.md` (this file)

---

## Design Decisions

- **Single causal matrix** with 7 levers × 8 outcomes = 56 directional weight pairs, linearly interpolated for smooth slider response
- **Delta-from-baseline** approach: outcomes show change relative to the "baseline" configuration, making the ripple effects immediately legible
- **Ripple explanation panel**: plain-English root-cause text generated from the top 3 contributors per outcome
- **Scenario presets**: 5 pre-built situations covering hot vintage, premium white, red ferment crunch, bottling squeeze, and baseline
- **Mobile-first layout**: single-column on phones, 3-column control-room layout on wider screens
- **No frameworks, no dependencies, no network calls** — pure HTML/CSS/JS

---

## Internal Causal Model Highlights

| Lever | Primary Upside | Primary Risk |
|---|---|---|
| Fruit Intake Rate | Throughput ↑ | Quality risk ↑, tank pressure ↑ |
| Chill Aggressiveness | Wine quality ↑ | Energy demand ↑↑ |
| Pump-Over Intensity | Extraction ↑ | Oxidation risk ↑, energy ↑ |
| SO₂ Conservatism | Stability ↑, aroma ↑ | Slows ferment if excessive |
| Lees Contact | Aroma complexity ↑ | Tank occupancy ↑, schedule ↓ |
| Filtration Timing (late) | Aroma retention ↑ | Oxidation/micro risk ↑ |
| Packaging Speed | Schedule buffer ↑ | Oxidation ↑, quality risk ↑ |

---

## Caveats

- Causal weights are illustrative/educational, not derived from real winery process data
- Non-linear interactions (temp × SO₂, variety differences) are intentionally simplified
- No time-domain simulation — this is a steady-state snapshot tool
- Colour coding (green = good, red = bad) follows outcome-specific invert flags correctly

---

## Verification

- File syntax review completed (no obvious errors)
- App confirmed to load from filesystem without build step
- All 7 sliders and 5 preset buttons wired to event handlers
- Outcome bars and ripple board use reactive update path
- No external resource dependencies except Google Fonts (gracefully degrades without network)
- No `fetch`, `XMLHttpRequest`, or other network calls in the JS

---

## What Worked Well

- The causal matrix approach is compact (one data structure) but expressive enough to show coherent system behaviour
- The ripple explanation panel gives the app personality and makes it feel like a real systems tool
- The dark wine-cellar colour scheme is distinctive and avoids generic AI-app aesthetics
- Scenario presets give immediate entry points without requiring the user to understand all levers first

## What Could Be Improved (Next Run)

- Add a time-step or "run simulation" mode showing outcomes evolving over days/weeks
- Include variety-specific parameter sets (Shiraz vs. Chardonnay have very different pump-over optima)
- Add a simple export-to-text feature for sharing scenario configurations
- Introduce interaction terms (e.g., high chill + heavy SO₂ = sluggish ferment)
- Consider a force-directed graph for the ripple relationships, animated on lever change
