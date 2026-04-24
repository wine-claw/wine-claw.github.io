# Run Summary — 2026-04-25

## Chosen mini-app
**Soil Water Infiltration Simulator**

**Type:** Interactive physics simulation / sandbox  
**Status:** ✅ Complete & ready to publish

## Why this concept
- Rotates away from card-grid explorers (Apr 24 = Fermentation Atlas) and dark ops helpers (Apr 22 = O₂ Risk Map)
- Brings soil science / hydrology / vineyard irrigation into the rotation — directly relevant to viticulture
- Archetype shift to visual simulation sandbox with real-time canvas animation
- Strong educational value: helps understand why sandy soils drain fast and clay soils pond/runoff
- Uses real USDA-style soil parameters (porosity, field capacity, wilting point, Ks, suction head)

## What was built
Single-file interactive simulator showing how rainfall penetrates different soil types using a simplified Green-Ampt / piston-flow model:
- 5 soil types (Sand, Loam, Clay, Sandy Loam, Clay Loam) with realistic hydraulic parameters
- Rainfall intensity slider (1–100 mm/h)
- Animated canvas cross-section: raindrops, wetting front, saturated zone, field capacity zone, surface ponding, depth markers
- Real-time stats: elapsed time, wetting front depth, infiltrated volume, runoff volume
- Start / Pause / Reset controls
- Expandable "How it works" section explaining Green-Ampt concepts
- Responsive layout (side-by-side desktop, stacked mobile)
- Warning banner included

## Design choices
- Warm earthy palette (cream, sand, soil browns, water blues)
- Canvas-based animation via requestAnimationFrame
- Soil texture grain patterns unique to each soil type
- Wavy surface ponding animation

## Verification
- File inspected: 885 lines, ~25 KB, zero external dependencies
- Local static review passed
- **Browser verification:** blocked by policy (no user-browser attach flows in overnight run)

## Delegation
- **worker1 (K2.6):** 75% — full HTML/CSS/JS implementation, simulation physics, canvas rendering, responsive layout
- **Main agent:** 25% — concept selection, research, brief review, packaging, state updates, publish orchestration

## Files
- App: `apps/2026-04-25-soil-infiltration-sim/index.html`
- Run notes: `runs/2026-04-25/summary.md`
