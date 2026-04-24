'use strict';

/* ============================================================
   Cellar Shift Triage Trainer — app.js
   Fully static; no build step, no external dependencies.
   ============================================================ */

// ── Scenario Data ──────────────────────────────────────────
// 6 winery triage scenarios. Each option carries scores
// (0–10) for four dimensions and an explanation shown after
// selection.

const SCENARIOS = [
  {
    id: 1,
    title: 'Cold Soak Temperature Spike',
    setup:
      'Shift start. The 2 tonne Pinot Noir lot slated for a 7-day cold soak is sitting at 18 °C — target is 10–14 °C. The cooling controller shows a failed condensate drain on the delta-T wall unit. No glycol alarm, but ambient cellar temp is 26 °C. Pumpovers are scheduled to begin in 90 minutes.',
    options: [
      {
        label: 'Bypass the faulty unit and crank the cellar HVAC to full; reassess in 45 min',
        quality: 4,
        safety: 6,
        throughput: 5,
        confidence: 7,
        explanation:
          'Using building HVAC is slow and imprecise for targeted must cooling. You buy some time but may not hit the soak window. Quality risk rises the longer the must stays warm.',
      },
      {
        label: 'Pull ice sheets from the blast chiller and place in the head-space above the must',
        quality: 7,
        safety: 5,
        throughput: 4,
        confidence: 8,
        explanation:
          'Improvised but direct. Ice sheets drop the skin temperature faster than waiting on HVAC. Safety is slightly lower (manual handling of cold sheets in a wet cellar) and throughput is reduced while you set it up.',
      },
      {
        label: 'Reroute the must through the plate chiller then back to the tank — bypass controller fault',
        quality: 9,
        safety: 6,
        throughput: 6,
        confidence: 9,
        explanation:
          'Most technically sound. Plate chillers are built for fast, controlled temperature reduction. Bypassing the faulty wall unit sidesteps the drain issue entirely. Small delay in pumpovers but quality is protected.',
      },
      {
        label: 'Hold pumpovers and call the refrigeration tech before doing anything',
        quality: 3,
        safety: 8,
        throughput: 2,
        confidence: 6,
        explanation:
          'Safest option, but waiting with a warm must risks volatile acidity and premature fermentation. By the time the tech arrives the situation may have worsened. Communicating the issue is right; stopping all action is not.',
      },
    ],
  },
  {
    id: 2,
    title: 'Punch-Down Resistance',
    setup:
      'Day 3 of peak fermentation on a Syrah open-top. The cap has formed a tight dome and the pump is struggling — the operator reports the seal feels "gritty." The fermenter is at 30 °C, 5 °Brix remaining. No free SO₂ is present. Two other fermenters are active.',
    options: [
      {
        label: 'Increase pumpover volume to break the cap and push through resistance',
        quality: 5,
        safety: 5,
        throughput: 8,
        confidence: 6,
        explanation:
          'Mechanical force can work but a gritty seal hints at solids accumulation or even a stuck fermentation. More liquid over the top increases oxidation risk and may not address the root cause. Monitor closely.',
      },
      {
        label: 'Stop the pump, manually punch down with the stainless tool every 20 minutes',
        quality: 8,
        safety: 7,
        throughput: 5,
        confidence: 9,
        explanation:
          'Manual punch-down is gentler and gives you tactile feedback on the cap. Gritty feel could indicate seeded ferments or a post-fermentation. Labor-intensive but quality-protective. Good interim call.',
      },
      {
        label: 'Pull a sample, check gravity and temperature, then decide on punch-down vs pumpover',
        quality: 9,
        safety: 8,
        throughput: 5,
        confidence: 10,
        explanation:
          'The correct first move. Data before action. Knowing exact Brix and temperature tells you where you are in the ferment and whether the "gritty" feel is fermentation vigour or something else. Lets you justify your next decision.',
      },
      {
        label: 'Add a commercial enzyme blend marketed for cap management and continue pumpovers',
        quality: 4,
        safety: 5,
        throughput: 7,
        confidence: 3,
        explanation:
          'Enzyme addition during active fermentation is unpredictable and may degrade wine quality if timing is wrong. You are also adding cost and complexity without diagnosing the actual problem. Risky shortcut.',
      },
    ],
  },
  {
    id: 3,
    title: 'Barrel Room Oxygen Spike',
    setup:
      'Routine night shift check. Dissolved O₂ in the 2022 Cabernet barriques reads 1.4 ppm — above the 0.8 ppm target for this stage of elevage. Six barrels of a high-value lot are affected. The last topping was 48 hours ago. No obvious leak points are visible on the bungs.',
    options: [
      {
        label: 'Top all six barrels immediately with the same vintage wine from a single bulk container',
        quality: 6,
        safety: 7,
        throughput: 7,
        confidence: 7,
        explanation:
          "Immediate topping restores volume and reduces headspace oxygen. Using the same lot keeps the wine's integrity. Risk is mixing in dissolved O₂ already in the headspace; work quickly and minimize splashing.",
      },
      {
        label: 'Check barrel bungs and replace any with visible gaps, then top in 24 hours',
        quality: 7,
        safety: 8,
        throughput: 5,
        confidence: 6,
        explanation:
          'Mechanically sound — faulty bungs are a common cause. But waiting 24 hours allows more oxygen exposure before correction. Better to fix bungs and top within the same shift. Combine the two actions.',
      },
      {
        label: 'Bubble a light nitrogen blanket through the headspace of each barrel, then top',
        quality: 9,
        safety: 6,
        throughput: 4,
        confidence: 8,
        explanation:
          'Nitrogen displacement of headspace oxygen before topping is best practice for high-value lots. Slower and requires the right equipment, but meaningfully reduces dissolved O₂. Good technical approach if gear is available.',
      },
      {
        label: 'Document the reading and flag for the morning shift to handle',
        quality: 3,
        safety: 7,
        throughput: 8,
        confidence: 5,
        explanation:
          'Deferring is the worst option here. Every hour of elevated O₂ risks oxidation of anthocyanins and aroma compounds in a premium lot. Documenting is fine but not as a substitute for taking corrective action now.',
      },
    ],
  },
  {
    id: 4,
    title: 'Press Cycle Abort',
    setup:
      'Mid-press on a white Pinot Gris lot. The membrane pressure hits 2.4 bar (red limit: 2.0 bar) and the automated press holds — it doesn\'t abort or vent. The operator is uncertain whether the pressure relief valve has cleared. The juice receiver is at 70% capacity.',
    options: [
      {
        label: 'Emergency stop the press immediately; vent manually and inspect the membrane',
        quality: 8,
        safety: 10,
        throughput: 4,
        confidence: 9,
        explanation:
          'Correct instinct. A stuck automated abort at red-line pressure is a safety hazard and risks over-pressing the must into phenolic extraction. Emergency stop is always the right call when in doubt. Verify the valve clears before restarting.',
      },
      {
        label: 'Watch it for another 30 seconds to see if the automated safety engages',
        quality: 4,
        safety: 3,
        throughput: 6,
        confidence: 4,
        explanation:
          "Gambling with automated safety at red-line pressure is not acceptable. If the safety doesn't engage within a few seconds you have a high-pressure vessel incident risk. Waiting is not a triage decision — it is inaction.",
      },
      {
        label: 'Reduce feed rate to drop pressure, then manually monitor the cycle to completion',
        quality: 6,
        safety: 7,
        throughput: 5,
        confidence: 6,
        explanation:
          "Reducing feed rate is a reasonable second move after confirming it's safe to proceed, but only after confirming the automated abort fault is understood. Useful interim step but not a substitute for the emergency stop if you're unsure.",
      },
      {
        label: 'Log the over-pressure event, finish the press cycle, and service the press tomorrow',
        quality: 2,
        safety: 2,
        throughput: 9,
        confidence: 2,
        explanation:
          "Prioritising throughput over a flagged safety fault is reckless. Over-pressure events can damage membranes, compromise press hygiene, and — worst case — cause mechanical failure. Never defer a known safety anomaly.",
      },
    ],
  },
  {
    id: 5,
    title: 'Incoming Fruit Inspection',
    setup:
      'A picking crew arrives 30 minutes early with a load of Sauvignon Blanc. Bins show moderate botrytis (est. 5–8% coverage) and some visible unripe berries. The fruit is warm — ambient temp was 28 °C on the truck bed. The crush schedule is tight today.',
    options: [
      {
        label: "Accept the fruit and process immediately; treat with a higher SO₂ addition to manage botrytis",
        quality: 5,
        safety: 7,
        throughput: 8,
        confidence: 6,
        explanation:
          "Processing immediately avoids further temperature exposure but higher SO₂ on botrytis fruit can produce binding off-flavours. The unripe component will dilute aromatics. Acceptable under time pressure but not ideal for quality.",
      },
      {
        label: 'Reject the delivery and request the crew return with fruit meeting spec',
        quality: 4,
        safety: 7,
        throughput: 3,
        confidence: 7,
        explanation:
          "Strict adherence to spec is defensible, but rejecting warm fruit mid-harvest has real cost and may not be warranted at 5–8% botrytis. A sorting step — not a full rejection — is a better triage call here.",
      },
      {
        label: 'Accept the load, have the sorting crew do a targeted hand-sort before destemming',
        quality: 8,
        safety: 7,
        throughput: 6,
        confidence: 9,
        explanation:
          'Balanced and practical. Sorting removes the worst botrytis clusters and unripe berries before processing, which protects must quality. Adding a settling cold soak and a modest SO₂ rate covers the residual risk. The right call.',
      },
      {
        label: 'Accept, process straight away, but split the lot and add a commercial pectolytic enzyme',
        quality: 6,
        safety: 7,
        throughput: 7,
        confidence: 5,
        explanation:
          "Enzyme addition can help with settling on botrytis fruit but does not replace sorting. Processing warm fruit without a sort means latent rot character will carry through. Enzyme alone is insufficient without the sorting step.",
      },
    ],
  },
  {
    id: 6,
    title: 'Heat Exchanger Fouling Suspected',
    setup:
      'Second stainless tank of Sauvignon Blanc is being heat-exchanged prior to fermentation. The outflow temperature is running 4 °C higher than setpoint and flow rate has dropped noticeably. The heat exchanger is a 4-year-old plate pack. No strainer alarm has triggered.',
    options: [
      {
        label: "Bump up the driving temperature to compensate and continue — it's only 4 degrees",
        quality: 5,
        safety: 7,
        throughput: 7,
        confidence: 4,
        explanation:
          "Pushing the drive temperature risks over-heating the wine on subsequent plates. If fouling is the cause, performance will continue to degrade. You are masking the symptom while making the underlying problem worse.",
      },
      {
        label: 'Stop the flow, disassemble and inspect the plate pack for scale and bio-film',
        quality: 9,
        safety: 6,
        throughput: 3,
        confidence: 9,
        explanation:
          "Correct diagnostic response. Inspecting before continuing prevents further fouling and tells you whether the exchanger needs chemical cleaning or just a rinse. Time cost is real but you avoid a catastrophic loss of temperature control mid-batch.",
      },
      {
        label: 'Run a hot caustic wash cycle on the heat exchanger, then resume',
        quality: 7,
        safety: 4,
        throughput: 6,
        confidence: 7,
        explanation:
          "Caustic washing solves fouling but you cannot safely run a wash cycle with wine still in the exchanger — risk of contamination and chemical carryover. Must be fully isolated and rinsed. Appropriate as a planned maintenance step, not an in-process fix.",
      },
      {
        label: 'Swap the tank to a backup heat exchanger and flag the primary for maintenance',
        quality: 8,
        safety: 8,
        throughput: 5,
        confidence: 8,
        explanation:
          "Pragmatic triage. You keep processing going while removing the suspect unit from service. Check the backup exchanger is rated for this duty and has been recently verified. This is a strong operational call.",
      },
    ],
  },
];

// ── State ───────────────────────────────────────────────────

const state = {
  currentIndex: -1,
  shuffledOrder: [],
  results: [],        // { scenarioId, chosenOption, scores }
  cycleMode: false,
};

// ── DOM Utilities ───────────────────────────────────────────

function el(id) {
  const el = document.getElementById(id);
  if (!el) console.error('Missing element:', id);
  return el;
}

// ── Show Screen ─────────────────────────────────────────────

function showScreen(name) {
  el('screen-menu').classList.remove('active');
  el('screen-scenario').classList.remove('active');
  el('screen-feedback').classList.remove('active');
  if (name === 'menu')     el('screen-menu').classList.add('active');
  if (name === 'scenario') el('screen-scenario').classList.add('active');
  if (name === 'feedback') el('screen-feedback').classList.add('active');
}

// ── Score Helpers ───────────────────────────────────────────

function dimLabel(dim) {
  return { quality: 'Wine Quality', safety: 'Safety', throughput: 'Throughput', confidence: 'Confidence' }[dim] || dim;
}

function scoreBadge(score) {
  return score >= 7 ? 'badge-good' : score >= 5 ? 'badge-ok' : 'badge-bad';
}

function scoreWord(score) {
  return score >= 7 ? 'Good' : score >= 5 ? 'Fair' : 'Poor';
}

// ── Render: Scenario Options ────────────────────────────────

function renderScenario(scenario) {
  el('scenario-tag').textContent = `Scenario ${state.results.length + 1} of ${SCENARIOS.length}`;
  el('scenario-title').textContent = scenario.title;
  el('scenario-setup').textContent = scenario.setup;

  // Dimension hint pills (no scores shown)
  const dims = ['quality', 'safety', 'throughput', 'confidence'];
  el('scenario-score-pills').innerHTML = dims
    .map((d) => `<span class="score-pill ${d}">${dimLabel(d).split(' ')[0]}</span>`)
    .join('');

  // Option buttons
  const list = el('options-list');
  list.innerHTML = '';
  scenario.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.setAttribute('aria-label', `Option ${i + 1}`);
    btn.innerHTML = `<span class="opt-num">${i + 1}.</span><span>${opt.label}</span>`;
    btn.addEventListener('click', () => onSelect(scenario, i));
    list.appendChild(btn);
  });
}

// ── Render: Feedback ────────────────────────────────────────

function renderFeedback(scenario, optionIndex) {
  const opt = scenario.options[optionIndex];
  el('feedback-chosen-label').textContent = `Option ${optionIndex + 1}: ${opt.label}`;
  el('feedback-explanation').textContent = opt.explanation;

  // Score rows
  const dims = ['quality', 'safety', 'throughput', 'confidence'];
  el('score-breakdown').innerHTML = dims
    .map((d) => {
      const s = opt[d];
      const pct = Math.round((s / 10) * 100);
      return `
        <div class="score-row dim-${d}">
          <span class="dim-label">${dimLabel(d)}</span>
          <div class="dim-bar-wrap">
            <div class="dim-bar bar-${d}" style="width:${pct}%"></div>
          </div>
          <span class="dim-val">${s}/10</span>
          <span class="dim-badge ${scoreBadge(s)}">${scoreWord(s)}</span>
        </div>`;
    })
    .join('');

  // Overall hint
  const avg = dims.reduce((sum, d) => sum + opt[d], 0) / 4;
  const hints = [
    [8,  '"Strong call — well-balanced across all dimensions for this situation."'],
    [6,  '"Reasonable triage. A few dimensions were traded off — weigh whether those were the right ones."'],
    [4,  '"Several risks here. In practice, loop back to your team lead and document the trade-offs before proceeding."'],
    [0,  '"High-risk call — in a real shift this would need immediate escalation and a post-incident review."'],
  ];
  el('overall-hint').textContent = hints.find(([t]) => avg >= t)[1];
}

// ── Render: Menu Summary ────────────────────────────────────

function renderMenuSummary() {
  const container = el('menu-stats');
  const grid = el('summary-grid');
  if (state.results.length === 0) {
    container.style.display = 'none';
    return;
  }
  container.style.display = 'block';
  grid.innerHTML = '';
  state.results.forEach((r) => {
    const scen = SCENARIOS.find((s) => s.id === r.scenarioId);
    const item = document.createElement('div');
    item.className = 'summary-item';
    item.innerHTML = `
      <span class="s-title">${scen ? scen.title : '#' + r.scenarioId}</span>
      <span class="s-scores">${['quality', 'safety', 'throughput', 'confidence']
        .map((d) => `<span class="score-pill ${d}" style="font-size:0.62rem;padding:1px 5px;">${d[0].toUpperCase()}:${r.scores[d]}</span>`)
        .join(' ')}</span>`;
    grid.appendChild(item);
  });
}

// ── Game Logic ──────────────────────────────────────────────

function startGame(randomMode) {
  state.cycleMode = !randomMode;
  state.shuffledOrder = shuffle(SCENARIOS.map((s) => s.id));
  state.currentIndex = -1;
  state.results = [];
  nextScenario();
}

function nextScenario() {
  let scenario;
  if (state.cycleMode) {
    state.currentIndex = (state.currentIndex + 1) % state.shuffledOrder.length;
    scenario = SCENARIOS.find((s) => s.id === state.shuffledOrder[state.currentIndex]);
  } else {
    const remaining = SCENARIOS.filter((s) => !state.results.find((r) => r.scenarioId === s.id));
    if (remaining.length === 0) { showScreen('menu'); renderMenuSummary(); return; }
    scenario = remaining[Math.floor(Math.random() * remaining.length)];
    state.currentIndex = SCENARIOS.findIndex((s) => s.id === scenario.id);
  }
  renderScenario(scenario);
  showScreen('scenario');
}

function onSelect(scenario, optionIndex) {
  const opt = scenario.options[optionIndex];
  state.results.push({
    scenarioId: scenario.id,
    chosenOption: optionIndex,
    scores: { quality: opt.quality, safety: opt.safety, throughput: opt.throughput, confidence: opt.confidence },
  });
  renderFeedback(scenario, optionIndex);
  showScreen('feedback');
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Button Wiring ───────────────────────────────────────────

el('btn-random').addEventListener('click', () => startGame(true));
el('btn-cycle').addEventListener('click',  () => startGame(false));
el('btn-reset').addEventListener('click',  () => { state.results = []; renderMenuSummary(); showScreen('menu'); });
el('btn-next').addEventListener('click',  nextScenario);
el('btn-menu').addEventListener('click',  () => { renderMenuSummary(); showScreen('menu'); });

// ── Boot ────────────────────────────────────────────────────

renderMenuSummary();
showScreen('menu');
