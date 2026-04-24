# SPEC.md — 2am Mini-App Creation

## 1. Objective
At 2:00 AM every day, autonomously choose and build one mini-app that Simon is likely to value, using known interest areas and favouring practical, demoable outcomes.

## 2. Themes
The overnight chooser should select from themes such as:
- wine industry tools
- vineyard tools and viticulture-oriented mini-apps
- winery/cellar tools
- engineering calculators
- wine industry historical facts / educational mini-tools
- visual demos of wine industry technical concepts
- suitable ideas surfaced in `projects/mission-advancement-ideas/`

The chooser should use judgment rather than cycling mechanically. Selection should be based on likely usefulness, novelty, demo value, and fit with Simon's interests. It should also avoid over-concentrating on winery/cellar concepts when vineyard/viticulture ideas would provide healthier topic variety.

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
- usefulness to wine / engineering / technical education
- small enough scope for one overnight push
- interesting visual or interactive demo potential
- strong shareability or reusability
- **novelty versus roughly the last 7 runs**
- noticeably different archetype / UX pattern from recent nights
- opportunity for stronger visual/design quality than a generic quick app
- occasional delight / surprise value, not just practical utility

Avoid ideas that are:
- too big for a small overnight pass
- blocked on credentials, paid APIs, or complex integrations
- mostly admin/infrastructure with weak end-user value
- dependent on lots of unresolved product decisions
- near-neighbour repeats of the recent run cluster (for example another card/planner, another slider-heavy sandbox, another dark polished single-page ops helper) unless there is a strong reason

## 6. Delegation model
The main agent should deploy both `mm-worker` and `glm-worker` as needed for implementation work, then actively review their output and make corrections or redeploy sub-agents as needed. Do not trust worker output — review it.

### Default division of labour
Main agent:
- choose the concept
- frame the task
- decide scope
- **review worker output and fix issues** (or redeploy workers to fix)
- run the verification loop (see §11)
- update durable notes/state
- prepare the morning summary

`mm-worker`:
- do most implementation work
- perform first-pass code drafting
- assist with focused research needed for implementation
- propose tests, fixes, refinements, and UI polish where relevant
- gather and integrate stronger visual references/assets when useful and cost-appropriate

`glm-worker`:
- available for parallel implementation tasks (CSS, HTML, UI polish, documentation, research digestion)
- deploy alongside mm-worker when work can be split

### Token-use goal
Bias implementation toward workers so the main agent does not spend large amounts of its own tokens on coding unless clearly necessary.

### Review requirement
The main agent MUST review all worker output before considering work complete. If issues are found, fix them directly or redeploy the worker with corrective instructions.

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
3. If issues found → fix them → create a new video → re-check
4. Repeat until no issues remain
5. The final verification video must be included in the next 7:50 AM daily brief

A run is NOT complete until the verification loop finishes with a clean video.

## 12. Work-split reporting
In the daily brief, report the **% of work done by each participant**:
- Main agent %
- mm-worker %
- glm-worker %

This must be an honest estimate based on who wrote what code, did what research, and made what decisions.

## 9. Guardrails
- Prefer one coherent mini-app over several scattered attempts.
- Keep implementations lightweight and reviewable.
- Do not claim production readiness unless it is genuinely warranted.
- If blocked, produce a scoped concept note rather than failing silently.
- External publishing or deployment still requires explicit user instruction unless already authorised separately.

## 10. Immediate implementation plan
1. Enable a recurring 2:00 AM cron job in Australia/Adelaide time.
2. At runtime, choose one app idea from the allowed themes.
3. Use `mm-worker` heavily for coding work.
4. Save outputs and a summary in this project folder.
5. In the run note and `latest-summary.md`, explicitly record delegation details:
   - whether `mm-worker` was used
   - what coding/research/debugging it handled
   - what the main agent handled directly
   - if `mm-worker` was not used, why not
6. Before the run is considered complete, verify that the durable project pointers are updated consistently:
   - the new run folder exists under `runs/YYYY-MM-DD/`
   - `latest-summary.md` reflects that new run
   - `state.json` reflects that new run in `summary`, `updatedAt`, `primaryLink.label`, and `latestRun`
   If these are inconsistent, record the run as a packaging failure / partial result rather than a clean success.
7. Add a same-morning failure check: if the current date still has no new run folder when the morning brief/preflight logic checks the project, that must be treated as a missed overnight run and surfaced plainly rather than allowing yesterday's app to be reported as today's.
8. Surface the result in the 7:50 AM brief (updated from 8:00 AM).
9. Include the final verification video from §11.
10. Include the work-split percentages from §12.
