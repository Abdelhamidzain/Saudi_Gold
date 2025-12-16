/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // تحسينات الأداء
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  
  // ضغط الملفات
  compress: true,
  
  // إزالة source maps في الإنتاج
  productionBrowserSourceMaps: false,
  
  // تعطيل x-powered-by header
  poweredByHeader: false,
  
  // تحسين الصور
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
  
  // تحسين compiler
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // تحسين CSS
  swcMinify: true,
  
  // Rewrites للروابط العربية
  async rewrites() {
    return [
      { source: '/عيار-21', destination: '/karat-21' },
      { source: '/عيار-22', destination: '/karat-22' },
      { source: '/عيار-24', destination: '/karat-24' },
      { source: '/عيار-18', destination: '/karat-18' },
      { source: '/سبائك-الذهب', destination: '/gold-bars' },
      { source: '/حاسبة-الذهب', destination: '/calculator' },
      { source: '/زكاة-الذهب', destination: '/zakat' },
      { source: '/مصنعية-الذهب', destination: '/workmanship' },
      { source: '/اسواق-الذهب', destination: '/markets' },
      { source: '/اونصة-الذهب', destination: '/ounce' },
      { source: '/سعر-الفضة', destination: '/silver' },
      { source: '/بيع-وشراء-الذهب', destination: '/buy-sell' },
      { source: '/تاريخ-اسعار-الذهب', destination: '/history' },
    ];
  },
  
  // Headers للتخزين المؤقت والأداء
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
        ],
      },
      // تحسين CSS
      {
        source: '/_next/static/css/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
