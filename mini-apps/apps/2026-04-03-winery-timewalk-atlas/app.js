/* =========================================
   WINERY TIMEWALK ATLAS — app.js
   ========================================= */

'use strict';

// ── Era colour palettes ──────────────────────
const ERA_COLORS = {
  1890: { bg: '#F5ECD7', accent: '#8B6914', walls: '#C4A35A', zone: '#EAD99A', zoneHover: '#DFC87A', hotspot: '#8B6914', text: '#5C4409' },
  1935: { bg: '#EDE8D5', accent: '#7A6B4E', walls: '#B8A888', zone: '#DDD5B8', zoneHover: '#CEC5A0', hotspot: '#7A6B4E', text: '#4A3E2C' },
  1975: { bg: '#E8EFF0', accent: '#3A6B7A', walls: '#7AAAB8', zone: '#C8DDE4', zoneHover: '#B0CCd6', hotspot: '#3A6B7A', text: '#1E4A5A' },
  2025: { bg: '#EEF2F8', accent: '#2B4F8C', walls: '#88AAD4', zone: '#C8D8F0', zoneHover: '#B0C4E8', hotspot: '#2B4F8C', text: '#1A3566' },
};

// ── Zone definitions ──────────────────────────
const ZONES = {
  crush_pad: {
    name: 'Crush Pad',
    icon: '🍇',
    legendColor: '#9B59B6',
    svgId: 'zone-crush',
    desc: 'Where the harvest begins. Grapes arrive in crates or gondolas and are crushed to release the juice.',
  },
  fermentation: {
    name: 'Fermentation Hall',
    icon: '🔥',
    legendColor: '#E67E22',
    svgId: 'zone-ferment',
    desc: 'The heart of the winery. Sugar becomes alcohol as yeast does its ancient work.',
  },
  barrel_caves: {
    name: 'Barrel Caves',
    icon: '🪵',
    legendColor: '#8B6914',
    svgId: 'zone-barrel',
    desc: 'Aged in oak. Time transforms raw young wine into something complex and nuanced.',
  },
  press_room: {
    name: 'Press Room',
    icon: '⚙️',
    legendColor: '#27AE60',
    svgId: 'zone-press',
    desc: 'Where the last precious drops are coaxed from the pomace under careful pressure.',
  },
  dispatch: {
    name: 'Bottling & Dispatch',
    icon: '📦',
    legendColor: '#2980B9',
    svgId: 'zone-dispatch',
    desc: 'From barrel to bottle. The wine leaves the cellar to meet its public.',
  },
  office: {
    name: "Cellarmaster's Office",
    icon: '📋',
    legendColor: '#C0392B',
    svgId: 'zone-office',
    desc: 'The nerve centre. Lab notes, blending trials, and harvest diaries live here.',
  },
};

// ── Era-specific zone data ─────────────────────
const ZONE_DATA = {
  crush_pad: {
    1890: {
      title: 'The Crush Pad — Steam Age',
      text: 'Twelve pickers work the sorting table under a canvas awning. Grapes are foot-trodden in the old lagar — a wide, shallow stone trough — before the must is gravity-fed into open wooden fermenters below. A steam-powered destemmer sits idle in the corner, used only for the reds that need it most.',
      labor: { workers: '8–12 pickers', hours: 'Dawn–dusk', skill: 'Hand labour + foot treading' },
      equipment: ['Stone lagar (foot-trodden)', 'Wooden destemmer', 'Steam pump (rare)', 'Wooden gondolas'],
      risk: [
        { level: 'high', text: 'Slips and falls on grape juice' },
        { level: 'medium', text: 'Steam equipment burns' },
        { level: 'high', text: 'Carbon dioxide in fermentation season' },
      ],
      change: 'Foot-treading was the norm for premium reds well into the 1960s. Some wineries still practice it for ceremonial batches today.',
      artifact: { icon: '🪣', title: "Old Picker\u2019s Note", text: '"Santiago says the merlot is ready by the moon this year. Never trust a calendar, only a grape."' },
    },
    1935: {
      title: 'The Crush Pad — Depression Era',
      text: 'A thin year. The economic collapse hit the valley hard and many small family vineyards were abandoned or sold to larger cooperatives. The crush pad runs at half capacity — six pickers where twelve once worked. A hand-cranked wooden crusher-destemmer handles what used to be foot-trodden. Workers barter harvest labour for wine credit.',
      labor: { workers: '4–6 pickers', hours: '7am–5pm', skill: 'Semi-mechanised, family labour' },
      equipment: ['Hand-cranked wooden crusher', 'Timber sorting table', 'Canvas awning', 'Secondhand pumps'],
      risk: [
        { level: 'medium', text: 'Malnutrition — workers underfed' },
        { level: 'medium', text: 'Shared equipment, hygiene concerns' },
        { level: 'low', text: 'CO₂ in fermenter' },
      ],
      change: 'The Depression forced mechanisation out of necessity — cheap labour vanished. This era seeded the adoption of the first affordable mechanical crushers.',
      artifact: { icon: '📰', title: 'Valley Herald — Oct 1935', text: '"Winery Cooperatives Merge to Survive — Small Growers Form Joint Crush to Share Equipment Costs."' },
    },
    1975: {
      title: 'The Crush Pad — Steel Revolution',
      text: 'The lagar is gone. In its place: a shiny stainless-steel crusher-destemmer that processes a tonne of grapes per hour, fed by a conveyor belt from the sorting table. Temperature control arrives on the crush pad — must is chilled to 10°C before fermentation, preserving delicate aromatics. Women join the sorting crew in significant numbers for the first time.',
      labor: { workers: '3–5 sorters + 1 operator', hours: '6am–4pm (shift)', skill: 'Machine operation + quality sorting' },
      equipment: ['Stainless steel crusher-destemmer', 'Conveyor belt sorter', 'Chiller unit', 'Digital temperature probes'],
      risk: [
        { level: 'low', text: 'Machine entanglement (guarded)' },
        { level: 'low', text: 'Cold exposure (chiller room)' },
      ],
      change: '1975 marks the year several benchmark wineries published papers on cool-soak prefermentation techniques. The crush pad became a cold chain, not just a crushing floor.',
      artifact: { icon: '🔬', title: "Researcher's Note", text: '"Chilling the must to 8°C for 48 hours before fermentation increased muscat aromatics by 23% in our trials. Publish this." — Dr. H. Bauer, UC Davis, 1975' },
    },
    2025: {
      title: 'The Crush Pad — Smart Vintage',
      text: 'Optical berry sorting machines reject under-ripe or raisined grapes at 14,000 berries per hour — a task that once took twenty sorters. A NIR (near-infrared) sensor on the feed belt estimates Brix, pH, and acidity in real time. AI-powered yield prediction means the exact number of picking crews are scheduled via app. The crush pad has never been more precise — or quieter.',
      labor: { workers: '1–2 sorters + AI system', hours: 'Overnight shifts possible', skill: 'Systems monitoring + anomaly detection' },
      equipment: ['Optical sorter (AI-powered)', 'NIR spectroscopy sensor', 'IoT Brix/pH probes', 'Automated conveyor', 'Climate-controlled shelter'],
      risk: [
        { level: 'low', text: 'Robotic arm pinch points' },
        { level: 'low', text: 'Electrical system faults' },
        { level: 'low', text: 'Sensor calibration drift' },
      ],
      change: 'AI optical sorting can detect a single raisined berry in a stream of thousands. Human sorters now focus only on edge cases the algorithm flags for review.',
      artifact: { icon: '📊', title: 'Dashboard Screenshot', text: '"Yield Prediction Model — Final Estimate: 4.2 tonnes/ha. Actual harvest: 4.18 tonnes/ha. Model error: 0.5%. Weather override applied Day 3."' },
    },
  },

  fermentation: {
    1890: {
      title: 'Fermentation Hall — Steam Age',
      text: 'Eight open wooden vats line the walls, each holding around 3,000 litres. The foreman climbs a ladder twice daily to punch down the cap — breaking up the floating grape skins to keep them in contact with the liquid. Temperature is uncontrolled; fermentation simply happens when it happens. The smell is extraordinary — sweet, yeasty, and slightly acid.',
      labor: { workers: '1 foreman + 2 assistants', hours: 'Dawn and dusk punch-downs', skill: 'Traditional hand fermentation management' },
      equipment: ['Open wooden pine vats (3,000L)', 'Wooden punch-down tools', 'Ladders', 'Canvas covering (night)'],
      risk: [
        { level: 'high', text: 'Falls from vat ladder' },
        { level: 'high', text: 'Uncontrolled fermentation (exploding vats)' },
        { level: 'medium', text: 'Acetic acid bacteria (volatile acidity)' },
      ],
      change: 'Open wooden vats were universally used until the 1950s. Some Burgundian producers still use them ceremonially, arguing the micro-oxygenation produces more complex Pinot Noir.',
      artifact: { icon: '🪜', title: 'Foreman\'s Log — 14 March 1890', text: '"Cap would not break properly today. Too cold overnight. Added a bucket of must from yesterday\'s crush to kick it along. Worked."' },
    },
    1935: {
      title: 'Fermentation Hall — Depression Era',
      text: 'The wooden vats have been replaced with concrete tanks lined with a hand-brushed coat of paraffin wax — an early attempt at sealed fermentation. Sixteen tanks, each 5,000 litres. Punching down is done with a long wooden oar through a hole in the waxed lid. Some tanks have a rudimentary temperature monitor — a glass thermometer dipped twice daily. The Depression means less experimental winemaking; consistency is survival.',
      labor: { workers: '1 winemaker + 1 cellar hand', hours: 'Twice daily punch-down', skill: 'Basic fermentation monitoring' },
      equipment: ['Paraffin-lined concrete tanks (5,000L)', 'Long oak punch-down oar', 'Glass thermometers', 'Waxed lid seals'],
      risk: [
        { level: 'medium', text: 'Tank seal failure — oxidation' },
        { level: 'high', text: 'Stuck fermentation (no temperature control)' },
        { level: 'medium', text: 'Paraffin flaking into wine' },
      ],
      change: 'Concrete tanks first appeared in the 1890s but only became widespread in the 1930s. Their thermal mass provided some temperature buffering — a marginal improvement.',
      artifact: { icon: '🧪', title: 'Lab Notebook', text: '"If stuck again, try adding a pail of active fermenting must from the warmest tank. Should restart in 12 hours. — Notes on Stuck Fermentations, M. Delacroix, 1934"' },
    },
    1975: {
      title: 'Fermentation Hall — Steel Revolution',
      text: 'The transformation is complete. Twenty-four stainless-steel jacketed fermenters — each with cooling water in the outer wall — allow temperature precision within 0.5°C. Pumping over replaces manual punch-down; a plumber\'s valve controls circulation twice daily. Yeast strains are now selected and added, not wild. The hall smells clean, almost antiseptic. The wine is more consistent than any previous generation could have imagined.',
      labor: { workers: '1 winemaker + 2 cellar techs', hours: 'Continuous monitoring', skill: 'Temperature management + selected yeast' },
      equipment: ['Jacketed SS fermenters (5,000L)', 'Glycol cooling system', 'Pumping-over system', 'Selected yeast strains (RC212, BDX)', 'Digital temperature loggers'],
      risk: [
        { level: 'low', text: 'Pump failure — monitored' },
        { level: 'low', text: 'Glycol leak (food-safe coolant)' },
        { level: 'low', text: 'Temperature overshoot (alarmed)' },
      ],
      change: 'The introduction of temperature-controlled fermentation in the 1970s is arguably the single biggest quality advancement in 20th-century winemaking. Aromatic whites especially benefited immediately.',
      artifact: { icon: '📈', title: 'Quality Control Chart', text: '"Fermentation curve comparison 1974 vs 1975. Peak temperature: 28°C → 24°C. Total esters in final wine: +31%. Vintages quality rating: 72 → 89."' },
    },
    2025: {
      title: 'Fermentation Hall — Smart Vintage',
      text: 'Every tank has a PT1000 temperature probe, a density sensor, and a CO₂ flux monitor feeding a real-time dashboard. The AI system alerts the winemaker to anomalies 4–6 hours before they would be detectable by human observation. Machine learning models trained on fifteen years of fermentation curves predict endpoint to within 2° Brix. Grape marc is automatically circulated by variable-speed pump-overs, adjusted per tank-hour.',
      labor: { workers: '1 winemaker + 1 technician', hours: 'Remote monitoring + 1 daily walk', skill: 'Data interpretation + intervention decision' },
      equipment: ['IoT PT1000 temp probes', 'Continuous density meters', 'CO₂ flux sensors', 'AI fermentation model (cloud)', 'Automated pump-over controller', 'Variable-frequency drives'],
      risk: [
        { level: 'low', text: 'Sensor failure (redundant)' },
        { level: 'low', text: 'Cloud connectivity loss (local backup)' },
        { level: 'low', text: 'AI false positive fatigue (alert tuning)' },
      ],
      change: 'The 2025 "smart fermenter" can detect a stuck fermentation before it begins. Intervention that once required experience and intuition is now triggered algorithmically.',
      artifact: { icon: '🤖', title: 'AI Alert — 03:14 AM', text: '"Tank 14 — anomaly detected: CO₂ flux declining at 2.3σ below model curve. Predicted stuck fermentation in 6.2 hours. Intervention recommended: rack + re-pitch. Auto-escalated to on-call: YES. Winemaker actioned: rack initiated 03:45AM."' },
    },
  },

  barrel_caves: {
    1890: {
      title: 'Barrel Caves — Steam Age',
      text: 'The cave is carved into the hillside — cool year-round at 14°C without any mechanical refrigeration. Three hundred French oak barriques line the walls in rows, each hand-coopered and costing a year\'s wages for a labourer. The 1889 vintage is maturing here, a wine that will not be released for another five years. The cooper comes once a year to replace any leaking barrels; one in twenty will weep wine by spring.',
      labor: { workers: '1 cooper (contractor)', hours: 'Annual barrel maintenance visit', skill: 'Traditional coopery' },
      equipment: ['French oak barriques (225L)', 'Hand-forged iron hoops', 'Sulfur candles (sanitisation)', 'Candle lighting only'],
      risk: [
        { level: 'medium', text: 'Fire (candle-lit cave)' },
        { level: 'high', text: 'Cave-in (unreinforced stone)' },
        { level: 'medium', text: 'CO₂ from active fermentations below' },
      ],
      change: 'Natural cave cellars were the original temperature control. The consistency of 12–14°C hillside cellars remains superior to most modern refrigeration for slow, even maturation.',
      artifact: { icon: '🕯️', title: 'Cellarmaster\'s Note', text: '"The 1889 Cabernet will be a great wine if we are patient. Fires are banked low at night. The sulfur candles are lit only when the fruit flies appear."' },
    },
    1935: {
      title: 'Barrel Caves — Depression Era',
      text: 'Barrel inventory has halved since 1929. The cave holds 150 barrels — the rest were sold off or emptied early to raise cash. Some are second-fill oak; first-fill French barriques are too expensive. The cooper has not visited in two years. Workers patch barrel leaks with a mixture of beeswax and turpentine. The cave smells different now — older oak, older wine, less life.',
      labor: { workers: '1 cellar hand (part-time)', hours: 'Weekly topping + leak check', skill: 'Basic barrel maintenance' },
      equipment: ['French + American oak mix (second-fill)', 'Beeswax/turpentine patch mix', 'Glass wine thief (sampling)', 'Sulfur strips'],
      risk: [
        { level: 'medium', text: 'Oxidation (insufficient topping)' },
        { level: 'medium', text: 'Barrel spoilage (patched barrels)' },
        { level: 'low', text: 'Cave damp — rheumatic conditions for workers' },
      ],
      change: 'The Depression\'s silver lining: extended barrel ageing became more common as wineries held inventory longer, waiting for prices to recover. Some legendary wines of this era benefited from "forced" extra-maturation.',
      artifact: { icon: '💰', title: 'Ledger Entry', text: '"Barrel stock sold: 48 barriques to [redacted] cooperative for £340. All proceeds to payroll. Remaining barrels to be held minimum 3 years before sale."' },
    },
    1975: {
      title: 'Barrel Caves — Steel Revolution',
      text: 'The cave has expanded with a temperature-controlled barrel hall built into the hillside — concrete walls, refrigeration, and UV-filtered lighting. Two hundred new French oak barriques from Allier forest. The cooper is replaced by a barrel management company that does annual inspection and toast adjustment. Flavour profiling is new: the winemaker tastes and logs each barrel individually every three months.',
      labor: { workers: '1 cellar master + 1 assistant', hours: 'Weekly barrel rotation + topping', skill: 'Barrel profiling + toast management' },
      equipment: ['New French Allier oak barriques', 'Refrigerated barrel hall (14°C)', 'Barrel management contractor', 'Individual barrel tasting logs', 'Nitrogen topping system'],
      risk: [
        { level: 'low', text: 'Refrigeration failure (alarm system)' },
        { level: 'low', text: 'Toast level variance between batches' },
      ],
      change: 'The concept of "barrel selection" — choosing specific coopers, forests, and toast levels for different wines — became standard in the mid-1970s. It transformed blending from an art into a science.',
      artifact: { icon: '📓', title: "Winemaker's Tasting Notes", text: '"Barrel 47 — Allier, medium toast, 14 months. Black fruit, cedar, dark chocolate. Exceptional. Bottle separately as reserve. Barrel 88 — same source, but undertasted. Blend into main reserve."' },
    },
    2025: {
      title: 'Barrel Caves — Smart Vintage',
      text: 'The cave has gone digital. RFID tags on every barrel log fill weight, temperature, and topping events automatically. An ultrasonic sensor measures evaporation (the "angel\'s share") to the millilitre each day. The winemaker receives a weekly "barrel health report" on their phone. Oak influence is precisely matched to wine style via a custom cooper programme — each barrel\'s toast curve is tested against the target sensory profile before being filled.',
      labor: { workers: '1 cellar manager', hours: 'Monthly physical inspection + data review', skill: 'Data analytics + sensory validation' },
      equipment: ['RFID barrel tags', 'Ultrasonic angel\'s share sensors', 'Automated nitrogen topping', 'Cloud barrel management system', 'Custom cooper toast profiling', 'Digital tasting panel app'],
      risk: [
        { level: 'very-low', text: 'RFID tag loss (replaced manually)' },
        { level: 'low', text: 'Sensor data gaps (reconciliation protocol)' },
        { level: 'low', text: 'Over-reliance on automation (sensory skills atrophy risk)' },
      ],
      change: 'Precision barrel management means the 2025 winery can accurately predict how each barrel will taste before it\'s half-empty. The role of the cellar manager is now as much data scientist as craftsman.',
      artifact: { icon: '📱', title: 'App Notification', text: '"Barrel #203 — Angel\'s share: 487ml (3.2% annual target). Topping recommended. Sensory flag: oak integration at 92%. Predicted optimal drain date: 18 July 2025."' },
    },
  },

  press_room: {
    1890: {
      title: 'Press Room — Steam Age',
      text: 'A massive wooden basket press dominates the room — an iron framework enclosing a wooden cage, loaded with pomace by shovel. The press is wound down by hand over several hours using a large threaded screw. One press cycle takes the whole morning. The yield is low but the quality is exceptional — the slow, gentle pressure extracts only the finest juice. The white wine is pressed first; the pomace then returned for the reds.',
      labor: { workers: '3–4 press operators', hours: '4–6 hours per press cycle', skill: 'Traditional basket press operation' },
      equipment: ['Timber basket press (manual screw)', 'Pomace shovels', 'Slate collecting vessels', 'Filtering straw/chiffon'],
      risk: [
        { level: 'high', text: 'Screw mechanism failure / hand crush' },
        { level: 'high', text: 'Musculoskeletal injury (prolonged manual winding)' },
        { level: 'medium', text: 'Oxidised juice (slow pressing)' },
      ],
      change: 'Basket presses produced the most gently extracted juice in history. Some natural winemakers argue modern hydraulic presses still cannot replicate the same quality of "first press" that basket presses achieved.',
      artifact: { icon: '🔩', title: 'Press Maintenance Log', text: '"Screw thread lubricated with beef fat. Wooden cage replaced — two iron bands rusted through. Yield this season: 580 litres per tonne (excellent)."' },
    },
    1935: {
      title: 'Press Room — Depression Era',
      text: 'The wooden basket press is still in use but the screw has been adapted with a secondhand car jack mechanism — reducing the physical toll on operators. A small pneumatic bladder press has been acquired from a bankrupt neighbour winery. It is faster and yields more juice per tonne, but the cellar hands are suspicious of its "industrial" nature. The old basket press is reserved for premium lots.',
      labor: { workers: '2 press operators', hours: '3–4 hours per cycle', skill: 'Hybrid (manual + pneumatic)' },
      equipment: ['Modified basket press (car jack)', 'Small pneumatic bladder press', 'Collecting tanks', 'Secondhand car jack conversion'],
      risk: [
        { level: 'medium', text: 'Modified mechanism failure' },
        { level: 'medium', text: 'Bladder rupture (aged equipment)' },
        { level: 'low', text: 'Yield pressure misjudgment' },
      ],
      change: 'Bladder presses first appeared in the 1930s. They offered gentler, more controllable pressure than basket presses — but took decades to fully replace the traditional method.',
      artifact: { icon: '🔧', title: 'Inventive Adaptation', text: '"Rigged the car jack from the old Ford truck to the press screw. Tested: holds 6 tonnes pressure without slipping. Giovanni says it\'s cheating. I say it saves his back."' },
    },
    1975: {
      title: 'Press Room — Steel Revolution',
      text: 'Two pneumatic membrane presses have replaced the old basket press entirely. The membrane inflates inside a stainless steel cage, pressing the pomace gently against the inner wall. Pressure is dialled in to the litre — a gentle 0.5 bar for the first press fraction, rising only for the final press. Juice is categorised into "triages" — P2 (second press) is considered premium in its own right. The press room is clean, bright, and almost quiet.',
      labor: { workers: '1 press operator', hours: '2–3 hours per cycle', skill: 'Pneumatic press programming' },
      equipment: ['Pneumatic membrane presses (SS)', 'Programmable pressure cycles', 'Juice triage tanks', 'Automatic pressing programme (timer)', 'In-line Brix meter'],
      risk: [
        { level: 'low', text: 'Membrane fatigue/rupture' },
        { level: 'low', text: 'Pressure miscalibration' },
      ],
      change: 'The concept of press fractionation — separating first, second, and third pressings as distinct quality tiers — became standard in the 1970s and transformed white wine quality.',
      artifact: { icon: '🧪', title: 'Press Fraction Log', text: '"P1: 380L @ 0.2 bar — used for premium cuvée. P2: 140L @ 0.8 bar — blended to second wine. P3: 60L @ 2.0 bar — sold to cooperative for bulk."' },
    },
    2025: {
      title: 'Press Room — Smart Vintage',
      text: 'The pneumatic press is now networked. The loading system weighs the pomace automatically and the press cycle is selected from a touchscreen — programmes optimised for each grape variety\'s predicted texture profile. Real-time pressure sensors prevent over-extraction. The juice flows through an inline optical sensor that measures turbidity and colour intensity, routing fractions to the correct must balance tank automatically. No bucket has been carried in this room in three years.',
      labor: { workers: '1 operator (remote monitoring)', hours: 'Automated — 1 check per shift', skill: 'Press programming + fraction monitoring' },
      equipment: ['IoT pneumatic membrane press', 'Auto-loading weigh system', 'Inline turbidity sensor', 'Colour intensity spectrophotometer', 'Auto-routing valve system', 'Touchscreen cycle selection'],
      risk: [
        { level: 'very-low', text: 'Sensor fouling (cleaning protocol)' },
        { level: 'low', text: 'Auto-valve jam (annual service)' },
      ],
      change: 'Press fractionation is now so precisely automated that the difference between a £15 and £50 bottle of wine can be traced to a 0.3 bar pressure difference in a 40-minute window during pressing.',
      artifact: { icon: '📊', title: 'Press Cycle Report', text: '"Variety: Chardonnay. Target: Elegant, low-tannin white. Programme: P1-dominant (85%). Achieved turbidity: 45 NTU (target: <60 NTU). Auto-routed to: Oak fermentation Tank 7."' },
    },
  },

  dispatch: {
    1890: {
      title: 'Bottling & Dispatch — Steam Age',
      text: 'No bottling line — the wine is filled by hand using a hand-pump cistern and a gravity-fed filler. Twelve dozen bottles per hour is a good day. The bottles are cleaned with a soda solution, rinsed, and filled one by one. Corks are inserted by hand using a simple lever corker. Labels are glued with a brush. Dispatch is by horse-drawn dray to the railway station — the wine will travel in wooden crates nailed at the last moment.',
      labor: { workers: '4 bottlers + 1 drayman', hours: 'Full day bottling (100 dozen)', skill: 'Hand bottling + hand corking' },
      equipment: ['Hand-pump cistern', 'Gravity filler (single head)', 'Soda cleaning tank', 'Lever hand-corker', 'Wooden crate nailing station', 'Horse-drawn dray'],
      risk: [
        { level: 'high', text: 'Corker hand injury' },
        { level: 'medium', text: 'Wine oxidation (slow fill)' },
        { level: 'medium', text: 'Broken bottles (hand handling)' },
      ],
      change: 'Hand-bottling was universal until the 1890s. Some small natural wine producers still hand-bottle as a quality signal and cost-saving measure.',
      artifact: { icon: '🍾', title: 'Invoice Stub', text: '"12 dozen Claret, 1887 Vintage, to H. Blackwood & Sons, London. Carriage: 18 shillings. Note: one bottle broken in transit. Replacement sent at our expense."' },
    },
    1935: {
      title: 'Bottling & Dispatch — Depression Era',
      text: 'A semi-mechanised bottling line has replaced hand-filling — a gear-driven filler with four heads, powered by a shared belt from the old steam engine. Speed is still modest: 60 bottles per hour. The Depression means glass is expensive and bottles are reused where possible — returned bottles are sorted, cleaned, and re-filled. Label paper is the cheapest available. Dispatch is by the winery\'s own truck for the first time.',
      labor: { workers: '3 bottling operators + 1 driver', hours: '6am–2pm bottling shift', skill: 'Mechanical filler operation' },
      equipment: ['4-head gear-driven filler (belt power)', 'Steam-engine power take-off', 'Bottle sorting + washing line', 'Reused bottles (mixed origins)', 'Cheap gum-label adhesive', 'Winery truck (1932 Ford)'],
      risk: [
        { level: 'medium', text: 'Belt entanglement (unguarded)' },
        { level: 'medium', text: 'Mixed-glass infection risk (reused bottles)' },
        { level: 'low', text: 'Label adhesive failure' },
      ],
      change: 'Reuse of wine bottles was standard until the 1970s. The modern one-way bottle system is actually a relatively recent invention driven by health regulations and brand marketing.',
      artifact: { icon: '🚚', title: 'Delivery Note', text: '"Route: Winery → Railway Station → Melbourne. 40 dozens. Truck capacity: 60 dozens but road is poor after rain. Fuel rationed. Signed: R. Thornton, Driver."' },
    },
    1975: {
      title: 'Bottling & Dispatch — Steel Revolution',
      text: 'A modern stainless bottling line runs at 1,200 bottles per hour — twenty times faster than 1935. Nitrogen blanketing protects wine from oxidation during filling. Glass is now uniform and purpose-made for wine; reuse has declined. Labels are printed on coated stock with waterproof adhesive. The wine is palletised and dispatched by refrigerated truck for the first time — cold chain to market begins.',
      labor: { workers: '2 line operators + 1 logistics', hours: '8-hour bottling shift', skill: 'Mechanical line operation + QC' },
      equipment: ['SS rotary bottling line (1,200 bph)', 'Nitrogen inert gas system', 'Coated label stock + wet-glue applicator', 'Palletiser', 'Refrigerated delivery truck', 'Thermoformed plastic wrapping'],
      risk: [
        { level: 'low', text: 'Conveyor jam' },
        { level: 'low', text: 'Nitrogen supply failure (audible alarm)' },
        { level: 'low', text: 'Label mis-application' },
      ],
      change: 'The refrigerated truck transformed wine distribution. Before 1975, heat damage in transit was a major cause of wine spoilage — particularly for warm-climate producers shipping to northern markets.',
      artifact: { icon: '🚛', title: 'Refrigeration Log', text: '"Truck #3 — red wine delivery to Sydney. Load temp: 14°C. Set point: 12°C. Route ambient: 38°C. Wine delivered at 13.1°C. Acceptable range."' },
    },
    2025: {
      title: 'Bottling & Dispatch — Smart Vintage',
      text: 'The bottling line is fully automated: laser-coded bottles, capper with torque control, back-to-back label inspection cameras, and RFID-case tracking from filler to pallet. A blockchain ledger records each pallet\'s bottling timestamp, lot number, and QA certificate. Dispatch is coordinated via an AI logistics optimizer that factors traffic, fuel cost, and delivery urgency. Retailers receive a digital twins of each bottle\'s journey.',
      labor: { workers: '1 line supervisor + 1 logistics coordinator', hours: '24-hour bottling run (seasonal)', skill: 'Line monitoring + data systems' },
      equipment: ['Robotic bottling cell (3,600 bph)', 'Torque-controlled capper', 'AI vision label inspection', 'RFID pallet tracking', 'Blockchain lot ledger', 'AI logistics optimizer', 'EV refrigerated fleet'],
      risk: [
        { level: 'very-low', text: 'Robotic calibration drift (weekly)' },
        { level: 'low', text: 'Blockchain node connectivity' },
        { level: 'very-low', text: 'Cap torque failure (sensor-monitored)' },
      ],
      change: 'Consumer demand for provenance transparency has driven the wine industry to adopt blockchain more rapidly than many other food sectors. QR codes linking to a bottle\'s complete history are now expected by premium retailers.',
      artifact: { icon: '🔗', title: 'QR Code Record', text: '"Scan result: 2019 Reserve Shiraz — Lot #2094. Bottled: 14 March 2020, 09:42 AM. Best before: 31 Dec 2034. Vineyard block: North Ridge, 18-year vines. Production: 4,800 bottles. Supply chain: 4 custody events logged."' },
    },
  },

  office: {
    1890: {
      title: "Cellarmaster's Office — Steam Age",
      text: 'A small stone room off the cave entrance, lit by oil lamp. The cellarmaster\'s desk is covered with leather-bound harvest diaries, a quill, and a hydrometer for measuring must weight. Blending is done by instinct and repeated from year to year — the same grape sources, the same barrel proportions. There is no lab; quality is judged by taste and smell. The cellarmaster has worked here since he was fourteen years old.',
      labor: { workers: '1 cellarmaster (lifetime tenure)', hours: 'Year-round — living on-site', skill: 'Intuitive, experience-based' },
      equipment: ['Hydrometer (must weight)', 'Oil lamp (office lighting)', 'Leather harvest diary', 'Quill and ink', 'Cork sampling tool'],
      risk: [
        { level: 'medium', text: 'Oil lamp fire risk' },
        { level: 'high', text: 'No pathogen testing (risk of contamination spreading undetected)' },
        { level: 'medium', text: 'Knowledge loss (oral tradition only)' },
      ],
      change: 'The concept of blending as a quality tool was barely understood in 1890. Most wines were bottled as varietals or village blends with no barrel selection. The sophistication of modern winemaking started here, in this lamp-lit room.',
      artifact: { icon: '📖', title: 'Harvest Diary — 3 October 1889', text: '"Merlot at 22.5° Brix, pH 3.4. Picked three days earlier than usual — acid falling fast. Will add 10% press wine to lift structure. This will be the best Claret we have made."' },
    },
    1935: {
      title: "Cellarmaster's Office — Depression Era",
      text: 'The office is quieter. Without the capital to experiment, blending has become conservative — the 1935 reserve is 70% of what it was in 1929. A small desktop laboratory has appeared: a basic microscope for yeast counts, a pH meter (one of the first), and a small test tank for bench trials. The cellarmaster uses them sparingly — reagents are expensive. There is more anxiety here than inspiration.',
      labor: { workers: '1 cellarmaster + 1 junior assistant', hours: 'Lab work added to daily routine', skill: 'Intuitive + early laboratory methods' },
      equipment: ['Desktop microscope (yeast count)', 'Early pH meter (glass electrode)', 'Small bench trial tank', 'Paper notebooks replacing leather diaries', 'Basic reagents (scarce)'],
      risk: [
        { level: 'high', text: 'Inability to test for spoilage organisms' },
        { level: 'medium', text: 'Reagent contamination (shared glassware)' },
        { level: 'medium', text: 'Financial pressure affecting judgment' },
      ],
      change: 'The first practical pH meters for winemaking became commercially available in the late 1920s. Their adoption was slow — few wineries could afford them during the Depression.',
      artifact: { icon: '📉', title: 'Lab Notebook', text: '"pH meter reading: 3.62. Should be 3.4. Added tartaric acid: 2g/L. Recheck: 3.45. Acceptable. Reagents: 3 bottles left. Order placed but uncertain if we can pay."' },
    },
    1975: {
      title: "Cellarmaster's Office — Steel Revolution",
      text: 'The stone office has been replaced with a proper laboratory wing. Gas chromatography is now used to profile volatile compounds — the cellarmaster can for the first time see the ester profile of a wine numerically. A small电脑 (microcomputer) in the corner handles yield calculations. Blending is systematic: each component is tested and weighted, then assembled in the correct proportion. The cellarmaster is now as likely to be in the lab as in the cave.',
      labor: { workers: '1 winemaker + 1 lab technician', hours: 'Daily lab + blending trials', skill: 'Laboratory analysis + systematic blending' },
      equipment: ['Gas chromatograph (volatile profiling)', 'pH/multi-parameter analyser', 'Microcomputer (yield calculations)', 'Bench trial blending system', 'Industrial sample tank array'],
      risk: [
        { level: 'low', text: 'GC gas cylinder (pressurised)' },
        { level: 'low', text: 'Data loss (microcomputer — no backup)' },
      ],
      change: 'The introduction of chromatography to wine analysis in the 1970s created the first objective framework for understanding what made a wine "complex." It didn\'t replace the palate — but it explained it.',
      artifact: { icon: '🧬', title: 'GC Profile — 1975 Reserve', text: '"Ethyl acetate: 45 mg/L (within range). Hexanol: 1.8 mg/L (low = elegant). Isoamyl acetate: 3.2 mg/L (banana note — balanced). 2-phenylethyl alcohol: 28 mg/L (rose — high). Conclusion: Complex, should develop further. Score: 91/100."' },
    },
    2025: {
      title: "Cellarmaster's Office — Smart Vintage",
      text: 'The office is now a data command centre. A wall-mounted screen shows a live sensory map of every tank in the winery — updated every six hours from the IoT network. Machine learning predicts blend performance before a single trial blend is mixed. The cellarmaster\'s role has shifted to narrative and relationship — building the story of the vintage, visiting growers, and interpreting what the data cannot fully capture. The lab is fully remote-capable: samples are scanned and results returned by AI Sommelier.',
      labor: { workers: '1 winemaker + AI co-pilot', hours: 'Strategic + creative focus', skill: 'Data interpretation + sensory AI collaboration' },
      equipment: ['Live winery dashboard (IoT)', 'ML blend prediction engine', 'AI sensory analysis (remote lab)', 'Digital vintage journal (cloud)', 'Virtual vineyard tour system'],
      risk: [
        { level: 'very-low', text: 'AI model bias (sensory drift risk — monitored)' },
        { level: 'low', text: 'Data privacy (cloud sensory profiles)' },
        { level: 'low', text: 'Over-reliance on prediction — loss of intuition' },
      ],
      change: 'The biggest shift of the 2020s: the winemaker\'s intuition is now augmented, not replaced. The best winemakers use AI to validate hunches they could never prove — and then override it when their palate says otherwise.',
      artifact: { icon: '🤖', title: 'AI Co-Pilot Suggestion', text: '"Suggested 2025 Reserve blend: 68% North Ridge Cabernet, 22% Valley Floor Merlot, 10% Block 7 Petit Verdot. Predicted score: 94.2. Confidence: 87%. Human note: AI recommends more Petit Verdot for structure. Winemaker override: hold at 10% — 2025 tannins are already firm. Final blend score (post-hoc): 95. AI updated model."' },
    },
  },
};

// ── Random Artifacts ──────────────────────────
const ARTIFACTS = [
  { icon: '🗺️', title: 'Ancient Cave Map', text: 'A hand-drawn map of the hillside caves, dated 1887. Someone has annotated it in pencil: "Danger — low ceiling, third cave."' },
  { icon: '🍷', title: 'Museum Label', text: '" bottle of 1947 Château Bernadotte — one of the last vintages before the great replanting. Label design by Henri Delacroix, cellarmaster 1931–1962."' },
  { icon: '🔬', title: 'Academic Paper Clipping', text: '"The Influence of Barrel Toasting on Vanillin Extraction in Quercus robur — Journal of Viticultural Science, 1976." Found pressed inside a ledger from the library.' },
  { icon: '🌡️', title: 'Broken Thermometer', text: 'A vintage mercury thermometer from 1902, its stem snapped. The cellar hand\'s note: "Broke during January freeze. Replaced with new one from Lyon — cost 12 francs."' },
  { icon: '🎫', title: 'Harvest Festival Ticket', text: '"Annual Harvest Festival, 1923. 1 franc entry. Winemaker\'s daughter plays piano at 3pm. Dancing in the crush pad after sunset."' },
  { icon: '📡', title: 'Early Radio Note', text: '"First broadcast of vintage report on Radio Vallée — listeners in Lyon and Paris can hear the harvest begin. Reception poor in rain." — 1938' },
  { icon: '💾', title: 'Floppy Disk', text: '"Winery accounts, 1992 — archived by Marie-Claire. Contains vintage comparison data for 1975–1992. The floppy itself is unreadable, but the paper index survives."' },
  { icon: '📷', title: 'Faded Photograph', text: '"Bottling line crew, 1962. Twelve people stand in front of the new mechanical line. One woman in the back row is not smiling — she is the only one wearing safety goggles."' },
];

// ── State ─────────────────────────────────────
let currentEra = '1935';
let compareMode = false;
let compareEra = '1975';
let selectedZone = null;
let artifactIndex = 0;

// ── SVG Floor Plan ────────────────────────────
function buildFloorPlanSVG(era) {
  const c = ERA_COLORS[era];
  const zones = ZONES;

  const svg = `
  <svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Winery floor plan, ${era}">
    <defs>
      <pattern id="hatch-${era}" patternUnits="userSpaceOnUse" width="6" height="6">
        <line x1="0" y1="0" x2="6" y2="6" stroke="${c.walls}" stroke-width="0.5" opacity="0.3"/>
      </pattern>
      <filter id="glow-${era}">
        <feGaussianBlur stdDeviation="2" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>

    <!-- Background -->
    <rect width="400" height="320" fill="${c.bg}"/>

    <!-- Outer walls -->
    <rect x="10" y="10" width="380" height="300" fill="none" stroke="${c.walls}" stroke-width="3" rx="4"/>
    <!-- Inner dividing walls -->
    <line x1="10" y1="110" x2="390" y2="110" stroke="${c.walls}" stroke-width="1.5" stroke-dasharray="4,3"/>
    <line x1="10" y1="210" x2="390" y2="210" stroke="${c.walls}" stroke-width="1.5" stroke-dasharray="4,3"/>
    <line x1="200" y1="110" x2="200" y2="310" stroke="${c.walls}" stroke-width="1.5" stroke-dasharray="4,3"/>

    <!-- ROOM: Crush Pad (top-left) -->
    <g id="zone-crush" class="zone-hotspot" data-zone="crush_pad" tabindex="0" role="button" aria-label="Crush Pad">
      <rect x="14" y="14" width="182" height="92" fill="${c.zone}" stroke="${c.accent}" stroke-width="1.5" rx="3" class="zone-area"/>
      <rect x="14" y="14" width="182" height="92" fill="url(#hatch-${era})" rx="3"/>
      <text x="105" y="58" text-anchor="middle" class="zone-label" fill="${c.text}" font-size="11">CRUSH PAD</text>
      <text x="105" y="73" text-anchor="middle" class="zone-label" fill="${c.text}" font-size="9" opacity="0.7">Sorting · Treading</text>
      <circle cx="30" cy="30" r="8" fill="${c.hotspot}" class="hotspot-circle" filter="url(#glow-${era})"/>
      <text x="30" y="34" text-anchor="middle" fill="white" font-size="9">🍇</text>
    </g>

    <!-- ROOM: Office (top-right) -->
    <g id="zone-office" class="zone-hotspot" data-zone="office" tabindex="0" role="button" aria-label="Cellarmaster's Office">
      <rect x="204" y="14" width="182" height="92" fill="${c.zone}" stroke="${c.accent}" stroke-width="1.5" rx="3" class="zone-area"/>
      <rect x="204" y="14" width="182" height="92" fill="url(#hatch-${era})" rx="3"/>
      <text x="295" y="58" text-anchor="middle" class="zone-label" fill="${c.text}" font-size="11">CELLARMASTER'S</text>
      <text x="295" y="73" text-anchor="middle" class="zone-label" fill="${c.text}" font-size="11">OFFICE</text>
      <text x="295" y="88" text-anchor="middle" class="zone-label" fill="${c.text}" font-size="9" opacity="0.7">Lab · Blending</text>
      <circle cx="220" cy="30" r="8" fill="${c.hotspot}" class="hotspot-circle" filter="url(#glow-${era})"/>
      <text x="220" y="34" text-anchor="middle" fill="white" font-size="9">📋</text>
    </g>

    <!-- ROOM: Fermentation (center) -->
    <g id="zone-ferment" class="zone-hotspot" data-zone="fermentation" tabindex="0" role="button" aria-label="Fermentation Hall">
      <rect x="14" y="114" width="182" height="92" fill="${c.zone}" stroke="${c.accent}" stroke-width="1.5" rx="3" class="zone-area"/>
      <rect x="14" y="114" width="182" height="92" fill="url(#hatch-${era})" rx="3"/>
      <text x="105" y="158" text-anchor="middle" class="zone-label" fill="${c.text}" font-size="11">FERMENTATION HALL</text>
      <text x="105" y="173" text-anchor="middle" class="zone-label" fill="${c.text}" font-size="9" opacity="0.7">Tanks · Vats</text>
      <!-- Tank/vat shapes (era-dependent) -->
      ${buildTankSVG(era, c)}
      <circle cx="30" cy="130" r="8" fill="${c.hotspot}" class="hotspot-circle" filter="url(#glow-${era})"/>
      <text x="30" y="134" text-anchor="middle" fill="white" font-size="9">🔥</text>
    </g>

    <!-- ROOM: Press Room (bottom-left) -->
    <g id="zone-press" class="zone-hotspot" data-zone="press_room" tabindex="0" role="button" aria-label="Press Room">
      <rect x="14" y="214" width="182" height="92" fill="${c.zone}" stroke="${c.accent}" stroke-width="1.5" rx="3" class="zone-area"/>
      <rect x="14" y="214" width="182" height="92" fill="url(#hatch-${era})" rx="3"/>
      <text x="105" y="258" text-anchor="middle" class="zone-label" fill="${c.text}" font-size="11">PRESS ROOM</text>
      <text x="105" y="273" text-anchor="middle" class="zone-label" fill="${c.text}" font-size="9" opacity="0.7">Pressing · Extraction</text>
      <circle cx="30" cy="230" r="8" fill="${c.hotspot}" class="hotspot-circle" filter="url(#glow-${era})"/>
      <text x="30" y="234" text-anchor="middle" fill="white" font-size="9">⚙️</text>
    </g>

    <!-- ROOM: Barrel Caves (bottom-center) -->
    <g id="zone-barrel" class="zone-hotspot" data-zone="barrel_caves" tabindex="0" role="button" aria-label="Barrel Caves">
      <rect x="204" y="214" width="92" height="92" fill="${c.zone}" stroke="${c.accent}" stroke-width="1.5" rx="3" class="zone-area"/>
      <rect x="204" y="214" width="92" height="92" fill="url(#hatch-${era})" rx="3"/>
      <text x="250" y="258" text-anchor="middle" class="zone-label" fill="${c.text}" font-size="10">BARREL</text>
      <text x="250" y="271" text-anchor="middle" class="zone-label" fill="${c.text}" font-size="10">CAVES</text>
      <text x="250" y="284" text-anchor="middle" class="zone-label" fill="${c.text}" font-size="9" opacity="0.7">Ageing</text>
      <!-- Barrel rows (era-specific) -->
      ${buildBarrelSVG(era, c)}
      <circle cx="220" cy="230" r="8" fill="${c.hotspot}" class="hotspot-circle" filter="url(#glow-${era})"/>
      <text x="220" y="234" text-anchor="middle" fill="white" font-size="9">🪵</text>
    </g>

    <!-- ROOM: Dispatch (bottom-right) -->
    <g id="zone-dispatch" class="zone-hotspot" data-zone="dispatch" tabindex="0" role="button" aria-label="Bottling and Dispatch">
      <rect x="300" y="214" width="86" height="92" fill="${c.zone}" stroke="${c.accent}" stroke-width="1.5" rx="3" class="zone-area"/>
      <rect x="300" y="214" width="86" height="92" fill="url(#hatch-${era})" rx="3"/>
      <text x="343" y="258" text-anchor="middle" class="zone-label" fill="${c.text}" font-size="10">BOTTLING &amp;</text>
      <text x="343" y="271" text-anchor="middle" class="zone-label" fill="${c.text}" font-size="10">DISPATCH</text>
      <circle cx="316" cy="230" r="8" fill="${c.hotspot}" class="hotspot-circle" filter="url(#glow-${era})"/>
      <text x="316" y="234" text-anchor="middle" fill="white" font-size="9">📦</text>
    </g>

    <!-- Corridor labels -->
    <text x="105" y="118" text-anchor="middle" fill="${c.walls}" font-size="8" font-style="italic" opacity="0.6">WINE PRODUCTION</text>
    <text x="105" y="218" text-anchor="middle" fill="${c.walls}" font-size="8" font-style="italic" opacity="0.6">CELLAR &amp; STORAGE</text>
    <text x="343" y="218" text-anchor="middle" fill="${c.walls}" font-size="8" font-style="italic" opacity="0.6">OPERATIONS</text>

    <!-- Era label watermark -->
    <text x="200" y="165" text-anchor="middle" fill="${c.accent}" font-size="48" opacity="0.06" font-weight="bold" pointer-events="none">${era}</text>

  </svg>`;
  return svg;
}

function buildTankSVG(era, c) {
  if (era === '1890') {
    return `
    <rect x="60" y="150" width="30" height="40" fill="${c.walls}" stroke="${c.accent}" stroke-width="1" rx="2" opacity="0.6"/>
    <rect x="100" y="155" width="25" height="35" fill="${c.walls}" stroke="${c.accent}" stroke-width="1" rx="2" opacity="0.6"/>
    <rect x="135" y="152" width="28" height="38" fill="${c.walls}" stroke="${c.accent}" stroke-width="1" rx="2" opacity="0.6"/>
    <text x="105" y="200" text-anchor="middle" fill="${c.text}" font-size="8" opacity="0.6">wooden vats</text>`;
  } else if (era === '1935') {
    return `
    <rect x="55" y="148" width="35" height="42" fill="${c.walls}" stroke="${c.accent}" stroke-width="1.5" rx="3" opacity="0.7"/>
    <rect x="100" y="152" width="30" height="38" fill="${c.walls}" stroke="${c.accent}" stroke-width="1.5" rx="3" opacity="0.7"/>
    <rect x="140" y="150" width="32" height="40" fill="${c.walls}" stroke="${c.accent}" stroke-width="1.5" rx="3" opacity="0.7"/>
    <text x="105" y="200" text-anchor="middle" fill="${c.text}" font-size="8" opacity="0.6">concrete tanks</text>`;
  } else if (era === '1975') {
    return `
    <rect x="50" y="145" width="28" height="45" fill="none" stroke="${c.accent}" stroke-width="1.5" rx="14" opacity="0.8"/>
    <rect x="85" y="148" width="26" height="42" fill="none" stroke="${c.accent}" stroke-width="1.5" rx="13" opacity="0.8"/>
    <rect x="118" y="146" width="28" height="44" fill="none" stroke="${c.accent}" stroke-width="1.5" rx="14" opacity="0.8"/>
    <rect x="152" y="149" width="25" height="41" fill="none" stroke="${c.accent}" stroke-width="1.5" rx="12" opacity="0.8"/>
    <text x="105" y="200" text-anchor="middle" fill="${c.text}" font-size="8" opacity="0.6">SS fermenters</text>`;
  } else {
    return `
    <rect x="48" y="143" width="26" height="47" fill="none" stroke="${c.accent}" stroke-width="1.5" rx="13" opacity="0.9"/>
    <rect x="80" y="146" width="24" height="44" fill="none" stroke="${c.accent}" stroke-width="1.5" rx="12" opacity="0.9"/>
    <rect x="110" y="144" width="26" height="46" fill="none" stroke="${c.accent}" stroke-width="1.5" rx="13" opacity="0.9"/>
    <rect x="142" y="147" width="23" height="43" fill="none" stroke="${c.accent}" stroke-width="1.5" rx="11" opacity="0.9"/>
    <rect x="170" y="145" width="22" height="45" fill="none" stroke="${c.accent}" stroke-width="1.5" rx="11" opacity="0.9"/>
    <circle cx="61" cy="165" r="2" fill="${c.hotspot}" opacity="0.7"/>
    <circle cx="92" cy="167" r="2" fill="${c.hotspot}" opacity="0.7"/>
    <circle cx="123" cy="167" r="2" fill="${c.hotspot}" opacity="0.7"/>
    <text x="105" y="200" text-anchor="middle" fill="${c.text}" font-size="8" opacity="0.6">IoT fermenters</text>`;
  }
}

function buildBarrelSVG(era, c) {
  const barrels = [];
  const cols = era === '1890' ? 4 : era === '1935' ? 3 : era === '1975' ? 4 : 5;
  const rows = 3;
  for (let r = 0; r < rows; r++) {
    for (let col = 0; col < cols; col++) {
      const bx = 212 + col * 14;
      const by = 230 + r * 12;
      const opacity = 0.5 + (0.5 * (rows - r) / rows);
      barrels.push(`<ellipse cx="${bx}" cy="${by}" rx="5" ry="3" fill="${c.walls}" stroke="${c.accent}" stroke-width="0.5" opacity="${opacity}"/>`);
    }
  }
  return barrels.join('');
}

// ── Render functions ───────────────────────────
function renderMap(era) {
  const frame = document.getElementById('mapFrame');
  frame.innerHTML = buildFloorPlanSVG(era);
  document.getElementById('mapContainer').style.background = ERA_COLORS[era].bg;

  // Attach click listeners to hotspots
  frame.querySelectorAll('.zone-hotspot').forEach(el => {
    el.addEventListener('click', e => {
      const zone = el.dataset.zone;
      openZonePanel(zone, era);
    });
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openZonePanel(el.dataset.zone, era);
      }
    });
    // Touch: show tooltip briefly before panel
    let tooltip = null;
    el.addEventListener('touchstart', e => {
      tooltip = showTooltip(el.dataset.zone);
    }, { passive: true });
    el.addEventListener('touchend', () => {
      if (tooltip) { tooltip.remove(); tooltip = null; }
    }, { passive: true });
  });
}

function showTooltip(zoneKey) {
  removeTooltip();
  const zone = ZONES[zoneKey];
  const el = document.querySelector(`[data-zone="${zoneKey}"]`);
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  const mapRect = document.getElementById('mapContainer').getBoundingClientRect();
  const tip = document.createElement('div');
  tip.className = 'zone-tooltip visible';
  tip.textContent = `${zone.icon} ${zone.name}`;
  tip.style.left = (rect.left - mapRect.left + rect.width / 2) + 'px';
  tip.style.top = (rect.top - mapRect.top) + 'px';
  document.getElementById('mapContainer').appendChild(tip);
  return tip;
}

function removeTooltip() {
  document.querySelectorAll('.zone-tooltip').forEach(t => t.remove());
}

function buildPanelHTML(zoneKey, era) {
  const zone = ZONES[zoneKey];
  const data = ZONE_DATA[zoneKey] && ZONE_DATA[zoneKey][era];
  if (!data) return `<p class="panel-text">No data for this era yet.</p>`;

  const riskLabel = { high: 'High', medium: 'Medium', low: 'Low', 'very-low': 'Very Low' };

  const equipList = (data.equipment || []).map(e => `<li>${e}</li>`).join('');
  const riskList = (data.risk || []).map(r => `
    <div class="panel-risk-row">
      <span class="risk-dot risk-${r.level}"></span>
      <span>${r.text} <span style="color:var(--text-light);font-size:11px">(${riskLabel[r.level] || r.level})</span></span>
    </div>`).join('');

  return `
    <span class="zone-era-badge era-${era}">${era}</span>
    <h2 class="panel-zone-name">${zone.icon} ${data.title || zone.name}</h2>
    <p class="panel-text">${data.text}</p>

    ${data.labor ? `
    <div class="panel-section">
      <div class="panel-section-title">Labour &amp; Workforce</div>
      <div class="panel-labor-row">
        <span class="labor-icon">👷</span>
        <span>Workers</span>
        <span class="labor-stat">${data.labor.workers}</span>
      </div>
      <div class="panel-labor-row">
        <span class="labor-icon">⏰</span>
        <span>Hours</span>
        <span class="labor-stat">${data.labor.hours}</span>
      </div>
      <div class="panel-labor-row">
        <span class="labor-icon">🎓</span>
        <span>Skill level</span>
        <span class="labor-stat">${data.labor.skill}</span>
      </div>
    </div>` : ''}

    ${data.equipment ? `
    <div class="panel-section">
      <div class="panel-section-title">Equipment</div>
      <ul style="padding-left:16px;font-size:13px;color:var(--text-light)">${equipList}</ul>
    </div>` : ''}

    ${data.risk ? `
    <div class="panel-section">
      <div class="panel-section-title">Hazards &amp; Risks</div>
      ${riskList}
    </div>` : ''}

    ${data.change ? `
    <div class="panel-change-box">
      <strong>What changed here?</strong><br>${data.change}
    </div>` : ''}

    ${data.artifact ? `
    <div class="panel-section" style="margin-top:16px">
      <div class="panel-section-title">📜 Historical Artifact</div>
      <div style="background:#FFFDF0;border:1px solid var(--border);border-radius:8px;padding:12px;font-size:13px">
        <div style="font-size:28px;margin-bottom:4px">${data.artifact.icon}</div>
        <strong style="font-size:12px">${data.artifact.title}</strong>
        <p style="color:var(--text-light);font-style:italic;margin-top:4px;line-height:1.5">${data.artifact.text}</p>
      </div>
    </div>` : ''}
  `;
}

function openZonePanel(zoneKey, era) {
  const panel = document.getElementById('zonePanel');
  const content = document.getElementById('panelContent');
  content.innerHTML = buildPanelHTML(zoneKey, era);
  panel.classList.add('open');
  selectedZone = zoneKey;
  document.getElementById('walkHint').classList.add('hidden');

  // Update legend selection
  document.querySelectorAll('.legend-item').forEach(el => {
    el.classList.toggle('selected', el.dataset.zone === zoneKey);
  });
}

function closePanel() {
  document.getElementById('zonePanel').classList.remove('open');
  selectedZone = null;
  document.querySelectorAll('.legend-item').forEach(el => el.classList.remove('selected'));
}

// ── Compare Mode ──────────────────────────────
function renderCompareOverlay() {
  const overlay = document.getElementById('compareOverlay');
  const era1 = currentEra;
  const era2 = compareEra;
  const zones = Object.keys(ZONES);

  let html = `
    <div class="compare-header">Compare: ${era1} vs ${era2}</div>
    <div class="compare-era-row">
      <button class="compare-era-btn ${era1 === currentEra ? 'active' : ''}" data-cera="${era1}">${era1}</button>
      <button class="compare-era-btn ${era2 === currentEra ? 'active' : ''}" data-cera="${era2}">${era2}</button>
    </div>
    <div class="compare-grid">
  `;

  zones.forEach(zKey => {
    const zone = ZONES[zKey];
    const d1 = ZONE_DATA[zKey] && ZONE_DATA[zKey][era1];
    const d2 = ZONE_DATA[zKey] && ZONE_DATA[zKey][era2];
    html += `
      <div class="compare-card">
        <div class="compare-card-header">${zone.icon} ${zone.name}</div>
        ${d1 ? `<div class="compare-stat"><span>Workers (${era1})</span><span>${d1.labor ? d1.labor.workers : '—'}</span></div>` : ''}
        ${d2 ? `<div class="compare-stat"><span>Workers (${era2})</span><span>${d2.labor ? d2.labor.workers : '—'}</span></div>` : ''}
        ${d1 && d1.labor ? `<div class="compare-stat"><span>Hours (${era1})</span><span>${d1.labor.hours}</span></div>` : ''}
        ${d2 && d2.labor ? `<div class="compare-stat"><span>Hours (${era2})</span><span>${d2.labor.hours}</span></div>` : ''}
        ${d1 && d1.equipment ? `<div class="compare-stat"><span>Top equip ${era1}</span><span>${d1.equipment[0]}</span></div>` : ''}
        ${d2 && d2.equipment ? `<div class="compare-stat"><span>Top equip ${era2}</span><span>${d2.equipment[0]}</span></div>` : ''}
        ${d1 ? `<div class="compare-stat"><span>${era1} change</span><span>${d1.change ? '📍' : '—'}</span></div>` : ''}
        ${d2 ? `<div class="compare-stat"><span>${era2} change</span><span>${d2.change ? '📍' : '—'}</span></div>` : ''}
      </div>
    `;
  });

  html += '</div>';
  overlay.innerHTML = html;

  // Attach compare era switcher
  overlay.querySelectorAll('.compare-era-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      compareEra = btn.dataset.cea;
      renderCompareOverlay();
    });
  });
}

// ── Legend ────────────────────────────────────
function buildLegend() {
  const container = document.getElementById('legendItems');
  container.innerHTML = Object.entries(ZONES).map(([key, zone]) => `
    <button class="legend-item" data-zone="${key}" aria-label="${zone.name}">
      <span class="legend-dot" style="background:${zone.legendColor}"></span>
      ${zone.icon} ${zone.name}
    </button>
  `).join('');

  container.querySelectorAll('.legend-item').forEach(btn => {
    btn.addEventListener('click', () => {
      openZonePanel(btn.dataset.zone, currentEra);
    });
  });
}

// ── Era Switching ─────────────────────────────
function switchEra(era) {
  currentEra = era;
  document.querySelectorAll('.era-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.era === era);
    btn.setAttribute('aria-selected', btn.dataset.era === era);
  });
  renderMap(era);
  if (selectedZone) {
    openZonePanel(selectedZone, era);
  }
}

// ── Artifact callout ──────────────────────────
function showArtifact(index) {
  const a = ARTIFACTS[index % ARTIFACTS.length];
  const callout = document.getElementById('artifactCallout');
  document.getElementById('artifactIcon').textContent = a.icon;
  document.getElementById('artifactTitle').textContent = a.title;
  document.getElementById('artifactText').textContent = a.text;
  callout.classList.remove('hidden');
  artifactIndex = (index + 1) % ARTIFACTS.length;
}

function hideArtifact() {
  document.getElementById('artifactCallout').classList.add('hidden');
}

// ── Init ──────────────────────────────────────
function init() {
  buildLegend();
  renderMap(currentEra);

  // Era buttons
  document.querySelectorAll('.era-btn').forEach(btn => {
    btn.addEventListener('click', () => switchEra(btn.dataset.era));
  });

  // Panel close
  document.getElementById('panelClose').addEventListener('click', closePanel);

  // Compare toggle
  document.getElementById('compareMode').addEventListener('change', e => {
    compareMode = e.target.checked;
    const overlay = document.getElementById('compareOverlay');
    overlay.classList.toggle('active', compareMode);
    if (compareMode) renderCompareOverlay();
  });

  // Artifact next
  document.getElementById('artifactNext').addEventListener('click', () => showArtifact(artifactIndex));
  document.getElementById('artifactClose').addEventListener('click', hideArtifact);

  // Hide walk hint after first interaction
  const hint = document.getElementById('walkHint');
  const hideHint = () => { hint.classList.add('hidden'); };
  document.getElementById('mapFrame').addEventListener('click', hideHint, { once: true });

  // Show an artifact after 20 seconds (ambient delight)
  setTimeout(() => {
    showArtifact(0);
    setTimeout(hideArtifact, 18000); // auto-dismiss after 18s
  }, 20000);

  // Also show artifact on double-tap of floor plan background
  document.getElementById('mapFrame').addEventListener('dblclick', e => {
    if (e.target.closest('.zone-hotspot')) return;
    showArtifact(Math.floor(Math.random() * ARTIFACTS.length));
  });
}

// Wait for DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
