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

// ─── مصدر موحّد لأسعار السبيكة والبيع (لضمان تطابق الأرقام في كل الصفحات) ───
// السبيكة بدون هامش: سعر جرام العيار × الوزن.
export function calcBarPrice(gramPrice, weight) {
  return (gramPrice || 0) * weight;
}
// خصم سعر البيع/المستعمل الموحّد: 3%.
export const SELL_FACTOR = 0.97;
export function calcSellPrice(gramPrice) {
  return (gramPrice || 0) * SELL_FACTOR;
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

// بيانات المدن السعودية
export const SAUDI_CITIES = [
  {
    slug: 'gold-price-riyadh',
    slugAr: 'سعر-الذهب-في-الرياض',
    nameAr: 'الرياض',
    nameEn: 'Riyadh',
    region: 'منطقة الرياض',
    population: '7,600,000',
    description: 'الرياض عاصمة المملكة العربية السعودية وأكبر مدنها. تضم العديد من أسواق الذهب الشهيرة مثل سوق الثميري وسوق البطحاء وسوق طيبة.',
    markets: ['سوق الثميري', 'سوق البطحاء', 'سوق طيبة للذهب', 'الرياض بارك مول', 'العثيم مول'],
    tips: [
      'سوق الثميري يقدم أفضل الأسعار للمجوهرات التقليدية',
      'سوق البطحاء معروف بالأسعار المنخفضة وإمكانية التفاوض',
      'المولات تقدم تصاميم حديثة لكن بمصنعية أعلى',
      'أفضل وقت للشراء هو أيام الأسبوع صباحاً',
    ],
    lat: 24.7136, lng: 46.6753,
  },
  {
    slug: 'gold-price-jeddah',
    slugAr: 'سعر-الذهب-في-جدة',
    nameAr: 'جدة',
    nameEn: 'Jeddah',
    region: 'منطقة مكة المكرمة',
    population: '4,600,000',
    description: 'جدة عروس البحر الأحمر ومركز تجاري رئيسي. تشتهر بسوق الذهب في حي البلد وتقدم تصاميم متنوعة تجمع بين التراث والحداثة.',
    markets: ['سوق الذهب - حي البلد', 'سوق الصيرفي', 'رد سي مول', 'جدة مول', 'الأندلس مول'],
    tips: [
      'سوق حي البلد يقدم أفضل الأسعار وأكبر تشكيلة',
      'محلات الذهب في المولات تقدم ضمانات وفواتير رسمية',
      'تصاميم الذهب في جدة تتميز بالطابع الحجازي الأصيل',
      'يمكن التفاوض في الأسواق الشعبية وتقل الفرصة في المولات',
    ],
    lat: 21.4858, lng: 39.1925,
  },
  {
    slug: 'gold-price-makkah',
    slugAr: 'سعر-الذهب-في-مكة',
    nameAr: 'مكة المكرمة',
    nameEn: 'Makkah',
    region: 'منطقة مكة المكرمة',
    population: '2,000,000',
    description: 'مكة المكرمة أقدس مدن المسلمين. تضم أسواق ذهب متميزة يرتادها الحجاج والمعتمرون، مع تشكيلة واسعة من المشغولات الذهبية.',
    markets: ['سوق العتيبية', 'أبراج البيت', 'سوق الخليل', 'سوق الحجاز'],
    tips: [
      'الأسعار في مواسم الحج والعمرة تكون أعلى بسبب الطلب',
      'سوق العتيبية يقدم أسعاراً أفضل من المحلات القريبة من الحرم',
      'احرص على طلب فاتورة وختم العيار',
      'أفضل الأسعار في غير مواسم الحج',
    ],
    lat: 21.3891, lng: 39.8579,
  },
  {
    slug: 'gold-price-madinah',
    slugAr: 'سعر-الذهب-في-المدينة',
    nameAr: 'المدينة المنورة',
    nameEn: 'Madinah',
    region: 'منطقة المدينة المنورة',
    population: '1,400,000',
    description: 'المدينة المنورة مدينة الرسول ﷺ. تتميز بأسواق ذهب راقية تخدم الزوار والمقيمين على حد سواء.',
    markets: ['سوق المدينة الدولي', 'سوق قباء', 'النور مول', 'الراشد ميجا مول'],
    tips: [
      'المحلات القريبة من المسجد النبوي أغلى بسبب الموقع',
      'سوق المدينة الدولي يقدم ماركات عالمية بأسعار جيدة',
      'تتوفر تصاميم إسلامية فريدة كهدايا للزوار',
    ],
    lat: 24.4672, lng: 39.6024,
  },
  {
    slug: 'gold-price-dammam',
    slugAr: 'سعر-الذهب-في-الدمام',
    nameAr: 'الدمام',
    nameEn: 'Dammam',
    region: 'المنطقة الشرقية',
    population: '1,200,000',
    description: 'الدمام عاصمة المنطقة الشرقية ومركز صناعة النفط. تضم أسواق ذهب متطورة تقدم تصاميم حديثة وتقليدية.',
    markets: ['سوق الذهب - حي الفيصلية', 'الراشد مول', 'مجمع الظهران', 'مارينا مول'],
    tips: [
      'أسعار الذهب في الدمام تنافسية مقارنة بالرياض وجدة',
      'المنطقة الشرقية تتأثر بأسعار الذهب في الخليج',
      'توجد محلات متخصصة في السبائك الاستثمارية',
    ],
    lat: 26.3927, lng: 49.9777,
  },
  {
    slug: 'gold-price-khobar',
    slugAr: 'سعر-الذهب-في-الخبر',
    nameAr: 'الخبر',
    nameEn: 'Khobar',
    region: 'المنطقة الشرقية',
    population: '500,000',
    description: 'الخبر مدينة ساحلية في المنطقة الشرقية تتميز بمولات عصرية ومحلات ذهب فاخرة.',
    markets: ['الراشد مول', 'مول الظهران', 'الكورنيش', 'سوق الخبر'],
    tips: [
      'الخبر قريبة من البحرين مما يتيح مقارنة الأسعار',
      'المولات تقدم تصاميم عالمية بأسعار مناسبة',
    ],
    lat: 26.2172, lng: 50.1971,
  },
  {
    slug: 'gold-price-tabuk',
    slugAr: 'سعر-الذهب-في-تبوك',
    nameAr: 'تبوك',
    nameEn: 'Tabuk',
    region: 'منطقة تبوك',
    population: '600,000',
    description: 'تبوك مدينة في شمال غرب المملكة. تضم عدة محلات ذهب في الأسواق التقليدية والمولات الحديثة.',
    markets: ['سوق تبوك المركزي', 'تبوك بارك', 'الحكير مول'],
    tips: [
      'الأسعار في تبوك مقاربة للأسعار العامة في المملكة',
      'عدد المحلات أقل من المدن الكبرى لكن الجودة جيدة',
    ],
    lat: 28.3838, lng: 36.5550,
  },
  {
    slug: 'gold-price-abha',
    slugAr: 'سعر-الذهب-في-أبها',
    nameAr: 'أبها',
    nameEn: 'Abha',
    region: 'منطقة عسير',
    population: '400,000',
    description: 'أبها عاصمة منطقة عسير وعروس الجبل. تتميز بمشغولات ذهبية ذات طابع تراثي جنوبي فريد.',
    markets: ['سوق الثلاثاء', 'أبها مول', 'عسير مول'],
    tips: [
      'تتوفر تصاميم تراثية جنوبية فريدة لا تجدها في مدن أخرى',
      'الأسعار تنافسية مقارنة بالمدن الكبرى',
    ],
    lat: 18.2164, lng: 42.5053,
  },
  {
    slug: 'gold-price-taif',
    slugAr: 'سعر-الذهب-في-الطائف',
    nameAr: 'الطائف',
    nameEn: 'Taif',
    region: 'منطقة مكة المكرمة',
    population: '700,000',
    description: 'الطائف مدينة الورد والسياحة. تضم أسواق ذهب تقليدية وحديثة تخدم السكان والسياح.',
    markets: ['سوق الذهب التقليدي', 'الشفا مول', 'جوري مول'],
    tips: [
      'في موسم الصيف ترتفع الأسعار قليلاً بسبب السياحة',
      'السوق التقليدي يقدم أسعاراً أفضل من المولات',
    ],
    lat: 21.2703, lng: 40.4158,
  },
  {
    slug: 'gold-price-hail',
    slugAr: 'سعر-الذهب-في-حائل',
    nameAr: 'حائل',
    nameEn: 'Hail',
    region: 'منطقة حائل',
    population: '400,000',
    description: 'حائل مدينة في شمال المملكة معروفة بكرم أهلها. تضم محلات ذهب متنوعة في أسواقها.',
    markets: ['سوق حائل المركزي', 'حائل مول', 'الجامعة مول'],
    tips: [
      'الأسعار في حائل مقاربة لبقية مدن المملكة',
      'تتوفر مشغولات ذهبية بتصاميم شمالية مميزة',
    ],
    lat: 27.5114, lng: 41.7208,
  },
  {
    slug: 'gold-price-buraidah',
    slugAr: 'سعر-الذهب-في-بريدة',
    nameAr: 'بريدة',
    nameEn: 'Buraidah',
    region: 'منطقة القصيم',
    population: '600,000',
    description: 'بريدة عاصمة منطقة القصيم. تضم عدداً من محلات الذهب في الأسواق والمولات.',
    markets: ['سوق بريدة', 'النخيل مول', 'العثيم مول'],
    tips: [
      'القصيم منطقة زراعية وأسعار الذهب فيها تنافسية',
      'المحلات تقدم خدمة جيدة مع إمكانية التفاوض',
    ],
    lat: 26.3292, lng: 43.9750,
  },
  {
    slug: 'gold-price-khamis-mushait',
    slugAr: 'سعر-الذهب-في-خميس-مشيط',
    nameAr: 'خميس مشيط',
    nameEn: 'Khamis Mushait',
    region: 'منطقة عسير',
    population: '500,000',
    description: 'خميس مشيط مدينة عسكرية وتجارية في منطقة عسير. تضم أسواق ذهب تخدم المنطقة الجنوبية.',
    markets: ['سوق خميس مشيط', 'خميس مول', 'بن دايل مول'],
    tips: [
      'الأسعار مشابهة لأسعار أبها القريبة',
      'تتوفر تصاميم متنوعة بين التقليدي والحديث',
    ],
    lat: 18.3066, lng: 42.7294,
  },
  {
    slug: 'gold-price-najran',
    slugAr: 'سعر-الذهب-في-نجران',
    nameAr: 'نجران',
    nameEn: 'Najran',
    region: 'منطقة نجران',
    population: '350,000',
    description: 'نجران مدينة تاريخية في جنوب المملكة. تتميز بمشغولات ذهبية تعكس التراث النجراني الأصيل.',
    markets: ['سوق نجران', 'النجران مول'],
    tips: [
      'المشغولات التراثية النجرانية مميزة وفريدة',
      'الأسعار تنافسية بسبب قلة الطلب نسبياً',
    ],
    lat: 17.4933, lng: 44.1277,
  },
  {
    slug: 'gold-price-jubail',
    slugAr: 'سعر-الذهب-في-الجبيل',
    nameAr: 'الجبيل',
    nameEn: 'Jubail',
    region: 'المنطقة الشرقية',
    population: '350,000',
    description: 'الجبيل مدينة صناعية على الخليج العربي. تضم محلات ذهب تخدم المقيمين والعاملين في القطاع الصناعي.',
    markets: ['سوق الجبيل', 'الفاناتير مول'],
    tips: [
      'المدينة الصناعية تضم محلات حديثة ذات أسعار جيدة',
      'قربها من الدمام يتيح خيارات أوسع',
    ],
    lat: 27.0046, lng: 49.6225,
  },
  {
    slug: 'gold-price-yanbu',
    slugAr: 'سعر-الذهب-في-ينبع',
    nameAr: 'ينبع',
    nameEn: 'Yanbu',
    region: 'منطقة المدينة المنورة',
    population: '300,000',
    description: 'ينبع مدينة ساحلية صناعية على البحر الأحمر. تضم محلات ذهب في المناطق التجارية.',
    markets: ['سوق ينبع', 'ينبع مول'],
    tips: [
      'الأسعار مقاربة لأسعار المدينة المنورة',
      'تتوفر خيارات محدودة مقارنة بالمدن الكبرى',
    ],
    lat: 24.0895, lng: 38.0618,
  },
];
