import './globals.css';

export const metadata = {
  metadataBase: new URL('https://saudi-gold.vercel.app'),
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
    url: 'https://saudi-gold.vercel.app',
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
  url: 'https://saudi-gold.vercel.app',
  description: 'سعر الذهب اليوم في السعودية محدث لحظياً',
  inLanguage: 'ar',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://saudi-gold.vercel.app/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

// Organization Schema
const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'سعودي قولد',
  url: 'https://saudi-gold.vercel.app',
  logo: 'https://saudi-gold.vercel.app/logo.png',
  sameAs: [],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: ['Arabic', 'English'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🪙</text></svg>" />
        <link rel="preconnect" href="https://metalpriceapi.com" />
        <link rel="dns-prefetch" href="https://metalpriceapi.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
