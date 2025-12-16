import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();

  // Preconnect للـ API - يوفر 100-200ms
  response.headers.append(
    'Link',
    '<https://metalpriceapi.com>; rel=preconnect'
  );
  
  // DNS Prefetch للخطوط
  response.headers.append(
    'Link',
    '<https://fonts.gstatic.com>; rel=preconnect; crossorigin'
  );

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
