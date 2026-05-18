const SITE_URL = 'https://saudi-gold.com';

// All pages with their metadata
const pages = [
  // Main pages
  { path: '/', changeFrequency: 'hourly', priority: 1.0 },
  { path: '/gold-price-saudi-arabia', changeFrequency: 'daily', priority: 0.9 },
  { path: '/karat-21', changeFrequency: 'hourly', priority: 0.9 },
  { path: '/karat-24', changeFrequency: 'hourly', priority: 0.9 },
  { path: '/karat-22', changeFrequency: 'hourly', priority: 0.8 },
  { path: '/karat-18', changeFrequency: 'hourly', priority: 0.8 },
  { path: '/gold-bars', changeFrequency: 'hourly', priority: 0.9 },
  { path: '/ounce', changeFrequency: 'hourly', priority: 0.8 },
  { path: '/silver', changeFrequency: 'hourly', priority: 0.7 },

  // Tools
  { path: '/calculator', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/zakat', changeFrequency: 'weekly', priority: 0.8 },

  // Info pages
  { path: '/workmanship', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/markets', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/buy-sell', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/history', changeFrequency: 'weekly', priority: 0.6 },

  // City pages
  { path: '/gold-price-riyadh', changeFrequency: 'hourly', priority: 0.8 },
  { path: '/gold-price-jeddah', changeFrequency: 'hourly', priority: 0.8 },
  { path: '/gold-price-makkah', changeFrequency: 'hourly', priority: 0.8 },
  { path: '/gold-price-madinah', changeFrequency: 'hourly', priority: 0.7 },
  { path: '/gold-price-dammam', changeFrequency: 'hourly', priority: 0.7 },
  { path: '/gold-price-khobar', changeFrequency: 'hourly', priority: 0.7 },
  { path: '/gold-price-tabuk', changeFrequency: 'hourly', priority: 0.6 },
  { path: '/gold-price-abha', changeFrequency: 'hourly', priority: 0.6 },
  { path: '/gold-price-taif', changeFrequency: 'hourly', priority: 0.6 },
  { path: '/gold-price-hail', changeFrequency: 'hourly', priority: 0.6 },
  { path: '/gold-price-buraidah', changeFrequency: 'hourly', priority: 0.6 },
  { path: '/gold-price-khamis-mushait', changeFrequency: 'hourly', priority: 0.6 },
  { path: '/gold-price-najran', changeFrequency: 'hourly', priority: 0.6 },
  { path: '/gold-price-jubail', changeFrequency: 'hourly', priority: 0.6 },
  { path: '/gold-price-yanbu', changeFrequency: 'hourly', priority: 0.6 },

  // Blog / Articles
  { path: '/blog', changeFrequency: 'daily', priority: 0.7 },
  { path: '/blog/gold-buying-guide-saudi', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/blog/gold-investment-saudi-2026', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/blog/difference-gold-karats', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/blog/best-time-buy-gold', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/blog/gold-zakat-guide', changeFrequency: 'monthly', priority: 0.7 },
];

export default function sitemap() {
  const now = new Date().toISOString();

  return pages.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
