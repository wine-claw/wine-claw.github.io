const stagePresets = {
  budburst: { label: 'Budburst', kc: 0.35 },
  flowering: { label: 'Flowering', kc: 0.55 },
  fruitSet: { label: 'Fruit set', kc: 0.7 },
  veraison: { label: 'Veraison', kc: 0.8 },
  ripening: { label: 'Ripening / deficit strategy', kc: 0.6 }
};

const soilPresets = {
  sand: { label: 'Sand', awc: 60 },
  sandyLoam: { label: 'Sandy loam', awc: 110 },
  loam: { label: 'Loam', awc: 160 },
  clayLoam: { label: 'Clay loam', awc: 190 }
};

const scenarioPresets = [
  {
    id: 'young-sand',
    label: 'Young block on sand',
    values: { eto: 5.4, stage: 'flowering', kc: 0.55, soil: 'sand', awc: 60, rootDepth: 0.45, mad: 35, startFill: 74, efficiency: 82, irrigationMm: 8, irrigationDay: 2 }
  },
  {
    id: 'balanced-mid',
    label: 'Mid-season balanced block',
    values: { eto: 6.5, stage: 'fruitSet', kc: 0.7, soil: 'loam', awc: 160, rootDepth: 1.05, mad: 45, startFill: 68, efficiency: 88, irrigationMm: 10, irrigationDay: 3 }
  },
  {
    id: 'hot-shallow',
    label: 'Hot spell on shallow roots',
    values: { eto: 8.5, stage: 'veraison', kc: 0.82, soil: 'sandyLoam', awc: 110, rootDepth: 0.55, mad: 38, startFill: 56, efficiency: 78, irrigationMm: 14, irrigationDay: 2 }
  },
  {
    id: 'ripening-deficit',
    label: 'Ripening deficit strategy',
    values: { eto: 4.8, stage: 'ripening', kc: 0.58, soil: 'clayLoam', awc: 190, rootDepth: 1.15, mad: 50, startFill: 52, efficiency: 90, irrigationMm: 6, irrigationDay: 4 }
  }
];

const state = {};
const controls = {};
const els = {};

function byId(id) { return document.getElementById(id); }
function clamp(v, min, max) { return Math.min(max, Math.max(min, v)); }
function round(v, digits = 0) { const p = 10 ** digits; return Math.round(v * p) / p; }

function init() {
  bindEls();
  populateSelects();
  wireControls();
  renderPresetButtons();
  applyPreset(scenarioPresets[1].values, scenarioPresets[1].id);
}

function bindEls() {
  ['eto','kc','awc','rootDepth','mad','startFill','efficiency','irrigationMm','irrigationDay','stage','soil'].forEach((id) => { controls[id] = byId(id); });
  ['etoOut','kcOut','awcOut','rootDepthOut','madOut','startFillOut','efficiencyOut','irrigationMmOut','irrigationDayOut','metrics','bucketFill','bucketTrigger','bucketNowMm','bucketTriggerMm','bucketDeficitMm','forecastStrip','forecastSvg','summaryText','statusPill','presetRow'].forEach((id) => { els[id] = byId(id); });
}

function populateSelects() {
  Object.entries(stagePresets).forEach(([key, preset]) => {
    controls.stage.add(new Option(preset.label, key));
  });
  Object.entries(soilPresets).forEach(([key, preset]) => {
    controls.soil.add(new Option(preset.label, key));
  });
}

function wireControls() {
  Object.entries(controls).forEach(([key, control]) => {
    control.addEventListener('input', () => {
      state[key] = control.type === 'range' ? Number(control.value) : control.value;
      if (key === 'stage') {
        state.kc = stagePresets[state.stage].kc;
        controls.kc.value = state.kc;
      }
      if (key === 'soil') {
        state.awc = soilPresets[state.soil].awc;
        controls.awc.value = state.awc;
      }
      render();
    });
  });
}

function renderPresetButtons() {
  els.presetRow.innerHTML = '';
  scenarioPresets.forEach((preset) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'preset-btn';
    button.textContent = preset.label;
    button.addEventListener('click', () => applyPreset(preset.values, preset.id));
    button.dataset.presetId = preset.id;
    els.presetRow.appendChild(button);
  });
}

function applyPreset(values, activeId) {
  Object.entries(values).forEach(([key, value]) => {
    state[key] = value;
    controls[key].value = value;
  });
  document.querySelectorAll('.preset-btn').forEach((btn) => btn.classList.toggle('active', btn.dataset.presetId === activeId));
  render();
}

function computeModel() {
  const etc = state.eto * state.kc;
  const taw = state.awc * state.rootDepth;
  const triggerRemaining = taw * (1 - state.mad / 100);
  const currentMm = taw * (state.startFill / 100);
  const deficitToFull = Math.max(0, taw - currentMm);
  const rawNetToFull = deficitToFull;
  const grossToFull = state.efficiency > 0 ? rawNetToFull / (state.efficiency / 100) : rawNetToFull;
  const netIrrigationGain = state.irrigationMm * (state.efficiency / 100);
  const daysToTrigger = etc > 0 ? Math.max(0, (currentMm - triggerRemaining) / etc) : Infinity;
  const fillRatio = taw > 0 ? currentMm / taw : 0;
  let status = 'Comfortable';
  let statusClass = 'comfortable';
  if (currentMm <= triggerRemaining) {
    status = 'Past trigger';
    statusClass = 'past';
  } else if (fillRatio <= 0.45) {
    status = 'Refill soon';
    statusClass = 'refill';
  } else if (fillRatio <= 0.65) {
    status = 'Watch';
    statusClass = '';
  }

  const forecast = [];
  let running = currentMm;
  for (let day = 1; day <= 7; day += 1) {
    if (day === Number(state.irrigationDay)) running = Math.min(taw, running + netIrrigationGain);
    running = Math.max(0, running - etc);
    forecast.push({ day, remaining: running, ratio: taw ? running / taw : 0, belowTrigger: running <= triggerRemaining, irrigated: day === Number(state.irrigationDay) && state.irrigationMm > 0 });
  }

  return { etc, taw, triggerRemaining, currentMm, deficitToFull, grossToFull, daysToTrigger, status, statusClass, forecast };
}

function render() {
  updateOutputs();
  const model = computeModel();
  renderMetrics(model);
  renderBucket(model);
  renderForecast(model);
  renderSummary(model);
}

function updateOutputs() {
  els.etoOut.textContent = `${round(state.eto,1)} mm/d`;
  els.kcOut.textContent = round(state.kc,2);
  els.awcOut.textContent = `${round(state.awc)} mm/m`;
  els.rootDepthOut.textContent = `${round(state.rootDepth,2)} m`;
  els.madOut.textContent = `${round(state.mad)}%`;
  els.startFillOut.textContent = `${round(state.startFill)}%`;
  els.efficiencyOut.textContent = `${round(state.efficiency)}%`;
  els.irrigationMmOut.textContent = `${round(state.irrigationMm,1)} mm`;
  els.irrigationDayOut.textContent = `Day ${state.irrigationDay}`;
}

function renderMetrics(model) {
  const cards = [
    ['ETc', `${round(model.etc,1)} mm/day`, 'Current crop water use'],
    ['Total available water', `${round(model.taw)} mm`, 'AWC × root depth'],
    ['Trigger remaining', `${round(model.triggerRemaining)} mm`, `${round(100 - state.mad)}% of full bucket`],
    ['Gross refill to full', `${round(model.grossToFull)} mm`, 'Adjusted for irrigation efficiency']
  ];
  els.metrics.innerHTML = cards.map(([label, value, note]) => `<article class="metric"><span>${label}</span><strong>${value}</strong><span>${note}</span></article>`).join('');
}

function renderBucket(model) {
  els.bucketFill.style.height = `${clamp((model.currentMm / model.taw) * 100, 0, 100)}%`;
  els.bucketTrigger.style.bottom = `${clamp((model.triggerRemaining / model.taw) * 100, 0, 100)}%`;
  els.bucketNowMm.textContent = `${round(model.currentMm)} mm`;
  els.bucketTriggerMm.textContent = `${round(model.triggerRemaining)} mm`;
  els.bucketDeficitMm.textContent = `${round(model.deficitToFull)} mm`;
  els.statusPill.textContent = model.status;
  els.statusPill.className = `status-pill ${model.statusClass}`;
}

function renderForecast(model) {
  els.forecastStrip.innerHTML = model.forecast.map((d) => {
    const label = d.belowTrigger ? 'below trigger' : d.ratio < 0.45 ? 'tight' : 'ok';
    return `<div class="day-chip"><strong>D${d.day}</strong>${d.irrigated ? '<span>💧</span>' : ''}<em>${round(d.remaining)} mm</em><em>${label}</em></div>`;
  }).join('');

  const width = 360;
  const height = 150;
  const pad = 18;
  const maxY = Math.max(model.taw, 1);
  const points = model.forecast.map((d, i) => {
    const x = pad + (i * (width - pad * 2) / 6);
    const y = height - pad - ((d.remaining / maxY) * (height - pad * 2));
    return `${x},${y}`;
  }).join(' ');
  const triggerY = height - pad - ((model.triggerRemaining / maxY) * (height - pad * 2));
  const bars = model.forecast.map((d, i) => {
    const x = pad + (i * (width - pad * 2) / 6);
    return `<circle cx="${x}" cy="${height - pad - ((d.remaining / maxY) * (height - pad * 2))}" r="5" fill="${d.belowTrigger ? '#a23636' : '#6b3d58'}"/>`;
  }).join('');
  els.forecastSvg.innerHTML = `
    <rect x="0" y="0" width="360" height="150" rx="18" fill="transparent"/>
    <line x1="${pad}" x2="${width-pad}" y1="${height-pad}" y2="${height-pad}" stroke="rgba(84,62,72,0.26)" stroke-width="1.5"/>
    <line x1="${pad}" x2="${width-pad}" y1="${triggerY}" y2="${triggerY}" stroke="#cb6d4c" stroke-width="2" stroke-dasharray="6 6"/>
    <polyline points="${points}" fill="none" stroke="#6b3d58" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    ${bars}
    <text x="${width-pad}" y="${Math.max(14, triggerY - 6)}" text-anchor="end" fill="#9a3f23" font-size="11">MAD trigger</text>
  `;
}

function renderSummary(model) {
  const triggerDays = Number.isFinite(model.daysToTrigger) ? `${round(model.daysToTrigger,1)} days` : 'n/a';
  const soilLabel = soilPresets[state.soil].label.toLowerCase();
  const stageLabel = stagePresets[state.stage].label.toLowerCase();
  let tone = `This ${stageLabel} scenario on ${soilLabel} is currently ${model.status.toLowerCase()}. `;
  if (model.status === 'Past trigger') {
    tone += `The bucket is already below the chosen MAD line, so the app would treat this as refill territory now. `;
  } else if (model.daysToTrigger < 2) {
    tone += `At the current ETc, the block reaches the trigger quickly, so this setting deserves near-term attention. `;
  } else {
    tone += `At the current ETc, the bucket is projected to hit the trigger in about ${triggerDays}. `;
  }
  tone += `A full refill from the current deficit would take roughly ${round(model.grossToFull)} mm gross water at ${round(state.efficiency)}% efficiency.`;
  els.summaryText.textContent = tone;
}

window.scenarioPresets = scenarioPresets;
window.applyPreset = applyPreset;

init();
window.setTimeout(() => {
  if (!Object.keys(state).length) {
    applyPreset(scenarioPresets[1].values, scenarioPresets[1].id);
  }
}, 0);
