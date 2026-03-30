import './globals.css';

import LivePriceUpdater from './components/LivePriceUpdater';

const SITE_URL = 'https://saudi-gold.com';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'سعر الذهب اليوم في السعودية | أسعار جرام الذهب عيار 21 و 24 محدثة',
    template: '%s | سعودي قولد',
  },
  description: 'سعر الذهب اليوم في السعودية محدث لحظياً بالريال السعودي. أسعار جرام الذهب عيار 21 و 22 و 24 و 18 مع حاسبة الذهب وحاسبة زكاة الذهب وأسعار السبائك.',
  keywords: [
    'سعر الذهب اليوم',
    'اسعار الذهب في السعودية',
    'سعر جرام الذهب عيار 21',
    'سعر الذهب في السعودية',
    'حاسبة الذهب',
    'زكاة الذهب',
    'سعر الذهب اليوم في السعودية',
    'سعر الذهب عيار 24',
    'سبائك الذهب',
    'سعر الذهب الان',
  ],
  authors: [{ name: 'سعودي قولد', url: SITE_URL }],
  creator: 'سعودي قولد',
  publisher: 'سعودي قولد',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      'ar-SA': SITE_URL,
      'x-default': SITE_URL,
    },
  },
  openGraph: {
    title: 'سعر الذهب اليوم في السعودية | محدث لحظياً',
    description: 'سعر جرام الذهب عيار 21 اليوم محدث لحظياً بالريال السعودي مع حاسبة الذهب وحاسبة الزكاة وأسعار السبائك',
    url: SITE_URL,
    siteName: 'سعودي قولد',
    locale: 'ar_SA',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'سعر الذهب اليوم في السعودية - سعودي قولد',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'سعر الذهب اليوم في السعودية',
    description: 'سعر جرام الذهب عيار 21 اليوم محدث لحظياً بالريال السعودي',
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'YkX9VVCgo3jumvzx1iRJWOO-wJn2Ok-whCW1VQSUVWY',
  },
  manifest: '/manifest.json',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F59E0B' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0F' },
  ],
};

// WebSite Schema - Fixed: removed fake SearchAction
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'سعودي قولد',
  alternateName: ['Saudi Gold', 'سعودي جولد', 'اسعار الذهب'],
  url: SITE_URL,
  description: 'سعر الذهب اليوم في السعودية محدث لحظياً بالريال السعودي - أسعار جميع العيارات مع حاسبة الذهب وحاسبة الزكاة',
  inLanguage: 'ar',
  publisher: {
    '@type': 'Organization',
    name: 'سعودي قولد',
    url: SITE_URL,
  },
};

// Organization Schema - Fixed
const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'سعودي قولد',
  alternateName: 'Saudi Gold',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: 'منصة سعودية لمتابعة أسعار الذهب والفضة في المملكة العربية السعودية بشكل لحظي',
  foundingDate: '2024',
  areaServed: {
    '@type': 'Country',
    name: 'المملكة العربية السعودية',
    alternateName: 'Saudi Arabia',
  },
  sameAs: [
    'https://github.com/Abdelhamidzain/Saudi_Gold',
  ],
};

// GA4 Measurement ID - Replace G-XXXXXXXXXX with your actual GA4 ID
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        {/* Google Analytics 4 */}
        {GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script dangerouslySetInnerHTML={{ __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { send_page_view: true });
            `}} />
          </>
        )}

        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Critical CSS */}
        <style dangerouslySetInnerHTML={{ __html: `
          :root{--g:#F59E0B;--g2:#D97706;--bg:#0A0A0F;--bg2:#111118;--bg3:#1a1a24;--txt:#FFF;--txt2:#E0E0E8;--txt3:#B0B0B8;--gold-gradient:linear-gradient(135deg,#F59E0B 0%,#D97706 50%,#B45309 100%);--green:#10B981;--red:#EF4444}
          *{box-sizing:border-box;margin:0;padding:0}
          html{scroll-behavior:smooth}
          body{font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:var(--bg);color:var(--txt);line-height:1.6;direction:rtl;min-height:100vh}
          .container{max-width:1200px;margin:0 auto;padding:0 20px}
          .header{background:var(--bg2);border-bottom:1px solid rgba(255,255,255,0.1);position:sticky;top:0;z-index:100;backdrop-filter:blur(10px)}
          .header-inner{display:flex;justify-content:space-between;align-items:center;padding:15px 0}
          .logo{display:flex;align-items:center;gap:8px;text-decoration:none;font-size:1.3rem;font-weight:700}
          .text-gold{background:var(--gold-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .hero{padding:60px 0 40px;text-align:center;background:radial-gradient(ellipse at top,rgba(245,158,11,0.1) 0%,transparent 50%)}
          .hero h1{font-size:clamp(1.8rem,5vw,2.8rem);font-weight:800;margin-bottom:16px;line-height:1.3}
          .hero-subtitle{color:var(--txt2);font-size:1.1rem;max-width:600px;margin:0 auto 30px}
          .badge{display:inline-flex;align-items:center;gap:8px;background:rgba(16,185,129,0.15);border:1px solid rgba(16,185,129,0.3);padding:6px 16px;border-radius:50px;font-size:0.85rem;color:var(--green);margin-bottom:20px}
          .live-dot{width:8px;height:8px;background:var(--green);border-radius:50%;animation:pulse 2s infinite}
          @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
          .main-price-box{background:var(--bg2);border:2px solid var(--g);border-radius:16px;padding:30px;max-width:400px;margin:0 auto}
          .main-price-label{color:var(--txt2);font-size:0.95rem;margin-bottom:8px}
          .main-price-value{font-size:clamp(2.5rem,8vw,3.5rem);font-weight:800;background:var(--gold-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;display:flex;align-items:baseline;justify-content:center;gap:8px}
          .main-price-currency{font-size:1.2rem;-webkit-text-fill-color:var(--g)}
          .last-update{color:var(--txt2);font-size:0.85rem;margin-top:12px}
          .section{padding:50px 0}
          .section-title{font-size:1.5rem;font-weight:700;margin-bottom:30px;text-align:center}
          .price-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;margin:30px 0}
          .price-card{background:var(--bg2);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:20px;text-align:center;text-decoration:none;color:var(--txt);transition:all 0.3s}
          .price-card:hover,.price-card.highlight{border-color:var(--g);transform:translateY(-2px)}
          .price-card-karat{font-size:2rem;font-weight:800;background:var(--gold-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .price-card-label{color:var(--txt2);font-size:0.85rem;margin:8px 0}
          .price-card-value{font-size:1.4rem;font-weight:700;color:var(--g)}
          .price-card-unit{color:var(--txt2);font-size:0.8rem}
        `}} />

        {/* Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      </head>
      <body>
            <a href="#main-content" className="skip-link">تخطي إلى المحتوى الرئيسي</a>
            <main id="main-content">
              {children}
            </main>
            <LivePriceUpdater />
          </body>
    </html>
  );
}
