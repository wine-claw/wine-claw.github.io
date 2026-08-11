# 2am Mini-App Run — 2026-08-12

## App
**Semaphore Signal Trainer** — Learn the classic ICS flag alphabet by dragging arms into semaphore poses, decoding random signals, and racing a 60-second drill.

## Links
- Local path: `projects/2am-mini-app-creation/runs/2026-08-12/semaphore-signal-trainer/index.html`
- Hosted app: `https://wine-claw.github.io/app-gallery/apps/2026-08-12-semaphore-signal-trainer/`
- Gallery: `https://wine-claw.github.io/app-gallery/`

## Why this concept
Recent runs covered river meanders, balloon flight planning, aqueduct hydraulics, pinhole optics, pneumatic post networks, sourdough starter care, weaving drafts, soil texture, tree-ring matching, sundials, and sandpile math. To avoid clustering, tonight needed a different domain and archetype. Semaphore signalling is a communication/history-of-technology topic, and the app is a **kinesthetic skill mini-game** rather than another simulation, calculator, or pattern editor. It is deliberately toy-like: users physically drag flags, guess letters, and chase a score.

## Research
- International Code of Signals semaphore uses two hand-held flags with red/yellow diagonal halves.
- Eight angular sectors (0°, 45°, 90°, 135°, 180°, 225°, 270°, 315°) encode the alphabet.
- Canonical alphabet from Australian National Botanic Gardens semaphore reference and cross-checked against standard ICS charts.
- Existing trainers online are mostly static drills; this app adds interactive pose-setting, ghosts for encoding, and a timed mixed mode.

## Build notes
- Single-file HTML/CSS/JS, ~30 KB, no external dependencies.
- SVG signaler with two independently rotatable arms and red/yellow flags.
- Four modes:
  - **Free play**: drag flags to explore letters; random-letter shortcut; keyboard arrow nudges.
  - **Encode challenge**: app gives a letter, user drags arms to match; ghost hints show target pose.
  - **Decode challenge**: app sets the pose, user picks from a letter keypad.
  - **60s drill**: alternating random encode/decode rounds with score and accuracy.
- Mobile-first: touch-friendly drag on flags, large keypad, responsive layout.
- AI disclaimer banner and `noindex, nofollow` robots meta.

## Verification
- File exists and is 29,716 bytes (>5 KB).
- AI disclaimer present in UI.
- robots meta present (`noindex, nofollow`).
- Inline JS passed `node --check`.
- Built directly in the main agent session per cron requirement.

## Work split
- Main agent: 100%
- worker1 / worker2: 0% (cron explicitly required main-session build; workers not viable for this automation)

## Status
Clean build. Publishing and pipeline check executed in the same session.
