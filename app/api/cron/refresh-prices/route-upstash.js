// Alternative: Using Upstash Redis directly (no Vercel KV needed)
// app/api/cron/refresh-prices/route.js

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const METAL_API_URL = 'https://api.metalpriceapi.com/v1/latest';

// Simple in-memory cache with Upstash Redis
async function setCache(key, value, ttl = 7200) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  
  if (!url || !token) {
    console.warn('[CACHE] Upstash not configured, using memory');
    globalThis.__cache = globalThis.__cache || {};
    globalThis.__cache[key] = { value, expires: Date.now() + ttl * 1000 };
    return true;
  }
  
  await fetch(`${url}/set/${key}/${encodeURIComponent(JSON.stringify(value))}/ex/${ttl}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return true;
}

async function getCache(key) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  
  if (!url || !token) {
    const cached = globalThis.__cache?.[key];
    if (cached && cached.expires > Date.now()) return cached.value;
    return null;
  }
  
  const res = await fetch(`${url}/get/${key}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  return data.result ? JSON.parse(data.result) : null;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  
  if (secret !== process.env.CRON_SECRET) {
    return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const apiKey = process.env.METAL_API_KEY;
  if (!apiKey) {
    return Response.json({ success: false, error: 'API key not configured' }, { status: 500 });
  }

  try {
    const apiUrl = `${METAL_API_URL}?api_key=${apiKey}&base=XAU&currencies=SAR,USD`;
    const response = await fetch(apiUrl, { cache: 'no-store' });
    const data = await response.json();
    
    if (!data.success) throw new Error(data.error || 'API error');

    const cacheData = {
      success: true,
      rates: data.rates,
      base: data.base,
      timestamp: data.timestamp,
      updatedAt: new Date().toISOString()
    };

    await setCache('gold_prices', cacheData, 7200);

    return Response.json({
      success: true,
      message: 'Prices updated',
      updatedAt: cacheData.updatedAt,
      rates: data.rates
    });

  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

// Export getCache for use in /api/prices
export { getCache };
