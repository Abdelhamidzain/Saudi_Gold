// app/api/prices/route.js
// Public endpoint - reads from cache ONLY, never calls external API

import { kv } from '@vercel/kv';

export const runtime = 'edge';

// Revalidate every 60 seconds (CDN cache)
export const revalidate = 60;

export async function GET() {
  try {
    // Read from Vercel KV cache ONLY
    const cachedData = await kv.get('gold_prices');

    // If cache is empty, return 503 (Service Unavailable)
    if (!cachedData) {
      console.warn('[API] Cache miss - no data available');
      
      return Response.json(
        {
          success: false,
          error: 'الأسعار غير متوفرة حالياً. يرجى المحاولة لاحقاً.',
          error_en: 'Prices not available. Please try again later.',
          retryAfter: 60
        },
        { 
          status: 503,
          headers: {
            'Retry-After': '60',
            'Cache-Control': 'no-store'
          }
        }
      );
    }

    // Calculate age of data
    const updatedAt = new Date(cachedData.updatedAt);
    const ageSeconds = Math.floor((Date.now() - updatedAt.getTime()) / 1000);
    const ageMinutes = Math.floor(ageSeconds / 60);

    // Return cached data with metadata
    return Response.json(
      {
        success: true,
        rates: cachedData.rates,
        base: cachedData.base,
        timestamp: cachedData.timestamp,
        updatedAt: cachedData.updatedAt,
        age: {
          seconds: ageSeconds,
          minutes: ageMinutes,
          human: ageMinutes < 1 ? 'أقل من دقيقة' : `${ageMinutes} دقيقة`
        },
        source: 'cache'
      },
      {
        headers: {
          // CDN caches for 60 seconds
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
          // Browser caches for 30 seconds
          'CDN-Cache-Control': 'public, max-age=60',
          // Custom header to indicate cache source
          'X-Cache-Source': 'vercel-kv',
          'X-Cache-Age': String(ageSeconds)
        }
      }
    );

  } catch (error) {
    console.error('[API] Error reading cache:', error.message);
    
    return Response.json(
      {
        success: false,
        error: 'خطأ في الخادم. يرجى المحاولة لاحقاً.',
        error_en: 'Server error. Please try again later.'
      },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-store'
        }
      }
    );
  }
}

// Optional: Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    }
  });
}
