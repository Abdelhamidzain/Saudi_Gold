import { kv } from '@vercel/kv';

export const runtime = 'edge';
export const revalidate = 60;

export async function GET() {
  try {
    const cached = await kv.get('gold_prices');

    if (!cached) {
      return Response.json(
        { success: false, error: 'الأسعار غير متوفرة حالياً' },
        { status: 503, headers: { 'Retry-After': '60' } }
      );
    }

    const age = Math.floor((Date.now() - new Date(cached.updatedAt).getTime()) / 1000);

    return Response.json(
      { ...cached, age, source: 'cache' },
      { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } }
    );
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
