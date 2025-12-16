/**
 * ═══════════════════════════════════════════════════════════════
 * 🏆 SAUDI GOLD - Main JavaScript
 * ═══════════════════════════════════════════════════════════════
 */

// ─────────────────────────────────────────────────────────────────
// Configuration
// ─────────────────────────────────────────────────────────────────
const CONFIG = {
  // MetalpriceAPI Configuration
  apiKey: '2919b5f9bdc14d018e8f3ff2d259155f',
  apiBaseUrl: 'https://api.metalpriceapi.com/v1',

  // Base gold price per ounce in USD (fallback)
  baseOunceUSD: 2650,

  // USD to SAR exchange rate (fallback)
  usdToSar: 3.75,

  // Karat purities
  karats: {
    24: 1.0000,
    22: 0.9167,
    21: 0.8750,
    18: 0.7500,
    14: 0.5833
  },

  // Troy ounce to gram
  ounceToGram: 31.1035,

  // Markup for retail
  retailMarkup: 1.02,

  // Update interval (ms) - 5 minutes
  updateInterval: 300000,

  // Nisab for Zakat (85 grams of gold)
  zakatNisab: 85,

  // Zakat rate
  zakatRate: 0.025,

  // Use live API
  useLiveAPI: true
};

// ─────────────────────────────────────────────────────────────────
// State Management
// ─────────────────────────────────────────────────────────────────
const state = {
  prices: {
    ounceUSD: CONFIG.baseOunceUSD,
    ounceSAR: 0,
    gramPrices: {},
    change: { value: 0, percentage: 0, direction: 'stable' }
  },
  lastUpdate: new Date(),
  historicalData: []
};

// ─────────────────────────────────────────────────────────────────
// Price Calculations
// ─────────────────────────────────────────────────────────────────

// Store previous price for change calculation
let previousGram24Price = 0;

// Fetch prices from MetalpriceAPI
async function fetchLivePrices() {
  try {
    const response = await fetch(
      `${CONFIG.apiBaseUrl}/latest?api_key=${CONFIG.apiKey}&base=XAU&currencies=SAR,USD`
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'API returned error');
    }

    // API returns: 1 XAU = X SAR (price per ounce)
    const ounceSAR = data.rates.SAR;
    const ounceUSD = data.rates.USD;

    return {
      ounceSAR: ounceSAR,
      ounceUSD: ounceUSD,
      timestamp: data.timestamp
    };

  } catch (error) {
    console.error('Failed to fetch live prices:', error);
    return null;
  }
}

async function calculatePrices() {
  const { karats, ounceToGram, retailMarkup, useLiveAPI } = CONFIG;

  let ounceSAR, ounceUSD;

  // Try to fetch live prices
  if (useLiveAPI) {
    const liveData = await fetchLivePrices();

    if (liveData) {
      ounceSAR = liveData.ounceSAR;
      ounceUSD = liveData.ounceUSD;

      // Update badge to show live
      updateLiveBadge(true);
    } else {
      // Fallback to config values
      ounceUSD = CONFIG.baseOunceUSD;
      ounceSAR = ounceUSD * CONFIG.usdToSar;
      updateLiveBadge(false);
    }
  } else {
    // Use config values with slight variation for demo
    const variation = (Math.random() - 0.5) * 10;
    ounceUSD = CONFIG.baseOunceUSD + variation;
    ounceSAR = ounceUSD * CONFIG.usdToSar;
  }

  state.prices.ounceUSD = ounceUSD;
  state.prices.ounceSAR = ounceSAR;

  // Calculate gram price for 24k
  const gram24kSAR = (ounceSAR / ounceToGram) * retailMarkup;

  // Calculate all karat prices
  state.prices.gramPrices = {};
  for (const [karat, purity] of Object.entries(karats)) {
    state.prices.gramPrices[karat] = {
      gram: gram24kSAR * purity,
      tola: gram24kSAR * purity * 11.664,
      ounce: gram24kSAR * purity * ounceToGram
    };
  }

  // Calculate change from previous price
  if (previousGram24Price > 0) {
    const changeValue = gram24kSAR - previousGram24Price;
    state.prices.change = {
      value: changeValue,
      percentage: (changeValue / previousGram24Price) * 100,
      direction: changeValue >= 0 ? 'up' : changeValue < 0 ? 'down' : 'stable'
    };
  } else {
    state.prices.change = {
      value: 0,
      percentage: 0,
      direction: 'stable'
    };
  }

  previousGram24Price = gram24kSAR;
  state.lastUpdate = new Date();

  return state.prices;
}

// Update live badge status
function updateLiveBadge(isLive) {
  const badge = document.querySelector('.hero-badge');
  if (badge) {
    if (isLive) {
      badge.innerHTML = `
        <span class="live-dot"></span>
        <span>أسعار حية من البورصة</span>
      `;
      badge.style.borderColor = 'rgba(34, 197, 94, 0.5)';
    } else {
      badge.innerHTML = `
        <span class="live-dot" style="background: var(--gold-500);"></span>
        <span>أسعار تقريبية</span>
      `;
      badge.style.borderColor = 'var(--border-gold)';
    }
  }
}

// ─────────────────────────────────────────────────────────────────
// DOM Updates
// ─────────────────────────────────────────────────────────────────
async function updatePriceDisplay() {
  // Show loading state
  const mainPriceEl = document.getElementById('mainPrice');
  if (mainPriceEl && !state.prices.gramPrices[24]) {
    mainPriceEl.textContent = '...';
  }

  const prices = await calculatePrices();

  // Update main price display
  if (mainPriceEl) {
    mainPriceEl.textContent = formatNumber(prices.gramPrices[24].gram);
  }

  // Update price change
  const changeEl = document.getElementById('priceChange');
  if (changeEl) {
    const { value, percentage, direction } = prices.change;
    changeEl.className = `main-price-change ${direction}`;

    if (Math.abs(value) < 0.01) {
      changeEl.innerHTML = `
        <span>●</span>
        <span>ثابت</span>
      `;
    } else {
      changeEl.innerHTML = `
        <span>${direction === 'up' ? '▲' : '▼'}</span>
        <span>${formatNumber(Math.abs(value))} ر.س (${formatNumber(Math.abs(percentage), 2)}%)</span>
      `;
    }
  }

  // Update last update time
  const updateEl = document.getElementById('lastUpdate');
  if (updateEl) {
    updateEl.textContent = `آخر تحديث: ${formatTime(state.lastUpdate)}`;
  }

  // Update price cards
  updatePriceCards(prices);

  // Update table
  updatePriceTable(prices);
}

function updatePriceCards(prices) {
  const karatOrder = [24, 22, 21, 18, 14];

  karatOrder.forEach(karat => {
    const cardEl = document.getElementById(`price-${karat}`);
    if (cardEl && prices.gramPrices[karat]) {
      cardEl.textContent = formatNumber(prices.gramPrices[karat].gram);
    }
  });
}

function updatePriceTable(prices) {
  const tableBody = document.getElementById('pricesTableBody');
  if (!tableBody) return;

  const rows = [
    { name: 'جرام ذهب عيار 24', karat: 24, unit: 'gram' },
    { name: 'جرام ذهب عيار 22', karat: 22, unit: 'gram' },
    { name: 'جرام ذهب عيار 21', karat: 21, unit: 'gram' },
    { name: 'جرام ذهب عيار 18', karat: 18, unit: 'gram' },
    { name: 'جرام ذهب عيار 14', karat: 14, unit: 'gram' },
    { name: 'أونصة ذهب عيار 24', karat: 24, unit: 'ounce' },
  ];

  tableBody.innerHTML = rows.map(row => {
    const price = prices.gramPrices[row.karat][row.unit];
    const priceUSD = price / CONFIG.usdToSar;

    return `
      <tr>
        <td>
          <span class="unit-name">
            <span class="karat-badge">${row.karat}K</span>
            ${row.name}
          </span>
        </td>
        <td>${formatNumber(price)}</td>
        <td>${formatNumber(priceUSD)}</td>
      </tr>
    `;
  }).join('');
}

// ─────────────────────────────────────────────────────────────────
// Gold Price Calculator
// ─────────────────────────────────────────────────────────────────
function calculateGoldPrice() {
  const weightInput = document.getElementById('goldWeight');
  const karatSelect = document.getElementById('goldKarat');
  const resultEl = document.getElementById('calcResult');

  if (!weightInput || !karatSelect || !resultEl) return;

  const weight = parseFloat(weightInput.value) || 0;
  const karat = parseInt(karatSelect.value) || 24;

  if (weight <= 0) {
    resultEl.innerHTML = `
      <div class="result-label">أدخل الوزن</div>
      <div class="result-value">0 <small>ر.س</small></div>
    `;
    return;
  }

  const gramPrice = state.prices.gramPrices[karat]?.gram || 0;
  const totalPrice = weight * gramPrice;

  resultEl.innerHTML = `
    <div class="result-label">القيمة التقديرية</div>
    <div class="result-value">${formatNumber(totalPrice)} <small>ر.س</small></div>
  `;
}

// ─────────────────────────────────────────────────────────────────
// Zakat Calculator
// ─────────────────────────────────────────────────────────────────
function calculateZakat() {
  const weightInput = document.getElementById('zakatWeight');
  const karatSelect = document.getElementById('zakatKarat');
  const resultEl = document.getElementById('zakatResult');

  if (!weightInput || !karatSelect || !resultEl) return;

  const weight = parseFloat(weightInput.value) || 0;
  const karat = parseInt(karatSelect.value) || 24;

  if (weight <= 0) {
    resultEl.innerHTML = `
      <div class="result-label">أدخل وزن الذهب</div>
      <div class="result-value">0 <small>ر.س</small></div>
    `;
    return;
  }

  // Calculate pure gold weight
  const purity = CONFIG.karats[karat] || 1;
  const pureGoldWeight = weight * purity;

  // Check if reaches Nisab
  if (pureGoldWeight < CONFIG.zakatNisab) {
    resultEl.innerHTML = `
      <div class="result-label">لم يبلغ النصاب</div>
      <div class="result-value" style="font-size: 1rem; color: var(--text-secondary);">
        النصاب: ${CONFIG.zakatNisab} جرام ذهب خالص
        <br>
        وزنك الخالص: ${formatNumber(pureGoldWeight, 2)} جرام
      </div>
    `;
    return;
  }

  // Calculate Zakat
  const gramPrice = state.prices.gramPrices[24]?.gram || 0;
  const totalValue = pureGoldWeight * gramPrice;
  const zakatAmount = totalValue * CONFIG.zakatRate;

  resultEl.innerHTML = `
    <div class="result-label">مبلغ الزكاة المستحق (2.5%)</div>
    <div class="result-value">${formatNumber(zakatAmount)} <small>ر.س</small></div>
    <div style="margin-top: 10px; font-size: 0.8rem; color: var(--text-secondary);">
      قيمة الذهب: ${formatNumber(totalValue)} ر.س
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────────
// Historical Chart
// ─────────────────────────────────────────────────────────────────
function generateHistoricalData() {
  const data = [];
  const basePrice = state.prices.gramPrices[24]?.gram || 320;

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    // Generate realistic price variation
    const variation = (Math.random() - 0.5) * 15;
    const price = basePrice + variation - (i * 0.5);

    data.push({
      date: date,
      price: Math.max(price, basePrice * 0.95)
    });
  }

  state.historicalData = data;
  return data;
}

function renderChart() {
  const chartContainer = document.getElementById('priceChart');
  if (!chartContainer) return;

  const data = generateHistoricalData();
  const maxPrice = Math.max(...data.map(d => d.price));
  const minPrice = Math.min(...data.map(d => d.price));
  const range = maxPrice - minPrice || 1;

  // Generate bars
  const barsHtml = data.map((d, i) => {
    const height = ((d.price - minPrice) / range * 70) + 30; // 30-100% height
    const dayName = getDayName(d.date);

    return `
      <div class="chart-bar" 
           style="height: ${height}%;" 
           data-value="${formatNumber(d.price)} ر.س"
           title="${dayName}: ${formatNumber(d.price)} ر.س">
      </div>
    `;
  }).join('');

  // Generate labels
  const labelsHtml = data.map(d => {
    return `<span class="chart-label">${getDayName(d.date)}</span>`;
  }).join('');

  chartContainer.innerHTML = `
    <div class="simple-chart">${barsHtml}</div>
    <div class="chart-labels">${labelsHtml}</div>
  `;
}

// ─────────────────────────────────────────────────────────────────
// Utility Functions
// ─────────────────────────────────────────────────────────────────
function formatNumber(num, decimals = 2) {
  if (typeof num !== 'number' || isNaN(num)) return '0';
  return num.toLocaleString('ar-SA', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

function formatTime(date) {
  return date.toLocaleTimeString('ar-SA', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

function getDayName(date) {
  const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  return days[date.getDay()];
}

// ─────────────────────────────────────────────────────────────────
// Mobile Menu
// ─────────────────────────────────────────────────────────────────
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    toggle.classList.toggle('active');
  });

  // Close menu when clicking on a link
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      toggle.classList.remove('active');
    });
  });
}

// ─────────────────────────────────────────────────────────────────
// Tab Switching
// ─────────────────────────────────────────────────────────────────
function initTabs() {
  document.querySelectorAll('[data-tab]').forEach(tab => {
    tab.addEventListener('click', () => {
      const group = tab.closest('.table-tabs, .chart-periods');
      if (!group) return;

      group.querySelectorAll('[data-tab]').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Handle specific tab actions here if needed
    });
  });
}

// ─────────────────────────────────────────────────────────────────
// Smooth Scroll
// ─────────────────────────────────────────────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ─────────────────────────────────────────────────────────────────
// Form Validation
// ─────────────────────────────────────────────────────────────────
function initFormValidation() {
  // Gold calculator
  const goldWeight = document.getElementById('goldWeight');
  const goldKarat = document.getElementById('goldKarat');

  if (goldWeight) {
    goldWeight.addEventListener('input', calculateGoldPrice);
  }
  if (goldKarat) {
    goldKarat.addEventListener('change', calculateGoldPrice);
  }

  // Zakat calculator
  const zakatWeight = document.getElementById('zakatWeight');
  const zakatKarat = document.getElementById('zakatKarat');

  if (zakatWeight) {
    zakatWeight.addEventListener('input', calculateZakat);
  }
  if (zakatKarat) {
    zakatKarat.addEventListener('change', calculateZakat);
  }
}

// ─────────────────────────────────────────────────────────────────
// Auto Update
// ─────────────────────────────────────────────────────────────────
async function startAutoUpdate() {
  // Initial update
  await updatePriceDisplay();
  renderChart();

  // Set interval for updates (every 5 minutes for API)
  setInterval(async () => {
    await updatePriceDisplay();
  }, CONFIG.updateInterval);
}

// ─────────────────────────────────────────────────────────────────
// Animation on Scroll
// ─────────────────────────────────────────────────────────────────
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.section, .price-card, .calculator-card, .market-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

// ─────────────────────────────────────────────────────────────────
// Service Worker Registration (for PWA)
// ─────────────────────────────────────────────────────────────────
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('SW registered'))
      .catch(err => console.log('SW registration failed'));
  }
}

// ─────────────────────────────────────────────────────────────────
// Initialize App
// ─────────────────────────────────────────────────────────────────
async function init() {
  console.log('🏆 Saudi Gold initializing...');

  // Initialize components
  initMobileMenu();
  initTabs();
  initSmoothScroll();
  initFormValidation();

  // Start updates (will fetch from API)
  await startAutoUpdate();

  // Initialize animations (optional - can be disabled for performance)
  // initScrollAnimations();

  // Register service worker
  // registerServiceWorker();

  console.log('🏆 Saudi Gold initialized successfully!');
  console.log(`📡 API Mode: ${CONFIG.useLiveAPI ? 'LIVE' : 'DEMO'}`);
}

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', init);

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    calculatePrices,
    calculateGoldPrice,
    calculateZakat,
    formatNumber
  };
}