# Build Brief: Global Wine Trade Flow Tracker

## Concept
An interactive, mobile-first visualization of global wine trade flows. Users can explore which countries export and import wine, see the major trade routes by value, compare exporters vs importers, and discover surprising trade patterns.

## Archetype
**Data art / mapping / spatial explorer** — deliberately different from recent runs (calculator, visual explainer, idea generator, game, simulation, archive browser).

## Design Direction
- Dark theme with warm amber (#C8963E) and deep wine purple (#5C1A3E) accents
- Hero background: `hero.png` (provided in same directory) — a stylized world map with glowing wine trade arcs
- Font: use a clean sans-serif (Inter or system)
- Mobile-first, responsive
- Animated flow arcs on an SVG world map (simplified continent outlines)
- Card-based detail panels when tapping/clicking a country
- Smooth transitions and subtle particle/glow effects

## Core Features

### 1. Interactive World Map
- Simplified SVG world map with clickable countries
- Countries colored by export value (choropleth) with a gradient legend
- Animated arc lines showing top trade flows (exporter → importer) with thickness proportional to trade value
- Toggle between **Export view**, **Import view**, and **Trade surplus/deficit view**
- Hover/tap a country to see its trade profile

### 2. Country Detail Panel
- When a country is selected, a slide-up panel shows:
  - Total export value, total import value, net trade balance
  - Top 5 export destinations with values
  - Top 5 import sources with values
  - YoY change indicator (↑/↓ with percentage)
  - A mini bar chart of export/import trends

### 3. Trade Flow Explorer
- A secondary view showing the top 20 bilateral wine trade flows as a sortable table
- Columns: Exporter → Importer, Value, % of global trade, YoY change
- Search/filter by country name
- Click a flow to highlight it on the map

### 4. Australian Wine Focus
- Special "Australia" quick-access button that highlights Australia's trade flows
- Shows Australia's top export markets with values
- Shows the China tariff impact story (2020-2024 recovery)
- Key stat cards: A$2.34B total exports, top 5 markets

### 5. Key Insights Carousel
- Auto-rotating insight cards at the top:
  - "France exports more wine than the next 3 countries combined"
  - "Australia's exports jumped 29.6% in 2024 after China tariff removal"
  - "The US imports $7.1B of wine — the world's biggest buyer"
  - "China's wine imports surged 37.2% in 2024"
  - "Old World wines (France+Italy+Spain) = 63% of global exports"

## Data (embedded)

### Top 20 Exporters (2024, US$ billions)
| Country | Exports (US$B) | Share | YoY Change |
|---------|---------------|-------|------------|
| France | 12.66 | 32.5% | -2.3% |
| Italy | 8.81 | 22.6% | +4.8% |
| Spain | 3.16 | 8.1% | -0.5% |
| Australia | 1.80 | 4.6% | +29.6% |
| Chile | 1.62 | 4.2% | +6.2% |
| United States | 1.25 | 3.2% | +2.1% |
| New Zealand | 1.22 | 3.1% | -5.6% |
| Germany | 1.11 | 2.8% | -4.4% |
| Portugal | 1.05 | 2.7% | +4.2% |
| Argentina | 0.68 | 1.7% | +4.5% |
| South Africa | 0.65 | 1.7% | +4.5% |
| Belgium | 0.62 | 1.6% | -0.8% |
| Singapore | 0.52 | 1.3% | -15% |
| Netherlands | 0.50 | 1.3% | -8.4% |
| United Kingdom | 0.49 | 1.3% | -21.3% |
| Georgia | 0.27 | 0.7% | +6.3% |
| Austria | 0.27 | 0.7% | -7.1% |
| Hong Kong | 0.24 | 0.6% | -34.3% |
| Denmark | 0.24 | 0.6% | -12.6% |
| Hungary | 0.17 | 0.4% | +22.7% |

### Top 20 Importers (2024, US$ billions)
| Country | Imports (US$B) | Share | YoY Change |
|---------|---------------|-------|------------|
| United States | 7.11 | 18.2% | +1.6% |
| United Kingdom | 5.00 | 12.8% | -1% |
| Germany | 2.67 | 6.8% | -8.8% |
| Canada | 2.00 | 5.1% | +0.3% |
| Japan | 1.65 | 4.2% | -8% |
| mainland China | 1.59 | 4.1% | +37.2% |
| Netherlands | 1.55 | 4.0% | -3.6% |
| Switzerland | 1.28 | 3.3% | -7.1% |
| Belgium | 1.26 | 3.2% | -1.9% |
| France | 0.99 | 2.5% | -7.3% |
| Hong Kong | 0.83 | 2.1% | -14.5% |
| Sweden | 0.82 | 2.1% | +1.1% |
| Russia | 0.82 | 2.1% | -7.4% |
| Denmark | 0.79 | 2% | +0.1% |
| Singapore | 0.70 | 1.8% | -28.2% |
| Italy | 0.64 | 1.6% | +3.3% |
| Australia | 0.61 | 1.6% | -6.4% |
| Brazil | 0.52 | 1.3% | +12% |
| Norway | 0.50 | 1.3% | -5% |
| South Korea | 0.46 | 1.2% | -8.7% |

### Top Bilateral Trade Flows (estimated from export data)
Major estimated flows (exporter → importer, approximate US$ billions):
- France → USA: ~4.5
- Italy → USA: ~2.0
- France → UK: ~2.5
- Italy → UK: ~1.5
- Spain → UK: ~1.0
- France → Germany: ~1.5
- Italy → Germany: ~1.2
- Australia → China: ~0.76 (A$1.2B equivalent ~US$0.76B at 2024 rates)
- France → China: ~1.0
- Chile → USA: ~0.8
- New Zealand → USA: ~0.6
- Australia → UK: ~0.35
- Australia → USA: ~0.30
- Italy → Canada: ~0.5
- France → Canada: ~0.4
- France → Japan: ~0.7
- Italy → Japan: ~0.4
- Spain → Germany: ~0.6
- Portugal → USA: ~0.3
- South Africa → UK: ~0.3

### Australian Wine Export Data (2025, A$)
- Total exports: A$2.34B (down 8%), 613M litres (down 6%)
- Top 5 by value: China A$755M, UK A$343M, US A$287M, Canada A$175M, Singapore A$118M
- Avg value: A$3.81/L FOB
- Notable: white wine to China grew 77% by volume; Canada up 12%; Singapore up 18%

### Key Insights for Carousel
1. "France exports more wine by value than the next 3 countries combined — US$12.7B in 2024"
2. "Australia's wine exports surged 29.6% in 2024 after China tariff removal"
3. "The US is the world's biggest wine importer at US$7.1B"
4. "China's wine imports jumped 37.2% in 2024 — fastest growing major market"
5. "Old World (France+Italy+Spain) = 63% of all wine exports by value"
6. "Global wine trade: US$39B exports in 2024, barely changed from 2023"
7. "Singapore and Hong Kong are re-export hubs — they import more than they drink"

## Technical Requirements
- Single-page static HTML/CSS/JS app (no build step)
- All data embedded in JS
- SVG-based simplified world map (can be a simplified path set for ~40 key countries)
- CSS animations for flow arcs (dash-offset animation)
- Mobile-first, touch-friendly (tap countries, swipe carousel)
- Dismissable experimental/AI warning banner at top
- prefers-reduced-motion support
- Dark theme with warm wine accents

## File Structure
- `index.html` — entry point
- `style.css` — all styles
- `app.js` — all logic and data
- `hero.png` — already provided in directory

## Accessibility
- ARIA labels on interactive map regions
- Keyboard navigable
- Color-blind safe palette (avoid red-green only distinctions; use amber/blue contrast)

## Quality Bar
- Polished, professional look — not a wireframe
- Animated trade arcs should feel alive
- Country detail panel should feel satisfying to interact with
- The whole thing should make Simon go "oh, that's cool" — data art with substance

## Warning Banner
Include the standard experimental AI mini-app banner:
"⚠️ Experimental OpenClaw AI mini-app. Untested, not professionally validated. Do not rely on this for any decisions."