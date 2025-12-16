/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable Edge Runtime for API routes
  experimental: {
    // Enable server actions if needed
  },
  
  // Headers for security and caching
  async headers() {
    return [
      {
        source: '/api/prices',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=300',
          },
        ],
      },
    ];
  },
  
  // Redirects
  async redirects() {
    return [];
  },
};

module.exports = nextConfig;
