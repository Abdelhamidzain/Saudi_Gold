import { neon } from '@neondatabase/serverless';

export const dynamic = 'force-dynamic';

const CRON_SECRET = process.env.CRON_SECRET || '0161348527';

/**
 * جلب سعر الذهب من goldprice.org (مجاني - بدون API key)
 * يعطينا سعر الأونصة بالريال السعودي مباشرة
 */
async function fetchGoldPrice() {
  const res = await fetch('https://data-asg.goldprice.org/dbXRates/SAR', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'application/json, text/plain, */*',
      'Origin': 'https://goldprice.org',
      'Referer': 'https://goldprice.org/',
    },
    cache: 'no-store',
  });

  if (!res.ok) throw new Error(`goldprice.org returned ${res.status}`);

  const data = await res.json();
  const item = data?.items?.[0];

  if (!item?.xauPrice) throw new Error('Invalid data from goldprice.org');

  return {
    SAR: item.xauPrice,
    USD: item.xauPrice / 3.75,
    xagSAR: item.xagPrice,
    change: item.chgXau,
    changePercent: item.pcXau,
  };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');

  if (secret !== CRON_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const rates = await fetchGoldPrice();

    const sql = neon(process.env.DATABASE_URL);

    await sql`
      INSERT INTO gold_prices (rates, updated_at)
      VALUES (${JSON.stringify(rates)}, NOW())
    `;

    return Response.json({
      success: true,
      message: 'Prices updated from goldprice.org (FREE)',
      rates,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Cron error:', error);
    return Response.json({
      success: false,
      error: error.message,
    }, { status: 500 });
  }
}
