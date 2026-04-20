// import.js — Import from old tool (manual data entry mode)

function importDialog() {
  const modal = document.getElementById('modal-content');
  const overlay = document.getElementById('modal-overlay');
  
  modal.innerHTML = `
    <h2>Import from Old Tool</h2>
    <p>Transfer data from the existing MLA COP Calculator by entering values below. This creates a new scenario with your existing data.</p>
    
    <div style="margin-top: 16px;">
      <label style="font-weight:600">Select Enterprise</label>
      <select id="import-species" style="width:100%;padding:8px;margin-top:4px">
        <option value="cattle">Cattle</option>
        <option value="sheep">Sheep</option>
        <option value="goat">Goat</option>
      </select>
    </div>
    
    <div style="margin-top: 16px;">
      <label style="font-weight:600">Scenario Name</label>
      <input type="text" id="import-name" placeholder="e.g. 2023 Cattle Enterprise" class="full-width" style="margin-top:4px">
    </div>
    
    <div style="margin-top: 16px;">
      <h3>Paste Data (JSON or CSV)</h3>
      <p style="font-size:13px;color:#666">Paste your data from the old tool. You can also manually enter values after importing.</p>
      <textarea id="import-data" rows="8" style="width:100%;font-family:monospace;font-size:12px;padding:8px;margin-top:4px" placeholder="Paste exported data here, or leave empty to start fresh with manual entry..."></textarea>
    </div>
    
    <div style="margin-top: 16px; display: flex; gap: 8px;">
      <button class="btn btn-primary" id="do-import">Import & Start</button>
      <button class="btn btn-outline" id="import-manual">Start Fresh</button>
      <button class="btn btn-outline" id="cancel-modal">Cancel</button>
    </div>
  `;
  overlay.style.display = 'flex';
  
  document.getElementById('do-import').addEventListener('click', () => {
    const data = document.getElementById('import-data').value.trim();
    const name = document.getElementById('import-name').value || 'Imported Scenario';
    const species = document.getElementById('import-species').value;
    
    if (data) {
      try {
        const parsed = JSON.parse(data);
        // Merge into current form data
        if (parsed.scenarioName) formData.scenarioName = parsed.scenarioName;
        if (parsed[species]) Object.assign(formData[species], parsed[species]);
        if (parsed.labour) Object.assign(formData.labour, parsed.labour);
        if (parsed.overheads) Object.assign(formData.overheads, parsed.overheads);
        if (parsed.enterprises) Object.assign(formData.enterprises, parsed.enterprises);
      } catch (e) {
        alert('Could not parse the data. Please ensure it is valid JSON.');
        return;
      }
    }
    
    formData.scenarioName = name;
    formData.enterprises[species].enabled = true;
    state.enterprises = JSON.parse(JSON.stringify(formData.enterprises));
    initEnterpriseToggles();
    buildAllTables();
    loadFormDataIntoUI();
    updateSpeciesTabs();
    switchSpecies(species);
    showStep(1);
    overlay.style.display = 'none';
  });
  
  document.getElementById('import-manual').addEventListener('click', () => {
    const name = document.getElementById('import-name').value || 'New Scenario';
    const species = document.getElementById('import-species').value;
    formData = getDefaultState();
    formData.scenarioName = name;
    formData.enterprises[species].enabled = true;
    state.enterprises = JSON.parse(JSON.stringify(formData.enterprises));
    initEnterpriseToggles();
    buildAllTables();
    loadFormDataIntoUI();
    updateSpeciesTabs();
    switchSpecies(species);
    showStep(1);
    overlay.style.display = 'none';
  });
  
  document.getElementById('cancel-modal').addEventListener('click', () => overlay.style.display = 'none');
}