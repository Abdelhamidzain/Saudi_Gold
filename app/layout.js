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
        <style>
          {`
            /* Critical CSS for above-the-fold content */
            body {
              margin: 0;
              font-family: 'Inter', sans-serif;
              background-color: #f9f9f9;
            }
            header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 1rem;
              background-color: #ffffff;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .hero {
              text-align: center;
              padding: 2rem 1rem;
              background-color: #f3f4f6;
            }
            .price-box {
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 1rem;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            }
          `}
        </style>
        <link
          rel="preload"
          as="style"
          href="/globals.css"
          onLoad="this.rel='stylesheet'"
        />
        <noscript>
          <link rel="stylesheet" href="/globals.css" />
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
