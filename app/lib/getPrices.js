import { calcGramPrices, KARATS, OUNCE, MARKUP } from './gold';

/**
 * جلب الأسعار - يحاول من goldprice.org أولاً ثم MetalPriceAPI ثم القيم الافتراضية
 * الأسعار تتحدث في المتصفح خلال ثانيتين عبر LivePriceUpdater
 */
export async function getPrices() {
  // محاولة 1: goldprice.org (مجاني)
  try {
    const res = await fetch('https://data-asg.goldprice.org/dbXRates/SAR', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'application/json',
        'Origin': 'https://goldprice.org',
        'Referer': 'https://goldprice.org/',
      },
      // Aligned with the most frequent page revalidate window (1800s).
      // Pages with longer revalidate (3600/86400) hit the data cache anyway.
      next: { revalidate: 1800 },
    });

    if (res.ok) {
      const data = await res.json();
      const item = data?.items?.[0];
      if (item?.xauPrice) {
        const prices = calcGramPrices(item.xauPrice);
        return {
          prices,
          rates: { SAR: item.xauPrice },
          updatedAt: new Date().toISOString(),
          source: 'goldprice.org',
        };
      }
    }
  } catch (e) {
    console.warn('goldprice.org failed:', e.message);
  }

  // محاولة 2: MetalPriceAPI (لو عندنا key)
  try {
    const apiKey = process.env.METAL_API_KEY;
    if (apiKey) {
      const res = await fetch(
        `https://api.metalpriceapi.com/v1/latest?api_key=${apiKey}&base=XAU&currencies=SAR`,
        { next: { revalidate: 1800 } }
      );
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.rates?.SAR) {
          const prices = calcGramPrices(data.rates.SAR);
          return {
            prices,
            rates: data.rates,
            updatedAt: new Date().toISOString(),
            source: 'metalpriceapi',
          };
        }
      }
    }
  } catch (e) {
    console.warn('MetalPriceAPI failed:', e.message);
  }

  // محاولة 3: قيم افتراضية (المتصفح يحدّثها خلال ثانيتين)
  const defaultGram24 = 350;
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
