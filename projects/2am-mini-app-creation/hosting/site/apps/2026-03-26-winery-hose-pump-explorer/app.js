/**
 * Winery Hose & Pump Explorer — app.js
 * Plain JS, dependency-free
 *
 * Contents
 *  1. Fluid presets
 *  2. DOM references
 *  3. Core calculation engine
 *  4. Friction factor helpers
 *  5. Chart rendering
 *  6. UI wiring
 */

// ──────────────────────────────────────────────
// 1. FLUID PRESETS
// ──────────────────────────────────────────────
const PRESETS = {
  water: {
    label: 'Water',
    density: 998,    // kg/m³ at ~20°C
    viscosity: 1.0,  // mPa·s
  },
  'white-wine': {
    label: 'White Wine',
    density: 990,    // kg/m³ typical
    viscosity: 1.5,  // mPa·s
  },
  'red-wine': {
    label: 'Red Wine',
    density: 1005,   // kg/m³ typical
    viscosity: 3.5,  // mPa·s (higher polyphenols + alcohol)
  },
  'grape-juice': {
    label: 'Grape Juice',
    density: 1065,   // kg/m³ typical Brix
    viscosity: 8.0,  // mPa·s (pectin + sugar)
  },
};

// ──────────────────────────────────────────────
// 2. DOM REFS
// ──────────────────────────────────────────────
const $ = (id) => document.getElementById(id);

const els = {
  // inputs
  flowRate:       $('flowRate'),
  hoseID:         $('hoseID'),
  hoseLength:     $('hoseLength'),
  elevationChange:$('elevationChange'),
  density:        $('density'),
  viscosity:      $('viscosity'),
  pumpEfficiency: $('pumpEfficiency'),
  // results
  resVelocity:     $('res-velocity'),
  resRe:           $('res-re'),
  resReRegime:     $('res-re-regime'),
  resFriction:     $('res-friction'),
  resFrictionPd:   $('res-friction-pd'),
  resStaticHead:   $('res-static-head'),
  resTdh:          $('res-tdh'),
  resHydPower:     $('res-hyd-power'),
  resShaftPower:   $('res-shaft-power'),
  cardTdh:         $('card-tdh'),
  // regime badge
  regimeBadge:     $('regime-badge'),
  regimeText:      $('regime-text'),
  // chart
  chartCanvas:     $('chart-canvas'),
  // buttons
  presetBtns:      document.querySelectorAll('.preset-btn'),
  calcBtn:         $('calculateBtn'),
};

// ──────────────────────────────────────────────
// 3. CORE CALCULATION ENGINE
// ──────────────────────────────────────────────

/**
 * Read all input values and return a clean params object.
 */
function readInputs() {
  return {
    Q_Lmin:      parseFloat(els.flowRate.value)       || 0,       // L/min
    D_mm:        parseFloat(els.hoseID.value)          || 0,       // mm
    L_m:         parseFloat(els.hoseLength.value)      || 0,       // m
    dz_m:        parseFloat(els.elevationChange.value) || 0,       // m (+ up, - down)
    rho_kgm3:    parseFloat(els.density.value)         || 998,     // kg/m³
    mu_mPas:     parseFloat(els.viscosity.value)       || 1.0,     // mPa·s
    eta_pct:     parseFloat(els.pumpEfficiency.value)  || 65,      // %
  };
}

/**
 * Main calculation: takes params, returns results object.
 * All internal units: SI (m, s, Pa, kg/m³, m²/s for ν)
 */
function calculate(params) {
  const { Q_Lmin, D_mm, L_m, dz_m, rho_kgm3, mu_mPas, eta_pct } = params;

  // Convert to SI
  const Q_m3s   = Q_Lmin / 60000;               // L/min → m³/s
  const D_m     = D_mm / 1000;                  // mm → m
  const mu_Pas  = mu_mPas / 1000;               // mPa·s → Pa·s
  const A_m2    = Math.PI * D_m * D_m / 4;      // cross-section area (m²)
  const eta     = Math.max(0.01, Math.min(1, eta_pct / 100));

  // Guard against zero / negative
  if (Q_m3s <= 0 || D_m <= 0 || L_m <= 0) return null;

  // Velocity
  const V_ms = Q_m3s / A_m2;

  // Reynolds number  Re = ρ V D / μ
  const Re = rho_kgm3 * V_ms * D_m / mu_Pas;

  // Friction factor
  const f = frictionFactor(Re, D_m, L_m);

  // Dynamic pressure  q = ρ V² / 2
  const q_Pa = 0.5 * rho_kgm3 * V_ms * V_ms;

  // Friction pressure drop  ΔP_f = f (L/D) q
  const dP_friction_Pa = f * (L_m / D_m) * q_Pa;
  const dP_friction_kPa = dP_friction_Pa / 1000;

  // Static head pressure  ρ g dz
  const g = 9.80665;
  const dP_static_Pa = rho_kgm3 * g * dz_m;

  // Total pressure drop
  const dP_total_Pa = dP_friction_Pa + dP_static_Pa;

  // Head conversions
  const staticHead_m    = dz_m;
  const frictionHead_m  = dP_friction_Pa / (rho_kgm3 * g);
  const tdh_m           = dP_total_Pa / (rho_kgm3 * g);

  // Power
  const P_hyd_W  = dP_total_Pa * Q_m3s;         // hydraulic power (W)
  const P_shaft_W = P_hyd_W / eta;               // shaft power (W)

  // Flow regime
  const regime = flowRegime(Re);

  return {
    V_ms,
    Re,
    f,
    dP_friction_Pa,
    dP_friction_kPa,
    dP_static_Pa,
    dP_total_Pa,
    staticHead_m,
    frictionHead_m,
    tdh_m,
    P_hyd_W,
    P_shaft_W,
    regime,
    Q_m3s,
    D_m,
    L_m,
    rho_kgm3,
    mu_Pas,
    eta,
    g,
  };
}

// ──────────────────────────────────────────────
// 4. FRICTION FACTOR HELPERS
// ──────────────────────────────────────────────

/**
 * Darcy friction factor for smooth hose.
 *
 * Laminar (Re < 2000):    f = 64 / Re
 * Turbulent (Re ≥ 2000):  Haaland equation (smooth pipe approximation)
 *                          1/√f = -1.8 log[ (6.9/Re) + (k/D)^1.11 / 3.7 ]
 *                          using k = 0.0015 mm (typical food-grade hose)
 *
 * @param {number} Re  - Reynolds number
 * @param {number} D_m - inside diameter (m)
 * @param {number} L_m - hose length (m) — not used in smooth formula
 * @returns {number}   Darcy friction factor f
 */
function frictionFactor(Re, D_m, L_m) {
  if (Re <= 0) return 0;

  // Smooth pipe roughness: k = 0.0015 mm = 1.5e-6 m
  const k_m = 1.5e-6;
  const kD   = k_m / D_m;

  if (Re < 2000) {
    // Pure laminar
    return 64 / Re;
  } else if (Re < 4000) {
    // Transition zone — blend laminar / turbulent (Swamee-Jain unsafe for low Re)
    const f_turb = haalandFactor(Re, kD);
    const f_lam  = 64 / Re;
    const blend  = (Re - 2000) / 2000;
    return f_lam * (1 - blend) + f_turb * blend;
  } else {
    // Fully turbulent — Haaland
    return haalandFactor(Re, kD);
  }
}

/**
 * Haaland equation for Darcy f in turbulent smooth-pipe regime.
 *  1/√f = -1.8 log[ (6.9/Re) + (k/D)^1.11 / 3.7 ]
 */
function haalandFactor(Re, kD) {
  const term = Math.pow(kD / 3.7, 1.11) + 6.9 / Re;
  const logVal = Math.log10(Math.max(term, 1e-12));
  const f_inv  = -1.8 * logVal;
  return 1 / (f_inv * f_inv);
}

/**
 * Flow regime label and category.
 */
function flowRegime(Re) {
  if (Re < 2000)  return { label: 'Laminar',         cssClass: 'regime-laminar' };
  if (Re < 4000)  return { label: 'Transition',     cssClass: 'regime-critical' };
  return             { label: 'Turbulent',        cssClass: 'regime-turbulent' };
}

// ──────────────────────────────────────────────
// 5. CHART RENDERING
// ──────────────────────────────────────────────

/** @type {CanvasRenderingContext2D|null} */
let chartCtx = null;

/**
 * Draw the pressure-drop vs flow-rate chart.
 * Current operating point highlighted in red.
 *
 * @param {object} params   - current input params
 * @param {object} results  - current calc results (or null)
 */
function drawChart(params, results) {
  const canvas = els.chartCanvas;
  if (!canvas) return;

  const DPR = window.devicePixelRatio || 1;
  const CS  = canvas.clientWidth;
  const CH  = canvas.clientHeight;

  canvas.width  = CS * DPR;
  canvas.height = CH * DPR;

  const ctx = canvas.getContext('2d');
  ctx.scale(DPR, DPR);
  chartCtx = ctx;

  const W = CS, H = CH;
  const PAD = { t: 24, r: 18, b: 48, l: 54 };
  const plotW = W - PAD.l - PAD.r;
  const plotH = H - PAD.t - PAD.b;

  // ── background ──────────────────────────────
  ctx.fillStyle = getComputedStyle(canvas).backgroundColor || '#3a2418';
  ctx.fillRect(0, 0, W, H);

  // ── Grid lines ──────────────────────────────
  ctx.strokeStyle = 'rgba(90,56,32,0.5)';
  ctx.lineWidth   = 1;

  const Q_max = Math.max(params.Q_Lmin * 2.5, 50);
  const Q_range = Q_max;
  const pd_max  = computePDAtFlow({ ...params, Q_Lmin: Q_max }); // kPa at Q_max
  const pd_range = Math.max(pd_max * 1.15, 10);

  const xFrac = (q) => PAD.l + (q / Q_range) * plotW;
  const yFrac = (pd) => PAD.t + (1 - pd / pd_range) * plotH;

  // vertical grid lines
  for (let i = 0; i <= 5; i++) {
    const q = (Q_range / 5) * i;
    const x = xFrac(q);
    ctx.beginPath();
    ctx.moveTo(x, PAD.t);
    ctx.lineTo(x, PAD.t + plotH);
    ctx.stroke();
  }

  // horizontal grid lines
  for (let i = 0; i <= 4; i++) {
    const pd = (pd_range / 4) * i;
    const y = yFrac(pd);
    ctx.beginPath();
    ctx.moveTo(PAD.l, y);
    ctx.lineTo(PAD.l + plotW, y);
    ctx.stroke();
  }

  // ── Axes ────────────────────────────────────
  ctx.strokeStyle = '#5a3820';
  ctx.lineWidth   = 1.5;

  // Y axis
  ctx.beginPath();
  ctx.moveTo(PAD.l, PAD.t);
  ctx.lineTo(PAD.l, PAD.t + plotH);
  ctx.stroke();

  // X axis
  ctx.beginPath();
  ctx.moveTo(PAD.l, PAD.t + plotH);
  ctx.lineTo(PAD.l + plotW, PAD.t + plotH);
  ctx.stroke();

  // ── Pressure drop curve ─────────────────────
  ctx.beginPath();
  ctx.strokeStyle = '#e8953a';
  ctx.lineWidth   = 2;
  let first = true;
  const STEPS = 80;
  for (let i = 0; i <= STEPS; i++) {
    const q   = (i / STEPS) * Q_range;
    const pd  = computePDAtFlow({ ...params, Q_Lmin: q });
    const x   = xFrac(q);
    const y   = yFrac(pd);
    if (first) { ctx.moveTo(x, y); first = false; }
    else        { ctx.lineTo(x, y); }
  }
  ctx.stroke();

  // ── Current operating point ──────────────────
  if (results && results.Re > 0) {
    const cx = xFrac(params.Q_Lmin);
    const cy = yFrac(results.dP_friction_kPa);

    // vertical dashed line
    ctx.save();
    ctx.setLineDash([3, 3]);
    ctx.strokeStyle = 'rgba(224,48,48,0.35)';
    ctx.lineWidth   = 1;
    ctx.beginPath();
    ctx.moveTo(cx, PAD.t);
    ctx.lineTo(cx, PAD.t + plotH);
    ctx.stroke();
    ctx.restore();

    // horizontal dashed line
    ctx.save();
    ctx.setLineDash([3, 3]);
    ctx.strokeStyle = 'rgba(224,48,48,0.35)';
    ctx.lineWidth   = 1;
    ctx.beginPath();
    ctx.moveTo(PAD.l, cy);
    ctx.lineTo(PAD.l + plotW, cy);
    ctx.stroke();
    ctx.restore();

    // point
    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    ctx.fillStyle   = '#e03030';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth   = 1.5;
    ctx.stroke();
  }

  // ── Axis labels ─────────────────────────────
  ctx.fillStyle  = '#a08060';
  ctx.font       = '11px DM Sans, system-ui, sans-serif';
  ctx.textAlign  = 'center';

  for (let i = 0; i <= 5; i++) {
    const q   = (Q_range / 5) * i;
    const x   = xFrac(q);
    ctx.fillText(q.toFixed(0), x, PAD.t + plotH + 18);
  }

  ctx.textAlign = 'right';
  for (let i = 0; i <= 4; i++) {
    const pd = (pd_range / 4) * i;
    const y  = yFrac(pd);
    ctx.fillText(pd.toFixed(1), PAD.l - 6, y + 4);
  }

  // Axis titles
  ctx.fillStyle = '#c0622a';
  ctx.font       = '12px DM Sans, system-ui, sans-serif';
  ctx.textAlign  = 'center';
  ctx.fillText('Flow Rate (L/min)', PAD.l + plotW / 2, H - 6);

  ctx.save();
  ctx.translate(14, PAD.t + plotH / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText('Pressure Drop (kPa)', 0, 0);
  ctx.restore();
}

/**
 * Compute friction pressure drop (kPa) at a given flow rate,
 * holding all other params constant.
 * Used for the chart curve.
 */
function computePDAtFlow(params) {
  const { Q_Lmin, D_mm, L_m, rho_kgm3, mu_mPas } = params;
  const Q_m3s = Q_Lmin / 60000;
  const D_m   = D_mm / 1000;
  const mu_Pas = mu_mPas / 1000;
  const A_m2  = Math.PI * D_m * D_m / 4;
  if (Q_m3s <= 0 || D_m <= 0 || L_m <= 0) return 0;
  const V_ms  = Q_m3s / A_m2;
  const Re    = rho_kgm3 * V_ms * D_m / mu_Pas;
  const f     = frictionFactor(Re, D_m, L_m);
  const q_Pa  = 0.5 * rho_kgm3 * V_ms * V_ms;
  return (f * (L_m / D_m) * q_Pa) / 1000; // kPa
}

// ──────────────────────────────────────────────
// 6. UI WIRING
// ──────────────────────────────────────────────

/** Format a number with locale-aware thousands and fixed decimals */
function fmt(val, decimals = 2) {
  if (!isFinite(val) || isNaN(val)) return '—';
  return val.toLocaleString('en-AU', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function fmtInt(val) {
  if (!isFinite(val) || isNaN(val)) return '—';
  return Math.round(val).toLocaleString('en-AU');
}

/** Update DOM result elements from a results object */
function displayResults(results, params) {
  if (!results) {
    // show zeros if calc failed
    [els.resVelocity, els.resFriction, els.resFrictionPd,
     els.resStaticHead, els.resTdh, els.resHydPower,
     els.resShaftPower].forEach(el => el.textContent = '—');
    els.resRe.textContent = '—';
    els.resReRegime.textContent = '—';
    els.regimeBadge.textContent = '—';
    els.regimeBadge.className = 'regime-badge';
    els.cardTdh.className = 'result-card';
    return;
  }

  els.resVelocity.textContent   = fmt(results.V_ms);
  els.resFriction.textContent   = fmt(results.f, 4);
  els.resFrictionPd.textContent = fmt(results.dP_friction_kPa);
  els.resStaticHead.textContent = fmt(results.staticHead_m);
  els.resTdh.textContent        = fmt(results.tdh_m);
  els.resHydPower.textContent   = fmt(results.P_hyd_W);
  els.resShaftPower.textContent = fmt(results.P_shaft_W);
  els.resRe.textContent         = fmtInt(results.Re);
  els.resReRegime.textContent   = results.regime.label;

  // Regime badge
  els.regimeBadge.textContent = `Flow: ${results.regime.label}`;
  els.regimeBadge.className   = `regime-badge ${results.regime.cssClass}`;

  // TDH card colour
  if (results.tdh_m >= 0) {
    els.cardTdh.className = 'result-card highlight-card tdh-positive';
  } else {
    els.cardTdh.className = 'result-card highlight-card tdh-negative';
  }

  // Draw chart
  drawChart(params, results);
}

/** Apply a fluid preset to the input fields */
function applyPreset(key) {
  const p = PRESETS[key];
  if (!p) return;
  els.density.value   = p.density;
  els.viscosity.value = p.viscosity;
}

/** Main calculate handler */
function doCalculate() {
  const params = readInputs();
  const results = calculate(params);
  displayResults(results, params);
}

/** Wire up all event listeners */
function wireUI() {
  // Calculate on button click
  els.calcBtn.addEventListener('click', doCalculate);

  // Recalculate on Enter in any number input
  document.querySelectorAll('input[type="number"]').forEach(inp => {
    inp.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') doCalculate();
    });
  });

  // Preset buttons
  els.presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      els.presetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyPreset(btn.dataset.preset);
      doCalculate();
    });
  });

  // Debounced live update (recalc 300ms after last keystroke)
  let timer;
  const liveInputs = [els.flowRate, els.hoseID, els.hoseLength,
                      els.elevationChange, els.density,
                      els.viscosity, els.pumpEfficiency];
  liveInputs.forEach(inp => {
    inp.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(doCalculate, 300);
    });
  });

  // Resize chart on window resize
  window.addEventListener('resize', () => {
    const params = readInputs();
    const results = calculate(params);
    drawChart(params, results);
  });
}

// ──────────────────────────────────────────────
// INIT
// ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  wireUI();
  doCalculate(); // run once on load with defaults
});
