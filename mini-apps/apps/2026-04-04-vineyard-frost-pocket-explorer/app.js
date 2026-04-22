/* =========================================================
   Vineyard Frost Pocket Explorer — app.js
   ========================================================= */

'use strict';

// ── Data definitions ────────────────────────────────────────────────────────

const ZONE_COUNT = 5; // zones across the terrain cross-section

// Each topography preset defines:
//   label, description
//   surfacePoints: [y0..y4]  relative heights 0 (low) – 1 (high)
//   elevation: overall elevation hint
//   drainage: 'good' | 'moderate' | 'poor' | 'blocked'
//   shape: 'ridge' | 'slope' | 'bowl' | 'valley' | 'blocked'
const TOPOGRAPHIES = [
  {
    id: 'ridge',
    label: 'Ridge Shoulder',
    description: 'Convex high ground; cold air slides off to either side',
    surfacePoints: [0.78, 0.92, 0.88, 0.92, 0.78],
    elevation: 0.9,
    drainage: 'good',
    shape: 'ridge',
  },
  {
    id: 'mid-slope',
    label: 'Open Mid-Slope',
    description: 'Gently undulating slope; moderate cold-air pooling',
    surfacePoints: [0.55, 0.68, 0.60, 0.72, 0.58],
    elevation: 0.55,
    drainage: 'moderate',
    shape: 'slope',
  },
  {
    id: 'shallow-bowl',
    label: 'Shallow Bowl',
    description: 'Gently concave hollow; cold air collects but can drain slowly',
    surfacePoints: [0.65, 0.78, 0.42, 0.78, 0.65],
    elevation: 0.55,
    drainage: 'moderate',
    shape: 'bowl',
  },
  {
    id: 'valley-floor',
    label: 'Valley Floor',
    description: 'Flat low ground; cold air collects deeply — highest risk',
    surfacePoints: [0.55, 0.58, 0.32, 0.58, 0.55],
    elevation: 0.25,
    drainage: 'poor',
    shape: 'valley',
  },
  {
    id: 'blocked-outlet',
    label: 'Blocked Drainage Outlet',
    description: 'Bowl with a raised lip — cold air is trapped and cannot drain',
    surfacePoints: [0.42, 0.68, 0.22, 0.68, 0.42],
    elevation: 0.40,
    drainage: 'blocked',
    shape: 'bowl',
  },
];

const EVENT_TYPES = [
  {
    id: 'radiation',
    label: 'Radiation Frost',
    description: 'Calm, clear night; sky radiates heat away. Cold air sinks & pools.',
    mechanism: 'On clear, calm nights the vineyard surface loses heat rapidly by radiation to the sky. The ground and canopy cool. As air next to the surface cools it becomes denser and drains downhill, pooling in low points and concave landforms. The strength of the temperature inversion (cold at ground, warmer above) determines how deep the pooling can be.',
    activeHelpful: true,
  },
  {
    id: 'mixed',
    label: 'Mixed Frost / Freeze',
    description: 'Moderate wind, cloud cover variable; some pooling, some advection.',
    mechanism: 'A mixed event combines radiation cooling with some horizontal air movement. Cold pooling is less dramatic than a pure radiation night, but low areas still experience lower minimum temperatures. Wind can disrupt strong inversions but also bring in cold air from surrounding areas.',
    activeHelpful: true,
  },
  {
    id: 'advective',
    label: 'Advective Freeze',
    description: 'Strong cold wind; horizontal movement dominates. Cold pooling is minimal.',
    mechanism: 'An advective freeze is driven by a large-scale cold air mass moving horizontally across the landscape. There is little temperature inversion and cold air does not drain into low points the way it does during radiation frosts. The entire vineyard — regardless of topography — experiences similar cold exposure. Active protection methods are much less effective.',
    activeHelpful: false,
  },
];

const BUD_STAGES = [
  {
    id: 'dormant',
    label: 'Dormant',
    sensitivity: 0.0,
    note: 'No green tissue — frost damage essentially impossible.',
    icon: '❄️',
  },
  {
    id: 'budswell',
    label: 'Bud Swell',
    sensitivity: 0.2,
    note: 'Small window of vulnerability; hard to damage.',
    icon: '🌱',
  },
  {
    id: 'budburst',
    label: 'Bud Burst',
    sensitivity: 0.45,
    note: 'Green tissue exposed; moderate frost risk.',
    icon: '🌿',
  },
  {
    id: 'shoot10cm',
    label: 'Shoots ~10 cm',
    sensitivity: 0.70,
    note: 'Highly vulnerable; critical window for frost damage.',
    icon: '🌾',
  },
  {
    id: 'flowering',
    label: 'Flowering',
    sensitivity: 0.95,
    note: 'Maximum sensitivity — flowers are extremely frost-tender.',
    icon: '🌸',
  },
];

const GROUND_COVERS = [
  {
    id: 'bare',
    label: 'Bare / Cultivated',
    description: 'Exposed soil — efficient radiator, more extreme min temps.',
    emissivity: 0.95,
  },
  {
    id: 'mown',
    label: 'Mown Cover Crop',
    description: 'Short resident cover; moderate emissivity.',
    emissivity: 0.82,
  },
  {
    id: 'tall',
    label: 'Tall Cover / Sward',
    description: 'Dense vegetation; traps insulating air, raises min temp slightly.',
    emissivity: 0.70,
  },
];

const INVERSION_STRENGTHS = [
  { id: 'strong', label: 'Strong', hint: '≥5°C inversion', multiplier: 1.4, desc: 'Cold, still air sits close to ground; dramatic pooling.' },
  { id: 'moderate', label: 'Moderate', hint: '~3°C inversion', multiplier: 1.0, desc: 'Typical radiation frost night.' },
  { id: 'weak', label: 'Weak', hint: '<2°C inversion', multiplier: 0.6, desc: 'Incomplete pooling; moderate gradients.' },
];

const PROTECTION_TYPES = [
  {
    id: 'none',
    label: 'None',
    icon: '✗',
    effectiveness: 0,
    note: 'No active protection available in this scenario.',
  },
  {
    id: 'wind-machine',
    label: 'Wind Machine',
    icon: '🌀',
    effectiveness: 0.65,
    note: 'Mixes warmer inversion air down to vine level. Most effective with strong inversion.',
  },
  {
    id: 'sprinkler',
    label: 'Sprinkler',
    icon: '💧',
    effectiveness: 0.78,
    note: 'Heat of fusion protects tissue. Needs running throughout frost event.',
  },
  {
    id: 'both',
    label: 'Wind Machine + Sprinkler',
    icon: '🌀💧',
    effectiveness: 0.90,
    note: 'Combined approach; highest protection level.',
  },
];

// Scenarios
const PRESETS = [
  {
    id: 'classic-valley-radiation',
    label: 'Valley Radiation Frost',
    topo: 'valley-floor',
    event: 'radiation',
    bud: 'shoot10cm',
    cover: 'mown',
    inversion: 'strong',
    protection: 'none',
  },
  {
    id: 'ridge-shallow-frost',
    label: 'Ridge Radiation Frost',
    topo: 'ridge',
    event: 'radiation',
    bud: 'budburst',
    cover: 'mown',
    inversion: 'moderate',
    protection: 'none',
  },
  {
    id: 'blocked-bowl-shoot',
    label: 'Blocked Outlet + Shoot Growth',
    topo: 'blocked-outlet',
    event: 'radiation',
    bud: 'shoot10cm',
    cover: 'bare',
    inversion: 'strong',
    protection: 'wind-machine',
  },
  {
    id: 'mid-slope-advective',
    label: 'Mid-Slope Advective Freeze',
    topo: 'mid-slope',
    event: 'advective',
    bud: 'flowering',
    cover: 'tall',
    inversion: 'weak',
    protection: 'none',
  },
  {
    id: 'shallow-bowl-mixed',
    label: 'Shallow Bowl Mixed Event',
    topo: 'shallow-bowl',
    event: 'mixed',
    bud: 'shoot10cm',
    cover: 'mown',
    inversion: 'moderate',
    protection: 'sprinkler',
  },
  {
    id: 'early-season-dormant',
    label: 'Early Season — Dormant',
    topo: 'valley-floor',
    event: 'radiation',
    bud: 'dormant',
    cover: 'bare',
    inversion: 'strong',
    protection: 'none',
  },
];

// ── Risk engine ─────────────────────────────────────────────────────────────

function computeRisks(state) {
  const topo    = TOPOGRAPHIES.find(t => t.id === state.topo);
  const event   = EVENT_TYPES.find(e => e.id === state.event);
  const bud     = BUD_STAGES.find(b => b.id === state.bud);
  const cover   = GROUND_COVERS.find(c => c.id === state.cover);
  const invStr  = INVERSION_STRENGTHS.find(i => i.id === state.inversion);
  const prot    = PROTECTION_TYPES.find(p => p.id === state.protection);

  // Base risk per zone (0–1) driven by topography
  const baseRisks = topo.surfacePoints.map((elev, i) => {
    // Invert: lower elevation = higher base risk
    const elevRisk = 1 - elev;
    // Shape modifiers
    let shapeMod = 1.0;
    if (topo.shape === 'bowl') {
      // Bowl concentrates cold in the centre zones (1,2,3)
      shapeMod = [0.7, 1.2, 1.3, 1.2, 0.7][i];
    } else if (topo.shape === 'ridge') {
      // Ridge keeps edges safer than centre
      shapeMod = [1.1, 0.85, 0.8, 0.85, 1.1][i];
    } else if (topo.shape === 'valley') {
      // Valley: uniformly high risk, slightly lower at edges
      shapeMod = [0.9, 1.15, 1.25, 1.15, 0.9][i];
    } else if (topo.shape === 'blocked') {
      // Blocked: deep centre trap
      shapeMod = [0.8, 1.1, 1.4, 1.1, 0.8][i];
    } else {
      // Slope: gradient
      shapeMod = [0.8, 0.9, 1.0, 1.1, 1.2][i];
    }
    return elevRisk * shapeMod;
  });

  // Event modifier
  const eventMod = event.id === 'advective'
    ? 1.0  // uniform across all zones for advective
    : event.id === 'mixed'
    ? 0.85
    : 1.0; // radiation: full topographic effect

  // Inversion multiplier (radiation/mixed only)
  const invMod = (event.id === 'radiation' || event.id === 'mixed')
    ? invStr.multiplier
    : 1.0;

  // Ground cover modifier
  const coverMod = cover.emissivity; // higher = more radiative cooling = higher risk

  // Bud sensitivity
  const budSens = bud.sensitivity;

  // Combine: risk = base * eventMod * invMod * coverMod * budSens * (1/0.5)
  // Scale so that moderate conditions give moderate risk
  const scaleFactor = 1.4;
  const rawRisks = baseRisks.map(br =>
    br * eventMod * invMod * coverMod * budSens * scaleFactor
  );

  // Normalise to 0-1 range (cap at 1)
  const maxRaw = Math.max(...rawRisks, 0.01);
  const risks = rawRisks.map(r => Math.min(r / maxRaw, 1.0));

  // Highest-risk zone index
  const highestRiskIdx = risks.indexOf(Math.max(...risks));

  // Protection reduces risk on protected zones
  const protEff = prot.effectiveness;
  const adjRisks = risks.map((r, i) => {
    if (protEff === 0) return r;
    // Wind machines help most where pooling is greatest
    const protBoost = (prot.id === 'wind-machine' || prot.id === 'both')
      ? (topo.surfacePoints[i] < 0.6 ? protEff * 1.2 : protEff * 0.5)
      : protEff;
    return Math.max(0, r - protBoost * 0.7);
  });

  return { risks: adjRisks, highestRiskIdx, topo, event, bud, cover, invStr, prot };
}

function getRiskLabel(risk) {
  if (risk < 0.25) return { text: 'Low', class: 'risk-low' };
  if (risk < 0.50) return { text: 'Moderate', class: 'risk-moderate' };
  if (risk < 0.75) return { text: 'High', class: 'risk-high' };
  return { text: 'Extreme', class: 'risk-extreme' };
}

function getRiskColour(risk) {
  if (risk < 0.25) return '#43a047';
  if (risk < 0.50) return '#fb8c00';
  if (risk < 0.75) return '#ef5350';
  return '#9c27b0';
}

// ── SVG terrain renderer ────────────────────────────────────────────────────

const SVG_W = 600;
const SVG_H = 220;
const TERRAIN_TOP = 40;
const TERRAIN_BOT = 200;

function terrainYforPoint(relH, zoneIdx) {
  const h = 1 - relH; // invert: high relH → top of terrain (low screen y)
  return TERRAIN_TOP + h * (TERRAIN_BOT - TERRAIN_TOP);
}

function buildTerrainSVG(topo) {
  const pts = topo.surfacePoints;
  const zoneWidth = SVG_W / ZONE_COUNT;

  // Build smooth terrain path using bezier curves
  const screenYs = pts.map((p, i) => terrainYforPoint(p, i));

  // Create a closed polygon below for the terrain fill
  let fillPath = `M 0 ${SVG_H}`;
  for (let i = 0; i < ZONE_COUNT; i++) {
    const x = i * zoneWidth;
    const xm = i === 0 ? x : x - zoneWidth * 0.5;
    const y = screenYs[i];
    if (i === 0) {
      fillPath += ` L ${x} ${y}`;
    } else {
      const prevY = screenYs[i - 1];
      const cx = (prevY + y) / 2;
      fillPath += ` Q ${x - zoneWidth * 0.5} ${prevY} ${x} ${y}`;
    }
  }
  fillPath += ` L ${SVG_W} ${SVG_H} Z`;

  // Surface line path (top edge only)
  let linePath = `M 0 ${screenYs[0]}`;
  for (let i = 1; i < ZONE_COUNT; i++) {
    const x = i * zoneWidth;
    const prevY = screenYs[i - 1];
    const y = screenYs[i];
    linePath += ` Q ${x - zoneWidth * 0.5} ${prevY} ${x} ${y}`;
  }

  return { fillPath, linePath, screenYs, zoneWidth };
}

function buildZoneOverlays(screenYs, risks, zoneWidth) {
  const overlays = [];
  for (let i = 0; i < ZONE_COUNT; i++) {
    const x = i * zoneWidth;
    const y = screenYs[i];
    const nextY = screenYs[i + 1] !== undefined ? screenYs[i + 1] : screenYs[i];
    const cx = x + zoneWidth * 0.5;
    // Small trapezoid from surface down to bottom of chart
    const topW = zoneWidth * 0.85;
    const nextTopW = i < ZONE_COUNT - 1 ? zoneWidth * 0.85 : topW;
    overlays.push({
      x, y, cx,
      topW, nextTopW,
      zoneWidth,
      risk: risks[i],
      idx: i,
    });
  }
  return overlays;
}

function buildColdAirPools(topo, event, invStr, screenYs, zoneWidth) {
  if (event.id === 'advective') return []; // no pooling in advective

  const pools = [];
  const invMult = invStr.multiplier;
  const pts = topo.surfacePoints;

  for (let i = 0; i < ZONE_COUNT; i++) {
    const elev = pts[i]; // 0=low, 1=high
    const poolDepth = (1 - elev) * invMult * 0.8; // deeper pool in lower areas

    if (poolDepth < 0.05) continue;

    const x = i * zoneWidth;
    const y = screenYs[i];
    const cx = x + zoneWidth * 0.5;
    const nextY = screenYs[i + 1] !== undefined ? screenYs[i + 1] : y;
    const w = zoneWidth * 0.8;

    pools.push({ x, y, cx, w, depth: poolDepth, idx: i, nextY });
  }
  return pools;
}

function buildDrainArrows(topo, event, screenYs, zoneWidth) {
  if (event.id === 'advective') return []; // no drainage arrows in advective

  const arrows = [];
  const pts = topo.surfacePoints;

  // Show arrows pointing from higher to lower zones
  for (let i = 0; i < ZONE_COUNT - 1; i++) {
    const elev = pts[i];
    const nextElev = pts[i + 1];
    const diff = elev - nextElev; // positive = drain this way

    if (diff > 0.05) {
      const x = (i + 0.5) * zoneWidth;
      const y = screenYs[i] - 12;
      arrows.push({ x, y, direction: 'down-right', idx: i });
    } else if (diff < -0.05) {
      const x = (i + 1.5) * zoneWidth;
      const y = screenYs[i + 1] - 12;
      arrows.push({ x, y, direction: 'down-left', idx: i + 1 });
    }
  }
  return arrows;
}

// ── Interpretation & mechanism text ─────────────────────────────────────────

function buildInterpretation(risks, highestRiskIdx, topo, event, bud, prot) {
  const risk = risks[highestRiskIdx];
  const riskInfo = getRiskLabel(risk);
  const zoneNames = ['West Edge', 'West Mid', 'Centre / Hollow', 'East Mid', 'East Edge'];

  const eventDesc = event.id === 'radiation'
    ? 'Radiation frost conditions (clear, calm) mean cold air will settle and pool in the lowest parts of this terrain.'
    : event.id === 'mixed'
    ? 'Mixed conditions: some cold-air pooling, moderated by gentle air movement.'
    : 'Advective freeze: strong wind prevents localised cold-air pooling. Risk is more uniform across the terrain.';

  const topoNote = topo.drainage === 'blocked'
    ? 'The blocked outlet means cold air cannot escape — trapping it in the centre zone.'
    : topo.drainage === 'poor'
    ? 'The valley floor has poor natural drainage — cold air will accumulate deeply.'
    : topo.drainage === 'good'
    ? 'The convex ridge shape allows cold air to slide off — reducing pooling.'
    : 'The slope has moderate drainage — cold air will pool in the lower sections.';

  const budNote = bud.id === 'dormant'
    ? 'The vines are dormant, so frost damage is very unlikely even in high-risk zones.'
    : bud.id === 'flowering'
    ? 'Flowering vines are at maximum frost sensitivity — even moderate frost can cause significant flower abortion and yield loss.'
    : bud.sensitivity >= 0.7
    ? `Active shoot growth at the ${bud.label.toLowerCase()} stage is highly frost-sensitive. Protection is strongly recommended.`
    : bud.sensitivity >= 0.3
    ? `Green tissue is exposed at ${bud.label.toLowerCase()}. Moderate frost risk to emerging shoots.`
    : `Minimal green tissue exposed at ${bud.label.toLowerCase()}. Low direct frost risk to vines.`;

  const protNote = prot.id === 'none'
    ? 'No active protection is assumed in this scenario.'
    : prot.id === 'wind-machine'
    ? 'A wind machine is available — most effective where temperature inversions are strong and pooling is deepest.'
    : prot.id === 'sprinkler'
    ? 'Sprinkler protection is available — needs to run continuously through the frost event to be effective.'
    : 'Combined wind machine and sprinkler protection — highest level of active protection.';

  return `${zoneNames[highestRiskIdx]} is the <strong>highest-risk zone</strong> with ${riskInfo.text} relative risk. ${eventDesc} ${topoNote} ${budNote} ${protNote}`;
}

function buildMechanismText(event, topo) {
  const base = event.mechanism;

  const topoNote = topo.id === 'valley-floor'
    ? ' In a valley floor, cold air from the surrounding slopes drains in and has nowhere to go — creating the deepest and coldest pooling of any landform.'
    : topo.id === 'ridge'
    ? ' On a ridge shoulder, cold air is denser than the surrounding air and slides down the slopes away from the vines — making convex ridgelines the lowest-frost-risk terrain positions.'
    : topo.id === 'shallow-bowl'
    ? ' A shallow bowl creates a cold-air trap: denser cold air sits in the depression, and without a clear drainage outlet it pools there through the night.'
    : topo.id === 'blocked-outlet'
    ? ' When a bowl has a raised lip at its drainage outlet, cold air cannot escape even when it is denser. The result is an extremely effective cold trap — potentially colder than an open valley floor.'
    : ' On an open slope, cold air can drain downhill, but gentle concavities can still create localised pooling zones.';

  return base + topoNote;
}

// ── Actions generator ────────────────────────────────────────────────────────

function buildActions(state) {
  const { risks, highestRiskIdx, topo, event, bud, cover, prot } = computeRisks(state);
  const riskInfo = getRiskLabel(risks[highestRiskIdx]);
  const risk = risks[highestRiskIdx];

  const passive = [];
  const active = [];

  // ─ Passive / site / management ─────────────────────────────────────────
  passive.push({
    text: 'Identify the lowest points in the block and flag them as frost-risk zones for future reference.',
    rank: 1, warning: false,
  });

  if (topo.drainage === 'blocked') {
    passive.push({
      text: 'Consider creating a drainage channel at the outlet to allow cold air to escape — this is a long-term infrastructure investment.',
      rank: 2, warning: false,
    });
  }

  if (topo.drainage === 'poor' || topo.drainage === 'blocked') {
    passive.push({
      text: 'Avoid planting frost-sensitive varieties in the lowest zone of this terrain.',
      rank: 3, warning: false,
    });
  }

  if (bud.sensitivity >= 0.45) {
    passive.push({
      text: 'Prioritise this zone for scouting ahead of spring frost events — early detection matters.',
      rank: passive.length + 1, warning: false,
    });
  }

  if (cover.id === 'bare') {
    passive.push({
      text: 'Consider maintaining a mown cover crop — it increases surface roughness, slows drainage slightly, and can raise minimum temperatures by 0.5–1°C compared to bare soil.',
      rank: passive.length + 1, warning: false,
    });
  } else if (cover.id === 'tall') {
    passive.push({
      text: 'Tall cover can trap cold air at the canopy level — mow it down before expected frost nights to reduce this effect.',
      rank: passive.length + 1, warning: false,
    });
  }

  if (event.id === 'radiation' || event.id === 'mixed') {
    passive.push({
      text: 'Ensure the under-vine area is clean of leaves and debris before frost nights — open soil radiates more efficiently.',
      rank: passive.length + 1, warning: false,
    });
  }

  passive.push({
    text: 'Use this block\'s history: note which rows consistently frost first — this is your real-world frost map.',
    rank: passive.length + 1, warning: false,
  });

  // ─ Active protection ──────────────────────────────────────────────────
  if (event.id === 'advective') {
    active.push({
      text: 'Active protection is unlikely to be effective during advective freezes. Wind machines cannot create an inversion to mix, and sprinklers may struggle to maintain ice coating in strong wind.',
      rank: 1, warning: true, muted: false,
    });
    active.push({
      text: 'Focus effort on post-event assessment and recovery rather than attempting active protection during the event.',
      rank: 2, warning: false, muted: false,
    });
    if (prot.id !== 'none') {
      active.push({
        text: `Your ${prot.label} protection will provide limited benefit during an advective event — it may reduce damage by a small amount but should not be relied upon.`,
        rank: 3, warning: true, muted: false,
      });
    }
  } else {
    if (prot.id === 'none') {
      active.push({
        text: 'No active protection is available in this scenario. Monitor conditions and be ready to assess damage after the event.',
        rank: 1, warning: false, muted: true,
      });
    } else if (prot.id === 'wind-machine') {
      active.push({
        text: 'Wind machine: run when temperature at the vine level drops to ~1°C — do not wait for damage. In strong inversions they are most effective.',
        rank: 1, warning: false,
      });
      active.push({
        text: 'Wind machines provide ~2–3°C of protection in ideal conditions (strong inversion, calm). They are less effective in mixed events.',
        rank: 2, warning: false,
      });
      if (event.id === 'radiation' && state.inversion === 'strong') {
        active.push({
          text: 'Strong inversion + radiation frost = ideal wind machine conditions. Deploy early for maximum benefit.',
          rank: 3, warning: false,
        });
      }
    } else if (prot.id === 'sprinkler') {
      active.push({
        text: 'Sprinkler: must start before temperature drops to 0°C and run continuously until the ice melts. Stopping early can cause more damage than never starting.',
        rank: 1, warning: false,
      });
      active.push({
        text: 'Coverage must be uniform — missed areas will experience worse damage. Check sprinklers are fully operational before the season.',
        rank: 2, warning: false,
      });
      active.push({
        text: 'Effective for radiation frost; less reliable in mixed or advective events with wind.',
        rank: 3, warning: false,
      });
    } else if (prot.id === 'both') {
      active.push({
        text: 'Combined protection: run wind machine first as temperatures drop; add sprinklers if temperatures approach –2°C.',
        rank: 1, warning: false,
      });
      active.push({
        text: 'Coordinate timing — sprinkler activation can interfere with wind machine efficiency if deployed simultaneously in the same zone.',
        rank: 2, warning: false,
      });
    }
  }

  // Sort by rank
  passive.sort((a, b) => a.rank - b.rank);
  active.sort((a, b) => a.rank - b.rank);

  return { passive, active };
}

// ── State ────────────────────────────────────────────────────────────────────

const state = {
  topo:      TOPOGRAPHIES[0].id,
  event:     EVENT_TYPES[0].id,
  bud:       BUD_STAGES[3].id,
  cover:     GROUND_COVERS[1].id,
  inversion: INVERSION_STRENGTHS[1].id,
  protection: PROTECTION_TYPES[0].id,
  activePreset: null,
};

// ── DOM refs ─────────────────────────────────────────────────────────────────

const $terrainFill       = document.getElementById('terrain-fill');
const $terrainLine       = document.getElementById('terrain-line');
const $coldAirGroup      = document.getElementById('cold-air-group');
const $vineyardRows      = document.getElementById('vineyard-rows');
const $zoneOverlays      = document.getElementById('zone-overlays');
const $coldAirArrows     = document.getElementById('cold-air-arrows');
const $zoneLegend        = document.getElementById('zone-legend');
const $terrainLabels     = document.getElementById('terrain-labels');
const $interpretationCard = document.getElementById('interpretation-card');
const $interpretationText = document.getElementById('interpretation-text');
const $mechanismText     = document.getElementById('mechanism-text');
const $mechContent       = document.getElementById('mech-content');
const $mechToggleBtn     = document.getElementById('mech-toggle-btn');
const $inversionGroup    = document.getElementById('inversion-group');
const $passiveActions    = document.getElementById('passive-actions');
const $activeActions     = document.getElementById('active-actions');
const $presetChips        = document.getElementById('preset-chips');
const $topoChips          = document.getElementById('topo-chips');
const $eventChips         = document.getElementById('event-chips');
const $budChips           = document.getElementById('bud-chips');
const $coverChips         = document.getElementById('cover-chips');
const $inversionChips     = document.getElementById('inversion-chips');
const $protectionChips   = document.getElementById('protection-chips');

// ── Render helpers ───────────────────────────────────────────────────────────

function riskColorForRisk(risk) {
  return getRiskColour(risk);
}

function renderTerrain(state) {
  const topo = TOPOGRAPHIES.find(t => t.id === state.topo);
  const { fillPath, linePath, screenYs, zoneWidth } = buildTerrainSVG(topo);

  $terrainFill.setAttribute('d', fillPath);
  $terrainLine.setAttribute('d', linePath);

  // Vineyard rows
  $vineyardRows.innerHTML = '';
  const rowYStart = SVG_H - 12;
  for (let i = 0; i < ZONE_COUNT; i++) {
    const cx = (i + 0.5) * zoneWidth;
    const y = screenYs[i];
    const rowH = rowYStart - y;
    // Post
    const post = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    post.setAttribute('x1', cx); post.setAttribute('y1', y);
    post.setAttribute('x2', cx); post.setAttribute('y2', y + 12);
    post.setAttribute('stroke', '#5d4037'); post.setAttribute('stroke-width', '1.5');
    $vineyardRows.appendChild(post);
    // Canopy (simple horizontal bar)
    const canopy = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    canopy.setAttribute('x', cx - 6); canopy.setAttribute('y', y - 14);
    canopy.setAttribute('width', 12); canopy.setAttribute('height', 10);
    canopy.setAttribute('rx', 3);
    canopy.setAttribute('fill', '#2e7d32'); canopy.setAttribute('opacity', '0.8');
    $vineyardRows.appendChild(canopy);
  }

  renderColdAir(state, screenYs, zoneWidth);
  renderRisks(state, screenYs, zoneWidth);
}

function renderRisks(state, screenYs, zoneWidth) {
  const { risks } = computeRisks(state);

  $zoneOverlays.innerHTML = '';
  for (let i = 0; i < ZONE_COUNT; i++) {
    const x = i * zoneWidth;
    const y = screenYs[i];
    const nextY = screenYs[i + 1] !== undefined ? screenYs[i + 1] : screenYs[i];
    const risk = risks[i];
    const colour = riskColorForRisk(risk);

    // Semi-transparent risk overlay trapezoid
    const overlay = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    const topOff = 2;
    const tw = zoneWidth * 0.82;
    overlay.setAttribute('points',
      `${x + zoneWidth * 0.09},${y + topOff} ` +
      `${x + zoneWidth * 0.91},${y + topOff} ` +
      `${x + zoneWidth * 0.91},${SVG_H} ` +
      `${x + zoneWidth * 0.09},${SVG_H}`
    );
    overlay.setAttribute('fill', colour);
    overlay.setAttribute('opacity', String(Math.round(risk * 0.28 * 10) / 10));
    $zoneOverlays.appendChild(overlay);

    // Zone label on terrain surface
    const zoneNames = ['W Edge', 'W Mid', 'Centre', 'E Mid', 'E Edge'];
    const lbl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    lbl.setAttribute('x', x + zoneWidth * 0.5);
    lbl.setAttribute('y', y + 22);
    lbl.setAttribute('text-anchor', 'middle');
    lbl.setAttribute('font-size', '9');
    lbl.setAttribute('fill', 'rgba(255,255,255,0.5)');
    lbl.setAttribute('font-family', 'DM Sans, sans-serif');
    lbl.setAttribute('font-weight', '500');
    lbl.textContent = zoneNames[i];
    $zoneOverlays.appendChild(lbl);
  }
}

function renderColdAir(state, screenYs, zoneWidth) {
  const topo    = TOPOGRAPHIES.find(t => t.id === state.topo);
  const event   = EVENT_TYPES.find(e => e.id === state.event);
  const invStr  = INVERSION_STRENGTHS.find(i => i.id === state.inversion);

  $coldAirGroup.innerHTML = '';
  $coldAirArrows.innerHTML = '';

  const pools = buildColdAirPools(topo, event, invStr, screenYs, zoneWidth);
  const arrows = buildDrainArrows(topo, event, screenYs, zoneWidth);

  // Cold air pools (gradient rects above terrain)
  pools.forEach((p, pi) => {
    const h = p.depth * 90;
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', p.cx - p.w / 2);
    rect.setAttribute('y', p.y - h - 2);
    rect.setAttribute('width', p.w);
    rect.setAttribute('height', h);
    rect.setAttribute('fill', 'url(#cold-air-grad)');
    rect.setAttribute('class', 'cold-pool-anim');
    rect.setAttribute('opacity', String(Math.min(p.depth * 0.8, 0.85)));
    rect.style.animationDelay = `${pi * 0.4}s`;
    $coldAirGroup.appendChild(rect);

    // Pool boundary line
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', p.cx - p.w / 2);
    line.setAttribute('x2', p.cx + p.w / 2);
    line.setAttribute('y1', p.y - h);
    line.setAttribute('y2', p.y - h);
    line.setAttribute('stroke', '#4fc3f7');
    line.setAttribute('stroke-width', '1');
    line.setAttribute('opacity', '0.5');
    line.setAttribute('stroke-dasharray', '4 3');
    line.setAttribute('class', 'cold-pool-anim');
    line.style.animationDelay = `${pi * 0.4}s`;
    $coldAirGroup.appendChild(line);
  });

  // Drain arrows
  arrows.forEach((a, ai) => {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'drain-anim');
    g.style.animationDelay = `${ai * 0.6}s`;

    // Arrow shaft
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', a.x - 8); line.setAttribute('y1', a.y);
    line.setAttribute('x2', a.x); line.setAttribute('y2', a.y + 16);
    line.setAttribute('stroke', '#81d4fa');
    line.setAttribute('stroke-width', '2');
    line.setAttribute('stroke-linecap', 'round');
    line.setAttribute('opacity', '0.75');
    g.appendChild(line);

    // Arrowhead
    const tri = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    tri.setAttribute('points', `${a.x},${a.y + 18} ${a.x - 5},${a.y + 10} ${a.x + 5},${a.y + 10}`);
    tri.setAttribute('fill', '#81d4fa');
    tri.setAttribute('opacity', '0.75');
    g.appendChild(tri);

    $coldAirArrows.appendChild(g);
  });
}

function renderZoneLegend() {
  $zoneLegend.innerHTML = '';
  const items = [
    { label: 'Low risk',    colour: '#43a047' },
    { label: 'Moderate',    colour: '#fb8c00' },
    { label: 'High risk',    colour: '#ef5350' },
    { label: 'Extreme',      colour: '#9c27b0' },
  ];
  items.forEach(item => {
    const el = document.createElement('div');
    el.className = 'legend-item';
    el.innerHTML = `<span class="legend-dot" style="background:${item.colour}"></span>${item.label}`;
    $zoneLegend.appendChild(el);
  });
}

function renderTerrainLabels(state) {
  const { risks } = computeRisks(state);
  $terrainLabels.innerHTML = '';
  for (let i = 0; i < ZONE_COUNT; i++) {
    const info = getRiskLabel(risks[i]);
    const el = document.createElement('div');
    el.className = 'terrain-label-item';
    el.innerHTML = `<span style="color:${getRiskColour(risks[i])}">${info.text}</span>`;
    $terrainLabels.appendChild(el);
  }
}

function renderInterpretation(state) {
  const { risks, highestRiskIdx, topo, event, bud, prot } = computeRisks(state);
  const risk = risks[highestRiskIdx];
  const riskInfo = getRiskLabel(risk);

  // Border colour
  $interpretationCard.style.borderLeftColor = getRiskColour(risk);

  $interpretationText.innerHTML = buildInterpretation(risks, highestRiskIdx, topo, event, bud, prot);
}

function renderMechanism(state) {
  const topo  = TOPOGRAPHIES.find(t => t.id === state.topo);
  const event = EVENT_TYPES.find(e => e.id === state.event);
  $mechanismText.textContent = buildMechanismText(event, topo);
}

function renderActions(state) {
  const { passive, active } = buildActions(state);

  $passiveActions.innerHTML = '';
  passive.forEach(item => {
    const li = document.createElement('li');
    li.className = 'action-item' + (item.warning ? ' is-warning' : '') + (item.muted ? ' is-muted' : '');
    li.innerHTML = `<span class="action-rank">${item.rank}</span><span>${item.text}</span>`;
    $passiveActions.appendChild(li);
  });

  $activeActions.innerHTML = '';
  active.forEach(item => {
    const li = document.createElement('li');
    li.className = 'action-item' + (item.warning ? ' is-warning' : '') + (item.muted ? ' is-muted' : '');
    li.innerHTML = `<span class="action-rank">${item.rank}</span><span>${item.text}</span>`;
    $activeActions.appendChild(li);
  });
}

// ── Control chip builders ────────────────────────────────────────────────────

function makeChip(value, groupId, label, isActive, extraClass) {
  const btn = document.createElement('button');
  btn.className = 'chip' + (extraClass ? ' ' + extraClass : '');
  btn.setAttribute('role', 'radio');
  btn.setAttribute('aria-checked', isActive ? 'true' : 'false');
  btn.setAttribute('data-group', groupId);
  btn.setAttribute('data-value', value);
  btn.textContent = label;
  btn.addEventListener('click', () => selectChip(groupId, value));
  return btn;
}

function selectChip(groupId, value) {
  // Clear preset active state
  state.activePreset = null;
  document.querySelectorAll('[data-group="preset"] .chip').forEach(c => {
    c.setAttribute('aria-checked', 'false');
    c.classList.remove('chip--active');
  });

  state[groupId] = value;
  document.querySelectorAll(`[data-group="${groupId}"]`).forEach(c => {
    c.setAttribute('aria-checked', c.dataset.value === value ? 'true' : 'false');
  });

  // Show/hide inversion control
  if (groupId === 'event') {
    const show = value === 'radiation' || value === 'mixed';
    $inversionGroup.hidden = !show;
  }

  renderAll();
}

function selectPreset(presetId) {
  const preset = PRESETS.find(p => p.id === presetId);
  if (!preset) return;

  state.activePreset = presetId;
  state.topo      = preset.topo;
  state.event     = preset.event;
  state.bud       = preset.bud;
  state.cover     = preset.cover;
  state.inversion = preset.inversion;
  state.protection = preset.protection;

  // Update all chips
  ['topo', 'event', 'bud', 'cover', 'inversion', 'protection'].forEach(g => {
    document.querySelectorAll(`[data-group="${g}"]`).forEach(c => {
      c.setAttribute('aria-checked', c.dataset.value === state[g] ? 'true' : 'false');
    });
  });
  document.querySelectorAll('[data-group="preset"]').forEach(c => {
    c.setAttribute('aria-checked', c.dataset.value === presetId ? 'true' : 'false');
  });

  $inversionGroup.hidden = !(state.event === 'radiation' || state.event === 'mixed');

  renderAll();
}

function buildChips() {
  // Presets
  $presetChips.innerHTML = '';
  PRESETS.forEach(p => {
    const btn = makeChip(p.id, 'preset', p.label, false, 'chip--preset');
    $presetChips.appendChild(btn);
  });

  // Topography
  $topoChips.innerHTML = '';
  TOPOGRAPHIES.forEach(t => {
    $topoChips.appendChild(makeChip(t.id, 'topo', t.label, t.id === state.topo));
  });

  // Event type
  $eventChips.innerHTML = '';
  EVENT_TYPES.forEach(e => {
    $eventChips.appendChild(makeChip(e.id, 'event', e.label, e.id === state.event));
  });

  // Bud stage
  $budChips.innerHTML = '';
  BUD_STAGES.forEach(b => {
    $budChips.appendChild(makeChip(b.id, 'bud', b.label, b.id === state.bud));
  });

  // Ground cover
  $coverChips.innerHTML = '';
  GROUND_COVERS.forEach(c => {
    $coverChips.appendChild(makeChip(c.id, 'cover', c.label, c.id === state.cover));
  });

  // Inversion
  $inversionChips.innerHTML = '';
  INVERSION_STRENGTHS.forEach(i => {
    $inversionChips.appendChild(makeChip(i.id, 'inversion', i.label, i.id === state.inversion));
  });

  // Protection
  $protectionChips.innerHTML = '';
  PROTECTION_TYPES.forEach(p => {
    $protectionChips.appendChild(makeChip(p.id, 'protection', p.label, p.id === state.protection));
  });

  $inversionGroup.hidden = !(state.event === 'radiation' || state.event === 'mixed');
}

// ── Full render ──────────────────────────────────────────────────────────────

function renderAll() {
  const screenYs = TOPOGRAPHIES.find(t => t.id === state.topo)
    ? buildTerrainSVG(TOPOGRAPHIES.find(t => t.id === state.topo)).screenYs
    : buildTerrainSVG(TOPOGRAPHIES[0]).screenYs;
  const zoneWidth = SVG_W / ZONE_COUNT;

  renderTerrain(state);
  renderZoneLegend();
  renderTerrainLabels(state);
  renderInterpretation(state);
  renderMechanism(state);
  renderActions(state);
}

// ── Mechanism toggle ────────────────────────────────────────────────────────

$mechToggleBtn.addEventListener('click', () => {
  const expanded = $mechToggleBtn.getAttribute('aria-expanded') === 'true';
  $mechToggleBtn.setAttribute('aria-expanded', String(!expanded));
  $mechContent.hidden = expanded;
});

// ── Init ─────────────────────────────────────────────────────────────────────

function init() {
  renderZoneLegend();
  buildChips();

  // Select default preset
  selectPreset(PRESETS[0].id);

  renderAll();
}

init();
