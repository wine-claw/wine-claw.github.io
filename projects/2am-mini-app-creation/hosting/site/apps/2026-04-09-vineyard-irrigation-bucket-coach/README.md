# Vineyard Irrigation Bucket Coach

A mobile-first static mini-app for quickly visualising the vineyard root-zone water bucket.

## Purpose
This app gives a simplified irrigation-planning view built around a few durable concepts:
- ETc = Kc × ETo
- Total available water in the root zone depends on soil available water capacity and effective root depth
- MAD is the user-chosen depletion line that triggers attention or refill planning
- Gross refill needs must be adjusted for irrigation efficiency

## Features
- Vineyard stage presets with editable crop coefficient
- Soil texture presets with editable AWC
- Root depth, MAD, bucket fill, irrigation efficiency, and planned event controls
- Root-zone water reservoir visual with trigger line
- 7-day depletion curve and day chips
- Scenario presets for different vineyard situations
- Phone-friendly single-page layout
- Experimental warning banner and footer disclaimer

## Key assumptions
- Constant daily ETc over the 7-day strip
- No rainfall, runoff, capillary rise, salinity, vine stress response, or block heterogeneity
- Crop coefficients are indicative educational values, not validated local recommendations
- Planned irrigation gain is treated as irrigation depth × efficiency

## Files
- `index.html`
- `styles.css`
- `app.js`

## Verification performed
- App files created as plain static assets
- No external CDN, fonts, framework, or network request dependencies
- JavaScript syntax checked with Node

## Suitability
Educational only. Useful for comparison thinking, not for real scheduling without local validation and block-specific agronomic judgment.
