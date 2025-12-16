#!/usr/bin/env node
/**
 * Seed Cache Script
 * Run once after deployment to initialize the cache
 * 
 * Usage:
 *   CRON_SECRET=xxx node scripts/seed-cache.js https://your-site.vercel.app
 */

const SITE_URL = process.argv[2] || 'http://localhost:3000';
const CRON_SECRET = process.env.CRON_SECRET;

if (!CRON_SECRET) {
  console.error('❌ CRON_SECRET required');
  console.log('Usage: CRON_SECRET=your-secret node scripts/seed-cache.js [site-url]');
  process.exit(1);
}

async function seed() {
  console.log('🌱 Seeding cache...');
  console.log(`📍 Site: ${SITE_URL}`);
  
  try {
    const url = `${SITE_URL}/api/cron/refresh-prices?secret=${CRON_SECRET}`;
    const res = await fetch(url);
    const data = await res.json();
    
    if (res.ok && data.success) {
      console.log('✅ Cache seeded!');
      console.log('📊 Rates:', data.rates);
    } else {
      console.error('❌ Failed:', data.error);
      process.exit(1);
    }
  } catch (e) {
    console.error('❌ Error:', e.message);
    process.exit(1);
  }
}

seed();
