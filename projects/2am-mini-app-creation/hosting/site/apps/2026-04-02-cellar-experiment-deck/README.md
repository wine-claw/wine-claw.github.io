# Cellar Experiment Deck

**Category:** Playful idea generator / experiment planner
**Run date:** 2026-04-02
**Status:** Complete first pass — static files only, no build step required

---

## What is this?

A mobile-first static mini-app that generates plausible small-scale winery/cellar experiment concepts by combining cards across seven dimensions:

| Card Type | Description |
|-----------|-------------|
| **Goal** | What you're trying to improve or understand |
| **Process Area** | Which part of the production flow is targeted |
| **Intervention** | What specific action or tweak to trial |
| **What to Measure** | How to evaluate the outcome |
| **Risk / Watchout** | What could go wrong or skew results |
| **Effort** | How much work the trial involves (1–3) |
| **Likely Payoff** | How valuable the result could be (1–3) |

After generating, the app assembles a plain-English experiment brief, explains why the measurement matters, and flags honest caveats.

---

## Files

- `index.html` — App structure
- `styles.css` — Dark, polished mobile-first styles
- `app.js` — All logic, card pools, presets, localStorage
- `README.md` — This file

---

## Card Pool Sizes

| Pool | Count |
|------|-------|
| Objectives | 25 |
| Process Areas | 20 |
| Interventions | 35 |
| Measurements | 18 |
| Risks / Watchouts | 20 |
| Effort | 3 |
| Payoff | 3 |

Total: **124+ card entries** ensuring varied outputs.

---

## Presets (8)

| Preset | Focus |
|--------|-------|
| 💨 Low-cost O₂ Test | Inert gas use during racking, minimal cost |
| 🫧 Lees Contact | Extended lees contact trial for white wines |
| 🪵 Oak Alternatives | Compare chips vs staves vs barrel |
| 🍾 Bottle DO Trial | Dissolved oxygen targeting at bottling |
| ❄️ Cold Stab Optimise | Tartaric stabiliser vs temperature tweak |
| 🧪 Nutrient Regime | DAP vs organic nitrogen, stall prevention |
| 🌿 Green CIP | Water/energy savings in cleaning |
| ⚗️ Fining Comparison | Bentonite vs casein vs milk fining |

---

## Filters

- 💰 Low Cost · ⚡ Quick Trial · 📊 Analytical · 🌿 Sustainable
- 📦 Packaging · 🧫 Fermentation · 🍾 White Wine · 🍷 Red Wine · 🦠 MLF Focus

---

## Features

- **Re-roll individual cards** — tap the spin icon on any card
- **Lock cards** — pin a card so it isn't changed on re-roll
- **Filters** — narrow interventions to specific categories
- **Presets** — curated starting points with locked-in card selections
- **Experiment brief** — assembled plain-English summary with measurement rationale and caveats
- **Copy brief** — copies the full brief to clipboard
- **Save ideas** — stored in `localStorage`, accessible via the heart icon
- **Experimental warning banner** — clearly states this is an untested AI-generated tool

---

## Caveats

- All content is winery-relevant but AI-generated — not a validated scientific tool
- Do not use for production decisions without professional review
- Locked cards can produce invalid combinations (e.g. white-wine preset + red-wine filter); use judgment
- Designed for learning and brainstorming, not regulatory compliance

---

## To Use

Open `index.html` directly in any modern browser. No server, no build step, no dependencies.
