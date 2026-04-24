# Wine Input Cost Index

An interactive, mobile-first dashboard for exploring how the major input costs for Australian wine production have changed from 2015–2025.

## What It Does

- **Cost Composition Donut** — shows the % breakdown of total production cost across 9 categories (grapes, water, energy, labour, chemicals, packaging, transport, oak/barrels, equipment). Tap any segment or legend item for a detailed deep-dive card.
- **Index Trend Chart** — plots each category's cost index over time (base = 100 in 2019). Toggle between absolute index and year-over-year % change. Select which categories to display via filter chips.
- **Composite Cost Index** — a weighted average of all inputs for the selected wine style scenario.
- **Key Events Timeline** — annotated timeline of major industry events (bushfires, COVID, energy crisis, floods, grape oversupply crash).
- **Scenario Toggle** — switch between *Barossa Shiraz*, *Margaret River Chardonnay*, and *Budget Bulk* to see how the cost structure changes by wine style.

## Data

All data is embedded as JavaScript objects. Numbers are researched approximations based on:
- Wine Australia annual reports and benchmarking data
- Australian Bureau of Statistics producer price indexes
- Known trends: 2020 Black Summer bushfires, 2021–2023 global energy crisis, 2022–23 La Niña floods, 2020–2021 China tariff collapse, 2024 grape oversupply crash

**Base year:** 2019 = 100. All indices are relative to that.

## Technical

- Single `index.html` file — all CSS and JS inline.
- **Chart.js** loaded via CDN for the donut and line chart.
- **Google Fonts** (Playfair Display + Inter) via CDN.
- `localStorage` persists user preferences (selected categories, scenario, chart mode).
- Dark, wine-themed colour palette (deep burgundy, gold, cream on near-black).
- Fully responsive — optimised for mobile but looks good on desktop.

## Usage

Open `index.html` in any modern browser. No server required.

```bash
# Quick local serve (optional)
python3 -m http.server 8080
# Then open http://localhost:8080
```

## File Structure

```
wine-input-cost-index/
├── index.html   # The complete app
└── README.md    # This file
```