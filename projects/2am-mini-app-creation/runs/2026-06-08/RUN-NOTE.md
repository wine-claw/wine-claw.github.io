# Canopy Sculptor — Run Note 2026-06-08

## Concept
Interactive vineyard canopy management simulator. Cross-section view of a vine canopy where adjusting structure parameters (shoot density, leaf layers, vine spacing, row orientation, sun angle, wind speed) and growth stage produces immediate visual feedback: animated sunlight penetrating through leaves, airflow particles, and live metrics.

## Why chosen
- **Domain rotation:** 7 days since last viticulture app (Rainfall Symphony on June 6 is wine-region themed but data-art, not interactive viticulture tool)
- **Archetype rotation:** Design/build tool with real-time visual feedback — different from recent sandbox, race, explorer, and data-art patterns
- **Practical relevance:** Canopy management is one of the most important vineyard operations. This is a tactile "sculpting" tool that demonstrates why it matters
- **Interestingness:** Users adjust sliders and immediately see consequences — sunlight rays dim, airflow particles reduce, disease risk climbs

## Recent app history (last 7)
1. 2026-06-07: Fermentation Race (food science / microbiology competitive simulation)
2. 2026-06-06: Rainfall Symphony (data art / generative music)
3. 2026-06-05: Mycorrhizal Network Explorer (ecology / fungal networks)
4. 2026-06-04: Mechanical Curiosity Shop (history of engineering)
5. 2026-06-03: Biomorph Breeder (generative art / evolution)
6. 2026-06-02: Orbital Playground (physics sandbox)
7. 2026-06-01: Circuit Sandbox (electronics lab)

## What it does
- **Canopy Structure sliders:** Shoot density (4-30 shoots/m), Leaf layers (1-8), Vine spacing (1-4m)
- **Light & Air sliders:** Row orientation (N-S to E-W), Sun angle (15-75°), Wind speed (0-40 km/h)
- **Growth stages:** Bud Break → Flowering → Fruit Set → Veraison → Pre-Harvest, each with different leaf density and fruit size
- **Animate Season button:** Auto-cycles through growth stages smoothly
- **Live metrics:** Leaf Area Index (with color-coded warning), Fruit Zone PAR %, Airflow rating, Disease Risk — all update in real time
- **Canvas visualization:** Animated sun, sunlight rays that penetrate canopy based on density, swaying leaves, fruit clusters that grow through stages, airflow particles that are blocked by dense canopy, tooltips on hover for educational context
- **Responsive:** Sidebar + canvas layout on desktop, stacked on mobile

## Technical details
- Single-file HTML/CSS/JS, ~27 KB
- Canvas 2D rendering with DPR scaling
- Seeded random for consistent leaf/fruit positions
- Real-time animation loop for subtle swaying effects
- Season interpolation for smooth animation

## Verification
- ✅ File exists: `runs/2026-06-08/canopy-sculptor/index.html`
- ✅ Size: 27,289 bytes (>5KB threshold)
- ✅ Disclaimer present: exact text found once
- ✅ Robots meta present: `noindex, nofollow, noarchive, nosnippet, noimageindex, notranslate`
- ✅ Hosted URL live: https://wine-claw.github.io/app-gallery/apps/2026-06-08-canopy-sculptor/
- ✅ Pipeline check passed
- ✅ state.json updated
- ✅ latest-summary.md updated

## Work split
- Main agent: 100%
- worker1: 0% (not attempted — continues to be unreliable in cron sessions)
- worker2: 0%

## Blockers
None. Clean run.

## Links
- **App:** https://wine-claw.github.io/app-gallery/apps/2026-06-08-canopy-sculptor/
- **Gallery:** https://wine-claw.github.io/app-gallery/
- **Latest:** https://wine-claw.github.io/app-gallery/latest/

## Post-run fix (2026-06-08)
Mobile-first layout rewritten from starter template. Desktop-first CSS archived. Disclaimer restored to "This app was made by AI."
