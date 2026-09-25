/**
 * AI-Based Chocolate Paan Sales Prediction System
 * Interactive Client-Side Scripts (Week 8 & Week 9)
 */

document.addEventListener('DOMContentLoaded', () => {
  initScenarioPresets();
  initPredictionForm();
});

// Preset scenario data definitions
const SCENARIOS = {
  normal: {
    Temperature: 28.5,
    Price: 120,
    Discount_Percentage: 10,
    Marketing_Budget: 500,
    Instagram_Reel: 1,
    YouTube_Video: 0,
    Facebook_Ads: 1,
    Returning_Customers: 45,
    New_Customers: 25,
    Online_Orders: 30,
    Offline_Orders: 40,
    Customer_Rating: 4.3,
    Festival: 0,
    Weekend: 0
  },
  festival_peak: {
    Temperature: 24.0,
    Price: 120,
    Discount_Percentage: 20,
    Marketing_Budget: 2500,
    Instagram_Reel: 4,
    YouTube_Video: 2,
    Facebook_Ads: 5,
    Returning_Customers: 120,
    New_Customers: 85,
    Online_Orders: 95,
    Offline_Orders: 110,
    Customer_Rating: 4.8,
    Festival: 1,
    Weekend: 1
  },
  marketing_boost: {
    Temperature: 29.0,
    Price: 130,
    Discount_Percentage: 15,
    Marketing_Budget: 3500,
    Instagram_Reel: 6,
    YouTube_Video: 3,
    Facebook_Ads: 7,
    Returning_Customers: 90,
    New_Customers: 70,
    Online_Orders: 80,
    Offline_Orders: 65,
    Customer_Rating: 4.6,
    Festival: 0,
    Weekend: 1
  }
};

function initScenarioPresets() {
  const presetBtns = document.querySelectorAll('[data-scenario]');
  presetBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const scenarioKey = btn.getAttribute('data-scenario');
      if (scenarioKey === 'clear') {
        clearForm();
        return;
      }
      const data = SCENARIOS[scenarioKey];
      if (!data) return;

      Object.entries(data).forEach(([key, val]) => {
        const input = document.getElementById(key);
        if (input) {
          input.value = val;
          input.classList.add('highlight-field');
          setTimeout(() => input.classList.remove('highlight-field'), 600);
        }
      });
    });
  });
}

function clearForm() {
  const form = document.getElementById('predictionForm');
  if (form) {
    const inputs = form.querySelectorAll('input:not([type="hidden"]), select');
    inputs.forEach(inp => inp.value = '');
  }
}

function initPredictionForm() {
  const form = document.getElementById('predictionForm');
  const loadingOverlay = document.getElementById('loadingOverlay');
  const submitBtn = document.getElementById('predictSubmitBtn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    // Basic client-side pre-validation
    const price = parseFloat(document.getElementById('Price')?.value);
    const discount = parseFloat(document.getElementById('Discount_Percentage')?.value);
    const rating = parseFloat(document.getElementById('Customer_Rating')?.value);

    if (isNaN(price) || price <= 0) {
      alert('Price must be a positive number greater than 0.');
      e.preventDefault();
      return;
    }
    if (isNaN(discount) || discount < 0 || discount > 100) {
      alert('Discount Percentage must be between 0% and 100%.');
      e.preventDefault();
      return;
    }
    if (isNaN(rating) || rating < 1.0 || rating > 5.0) {
      alert('Customer Rating must be between 1.0 and 5.0.');
      e.preventDefault();
      return;
    }

    // Show loading state
    if (loadingOverlay) loadingOverlay.style.display = 'flex';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Predicting Sales...</span>';
    }
  });
}
