// results.js — Results rendering and charts

function calculateResults() {
  collectAllFormData();
  const container = document.getElementById('results-content');
  const enabledSpecies = ['cattle', 'sheep', 'goat'].filter(sp => formData.enterprises[sp].enabled);
  
  if (enabledSpecies.length === 0) {
    container.innerHTML = '<div class="card"><h2>No Enterprises Selected</h2><p>Please enable at least one enterprise (Cattle, Sheep, or Goat) in the setup section.</p></div>';
    return;
  }
  
  let html = '';
  
  enabledSpecies.forEach(sp => {
    const r = calcFullResults(formData, sp);
    const dp = formData[sp].dressingPercent || SPECIES_CONFIG[sp].defaultDressing;
    const bm = BENCHMARKS[sp];
    const spLabel = sp.charAt(0).toUpperCase() + sp.slice(1);
    const spEmoji = { cattle: '🐄', sheep: '🐑', goat: '🐐' }[sp];
    
    html += `
    <div class="results-enterprise card" id="results-${sp}">
      <h2>${spEmoji} ${spLabel} — Cost of Production Results</h2>
      
      <div class="results-grid">
        <div class="result-card highlight">
          <div class="value">${formatMoney2(r.copPerKgLwt)}</div>
          <div class="label">COP ($/kg lwt)</div>
        </div>
        <div class="result-card highlight">
          <div class="value">${formatMoney2(r.copPerKgDwt)}</div>
          <div class="label">COP ($/kg dwt)</div>
        </div>
        <div class="result-card">
          <div class="value">${formatMoney2(r.incomePerKgLwt)}</div>
          <div class="label">Income ($/kg lwt)</div>
        </div>
        <div class="result-card">
          <div class="value">${formatMoney(r.totalIncome)}</div>
          <div class="label">Total Income</div>
        </div>
        <div class="result-card ${r.marginPerKgLwt >= 0 ? '' : 'highlight'}">
          <div class="value">${formatMoney2(r.marginPerKgLwt)}</div>
          <div class="label">Margin ($/kg lwt)</div>
        </div>
        <div class="result-card">
          <div class="value">${formatNumber(r.kgProducedLwt)}</div>
          <div class="label">kg Produced (lwt)</div>
        </div>
      </div>
      
      <h3>Cost Breakdown</h3>
      <table class="results-table">
        <tr><td>Total Income</td><td style="text-align:right">${formatMoney(r.totalIncome)}</td></tr>
        <tr><td>Trading Income</td><td style="text-align:right">${formatMoney(r.trading.tradingIncome)}</td></tr>
        ${sp === 'sheep' ? `<tr><td>Wool Income</td><td style="text-align:right">${formatMoney(formData.sheep.woolIncome || 0)}</td></tr>` : ''}
        <tr><td>Sales Value</td><td style="text-align:right">${formatMoney(r.trading.salesValue)}</td></tr>
        <tr><td>Purchase Value</td><td style="text-align:right">${formatMoney(r.trading.purchaseValue)}</td></tr>
        <tr><td>Change in Inventory</td><td style="text-align:right">${formatMoney(r.trading.changeInInventoryValue)}</td></tr>
        <tr><td colspan="2"><hr></td></tr>
        <tr><td>Direct Expenses</td><td style="text-align:right">${formatMoney(r.directExpenses)}</td></tr>
        <tr><td>Supplement Expenses</td><td style="text-align:right">${formatMoney(r.suppExpenses)}</td></tr>
        <tr><td>Labour (allocated)</td><td style="text-align:right">${formatMoney(r.labour)}</td></tr>
        <tr><td>Overheads (allocated)</td><td style="text-align:right">${formatMoney(r.overheads)}</td></tr>
        <tr><td colspan="2"><hr></td></tr>
        <tr style="font-weight:700"><td>Total Cost of Production</td><td style="text-align:right">${formatMoney(r.totalCOP)}</td></tr>
      </table>
      
      <h3>COP vs Income ($/kg lwt)</h3>
      <div class="chart-container">
        <canvas id="chart-${sp}-income"></canvas>
      </div>
      
      <h3>Industry Benchmark Comparison</h3>
      <div class="benchmark-bars">
        <div class="benchmark-bar">
          <div class="bar-label">Your COP: ${formatMoney2(r.copPerKgLwt)}/kg</div>
          <div class="bar-track"><div class="bar-fill" style="width:${Math.min(100, r.copPerKgLwt / (bm.avg * 1.5) * 100)}%; background:${r.copPerKgLwt <= bm.avg ? 'var(--secondary)' : 'var(--accent)'}"><span class="bar-value">${formatMoney2(r.copPerKgLwt)}</span></div></div>
        </div>
        <div class="benchmark-bar">
          <div class="bar-label">Industry Average: ${formatMoney2(bm.avg)}/kg</div>
          <div class="bar-track"><div class="bar-fill" style="width:${Math.min(100, bm.avg / (bm.avg * 1.5) * 100)}%; background:var(--primary)"><span class="bar-value">${formatMoney2(bm.avg)}</span></div></div>
        </div>
        <div class="benchmark-bar">
          <div class="bar-label">Top 20%: ${formatMoney2(bm.top20)}/kg</div>
          <div class="bar-track"><div class="bar-fill" style="width:${Math.min(100, bm.top20 / (bm.avg * 1.5) * 100)}%; background:var(--teal)"><span class="bar-value">${formatMoney2(bm.top20)}</span></div></div>
        </div>
      </div>
      
      <h3>Cost Composition</h3>
      <div class="chart-container">
        <canvas id="chart-${sp}-composition"></canvas>
      </div>
    </div>
    `;
  });
  
  container.innerHTML = html;
  
  // Render charts after DOM update
  setTimeout(() => {
    enabledSpecies.forEach(sp => {
      const r = calcFullResults(formData, sp);
      renderIncomeChart(sp, r);
      renderCompositionChart(sp, r);
    });
  }, 100);
}

function renderIncomeChart(sp, r) {
  const canvas = document.getElementById(`chart-${sp}-income`);
  if (!canvas) return;
  
  const maxVal = Math.max(r.copPerKgLwt, r.incomePerKgLwt) * 1.2;
  
  new Chart(canvas, {
    type: 'bar',
    data: {
      labels: ['COP ($/kg)', 'Income ($/kg)', 'Margin ($/kg)'],
      datasets: [{
        data: [r.copPerKgLwt, r.incomePerKgLwt, r.marginPerKgLwt],
        backgroundColor: ['#FF6633', '#006633', '#1E9368'],
        borderWidth: 0,
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, max: maxVal, ticks: { callback: v => '$' + v.toFixed(2) } }
      }
    }
  });
}

function renderCompositionChart(sp, r) {
  const canvas = document.getElementById(`chart-${sp}-composition`);
  if (!canvas) return;
  
  new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: ['Direct Expenses', 'Supplements', 'Labour', 'Overheads'],
      datasets: [{
        data: [r.directExpenses, r.suppExpenses, r.labour, r.overheads],
        backgroundColor: ['#FF6633', '#FFE27E', '#006633', '#1E9368'],
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom' },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.label}: ${formatMoney(ctx.raw)}`
          }
        }
      }
    }
  });
}

// PDF Export
function exportPDF() {
  // Use jsPDF
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
  script.onload = () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    const enabledSpecies = ['cattle', 'sheep', 'goat'].filter(sp => formData.enterprises[sp].enabled);
    
    let y = 20;
    doc.setFontSize(18);
    doc.setTextColor(0, 102, 51);
    doc.text('MLA Cost of Production Report', 105, y, { align: 'center' });
    y += 10;
    doc.setFontSize(12);
    doc.setTextColor(51, 51, 51);
    doc.text(formData.scenarioName || 'Untitled Scenario', 105, y, { align: 'center' });
    y += 10;
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 105, y, { align: 'center' });
    y += 15;
    
    enabledSpecies.forEach(sp => {
      if (y > 250) { doc.addPage(); y = 20; }
      const r = calcFullResults(formData, sp);
      const spLabel = sp.charAt(0).toUpperCase() + sp.slice(1);
      
      doc.setFontSize(14);
      doc.setTextColor(0, 102, 51);
      doc.text(`${spLabel} Enterprise`, 15, y);
      y += 8;
      
      doc.setFontSize(10);
      doc.setTextColor(51, 51, 51);
      const lines = [
        `Total Income: ${formatMoney(r.totalIncome)}`,
        `Direct Expenses: ${formatMoney(r.directExpenses)}`,
        `Supplement Expenses: ${formatMoney(r.suppExpenses)}`,
        `Labour (allocated): ${formatMoney(r.labour)}`,
        `Overheads (allocated): ${formatMoney(r.overheads)}`,
        `Total COP: ${formatMoney(r.totalCOP)}`,
        `COP ($/kg lwt): ${formatMoney2(r.copPerKgLwt)}`,
        `COP ($/kg dwt): ${formatMoney2(r.copPerKgDwt)}`,
        `Income ($/kg lwt): ${formatMoney2(r.incomePerKgLwt)}`,
        `Margin ($/kg lwt): ${formatMoney2(r.marginPerKgLwt)}`,
        `kg Produced (lwt): ${formatNumber(r.kgProducedLwt)}`
      ];
      lines.forEach(line => {
        doc.text(line, 20, y);
        y += 6;
      });
      y += 10;
    });
    
    doc.save(`MLA-COP-${(formData.scenarioName || 'report').replace(/\s+/g, '-')}.pdf`);
  };
  document.head.appendChild(script);
}