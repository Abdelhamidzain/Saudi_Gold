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
  
  // NOTE: Arabic URL → English route redirects are handled in middleware.js,
  // NOT via next.config.js. Next.js's pattern matcher in both rewrites() and
  // redirects() does not reliably match non-ASCII source paths in production
  // — they silently fall through to 404. The middleware decodes the request
  // URL and issues a 308 redirect programmatically.
  
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
