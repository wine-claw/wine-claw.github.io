// Fermentation Heat Explorer — v2
// self-contained calculation + chart engine

const defaults = {
  volumeL: 10000,
  startSugar: 230,
  endSugar: 2,
  days: 7,
  peakFactor: 1.8,
  heatFactor: 0.556,
  density: 1.090,
  cp: 3.9,
};

// Fermentation presets — practical defaults for common wine styles
const PRESETS = {
  red: {
    label: 'Red ferment',
    note: 'Peak temps 24–28 °C; longer, hotter, more heat to remove.',
    volumeL: 15000,
    startSugar: 250,
    endSugar: 2,
    days: 10,
    peakFactor: 2.1,
    heatFactor: 0.556,
    density: 1.096,
    cp: 3.9,
  },
  white: {
    label: 'White / Rosé',
    note: 'Cool ferment 14–18 °C; shorter, less exotherm, gentler cooling.',
    volumeL: 8000,
    startSugar: 210,
    endSugar: 3,
    days: 8,
    peakFactor: 1.5,
    heatFactor: 0.556,
    density: 1.086,
    cp: 3.9,
  },
};

const PRESET_KEYS = Object.keys(PRESETS);

const sugarUnits = {
  'g/L': { label: 'g/L', toGL: (v) => v, fromGL: (v) => v },
  'Brix': {
    label: '°Bx',
    // g/L = °Bx × 10 × SG / (1 + °Bx × 0.00425)  — accounts for solution density
    // vs. the simpler approximation g/L ≈ °Bx × 10 × SG.
    // Using the density-corrected form for better accuracy at high Brix.
    toGL: (v, density = 1.090) => v * 10 * density / (1 + v * 0.00425),
    fromGL: (v, density = 1.090) => v / (10 * density - v * 0.00425),
  },
  'Baumé': {
    label: '°Be',
    // Empirical grape-must calibration: g/L ≈ Be × 17.7
    // (derived from: SG = 145/(145−Be); g/L = SG×10×Plato; 13°Be → 230 g/L at SG 1.098).
    // At typical must SG ~1.090: 13°Be ≈ 21°Bx ≈ 230 g/L. Note: Be↔Bx ratio drifts
    // with concentration; the app uses the above relationship as a practical approximation.
    toGL: (v) => v * 17.7,
    fromGL: (v) => v / 17.7,
  },
};

const fields = Object.fromEntries(
  Object.keys(defaults).map((key) => [key, document.getElementById(key)])
);
const metricsGrid = document.getElementById('metricsGrid');
const chart = document.getElementById('chart');
const resetBtn = document.getElementById('resetBtn');
const presetBtns = document.querySelectorAll('[data-preset]');
const presetNote = document.getElementById('presetNote');
const sugarUnitSel = document.getElementById('sugarUnit');
const startSugarField = document.getElementById('startSugar');
const endSugarField = document.getElementById('endSugar');

let currentSugarUnit = 'g/L';

// ── Stoichiometry ─────────────────────────────────────────────────────────────
const ethanolYieldPerGSugar = 92 / 180;   // g ethanol / g sugar
const co2YieldPerGSugar    = 88 / 180;   // g CO₂ / g sugar
const ABV_COEFFICIENT      = 0.059;       // conservative practical ABV per g/L sugar drop

// ── Unit utilities ────────────────────────────────────────────────────────────
function formatNumber(value, digits = 1) {
  return new Intl.NumberFormat('en-AU', {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value);
}

function formatSmart(value, unit) {
  const abs = Math.abs(value);
  if (abs >= 1000) return `${formatNumber(value, 0)} ${unit}`;
  if (abs >= 100)  return `${formatNumber(value, 1)} ${unit}`;
  return `${formatNumber(value, 2)} ${unit}`;
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

// Convert g/L to display unit
function gLToUnit(gL, unit) {
  return sugarUnits[unit].toGL(gL, getValues().density);
}

// Convert display unit to g/L
function unitToGL(value, unit) {
  return sugarUnits[unit].fromGL(value, getValues().density);
}

// ── Input helpers ────────────────────────────────────────────────────────────
function getValues() {
  return Object.fromEntries(
    Object.entries(fields).map(([key, input]) => [key, Number(input.value)])
  );
}

// Read sugar inputs in current display unit, return g/L
function getSugarGL(sugarFieldId) {
  const val = Number(document.getElementById(sugarFieldId).value);
  return unitToGL(val, currentSugarUnit);
}

// Update sugar input placeholders to reflect current unit
function updateSugarPlaceholders() {
  const unit = sugarUnits[currentSugarUnit].label;
  startSugarField.placeholder = `e.g. ${currentSugarUnit === 'g/L' ? '230' : currentSugarUnit === 'Brix' ? '22' : '13'}`;
  endSugarField.placeholder   = `e.g. ${currentSugarUnit === 'g/L' ? '2'   : currentSugarUnit === 'Brix' ? '0.2' : '0.1'}`;
  // Sync the unit labels in the HTML input suffix spans
  document.getElementById('startSugarUnit').textContent = unit;
  document.getElementById('endSugarUnit').textContent   = unit;
  document.getElementById('legendSugarUnit').textContent = unit;
}

// ── Validation ────────────────────────────────────────────────────────────────
function validate(values, sugarConsumed) {
  const issues = [];
  if (values.volumeL <= 0)          issues.push('Tank volume must be above zero.');
  if (sugarConsumed < 0)            issues.push('Residual sugar cannot exceed starting sugar.');
  if (values.days <= 0)            issues.push('Fermentation duration must be above zero.');
  if (values.cp <= 0 || values.density <= 0 || values.heatFactor <= 0)
                                    issues.push('Heat factor, density, and Cp must all be above zero.');
  if (values.peakFactor < 1)       issues.push('Peak factor must be ≥ 1.');
  return issues;
}

// ── Core calculation ───────────────────────────────────────────────────────────
function calculate(values) {
  const startGL = getSugarGL('startSugar');
  const endGL   = getSugarGL('endSugar');
  const sugarConsumed = startGL - endGL;
  const issues  = validate(values, sugarConsumed);

  const sugarConsumedMassKg = (sugarConsumed * values.volumeL) / 1000;
  const totalHeatKJ        = sugarConsumedMassKg * values.heatFactor * 1000;
  const hours              = values.days * 24;
  const avgKW              = totalHeatKJ / (hours * 3600);
  const peakKW             = avgKW * values.peakFactor;

  const massKg             = values.volumeL * values.density;
  const adiabaticRiseC     = totalHeatKJ / (massKg * values.cp);

  const ethanolKg           = sugarConsumedMassKg * ethanolYieldPerGSugar;
  const co2Kg               = sugarConsumedMassKg * co2YieldPerGSugar;
  const approxAbv           = sugarConsumed * ABV_COEFFICIENT;

  // ── Jacket heat-transfer framing ────────────────────────────────────────────
  // Rough tank UA estimate: scales with (surface area / volume ratio).
  // For a cylinder with H ≈ 1.4D, SA/V ≈ 3.94 / D for a sphere of same D,
  // but using empirical fits for commercial wine tanks.
  // UA_wall ≈ 0.15 × (surface area in m²)  [W/K for mild insulation]
  // Surface area of a cylinder: πD²/2 + πDH; with V = πD²H/4 → H = 4V/πD²
  // SA = πD²/2 + πD(4V/πD²) = πD²/2 + 4V/D
  // For a 10,000 L tank (D ≈ 2.3 m): SA ≈ 16.6 m², UA_wall ≈ 2.5 W/K
  // Glycol jackets typically add effective UA of 5–15 W/K depending on circulation.
  // Default assumption in model: UA = 10 W/K per 10,000 L (user can adjust).
  const tankUA = (values.volumeL / 10000) * 10;  // W/K

  // Maximum sustainable ΔT the jacket can hold at average heat load
  // (this is what the jacket can continuously remove if running flat out)
  const jacketDeltaT = avgKW > 0 ? tankUA > 0 ? avgKW / tankUA : 0 : 0;

  // Peak ΔT demand: the peak heat rate divided by UA tells you how high
  // above coolant temperature the ferment would climb if the jacket
  // could not keep up.
  const peakDeltaT = tankUA > 0 ? peakKW / tankUA : 0;

  return {
    startGL,
    endGL,
    sugarConsumed,
    sugarConsumedMassKg,
    totalHeatKJ,
    totalHeatMJ: totalHeatKJ / 1000,
    avgKW,
    peakKW,
    adiabaticRiseC,
    ethanolKg,
    co2Kg,
    approxAbv,
    tankUA,
    jacketDeltaT,
    peakDeltaT,
    issues,
  };
}

// ── Metric card renderer ──────────────────────────────────────────────────────
function metricCard(label, value, subtext, accent) {
  const borderAccent = accent ? `border-color: ${accent}44;` : '';
  return `
    <article class="metric-card" style="${borderAccent}">
      <div class="metric-label">${label}</div>
      <div class="metric-value">${value}</div>
      <div class="metric-subtext">${subtext}</div>
    </article>
  `;
}

function renderMetrics(result, values) {
  if (result.issues.length) {
    metricsGrid.innerHTML = `
      <article class="metric-card" style="grid-column:1/-1;border-color:rgba(229,143,92,.45)">
        <div class="metric-label">Input issue</div>
        <div class="metric-value" style="font-size:1.2rem;line-height:1.4">${result.issues.join(' ')}</div>
        <div class="metric-subtext">Fix the inputs to restore the calculations.</div>
      </article>
    `;
    return;
  }

  const u = sugarUnits[currentSugarUnit].label;
  const startDisplay = formatNumber(gLToUnit(result.startGL, currentSugarUnit), 1);
  const endDisplay   = formatNumber(gLToUnit(result.endGL,   currentSugarUnit), 1);
  const consDisplay  = formatNumber(gLToUnit(result.sugarConsumed, currentSugarUnit), 1);

  metricsGrid.innerHTML = [
    metricCard(
      'Total heat released',
      formatSmart(result.totalHeatMJ, 'MJ'),
      `${formatSmart(result.sugarConsumedMassKg, 'kg')} sugar consumed \u2192 ${consDisplay} ${u} drop at ${formatNumber(values.heatFactor, 3)} kJ/g.`,
      '#e58f5c'
    ),
    metricCard(
      'Average cooling load',
      formatSmart(result.avgKW, 'kW'),
      `Evenly spread over ${formatNumber(values.days, 1)} days (continuous heat rate).`,
      '#5cc0d8'
    ),
    metricCard(
      'Peak cooling load',
      formatSmart(result.peakKW, 'kW'),
      `Using a ${formatNumber(values.peakFactor, 1)}\u00D7 peak factor (sizing headroom above average).`,
      '#5cc0d8'
    ),
    metricCard(
      'Jacket \u0394T framing',
      `${formatNumber(result.jacketDeltaT, 1)} \u00B0C \u2013 ${formatNumber(result.peakDeltaT, 1)} \u00B0C`,
      `Sustainable \u0394T at avg load vs. peak \u0394T demand. Assumes UA = ${formatNumber(result.tankUA, 0)} W/K (adjustable in Model notes).`,
      '#9be38a'
    ),
    metricCard(
      'Adiabatic rise',
      formatSmart(result.adiabaticRiseC, '\u00B0C'),
      `If essentially no heat were removed. Red ferments typically reach 20\u201330 \u00B0C above ambient without cooling.`,
      '#e58f5c'
    ),
    metricCard(
      'Approx. ethanol formed',
      formatSmart(result.ethanolKg, 'kg'),
      `Stoichiometric sketch \u2248 ${formatNumber(result.approxAbv, 1)}\% v/v potential conversion from ${consDisplay} ${u} sugar drop.`,
      '#9be38a'
    ),
    metricCard(
      'Approx. CO\u2082 released',
      formatSmart(result.co2Kg, 'kg'),
      `Rough guide for gas-handling and封闭发酵的作业安全讨论.`,
      '#9be38a'
    ),
  ].join('');
}

// ── Fermentation heat-release profile ─────────────────────────────────────────
function createProfile(result, values) {
  const points = Math.max(10, Math.round(values.days * 8));
  const startGL   = result.startGL;
  const endGL     = result.endGL;
  const sugarDrop = startGL - endGL;

  // Gamma-style load shape: peaks at t = 1/3, then decays.
  // loadShape(t) = 4t·e^(1-4t), normalised so mean = 1 over [0,1].
  // ∫₀¹ 4t·e^(1-4t) dt = (e - 5e⁻³)/4 ≈ 0.717.
  function loadShape(t) {
    const raw = 4 * t * Math.exp(1 - 4 * t);
    return Math.max(0, raw / 0.717);
  }

  // Post-fermentation decay: active yeast metabolism slows sharply after peak.
  // Without this, ~28 % of peak load lingers to t = 1 (day 7). Real fermentation
  // winds down; k = 6 gives near-zero by the final day.
  function postFermDecay(t) {
    return Math.exp(-6 * Math.max(0, t - 1 / 3));
  }

  // Sugar depletion: logistic S-curve, mid-point at t = 0.4.
  function sugarRemaining(t) {
    const sig = 1 / (1 + Math.exp(-12 * (t - 0.4)));
    return Math.max(endGL, startGL - sugarDrop * sig);
  }

  return Array.from({ length: points + 1 }, (_, i) => {
    const t = i / points;
    return {
      day: values.days * t,
      sugarRemaining: sugarRemaining(t),
      loadKW: result.avgKW * loadShape(t) * postFermDecay(t) * values.peakFactor,
    };
  });
}

function pathFromPoints(points, xMap, yMap) {
  return points.map((p, i) =>
    `${i === 0 ? 'M' : 'L'} ${xMap(p).toFixed(2)} ${yMap(p).toFixed(2)}`
  ).join(' ');
}

// ── SVG chart renderer ────────────────────────────────────────────────────────
function renderChart(result, values) {
  if (result.issues.length) { chart.innerHTML = ''; return; }

  const profile   = createProfile(result, values);
  const width     = 920;
  const height    = 360;
  const margin    = { top: 24, right: 72, bottom: 42, left: 62 };
  const innerW    = width  - margin.left - margin.right;
  const innerH    = height - margin.top  - margin.bottom;

  const xMap = (p) => margin.left + (p.day / values.days) * innerW;
  const sugarMax = Math.max(values.startSugar, values.endSugar + 1) * 1.05;
  const sugarMap = (p) => margin.top + innerH - (p.sugarRemaining / sugarMax) * innerH;

  // Chart ceiling: γ_peak = 4/e ≈ 1.333; × 1.15 headroom = ≈ peakKW × 1.53
  const loadCeil = Math.max(result.avgKW, result.peakKW, 0.01) * (4 / Math.E) * 1.15;
  const loadMap  = (p) => margin.top + innerH - (Math.min(p.loadKW, loadCeil) / loadCeil) * innerH;

  const sugarPath = pathFromPoints(profile, xMap, sugarMap);
  const loadPath  = pathFromPoints(profile, xMap, loadMap);

  const gridLines = [0, 0.25, 0.5, 0.75, 1];
  const dayTicks  = Math.min(7, Math.ceil(values.days));

  function sugarTickVal(v) { return formatNumber(v, 0); }
  function loadTickVal(v)  { return formatNumber(v, v >= 10 ? 0 : 1); }

  chart.innerHTML = `
    <defs>
      <linearGradient id="loadFill"  x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%"   stop-color="rgba(92,192,216,0.45)" />
        <stop offset="100%" stop-color="rgba(92,192,216,0.02)" />
      </linearGradient>
      <linearGradient id="sugarFill" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%"   stop-color="rgba(229,143,92,0.24)" />
        <stop offset="100%" stop-color="rgba(229,143,92,0.02)" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="${width}" height="${height}" rx="18" fill="transparent"/>
    ${gridLines.map((g) => {
      const y = margin.top + innerH * g;
      return `<line x1="${margin.left}" y1="${y}" x2="${width - margin.right}" y2="${y}" stroke="rgba(255,255,255,0.09)" stroke-dasharray="4 6"/>`;
    }).join('')}
    ${Array.from({ length: dayTicks + 1 }, (_, i) => {
      const x  = margin.left + (i / dayTicks) * innerW;
      const day = (values.days / dayTicks) * i;
      return `<g>
        <line x1="${x}" y1="${margin.top}" x2="${x}" y2="${margin.top + innerH}" stroke="rgba(255,255,255,0.06)"/>
        <text x="${x}" y="${height - 12}" fill="rgba(237,243,248,0.72)" text-anchor="middle" font-size="12">${formatNumber(day, dayTicks > 4 ? 0 : 1)} d</text>
      </g>`;
    }).join('')}
    <text x="${margin.left - 8}"  y="${margin.top - 6}" fill="rgba(229,143,92,0.9)"   text-anchor="start" font-size="12">Sugar (${sugarUnits[currentSugarUnit].label})</text>
    <text x="${width - margin.right + 8}" y="${margin.top - 6}" fill="rgba(92,192,216,0.95)" text-anchor="start" font-size="12">Cooling load (kW)</text>
    <path d="${loadPath}  L ${width - margin.right} ${margin.top + innerH} L ${margin.left} ${margin.top + innerH} Z" fill="url(#loadFill)"  opacity="0.8"/>
    <path d="${sugarPath} L ${width - margin.right} ${margin.top + innerH} L ${margin.left} ${margin.top + innerH} Z" fill="url(#sugarFill)" opacity="0.65"/>
    <path d="${loadPath}"  fill="none" stroke="#5cc0d8" stroke-width="4" stroke-linecap="round"/>
    <path d="${sugarPath}" fill="none" stroke="#e58f5c" stroke-width="4" stroke-linecap="round"/>
    ${[0, 0.5, 1].map((fraction) => {
      const sugarVal = sugarMax * (1 - fraction);
      const loadVal  = loadCeil  * (1 - fraction);
      const y        = margin.top + innerH * fraction;
      return `<g>
        <text x="${margin.left - 12}"             y="${y + 4}" fill="rgba(229,143,92,0.82)" text-anchor="end"   font-size="12">${sugarTickVal(sugarVal)}</text>
        <text x="${width - margin.right + 12}"    y="${y + 4}" fill="rgba(92,192,216,0.92)" text-anchor="start" font-size="12">${loadTickVal(loadVal)}</text>
      </g>`;
    }).join('')}
  `;
}

// ── Preset application ────────────────────────────────────────────────────────
function applyPreset(key) {
  const preset = PRESETS[key];
  if (!preset) return;
  // Switch to g/L when applying a preset (all preset values are in g/L)
  currentSugarUnit = 'g/L';
  sugarUnitSel.value = 'g/L';
  Object.entries(preset).forEach(([k, v]) => {
    if (fields[k]) fields[k].value = v;
  });
  // Show preset note
  if (presetNote) {
    presetNote.textContent = preset.note || '';
    presetNote.classList.toggle('visible', !!preset.note);
  }
  updateSugarPlaceholders();
  update();
}

// ── Main update ───────────────────────────────────────────────────────────────
function update() {
  const values = getValues();
  const result = calculate(values);
  renderMetrics(result, values);
  renderChart(result, values);
}

// ── Event wiring ──────────────────────────────────────────────────────────────
Object.values(fields).forEach((input) => input.addEventListener('input', update));

resetBtn.addEventListener('click', () => {
  Object.entries(defaults).forEach(([key, value]) => {
    if (fields[key]) fields[key].value = value;
  });
  currentSugarUnit = 'g/L';
  sugarUnitSel.value = 'g/L';
  updateSugarPlaceholders();
  update();
});

presetBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    applyPreset(btn.dataset.preset);
    updateSugarPlaceholders();
    update();
  });
});

sugarUnitSel.addEventListener('change', () => {
  currentSugarUnit = sugarUnitSel.value;
  updateSugarPlaceholders();
  update();
});

updateSugarPlaceholders();
update();
