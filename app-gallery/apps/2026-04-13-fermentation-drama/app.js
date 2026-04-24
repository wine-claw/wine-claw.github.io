/* Fermentation Drama — app.js */
(function () {
  'use strict';

  // Day data: narrative arc for 14 days of Shiraz fermentation
  const DAYS = [
    {
      day: 0,
      title: 'Crush',
      wineColor: '#6b2d5b',
      fillLevel: 0.35,
      capHeight: 0,
      bubbleIntensity: 0,
      tempC: 15,
      baume: 13.5,
      co2: 'none',
      badges: ['Baumé 13.5', '15°C', 'SO₂ added'],
      narrative: 'The grapes come in hot off the vine — whole bunches of Shiraz, stems and all, thundering onto the sorting table. Hands reach in, pulling out leaves and MOG, and then the crusher does its work. The must pours into the fermenter, a torrent of dark purple juice and fractured skins, seeds glinting like tiny teeth.',
      narrative2: 'Sulphur goes in — just enough to knock back the wild things lurking on the skins. Someone checks the Baumé. Thirteen-five. Perfect. The tank sits there, still and sweet, and you think: this is the quietest it will ever be.',
      wmNote: 'SO₂ at crush suppresses wild microbes and protects against oxidation. Typical dose: 30–50 mg/L depending on fruit condition. pH and temperature are your starting reference points.',
      dramatic: null,
    },
    {
      day: 1,
      title: 'Lag Phase',
      wineColor: '#6e2f5a',
      fillLevel: 0.38,
      capHeight: 0.02,
      bubbleIntensity: 0,
      tempC: 16,
      baume: 13.5,
      co2: 'faint',
      badges: ['Baumé 13.5', '16°C', 'Yeast pitched'],
      narrative: 'Nothing. You stand at the tank and stare, and the must stares back — flat, sweet, inert. The yeast has been pitched. Millions of cells per millilitre, and every single one of them is sitting there saying: give me a minute.',
      narrative2: 'This is the lag phase. The yeast is building its toolkit — synthesising membrane components, stockpiling sterols, reading the sugar landscape before it eats. It looks like nothing is happening. It looks like failure. It isn\'t.',
      wmNote: 'Lag phase typically lasts 12–48 hours. The yeast builds cell membranes and adapts to the must environment. Longer lag phases can occur with cold musts, high SO₂, or nutrient-poor juice.',
      dramatic: null,
    },
    {
      day: 2,
      title: 'First Bubbles',
      wineColor: '#71305a',
      fillLevel: 0.42,
      capHeight: 0.05,
      bubbleIntensity: 0.15,
      tempC: 18,
      baume: 13.0,
      co2: 'light',
      badges: ['Baumé 13.0', '18°C', 'CO₂ rising'],
      narrative: 'There — did you see it? A single bubble, breaking the surface. Then another. The cap of skins at the top shifts, just slightly, lifted by gas from below. The tank is breathing now, shallow and tentative, like something waking from anaesthesia.',
      narrative2: 'The CO₂ has started. It\'s faint — you can\'t hear it yet, but you can see it in the way the surface moves. The yeast has found its footing. Sugar is being consumed. By tonight, there will be no mistaking it.',
      wmNote: 'Early fermentation produces minimal CO₂. Cap begins to lift as gas nucleates on skins. A rising temperature confirms active metabolism.',
      dramatic: null,
    },
    {
      day: 3,
      title: 'Taking Off',
      wineColor: '#7a3356',
      fillLevel: 0.48,
      capHeight: 0.12,
      bubbleIntensity: 0.35,
      tempC: 23,
      baume: 10.5,
      co2: 'moderate',
      badges: ['Baumé 10.5', '23°C', 'Pump-over started'],
      narrative: 'Now. Now it\'s alive. The surface is roiling — bubbles breaking everywhere, skins churning, the whole cap riding a cushion of gas like a lid that won\'t stay down. You can hear it from three metres away: a low, wet rumble, like a pot about to boil over.',
      narrative2: 'The pump-over starts tonight. Wine drawn from the bottom valve, sprayed over the cap to keep it wet, to keep extracting colour and tannin from those skins. It\'s violent and necessary. The first pump-over always smells incredible — fresh, bright, alive.',
      wmNote: 'Pump-overs (remontage) wet the cap and extract colour/tannin. Typically 1–3 per day during active ferment. Fermentation temperature is managed via cooling jackets or plates; target 25–30°C for Shiraz.',
      dramatic: '🔥 The tank comes alive.',
    },
    {
      day: 4,
      title: 'The Frenzy',
      wineColor: '#82354f',
      fillLevel: 0.58,
      capHeight: 0.2,
      bubbleIntensity: 0.7,
      tempC: 29,
      baume: 8.5,
      co2: 'strong',
      badges: ['Baumé 8.5', '29°C', 'Peak activity'],
      narrative: 'This is the heart of it. The tank is a furnace — not metaphorically. You can feel the heat radiating off the steel. Inside, the yeast is converting sugar to ethanol and CO₂ so fast that the cap is a frothing, heaving mass. The temperature is at twenty-nine and climbing. If someone doesn\'t turn the cooling on, it\'ll keep going.',
      narrative2: 'The smell is everywhere. You walk into the cellar and it hits you: sweet, yeasty, slightly sharp, with the warm fruit intensity of a thousand tonnes of grapes in mid-transformation. The colour extraction is happening fastest right now — every minute those skins are in contact, more anthocyanins, more tannin, more of what makes red wine red.',
      wmNote: 'Peak fermentation: yeast population peaks at ~10⁷–10⁸ cells/mL. Temperature management is critical — above 32°C risks yeast stress and stuck ferments. Baumé typically drops 2–3° per day at peak.',
      dramatic: '⚡ Peak fermentation — hold on.',
    },
    {
      day: 5,
      title: 'Still Fierce',
      wineColor: '#8a374a',
      fillLevel: 0.62,
      capHeight: 0.22,
      bubbleIntensity: 0.6,
      tempC: 28,
      baume: 5.5,
      co2: 'strong',
      badges: ['Baumé 5.5', '28°C', 'Cap thick'],
      narrative: 'Still roaring, but the character has shifted. Yesterday was wild — today is managed fury. The cooling is on, the pump-overs are clockwork, and the cap rides high and dense, a thick mat of skins held up by the sheer volume of gas beneath it.',
      narrative2: 'You push your hand into the cap and it\'s warm, almost hot, and dense like a sponge. The colour of the wine below has deepened dramatically — no longer purple but a dark, dark red that looks almost black at the bottom of the tank. Tannin extraction is accelerating. This is where structure is being built.',
      wmNote: 'Mid-ferment cap management is crucial for colour stability and tannin integration. Punching down (pigeage) as an alternative to pump-over provides more mechanical extraction.',
      dramatic: null,
    },
    {
      day: 6,
      title: 'Slowing Down',
      wineColor: '#7e3040',
      fillLevel: 0.6,
      capHeight: 0.18,
      bubbleIntensity: 0.4,
      tempC: 25,
      baume: 4.0,
      co2: 'moderate',
      badges: ['Baumé 4.0', '25°C', 'Activity easing'],
      narrative: 'Something has changed. The surface is still moving, but the fury is gone. Bubbles come in bursts now, not a continuous roar. The cap is starting to settle — still floating, but lower, less buoyant, as less gas pushes up from below.',
      narrative2: 'You can taste the shift. The wine is less sweet each time you check. The sugar is nearly gone, and what replaces it is something raw and young — harsh tannin, bright acid, and that unmistakable warmth of alcohol that wasn\'t there a week ago.',
      wmNote: 'As sugar depletes, fermentation rate drops. Baumé around 4 means roughly 70% of sugar has been consumed. Cap begins to lose buoyancy as CO₂ production slows.',
      dramatic: null,
    },
    {
      day: 7,
      title: 'The Twilight',
      wineColor: '#6e2a38',
      fillLevel: 0.55,
      capHeight: 0.12,
      bubbleIntensity: 0.2,
      tempC: 22,
      baume: 2.0,
      co2: 'light',
      badges: ['Baumé 2.0', '22°C', 'Nearly dry'],
      narrative: 'Bittersweet. The tank is quieting. What was a battlefield of chemistry is settling into something almost gentle. A few bubbles still rise. The cap has sunk to a loose raft, barely afloat. The yeast are dying now — poisoned by the very alcohol they created, their job almost done.',
      narrative2: 'This is the twilight. There\'s just enough sugar left that you can\'t call it finished, but not enough to sustain the frenzy. You start thinking about pressing — about getting the wine off those skins before the tannin extraction goes too far.',
      wmNote: 'Near-dry ferment: Baumé ~2 corresponds to roughly 4 g/L residual sugar. Press timing affects final tannin levels. Extended maceration (leaving skins in longer) increases extraction but risks astringency.',
      dramatic: '🌙 The end is near.',
    },
    {
      day: 8,
      title: 'Dry',
      wineColor: '#5e2430',
      fillLevel: 0.5,
      capHeight: 0.06,
      bubbleIntensity: 0.08,
      tempC: 20,
      baume: 0.5,
      co2: 'faint',
      badges: ['Baumé 0.5', '20°C', 'Essentially dry'],
      narrative: 'Nearly there. The hydrometer barely moves. The cap has collapsed entirely — a sodden layer of exhausted skins sitting on top of what is, for the first time, recognisably wine. Not finished wine. Not good wine, yet. But wine.',
      narrative2: 'This is the winemaker\'s pivotal moment. Press now, and the wine will be elegant, the tannins in check. Leave it another day on skins and you\'ll get more structure, more colour stability, more extraction — but also more risk. Every vintage, this is the call.',
      wmNote: 'Baumé <1 indicates ferment is essentially dry (<2 g/L RS). The decision to press is one of the most influential choices in red winemaking. Free-run juice is typically lighter and more refined; press fraction is darker, more tannic.',
      dramatic: '⚖️ The winemaker\'s call.',
    },
    {
      day: 9,
      title: 'Pressing Day',
      wineColor: '#4a1e28',
      fillLevel: 0.45,
      capHeight: 0,
      bubbleIntensity: 0,
      tempC: 18,
      baume: 0,
      co2: 'none',
      badges: ['Free-run drained', 'Press fraction', 'Separation'],
      narrative: 'The free-run valve opens and wine pours out — dark, young, tannic, alive. This is the gentle fraction, the wine that flowed freely from the tank without force. It\'s already clearer than anything you\'ve seen in the last nine days.',
      narrative2: 'Then the press. The skins, seeds, and whatever debris remain are shoveled or pumped into the basket, and hydraulic pressure squeezes out the last of what they\'re holding. The press wine is a different animal — darker, rougher, more tannic, tasting of the edges of things. It\'ll be blended back later, in smaller proportions, for structure.',
      wmNote: 'Free-run typically represents 60–70% of volume. Press wine adds colour, tannin, and body but is kept separate initially. Press pressure and number of pressings affect press wine quality — gentle pressing preserves quality.',
      dramatic: '🍷 Separation — juice from skins.',
    },
    {
      day: 10,
      title: 'Settling',
      wineColor: '#3e1a24',
      fillLevel: 0.5,
      capHeight: 0,
      bubbleIntensity: 0,
      tempC: 17,
      baume: 0,
      co2: 'none',
      badges: ['Settling', 'Lees falling', 'Quiet'],
      narrative: 'After the violence of fermentation, the stillness is almost unsettling. The wine sits in its new tank — quiet, dark, and cloudy. Suspended solids are beginning their long, slow fall. Dead yeast cells, skin fragments, tartrate crystals — all drifting downward like snow.',
      narrative2: 'This is the in-between. Fermentation is over but the wine isn\'t ready. It\'s raw, it\'s cloudy, and it tastes like a construction site — all scaffolding and no building. But underneath the roughness, something is starting to integrate. The tannins are beginning to bind. The acid is finding its place.',
      wmNote: 'Gross lees (heavy sediment) settle in 1–2 weeks. Racking off lees prevents reduction (hydrogen sulphide) faults. Malolactic bacteria may be inoculated now or allowed to start spontaneously.',
      dramatic: null,
    },
    {
      day: 11,
      title: 'MLF Begins',
      wineColor: '#3a1822',
      fillLevel: 0.5,
      capHeight: 0,
      bubbleIntensity: 0.05,
      tempC: 19,
      baume: 0,
      co2: 'faint',
      badges: ['MLF starting', 'Acid softening', 'Second ferment'],
      narrative: 'A second, quieter transformation begins. If the first fermentation was a thunderstorm, malolactic is a long, slow rain. The sharp malic acid — the same acid that makes green apples tart — is being converted to lactic acid, which is softer, rounder, milkier.',
      narrative2: 'You can see it if you look closely: tiny, almost imperceptible bubbles clinging to the sides of the tank. The wine loses that bright, hard edge and starts to feel suppler on the palate. It\'s subtle. If you weren\'t paying attention, you\'d miss it entirely.',
      wmNote: 'Malolactic fermentation (MLF) converts malic acid to lactic acid, reducing total acidity and adding complexity. Can occur spontaneously or be inoculated. Optimal temperature: 18–22°C. Produces CO₂ (the faint bubbles).',
      dramatic: null,
    },
    {
      day: 12,
      title: 'MLF Continues',
      wineColor: '#381820',
      fillLevel: 0.5,
      capHeight: 0,
      bubbleIntensity: 0.04,
      tempC: 19,
      baume: 0,
      co2: 'faint',
      badges: ['MLF active', 'Softer palate', 'Diacetyl possible'],
      narrative: 'The wine tastes different every day now. Yesterday it was sharp and angular; today there\'s a roundness creeping in at the edges, like a river smoothing a stone. The malolactic is in full swing, and with it comes a faint buttery note — diacetyl — that some winemakers embrace and others suppress.',
      narrative2: 'This is patience work. You can\'t rush malolactic. You keep the tank warm, you keep the sulphur off, and you wait. The bacteria work on their own schedule.',
      wmNote: 'Diacetyl (buttery character) is a byproduct of MLF. It can be consumed by bacteria if MLF runs to completion. Winemakers can choose to stop MLF early for more buttery character or let it finish for cleaner fruit expression.',
      dramatic: null,
    },
    {
      day: 13,
      title: 'Resting',
      wineColor: '#361820',
      fillLevel: 0.5,
      capHeight: 0,
      bubbleIntensity: 0,
      tempC: 16,
      baume: 0,
      co2: 'none',
      badges: ['Resting', 'Clarifying', 'Fine lees'],
      narrative: 'The wine is resting on its fine lees — a thin layer of dead yeast and sediment at the bottom of the tank. In the old days, they\'d rack it off immediately, get it away from the lees. But modern winemaking knows better. Time on lees adds texture, complexity, a certain creaminess that you can\'t get any other way.',
      narrative2: 'The wine is clarifying. What was opaque and murky is becoming translucent. You can see light through a glass of it now — deep ruby, almost garnet at the edges. For the first time, it looks like wine and not like a accident.',
      wmNote: 'Sur lie (on lees) ageing can add mid-palate weight and complexity. Batonnage (lees stirring) increases this effect. Fine lees also provide reductive protection against oxidation.',
      dramatic: null,
    },
    {
      day: 14,
      title: 'New Wine',
      wineColor: '#321620',
      fillLevel: 0.5,
      capHeight: 0,
      bubbleIntensity: 0,
      tempC: 15,
      baume: 0,
      co2: 'none',
      badges: ['Racked', 'Young wine', 'Tasting'],
      narrative: 'The young wine is racked — transferred off the lees into a clean tank. It\'s bright now, or at least brighter. You pour a glass and hold it up to the light. Deep crimson. The nose is young — fresh, grapey, with the fierce tannin grip of something that hasn\'t learned to be gentle yet.',
      narrative2: 'You taste it. It\'s not good, not yet. It\'s harsh and angular and unfinished, like a rough-cut stone. But — and this is the thing — you can already taste what it will become. There\'s fruit underneath the tannin. There\'s structure underneath the chaos. The wine is there. It just needs time.',
      wmNote: 'New wine after primary ferment and MLF is typically racked, SO₂ adjusted, and may be transferred to oak or left in stainless steel for ageing. The real transformation happens over months to years.',
      dramatic: '🥂 What was grapes is now wine.',
    },
  ];

  const container = document.getElementById('scenes-container');

  // Build scene HTML
  function buildScene(d, i) {
    const noteId = 'wm-' + d.day;
    const hasNote = d.wmNote;
    const bubbles = d.bubbleIntensity > 0 ? buildBubbles(d.bubbleIntensity) : '';
    const dramatic = d.dramatic
      ? `<div class="dramatic-callout">${d.dramatic}</div>`
      : '';

    return `
    <section class="scene day-scene" id="scene-day-${d.day}" data-day="${d.day}" style="--wine-scene-color: ${d.wineColor}">
      <div class="scene-inner">
        <div class="day-label">Day ${d.day}</div>
        <h2 class="day-title">${d.title}</h2>
        ${buildTank(d)}
        <div class="data-badges">${d.badges.map(b => `<span class="data-badge">${b}</span>`).join('')}</div>
        ${dramatic}
        <p class="narrative">${d.narrative}</p>
        <p class="narrative">${d.narrative2}</p>
        ${hasNote ? `<button class="wm-toggle" aria-expanded="false" aria-controls="${noteId}" onclick="toggleNote('${noteId}', this)">Winemaker\'s Note ▸</button><div class="wm-note" id="${noteId}">${d.wmNote}</div>` : ''}
      </div>
      ${bubbles}
    </section>`;
  }

  // Build tank SVG for a day
  function buildTank(d) {
    const fillPct = d.fillLevel * 100;
    const capPct = d.capHeight * 100;
    const wineColor = d.wineColor;
    // Temperature as a 0-1 value (15-30 range)
    const tempFrac = Math.min(1, Math.max(0, (d.tempC - 14) / 18));
    // Baumé as fraction of max
    const baumeFrac = Math.min(1, d.baume / 14);

    return `<div class="tank-container">
      <svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
        <!-- Tank body -->
        <rect x="30" y="10" width="140" height="210" rx="10" ry="10" fill="#2a1a22" stroke="#4a2a35" stroke-width="2"/>
        <!-- Wine fill -->
        <rect x="32" y="${220 - fillPct * 2}" width="136" height="${fillPct * 2 - 12}" rx="2" fill="${wineColor}" opacity="0.85">
          ${d.bubbleIntensity > 0 ? '<animate attributeName="opacity" values="0.85;0.92;0.85" dur="2s" repeatCount="indefinite"/>' : ''}
        </rect>
        ${capPct > 0 ? `<!-- Cap -->
        <rect x="32" y="${220 - fillPct * 2 - capPct * 2}" width="136" height="${capPct * 2}" rx="2" fill="#5a3040" opacity="0.7">
          <animate attributeName="opacity" values="0.7;0.85;0.7" dur="3s" repeatCount="indefinite"/>
        </rect>` : ''}
        <!-- Temperature gauge (left side) -->
        <rect x="10" y="30" width="8" height="170" rx="4" fill="#1a1118" stroke="#4a2a35" stroke-width="1"/>
        <rect x="11" y="${200 - tempFrac * 160}" width="6" height="${tempFrac * 160}" rx="3" fill="${tempFrac > 0.6 ? '#e04040' : tempFrac > 0.3 ? '#d4a843' : '#6aaa6a'}" opacity="0.9">
          ${d.bubbleIntensity > 0.2 ? '<animate attributeName="height" values="' + Math.round(tempFrac * 160) + ';' + Math.round(tempFrac * 160 + 4) + ';' + Math.round(tempFrac * 160) + '" dur="2s" repeatCount="indefinite"/>' : ''}
        </rect>
        <text x="14" y="24" font-size="7" fill="#a89a96" text-anchor="middle" font-family="sans-serif">°C</text>
        <!-- Baumé gauge (right side) -->
        <rect x="182" y="30" width="8" height="170" rx="4" fill="#1a1118" stroke="#4a2a35" stroke-width="1"/>
        <rect x="183" y="${200 - baumeFrac * 160}" width="6" height="${baumeFrac * 160}" rx="3" fill="#8b6d4a" opacity="0.9"/>
        <text x="186" y="24" font-size="7" fill="#a89a96" text-anchor="middle" font-family="sans-serif">Bé</text>
        <!-- Valve -->
        <circle cx="100" cy="220" r="6" fill="#4a2a35" stroke="#6a4a55" stroke-width="1"/>
        ${d.co2 === 'strong' ? '<text x="100" y="8" font-size="9" fill="#a89a96" text-anchor="middle" font-family="sans-serif">💨 CO₂</text>' : d.co2 === 'moderate' ? '<text x="100" y="8" font-size="8" fill="#a89a9680" text-anchor="middle" font-family="sans-serif">CO₂ ↑</text>' : ''}
      </svg>
    </div>`;
  }

  // Build bubble elements
  function buildBubbles(intensity) {
    const count = Math.round(intensity * 20);
    let html = '';
    for (let i = 0; i < count; i++) {
      const left = 20 + Math.random() * 60;
      const size = 3 + Math.random() * 6;
      const dur = 2 + Math.random() * 3;
      const delay = Math.random() * 3;
      html += `<div class="bubble" style="left:${left}%;bottom:${10 + Math.random() * 30}%;width:${size}px;height:${size}px;animation-duration:${dur}s;animation-delay:${delay}s;"></div>`;
    }
    return html;
  }

  // Toggle winemaker's note
  window.toggleNote = function (id, btn) {
    const el = document.getElementById(id);
    const open = el.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    btn.textContent = open ? "Winemaker's Note ▾" : "Winemaker's Note ▸";
  };

  // Build progress dots
  function buildProgressDots() {
    const dotsEl = document.getElementById('progress-dots');
    // Splash + 15 days
    const items = [{ id: 'scene-splash', label: 'Intro' }]
      .concat(DAYS.map(d => ({ id: 'scene-day-' + d.day, label: 'D' + d.day })))
      .concat([{ id: 'scene-end', label: 'End' }]);

    items.forEach(item => {
      const dot = document.createElement('button');
      dot.className = 'progress-dot';
      dot.setAttribute('aria-label', item.label);
      dot.dataset.target = item.id;
      dot.addEventListener('click', () => {
        document.getElementById(item.id).scrollIntoView({ behavior: 'smooth' });
      });
      dotsEl.appendChild(dot);
    });
  }

  // Intersection observer for fade-in and progress
  function setupObservers() {
    const scenes = document.querySelectorAll('.scene');
    const dots = document.querySelectorAll('.progress-dot');

    const sceneObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const inner = entry.target.querySelector('.scene-inner') || entry.target.querySelector('.splash-content') || entry.target.querySelector('.end-content');
        if (inner) {
          if (entry.isIntersecting) {
            inner.classList.add('visible');
          }
        }
        // Update progress dots
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          const idx = Array.from(scenes).indexOf(entry.target);
          dots.forEach((d, i) => d.classList.toggle('active', i === idx));
        }
      });
    }, { threshold: [0.3] });

    scenes.forEach(s => sceneObserver.observe(s));
  }

  // Warning banner dismiss
  document.getElementById('dismiss-banner').addEventListener('click', function () {
    document.getElementById('warning-banner').classList.add('hidden');
  });

  // Init
  function init() {
    DAYS.forEach((d, i) => {
      container.insertAdjacentHTML('beforeend', buildScene(d, i));
    });
    buildProgressDots();
    setupObservers();

    // Make splash visible immediately
    setTimeout(() => {
      const splashContent = document.querySelector('.splash-content');
      if (splashContent) splashContent.classList.add('visible');
    }, 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();