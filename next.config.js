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
  
  // Rewrites: Arabic URLs → English routes (single source of truth)
  async rewrites() {
    return [
      // Karat pages
      { source: '/عيار-21', destination: '/karat-21' },
      { source: '/عيار-22', destination: '/karat-22' },
      { source: '/عيار-24', destination: '/karat-24' },
      { source: '/عيار-18', destination: '/karat-18' },
      
      // Tool & info pages
      { source: '/سبائك-الذهب', destination: '/gold-bars' },
      { source: '/حاسبة-الذهب', destination: '/calculator' },
      { source: '/زكاة-الذهب', destination: '/zakat' },
      { source: '/مصنعية-الذهب', destination: '/workmanship' },
      { source: '/اسواق-الذهب', destination: '/markets' },
      { source: '/اونصة-الذهب', destination: '/ounce' },
      { source: '/سعر-الفضة', destination: '/silver' },
      { source: '/بيع-وشراء-الذهب', destination: '/buy-sell' },
      { source: '/تاريخ-اسعار-الذهب', destination: '/history' },
      
      // City pages - Arabic URLs
      { source: '/سعر-الذهب-في-الرياض', destination: '/gold-price-riyadh' },
      { source: '/سعر-الذهب-في-جدة', destination: '/gold-price-jeddah' },
      { source: '/سعر-الذهب-في-مكة', destination: '/gold-price-makkah' },
      { source: '/سعر-الذهب-في-المدينة', destination: '/gold-price-madinah' },
      { source: '/سعر-الذهب-في-الدمام', destination: '/gold-price-dammam' },
      { source: '/سعر-الذهب-في-الخبر', destination: '/gold-price-khobar' },
      { source: '/سعر-الذهب-في-تبوك', destination: '/gold-price-tabuk' },
      { source: '/سعر-الذهب-في-أبها', destination: '/gold-price-abha' },
      { source: '/سعر-الذهب-في-الطائف', destination: '/gold-price-taif' },
      { source: '/سعر-الذهب-في-حائل', destination: '/gold-price-hail' },
      { source: '/سعر-الذهب-في-بريدة', destination: '/gold-price-buraidah' },
      { source: '/سعر-الذهب-في-خميس-مشيط', destination: '/gold-price-khamis-mushait' },
      { source: '/سعر-الذهب-في-نجران', destination: '/gold-price-najran' },
      { source: '/سعر-الذهب-في-الجبيل', destination: '/gold-price-jubail' },
      { source: '/سعر-الذهب-في-ينبع', destination: '/gold-price-yanbu' },
      
      // Blog Arabic
      { source: '/مدونة', destination: '/blog' },
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
