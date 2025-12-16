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
  
  // Headers للتخزين المؤقت
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
    ];
  },
};

module.exports = nextConfig;
