/**
 * Wine SO₂ Speciation Explorer — app.js
 *
 * Chemistry:
 *   SO₂ in aqueous solution exists in three species governed by acid–base equilibria:
 *
 *   SO₂·H₂O  ⇌  HSO₃⁻  +  H⁺     pKa1 = 1.81  (dominant below pH ~4)
 *   HSO₃⁻    ⇌  SO₃²⁻  +  H⁺     pKa2 = 7.20  (negligible below pH ~6)
 *
 *   Fraction molecular = α₀ = [H⁺]² / ([H⁺]² + [H⁺]·10^(−pKa1) + 10^(−pKa1−pKa2))
 *   Fraction bisulfite = α₁ = [H⁺]·10^(−pKa1) / (denominator)
 *   Fraction sulfite   = α₂ = 10^(−pKa1−pKa2) / (denominator)
 *
 *   where [H⁺] = 10^(−pH)
 *
 *   Molecular SO₂ (mg/L)  = α₀ × freeSO2
 *   Required free SO₂     = targetMolSO2 / α₀  (at current pH)
 */

'use strict';

// ---- Constants -----------------------------------------------------------
const PKA1 = 1.81;  // HSO₃⁻ / SO₂·H₂O equilibrium (Zoecklein / Iland wine science)
const PKA2 = 7.20;  // SO₃²⁻ / HSO₃⁻ equilibrium

// Molecular weight of SO₂ (used for any unit conversions)
const MW_SO2 = 64.066; // g/mol — not needed for mg/L↔mg/L ratio but kept for reference

// ---- State ---------------------------------------------------------------
let state = {
  pH:         3.40,
  freeSO2:    40,
  molTarget:  0.8,
};

// ---- Wine presets --------------------------------------------------------
const PRESETS = {
  red: {
    pH:        3.40,
    freeSO2:   40,
    molTarget: 0.8,
    label:     'Red (pH 3.4)',
  },
  white: {
    pH:        3.20,
    freeSO2:   50,
    molTarget: 0.8,
    label:     'White (pH 3.2)',
  },
  sparkling: {
    pH:        3.00,
    freeSO2:   50,
    molTarget: 0.5,
    label:     'Sparkling (pH 3.0)',
  },
};

// ---- Speciation calculations ---------------------------------------------
function calcFractions(pH) {
  const H = Math.pow(10, -pH);            // [H⁺] concentration
  const term0 = H * H;                     // [H⁺]²
  const term1 = H * Math.pow(10, -PKA1);  // [H⁺]·10^(−pKa1)
  const term2 = Math.pow(10, -PKA1 - PKA2); // 10^(−pKa1−pKa2)
  const denom = term0 + term1 + term2;

  return {
    alphaMol:      term0 / denom,  // molecular SO₂ fraction
    alphaBis:      term1 / denom,  // bisulfite fraction
    alphaSulf:     term2 / denom,  // sulfite fraction
  };
}

/**
 * Given current pH and free SO₂ (mg/L), return molecular SO₂ (mg/L).
 */
function calcMolecularSO2(pH, freeSO2) {
  return calcFractions(pH).alphaMol * freeSO2;
}

/**
 * Given pH and a target molecular SO₂ (mg/L), return required free SO₂.
 */
function calcRequiredFreeSO2(pH, molTarget) {
  const alphaMol = calcFractions(pH).alphaMol;
  if (alphaMol <= 0) return Infinity;
  return molTarget / alphaMol;
}

// ---- UI helpers ----------------------------------------------------------

function getEl(id) {
  return document.getElementById(id);
}

function fmt(val, decimals = 2) {
  if (!isFinite(val)) return '—';
  return val.toFixed(decimals);
}

function fmtPct(val) {
  if (!isFinite(val)) return '—';
  return (val * 100).toFixed(1) + '%';
}

// ---- Update results ------------------------------------------------------
function updateResults() {
  const { pH, freeSO2, molTarget } = state;
  const { alphaMol, alphaBis, alphaSulf } = calcFractions(pH);

  // 1. Speciation percentages
  getEl('pct-molecular').textContent = fmtPct(alphaMol);
  getEl('pct-bisulfite').textContent = fmtPct(alphaBis);
  getEl('pct-sulfite').textContent   = fmtPct(alphaSulf);

  // 2. Bar widths (max 100% for visual; sulfite scale up 100x for visibility)
  getEl('bar-molecular').style.width = Math.min(alphaMol * 100, 100) + '%';
  getEl('bar-bisulfite').style.width = Math.min(alphaBis * 100, 100) + '%';
  // Sulfite fraction is tiny; show it at 100× scale so it's visible
  getEl('bar-sulfite').style.width   = Math.min(alphaSulf * 100 * 100, 100) + '%';

  // 3. Key metric boxes
  const molSO2 = alphaMol * freeSO2;
  getEl('mol-so2-val').textContent       = fmt(molSO2);
  getEl('target-val').textContent        = fmt(molTarget);
  getEl('legend-target').textContent     = fmt(molTarget);

  const required = calcRequiredFreeSO2(pH, molTarget);
  getEl('required-fso2-val').textContent = isFinite(required) ? fmt(required, 1) : '—';

  // 4. Interpretation band
  updateInterpretation(molSO2, molTarget, required, freeSO2, pH);

  // 5. Redraw chart
  drawChart();
}

// ---- Interpretation band ------------------------------------------------
function updateInterpretation(molSO2, molTarget, required, freeSO2, pH) {
  const band = getEl('interpretation-band');
  const icon = getEl('interp-icon');
  const text = getEl('interp-text');

  // Remove previous state classes
  band.classList.remove('low', 'moderate', 'high');

  if (!isFinite(required) || required <= 0) {
    icon.textContent = '⚠';
    text.textContent = 'Cannot estimate — check inputs.';
    band.classList.add('low');
    return;
  }

  // Ratio of what we have vs what's needed
  const ratio = freeSO2 / required;

  if (molSO2 < molTarget * 0.7) {
    // Well below target
    band.classList.add('low');
    icon.textContent = '🔴';
    if (ratio > 2.5) {
      text.textContent =
        `Current molecular SO₂ (${fmt(molSO2)} mg/L) is well below your target of ${fmt(molTarget)} mg/L. ` +
        `At pH ${fmt(pH)}, you need ~${fmt(required, 0)} mg/L free SO₂ to hit the target — ` +
        `roughly ${fmt(ratio, 1)}× your current level.`;
    } else {
      text.textContent =
        `Molecular SO₂ (${fmt(molSO2)} mg/L) is below the ${fmt(molTarget)} mg/L protection threshold. ` +
        `At pH ${fmt(pH)}, an addition to reach ~${fmt(required, 0)} mg/L free SO₂ would bring you to target.`;
    }
  } else if (molSO2 < molTarget * 1.2) {
    // Within reasonable range
    band.classList.add('moderate');
    icon.textContent = '🟡';
    text.textContent =
      `Molecular SO₂ (${fmt(molSO2)} mg/L) is within a workable range for your ${fmt(molTarget)} mg/L target. ` +
      `Current free SO₂ of ${fmt(freeSO2)} mg/L is close to the ~${fmt(required, 0)} mg/L needed at pH ${fmt(pH)}.`;
  } else {
    // Comfortably at or above target
    band.classList.add('high');
    icon.textContent = '🟢';
    text.textContent =
      `Molecular SO₂ (${fmt(molSO2)} mg/L) meets your ${fmt(molTarget)} mg/L target. ` +
      `At pH ${fmt(pH)}, this requires ${fmt(freeSO2)} mg/L free SO₂. ` +
      `Higher free SO₂ extends protection but balance against sensory impact.`;
  }
}

// ---- Chart ---------------------------------------------------------------
let chartCanvas = null;
let chartCtx    = null;
let chartDirty  = true;

function drawChart() {
  if (!chartCanvas) {
    chartCanvas = getEl('ph-chart');
    chartCtx    = chartCanvas.getContext('2d');
  }

  const canvas = chartCanvas;
  const dpr    = window.devicePixelRatio || 1;
  const rect   = canvas.parentElement.getBoundingClientRect();
  const W      = rect.width;
  const H      = rect.height;

  canvas.width  = W * dpr;
  canvas.height = H * dpr;
  chartCtx.scale(dpr, dpr);

  const pad  = { top: 18, right: 16, bottom: 38, left: 46 };
  const cW   = W - pad.left - pad.right;
  const cH   = H - pad.top  - pad.bottom;

  // Clear
  chartCtx.clearRect(0, 0, W, H);

  // Data range
  const pHMin = 2.8, pHMax = 4.2;
  const fso2Max = 200;

  // Map functions
  const mapX = (pH)    => pad.left + ((pH - pHMin) / (pHMax - pHMin)) * cW;
  const mapYAlpha = (a) => pad.top  + (1 - a / 0.5) * cH; // 0 → top, 0.5 → bottom
  const mapYFso2  = (f) => pad.top  + (1 - f / fso2Max) * cH;

  // Draw grid lines
  chartCtx.strokeStyle = '#e8e0d8';
  chartCtx.lineWidth   = 0.75;
  // Vertical (pH)
  for (let pH = 2.8; pH <= 4.2; pH += 0.2) {
    const x = mapX(pH);
    chartCtx.beginPath();
    chartCtx.moveTo(x, pad.top);
    chartCtx.lineTo(x, pad.top + cH);
    chartCtx.stroke();
  }
  // Horizontal
  for (let f = 0; f <= fso2Max; f += 50) {
    const y = mapYFso2(f);
    chartCtx.beginPath();
    chartCtx.moveTo(pad.left, y);
    chartCtx.lineTo(pad.left + cW, y);
    chartCtx.stroke();
  }

  // Axis labels
  chartCtx.fillStyle = '#8a7c72';
  chartCtx.font      = '10px system-ui, sans-serif';
  chartCtx.textAlign = 'right';
  // Y-axis left (alpha)
  chartCtx.fillText('50%', pad.left - 4, pad.top + 4);
  chartCtx.fillText('0%',  pad.left - 4, pad.top + cH + 3);
  // Y-axis right (fso2)
  chartCtx.textAlign = 'left';
  chartCtx.fillText(fso2Max + '', pad.left + cW + 4, pad.top + 4);
  chartCtx.fillText('0', pad.left + cW + 4, pad.top + cH + 3);

  // X-axis labels
  chartCtx.textAlign = 'center';
  for (let pH = 2.8; pH <= 4.2; pH += 0.2) {
    const x = mapX(pH);
    chartCtx.fillText(pH.toFixed(1), x, pad.top + cH + 14);
  }
  // X-axis title
  chartCtx.fillStyle = '#5c5048';
  chartCtx.font      = '10px system-ui, sans-serif';
  chartCtx.fillText('pH', pad.left + cW / 2, H - 4);

  // ---- Curve 1: Molecular fraction α₀ (left axis, as %)
  const { alphaMol } = calcFractions(state.pH);

  chartCtx.beginPath();
  chartCtx.strokeStyle = '#722F37';
  chartCtx.lineWidth   = 2;
  chartCtx.setLineDash([]);
  let first = true;
  for (let pH = pHMin; pH <= pHMax; pH += 0.02) {
    const a = calcFractions(pH).alphaMol;
    const x = mapX(pH);
    const y = mapYAlpha(a);
    if (first) { chartCtx.moveTo(x, y); first = false; }
    else chartCtx.lineTo(x, y);
  }
  chartCtx.stroke();

  // ---- Curve 2: Required free SO₂ to hit target (right-hand axis)
  const fso2Data = [];
  for (let pH = pHMin; pH <= pHMax; pH += 0.02) {
    const req = calcRequiredFreeSO2(pH, state.molTarget);
    if (isFinite(req) && req <= fso2Max) {
      fso2Data.push({ pH, req });
    }
  }

  chartCtx.beginPath();
  chartCtx.strokeStyle = '#4A90D9';
  chartCtx.lineWidth   = 2;
  chartCtx.setLineDash([5, 3]);
  first = true;
  for (const pt of fso2Data) {
    const x = mapX(pt.pH);
    const y = mapYFso2(pt.req);
    if (first) { chartCtx.moveTo(x, y); first = false; }
    else chartCtx.lineTo(x, y);
  }
  chartCtx.stroke();
  chartCtx.setLineDash([]);

  // ---- Current point marker
  const curX = mapX(state.pH);
  const curYAlpha = mapYAlpha(alphaMol);
  const curYFso2  = mapYFso2(state.freeSO2);

  // Horizontal dashed line from x-axis to point
  chartCtx.beginPath();
  chartCtx.strokeStyle = 'rgba(161, 61, 79, 0.35)';
  chartCtx.lineWidth   = 1;
  chartCtx.setLineDash([3, 3]);
  chartCtx.moveTo(pad.left, curYFso2);
  chartCtx.lineTo(curX, curYFso2);
  chartCtx.stroke();
  chartCtx.setLineDash([]);

  // Point dot
  chartCtx.beginPath();
  chartCtx.fillStyle   = '#A13D4F';
  chartCtx.strokeStyle = '#fff';
  chartCtx.lineWidth   = 1.5;
  chartCtx.arc(curX, curYFso2, 5, 0, Math.PI * 2);
  chartCtx.fill();
  chartCtx.stroke();

  // Label
  chartCtx.fillStyle  = '#A13D4F';
  chartCtx.font       = 'bold 10px system-ui, sans-serif';
  chartCtx.textAlign  = curX > pad.left + cW * 0.65 ? 'right' : 'left';
  chartCtx.fillText(
    `pH ${fmt(state.pH)}, ${fmt(state.freeSO2)} mg/L`,
    curX + (curX > pad.left + cW * 0.65 ? -6 : 6),
    curYFso2 - 5
  );
}

// ---- Event listeners -----------------------------------------------------
function bindEvents() {
  // pH input ↔ slider sync
  const phInput  = getEl('ph-input');
  const phSlider = getEl('ph-slider');

  phInput.addEventListener('input', () => {
    let v = parseFloat(phInput.value);
    if (isNaN(v)) return;
    v = Math.max(2.5, Math.min(4.5, v));
    state.pH = v;
    phSlider.value = v;
    updateResults();
  });
  phSlider.addEventListener('input', () => {
    state.pH = parseFloat(phSlider.value);
    phInput.value = state.pH.toFixed(2);
    updateResults();
  });

  // Free SO₂ input
  getEl('fso2-input').addEventListener('input', () => {
    const v = parseFloat(getEl('fso2-input').value);
    if (!isNaN(v) && v >= 0) {
      state.freeSO2 = v;
      updateResults();
    }
  });

  // Molecular target custom input
  const molTargetInput = getEl('mol-target-input');
  molTargetInput.addEventListener('input', () => {
    const v = parseFloat(molTargetInput.value);
    if (!isNaN(v) && v > 0) {
      state.molTarget = v;
      // Deactivate target preset buttons
      document.querySelectorAll('.target-btn').forEach(b => b.classList.remove('active'));
      updateResults();
    }
  });

  // Wine style presets
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.preset;
      const preset = PRESETS[key];
      if (!preset) return;

      state.pH         = preset.pH;
      state.freeSO2    = preset.freeSO2;
      state.molTarget  = preset.molTarget;

      phInput.value  = state.pH.toFixed(2);
      phSlider.value = state.pH;
      getEl('fso2-input').value = state.freeSO2;
      molTargetInput.value = state.molTarget;

      document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Sync target preset buttons
      document.querySelectorAll('.target-btn').forEach(b => {
        b.classList.toggle('active', parseFloat(b.dataset.val) === state.molTarget);
      });

      updateResults();
    });
  });

  // Target preset buttons
  document.querySelectorAll('.target-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = parseFloat(btn.dataset.val);
      state.molTarget = val;
      molTargetInput.value = val;
      document.querySelectorAll('.target-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateResults();
    });
  });

  // Resize chart on window resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(drawChart, 100);
  });
}

// ---- Init ----------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  bindEvents();
  updateResults();
});
