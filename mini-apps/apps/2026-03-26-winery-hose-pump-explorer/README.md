# Winery Hose & Pump Explorer

> A lightweight, dependency-free static web app for estimating hose-line pressure drop, total dynamic head (TDH), and rough pump power when transferring wine or water-like liquids.

**Live usage:** Open `index.html` directly in any modern browser — no server required.

---

## What It Does

Given a set of flow and hose parameters, the app calculates:

| Output | Description |
|---|---|
| **Fluid Velocity** | Flow velocity inside the hose (m/s) |
| **Reynolds Number** | Re = ρVD/μ — determines flow regime |
| **Flow Regime** | Laminar / Transition / Turbular |
| **Darcy Friction Factor** | f, computed via 64/Re (laminar) or Haaland (turbulent) |
| **Friction Pressure Drop** | kPa lost to hose wall friction |
| **Static Head** | Elevation component (m H₂O, + = lifting) |
| **Total Dynamic Head (TDH)** | Sum of friction head + static head (m H₂O) |
| **Hydraulic Power** | Power needed to move the fluid (W) |
| **Estimated Shaft Power** | Accounting for pump efficiency (W) |

It also renders a **Pressure Drop vs Flow Rate** sensitivity chart with the current operating point highlighted.

---

## Fluid Presets

| Preset | Density (kg/m³) | Viscosity (mPa·s) | Notes |
|---|---|---|---|
| Water | 998 | 1.0 | Reference baseline |
| White Wine | 990 | 1.5 | Typical 11–13% ABV |
| Red Wine | 1005 | 3.5 | Higher polyphenols + ethanol |
| Grape Juice | 1065 | 8.0 | Sugar + pectin load |

---

## Key Assumptions

1. **Circular hose, constant diameter** — no sudden expansions or contractions.
2. **Fully developed flow** — entrance length effects are neglected.
3. **Newtonian fluid** — valid for wine and grape juice under typical working conditions.
4. **Hydraulically smooth hose** — roughness k ≈ 0.0015 mm (typical food-grade flexible hose).
5. **No fittings or valves** — add 10–30% friction allowance for typical winery piping with valves, elbows, and couplings.
6. **Educational / first-pass only** — not certified for engineering design or pump selection.

---

## Formulas Used

```
Velocity:       V = Q / A          where A = πD²/4
Reynolds:       Re = ρ V D / μ
Friction (laminar, Re < 2000):   f = 64 / Re
Friction (turbulent):             Haaland equation
                                   1/√f = −1.8 log₁₀[(6.9/Re) + (k/D)^1.11 / 3.7]
Friction ΔP:   ΔP_f = f (L/D) (ρV²/2)
Static head:   H_static = Δz
TDH:           H_total = ΔP_f/(ρg) + Δz
Hydraulic power: P_h = ΔP_total × Q
Shaft power:   P_shaft = P_h / η
```

---

## Browser Compatibility

Works in any modern browser (Chrome, Firefox, Safari, Edge). No build step, no dependencies, no internet required.

---

## File Structure

```
winery-hose-pump-explorer/
├── index.html   # Single-page app shell
├── styles.css   # Responsive styles (grape-dark theme)
├── app.js       # Calculation engine + chart renderer
└── README.md    # This file
```

---

## Development / Verification

```bash
# Syntax check JS via Node
node --check app.js

# Run validate.js if present
node validate.js
```

---

## License & Disclaimer

This tool is provided for **educational and first-pass estimation purposes only**. It is not a substitute for professional engineering analysis. Pump and piping system design should be reviewed by a qualified engineer familiar with the specific installation. The authors accept no liability for decisions made based on this tool.
