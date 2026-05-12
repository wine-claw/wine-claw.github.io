# Long-Term Memory

## Verification Failures & Lessons (2026-05-12)

Recent pattern: declaring things fixed when only the local copy was correct. Root cause was not checking deployed/live state.

**Weather Sheet (6am cron):** Rebuilt native Google Sheet on 2026-05-11. Did NOT update the 6am cron to use the new `bom_weather_sheet_append.py`. Cron ran old `bom_weather_daily.py` → `bom_weather_drive.py`, created broken .xlsx, overwrote the Sheet. Lesson: **when rebuilding a workflow, update the cron that triggers it.**

**Phyllotaxis canvas fix:** Fixed local file, committed, but didn't verify what GitHub Pages actually served. Declared "fixed" twice while CDN still served old version. Lesson: **check deployed URL, not just local file.**

**Gallery duplicates:** Fixed local index.html but didn't check the deployed gallery. Also missed that `publish_mini_app.py` could create duplicates. Lesson: **check the live system AND the script that generates it.**

**Daily brief delivery:** Cron ran successfully but delivery was silently blocked due to WhatsApp→Telegram cross-context mismatch. Didn't verify the message actually arrived. Lesson: **check the delivery path, not just the cron execution.**

**Fix applied:** Added "Verification Habits" section to `AGENTS.md` that I read every session.

## 2am Mini-App Theme Broadening + Interestness Shift (2026-04-27)

Simon explicitly corrected: the 2am mini-apps had become too generic and too wine-focused. He wants them **broadened beyond vineyard and winery** — not just rotating the UX pattern while keeping the same domain. He also wants them **more interesting** — toys and discovery tools he wants to poke at, not dense reference pages.

Updated durable instructions in:
- `projects/2am-mini-app-creation/README.md`
- `projects/2am-mini-app-creation/SPEC.md`
- `projects/2am-mini-app-creation/state.json`

Key changes:
- Theme pool now explicitly covers: agriculture, engineering, environmental science, food science (not just wine), history/geography, robotics/electronics, physics/chemistry demos, data viz, and playful toys
- Added a domain-rotation rule: actively rotate the **subject domain** across consecutive nights, not just the archetype
- Added explicit anti-clustering: "wine-themed app after another wine-themed app" and "dense reference guide after another dense reference guide"
- **Added interestingness rule: prefer interesting over useful.** A mini-app should feel like a toy or discovery tool — something Simon wants to poke at, not just read. Avoid dense reference pages, encyclopedia entries, and "here is information about X" browsers.
- **Added "What makes a mini-app interesting" section** with concrete examples:
  - More interesting: playable/sandboxy, counter-intuitive, decision-driven, visually satisfying, personal/story-like, skill-based/puzzle-like
  - Less interesting: dense reference guides, timeline browsers, compare tables, explainer pages, pure calculators
  - Concrete archetypes: build/tweak and watch, guess/challenge modes, physics sandboxes, decision scenarios, pattern generators, visual illusions, speed mini-games, "what if" simulators

Recent apps that meet the new standard:
- 2026-04-25: Soil Water Infiltration Simulator (agriculture — interactive canvas with wetting front)
- 2026-04-26: Hydraulic Ram Pump Simulator (engineering — animated SVG cross-section)
- 2026-04-27: Fermentation Comparison Atlas (food science — side-by-side animated comparison)


## Promoted From Short-Term Memory (2026-04-26)

<!-- openclaw-memory-promotion:memory:memory/2026-04-09.md:30:31 -->
- - 22:15 ACST — Mission Control stale-project cron run: executed `tools/mission_control_stale_check.py` and rebuilt with `tools/mission_control_build.py`. Checker change set still only shows `CO2 Capture Trial Data Logging` (`293.5h`) stale while monitoring and `Grant Watch` (`254.2h`) stale while active. No newly stale projects and no newly blocked projects detected versus the prior run, so no normal-channel interruption was sent; durable state was updated quietly. - 23:15 ACST — Mission Control stale-project cron run: executed `tools/mission_control_stale_check.py` and rebuilt with `tools/mission_control_build.py`. Checker change set still only shows `CO2 Capture Trial Data Logging` (`294.5h`) stale while monitoring and `Grant Watch` (`255.2h`) stale while active. No newly stale projects and no newly blocked projects detected versus the prior run, so no normal-channel interruption was sent; durable state was updated quietly. [score=0.837 recalls=4 avg=0.527 source=memory/2026-04-09.md:30-31]

## Promoted From Short-Term Memory (2026-04-28)

<!-- openclaw-memory-promotion:memory:memory/2026-04-03.md:15:17 -->
- - 16:33 ACDT — Added recurring cron job `vineyard-guidance-lines background research` (`95f4ea56-8fd1-470d-a0b0-eb0b6aaf0366`) to work the project every 6 hours in isolated mode. The job progresses durable research notes, keeps focus on low-cost/QGIS-integrated methods, sends no routine chatter, and only messages Simon when the package is review-ready or genuinely blocked. - 16:37 ACDT — Updated the 2am mini-app durable instructions again. The overnight run should now also use `projects/mission-advancement-ideas/README.md` as one candidate-idea pool, while still keeping vineyard/viticulture ideas in the rotation. Added a stronger design/research requirement: do more web/domain/design research before building, and be more willing to source/download suitable images or generate original images to improve app quality while staying cost-aware. Updated `MEMORY.md`, the 2am project `README.md`, `SPEC.md`, and the live 2am cron payload. - 17:09 ACDT — Important scoping correction for `projects/vineyard-guidance-lines/`: do not let the work drift too heavily into generic NDVI / precision-viticulture mapping. Simon wants the workflow to recognise structural cues such as the bottoms of vineyard posts even when imagery is not directly nadir, and to draw/adapt row lines when rows are not perfectly straight. Updated the project `README.md`, `RESEARCH-PLAN.md`, and `state.json` to refocus the research around post/trellis detection, oblique imagery, and curved-row guidance fitting. [score=0.879 recalls=6 avg=0.384 source=memory/2026-04-03.md:15-17]

## Promoted From Short-Term Memory (2026-04-29)

<!-- openclaw-memory-promotion:memory:memory/2026-04-20.md:75:90 -->
- ## 04:11 - Mission Control stale check (cron) - CO2 Capture Trial Data Logging: still stale (195.2h) - Grant Watch: still stale (509.7h) - No newly stale projects; no notification needed. - Mission Control rebuilt. ## 15:41 - Mission Control stale check (cron) - CO2 Capture Trial Data Logging: still stale (197.2h) - Grant Watch: still stale (511.7h) - No newly stale/blocked projects. Quiet update. ## 18:41 - Mission Control stale check (cron) - CO2 Capture Trial Data Logging: still stale (200.2h) - Grant Watch: still stale (514.7h) - No newly stale/blocked projects. Quiet update. [score=0.861 recalls=5 avg=0.543 source=memory/2026-04-20.md:75-90]

## Promoted From Short-Term Memory (2026-04-30)

<!-- openclaw-memory-promotion:memory:memory/2026-04-24.md:1:2 -->
- - 00:41 ACST — Mission Control stale-project cron run. Stale projects unchanged from prior runs: CO2 Capture Trial Data Logging (278.2h, monitoring), 2am Mini-App Creation (190.4h, active), OpenClaw Use Case Watch (191.7h, active), Grant Watch (592.7h, active). No newly stale/blocked projects; no interruption sent. - 12:41 ACST — Mission Control stale-project cron run. Stale projects unchanged: CO2 Capture Trial Data Logging (290.2h, monitoring), Grant Watch (604.7h, active). No newly stale/blocked projects; Mission Control rebuilt. Quiet update. [score=0.844 recalls=1 avg=0.595 source=memory/2026-04-24.md:1-2]

## Promoted From Short-Term Memory (2026-05-05)

<!-- openclaw-memory-promotion:memory:memory/2026-04-27.md:3:4 -->
- **Time:** 18:41 ACST (09:11 UTC) **Triggered by:** cron stale-project checker [score=0.896 recalls=0 avg=0.620 source=memory/2026-04-27.md:3-4]
<!-- openclaw-memory-promotion:memory:memory/2026-04-27.md:13:16 -->
- | Project | Stale For | Status | |---------|-----------|--------| | Voice AI For When Driving | 706h (~29 days) | blocked | | Tank Insulation Tool | 821h (~34 days) | blocked | [score=0.896 recalls=0 avg=0.620 source=memory/2026-04-27.md:13-16]
<!-- openclaw-memory-promotion:memory:memory/2026-04-27.md:20:20 -->
- No urgent interruption warranted — logged here for next main-session review. Both projects have been blocked for ~1 month with no forward motion. [score=0.896 recalls=0 avg=0.620 source=memory/2026-04-27.md:20-20]
<!-- openclaw-memory-promotion:memory:memory/2026-04-27.md:26:27 -->
- **Time:** 23:41 ACST (14:11 UTC) **Triggered by:** cron stale-project checker [score=0.896 recalls=0 avg=0.620 source=memory/2026-04-27.md:26-27]
<!-- openclaw-memory-promotion:memory:memory/2026-04-28.md:4:4 -->
- Ran stale check + rebuild. [score=0.896 recalls=0 avg=0.620 source=memory/2026-04-28.md:4-4]

## Promoted From Short-Term Memory (2026-05-06)

<!-- openclaw-memory-promotion:memory:memory/2026-04-28.md:7:7 -->
- Ran stale check + rebuild. Changed: 3 projects. [score=0.896 recalls=0 avg=0.620 source=memory/2026-04-28.md:7-7]
<!-- openclaw-memory-promotion:memory:memory/2026-04-28.md:22:22 -->
- Second run of the day. Results unchanged from 14:41: [score=0.890 recalls=0 avg=0.620 source=memory/2026-04-28.md:22-22]

## Promoted From Short-Term Memory (2026-05-07)

<!-- openclaw-memory-promotion:memory:memory/2026-04-29.md:9:12 -->
- | Project | Status | Hours stale | Change? | |---------|--------|-------------|---------| | Voice AI For When Driving | Blocked / monitoring | 754.1h | Unchanged — still stale | | Tank Insulation Tool | Blocked / monitoring | 869.4h | Unchanged — still stale | [score=0.890 recalls=0 avg=0.620 source=memory/2026-04-29.md:9-12]
<!-- openclaw-memory-promotion:memory:memory/2026-04-29.md:15:15 -->
- No meaningful new state changes. No interruption sent. Both projects remain in the same "blocked/monitoring" state as earlier today — no action needed until external signals appear. [score=0.890 recalls=0 avg=0.620 source=memory/2026-04-29.md:15-15]
<!-- openclaw-memory-promotion:memory:memory/2026-04-29.md:30:33 -->
- | Project | Status | Hours stale | Change? | |---------|--------|-------------|---------| | Voice AI For When Driving | Blocked / monitoring | 758.1h | Unchanged — still stale | | Tank Insulation Tool | Blocked / monitoring | 873.4h | Unchanged — still stale | [score=0.890 recalls=0 avg=0.620 source=memory/2026-04-29.md:30-33]
<!-- openclaw-memory-promotion:memory:memory/2026-04-29.md:36:36 -->
- No meaningful new state changes. No interruption sent. Both projects remain in the same blocked/monitoring state as the 18:41 run; durable Mission Control state was rebuilt quietly. [score=0.890 recalls=0 avg=0.620 source=memory/2026-04-29.md:36-36]

## Promoted From Short-Term Memory (2026-05-08)

<!-- openclaw-memory-promotion:memory:memory/2026-04-30.md:4:4 -->
- Ran stale check + rebuild. [score=0.896 recalls=0 avg=0.620 source=memory/2026-04-30.md:4-4]
<!-- openclaw-memory-promotion:memory:memory/2026-04-30.md:6:6 -->
- **Newly stale:** [score=0.886 recalls=0 avg=0.620 source=memory/2026-04-30.md:6-6]
<!-- openclaw-memory-promotion:memory:memory/2026-04-30.md:11:11 -->
- Mission Control JSON rebuilt. [score=0.886 recalls=0 avg=0.620 source=memory/2026-04-30.md:11-11]

## Promoted From Short-Term Memory (2026-05-09)

<!-- openclaw-memory-promotion:memory:memory/2026-05-03.md:4:4 -->
- Simon sent a German ad image (Kubota pruning equipment: "Erkennt und schneidet Knospen, Äste und Stängel – für gesündere Pflanzen und gleichbleibende Qualität"). I translated it inline. [score=0.874 recalls=0 avg=0.620 source=memory/2026-05-03.md:4-4]
<!-- openclaw-memory-promotion:memory:memory/2026-05-03.md:8:8 -->
- **Clarified standing rule with Simon:** [score=0.874 recalls=0 avg=0.620 source=memory/2026-05-03.md:8-8]

## Promoted From Short-Term Memory (2026-05-10)

<!-- openclaw-memory-promotion:memory:memory/2026-03-31.md:3:4 -->
- - 02:00–02:26 ACDT — Overnight 2am mini-app run completed for `2am-mini-app-creation`. Built **Vintage Ops Whiteboard**, a mobile-first shift handover prioritisation board for winery operations, in `/Users/wineclaw/.openclaw/workspace/projects/2am-mini-app-creation/runs/2026-03-31/vintage-ops-whiteboard/`. `minimax-worker` handled most of the implementation (roughly **95% minimax-worker / 5% main agent**), including the single-file HTML/CSS/JS app, interaction logic, winery seed cards, README, and run summary. The app supports four priority lanes, tap-first card management, handover summary generation, and localStorage persistence. Verification status: **partial unattended verification**; a manual browser spot-check is still advisable. - 02:26 ACDT — Cron run: executed `tools/mission_control_stale_check.py` and rebuilt Mission Control with `tools/mission_control_build.py`. Changed stale set after rebuild: `Mission Advancement Ideas` (`196.6h`) remains stale and `2am Mini-App Creation` newly tipped stale at `24.2h` while still active. Chose not to interrupt Simon on the normal reply channel at this hour because the change is low-urgency/overnight rather than blocked; durable state updated quietly. [score=0.902 recalls=7 avg=0.386 source=memory/2026-03-31.md:3-4]
<!-- openclaw-memory-promotion:memory:memory/2026-04-01.md:3:4 -->
- - 02:00–02:16 ACDT — Overnight 2am mini-app run completed for `2am-mini-app-creation`. Built **Cellar Cascade Playground**, a mobile-first winery systems sandbox / ripple simulation, in `/Users/wineclaw/.openclaw/workspace/projects/2am-mini-app-creation/runs/2026-04-01/cellar-cascade-playground/`. This deliberately changed pattern again after a workflow helper, scenario trainer, historical browser, and calculator streak — tonight’s shape was **simulation / systems-thinking visual explainer**. `minimax-worker` handled most of the coding work (about **90% minimax-worker / 10% main agent**), including the first-pass app structure, styling, simulation logic, presets, ripple board, README, and run summary. Main agent handled concept selection, review, one offline-consistency cleanup, unattended browser smoke checks, and project/state packaging. Verification status: **good unattended verification** (`node --check`, isolated local HTTP/browser smoke test, preset/outcome update evaluation, screenshot captured). Caveat: the hosted publish was not refreshed during this overnight run, so the stable hosted `latest` link may still point to the previous app until a separate publish step is run. - 02:26 ACDT — Cron run: executed `tools/mission_control_stale_check.py` and rebuilt Mission Control with `tools/mission_control_build.py`. Changed stale set after rebuild: `Mission Advancement Ideas` (`220.6h`) remains stale while active, `CO2 Capture Trial Data Logging` (`80.6h`) remains stale while monitoring, and `Grant Watch` (`41.4h`) remains stale while active. No project newly became stale/blocked in a meaningfully interruption-worthy way, so no normal-channel update was sent; durable state updated quietly. [score=0.886 recalls=6 avg=0.398 source=memory/2026-04-01.md:3-4]
<!-- openclaw-memory-promotion:memory:memory/2026-05-03.md:6:6 -->
- Simon then asked whether I followed "his workflow" for translations. There was no dedicated quick-translation workflow in WORKFLOWS.md — only the full PDF/image document translation workflow. [score=0.875 recalls=0 avg=0.620 source=memory/2026-05-03.md:6-6]
<!-- openclaw-memory-promotion:memory:memory/2026-05-03.md:12:12 -->
- Updated `WORKFLOWS.md` section 2 with the speed rule. [score=0.875 recalls=0 avg=0.620 source=memory/2026-05-03.md:12-12]

## Promoted From Short-Term Memory (2026-05-12)

<!-- openclaw-memory-promotion:memory:memory/2026-05-05.md:11:11 -->
- **Critical constraints from Simon, captured directly:** [score=0.873 recalls=0 avg=0.620 source=memory/2026-05-05.md:11-11]
