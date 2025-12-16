// الأرقام - تبقى إنجليزية
export const toAr = n => String(n);

export const fmt = (n, d = 2) => {
  if (typeof n !== 'number' || isNaN(n)) return '0';
  return n.toLocaleString('en-US', {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  });
};

// العيارات
export const KARATS = {
  24: { purity: 1, name: 'عيار 24', nameEn: '24K', desc: 'ذهب خالص 99.9%' },
  22: { purity: 0.9167, name: 'عيار 22', nameEn: '22K', desc: 'نقاوة 91.6%' },
  21: { purity: 0.875, name: 'عيار 21', nameEn: '21K', desc: 'الأكثر شيوعاً 87.5%' },
  18: { purity: 0.75, name: 'عيار 18', nameEn: '18K', desc: 'للمجوهرات الفاخرة 75%' },
  14: { purity: 0.5833, name: 'عيار 14', nameEn: '14K', desc: 'للمجوهرات المتينة 58.3%' },
};

export const MARKUP = 1.02;
export const OUNCE = 31.1035;
export const NISAB = 85; // نصاب الزكاة بالجرام

// أوزان السبائك
export const BAR_WEIGHTS = [1, 2.5, 5, 10, 20, 50, 100, 250, 500, 1000];

// حساب أسعار الجرامات
export function calcGramPrices(sarPerOunce) {
  if (!sarPerOunce || sarPerOunce <= 0) return null;
  const gram24 = (sarPerOunce / OUNCE) * MARKUP;
  const prices = {};
  for (const [k, data] of Object.entries(KARATS)) {
    prices[k] = {
      gram: gram24 * data.purity,
      ounce: gram24 * data.purity * OUNCE,
      kilo: gram24 * data.purity * 1000,
    };
  }
  return prices;
}

// حساب أسعار السبائك
export function calcBarPrices(gram24Price) {
  return BAR_WEIGHTS.map(weight => ({
    weight,
    price: gram24Price * weight,
    premium: weight >= 100 ? 0.015 : weight >= 50 ? 0.02 : weight >= 10 ? 0.03 : 0.05,
  }));
}

// حساب الزكاة
export function calcZakat(weightGrams, karat, gram24Price) {
  const purity = KARATS[karat]?.purity || 0.875;
  const pureGold = weightGrams * purity;
  
  if (pureGold < NISAB) {
    return { eligible: false, pureGold, nisab: NISAB };
  }
  
  const value = pureGold * gram24Price;
  const zakat = value * 0.025;
  
  return { eligible: true, pureGold, value, zakat, nisab: NISAB };
}

// تنسيق الوقت بتوقيت الرياض
export function formatRiyadhTime(date) {
  return new Date(date).toLocaleString('en-US', {
    timeZone: 'Asia/Riyadh',
    hour: '2-digit',
    minute: '2-digit',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// أسواق الذهب
export const GOLD_MARKETS = [
  { icon: '🏙️', name: 'سوق الثميري', city: 'الرياض', area: 'حي البطحاء', tags: ['تشكيلات متنوعة', 'أسعار تنافسية', 'قابل للتفاوض'] },
  { icon: '🌊', name: 'سوق الذهب', city: 'جدة', area: 'حي البلد', tags: ['محلات كثيرة', 'تصاميم متنوعة', 'قابل للتفاوض'] },
  { icon: '🕋', name: 'سوق العتيبية', city: 'مكة المكرمة', area: 'العتيبية', tags: ['أسعار منافسة', 'قريب من الحرم'] },
  { icon: '🌴', name: 'سوق المدينة الدولي', city: 'المدينة المنورة', area: 'المنطقة المركزية', tags: ['ماركات عالمية', 'تصاميم حديثة'] },
  { icon: '🛢️', name: 'سوق الذهب', city: 'الدمام', area: 'حي الفيصلية', tags: ['أسعار تنافسية', 'خدمة ممتازة'] },
  { icon: '💎', name: 'سوق البطحاء', city: 'الرياض', area: 'البطحاء', tags: ['أرخص الأسعار', 'تشكيلة واسعة'] },
];

// روابط الصفحات
export const PAGES = {
  home: { path: '/', title: 'سعر الذهب اليوم في السعودية' },
  karat21: { path: '/karat-21', title: 'سعر الذهب عيار 21' },
  karat22: { path: '/karat-22', title: 'سعر الذهب عيار 22' },
  karat24: { path: '/karat-24', title: 'سعر الذهب عيار 24' },
  karat18: { path: '/karat-18', title: 'سعر الذهب عيار 18' },
  bars: { path: '/gold-bars', title: 'أسعار سبائك الذهب' },
  calculator: { path: '/calculator', title: 'حاسبة سعر الذهب' },
  zakat: { path: '/zakat', title: 'حاسبة زكاة الذهب' },
  workmanship: { path: '/workmanship', title: 'مصنعية الذهب' },
  buySell: { path: '/buy-sell', title: 'بيع وشراء الذهب' },
  markets: { path: '/markets', title: 'أسواق الذهب' },
  ounce: { path: '/ounce', title: 'سعر أونصة الذهب' },
  silver: { path: '/silver', title: 'سعر الفضة' },
  history: { path: '/history', title: 'تاريخ أسعار الذهب' },
};
