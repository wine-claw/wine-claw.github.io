# 2am Mini-App Creation

## Purpose
Create one mini-app at 2:00 AM every morning that Simon is likely to enjoy or find useful, chosen autonomously from known interest areas.

## Status
Active

## Project brief
At 2:00 AM every morning, the agent should choose a mini-app idea based on Simon's known interests and then build it without waiting for a reply.

Preferred theme pool:
- wine industry tools
- vineyard tools and vineyard-adjacent ideas (field operations, irrigation, canopy, harvest logistics, mapping, pests/disease education, weather/risk, block-level decision support, etc.)
- winery/cellar tools
- engineering calculators
- wine industry historical facts / educational tools
- visual demos of wine industry technical concepts
- playful or surprising idea generators relevant to wine, viticulture, history, engineering, or technology
- small creative tools, simulations, interactive explainers, decision aids, story-driven demos, visual archives, maps, timelines, teaching toys, and quirky utility apps

The agent should choose something itself from those categories using its knowledge of Simon's preferences. Do not let the project drift too heavily toward winery/cellar ideas; vineyard-oriented concepts should remain an explicit part of the rotation. Also treat `projects/mission-advancement-ideas/` as an active candidate-idea pool for mini-app selection where those ideas fit the overnight scope.

## Variety / creativity rule
- Do not default to chemistry calculators or engineering widgets every night.
- Prefer noticeable variety across consecutive nights.
- Score novelty against roughly the **last 7 runs**, not just the last 1–2.
- Rotate between clearly different mini-app archetypes, for example:
  - calculator / estimator
  - simulation / sandbox
  - visual explainer
  - educational game or quiz
  - historical/archive browser or timeline
  - idea generator or concept explorer
  - practical workflow helper
  - story / narrative / interactive fiction
  - weird toy / playful surprise
  - mapping / spatial explorer
  - data art / visualisation toy
  - social/funny concept
  - historical reconstruction / alternate-history piece
- Avoid **near-neighbour repeats** for several days, not just exact repeats. Examples to avoid clustering:
  - card/planner after another card/planner
  - slider/control sandbox after another slider/control sandbox
  - dark polished single-page ops helper after another very similar ops helper
- Treat each overnight build as a chance to surface a different *direction* Simon might want to develop further, not just another version of the same kind of tool.
- Before choosing a concept, check the recent run notes and actively bias away from repeating both the same topic shape and the same UX pattern.
- Occasionally optimise for **delight, surprise, or charm** rather than only practical usefulness.

## Build style
- This is an overnight autonomous build project.
- Simon will usually be asleep and unavailable to answer questions.
- The goal is to make real progress without blocking on clarification.
- Each run should favour one coherent mini-app over multiple weak starts.
- The project should bias toward practical, demoable, shareable outputs.
- Do more front-end research and reference gathering than the project has sometimes done in the past: look for stronger visual inspiration, domain examples, and interaction patterns before settling on the build.
- When that will materially improve the result, be willing to:
  - download/source suitable reference images or texture/art assets with compatible rights/usage expectations
  - generate original images/illustrations
  - use those assets to make the app feel more polished and less generic
- Keep image/tool choices cost-aware; prefer free/open or low-cost paths where practical.

## Delegation preference
- Use the high-thinking `mm-worker` subagent almost exclusively for coding work where practical.
- Avoid using large amounts of the main agent's tokens for implementation.
- The main agent should keep orchestration, brief review, packaging, and reporting responsibilities.
- The main agent may still step in directly for small glue tasks, verification, or higher-judgment decisions.

## Scheduling
- A recurring 2:00 AM Australia/Adelaide automation is requested for this project.
- The overnight run should choose, research, and build the selected mini-app.
- In the daily 8:00 AM brief, include what was built, the stable latest-app link, and the mini-app gallery link so Simon can reach both the newest app and older hosted apps easily from his phone.
- Those two hosted URLs are fixed required outputs for the morning brief and should be included even if project `state.json` is temporarily stale; morning reporting should prefer the newest overnight artifact (`latest-summary.md` / latest run folder) over dashboard state.

## Hosted publishing
- The current standard remote publishing path is **GitHub Pages** via the `wine-claw/wine-claw.github.io` repo.
- Publish target URLs:
  - gallery: `https://wine-claw.github.io/app-gallery/`
  - stable latest link: `https://wine-claw.github.io/app-gallery/latest/index.html`
  - app pages: `https://wine-claw.github.io/app-gallery/apps/<date>-<slug>/`
- Gallery UX preference: do not show `Open latest app` or `Refresh gallery` buttons in the gallery hero area; keep it simpler and rely on the stable latest link text plus the app cards themselves.
- The live gallery lives in `app-gallery/` at the workspace root. It is a git worktree of the `wine-claw.github.io` repo.
- To publish: copy app files into `app-gallery/apps/<date>-<slug>/`, update `app-gallery/index.html` and `manifest.json`, update `app-gallery/latest/index.html`, then `git add -A && git commit && git push` from within `app-gallery/`.
- The publisher must include the full app directory tree (including assets) for each app.
- The hosted gallery build must not depend on the dashboard-facing `state.json` `links` list, because Simon may intentionally trim dashboard links for UX reasons. Build the hosted gallery from the durable run folders (and latest-run metadata where helpful) instead.
- Mini-apps should remain unlisted and mobile-friendly by default.
- Hosted mini-apps should include a visible warning banner stating that they are experimental OpenClaw AI mini-apps, untested, not professionally validated, and should not be relied on for any decisions.

## Legacy (DEPRECATED)
- Old gallery: `https://wine-claw.github.io/mini-apps/` — was a redirect, now deleted
- Old FTP target: `grapecrushrush.com/openclaw-mini-apps/` — no longer used
- Old build helper: `tools/publish_mini_apps.py` — no longer used

## Deliverables
Each overnight cycle should aim to produce:
- a selected app concept
- a short rationale for why it was chosen
- working prototype code, mockup, or meaningful partial implementation
- a brief status note describing what works, what does not, and recommended next steps
- an explicit delegation note saying whether `mm-worker` was actually used, what it handled, and what the main agent handled directly
- a link or path when applicable
- enough clarity that Simon can decide whether to promote the mini-app into its own dedicated project for further development

## Constraints
- Do not wait for overnight clarification unless the task is blocked by a genuine hard dependency.
- Keep scope small enough for a meaningful overnight first pass.
- Prefer lightweight stacks and reviewable outputs.
- Do not pretend unfinished work is complete.
- Do not rely on Simon being awake or available to click approval/permission prompts during the overnight run.

## Overnight verification rule
- Avoid approval-dependent browser verification overnight.
- Do not use user-browser attach flows (`profile="user"`) or Browser Relay / attach-tab flows (`profile="chrome-relay"`) in the unattended 2:00 AM run.
- If browser checking is useful, prefer the isolated OpenClaw-managed browser only.
- Prefer non-interactive validation first: local tests, static checks, screenshots, build/lint output, and direct file inspection.
- If verification cannot complete without human interaction, mark the run as `partial verification` rather than stalling or timing out waiting for approval.
- Morning reporting should say plainly what was verified vs what still needs a daytime/manual check.

## Operating note
The overnight run should maintain project notes/state so the morning brief can summarise the result accurately.

## Reliability rule after missed overnight run
If a morning check shows there is no new `runs/YYYY-MM-DD/` folder for the current date, treat that as a real overnight failure, not as ambiguous stale state.

Required response:
- inspect why the scheduled run did not happen or did not complete
- repair the automation path the same day where feasible
- do not let the 7:50 AM brief imply a new overnight app exists when the latest durable run is actually yesterday's
- before the next 2:00 AM window, verify that the scheduled path and any watchdog/preflight needed for the run are in place
- if confidence in the next run is still low, send Simon a brief blocker update rather than silently hoping it works

## Durable packaging rule
A 2am run is not done just because a new app folder exists.

Before the overnight run can be considered complete, it must update all of these consistently:
- the new dated run folder under `runs/YYYY-MM-DD/`
- `latest-summary.md`
- `state.json` (`summary`, `updatedAt`, `primaryLink.label`, and `latestRun`)

If a new app is built but those durable pointers are not rolled forward, treat the run as a **partial packaging failure** and say so plainly in the run note rather than leaving stale project state behind.
