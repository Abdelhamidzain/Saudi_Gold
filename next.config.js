/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Performance
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  
  compress: true,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
  
  compiler: {
    removeConsole: true,
  },
  
  swcMinify: true,
  
  // Redirects: Arabic URLs → English canonical (301 permanent).
  // Using redirects instead of rewrites because:
  //   1) Rewrites with non-ASCII source paths were silently failing in production.
  //   2) Redirects expose the English canonical URL in the browser — better
  //      for SEO consolidation (Google sees one URL per page, not two).
  //   3) Browser handles the percent-encoded Arabic input and follows Location.
  async redirects() {
    return [
      // Karat pages
      { source: '/عيار-21', destination: '/karat-21', permanent: true },
      { source: '/عيار-22', destination: '/karat-22', permanent: true },
      { source: '/عيار-24', destination: '/karat-24', permanent: true },
      { source: '/عيار-18', destination: '/karat-18', permanent: true },

      // Tool & info pages
      { source: '/سبائك-الذهب', destination: '/gold-bars', permanent: true },
      { source: '/حاسبة-الذهب', destination: '/calculator', permanent: true },
      { source: '/زكاة-الذهب', destination: '/zakat', permanent: true },
      { source: '/مصنعية-الذهب', destination: '/workmanship', permanent: true },
      { source: '/اسواق-الذهب', destination: '/markets', permanent: true },
      { source: '/اونصة-الذهب', destination: '/ounce', permanent: true },
      { source: '/سعر-الفضة', destination: '/silver', permanent: true },
      { source: '/بيع-وشراء-الذهب', destination: '/buy-sell', permanent: true },
      { source: '/تاريخ-اسعار-الذهب', destination: '/history', permanent: true },

      // City pages - Arabic URLs
      { source: '/سعر-الذهب-في-الرياض', destination: '/gold-price-riyadh', permanent: true },
      { source: '/سعر-الذهب-في-جدة', destination: '/gold-price-jeddah', permanent: true },
      { source: '/سعر-الذهب-في-مكة', destination: '/gold-price-makkah', permanent: true },
      { source: '/سعر-الذهب-في-المدينة', destination: '/gold-price-madinah', permanent: true },
      { source: '/سعر-الذهب-في-الدمام', destination: '/gold-price-dammam', permanent: true },
      { source: '/سعر-الذهب-في-الخبر', destination: '/gold-price-khobar', permanent: true },
      { source: '/سعر-الذهب-في-تبوك', destination: '/gold-price-tabuk', permanent: true },
      { source: '/سعر-الذهب-في-أبها', destination: '/gold-price-abha', permanent: true },
      { source: '/سعر-الذهب-في-الطائف', destination: '/gold-price-taif', permanent: true },
      { source: '/سعر-الذهب-في-حائل', destination: '/gold-price-hail', permanent: true },
      { source: '/سعر-الذهب-في-بريدة', destination: '/gold-price-buraidah', permanent: true },
      { source: '/سعر-الذهب-في-خميس-مشيط', destination: '/gold-price-khamis-mushait', permanent: true },
      { source: '/سعر-الذهب-في-نجران', destination: '/gold-price-najran', permanent: true },
      { source: '/سعر-الذهب-في-الجبيل', destination: '/gold-price-jubail', permanent: true },
      { source: '/سعر-الذهب-في-ينبع', destination: '/gold-price-yanbu', permanent: true },

      // Blog Arabic
      { source: '/مدونة', destination: '/blog', permanent: true },
    ];
  },
  
  // Headers for caching & security
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|webp|avif|ico)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
