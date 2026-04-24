# Fermentation Drama — Summary

## What was built
An interactive scroll-story mini-app covering 14 days of red wine (Shiraz) fermentation, told as narrative prose with evolving visuals.

## Files
- `index.html` — Single-page structure with splash, day scenes container, and end card
- `styles.css` — Dark theme, wine-colour progression, scroll-snap, bubbles animation, responsive, reduced-motion support
- `app.js` — All 15 scenes (Day 0–14) with narrative text, data badges, inline SVG tank diagrams, animated bubbles, temperature/Baumé gauges, winemaker's note toggles, IntersectionObserver for fade-in and progress dots
- `hero.jpg` — Optimised splash image (200KB, down from 2.5MB PNG)
- `hero.png` — Original (kept for reference)

## Features
- **15 narrative scenes** (Day 0 Crush through Day 14 New Wine + splash + end card)
- **Evolving tank SVG** — wine colour deepens, fill level changes, cap rises/falls, temperature and Baumé gauges animate
- **CSS bubble animations** — intensity scales with fermentation activity
- **Data badges** — Baumé, temperature, key actions woven into each scene
- **Winemaker's Notes** — expandable technical detail cards
- **Dramatic callouts** — at key inflection points (peak ferment, press day, etc.)
- **Progress dots** — fixed sidebar navigation, clickable
- **Warning banner** — dismissable
- **Mobile-first** — 375px+ viewport, scroll-snap
- **Offline-capable** — no external assets (system fonts only)
- **prefers-reduced-motion** — animations disabled for accessibility
- **node --check app.js** — passes clean

## Narrative approach
Written as immersive, second-person prose — someone standing at the tank, watching, tasting, deciding. Technical data (Baumé, temperature, CO₂) appears as small badges, not dashboards. Winemaker's notes are optional deeper dives.

## Colour arc
Wine colour progresses from `#6b2d5b` (fresh purple must) through `#82354f` (peak ferment deep red) to `#321620` (settled dark garnet), with scene background gradients matching.