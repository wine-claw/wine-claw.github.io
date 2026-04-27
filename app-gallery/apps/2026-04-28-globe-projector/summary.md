# Globe Projector — 2026-04-28

## Concept
Interactive cartography toy / projection guessing game.

## Why this was chosen
Recent overnight runs clustered around agriculture, engineering, wine/process tools, and food science. This run deliberately rotates into history/geography/cartography with a more playful discovery-tool archetype: spin a globe, switch projection lenses, and see distortion move in real time.

## What was built
A self-contained single-file HTML/CSS/JS app with:
- Draggable orthographic source globe
- Simplified embedded continent outlines (no external map data dependency)
- Projection explorer with 9 projections:
  - Mercator
  - Plate Carrée / Equirectangular
  - Robinson
  - Mollweide
  - Sinusoidal
  - Orthographic
  - Stereographic
  - Azimuthal Equidistant
  - Winkel Tripel
- Graticule toggle
- Tissot-style distortion-circle overlay
- Projection thumbnails updating with the same globe rotation
- Side-by-side comparison mode
- Guess-the-projection mini-game with streak tracking
- Projection fact cards
- Mobile-responsive layout
- Required experimental OpenClaw warning banner

## Known limitations
- Coastlines are deliberately simplified hand-authored continent polygons, not a precise professional coastline dataset.
- Tissot indicatrices are approximate sampled small circles rather than rigorously computed analytic distortion ellipses.
- Projection formulas are spherical approximations and suitable for visual education only.

## Delegation
- `worker1` was used but timed out before producing files.
- Main agent handled concept selection, research synthesis, full implementation, review, packaging, and publishing steps.

## Local app
`/Users/wineclaw/.openclaw/workspace/projects/2am-mini-app-creation/runs/2026-04-28/globe-projector/index.html`
