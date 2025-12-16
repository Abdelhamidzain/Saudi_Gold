import './globals.css';

export const metadata = {
  title: 'سعر الذهب اليوم في السعودية | سعر جرام الذهب عيار 21 و 24',
  description: 'سعر جرام الذهب عيار 21 اليوم في السعودية محدث لحظياً. اسعار الذهب اليوم بالريال السعودي لجميع العيارات.',
  keywords: 'سعر الذهب اليوم, اسعار الذهب, سعر جرام الذهب عيار 21, سعر الذهب في السعودية',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🪙</text></svg>" />
      </head>
      <body>{children}</body>
    </html>
  );
}
