import './globals.css';

export const metadata = {
  title: 'سعر الذهب اليوم في السعودية | سعر جرام الذهب عيار 21 و 24',
  description: 'سعر جرام الذهب عيار 21 اليوم في السعودية محدث لحظياً. اسعار الذهب اليوم بالريال السعودي لجميع العيارات.',
  keywords: 'سعر الذهب اليوم, اسعار الذهب, سعر جرام الذهب عيار 21, سعر الذهب في السعودية',
  openGraph: {
    title: 'سعر الذهب اليوم في السعودية',
    description: 'سعر جرام الذهب عيار 21 اليوم محدث لحظياً بالريال السعودي',
    locale: 'ar_SA',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A0A0F',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🪙</text></svg>" />
        {/* Preconnect للـ API */}
        <link rel="preconnect" href="https://metalpriceapi.com" />
        <link rel="dns-prefetch" href="https://metalpriceapi.com" />
      </head>
      <body>{children}</body>
    </html>
  );
}
