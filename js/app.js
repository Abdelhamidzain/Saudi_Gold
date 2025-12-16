/**
 * Saudi Gold v2 - Optimized JavaScript
 * أرقام عربية + عيار 21 رئيسي + رسم بياني كامل
 */

// ═══════════════════════════════════════════════════════════════
// Configuration
// ═══════════════════════════════════════════════════════════════
const CONFIG = {
  apiKey: '2919b5f9bdc14d018e8f3ff2d259155f',
  apiBaseUrl: 'https://api.metalpriceapi.com/v1',
  baseOunceUSD: 2650,
  usdToSar: 3.75,
  karats: { 24: 1.0000, 22: 0.9167, 21: 0.8750, 18: 0.7500, 14: 0.5833 },
  ounceToGram: 31.1035,
  retailMarkup: 1.02,
  updateInterval: 300000,
  zakatNisab: 85,
  zakatRate: 0.025,
  useLiveAPI: true,
  mainKarat: 21 // العيار الرئيسي
};

// State
const state = {
  prices: { ounceUSD: CONFIG.baseOunceUSD, ounceSAR: 0, gramPrices: {}, change: { value: 0, percentage: 0, direction: 'stable' } },
  lastUpdate: new Date(),
  historicalData: { week: [], month: [], year: [] },
  currentPeriod: 'week'
};

let previousGram21Price = 0;

// ═══════════════════════════════════════════════════════════════
// Arabic Number Formatting - أرقام عربية (٠١٢٣٤٥٦٧٨٩)
// ═══════════════════════════════════════════════════════════════
const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

function toArabicNum(num) {
  return String(num).replace(/[0-9]/g, d => arabicNumerals[d]);
}

function formatNumber(num, decimals = 2) {
  if (typeof num !== 'number' || isNaN(num)) return '٠';
  const fixed = num.toFixed(decimals);
  const parts = fixed.split('.');
  // Add thousand separators
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '٬');
  const result = parts.join('٫');
  return toArabicNum(result);
}

function formatTime(date) {
  const h = date.getHours().toString().padStart(2, '0');
  const m = date.getMinutes().toString().padStart(2, '0');
  return toArabicNum(h + ':' + m);
}

// ═══════════════════════════════════════════════════════════════
// API Functions
// ═══════════════════════════════════════════════════════════════
async function fetchLivePrices() {
  const endpoints = [
    '/api/prices.php',
    `${CONFIG.apiBaseUrl}/latest?api_key=${CONFIG.apiKey}&base=XAU&currencies=SAR,USD`
  ];
  
  for (const url of endpoints) {
    try {
      const response = await fetch(url, { method: 'GET', headers: { 'Accept': 'application/json' } });
      if (!response.ok) continue;
      const data = await response.json();
      if (!data.success) continue;
      console.log('✅ أسعار حية:', data.rates.SAR.toFixed(2), 'ر.س/أونصة');
      return { ounceSAR: data.rates.SAR, ounceUSD: data.rates.USD, timestamp: data.timestamp };
    } catch (e) { continue; }
  }
  console.warn('⚠️ استخدام أسعار احتياطية');
  return null;
}

async function calculatePrices() {
  const { karats, ounceToGram, retailMarkup, useLiveAPI } = CONFIG;
  let ounceSAR, ounceUSD;
  
  if (useLiveAPI) {
    const liveData = await fetchLivePrices();
    if (liveData) {
      ounceSAR = liveData.ounceSAR;
      ounceUSD = liveData.ounceUSD;
      updateLiveBadge(true);
    } else {
      ounceUSD = CONFIG.baseOunceUSD + (Math.random() - 0.5) * 20;
      ounceSAR = ounceUSD * CONFIG.usdToSar;
      updateLiveBadge(false);
    }
  } else {
    ounceUSD = CONFIG.baseOunceUSD + (Math.random() - 0.5) * 20;
    ounceSAR = ounceUSD * CONFIG.usdToSar;
  }
  
  state.prices.ounceUSD = ounceUSD;
  state.prices.ounceSAR = ounceSAR;
  
  const gram24kSAR = (ounceSAR / ounceToGram) * retailMarkup;
  
  state.prices.gramPrices = {};
  for (const [karat, purity] of Object.entries(karats)) {
    state.prices.gramPrices[karat] = {
      gram: gram24kSAR * purity,
      tola: gram24kSAR * purity * 11.664,
      ounce: gram24kSAR * purity * ounceToGram
    };
  }
  
  // Calculate change based on main karat (21)
  const currentPrice = state.prices.gramPrices[21]?.gram || 0;
  if (previousGram21Price > 0) {
    const changeValue = currentPrice - previousGram21Price;
    state.prices.change = {
      value: changeValue,
      percentage: (changeValue / previousGram21Price) * 100,
      direction: changeValue > 0.01 ? 'up' : changeValue < -0.01 ? 'down' : 'stable'
    };
  }
  previousGram21Price = currentPrice;
  state.lastUpdate = new Date();
  
  return state.prices;
}

function updateLiveBadge(isLive) {
  const badge = document.querySelector('.hero-badge');
  if (badge) {
    badge.innerHTML = isLive 
      ? '<span class="live-dot"></span><span>أسعار حية من البورصة العالمية</span>'
      : '<span class="live-dot" style="background:var(--gold-500)"></span><span>أسعار تقريبية</span>';
    badge.style.borderColor = isLive ? 'rgba(34,197,94,0.3)' : 'var(--border-gold)';
    badge.style.background = isLive ? 'rgba(34,197,94,0.1)' : 'rgba(212,175,55,0.1)';
    badge.style.color = isLive ? 'var(--green)' : 'var(--gold-400)';
  }
}

// ═══════════════════════════════════════════════════════════════
// DOM Updates
// ═══════════════════════════════════════════════════════════════
async function updatePriceDisplay() {
  const prices = await calculatePrices();
  const mainKarat = CONFIG.mainKarat;
  
  // Main price (عيار 21)
  const mainPriceEl = document.getElementById('mainPrice');
  if (mainPriceEl) {
    mainPriceEl.textContent = formatNumber(prices.gramPrices[mainKarat].gram);
  }
  
  // Price change
  const changeEl = document.getElementById('priceChange');
  if (changeEl) {
    const { value, percentage, direction } = prices.change;
    changeEl.className = `main-price-change ${direction}`;
    if (direction === 'stable') {
      changeEl.innerHTML = '<span>●</span><span>مستقر</span>';
    } else {
      changeEl.innerHTML = `<span>${direction === 'up' ? '▲' : '▼'}</span><span>${formatNumber(Math.abs(value))} ر.س (${formatNumber(Math.abs(percentage))}٪)</span>`;
    }
  }
  
  // Last update
  const updateEl = document.getElementById('lastUpdate');
  if (updateEl) {
    updateEl.textContent = 'آخر تحديث: ' + formatTime(state.lastUpdate);
  }
  
  updatePriceCards(prices);
  updatePriceTable(prices);
}

function updatePriceCards(prices) {
  [24, 22, 21, 18, 14].forEach(karat => {
    const el = document.getElementById(`price-${karat}`);
    if (el && prices.gramPrices[karat]) {
      el.textContent = formatNumber(prices.gramPrices[karat].gram);
    }
  });
}

function updatePriceTable(prices) {
  const tableBody = document.getElementById('pricesTableBody');
  if (!tableBody) return;
  
  const rows = [
    { name: 'سعر جرام الذهب عيار 24', karat: 24, unit: 'gram' },
    { name: 'سعر جرام الذهب عيار 22', karat: 22, unit: 'gram' },
    { name: 'سعر جرام الذهب عيار 21', karat: 21, unit: 'gram' },
    { name: 'سعر جرام الذهب عيار 18', karat: 18, unit: 'gram' },
    { name: 'سعر جرام الذهب عيار 14', karat: 14, unit: 'gram' },
    { name: 'سعر أونصة الذهب عيار 24', karat: 24, unit: 'ounce' },
  ];
  
  tableBody.innerHTML = rows.map(row => {
    const price = prices.gramPrices[row.karat][row.unit];
    const priceUSD = price / CONFIG.usdToSar;
    return `<tr><td><span class="unit-name"><span class="karat-badge">${toArabicNum(row.karat)}K</span>${row.name}</span></td><td>${formatNumber(price)}</td><td>${formatNumber(priceUSD)}</td></tr>`;
  }).join('');
}

// ═══════════════════════════════════════════════════════════════
// Calculators
// ═══════════════════════════════════════════════════════════════
function calculateGoldPrice() {
  const weight = parseFloat(document.getElementById('goldWeight')?.value) || 0;
  const karat = parseInt(document.getElementById('goldKarat')?.value) || 21;
  const resultEl = document.getElementById('calcResult');
  if (!resultEl) return;
  
  if (weight <= 0) {
    resultEl.innerHTML = '<div class="result-label">أدخل الوزن</div><div class="result-value">٠ <small>ر.س</small></div>';
    return;
  }
  
  const gramPrice = state.prices.gramPrices[karat]?.gram || 0;
  const total = weight * gramPrice;
  resultEl.innerHTML = `<div class="result-label">القيمة التقديرية</div><div class="result-value">${formatNumber(total)} <small>ر.س</small></div>`;
}

function calculateZakat() {
  const weight = parseFloat(document.getElementById('zakatWeight')?.value) || 0;
  const karat = parseInt(document.getElementById('zakatKarat')?.value) || 21;
  const resultEl = document.getElementById('zakatResult');
  if (!resultEl) return;
  
  if (weight <= 0) {
    resultEl.innerHTML = '<div class="result-label">أدخل وزن الذهب</div><div class="result-value">٠ <small>ر.س</small></div>';
    return;
  }
  
  const purity = CONFIG.karats[karat] || 1;
  const pureGold = weight * purity;
  
  if (pureGold < CONFIG.zakatNisab) {
    resultEl.innerHTML = `<div class="result-label">لم يبلغ النصاب</div><div class="result-value" style="font-size:1rem;color:var(--text-secondary)">النصاب: ${toArabicNum(CONFIG.zakatNisab)} جرام ذهب خالص<br>وزنك الخالص: ${formatNumber(pureGold)} جرام</div>`;
    return;
  }
  
  const gramPrice = state.prices.gramPrices[24]?.gram || 0;
  const totalValue = pureGold * gramPrice;
  const zakatAmount = totalValue * CONFIG.zakatRate;
  
  resultEl.innerHTML = `<div class="result-label">مبلغ الزكاة المستحق (٢٫٥٪)</div><div class="result-value">${formatNumber(zakatAmount)} <small>ر.س</small></div><div style="margin-top:10px;font-size:0.8rem;color:var(--text-secondary)">قيمة الذهب: ${formatNumber(totalValue)} ر.س</div>`;
}

// ═══════════════════════════════════════════════════════════════
// Chart - يعمل مع أسبوع/شهر/سنة
// ═══════════════════════════════════════════════════════════════
function generateHistoricalData() {
  const basePrice = state.prices.gramPrices[21]?.gram || 450;
  
  // Generate data for all periods
  state.historicalData.week = generatePeriodData(7, basePrice, 0.5);
  state.historicalData.month = generatePeriodData(30, basePrice, 1.5);
  state.historicalData.year = generatePeriodData(12, basePrice, 5, 'months');
}

function generatePeriodData(count, basePrice, volatility, type = 'days') {
  const data = [];
  for (let i = count - 1; i >= 0; i--) {
    const date = new Date();
    if (type === 'days') {
      date.setDate(date.getDate() - i);
    } else {
      date.setMonth(date.getMonth() - i);
    }
    const variation = (Math.random() - 0.5) * volatility * 10;
    const trend = (count - 1 - i) * 0.3;
    data.push({
      date: date,
      price: Math.max(basePrice + variation + trend, basePrice * 0.9)
    });
  }
  return data;
}

function renderChart(period = 'week') {
  const container = document.getElementById('priceChart');
  if (!container) return;
  
  state.currentPeriod = period;
  const data = state.historicalData[period] || [];
  
  if (data.length === 0) {
    container.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--text-muted)">جاري التحميل...</div>';
    return;
  }
  
  const maxPrice = Math.max(...data.map(d => d.price));
  const minPrice = Math.min(...data.map(d => d.price));
  const range = maxPrice - minPrice || 1;
  
  const barsHtml = data.map(d => {
    const height = ((d.price - minPrice) / range * 70) + 30;
    const label = period === 'year' ? getMonthName(d.date) : getDayName(d.date);
    return `<div class="chart-bar" style="height:${height}%" data-value="${formatNumber(d.price)} ر.س" title="${label}: ${formatNumber(d.price)} ر.س"></div>`;
  }).join('');
  
  const labelsHtml = data.map(d => {
    const label = period === 'year' ? getMonthName(d.date) : getDayName(d.date);
    return `<span class="chart-label">${label}</span>`;
  }).join('');
  
  container.innerHTML = `<div class="simple-chart">${barsHtml}</div><div class="chart-labels">${labelsHtml}</div>`;
}

function getDayName(date) {
  const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  return days[date.getDay()];
}

function getMonthName(date) {
  const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
  return months[date.getMonth()];
}

function initChartPeriods() {
  document.querySelectorAll('.chart-period').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.chart-period').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const period = btn.dataset.period || 'week';
      renderChart(period);
    });
  });
}

// ═══════════════════════════════════════════════════════════════
// UI Helpers
// ═══════════════════════════════════════════════════════════════
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    toggle.classList.toggle('active');
  });
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      toggle.classList.remove('active');
    });
  });
}

function initFormValidation() {
  ['goldWeight', 'goldKarat'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener(el.tagName === 'SELECT' ? 'change' : 'input', calculateGoldPrice);
  });
  ['zakatWeight', 'zakatKarat'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener(el.tagName === 'SELECT' ? 'change' : 'input', calculateZakat);
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

async function startAutoUpdate() {
  await updatePriceDisplay();
  generateHistoricalData();
  renderChart('week');
  setInterval(async () => {
    await updatePriceDisplay();
  }, CONFIG.updateInterval);
}

// ═══════════════════════════════════════════════════════════════
// Initialize
// ═══════════════════════════════════════════════════════════════
async function init() {
  console.log('🏆 Saudi Gold v2 - جاري التحميل...');
  initMobileMenu();
  initSmoothScroll();
  initFormValidation();
  initChartPeriods();
  await startAutoUpdate();
  console.log('✅ Saudi Gold v2 - جاهز!');
}

document.addEventListener('DOMContentLoaded', init);
