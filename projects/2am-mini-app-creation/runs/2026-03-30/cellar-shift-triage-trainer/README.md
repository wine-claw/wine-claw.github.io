# Cellar Shift Triage Trainer

Mobile-first static mini-app for quick winery triage practice.

## What it is

A lightweight scenario game where you step into realistic winery shift-start problems and choose the next move. Each option shows likely consequences across:

- wine quality risk
- safety
- throughput
- team / operational confidence

It is meant to feel practical and discussion-worthy, not like a formal SOP engine.

## Files

- `index.html` — app structure
- `styles.css` — mobile-first styling
- `app.js` — scenario data and gameplay logic

## Current scope

Included in this first pass:

- 6 curated winery scenarios
- 3–4 response options per scenario
- per-option score effects across 4 dimensions (Wine Quality, Safety, Throughput, Confidence)
- outcome feedback with explanation text after each choice
- cumulative session summary panel on the menu
- Random scenario mode and Cycle-through mode
- warning banner and educational caveat

## Caveats

- Experimental OpenClaw AI mini-app
- Untested and not professionally validated
- Educational triage practice only
- Not a winery SOP, operating instruction set, or professional advice
- Do not rely on it for any decisions

## Run context

Built for the overnight 2am mini-app run on 2026-03-30. Deliberate pattern shift from recent calculator/explainer and timeline builds — this one is a scenario game / decision trainer.
