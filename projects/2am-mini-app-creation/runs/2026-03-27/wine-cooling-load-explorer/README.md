# Wine Cooling & Chilling Load Explorer

**Location:** `runs/2026-03-27/wine-cooling-load-explorer/`
**Type:** Self-contained static web app (no build step — open `index.html` directly)

---

## What It Is

A practical interactive calculator for winery staff and winemakers to estimate:

- **Heat energy to remove** (in kJ and kWh) when cooling wine or juice in a tank
- **Estimated cooling time** given available chilling power (kW)
- **Household energy analogues** for intuitive feel (e.g. "≈ 3 days of average household electricity")
- A live **SVG chart** showing heat removal vs. target temperature with the current selection highlighted
- Contextual **interpretation** of what the numbers mean for your operation

---

## Quick Start

```bash
# Open directly in your browser, no server needed:
open runs/2026-03-27/wine-cooling-load-explorer/index.html

# Or serve locally (any static server):
python3 -m http.server 8080 --directory runs/2026-03-27/wine-cooling-load-explorer
# Then visit http://localhost:8080
```

---

## Formulas Used

### Heat Removal (Q)

```
Q (kJ) = mass (kg) × Cp (kJ·kg⁻¹·K⁻¹) × ΔT (°C)
Q (kWh) = Q (kJ) ÷ 3600
```

### Cooling Time (t)

```
t (hours) = Q (kWh) ÷ (cooling_power_kW × efficiency_factor)
```

### Definitions

| Symbol | Meaning | Typical Value |
|--------|---------|---------------|
| `m`    | Mass of liquid (volume × density) | — |
| `Cp`   | Specific heat capacity of wine/juice | 3.90–3.96 kJ·kg⁻¹·K⁻¹ |
| `ΔT`   | Temperature difference (start − target) | — |
| `η`    | Efficiency / safety factor | 0.60–0.75 |

### Physical Basis

Wine and grape juice have a specific heat capacity close to water but slightly lower. This app uses **Cp ≈ 3.94 kJ·kg⁻¹·K⁻¹** as the default (water is 4.18). Density defaults to **≈ 0.993 kg/L**, close to water and typical for wine.

---

## Presets Included

| Preset | Volume | Start → Target | Context |
|--------|--------|----------------|---------|
| Small Trial Tank | 200 L | 18 → 4 °C | Bench-scale cold soak / trial batch |
| Red Ferment | 5,000 L | 30 → 22 °C | Peak heat extraction during cap management |
| White Juice Settling | 3,000 L | 18 → 10 °C | Post-press rapid cooling before fermentation |
| Cold Stabilisation | 8,000 L | 15 → −2 °C | Tartrate cold stabilisation (sub-zero) |

---

## Caveats & Limitations

> ⚠️ **This is a first-pass educational tool, not a refrigeration engineering calculator.**

- **Assumes uniform temperature** — real tanks stratify. Thermocouple placement matters significantly.
- **Ignores metabolic heat** — active fermentations generate their own heat. For peak red ferments, this can be equivalent to 1–3 °C on top of your ΔT; budget accordingly.
- **Ignores heat ingress** — tank wall conduction, headspace, and ambient temperature changes all add to the load over time.
- **CO₂ heat removal** — juice and active ferments lose some heat via CO₂ stripping. This is ignored here.
- **Efficiency factor** — the 0.60–0.75 default accounts roughly for compressor duty cycle, heat-exchanger fouling, and non-ideal conditions. Real values depend on your equipment and ambient conditions.
- **Glycol system sharing** — if multiple tanks cool simultaneously, each gets a fraction of the total kW. Derate accordingly.
- **Cold stabilisation at sub-zero** — requires calibrated equipment, freeze-point depression considerations, and typically a dedicated chiller train; not a standard glycol setup.

---

## Local Verification (Self-Check)

The app was verified with the following checks:

- [x] **HTML validation** — semantic HTML5 structure, all elements properly closed
- [x] **CSS syntax** — no obvious errors, CSS variables used consistently
- [x] **JS syntax check** — parsed with Node.js (no `node` errors on load):
  ```bash
  node --check app.js && echo "JS syntax OK"
  ```
- [x] **All DOM IDs referenced** — confirmed every `getElementById` call matches an HTML `id` attribute
- [x] **Formula spot-check** — 1000 L, 0.993 kg/L, Cp 3.94, 28→12 °C (ΔT=16):
  - Mass = 993 kg
  - Q = 993 × 3.94 × 16 = **62,599 kJ** ≈ **17.4 kWh** ✓
  - At 10 kW × 0.75 = 7.5 kW effective → **2.3 hours** ✓
- [x] **Chart renders** — SVG generated with gradient fill, current-point marker, and axis labels; no external charting library required
- [x] **Preset buttons** — all four presets load correctly and update all input fields

---

## Next-Step Ideas

- [ ] Add a **second chart tab** for cooling time vs. cooling power at fixed ΔT (useful for sizing chillers)
- [ ] Incorporate a **metabolic heat load estimate** for active ferments (Yeast Heat of Fermentation ~ 50–80 kJ/mol, can be approximated per °Bx)
- [ ] Support **multiple tanks** and shared glycol loop with kW splitting
- [ ] Add **export to PDF** for job planning / contractor quoting
- [ ] Add a **slider** to explore how target temp affects cooling time interactively on the chart
- [ ] Localisation — Celsius is default; add °F mode

---

## File Structure

```
wine-cooling-load-explorer/
├── index.html    — Main HTML (self-contained)
├── styles.css    — All styling (CSS variables, responsive)
├── app.js        — Calculation engine, SVG chart, interactivity
└── README.md     — This file
```
