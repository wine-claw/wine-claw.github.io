/* ============================================================
   Vineyard Mildew Pressure Playbook — app.js
   Scoring logic, UI updates, presets, coach verdict
   ============================================================ */

// ---- Value Labels ----
const GROWTH_LABELS = ['Budburst', 'Shoot growth', 'Bloom → Fruit Set', 'Veraison', 'Ripening', 'Post-Harvest'];
const CANOPY_LABELS = ['Open / Thin', 'Light', 'Moderate', 'Dense', 'Very dense'];
const TEMP_LABELS   = ['Cool (<15°C)', 'Mild (10–15°C)', 'Moderate (15–25°C)', 'Warm (25–30°C)', 'Hot (>30°C)'];
const HUMID_LABELS  = ['Dry (<50%)', 'Moderate (50–65%)', 'Humid (65–80%)', 'Very humid (80–90%)', 'Saturated (>90%)'];
const RAIN_LABELS   = ['Dry / No rain', 'Light rain / Damp', 'Moderate rain', 'Heavy rain', 'Persistent heavy rain'];
const INOC_LABELS   = ['Clean block / New planting', 'Low pressure', 'Low–Moderate', 'Moderate–High', 'Heavy carryover pressure'];
const SPRAY_LABELS  = ['Recently sprayed (within 3 days)', 'Good coverage (within 7 days)', 'Spray aging — reapply soon', 'Due soon', 'Overdue / Unprotected'];
const AIRFLOW_LABELS= ['Open / Breezy', 'Good airflow', 'Moderate airflow', 'Sheltered / Poor airflow', 'Still / Very sheltered'];

// ---- Powdery factor scores (0–100 each) ----
// Returns raw contribution; multiplier applied in final combine
function powderyTemp(v) {
  // Sweet spot 16–30°C = indices 2–3; v=2 → moderate, v=3 → warm
  // Powdery: 16–30°C, optimum ~21–27°C
  if (v === 0) return 5;   // cool
  if (v === 1) return 25;  // mild
  if (v === 2) return 70;  // moderate (15–25°C)
  if (v === 3) return 90;  // warm (25–30°C) — near optimum
  if (v === 4) return 25;  // hot — above optimum
  return 0;
}
function powderyHumid(v) {
  // Moderate-high humidity 50–80% ideal; NOT saturated or rainy (free water inhibits)
  if (v === 0) return 15;  // dry
  if (v === 1) return 55;  // moderate
  if (v === 2) return 80;  // humid
  if (v === 3) return 65;  // very humid
  if (v === 4) return 20;  // saturated — powdery dislikes free water
  return 0;
}
function powderyCanopy(v) {
  // Dense = bad (shaded, traps humidity)
  if (v === 0) return 10;
  if (v === 1) return 30;
  if (v === 2) return 55;
  if (v === 3) return 80;
  if (v === 4) return 95;
  return 0;
}
function powderyAirflow(v) {
  // Still = bad
  if (v === 0) return 5;   // open / breezy
  if (v === 1) return 25;
  if (v === 2) return 55;
  if (v === 3) return 80;
  if (v === 4) return 95;
  return 0;
}
function powderyRain(v) {
  // Light rain actually ok for powdery (increases humidity without saturated leaf surface)
  // Heavy rain inhibits (splashes spores, free water on leaves)
  if (v === 0) return 25;  // dry
  if (v === 1) return 65;  // light rain / damp
  if (v === 2) return 55;  // moderate
  if (v === 3) return 30;  // heavy
  if (v === 4) return 10;  // persistent heavy
  return 0;
}
function powderyInoculum(v) { return v * 22; } // 0→0, 4→88
function powderySpray(v) {
  // v=0 = recently sprayed (protective), v=4 = overdue (not protective)
  return (4 - v) * 22;
}
function powderyGrowthStage(v) {
  // Both early (vulnerability) and late season matter
  if (v === 0) return 30;  // budburst — young tissue susceptible
  if (v === 1) return 55;
  if (v === 2) return 70;  // bloom-fruit set — very susceptible
  if (v === 3) return 65;  // veraison
  if (v === 4) return 40;
  if (v === 5) return 20;  // post-harvest
  return 0;
}

// ---- Downy factor scores ----
function downyTemp(v) {
  // Mild–warm 15–25°C; v=2 = moderate (15–25°C)
  if (v === 0) return 5;   // cool
  if (v === 1) return 35;  // mild
  if (v === 2) return 80;  // moderate (15–25°C)
  if (v === 3) return 60;  // warm (25–30°C)
  if (v === 4) return 10;  // hot
  return 0;
}
function downyHumid(v) {
  // High humidity required; saturated is ideal
  if (v === 0) return 5;
  if (v === 1) return 30;
  if (v === 2) return 65;
  if (v === 3) return 85;
  if (v === 4) return 95;
  return 0;
}
function downyCanopy(v) {
  // Dense = bad (traps moisture, reduces evaporation)
  if (v === 0) return 5;
  if (v === 1) return 25;
  if (v === 2) return 55;
  if (v === 3) return 80;
  if (v === 4) return 95;
  return 0;
}
function downyAirflow(v) {
  if (v === 0) return 5;
  if (v === 1) return 25;
  if (v === 2) return 55;
  if (v === 3) return 80;
  if (v === 4) return 95;
  return 0;
}
function downyRain(v) {
  // Leaf wetness drives downy; heavy rain is a big risk factor
  if (v === 0) return 5;   // dry
  if (v === 1) return 40;  // light rain / damp
  if (v === 2) return 70;  // moderate
  if (v === 3) return 90;  // heavy
  if (v === 4) return 98;  // persistent heavy
  return 0;
}
function downyInoculum(v) { return v * 22; }
function downySpray(v) { return (4 - v) * 22; }
function downyGrowthStage(v) {
  // Active growing season is most vulnerable; downy can cause late-season outbreaks too
  if (v === 0) return 20;  // budburst
  if (v === 1) return 50;
  if (v === 2) return 75;  // bloom-fruit set
  if (v === 3) return 70;  // veraison
  if (v === 4) return 50;
  if (v === 5) return 30;  // post-harvest
  return 0;
}

// ---- Combine into final scores ----
function computeScore(v) {
  const pT = powderyTemp(v.temperature);
  const pH = powderyHumid(v.humidity);
  const pC = powderyCanopy(v.canopyDensity);
  const pA = powderyAirflow(v.airflow);
  const pR = powderyRain(v.rainWetness);
  const pI = powderyInoculum(v.inoculum);
  const pS = powderySpray(v.sprayStatus);
  const pG = powderyGrowthStage(v.growthStage);

  const powderyRaw = (
    pT  * 0.18 +
    pH  * 0.13 +
    pC  * 0.18 +
    pA  * 0.12 +
    pR  * 0.12 +
    pI  * 0.10 +
    pS  * 0.10 +
    pG  * 0.07
  );

  const dT = downyTemp(v.temperature);
  const dH = downyHumid(v.humidity);
  const dC = downyCanopy(v.canopyDensity);
  const dA = downyAirflow(v.airflow);
  const dR = downyRain(v.rainWetness);
  const dI = downyInoculum(v.inoculum);
  const dS = downySpray(v.sprayStatus);
  const dG = downyGrowthStage(v.growthStage);

  const downyRaw = (
    dT  * 0.18 +
    dH  * 0.18 +
    dC  * 0.14 +
    dA  * 0.10 +
    dR  * 0.20 +
    dI  * 0.08 +
    dS  * 0.08 +
    dG  * 0.04
  );

  return {
    powdery: Math.round(Math.min(100, powderyRaw)),
    downy: Math.round(Math.min(100, downyRaw)),
    powderyFactors: { temp: pT, humid: pH, canopy: pC, airflow: pA, rain: pR, inoc: pI, spray: pS, growth: pG },
    downyFactors:   { temp: dT, humid: dH, canopy: dC, airflow: dA, rain: dR, inoc: dI, spray: dS, growth: dG },
  };
}

function scoreToBadge(score) {
  if (score >= 75) return 'SEVERE';
  if (score >= 50) return 'HIGH';
  if (score >= 25) return 'MEDIUM';
  return 'LOW';
}

function scoreToBadgeClass(score) {
  if (score >= 75) return 'badge-severe';
  if (score >= 50) return 'badge-high';
  if (score >= 25) return 'badge-medium';
  return 'badge-low';
}

// ---- Presets ----
const PRESETS = {
  'shaded-warm': {
    growthStage: 2, canopyDensity: 4, temperature: 3, humidity: 2,
    rainWetness: 2, inoculum: 2, sprayStatus: 2, airflow: 4,
    label: 'Shaded Warm Trap'
  },
  'wet-outbreak': {
    growthStage: 2, canopyDensity: 3, temperature: 2, humidity: 4,
    rainWetness: 4, inoculum: 3, sprayStatus: 3, airflow: 3,
    label: 'Wet Outbreak Week'
  },
  'open-clean': {
    growthStage: 1, canopyDensity: 0, temperature: 1, humidity: 0,
    rainWetness: 0, inoculum: 0, sprayStatus: 0, airflow: 0,
    label: 'Open Clean Canopy'
  },
  'late-humid': {
    growthStage: 4, canopyDensity: 3, temperature: 2, humidity: 4,
    rainWetness: 3, inoculum: 2, sprayStatus: 3, airflow: 3,
    label: 'Late-Season Humid Spell'
  },
  'high-inoculum': {
    growthStage: 3, canopyDensity: 3, temperature: 3, humidity: 2,
    rainWetness: 2, inoculum: 4, sprayStatus: 4, airflow: 3,
    label: 'High Inoculum Block'
  },
  'cool-damp': {
    growthStage: 1, canopyDensity: 2, temperature: 1, humidity: 3,
    rainWetness: 2, inoculum: 1, sprayStatus: 2, airflow: 2,
    label: 'Cool & Damp Morning'
  },
};

// ---- Current state ----
let state = {
  growthStage: 2, canopyDensity: 2, temperature: 2, humidity: 2,
  rainWetness: 1, inoculum: 1, sprayStatus: 1, airflow: 2,
};

// ---- DOM refs ----
const sliders = {
  growthStage:   document.getElementById('growthStage'),
  canopyDensity: document.getElementById('canopyDensity'),
  temperature:   document.getElementById('temperature'),
  humidity:      document.getElementById('humidity'),
  rainWetness:   document.getElementById('rainWetness'),
  inoculum:      document.getElementById('inoculum'),
  sprayStatus:   document.getElementById('sprayStatus'),
  airflow:       document.getElementById('airflow'),
};
const displays = {
  growthStage:   document.getElementById('growthStageDisplay'),
  canopyDensity: document.getElementById('canopyDensityDisplay'),
  temperature:   document.getElementById('temperatureDisplay'),
  humidity:      document.getElementById('humidityDisplay'),
  rainWetness:   document.getElementById('rainWetnessDisplay'),
  inoculum:      document.getElementById('inoculumDisplay'),
  sprayStatus:   document.getElementById('sprayStatusDisplay'),
  airflow:       document.getElementById('airflowDisplay'),
};

const LABEL_MAP = {
  growthStage:   GROWTH_LABELS,
  canopyDensity: CANOPY_LABELS,
  temperature:   TEMP_LABELS,
  humidity:      HUMID_LABELS,
  rainWetness:   RAIN_LABELS,
  inoculum:      INOC_LABELS,
  sprayStatus:   SPRAY_LABELS,
  airflow:       AIRFLOW_LABELS,
};

// ---- Update displays ----
function updateSliderDisplay(param, val) {
  const labels = LABEL_MAP[param];
  const display = displays[param];
  if (display && labels) {
    display.textContent = labels[val];
  }
}

// ---- Build tags for disease cards ----
function buildTags(score, factors, disease) {
  const tags = [];
  if (disease === 'powdery') {
    const { temp, humid, canopy, airflow, rain, inoc, spray } = factors;
    if (temp >= 70) tags.push({ cls: 'tag-danger', txt: '⚠ High temp favouring' });
    else if (temp >= 40) tags.push({ cls: 'tag', txt: 'Moderate temp favouring' });
    if (canopy >= 80) tags.push({ cls: 'tag-danger', txt: '🔥 Dense canopy — high risk' });
    else if (canopy >= 50) tags.push({ cls: 'tag-warning', txt: 'Moderate canopy risk' });
    if (airflow >= 80) tags.push({ cls: 'tag-danger', txt: '💨 Still air — risk' });
    if (humid >= 70) tags.push({ cls: 'tag', txt: 'Humid conditions' });
    if (rain >= 70) tags.push({ cls: 'tag-warning', txt: 'Rain — may inhibit slightly' });
    if (rain <= 20) tags.push({ cls: 'tag-neutral', txt: 'Dry — powdery persists' });
    if (spray >= 70) tags.push({ cls: 'tag-danger', txt: '🛡 Spray overdue' });
    if (inoc >= 70) tags.push({ cls: 'tag-danger', txt: '🔴 High inoculum' });
  } else {
    const { temp, humid, canopy, airflow, rain, inoc, spray } = factors;
    if (rain >= 80) tags.push({ cls: 'tag-danger', txt: '💧 Heavy wetness — major driver' });
    else if (rain >= 50) tags.push({ cls: 'tag-warning', txt: 'Leaf wetness present' });
    if (humid >= 80) tags.push({ cls: 'tag-danger', txt: '💦 High humidity — ideal' });
    if (canopy >= 80) tags.push({ cls: 'tag-danger', txt: '🔥 Dense canopy — traps moisture' });
    if (temp >= 70) tags.push({ cls: 'tag', txt: 'Mild-warm temp ideal' });
    if (airflow >= 80) tags.push({ cls: 'tag-warning', txt: '💨 Still — risk' });
    if (spray >= 70) tags.push({ cls: 'tag-danger', txt: '🛡 Spray overdue' });
    if (inoc >= 70) tags.push({ cls: 'tag-danger', txt: '🔴 High inoculum' });
  }
  if (tags.length === 0) {
    tags.push({ cls: 'tag-neutral', txt: 'No strong pressure drivers' });
  }
  return tags;
}

function renderTags(containerId, tags) {
  const el = document.getElementById(containerId);
  el.innerHTML = tags.map(t => `<span class="tag ${t.cls}">${t.txt}</span>`).join('');
}

// ---- Coach verdict ----
function buildCoachVerdict(pScore, dScore, pF, dF, v) {
  const parts = [];

  const pHigh = pScore >= 60;
  const dHigh = dScore >= 60;
  const bothHigh = pHigh && dHigh;
  const neitherHigh = !pHigh && !dHigh;
  const pSevere = pScore >= 75;
  const dSevere = dScore >= 75;

  // Spray urgency
  let sprayUrgency = '';
  if (v.sprayStatus >= 3) {
    sprayUrgency = bothHigh
      ? '🔴 URGENT: Both mildew types are elevated — check protection status immediately. Consider protectant + eradicant combination.'
      : pHigh
        ? '🟠 Prioritise powdery mildew protection. Assess spray interval and canopy coverage.'
        : dHigh
          ? '🟠 Prioritise downy mildew protection. Check leaf wetness duration and consider systemic fungicide.'
          : '🟡 Spray protection is overdue. Reapply before next rain event.';
  } else if (v.sprayStatus === 2) {
    sprayUrgency = '🟡 Spray coverage is aging — monitor closely and plan reapplication within 3–5 days if conditions persist.';
  } else {
    sprayUrgency = '🟢 Active protection in place. Continue monitoring conditions.';
  }

  // Canopy management
  let canopyAdvice = '';
  if (v.canopyDensity >= 3) {
    canopyAdvice = '🌿 Canopy is dense — leaf pulling, shoot positioning, or hedging would reduce humidity trapping and improve spray coverage. Bunch zone exposure is a key lever.';
  } else if (v.canopyDensity === 0) {
    canopyAdvice = '🌬 Open canopy is favourable — good airflow reduces both mildew risks.';
  }

  // Specific powdery advice
  let powderyAdvice = '';
  if (pSevere) {
    powderyAdvice = '⚠️ POWDERY is SEVERE: Powdery thrives in warm–moderate temp with moderate humidity and still, shaded conditions. Look for white ash-like colonies on upper leaf surfaces, shoots, and fruit. Consider an eradicant (e.g., sulphur, powdery-specific systemic) if infection is active.';
  } else if (pHigh) {
    powderyAdvice = '🟠 POWDERY elevated: Watch for white powdery colonies on upper leaf surfaces. Dense canopies and still air are compounding the risk. Sulfur-based or systemic options if infection is found.';
  }

  // Specific downy advice
  let downyAdvice = '';
  if (dSevere) {
    downyAdvice = '⚠️ DOWNY is SEVERE: Downy needs prolonged leaf wetness — look for yellow "oil-spot" lesions on upper leaf surfaces and white "down" sporulation on lower surfaces after wet periods. Systemic fungicide may be warranted if infection is active.';
  } else if (dHigh) {
    downyAdvice = '🟠 DOWNY elevated: Monitor leaf undersides after wet periods for downy sporulation. Open canopy to reduce leaf wetness duration. Consider preventive systemic if rain is forecast.';
  }

  // Rain event advice
  let rainAdvice = '';
  if (v.rainWetness >= 3) {
    rainAdvice = '💧 Significant rain / leaf wetness present — downy risk is elevated. Extended leaf wetness (>4 hours) is the key driver. Avoid overhead irrigation; ensure good drainage and airflow.';
  } else if (v.rainWetness === 1) {
    rainAdvice = '🌧 Light moisture present — moderate downy risk, especially if wetting events extend.';
  }

  // Temperature
  let tempAdvice = '';
  if (v.temperature === 4) {
    tempAdvice = '🌡 Hot conditions (>30°C) suppress powdery but downy remains a risk if humidity is high.';
  } else if (v.temperature === 0) {
    tempAdvice = '❄️ Cool conditions suppress both mildews — monitor but risk is lower.';
  }

  // Next 48h focus
  const nextMoves = [];
  if (pSevere || dSevere) {
    nextMoves.push('🔴 Scout the block within 24 hours — check upper and lower leaf surfaces, bunch zones, and sheltered areas.');
  }
  if (v.sprayStatus >= 3) {
    nextMoves.push('📋 Review spray records and plan reapplication — check product label for rain-fastness and interval.');
  }
  if (v.canopyDensity >= 3) {
    nextMoves.push('🌿 Consider targeted leaf removal around fruit set zone to improve airflow and spray penetration.');
  }
  if (v.rainWetness >= 2) {
    nextMoves.push('💧 Monitor leaf wetness duration — log or estimate wetness hours for downy risk assessment.');
  }
  if (v.inoculum >= 3) {
    nextMoves.push('🔴 High inoculum block — reduce pressure early to lower carryover risk for next season.');
  }
  if (nextMoves.length === 0) {
    nextMoves.push('📋 Conditions are relatively manageable — continue regular monitoring and maintain spray program.');
  }

  return { sprayUrgency, canopyAdvice, powderyAdvice, downyAdvice, rainAdvice, tempAdvice, nextMoves };
}

function renderCoach(verdict) {
  const { sprayUrgency, canopyAdvice, powderyAdvice, downyAdvice, rainAdvice, tempAdvice, nextMoves } = verdict;
  const body = document.getElementById('coachBody');
  let html = '';

  if (powderyAdvice) html += `<p class="coach-action" style="display:flex">${powderyAdvice}</p>`;
  if (downyAdvice)   html += `<p class="coach-warn">${downyAdvice}</p>`;
  html += `<p class="coach-caution">${sprayUrgency}</p>`;
  if (canopyAdvice)  html += `<p>${canopyAdvice}</p>`;
  if (rainAdvice)    html += `<p>${rainAdvice}</p>`;
  if (tempAdvice)    html += `<p>${tempAdvice}</p>`;

  html += '<p style="margin-top:10px;font-weight:700;color:var(--green-light);font-size:12px;">📌 Next 48 hours:</p><ul style="margin-top:4px;padding-left:16px;">';
  nextMoves.forEach(m => { html += `<li style="margin-bottom:4px;">${m}</li>`; });
  html += '</ul>';

  body.innerHTML = html;
}

// ---- Main render ----
function render() {
  const { powdery, downy, powderyFactors, downyFactors } = computeScore(state);

  // Meters
  document.getElementById('powderyFill').style.width = powdery + '%';
  document.getElementById('downyFill').style.width = downy + '%';
  document.getElementById('powderyMeterPct').textContent = powdery + '%';
  document.getElementById('downyMeterPct').textContent = downy + '%';

  // Badges
  const pBadge = document.getElementById('powderyBadge');
  const dBadge = document.getElementById('downyBadge');
  pBadge.textContent = scoreToBadge(powdery);
  dBadge.textContent = scoreToBadge(downy);
  pBadge.className = 'pressure-badge ' + scoreToBadgeClass(powdery);
  dBadge.className = 'pressure-badge ' + scoreToBadgeClass(downy);

  // Tags
  const pTags = buildTags(powdery, powderyFactors, 'powdery');
  const dTags = buildTags(downy, downyFactors, 'downy');
  renderTags('powderyTags', pTags);
  renderTags('downyTags', dTags);

  // Favouring factors text
  const pFavEl = document.getElementById('powderyFactors');
  const dFavEl = document.getElementById('downyFactors');

  // Build contextual favouring text
  const pFavs = [];
  if (powderyFactors.temp >= 70) pFavs.push('warm–moderate temperature');
  if (powderyFactors.humid >= 60) pFavs.push('moderate–high humidity');
  if (powderyFactors.canopy >= 70) pFavs.push('dense, shaded canopy');
  if (powderyFactors.airflow >= 70) pFavs.push('still, sheltered air');
  if (powderyFactors.inoc >= 50) pFavs.push('elevated inoculum pressure');
  if (powderyFactors.spray <= 20) pFavs.push('good spray protection');

  const dFavs = [];
  if (downyFactors.rain >= 70) dFavs.push('prolonged leaf wetness / rain');
  if (downyFactors.humid >= 70) dFavs.push('very high humidity');
  if (downyFactors.canopy >= 70) dFavs.push('dense canopy trapping moisture');
  if (downyFactors.airflow >= 70) dFavs.push('poor airflow / still air');
  if (downyFactors.temp >= 60) dFavs.push('mild–warm temperature');
  if (downyFactors.inoc >= 50) dFavs.push('elevated inoculum pressure');

  pFavEl.innerHTML = `<strong>Favouring:</strong> ${pFavs.length ? pFavs.join(', ') : 'No strong drivers detected'}`;
  dFavEl.innerHTML = `<strong>Favouring:</strong> ${dFavs.length ? dFavs.join(', ') : 'No strong drivers detected'}`;

  // Coach
  const verdict = buildCoachVerdict(powdery, downy, powderyFactors, downyFactors, state);
  renderCoach(verdict);
}

// ---- Slider change handler ----
Object.entries(sliders).forEach(([param, slider]) => {
  slider.addEventListener('input', () => {
    const val = parseInt(slider.value, 10);
    state[param] = val;
    updateSliderDisplay(param, val);
    render();
  });
});

// ---- Preset buttons ----
document.querySelectorAll('.preset-chip').forEach(btn => {
  btn.addEventListener('click', () => {
    const presetKey = btn.dataset.preset;
    const preset = PRESETS[presetKey];
    if (!preset) return;

    // Clear active state on all chips
    document.querySelectorAll('.preset-chip').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Apply preset values to sliders and state
    Object.entries(preset).forEach(([key, val]) => {
      if (key === 'label') return;
      state[key] = val;
      if (sliders[key]) {
        sliders[key].value = val;
        updateSliderDisplay(key, val);
      }
    });
    render();
  });
});

// ---- Reset ----
document.getElementById('resetBtn').addEventListener('click', () => {
  state = { growthStage: 2, canopyDensity: 2, temperature: 2, humidity: 2, rainWetness: 1, inoculum: 1, sprayStatus: 1, airflow: 2 };
  Object.entries(sliders).forEach(([key, slider]) => {
    slider.value = state[key];
    updateSliderDisplay(key, state[key]);
  });
  document.querySelectorAll('.preset-chip').forEach(b => b.classList.remove('active'));
  render();
});

// ---- Initial render ----
Object.entries(sliders).forEach(([key, slider]) => {
  updateSliderDisplay(key, parseInt(slider.value, 10));
});
render();
