import { NextResponse } from 'next/server';

// Arabic-path → English-route map. Used by the middleware to issue a 301
// redirect when an Arabic URL hits the site. We do this here (not via
// next.config.js redirects()) because Next.js's pattern matcher does not
// reliably match non-ASCII source paths — both rewrites() and redirects()
// silently fall through to a 404 in production.
const ARABIC_REDIRECTS = {
  // Karat pages
  'عيار-21': '/karat-21',
  'عيار-22': '/karat-22',
  'عيار-24': '/karat-24',
  'عيار-18': '/karat-18',

  // Tool & info pages
  'سبائك-الذهب': '/gold-bars',
  'حاسبة-الذهب': '/calculator',
  'زكاة-الذهب': '/zakat',
  'مصنعية-الذهب': '/workmanship',
  'اسواق-الذهب': '/markets',
  'اونصة-الذهب': '/ounce',
  'سعر-الفضة': '/silver',
  'بيع-وشراء-الذهب': '/buy-sell',
  'تاريخ-اسعار-الذهب': '/history',

  // City pages
  'سعر-الذهب-في-الرياض': '/gold-price-riyadh',
  'سعر-الذهب-في-جدة': '/gold-price-jeddah',
  'سعر-الذهب-في-مكة': '/gold-price-makkah',
  'سعر-الذهب-في-المدينة': '/gold-price-madinah',
  'سعر-الذهب-في-الدمام': '/gold-price-dammam',
  'سعر-الذهب-في-الخبر': '/gold-price-khobar',
  'سعر-الذهب-في-تبوك': '/gold-price-tabuk',
  'سعر-الذهب-في-أبها': '/gold-price-abha',
  'سعر-الذهب-في-الطائف': '/gold-price-taif',
  'سعر-الذهب-في-حائل': '/gold-price-hail',
  'سعر-الذهب-في-بريدة': '/gold-price-buraidah',
  'سعر-الذهب-في-خميس-مشيط': '/gold-price-khamis-mushait',
  'سعر-الذهب-في-نجران': '/gold-price-najran',
  'سعر-الذهب-في-الجبيل': '/gold-price-jubail',
  'سعر-الذهب-في-ينبع': '/gold-price-yanbu',

  // Blog
  'مدونة': '/blog',
};

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Strip leading slash and decode percent-encoded Arabic characters.
  // Browsers send `/%D8%B3...` for `/س...`; decodeURIComponent makes the
  // map lookup work regardless of whether the URL was typed in Arabic
  // (decoded) or copy-pasted in encoded form.
  let decoded;
  try {
    decoded = decodeURIComponent(pathname.slice(1));
  } catch {
    // Malformed encoding — let the default handler 404 it.
    decoded = null;
  }

  if (decoded && ARABIC_REDIRECTS[decoded]) {
    const url = request.nextUrl.clone();
    url.pathname = ARABIC_REDIRECTS[decoded];
    // 308 = permanent redirect that preserves method (NextResponse default
    // for permanent). Equivalent SEO signal to 301 for GET.
    return NextResponse.redirect(url, 308);
  }

  // Default path: just add a preconnect hint for fonts.
  const response = NextResponse.next();
  response.headers.append(
    'Link',
    '<https://fonts.gstatic.com>; rel=preconnect; crossorigin'
  );
  return response;
}

// Tight matcher: only HTML page requests get the middleware.
// Excludes static assets, API routes, Next internals, robots/sitemap, fonts, images.
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|_next/data|favicon.ico|robots.txt|sitemap.xml|manifest.json|.*\\.(?:png|jpg|jpeg|svg|webp|avif|ico|gif|woff|woff2|ttf|otf|eot|css|js|map|txt|xml|webmanifest)).*)',
  ],
};
