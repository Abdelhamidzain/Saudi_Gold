import './globals.css';

const SITE_URL = 'https://saudi-gold.com';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'سعر الذهب اليوم في السعودية | أسعار جرام الذهب عيار 21 و 24 محدثة',
    template: '%s | سعودي قولد',
  },
  description: 'سعر الذهب اليوم في السعودية محدث لحظياً بالريال السعودي. أسعار جرام الذهب عيار 21 و 22 و 24 و 18 مع حاسبة الذهب وحاسبة زكاة الذهب.',
  keywords: ['سعر الذهب اليوم', 'اسعار الذهب', 'سعر جرام الذهب عيار 21', 'سعر الذهب في السعودية', 'حاسبة الذهب', 'زكاة الذهب'],
  authors: [{ name: 'سعودي قولد' }],
  creator: 'سعودي قولد',
  publisher: 'سعودي قولد',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'سعر الذهب اليوم في السعودية',
    description: 'سعر جرام الذهب عيار 21 اليوم محدث لحظياً بالريال السعودي مع حاسبة الذهب وحاسبة الزكاة',
    url: SITE_URL,
    siteName: 'سعودي قولد',
    locale: 'ar_SA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'سعر الذهب اليوم في السعودية',
    description: 'سعر جرام الذهب عيار 21 اليوم محدث لحظياً بالريال السعودي',
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
    google: 'google-site-verification-code',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A0A0F',
};

// WebSite Schema
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'سعودي قولد',
  alternateName: 'Saudi Gold',
  url: SITE_URL,
  description: 'سعر الذهب اليوم في السعودية محدث لحظياً بالريال السعودي - أسعار جميع العيارات مع حاسبة الذهب وحاسبة الزكاة',
  inLanguage: 'ar',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

// Organization Schema
const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'سعودي قولد',
  alternateName: 'Saudi Gold',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: 'منصة سعودية لمتابعة أسعار الذهب والفضة في المملكة العربية السعودية',
  foundingDate: '2024',
  areaServed: {
    '@type': 'Country',
    name: 'المملكة العربية السعودية',
  },
  sameAs: [],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: ['Arabic', 'English'],
  },
};

// FinancialService Schema - مناسب لموقع أسعار الذهب
const financialServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  name: 'سعودي قولد - أسعار الذهب',
  url: SITE_URL,
  description: 'خدمة متابعة أسعار الذهب والمعادن الثمينة في السعودية',
  areaServed: 'SA',
  serviceType: 'Gold Price Tracking',
  provider: {
    '@type': 'Organization',
    name: 'سعودي قولد',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🪙</text></svg>" />
        {/* Preconnect لتحسين الأداء */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://metalpriceapi.com" />
        {/* Critical CSS inline لتجنب render blocking */}
        <style dangerouslySetInnerHTML={{ __html: `
          :root{--g:#F59E0B;--bg:#0A0A0F;--txt:#FFF}
          *{box-sizing:border-box;margin:0;padding:0}
          body{font-family:system-ui,-apple-system,sans-serif;background:var(--bg);color:var(--txt);direction:rtl}
        `}} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(financialServiceSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
