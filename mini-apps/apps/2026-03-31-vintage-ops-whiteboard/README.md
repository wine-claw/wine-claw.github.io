# Vintage Ops Whiteboard

A mobile-first static mini-app for winery shift triage and handover composition.

## What it is

A digital "whiteboard" that lets a cellar supervisor or shift lead rapidly sort operational issues into four priority lanes, annotate them with severity/owner/confidence metadata, and generate a concise text handover summary for the next shift.

## Core features

- **Four priority lanes:** Immediate · This Shift · Watch · Parked
- **Issue cards** with fields: title, area, owner, severity (Critical/High/Medium/Low), confidence (Confirmed/Probable/Suspected/Unknown), status (Active/Monitoring/Pending/Resolved), and free-text notes
- **Tap-first interaction:** single-tap selects a card, double-tap or tap-again opens edit; dedicated move modal for lane reassignment
- **Quick-add** new cards from the bottom bar
- **Handover summary** generator — composes a plain-text handover note from current board state, with one-tap copy to clipboard
- **localStorage persistence** — board state survives page refresh
- **Reset** to demo seed data at any time
- **10 seeded winery-relevant example cards** covering fermentation, transfers, pressing, lab, bottling, cold room, utilities, and filtration

## Interaction guide

| Action | How |
|---|---|
| Add card | Tap **＋ Add Card** in the bottom bar |
| Select card | Single-tap a card |
| Edit card | Double-tap, or single-tap a selected card again |
| Move card | With a card selected, tap **Edit** → choose a lane, or use the Move modal |
| Delete card | Open edit modal → tap **Delete** |
| Collapse lane | Tap the lane header |
| Handover summary | Tap **📋 Handover** in the top bar |
| Copy summary | In the summary view, tap **📋 Copy Text** |
| Reset board | Tap **🔄** in the header, or **Reset** in the bottom bar |

## Seed data

On first load (or reset), the board is populated with realistic winery scenarios:
- Ferment temp drift — Tank 7
- Stuck valve — Bay 4 drain
- Pump cavitation risk — R66
- Press backlog — 2 batches waiting
- Lab sample pending — pH & Alc Batch 41
- Bottling label mismatch — Pinot 2024
- Tank 12 nearing full
- Cold room fault — Zone B header
- CO₂ monitor battery low — Barrel Room
- Filtration prep outstanding — Batch 38

## Limitations & caveats

- **Experimental only.** This tool is not an operational SOP, safety system, or professional decision engine. It is a personal triage and communication aid. Always apply professional winery judgment.
- No backend, no sync, no access control — data lives in the browser's localStorage only
- No undo (yet) — deleted cards are gone
- Drag-and-drop is not implemented; lane reassignment is done via modal tap
- No export other than plain-text copy-to-clipboard
- Tested on desktop Chrome/Safari and mobile Safari/Chrome; performance on older Android browsers unknown
- Designed for portrait mobile; lanes stack to 2-column on wider screens

## Technical

Single self-contained `index.html` — no build step, no dependencies, no external network calls. Open it directly in any browser.

---

Built 2026-03-31 as an overnight mini-app.
