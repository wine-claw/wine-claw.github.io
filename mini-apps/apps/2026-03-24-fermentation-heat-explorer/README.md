# Fermentation Heat Explorer

Mini-app for estimating wine fermentation heat release and cooling duty, with a stoichiometric
ethanol/CO₂ sketch, jacket ΔT framing, and a front-loaded fermentation heat-release profile chart.

> See **PROGRESS.md** for the full changelog across all refresh runs.

## Files

- `index.html` — app shell, inputs, and explanatory copy
- `app.js` — calculations, metric cards, and inline SVG chart
- `styles.css` — self-contained dark wine-theme styling

## Main formulas

### Sugar units and conversions

The app supports three sugar units via the **Sugar unit** dropdown. All internal calculations
use g/L; conversions are applied at input and display.

| Unit | Label | g/L from unit | Unit from g/L |
|------|-------|---------------|---------------|
| g/L  | g/L   | (passthrough) | (passthrough) |
| Brix | °Bx   | °Bx × 10 × SG / (1 + °Bx × 0.00425) | g/L / (10 × SG − g/L × 0.00425) |
| Baumé | °Be | °Be × 17.7 (grape-must empirical fit; 13°Be → 230 g/L at SG ≈ 1.098) | g/L / 17.7 |

> **Note on Baumé ↔ Brix:** the ratio drifts with concentration. At typical must densities
> (1.08–1.10 SG), 13°Be ≈ 21–22°Bx and 22°Bx ≈ 13°Be. The Baumé formula is calibrated
> for grape must rather than pure sucrose solutions.

### Sugar consumed

`sugar consumed (g/L) = starting sugar − residual sugar`

All three units are supported; the conversion is applied before this step.

### Total heat released

`total heat (kJ) = sugar consumed mass (g) × heat release factor (kJ/g sugar)`

Default heat release factor: **0.556 kJ/g sugar** (calibrated for grape must fermentation).
0.556 kJ/g = 556 J/g is broadly consistent with the enthalpy of fermentation for sugar
to ethanol + CO₂ (~−84 kJ/mol glucose / 180 g/mol ≈ −467 J/g) plus the additional metabolic
heat of yeast growth and maintenance. Use 0.556 as a starting point; adjust based on
your vintage data if you have it.

### Average cooling load

`average kW = total heat (kJ) / total fermentation time (s)`

This is the **continuous average** heat rate — the jacket must remove this much heat on
average throughout the entire fermentation.

### Peak cooling load

`peak kW = average kW × peak factor`

The peak factor (default 1.8×) is a simple multiplier that accounts for the biology of
fermentation: heat release rises, peaks near day ⅓ of total duration, then falls away.
Red ferments typically run 1.8–2.2× the average; whites 1.4–1.7×. This is a sizing
headroom parameter, not a mechanistic kinetic model.

### Jacket ΔT framing

`UA (W/K) = (volume L / 10,000) × 10 W/K`

Rough insulated wine-tank jacket estimate: UA scales with the surface-area-to-volume ratio,
which falls as tanks get larger (a 20,000 L tank does not need twice the UA per degree).
Default: 10 W/K per 10,000 L. Adjust this if your jacket performance differs significantly.

`sustainable ΔT (°C) = average kW / UA` — the temperature difference the jacket must
maintain between wine and coolant at average load.

`peak ΔT demand (°C) = peak kW / UA` — how far above coolant temperature the wine would
climb if the jacket could not keep up at peak heat output.

This framing gives a physics-based ΔT check: if your glycol is at 10 °C and the model
shows a peak ΔT demand of 18 °C, the tank will try to reach ~28 °C — consistent with
a typical red ferment peak. If the ΔT exceeds what your coolant approach allows, you need
more glycol flow, a bigger jacket, or a slower ferment.

### Adiabatic temperature rise

`ΔT = total heat / (mass × Cp)`

where mass = tank volume × must density. This is the temperature rise if **no heat is
removed at all** — a worst-case reference, not a target.

### Rough stoichiometric products

`C₆H₁₂O₆ → 2 C₂H₅OH + 2 CO₂`

| Product | per g sugar consumed |
|---------|---------------------|
| Ethanol | 92/180 ≈ 0.511 g/g |
| CO₂     | 88/180 ≈ 0.489 g/g |

Approximate ABV: `sugar consumed (g/L) × 0.059` — a conservative practical coefficient
(stoichiometric maximum ≈ 0.065; 0.059 accounts for yeast efficiency, volume change,
and CO₂ stripping losses).

## Fermentation presets

### Red ferment
- Higher sugar (250 g/L), longer duration (10 days), hotter peak (26 °C wine temp)
- Peak factor 2.1× average (large, hot ferments have sharper peaks)
- UA ≈ 15 W/K (15,000 L default volume)

### White / Rosé
- Moderate sugar (210 g/L), cooler target (16 °C), shorter ferment (8 days)
- Peak factor 1.5× average (cooler ferment, gentler heat curve)
- UA ≈ 8 W/K (8,000 L default volume)

Preset values fill all fields; you can then override any parameter before recalculating.

## Assumptions and caveats

1. **Heat release factor** (0.556 kJ/g sugar) is a calibrated first-pass assumption for
   grape must. Adjust based on vintage data if you have it; values from 0.45 to 0.60 kJ/g
   are defensible depending on yeast strain, nutrient regime, and temperature.
2. **UA = 10 W/K per 10,000 L** is a rough insulated-tank estimate. Uninsulated tanks,
   or tanks with poor glycol circulation, will have a lower effective UA. Well-designed
   jacket systems may achieve 15–20 W/K per 10,000 L. Use what you know about your equipment.
3. **Peak factor** is a user-adjustable sizing headroom, not a fitted kinetic model.
   It covers the gap between the average heat rate and the actual peaked heat curve.
4. The app **ignores**: vessel wall conduction, latent heat of CO₂ evolution, cap
   management (punchdown / pumpovers in red ferments), changing Cp as ethanol builds,
   and real fermentation kinetics. Treat outputs as indicative, not precise.
5. **Ethanol and CO₂** figures are stoichiometric sketches for educational context,
   not measured yields. Actual ethanol yields depend on fermentation efficiency,
   temperature, and yeast strain; CO₂ loss varies significantly with agitation and
   air exposure.
6. **Brix / Baumé conversions** are empirical approximations for grape must. They
   do not account for non-sugar solutes (acids, phenolics) that shift actual density.
   For contract winemaking or formal lab work, use a refractometer/Brix correction
   table or actual lab measurement.

## Files

```
fermentation-heat-explorer/
├── index.html   — app shell + inputs + explanatory copy
├── app.js       — calculations, chart, metric rendering
├── styles.css   — dark wine-theme styling
├── README.md    — this file
└── PROGRESS.md  — per-run changelog
```
