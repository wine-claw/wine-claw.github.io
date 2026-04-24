# Wine Input Cost Index — Full Spec

## Concept
A live, daily-updatable dashboard that consolidates real commodity input costs for wine production into a single "winery input cost" signal. Useful for budgeting and industry advocacy.

## Data Sources (real pulls where possible)
- **Fertiliser prices**: World Bank commodity data, ICIS
- **Diesel/fuel**: Australian fuel price indexes, FRED
- **Bulk chemicals**: Tartaric acid, SO₂, filtration media spot prices (Index Mundi, industry indexes)
- **Packaging**: Glass, cork, screwcap spot prices (Index Mundi, FRED, industry indexes)
- **Other**: Water allocation prices (Murray-Darling), labour wage indexes (ABS), energy (AEMO/ABS)

## Key Features
1. **Daily/weekly data pull** — automated fetch from World Bank, Index Mundi, FRED, etc.
2. **Individual commodity trend charts** — fertiliser, diesel, tartaric acid, SO₂, glass, cork, screwcap, etc.
3. **Consolidated "Winery Input Cost" composite index** — weighted signal combining all inputs
4. **YoY and MoM change indicators** — for budgeting comparisons
5. **Export/share** — snapshot of current index for advocacy use
6. **Historical data** — at least 2-3 years of back-data where available
7. **Mobile-first** — phone is primary target

## Data Architecture
- Backend script fetches data daily and writes to a JSON file
- Frontend reads JSON (no live API calls from browser)
- Data categories should be individually weightable (different wine styles have different cost structures)

## Purpose
- Budgeting tool for wineries
- Industry advocacy signal (show rising/falling input costs to media, government, industry bodies)