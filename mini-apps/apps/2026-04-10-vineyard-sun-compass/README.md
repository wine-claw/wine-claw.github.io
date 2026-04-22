# Vineyard Sun Compass

**A visual, interactive explorer of row orientation and canopy exposure for hot-climate vineyards.**

---

## What is this?

Vineyard Sun Compass is a mobile-first, single-page static mini-app that helps
you *qualitatively* understand how row orientation, canopy architecture,
slope, and heatwaves interact to shape cluster-level sun and heat exposure.

It is **not** a calculator. There are no ET₀ formulas, no radiation flux
models, no soil moisture inputs. Instead, it uses a visual sun-path
and row diagram to show you:

- Which side of a row is getting hammered by afternoon radiation
- How exposure shifts through the day as the sun arcs
- How dense or open your canopy is buffering (or not buffering) fruit-zone heat
- Plain-English interpretation cards that summarise risk levels

Open `index.html` directly in any modern browser. No server, no build step,
no network requests, no external fonts.

---

## Files

```
vineyard-sun-compass/
  index.html      — markup, ARIA labels, warning banner, interpretation cards
  styles.css      — warm sky aesthetic, mobile-first, no frameworks
  app.js          — all visualisation and interaction logic (IIFE, no deps)
  README.md       — this file
```

---

## Controls

| Control | What it does |
|---|---|
| **Time of day** slider | Scrub through 6 AM → 9 PM; watch the sun arc and row lighting shift |
| **Row orientation** | Rotate vineyard rows N-S (0°) through E-W (90°) and beyond |
| **Hemisphere** | Southern (default) or Northern — flips the sun's apparent arc direction |
| **Slope angle & direction** | Adds a hillslope aspect correction to the sun angle |
| **Canopy system** | VSP, Scott-Henry, Geneva Double Curtain, Lyre, Sprawl, Guyot |
| **Canopy density** | Open → Very dense; drives the shade-buffer meter |
| **Heatwave severity** | Lifts heat-stress and sunburn scores; adds ⚠ labels on canvas |

---

## Presets

| Preset | Key scenario |
|---|---|
| **Barossa heatwave** | N-S VSP, flat, open canopy, extreme heatwave — classic hot-dry exposé |
| **Cool slope morning fruit** | NW-SE rows on a gentle slope, dense sprawl, no heatwave |
| **N-S VSP hot afternoon** | Tight N-S rows, VSP, moderate heatwave, mid-afternoon |
| **E-W alternating shade** | E-W rows, Scott-Henry, alternating canopy shading pattern |
| **Steep cool aspect** | Steep NE-facing slope, dense Geneva curtains, cool conditions |
| **Flat mid-latitude** | Neutral baseline — flat, N-S, Guyot, mild conditions |

---

## How it works (simplified model)

1. **Sun position** — a Gaussian bell curve approximates daylight intensity
   and elevation through the day. Southern hemisphere sun arcs through the
   north; northern hemisphere arcs through the south.

2. **Row side lit** — the sun's azimuth is compared to the row's
   perpendicular normal to determine whether the east or west side of
   the row is the sunlit face. N-S rows in the Southern hemisphere at
   afternoon get the classic west-side afternoon exposure.

3. **Exposure scores** — six independent 0–100 scores are computed from
   combinations of time, orientation, canopy density, heatwave, and slope.
   These drive the fill level of the meter bars and the qualitative text
   in the interpretation cards.

4. **Canvas visualisation** — renders a sky gradient, layered landscape,
   rotated vineyard rows with canopy blobs, a glowing sun disc, a day-arc
   path, compass, hemisphere badge, slope badge, and E/W side labels —
   all updating in real-time.

---

## Caveats & limitations

- **Not scientific.** All scores are qualitative ordinal estimates.
  No radiation physics, ET₀, or mesoclimate data is used.
- **Fixed latitude assumption.** Visualisations are illustrative for
  ~30–45° latitude in each hemisphere. Real solar geometry varies with
  date and exact latitude.
- **Canopy system effects are approximate.** VSP gets a "more exposed"
  modifier; sprawling and Geneva Double Curtain get more shade. Real
  canopy architecture is far more complex.
- **Slope corrections are simplified.** A basic azimuth offset is
  applied — not a proper hillshade algorithm.
- **Do not use for real vineyard decisions.** This tool exists to build
  intuition, not to drive irrigation, spray, harvest, or canopy
  management choices.

---

## Browser support

Chrome 90+, Firefox 88+, Safari 14+, Edge 90+. No polyfills, no ES modules,
no build tooling required.

---

## Accessibility

- ARIA roles and labels on all interactive controls
- Keyboard-navigable sliders and buttons
- High-contrast text on semi-transparent backgrounds
- Dismissible sticky warning banner

---

*Vineyard Sun Compass — built for exploration, not prescription.*
