const streamMeta = {
  marc: { label: 'Grape marc', icon: '🍇', color: '#8b3a52', short: 'Marc' },
  lees: { label: 'Lees', icon: '🍷', color: '#b44c6c', short: 'Lees' },
  wastewater: { label: 'Wastewater', icon: '💧', color: '#3d7ea6', short: 'Water' },
  prunings: { label: 'Prunings', icon: '🌿', color: '#4e7f52', short: 'Prunings' }
};

const pathways = [
  {
    id: 'marc-compost',
    title: 'Compost and soil-return loop',
    subtitle: 'Low-complexity circular option for marc and pruning residues',
    streams: ['marc', 'prunings'],
    complexity: 'low',
    capex: 'low',
    scaleFit: ['small', 'medium', 'large'],
    infraFit: ['basic', 'moderate', 'advanced'],
    goals: { sustainability: 5, compliance: 4, brand: 2, revenue: 2 },
    payoff: 'medium',
    rationale: 'Good fit when the priority is practical circularity, reduced disposal pain, and a visible soil-health story without building a mini-bioprocess plant.',
    caution: 'Needs disciplined handling, moisture control, and contamination management. Raw spread is not the same as a well-run compost program.',
    conditions: 'Useful when you can separate solids cleanly, manage seasonal peaks, and actually return the material into a vineyard or partner-farm loop.'
  },
  {
    id: 'marc-extract',
    title: 'Polyphenol, fibre, or ingredient extraction',
    subtitle: 'Higher-value route for consistent marc streams',
    streams: ['marc'],
    complexity: 'high',
    capex: 'high',
    scaleFit: ['medium', 'large'],
    infraFit: ['advanced'],
    goals: { revenue: 5, brand: 4, sustainability: 3, compliance: 1 },
    payoff: 'high',
    rationale: 'Potentially strong value density if the winery or a partner can turn marc into ingredients, extracts, colourants, or functional-food feedstocks.',
    caution: 'Usually not a casual in-house project. Stability, drying, extraction method, food-grade handling, market access, and seasonality all matter.',
    conditions: 'Best when streams are consistent, rapid post-press handling is possible, and a serious off-take or processing partner exists.'
  },
  {
    id: 'marc-biochar',
    title: 'Biochar or thermal energy pathway',
    subtitle: 'Energy and carbon-story angle for dry residues',
    streams: ['marc', 'prunings'],
    complexity: 'medium',
    capex: 'medium',
    scaleFit: ['medium', 'large'],
    infraFit: ['moderate', 'advanced'],
    goals: { sustainability: 5, revenue: 3, compliance: 2, brand: 4 },
    payoff: 'medium',
    rationale: 'Interesting where there is appetite for carbon-story projects, biomass handling, and a more visible innovation narrative than simple disposal.',
    caution: 'Moisture content, drying load, emissions controls, and realistic agronomic benefit all need honest checking.',
    conditions: 'Makes more sense when residues are already being aggregated and the winery is comfortable with a demonstration-scale innovation path.'
  },
  {
    id: 'lees-distillation',
    title: 'Lees distillation or tartrate recovery partner route',
    subtitle: 'Classic route when volume is real and partners exist',
    streams: ['lees'],
    complexity: 'medium',
    capex: 'low',
    scaleFit: ['medium', 'large'],
    infraFit: ['basic', 'moderate', 'advanced'],
    goals: { revenue: 4, compliance: 3, sustainability: 3, brand: 2 },
    payoff: 'medium',
    rationale: 'Established logic for wineries that can consolidate lees and plug into external recovery pathways instead of inventing a novel process alone.',
    caution: 'Economics can hinge on logistics, contamination, and whether there is a realistic local collection or recovery partner.',
    conditions: 'Best if volumes are predictable and you want something more practical than speculative ingredient extraction.'
  },
  {
    id: 'lees-specialty',
    title: 'Mannoprotein, antioxidant, or specialty ingredient route',
    subtitle: 'High-upside but specialist pathway for selected lees streams',
    streams: ['lees'],
    complexity: 'high',
    capex: 'high',
    scaleFit: ['large'],
    infraFit: ['advanced'],
    goals: { revenue: 5, brand: 3, sustainability: 2, compliance: 1 },
    payoff: 'high',
    rationale: 'Interesting when the winery wants to explore a premium-value narrative around bioactive or enological sub-products rather than disposal avoidance alone.',
    caution: 'Very easy to over-romanticise. Technical feasibility, regulatory position, purification, and sales channels are all non-trivial.',
    conditions: 'Only attractive when a specialist partner, pilot pathway, or serious R&D angle already exists.'
  },
  {
    id: 'wastewater-reuse',
    title: 'Treatment plus irrigation or non-potable reuse',
    subtitle: 'Practical water story with direct on-site value',
    streams: ['wastewater'],
    complexity: 'medium',
    capex: 'medium',
    scaleFit: ['small', 'medium', 'large'],
    infraFit: ['moderate', 'advanced'],
    goals: { sustainability: 5, compliance: 5, revenue: 2, brand: 3 },
    payoff: 'high',
    rationale: 'Often one of the clearest winery-side circular moves, especially where water cost, disposal constraints, or sustainability reporting matter.',
    caution: 'Reuse depends on real treatment quality, pH, solids, salts, BOD/COD, and the actual intended end use. This is not a casual shortcut.',
    conditions: 'Strong fit when the winery can separate solids early, smooth vintage peaks, and maintain a disciplined treatment-and-monitoring setup.'
  },
  {
    id: 'wastewater-biogas',
    title: 'Anaerobic digestion and biogas angle',
    subtitle: 'Energy recovery concept for bigger organic loads',
    streams: ['wastewater'],
    complexity: 'high',
    capex: 'high',
    scaleFit: ['large'],
    infraFit: ['advanced'],
    goals: { sustainability: 5, revenue: 3, compliance: 3, brand: 4 },
    payoff: 'medium',
    rationale: 'Compelling on paper for larger sites with enough organic load and an innovation appetite, especially when energy resilience has strategic value.',
    caution: 'Seasonality can hurt economics. This is usually a serious engineering project, not a cute side experiment.',
    conditions: 'Needs stable feed characteristics, real operator capacity, and a reason the scale justifies the complexity.'
  },
  {
    id: 'wetland-buffer',
    title: 'Constructed wetland or habitat-buffer story',
    subtitle: 'Landscape-facing treatment and demonstration route',
    streams: ['wastewater'],
    complexity: 'medium',
    capex: 'medium',
    scaleFit: ['small', 'medium'],
    infraFit: ['moderate'],
    goals: { brand: 5, sustainability: 4, compliance: 4, revenue: 1 },
    payoff: 'low',
    rationale: 'Useful where the winery wants a visible land-care narrative and treated-water story rather than chasing maximum direct cash value.',
    caution: 'Needs site suitability, real treatment design, and honest communication so it is not mistaken for a decorative pond solving everything.',
    conditions: 'Works best when there is enough land, the site supports it, and the winery values education and demonstration as part of the payoff.'
  },
  {
    id: 'pruning-mulch',
    title: 'Mulch, compost blend, or soil-carbon support route',
    subtitle: 'Simple vineyard-linked circular option for woody residues',
    streams: ['prunings'],
    complexity: 'low',
    capex: 'low',
    scaleFit: ['small', 'medium', 'large'],
    infraFit: ['basic', 'moderate', 'advanced'],
    goals: { sustainability: 5, compliance: 3, brand: 3, revenue: 1 },
    payoff: 'medium',
    rationale: 'A grounded option when the winery-vineyard system wants to reduce burn-or-dump habits and tell a cleaner circularity story.',
    caution: 'Disease carryover, timing, and particle-size handling still matter. It should be run as a system, not just a pile.',
    conditions: 'Best when residues stay clean and there is a clear pathway back into vineyard floor or compost operations.'
  },
  {
    id: 'story-packaging',
    title: 'By-product story line for tasting room, packaging, or education',
    subtitle: 'Low-CAPEX brand layer on top of practical waste handling',
    streams: ['marc', 'lees', 'wastewater', 'prunings'],
    complexity: 'low',
    capex: 'low',
    scaleFit: ['small', 'medium', 'large'],
    infraFit: ['basic', 'moderate', 'advanced'],
    goals: { brand: 5, sustainability: 4, compliance: 1, revenue: 2 },
    payoff: 'medium',
    rationale: 'Not a disposal pathway by itself, but useful when the winery already does something real and wants to turn it into a clearer visitor or brand narrative.',
    caution: 'Only credible if it sits on top of actual handling improvements. Story cannot substitute for process.',
    conditions: 'Works best when paired with one genuine circular practice that visitors, buyers, or staff can understand quickly.'
  }
];

const presets = {
  'small-estate': {
    selectedStreams: ['marc', 'prunings'],
    prefs: { scale: 'small', capex: 'low', complexity: 'low', goal: 'brand', infrastructure: 'basic' }
  },
  'mid-range': {
    selectedStreams: ['marc', 'lees', 'wastewater'],
    prefs: { scale: 'medium', capex: 'medium', complexity: 'medium', goal: 'sustainability', infrastructure: 'moderate' }
  },
  'large-winery': {
    selectedStreams: ['marc', 'lees', 'wastewater'],
    prefs: { scale: 'large', capex: 'high', complexity: 'high', goal: 'revenue', infrastructure: 'advanced' }
  },
  'sustainability-lead': {
    selectedStreams: ['marc', 'wastewater', 'prunings'],
    prefs: { scale: 'medium', capex: 'medium', complexity: 'medium', goal: 'sustainability', infrastructure: 'moderate' }
  }
};

const state = {
  selectedStreams: ['marc', 'wastewater'],
  prefs: { scale: 'medium', capex: 'medium', complexity: 'medium', goal: 'sustainability', infrastructure: 'moderate' }
};

const els = {
  streamCards: [...document.querySelectorAll('.stream-card')],
  prefGroups: [...document.querySelectorAll('.pref-options')],
  presetButtons: [...document.querySelectorAll('.preset-btn')],
  resultsGrid: document.getElementById('resultsGrid'),
  flowSvg: document.getElementById('flowSvg')
};

function scorePathway(pathway) {
  const selected = state.selectedStreams;
  const matchedStreams = pathway.streams.filter((stream) => selected.includes(stream));
  let score = matchedStreams.length * 28;

  if (!matchedStreams.length) score -= 24;
  if (selected.length && matchedStreams.length === pathway.streams.length) score += 10;
  if (pathway.scaleFit.includes(state.prefs.scale)) score += 8;
  if (pathway.infraFit.includes(state.prefs.infrastructure)) score += 8;
  score += pathway.goals[state.prefs.goal] * 5;

  const capexWeight = { low: 1, medium: 2, high: 3 };
  const complexityWeight = { low: 1, medium: 2, high: 3 };
  score -= Math.abs(capexWeight[pathway.capex] - capexWeight[state.prefs.capex]) * 5;
  score -= Math.abs(complexityWeight[pathway.complexity] - complexityWeight[state.prefs.complexity]) * 5;

  if (state.prefs.goal === 'compliance' && pathway.streams.includes('wastewater')) score += 7;
  if (state.prefs.goal === 'brand' && (pathway.id === 'story-packaging' || pathway.id === 'wetland-buffer')) score += 6;
  if (state.prefs.goal === 'revenue' && (pathway.payoff === 'high')) score += 5;

  return { ...pathway, score, matchedStreams };
}

function rankPathways() {
  return pathways
    .map(scorePathway)
    .filter((item) => item.matchedStreams.length || !state.selectedStreams.length)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

function renderResults() {
  const ranked = rankPathways();
  if (!ranked.length) {
    els.resultsGrid.innerHTML = `
      <div class="empty-state">
        <div style="font-size:30px;">🌀</div>
        <p>Select one or more winery streams to surface plausible circular-economy pathways.</p>
      </div>`;
    return;
  }

  els.resultsGrid.innerHTML = ranked.map((pathway, index) => {
    const priority = index === 0 ? 'high' : index < 3 ? 'medium' : 'low';
    return `
      <article class="pathway-card priority-${priority}">
        <div class="pathway-header">
          <div class="pathway-rank rank-${index + 1}">${index + 1}</div>
          <div class="pathway-title-group">
            <h2 class="pathway-title">${pathway.title}</h2>
            <p class="pathway-subtitle">${pathway.subtitle}</p>
            <div class="pathway-streams">
              ${pathway.streams.map((stream) => `<span class="stream-chip">${streamMeta[stream].short}</span>`).join('')}
            </div>
          </div>
        </div>
        <div class="pathway-chips">
          <span class="chip chip-complexity-${pathway.complexity}">Complexity ${labelCase(pathway.complexity)}</span>
          <span class="chip chip-payoff-${pathway.payoff}">Payoff ${labelCase(pathway.payoff)}</span>
          ${pathway.matchedStreams.map((stream) => `<span class="chip chip-stream-${stream}">${streamMeta[stream].icon} ${streamMeta[stream].short}</span>`).join('')}
        </div>
        <div class="pathway-body">
          <p class="pathway-rationale">${pathway.rationale}</p>
          <p class="pathway-caution"><strong>Watch-out:</strong> ${pathway.caution}</p>
          <p class="pathway-conditions"><strong>What would need to be true:</strong> ${pathway.conditions}</p>
        </div>
      </article>`;
  }).join('');
}

function labelCase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function renderFlow() {
  const selected = state.selectedStreams;
  if (!selected.length) {
    els.flowSvg.innerHTML = '<text x="180" y="110" text-anchor="middle" fill="#9b8a7a" font-family="Inter, sans-serif" font-size="11">Select streams to visualise your flow</text>';
    return;
  }

  const topThree = rankPathways().slice(0, 3);
  const sourceNodes = selected.map((stream, index) => ({
    x: 46,
    y: 42 + index * 42,
    stream,
    label: streamMeta[stream].label,
    color: streamMeta[stream].color
  }));
  const targetNodes = topThree.map((pathway, index) => ({
    x: 242,
    y: 46 + index * 52,
    label: pathway.title,
    color: pathway.matchedStreams[0] ? streamMeta[pathway.matchedStreams[0]].color : '#7a5c3a',
    width: Math.max(72, Math.min(108, pathway.score + 18))
  }));

  const flows = [];
  topThree.forEach((pathway, targetIndex) => {
    sourceNodes.forEach((node, sourceIndex) => {
      if (pathway.streams.includes(node.stream)) {
        const startY = node.y + 11;
        const endY = targetNodes[targetIndex].y + 12;
        const midX = 144;
        const opacity = 0.18 + (pathway.score / 140);
        flows.push(`<path d="M ${node.x + 56} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${targetNodes[targetIndex].x - 14} ${endY}" fill="none" stroke="${node.color}" stroke-width="${8 - sourceIndex}" stroke-linecap="round" opacity="${Math.min(opacity, 0.62)}" />`);
      }
    });
  });

  els.flowSvg.innerHTML = `
    <defs>
      <linearGradient id="coreGlow" x1="0" x2="1">
        <stop offset="0%" stop-color="#f7e7a5" stop-opacity="0.9" />
        <stop offset="100%" stop-color="#c4667a" stop-opacity="0.75" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="360" height="220" fill="url(#coreGlow)" opacity="0.08"></rect>
    <circle cx="180" cy="110" r="32" fill="#fff8ef" stroke="#e4d9cc"></circle>
    <text x="180" y="104" text-anchor="middle" font-size="11" font-family="Inter, sans-serif" fill="#5c2d3e" font-weight="700">Value</text>
    <text x="180" y="118" text-anchor="middle" font-size="11" font-family="Inter, sans-serif" fill="#5c2d3e" font-weight="700">studio</text>
    ${flows.join('')}
    ${sourceNodes.map((node) => `
      <g>
        <rect x="${node.x}" y="${node.y}" width="58" height="24" rx="12" fill="#fff" stroke="${node.color}" />
        <text x="${node.x + 29}" y="${node.y + 15}" text-anchor="middle" font-size="10" font-family="Inter, sans-serif" fill="#2a1f1a">${streamMeta[node.stream].short}</text>
      </g>`).join('')}
    ${targetNodes.map((node, index) => `
      <g>
        <rect x="${node.x}" y="${node.y}" width="${node.width}" height="28" rx="14" fill="#fff" stroke="${node.color}" />
        <text x="${node.x + 8}" y="${node.y + 12}" font-size="9" font-family="Inter, sans-serif" fill="#2a1f1a">#${index + 1}</text>
        <text x="${node.x + 22}" y="${node.y + 17}" font-size="9.2" font-family="Inter, sans-serif" fill="#2a1f1a">${truncate(node.label, 15)}</text>
      </g>`).join('')}
  `;
}

function truncate(text, max) {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

function syncUi() {
  els.streamCards.forEach((button) => {
    button.classList.toggle('selected', state.selectedStreams.includes(button.dataset.stream));
  });

  els.prefGroups.forEach((group) => {
    const key = group.dataset.pref;
    [...group.querySelectorAll('.pref-btn')].forEach((button) => {
      button.classList.toggle('active', button.dataset.val === state.prefs[key]);
    });
  });

  renderFlow();
  renderResults();
}

els.streamCards.forEach((button) => {
  button.addEventListener('click', () => {
    const { stream } = button.dataset;
    if (state.selectedStreams.includes(stream)) {
      state.selectedStreams = state.selectedStreams.filter((item) => item !== stream);
    } else {
      state.selectedStreams = [...state.selectedStreams, stream];
    }
    els.presetButtons.forEach((preset) => preset.classList.remove('active'));
    syncUi();
  });
});

els.prefGroups.forEach((group) => {
  const key = group.dataset.pref;
  [...group.querySelectorAll('.pref-btn')].forEach((button) => {
    button.addEventListener('click', () => {
      state.prefs[key] = button.dataset.val;
      els.presetButtons.forEach((preset) => preset.classList.remove('active'));
      syncUi();
    });
  });
});

els.presetButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const preset = presets[button.dataset.preset];
    state.selectedStreams = [...preset.selectedStreams];
    state.prefs = { ...preset.prefs };
    els.presetButtons.forEach((item) => item.classList.toggle('active', item === button));
    syncUi();
  });
});

syncUi();
