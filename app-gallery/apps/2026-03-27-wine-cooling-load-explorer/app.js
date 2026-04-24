/**
 * Wine Cooling & Chilling Load Explorer — app.js
 * ================================================
 * Calculates heat removal, cooling time, and draws an SVG chart.
 * All physics are first-pass educational estimates.
 */

'use strict';

// ---- Presets ----------------------------------------------------------------
const PRESETS = {
  trial: {
    label: 'Small Trial Tank',
    volume: 200,
    density: 0.993,
    cp: 3.94,
    startTemp: 18,
    targetTemp: 4,
    coolingPower: 5,
    safetyFactor: 0.70,
    ambientTemp: 22,
    description: '200 L bench-scale trial, chilling to near-freezing for cold soak or trial batch.',
  },
  'red-ferment': {
    label: 'Red Ferment',
    volume: 5000,
    density: 0.995,
    cp: 3.90,
    startTemp: 30,
    targetTemp: 22,
    coolingPower: 35,
    safetyFactor: 0.65,
    ambientTemp: 24,
    description: '5,000 L red ferment cap at peak heat — pulling temperature down from 30 °C to manage extraction and stress.',
  },
  'white-settle': {
    label: 'White Juice Settling',
    volume: 3000,
    density: 0.990,
    cp: 3.96,
    startTemp: 18,
    targetTemp: 10,
    coolingPower: 25,
    safetyFactor: 0.72,
    ambientTemp: 22,
    description: '3,000 L white juice, rapid cooling post-press to 10 °C for settling before fermentation.',
  },
  'cold-stable': {
    label: 'Cold Stabilisation',
    volume: 8000,
    density: 1.000,
    cp: 3.94,
    startTemp: 15,
    targetTemp: -2,
    coolingPower: 40,
    safetyFactor: 0.60,
    ambientTemp: 20,
    description: '8,000 L post-ferment wine, chilling to sub-zero for tartrate cold stabilisation.',
  },
};

// Household energy analogues (approx kWh values)
const ANALOGUES = [
  { icon: '💡', threshold: 1,    label: (n) => `≈ ${n.toFixed(1)} hours of a 60 W LED bulb` },
  { icon: '🧊', threshold: 10,   label: (n) => `≈ ${n.toFixed(0)} hours of a small bar fridge` },
  { icon: '🏠', threshold: 50,   label: (n) => `≈ ${n.toFixed(1)} days of average Aussie household electricity` },
  { icon: '⚡', threshold: 200,  label: (n) => `≈ ${n.toFixed(0)} standard 180 L hot water cylinder cycles` },
  { icon: '🚗', threshold: 700,  label: (n) => `≈ ${n.toFixed(1)} km of battery range in an EV` },
];

// ---- DOM refs ---------------------------------------------------------------
const $volume        = document.getElementById('volume');
const $density       = document.getElementById('density');
const $cp            = document.getElementById('cp');
const $startTemp     = document.getElementById('start-temp');
const $targetTemp    = document.getElementById('target-temp');
const $coolingPower  = document.getElementById('cooling-power');
const $safetyFactor  = document.getElementById('safety-factor');
const $ambientTemp   = document.getElementById('ambient-temp');

const $resultKJ      = document.getElementById('result-kj');
const $resultKWh     = document.getElementById('result-kwh');
const $resultTime    = document.getElementById('result-time');
const $resultTimeUnit= document.getElementById('result-time-unit');
const $resultMass    = document.getElementById('result-mass');
const $interpText    = document.getElementById('interpretation-text');
const $energyContent = document.getElementById('energy-analog-content');

// ---- Core calculations ------------------------------------------------------
function calcResults() {
  const volume       = parseFloat($volume.value)       || 0;
  const density      = parseFloat($density.value)      || 0.993;
  const cp           = parseFloat($cp.value)           || 3.94;
  const startTemp    = parseFloat($startTemp.value)     || 0;
  const targetTemp   = parseFloat($targetTemp.value)    || 0;
  const coolingPower = parseFloat($coolingPower.value)  || 0;
  const safetyFactor = parseFloat($safetyFactor.value)  || 0.75;

  const dT = startTemp - targetTemp; // positive = cooling needed
  const massKg = volume * density;

  // Heat removal in kJ
  const Q_kJ = massKg * cp * dT;
  // Heat removal in kWh (1 kWh = 3600 kJ)
  const Q_kWh = Q_kJ / 3600;

  // Cooling time in hours (from available kW)
  const effectivePower = coolingPower * safetyFactor;
  const timeHours = effectivePower > 0 ? Q_kWh / effectivePower : Infinity;

  const ambientTemp = parseFloat($ambientTemp.value) || 0;

  return { volume, density, cp, startTemp, targetTemp, ambientTemp, safetyFactor, dT, massKg, Q_kJ, Q_kWh, coolingPower, effectivePower, timeHours };
}

// ---- Formatting helpers -----------------------------------------------------
function fmtKJ(v) {
  if (!isFinite(v) || v <= 0) return '—';
  if (v >= 1e6) return (v / 1e6).toFixed(2) + ' ×10⁶';
  if (v >= 1e3) return (v / 1e3).toFixed(1) + ' ×10³';
  return v.toFixed(0);
}
function fmtKWh(v) {
  if (!isFinite(v) || v <= 0) return '—';
  if (v >= 1e3) return (v / 1e3).toFixed(2) + 'k';
  return v.toFixed(2);
}
function fmtTime(h) {
  if (!isFinite(h) || h <= 0) return '—';
  if (h < 1)    return (h * 60).toFixed(0);
  if (h < 24)   return h.toFixed(1);
  return (h / 24).toFixed(1);
}
function timeUnit(h) {
  if (!isFinite(h) || h <= 0) return '';
  if (h < 1)    return 'min';
  if (h < 24)   return 'hrs';
  return 'days';
}

// ---- Interpretation builder -------------------------------------------------
function buildInterpretation(r) {
  const { dT, massKg, Q_kWh, coolingPower, effectivePower, timeHours, volume } = r;
  if (dT <= 0) {
    return 'Target temperature is at or above start temperature — no cooling needed.';
  }
  if (coolingPower <= 0) {
    return 'Enter a cooling power to estimate chilling time.';
  }

  let lines = [];

  // Temperature drop context
  if (dT <= 5) {
    lines.push(`A modest ${dT.toFixed(1)} °C drop — common for polishing passes or cold-settling tweaks.`);
  } else if (dT <= 15) {
    lines.push(`${dT.toFixed(1)} °C is a solid cooling run — typical for post-ferment or juice settling.`);
  } else if (dT <= 25) {
    lines.push(`${dT.toFixed(1)} °C is a significant chill — what you'd need pulling a warm ferment down to style temp.`);
  } else {
    lines.push(`${dT.toFixed(1)} °C is a big swing — more typical of cold stabilisation than fermentation management.`);
  }

  // Time context
  if (isFinite(timeHours)) {
    if (timeHours < 2) {
      lines.push(`At ${coolingPower} kW (×${r.safetyFactor} factor = ${effectivePower.toFixed(1)} kW effective), this should be done in under two hours — very manageable.`);
    } else if (timeHours < 8) {
      lines.push(`Expect roughly ${timeHours.toFixed(1)} hrs with ${effectivePower.toFixed(1)} kW effective — budget overnight or a full shift.`);
    } else if (timeHours < 24) {
      lines.push(`About ${timeHours.toFixed(1)} hrs — you'll want this running before close of business. Consider staging if glycol is shared across tanks.`);
    } else if (timeHours < 72) {
      lines.push(`${(timeHours/24).toFixed(1)} days at ${effectivePower.toFixed(1)} kW effective — budget accordingly and monitor tank temp each morning.`);
    } else {
      lines.push(`${(timeHours/24).toFixed(0)} days at ${effectivePower.toFixed(1)} kW effective. At this scale and temperature swing, you may want a bigger chiller or a staged approach.`);
    }
  }

  // Mass context
  const tankHint = volume <= 500  ? 'bench trial'
                 : volume <= 2000 ? 'micro'        : volume <= 10000 ? 'commercial'
                 : 'large-scale';
  lines.push(`${(massKg/1000).toFixed(1)} t (${tankHint} tank).`);

  return lines.join(' ');
}

// ---- Household energy analogue ----------------------------------------------
function buildAnalogue(kWh) {
  if (!isFinite(kWh) || kWh <= 0) return;
  let used = null;
  for (const a of ANALOGUES) {
    if (kWh >= a.threshold) used = a;
  }
  if (!used) return;
  const count = kWh / used.threshold;
  const icon = used.icon;
  const text  = used.label(count);

  const el = document.createElement('div');
  el.className = 'analogue-item';
  el.innerHTML = `<span class="analogue-icon">${icon}</span><span>${text}</span>`;
  $energyContent.innerHTML = '';
  $energyContent.appendChild(el);
}

// ---- Chart rendering (SVG) --------------------------------------------------
const CHART_W   = 600;
const CHART_H   = 280;
const PAD_L     = 62;
const PAD_R     = 20;
const PAD_T     = 20;
const PAD_B     = 46;
const INNER_W   = CHART_W - PAD_L - PAD_R;
const INNER_H   = CHART_H - PAD_T - PAD_B;

function getChartData(r) {
  const { volume, density, cp, startTemp } = r;
  // x-axis: target temps from -4 to startTemp (or 40)
  const minTarget = -4;
  const maxTarget = Math.max(startTemp, 5);
  const pts = [];
  for (let t = minTarget; t <= maxTarget; t += 0.5) {
    const dT = startTemp - t;
    const kJ = volume * density * cp * dT;
    pts.push({ t, kJ });
  }
  return { pts, minTarget, maxTarget };
}

function renderChart(r) {
  const svg = document.getElementById('chart-svg');
  const { pts, minTarget, maxTarget } = getChartData(r);
  const { targetTemp } = r;

  // Scales
  const xScale = (t) => PAD_L + ((t - minTarget) / (maxTarget - minTarget)) * INNER_W;
  const maxKJ  = Math.max(...pts.map(p => p.kJ), 1);
  const yScale = (kJ) => PAD_T + INNER_H - (kJ / maxKJ) * INNER_H;

  // Clamp current target temp to chart range
  const cx = xScale(Math.max(minTarget, Math.min(maxTarget, targetTemp)));
  const cY = pts.length ? yScale(pts.find(p => Math.abs(p.t - targetTemp) < 0.6)?.kJ || 0) : PAD_T + INNER_H;

  // Axis tick values
  const yTicks = 5;
  const xTickCount = 6;

  let lines = [];

  // Background rect
  lines.push(`<rect x="${PAD_L}" y="${PAD_T}" width="${INNER_W}" height="${INNER_H}" fill="#1a1617" rx="4"/>`);

  // Grid lines + Y labels
  for (let i = 0; i <= yTicks; i++) {
    const y    = PAD_T + (i / yTicks) * INNER_H;
    const kJ   = maxKJ * (1 - i / yTicks);
    const lineY= Math.round(y) + 0.5;
    const opacity = i === 0 ? 0 : 0.15;
    lines.push(`<line x1="${PAD_L}" y1="${lineY}" x2="${PAD_L + INNER_W}" y2="${lineY}" stroke="#4e3c3d" stroke-width="1" opacity="${opacity}"/>`);
    lines.push(`<text x="${PAD_L - 8}" y="${lineY + 4}" text-anchor="end" font-size="11" fill="#9a8a85" font-family="Source Sans 3,sans-serif">${fmtKJ(kJ)}</text>`);
  }

  // X axis ticks
  for (let i = 0; i <= xTickCount; i++) {
    const t    = minTarget + (i / xTickCount) * (maxTarget - minTarget);
    const x    = Math.round(xScale(t)) + 0.5;
    lines.push(`<line x1="${x}" y1="${PAD_T}" x2="${x}" y2="${PAD_T + INNER_H}" stroke="#4e3c3d" stroke-width="1" opacity="0.15"/>`);
    lines.push(`<text x="${x}" y="${PAD_T + INNER_H + 16}" text-anchor="middle" font-size="11" fill="#9a8a85" font-family="Source Sans 3,sans-serif">${t.toFixed(0)}°</text>`);
  }

  // Axes lines
  lines.push(`<line x1="${PAD_L}" y1="${PAD_T + INNER_H}" x2="${PAD_L + INNER_W}" y2="${PAD_T + INNER_H}" stroke="#4e3c3d" stroke-width="1.5"/>`);
  lines.push(`<line x1="${PAD_L}" y1="${PAD_T}" x2="${PAD_L}" y2="${PAD_T + INNER_H}" stroke="#4e3c3d" stroke-width="1.5"/>`);

  // Axis labels
  lines.push(`<text x="${PAD_L + INNER_W/2}" y="${CHART_H - 4}" text-anchor="middle" font-size="11" fill="#9a8a85" font-family="Source Sans 3,sans-serif">Target Temperature (°C)</text>`);
  lines.push(`<text x="14" y="${PAD_T + INNER_H/2}" text-anchor="middle" font-size="11" fill="#9a8a85" font-family="Source Sans 3,sans-serif" transform="rotate(-90,14,${PAD_T + INNER_H/2})">Heat Removal (kJ)</text>`);

  // Build the curve path
  if (pts.length > 1) {
    let d = `M ${Math.round(xScale(pts[0].t))} ${Math.round(yScale(pts[0].kJ))}`;
    for (let i = 1; i < pts.length; i++) {
      d += ` L ${Math.round(xScale(pts[i].t))} ${Math.round(yScale(pts[i].kJ))}`;
    }

    // Gradient fill under curve
    const gradId = 'chartGrad';
    const gradBot = PAD_T + INNER_H;
    const lastPt  = pts[pts.length - 1];
    const closePath = ` L ${Math.round(xScale(lastPt.t))} ${gradBot} L ${Math.round(xScale(pts[0].t))} ${gradBot} Z`;
    lines.push(`<defs><linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#9b6b6a" stop-opacity="0.3"/><stop offset="100%" stop-color="#9b6b6a" stop-opacity="0.02"/></linearGradient></defs>`);
    lines.push(`<path d="${d}${closePath}" fill="url(#${gradId})"/>`);

    // Stroke line
    lines.push(`<path d="${d}" fill="none" stroke="#9b6b6a" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`);
  }

  // Current point
  const currPt = pts.find(p => Math.abs(p.t - targetTemp) < 0.6) || pts[0];
  if (currPt) {
    const px = Math.round(xScale(currPt.t));
    const py = Math.round(yScale(currPt.kJ));
    // Crosshair
    lines.push(`<line x1="${px}" y1="${PAD_T}" x2="${px}" y2="${PAD_T + INNER_H}" stroke="#c4917a" stroke-width="1" stroke-dasharray="4,3" opacity="0.6"/>`);
    lines.push(`<line x1="${PAD_L}" y1="${py}" x2="${PAD_L + INNER_W}" y2="${py}" stroke="#c4917a" stroke-width="1" stroke-dasharray="4,3" opacity="0.6"/>`);
    // Dot
    lines.push(`<circle cx="${px}" cy="${py}" r="6" fill="#c4917a"/>`);
    lines.push(`<circle cx="${px}" cy="${py}" r="3" fill="#0f0d0e"/>`);
    // Label
    const lx = px + (px > PAD_L + INNER_W * 0.7 ? -10 : 10);
    const ly = py - 12;
    lines.push(`<rect x="${lx - 44}" y="${ly - 11}" width="88" height="18" rx="4" fill="#241f20" stroke="#4e3c3d" stroke-width="1"/>`);
    lines.push(`<text x="${lx}" y="${ly+1}" text-anchor="middle" font-size="11" fill="#c4917a" font-family="Source Sans 3,sans-serif" font-weight="600">${fmtKJ(currPt.kJ)} kJ</text>`);
  }

  svg.innerHTML = lines.join('\n');
}

// ---- Update UI --------------------------------------------------------------
function updateUI() {
  const r = calcResults();

  $resultKJ.textContent       = fmtKJ(r.Q_kJ);
  $resultKWh.textContent      = fmtKWh(r.Q_kWh);
  $resultTime.textContent     = fmtTime(r.timeHours);
  $resultTimeUnit.textContent = timeUnit(r.timeHours);
  $resultMass.textContent     = r.massKg > 0 ? r.massKg.toFixed(0) : '—';

  const interp = buildInterpretation(r);
  $interpText.textContent = interp;

  buildAnalogue(r.Q_kWh);
  renderChart(r);
}

// ---- Event listeners --------------------------------------------------------
function bindInput(input) {
  input.addEventListener('input', updateUI);
}
[
  $volume, $density, $cp, $startTemp, $targetTemp,
  $coolingPower, $safetyFactor, $ambientTemp,
].forEach(bindInput);

// Preset buttons
document.querySelectorAll('.preset-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.preset;
    const p   = PRESETS[key];
    if (!p) return;
    $volume.value      = p.volume;
    $density.value     = p.density;
    $cp.value          = p.cp;
    $startTemp.value   = p.startTemp;
    $targetTemp.value  = p.targetTemp;
    $coolingPower.value= p.coolingPower;
    $safetyFactor.value= p.safetyFactor;
    $ambientTemp.value = p.ambientTemp;
    updateUI();
  });
});

// ---- Boot -------------------------------------------------------------------
updateUI();
