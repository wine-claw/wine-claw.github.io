/**
 * Winery Oxygen Risk Map — app.js
 * Interactive visual process map of oxygen entry points in winemaking.
 */

(function () {
  'use strict';

  // ─── DATA MODEL ────────────────────────────────────────────────────────────

  const processNodes = [
    // ── HARVEST / DELIVERY ──
    {
      id: 'harvest-transport',
      name: 'Harvest & Transport',
      phase: 'harvest',
      phaseLabel: 'Harvest',
      phaseIcon: '🍇',
      description: 'Whole-cluster or crushed grapes in transit',
      defaultRisk: 2, // 1=low, 3=medium, 5=critical
      exposureRange: '0.5 – 8 mg/L',
      what: 'Grapes are hand-picked into bins or trailers. Depending on handling, grapes may be crushed en route to the winery. Extended transport at warm temperatures accelerates oxidation and microbial activity before any SO₂ can be added.',
      drivers: [
        'Delay between picking and crushing (>2 h in warm conditions)',
        'Crushed grapes exposed to air during transport',
        'Whole clusters held at high temperature',
        'No SO₂ added pre-transport',
        'Oxidation begins immediately on broken grape skins'
      ],
      mitigations: [
        'Cool grapes quickly post-harvest (pre-chill bins or transport at dawn)',
        'Add 30–50 mg/L SO₂ to crushed fruit before transport if delay is expected',
        'Minimise crushing during picking; keep whole clusters intact',
        'Use closed or covered transport vessels',
        'Prioritise rapid delivery to winery'
      ]
    },

    // ── CRUSH / DESTEM ──
    {
      id: 'crush-destem',
      name: 'Crush & Destemming',
      phase: 'crush',
      phaseLabel: 'Crush',
      phaseIcon: '⚙️',
      description: 'Mechanical grape processing',
      defaultRisk: 4,
      exposureRange: '3 – 12 mg/L',
      what: 'Mechanical crushing and destemming shatters grape berries and exposes must to atmospheric oxygen. The machine itself introduces air into the must through turbulence and shear. For white grapes this is particularly damaging as enzymatic browning can begin immediately.',
      drivers: [
        'Open crusher-hopper design drawing in air',
        'High throughput = more turbulence = more O₂ entrainment',
        'Warm fruit temperatures accelerate oxidation kinetics',
        'Enzymatic (PPO) browning in white grapes begins instantly on skin contact',
        'No protective gas used during processing'
      ],
      mitigations: [
        'Use a closed crusher/destemmer with inert gas Blanket option',
        'Minimise fill height in the feed hopper',
        'Keep fruit cool; process early morning or pre-chill fruit',
        'Add SO₂ at crush (40–60 mg/L for whites, 30 mg/L for reds) immediately on receipt',
        'Consider a membrane press for white grapes rather than a crusher'
      ]
    },

    // ── PRESSING ──
    {
      id: 'pressing',
      name: 'Pressing',
      phase: 'fermentation',
      phaseLabel: 'Pressing',
      phaseIcon: '⬇️',
      description: 'Separation of juice/wine from grape solids',
      defaultRisk: 3,
      exposureRange: '2 – 8 mg/L',
      what: 'Pressing extracts juice (whites) or wine (reds) from grape solids. Both hydraulic press cycles and especially gentle pressing can entrain air. Membrane/bladder presses are generally more oxygen-protective than old-style batch presses. Over-presssing also risks extracting harsh phenolic compounds alongside the wine.',
      drivers: [
        'Multiple press cycles allowing air ingress between cycles',
        'Press盘 design: older open-cap designs worse than closed membrane',
        'Long press hold times at high pressure',
        'Warm pressing temperatures increase oxidation rate',
        'Using first-press fraction for premium wine without inert gas'
      ],
      mitigations: [
        'Use inert gas sweep through press atmosphere',
        'Minimise number of press cycles; work in closed circuits',
        'Collect press fractions separately; use lower-pressure fractions for bulk wines',
        'Press at low temperatures or in a cold room',
        'Add SO₂ to press fractions before blending'
      ]
    },

    // ── PUMP-OVERS ──
    {
      id: 'pumpover',
      name: 'Pump-Overs',
      phase: 'fermentation',
      phaseLabel: 'Fermentation',
      phaseIcon: '🔄',
      description: 'Liquid circulation over the ferment cap',
      defaultRisk: 4,
      exposureRange: '2 – 10 mg/L',
      what: 'Pump-overs (remontage) circulate fermenting wine over the grape cap to extract colour, tannins, and flavour compounds. Each pump-over event is a major oxygen introduction — the pump itself aspirates air, and the wine cascades over the cap. Punch-downs are less oxygen-intensive but still significant.',
      drivers: [
        'Pump type: centrifugal pumps entrain more air than positive-displacement',
        'Open-top fermenters vs closed lids',
        'High fermentation vigour = more CO₂ purge = less O₂, but aggressive pump-over can overwhelm this',
        'Long return hose with free-fall discharge',
        'Excessive pump-over frequency (>2× daily in active ferment)'
      ],
      mitigations: [
        'Use a closed pump-over circuit; keep return hose submerged in liquid',
        'Prefer peristaltic or progressive-cavity pumps over centrifugal for oxygen-sensitive ferments',
        'Pump under the liquid surface rather than free-falling onto the cap',
        'Match pump-over intensity to ferment vigour; reduce as ferment slows',
        'Consider punch-downs for delicate ferments where pump-over O₂ is a concern'
      ]
    },

    // ── MALOLACTIC ──
    {
      id: 'mlf',
      name: 'Malolactic Fermentation',
      phase: 'mlf',
      phaseLabel: 'MLF',
      phaseIcon: '🧫',
      description: 'Bacterial conversion of malic to lactic acid',
      defaultRisk: 3,
      exposureRange: '1 – 6 mg/L',
      what: 'Malolactic fermentation (MLF) is conducted by lactic acid bacteria (Oenococcus oeni). MLF is often considered a natural protection against spoilage organisms, but it requires careful management. Open MLF vessels, extended lees contact without protection, and warm temperatures can all drive unwanted oxygen exposure.',
      drivers: [
        'MLF started in open-top vessels or with headspace',
        'Lees stirring (bâtonnage) without inert gas protection',
        'Elevated temperature accelerating both MLF and oxidation',
        'MLF induced via direct bacterial inoculation in presence of O₂',
        'Delayed SO₂ addition waiting for MLF completion'
      ],
      mitigations: [
        'Conduct MLF in sealed vessels; monitor progress with paper chromatography or HPLC',
        'If stirring lees, use inert gas cover and limit frequency',
        'Maintain SO₂ at 0.8–1.0 mg/L molecular SO₂ throughout MLF',
        'Inoculate with a prepared bacterial culture rather than relying on indigenous flora',
        'Keep temperature in the 18–20°C range for controlled MLF'
      ]
    },

    // ── AGING — STAINLESS ──
    {
      id: 'aging-ss',
      name: 'Aging: Stainless Steel',
      phase: 'aging',
      phaseLabel: 'Aging',
      phaseIcon: '🏭',
      description: 'Closed-tank maturation without oak contact',
      defaultRisk: 1,
      exposureRange: '< 0.5 mg/L',
      what: 'Stainless steel tanks are inherently oxygen-protective when sealed. Oxygen ingress is minimal and controlled via macro- or micro-oxygenation if desired. Closed-tank aging is the lowest-risk option for preserving fruit character. Risk increases if tanks develop headspace or if openings (lids, sample ports) are frequently accessed.',
      drivers: [
        'Large headspace in partially-filled tanks',
        'Damaged or loose tank seals',
        'Frequent tank openings for topping, sampling, or inspections',
        'Hot cellars increasing internal tank pressure cycles',
        'Inadequate topping frequency'
      ],
      mitigations: [
        'Maintain tanks full; use inert gas to Blanket headspace',
        'Check and replace tank seals regularly',
        'Top up tanks every 7–14 days minimum',
        'Use a fixed or floating lid system to minimise ullage',
        'Monitor dissolved O₂ (DO) with a portable meter'
      ]
    },

    // ── AGING — OAK ──
    {
      id: 'aging-oak',
      name: 'Aging: Oak Barrels',
      phase: 'aging',
      phaseLabel: 'Aging',
      phaseIcon: '🪵',
      description: 'Barrel maturation with micro-oxygenation',
      defaultRisk: 2,
      exposureRange: '0.3 – 2 mg/L/month',
      what: 'Oak barrels are NOT airtight — they allow slow, deliberate oxygen ingress (micro-oxygenation) which is considered beneficial for red wine maturation. New French oak is more permeable than used barrels. The level of oxygen exposure depends on barrel age, fill level, cellar humidity, and how often the barrel is accessed.',
      drivers: [
        'New barrels (first-fill) are significantly more permeable',
        'Dry or cracked barrel heads from low cellar humidity',
        'Barrel stored in hot, low-humidity conditions',
        'Large ullage (headspace) in partially-filled barrels',
        'Frequent topping with aerated wine'
      ],
      mitigations: [
        'Maintain cellar humidity at 75–85% to keep barrel staves swollen',
        'Top barrels every 7–10 days with wine of same chemistry',
        'Use a targeted topping system to minimise air ingress',
        'Match barrel age/usage to wine style and aging goals',
        'For delicate wines, consider a used-barrel pass before new oak'
      ]
    },

    // ── TRANSFERS ──
    {
      id: 'transfers',
      name: 'Wine Transfers & Racking',
      phase: 'handling',
      phaseLabel: 'Transfers',
      phaseIcon: '🔀',
      description: 'Moving wine between vessels',
      defaultRisk: 3,
      exposureRange: '1 – 10 mg/L',
      what: 'Every wine transfer is an oxygen risk. The danger comes from: pump aspiration (air entrainment), free-fall at the destination, and ullage creation. Transfers happen many times during the lifecycle: post-fermentation, between barrels, to oak, from oak, pre-bottling, and post-fining.',
      drivers: [
        'High pump speeds entraining air into the suction line',
        'Free-fall discharge into receiving vessel',
        'Leaving wine in an open vessel during blending trials',
        'Multiple transfers without inert gas Blanketing',
        'Warm transfer lines cycling between vessels'
      ],
      mitigations: [
        'Use closed transfer circuits; pump to below the liquid surface',
        'Match pump speed to hose diameter; avoid running pumps dry',
        'Pre-flush lines with inert gas before transferring sensitive wines',
        'Use peristaltic or membrane pumps for oxygen-sensitive applications',
        'Minimise number of transfers; plan transfers to serve multiple purposes'
      ]
    },

    // ── FINING / CLARIFICATION ──
    {
      id: 'fining',
      name: 'Fining & Clarification',
      phase: 'processing',
      phaseLabel: 'Processing',
      phaseIcon: '🔬',
      description: 'Additive-driven clarification and adjustment',
      defaultRisk: 2,
      exposureRange: '0.5 – 4 mg/L',
      what: 'Fining involves adding agents (gelatin, bentonite, isinglass, etc.) to clarify and stabilise wine. Fining can require open-top stirring tanks or barrel access. Some fining processes expose wine to air during mixing and addition. The process is usually relatively quick but the vessels used are often the most accessible (open) ones in the winery.',
      drivers: [
        'Open-tank fining with manual addition and stirring',
        'Exposure during cartridge filter changes (splash/handling)',
        'Use of dusty or pre-hydrated bentonite without gas protection',
        'Lees filtering under pump pressure introducing turbulence',
        'Multiple open-handling steps during trial additions'
      ],
      mitigations: [
        'Use closed-circuit dosing systems where available',
        'Pre-hydrate fining agents under inert gas',
        'Filter promptly after fining rather than letting wine sit',
        'Perform fining in sealed tanks rather than open vessels',
        'Hydrate bentonite in warm water first to activate before adding to wine'
      ]
    },

    // ── FILTRATION ──
    {
      id: 'filtration',
      name: 'Filtration',
      phase: 'processing',
      phaseLabel: 'Processing',
      phaseIcon: '➡️',
      description: 'Physical removal of suspended particles',
      defaultRisk: 2,
      exposureRange: '0.5 – 5 mg/L',
      what: 'Filtration passes wine through a filter medium to remove yeast, bacteria, and suspended particles. Plate-and-frame filters can introduce air on loading. Cartridge filter housings, if not pre-flushed, can have air locked inside. Pre-coat filtration (diatomaceous earth) is a more complex open process.',
      drivers: [
        'Loading/unloading filter plates in open air',
        'Cartridge housings not pre-flushed before filtering',
        'High differential pressure across filter causing channeling',
        'Diatomaceous earth (D.E.) pre-coat: very open handling',
        'Filter medium degradation releasing captured air'
      ],
      mitigations: [
        'Pre-flush all filters with wine or inert gas before production use',
        'Use sanitised and gas-blanketed filter housings',
        'Monitor differential pressure to avoid breakthrough',
        'Avoid D.E. filtration if alternative sterile filtration is possible',
        'Keep filter trains closed throughout the process'
      ]
    },

    // ── BLENDING ──
    {
      id: 'blending',
      name: 'Blending Trials',
      phase: 'handling',
      phaseLabel: 'Transfers',
      phaseIcon: '🧪',
      description: 'Combining lots and samples for trials',
      defaultRisk: 3,
      exposureRange: '1 – 8 mg/L',
      what: 'Blending is often done in open-top tanks, mixing bowls, or carboys — all of which expose wine to air. The number of components, duration of mixing, and temperature all affect oxidation. Bench trials (small-scale) are also a risk point: small samples left open for hours can be ruined before being useful.',
      drivers: [
        'Open-top blending vessels with manual stirring',
        'Long blending trials (hours) without gas cover',
        'Warming of wine during blending trial preparation',
        'Multiple sampling without re-stoppering',
        'Pre-blend base wine stored open between trial sessions'
      ],
      mitigations: [
        'Use sealed blending vessels with inert gas Blanket',
        'Run trials under a stream of N₂ or CO₂',
        'Scale trials appropriately; avoid large volumes open for long periods',
        'Keep trial samples sealed and chilled; use small (50 mL) containers',
        'Record blend compositions quickly; don't leave wine in open beakers'
      ]
    },

    // ── SPARGING ──
    {
      id: 'sparging',
      name: 'Nitrogen / CO₂ Sparging',
      phase: 'protection',
      phaseLabel: 'Protection',
      phaseIcon: '💨',
      description: 'Inert gas stripping of dissolved O₂',
      defaultRisk: 1,
      exposureRange: 'Net removal: –0.5 to –5 mg/L',
      what: 'Sparging uses inert gas (N₂ or CO₂) to Strip dissolved oxygen from wine. This is an oxygen REMOVAL technique, not an oxygen introduction — but it must be done correctly. Too-vigorous sparging can strip volatile aroma compounds (volatile thiols in Sauvignon Blanc, for example). Counterintuitively, sparging is protective but is often done in contexts where the wine is already exposed.',
      drivers: [
        'Excessive sparge rate stripping volatile aroma compounds',
        'Using CO₂ sparge on aromatic white wines (it dissolves and changes wine character)',
        'Sparging already-oxidised wine as a fix (futile)',
        'Gas lines not properly cleaned: previous sparge of different wine',
        'Sparging without confirming DO removal effectiveness'
      ],
      mitigations: [
        'Measure DO before and after sparging to confirm effectiveness',
        'Use N₂ rather than CO₂ for aromatic white wines',
        'Match sparge rate to tank geometry; use fine-bubble diffusers',
        'Don\'t sparge near the end of bottling if bottling line has positive O₂ pickup',
        'Log sparge duration and gas volume for consistency'
      ]
    },

    // ── BOTTLING ──
    {
      id: 'bottling',
      name: 'Bottling Line',
      phase: 'bottling',
      phaseLabel: 'Bottling',
      phaseIcon: '🍾',
      description: 'Final packaging and seal',
      defaultRisk: 4,
      exposureRange: '2 – 15 mg/L',
      what: 'Bottling is the highest single-point oxygen risk in the winery lifecycle. Wine passes through a filler (which often uses vacuum or counter-pressure), corker (cork insertion), and capper. Air can be trapped in the bottle headspace, dissolved O₂ can be introduced by the filler, and corks themselves are permeable — adding O₂ slowly over months. This is where most wines get their final DO "dose".',
      drivers: [
        'Traditional open-flow fillers (gravity or vacuum) without counter-pressure',
        'High bottling line speed causing turbulence at filler bowl',
        'Warm wine temperature at bottling (reduces CO₂保护)',
        'Large headspace in bottles after filling',
        'Cork type: agglomerated corks vs micro-agglomerated vs natural — all different permeability',
        'Nitrogen/CO₂ use at filler not optimised or unavailable on older lines'
      ],
      mitigations: [
        'Use inert gas Blanketing on all tanks feeding the filler',
        'Pre-flush bottles with N₂ before filling',
        'Use a gravity/counter-pressure filler for low-O₂ results',
        'Match bottling line speed to wine temperature; slow down for warm wines',
        'Minimise ullage; fill to –30 mm from cork underside',
        'Choose low-permeability closures for wines intended for long aging',
        'Monitor post-bottling DO at 3 and 6 months'
      ]
    },

    // ── STORAGE / FINISHED GOODS ──
    {
      id: 'storage',
      name: 'Finished Goods Storage',
      phase: 'storage',
      phaseLabel: 'Storage',
      phaseIcon: '📦',
      description: 'Bottled wine warehouse management',
      defaultRisk: 1,
      exposureRange: '0.05 – 0.5 mg/L/month',
      what: 'Once bottled and sealed, oxygen ingress slows dramatically. The main risks are: closure permeability (cork breathes ~1 mL O₂/day), temperature cycling causing ullage changes, and warehouse humidity affecting cork integrity. Properly stored bottled wine has a very low and predictable oxygen intake rate through the closure.',
      drivers: [
        'High storage temperature (>20°C) accelerating closure O₂ transmission',
        'Natural cork vs synthetic vs screwcap — all very different rates',
        'Cork failure / TCA contamination (not O₂ but a related spoilage)',
        'Significant temperature cycling causing pressure differential and gas exchange',
        'Bottles stored upright for long periods: cork dries out'
      ],
      mitigations: [
        'Maintain cellar temperature as low as is practical (12–16°C)',
        'Store bottled wine on its side to keep cork湿润',
        'Use screwcap for early-drink wines to eliminate cork-related O₂ ingress',
        'For long-aged premium wines, use high-quality low-permeability cork',
        'Monitor temperature records for the warehouse; avoid hot spots'
      ]
    }
  ];

  // ─── RISK LABEL HELPERS ─────────────────────────────────────────────────────

  const RISK_LEVELS = [
    { max: 1.5, key: 'low',      label: 'LOW' },
    { max: 2.5, key: 'medium',   label: 'MEDIUM' },
    { max: 3.8, key: 'high',     label: 'HIGH' },
    { max: 5.0, key: 'critical', label: 'CRITICAL' }
  ];

  function getRiskLevel(risk) {
    return RISK_LEVELS.find(l => risk <= l.max) || RISK_LEVELS[RISK_LEVELS.length - 1];
  }

  function getExposureRating(exposureRange) {
    // Extract numeric max from range string like "2 – 10 mg/L"
    const match = exposureRange.match(/([\d.]+)\s*–?\s*([\d.]+)?/);
    if (!match) return 2;
    const max = parseFloat(match[2] || match[1]);
    if (max <= 1) return 1;
    if (max <= 4) return 2;
    if (max <= 8) return 3;
    return 4;
  }

  // ─── STATE ─────────────────────────────────────────────────────────────────

  let activeFilter = 'all';
  let selectedNodeId = null;
  // Each node's risk can be overridden by the detail slider
  let riskOverrides = {};

  // ─── RENDER ─────────────────────────────────────────────────────────────────

  function buildPhaseGroups() {
    // Group nodes by phase
    const phases = {};
    processNodes.forEach(node => {
      if (!phases[node.phase]) {
        phases[node.phase] = {
          label: node.phaseLabel,
          icon: node.phaseIcon,
          nodes: []
        };
      }
      phases[node.phase].nodes.push(node);
    });
    return phases;
  }

  function getNodeRisk(nodeId) {
    if (riskOverrides[nodeId] !== undefined) return riskOverrides[nodeId];
    return processNodes.find(n => n.id === nodeId)?.defaultRisk ?? 2;
  }

  function renderFlow() {
    const flow = document.getElementById('processFlow');
    flow.innerHTML = '';

    const phases = buildPhaseGroups();
    const phaseOrder = ['harvest', 'crush', 'fermentation', 'mlf', 'aging', 'protection', 'processing', 'handling', 'transfers', 'bottling', 'storage'];

    phaseOrder.forEach(phaseKey => {
      if (!phases[phaseKey]) return;
      const phase = phases[phaseKey];

      const group = document.createElement('div');
      group.className = 'phase-group';

      const header = document.createElement('div');
      header.className = 'phase-header';
      header.innerHTML = `<span class="phase-icon">${phase.icon}</span> ${phase.label}`;

      const nodesEl = document.createElement('div');
      nodesEl.className = 'phase-nodes';

      phase.nodes.forEach(node => {
        const risk = getNodeRisk(node.id);
        const level = getRiskLevel(risk);

        const card = document.createElement('div');
        card.className = `node-card risk-${level.key}`;
        if (activeFilter !== 'all' && level.key !== activeFilter) {
          card.classList.add('hidden-card');
        }
        card.dataset.id = node.id;

        const expRating = getExposureRating(node.exposureRange);
        const o2Label = expRating >= 3 ? 'High O₂' : expRating >= 2 ? 'Med O₂' : 'Low O₂';

        card.innerHTML = `
          <div class="node-left">
            <div class="node-name">${node.name}</div>
            <div class="node-desc">${node.description}</div>
          </div>
          <div class="node-meta">
            <span class="node-badge ${level.key}">${level.label}</span>
            <span class="node-o2">${o2Label}</span>
          </div>
        `;

        card.addEventListener('click', () => openDetail(node.id));
        nodesEl.appendChild(card);
      });

      group.appendChild(header);
      group.appendChild(nodesEl);
      flow.appendChild(group);
    });

    updatePhaseChips();
  }

  function updatePhaseChips() {
    const container = document.getElementById('phaseChips');
    container.innerHTML = '';
    const phases = buildPhaseGroups();
    const phaseOrder = ['harvest', 'crush', 'fermentation', 'mlf', 'aging', 'protection', 'processing', 'handling', 'transfers', 'bottling', 'storage'];

    phaseOrder.forEach(phaseKey => {
      if (!phases[phaseKey]) return;
      const phase = phases[phaseKey];
      const chip = document.createElement('button');
      chip.className = 'phase-chip';
      chip.dataset.phase = phaseKey;
      chip.innerHTML = `${phase.icon} ${phase.label} <span class="phase-chip-count">${phase.nodes.length}</span>`;
      chip.addEventListener('click', () => {
        document.querySelectorAll('.phase-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        scrollToPhase(phaseKey);
      });
      container.appendChild(chip);
    });
  }

  function scrollToPhase(phaseKey) {
    const groups = document.querySelectorAll('.phase-group');
    groups.forEach(g => {
      const header = g.querySelector('.phase-header');
      if (header && header.textContent.toLowerCase().includes(phaseKey)) {
        g.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  function updateSummary() {
    const risks = processNodes.map(n => getNodeRisk(n.id));
    const avg = risks.reduce((a, b) => a + b, 0) / risks.length;
    const hotZones = risks.filter(r => r >= 3.5).length;
    const overallLevel = getRiskLevel(avg);

    const totalBadge = document.getElementById('totalBadge');
    totalBadge.textContent = overallLevel.label;
    totalBadge.className = `risk-badge ${overallLevel.key}`;

    document.getElementById('hotZonesCount').textContent = hotZones;
    document.getElementById('avgExposure').textContent = avg.toFixed(1);
  }

  // ─── DETAIL PANEL ──────────────────────────────────────────────────────────

  function openDetail(nodeId) {
    selectedNodeId = nodeId;
    const node = processNodes.find(n => n.id === nodeId);
    if (!node) return;

    const risk = getNodeRisk(nodeId);
    const level = getRiskLevel(risk);

    document.getElementById('detailTitle').textContent = node.name;
    const detailBadge = document.getElementById('detailBadge');
    detailBadge.textContent = level.label;
    detailBadge.className = `risk-badge ${level.key}`;

    document.getElementById('detailWhat').textContent = node.what;
    document.getElementById('detailExposure').textContent = node.exposureRange;

    const driversEl = document.getElementById('detailDrivers');
    driversEl.innerHTML = node.drivers.map(d => `<li>${d}</li>`).join('');

    const mitigEl = document.getElementById('detailMitigations');
    mitigEl.innerHTML = node.mitigations.map(m => `<li>${m}</li>`).join('');

    // Slider
    const slider = document.getElementById('detailSlider');
    slider.value = risk;
    updateSliderLabel(risk);

    const panel = document.getElementById('detailPanel');
    panel.classList.remove('hidden');
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function updateSliderLabel(val) {
    const level = getRiskLevel(parseInt(val));
    document.getElementById('sliderValueDisplay').textContent = level.label.charAt(0) + level.label.slice(1).toLowerCase();
  }

  // ─── FILTERING ─────────────────────────────────────────────────────────────

  function applyFilter(filter) {
    activeFilter = filter;
    document.querySelectorAll('.filter-chip').forEach(chip => {
      chip.classList.toggle('active', chip.dataset.filter === filter);
    });

    document.querySelectorAll('.node-card').forEach(card => {
      const nodeId = card.dataset.id;
      const risk = getNodeRisk(nodeId);
      const level = getRiskLevel(risk);
      if (filter === 'all' || level.key === filter) {
        card.classList.remove('hidden-card');
      } else {
        card.classList.add('hidden-card');
      }
    });
  }

  // ─── INIT ───────────────────────────────────────────────────────────────────

  function init() {
    renderFlow();
    updateSummary();

    // Filter bar
    document.querySelectorAll('.filter-chip').forEach(chip => {
      chip.addEventListener('click', () => applyFilter(chip.dataset.filter));
    });

    // Close detail
    document.getElementById('closeDetail').addEventListener('click', () => {
      document.getElementById('detailPanel').classList.add('hidden');
      selectedNodeId = null;
    });

    // Detail slider
    document.getElementById('detailSlider').addEventListener('input', e => {
      const val = parseInt(e.target.value);
      updateSliderLabel(val);
      if (selectedNodeId) {
        riskOverrides[selectedNodeId] = val;
        // Update the card badge
        const level = getRiskLevel(val);
        const badge = document.getElementById('detailBadge');
        badge.textContent = level.label;
        badge.className = `risk-badge ${level.key}`;
        // Re-render flow to reflect new risk
        renderFlow();
        updateSummary();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
