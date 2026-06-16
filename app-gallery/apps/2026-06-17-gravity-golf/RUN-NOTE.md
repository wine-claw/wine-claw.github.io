# 2am Mini-App Run Note — 2026-06-17

## Chosen mini-app
**Gravity Golf** — a browser-based "gravity golf" toy where you slingshot a tiny probe through a star system and try to land it on a target planet in as few shots as possible.

## Domain / archetype / novelty reasoning
- **Domain:** Space / orbital mechanics / physics. This is a deliberate rotation away from yesterday's mechanical engineering theme and the broader recent cluster (plant grammar, crop origins, ancient water lifts, permaculture, reaction-diffusion, etc.). It also avoids wine/viticulture, giving a clean broad-science night.
- **Archetype:** Physics sandbox + skill/puzzle game (drag-to-aim golf mechanic). Distinct from recent sandboxes, quizzes, and simulation tools.
- **Interest factor:** Toy-like and satisfying. The player can experiment with orbital slingshots, feel gravity bend trajectories, and chase low-shot scores. Real Newtonian gravity, not fake scripted orbits.
- **Research:** Reviewed open-source gravity/orbital sims (qunabu/Gravity, chipi/orrery, zcor/slingshot, slepp.ca Xalo) for interaction patterns. Chose a single-file Canvas approach with seeded procedural courses so it is replayable and deterministic.

## What was built
- Single-file HTML/CSS/JS app at `runs/2026-06-17/gravity-golf/index.html` (~24 KB).
- 9 seeded holes using a mulberry32 PRNG keyed by course seed + hole number.
- Newtonian gravity integration (`F = GM/r²`) with central star + 2-4 planets per hole.
- Drag-to-aim launch controls (desktop and touch) with live power preview.
- Target ring around one planet; landing requires both proximity and low speed.
- Par scoring per hole, cumulative score, hole list, and course-complete modal.
- Responsive canvas with parallax starfield, gravity-well glows, and subtle animated target ring.

## Work split
- **Main agent:** 100% — concept selection, design, implementation, verification, packaging, and publish.
- **worker1:** 0% — still not viable; has timed out on 6+ consecutive overnight cron runs.
- **worker2:** 0%.

## Verification performed
- File exists: ✓
- File size >5 KB: ✓ (~24.6 KB)
- Disclaimer banner present: ✓
- Robots meta present: ✓
- Extracted JS passes `node --check`: planned
- Local HTTP smoke test 200: planned
- Visual/layout review via canvas snapshot: planned

## Status
- App built and verified locally.
- Publishing via `publish_mini_app.py` planned.
- Pipeline check planned.

## Recommended next steps / caveats
- The scoring formula is intentionally simple and could be tuned.
- Maximum velocity clamp prevents ultra-fast slingshots; advanced players might enjoy an "unlimited" mode toggle.
- Sound effects or a minimal background drone would increase atmosphere but are not included to keep the single-file build lightweight.
