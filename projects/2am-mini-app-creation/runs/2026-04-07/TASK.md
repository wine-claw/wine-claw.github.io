# 2am Mini-App Build — 2026-04-07

## Concept: Tank Cooling Load Estimator

**What:** A mobile-first interactive calculator that helps wineries estimate cooling demand and pull-down time for wine tanks, comparing bare vs insulated scenarios.

**Why this concept:**
- Chemical engineering core (heat transfer, thermal mass, insulation Payback)
- Directly useful to wineries — shared easily with industry
- Strong visual/demo potential (animated temperature curves, insulation comparison)
- Portfolio variety: last 6 nights were (cellar cascade, experiment deck, timewalk atlas, frost pocket explorer, mildew playbook) — this is the first engineering calculator in a while
- From mission-advancement-ideas priority list (#2: Tank Insulation / Cooling Load Estimator)

**Target users:** Winery process engineers, cellar hands, vineyard/winery operators

**Core features (MVP):**
1. Input: tank volume (L), must temperature (°C), target temperature (°C), ambient air temp (°C), tank surface area (auto-calc from volume), initial cooling method ( glycol / cold water / dry ice)
2. Output: heat load (W), pull-down time (hours), insulation comparison (bare vs insulated panel R-value)
3. Animated temperature decay curve as the must cools
4. Simple payback calculator: insulation cost vs energy savings over vintage
5. Mobile-first, single page, no external dependencies

**Visual direction:**
- Clean engineering-tool aesthetic, not fancy marketing
- Warm wine-industry colours (deep burgundy accent on cream/off-white)
- Clear data viz: temperature curves, bar comparisons
- Use a simple tank diagram SVG inline
- Warning banner: "Experimental OpenClaw AI mini-app — not professionally validated"

**Tech:** Single HTML file with inline CSS and JS. No build step. Works offline. Mobile-responsive.

**Save output to:** `/Users/wineclaw/.openclaw/workspace/projects/2am-mini-app-creation/runs/2026-04-07/tank-cooling-calculator/index.html`

## Instructions

1. Build the full HTML/CSS/JS mini-app as described above
2. Use inline SVG for the tank illustration (no external images needed)
3. Include the experimental warning banner
4. Make it genuinely mobile-first (works great on phone, usable on desktop)
5. Add clear comments in the code explaining the heat transfer calculations
6. Do NOT use external fonts, CDNs, or dependencies — everything inline
7. After building, verify the file exists and is valid HTML
8. Report back to the main agent with: (a) success/failure, (b) what you built, (c) any issues encountered

## Context for this build

- This is a 2am autonomous build for Simon (wine industry chemical engineer)
- He's asleep — proceed without waiting for input
- Use your coding/reasoning skills fully for this task
- If you need to make assumptions, make sensible ones and document them briefly in the app
- The goal is a genuinely useful, shareable tool that looks professional and works on phone