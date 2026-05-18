import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();

  // Preconnect to fonts (saves 100-200ms TTFB on first-paint).
  // Note: metalpriceapi preconnect removed — it's a server-side fallback only,
  // browsers never connect to it directly.
  response.headers.append(
    'Link',
    '<https://fonts.gstatic.com>; rel=preconnect; crossorigin'
  );

  return response;
}

// Tight matcher: only HTML page requests get the middleware.
// Excludes ALL static assets, API routes, Next internals, robots/sitemap, manifest, icons, PWA files.
// Previously this ran on every non-API request including .json, .xml, .txt, .webmanifest etc.
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|_next/data|favicon.ico|robots.txt|sitemap.xml|manifest.json|.*\\.(?:png|jpg|jpeg|svg|webp|avif|ico|gif|woff|woff2|ttf|otf|eot|css|js|map|txt|xml|webmanifest)).*)',
  ],
};
