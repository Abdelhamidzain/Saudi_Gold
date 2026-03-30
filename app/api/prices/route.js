export const dynamic = 'force-dynamic';

const OUNCE = 31.1035;
const MARKUP = 1.02;
const KARATS = { 24: 1, 22: 0.9167, 21: 0.875, 18: 0.75, 14: 0.5833 };

export async function GET() {
  try {
    const res = await fetch('https://data-asg.goldprice.org/dbXRates/SAR', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Origin': 'https://goldprice.org',
        'Referer': 'https://goldprice.org/',
      },
      cache: 'no-store',
    });

    if (!res.ok) throw new Error(`goldprice.org: ${res.status}`);

    const data = await res.json();
    const item = data?.items?.[0];
    if (!item?.xauPrice) throw new Error('Invalid data');

    const sarPerOunce = item.xauPrice;
    const usdPerOunce = sarPerOunce / 3.75;
    const gram24 = (sarPerOunce / OUNCE) * MARKUP;

    const prices = {};
    for (const [k, purity] of Object.entries(KARATS)) {
      prices[k] = {
        gram: +(gram24 * purity).toFixed(2),
        ounce: +(gram24 * purity * OUNCE).toFixed(2),
        kilo: +(gram24 * purity * 1000).toFixed(2),
      };
    }

    return Response.json(
      {
        success: true,
        // البوت يقرأ rates.SAR و rates.USD
        rates: {
          SAR: sarPerOunce,
          USD: +usdPerOunce.toFixed(2),
        },
        prices,
        // البوت يقرأ change_percent و change_value
        change_percent: item.pcXau || 0,
        change_value: item.chgXau || 0,
        updatedAt: new Date().toISOString(),
        source: 'goldprice.org',
      },
      { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } }
    );
  } catch (error) {
    console.error('Prices API error:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
