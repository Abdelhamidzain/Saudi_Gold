// app/api/cron/refresh-prices/route.js
// This endpoint is called ONLY by Vercel Cron - never by visitors

import { kv } from '@vercel/kv';

export const runtime = 'edge'; // Faster cold starts
export const dynamic = 'force-dynamic'; // Never cache this endpoint

const METAL_API_URL = 'https://api.metalpriceapi.com/v1/latest';

export async function GET(request) {
  // 1. Validate cron secret (required for security)
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  
  if (secret !== process.env.CRON_SECRET) {
    console.error('[CRON] Unauthorized access attempt');
    return Response.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // 2. Fetch from external API
  const apiKey = process.env.METAL_API_KEY;
  
  if (!apiKey) {
    console.error('[CRON] METAL_API_KEY not configured');
    return Response.json(
      { success: false, error: 'API key not configured' },
      { status: 500 }
    );
  }

  try {
    const apiUrl = `${METAL_API_URL}?api_key=${apiKey}&base=XAU&currencies=SAR,USD`;
    
    console.log('[CRON] Fetching from metalpriceapi.com...');
    const startTime = Date.now();
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      // No cache - we want fresh data
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(`API error: ${data.error || 'Unknown error'}`);
    }

    const fetchDuration = Date.now() - startTime;
    console.log(`[CRON] API fetch successful in ${fetchDuration}ms`);

    // 3. Store in Vercel KV
    const cacheData = {
      success: true,
      rates: data.rates,
      base: data.base,
      timestamp: data.timestamp,
      updatedAt: new Date().toISOString(),
      fetchDuration
    };

    // Store with 2-hour TTL (buffer in case cron fails)
    await kv.set('gold_prices', cacheData, { ex: 7200 });
    
    console.log('[CRON] Cache updated successfully');

    return Response.json({
      success: true,
      message: 'Prices updated successfully',
      updatedAt: cacheData.updatedAt,
      rates: data.rates
    });

  } catch (error) {
    console.error('[CRON] Error:', error.message);
    
    return Response.json(
      { 
        success: false, 
        error: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
