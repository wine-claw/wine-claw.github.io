# Run Summary — 2026-04-16 — Phylloxera Journey

## Chosen mini-app
**Phylloxera Journey — The Great Vine Migration** — an interactive historical reconstruction mapping the spread of phylloxera from North America → Europe → Australia (1854–1910), showing how rootstock grafting saved the world's vineyards.

## Rationale
- Fresh archetype: **historical narrative + animated map timeline** (no recent runs used this pattern)
- Vineyard-oriented topic (phylloxera is fundamentally a vineyard pest)
- Directly aligned with Simon's interest in wine industry history
- Strong visual/interactive potential: animated spread map, pulsing infection dots, narrative cards
- Educational and shareable — tells one of wine's most dramatic stories
- Recent 7 runs: irrigation coach (calc), sun compass (explorer), waste studio (idea gen), scout sprint (workflow), fermentation drama (sim), vintage time machine (quiz), trade flow tracker (data viz) — this is clearly different

## What was built
- Single-page interactive app with canvas-based world map
- Timeline slider (1850–1920) with auto-play mode
- 18 historical events with accurate dates, locations, and descriptions
- Pulsing red infection dots, green recovery dots, amber quarantine dots, blue mild-impact dots
- Animated Bézier arc paths showing phylloxera spread routes
- Narrative cards styled as period documents (parchment background, serif fonts)
- Stats panel tracking infected regions, acres lost, recovery progress, wine output
- Event log that populates as timeline advances
- Rootstock Revolution explainer section with graft diagram (scion + rootstock)
- Atmospheric intro screen
- Mobile-first responsive design
- Warning banner

## Research done
- Wikipedia phylloxera article for lifecycle, spread dates, rootstock history
- Australian Food Timeline for Australian phylloxera dates (Geelong 1877, NSW 1884, QLD 1910, SA quarantine 1874)
- This Day in Wine History for detailed European/American timeline
- Wine Wiki by Wine with Seth for production figures (84.5M hL → 23.4M hL)

## Location
`runs/2026-04-16/phylloxera-journey/index.html`

## Delegation
- **mm-worker**: Full implementation (index.html — all HTML, CSS, JS, data, interactions, animations)
- **Main agent**: Concept selection, research, hero image generation, verification, packaging
- Estimated split: **mm-worker 85%, main agent 15%**

## Status
✅ Complete — working prototype with all features implemented
- Static verification: 17/17 checks passed
- Browser verification: not done overnight (unattended); needs daytime manual check

## Known issues / caveats
- Continent outlines are simplified bounding-box polygons (not detailed coastlines) — stylistically fine but geographically approximate
- Canvas click detection uses 15px radius — may be tight on small mobile screens (20px for touch)
- French wine output stats are simplified (only 4 data points)
- Hero image generated but not integrated into the app (available separately)

## Next steps
- Daytime manual visual check in browser
- Could enhance with more detailed continent outlines for visual richness
- Could add more events (Portugal, Germany, Switzerland, New Zealand, California's 2nd phylloxera crisis with AxR1)
- Could add zoom/pan for detailed regional exploration