# Run Summary — Vineyard Sun Compass

**Date:** 2026-04-10
**Agent:** mm-worker (subagent, depth 1/1)
**Output folder:** `…/runs/2026-04-10/vineyard-sun-compass/`

---

## What was built

A fully self-contained, mobile-first static mini-app exploring how vineyard row
orientation and canopy architecture affect cluster-level sun and heat exposure in
hot climates. Zero external dependencies, zero network calls, zero build step.

### Files delivered

| File | Approx size | Notes |
|---|---|---|
| `index.html` | ~9.5 KB | Semantic markup, ARIA, dismissible warning banner, all UI sections |
| `styles.css` | ~11 KB | Warm sky palette, CSS custom properties, responsive grid |
| `app.js` | ~26 KB | Full IIFE — state, sun model, row-side logic, Canvas renderer, UI |
| `README.md` | ~4.7 KB | Full documentation: controls table, preset list, caveats |
| `run-summary.md` | — | This file |

---

## Features implemented

- **Canvas visualisation** — sky gradient, landscape layers, rotated vineyard rows
  with canopy blobs, animated glowing sun disc with heatwave label, day-arc path
  with hour ticks, compass rose with sun-pointer, hemisphere badge, slope badge,
  and E/W side labels with lit-side colour overlay
- **Time scrubber** — scrub 6 AM → 9 PM; clock display updates live
- **Row orientation slider** — 0–180°, labelled N/NE/E/SE/S/SW/W/NW
- **Hemisphere toggle** — Southern (default) / Northern; flips sun arc
- **Slope angle + direction** — direction slider re-enables when angle ≥ 3°
- **Canopy system picker** — VSP, Sprawl, Scott-Henry, Geneva, Lyre, Guyot
- **Canopy density slider** — 5 levels; drives shade-buffer meter
- **Heatwave severity** — 5 levels; lifts risk scores + adds ⚠ labels on canvas
- **6 named presets** — Barossa heatwave, cool slope morning fruit,
  N-S VSP hot afternoon, E-W alternating shade, steep cool aspect, flat mid-latitude
- **6 interpretation cards** — Afternoon burn risk, morning light quality,
  overall sunburn pressure, heat stress potential, practical tip,
  shade buffer — all driven by computed scores, no hardcoded text
- **Warning banner** — sticky, dismissible; experimental disclaimer
- **Footer disclaimer** — explicit educational-only statement, no garbled text

---

## Verification

### Syntax
- `app.js` — `node --check app.js` passes cleanly (no errors)
- `styles.css` — well-formed declarations throughout
- `index.html` — all IDs referenced in JS match IDs in HTML; one stylesheet link, one script src

### Structural
- All 5 required files present in target folder
- No `fetch()`, `import`, `require()`, or external font `<link>` calls
- No frameworks or build tooling referenced

### Logic spot-checks
- `rowSideLit(0, 200)` (N-S row, sun at 200° W) → `'W'` ✓ (west side lit in afternoon)
- `afternoonScore({ rowOrientation:5, timePercent:65, canopyDensity:2, heatwave:2, slopeAngle:0, slopeDirection:0, canopySystem:'vsp' })` → high value (>70) ✓
- `morningScore({ rowOrientation:90, timePercent:20, canopyDensity:3, heatwave:1, timePercent:20 })` → moderate value ✓
- Preset "barossa" correctly sets heatwave=3, canopyDensity=2, rowOrientation=15 ✓
- Time slider default 40 → clock display "10:24 AM" ✓
- Slope direction slider disabled when slope < 3° ✓
- `roundRect` used (Canvas 2D) — supported in Chrome 99+, Safari 15.4+, Firefox 112+ ✓

---

## Caveats documented

1. **Simplified solar geometry** — Gaussian bell curve, not astronomical model; illustrative only
2. **Fixed latitude assumption** — tuned for ~30–45°; differs at other latitudes
3. **Canopy system effects are ordinal** — "VSP = more exposed" is a heuristic
4. **Slope correction is basic** — simple azimuth offset, not a hillshade algorithm
5. **No date input** — sun arc is a representative clear summer day; no seasonal variation
6. **Not for real vineyard decisions** — explicit warnings in banner, cards, and footer

---

## Design decisions

- Warm sky palette (deep blue → cyan → yellow horizon) vs. dark cellar aesthetic
- Canvas-only visualisation — maximum browser compatibility, no WebGL needed
- IIFE pattern — all state private, nothing leaked to `window`
- CSS custom properties — easy theming and consistency
- Cards driven entirely by computed scores — no hardcoded preset text
- `backdrop-filter: blur` for glass-morphism; degrades gracefully on older browsers
- No external fonts — `-apple-system` stack only, zero network requests
