# 🍷 Winery Timewalk Atlas

**An interactive historical map of winemaking — explore how a single cellar transformed across four eras.**

> **⚠️ Disclaimer:** This is an experimental AI-generated mini-app. The historical details are illustrative and educational, not professionally researched. Do not rely on this content for real historical, winemaking, or commercial decisions.

---

## What It Is

A mobile-first, self-contained HTML/CSS/JS mini-app that lets you explore a stylised winery floor plan across four eras:

| Era | Name | What Changed |
|-----|------|-------------|
| **1890** | Steam Age | Foot-treading, wooden vats, cave cellars, oil lamps, no testing |
| **1935** | Depression Era | Mechanised crushing begins, concrete tanks, early lab tools, lean workforce |
| **1975** | Steel Revolution | Stainless steel, temperature control, pneumatic presses, gas chromatography |
| **2025** | Smart Vintage | IoT sensors, AI fermentation models, precision viticulture, blockchain provenance |

## Zones

The map covers **6 zones**, each with era-specific content:

1. **🍇 Crush Pad** — How grapes arrived and were processed
2. **🔥 Fermentation Hall** — Tanks, temperature, yeast management
3. **🪵 Barrel Caves** — Oak ageing, coopers, and cave conditions
4. **⚙️ Press Room** — From basket press to pneumatic membrane
5. **📦 Bottling & Dispatch** — Hand-fill to robotic line, cold chain
6. **📋 Cellarmaster's Office** — From quill diaries to AI co-pilot

## Features

- **Era switching** — tap era tabs to shift the whole floor plan
- **Zone detail panel** — tap any room for full historical description, labour stats, equipment lists, risk assessments, and "what changed here" notes
- **Compare Mode** — side-by-side stat comparison between two eras
- **Random artifact callouts** — ambient historical fragments appear periodically (or on double-tap)
- **Zone legend** — tap zones from the legend bar at the bottom
- **Era-specific SVG floor plan** — tanks, barrels, and hotspots change character with each era

## How to Use

Open `index.html` directly in any modern browser — no server, no build step.

```
open index.html
```

Works from `file://` URLs on mobile and desktop.

## File Structure

```
winery-timewalk-atlas/
├── index.html     # Main page, semantic markup, ARIA roles
├── styles.css     # Mobile-first, era theming, animations
├── app.js         # Full app logic, SVG rendering, state
└── README.md      # This file
```

## Browser Support

Tested on: Chrome 120+, Safari 17+, Firefox 121+

Requires: ES2020+ (modern JS), CSS Grid, CSS Custom Properties, SVG

## Design Notes

- **Font stack:** Georgia / Palatino Linotype — warm, editorial feel
- **Colour theming:** Each era has a distinct warm-to-cool palette (sepia → steel blue)
- **Accessibility:** ARIA roles, keyboard navigation on hotspots, `aria-live` on dynamic panels
- **SVG floor plan:** Pure SVG, no external images — fully self-contained

## Known Limitations

- Floor plan is stylised and illustrative, not a real architectural drawing
- Historical details are AI-generated approximations, not primary-source research
- Artifact callout timers may not fire if the page is backgrounded (browser throttling)
- No persistence (no localStorage) — state resets on reload

## Credits

Built with OpenClaw AI as an overnight mini-app experiment.
