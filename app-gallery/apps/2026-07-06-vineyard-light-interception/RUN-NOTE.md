# RUN-NOTE — 2026-07-06

## Chosen mini-app
**Vineyard Row Light Interception Simulator** — drag the sun through the sky and watch shadow geometry, sun flecks, and direct light interception change with row spacing, canopy size, and latitude.

## Why this idea
- Recent runs covered cryptography (Enigma), control systems (PID pendulum), cartography (map projections), biology (mycelial forest), history/telegraph, geomorphology, physics waves, and astronomy. This returns to the viticulture stream but as a visual, pokeable sandbox rather than a reference page or calculator.
- Directly connects to practical vineyard questions: row spacing, canopy height, trellising, and fruit-zone light.

## Research done
- Reviewed vineyard light interception literature (Smart 1973, Pieri, Mabrouk & Sinquet, INRAE 2D canopy approximation).
- Implemented simplified geometric model: continuous north-south rows treated as vertical canopy strips; interception = footprint / row spacing, capped at 1.

## What works
- Solar position from latitude, day-of-year, and hour.
- Scaled cross-section of multiple vineyard rows with draggable sun.
- Live interception %, sun-fleck %, elevation, azimuth, and time.
- Sliders for latitude, day-of-year, hour, row spacing, canopy width, canopy height, trunk height.
- Play/pause day animation.
- Daily interception + sun-fleck curve with current-time marker.
- AI disclaimer banner and robots meta tags.
- Mobile-responsive layout.

## What is approximate
- Simplified geometric model only; no diffuse light, canopy porosity, leaf angles, slope, or arbitrary row orientation.
- Output is illustrative, not field-validated.

## Verification
- index.html: 25,144 bytes (> 5 KB).
- AI disclaimer present.
- robots noindex/nofollow present.
- JS syntax check passed with `node --check`.
- Headless browser screenshots at desktop (900×700) and mobile (390×844) viewports.
- Additional screenshots captured at 08:00, 12:00, and 17:00.

## Publishing
- Gallery URL: https://wine-claw.github.io/app-gallery/
- App URL: https://wine-claw.github.io/app-gallery/apps/2026-07-06-vineyard-light-interception/
- Latest redirect: https://wine-claw.github.io/app-gallery/latest/

## Delegation
- Cron explicitly required main-session build only.
- worker1 / worker2: not used (0%).
- Main agent: 100%.
