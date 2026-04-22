#!/usr/bin/env node
/**
 * validate.js — Sanity-check the Winery Hose & Pump Explorer calculations.
 * Run:  node validate.js
 *
 * Checks:
 *  1. JS syntax parse (via node --check)
 *  2. Module-level unit tests for core functions (inline)
 */

'use strict';

// ── Re-implement core functions so we can test them without a browser ──────────

const PRESETS = {
  water:      { density: 998, viscosity: 1.0 },
  'white-wine': { density: 990, viscosity: 1.5 },
  'red-wine':   { density: 1005, viscosity: 3.5 },
  'grape-juice':{ density: 1065, viscosity: 8.0 },
};

function frictionFactor(Re, D_m, L_m) {
  if (Re <= 0) return 0;
  const k_m = 1.5e-6;
  const kD   = k_m / D_m;
  if (Re < 2000) return 64 / Re;
  if (Re < 4000) {
    const f_turb = haalandFactor(Re, kD);
    const f_lam  = 64 / Re;
    return f_lam * (1 - (Re - 2000) / 2000) + f_turb * ((Re - 2000) / 2000);
  }
  return haalandFactor(Re, kD);
}

function haalandFactor(Re, kD) {
  const term = Math.pow(kD / 3.7, 1.11) + 6.9 / Re;
  const logVal = Math.log10(Math.max(term, 1e-12));
  const f_inv  = -1.8 * logVal;
  return 1 / (f_inv * f_inv);
}

function calculate(params) {
  const { Q_Lmin, D_mm, L_m, dz_m, rho_kgm3, mu_mPas, eta_pct } = params;
  const Q_m3s  = Q_Lmin / 60000;
  const D_m    = D_mm / 1000;
  const mu_Pas = mu_mPas / 1000;
  const A_m2   = Math.PI * D_m * D_m / 4;
  const eta    = Math.max(0.01, Math.min(1, eta_pct / 100));
  if (Q_m3s <= 0 || D_m <= 0 || L_m <= 0) return null;

  const V_ms       = Q_m3s / A_m2;
  const Re         = rho_kgm3 * V_ms * D_m / mu_Pas;
  const f          = frictionFactor(Re, D_m, L_m);
  const q_Pa       = 0.5 * rho_kgm3 * V_ms * V_ms;
  const dP_fric_Pa = f * (L_m / D_m) * q_Pa;
  const dP_fric_kPa = dP_fric_Pa / 1000;
  const g           = 9.80665;
  const dP_static_Pa = rho_kgm3 * g * dz_m;
  const dP_total_Pa  = dP_fric_Pa + dP_static_Pa;
  const staticHead_m = dz_m;
  const tdh_m        = dP_total_Pa / (rho_kgm3 * g);
  const P_hyd_W     = dP_total_Pa * Q_m3s;
  const P_shaft_W   = P_hyd_W / eta;

  let regime;
  if (Re < 2000)      regime = 'Laminar';
  else if (Re < 4000) regime = 'Transition';
  else                regime = 'Turbulent';

  return { V_ms, Re, f, dP_fric_Pa, dP_fric_kPa, dP_static_Pa, dP_total_Pa,
           staticHead_m, tdh_m, P_hyd_W, P_shaft_W, regime };
}

// ── Tests ─────────────────────────────────────────────────────────────────────

let passed = 0;
let failed = 0;

function assert(cond, msg) {
  if (cond) {
    console.log(`  ✓  ${msg}`);
    passed++;
  } else {
    console.error(`  ✗  FAIL: ${msg}`);
    failed++;
  }
}

function assertApprox(actual, expected, tolerance, msg) {
  const diff = Math.abs(actual - expected);
  if (diff <= tolerance) {
    console.log(`  ✓  ${msg} (${actual.toFixed(4)} ≈ ${expected.toFixed(4)})`);
    passed++;
  } else {
    console.error(`  ✗  ${msg}: got ${actual.toFixed(4)}, expected ${expected.toFixed(4)} (tol ±${tolerance})`);
    failed++;
  }
}

console.log('\n=== validate.js — Winery Hose & Pump Explorer ===\n');

console.log('--- Test 1: JS syntax (node --check app.js) ---');
const { execSync } = require('child_process');
try {
  execSync('node --check /Users/wineclaw/.openclaw/workspace/projects/2am-mini-app-creation/runs/2026-03-26/winery-hose-pump-explorer/app.js', { encoding: 'utf8' });
  console.log('  ✓  app.js parses without errors\n');
  passed++;
} catch(e) {
  console.error('  ✗  app.js has syntax errors:\n', e.stderr || e.message, '\n');
  failed++;
}

console.log('--- Test 2: Friction factor — laminar (Re = 500) ---');
{
  const f = frictionFactor(500, 0.025, 10);
  const expected = 64 / 500; // 0.128
  assertApprox(f, expected, 0.001, 'f = 64/Re');
}

console.log('--- Test 3: Friction factor — turbulent (Re = 10000) ---');
{
  const f = frictionFactor(10000, 0.025, 10);
  // Blasius for smooth: f ≈ 0.316/Re^0.25 ≈ 0.316/10^0.25 ≈ 0.316/1.778 ≈ 0.178
  // Haaland should give something in the ~0.03 range for smooth pipe at high Re
  assert(f > 0.01 && f < 0.1, `f = ${f.toFixed(4)} is reasonable for turbulent smooth pipe`);
}

console.log('--- Test 4: Friction factor — transition (Re = 3000) ---');
{
  const f = frictionFactor(3000, 0.025, 10);
  assert(f > 0, `Transition f = ${f.toFixed(4)} > 0`);
  assert(f < 0.15, `Transition f = ${f.toFixed(4)} < 0.15`);
}

console.log('--- Test 5: Water at 20 L/min, 25mm ID, 10m hose ---');
{
  const r = calculate({ Q_Lmin: 20, D_mm: 25, L_m: 10, dz_m: 2,
                        rho_kgm3: 998, mu_mPas: 1.0, eta_pct: 65 });
  assert(r !== null, 'Calculation returned a result');
  assert(r.V_ms > 0, `Velocity ${r.V_ms.toFixed(3)} m/s > 0`);
  assert(r.Re > 2000, `Re = ${r.Re.toFixed(0)} > 2000 (expected turbulent for water)`);
  assert(r.dP_fric_kPa > 0, `Friction ΔP = ${r.dP_fric_kPa.toFixed(3)} kPa > 0`);
  assert(r.P_shaft_W > r.P_hyd_W, 'Shaft power > hydraulic power (efficiency < 100%)');
  assert(r.regime === 'Turbulent', `Regime = ${r.regime}`);
  assertApprox(r.tdh_m, r.staticHead_m + r.dP_fric_Pa/(998*9.80665), 0.001, 'TDH = static + friction head');
}

console.log('--- Test 6: Red wine (higher viscosity) — should be laminar ---');
{
  const r = calculate({ Q_Lmin: 5, D_mm: 25, L_m: 10, dz_m: 2,
                        rho_kgm3: 1005, mu_mPas: 3.5, eta_pct: 65 });
  assert(r !== null, 'Calculation returned a result');
  assert(r.Re < 2000, `Re = ${r.Re.toFixed(0)} < 2000 → ${r.regime}`);
  assert(r.f > 0, `f = ${r.f.toFixed(4)} > 0`);
}

console.log('--- Test 7: Negative elevation change (going downhill) ---');
{
  const r = calculate({ Q_Lmin: 20, D_mm: 25, L_m: 10, dz_m: -3,
                        rho_kgm3: 998, mu_mPas: 1.0, eta_pct: 65 });
  assert(r !== null, 'Calculation returned a result');
  assert(r.staticHead_m < 0, `Static head = ${r.staticHead_m} m (negative = downhill)`);
  assert(r.tdh_m < r.dP_fric_Pa/(998*9.80665), 'TDH reduced by downhill elevation');
}

console.log('--- Test 8: Zero flow → should return null ---');
{
  const r = calculate({ Q_Lmin: 0, D_mm: 25, L_m: 10, dz_m: 2,
                        rho_kgm3: 998, mu_mPas: 1.0, eta_pct: 65 });
  assert(r === null, 'Zero flow returns null (no calc)');
}

console.log('--- Test 9: Zero hose length → should return null ---');
{
  const r = calculate({ Q_Lmin: 20, D_mm: 25, L_m: 0, dz_m: 2,
                        rho_kgm3: 998, mu_mPas: 1.0, eta_pct: 65 });
  assert(r === null, 'Zero hose length returns null (no calc)');
}

console.log('--- Test 10: Presets are defined ---');
{
  Object.entries(PRESETS).forEach(([key, p]) => {
    assert(p.density > 0, `Preset '${key}': density = ${p.density} kg/m³ > 0`);
    assert(p.viscosity > 0, `Preset '${key}': viscosity = ${p.viscosity} mPa·s > 0`);
  });
}

// ── Summary ───────────────────────────────────────────────────────────────────

console.log('\n========================================');
console.log(`Results: ${passed} passed, ${failed} failed`);
if (failed === 0) {
  console.log('All checks passed. ✓');
} else {
  console.error('Some checks failed. Review above.');
  process.exit(1);
}
