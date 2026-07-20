# Run Note — 2026-07-21

## Project
2am Mini-App Creation

## Selected mini-app
**Watershed Rainfall–Runoff Sandbox**

- **Domain:** Environmental hydrology / agriculture / land-cover water balance
- **Archetype:** Interactive simulation / sandbox
- **Visual/control style:** Bright top-down map, paint-brush terrain editing, click/toggle rain, live stats bars

## Why this idea
Recent overnight apps covered: orthographic globe routing (geography), marble logic gate toy (mechanical computing), sourdough fermentation (food science), modular audio synth, Fourier epicycles (math animation), and the MONIAC hydraulic computer (history of technology/economics). This run deliberately rotates to environmental science/hydrology — a topic that is both playful and relevant to vineyards, catchments, and agricultural water thinking, while being visually and interactively different from the recent cluster.

## Research done
- Web search for existing rainfall–runoff interactives (Model My Watershed, WikiWatershed, Stroud runoff simulation, Rock Your Watershed, Landlab/topographic flow examples).
- Drew on hydrology concepts: infiltration capacity by land cover, saturation-excess runoff, D8/D4 downhill flow routing, evapotranspiration, water-balance accounting.

## What was built
A single-file HTML/CSS/JS mini-app where the user can:
- Paint terrain (raise/lower) and land cover (forest, pasture, bare soil, urban) on a gridded watershed.
- Trigger rain (toggle or hold space bar) with adjustable intensity.
- Watch water flow downhill, infiltrate at cover-dependent rates, saturate soil, evaporate, and run off the edges.
- See live water-balance bars for rainfall, infiltration, runoff, evapotranspiration, and surface storage.
- Switch between terrain presets (rolling hills, steep valley, urban floodplain) and reset.
- Toggle flow-direction arrows and soil saturation overlay.

## Work split
- Main agent: 100% (concept, research, implementation, UI design, verification, packaging, publish, pipeline check).
- Workers: none used. This cron explicitly requires the main agent session to build the app; workers are not viable here.

## Verification
- File exists: yes
- File size: 26,287 bytes (> 5 KB)
- AI disclaimer present: yes
- `robots` meta present: yes (`noindex, nofollow`)
- JS syntax check: passed with `node --check` on extracted script
- Browser runtime check: not performed in unattended run (per project overnight rule); app is rendered purely client-side with no external dependencies.

## Packaging status
- Durable run folder created: `runs/2026-07-21/watershed-runoff-sandbox/`
- `BUILD-SPEC.md` and `RUN-NOTE.md` saved
- `latest-summary.md` and `state.json` updated in this session
- Gallery publish: to be completed by `publish_mini_app.py` and verified by `mini_app_pipeline_check.py`

## Caveats
- Simplified hydrology: not a real hydrological model; flow uses local-steepest-descent on a coarse grid, infiltration is capacity-based per cover, and evapotranspiration is stylised.
- Performance: grid is 80×50 with ~1,000–2,000 particles per heavy storm; should run smoothly on modern devices but may warm up older phones.
- No external assets or APIs, so it is fully self-hosted and offline-friendly.
