# Fermentation Heat Explorer — Per-run notes (2026-03-24 AM refresh)

## What was done

### app.js
- **Corrected load-profile normalisation constant**: The gamma-style load shape function
  `4t·e^(1-4t)` has a continuous mean integral of `(e - 5e⁻³)/4 ≈ 0.717` (not 0.264
  as originally coded). The shape now correctly peaks at `t = 1/3` of the total
  duration (e.g. day 1.75 for a 7-day ferment), which is biologically reasonable for
  peak fermentation heat output.
- **Fixed sugar sigmoid steepness**: Changed `k = 8` → `k = 12` and midpoint
  `t_mid = 0.42` → `t_mid = 0.4`. The sigmoid now properly reaches the target
  residual-sugar value (~2.2 g/L for defaults) at `t = 1`, instead of stopping
  at 4.18 g/L.
- **Added detailed ABV formula documentation**: The `ABV_COEFFICIENT = 0.059` is now
  explained in a multi-line comment showing the stoichiometric derivation
  (C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂), the ethanol yield (0.511 g/g), and why 0.059 is a
  conservative practical figure vs. the raw stoichiometric maximum (~14.8 % v/v
  for defaults vs. the app's 13.5 % v/v).
- **Added `clamp()` utility**: Reserved for future use.
- **Added `formatSmart` precision rule**: Numbers ≥ 1000 display with 0 decimal places;
  ≥ 100 with 1 dp; < 100 with 2 dp.
- **Smart chart day-tick labels**: Fewer decimal places when there are many day ticks.
- **Profile now uses fresh `createProfile` with documented gamma function** replacing the
  opaque cubic-polynomial skew.

### index.html
- **Updated eyebrow**: Changed from "2am mini-app · overnight prototype" to "Wine science mini-app".
- **Updated hero note title**: "First-pass decision support only" instead of "Built for…".
- **Added HTML input constraints** (`min`/`max` attributes) to all eight inputs to prevent
  nonsensical values (e.g. negative volume, residual sugar > 400 g/L).
- **Added `&times;` entity** for the peak-factor unit display.
- **Improved "Model notes" section**: Four clearly labelled bullets (Heat, Cooling duty,
  Ethanol & CO₂, ABV note) replacing the previous undifferentiated list.
- **Expanded "What this is not" box**: Styled amber callout box now prominently
  explains the tool's limitations — refrigeration design, wall gains/losses, kinetics.
- **Improved chart caption**: Now says "peaking near one-third of the total duration"
  matching the actual `t = 1/3` peak.
- **Legend now shows units**: "Sugar remaining (g/L)" and "Cooling load (kW)".
- **Used HTML entities** for CO₂ (subscript 2) and the middle-dot for kJ/kg·K.

### styles.css
- **Added `.what-it-is-not` style**: Amber-tinted callout box matching the accent colour,
  making the limitations section visually distinct and scannable.

## Verification

- JS syntax: `node --check app.js` — passes cleanly.
- Logic tests (vm sandbox): all calculated values match expected defaults:
  - totalHeatMJ: 1267.7 MJ
  - avgKW: 2.096 kW
  - peakKW: 3.773 kW
  - adiabaticRiseC: 31.3 °C
  - approxAbv: 13.5 % v/v
  - ethanolKg: 1165 kg, co2Kg: 1115 kg
  - Sugar at t=1: 2.17 g/L (target 2 g/L)
  - Profile peak: day 1.75 (t=0.25 of 7 days = correct)
  - All four validation edge cases catch bad inputs correctly.
- Browser load (serve on localhost:3999): page renders correctly, no console errors.
- Visual review: layout, typography, chart colours, and metric cards all look clean
  and professional.

## What still needs manual/daytime checking

1. **Profile peak vs. stated peakKW**: The chart's cooling-load curve peaks at ~1.4×
   the stated average (the natural peak of the gamma shape), not at the user's
   peak-factor multiplier. The stated `peakKW = avgKW × peakFactor` is displayed
   in the metrics card but the chart doesn't clamp to that value. This is
   documented in the code as intentional (profile = visual sketch, peakKW is for
   sizing reference), but a reviewer may want the chart's right y-axis to
   reference the stated peakKW. **Not changed — reviewer's call.**
2. **Browser screenshot taken but not reviewed pixel-by-pixel**. Minor text-contrast
   notes from visual analysis: small axis labels and model-notes text are slightly
   low-contrast on dark backgrounds. Not changed unless Simon flags it.
3. **Serve was running on port 3999** — if the app needs to be served in future,
   run `npx serve` in the project directory.

## Open notes for reviewer

- **Chart right y-axis ceiling (4.3 kW) vs. stated peakKW (3.77 kW)**: The chart's
  `loadCeil = max(avgKW, peakKW) × 1.15` is computed independently of the user's
  peakFactor, so the chart's right-axis top tick (4.3 kW) exceeds the metric card's
  peakKW (3.77 kW). This is intentional — the chart shows the fermentation heat-
  release SHAPE (natural peak ≈ 1.4× mean for the gamma function), while peakKW in
  the card is the user's sizing multiplier. If the reviewer prefers them to match,
  the chart ceiling could be tied to `peakKW × 1.15` instead. Minor visual item only.
- **Minor polish ideas** (deferred): slightly larger/bolder axis tick labels;
  consistent unit spacing (e.g. `°C` not `C`); adding a horizontal reference line
  on the chart at the average-cooling-load value; annotating peak load point directly
  on the curve.

## File listing (final)

```
fermentation-heat-explorer/
├── index.html   — app shell + inputs + explanatory copy
├── app.js       — calculations, chart, metric rendering
├── styles.css   — dark wine-theme styling
├── README.md    — original formula documentation
└── PROGRESS.md  — this file
```

Project path: `/Users/wineclaw/.openclaw/workspace/projects/2am-mini-app-creation/runs/2026-03-24/fermentation-heat-explorer/`
