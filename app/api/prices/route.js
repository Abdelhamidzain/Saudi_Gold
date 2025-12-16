import { neon } from '@neondatabase/serverless';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL);
    
    const rows = await sql`
      SELECT rates, updated_at 
      FROM gold_prices 
      ORDER BY id DESC 
      LIMIT 1
    `;

    if (rows.length === 0) {
      return Response.json(
        { success: false, error: 'الأسعار غير متوفرة حالياً' },
        { status: 503, headers: { 'Retry-After': '60' } }
      );
    }

    const data = rows[0];
    const updatedAt = new Date(data.updated_at).toISOString();
    const age = Math.floor((Date.now() - new Date(data.updated_at).getTime()) / 1000);

    return Response.json(
      { 
        success: true, 
        rates: data.rates, 
        updatedAt,
        age, 
        source: 'neon' 
      },
      { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } }
    );

  } catch (error) {
    console.error('Prices API error:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}