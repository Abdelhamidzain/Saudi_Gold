import { neon } from '@neondatabase/serverless';
import { calcGramPrices, KARATS, OUNCE, MARKUP } from './gold';

export async function getPrices() {
  try {
    const sql = neon(process.env.DATABASE_URL);
    
    const rows = await sql`
      SELECT rates, updated_at 
      FROM gold_prices 
      ORDER BY id DESC 
      LIMIT 1
    `;

    if (rows.length > 0 && rows[0].rates?.SAR) {
      const data = rows[0];
      const prices = calcGramPrices(data.rates.SAR);
      return {
        prices,
        rates: data.rates,
        updatedAt: new Date(data.updated_at).toISOString(),
        source: 'database',
      };
    }
  } catch (error) {
    console.error('Failed to fetch prices from database:', error);
  }

  // قيم افتراضية في حالة الفشل
  const defaultGram24 = 330;
  const prices = {};
  for (const [k, data] of Object.entries(KARATS)) {
    prices[k] = {
      gram: defaultGram24 * data.purity,
      ounce: defaultGram24 * data.purity * OUNCE,
      kilo: defaultGram24 * data.purity * 1000,
    };
  }
  
  return {
    prices,
    rates: { SAR: defaultGram24 * OUNCE / MARKUP },
    updatedAt: null,
    source: 'fallback',
  };
}

export function formatRiyadhTime(isoString) {
  if (!isoString) return 'جاري التحديث...';
  
  return new Date(isoString).toLocaleString('ar-SA', {
    timeZone: 'Asia/Riyadh',
    hour: '2-digit',
    minute: '2-digit',
    day: 'numeric',
    month: 'long',
  });
}
