# 2026-04-09 Overnight Run — Vineyard Irrigation Bucket Coach

## Chosen mini-app
**Vineyard Irrigation Bucket Coach** — a mobile-first irrigation-planning mini-app that visualises the root-zone water bucket using ETc, soil available water capacity, root depth, MAD, current fill, and irrigation efficiency.

## Why this was chosen
The recent run cluster included workflow board, systems simulation, experiment deck, historical atlas, frost explorer, mildew playbook, and oxygen risk map. Tonight deliberately rotates back toward **viticulture** with a more practical **water-balance planner / reservoir explainer** shape.

It also fits the instruction to do more real research before building. The concept was anchored around standard irrigation ideas rather than pure invention:
- FAO crop coefficient framing: ETc = Kc × ETo
- Root-zone water available between field capacity and wilting point
- Total available water scaling with AWC × effective root depth
- MAD as the manager-chosen depletion trigger before refill

## Category / pattern
**Practical water-balance planner / soil reservoir visual explainer**

## Delegation note
- **`mm-worker` actually used:** yes, but not productively enough to deliver the files in time for the unattended overnight window
- **What it handled:** first-pass concept execution attempt
- **What the main agent handled directly:** research synthesis, final app implementation, packaging, verification, publishing, durable state updates
- **Estimated delivered-work split:** ~15% worker / 85% main agent

## What was built
Inside `runs/2026-04-09/vineyard-irrigation-bucket-coach/`:
- `index.html`
- `styles.css`
- `app.js`
- `README.md`

### Implemented features
- ✅ Vineyard stage presets with editable Kc
- ✅ Soil texture presets with editable AWC
- ✅ Controls for ETo, root depth, MAD, starting fill, irrigation efficiency, planned irrigation amount, and event day
- ✅ Root-zone bucket visual with current fill and MAD trigger line
- ✅ 7-day depletion strip and curve
- ✅ Gross refill estimate adjusted for irrigation efficiency
- ✅ Plain-English scenario summary
- ✅ Warm daylight vineyard visual direction, distinct from recent dark cellar apps
- ✅ Experimental warning banner and footer disclaimer
- ✅ No build step, no external dependencies, no network calls

## Verification
- Static file presence confirmed
- JavaScript syntax checked with Node
- No external asset references in the app files
- Partial verification only: not manually exercised in a browser during the unattended run

## Caveats
- Simplified educational model only
- No rainfall or real weather feed
- No soil probe integration, variety-specific calibration, or local validation
- Kc and AWC values are indicative defaults, not site-specific recommendations

## Paths
Local app folder:
`/Users/wineclaw/.openclaw/workspace/projects/2am-mini-app-creation/runs/2026-04-09/vineyard-irrigation-bucket-coach/`

Local entry file:
`/Users/wineclaw/.openclaw/workspace/projects/2am-mini-app-creation/runs/2026-04-09/vineyard-irrigation-bucket-coach/index.html`

## Promotion potential
Good candidate for promotion if Simon likes the framing. Natural next steps: rainfall and weather integration, block notes, deficit-irrigation strategy presets, probe-data import, and a printable irrigation worksheet.
