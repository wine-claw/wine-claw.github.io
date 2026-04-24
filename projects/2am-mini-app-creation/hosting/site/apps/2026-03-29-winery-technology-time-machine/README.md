# Winery Technology Time Machine

An interactive historical browser / mini museum exploring ~3,000 years of winery production technology — from clay amphorae and foot-pressing to stainless tanks, optical sorting, and connected sensor systems.

## What it is

A self-contained, no-build-step HTML/CSS/JS mini-app built as an OpenClaw overnight mini-app project. Open it directly in any browser — no server, no dependencies beyond Google Fonts.

## Features

- **17 curated historical milestones** spanning Ancient → Medieval → Early Modern → Industrial → Modern → Contemporary eras
- **Category filter pills** — Harvest & Processing, Pressing & Extraction, Fermentation & Cellar Control, Storage & Ageing, Lab & Analysis
- **Era filter pills** — one for each historical period
- **Innovation intensity scrubber** — slider from 1–5 that shows only milestones at or above the chosen "step-change" threshold
- **Era vs Era comparison** — pick two eras, get a written narrative contrast with innovation averages
- **Artifact of the Moment** — random draw from the milestone pool, with a "another artifact" button
- **Theme map** — explains the five big arcs the timeline tracks
- **"Why it mattered" card sections** on every milestone
- **Follow-on links** — what each milestone led toward
- **Innovation dots** — visual 1–5 rating per milestone
- **Footer caveat** — explicitly states this is an educational interpretive timeline, not an exhaustive scholarly history
- **Fully responsive** — mobile-friendly layout

## How to open it

1. Navigate to `/Users/wineclaw/.openclaw/workspace/projects/2am-mini-app-creation/runs/2026-03-29/winery-technology-time-machine/`
2. Open `index.html` in any modern browser

Or from the run root directory, open:
```
runs/2026-03-29/winery-technology-time-machine/index.html
```

## Folder structure

```
runs/2026-03-29/
├── run-summary.md                         ← brief notes for main-agent handoff
└── winery-technology-time-machine/
    ├── README.md                         ← this file
    └── index.html                         ← the self-contained app
```

## Content categories

| Category | Description |
|---|---|
| Harvest & Processing | Intake, sorting, crushing, destemming |
| Pressing & Extraction | From feet to basket presses to pneumatic presses |
| Fermentation & Cellar Control | Yeast management, temperature, gas handling |
| Storage & Ageing | Amphorae, oak, bottles, stainless, closures |
| Lab & Analysis | Measurement, instrumentation, sensors |

## Caveat on completeness

This is an educational, interpretive overview — curated for interest and readability, not scholarly exhaustiveness. Many important regional variations, parallel innovations, and contested dates are omitted or simplified. Think museum exhibit label, not encyclopedia entry.

## Built with

- Pure HTML, CSS, JS — no build step
- Google Fonts: Georgia (serif headings), system sans-serif body
- Responsive CSS Grid and Flexbox
- No external JS libraries
