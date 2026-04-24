# Run Summary — 2026-04-20 — Tank Chill Calculator

## Chosen mini-app
**Tank Chill Calculator** — an interactive winery tank cooling load estimator and insulation comparison tool. A practical engineering calculator that computes fermentation heat, ambient heat gain (bare vs insulated), total cooling demand, pull-down time, and insulation payback period.

## Rationale
- Fills the **engineering calculator/estimator** archetype, which hasn't appeared in the last 7 runs (recent: visual explainer, game, historical mapping, decision aid, data viz, quiz, simulation)
- Directly from the mission-advancement-ideas pool (#2: Tank Insulation / Cooling Load Estimator)
- Strong chemical-engineering angle with real winery value — aligns with Simon's background
- Winery-adjacent (not pure cellar) — balances the recent vineyard-heavy run cluster
- Practical decision-support tool with clear shareability in the wine industry

## Archetype
Engineering calculator / estimator — deliberately different from the recent visual/game/historical cluster

## What works
- All 6 calculation modules: tank geometry, fermentation heat, heat gain comparison, cooling demand summary, pull-down time, insulation payback
- Animated SVG tank cross-section with pulsing heat flow arrows, insulation thickness selector, and wine colour temperature indicator
- Real-time updates on all inputs
- Dark engineering theme with warm amber (heat) and cool cyan (cooling) accent colours
- Mobile-first responsive layout
- localStorage persistence of inputs
- Warning banner present
- Correct physics: sugar→heat conversion, realistic U-values, proper unit handling

## What was fixed post-worker
- Wine mass calculation bug: was `volumeM3 * WINE_DENSITY * 1000` (×1000 too much), now `volumeM3 * WINE_DENSITY`
- Pull-down time was showing "—" because energy was inflated by same bug, making hours > 999 threshold
- Pull-down time threshold raised from 999 to 99999 to handle larger but valid scenarios
- Peak fermentation kW calculation corrected: was dividing by `peakDay` (day number) instead of 24 (hours)

## Verification
- Playwright screenshots taken (mobile + desktop)
- All key values verified correct with manual calculation:
  - 50 kL tank → 49.5 t wine
  - 22 Brix → 220 g/L sugar → 11,000 kg total → 6,160 MJ total ferment heat
  - Peak day ≈ 28.5 kW
  - Bare tank heat gain ≈ 6.5 kW at ΔT=10°C
  - Total cooling ≈ 35.0 kW (10.0 RT)
  - Pull-down ≈ 42.9 hrs with 20 kW chiller
  - Insulation payback ≈ 0.2 years

## Files
- `/Users/wineclaw/.openclaw/workspace/projects/2am-mini-app-creation/runs/2026-04-20/tank-chill-calc/index.html` — main app (670 lines)
- `/Users/wineclaw/.openclaw/workspace/projects/2am-mini-app-creation/runs/2026-04-20/tank-chill-calc/README.md` — documentation
- `/Users/wineclaw/.openclaw/workspace/projects/2am-mini-app-creation/runs/2026-04-20/tank-chill-calc/screenshot-mobile-v2.png` — verification screenshot
- `/Users/wineclaw/.openclaw/workspace/projects/2am-mini-app-creation/runs/2026-04-20/tank-chill-calc/screenshot-desktop.png` — desktop screenshot

## Delegation
- **worker2**: Built the full initial app (670 lines HTML/CSS/JS) including all calculation logic, SVG visual, dark theme, responsive layout, and localStorage
- **main agent**: Concept selection, domain research (AWRI, evroprom, spray foam references), bug fixes (3 calculation corrections), verification via Playwright screenshots, packaging, and summary
- Estimated split: **30% main / 70% worker2 / 0% worker1**

## Next steps
- Could promote to its own project for further development
- Potential enhancements: multiple tank comparison, fermentation curve timeline, cooling jacket flow rate estimator, Australian climate presets, export results as PDF