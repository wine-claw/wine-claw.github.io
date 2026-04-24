# 2026-04-17 Overnight Run — Wine Input Cost Index (corrected)

## Original run: Rootstock Matchmaker
The 2am cron built Rootstock Matchmaker instead of the assigned spec (Wine Input Cost Index). Simon flagged this. Both apps now exist.

## Corrected app: Wine Input Cost Index
**Wine Input Cost Index** — consolidated winery input cost signal for budgeting & advocacy.

Built mid-day as a correction. Mobile-first interactive dashboard with:
- 7 commodity categories with ~30 months of embedded historical data
- Individual commodity trend charts (Chart.js)
- Weighted composite "Winery Input Cost Index" with YoY (+16.8%) and MoM (+0.8%)
- Adjustable weight sliders with presets (Balanced/Sparkling/Bulk/Premium)
- Export: Download PNG snapshot + Copy share summary
- Dark wine/burgundy theme

## Verification
- Playwright screenshots: ✅ (hero, full page, charts, weights)
- Playwright video: ✅ captured
- Web fetch: ✅ (title and content rendering confirmed)
- Charts render with data: ✅ confirmed via screenshot review
- All 7 categories present: ✅ (fertiliser, fuel, chemicals, packaging, water, labour, energy)

## Delegation (Wine Input Cost Index)
- **worker2 (70%):** Full app implementation
- **worker1 (0%):** Not used
- **Main agent (30%):** Spec review, deployment, verification, gallery publishing

## Also deployed today
- **Rootstock Matchmaker** — pushed to GitHub gallery after being stuck locally

## Gallery
- Wine Input Cost Index: https://wine-claw.github.io/mini-apps/apps/2026-04-17-wine-input-cost-index/
- Rootstock Matchmaker: https://wine-claw.github.io/mini-apps/apps/2026-04-17-rootstock-matchmaker/
- Gallery: https://wine-claw.github.io/mini-apps/

## Status
✅ Complete — both apps deployed, verification done, gallery updated