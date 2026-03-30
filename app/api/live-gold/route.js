export const dynamic = 'force-dynamic';

const OUNCE = 31.1035;
const MARKUP = 1.02;
const KARATS = {
  24: 1,
  22: 0.9167,
  21: 0.875,
  18: 0.75,
  14: 0.5833,
};

export async function GET() {
  try {
    const res = await fetch('https://data-asg.goldprice.org/dbXRates/SAR', {
      headers: {
        'Origin': 'https://saudi-gold.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      cache: 'no-store',
    });

    if (!res.ok) throw new Error(`goldprice.org returned ${res.status}`);

    const data = await res.json();
    const item = data?.items?.[0];

    if (!item?.xauPrice) throw new Error('Invalid data from goldprice.org');

    const sarPerOunce = item.xauPrice;
    const gram24 = (sarPerOunce / OUNCE) * MARKUP;

    // حساب جميع العيارات
    const prices = {};
    for (const [k, purity] of Object.entries(KARATS)) {
      prices[k] = {
        gram: +(gram24 * purity).toFixed(2),
        ounce: +(gram24 * purity * OUNCE).toFixed(2),
        kilo: +(gram24 * purity * 1000).toFixed(2),
      };
    }

    // سعر الفضة
    const silverSarPerOunce = item.xagPrice || 0;

    return Response.json(
      {
        success: true,
        prices,
        xauSar: sarPerOunce,
        xagSar: silverSarPerOunce,
        change: {
          amount: item.chgXau || 0,
          percent: item.pcXau || 0,
        },
        updatedAt: new Date().toISOString(),
        source: 'goldprice.org',
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (error) {
    console.error('Live gold price error:', error.message);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
