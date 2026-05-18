# 2026-05-19 Canopy Architect

**Slug:** canopy-architect
**Archetype:** Agricultural simulation / management sandbox
**Domain:** Viticulture / agriculture

## What was built
**Canopy Architect** — an interactive grapevine canopy management simulator.

Grow a vine through a full season (210 days) by adjusting:
- ✂️ **Bud count** (winter pruning decision)
- 📐 **Training system** (VSP, Sprawl, or Pergola)
- 🌱 **Shoot thinning** percentage
- 🍃 **Leaf pulling** (fruit zone leaf removal)
- 📏 **Hedging height** (canopy topping)

Watch the vine grow day by day on a 2D canvas with seasonal sky changes, shoot emergence, leaf development, and fruit maturation. See how canopy decisions affect:
- Light interception (PAR%)
- Yield per vine
- Fruit sugar (°Brix)
- Titratable acidity
- Botrytis disease risk
- Phenolic development
- Vine vigor
- Crop balance (leaf:fruit ratio)

At harvest (Day 210), receive a grade (A–D) based on sugar, acid, disease avoidance, phenolics, and vine balance.

## Why this app
- **Domain rotation:** First viticulture/agriculture app in 8+ runs. Recent run was heavy on physics/engineering (PID Playground, Photon Sailor) and puzzle/creative (Locksmith, Music Box). Time to return to Simon's wine/vineyard domain.
- **Archetype rotation:** Last several apps were physics sandbox, space sim, puzzle, creative instrument, pattern lab, emergent behavior, math visualizer, drawing toy. This is a **management/simulation** archetype — build/tweak decisions, then watch consequences unfold through a growing season. Very different interaction pattern.
- **Mission alignment:** Connects directly to viticulture expertise. The canopy management decisions (bud count, training system, shoot thinning, leaf pulling, hedging) are the exact decisions real grapegrowers make. The simulation captures the tradeoffs: more buds → more shoots → more yield but less light per shoot and higher disease risk. VSP gives better fruit exposure but lower yield than Sprawl or Pergola.
- **Interestingness:** It's a "build/tweak and watch" toy — you set parameters, then sit back and watch the vine grow through the seasons. The harvest scoring gives a clear feedback loop. Different training systems produce visibly different vine shapes.

## Verification
- ✅ File size: 32.5KB (>5KB minimum)
- ✅ Disclaimer present (exact required wording)
- ✅ Robots meta present (noindex, nofollow, noarchive, nosnippet, noimageindex, notranslate)
- ✅ JS syntax check passed
- ✅ Mobile-responsive layout (flexbox, @media queries)
- ✅ Canvas-based rendering with DPR scaling
- ⚠️ Browser visual check blocked by policy (localhost) — marked as **partial verification**

## Delegation
- **Main agent: 100%** — concept selection, domain research, full HTML/CSS/JS implementation, verification, packaging
- **worker1: 0%** — not attempted (per SPEC, worker1 has timed out 6+ consecutive nights in cron)
- **worker2: 0%** — not used

## Status
Complete. Ready for publish.