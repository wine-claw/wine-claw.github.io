/* ============================================
   Vineyard Scout Sprint — app.js
   Self-contained, no frameworks, no CDN deps
   ============================================ */

'use strict';

/* ---------------------------------------------
   Mode Definitions
   Each mode has an intro, hotspots, and clues.
   Hotspot positions are in SVG viewBox coords (400 × 560).
   --------------------------------------------- */

const MODES = {
  mildew: {
    key: 'mildew',
    title: 'Mildew Hunt',
    color: '#8b4e3a',
    bgGrad: 'linear-gradient(135deg, #8b4e3a22, #a8584822)',
    badge: '🍇',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="#8b4e3a" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>`,
    intro: 'Tap the vineyard to find clues. Look for dusty white coating on leaves, distorted shoots, or berry russeting. One clue is not a diagnosis — note patterns across the block.',
    hotspots: [
      {
        id: 'm1', cx: 80, cy: 325, r: 22,
        label: 'Leaf Top',
        badge: '🍂',
        title: 'White Powdery Coating — Upper Leaf',
        body: 'A fine, dusty-white to pale-gray coating on the upper leaf surface is a classic early sign of powdery mildew (Erysiphe necator). It often starts as discrete circular patches that can spread to cover the whole leaf.',
        advice: 'Mark the row and check adjacent vines. Note the varietal and growth stage. Report to your agronomist. A fungicide pass may be warranted — do not self-prescribe sprays.',
        found: false
      },
      {
        id: 'm2', cx: 200, cy: 300, r: 22,
        label: 'Shoot Tip',
        badge: '🌱',
        title: 'Distorted, Stunted Shoot Tip',
        body: 'Young shoots and leaves infected early in the season often become distorted, brittle, or stunted. Growing tips may curl or appear tightly wound. Severely affected shoots can arrest entirely.',
        advice: 'Record affected shoot proportion in the row. Check for correlated leaf symptoms. If >10–15% of tips are affected, flag for scouting expansion and agronomist review.',
        found: false
      },
      {
        id: 'm3', cx: 320, cy: 330, r: 22,
        label: 'Berry',
        badge: '🫐',
        title: 'Berry Russeting / Cracking',
        body: 'Young berries that become infected develop a brownish-gray russetted skin. In some varieties the berry surface cracks, providing a gateway for secondary rots. Affected berries rarely ripen normally.',
        advice: 'Do not consume or sell affected fruit. Isolate the zone in your notes. Take photos for your agronomist. Consider targeted treatment of the zone in future seasons.',
        found: false
      },
      {
        id: 'm4', cx: 145, cy: 365, r: 22,
        label: 'Leaf Underside',
        badge: '🍃',
        title: 'Pale Blotching — Lower Surface',
        body: 'Interveinal pale-green to yellow blotching on older leaves can indicate powdery mildew pressure on the lower surface (often subtle compared to the upper surface). Paired with the top-surface signs, this strengthens the case for infection.',
        advice: 'Flip leaves to inspect lower surfaces as a matter of routine. Confirm with a hand lens (10×). Build a picture of the block before deciding on any action.',
        found: false
      },
      {
        id: 'm5', cx: 265, cy: 290, r: 22,
        label: 'Cluster',
        badge: '🍇',
        title: 'Infected Flower / Young Cluster',
        body: 'Powdery mildew infecting at bloom or fruit-set can destroy parts of the cluster or cause the whole cluster to shatter. You may see a gray-white coating on the rachis or individual berry pedicels.',
        advice: 'Cluster infection at this stage significantly impacts yield. Mark the vine. Note varietal susceptibility. Inform your vineyard manager before the next spray window.',
        found: false
      }
    ]
  },

  water: {
    key: 'water',
    title: 'Water-Stress Walk',
    color: '#2a6f97',
    bgGrad: 'linear-gradient(135deg, #2a6f9722, #3a8fb722)',
    badge: '💧',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="#2a6f97" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c0 0-6 7-6 11a6 6 0 0 0 12 0c0-4-6-11-6-11z"/></svg>`,
    intro: 'Scan for vine water-status cues. Look for slowed shoot tips, drooping leaf angles, drying tendrils, or canopy thinning. Water stress signals can be subtle — context matters.',
    hotspots: [
      {
        id: 'w1', cx: 110, cy: 315, r: 22,
        label: 'Shoot Tip',
        badge: '🪴',
        title: 'Slowed / Halted Shoot Tip',
        body: 'Actively growing vines have a pronounced, slightly curved shoot tip. When water becomes limiting, extension growth slows noticeably within days — the tip straightens and may stop extending altogether.',
        advice: 'Measure or estimate the current shoot length vs. a healthy reference. Flag rows with consistent tip stall. Compare with different soil zones or irrigation lines.',
        found: false
      },
      {
        id: 'w2', cx: 230, cy: 360, r: 22,
        label: 'Tendril',
        badge: '🦿',
        title: 'Dried or Wilting Tendril',
        body: 'Tendrils (the coiled organ that grips wires) are sensitive indicators. A tendril that has dried to a brown, brittle state when others are still green and supple suggests the vine has redirected water away from less-critical structures.',
        advice: 'Count the number of dried tendrils per shoot. If >2–3 per cane, water status may be moderate-to-severe. Cross-check soil moisture and recent weather.',
        found: false
      },
      {
        id: 'w3', cx: 350, cy: 310, r: 22,
        label: 'Leaf Angle',
        badge: '🍂',
        title: 'Acute Leaf Angle / Wilting Posture',
        body: 'A vine conserving water rolls its leaves upward or twists them to reduce sun exposure (the leaf Praying position). Combined with slight dulling of leaf color, this is a strong early indicator of water deficit.',
        advice: 'Note whether leaf angle change is uniform across the row or localized. Localized wilting may signal a blocked emitter or broken drip line. Uniform wilting points to a genuine deficit.',
        found: false
      },
      {
        id: 'w4', cx: 175, cy: 295, r: 22,
        label: 'Canopy',
        badge: '🌿',
        title: 'Thinning Upper Canopy',
        body: 'In moderate to severe water stress, the vine sheds leaves starting from the base of the shoot, moving upward. An open or sparse upper canopy that was previously dense is a meaningful late-early stress signal.',
        advice: 'This is not an early sign — it indicates stress has been ongoing. Assess whether it is improving or worsening over subsequent visits. Document with photos and dates.',
        found: false
      },
      {
        id: 'w5', cx: 290, cy: 375, r: 22,
        label: 'Soil',
        badge: '🟤',
        title: 'Surface Cracking / Dry Soil',
        body: 'While not on the vine itself, soil-surface cracking between rows or under the vine indicates prolonged drying. Loamy soils crack at roughly -80 to -100 kPa. In sandy soils, cracking may not occur even at severe deficit.',
        advice: 'Use a hand trowel or soil probe to check 20–30 cm depth. Surface clues alone are insufficient — always confirm root-zone moisture with a hands-on check.',
        found: false
      }
    ]
  },

  nutrition: {
    key: 'nutrition',
    title: 'Nutrition Sweep',
    color: '#5a7a2e',
    bgGrad: 'linear-gradient(135deg, #5a7a2e22, #7a9a4e22)',
    badge: '🧪',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="#5a7a2e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r="1"/></svg>`,
    intro: 'Identify potential nutrient imbalances. Look for yellowing patterns, leaf-edge effects, and interveinal symptoms. Deficiency symptoms can look similar — context and soil history matter.',
    hotspots: [
      {
        id: 'n1', cx: 90, cy: 330, r: 22,
        label: 'Interveinal',
        badge: '🍃',
        title: 'Interveinal Chlorosis — Classic Pattern',
        body: 'Yellowing between the veins while veins remain green is the hallmark of several deficiencies, most commonly magnesium (Mg) or iron (Fe). In Mg deficiency the yellowing starts at the leaf edge; in Fe deficiency it often appears on younger leaves first.',
        advice: 'Identify which leaves are affected (young vs. old) — this narrows the cause. Mg deficiency = old leaves. Fe deficiency = young leaves. Note varietal susceptibility. Soil or foliar testing is required to confirm.',
        found: false
      },
      {
        id: 'n2', cx: 215, cy: 300, r: 22,
        label: 'Leaf Edge',
        badge: '🟡',
        title: 'Leaf-Edge Necrosis — Potassium (K)',
        body: 'A narrow yellow margin on leaves that progresses to a dry, brown edge is a classic K-deficiency sign. It typically starts on older basal leaves and progresses upward. K is critical for sugar transport and water regulation.',
        advice: 'K deficiency is common in light sandy soils or after heavy crop loads. Cross-reference with recent petiole-test results. Foliar K spray can provide a rapid (partial) correction; soil K application addresses root cause.',
        found: false
      },
      {
        id: 'n3', cx: 330, cy: 320, r: 22,
        label: 'Uniform Yellow',
        badge: '🟡',
        title: 'Uniform Chlorosis — Nitrogen (N)',
        body: 'Entire leaves (or the whole canopy) turning a uniformly pale yellow-green — rather than a patterned yellowing — is typical of nitrogen deficiency. Shoot growth is also reduced. Older leaves are affected first as N is mobile within the plant.',
        advice: 'N deficiency is the most common nutrient constraint in vineyards. Confirm with a recent petiole or soil test. N applications need careful timing — excess promotes excessive vigour and delays ripening.',
        found: false
      },
      {
        id: 'n4', cx: 155, cy: 370, r: 22,
        label: 'Reddening',
        badge: '🍷',
        title: 'Reddening / Purple Tint — Phosphorus (P)',
        body: 'Leaves turning reddish-purple, particularly on the petiole and along the margins, can indicate phosphorus deficiency — though in red varieties this is confounded by normal anthocyanin colouration at season end. P deficiency is relatively rare in deep soils.',
        advice: 'Distinguish from varietal colour by checking whether the symptom is on basal leaves, and whether it appears before veraison when red grapes normally colour. Petiole test is the definitive check.',
        found: false
      },
      {
        id: 'n5', cx: 280, cy: 295, r: 22,
        label: 'Young Leaves',
        badge: '🌱',
        title: 'Young Leaf Interveinal Chlorosis — Iron (Fe)',
        body: 'Unlike Mg deficiency (old leaves), Fe-deficiency chlorosis shows on the youngest leaves first because Fe is immobile — the plant cannot redistribute it from older tissue. Veins remain green, giving a pronounced netted appearance.',
        advice: 'Fe chlorosis is common on high-pH (calcareous) soils. It may also indicate poor drainage or root health rather than true Fe absence. pH of the root zone is usually the underlying cause — address that, not just the foliar symptom.',
        found: false
      }
    ]
  },

  stress: {
    key: 'stress',
    title: 'Heat & Frost Check',
    color: '#8a6030',
    bgGrad: 'linear-gradient(135deg, #8a603022, #aa804022)',
    badge: '🌡️',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="#8a6030" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.5 4.5H18l-3.5 3 1.5 4.5L12 12l-4 3 1.5-4.5L6 7.5h4.5L12 3z"/></svg>`,
    intro: 'Assess the vineyard after extreme weather. Heat and frost events leave distinctive marks. Early detection helps prioritise recovery work and insurance documentation.',
    hotspots: [
      {
        id: 's1', cx: 100, cy: 315, r: 22,
        label: 'Sunburn',
        badge: '☀️',
        title: 'Sunburn / Bleached Leaf Tissue',
        body: 'Excessive heat (>38–40 °C canopy temperature) can bleach leaf tissue to a pale straw colour, causing a papery texture. On exposed clusters, direct sun can cause sunburn browning on the skin.',
        advice: 'Sunburned clusters have reduced marketable yield. Review canopy management — exposed fruit zones on the west side are most at risk. Note which rows/varieties are worst to inform next season\'s leaf-pull strategy.',
        found: false
      },
      {
        id: 's2', cx: 220, cy: 300, r: 22,
        label: 'Shoot Dieback',
        badge: '🥀',
        title: 'Shoot Tip or Cane Dieback — Heat Stress',
        body: 'Prolonged extreme heat can cause shoot tips and even whole canes to die back, with a characteristic dark-brown to black tip. Often coincides with desiccation of the cane bark. May not show immediately — symptoms appear 3–7 days after the event.',
        advice: 'Count dead shoot tips per vine. If extensive, delay pruning of damaged wood to allow the vine to compartmentalise. Severe dieback can affect next season\'s bud viability.',
        found: false
      },
      {
        id: 's3', cx: 310, cy: 340, r: 22,
        label: 'Frost Damage',
        badge: '❄️',
        title: 'Blackened Young Leaves — Late Frost',
        body: 'A late-spring frost turns exposed young leaves and shoot tips black and limp within hours. The damage is usually most severe on the most-exposed parts of the canopy — upper wires and top-performing shoots.',
        advice: 'Do not prune damaged shoots immediately — let the vine compartmentalise for 2–3 weeks. Buds on dormant wood below the frost line often push secondary shoots. Assess the extent before deciding on intervention.',
        found: false
      },
      {
        id: 's4', cx: 175, cy: 365, r: 22,
        label: 'Desiccation',
        badge: '🍂',
        title: 'Desiccated Rachis / Cluster Stem',
        body: 'Heat waves with low humidity cause rapid water loss from the rachis (cluster stem). The rachis turns brown and brittle, and berry expansion stalls. Affected clusters may shatter or fail to ripen.',
        advice: 'Note the percentage of clusters affected per row. If significant (>20%), discuss with your buyer/grape buyer about partial harvest or re-grading. Consider overhead cooling irrigation if this recurs frequently.',
        found: false
      },
      {
        id: 's5', cx: 270, cy: 290, r: 22,
        label: 'Bark Split',
        badge: '🌳',
        title: 'Trunk or Cane Bark Splitting',
        body: 'Extreme temperature swings (sharp frost after warm period, or heatwave after cold) can cause the vine\'s bark to split. This is most visible on the trunk or on canes that received late-season sun.',
        advice: 'Bark splitting compromises the vine\'s vascular system. Small splits may heal; large wounds are entry points for fungal canker diseases. Mark affected trunks for a wound-sealant treatment or replacement vine.',
        found: false
      }
    ]
  }
};

/* ---------------------------------------------
   App State
   --------------------------------------------- */

const state = {
  currentMode: 'mildew',
  round: 1,
  isScouting: false,   // true when actively in a scouting round
  foundCount: 0,
  totalClues: 5,
  summary: []         // [{ id, title, badge, advice }]
};

/* ---------------------------------------------
   DOM References
   --------------------------------------------- */

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

const dom = {
  warningBanner:  $('#warningBanner'),
  bannerClose:     $('#bannerClose'),
  appShell:        $('#appShell'),
  modeTabs:        $('#modeTabs'),
  modeIntro:       $('#modeIntro'),
  introIcon:       $('#introIcon'),
  introTitle:      $('#introTitle'),
  introDesc:       $('#introDesc'),
  btnStart:        $('#btnStart'),
  sceneContainer:  $('#sceneContainer'),
  hotspotOverlay: $('#hotspotOverlay'),
  hotspotLayer:   $('#hotspotLayer'),
  sceneOverlay:   $('#sceneOverlay'),
  progressFill:    $('#progressFill'),
  clueCard:        $('#clueCard'),
  clueClose:       $('#clueClose'),
  clueBadge:       $('#clueBadge'),
  clueTitle:       $('#clueTitle'),
  clueBody:        $('#clueBody'),
  clueAdviceText:  $('#clueAdviceText'),
  btnNext:         $('#btnNext'),
  foundCount:      $('#foundCount'),
  remainingCount:  $('#remainingCount'),
  roundNum:        $('#roundNum'),
  roundDisplay:    $('#roundDisplay'),
  summaryScreen:   $('#summaryScreen'),
  summaryIcon:     $('#summaryIcon'),
  summaryTitle:    $('#summaryTitle'),
  summarySubtitle: $('#summarySubtitle'),
  summaryNote:     $('#summaryNote'),
  summaryStats:    $('#summaryStats'),
  btnReplay:       $('#btnReplay'),
  btnSwitch:       $('#btnSwitch')
};

/* ---------------------------------------------
   SVG Helpers
   --------------------------------------------- */

// Compute the scaling factor between the SVG viewBox (400×560)
// and the displayed SVG size on screen.
function getSvgScale() {
  const svg = $('#vineyardSvg');
  if (!svg) return { xScale: 1, yScale: 1, offsetX: 0, offsetY: 0 };
  const rect     = svg.getBoundingClientRect();
  const vw       = 400;
  const vh       = 560;
  const xScale   = rect.width  / vw;
  const yScale   = rect.height / vh;
  // offset to account for any padding on scene-container
  const contRect = dom.sceneContainer.getBoundingClientRect();
  const offsetX  = rect.left - contRect.left;
  const offsetY  = rect.top  - contRect.top;
  return { xScale, yScale, offsetX, offsetY, rect };
}

// Convert SVG viewBox coords → screen coords
function svgToScreen(svgX, svgY) {
  const { xScale, yScale, offsetX, offsetY } = getSvgScale();
  return {
    x: offsetX + svgX * xScale,
    y: offsetY + svgY * yScale,
    w: 44 * xScale,  // hotspot tap target
    h: 44 * xScale
  };
}

/* ---------------------------------------------
   Scene Setup
   --------------------------------------------- */

function initMode() {
  const mode = MODES[state.currentMode];

  // Update header accent for round display
  dom.roundDisplay.textContent = state.round;
  dom.roundNum.textContent = state.round;

  // Intro card
  dom.introIcon.innerHTML = mode.iconSvg;
  dom.introIcon.style.background = mode.bgGrad;
  dom.introTitle.textContent = mode.title;
  dom.introDesc.textContent = mode.intro;

  // Reset score bar
  state.foundCount = 0;
  state.summary = [];
  updateScoreBar();

  // Hide clue card
  dom.clueCard.classList.remove('visible');
  dom.clueCard.classList.add('hidden');
  document.body.classList.remove('clue-open');

  // Show intro
  dom.modeIntro.classList.remove('hidden');
  dom.hotspotOverlay.classList.remove('active');

  // Hide overlay on SVG (dimmed background before start)
  dom.sceneOverlay.style.display = '';

  // Clear any existing hotspots
  dom.hotspotLayer.innerHTML = '';
  dom.hotspotOverlay.innerHTML = '';

  // Build SVG hotspot rings (decorative) + div overlay buttons
  buildHotspots(mode);

  // Progress bar reset
  dom.progressFill.style.width = '0%';
}

function buildHotspots(mode) {
  // --- SVG pulsing rings in hotspotLayer ---
  mode.hotspots.forEach(hs => {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'hotspot-group');
    g.setAttribute('data-id', hs.id);
    g.setAttribute('transform', `translate(${hs.cx}, ${hs.cy})`);

    // Outer pulse ring (animated via CSS in SVG)
    const pulse = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    pulse.setAttribute('r', hs.r);
    pulse.setAttribute('fill', mode.color + '22');
    pulse.setAttribute('stroke', mode.color);
    pulse.setAttribute('stroke-width', '1.5');
    pulse.setAttribute('opacity', '0.5');
    pulse.classList.add('hotspot-pulse');

    // Middle ring
    const mid = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    mid.setAttribute('r', hs.r * 0.65);
    mid.setAttribute('fill', mode.color + '44');
    mid.setAttribute('stroke', mode.color);
    mid.setAttribute('stroke-width', '1');

    // Centre dot
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('r', 4);
    dot.setAttribute('fill', mode.color);

    g.appendChild(pulse);
    g.appendChild(mid);
    g.appendChild(dot);
    dom.hotspotLayer.appendChild(g);
  });

  // --- Div overlay hotspots (better for touch targets) ---
  // Force a layout so getSvgScale works
  void dom.sceneContainer.offsetWidth;

  mode.hotspots.forEach(hs => {
    const screen = svgToScreen(hs.cx, hs.cy);
    const size   = Math.max(44, hs.r * 2.2 * getSvgScale().xScale);

    const btn = document.createElement('button');
    btn.className = 'hotspot-btn';
    btn.setAttribute('data-id', hs.id);
    btn.setAttribute('aria-label', `Scout clue: ${hs.label}`);
    btn.style.cssText = `
      position: absolute;
      left:  ${screen.x - size / 2}px;
      top:   ${screen.y - size / 2}px;
      width:  ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: ${mode.color}22;
      border: 2px solid ${mode.color};
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      color: ${mode.color};
      opacity: 0;
      transform: scale(0);
      transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
      z-index: 10;
    `;
    btn.textContent = '?';
    btn.style.opacity = '1';
    btn.style.transform = 'scale(1)';

    btn.addEventListener('click', () => onHotspotClick(hs.id));
    dom.hotspotOverlay.appendChild(btn);
  });
}

// Animate hotspots in after "start scouting"
function revealHotspots() {
  const btns = $$('.hotspot-btn', dom.hotspotOverlay);
  btns.forEach((btn, i) => {
    setTimeout(() => {
      btn.style.opacity = '1';
      btn.style.transform = 'scale(1)';
    }, i * 120);
  });
}

/* ---------------------------------------------
   Event Handlers
   --------------------------------------------- */

function onHotspotClick(id) {
  const mode = MODES[state.currentMode];
  const hs   = mode.hotspots.find(h => h.id === id);
  if (!hs || hs.found) return;

  hs.found   = true;
  state.foundCount += 1;

  // Dim the SVG group
  const svgGroup = dom.hotspotLayer.querySelector(`[data-id="${id}"]`);
  if (svgGroup) svgGroup.classList.add('found');

  // Update div button
  const btn = dom.hotspotOverlay.querySelector(`[data-id="${id}"]`);
  if (btn) {
    btn.classList.add('found');
    btn.textContent = hs.badge;
    btn.style.opacity = '0.5';
    btn.style.pointerEvents = 'none';
  }

  // Update score
  updateScoreBar();

  // Update progress bar
  const pct = (state.foundCount / state.totalClues) * 100;
  dom.progressFill.style.width = pct + '%';

  // Record for summary
  state.summary.push({ id: hs.id, title: hs.title, badge: hs.badge, advice: hs.advice });

  // Show clue card
  showClueCard(hs, mode.color);

  // Check if all found
  if (state.foundCount >= state.totalClues) {
    setTimeout(() => {
      dom.btnNext.textContent = 'See Summary';
    }, 500);
  }
}

function showClueCard(hs, color) {
  dom.clueBadge.textContent = hs.badge;
  dom.clueBadge.style.background = color + '22';
  dom.clueBadge.style.border = `2px solid ${color}`;
  dom.clueTitle.textContent = hs.title;
  dom.clueBody.textContent = hs.body;
  dom.clueAdviceText.textContent = hs.advice;

  // Style border-top
  dom.clueCard.style.borderTopColor = color;

  dom.clueCard.classList.remove('hidden');
  document.body.classList.add('clue-open');

  // Animate in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      dom.clueCard.classList.add('visible');
    });
  });
}

function hideClueCard() {
  dom.clueCard.classList.remove('visible');
  document.body.classList.remove('clue-open');
  setTimeout(() => {
    if (!dom.clueCard.classList.contains('visible')) {
      dom.clueCard.classList.add('hidden');
    }
    // If all found, go to summary
    if (state.foundCount >= state.totalClues) {
      showSummary();
    }
  }, 350);
}

function updateScoreBar() {
  dom.foundCount.textContent    = state.foundCount;
  dom.remainingCount.textContent = Math.max(0, state.totalClues - state.foundCount);
  dom.roundNum.textContent      = state.round;
  dom.roundDisplay.textContent  = state.round;
}

/* ---------------------------------------------
   Summary Screen
   --------------------------------------------- */

function showSummary() {
  hideClueCard();
  dom.modeIntro.classList.add('hidden');
  dom.hotspotOverlay.classList.remove('active');

  const mode = MODES[state.currentMode];

  // Build field note text
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  let noteLines = [
    `Vineyard Scout Sprint — Field Walk Note`,
    `Mode: ${mode.title}`,
    `Round: ${state.round}`,
    `Time: ${timestamp}`,
    ``,
    `Observations noted (${state.foundCount} of ${state.totalClues} clues):`
  ];
  state.summary.forEach((item, i) => {
    noteLines.push(`${i + 1}. ${item.title}`);
  });
  noteLines.push('');
  noteLines.push('⚠️ This is a training/screening note only.');
  noteLines.push('  Confirm all observations in the field before taking action.');

  dom.summaryNote.innerHTML = noteLines
    .map(l => l.startsWith('Vineyard') || l.startsWith('Mode:') || l.startsWith('Round:') || l.startsWith('Time:')
      ? `<strong>${l}</strong>`
      : l === ''
      ? '&nbsp;'
      : l)
    .join('<br>');

  // Stats
  dom.summaryStats.innerHTML = `
    <div class="summary-stat">
      <span class="sstat-val">${state.foundCount}</span>
      <span class="sstat-label">Found</span>
    </div>
    <div class="summary-stat">
      <span class="sstat-val">${state.totalClues}</span>
      <span class="sstat-label">Total</span>
    </div>
    <div class="summary-stat">
      <span class="sstat-val">${state.round}</span>
      <span class="sstat-label">Round</span>
    </div>
  `;

  // Icon
  dom.summaryIcon.textContent = mode.badge;
  dom.summaryIcon.style.background = mode.bgGrad;
  dom.summaryIcon.style.border = `2px solid ${mode.color}`;

  dom.summaryTitle.textContent = `${mode.title} — Done!`;
  dom.summarySubtitle.textContent = 'Your field-walk note';

  dom.summaryScreen.classList.remove('hidden');
}

function hideSummary() {
  dom.summaryScreen.classList.add('hidden');
}

/* ---------------------------------------------
   Mode Switching
   --------------------------------------------- */

function switchMode(newMode) {
  if (state.isScouting) return; // guard during active round
  state.currentMode = newMode;

  // Update tab active states
  $$('.mode-tab', dom.modeTabs).forEach(tab => {
    const active = tab.dataset.mode === newMode;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', active);
  });

  hideSummary();
  resetRound();
}

function resetRound() {
  // Reset all hotspots found flags
  MODES[state.currentMode].hotspots.forEach(hs => { hs.found = false; });
  state.isScouting = false;
  dom.btnNext.textContent = 'Keep Scouting';
  initMode();
}

/* ---------------------------------------------
   Warning Banner
   --------------------------------------------- */

dom.bannerClose.addEventListener('click', () => {
  dom.warningBanner.style.display = 'none';
});

/* ---------------------------------------------
   Mode Tabs
   --------------------------------------------- */

dom.modeTabs.addEventListener('click', e => {
  const tab = e.target.closest('.mode-tab');
  if (!tab) return;
  switchMode(tab.dataset.mode);
});

/* ---------------------------------------------
   Start Scouting Button
   --------------------------------------------- */

dom.btnStart.addEventListener('click', () => {
  state.isScouting = true;
  dom.modeIntro.classList.add('hidden');
  dom.hotspotOverlay.classList.add('active');

  // Remove the dim overlay on SVG
  dom.sceneOverlay.style.display = 'none';

  revealHotspots();
});

/* ---------------------------------------------
   Clue Card Navigation
   --------------------------------------------- */

dom.clueClose.addEventListener('click', hideClueCard);
dom.btnNext.addEventListener('click', hideClueCard);

/* ---------------------------------------------
   Summary Actions
   --------------------------------------------- */

dom.btnReplay.addEventListener('click', () => {
  hideSummary();
  state.round += 1;
  resetRound();
  // Auto-start next round
  state.isScouting = true;
  dom.hotspotOverlay.classList.add('active');
  dom.sceneOverlay.style.display = 'none';
  revealHotspots();
});

dom.btnSwitch.addEventListener('click', () => {
  hideSummary();
  resetRound();
  // mode intro auto-shows
});

/* ---------------------------------------------
   Resize / Reposition hotspots on window resize
   --------------------------------------------- */

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (!state.isScouting) return;
    // Reposition hotspot divs to match new SVG scale
    const mode = MODES[state.currentMode];
    const btns = $$('.hotspot-btn', dom.hotspotOverlay);
    mode.hotspots.forEach((hs, i) => {
      if (hs.found) return;
      const screen = svgToScreen(hs.cx, hs.cy);
      const size   = Math.max(44, hs.r * 2.2 * getSvgScale().xScale);
      const btn    = btns[i];
      if (btn) {
        btn.style.left   = (screen.x - size / 2) + 'px';
        btn.style.top    = (screen.y - size / 2) + 'px';
        btn.style.width  = size + 'px';
        btn.style.height = size + 'px';
      }
    });
  }, 100);
});

/* ---------------------------------------------
   Keyboard / Accessibility Helpers
   --------------------------------------------- */

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (dom.clueCard.classList.contains('visible')) hideClueCard();
  }
  // Tab through hotspots
  if (state.isScouting && (e.key === 'Enter' || e.key === ' ')) {
    const focused = document.activeElement;
    if (focused && focused.classList.contains('hotspot-btn')) {
      const id = focused.dataset.id;
      if (id) onHotspotClick(id);
    }
  }
});

/* ---------------------------------------------
   SVG CSS Animation for pulse rings
   Inject keyframes into the document for SVG elements
   --------------------------------------------- */

function injectSvgStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes svgPulse {
      0%   { r: 18; opacity: 0.7; }
      60%  { r: 28; opacity: 0.15; }
      100% { r: 18; opacity: 0.7; }
    }
    .hotspot-pulse {
      animation: svgPulse 1.8s ease-out infinite;
    }
    .hotspot-group.found circle {
      opacity: 0.2 !important;
    }
    .cloud {
      animation: cloudDrift 40s linear infinite;
    }
    .cloud:nth-child(2) {
      animation-duration: 55s;
      animation-direction: reverse;
    }
    @keyframes cloudDrift {
      from { transform: translateX(-30px); }
      to   { transform: translateX(30px); }
    }
    .grape-clusters {
      animation: clusterSway 6s ease-in-out infinite;
      transform-origin: 200px 350px;
    }
    @keyframes clusterSway {
      0%, 100% { transform: rotate(-1.5deg); }
      50%       { transform: rotate(1.5deg); }
    }
    .vine-leaves {
      animation: leafRustle 8s ease-in-out infinite;
      transform-origin: 200px 340px;
    }
    @keyframes leafRustle {
      0%, 100% { transform: skewX(-1deg); }
      50%       { transform: skewX(1deg); }
    }
  `;
  document.head.appendChild(style);
}

/* ---------------------------------------------
   Boot
   --------------------------------------------- */

injectSvgStyles();
initMode();
