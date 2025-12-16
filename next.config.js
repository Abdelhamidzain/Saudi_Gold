/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // تحسينات الأداء التجريبية
  experimental: {
    // دمج CSS في HTML مباشرة - يوفر 100-300ms
    inlineCss: true,
    // تحسين استيراد المكتبات
    optimizePackageImports: ['lucide-react', 'date-fns'],
  },
  
  // تحسين الصور
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
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
