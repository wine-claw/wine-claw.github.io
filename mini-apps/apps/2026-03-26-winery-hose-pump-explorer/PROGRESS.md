# PROGRESS.md — Winery Hose & Pump Explorer

**Run Date:** 2026-03-26
**Status:** Complete

---

## What Was Built

A self-contained, dependency-free static web app for estimating hose-line pressure drop, total dynamic head (TDH), and rough pump power when transferring wine / water-like liquids in a winery context.

### Files Created

```
runs/2026-03-26/winery-hose-pump-explorer/
├── index.html     9,077 bytes — app shell, semantic HTML5
├── styles.css     9,909 bytes — grape-dark theme, responsive (mobile-first)
├── app.js        15,448 bytes — calculation engine + canvas chart renderer
├── README.md      3,367 bytes — user-facing documentation
├── validate.js    7,070 bytes — Node.js sanity-check & unit tests
└── PROGRESS.md    (this file)
```

### Features Implemented

- **Inputs:** Flow rate (L/min), hose ID (mm), hose length (m), elevation change (m, +/&minus;), fluid density (kg/m³), dynamic viscosity (mPa·s), pump efficiency (%)
- **Fluid Presets:** Water, White Wine, Red Wine, Grape Juice (one-click fill density & viscosity)
- **Outputs:** Velocity (m/s), Reynolds number, Darcy friction factor (f), friction pressure drop (kPa), static head (m H₂O), TDH (m H₂O), hydraulic power (W), shaft power (W)
- **Regime Badge:** Laminar / Transition / Turbulent colour-coded indicator
- **Interactive Chart:** Pressure drop vs flow rate canvas chart; current operating point marked with crosshairs and red dot; dashed guide lines; auto-scaling axes
- **Live Recalculation:** Debounced (300 ms) recalc on any input change — no need to click Calculate
- **Formulas Panel:** Full equation listing, assumptions, caveats, and disclaimer

### Engineering Approach

| Regime | Method |
|---|---|
| Laminar (Re &lt; 2000) | Exact: f = 64/Re |
| Transition (2000–4000) | Linear blend between laminar and Haaland |
| Turbulent (&gt; 4000) | Haaland equation (smooth pipe, k = 0.0015 mm assumed) |
| TDH | ΔP_friction/(ρg) + Δz |
| Power | Hydraulic = ΔP_total × Q; Shaft = Hydraulic / η |

---

## Verification Performed

**`node --check app.js`** — passed (no syntax errors)

**`node validate.js`** — 28/28 checks passed:

- Friction factor laminar (f = 64/Re)
- Friction factor turbulent (reasonable range for smooth pipe)
- Friction factor transition zone (blended)
- Full water pipeline: velocity &gt; 0, turbulent Re, positive ΔP, shaft &gt; hydraulic
- Red wine (high μ): laminar regime confirmed
- Negative elevation: static head &lt; 0, TDH reduced
- Zero flow / zero length: returns null gracefully
- All 4 presets: valid density and viscosity

---

## Caveats & Known Limitations

1. **No fittings / valves** — in reality elbows, tees, valves add 10–30% or more; app shows bare straight-hose friction only
2. **Hydraulically smooth assumption** — k = 0.0015 mm; rough hose (older, scored) will have higher ΔP
3. **Fully developed flow** — entrance length effects omitted
4. **Newtonian fluid** — fine for wine; non-Newtonian fluids (some lees slurries) not modelled
5. **Pump efficiency** is user-supplied; real pumps have varying efficiency across their curve
6. **No NPSH calculation** — cavitation risk not assessed
7. **Chart is for friction ΔP only** (not total TDH) to keep it a single-variable sensitivity plot
8. **Not design-certified** — educational and first-pass only

---

## Follow-up Ideas

- Add a "common fittings equivalent length" table so users can estimate additional ΔP
- Add NPSH calculation and cavitation warning
- Extend chart to show TDH vs flow (pump curve intersection)
- Add a printable summary / PDF export
- Add more presets (must, lees, water/glycol coolant)
- Localisation: switch between metric and US units (gpm, ft, psi)
