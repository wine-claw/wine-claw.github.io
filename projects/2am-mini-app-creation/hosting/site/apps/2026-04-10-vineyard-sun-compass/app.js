/* ============================================================
   Vineyard Sun Compass — app.js
   Qualitative vineyard row / sun exposure visualiser
   No frameworks, no network calls, no build step
   ============================================================ */

(function () {
  'use strict';

  // ── Canvas ────────────────────────────────────────────────
  const canvas = document.getElementById('sunCanvas');
  const ctx    = canvas.getContext('2d');
  const W = 600, H = 600;
  canvas.width  = W;
  canvas.height = H;

  // ── App state ─────────────────────────────────────────────
  const S = {
    rowOrientation:  0,
    hemisphere:      'S',
    slopeAngle:      0,
    slopeDirection:  0,
    canopySystem:    'vsp',
    canopyDensity:   3,
    heatwave:        0,
    timePercent:     40,
    activePreset:    null,
  };

  // ── Presets ──────────────────────────────────────────────
  const PRESETS = {
    barossa: {
      rowOrientation: 15,  hemisphere: 'S',
      slopeAngle: 3,     slopeDirection: 0,
      canopySystem: 'vsp', canopyDensity: 2,
      heatwave: 3,        timePercent: 60,
    },
    morning: {
      rowOrientation: 135, hemisphere: 'S',
      slopeAngle: 18,     slopeDirection: 135,
      canopySystem: 'sprawl', canopyDensity: 4,
      heatwave: 0,        timePercent: 20,
    },
    'ns-vsp': {
      rowOrientation: 5,  hemisphere: 'S',
      slopeAngle: 0,      slopeDirection: 0,
      canopySystem: 'vsp', canopyDensity: 2,
      heatwave: 2,        timePercent: 65,
    },
    'ew-alter': {
      rowOrientation: 90,  hemisphere: 'S',
      slopeAngle: 0,      slopeDirection: 0,
      canopySystem: 'scott-henry', canopyDensity: 4,
      heatwave: 1,        timePercent: 45,
    },
    'steep-cool': {
      rowOrientation: 45,  hemisphere: 'S',
      slopeAngle: 35,     slopeDirection: 45,
      canopySystem: 'geneva', canopyDensity: 5,
      heatwave: 0,        timePercent: 30,
    },
    'flat-mid': {
      rowOrientation: 0,   hemisphere: 'S',
      slopeAngle: 0,      slopeDirection: 0,
      canopySystem: 'guyot', canopyDensity: 3,
      heatwave: 1,        timePercent: 40,
    },
  };

  // ── Helpers ───────────────────────────────────────────────

  /** timePercent 0-100 → "H:MM AM/PM" */
  function timePercentToClock(pct) {
    const totalMin = 6 * 60 + (pct / 100) * 15 * 60;
    const h = Math.floor(totalMin / 60);
    const m = Math.floor(totalMin % 60);
    const ampm = h < 12 ? 'AM' : 'PM';
    const h12  = h === 0 ? 12 : h > 12 ? h - 12 : h;
    return `${h12}:${m.toString().padStart(2, '0')} ${ampm}`;
  }

  /** Bell-curve daylight fraction peaking at midday */
  function dayFraction(pct) {
    const x = (pct - 50) / 50;
    return Math.exp(-3.5 * x * x);
  }

  /**
   * Simplified sun position.
   * azimuth: 0=North, 90=East, 180=South, 270=West
   * elevation: 0=horizon … ~70=zenith (illustrative peak)
   */
  function sunPosition(timePercent, hemisphere, slopeAngle, slopeDirection) {
    const arcCenter = hemisphere === 'S' ? 0 : 180;
    const dayFrac   = dayFraction(timePercent);
    const elevation = 68 * dayFrac;

    const t = timePercent / 100;
    let azDeg;
    if (t < 0.5) {
      azDeg = 80 + (arcCenter - 80) * (t / 0.5);
    } else {
      azDeg = arcCenter + (280 - arcCenter) * ((t - 0.5) / 0.5);
    }

    if (slopeAngle > 5 && slopeDirection > 0) {
      azDeg -= slopeDirection * (slopeAngle / 90) * 0.28;
    }

    return { azimuth: ((azDeg % 360) + 360) % 360, elevation };
  }

  /**
   * Which side of the row is the sun's direct face.
   * rowOrient: row bearing (0=N, 90=E, 180=S, 270=W)
   * sunAz: sun azimuth
   * Returns: 'W' | 'E' | 'top'
   */
  function rowSideLit(rowOrient, sunAz) {
    const rowNormal = (rowOrient + 90) % 360;
    const diff = ((sunAz - rowNormal + 540) % 360) - 180;
    if (Math.abs(diff) < 42) return 'top';
    return diff > 0 ? 'W' : 'E';
  }

  // ── Exposure scores (0-100) ──────────────────────────────

  function afternoonScore(s) {
    const isAfternoon = s.timePercent > 45;
    if (!isAfternoon) return 10;

    const isNS = s.rowOrientation < 30 || s.rowOrientation > 150;
    const isNE = s.rowOrientation >= 30 && s.rowOrientation < 60;
    const isNW = s.rowOrientation >= 120 && s.rowOrientation < 150;
    const isEW = s.rowOrientation >= 60 && s.rowOrientation <= 120;

    const timeF   = Math.min((s.timePercent - 45) / 55, 1) * 40;
    const oriF   = isNS ? 30 : isNE ? 20 : isNW ? 15 : isEW ? 8 : 20;
    const canopyF = (6 - s.canopyDensity) * 4;
    const heatMult = 1 + s.heatwave * 0.25;

    return Math.min(100, Math.round((timeF + oriF + canopyF) * heatMult));
  }

  function morningScore(s) {
    const isMorning = s.timePercent > 8 && s.timePercent < 55;
    let score = 22;
    if (isMorning) score += 28;
    const isEW = s.rowOrientation >= 60 && s.rowOrientation <= 120;
    if (isEW) score += 18;
    const isNS = s.rowOrientation < 30 || s.rowOrientation > 150;
    if (isNS) score += 10;
    score += (6 - s.canopyDensity) * 3;
    score -= s.heatwave * 5;
    return Math.min(100, Math.max(0, Math.round(score)));
  }

  function sunburnScore(s) {
    const isAfternoon = s.timePercent > 45;
    const isNS = s.rowOrientation < 30 || s.rowOrientation > 150;
    let score = 22;
    score += (6 - s.canopyDensity) * 8;
    score += s.heatwave * 10;
    if (isAfternoon) score += 14;
    if (isNS && isAfternoon) score += 14;
    if (s.canopySystem === 'vsp') score += 10;
    if (['geneva', 'scott-henry', 'lyre'].includes(s.canopySystem)) score -= 8;
    return Math.min(100, Math.max(0, Math.round(score)));
  }

  function heatScore(s) {
    let score = 8;
    score += s.heatwave * 20;
    if (s.timePercent > 45) score += 14;
    if (s.canopyDensity >= 4) score -= 12;
    if (s.slopeAngle > 20) score += 10;
    return Math.min(100, Math.max(0, Math.round(score)));
  }

  function shadeScore(s) {
    return Math.min(100, Math.round(s.canopyDensity * 16 + (s.timePercent > 50 ? 10 : 0)));
  }

  // ── Interpretation text ───────────────────────────────────

  const AFTERNOON_LABELS = [
    'West side is in morning shade — slow warm-up, lower afternoon risk.',
    'West side gets moderate afternoon sun. Manage west-facing leaf exposure carefully.',
    'West-side clusters face significant afternoon radiation. Direct sunburn risk is elevated.',
    'West side is fully exposed to harsh afternoon sun. Heat accumulation on fruit is high.',
    'West side under extreme afternoon load. Cluster scorch and dehydration risk are serious.',
  ];
  const MORNING_LABELS = [
    'Morning is quiet — east side sees little direct sun at this orientation.',
    'East side gets gentle morning sun — good for slow, even ripening.',
    'Morning sun is warming the east side well. Even ripening conditions look favourable.',
    'Bright morning on the east side — fruit should see good initial sugar development.',
    'Intense morning sun on east side. Watch for premature sugar before phenolics catch up.',
  ];
  const SUNBURN_LABELS = [
    'Low sunburn risk. Dense canopy and mild conditions are kind to exposed fruit.',
    'Moderate sunburn pressure. Most clusters are reasonably protected.',
    'VSP canopy leaves clusters relatively exposed. Some afternoon direct radiation reaches fruit zone.',
    'Significant sunburn pressure. Open canopy, afternoon sun, and heatwave conditions all contribute.',
    'Extreme sunburn risk. Open canopy + severe heatwave = high cluster exposure. Act now.',
  ];
  const HEAT_LABELS = [
    'No heatwave active. Ambient temperatures — vine should cope well with current conditions.',
    'Mild heat stress possible during peak afternoon. Vine should recover overnight.',
    'Moderate heat stress likely in the afternoon. Monitor fruit zone temperature closely.',
    'Severe heat stress probable. Consider emergency shade cloth or overhead irrigation.',
    'Extreme heat. Stomata likely closing by early afternoon. Shade is the primary mitigation.',
  ];

  function label(idx, arr) {
    return arr[Math.min(Math.floor(idx / 22), arr.length - 1)];
  }

  function generateTip(s, aScore) {
    const tips = [];
    const isNS = s.rowOrientation < 30 || s.rowOrientation > 150;
    const isAfternoon = s.timePercent > 45;

    if (isNS && isAfternoon && aScore > 60) {
      tips.push('West-side clusters are copping the full afternoon radiation. Consider targeted leaf removal on the east side only — removing west leaves in this setup invites sunburn.');
    } else if (isNS && isAfternoon) {
      tips.push('N-S rows in afternoon sun — partial west-side leaf removal or shade cloth on the west fence line can reduce peak heat load on clusters.');
    }
    if (s.canopySystem === 'vsp' && s.canopyDensity <= 2 && s.heatwave >= 2) {
      tips.push('Your open VSP is leaving clusters very exposed during a heatwave. Kaolin clay reflectant or mobile shade structures may be worth exploring.');
    }
    if (s.canopyDensity >= 4) {
      tips.push('Dense canopy is providing good shade buffer — but watch for inadequate air flow and uneven ripening in heavily shaded fruit zones.');
    }
    if (s.slopeAngle > 15 && s.slopeDirection > 0) {
      tips.push('Your slope is adding directional bias. South-facing slopes (S hemisphere) amplify afternoon heat significantly.');
    }
    if (s.heatwave >= 3) {
      tips.push('Severe heatwave conditions — vine stomata may be closing by early afternoon. Shade cloth is the most practical immediate option.');
    }
    if (tips.length === 0) {
      tips.push('Current setup shows moderate exposure. Monitor fruit zone temperature and look for whitening or scorch on exposed clusters as the season progresses.');
    }
    return tips[0];
  }

  // ── Drawing ─────────────────────────────────────────────

  function drawSky() {
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0,    '#0d47a1');
    g.addColorStop(0.32, '#1565c0');
    g.addColorStop(0.60, '#42a5f5');
    g.addColorStop(0.82, '#90caf9');
    g.addColorStop(1,    '#fff9c4');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // Wispy clouds
    ctx.save();
    ctx.globalAlpha = 0.07;
    ctx.fillStyle = '#fff';
    [[80, 55], [200, 35], [380, 60], [500, 28]].forEach(([cx, cy]) => {
      ctx.beginPath();
      ctx.ellipse(cx, cy, 70, 16, 0, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
  }

  function drawLandscape() {
    const horizon = H * 0.63;

    // Distant hills
    ctx.fillStyle = '#81c784';
    ctx.beginPath();
    ctx.moveTo(0, horizon);
    ctx.bezierCurveTo(80, horizon - 28, 160, horizon - 52, 250, horizon - 22);
    ctx.bezierCurveTo(340, horizon + 6, 420, horizon - 42, 510, horizon - 18);
    ctx.bezierCurveTo(565, horizon - 4, 590, horizon - 28, W, horizon - 10);
    ctx.lineTo(W, horizon);
    ctx.closePath();
    ctx.fill();

    // Mid-ground earth
    ctx.fillStyle = '#795548';
    ctx.beginPath();
    ctx.moveTo(0, horizon + 14);
    ctx.bezierCurveTo(110, horizon - 4, 210, horizon + 10, 310, horizon - 2);
    ctx.bezierCurveTo(430, horizon + 12, 530, horizon - 6, W, horizon + 6);
    ctx.lineTo(W, horizon + 55);
    ctx.lineTo(0, horizon + 55);
    ctx.closePath();
    ctx.fill();

    // Furrow lines
    ctx.save();
    ctx.globalAlpha = 0.18;
    ctx.strokeStyle = '#4e342e';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 8; i++) {
      const fy = horizon + 18 + i * 5;
      ctx.beginPath();
      ctx.moveTo(0, fy);
      ctx.lineTo(W, fy);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawVineyardRows(s, litSide) {
    ctx.save();
    ctx.translate(W / 2, H * 0.70);
    ctx.rotate((s.rowOrientation * Math.PI) / 180);

    const ROW_W   = 210;
    const ROW_H   = 8;
    const ROW_GAP = 18;
    const NUM     = 7;

    for (let i = -NUM; i <= NUM; i++) {
      const ry = i * (ROW_H + ROW_GAP);
      const isCenter = i === 0;

      // Ground shadow
      ctx.fillStyle = 'rgba(0,0,0,0.18)';
      ctx.beginPath();
      ctx.ellipse(5, ry + ROW_H / 2 + 4, ROW_W / 2 - 12, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Soil strip
      const soilG = ctx.createLinearGradient(-ROW_W / 2, ry, -ROW_W / 2, ry + ROW_H);
      soilG.addColorStop(0, '#6d4c41');
      soilG.addColorStop(1, '#3e2723');
      ctx.fillStyle = soilG;
      ctx.beginPath();
      ctx.roundRect(-ROW_W / 2, ry, ROW_W, ROW_H, 3);
      ctx.fill();

      // Posts
      ctx.fillStyle = '#5d4037';
      [-85, 0, 85].forEach(px => {
        ctx.fillRect(px - 2, ry - 24, 4, 26);
        ctx.fillStyle = '#8d6e63';
        ctx.beginPath();
        ctx.arc(px, ry - 24, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#5d4037';
      });

      // Trellis wires
      ctx.strokeStyle = '#a1887f';
      ctx.lineWidth = 1;
      [-12, -20].forEach(wy => {
        ctx.beginPath();
        ctx.moveTo(-ROW_W / 2, ry + wy);
        ctx.lineTo(ROW_W / 2, ry + wy);
        ctx.stroke();
      });

      // Canopy blobs
      const cH = 20 + s.canopyDensity * 5;
      const cTop = ry - 20 - cH;
      const greenA = s.canopyDensity >= 4 ? '#2e7d32' : s.canopyDensity >= 2 ? '#558b2f' : '#7cb342';
      const greenB = s.canopyDensity >= 4 ? '#1b5e20' : s.canopyDensity >= 2 ? '#33691e' : '#558b2f';

      [-ROW_W / 4, ROW_W / 4].forEach((cx, side) => {
        const g = ctx.createLinearGradient(cx, cTop, cx, ry - 12);
        g.addColorStop(0, greenA);
        g.addColorStop(1, greenB);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.ellipse(cx, cTop + cH / 2, ROW_W / 4.8, cH / 2, 0, 0, Math.PI * 2);
        ctx.fill();
      });

      // Lit-side highlight on center row
      if (isCenter && litSide !== 'top') {
        const litG = ctx.createLinearGradient(-ROW_W / 2, cTop, ROW_W / 2, cTop);
        if (litSide === 'W') {
          litG.addColorStop(0,   'rgba(255,190,30,0)');
          litG.addColorStop(0.4, 'rgba(255,190,30,0)');
          litG.addColorStop(0.58,'rgba(255,190,30,0.22)');
          litG.addColorStop(1,   'rgba(255,140,0,0.38)');
        } else {
          litG.addColorStop(0,   'rgba(255,140,0,0.38)');
          litG.addColorStop(0.42,'rgba(255,190,30,0.22)');
          litG.addColorStop(0.6, 'rgba(255,190,30,0)');
          litG.addColorStop(1,   'rgba(255,190,30,0)');
        }
        ctx.fillStyle = litG;
        ctx.fillRect(-ROW_W / 2, cTop - 3, ROW_W, cH + 6);
      }
    }

    ctx.restore();
  }

  function drawSunPath(s, sunPos) {
    const cx = W / 2;
    const horizon = H * 0.63;
    const cy = horizon;
    const arcRx = W * 0.40;
    const arcRy = H * 0.46;

    ctx.save();

    // Dashed arc
    ctx.strokeStyle = 'rgba(255,235,59,0.28)';
    ctx.lineWidth = 2.5;
    ctx.setLineDash([9, 7]);
    ctx.beginPath();
    ctx.ellipse(cx, cy, arcRx, arcRy, 0, Math.PI, 0);
    ctx.stroke();
    ctx.setLineDash([]);

    // Hour ticks
    [0, 20, 40, 60, 80, 100].forEach(pct => {
      const a = Math.PI - (pct / 100) * Math.PI;
      const tx = cx + arcRx * Math.cos(a);
      const ty = cy + arcRy * Math.sin(a);
      ctx.fillStyle = 'rgba(255,255,255,0.38)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${Math.round(6 + (pct / 100) * 15)}h`, tx, ty + 4);
    });

    // Sun glow
    const sunAngle = Math.PI - (s.timePercent / 100) * Math.PI;
    const sunR = arcRx * (1 - (sunPos.elevation / 90) * 0.65);
    const sx = cx + sunR * Math.cos(sunAngle);
    const sy = cy - (H * 0.44) * (sunPos.elevation / 90);

    const glowR = 52;
    const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, glowR);
    glow.addColorStop(0,   'rgba(255,244,80,0.75)');
    glow.addColorStop(0.4, 'rgba(255,195,40,0.28)');
    glow.addColorStop(1,   'rgba(255,140,0,0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(sx, sy, glowR, 0, Math.PI * 2);
    ctx.fill();

    // Sun core
    const coreG = ctx.createRadialGradient(sx - 4, sy - 4, 2, sx, sy, 18);
    coreG.addColorStop(0,   '#ffffff');
    coreG.addColorStop(0.3, '#fff9c4');
    coreG.addColorStop(0.65,'#ffeb3b');
    coreG.addColorStop(1,   '#ff8f00');
    ctx.fillStyle = coreG;
    ctx.beginPath();
    ctx.arc(sx, sy, 18, 0, Math.PI * 2);
    ctx.fill();

    // Heatwave label
    if (s.heatwave >= 2) {
      ctx.fillStyle = 'rgba(220,50,0,0.82)';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('⚠ Heatwave', sx, sy - 30);
    }

    ctx.restore();
  }

  function drawRowLabels(s, litSide) {
    ctx.save();
    ctx.translate(W / 2, H * 0.70);
    ctx.rotate((s.rowOrientation * Math.PI) / 180);

    const labelY = -68 - s.canopyDensity * 5;
    const labelX = W * 0.19;

    function drawSide(text, isLit) {
      if (isLit) {
        ctx.fillStyle = '#f4511e';
        ctx.shadowColor = 'rgba(255,60,0,0.55)';
        ctx.shadowBlur = 7;
      } else {
        ctx.fillStyle = 'rgba(255,255,255,0.48)';
        ctx.shadowBlur = 0;
      }
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(text, labelX, labelY);
      ctx.shadowBlur = 0;
    }

    drawSide('WEST SIDE', litSide === 'W');
    drawSide('EAST SIDE', litSide === 'E');

    // Row bearing
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`Row: ${S.rowOrientation}°`, W * 0.09, 92);

    ctx.restore();
  }

  function drawCompass() {
    const cx = 46, cy = 46, r = 28;
    ctx.save();
    ctx.translate(cx, cy);

    ctx.strokeStyle = 'rgba(255,255,255,0.28)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.stroke();

    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
      const inner = i % 2 === 0 ? r - 8 : r - 4;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * inner, Math.sin(a) * inner);
      ctx.lineTo(Math.cos(a) * r,     Math.sin(a) * r);
      ctx.stroke();
    }

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 9px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('N', 0, -r + 9);
    ctx.fillStyle = 'rgba(255,255,255,0.45)';
    ctx.fillText('S', 0,  r - 8);
    ctx.fillText('E',  r - 8, 0);
    ctx.fillText('W', -r + 8, 0);

    // Sun pointer
    const sunA = Math.PI - (S.timePercent / 100) * Math.PI;
    ctx.fillStyle = '#ffeb3b';
    ctx.beginPath();
    ctx.moveTo(Math.cos(sunA) * (r - 3), Math.sin(sunA) * (r - 3));
    ctx.lineTo(Math.cos(sunA + 0.42) * (r - 13), Math.sin(sunA + 0.42) * (r - 13));
    ctx.lineTo(Math.cos(sunA - 0.42) * (r - 13), Math.sin(sunA - 0.42) * (r - 13));
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  function drawBadges(s) {
    ctx.save();
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'right';

    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.fillText(s.hemisphere === 'S' ? '🌏 Southern Hemisphere' : '🌍 Northern Hemisphere', W - 12, 24);

    if (s.slopeAngle >= 3) {
      const dirs = ['N','NE','E','SE','S','SW','W','NW'];
      const d = dirs[Math.round(s.slopeDirection / 45) % 8];
      ctx.fillStyle = 'rgba(255,255,255,0.72)';
      ctx.fillText(`Slope: ${s.slopeAngle}° → ${d}`, W - 12, 42);
    }

    ctx.restore();
  }

  // ── Main render ─────────────────────────────────────────

  function render() {
    ctx.clearRect(0, 0, W, H);
    drawSky();
    drawLandscape();
    const sunPos = sunPosition(S.timePercent, S.hemisphere, S.slopeAngle, S.slopeDirection);
    const litSide = rowSideLit(S.rowOrientation, sunPos.azimuth);
    drawSunPath(S, sunPos);
    drawVineyardRows(S, litSide);
    drawRowLabels(S, litSide);
    drawCompass();
    drawBadges(S);
  }

  // ── Card update ─────────────────────────────────────────

  function updateCards() {
    const a  = afternoonScore(S);
    const m  = morningScore(S);
    const sb = sunburnScore(S);
    const h  = heatScore(S);
    const sh = shadeScore(S);

    document.getElementById('afternoonText').textContent = label(a, AFTERNOON_LABELS);
    document.getElementById('afternoonFill').style.width = a + '%';

    document.getElementById('morningText').textContent = label(m, MORNING_LABELS);
    document.getElementById('morningFill').style.width = m + '%';

    document.getElementById('sunburnText').textContent = label(sb, SUNBURN_LABELS);
    document.getElementById('sunburnFill').style.width = sb + '%';

    document.getElementById('heatText').textContent = label(h, HEAT_LABELS);
    document.getElementById('heatFill').style.width = h + '%';

    document.getElementById('shadeText').textContent =
      S.canopyDensity >= 4
        ? 'Dense canopy provides strong shade buffer to fruit zone — good heat protection, but watch for uneven ripening.'
        : S.canopyDensity <= 2
        ? 'Open canopy leaves fruit zone quite exposed to direct radiation. Cluster sunburn protection is minimal.'
        : 'Moderate canopy density provides some afternoon shade buffer to fruit zone.';
    document.getElementById('shadeFill').style.width = sh + '%';

    document.getElementById('tipText').textContent = generateTip(S, a);
  }

  function updateSliderDisplays() {
    const dirs = ['N','NE','E','SE','S','SW','W','NW','N'];
    const di = Math.round(S.rowOrientation / 45) % 8;
    document.getElementById('rowVal').textContent = `${dirs[di]} (${S.rowOrientation}°)`;

    const sd = S.slopeAngle;
    document.getElementById('slopeVal').textContent =
      sd === 0 ? 'Flat (0°)' :
      sd <= 5  ? `${sd}° — gentle` :
      sd <= 15 ? `${sd}° — moderate` :
      sd <= 30 ? `${sd}° — steep` :
                 `${sd}° — very steep`;

    const sdir = S.slopeDirection;
    const sdirs = ['N','NE','E','SE','S','SW','W','NW'];
    document.getElementById('slopeDirVal').textContent =
      sd < 3 ? 'No slope' : `${sdir}° (${sdirs[Math.round(sdir / 45) % 8]})`;

    document.getElementById('densityVal').textContent =
      ['Open','Light','Moderate','Dense','Very dense'][S.canopyDensity - 1];

    document.getElementById('heatVal').textContent =
      ['None','Mild','Moderate','Severe','Extreme'][S.heatwave];
  }

  function applyState() {
    render();
    updateSliderDisplays();
    updateCards();
  }

  // ── Event bindings ──────────────────────────────────────

  function bindEvents() {
    const timeSlider    = document.getElementById('timeSlider');
    const rowSlider    = document.getElementById('rowSlider');
    const slopeSlider  = document.getElementById('slopeSlider');
    const slopeDirSlider = document.getElementById('slopeDirSlider');
    const densitySlider = document.getElementById('densitySlider');
    const heatSlider   = document.getElementById('heatSlider');

    timeSlider.addEventListener('input', () => {
      S.timePercent = +timeSlider.value;
      document.getElementById('timeDisplay').textContent = timePercentToClock(S.timePercent);
      applyState();
    });

    rowSlider.addEventListener('input', () => {
      S.rowOrientation = +rowSlider.value;
      clearPresetUI();
      applyState();
    });

    document.getElementById('btnSouth').addEventListener('click', () => {
      S.hemisphere = 'S';
      document.getElementById('btnSouth').setAttribute('aria-pressed', 'true');
      document.getElementById('btnNorth').setAttribute('aria-pressed', 'false');
      clearPresetUI();
      applyState();
    });
    document.getElementById('btnNorth').addEventListener('click', () => {
      S.hemisphere = 'N';
      document.getElementById('btnNorth').setAttribute('aria-pressed', 'true');
      document.getElementById('btnSouth').setAttribute('aria-pressed', 'false');
      clearPresetUI();
      applyState();
    });

    slopeSlider.addEventListener('input', () => {
      S.slopeAngle = +slopeSlider.value;
      slopeDirSlider.disabled = S.slopeAngle < 3;
      if (S.slopeAngle < 3) { S.slopeDirection = 0; slopeDirSlider.value = 0; }
      clearPresetUI();
      applyState();
    });
    slopeDirSlider.addEventListener('input', () => {
      S.slopeDirection = +slopeDirSlider.value;
      clearPresetUI();
      applyState();
    });

    document.getElementById('canopySelect').addEventListener('change', (e) => {
      S.canopySystem = e.target.value;
      clearPresetUI();
      applyState();
    });

    densitySlider.addEventListener('input', () => {
      S.canopyDensity = +densitySlider.value;
      clearPresetUI();
      applyState();
    });

    heatSlider.addEventListener('input', () => {
      S.heatwave = +heatSlider.value;
      clearPresetUI();
      applyState();
    });

    // Presets
    document.querySelectorAll('.pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const preset = PRESETS[btn.dataset.preset];
        if (!preset) return;
        Object.assign(S, preset, { activePreset: btn.dataset.preset });

        timeSlider.value    = S.timePercent;
        rowSlider.value     = S.rowOrientation;
        slopeSlider.value   = S.slopeAngle;
        slopeDirSlider.value = S.slopeDirection;
        slopeDirSlider.disabled = S.slopeAngle < 3;
        document.getElementById('canopySelect').value = S.canopySystem;
        densitySlider.value = S.canopyDensity;
        heatSlider.value    = S.heatwave;
        document.getElementById('btnSouth').setAttribute('aria-pressed', S.hemisphere === 'S');
        document.getElementById('btnNorth').setAttribute('aria-pressed', S.hemisphere === 'N');
        document.getElementById('timeDisplay').textContent = timePercentToClock(S.timePercent);

        document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');

        applyState();
      });
    });
  }

  function clearPresetUI() {
    S.activePreset = null;
    document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  }

  // ── Resize ──────────────────────────────────────────────

  function handleResize() {
    const wrap = canvas.parentElement;
    const size = Math.min(wrap.clientWidth, 460);
    canvas.style.width  = size + 'px';
    canvas.style.height = size + 'px';
  }

  // ── Init ───────────────────────────────────────────────
  function init() {
    document.getElementById('timeDisplay').textContent = timePercentToClock(S.timePercent);
    bindEvents();
    handleResize();
    window.addEventListener('resize', handleResize);
    applyState();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
