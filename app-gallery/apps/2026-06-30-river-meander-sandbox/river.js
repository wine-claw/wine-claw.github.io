const canvas = document.getElementById('river');
const ctx = canvas.getContext('2d');

let width, height, dpr;
let points = [];
let oxbowTraces = [];
let sediment = [];
let frame = 0;
let paused = false;
let seedOffset = Math.random() * 1000;

const params = {
  speed: 1.0,
  erosion: 0.6,
  seed: 0.35,
  resistance: 0.85,
  baseWidth: 14,
  segmentLength: 4,
  nPoints: 160,
  depositRate: 0.35,
  cutoffThreshold: 0.78,
};

function fitCanvas() {
  const stage = canvas.parentElement;
  const rect = stage.getBoundingClientRect();
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = Math.max(320, Math.floor(rect.width));
  height = Math.max(240, Math.floor(rect.height));
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function resetRiver() {
  oxbowTraces = [];
  sediment = [];
  seedOffset = Math.random() * 1000;
  buildRiver();
}

function buildRiver() {
  points = [];
  const ymid = height * 0.5;
  const xstart = width * 0.05;
  const xend = width * 0.95;
  const total = xend - xstart;
  const count = params.nPoints;
  const amp = height * (0.12 + params.seed * 0.18);
  for (let i = 0; i <= count; i++) {
    const t = i / count;
    const x = xstart + t * total;
    const base = Math.sin((t * 4 + seedOffset * 0.03) * Math.PI * 2) * amp;
    const detail = Math.sin((t * 10 + seedOffset * 0.07) * Math.PI * 2) * amp * 0.25;
    const y = ymid + base + detail;
    points.push({ x, y, w: params.baseWidth, age: 0 });
  }
}

function smoothPoints(pts, times = 1) {
  for (let r = 0; r < times; r++) {
    const copy = pts.map((p, i) => {
      if (i === 0 || i === pts.length - 1) return { ...p };
      const prev = pts[i - 1];
      const next = pts[i + 1];
      return { x: p.x, y: (prev.y + p.y + next.y) / 3, w: p.w, age: p.age };
    });
    pts = copy;
  }
  return pts;
}

function curvature(i) {
  if (i < 2 || i >= points.length - 2) return 0;
  const a = points[i - 2];
  const b = points[i - 1];
  const c = points[i];
  const d = points[i + 1];
  const e = points[i + 2];
  const dx1 = c.x - a.x;
  const dy1 = c.y - a.y;
  const dx2 = e.x - c.x;
  const dy2 = e.y - c.y;
  const len1 = Math.hypot(dx1, dy1) || 1;
  const len2 = Math.hypot(dx2, dy2) || 1;
  const cross = (dx1 / len1) * (dy2 / len2) - (dy1 / len1) * (dx2 / len2);
  return cross;
}

function normal(i) {
  if (i === 0 || i === points.length - 1) return { nx: 0, ny: 0 };
  const p = points[i - 1];
  const q = points[i + 1];
  const dx = q.x - p.x;
  const dy = q.y - p.y;
  const len = Math.hypot(dx, dy) || 1;
  return { nx: -dy / len, ny: dx / len };
}

function evolve() {
  const newPoints = points.map((p, i) => ({ ...p }));
  for (let i = 2; i < points.length - 2; i++) {
    const curv = curvature(i);
    const { nx, ny } = normal(i);
    const speed = params.speed;
    const erosion = params.erosion;
    const resist = params.resistance;
    const cutPower = Math.max(0, Math.abs(curv) - 0.02) * speed * erosion;
    const direction = Math.sign(curv);
    const shift = cutPower * 0.9 / Math.max(0.35, resist);
    newPoints[i].x += nx * direction * shift;
    newPoints[i].y += ny * direction * shift;
    const deposition = shift * params.depositRate;
    const depX = p.x - nx * direction * deposition * 0.6;
    const depY = p.y - ny * direction * deposition * 0.6;
    if (frame % 4 === 0) {
      sediment.push({ x: depX, y: depY, life: 120 + Math.random() * 80, size: 1 + Math.random() * 1.5 });
    }
    newPoints[i].w = params.baseWidth + Math.abs(curv) * 18;
    newPoints[i].age++;
  }
  points = smoothPoints(newPoints, 2);
  checkCutoff();
  pruneSediment();
  frame++;
}

function checkCutoff() {
  for (let i = 0; i < points.length - 12; i++) {
    const a = points[i];
    for (let j = i + 10; j < points.length; j++) {
      const b = points[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.hypot(dx, dy);
      const widthHere = (a.w + b.w) * params.cutoffThreshold;
      if (dist < widthHere) {
        const loop = points.splice(i, j - i);
        oxbowTraces.push(loop);
        return;
      }
    }
  }
}

function forceCutoff() {
  let best = -1, bestVal = 0;
  for (let i = 0; i < points.length; i++) {
    const c = Math.abs(curvature(i));
    if (c > bestVal) { bestVal = c; best = i; }
  }
  if (best < 0) return;
  let nearest = -1, nearestDist = Infinity;
  for (let j = 0; j < points.length; j++) {
    if (Math.abs(j - best) < 12) continue;
    const d = Math.hypot(points[best].x - points[j].x, points[best].y - points[j].y);
    if (d < nearestDist) { nearestDist = d; nearest = j; }
  }
  if (nearest >= 0 && nearestDist < Math.max(width, height) * 0.35) {
    const [start, end] = best < nearest ? [best, nearest] : [nearest, best];
    const loop = points.splice(start, end - start);
    oxbowTraces.push(loop);
  }
}

function pruneSediment() {
  for (let i = sediment.length - 1; i >= 0; i--) {
    sediment[i].life--;
    if (sediment[i].life <= 0) sediment.splice(i, 1);
  }
  if (sediment.length > 900) sediment.splice(0, sediment.length - 900);
}

function channelPoly(pts, side) {
  ctx.beginPath();
  for (let i = 0; i < pts.length; i++) {
    const { nx, ny } = normal(i) || { nx: 0, ny: 0 };
    const w = pts[i].w * 0.5;
    const x = pts[i].x + nx * side * w;
    const y = pts[i].y + ny * side * w;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
}

function drawChannel(pts, alpha = 1, oxbow = false) {
  channelPoly(pts, 1);
  for (let i = pts.length - 1; i >= 0; i--) {
    const { nx, ny } = normal(i) || { nx: 0, ny: 0 };
    const w = pts[i].w * 0.5;
    ctx.lineTo(pts[i].x - nx * w, pts[i].y - ny * w);
  }
  ctx.closePath();
  if (oxbow) {
    ctx.fillStyle = `rgba(20, 45, 75, ${0.6 * alpha})`;
  } else {
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, `rgba(121, 192, 255, ${0.85 * alpha})`);
    grad.addColorStop(1, `rgba(56, 139, 253, ${0.9 * alpha})`);
    ctx.fillStyle = grad;
  }
  ctx.fill();
}

function drawSediment() {
  for (const s of sediment) {
    const a = Math.min(1, s.life / 80);
    ctx.fillStyle = `rgba(210, 166, 121, ${a * 0.55})`;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawLand() {
  ctx.fillStyle = '#2a2018';
  ctx.fillRect(0, 0, width, height);
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, '#2a2018');
  grad.addColorStop(0.5, '#3d2b1f');
  grad.addColorStop(1, '#261c15');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);
}

function sinuosity() {
  let straight = 0, along = 0;
  for (let i = 1; i < points.length; i++) {
    straight += Math.hypot(points[i].x - points[i - 1].x, 0);
    along += Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
  }
  return straight > 0 ? along / straight : 1;
}

function drawFlowArrows() {
  ctx.save();
  ctx.strokeStyle = 'rgba(255,255,255,0.18)';
  ctx.lineWidth = 1.2;
  for (let i = 3; i < points.length - 4; i += 7) {
    const a = points[i];
    const b = points[i + 3];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy) || 1;
    const nx = dx / len;
    const ny = dy / len;
    const size = 5 + params.speed * 2;
    const x = a.x + nx * 12;
    const y = a.y + ny * 12;
    ctx.beginPath();
    ctx.moveTo(x - nx * size, y - ny * size);
    ctx.lineTo(x + nx * size, y + ny * size);
    ctx.lineTo(x - nx * size * 0.5 + ny * size * 0.5, y - ny * size * 0.5 - nx * size * 0.5);
    ctx.stroke();
  }
  ctx.restore();
}

function render() {
  fitCanvas();
  drawLand();
  drawSediment();
  for (let k = 0; k < oxbowTraces.length; k++) {
    drawChannel(oxbowTraces[k], 0.7 + 0.3 * Math.sin(k), true);
  }
  drawChannel(points, 1, false);
  drawFlowArrows();

  document.getElementById('sinuosity').textContent = sinuosity().toFixed(2);
  document.getElementById('oxbows').textContent = oxbowTraces.length;
}

function loop() {
  if (!paused) {
    evolve();
  }
  render();
  requestAnimationFrame(loop);
}

function onResize() { fitCanvas(); }

function addMeanderSeed(x, y) {
  const rect = canvas.getBoundingClientRect();
  const cx = (x - rect.left) * (canvas.width / rect.width / dpr);
  const cy = (y - rect.top) * (canvas.height / rect.height / dpr);
  let best = -1, bestDist = Infinity;
  for (let i = 0; i < points.length; i++) {
    const d = Math.hypot(points[i].x - cx, points[i].y - cy);
    if (d < bestDist) { bestDist = d; best = i; }
  }
  if (best >= 0) {
    const amp = 30 + params.seed * 40;
    const sign = Math.random() > 0.5 ? 1 : -1;
    for (let i = Math.max(0, best - 8); i <= Math.min(points.length - 1, best + 8); i++) {
      const t = (i - best) / 8;
      const falloff = Math.exp(-t * t * 2);
      points[i].y += sign * amp * falloff;
    }
  }
}

function bind() {
  document.getElementById('speed').addEventListener('input', e => {
    params.speed = parseFloat(e.target.value);
    document.getElementById('speedVal').textContent = params.speed.toFixed(1);
  });
  document.getElementById('erosion').addEventListener('input', e => {
    params.erosion = parseFloat(e.target.value);
    document.getElementById('erosionVal').textContent = params.erosion.toFixed(1);
  });
  document.getElementById('seed').addEventListener('input', e => {
    params.seed = parseFloat(e.target.value);
    document.getElementById('seedVal').textContent = params.seed.toFixed(2);
  });
  document.getElementById('resist').addEventListener('input', e => {
    params.resistance = parseFloat(e.target.value);
    document.getElementById('resistVal').textContent = params.resistance.toFixed(2);
  });
  document.getElementById('resetBtn').addEventListener('click', resetRiver);
  document.getElementById('pauseBtn').addEventListener('click', () => {
    paused = !paused;
    document.getElementById('pauseBtn').textContent = paused ? 'Resume' : 'Pause';
  });
  document.getElementById('cutoffBtn').addEventListener('click', forceCutoff);
  canvas.addEventListener('pointerdown', e => {
    addMeanderSeed(e.clientX, e.clientY);
  });
  window.addEventListener('resize', onResize);
}

fitCanvas();
buildRiver();
bind();
loop();
