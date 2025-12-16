import { neon } from '@neondatabase/serverless';

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
    const sql = neon(process.env.DATABASE_URL);

    // إنشاء الجدول إذا لم يكن موجوداً
    await sql`
      CREATE TABLE IF NOT EXISTS gold_prices (
        id SERIAL PRIMARY KEY,
        rates JSONB NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // جلب الأسعار من API الخارجي
    const res = await fetch(
      `https://api.metalpriceapi.com/v1/latest?api_key=${apiKey}&base=XAU&currencies=SAR,USD`,
      { cache: 'no-store' }
    );
    const data = await res.json();
    
    if (!data.success) throw new Error(data.error || 'API error');

    // حفظ في Neon (حذف القديم وإضافة الجديد)
    await sql`DELETE FROM gold_prices`;
    await sql`
      INSERT INTO gold_prices (rates, updated_at) 
      VALUES (${JSON.stringify(data.rates)}, NOW())
    `;

    return Response.json({ 
      success: true, 
      rates: data.rates,
      updatedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Cron error:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
