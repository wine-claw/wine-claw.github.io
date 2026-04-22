#!/usr/bin/env node
/**
 * validate.js — Quick formula sanity check for SO₂ speciation calculations.
 * Run: node validate.js
 */
'use strict';

const PKA1 = 1.81;
const PKA2 = 7.20;

function calcFractions(pH) {
  const H = Math.pow(10, -pH);
  const term0 = H * H;
  const term1 = H * Math.pow(10, -PKA1);
  const term2 = Math.pow(10, -PKA1 - PKA2);
  const denom = term0 + term1 + term2;
  return {
    alphaMol:  term0 / denom,
    alphaBis:  term1 / denom,
    alphaSulf: term2 / denom,
  };
}

function calcMolecularSO2(pH, freeSO2) {
  return calcFractions(pH).alphaMol * freeSO2;
}

function calcRequiredFreeSO2(pH, molTarget) {
  const a = calcFractions(pH).alphaMol;
  return a > 0 ? molTarget / a : Infinity;
}

let passed = 0;
let failed = 0;

function check(label, got, expected, tolerance = 0.001) {
  const ok = Math.abs(got - expected) <= tolerance;
  console.log(`${ok ? '✅' : '❌'} ${label}: got ${got.toFixed(4)}, expected ${expected.toFixed(4)}`);
  if (ok) passed++; else failed++;
}

// ---- 1. Fractions sum to 1
console.log('\n--- Fraction sums ---');
const f3 = calcFractions(3.0);
check('pH 3.0 fractions sum to 1', f3.alphaMol + f3.alphaBis + f3.alphaSulf, 1.0, 1e-10);

const f35 = calcFractions(3.5);
check('pH 3.5 fractions sum to 1', f35.alphaMol + f35.alphaBis + f35.alphaSulf, 1.0, 1e-10);

const f40 = calcFractions(4.0);
check('pH 4.0 fractions sum to 1', f40.alphaMol + f40.alphaBis + f40.alphaSulf, 1.0, 1e-10);

// ---- 2. Published benchmarks from literature
console.log('\n--- Literature benchmarks ---');
check('Molecular fraction at pH 3.0 ≈ 0.061', f3.alphaMol, 0.061, 0.005);
check('Molecular fraction at pH 3.5 ≈ 0.019', f35.alphaMol, 0.019, 0.003);
// (These are approximate — literature sources vary slightly by method and ionic strength)

// ---- 3. Molecular SO₂ at typical wine values
console.log('\n--- Molecular SO₂ calculations ---');
const mol3 = calcMolecularSO2(3.0, 50);
check('Mol SO₂ at pH 3.0, 50 mg/L free ≈ 3.05', mol3, 3.05, 0.1);

const mol35_40 = calcMolecularSO2(3.5, 40);
check('Mol SO₂ at pH 3.5, 40 mg/L free ≈ 0.76', mol35_40, 0.76, 0.05);

// ---- 4. Required free SO₂ for targets
console.log('\n--- Required free SO₂ for molecular targets ---');
const req3 = calcRequiredFreeSO2(3.0, 0.8);
check('Free SO₂ needed at pH 3.0 for 0.8 mol target ≈ 13.1', req3, 13.1, 0.5);

const req35 = calcRequiredFreeSO2(3.5, 0.8);
check('Free SO₂ needed at pH 3.5 for 0.8 mol target ≈ 40.8', req35, 40.8, 0.8);

const req39 = calcRequiredFreeSO2(3.9, 0.8);
check('Free SO₂ needed at pH 3.9 for 0.8 mol target ≈ 200.6', req39, 200.6, 2.0);

// ---- 5. Sulfite is negligible at wine pH
console.log('\n--- Sulfite negligibility ---');
check('Sulfite fraction at pH 3.5 ≈ 0 (negligible)', f35.alphaSulf, 0, 1e-6);
check('Sulfite fraction at pH 4.0 < 0.0001', f40.alphaSulf < 0.0001, true);

// ---- 6. Consistency: required × alphaMol = molTarget
console.log('\n--- Round-trip consistency ---');
const target = 0.8;
for (const pH of [3.0, 3.2, 3.4, 3.5, 3.7, 3.9]) {
  const req = calcRequiredFreeSO2(pH, target);
  const recovered = req * calcFractions(pH).alphaMol;
  check(`Round-trip pH ${pH}: target ${target} recovered ${recovered.toFixed(3)}`,
    recovered, target, 0.001);
}

// ---- 7. Invalid pH guards
console.log('\n--- Edge cases ---');
check('pH 2.5: fractions valid', calcFractions(2.5).alphaMol > 0, true);
check('pH 4.5: fractions valid', calcFractions(4.5).alphaMol > 0, true);

// ---- Summary
console.log(`\n============================`);
console.log(`Results: ${passed} passed, ${failed} failed`);
if (failed === 0) {
  console.log('All checks passed ✅');
  process.exit(0);
} else {
  console.error('Some checks failed ❌');
  process.exit(1);
}
