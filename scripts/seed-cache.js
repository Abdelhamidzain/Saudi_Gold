#!/usr/bin/env node
/**
 * Seed Cache Script
 * Run this once after deployment to initialize the cache
 * 
 * Usage:
 *   CRON_SECRET=xxx node scripts/seed-cache.js https://your-site.vercel.app
 */

const SITE_URL = process.argv[2] || 'http://localhost:3000';
const CRON_SECRET = process.env.CRON_SECRET;

if (!CRON_SECRET) {
  console.error('❌ Error: CRON_SECRET environment variable is required');
  console.log('Usage: CRON_SECRET=your-secret node scripts/seed-cache.js [site-url]');
  process.exit(1);
}

async function seedCache() {
  console.log('🌱 Seeding cache...');
  console.log(`📍 Site: ${SITE_URL}`);
  
  try {
    const url = `${SITE_URL}/api/cron/refresh-prices?secret=${CRON_SECRET}`;
    console.log(`🔄 Calling: ${url.replace(CRON_SECRET, '***')}`);
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (response.ok && data.success) {
      console.log('✅ Cache seeded successfully!');
      console.log(`📊 Rates:`, data.rates);
      console.log(`🕐 Updated at: ${data.updatedAt}`);
    } else {
      console.error('❌ Failed to seed cache:', data.error || response.statusText);
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

seedCache();
