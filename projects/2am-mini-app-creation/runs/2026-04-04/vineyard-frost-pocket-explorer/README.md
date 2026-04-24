# Vineyard Frost Pocket Explorer

**A mobile-first educational tool for visualising cold-air drainage and frost risk across simplified vineyard topography.**

---

## What it is

The Frost Pocket Explorer is a static, standalone web app (HTML/CSS/JS, no build step) that lets users interactively explore how terrain shape, frost event type, vine phenology, ground cover, and active protection options combine to affect frost risk across a vineyard block.

It renders a simplified cross-section of a vineyard block with 5 zones, colour-coded by relative frost risk, with animated cold-air pooling and drainage arrows. It gives a plain-English interpretation of the highest-risk zone and produces ranked practical actions split into passive/site management and active protection categories.

---

## What works

- **5 terrain presets** covering the main vineyard landform types (ridge shoulder, open mid-slope, shallow bowl, valley floor, blocked drainage outlet)
- **3 frost event types**: radiation frost, mixed frost/freeze, advective freeze — each with distinct risk behaviour
- **5 bud stages** from dormant to flowering with sensitivity ratings
- **3 ground cover conditions** (bare, mown, tall) affecting emissivity
- **3 inversion strengths** (shown for radiation/mixed events) — affects cold-air pooling depth
- **4 active protection options** (none, wind machine, sprinkler, both)
- **6 demo presets** for instant scenarios
- **Animated SVG terrain** with zone risk overlays, cold-air pool gradients, and directional drainage arrows
- **Plain-English interpretation** of the highest-risk zone
- **Mechanism panel** explaining the physics
- **Ranked action lists** for passive and active protection, with honest caveats about advective events
- **Experimental warning banner** and footer disclaimer
- **Mobile-first layout**, responsive, touch-friendly chip controls
- **Fully self-contained** — no CDN dependencies except Google Fonts

---

## What is illustrative / not scientifically calibrated

This app is **qualitative and educational, not a scientific model**:

- The risk scores are relative (0–1) and are not calibrated against real temperature data
- The SVG terrain is a stylised cross-section, not a GIS-derived slope profile
- Cold-air pooling depth and drainage arrows are qualitative animations to communicate the concept, not model outputs
- Bud stage sensitivity values are typical ranges, not variety-specific data
- Protection effectiveness values are indicative estimates from general viticulture literature, not measured on-farm data
- The inversion strength multiplier is illustrative

**Do not use this app for real vineyard management decisions.** It is an awareness and education tool only.

---

## File structure

```
vineyard-frost-pocket-explorer/
├── index.html    — main document
├── styles.css    — all styles (CSS custom properties, animations)
├── app.js        — state, risk engine, SVG renderer, action generator
└── README.md     — this file
```

---

## How to run

Open `index.html` directly in any modern browser. No server required.

---

## Next-step ideas for expansion

1. **Real weather data integration** — wire in forecast min temp and sky condition (clear/cloudy) from a weather API to contextualise the risk output
2. **Variety-specific sensitivity** — replace generic bud stages with variety-tiered data (e.g. Chardonnay vs Cabernet Franc frost tolerance)
3. **Historical frost event archive** — allow users to select a past event (e.g. "Oct 2022 radiation frost") and see the app's output for that date's conditions
4. **Zone editor** — let users draw or adjust the terrain profile instead of picking from presets
5. **Print/export summary** — a one-page PDF summary of the scenario and top actions for vineyard staff
6. **Slope aspect toggle** — north vs south vs east vs west-facing slopes affect morning sun exposure and frost duration
7. **Canopy management note** — side-of-canopy trimming (as Simon's AWRI context suggests) could be a useful add-on tip for managing frost risk through canopy structure
8. **Stakeholder toggle** — show/hide the technical mechanism panel for a more casual user

---

## Credits

Built as an experimental mini-app by the OpenClaw agent workflow. Research cues provided by main agent.
