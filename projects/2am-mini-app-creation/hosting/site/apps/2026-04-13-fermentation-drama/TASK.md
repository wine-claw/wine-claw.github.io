# TASK.md — Fermentation Drama (2026-04-13)

## Concept
**Fermentation Drama** — An interactive narrative/scroll-story that walks you through the 14-day drama of a red wine fermentation, told as a day-by-day story with evolving visuals.

## Archetype
**Story / narrative / interactive fiction** — deliberately different from the recent cluster of planners, decision-support tools, spatial explorers, and scouting games. This is the first pure narrative mini-app in the rotation.

## Domain
**Winery / cellar** (fermentation is the heart of red winemaking). This balances the recent vineyard-heavy runs.

## Key Design Goals
1. **Narrative-first, not calculator-first.** The user scrolls through a story, not a dashboard. Each "day" of fermentation is a scene with narrative text, evolving visuals, and key data points woven in naturally.
2. **Rich visual storytelling.** Use the provided hero image plus inline SVG/CSS illustrations to show the tank evolving day by day: from fresh crushed must, through lag phase, explosive active fermentation, cap formation, declining sugar, pressing, and into early post-ferment.
3. **Mobile-first, phone-optimised.** Vertical scroll is the primary interaction. Swipeable cards or scroll-snapping scenes that feel natural on a phone.
4. **Data woven into story.** Show key metrics (Baumé/SG, temperature, colour intensity, tannin extraction, CO2 activity) as part of each day's scene — small inline data badges or animated gauges, not separate dashboards.
5. **Atmospheric, immersive feel.** Dark colour scheme with warm burgundy/gold accents. The colour of the wine deepens as you scroll through. Subtle CSS animations for bubbles, cap movement, temperature rise.
6. **Playful touches.** Sound-effect-style visual cues (steam rising, bubbles popping, cap sinking). Small "dramatic moment" callouts at key inflection points (yeast taking off, peak fermentation, the press).
7. **Educational but not dry.** Each day has 1-2 short narrative paragraphs written from the perspective of someone watching the tank, plus optional "winemaker's note" expandable cards for deeper technical detail.

## Narrative Arc (14 scenes/days)
The story follows a single tank of Shiraz from crush through to post-press. Each day is a scroll-snap scene:

- **Day 0 — Crush:** Grapes arrive, destemmed, crushed. Must is dark purple, seeds showing. SO2 added. Initial Baumé ~13.5. Temperature ~15°C. Narrative: excitement, fresh fruit, the beginning.
- **Day 1 — Lag Phase:** Yeast pitched (or native). Quiet surface. Sugars untouched. Waiting. Narrative: the calm before the storm. Winemaker's note about yeast adaptation.
- **Day 2 — First Bubbles:** Tiny bubbles begin. Cap starts to lift. Slight temperature rise. Baumé still high (~13). Narrative: life stirring. CO2 just starting.
- **Day 3 — Taking Off:** Active fermentation begins. Vigorous bubbling. Cap rises noticeably. Temperature climbing to 22-24°C. Pump-over begins. Narrative: the tank comes alive.
- **Day 4 — The Frenzy:** Peak fermentation activity. Cap is thick and hot. Temperature hits 28-30°C if not cooled. Strong CO2. Deep colour extraction happening. Baumé dropping fast (~8-9). Narrative: the drama is intense — this is the heart of it.
- **Day 5 — Still Fierce:** Fermentation still strong. Cap management continues. Colour deepening. Tannin extraction accelerating. Temperature managed. Narrative: managing the beast.
- **Day 6 — Slowing Down:** Activity visibly declining. Cap starts to sink slightly. Baumé ~4-5. Temperature easing. Narrative: the energy starts to recede.
- **Day 7 — The Twilight:** Sugar nearly consumed. Baumé ~2. Cap settling. Less CO2. First thoughts of pressing. Narrative: bittersweet — the end is near.
- **Day 8 — Dry or Nearly Dry:** Baumé ~0.5-1. Fermentation nearly complete. Cap has collapsed. Deciding press timing. Narrative: the winemaker's pivotal choice.
- **Day 9 — Pressing Day:** Free-run wine drained. Press cake goes to press. Press wine is darker, more tannic. Narrative: separation — juice from skins, wine from marc.
- **Day 10 — Settling:** Wine in tank, settling. Gross lees falling. Malolactic bacteria may start. Narrative: quiet after the storm.
- **Days 11-12 — MLF Begins:** If inoculated, malolactic fermentation kicks off. Subtle bubbles. Softening acidity. Narrative: a second, quieter transformation.
- **Day 13 — Resting:** Wine resting on fine lees. Beginning to clarify. Narrative: patience.
- **Day 14 — New Wine:** The young wine, clarified, racked. Tasting for the first time. Narrative: what was grapes is now wine. A reflective end card.

## Visual Approach
- **Hero image:** provided `hero.png` — use as the splash/intro screen background
- **Scene backgrounds:** Inline SVG illustrations that evolve — the tank cross-section changes colour, bubble intensity, cap height, temperature gauge
- **Colour progression:** The wine colour deepens as you scroll — from fresh purple juice to deep, dark red
- **Animations:** CSS keyframe animations for: bubbles rising, cap pulsing, temperature gauge filling, sugar gauge draining
- **Typography:** Clean serif for narrative text (feels more literary), sans-serif for data badges
- **Dark theme:** Deep charcoal background (#1a1118), burgundy accents (#8B2252), gold highlights (#D4A843), wine red (#722F37)

## Technical Requirements
- Single `index.html`, `styles.css`, `app.js` — no framework, no build step, no runtime dependencies
- Mobile-first, responsive. Works well on phone-sized screens (375px+)
- All static assets bundled locally (hero image + inline SVG/CSS)
- Smooth scroll-snap or card-based navigation between days
- Day progress indicator (dots or timeline) visible on scroll
- Touch-friendly: swipe between days or smooth vertical scroll with snap
- Warning banner: "Experimental OpenClaw AI mini-app · Untested · Not professionally validated · Do not rely on for any decisions"
- Accessibility: semantic HTML, focus management, prefers-reduced-motion
- Small file size — hero image should be optimised, no other external assets
- Must work offline (no CDN fonts, no external scripts)

## Content Sources (for narrative accuracy)
Research-grounded content based on:
- AEB Group: red wine vinification stages and timing
- SmartWinemaking.com: step-by-step red wine from grapes (lag phase, cap management, pressing)
- General enology references for Baumé/temperature/colour extraction curves
- Key technical points: SO2 at crush, yeast lag phase 24-48h, active ferment days 2-6, peak days 3-5, cap management pump-overs, pressing at/near dry, MLF follows

## Files
- `hero.png` — already placed in this directory
- Create: `index.html`, `styles.css`, `app.js`
- Create: `summary.md` (run summary) after completion

## Quality bar
- The narrative text should be genuinely engaging — written like a good longform essay, not like a textbook
- Visuals should feel atmospheric and immersive, not like a data dashboard
- The data (Baumé, temp, etc.) should be woven into the story naturally, not presented in separate panels
- This should feel like reading a story that happens to teach you about fermentation, not like a lecture that happens to have some prose

## Constraints
- No paid APIs, no runtime network calls, no build tools
- Keep it self-contained and lightweight
- Optimise hero.png if it's large (aim for <500KB)
- Test with `node --check app.js` before finishing