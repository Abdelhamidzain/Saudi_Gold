// app/layout.js
export const metadata = {
  title: 'سعر الذهب اليوم في السعودية | سعر جرام الذهب عيار 21',
  description: 'سعر جرام الذهب عيار 21 اليوم في السعودية محدث لحظياً. اسعار الذهب بالريال السعودي لجميع العيارات.',
  keywords: 'سعر الذهب اليوم, اسعار الذهب, سعر جرام الذهب عيار 21, سعر الذهب في السعودية',
  openGraph: {
    title: 'سعر الذهب اليوم في السعودية',
    description: 'سعر جرام الذهب عيار 21 اليوم في السعودية محدث لحظياً',
    locale: 'ar_SA',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🪙</text></svg>" />
      </head>
      <body>{children}</body>
    </html>
  );
}
