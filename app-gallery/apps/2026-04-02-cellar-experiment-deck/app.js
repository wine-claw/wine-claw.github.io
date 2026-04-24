/**
 * Cellar Experiment Deck — app.js
 * A playful but practical winery experiment idea generator.
 */

'use strict';

// =====================================================================
// DATA POOLS
// =====================================================================

const CARD_POOLS = {
  objective: [
    { id: 'obj-01', text: 'Improve aromatic expression & lift', meta: 'Sensory outcome' },
    { id: 'obj-02', text: 'Increase palate texture & mouthfeel', meta: 'Structural improvement' },
    { id: 'obj-03', text: 'Reduce sulfur off-character risk', meta: 'Fault prevention' },
    { id: 'obj-04', text: 'Accelerate or stabilise MLF timing', meta: 'Process efficiency' },
    { id: 'obj-05', text: 'Improve colour density & stability', meta: 'Visual quality' },
    { id: 'obj-06', text: 'Reduce oxidation character development', meta: 'Freshness preservation' },
    { id: 'obj-07', text: 'Optimise juice settling clarity & speed', meta: 'Clarification efficiency' },
    { id: 'obj-08', text: 'Test alternative oak integration curves', meta: 'Oak management' },
    { id: 'obj-09', text: 'Assess tannin extraction & balance', meta: 'Structure tuning' },
    { id: 'obj-10', text: 'Evaluate juice extraction efficiency', meta: 'Yield optimisation' },
    { id: 'obj-11', text: 'Reduce fermentation lag or stall risk', meta: 'Fermentation reliability' },
    { id: 'obj-12', text: 'Improve tartaric cold stabilisation efficiency', meta: 'Stabilisation cost' },
    { id: 'obj-13', text: 'Evaluate alternative fining agents', meta: 'Clarification & style' },
    { id: 'obj-14', text: 'Test lower-dose filtration for retained body', meta: 'Filter choice' },
    { id: 'obj-15', text: 'Assess inert gas cover effectiveness at racking', meta: 'Oxidation control' },
    { id: 'obj-16', text: 'Optimise lees contact duration for whites', meta: 'Lees management' },
    { id: 'obj-17', text: 'Reduce punt closure ullage creep', meta: 'Packaging integrity' },
    { id: 'obj-18', text: 'Compare commercial vs indigenous yeast character', meta: 'Fermentation character' },
    { id: 'obj-19', text: 'Test pump speed effect on must oxidation', meta: 'Handling gentleness' },
    { id: 'obj-20', text: 'Evaluate heat exchanger approach temperature', meta: 'Thermal efficiency' },
    { id: 'obj-21', text: 'Assess tartaric acid addition timing impact', meta: 'pH & style' },
    { id: 'obj-22', text: 'Compare enzyme addition timing (pre- vs post-pressing)', meta: 'Processing aid' },
    { id: 'obj-23', text: 'Test nutrient addition regime (type & timing)', meta: 'Fermentation nutrition' },
    { id: 'obj-24', text: 'Assess cold soak benefit for red colour extraction', meta: 'Pre-fermentation' },
    { id: 'obj-25', text: 'Compare different whole-bunch percentages', meta: 'Stem inclusion' },
  ],

  process: [
    { id: 'prc-01', text: 'Crush / Destemming', meta: 'Receipt' },
    { id: 'prc-02', text: 'Pressing (white/rosé)', meta: 'Extraction' },
    { id: 'prc-03', text: 'Red fermentation', meta: 'Main ferment' },
    { id: 'prc-04', text: 'White / aromatic fermentation', meta: 'Main ferment' },
    { id: 'prc-05', text: 'Malolactic fermentation', meta: 'Secondary' },
    { id: 'prc-06', text: 'Lees contact & bâttonage', meta: 'Post-ferm' },
    { id: 'prc-07', text: 'Fining & clarification', meta: 'Stabilisation' },
    { id: 'prc-08', text: 'Filtration', meta: 'Polish' },
    { id: 'prc-09', text: 'Barrel / oak ageing', meta: 'Maturation' },
    { id: 'prc-10', text: 'Bottling line (DO checks)', meta: 'Packaging' },
    { id: 'prc-11', text: 'Cold stabilisation', meta: 'Tartaric stab' },
    { id: 'prc-12', text: 'CIP / cleaning-in-place', meta: 'Hygiene' },
    { id: 'prc-13', text: 'Heat exchanger operation', meta: 'Thermal' },
    { id: 'prc-14', text: 'Racking & transfers', meta: 'Handling' },
    { id: 'prc-15', text: 'Cold soak pre-fermentation', meta: 'Red processing' },
    { id: 'prc-16', text: 'Settling & débourbage', meta: 'Juice prep' },
    { id: 'prc-17', text: 'pH & acid adjustment', meta: 'Corrective' },
    { id: 'prc-18', text: 'MLF bacteria management', meta: 'Culture work' },
    { id: 'prc-19', text: 'Post-ferm temperature management', meta: 'Stability' },
    { id: 'prc-20', text: 'Pre-fermentation cap management', meta: 'Red extraction' },
  ],

  intervention: [
    { id: 'int-01', text: 'Use inert gas (N₂/CO₂) throughout handling', tags: ['oxygen-control', 'low-cost'] },
    { id: 'int-02', text: 'Apply micro-oxygenation at controlled rates post-MLF', tags: ['oxygen-control', 'red-wine'] },
    { id: 'int-03', text: 'Extended splash racking to deliberately oxidise', tags: ['oxygen-control', 'white-wine'] },
    { id: 'int-04', text: 'Reduced press cycle time & pressure', tags: ['pressing', 'low-cost'] },
    { id: 'int-05', text: 'Whole-cluster / whole-bunch inclusion at crush', tags: ['fermentation', 'red-wine'] },
    { id: 'int-06', text: 'Cold soak 5–7°C for 3–5 days pre-ferment', tags: ['fermentation', 'red-wine', 'quick-trial'] },
    { id: 'int-07', text: 'Pump speed reduction to 50% normal flow rate', tags: ['handling', 'low-cost', 'analytical'] },
    { id: 'int-08', text: 'Prolonged lees contact (60+ days, weekly bâttonage)', tags: ['white-wine', 'lees', 'analytical'] },
    { id: 'int-09', text: 'Early lees removal (7 days post-ferm) vs extended', tags: ['white-wine', 'lees', 'low-cost'] },
    { id: 'int-10', text: 'Bentonite fining at 0.5× standard dose', tags: ['fining', 'low-cost', 'analytical'] },
    { id: 'int-11', text: 'Casein / skim milk fining comparison', tags: ['fining', 'analytical'] },
    { id: 'int-12', text: 'No added SO₂ through fermentation (GAPS approach)', tags: ['sustainability', 'fermentation'] },
    { id: 'int-13', text: 'Timing tartaric addition at crush vs at ferment', tags: ['acid', 'analytical'] },
    { id: 'int-14', text: 'Beta-glucanase enzyme addition pre-press', tags: ['enzyme', 'white-wine'] },
    { id: 'int-15', text: 'Thiol-boosting nutrient (sur lie with specific N)', tags: ['nutrient', 'white-wine', 'analytical'] },
    { id: 'int-16', text: 'Thiamine addition at 50 mg/100kg must', tags: ['nutrient', 'low-cost'] },
    { id: 'int-17', text: 'DAP vs organic N source (partial substitution)', tags: ['nutrient', 'analytical'] },
    { id: 'int-18', text: 'Use alternative oak: chips vs staves vs barrel', tags: ['oak', 'packaging', 'analytical'] },
    { id: 'int-19', text: 'Second-fill barrel vs third-fill for early-drink fruit', tags: ['oak', 'red-wine', 'low-cost'] },
    { id: 'int-20', text: 'Bottle aging under different closure types', tags: ['packaging', 'analytical'] },
    { id: 'int-21', text: 'Lightweight glass vs standard bottle comparison', tags: ['packaging', 'sustainability'] },
    { id: 'int-22', text: 'Adjust filtration plate type (lenticular vs diatomaceous)', tags: ['filtration', 'analytical'] },
    { id: 'int-23', text: 'Lower filtration dosage or skip polishing filter', tags: ['filtration', 'low-cost'] },
    { id: 'int-24', text: 'Target bottling DO of 0.5 mg/L vs 1.2 mg/L', tags: ['packaging', 'analytical'] },
    { id: 'int-25', text: 'Increase CIP wash temperature by 10°C', tags: ['cip', 'low-cost'] },
    { id: 'int-26', text: 'Reduce CIP contact time from 30 to 20 min per step', tags: ['cip', 'sustainability', 'low-cost'] },
    { id: 'int-27', text: 'Optimise heat exchanger delta-T (reduce approach temp)', tags: ['thermal', 'sustainability', 'low-cost'] },
    { id: 'int-28', text: 'Adjust cold stab target: −4°C vs −5°C', tags: ['stabilisation', 'low-cost'] },
    { id: 'int-29', text: 'Use mannoprotein tartaric stabiliser as alternative', tags: ['stabilisation', 'sustainability', 'analytical'] },
    { id: 'int-30', text: 'Wild vs cultured MLF bacteria timing trial', tags: ['mlf', 'analytical'] },
    { id: 'int-31', text: 'Harvest fruit at 12.5° Be vs 13° Be for freshness', tags: ['fermentation', 'white-wine'] },
    { id: 'int-32', text: 'Punch-down vs pump-over at 2× daily frequency', tags: ['fermentation', 'red-wine', 'quick-trial'] },
    { id: 'int-33', text: 'Ferment at 18°C vs 22°C for aromatic whites', tags: ['fermentation', 'white-wine', 'analytical'] },
    { id: 'int-34', text: 'Post-ferm temperature ramp-down to 12°C over 5 days', tags: ['fermentation', 'white-wine'] },
    { id: 'int-35', text: 'Use remnant lees from previous vintage as inoculum', tags: ['sustainability', 'low-cost', 'fermentation'] },
  ],

  measurement: [
    { id: 'msr-01', text: 'Track TA, pH, °Brix at crush, mid-ferm, end-ferm', meta: 'Core chemistry' },
    { id: 'msr-02', text: 'Measure Va, SO₂ (free & total) at key stages', meta: 'Oxidation markers' },
    { id: 'msr-03', text: 'Monitor dissolved O₂ pre/post every racking', meta: 'Oxygen exposure' },
    { id: 'msr-04', text: 'Record turbidity (NTU) after settling & at bottling', meta: 'Clarification' },
    { id: 'msr-05', text: 'Measure colour density (A420+A520) & hue', meta: 'Colour quality' },
    { id: 'msr-06', text: 'Track phenolics & tannin via quick MIP or BSA index', meta: 'Structure' },
    { id: 'msr-07', text: 'Monitor MLF progress via L-malic acid (HPLC or kit)', meta: 'MLF tracking' },
    { id: 'msr-08', text: 'Measure galacturonic acid as a mannoprotein proxy', meta: 'Stability marker' },
    { id: 'msr-09', text: 'Track alcoholic strength (Gason & near-IR)', meta: 'Fermentation' },
    { id: 'msr-10', text: 'Measure polysaccharides (HPLC) at bottling', meta: 'Mouthfeel' },
    { id: 'msr-11', text: 'Sensory panel scoring: aroma, palate, structure (0–5)', meta: 'Sensory' },
    { id: 'msr-12', text: 'Track closure ullage & DO at 3, 6, 12 months', meta: 'Bottle development' },
    { id: 'msr-13', text: 'Measure relative density shift at cold stab', meta: 'Tartaric stability' },
    { id: 'msr-14', text: 'CIP conductivity & wash-off residue on coupons', meta: 'Cleaning efficacy' },
    { id: 'msr-15', text: 'Track fermentation heat output (calorimetry)', meta: 'Fermentation vigour' },
    { id: 'msr-16', text: 'Measure thiols (3MH, 4MMP) at bottling & 3 months', meta: 'Aroma compounds' },
    { id: 'msr-17', text: 'Cost per tonne/L recorded for all process steps', meta: 'Economic' },
    { id: 'msr-18', text: 'Shelf-life accelerated test: 40°C for 7 days, then panel', meta: 'Stability' },
  ],

  risk: [
    { id: 'rsk-01', text: 'Excessive oxidation dulls fruit characters', meta: 'Oxidation risk' },
    { id: 'rsk-02', text: 'MLF may over-acidify in low-pH ferments', meta: 'MLF risk' },
    { id: 'rsk-03', text: 'Extended lees contact risks reductive sulphur', meta: 'Lees risk' },
    { id: 'rsk-04', text: 'Bentonite over-fining strips aromatics', meta: 'Fining risk' },
    { id: 'rsk-05', text: 'Oak over-introduction masks terroir expression', meta: 'Oak risk' },
    { id: 'rsk-06', text: 'Low SO₂ increases VA & oxidation susceptibility', meta: 'Sulphur risk' },
    { id: 'rsk-07', text: 'Under-diligence of CIP may cause microbiological faults', meta: 'Hygiene risk' },
    { id: 'rsk-08', text: 'Cold soak can extract harsh green tannins if too long', meta: 'Extraction risk' },
    { id: 'rsk-09', text: 'High closure O₂ transmission can accelerate ageing', meta: 'Closure risk' },
    { id: 'rsk-10', text: 'Pump speeds above 200 L/hr can cause cavitation', meta: 'Equipment risk' },
    { id: 'rsk-11', text: 'Low-nutrient musts may stall or produce H₂S', meta: 'Nutrition risk' },
    { id: 'rsk-12', text: 'Early fining before MLF can strip nutrients', meta: 'Fining timing' },
    { id: 'rsk-13', text: 'Mannoprotein addition may cause haze if unfiltered', meta: 'Stabiliser risk' },
    { id: 'rsk-14', text: 'Filter medium may strip volatile aroma compounds', meta: 'Filtration risk' },
    { id: 'rsk-15', text: 'Harvest at lower Brix reduces alcohol & body', meta: 'Harvest timing' },
    { id: 'rsk-16', text: 'Warm bottling temps promote premature oxidation', meta: 'Packaging risk' },
    { id: 'rsk-17', text: 'Insufficient chilling before packaging → tartrate drop', meta: 'Cold stab risk' },
    { id: 'rsk-18', text: 'Whole-bunch inclusion addsgreen stemmy notes if >20%', meta: 'Stem risk' },
    { id: 'rsk-19', text: 'Uncontrolled wild MLF is unpredictable in timing', meta: 'MLF wild risk' },
    { id: 'rsk-20', text: 'Enzyme overdose may release bitter polysaccharides', meta: 'Enzyme risk' },
  ],

  effort: [
    { id: 'eff-1', text: '1 — Minimal', meta: 'Minor tweak, standard work order' },
    { id: 'eff-2', text: '2 — Moderate', meta: 'New procedure or additional sampling' },
    { id: 'eff-3', text: '3 — Significant', meta: 'New equipment, protocol, or outside contractor' },
  ],

  payoff: [
    { id: 'pay-1', text: '1 — Low', meta: 'Incremental improvement or mainly informational' },
    { id: 'pay-2', text: '2 — Moderate', meta: 'Clear quality or efficiency gain if positive' },
    { id: 'pay-3', text: '3 — High', meta: 'Major insight or significant cost/quality step-change' },
  ],
};

// =====================================================================
// PRESETS
// =====================================================================

const PRESETS = [
  {
    id: 'low-cost-oxygen',
    label: 'Low-cost O₂ Test',
    emoji: '💨',
    filters: ['low-cost', 'quick-trial'],
    lockedTypes: [],
    select: {
      objective: ['obj-06'],    // Reduce oxidation
      process: ['prc-14'],       // Racking
      intervention: ['int-01'],  // Inert gas
      measurement: ['msr-03'],   // DO tracking
      risk: ['rsk-01'],          // Oxidation risk
      effort: ['eff-1'],
      payoff: ['pay-2'],
    },
  },
  {
    id: 'lees-contact-trial',
    label: 'Lees Contact',
    emoji: '🫧',
    filters: [],
    lockedTypes: [],
    select: {
      objective: ['obj-16'],    // Lees contact duration
      process: ['prc-06'],      // Lees contact
      intervention: ['int-08'], // 60+ days
      measurement: ['msr-11', 'msr-02'],
      risk: ['rsk-03'],
      effort: ['eff-2'],
      payoff: ['pay-2'],
    },
  },
  {
    id: 'alternative-oak',
    label: 'Oak Alternatives',
    emoji: '🪵',
    filters: ['red-wine', 'analytical'],
    lockedTypes: [],
    select: {
      objective: ['obj-08'],    // Oak integration
      process: ['prc-09'],      // Barrel ageing
      intervention: ['int-18', 'int-19'], // Chips vs staves
      measurement: ['msr-11', 'msr-17'],
      risk: ['rsk-05'],
      effort: ['eff-2'],
      payoff: ['pay-2'],
    },
  },
  {
    id: 'packaging-do',
    label: 'Bottle DO Trial',
    emoji: '🍾',
    filters: ['packaging', 'analytical'],
    lockedTypes: [],
    select: {
      objective: ['obj-06'],    // Oxidation reduction
      process: ['prc-10'],      // Bottling
      intervention: ['int-24'], // Target DO
      measurement: ['msr-12', 'msr-02'],
      risk: ['rsk-09', 'rsk-16'],
      effort: ['eff-2'],
      payoff: ['pay-3'],
    },
  },
  {
    id: 'cold-stab-efficiency',
    label: 'Cold Stab Optimise',
    emoji: '❄️',
    filters: ['quick-trial', 'low-cost'],
    lockedTypes: [],
    select: {
      objective: ['obj-12'],    // Tartaric stab efficiency
      process: ['prc-11'],       // Cold stab
      intervention: ['int-28', 'int-29'], // Temp & mannoprotein
      measurement: ['msr-13', 'msr-17'],
      risk: ['rsk-13', 'rsk-17'],
      effort: ['eff-2'],
      payoff: ['pay-2'],
    },
  },
  {
    id: 'nutrient-regime',
    label: 'Nutrient Regime',
    emoji: '🧪',
    filters: ['analytical', 'fermentation'],
    lockedTypes: [],
    select: {
      objective: ['obj-11'],    // Reduce stall risk
      process: ['prc-03', 'prc-04'],
      intervention: ['int-15', 'int-16', 'int-17'],
      measurement: ['msr-01', 'msr-11', 'msr-15'],
      risk: ['rsk-11'],
      effort: ['eff-2'],
      payoff: ['pay-3'],
    },
  },
  {
    id: 'sustainability-cip',
    label: 'Green CIP',
    emoji: '🌿',
    filters: ['sustainability', 'low-cost'],
    lockedTypes: [],
    select: {
      objective: ['obj-12'],
      process: ['prc-12'],       // CIP
      intervention: ['int-25', 'int-26', 'int-27'],
      measurement: ['msr-14', 'msr-17'],
      risk: ['rsk-07'],
      effort: ['eff-2'],
      payoff: ['pay-2'],
    },
  },
  {
    id: 'finning-comparison',
    label: 'Fining Comparison',
    emoji: '⚗️',
    filters: ['analytical', 'white-wine'],
    lockedTypes: [],
    select: {
      objective: ['obj-02', 'obj-07'],
      process: ['prc-07'],      // Fining
      intervention: ['int-10', 'int-11'],
      measurement: ['msr-04', 'msr-05', 'msr-11'],
      risk: ['rsk-04', 'rsk-12'],
      effort: ['eff-2'],
      payoff: ['pay-2'],
    },
  },
];

// =====================================================================
// FILTER DEFINITIONS
// =====================================================================

const FILTER_DEFS = [
  { id: 'low-cost',     label: '💰 Low Cost',      cssClass: 'filter-low_cost' },
  { id: 'quick-trial',  label: '⚡ Quick Trial',    cssClass: '' },
  { id: 'analytical',   label: '📊 Analytical',     cssClass: '' },
  { id: 'sustainability', label: '🌿 Sustainable', cssClass: 'filter-sustainability' },
  { id: 'packaging',    label: '📦 Packaging',      cssClass: '' },
  { id: 'fermentation', label: '🧫 Fermentation',  cssClass: '' },
  { id: 'white-wine',   label: '🍾 White Wine',    cssClass: '' },
  { id: 'red-wine',     label: '🍷 Red Wine',      cssClass: '' },
  { id: 'mlf',          label: '🦠 MLF Focus',     cssClass: '' },
];

// =====================================================================
// APP STATE
// =====================================================================

const state = {
  currentCards: {},   // { objective: card, process: card, ... }
  lockedCards: {},     // { objective: true/false, ... }
  activeFilters: new Set(),
  activePreset: null,
  savedIdeas: [],
};

// =====================================================================
// HELPERS
// =====================================================================

function pickRandom(arr, excludeIds = []) {
  const pool = arr.filter(c => !excludeIds.includes(c.id));
  if (!pool.length) return arr[Math.floor(Math.random() * arr.length)];
  return pool[Math.floor(Math.random() * pool.length)];
}

function pickRandomFiltered(arr, filters) {
  if (!filters.size) return pickRandom(arr);
  const tagged = arr.filter(c => {
    if (!c.tags) return false;
    return [...filters].every(f => c.tags.includes(f));
  });
  const pool = tagged.length ? tagged : arr;
  return pool[Math.floor(Math.random() * pool.length)];
}

function briefLabel(type) {
  const map = {
    objective:   'Goal',
    process:     'Process Area',
    intervention:'Intervention',
    measurement: 'What to Measure',
    risk:        'Risk / Watchout',
    effort:      'Effort Level',
    payoff:      'Likely Payoff',
  };
  return map[type] || type;
}

function generateBriefTitle(cards) {
  const obj = cards.objective?.text || '';
  const proc = cards.process?.text || '';
  if (!obj || !proc) return 'Experiment Concept';
  return `${obj} via ${proc}`;
}

function generateBriefText(cards) {
  const obj = cards.objective?.text;
  const proc = cards.process?.text;
  const intr = cards.intervention?.text;
  if (!obj) return '';
  const parts = [];
  if (proc) parts.push(`**Process:** ${proc}`);
  if (intr) parts.push(`**What to do:** ${intr}`);
  if (obj) parts.push(`**Goal:** ${obj}`);
  return parts.join('\n\n');
}

function generateMeasureText(cards) {
  const msr = cards.measurement;
  if (!msr) return null;
  const why = [
    'Tracking this gives a data point for comparison, helps spot trends early, and builds a knowledge base for future decisions.',
    'Measurable data makes the trial defensible and shareable — essential for learning across vintages.',
    'Without measurement, you have an anecdote. With it, you have evidence.',
  ];
  const text = typeof msr === 'string' ? msr : msr.text;
  const meta = typeof msr === 'object' ? msr.meta : '';
  const whyText = why[Math.floor(Math.random() * why.length)];
  return `${text}${meta ? ` — *${meta}*` : ''}\n\n_Why it matters: ${whyText}_`;
}

function generateCaveatText(cards) {
  const risk = cards.risk;
  if (!risk) return null;
  const meta = typeof risk === 'object' ? risk.meta : '';
  const text = typeof risk === 'string' ? risk : risk?.text || '';
  const caveats = [
    'This is a hypothesis, not a validated recommendation. Small tanks or micro-scale trials are a good proxy before scaling up.',
    'Results will be influenced by fruit quality, vintage conditions, and operator technique. Keep records.',
    'Any positive result here is suggestive only — repeat under different conditions before changing standard practice.',
    'This trial is observational. Correlation does not imply causation. Use controls where possible.',
    'Treat this as a learning opportunity, not a production decision. Validate at bench or pilot scale first.',
  ];
  const caveat = caveats[Math.floor(Math.random() * caveats.length)];
  return `${text}${meta ? ` (${meta})` : ''}\n\n_${caveat}_`;
}

function effortPayoffSummary(cards) {
  const e = cards.effort?.text || '';
  const p = cards.payoff?.text || '';
  if (!e && !p) return '';
  return `**Effort:** ${e.replace(/^\d — /, '')} · **Payoff:** ${p.replace(/^\d — /, '')}`;
}

// =====================================================================
// CARD GENERATION
// =====================================================================

function generateCard(type) {
  const pool = CARD_POOLS[type];
  if (!pool) return null;
  if (state.activeFilters.size && type === 'intervention') {
    return pickRandomFiltered(pool, state.activeFilters);
  }
  return pickRandom(pool);
}

function generateExperiment(presetOverride = null) {
  const preset = presetOverride || PRESETS.find(p => p.id === state.activePreset);
  const types = ['objective', 'process', 'intervention', 'measurement', 'risk', 'effort', 'payoff'];

  const newCards = {};

  for (const type of types) {
    if (state.lockedCards[type]) {
      newCards[type] = state.currentCards[type];
      continue;
    }

    if (preset?.select?.[type]?.length) {
      const selectIds = preset.select[type];
      // Pick one at random from the preset's options
      const chosen = selectIds[Math.floor(Math.random() * selectIds.length)];
      const found = CARD_POOLS[type].find(c => c.id === chosen);
      newCards[type] = found || generateCard(type);
    } else {
      newCards[type] = generateCard(type);
    }
  }

  state.currentCards = newCards;
  return newCards;
}

// =====================================================================
// RENDERING
// =====================================================================

const CARD_ORDER = ['objective', 'process', 'intervention', 'measurement', 'risk', 'effort', 'payoff'];

function renderCardStack() {
  const stack = document.getElementById('cardStack');
  stack.innerHTML = '';

  for (const type of CARD_ORDER) {
    const card = state.currentCards[type];
    if (!card) continue;

    const locked = !!state.lockedCards[type];
    const el = document.createElement('div');
    el.className = `card${locked ? ' locked' : ''}`;
    el.dataset.type = type;
    el.style.animationDelay = `${CARD_ORDER.indexOf(type) * 40}ms`;

    const meta = card.meta ? `<div class="card-meta">${card.meta}</div>` : '';
    const effortPayoffMeta = (type === 'effort' || type === 'payoff') ? `<div class="card-meta">${card.meta || ''}</div>` : '';

    el.innerHTML = `
      <div class="card-type-label">${briefLabel(type)}</div>
      <div class="card-value">${card.text}</div>
      ${effortPayoffMeta || meta}
      <div class="card-footer">
        <button class="lock-btn${locked ? ' locked' : ''}" data-type="${type}" aria-label="${locked ? 'Unlock' : 'Lock'} card">
          ${locked ? '🔒 Locked' : '🔓 Lock'}
        </button>
        <button class="reroll-btn" data-type="${type}" aria-label="Re-roll this card" title="Re-roll">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="23 4 23 10 17 10"></polyline>
            <polyline points="1 20 1 14 7 14"></polyline>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
          </svg>
        </button>
      </div>
    `;

    stack.appendChild(el);
  }
}

function renderBrief() {
  const container = document.getElementById('briefCard');
  if (!state.currentCards.objective) {
    container.innerHTML = '<p style="color:var(--text-3);font-size:0.85rem;">Generate an experiment to see the brief here.</p>';
    return;
  }

  const cards = state.currentCards;
  const title = generateBriefTitle(cards);
  const measureText = generateMeasureText(cards);
  const caveatText = generateCaveatText(cards);
  const epSummary = effortPayoffSummary(cards);

  let html = `
    <div class="brief-block">
      <div class="brief-block-label">Experiment Title</div>
      <div class="brief-block-text" style="font-weight:700;font-size:1rem;">${title}</div>
    </div>
    <div class="brief-divider"></div>
    <div class="brief-block">
      <div class="brief-block-label">Plain-English Brief</div>
      <div class="brief-block-text">${generateBriefText(cards).replace(/\n\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')}</div>
    </div>
  `;

  if (measureText) {
    const measureLines = measureText.split('\n\n');
    const measureMain = measureLines[0];
    const measureWhy = measureLines.slice(1).join('\n\n');
    html += `
      <div class="brief-divider"></div>
      <div class="brief-measure">
        <div class="brief-block-label">What to Measure</div>
        <div class="brief-block-text">${measureMain.replace(/\*(.*?)\*/g, '<em>$1</em>')}</div>
        ${measureWhy ? `<div class="brief-block-text" style="color:var(--text-2);font-size:0.8rem;margin-top:6px;">${measureWhy.replace(/\*(.*?)\*/g, '<em>$1</em>')}</div>` : ''}
      </div>
    `;
  }

  if (caveatText) {
    const caveatLines = caveatText.split('\n\n');
    html += `
      <div class="brief-caveat">
        <div class="brief-block-label">Caveats & Watch-outs</div>
        <div class="brief-block-text">${caveatLines[0].replace(/\*(.*?)\*/g, '<em>$1</em>')}</div>
        ${caveatLines.slice(1).map(l => `<div class="brief-block-text" style="color:var(--text-2);font-size:0.8rem;margin-top:6px;">${l.replace(/\*(.*?)\*/g, '<em>$1</em>')}</div>`).join('')}
      </div>
    `;
  }

  if (epSummary) {
    html += `
      <div class="brief-divider"></div>
      <div class="brief-block">
        <div class="brief-block-text" style="font-size:0.82rem;color:var(--text-2);">${epSummary.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</div>
      </div>
    `;
  }

  container.innerHTML = html;
}

function renderFilters() {
  const presetContainer = document.getElementById('presetChips');
  const filterContainer = document.getElementById('filterChips');

  presetContainer.innerHTML = PRESETS.map(p => `
    <button class="chip preset-chip${state.activePreset === p.id ? ' active' : ''}" data-preset="${p.id}" title="${p.label}">
      ${p.emoji} ${p.label}
    </button>
  `).join('');

  filterContainer.innerHTML = FILTER_DEFS.map(f => `
    <button class="chip filter-chip ${f.cssClass}${state.activeFilters.has(f.id) ? ' active' : ''}" data-filter="${f.id}">
      ${f.label}
    </button>
  `).join('');
}

function renderSavedIdeas() {
  const list = document.getElementById('savedList');
  const empty = document.getElementById('savedEmpty');
  const count = document.getElementById('favCount');

  count.textContent = state.savedIdeas.length;
  count.dataset.count = state.savedIdeas.length;

  if (!state.savedIdeas.length) {
    list.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }

  empty.classList.add('hidden');
  list.innerHTML = state.savedIdeas.map((idea, i) => {
    const brief = generateBriefText(idea.cards).replace(/<[^>]+>/g, '').replace(/\n+/g, ' ').substring(0, 120);
    const tags = [
      idea.cards.process?.text,
      idea.cards.intervention?.text?.substring(0, 30),
    ].filter(Boolean).map(t => `<span class="saved-item-tag">${t}</span>`).join('');

    return `
      <div class="saved-item">
        <div class="saved-item-header">
          <div class="saved-item-title">${idea.title}</div>
          <button class="saved-item-delete" data-index="${i}" aria-label="Delete saved idea">×</button>
        </div>
        <div class="saved-item-meta">${tags}</div>
        <div class="saved-item-brief">${brief}${brief.length >= 120 ? '…' : ''}</div>
      </div>
    `;
  }).join('');
}

// =====================================================================
// STORAGE
// =====================================================================

function loadSaved() {
  try {
    const raw = localStorage.getItem('cellar-experiment-saved');
    if (raw) state.savedIdeas = JSON.parse(raw);
  } catch (_) {}
}

function saveSaved() {
  try {
    localStorage.setItem('cellar-experiment-saved', JSON.stringify(state.savedIdeas));
  } catch (_) {}
}

// =====================================================================
// TOAST
// =====================================================================

function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 2400);
}

// =====================================================================
// WARNINGS
// =====================================================================

function initWarningBanner() {
  const dismissed = localStorage.getItem('cellar-warning-dismissed');
  if (dismissed) {
    document.getElementById('warningBanner').classList.add('hidden');
  }
  document.getElementById('warningDismiss').addEventListener('click', () => {
    document.getElementById('warningBanner').classList.add('hidden');
    localStorage.setItem('cellar-warning-dismissed', '1');
  });
}

// =====================================================================
// EVENT HANDLERS
// =====================================================================

function initEvents() {
  // Generate / Re-roll all
  document.getElementById('generateBtn').addEventListener('click', () => {
    generateExperiment();
    renderCardStack();
    renderBrief();
  });

  document.getElementById('rerollAllBtn').addEventListener('click', () => {
    // Temporarily unlock all
    state.lockedCards = {};
    generateExperiment();
    renderCardStack();
    renderBrief();
  });

  // Card stack delegation
  document.getElementById('cardStack').addEventListener('click', e => {
    const lockBtn = e.target.closest('.lock-btn');
    if (lockBtn) {
      const type = lockBtn.dataset.type;
      state.lockedCards[type] = !state.lockedCards[type];
      renderCardStack();
      return;
    }
    const rerollBtn = e.target.closest('.reroll-btn');
    if (rerollBtn) {
      const type = rerollBtn.dataset.type;
      state.lockedCards[type] = false;
      state.currentCards[type] = generateCard(type);
      renderCardStack();
      renderBrief();
      return;
    }
  });

  // Preset chips
  document.getElementById('presetChips').addEventListener('click', e => {
    const chip = e.target.closest('.chip.preset-chip');
    if (!chip) return;
    const presetId = chip.dataset.preset;
    if (state.activePreset === presetId) {
      state.activePreset = null;
    } else {
      state.activePreset = presetId;
      // Apply preset filters
      const preset = PRESETS.find(p => p.id === presetId);
      state.activeFilters = new Set(preset?.filters || []);
    }
    renderFilters();
    generateExperiment();
    renderCardStack();
    renderBrief();
  });

  // Filter chips
  document.getElementById('filterChips').addEventListener('click', e => {
    const chip = e.target.closest('.chip.filter-chip');
    if (!chip) return;
    const filterId = chip.dataset.filter;
    if (state.activeFilters.has(filterId)) {
      state.activeFilters.delete(filterId);
    } else {
      state.activeFilters.add(filterId);
    }
    state.activePreset = null;
    renderFilters();
    generateExperiment();
    renderCardStack();
    renderBrief();
  });

  // Copy brief
  document.getElementById('copyBriefBtn').addEventListener('click', () => {
    const cards = state.currentCards;
    if (!cards.objective) { showToast('Generate an experiment first!'); return; }
    const title = generateBriefTitle(cards);
    const brief = generateBriefText(cards);
    const measure = generateMeasureText(cards);
    const caveat = generateCaveatText(cards);
    const ep = effortPayoffSummary(cards);
    const full = [title, brief, measure, caveat, ep].filter(Boolean).join('\n\n');
    navigator.clipboard?.writeText(full).then(() => showToast('Brief copied to clipboard!')).catch(() => showToast('Copy failed — try manually'));
  });

  // Save idea
  document.getElementById('saveBriefBtn').addEventListener('click', () => {
    const cards = state.currentCards;
    if (!cards.objective) { showToast('Generate an experiment first!'); return; }
    const idea = {
      title: generateBriefTitle(cards),
      cards: { ...cards },
      savedAt: new Date().toISOString(),
    };
    state.savedIdeas.unshift(idea);
    saveSaved();
    renderSavedIdeas();
    showToast('Idea saved!');
  });

  // Saved panel
  document.getElementById('favToggleBtn').addEventListener('click', () => {
    document.getElementById('savedPanel').classList.add('open');
    document.getElementById('panelBackdrop').classList.add('open');
  });

  function closePanel() {
    document.getElementById('savedPanel').classList.remove('open');
    document.getElementById('panelBackdrop').classList.remove('open');
  }
  document.getElementById('closeSavedPanel').addEventListener('click', closePanel);
  document.getElementById('panelBackdrop').addEventListener('click', closePanel);

  // Delete saved idea
  document.getElementById('savedList').addEventListener('click', e => {
    const btn = e.target.closest('.saved-item-delete');
    if (!btn) return;
    const idx = parseInt(btn.dataset.index, 10);
    state.savedIdeas.splice(idx, 1);
    saveSaved();
    renderSavedIdeas();
    showToast('Idea removed');
  });
}

// =====================================================================
// INIT
// =====================================================================

function init() {
  initWarningBanner();
  loadSaved();
  renderFilters();
  renderSavedIdeas();
  generateExperiment();
  renderCardStack();
  renderBrief();
  initEvents();
}

document.addEventListener('DOMContentLoaded', init);
