# SPEC.md — 2am Mini-App Creation

## 1. Objective
At 2:00 AM every day, autonomously choose and build one mini-app that Simon is likely to value, using known interest areas and favouring practical, demoable outcomes.

## 2. Themes
The overnight chooser should select from themes such as:
- agriculture, farming, and viticulture technology
- mechanical, chemical, and process engineering
- environmental science, climate, and water
- food science and fermentation (beyond wine)
- history, geography, and cartography
- robotics, electronics, and DIY technology
- physics, chemistry, and maths visual demos
- data visualisation, simulations, and interactive explainers
- playful or surprising idea generators and quirky utility apps
- suitable ideas surfaced in `projects/mission-advancement-ideas/`

Wine and vineyard topics are still welcome but must be one stream among several. Actively rotate the subject domain across consecutive nights rather than defaulting back to wine.

The chooser should use judgment rather than cycling mechanically. Selection should be based on likely usefulness, novelty, demo value, and fit with Simon's interests. It should also avoid over-concentrating on any single domain — including wine — when other areas would provide healthier topic variety.

## 3. Operating model
This project is intentionally designed for times when Simon is asleep and not in a hurry.

Therefore:
- the run should proceed autonomously without waiting for a response
- ambiguity should be resolved sensibly in favour of a small, achievable build
- the output should be honest about what is complete vs incomplete

## 4. Success criteria for a nightly run
A good nightly run should usually achieve most of the following:
- select a strong candidate idea
- explain briefly why it was chosen
- do enough web/domain/design research to build sensibly rather than guessing the whole thing from memory
- produce a working prototype or meaningful implementation draft
- save the result in a durable project location
- write a short summary for the morning brief

## 5. Candidate selection rubric
Prefer ideas that score well on:
- likely personal fit for Simon
- **interestingness** — does it feel like a toy or discovery tool, not a reference page? Will Simon want to poke at it?
- small enough scope for one overnight push
- interesting visual or interactive demo potential
- strong shareability or reusability
- **novelty versus roughly the last 7 runs**
- noticeably different archetype / UX pattern from recent nights
- noticeably different **subject domain** from recent nights (do not cluster wine apps)
- opportunity for stronger visual/design quality than a generic quick app
- occasional delight / surprise value, not just practical utility

Avoid ideas that are:
- too big for a small overnight pass
- blocked on credentials, paid APIs, or complex integrations
- mostly admin/infrastructure with weak end-user value
- dependent on lots of unresolved product decisions
- near-neighbour repeats of the recent run cluster (for example another card/planner, another slider-heavy sandbox, another dark polished single-page ops helper, another dense reference guide) unless there is a strong reason
- dense encyclopaedia-style information browsers or "here is how X works" explainers

## 6. Delegation model
The main agent should deploy both `worker1` and `worker2` as needed for implementation work, then actively review their output and make corrections or redeploy sub-agents as needed. Do not trust worker output — review it.

### Default division of labour
Main agent:
- choose the concept
- frame the task
- decide scope
- **delegate the bulk of implementation to workers** — do NOT write the whole app solo
- review worker output and fix issues (or redeploy workers to fix)
- run the verification loop (see §11)
- update durable notes/state
- prepare the morning summary

`worker1`:
- do most implementation work
- perform first-pass code drafting
- assist with focused research needed for implementation
- propose tests, fixes, refinements, and UI polish where relevant
- gather and integrate stronger visual references/assets when useful and cost-appropriate

`worker2`:
- available for parallel implementation tasks (CSS, HTML, UI polish, documentation, research digestion)
- deploy alongside worker1 when work can be split

### Token-use goal
Bias implementation toward workers so the main agent does not spend large amounts of its own tokens on coding unless clearly necessary. **The main agent should not write more than ~20% of the final code.** If the main agent finds itself doing the majority of the coding, that is a delegation failure — stop, deploy workers, and redirect.

### Review requirement
The main agent MUST review all worker output before considering work complete. If issues are found, fix them directly or redeploy the worker with corrective instructions.

### Solo-build prohibition
The main agent is **prohibited from building the entire app alone**. At minimum:
- `worker1` must be deployed for the core implementation
- `worker2` should be used for UI polish, CSS, or documentation when practical
- If workers are unavailable or failing repeatedly, the main agent may do more direct coding, but this must be noted as a failure mode in the run summary and the work-split report must reflect it honestly.

## 7. Output locations
Each run should keep durable artifacts inside this project folder, for example:
- `runs/YYYY-MM-DD/` for per-run notes and outputs
- `latest-summary.md` for the freshest morning-summary-ready handoff
- prototype folders/files as needed

## 8. Morning brief requirement
The 8:00 AM daily brief should include:
- what was built overnight for this project
- current completion status
- notable blockers or caveats
- a link or local path if applicable
- enough context for Simon to decide whether the mini-app should be promoted into its own dedicated project for further development

If no meaningful build occurred, the brief should say so plainly.

## 11. Verification loop (mandatory)
After finishing the app, the main agent MUST:
1. Create a video of the app's functionality (Playwright-based screen recording)
2. Watch/check the video for issues (visual bugs, broken interactions, missing features, layout problems)
3. **Visual/layout check list** — specifically verify:
   - The main interactive element (canvas, globe, chart, game board, etc.) is **centred and fully visible** within its container
   - Drag/touch/click targets are positioned where they appear to be (no coordinate system mismatches)
   - Text is readable and not clipped
   - The app is usable on both desktop and mobile widths
   - The default state shows the app working immediately (no blank screens, no hidden-by-default main features)
4. If issues found → fix them → create a new video → re-check
5. Repeat until no issues remain
6. The final verification video must be included in the next 7:50 AM daily brief

A run is NOT complete until the verification loop finishes with a clean video.

## 12. Work-split reporting
In the daily brief, report the **% of work done by each participant**:
- Main agent %
- worker1 %
- worker2 %

This must be an honest estimate based on who wrote what code, did what research, and made what decisions.

If the main agent's share is above 40%, that is a yellow flag — explain why workers could not be used more heavily.

## 9. Guardrails
- Prefer one coherent mini-app over several scattered attempts.
- Keep implementations lightweight and reviewable.
- Do not claim production readiness unless it is genuinely warranted.
- If blocked, produce a scoped concept note rather than failing silently.
- External publishing or deployment still requires explicit user instruction unless already authorised separately.
- **Packaging is part of the build, not an afterthought.** The main agent must run the full packaging checklist (see `PACKAGING-CHECKLIST.md`) before declaring a run complete. A run with working code but missing gallery publish / state update / git push is a **partial failure**, not a success.
- If packaging fails (git error, network issue, etc.), record the failure honestly and fix it in the same session if possible. Do not leave apps unpublished.

## 10. Immediate implementation plan
1. Enable a recurring 2:00 AM cron job in Australia/Adelaide time.
2. At runtime, choose one app idea from the allowed themes.
3. Use `worker1` heavily for coding work.
4. Save outputs and a summary in this project folder.
5. In the run note and `latest-summary.md`, explicitly record delegation details:
   - whether `worker1` was used
   - what coding/research/debugging it handled
   - what the main agent handled directly
   - if `worker1` was not used, why not
6. Before the run is considered complete, verify that the durable project pointers are updated consistently:
   - the new run folder exists under `runs/YYYY-MM-DD/`
   - `latest-summary.md` reflects that new run
   - `state.json` reflects that new run in `summary`, `updatedAt`, `primaryLink.label`, and `latestRun`
   - **the app is published to the gallery** (`app-gallery/apps/`, `index.html` updated, `git push` succeeded)
   If these are inconsistent, record the run as a packaging failure / partial result rather than a clean success.
7. **Packaging checklist** — Before declaring a run complete, execute every step in `PACKAGING-CHECKLIST.md`. A run is not done until the checklist is fully ticked.
8. Add a same-morning failure check: if the current date still has no new run folder when the morning brief/preflight logic checks the project, that must be treated as a missed overnight run and surfaced plainly rather than allowing yesterday's app to be reported as today's.
9. Surface the result in the 7:50 AM brief (updated from 8:00 AM).
10. Include the final verification video from §11.
11. Include the work-split percentages from §12.
