import { kv } from '@vercel/kv';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  
  if (secret !== process.env.CRON_SECRET) {
    return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const apiKey = process.env.METAL_API_KEY;
  if (!apiKey) {
    return Response.json({ success: false, error: 'API key missing' }, { status: 500 });
  }

  try {
    const res = await fetch(
      `https://api.metalpriceapi.com/v1/latest?api_key=${apiKey}&base=XAU&currencies=SAR,USD`,
      { cache: 'no-store' }
    );
    const data = await res.json();
    
    if (!data.success) throw new Error(data.error || 'API error');

    const cacheData = {
      success: true,
      rates: data.rates,
      updatedAt: new Date().toISOString()
    };

    await kv.set('gold_prices', cacheData, { ex: 7200 });

    return Response.json({ success: true, ...cacheData });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
