# Run Summary — 2026-04-24 — The Fermentation Atlas

## Chosen mini-app
**The Fermentation Atlas** — an interactive visual explorer of 20 major fermentation processes across food, drink, and industrial applications (kimchi, cheese, wine, beer, soy sauce, yogurt, sourdough, kombucha, vinegar, tempeh, miso, sauerkraut, kefir, chocolate, coffee, salami, natto, idli/dosa, injera, industrial ethanol).

## Why chosen
- Domain rotation: recent 7 runs were all wine/vineyard-specific; this rotates to **food science / fermentation beyond wine**
- Archetype rotation: recent runs were calculators, simulators, risk maps; this is a **visual explorer/browser** archetype
- Broad scientific appeal: covers microbiology, chemistry, food engineering across cultures
- Strong visual potential: color-coded cards, filterable grid, organic warm design
- Educational and reference-quality: accurate organism names, temperature/pH/time data

## Research done
- Searched for fermentation type classifications, organisms, and conditions
- Cross-referenced lactic acid, alcoholic, acetic, mold-driven, mixed, and propionic fermentation pathways
- Verified temperature ranges and key organisms for all 20 entries

## What works
- 20 fermentation entries with accurate data (organisms, substrates, temp, pH, time, oxygen, products, examples, descriptions)
- Filter by fermentation type (lactic, alcoholic, acetic, mold, mixed, propionic, all)
- Click-to-expand detail modal with full conditions grid, organisms, products, description
- Warm organic design with Playfair Display + DM Sans typography
- Animated floating bubble background
- Responsive: single column mobile, auto-fill grid desktop
- Experimental AI mini-app footer warning
- Keyboard accessible with ARIA roles

## What doesn't / limitations
- No image assets (emoji-based icons only; could be enhanced with generated images later)
- Verification was partial — Playwright not available locally, browser tool blocked local file URLs
- Not yet published to hosted gallery (pending FTPS upload)

## Delegation
- **worker1 (K2.6)**: Full implementation — HTML/CSS/JS, data, card grid, modal, filters, animations, responsive layout (~75% of work)
- **Main agent**: Concept selection, research, review, verification attempt, packaging, publishing, state updates (~25% of work)

## Next steps
- Publish to wine-claw.github.io gallery
- Consider adding generated illustrations for each fermentation type
- Could expand to 30+ entries with more industrial fermentation processes
## Publishing outcome
- **GitHub Pages:** ✅ Pushed successfully (commit 780125ad). 30 apps in gallery, Fermentation Atlas as latest. Pages propagation in progress.
- **FTPS (wine-claw.github.io):** ❌ Failed — 530 Login authentication failed. Credentials may have expired or changed.
- **Pipeline check:** Reported a false mismatch — expected double-prefixed slug (`2026-04-24-2026-04-24-fermentation-atlas`) which is a check bug, not a real issue. Actual slug is correct.

## Durable artifacts
- Run folder: `runs/2026-04-24/`
- App source: `apps/2026-04-24-fermentation-atlas/index.html`
- State updated: `state.json`, `latest-summary.md`
- Gallery updated: `mini-apps/` committed and pushed
