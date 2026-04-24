# Australian Vineyard/Winery Live Map with Data Overlays — Full Spec

## Concept
An interactive map of Australian wine regions using GI (Geographical Indication) boundaries, with selectable data overlays from external sources. A living reference map, not just a static poster.

## Base Map
- Australian GI boundary shapefiles (available from Wine Australia / ArcGIS Open Data hub)
- Region outlines: Barossa, McLaren Vale, Margaret River, Yarra Valley, Riverland, etc.
- Colour-coded by region, zoomable, pannable

## Data Overlays (layer toggle)
- **Climate data**: Growing degree days, rainfall, temperature (BoM data)
- **Vineyard area**: Hectares by region (Wine Australia/National Vineyard Scan data)
- **Variety mix**: Dominant varieties per GI (Shiraz, Cabernet, Chardonnay, etc.)
- **Production volume**: Crush tonnage per region (Wine Australia vintage reports)
- **Own data**: Ability to add custom overlay data points
- **Vintage conditions**: Seasonal summaries, heatwave/frost events per region

## Available Data Sources (from Apr 14 research)
- GI boundary shapefiles: ArcGIS Open Data hub
- National Vineyard Scan: 146K ha mapped (Consilium/GAIA, 2018)
- GAIA vineyard block polygons: commercial, not public
- National Vineyard Register (NVR): Map of Ag Australia — in development
- VinSites: WA's foundation data effort
- Wine Australia vintage reports: annual crush/volume by region
- BoM: climate/weather data

## Key Features
1. **Interactive map** with GI boundaries drawn as polygons
2. **Layer toggle** — turn overlays on/off
3. **Region click** — tap a GI to see detailed stats panel
4. **Time slider** — view historical data (e.g., vintage reports by year)
5. **Mobile-first** — phone is primary target
6. **Data refresh** — vintage/climate data updateable without code changes

## Technical Approach
- Leaflet.js or Mapbox GL for base map tiles
- GeoJSON for GI boundaries (converted from shapefiles)
- Data overlays as separate GeoJSON layers
- All in a single HTML file where possible, or minimal file set