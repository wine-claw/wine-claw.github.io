# WORKFLOWS.md

Source-of-truth procedural workflows for recurring tasks.

## Timed-task automation rule (global)

When Simon asks for something to happen at a specific time, on a schedule, after a delay, or on a recurring cadence, do not rely only on notes, project files, MEMORY, or chat history.

1. Create an explicit OpenClaw cron job for the task in OpenClaw's cron store in the same turn unless Simon explicitly says not to.
2. Treat phrases like these as cron-triggering by default:
   - "every Monday at 9am"
   - "remind me in 20 minutes"
   - "tomorrow morning"
   - "at 3pm"
   - "each week / each month"
   - any other request with a real timing expectation
3. Notes in `MEMORY.md`, `memory/*.md`, `WORKFLOWS.md`, or project files are not a substitute for the actual scheduled job.
4. After creating the cron job, also update the relevant durable docs/project state with the job name/id and intent.
5. If a timed request cannot be safely or correctly represented as an OpenClaw cron job yet, say so immediately and treat that as a blocker rather than pretending the notes are enough.
6. Prefer explicit routing/delivery settings when the job needs to notify Simon, and avoid fragile implicit delivery defaults.
7. For WhatsApp-facing cron jobs, prefer a single delivery owner:
   - use `delivery.mode=none` at the scheduler layer
   - make the agent turn send via the message tool itself when user-visible delivery is required
8. Do not mix scheduler `announce` delivery with payload instructions that also tell the agent to send a WhatsApp message; that split-owner pattern is fragile and can silently fail.
9. When a cron job's real output is not a chat message (for example an email send, file rotation, or background maintenance task), still prefer `delivery.mode=none`; if the run is blocked, have the payload send an explicit WhatsApp blocker message via the message tool.
10. Keep a lightweight audit/check for cron delivery configuration so risky delivery patterns and repeated WhatsApp target errors do not linger unnoticed.

**Done condition:** any user request with a real timing requirement is backed by an explicit OpenClaw cron job, not just remembered or documented, and WhatsApp delivery ownership is unambiguous.

## 0) Documentation update rule (applies to all substantive work)

## 0a) Durable file split rule for WhatsApp-requested work

When Simon asks me to do something via WhatsApp (or the same direct-chat/main-session context), split the durable information by role instead of dumping everything into one place.

1. **Cron jobs** should hold only scheduling/execution ownership details:
   - when something runs
   - who/what it notifies
   - the high-level task intent
   - any critical execution constraints
   They should not be the primary long-form store of business logic, formatting rules, or project knowledge.
2. **`WORKFLOWS.md`** should hold repeatable operating procedure:
   - what the task must include
   - required checks/validation
   - fallback behavior
   - definitions of done
   - how to split responsibility between tools/files
3. **`MEMORY.md`** should hold durable user preferences and long-lived standing instructions:
   - formatting/style preferences
   - recurring inclusions/exclusions
   - durable operating preferences
   It should not usually hold rich project summaries when a project folder already exists.
4. **`memory/YYYY-MM-DD.md`** should log what happened today:
   - the request
   - decisions made
   - fixes applied
   - state changes
   - why something changed
5. **Project folders under `projects/`** should hold the substantive project material:
   - research content
   - implementation notes
   - outputs
   - project-specific state
   - links/files/status
6. For recurring automations requested over WhatsApp, prefer this pattern:
   - cron = thin runner
   - `WORKFLOWS.md` = source-of-truth procedure
   - `MEMORY.md` = Simon's standing preferences
   - project/script/state files = implementation detail
7. If a cron payload starts accumulating a lot of formatting/business rules that duplicate `WORKFLOWS.md`, treat that as drift and simplify it.
8. If `MEMORY.md` starts carrying too much project-specific detail that already lives in a project folder, distill it down to the minimal long-term takeaway.
9. When unsure where new information belongs, ask: is this a **schedule**, a **procedure**, a **preference**, a **today-log**, or **project substance**? Put it in the file type that matches that role.

**Done condition:** WhatsApp-requested work remains understandable and maintainable because schedule, procedure, preference, daily log, and project substance are kept in their proper homes.

When doing meaningful work for the user, do not rely on chat history as the only record.

1. Before finishing the task, update the durable documentation in the same turn.
2. Always update `memory/YYYY-MM-DD.md` for:
   - decisions made
   - fixes applied
   - blockers/root causes found
   - current live state
3. Also update the most relevant durable artifact when applicable:
   - `WORKFLOWS.md` for recurring procedures or changed operating rules
   - `projects/<project-note>.md` for project-specific architecture, links, file paths, caveats, and status
   - `MEMORY.md` only for durable long-term preferences or important long-lived context
4. If a task changes implementation details, documentation is not optional — treat it as part of done.
5. Before telling the user a task is complete, quickly check whether the docs now match reality.
6. Default rule for chat instructions: if the user says something that appears to be a recurring preference, standing instruction, operating rule, formatting rule, or automation requirement, treat it as durable by default unless the user marks it as temporary.
7. For those recurring instructions, update the durable source of truth in the same turn:
   - `WORKFLOWS.md` for procedures/default behaviors/automation rules
   - `MEMORY.md` for durable user preferences
   - the relevant script, config, prompt, or project note when the user explicitly wants the automation itself changed
8. Do not leave recurring instructions only in chat history if they are likely to matter again.
9. When the work is clearly an important long-term implementation (for example a new hosting path, deployment pipeline, recurring delivery mechanism, warning/branding standard, or other durable system behaviour), updating only daily memory is not enough. In the same turn, update the relevant source-of-truth durable files as well (`WORKFLOWS.md`, project README/spec, script/config docs, or other core durable files) so future-you does not forget.

**Done condition:** user-visible work and its durable documentation are updated together, without needing a separate reminder.

## 0ab) Worker-first delegation rule (global)

To preserve Codex quota, default to using the configured `mm-worker` sub-agent much more heavily across suitable tasks instead of keeping most implementation on the main Codex agent.

1. Treat `mm-worker` as the default first-pass engine for suitable heavier-lift work, including:
   - low-risk coding and implementation passes
   - research digestion and synthesis prep
   - document drafting/structuring
   - automation grunt work
   - asset prep
   - repetitive cleanup/refactor passes
   - broad first-pass exploration where a reviewed draft is acceptable
2. Keep the main Codex agent lighter by default, focusing on:
   - orchestration and task framing
   - tool selection and execution strategy
   - quality control and review
   - tricky debugging and edge cases
   - final integration and user-facing judgment calls
3. For overnight, unattended, or non-urgent work, increase delegation rather than decreasing it.
4. Do not reserve `mm-worker` only for mini-apps. This delegation bias applies broadly across suitable tasks.
5. If the worker output is weak, correct course, but do not use one imperfect pass as a reason to stop delegating generally.
6. Before doing a substantial block of coding/research directly on Codex, pause and ask whether that block could instead be pushed to `mm-worker` first.
7. The goal is not zero Codex usage; the goal is to preserve Codex quota for higher-value review, orchestration, and difficult cases while shifting more volume work onto `mm-worker`.
8. When reporting work splits for projects, be honest about the actual balance so delegation drift is visible.

**Done condition:** suitable tasks are handled worker-first by default, and Codex is no longer carrying avoidable bulk implementation work.

## 0aa) Reliability / self-heal rule (global)

When an automation, recurring workflow, background system, or active user task shows drift, partial success, stale outputs, repeated recoverable failures, or slow progress, do not wait for Simon to discover and report it.

1. Prefer detecting inconsistency automatically with lightweight validators/check scripts where practical.
2. If a recurring flow produces conflicting durable state (for example run output vs summary vs published result), treat that as a real failure even if one step technically succeeded.
3. First try to repair the issue directly:
   - refresh stale durable state
   - rerun or narrow the publish step
   - verify the live output
   - update prompts/scripts/workflows so the same failure mode is less likely next time
4. Escalate to Simon only when there is a genuine blocker, external dependency, approval need, or uncertainty that cannot be resolved safely.
5. For recurring scheduled jobs, prefer adding explicit preflight/postflight checks so bad outputs are blocked or downgraded to a clear blocker message rather than being delivered confidently but wrongly.
6. When a reliability issue is fixed, update the durable source of truth in the same turn (`WORKFLOWS.md`, project README/spec, script docs, and daily memory as appropriate).
7. After taking an action with an observable outcome (for example sending a message, publishing a page, updating hosted content, or triggering an automation), verify the result where practical instead of assuming success from an intermediate tool step.
8. If the verification shows the action failed or landed wrongly, take the obvious corrective action directly when it is low-risk and aligned with the user’s request; do not bounce the correction back to Simon as an unnecessary yes/no question.
9. For active tasks, default to forward motion. Do not stall in setup, excuse loops, or overlong status narration when a reasonable next implementation step is available.
10. When Simon challenges progress (for example `why did you stop?` or similar), respond briefly with the concrete status and immediately continue the work rather than slipping into apology/excuse mode.
11. If the work is not done and there is no hard blocker, the default action is to keep pushing toward completion.
12. For direct task execution, adopt the standing posture: **take your time, don't stop till X** — where **X** is the requested done state or explicitly stated condition. Do not stop merely because a reasonable chunk is finished; stop when the asked-for objective is actually met, or when a real blocker / external dependency / approval boundary prevents further progress.
13. When X is not fully achieved yet, prefer continued execution or a brief blocker update over a premature “done for now” style handoff.
14. During live repairs or debugging sessions where Simon is waiting on the result, do not go quiet for long stretches. Send short concrete progress updates roughly every few minutes when meaningful work is still underway, using a compact pattern like:
   - `working:` current action
   - `found:` concrete fault identified
   - `fixed:` change applied
   - `blocked:` real blocker only
   The point is to make it obvious that work is still active rather than silently stalled.

**Done condition:** Simon should not have to act as the routine detector for avoidable automation drift or stalled execution; the system should check itself, repair what it can, keep tasks moving, and surface only real blockers.

## 0b) Low-interaction automation rule (global)

Default to workflows that do not require Simon to be physically at the computer.

1. Prefer unattended, non-interactive paths whenever a first-class tool or automation path exists.
2. Avoid approval-dependent user-interface flows by default, including:
   - browser `profile="user"` attach flows
   - `profile="chrome-relay"` / Browser Relay / attach-tab flows
   - routines likely to pause on macOS/browser permission prompts
3. Prefer these unattended options first:
   - isolated OpenClaw-managed browser
   - direct APIs and OpenClaw tools
   - local scripts, tests, static inspection, screenshots, and file-based verification
4. Only choose a click-dependent/manual approval path when it is clearly necessary to accomplish the task or when Simon explicitly asks for that exact path.
5. If a task would otherwise stall waiting for human interaction, either:
   - switch to a non-interactive method, or
   - continue with a clearly labelled partial result and state exactly what requires manual intervention.
6. Treat newly discovered permission prompts as setup work to eliminate future interruptions where possible.
7. Do not casually route work through Simon's live browser/session if an isolated or API-based path can do the job.

**Done condition:** OpenClaw normally works for Simon without routine clicking/allowing, and manual interaction is requested only when truly necessary.

## 1) Project creation and maintenance workflow

When the user asks me to work on a new project, I should create a durable home for it immediately instead of relying on daily memory files or chat history.

1. Create a dedicated folder under `projects/` for each new project unless there is a strong reason to use an existing project folder.
2. Use a short, stable, descriptive slug for the folder name.
3. Create at least one durable project note inside that folder (normally `README.md` or `PROJECT.md`) capturing:
   - project purpose
   - current status
   - key decisions
   - important file paths
   - next steps
   - blockers/caveats
4. Store project-specific scripts, assets, outputs, experiments, and notes inside that project folder where practical.
5. If the work starts as a quick experiment and later becomes real project work, promote it into a proper `projects/<slug>/` folder as soon as that becomes clear.
6. Use daily memory files only as a log of what happened that day, not as the sole source of truth for project state.
7. When substantial project progress is made, update both:
   - the project’s durable note in `projects/<slug>/`
   - `memory/YYYY-MM-DD.md` with a short record of the work
8. If a project already has a durable home, continue using it rather than scattering notes across multiple places.
9. For very small one-off tasks that clearly are not projects, a dedicated project folder is not required.
10. If unsure whether something counts as a project, err on the side of creating the folder.
11. For long-running projects, prefer this durable pattern over a giant shared ledger:
   - project note = source of truth
   - optional project `state.json` = structured status for automation/UI
   - dedicated cron job only when exact recurring autonomous progress is needed
   - mission-control index/dashboard = summary layer
12. If a project should appear in Wine Claw Project Tracking, its `state.json` is not ad hoc: it must follow the Mission Control state schema in `projects/mission-control/schema.md`.
13. Minimum required fields for any dashboard-tracked project state are:
   - `name`
   - `slug`
   - `status`
   - `summary`
   - `path`
   - `updatedAt`
   - `nextStep`
   - `blocker`
   - `links`
   - `autonomous`
14. Before considering a newly created dashboard-tracked project done, verify that its `state.json` includes the required fields and that Project Tracking still renders/populates correctly.
15. When creating a new dashboard-tracked project, prefer copying the shape of an existing valid `projects/*/state.json` file rather than inventing a reduced schema.
16. Do not use a generic master execution loop as the primary engine for all projects unless there is a strong reason. Prefer per-project runners and per-project state.
17. Heartbeat should be used mainly for lightweight supervision, reminders, and surfacing stale/blocked work — not as the main exact-timing execution mechanism for serious long-running jobs.
18. `projects/mission-control/` is the canonical dashboard layer for long-running work. If Simon asks for a remote overview (for example `show mission control`), generate a WhatsApp-friendly summary from the Mission Control index/state instead of reviving the old shared task ledger pattern.
19. Where helpful, allow status changes through the dashboard itself (for example drag/drop between columns) by updating the relevant project `state.json`, then rebuilding Mission Control.
20. Before considering any dashboard-tracked project update done, verify three things together:
   - the project still appears in a visible Mission Control column
   - the `Project Folder` link resolves to that specific project folder, not the generic `projects/` root
   - any intended primary deliverable link on the card opens the actual deliverable
21. Do not invent ad hoc project statuses in `state.json`. Use the dashboard-supported statuses only unless/until the dashboard schema and renderer are explicitly extended together.
22. `path` in a dashboard project state must point to the main durable note file (normally `README.md`), not merely the folder, so derived folder links stay correct.
23. `autonomous` in a dashboard project state must use the structured object form from the schema, not a bare boolean.
24. If a project includes a user-facing deliverable that Simon is likely to open on phone (for example a PDF, DOCX, PPTX, ZIP, video, or report), do not treat the task as delivered when the file exists only locally. Upload/share it via the natural Drive home or `Downloads`, and send the actual link in chat.
25. For direct-chat project delivery, a local path may be mentioned as implementation detail, but it is not a substitute for a user-usable link or attachment unless Simon explicitly asks for local-only handling.

**Done condition:** each real project has a stable folder under `projects/` with durable notes, files, and status that do not depend on daily memory recall, any project added to Project Tracking uses a valid complete state schema that does not break the dashboard, and phone-usable deliverables are actually shared rather than left only local.

## 2) Video request (YouTube or any other source) -> deliver via Google Drive

When user sends a video URL and asks to download/archive:

1. Inspect available quality options first (for every source where multiple streams/qualities exist).
2. For YouTube, start with `tools/youtube_to_drive.sh inspect <url>` and prefer the workspace-isolated newer yt-dlp toolchain when available, because newer YouTube SABR / JS-challenge / PO-token gating can make older installs show only fallback 360p.
3. Do not conclude "only 360p is available" until I have done a fuller format probe if the first result looks suspiciously shallow.
4. Required fuller YouTube probe before reporting limited availability:
   - run raw format listing with the workspace yt-dlp: `./.venv-ytdlp-test/bin/yt-dlp -F <url>`
   - if needed, also test alternate clients such as:
     - `./.venv-ytdlp-test/bin/yt-dlp --extractor-args 'youtube:player_client=ios' -F <url>`
     - `./.venv-ytdlp-test/bin/yt-dlp --extractor-args 'youtube:player_client=android' -F <url>`
5. When reporting options, include both:
   - combined audio+video formats when available
   - better-quality separate video/audio streams if they can be merged during download
6. If the fuller probe reveals separate video/audio streams above the combined fallback format, present those higher-quality merged possibilities to the user instead of implying they do not exist.
7. Estimate and present approximate file size for each quality option.
8. Ask user to choose quality (e.g., 1080p/720p) before downloading.
9. If only one quality is truly available after the fuller probe, explicitly state that and ask for confirmation before downloading.
10. Download selected version as MP4.
11. Upload MP4 to Google Drive folder: `YouTube Archive` (remote: `gdrive`).
12. Send the Google Drive share link to user.

Technique note from this failure: the helper initially surfaced only the 360p combined format, but a direct raw `yt-dlp -F` probe using the workspace toolchain exposed additional DASH streams (144p/240p/360p/480p plus audio-only tracks). In future, use that raw probe before telling the user that only one format exists.

**Done condition:** user has a working Drive link (not just a local file path), and quality+size options were shown before download when applicable, based on a full enough format probe rather than a shallow first result.

## 2ba) PDF hard-flatten workflow

When Simon asks to `flatten` a PDF, interpret that as **hard flattening** unless he says otherwise.

1. Do not use a light PDF rewrite alone if it preserves selectable/searchable text.
2. Rasterise each page to an image at a sensible reading resolution.
3. Rebuild a new PDF from those page images so the result is effectively image-only pages.
4. Verify that text is no longer recognised as text in the output (for example, text extraction should fail or return essentially nothing useful).
5. Prefer uploading the final hard-flattened PDF to Google Drive and sending the link, using the relevant natural folder or `Downloads` when no better home exists.

**Done condition:** the flattened PDF is image-based and previously recognised text is no longer machine-readable as normal text.

## 2b) Generic download/fetch -> Drive handoff workflow

When Simon asks me to download, fetch, or save a file and there is no obvious existing project/folder home for it:

1. Download/process the file locally as needed.
2. If the item naturally belongs in an existing Drive destination (for example `YouTube Archive`, `Translated Articles`, or `Ezeio Logger`), use that existing home.
3. Otherwise, use/create the Google Drive folder **`Downloads`** as the default holding area.
4. Upload the final user-relevant output to Drive, not just the raw local file, unless Simon explicitly asks for local-only handling.
5. Make the uploaded file shareable by link when appropriate and send Simon the Drive link.
6. Do not stop at "downloaded locally" for normal user-facing download requests unless Simon explicitly wants only a local path.

**Done condition:** generic downloaded items end up in Drive with a share link, using `Downloads` as the default fallback folder when no better home exists.

## 2) Article/document translation workflow (full translation, no summary)

For foreign-language PDFs, DOCX files, and images:

1. Treat a user request like "translate this" as a request to use this full workflow by default, not as a request for a quick inline translation.
2. Produce full English translation (no summarising).
3. Build one combined PDF with:
   - original content first
   - full English translation appended after
4. Upload final PDF to Google Drive folder: `Translated Articles` (remote: `gdrive`).
5. Send Drive share link.
6. Only give a quick inline translation instead if the user explicitly asks for a quick/plain-text translation instead of the normal workflow.
7. For photographed historical pages / old book scans, do not trust the first OCR result blindly. If the extracted text is empty, placeholder-like, or obvious gibberish, retry image OCR with preprocessing (grayscale, autocontrast, upscale, sharpen, suitable page-segmentation) and language-specific OCR when the source language is reasonably guessable.
8. If OCR remains poor after that retry, say so plainly and use a better fallback path rather than pretending the extraction is reliable.

Preferred command:

```bash
/Users/wineclaw/.openclaw/workspace/.venv-docs/bin/python \
  /Users/wineclaw/.openclaw/workspace/tools/translate_any_to_en_drive.py \
  --input <local_path_or_url> \
  --workdir <workdir> \
  --remote gdrive \
  --folder "Translated Articles"
```

**Done condition:** combined PDF uploaded + share link sent.

## 3) Weekly AWRI grant watch workflow

When Simon wants a recurring grant scan for the Australian Wine Research Institute:

1. Run every Monday at 9:00 AM Australia/Adelaide time.
2. Research grants relevant not only to AWRI, but also to vineyards and wineries where useful.
3. Search broadly across these funding-source classes every run, not just Commonwealth/federal grants:
   - Australian federal / Commonwealth grants
   - Australian **state government** grants and programs (especially energy efficiency, sustainability, water, manufacturing, regional development, innovation)
   - relevant **private / philanthropic / corporate** grants or challenge funds (for example Landcare-linked, supermarket/corporate sustainability programs, climate/water funds, foundation-backed programs)
   - highly relevant **international / foreign** grants where an Australian research institute, winery, or consortium could realistically participate, partner, or learn from them
4. Include relevant thematic categories such as:
   - research
   - agriculture
   - technology
   - automation
   - AI
   - agtech
   - autonomous tractors and robots
   - wineries
   - vineyards
   - industry
   - manufacturing
   - energy efficiency
   - climate / emissions / carbon capture
   - water
   - regional development
5. Prioritise Australian opportunities first, then highly relevant international programs if they appear practically relevant.
6. The email should start **directly with the summary table** at the top. Do not add a wordy introductory preamble before the table.
7. For every grant included, capture and report:
   - grant name
   - provider/funder
   - what sort of businesses or organisations can realistically lead/apply
   - whether AWRI is more likely to lead, partner, or simply note it as relevant to vineyards/wineries
   - plain-English description of what the program is actually for / desired topics
   - applications open date
   - applications close date
   - maximum grant value
   - co-funding required
   - what the grant money can be spent on
   - source link
8. Be explicit when a program is structurally a poor fit for AWRI to lead (for example some CRC or ARC-style schemes), rather than merely naming the scheme type.
9. Do not guess open dates, close dates, grant values, co-funding terms, or eligibility details. If a field is not clearly stated, say so.
10. Prefer official grant/funder pages over third-party summaries where possible.
11. Exclude grants that are already closed at send time from the main recommendation table unless they are clearly labelled as background/watchlist context and there is a strong reason to mention them. In normal runs, do **not** clutter the email with stale closed rounds like an already-closed ARC Linkage call.
12. Be more comprehensive than a quick federal-only scan. If a relevant obvious opportunity exists (for example a current carbon capture, water, or energy-efficiency program), missing it is a quality failure.
13. Send a concise HTML summary email to `simon.nordestgaard@awri.com.au` using the default Wine Claw signature unless Simon says otherwise.
14. Keep the writing succinct; avoid wordy grant descriptions. After the table, keep any extra commentary very short.
15. Include an urgency note for grants opening soon or closing soon.
16. Keep a durable project note/state under `projects/awri-grant-watch/` so the recurring work has a stable home.
17. Do not rely on chat memory alone for this recurrence — create and maintain an explicit OpenClaw cron job for the Monday 9:00 AM run.
18. Prefer cron `delivery.mode=none` for this job, because the real output is the email itself; if the run is blocked, have the job send a short explicit WhatsApp blocker message to `+61438193332` rather than relying on implicit announce routing.
19. Before relying on automation, test the first run end-to-end.

**Done condition:** a Monday 9:00 AM AWRI grants summary email is sent with the required fields for each listed grant, using verified source data from a broad enough search (federal + state + private/philanthropic/corporate + relevant international), and the recurring run is backed by an explicit OpenClaw cron job rather than memory alone.

## 2c) Image generation -> WhatsApp delivery workflow

When Simon asks me to generate an image and send/show it in WhatsApp:

1. Use the `image_generate` tool for the requested style/content instead of improvising a local fallback unless the user explicitly wants a quick handmade placeholder.
2. Do **not** assume the generated file path. After generation, locate/confirm the actual output file path before attempting message delivery.
3. Send the image via the `message` tool using that exact confirmed file path.
4. Treat a successful generation step as **not yet complete**; completion requires a successful media send step.
5. Do not mistake a caption-only or text-only WhatsApp message for successful image delivery.
6. If the first send path fails, self-correct immediately with the obvious next step (for example confirming the real output path and resending) instead of asking Simon whether he wants the resend.
7. If Simon replies with something like `where?` after an image-generation request, assume the delivery/display failed and immediately resend the actual generated asset without asking for permission again.
8. When practical, mention clearly whether the image just generated is the actual AI-generated asset or only a fallback workaround.
9. Prefer standard WhatsApp-friendly raster formats (PNG/JPEG) for final delivery.

**Done condition:** Simon receives the actual generated image in WhatsApp, not just a caption or a guessed path, and the workflow uses the real generated file rather than assumptions.

## 3b) Voice note -> action workflow

When Simon sends a voice note asking me to do something operational (for example send an email, create a calendar invite, or perform a structured task):

1. Prefer local unattended transcription first.
2. Use `/Users/wineclaw/.openclaw/workspace/.venv-voice/bin/python /Users/wineclaw/.openclaw/workspace/tools/voice_note_transcribe.py <audio-path>` for local speech-to-text.
3. Keep the voice-note transcription path self-contained and non-interactive so it works from WhatsApp voice notes without extra setup prompts.
4. Treat the transcript as a draft instruction, not perfect truth.
5. If Simon explicitly tells me to send an email or create a meeting invite from a voice note, I do not need to reconfirm the whole action just because it came via voice note.
6. Only confirm critical ambiguities that could misdirect the action, such as:
   - uncertain recipient address
   - uncertain attendee/address book identity
   - uncertain date/time/timezone
   - uncertain title/location/details that materially change the invite/email
7. For meeting invites, default duration is **1 hour** unless Simon explicitly says otherwise.
8. If Simon is giving an explicit instruction in the voice note, do the action without unnecessary reconfirmation; use sensible defaults (like 1 hour for meetings) where a standing rule exists.
9. This also applies to follow-up modifications to an already identified email or calendar item (for example “add this attendee too”): if the target object and intended change are clear enough from recent context, do it directly rather than asking again.
10. If the action details are clear enough, proceed directly.
11. If local transcription tooling breaks, fix the tooling rather than treating voice notes as unsupported.
12. Keep the local transcription environment durable under `.venv-voice` so future voice notes do not require reinstalling dependencies each time.

**Done condition:** Simon can leave a WhatsApp voice note and have it reliably turned into actionable text for downstream tools like email/calendar, with no unnecessary reconfirmation when the instruction is explicit and only targeted clarification when critical details are ambiguous.

## 3c) Post-action confirmation in chat for emails and invites

After I send an email or create/update a meeting invite, I should always report the concrete action details back in chat.

1. For emails, include at minimum:
   - recipient email address(es)
   - subject
   - the main body content actually sent (briefly, but concretely)
   - any notable send metadata when available (for example message id)
2. For meeting invites, include at minimum:
   - attendee email address(es)
   - title
   - date/time and timezone
   - duration
   - location / Meet link if applicable
   - event id or equivalent reference when available
3. Do this even when the action was triggered by a voice note.
4. Do this even when the user did not explicitly ask for a receipt/summary; treat it as default transparency.
5. Keep the confirmation concise but specific enough that Simon can immediately verify what was sent without opening another app.

**Done condition:** every outbound email or calendar action is followed by a concrete in-chat confirmation containing the key details of what was actually sent/created/updated.

## 4) Email send workflow (mandatory signature guardrail)

When user asks to send an email:

1. Use HTML email body (not plain text) unless user explicitly requests plain text only.
2. Include requested message content.
3. Append mandatory signature block:
   - `Cheers,`
   - `Wine Claw`
   - signature image (`https://drive.google.com/uc?export=view&id=1Wgb0Y_e__aO461WuL5wInKtbraXpFXyM`) at 153px height.
4. Send via `gog gmail send`.
5. Report success with returned message id.

Override rule: only omit/change sign-off or image if user explicitly asks.

**Done condition:** email sent and includes signature text + image (unless user override).

## 3d) SwiftBar live plugin workflow

When Simon asks to edit the OpenClaw SwiftBar item, do not assume the workspace copy is live.

1. First check the configured SwiftBar plugin directory:
   - `defaults read com.ameba.SwiftBar PluginDirectory`
2. Treat the plugin inside that directory as the live file.
3. For this machine at the time of writing, the live plugin path is:
   - `/Users/wineclaw/Library/Application Support/SwiftBar/Plugins/openclaw-usage.1m.sh`
4. The runtime/cache files used by the plugin live under:
   - `/Users/wineclaw/.openclaw/swiftbar/`
5. The helper/data-generation script may still live in the workspace, but changing helper code is not the same as changing the live SwiftBar plugin.
6. If a workspace copy exists at `workspace/swiftbar/openclaw-usage.1m.sh`, treat it as a stale/reference copy unless SwiftBar is explicitly configured to use it.
7. Before telling Simon a SwiftBar edit is done, verify that the edit was applied to the live plugin path, not just the workspace copy.
8. If there are duplicate SwiftBar scripts, prefer one clear live file and remove stale duplicates when safe.
9. For the OpenClaw SwiftBar item specifically, the menu should expose component-level health details rather than only a single red/green headline when practical. At minimum, include whether the gateway is reachable/healthy, whether the dashboard is reachable, whether WhatsApp is linked, and whether the displayed status is live or cached.
10. If the top-line indicator goes red, the menu should help explain *why* (for example dashboard unreachable vs gateway down vs WhatsApp unlinked) so Simon can diagnose it at a glance.

**Done condition:** SwiftBar edits are made to the actual live plugin file configured by SwiftBar, duplicate stale copies do not cause confusion, and the menu is informative enough to explain red/degraded states instead of only showing a vague failure color.

## 4) OpenClaw hard reload workflow (for config changes / stuck post-update state)

When OpenClaw seems half-stuck after config changes (search provider switches, auth changes) or after an update, use the hard reload script instead of relying on logout/login.

1. Run: `/Users/wineclaw/.openclaw/bin/openclaw-reload-hard.sh`
2. The script must:
   - stop the gateway
   - unload the LaunchAgent
   - reinstall the LaunchAgent with `openclaw gateway install --force`
   - load/start the LaunchAgent again
   - retry gateway health until healthy
   - attempt a fallback restart automatically if needed
3. After reload, verify:
   - `openclaw --version`
   - `openclaw gateway health`
4. Prefer this script after key config changes before assuming a full macOS logout/login is required.

**Done condition:** OpenClaw returns to a healthy state after key config changes without needing user logout/login.

## 5) OpenClaw remote update workflow (safe path)

When updating OpenClaw locally or remotely, do not use raw `npm install -g openclaw@latest` by itself.

1. Run the safe updater script: `/Users/wineclaw/.openclaw/bin/openclaw-update-safe.sh`
   - optional version pin: `/Users/wineclaw/.openclaw/bin/openclaw-update-safe.sh 2026.3.8`
2. The script must:
   - install the requested/latest OpenClaw version
   - run `openclaw gateway install --force`
   - restart the gateway
   - retry gateway health until healthy
   - attempt a second restart automatically if first health check fails
3. After update, verify:
   - `openclaw --version`
   - `openclaw gateway health`
4. If health still fails after automatic retries, report a blocker immediately instead of assuming logout/login is required.

**Done condition:** OpenClaw updated, gateway healthy, remote messaging path restored without requiring logout/login.

## 6) Main agent delegation to `mm-worker`

When handling normal user requests, the main agent may use the configured sub-agent `mm-worker` as a reviewed first-pass worker for simple, low-risk tasks.

1. Prefer delegating lightweight first-pass work to `mm-worker` when it is mainly transformation rather than final judgment.
2. Be more willing to delegate suitable coding and research work when Simon is not in a hurry, especially overnight / in the middle of the night, since `mm-worker` is configured for high thinking and can spend more effort on a stronger first pass.
2a. For coding work specifically, do not leave `mm-worker` on minimal thinking if a higher-thinking configuration is available. Prefer a reasoning-enabled MiniMax model / thinking setting for coding-oriented delegation.
3. Good delegation candidates include:
   - summarising long text
   - extracting action items / entities / key points
   - reformatting or structuring notes
   - simple classification / tagging
   - drafting rough options or boilerplate
   - first-pass code reading, code summarising, small refactors, and straightforward implementation drafts
4. The main agent must review the `mm-worker` output before replying to the user.
5. The main agent remains responsible for the final answer, including correcting mistakes, filling gaps, and deciding whether further verification is needed.
6. Do not use `mm-worker` as the sole unchecked decider for:
   - final user-facing judgment calls
   - safety-sensitive advice
   - important factual claims that have not been reviewed
   - config changes, destructive actions, or external side effects
   - complex architecture decisions or high-risk code changes without stronger review
7. For coding tasks, `mm-worker` is allowed to do a first pass on low-risk work such as:
   - explaining code
   - identifying likely edit locations
   - drafting small patches
   - writing boilerplate or repetitive code
   - suggesting tests
8. For coding tasks, the main agent should still do the final sanity check before reporting back, and should inspect any significant code change directly rather than trusting the first pass blindly.
9. If a task looks ambiguous, high-impact, or likely to benefit from stronger reasoning, keep it in the main agent instead of delegating.
10. Exception for the `2am-mini-app-creation` project: during the scheduled overnight build, strongly prefer using `mm-worker` for most coding work so the main agent mainly handles selection, orchestration, review, documentation, and morning reporting.
11. Be more aggressive about using `mm-worker` overall. Do not treat it as a rarely used helper. Treat it as the default first-pass worker for suitable low-risk coding, research digestion, UI refinement, document structuring, and option-generation work, especially when Simon is not in a hurry.
12. Default delegation triggers for `mm-worker` include:
   - first-pass implementation of small/medium coding tasks
   - refactor/polish passes on existing apps
   - mobile-friendliness/UI cleanup passes
   - first-pass bug hunts and test suggestions
   - summarising long research or multiple sources into structured notes
   - extracting action items / comparisons / recommendations from long text
   - drafting structured project docs or transforming rough notes into clearer docs
   - generating mini-app content such as timeline entries, quiz questions, explainer copy, scenario lists, or UI text
13. For the scheduled `2am-mini-app-creation` run specifically, the intended operating target is that `mm-worker` should normally handle the majority of the coding work (roughly 60–90% of implementation effort) unless the output quality is clearly poor or the task is unusually small.
14. After a first build or draft exists, prefer sending one additional refinement pass to `mm-worker` when it is likely to improve polish, mobile usability, clarity, or completeness before the main agent does final review.
15. The main agent must still do final judgment, final packaging, and sanity checks before user-visible delivery or important action.
16. For all newly developed mini-apps going forward, optimise for phone use by default unless Simon explicitly asks for a desktop-first design. That means prioritising mobile layout, touch-friendly controls, legible typography on small screens, lightweight interaction patterns, and avoiding assumptions about wide viewports or hover-only affordances.
16b. **For all mini-apps (overnight 2am runs and user-requested), do substantive web research before building.** Search for authoritative sources, real data, historical facts, technical specifications, and best practices. Do not rely only on internal knowledge. Include the sources found in the app content or a references section.
16c. **Include real images, diagrams, and visual assets from the web where appropriate.** Use `image_generate` for custom illustrations, but also search for and include actual photographs, diagrams, charts, and technical drawings from authoritative sources (manufacturer sites, technical manuals, academic papers, Wikipedia). Provide image attribution and links where applicable.
16d. **Provide references and citations** in mini-apps. Link to source pages, cite technical standards, attribute historical facts, and include further reading links. An app without references is less useful than one with them.
16e. **Before building a mini-app, verify the accuracy of key facts** through at least one web search or reference lookup. Do not guess specifications, historical dates, technical parameters, or product details.
17. For every scheduled `2am-mini-app-creation` run, record delegation explicitly in the durable run output. At minimum, the run summary or run note must say:
   - whether `mm-worker` was actually used
   - what it handled (for example implementation, refactor, debugging, research)
   - what the main agent handled directly
   - if `mm-worker` was intended but not used, why not
18. The morning-summary-ready artifact for each overnight mini-app run must make that delegation status easy to answer later without needing transcript archaeology.
19. If the overnight run is still in progress or spans midnight/day boundaries, the run note should clearly identify the run date and the app date so questions like "was that this morning or yesterday?" are easy to answer.
20. Before an overnight mini-app run is treated as complete, verify that all durable packaging pointers were updated consistently:
   - the new dated run folder exists
   - `projects/2am-mini-app-creation/latest-summary.md` reflects that run
   - `projects/2am-mini-app-creation/state.json` `latestRun` / summary / labels reflect that run
   If those disagree, treat the run as a packaging failure or partial result, not a successful completed run.
21. For unattended overnight work, do not depend on approval-required browser flows. Avoid browser actions that may require Simon to click Allow, approve browser attach, click a toolbar relay button, or otherwise interact with the Mac.
22. Specifically for unattended overnight verification, do not use `browser` with `profile="user"` or `profile="chrome-relay"` unless Simon has explicitly asked for a user-browser flow and is available to interact.
23. If browser verification is useful overnight, prefer the isolated OpenClaw-managed browser only, plus non-interactive checks such as local tests, static file inspection, screenshots, and build/lint validation.
24. If unattended browser verification still cannot run reliably, do not block the overnight mini-app on it. Skip that step, record `partial verification`, and explain exactly what remains unverified in the morning brief/project note.
25. Treat any macOS/browser permission prompt discovered during daytime testing as a setup task to resolve proactively before relying on that verification path overnight.
26. **For all mini-apps (overnight 2am or user-requested): after building, always publish to the app gallery.** Do not ask Simon — just do it. Use `tools/publish_to_gallery.py` or equivalent to:
   - copy the app to `app-gallery/apps/<date>-<slug>/`
   - insert a card into `app-gallery/index.html`
   - commit and push to GitHub Pages
27. After publishing, send Simon a WhatsApp message that includes the direct app link and the gallery link so he can access it from his phone.
28. If publishing fails, treat that as a packaging failure — the app build is not complete until it is live in the gallery.
29. **After publishing, verify the app works.** Open the gallery URL, navigate to the new app, test basic functionality (links load, interactive elements work, no console errors). If problems are found, fix them before reporting completion.

**Done condition:** the main agent can use `mm-worker` to save Codex time on easy first-pass work, while the main agent still verifies the result before the user sees it, and unattended overnight runs avoid approval-dependent browser flows.

## 6b) OpenClaw use-case watch workflow

When Simon wants a rolling summary of the best OpenClaw use cases found on the internet, plus ongoing discovery:

1. Create and maintain a durable project home under `projects/openclaw-use-case-watch/`.
2. Keep at least these durable files current:
   - `README.md` for the curated summary and process
   - `latest-summary.md` for the latest scan result
   - `history.md` for dated additions/changes
   - `brief-picks.json` for concise ready-to-reuse examples if needed later
   - `state.json` for Mission Control status
3. Create an explicit OpenClaw cron job for the nightly scan if Simon asked for ongoing discovery.
4. For the nightly scan, run at the user-requested time in Australia/Adelaide unless Simon says otherwise.
5. Search for genuinely new OpenClaw use cases, showcases, demos, community writeups, blog posts, and public real-usage posts.
6. Do not use GitHub repos/lists as the primary evidence for the `best uses` summary; use them only as discovery aids if they lead to a better public source.
7. Prefer concrete real-world usage over vague SEO pages.
8. Apply search discipline during recurring discovery/research work: use local durable sources and direct fetches first where they are sufficient, then use the active Google/Gemini `web_search` provider freely when it materially helps the work, then DuckDuckGo as a cheap fallback where appropriate, and use paid Brave search only when it materially improves the result beyond those routes.
9. Do not be artificially stingy with the active Google/Gemini search allowance. If a meaningful daily free quota is available (for example ~30 searches/day), it is acceptable to use that full free quota when legitimate project/research needs justify it.
10. In `brief-picks.json`, keep the freshest/highest-signal concise examples first for future reuse if useful.
9. Each entry in `brief-picks.json` should stay concise and include:
   - title
   - one-sentence summary
   - source URL
   - freshness marker
   - added timestamp
10. For the Mission Control / Wine Claw Project Tracking dashboard only, the `OpenClaw Use Case Watch` project should expose at most one visible quick-link item per added date. The markdown/history/project files can keep multiple same-day examples, but the dashboard card should collapse to one representative link per day to avoid clutter.
11. If nothing genuinely new is found, say so honestly and keep the best queued examples rather than inventing novelty.

**Done condition:** the project exists, the nightly scan is backed by cron, and the source queue is durable rather than living only in chat.

## 6bb) Mission Control stale-project driver workflow

When Mission Control marks a project as stale, do not treat that state as merely informational by default.

1. Distinguish **monitoring stale** from **active stale**:
   - monitoring stale = may only need dashboard/state refresh
   - active stale = should create pressure to allocate real work time
2. For any project that is both:
   - `status: active`, and
   - stale beyond the configured threshold,
   the default next action during available unattended time is to attempt a **real progress pass** on that project unless there is a stronger explicitly scheduled priority.
3. The stale checker should be treated as a prioritisation input, not just a UI refresh trigger.
4. If multiple active projects are stale, prefer in this order:
   - direct user-requested active project
   - blocked project with a likely self-heal path
   - highest-value active project with the oldest staleness
   - background/watch projects last
5. Non-urgent watch/monitor projects must not routinely displace direct active project work during free overnight hours.
6. Between a completed overnight mini-app run and the morning brief, free time should normally be used for stale **active** projects before optional side research on unrelated projects.
7. If a stale active project is skipped despite available time, record the concrete reason in daily memory; `routine cron maintenance` is not, by itself, a sufficient reason.
8. Mission Control stale checks should ideally hand off into one of three outcomes:
   - no action needed
   - send alert because genuinely blocked/newly stale
   - do a bounded work pass on the stale active project
9. A bounded work pass means producing actual project progress: updated notes, code, research synthesis, implementation draft, deliverable improvement, or blocker reduction — not only rebuilding dashboard metadata.
10. For overnight/autonomous periods, prefer at least one meaningful bounded work pass on the highest-priority stale active project before spending discretionary time on lower-priority maintenance.
11. If a recurring project already has its own autonomous cron/job, stale detection should still bias free unscheduled time toward that project rather than assuming the cron alone is enough.
12. The stale checker’s purpose is therefore twofold:
   - surface stale/blocked status to Mission Control
   - drive work allocation toward neglected active projects

**Done condition:** stale active projects trigger either real progress work or a clearly logged reason they were not worked on; the stale checker is a driver for execution priority, not just a passive dashboard updater.

## 6c) Cron audit / cleanup workflow

When Simon asks whether cron setup is correct or asks for cron cleanup, audit the live cron store instead of guessing.

1. Inspect the live jobs in `~/.openclaw/cron/jobs.json` and/or use the cron list tool.
2. Prefer the safer delivery pattern for WhatsApp-facing jobs:
   - `delivery.mode = none`
   - the payload itself sends via the message tool with explicit channel/target/account when user-visible delivery is required
3. Treat these as risky patterns to clean up:
   - scheduler `announce` delivery to WhatsApp without explicit target
   - mixed ownership where scheduler delivery and payload message sending both try to deliver
   - stale disabled test jobs that only preserve confusing historical errors
4. Keep watchdog/audit jobs if they are still useful, but remove stale disabled one-off test jobs when safe.
5. When auditing failures, distinguish between:
   - **cron setup/delivery problems**
   - **runtime/tool failures during an otherwise-correct cron run**
6. If a cron job calls a local script, inspect the script itself before blaming cron. A corrupted or half-edited script can look like a scheduler problem.
7. After cleanup, update durable notes with:
   - what was removed
   - what remains active
   - any real live issues still needing follow-up

**Done condition:** cron store is understandable, stale disabled clutter is removed, WhatsApp delivery ownership is unambiguous, and real runtime failures are not misdiagnosed as scheduler design problems.

## 7) Ezeio Google Sheet sync workflow

When user wants Ezeio logger data synced into Google Sheets:

Drive location rule:
- Ezeio-related files should be created/stored in the Google Drive folder **`Ezeio Logger`** rather than Drive root unless the user explicitly says otherwise.

1. Use Ezeio digest auth with API key ID as username and API key as password.
2. Verify `status` and `samplelog` first, but do not assume they expose full fast-log resolution.
3. If the user needs true fast-log data (for example 5-second logging), use the Ezeio `subscribe` websocket API and collect `LOGDATA` rather than relying on coarse REST endpoints.
4. Main data tab should be a single merged table named **`Ezeio Data`**.
5. Sheet structure should be:
   - row 1 = field names
   - row 2 = units
   - one row per merged timestamp
   - no separate `logger` column in the final merged layout
6. Formatting rule for the main data tab should remain:
   - rows 1-2 bold
   - row 3 onward not bold
   - time column formatted as `yyyy-mm-dd hh:mm:ss`
7. Preferred data-column order for `Ezeio Data` is:
   - `Bladder-Out-O2`
   - `PointUse-O2`
   - `Bladder-Out-RH`
   - `Post-Membrane-RH`
   - `PointUse-RH`
   - `PointUse-DewPt`
   - `Bladder-Out-T`
   - `PointUse-T`
   - `M628-P`
   - `M629-P`
   - `M630-P`
   - `M631-P`
   - `Bladder-In-P`
8. If formatting drifts, repair it directly in Google Sheets / Sheets API rather than only changing the collector logic, because value-writing and visual formatting are separate.
9. When using `gog sheets format` on a tab with spaces in its name, quote the sheet name inside the A1 range (example: `"'Ezeio Data'!A1:M2"`).
10. Workbook rotation rule: rotate the live Ezeio workbook every 6 days, anchored from `2026-03-22 12:00 PM` Australia/Adelaide time.
11. Each rotation should:
   - copy the full live workbook so charts/template structure are preserved
   - create the new live workbook in the Google Drive folder `Ezeio Logger`
   - include the new workbook start date/time in the file name
   - clear live data rows in the new workbook while keeping headers/units/charts
   - explicitly reapply formatting across a generous future data range so only rows 1-2 stay bold and later data rows do not inherit copied all-bold formatting
   - update `/Users/wineclaw/.openclaw/credentials/ezeio-sync.json` to the new spreadsheet ID
   - update the durable project/dashboard `Live sheet` link so it always points at the newly rotated current workbook
   - restart the Ezeio collector/watchdog so new data lands in the new workbook
12. Keep old workbooks as historical snapshots rather than overwriting them.
13. Merge logger rows by timestamp, and if the two logger payloads arrive slightly offset, merge complementary rows within a small tolerance window (currently about 2 seconds) rather than leaving split rows.
7. Keep data sorted by time, and if any backfill appends older rows, re-sort afterward.
8. Store sync credentials/config locally, not in chat replies.
9. Use a local state file to avoid duplicate appends.
10. Write every received fast-log event to a local append-only archive so the sheet is not the only copy.
11. Run the fast-log collector as a persistent LaunchAgent on this Mac, logging to a local file for troubleshooting.
12. Run a watchdog LaunchAgent that alerts locally and sends a WhatsApp alert if no fresh data arrives for too long.
13. Keep a best-effort backfill script for outage recovery, but do not assume perfect 5-second reconstruction from REST history.
14. If the sheet/tab name is changed, update the collector configuration/script immediately so writes do not silently fail.
15. If charts are requested, prefer dedicated chart tabs with clear names rather than ambiguous default chart-sheet names.
16. If the collector host or internet connection is down long enough to create a live data gap, treat post-outage recovery as part of the normal workflow. Once connectivity is back, run a best-effort historical backfill from the Ezeio API into the live workbook without waiting to be reminded.
17. Be explicit about the recoverable coverage actually returned by the API (for example `05:52–12:31 recovered; 00:27–05:51 unavailable`) rather than implying the whole outage was repaired when only part of it was.
18. Do not rotate/reset the workbook schedule as part of outage recovery unless Simon explicitly asks for that next step after the data backfill is verified.

**Done condition:** merged data tab is live and correctly named, local archive active, watchdog active, backfill path documented, and charts/tabs reflect the current sheet structure.


## 6bb) Daily 8:00 AM WhatsApp brief workflow

When generating Simon's daily 8:00 AM WhatsApp brief, treat this workflow as the source of truth.

1. Schedule it for **8:00 AM Australia/Adelaide every day**.
2. Use a single delivery owner:
   - cron `delivery.mode=none`
   - the agent turn itself sends the WhatsApp message via the `message` tool
3. Format the brief for WhatsApp as clean plain text with short labelled blocks and one item per line. Avoid dense paragraphs. Use simple bullets or dash-prefixed lines only; do not use markdown tables.
4. Include **only the currently active model name** — not the full fallback chain, not config settings. The active model is the one the main agent is actually running on right now.
5. Include usage stats for **OpenAI GPT Plus** (5h and weekly windows with remaining % and reset times).
6. Include **OpenClaw version status**:
   - detect the installed local version
   - compare with the latest published stable release
   - if current, say so briefly and definitively
   - if behind, say so briefly and include a short summary of the latest release's most relevant changes
7. Include **overnight 2am mini-app** from `projects/2am-mini-app-creation/state.json` as the primary source of truth:
   - app name
   - % work split between agents/sub-agents
   - only the overnight 2am app goes here, not extras
8. Include **extra mini-apps** created in the last 24h separately (any runs in `projects/2am-mini-app-creation/runs/` that are not the overnight 2am app):
   - app name + date
   - % work split between agents/sub-agents
9. If no mini-apps were created, say so plainly rather than omitting the section.
10. Summarise **last-24h activity** from daily memory files.
11. Include **next-24h suggestions**.
12. Include exactly **one novel OpenClaw use case** from web search (HN, Reddit, etc.).
13. Keep the brief **concise** — WhatsApp-friendly, not a wall of text.
14. If the brief cannot be fully generated, send a short explicit WhatsApp blocker message instead of failing silently.

**Done condition:** Simon receives one concise WhatsApp brief at 8:00 AM each day with the active model, OpenAI usage, OpenClaw version, overnight + extra mini-apps with agent splits, activity summary, suggestions, and one novel use case.
