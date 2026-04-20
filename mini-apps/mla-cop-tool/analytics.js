// analytics.js — Google Analytics 4 placeholder
// Replace GA_MEASUREMENT_ID with your actual Measurement ID

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'GA_MEASUREMENT_ID', {
  page_title: 'MLA Cost of Production Calculator',
  page_location: window.location.href
});

// Track key events
function trackEvent(eventName, params) {
  if (typeof gtag === 'function') {
    gtag('event', eventName, params);
  }
}

// Track scenario calculations
function trackCalculation(species, copPerKg) {
  trackEvent('calculate_cop', {
    species: species,
    cop_per_kg: copPerKg,
    currency: 'AUD'
  });
}

// Track scenario saves
function trackSave(scenarioName) {
  trackEvent('save_scenario', { scenario_name: scenarioName });
}

// Track exports
function trackExport(format) {
  trackEvent('export_results', { format: format });
}