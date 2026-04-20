// app.js — Main application logic

const SPECIES_CONFIG = {
  cattle: {
    stockClasses: [
      { class: 'Cows', ageBracket: '>2yr' },
      { class: 'Calves', ageBracket: '0-6mo' },
      { class: 'Weaners', ageBracket: '7-12mo' },
      { class: 'Heifers', ageBracket: '1-2yr' },
      { class: 'Steers 1yr', ageBracket: '1-2yr' },
      { class: 'Steers 2yr', ageBracket: '>2yr' },
      { class: 'Bulls', ageBracket: '>2yr' }
    ],
    expenseFields: ['herdHealth', 'contractors', 'transport', 'sellingCosts'],
    expenseLabels: { herdHealth: 'Herd Health', contractors: 'Contractors', transport: 'Transport & Cartage', sellingCosts: 'Selling Costs' },
    defaultDressing: 53,
    hasWool: false
  },
  sheep: {
    stockClasses: [
      { class: 'Ewes' },
      { class: 'Lambs' },
      { class: 'Rams' }
    ],
    expenseFields: ['flockHealth', 'contractors', 'transport', 'sellingCosts', 'shearingCrutching'],
    expenseLabels: { flockHealth: 'Flock Health', contractors: 'Contractors', transport: 'Transport & Cartage', sellingCosts: 'Selling Costs', shearingCrutching: 'Shearing & Crutching' },
    defaultDressing: 46,
    hasWool: true
  },
  goat: {
    stockClasses: [
      { class: 'Does' },
      { class: 'Kids' },
      { class: 'Capretto' },
      { class: 'Chevon' },
      { class: 'Wethers' },
      { class: 'Bucks' }
    ],
    expenseFields: ['herdHealth', 'contractors', 'transport', 'sellingCosts', 'shearingCrutching', 'dairyCosts'],
    expenseLabels: { herdHealth: 'Herd Health', contractors: 'Contractors', transport: 'Transport & Cartage', sellingCosts: 'Selling Costs', shearingCrutching: 'Shearing & Crutching', dairyCosts: 'Dairy Costs' },
    defaultDressing: 38,
    hasWool: false
  }
};

// Benchmarks ($/kg lwt for cattle/sheep, $/kg dwt for goat)
const BENCHMARKS = {
  cattle: { avg: 2.25, top20: 1.82, label: 'Beef' },
  sheep: { avg: 3.21, top20: 2.50, label: 'Sheep/Lamb' },
  goat: { avg: 1.80, top20: 1.20, label: 'Goat' }
};

let state = {
  currentStep: 1,
  activeSpecies: 'cattle',
  enterprises: { cattle: { enabled: true, dsePercent: 55 }, sheep: { enabled: true, dsePercent: 45 }, goat: { enabled: false, dsePercent: 0 } }
};

// Get default empty data for a species
function getDefaultSpeciesData(species) {
  const config = SPECIES_CONFIG[species];
  const stock = config.stockClasses.map(sc => ({
    class: sc.class,
    ageBracket: sc.ageBracket || '',
    opening: 0, purchases: 0, naturalIncrease: 0, sales: 0, deaths: 0, closing: 0,
    weightOpen: 0, valueOpen: 0, weightClose: 0, valueClose: 0,
    salesWeight: 0, salesPrice: 0, purchWeight: 0, purchPrice: 0
  }));
  const directExpenses = {};
  config.expenseFields.forEach(f => directExpenses[f] = 0);
  return {
    dressingPercent: config.defaultDressing,
    stock,
    woolIncome: 0,
    directExpenses,
    supplements: { homeGrownTonnes: 0, homeGrownPrice: 0, purchasedTonnes: 0, purchasedPrice: 0 },
    supplementAllocation: 100
  };
}

function getDefaultState() {
  return {
    scenarioName: '',
    enterprises: { cattle: { enabled: true, dsePercent: 55 }, sheep: { enabled: true, dsePercent: 45 }, goat: { enabled: false, dsePercent: 0 } },
    cattle: getDefaultSpeciesData('cattle'),
    sheep: getDefaultSpeciesData('sheep'),
    goat: getDefaultSpeciesData('goat'),
    labour: {
      ownerOperator: 0, familyLabour: 0, salariedEmployee: 0,
      casualRate: 35, casualHrsPerWeek: 0, casualWeeksPerYear: 0,
      allocation: { cattle: 100, sheep: 0, goat: 0 }
    },
    overheads: {
      repairsMaintLand: 0, repairsMaintPlant: 0, depreciation: 0,
      adminExpenses: 0, electricityGas: 0, insurance: 0,
      pastureCosts: 0, ratesRents: 0, fuelOil: 0,
      allocationMethod: 'dse',
      allocation: { cattle: 100, sheep: 0, goat: 0 }
    }
  };
}

let formData = getDefaultState();

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Check for case study in URL
  const params = new URLSearchParams(window.location.search);
  const caseStudy = params.get('case');
  if (caseStudy && CASE_STUDIES[caseStudy]) {
    formData = JSON.parse(JSON.stringify(CASE_STUDIES[caseStudy]));
    state.enterprises = JSON.parse(JSON.stringify(formData.enterprises));
  } else {
    const saved = loadFromLocal();
    if (saved) formData = saved;
  }

  initEnterpriseToggles();
  buildAllTables();
  loadFormDataIntoUI();
  updateSpeciesTabs();
  showStep(1);
  bindEvents();
});

function initEnterpriseToggles() {
  ['cattle', 'sheep', 'goat'].forEach(sp => {
    const cb = document.getElementById(`ent-${sp}`);
    cb.checked = formData.enterprises[sp].enabled;
    cb.addEventListener('change', () => {
      formData.enterprises[sp].enabled = cb.checked;
      updateSpeciesTabs();
      updateDSESection();
      autoSave();
    });
  });
  updateDSESection();
  ['cattle', 'sheep', 'goat'].forEach(sp => {
    document.getElementById(`dse-${sp}`).addEventListener('input', (e) => {
      formData.enterprises[sp].dsePercent = parseFloat(e.target.value) || 0;
      checkDSETotal();
      autoSave();
    });
    document.getElementById(`dse-${sp}`).value = formData.enterprises[sp].dsePercent;
  });
}

function updateDSESection() {
  const enabledCount = ['cattle', 'sheep', 'goat'].filter(sp => formData.enterprises[sp].enabled).length;
  const dseSection = document.getElementById('dse-allocation');
  dseSection.style.display = enabledCount > 1 ? 'block' : 'none';
  // Show supplement allocation rows when multiple enterprises
  ['cattle', 'sheep', 'goat'].forEach(sp => {
    const row = document.getElementById(`${sp}-supp-alloc-row`);
    if (row) row.style.display = enabledCount > 1 ? 'block' : 'none';
  });
  // Show labour/overhead allocation
  document.getElementById('labour-allocation-section').style.display = enabledCount > 1 ? 'block' : 'none';
  document.getElementById('oh-allocation-section').style.display = enabledCount > 1 ? 'block' : 'none';
  checkDSETotal();
}

function checkDSETotal() {
  const total = ['cattle', 'sheep', 'goat'].filter(sp => formData.enterprises[sp].enabled)
    .reduce((sum, sp) => sum + (parseFloat(document.getElementById(`dse-${sp}`).value) || 0), 0);
  const warn = document.getElementById('dse-warning');
  if (Math.abs(total - 100) > 0.01) {
    warn.textContent = `DSE percentages total ${total}% — should equal 100%`;
    warn.style.display = 'block';
  } else {
    warn.style.display = 'none';
  }
}

function updateSpeciesTabs() {
  document.querySelectorAll('.species-tab').forEach(tab => {
    const sp = tab.dataset.species;
    tab.classList.toggle('disabled', !formData.enterprises[sp].enabled);
    tab.style.display = formData.enterprises[sp].enabled ? '' : 'none';
  });
  // Auto-switch if current tab is disabled
  if (!formData.enterprises[state.activeSpecies].enabled) {
    const first = ['cattle', 'sheep', 'goat'].find(sp => formData.enterprises[sp].enabled);
    if (first) switchSpecies(first);
  }
}

function buildAllTables() {
  ['cattle', 'sheep', 'goat'].forEach(sp => buildStockTable(sp));
}

function buildStockTable(species) {
  const tbody = document.querySelector(`#${species}-stock-table tbody`);
  const config = SPECIES_CONFIG[species];
  tbody.innerHTML = '';
  const data = formData[species].stock;
  data.forEach((row, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${row.class}</td>
      <td><input type="number" min="0" data-sp="${species}" data-idx="${i}" data-field="opening" value="${row.opening}"></td>
      <td><input type="number" min="0" data-sp="${species}" data-idx="${i}" data-field="purchases" value="${row.purchases}"></td>
      <td><input type="number" min="0" data-sp="${species}" data-idx="${i}" data-field="naturalIncrease" value="${row.naturalIncrease}"></td>
      <td><input type="number" min="0" data-sp="${species}" data-idx="${i}" data-field="sales" value="${row.sales}"></td>
      <td><input type="number" min="0" data-sp="${species}" data-idx="${i}" data-field="deaths" value="${row.deaths}"></td>
      <td><input type="number" min="0" data-sp="${species}" data-idx="${i}" data-field="closing" value="${row.closing}"></td>
    `;
    tbody.appendChild(tr);
  });
  
  // Also build values table
  const vtbody = document.querySelector(`#${species}-values-table tbody`);
  vtbody.innerHTML = '';
  data.forEach((row, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${row.class}</td>
      <td><input type="number" min="0" step="1" data-sp="${species}" data-idx="${i}" data-field="weightOpen" value="${row.weightOpen}"></td>
      <td><input type="number" min="0" step="1" data-sp="${species}" data-idx="${i}" data-field="valueOpen" value="${row.valueOpen}"></td>
      <td><input type="number" min="0" step="1" data-sp="${species}" data-idx="${i}" data-field="weightClose" value="${row.weightClose}"></td>
      <td><input type="number" min="0" step="1" data-sp="${species}" data-idx="${i}" data-field="valueClose" value="${row.valueClose}"></td>
      <td><input type="number" min="0" data-sp="${species}" data-idx="${i}" data-field="sales" value="${row.sales}"></td>
      <td><input type="number" min="0" step="1" data-sp="${species}" data-idx="${i}" data-field="salesWeight" value="${row.salesWeight}"></td>
      <td><input type="number" min="0" step="0.01" data-sp="${species}" data-idx="${i}" data-field="salesPrice" value="${row.salesPrice}"></td>
      <td><input type="number" min="0" data-sp="${species}" data-idx="${i}" data-field="purchases" value="${row.purchases}"></td>
      <td><input type="number" min="0" step="1" data-sp="${species}" data-idx="${i}" data-field="purchWeight" value="${row.purchWeight}"></td>
      <td><input type="number" min="0" step="0.01" data-sp="${species}" data-idx="${i}" data-field="purchPrice" value="${row.purchPrice}"></td>
    `;
    vtbody.appendChild(tr);
  });
}

function bindEvents() {
  // Table inputs
  document.addEventListener('input', (e) => {
    const t = e.target;
    if (t.matches('input[data-sp][data-idx][data-field]')) {
      const sp = t.dataset.sp;
      const idx = parseInt(t.dataset.idx);
      const field = t.dataset.field;
      formData[sp].stock[idx][field] = parseFloat(t.value) || 0;
      updateTotals(sp);
      updateTradingSummary(sp);
      autoSave();
    }
  });

  // Step navigation
  document.querySelectorAll('.step-tab').forEach(tab => {
    tab.addEventListener('click', () => showStep(parseInt(tab.dataset.step)));
  });

  document.getElementById('btn-prev').addEventListener('click', () => {
    if (state.currentStep > 1) showStep(state.currentStep - 1);
  });
  document.getElementById('btn-next').addEventListener('click', () => {
    if (state.currentStep < 4) showStep(state.currentStep + 1);
  });
  document.getElementById('btn-calc').addEventListener('click', () => {
    showStep(4);
    calculateResults();
  });

  // Species tabs
  document.querySelectorAll('.species-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      if (!tab.classList.contains('disabled')) switchSpecies(tab.dataset.species);
    });
  });

  // Save/Load/Compare/Import
  document.getElementById('btn-save').addEventListener('click', saveScenarioDialog);
  document.getElementById('btn-load').addEventListener('click', loadScenarioDialog);
  document.getElementById('btn-compare').addEventListener('click', compareDialog);
  document.getElementById('btn-import').addEventListener('click', importDialog);
  document.getElementById('btn-print').addEventListener('click', () => window.print());
  document.getElementById('btn-pdf').addEventListener('click', exportPDF);

  // Overhead allocation method
  document.getElementById('oh-alloc-method').addEventListener('change', updateOHAllocation);
  
  // Expense inputs
  bindExpenseInputs();
  bindLabourInputs();
  bindOverheadInputs();
  bindSupplementInputs();
  
  // Auto-save on any input
  document.querySelectorAll('input[type="number"], input[type="text"]').forEach(inp => {
    if (!inp.dataset.sp) {
      inp.addEventListener('input', autoSave);
    }
  });
}

function bindExpenseInputs() {
  ['cattle', 'sheep', 'goat'].forEach(sp => {
    const config = SPECIES_CONFIG[sp];
    config.expenseFields.forEach(field => {
      const id = `${sp}-${field.replace(/([A-Z])/g, (m, p, i) => i ? '-' + m.toLowerCase() : m)}`;
      // Map field names to IDs
      const fieldToId = {
        herdHealth: `${sp}-herd-health`, contractors: `${sp}-contractors`,
        transport: `${sp}-transport`, sellingCosts: `${sp}-selling`,
        flockHealth: `${sp}-flock-health`, shearingCrutching: `${sp}-shearing`,
        dairyCosts: `${sp}-dairy`
      };
      const el = document.getElementById(fieldToId[field]);
      if (el) {
        el.value = formData[sp].directExpenses[field] || 0;
        el.addEventListener('input', () => {
          formData[sp].directExpenses[field] = parseFloat(el.value) || 0;
          autoSave();
        });
      }
    });
  });
}

function bindSupplementInputs() {
  ['cattle', 'sheep', 'goat'].forEach(sp => {
    const s = formData[sp].supplements;
    const fields = {homeGrownTonnes: `${sp}-home-feed-tonnes`, homeGrownPrice: `${sp}-home-feed-price`, purchasedTonnes: `${sp}-purch-feed-tonnes`, purchasedPrice: `${sp}-purch-feed-price`};
    Object.entries(fields).forEach(([key, id]) => {
      const el = document.getElementById(id);
      if (el) {
        el.value = s[key] || 0;
        el.addEventListener('input', () => { s[key] = parseFloat(el.value) || 0; autoSave(); });
      }
    });
    const allocEl = document.getElementById(`${sp}-supp-alloc`);
    if (allocEl) {
      allocEl.value = formData[sp].supplementAllocation || 100;
      allocEl.addEventListener('input', () => { formData[sp].supplementAllocation = parseFloat(allocEl.value) || 100; autoSave(); });
    }
  });
}

function bindLabourInputs() {
  const l = formData.labour;
  const map = {ownerOperator: 'labour-owner', familyLabour: 'labour-family', salariedEmployee: 'labour-salaried', casualRate: 'labour-casual-rate', casualHrsPerWeek: 'labour-casual-hrs', casualWeeksPerYear: 'labour-casual-wks'};
  Object.entries(map).forEach(([key, id]) => {
    const el = document.getElementById(id);
    if (el) {
      el.value = l[key] || 0;
      el.addEventListener('input', () => { l[key] = parseFloat(el.value) || 0; autoSave(); });
    }
  });
  ['cattle', 'sheep', 'goat'].forEach(sp => {
    const el = document.getElementById(`labour-alloc-${sp}`);
    if (el) {
      el.value = l.allocation[sp] || 0;
      el.addEventListener('input', () => { l.allocation[sp] = parseFloat(el.value) || 0; autoSave(); });
    }
  });
}

function bindOverheadInputs() {
  const o = formData.overheads;
  const map = {repairsMaintLand: 'oh-repairs-land', repairsMaintPlant: 'oh-repairs-plant', depreciation: 'oh-depreciation', adminExpenses: 'oh-admin', electricityGas: 'oh-electricity', insurance: 'oh-insurance', pastureCosts: 'oh-pasture', ratesRents: 'oh-rates', fuelOil: 'oh-fuel'};
  Object.entries(map).forEach(([key, id]) => {
    const el = document.getElementById(id);
    if (el) {
      el.value = o[key] || 0;
      el.addEventListener('input', () => { o[key] = parseFloat(el.value) || 0; autoSave(); });
    }
  });
  document.getElementById('oh-alloc-method').value = o.allocationMethod || 'dse';
  ['cattle', 'sheep', 'goat'].forEach(sp => {
    const el = document.getElementById(`oh-alloc-${sp}`);
    if (el) {
      el.value = o.allocation[sp] || 0;
      el.addEventListener('input', () => { o.allocation[sp] = parseFloat(el.value) || 0; autoSave(); });
    }
  });
}

function loadFormDataIntoUI() {
  // Scenario name
  document.getElementById('scenario-name').value = formData.scenarioName || '';
  document.getElementById('scenario-name').addEventListener('input', (e) => { formData.scenarioName = e.target.value; autoSave(); });
  
  // Species-specific scenario names
  ['sheep', 'goat'].forEach(sp => {
    const el = document.getElementById(`${sp}-scenario-name`);
    // Not in current data model, using main name
  });

  // Wool income
  const woolEl = document.getElementById('sheep-wool-income');
  if (woolEl) {
    woolEl.value = formData.sheep.woolIncome || 0;
    woolEl.addEventListener('input', () => { formData.sheep.woolIncome = parseFloat(woolEl.value) || 0; autoSave(); });
  }

  // Update all totals
  ['cattle', 'sheep', 'goat'].forEach(sp => {
    updateTotals(sp);
    updateTradingSummary(sp);
  });
}

function updateTotals(species) {
  const data = formData[species].stock;
  const fields = ['opening', 'purchases', 'naturalIncrease', 'sales', 'deaths', 'closing'];
  const totals = {};
  fields.forEach(f => totals[f] = data.reduce((s, r) => s + (r[f] || 0), 0));
  fields.forEach(f => {
    const el = document.getElementById(`${species}-total-${f === 'naturalIncrease' ? 'natural' : f}`);
    if (el) el.textContent = totals[f];
  });
}

function updateTradingSummary(species) {
  const result = calcTrading(species);
  const kgEl = document.getElementById(`${species}-kg-produced`);
  const incEl = document.getElementById(`${species}-trading-income`);
  if (kgEl) kgEl.textContent = formatNumber(result.kgProduced) + ' kg';
  if (incEl) incEl.textContent = formatMoney(result.tradingIncome);
}

function formatNumber(n) { return n.toLocaleString('en-AU', { maximumFractionDigits: 0 }); }
function formatMoney(n) { return '$' + n.toLocaleString('en-AU', { minimumFractionDigits: 0, maximumFractionDigits: 0 }); }
function formatMoney2(n) { return '$' + n.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

// Calculation engine
function calcTrading(species) {
  const data = formData[species];
  const stock = data.stock;
  
  let salesValue = 0, purchaseValue = 0, salesKg = 0, purchaseKg = 0;
  let openingValue = 0, closingValue = 0, openingKg = 0, closingKg = 0;
  
  stock.forEach(row => {
    salesValue += (row.sales || 0) * (row.salesWeight || 0) * (row.salesPrice || 0);
    purchaseValue += (row.purchases || 0) * (row.purchWeight || 0) * (row.purchPrice || 0);
    salesKg += (row.sales || 0) * (row.salesWeight || 0);
    purchaseKg += (row.purchases || 0) * (row.purchWeight || 0);
    openingValue += (row.opening || 0) * (row.valueOpen || 0);
    closingValue += (row.closing || 0) * (row.valueClose || 0);
    openingKg += (row.opening || 0) * (row.weightOpen || 0);
    closingKg += (row.closing || 0) * (row.weightClose || 0);
  });

  const changeInInventoryValue = closingValue - openingValue;
  const changeInInventoryKg = closingKg - openingKg;
  const kgProduced = salesKg - purchaseKg + changeInInventoryKg;
  const tradingIncome = salesValue - purchaseValue + changeInInventoryValue;
  
  let totalIncome = tradingIncome;
  if (species === 'sheep') totalIncome += (data.woolIncome || 0);

  return { salesValue, purchaseValue, salesKg, purchaseKg, openingValue, closingValue, openingKg, closingKg, changeInInventoryValue, changeInInventoryKg, kgProduced, tradingIncome, totalIncome };
}

function calcExpenses(species) {
  const data = formData[species];
  const directTotal = Object.values(data.directExpenses).reduce((s, v) => s + (v || 0), 0);
  const suppTotal = (data.supplements.homeGrownTonnes || 0) * (data.supplements.homeGrownPrice || 0) + (data.supplements.purchasedTonnes || 0) * (data.supplements.purchasedPrice || 0);
  const suppAllocated = suppTotal * (data.supplementAllocation || 100) / 100;
  return { directTotal, suppTotal, suppAllocated, totalExpenses: directTotal + suppAllocated };
}

function calcLabourAlloc() {
  const l = formData.labour;
  const totalCasual = (l.casualRate || 0) * (l.casualHrsPerWeek || 0) * (l.casualWeeksPerYear || 0);
  const totalLabour = (l.ownerOperator || 0) + (l.familyLabour || 0) + (l.salariedEmployee || 0) + totalCasual;
  const alloc = {};
  ['cattle', 'sheep', 'goat'].forEach(sp => {
    if (formData.enterprises[sp].enabled) {
      alloc[sp] = totalLabour * (l.allocation[sp] || 0) / 100;
    } else {
      alloc[sp] = 0;
    }
  });
  return { totalLabour, totalCasual, alloc };
}

function calcOverheadAlloc() {
  const o = formData.overheads;
  const totalOH = (o.repairsMaintLand || 0) + (o.repairsMaintPlant || 0) + (o.depreciation || 0) + (o.adminExpenses || 0) + (o.electricityGas || 0) + (o.insurance || 0) + (o.pastureCosts || 0) + (o.ratesRents || 0) + (o.fuelOil || 0);
  const alloc = {};
  ['cattle', 'sheep', 'goat'].forEach(sp => {
    if (formData.enterprises[sp].enabled) {
      alloc[sp] = totalOH * (o.allocation[sp] || 0) / 100;
    } else {
      alloc[sp] = 0;
    }
  });
  return { totalOH, alloc };
}

function switchSpecies(sp) {
  state.activeSpecies = sp;
  document.querySelectorAll('.species-tab').forEach(t => t.classList.toggle('active', t.dataset.species === sp));
  document.querySelectorAll('.species-panel').forEach(p => {
    const pSp = p.dataset.species;
    p.style.display = pSp === sp ? '' : 'none';
    if (!formData.enterprises[pSp].enabled) p.style.display = 'none';
  });
}

function showStep(step) {
  state.currentStep = step;
  document.querySelectorAll('.step-content').forEach(el => el.style.display = 'none');
  document.getElementById(`step-${step}`).style.display = '';
  document.querySelectorAll('.step-tab').forEach(t => {
    t.classList.toggle('active', parseInt(t.dataset.step) === step);
  });
  document.getElementById('btn-prev').disabled = step === 1;
  document.getElementById('btn-next').style.display = step < 4 ? '' : 'none';
  document.getElementById('btn-calc').style.display = step === 4 ? 'none' : 'none';
  
  if (step === 4) calculateResults();
  // Show species tabs on steps 1-2, hide on 3-4 (3 is shared, 4 shows all)
  const speciesTabs = document.getElementById('species-tabs');
  speciesTabs.style.display = step <= 2 ? '' : 'none';
  
  if (step === 3) {
    // Show only enabled species panels aren't needed on step 3
    document.querySelectorAll('#step-3 .species-panel').forEach(p => p.style.display = 'none');
  }
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
  autoSave();
}

function updateOHAllocation() {
  const method = document.getElementById('oh-alloc-method').value;
  formData.overheads.allocationMethod = method;
  
  if (method === 'dse') {
    ['cattle', 'sheep', 'goat'].forEach(sp => {
      const val = formData.enterprises[sp].enabled ? formData.enterprises[sp].dsePercent : 0;
      formData.overheads.allocation[sp] = val;
      const el = document.getElementById(`oh-alloc-${sp}`);
      if (el) el.value = val;
    });
  } else if (method === 'labour') {
    ['cattle', 'sheep', 'goat'].forEach(sp => {
      const val = formData.labour.allocation[sp] || 0;
      formData.overheads.allocation[sp] = val;
      const el = document.getElementById(`oh-alloc-${sp}`);
      if (el) el.value = val;
    });
  } else if (method === 'income') {
    // Calculate based on trading income proportions
    const incomes = {};
    let total = 0;
    ['cattle', 'sheep', 'goat'].forEach(sp => {
      if (formData.enterprises[sp].enabled) {
        const t = calcTrading(sp);
        incomes[sp] = Math.max(0, t.totalIncome);
        total += incomes[sp];
      } else {
        incomes[sp] = 0;
      }
    });
    ['cattle', 'sheep', 'goat'].forEach(sp => {
      const pct = total > 0 ? Math.round(incomes[sp] / total * 100) : 0;
      formData.overheads.allocation[sp] = pct;
      const el = document.getElementById(`oh-alloc-${sp}`);
      if (el) el.value = pct;
    });
  }
  autoSave();
}

function autoSave() {
  saveToLocal(formData);
}

// Save dialog
async function saveScenarioDialog() {
  collectAllFormData();
  const scenarios = await listScenarios().catch(() => []);
  const modal = document.getElementById('modal-content');
  const overlay = document.getElementById('modal-overlay');
  modal.innerHTML = `
    <h2>Save Scenario</h2>
    <p>Enter a name for this scenario:</p>
    <input type="text" id="save-name" value="${formData.scenarioName || 'My Scenario'}" class="full-width" style="margin: 8px 0">
    <div style="margin-top: 16px; display: flex; gap: 8px;">
      <button class="btn btn-primary" id="do-save">Save</button>
      <button class="btn btn-outline" id="cancel-modal">Cancel</button>
    </div>
  `;
  overlay.style.display = 'flex';
  document.getElementById('do-save').addEventListener('click', async () => {
    formData.scenarioName = document.getElementById('save-name').value;
    await saveScenario(formData);
    overlay.style.display = 'none';
    alert('Scenario saved!');
  });
  document.getElementById('cancel-modal').addEventListener('click', () => overlay.style.display = 'none');
}

async function loadScenarioDialog() {
  const scenarios = await listScenarios().catch(() => []);
  const modal = document.getElementById('modal-content');
  const overlay = document.getElementById('modal-overlay');
  
  let listHtml = scenarios.length ? scenarios.map(s => `
    <div class="scenario-item">
      <div>
        <strong>${s.name}</strong>
        <div class="scenario-meta">${new Date(s.lastModified).toLocaleDateString()}</div>
      </div>
      <div style="display: flex; gap: 8px;">
        <button class="btn btn-sm btn-primary" data-load="${s.id}">Load</button>
        <button class="btn btn-sm btn-danger" data-del="${s.id}">Delete</button>
      </div>
    </div>
  `).join('') : '<p>No saved scenarios found.</p>';
  
  modal.innerHTML = `
    <h2>Load Scenario</h2>
    <div class="scenario-list">${listHtml}</div>
    <button class="btn btn-outline" id="cancel-modal" style="margin-top: 16px;">Close</button>
  `;
  overlay.style.display = 'flex';
  
  modal.querySelectorAll('[data-load]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const scenario = await getScenario(parseInt(btn.dataset.load));
      if (scenario) {
        formData = scenario.data;
        state.enterprises = JSON.parse(JSON.stringify(formData.enterprises));
        initEnterpriseToggles();
        buildAllTables();
        loadFormDataIntoUI();
        updateSpeciesTabs();
        showStep(1);
        overlay.style.display = 'none';
      }
    });
  });
  
  modal.querySelectorAll('[data-del]').forEach(btn => {
    btn.addEventListener('click', async () => {
      await deleteScenario(parseInt(btn.dataset.del));
      overlay.style.display = 'none';
      loadScenarioDialog();
    });
  });
  
  document.getElementById('cancel-modal').addEventListener('click', () => overlay.style.display = 'none');
}

async function compareDialog() {
  const scenarios = await listScenarios().catch(() => []);
  const modal = document.getElementById('modal-content');
  const overlay = document.getElementById('modal-overlay');
  
  let listHtml = scenarios.length ? scenarios.map(s => `
    <label class="scenario-item" style="cursor: pointer;">
      <input type="checkbox" value="${s.id}"> 
      <div>
        <strong>${s.name}</strong>
        <div class="scenario-meta">${new Date(s.lastModified).toLocaleDateString()}</div>
      </div>
    </label>
  `).join('') : '<p>Save at least 2 scenarios to compare.</p>';
  
  modal.innerHTML = `
    <h2>Compare Scenarios</h2>
    <p>Select 2 or more scenarios to compare:</p>
    <div class="scenario-list">${listHtml}</div>
    <div style="margin-top: 16px; display: flex; gap: 8px;">
      <button class="btn btn-primary" id="do-compare">Compare</button>
      <button class="btn btn-outline" id="cancel-modal">Cancel</button>
    </div>
  `;
  overlay.style.display = 'flex';
  
  document.getElementById('do-compare').addEventListener('click', async () => {
    const checked = [...modal.querySelectorAll('input[type=checkbox]:checked')].map(cb => parseInt(cb.value));
    if (checked.length < 2) { alert('Select at least 2 scenarios'); return; }
    const selected = [];
    for (const id of checked) {
      const s = await getScenario(id);
      if (s) selected.push(s);
    }
    renderComparison(selected);
    overlay.style.display = 'none';
  });
  document.getElementById('cancel-modal').addEventListener('click', () => overlay.style.display = 'none');
}

function renderComparison(scenarios) {
  showStep(4);
  const container = document.getElementById('results-content');
  const enabledSpecies = ['cattle', 'sheep', 'goat'].filter(sp => scenarios.some(s => s.data.enterprises[sp].enabled));
  
  let html = '<h2>Scenario Comparison</h2>';
  // Build comparison table per enabled species
  enabledSpecies.forEach(sp => {
    html += `<h3>${SPECIES_CONFIG[sp].expenseLabels ? sp.charAt(0).toUpperCase() + sp.slice(1) : sp} — Comparison</h3>`;
    html += '<div class="table-scroll"><table class="compare-table"><thead><tr><th>Metric</th>';
    scenarios.forEach(s => html += `<th>${s.name}</th>`);
    html += '</tr></thead><tbody>';
    
    const results = scenarios.map(s => calcFullResults(s.data, sp));
    
    const metrics = [
      ['Total Income', r => formatMoney(r.totalIncome)],
      ['Direct Expenses', r => formatMoney(r.directExpenses)],
      ['Supplement Expenses', r => formatMoney(r.suppExpenses)],
      ['Labour (allocated)', r => formatMoney(r.labour)],
      ['Overheads (allocated)', r => formatMoney(r.overheads)],
      ['Total COP ($)', r => formatMoney(r.totalCOP)],
      ['COP ($/kg lwt)', r => formatMoney2(r.copPerKgLwt)],
      ['COP ($/kg dwt)', r => formatMoney2(r.copPerKgDwt)],
      ['Income ($/kg lwt)', r => formatMoney2(r.incomePerKgLwt)],
      ['Margin ($/kg lwt)', r => formatMoney2(r.marginPerKgLwt)]
    ];
    
    metrics.forEach(([label, fn]) => {
      html += `<tr><td>${label}</td>`;
      results.forEach(r => html += `<td>${fn(r)}</td>`);
      html += '</tr>';
    });
    
    html += '</tbody></table></div>';
  });
  
  container.innerHTML = html;
}

function collectAllFormData() {
  // Collect scenario name
  formData.scenarioName = document.getElementById('scenario-name').value;
  // All other data is already in formData via input bindings
}

function calcFullResults(data, species) {
  // Use provided data (for comparison) instead of global formData
  const spData = data[species];
  const trading = calcTradingWithData(spData, species === 'sheep' ? data.sheep.woolIncome : 0);
  const expenses = calcExpensesFromData(spData);
  const labourInfo = calcLabourFromData(data);
  const overheadInfo = calcOverheadFromData(data);
  
  const totalCOP = expenses.totalExpenses + (labourInfo.alloc[species] || 0) + (overheadInfo.alloc[species] || 0);
  const kgProducedLwt = trading.kgProduced;
  const kgProducedDwt = kgProducedLwt * (spData.dressingPercent || 53) / 100;
  const copPerKgLwt = kgProducedLwt > 0 ? totalCOP / kgProducedLwt : 0;
  const copPerKgDwt = kgProducedDwt > 0 ? totalCOP / kgProducedDwt : 0;
  const incomePerKgLwt = kgProducedLwt > 0 ? trading.totalIncome / kgProducedLwt : 0;
  const incomePerKgDwt = kgProducedDwt > 0 ? trading.totalIncome / kgProducedDwt : 0;
  const marginPerKgLwt = incomePerKgLwt - copPerKgLwt;
  const marginPerKgDwt = incomePerKgDwt - copPerKgDwt;
  
  return {
    trading, expenses,
    directExpenses: expenses.directTotal,
    suppExpenses: expenses.suppAllocated,
    labour: labourInfo.alloc[species] || 0,
    overheads: overheadInfo.alloc[species] || 0,
    totalCOP, kgProducedLwt, kgProducedDwt,
    copPerKgLwt, copPerKgDwt,
    incomePerKgLwt, incomePerKgDwt,
    marginPerKgLwt, marginPerKgDwt,
    totalIncome: trading.totalIncome
  };
}

function calcTradingWithData(spData, woolIncome) {
  const stock = spData.stock;
  let salesValue = 0, purchaseValue = 0, salesKg = 0, purchaseKg = 0;
  let openingValue = 0, closingValue = 0, openingKg = 0, closingKg = 0;
  
  stock.forEach(row => {
    salesValue += (row.sales || 0) * (row.salesWeight || 0) * (row.salesPrice || 0);
    purchaseValue += (row.purchases || 0) * (row.purchWeight || 0) * (row.purchPrice || 0);
    salesKg += (row.sales || 0) * (row.salesWeight || 0);
    purchaseKg += (row.purchases || 0) * (row.purchWeight || 0);
    openingValue += (row.opening || 0) * (row.valueOpen || 0);
    closingValue += (row.closing || 0) * (row.valueClose || 0);
    openingKg += (row.opening || 0) * (row.weightOpen || 0);
    closingKg += (row.closing || 0) * (row.weightClose || 0);
  });
  
  const changeInInventoryValue = closingValue - openingValue;
  const changeInInventoryKg = closingKg - openingKg;
  const kgProduced = salesKg - purchaseKg + changeInInventoryKg;
  const tradingIncome = salesValue - purchaseValue + changeInInventoryValue;
  const totalIncome = tradingIncome + (woolIncome || 0);
  
  return { salesValue, purchaseValue, salesKg, purchaseKg, openingValue, closingValue, changeInInventoryValue, changeInInventoryKg, kgProduced, tradingIncome, totalIncome };
}

function calcExpensesFromData(spData) {
  const directTotal = Object.values(spData.directExpenses).reduce((s, v) => s + (v || 0), 0);
  const suppTotal = (spData.supplements.homeGrownTonnes || 0) * (spData.supplements.homeGrownPrice || 0) + (spData.supplements.purchasedTonnes || 0) * (spData.supplements.purchasedPrice || 0);
  const suppAllocated = suppTotal * (spData.supplementAllocation || 100) / 100;
  return { directTotal, suppTotal, suppAllocated, totalExpenses: directTotal + suppAllocated };
}

function calcLabourFromData(data) {
  const l = data.labour;
  const totalCasual = (l.casualRate || 0) * (l.casualHrsPerWeek || 0) * (l.casualWeeksPerYear || 0);
  const totalLabour = (l.ownerOperator || 0) + (l.familyLabour || 0) + (l.salariedEmployee || 0) + totalCasual;
  const alloc = {};
  ['cattle', 'sheep', 'goat'].forEach(sp => {
    alloc[sp] = totalLabour * (l.allocation[sp] || 0) / 100;
  });
  return { totalLabour, totalCasual, alloc };
}

function calcOverheadFromData(data) {
  const o = data.overheads;
  const totalOH = (o.repairsMaintLand || 0) + (o.repairsMaintPlant || 0) + (o.depreciation || 0) + (o.adminExpenses || 0) + (o.electricityGas || 0) + (o.insurance || 0) + (o.pastureCosts || 0) + (o.ratesRents || 0) + (o.fuelOil || 0);
  const alloc = {};
  ['cattle', 'sheep', 'goat'].forEach(sp => {
    alloc[sp] = totalOH * (o.allocation[sp] || 0) / 100;
  });
  return { totalOH, alloc };
}