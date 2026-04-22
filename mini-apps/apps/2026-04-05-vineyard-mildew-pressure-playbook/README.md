# Vineyard Mildew Pressure Playbook

## Concept

A mobile-first educational decision-support simulator that contrasts **Powdery Mildew** (*Erysiphe necator*) and **Downy Mildew** (*Plasmopara viticola*) pressure in a vineyard context. The user adjusts eight environmental and management factors, and the app updates side-by-side pressure scorecards, risk tags, contextual factor summaries, and a "Next 48 Hours — Coach Verdict" panel.

The UX archetype is a **scenario trainer / risk game** — not a calculator, but an interactive situation-room feel where conditions can be dialled and the consequences explored quickly.

---

## Implemented Features

- **8 interactive controls**: growth stage, canopy density, temperature band, humidity level, rain/leaf wetness, carryover inoculum pressure, spray protection status, airflow/openness.
- **Side-by-side powdery vs downy pressure cards** with animated risk meters, dynamic badge labels (LOW / MEDIUM / HIGH / SEVERE), and contextual favouring factors text.
- **Dynamic risk tags** on each card (e.g., "Dense canopy — high risk", "Heavy wetness — major driver", "Spray overdue") that change as sliders move.
- **Coach verdict panel** — a "Next 48 Hours" summary that synthesises the current condition set into actionable advice: what to scout for, what to prioritise, and what to do next.
- **6 quick-scenario presets**: Shaded Warm Trap, Wet Outbreak Week, Open Clean Canopy, Late-Season Humid Spell, High Inoculum Block, Cool & Damp Morning.
- **Animated pressure meters** (CSS transition on width) — scores shift smoothly as sliders move.
- **Reset button** returns all controls to default moderate conditions.
- **Experimental / educational disclaimer banners** (top banner + footer) make clear this is not a spray recommendation engine.
- **Responsive design**: mobile-first single-column layout, expands slightly on wider screens.
- **All SVG assets self-authored** (spore/droplet motifs, disease icons) — no external images required.

---

## How It Works

Powdery and downy mildew respond differently to the same conditions:

| Condition | Powdery (favoured by) | Downy (favoured by) |
|---|---|---|
| Temperature | 16–30°C, warm–moderate | 15–25°C, mild–warm |
| Humidity | Moderate–high (NOT saturated) | High–saturated |
| Leaf wetness/rain | Moderate; heavy rain inhibits | Heavy rain / prolonged wetness drives it |
| Canopy | Dense/shaded | Dense (traps moisture) |
| Airflow | Still air | Still air |
| Growth stage | Bloom–fruit set | Bloom–fruit set; veraison |

The app weights these factors differently for each disease and combines them into a 0–100 risk score, displayed on a meter and categorised by badge.

---

## Caveats

- **Educational guidance only** — not a validated spray recommendation engine. Scores are qualitative, not derived from calibrated field models.
- No local weather data is used; the user supplies the conditions. The app is a scenario-modelling aid, not a forecasting tool.
- Disease pressure depends on microclimate, variety, regional pest pressure, and other factors not captured here.
- Always consult a qualified viticulturist or crop consultant for actual spray decisions.

---

## Verification Suggestions

1. Open `index.html` directly in a browser (no server required).
2. Apply each preset and confirm both scorecards respond distinctly (e.g., "Wet Outbreak Week" should drive downy much higher than powdery).
3. Slide spray protection from "recently sprayed" to "overdue" and confirm risk badges and coach text update.
4. Test at extreme conditions: hot+very humid+heavy rain (downy extreme), warm+moderate humidity+dense canopy+still (powdery extreme).
5. Confirm coach panel content changes meaningfully between presets — not generic copy.
6. Mobile: confirm layout is usable at 375px wide with no horizontal overflow.
7. No external network requests are made; all assets inline.

---

## File Structure

```
vineyard-mildew-pressure-playbook/
  index.html   — main document
  styles.css   — all styles (mobile-first, dark vineyard theme)
  app.js       — scoring logic, UI updates, presets, coach verdict
  README.md    — this file
```

No build step. No dependencies. Open `index.html` directly.
