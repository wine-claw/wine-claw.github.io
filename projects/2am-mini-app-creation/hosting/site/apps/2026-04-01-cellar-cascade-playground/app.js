/* =====================================================
   CELLAR CASCADE PLAYGROUND — App Logic
   ===================================================== */

// ── LEVER DEFINITIONS ────────────────────────────────────────────────────────
const LEVERS = [
  {
    id: 'intake',
    name: '🍇 Fruit Intake Rate',
    min: 0, max: 100, default: 40,
    desc: 'Leisurely ← → Flat-out rush',
  },
  {
    id: 'chill',
    name: '❄️ Chill Aggressiveness',
    min: 0, max: 100, default: 45,
    desc: 'Gentle cold → Aggressive freeze',
  },
  {
    id: 'pumpover',
    name: '🔄 Pump-Over Intensity',
    min: 0, max: 100, default: 50,
    desc: 'Gentle drizzle → High turbulence',
  },
  {
    id: 'so2',
    name: '🧪 SO₂ Conservatism',
    min: 0, max: 100, default: 50,
    desc: 'Minimal addition → Heavy protection',
  },
  {
    id: 'lees',
    name: '🫧 Lees Contact Duration',
    min: 0, max: 100, default: 35,
    desc: 'No contact → Extended sur lie',
  },
  {
    id: 'filter',
    name: '🔍 Filtration Timing',
    min: 0, max: 100, default: 50,
    desc: 'Early polish → Late keep-char',
  },
  {
    id: 'package',
    name: '📦 Packaging Speed',
    min: 0, max: 100, default: 40,
    desc: 'Careful & measured → Fast & pressured',
  },
];

// ── OUTCOME DEFINITIONS ─────────────────────────────────────────────────────
const OUTCOMES = [
  { id: 'quality',    name: 'Wine Quality Risk',     icon: '🏷️',  unit: 'risk',  invert: true  },
  { id: 'aroma',     name: 'Aroma Retention',       icon: '🌸',  unit: '%',     invert: false },
  { id: 'oxidation', name: 'Oxidation / Micro Risk',icon: '💨',  unit: 'risk',  invert: true  },
  { id: 'throughput',name: 'Throughput Pressure',    icon: '⚡',  unit: 'load',  invert: true  },
  { id: 'energy',    name: 'Energy Demand',          icon: '🔋',  unit: 'kWh',   invert: true  },
  { id: 'tank',      name: 'Tank Availability',      icon: '🛢️',  unit: 'free',  invert: false },
  { id: 'team',      name: 'Team Stress',            icon: '👷',  unit: 'load',  invert: true  },
  { id: 'schedule',  name: 'Schedule Buffer',        icon: '📅',  unit: 'flex',  invert: false },
];

// ── CAUSAL MATRIX ───────────────────────────────────────────────────────────
// Each entry: [lowValEffect, highValEffect] on a 0-1 lever scale
// lowValEffect: effect when lever=0  (-1 = strong negative, 0 = neutral, +1 = strong positive)
// highValEffect: effect when lever=100
// Effects are interpolated linearly.
// 'invert' flag means lower score = better (so multiply delta by -1 for display)

const CAUSAL_MATRIX = {
  //            quality    aroma    oxidation throughput energy   tank     team     schedule
  intake:    [ [+0.1, -0.6], [+0.2, -0.5], [-0.1, +0.5], [-0.3,+0.8], [-0.1,+0.4], [+0.3,-0.5], [-0.1,+0.6], [+0.2,-0.5] ],
  chill:     [ [-0.2, +0.4], [-0.3, +0.3], [+0.3,-0.2],  [+0.1,+0.2], [+0.1,+0.7], [0,0],       [+0.1,+0.3], [0,0]      ],
  pumpover:  [ [-0.2, +0.5], [-0.4, +0.3], [-0.2, +0.6], [+0.1,+0.3], [+0.1,+0.5], [0,0],       [+0.1,+0.2], [-0.1,+0.1] ],
  so2:       [ [-0.1, +0.3], [-0.3, +0.4], [+0.5,-0.5],  [0,0],       [0,0],       [0,0],       [0,0],       [0,0]      ],
  lees:      [ [-0.3, +0.5], [-0.4, +0.6], [+0.1,-0.1],  [+0.2,-0.2], [0,0],       [-0.3,+0.3], [+0.1,+0.1], [+0.2,-0.2] ],
  filter:    [ [-0.3, +0.4], [+0.4,-0.5], [+0.5,-0.3],  [+0.2,-0.2], [0,0],       [+0.2,-0.2], [+0.1,-0.1], [+0.2,-0.2] ],
  package:   [ [-0.1, +0.4], [-0.1, +0.3], [-0.1, +0.5], [-0.2,+0.6], [0,0],       [+0.2,-0.3], [-0.1,+0.5], [+0.3,-0.4] ],
};

// ── SCENARIO PRESETS ────────────────────────────────────────────────────────
const PRESETS = {
  baseline: {
    label: '🍇 Baseline',
    levers: { intake: 40, chill: 45, pumpover: 50, so2: 50, lees: 35, filter: 50, package: 40 },
  },
  'hot-vintage': {
    label: '🔥 Hot Vintage Intake',
    levers: { intake: 85, chill: 90, pumpover: 65, so2: 60, lees: 25, filter: 35, package: 70 },
  },
  'premium-white': {
    label: '🥂 Premium White Focus',
    levers: { intake: 30, chill: 75, pumpover: 15, so2: 70, lees: 80, filter: 20, package: 25 },
  },
  'red-crunch': {
    label: '🍷 Red Ferment Crunch',
    levers: { intake: 80, chill: 30, pumpover: 85, so2: 35, lees: 15, filter: 60, package: 55 },
  },
  'bottling-squeeze': {
    label: '📦 Bottling Week Squeeze',
    levers: { intake: 25, chill: 20, pumpover: 30, so2: 80, lees: 10, filter: 90, package: 95 },
  },
};

// ── STATE ────────────────────────────────────────────────────────────────────
let state = {
  levers: {},
  baselineScores: null,
  currentScores: null,
  activePreset: null,
};

LEVERS.forEach(l => { state.levers[l.id] = l.default; });

// ── COMPUTE ENGINE ───────────────────────────────────────────────────────────
function computeScore(leverId, leverVal) {
  const effects = CAUSAL_MATRIX[leverId];
  const t = leverVal / 100; // 0 to 1
  return effects.map(([lo, hi]) => lo + t * (hi - lo));
}

function computeAllScores() {
  const sums = OUTCOMES.map(() => 0);
  const counts = OUTCOMES.map(() => 0);

  LEVERS.forEach(lever => {
    const val = state.levers[lever.id];
    const scores = computeScore(lever.id, val);
    scores.forEach((s, i) => {
      sums[i] += s;
      counts[i]++;
    });
  });

  // Normalise: divide by lever count, remap to 0-100
  return sums.map((sum, i) => {
    const avg = sum / counts[i];
    // avg is roughly -1 to +1, remap to 0-100
    const raw = Math.round((avg + 1) * 50);
    return Math.max(0, Math.min(100, raw));
  });
}

function computeRipple(leverId, leverVal, oldVal, outcomeIdx) {
  const effects = CAUSAL_MATRIX[leverId];
  const oldT = oldVal / 100;
  const newT = leverVal / 100;
  const [lo, hi] = effects[outcomeIdx];
  const oldEffect = lo + oldT * (hi - lo);
  const newEffect = lo + newT * (hi - lo);
  return newEffect - oldEffect;
}

// ── RENDERING ────────────────────────────────────────────────────────────────
function renderLevers() {
  const container = document.getElementById('levers-list');
  container.innerHTML = '';

  LEVERS.forEach(lever => {
    const val = state.levers[lever.id];
    const pct = ((val - lever.min) / (lever.max - lever.min)) * 100;

    const item = document.createElement('div');
    item.className = 'lever-item';
    item.innerHTML = `
      <div class="lever-header">
        <span class="lever-name">${lever.name}</span>
        <span class="lever-value">${val}</span>
      </div>
      <div class="lever-slider-wrap">
        <div class="lever-track">
          <div class="lever-fill" style="width:${pct}%"></div>
        </div>
        <input type="range" class="lever-input"
          id="lever-${lever.id}"
          min="${lever.min}" max="${lever.max}" value="${val}"
          data-id="${lever.id}" />
      </div>
    `;
    container.appendChild(item);
  });

  // Attach listeners
  document.querySelectorAll('.lever-input').forEach(input => {
    input.addEventListener('input', onLeverChange);
  });
}

function renderOutcomes() {
  const container = document.getElementById('outcomes-list');
  container.innerHTML = '';

  OUTCOMES.forEach((outcome, i) => {
    const score = state.currentScores[i];
    const baseline = state.baselineScores ? state.baselineScores[i] : score;
    const delta = score - baseline;
    const deltaSign = delta > 0 ? '+' : '';
    const deltaStr = `${deltaSign}${delta}`;

    const cls = scoreToClass(score, outcome.invert);

    const item = document.createElement('div');
    item.className = 'outcome-item';
    item.innerHTML = `
      <div class="outcome-header">
        <span class="outcome-name">${outcome.icon} ${outcome.name}</span>
        <span class="outcome-score ${cls}">${deltaStr != '0' ? deltaStr + ' ' : ''}${score}</span>
      </div>
      <div class="outcome-bar-track">
        <div class="outcome-bar-fill ${cls}" style="width:${score}%"></div>
      </div>
      <div class="outcome-gauge">${scoreLabel(score, outcome)}</div>
    `;
    container.appendChild(item);
  });
}

function renderRippleBoard(changedLeverId) {
  const container = document.getElementById('ripple-nodes');
  container.innerHTML = '';

  // Find most significant changes
  const deltas = [];
  OUTCOMES.forEach((outcome, oi) => {
    let totalDelta = 0;
    let contributors = [];
    LEVERS.forEach(lever => {
      const delta = computeRipple(lever.id, state.levers[lever.id], state.levers[lever.id], oi);
      // We want the delta from the baseline, not from current
      const baselineVal = LEVERS.find(l => l.id === lever.id).default;
      const actualDelta = computeRipple(lever.id, state.levers[lever.id], baselineVal, oi);
      if (Math.abs(actualDelta) > 0.05) {
        contributors.push({ id: lever.id, name: lever.name, delta: actualDelta });
      }
    });

    const netDelta = contributors.reduce((s, c) => s + c.delta, 0);
    deltas.push({ outcome, oi, netDelta, contributors });
  });

  // Sort by absolute impact
  deltas.sort((a, b) => Math.abs(b.netDelta) - Math.abs(a.netDelta));

  // Show top 6 outcomes
  deltas.slice(0, 6).forEach(({ outcome, oi, netDelta, contributors }) => {
    const score = state.currentScores[oi];
    const isUp = netDelta > 0.02;
    const isDown = netDelta < -0.02;
    const highlight = isUp ? 'highlight-up' : isDown ? 'highlight-down' : '';
    const arrowChar = isUp ? '↑' : isDown ? '↓' : '→';
    const arrowCls = isUp ? 'arrow-up' : isDown ? 'arrow-down' : '';
    const deltaStr = (netDelta > 0 ? '+' : '') + (netDelta * 100).toFixed(0);
    const deltaDisplay = Math.abs(netDelta) > 0.02 ? deltaStr : '~';

    const row = document.createElement('div');
    row.className = `ripple-row ${highlight}`;

    // Top contributors as tags (limit 2)
    const topContrib = contributors
      .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))
      .slice(0, 2);

    const contribTags = topContrib.map(c => {
      const sign = c.delta > 0 ? '+' : '−';
      return `<span class="ripple-lever-tag">${sign}${c.name.split(' ')[0]}</span>`;
    }).join('');

    const outcomeColorCls = outcome.invert
      ? (isUp ? 'danger' : isDown ? 'safe' : '')
      : (isUp ? 'safe' : isDown ? 'danger' : '');

    row.innerHTML = `
      <span class="ripple-arrow ${arrowCls}">${arrowChar}</span>
      <span class="ripple-outcome-name ${outcomeColorCls}">${outcome.icon} ${outcome.name}</span>
      <div class="ripple-bar-wrap">
        <div class="ripple-bar-track">
          <div class="ripple-bar-fill ${isUp ? 'heat-up' : isDown ? 'heat-down' : 'neutral'}"
               style="width:${score}%"></div>
        </div>
      </div>
      <span class="ripple-delta ${isUp ? 'up' : isDown ? 'down' : 'same'}">${deltaDisplay}</span>
    `;
    container.appendChild(row);
  });

  // Ripple explanation
  renderRippleExplanation(deltas);
}

function renderRippleExplanation(deltas) {
  const panel = document.getElementById('ripple-explanation');
  if (!panel) return;

  const topImpact = deltas
    .filter(d => Math.abs(d.netDelta) > 0.08)
    .sort((a, b) => Math.abs(b.netDelta) - Math.abs(a.netDelta))
    .slice(0, 3);

  if (topImpact.length === 0) {
    panel.innerHTML = `<p style="font-size:0.72rem;color:var(--text-dim);font-style:italic;">System near baseline — try adjusting some levers.</p>`;
    return;
  }

  const lines = topImpact.map(({ outcome, netDelta, contributors }) => {
    const sign = netDelta > 0 ? '↑' : '↓';
    const abs = Math.abs(netDelta * 100).toFixed(0);
    const topC = contributors
      .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))
      .slice(0, 2)
      .map(c => c.name.replace(/[^a-zA-Z0-9 ]/g, '').trim().split(' ')[0]);
    const causeStr = topC.length > 0 ? ` (from ${topC.join(' & ')})` : '';
    return `  ${sign} <strong>${outcome.name}</strong> is shifting ${abs} points${causeStr}`;
  });

  panel.innerHTML = `<div style="font-size:0.72rem;color:var(--text-dim);line-height:1.7;margin-top:10px;padding:8px;background:var(--bg2);border-radius:8px;border:1px solid var(--border);"><strong style="color:var(--accent);font-family:var(--mono);font-size:0.65rem;text-transform:uppercase;letter-spacing:0.05em;">Ripple Root Causes</strong><br>${lines.join('<br>')}</div>`;
}

function scoreToClass(score, invert) {
  if (invert) {
    if (score < 25) return 'excellent';
    if (score < 45) return 'good';
    if (score < 60) return 'ok';
    if (score < 75) return 'risky';
    return 'danger';
  } else {
    if (score < 25) return 'danger';
    if (score < 45) return 'risky';
    if (score < 60) return 'ok';
    if (score < 75) return 'good';
    return 'excellent';
  }
}

function scoreLabel(score, outcome) {
  if (outcome.invert) {
    if (score < 20) return '✅ Very Low Risk';
    if (score < 40) return '🟢 Manageable';
    if (score < 60) return '🟡 Elevated';
    if (score < 80) return '🟠 High Risk';
    return '🔴 Critical';
  } else {
    if (score < 20) return '🔴 Very Low';
    if (score < 40) return '🟠 Low';
    if (score < 60) return '🟡 Moderate';
    if (score < 80) return '🟢 Good';
    return '✅ Excellent';
  }
}

// ── EVENT HANDLERS ──────────────────────────────────────────────────────────
function onLeverChange(e) {
  const id = e.target.dataset.id;
  const val = parseInt(e.target.value, 10);
  state.levers[id] = val;
  state.activePreset = null;

  // Update value display
  const valueEl = e.target.closest('.lever-item').querySelector('.lever-value');
  if (valueEl) valueEl.textContent = val;

  // Update fill
  const fillEl = e.target.closest('.lever-item').querySelector('.lever-fill');
  if (fillEl) fillEl.style.width = `${val}%`;

  // Recalculate
  recalc();
}

function applyPreset(presetId) {
  const preset = PRESETS[presetId];
  if (!preset) return;

  state.activePreset = presetId;
  Object.keys(preset.levers).forEach(id => {
    state.levers[id] = preset.levers[id];
  });

  // Update slider UIs
  LEVERS.forEach(lever => {
    const input = document.getElementById(`lever-${lever.id}`);
    const valueEl = document.querySelector(`#lever-${lever.id}`) ?
      document.getElementById(`lever-${lever.id}`).closest('.lever-item').querySelector('.lever-value') : null;
    const fillEl = document.getElementById(`lever-${lever.id}`) ?
      document.getElementById(`lever-${lever.id}`).closest('.lever-item').querySelector('.lever-fill') : null;
    if (input) input.value = state.levers[lever.id];
    if (valueEl) valueEl.textContent = state.levers[lever.id];
    if (fillEl) fillEl.style.width = `${state.levers[lever.id]}%`;
  });

  // Highlight active preset
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.scenario === presetId);
  });

  recalc();
}

function recalc() {
  state.currentScores = computeAllScores();
  renderOutcomes();
  renderRippleBoard();
}

// ── PRESET BUTTONS ───────────────────────────────────────────────────────────
function setupPresets() {
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      applyPreset(btn.dataset.scenario);
    });
  });
}

// ── INIT ─────────────────────────────────────────────────────────────────────
function init() {
  renderLevers();
  state.baselineScores = computeAllScores();
  state.currentScores = [...state.baselineScores];
  renderOutcomes();
  renderRippleBoard();
  setupPresets();
}

document.addEventListener('DOMContentLoaded', init);
