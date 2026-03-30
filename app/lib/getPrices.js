import { calcGramPrices, KARATS, OUNCE, MARKUP } from './gold';

/**
 * جلب الأسعار مباشرة من goldprice.org (مجاني - بدون DB)
 */
async function fetchFromGoldPrice() {
  const res = await fetch('https://data-asg.goldprice.org/dbXRates/SAR', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'application/json, text/plain, */*',
      'Origin': 'https://goldprice.org',
      'Referer': 'https://goldprice.org/',
    },
    next: { revalidate: 300 }, // cache 5 min
  });

  if (!res.ok) throw new Error(`goldprice.org returned ${res.status}`);

  const data = await res.json();
  const item = data?.items?.[0];

  if (!item?.xauPrice) throw new Error('Invalid goldprice.org data');

  return {
    sarPerOunce: item.xauPrice,
    change: item.chgXau,
    changePercent: item.pcXau,
    xagSAR: item.xagPrice,
  };
}

export async function getPrices() {
  try {
    const { sarPerOunce, change, changePercent } = await fetchFromGoldPrice();
    const prices = calcGramPrices(sarPerOunce);

    return {
      prices,
      rates: { SAR: sarPerOunce },
      updatedAt: new Date().toISOString(),
      change: { amount: change, percent: changePercent },
      source: 'goldprice.org',
    };
  } catch (error) {
    console.error('Failed to fetch from goldprice.org:', error);

    // قيم افتراضية في حالة الفشل
    const defaultGram24 = 330;
    const prices = {};
    for (const [k, data] of Object.entries(KARATS)) {
      prices[k] = {
        gram: defaultGram24 * data.purity,
        ounce: defaultGram24 * data.purity * OUNCE,
        kilo: defaultGram24 * data.purity * 1000,
      };
    }

    return {
      prices,
      rates: { SAR: defaultGram24 * OUNCE / MARKUP },
      updatedAt: null,
      source: 'fallback',
    };
  }
}

export function formatRiyadhTime(isoString) {
  if (!isoString) return 'جاري التحديث...';

  return new Date(isoString).toLocaleString('ar-SA', {
    timeZone: 'Asia/Riyadh',
    hour: '2-digit',
    minute: '2-digit',
    day: 'numeric',
    month: 'long',
  });
}
