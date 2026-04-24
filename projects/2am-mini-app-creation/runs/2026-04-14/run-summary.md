# Run Summary — 2026-04-14 — Vintage Time Machine

## Chosen mini-app
**Vintage Time Machine** — a mobile-first interactive wine vintage explorer and quiz for South Australian wine regions (1990–2024), styled as a retro travel-postcard experience.

## Why this was chosen
Tonight deliberately shifted toward a **historical / archive-browser + quiz/game** archetype — completely different from the recent run cluster (narrative scroll-story, scouting game, compass explorer, disease playbook, irrigation coach, oxygen risk map, waste-to-value studio). 

Key reasons:
- **Vineyard balance**: Recent runs were vineyard-heavy, but this app spans both vineyard (vintage = vineyard year) and winery (wine quality outcomes), keeping both in the rotation
- **Historical depth**: No recent mini-app explored Australian wine vintage history, one of Simon's core interests
- **Quiz/gamification**: Adds the playful, game-like interaction the preference rules ask for — not just another practical tool
- **Delight factor**: The retro postcard aesthetic and flip-card interaction is charming and surprising, not purely utilitarian
- **Shareability**: An Australian vintage year explorer is directly useful for wine industry sharing

## Delegation note
- **`mm-worker` actually used:** yes, but timed out at ~10 minutes
- **What it handled:** initial HTML scaffold (index.html with correct structure)
- **What the main agent handled directly:** concept selection, research, hero image generation, CSS (styles.css), full app.js with vintage data, quiz engine, packaging, verification
- **Estimated delivered-work split:** ~10% worker / 90% main agent
- **Why the split was skewed:** The 35-year × 6-region vintage dataset (~78KB of JS) was too large for the worker to generate and write before timeout. The data+code volume exceeded the worker's output capacity.

## What was built
Inside `runs/2026-04-14/vintage-time-machine/`:

### Files
| File | Size | Purpose |
|------|------|---------|
| `index.html` | ~4.5 KB | Semantic HTML5 shell with hero, timeline, cards, quiz screens |
| `styles.css` | ~14 KB | Retro postcard aesthetic, CSS 3D flip, responsive, animations |
| `app.js` | ~82 KB | 35-year × 6-region vintage dataset, explore engine, quiz engine, confetti |
| `assets/hero.png` | ~3 MB | AI-generated retro vineyard postcard hero image |
| `assets/hero.jpg` | ~600 KB | Compressed hero for web use |

### Features
- ✅ **EXPLORE mode**: Year timeline (1990–2024), scrollable with chip selector
- ✅ **6 region postcard cards**: Barossa Valley, McLaren Vale, Adelaide Hills, Coonawarra, Clare Valley, Eden Valley
- ✅ **Star quality ratings** (1–5) per region per year
- ✅ **Vintage character tags**: Hot & Dry, Wet & Cool, Balanced, Cool & Elegant, Windy
- ✅ **Key variety callouts** per region per year
- ✅ **Postcard flip animation** (CSS 3D transform) revealing detailed vintage story on back
- ✅ **QUIZ mode**: "Vintage Detective" — 10 questions, guess the year from clues
- ✅ **Scoring + streak bonus** with animated feedback
- ✅ **Title ladder**: Apprentice → Cellar Hand → Winemaker → Vigneron → Legend
- ✅ **Confetti animation** on correct answers
- ✅ **Retro travel-postcard aesthetic**: cream/warm tones, Playfair Display + Lora, halftone overlay, stamp borders
- ✅ **AI-generated hero image** (retro vineyard postcard style)
- ✅ **Mobile-first**, 375px+, responsive grid
- ✅ **Dismissable warning banner**
- ✅ **prefers-reduced-motion** support
- ✅ **No external dependencies** (except Google Fonts)

### Vintage data coverage
- 35 years (1990–2024) × 6 regions = **210 region-year entries**
- Each entry: quality rating, character tag, key variety, short summary, extended backstory
- Based on research from Wine Genius, Wine Australia, Jancis Robinson, Wine Companion, Winetitles, Decanter
- Historically notable vintages thoroughly documented: 1990, 1998, 2002, 2005, 2007, 2010, 2011, 2012, 2017, 2020

## Current status
First-pass app complete. Syntax verified. No browser visual verification completed (overnight restriction).

## Verification
- ✅ `node --check app.js` passed
- ✅ All 35 years and 6 regions present in data
- ✅ File structure complete (HTML + CSS + JS + assets)
- ⚠️ Browser visual verification pending manual smoke test (overnight restriction on browser tool)
- ⚠️ Published hosting not yet updated (will attempt after pipeline check)

## Caveats
- Educational/historical toy only, not a validated production tool
- Vintage quality ratings and summaries are illustrative, based on published commentary and domain knowledge, not a formal peer-reviewed dataset
- Quiz clue generation is algorithmic — some clues may be less distinctive than ideal
- Hero image is AI-generated and may have minor visual artifacts
- No offline service worker, persistence, or PWA features
- Needs a real-phone/manual smoke test before claiming strong UX confidence

## Path / link
Local app folder:
`/Users/wineclaw/.openclaw/workspace/projects/2am-mini-app-creation/runs/2026-04-14/vintage-time-machine/`

## Promotion potential
Strong candidate for promotion. Natural next upgrades:
- More regions (Hunter Valley, Margaret River, Yarra Valley, Tasmania)
- Interactive vintage chart comparison (side-by-side regions)
- Deeper quiz with difficulty levels and timed rounds
- Historical weather data integration
- User-submitted vintage notes/memory sharing
- PWA with offline support for vineyard use