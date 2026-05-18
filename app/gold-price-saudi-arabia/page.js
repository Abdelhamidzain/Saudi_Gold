import { getPrices, formatRiyadhTime } from '../lib/getPrices';
import { fmt } from '../lib/gold';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import Link from 'next/link';
import PageClient from './PageClient';

// Above-the-fold (Header, Breadcrumb, hero with H1) is server-rendered.
// Below-the-fold interactive sections are client-only via PageClient.
// LivePriceUpdater (in layout) refreshes prices in the DOM client-side.
export const revalidate = 3600;

const SITE_URL = 'https://saudi-gold.com';
const PAGE_PATH = '/gold-price-saudi-arabia';
const CANONICAL = `${SITE_URL}${PAGE_PATH}`;

export const metadata = {
  title: 'سعر الذهب في السعودية اليوم بالريال السعودي | Saudi Gold',
  description:
    'تابع سعر الذهب في السعودية اليوم بالريال السعودي، واعرف أسعار الذهب حسب العيار مثل عيار 24 و21 و18، مع حاسبة ذهب ومعلومات تساعدك قبل الشراء أو البيع.',
  keywords: [
    'سعر الذهب في السعودية اليوم',
    'سعر الذهب في السعودية',
    'سعر الذهب اليوم في السعودية',
    'سعر جرام الذهب في السعودية',
    'سعر الذهب عيار 24 في السعودية',
    'سعر الذهب عيار 22 في السعودية',
    'سعر الذهب عيار 21 في السعودية',
    'سعر الذهب عيار 18 في السعودية',
    'أسعار الذهب في السعودية بالريال السعودي',
    'حاسبة الذهب في السعودية',
  ],
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    title: 'سعر الذهب في السعودية اليوم بالريال السعودي',
    description:
      'سعر الذهب في السعودية اليوم لكل العيارات مع حاسبة الذهب وأهم المعلومات قبل الشراء أو البيع.',
    url: CANONICAL,
    locale: 'ar_SA',
    type: 'website',
  },
};

export default async function GoldPriceSaudiArabiaPage() {
  const { prices, updatedAt } = await getPrices();
  const formattedTime = formatRiyadhTime(updatedAt);
  const price21 = prices[21];

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'سعر الذهب في السعودية اليوم بالريال السعودي',
    description: 'صفحة لمتابعة سعر الذهب في السعودية اليوم بالريال السعودي مع شرح وحاسبة الذهب.',
    url: CANONICAL,
    inLanguage: 'ar',
    isPartOf: { '@type': 'WebSite', name: 'سعودي قولد', url: SITE_URL },
    dateModified: updatedAt || new Date().toISOString(),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'سعر الذهب في السعودية اليوم', item: CANONICAL },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Header />

      <div className="container">
        <Breadcrumb items={[
          { name: 'الرئيسية', href: '/' },
          { name: 'سعر الذهب في السعودية اليوم' },
        ]} />
      </div>

      {/* Hero: fully server-rendered. H1 is here, in its correct visual
          position — after Header and Breadcrumb, above the green badge.
          The H1 is rendered exactly once and only server-side. */}
      <section className="hero">
        <div className="container">
          <h1>سعر الذهب في السعودية اليوم</h1>

          <div className="badge">
            <span className="live-dot"></span>
            <span>سعر محدث لحظياً</span>
          </div>

          <p className="hero-subtitle">
            تابع سعر الذهب في السعودية اليوم بالريال السعودي، مع تحديثات واضحة لأسعار الذهب
            حسب العيار، مثل عيار 24 وعيار 22 وعيار 21 وعيار 18. تساعدك هذه الصفحة على معرفة
            سعر جرام الذهب، مقارنة الفروقات بين العيارات، وفهم العوامل التي تؤثر على حركة
            الذهب في السوق السعودي قبل الشراء أو البيع.
          </p>

          <div className="main-price-box">
            <div className="main-price-label">سعر جرام الذهب عيار ٢١</div>
            <div className="main-price-value">
              <span>{fmt(price21?.gram)}</span>
              <span className="main-price-currency">ر.س</span>
            </div>
            <div className="last-update">آخر تحديث: {formattedTime}</div>
          </div>

          <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="#price-table" className="price-card" style={{ padding: '10px 18px', textDecoration: 'none' }}>
              📊 جدول الأسعار
            </Link>
            <Link href="#calculator" className="price-card" style={{ padding: '10px 18px', textDecoration: 'none' }}>
              🧮 حاسبة الذهب
            </Link>
          </div>
        </div>
      </section>

      {/* Below-the-fold interactive content lives in PageClient and renders
          only after React hydrates on the client (mounted gate). */}
      <PageClient prices={prices} />
    </>
  );
}
