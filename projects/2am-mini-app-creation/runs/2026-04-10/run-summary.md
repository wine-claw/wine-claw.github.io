# 2026-04-10 — Vineyard Sun Compass

## Chosen mini-app
**Vineyard Sun Compass** — a mobile-first visual explorer for row orientation, sun path, slope aspect, canopy structure, and qualitative fruit-zone heat/sunburn pressure.

## Why this was chosen
Tonight deliberately stayed on the **vineyard / viticulture** side of the rotation and also shifted archetype away from the recent cluster of planners, disease/risk trainers, and workflow helpers. This one is more of a **spatial visual explainer / mapping-style toy** with stronger art direction.

It was also chosen because a quick research pass turned up the right grounding for a qualitative explainer:
- row orientation changes cluster-zone light and temperature distribution
- north-south rows often make west-side clusters the rougher side in hot afternoons
- hot dry terroirs can make VSP fruit exposure too harsh when shade is removed too aggressively
- canopy architecture and selective shading can help moderate direct radiation

## Delegation note
- **`mm-worker` actually used:** yes
- **What it handled:** first-pass concept implementation attempt and initial app scaffold
- **What the main agent handled directly:** additional research synthesis, generated hero artwork, final implementation completion, debugging, verification, packaging, publishing, and durable state updates
- **Estimated delivered-work split:** ~25% worker / 75% main agent

## What was built
Inside `runs/2026-04-10/vineyard-sun-compass/`:
- `index.html`
- `styles.css`
- `app.js`
- `README.md`
- `assets/hero.png`

### Implemented features
- interactive row-orientation, hemisphere, slope, aspect, canopy, density, heatwave, and time-of-day controls
- animated canvas scene showing sun path, block orientation, slope feel, and hot-side emphasis
- day-strip showing how the hot side shifts through six points in the day
- five vineyard-flavoured presets
- plain-English interpretation cards and practical coaching text
- experimental warning banner and footer disclaimer
- local static assets only, no network calls, no build step

## Current status
First-pass app complete, but packaging is only **partially complete** because the public gallery/stable-latest pointers were still stale at the final unattended check.

## Verification
- `node --check app.js` passed
- folder checked for local-only assets
- hosted direct app path responds successfully
- FTP-side gallery/latest files were updated directly after the initial publish lag, but the public gallery/stable-latest URLs still served stale older content when rechecked
- not yet tested on a physical phone, so this is **good unattended verification**, not full field validation

## Caveats
- qualitative educational toy only
- no real solar or climate model
- does not know cultivar, row spacing, wire height, acclimation, or actual local weather
- should not be used for real viticulture decisions
- direct hosted app URL works, but public gallery/stable-latest propagation remained stale at the final overnight check

## Promotion potential
Good candidate for promotion if Simon likes the direction. Natural next upgrades: real sun-position maths by latitude/date, cultivar presets, berry-side exposure history, and links to canopy-management strategies for warm regions.
