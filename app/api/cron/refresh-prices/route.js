export const dynamic = 'force-dynamic';

const CRON_SECRET = process.env.CRON_SECRET;
const OUNCE = 31.1035;
const MARKUP = 1.02;

async function fetchGoldPrice() {
  const res = await fetch('https://data-asg.goldprice.org/dbXRates/SAR', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      'Accept': 'application/json, text/plain, */*',
      'Origin': 'https://goldprice.org',
      'Referer': 'https://goldprice.org/',
    },
    cache: 'no-store',
  });

  if (!res.ok) throw new Error(`goldprice.org returned ${res.status}`);
  const data = await res.json();
  const item = data?.items?.[0];
  if (!item?.xauPrice) throw new Error('Invalid data');

  const gram24 = (item.xauPrice / OUNCE) * MARKUP;

  return {
    xauSAR: item.xauPrice,
    gram24: +gram24.toFixed(2),
    gram22: +(gram24 * 0.9167).toFixed(2),
    gram21: +(gram24 * 0.875).toFixed(2),
    gram18: +(gram24 * 0.75).toFixed(2),
    change: item.chgXau,
    changePercent: item.pcXau,
    xagSAR: item.xagPrice,
  };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');

  if (secret !== CRON_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const prices = await fetchGoldPrice();

    return Response.json({
      success: true,
      prices,
      timestamp: new Date().toISOString(),
      source: 'goldprice.org (free)',
    });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
