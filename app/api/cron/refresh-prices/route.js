import { neon } from '@neondatabase/serverless';

export const dynamic = 'force-dynamic';

const METAL_API_KEY = process.env.METAL_API_KEY;
const CRON_SECRET = process.env.CRON_SECRET || '0161348527';

export async function GET(request) {
  // التحقق من السر
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  
  if (secret !== CRON_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // جلب الأسعار من API
    const apiUrl = `https://api.metalpriceapi.com/v1/latest?api_key=${METAL_API_KEY}&base=XAU&currencies=SAR,USD`;
    const response = await fetch(apiUrl, { cache: 'no-store' });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.success || !data.rates) {
      throw new Error('Invalid API response');
    }

    // حفظ في قاعدة البيانات
    const sql = neon(process.env.DATABASE_URL);
    
    await sql`
      INSERT INTO gold_prices (rates, updated_at)
      VALUES (${JSON.stringify(data.rates)}, NOW())
    `;

    return Response.json({
      success: true,
      message: 'Prices updated successfully',
      rates: data.rates,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Cron error:', error);
    return Response.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
