import { getPrices, formatRiyadhTime } from './lib/getPrices';
import { toAr, fmt, KARATS } from './lib/gold';
import { SITE_URL, getWebPageSchema, getItemListSchema, getServiceSchema } from './lib/schema';
import Header from './components/Header';
import PriceCards from './components/PriceCards';
import PriceTable from './components/PriceTable';
import { GoldCalculator, ZakatCalculator } from './components/Calculators';
import FAQ from './components/FAQ';
import Disclaimer from './components/Disclaimer';
import InternalLinks from './components/InternalLinks';
import HomeSsrKeywordTextLayer from './components/HomeSsrKeywordTextLayer';
import Link from 'next/link';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Non-critical homepage blocks are client-only (ssr:false): they load after
// hydration and stay out of the initial HTML. The crawl-relevant content
// (H1, live price hero, price table, the SSR keyword text layer, short FAQ)
// remains server-rendered.
const HomeSecondaryClient = dynamic(
  () => import('./components/HomeSecondaryClient'),
  { ssr: false }
);
const HomeSeoDetailsClient = dynamic(
  () => import('./components/HomeSeoDetailsClient'),
  { ssr: false }
);
// Footer is client-only on the homepage (experiment). Other routes keep the
// server-rendered Footer.
const FooterClient = dynamic(
  () => import('./components/FooterClient'),
  { ssr: false }
);

export const revalidate = 1800;

/* ─── SEO Metadata (Optimized) ─── */
const days = ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
const todayName = days[new Date().getDay()];

export const metadata = {
  title: `سعر الذهب اليوم في السعودية | سعر جرام الذهب عيار 21 و 24 الان`,
  description: `سعر الذهب اليوم في السعودية بالريال السعودي ✓ يتم تحديث أسعار غرام الذهب بجميع العيارات كل دقيقة مباشر مع سعر اونصة الذهب والدولار وأسعار السبائك وحاسبة الذهب`,
  keywords: [
    'سعر الذهب اليوم في السعودية',
    'اسعار الذهب في السعودية',
    'سعر الذهب في السعودية اليوم',
    'سعر جرام الذهب في السعودية',
    'اسعار الذهب اليوم في السعودية',
    'سعر الذهب بالريال السعودي',
    'سعر الذهب اليوم عيار 21 في السعودية',
    'سعر بيع الذهب المستعمل اليوم في السعودية',
    'سعر سبائك الذهب في السعودية',
    'أسعار الذهب في السعودية مباشر',
    'اسعار الذهب اليوم بالسعودية',
    'سعر الذهب في السعودية الان',
    'ذهب السعودية',
    'سعر الذهب مباشر السعودية',
    'اسعار الفضة في السعودية',
  ],
  openGraph: {
    title: 'سعر الذهب اليوم في السعودية | محدث لحظياً بالريال السعودي',
    description: 'أسعار الذهب في السعودية اليوم محدثة لحظياً — جرام الذهب عيار 21 و 24 بالريال السعودي مع حاسبة الذهب والزكاة وأسعار السبائك',
  },
};

/* ─── Loading Fallback ─── */
function LoadingSection() {
  return <div style={{ minHeight: '200px', background: 'var(--bg2)', borderRadius: '12px' }} />;
}

/* ─── FAQ (Expanded & Keyword-Optimized) ─── */
const homeFAQ = [
  {
    question: 'كم سعر الذهب اليوم في السعودية بالريال السعودي؟',
    answer: 'يتحدد وفقاً لتسعيرة الأونصة عالمياً مع احتساب صرف الدولار مقابل الريال. راجع الجدول أعلاه لمعرفة القيمة الآنية لكل درجات النقاء.',
  },
  {
    question: 'ما الفرق بين الثمن الصافي والثمن بالمصنعية؟',
    answer: 'الخام يعني تكلفة الوحدة مجرّدة من إضافات. المتاجر ترفع الرقم بأجور التصنيع (15-50 ريال للغرام) وضريبة 15%. القوالب الاستثمارية 24 قيراط معفاة كلياً.',
  },
  {
    question: 'أي عيار أنسب للاقتناء؟',
    answer: 'للحُلي والمناسبات: درجة 21 تجمع النقاء (87.5%) والمتانة. للتحوّط والادّخار: صبّات 24 تُباع بهامش ضئيل فوق البورصة.',
  },
  {
    question: 'كيف أحسب تكلفة قطعة مع أتعاب الصائغ؟',
    answer: 'المعادلة: (الوزن × ثمن الوحدة) + (الوزن × أتعاب الحرفة) + 15% ضريبة. مثال: خاتم 5 غرام بأتعاب 30 ريال. جرّب أداتنا التفاعلية للنتيجة الفورية.',
  },
  {
    question: 'متى تجب الزكاة الشرعية؟',
    answer: 'عند بلوغ النصاب (85 غرام خالص) ومرور حول هجري كامل. النسبة 2.5% من القيمة السوقية وقت الإخراج.',
  },
];

/* ─── Internal Links ─── */
const homeLinks = [
  { href: '/karat-21', label: 'عيار 21 اليوم', icon: '🥇' },
  { href: '/karat-24', label: 'عيار 24 الآن', icon: '💎' },
  { href: '/karat-22', label: 'عيار 22', icon: '✨' },
  { href: '/karat-18', label: 'عيار 18', icon: '🔶' },
  { href: '/gold-bars', label: 'أسعار السبائك', icon: '🧱' },
  { href: '/silver', label: 'الفضة اليوم', icon: '🥈' },
  { href: '/workmanship', label: 'رسوم المصنعية', icon: '🔧' },
  { href: '/buy-sell', label: 'بيع وشراء', icon: '💰' },
  { href: '/markets', label: 'الأسواق والمحلات', icon: '🏪' },
  { href: '/gold-price-riyadh', label: 'الرياض', icon: '🏙️' },
  { href: '/gold-price-jeddah', label: 'جدة', icon: '🌊' },
  { href: '/calculator', label: 'الحاسبة', icon: '🧮' },
];

/* ─── Schemas ─── */
function getPageSchema(updatedAt) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'سعر الذهب اليوم في السعودية',
    description: 'أسعار الذهب في السعودية اليوم محدثة لحظياً بالريال السعودي لجميع العيارات',
    url: `${SITE_URL}/`,
    dateModified: updatedAt || new Date().toISOString(),
    inLanguage: 'ar',
    isPartOf: { '@type': 'WebSite', name: 'سعودي قولد', url: SITE_URL },
  };
}

function getPriceListSchema(prices) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'أسعار الذهب اليوم في السعودية بالريال السعودي',
    description: 'قائمة أسعار جميع عيارات الذهب اليوم في السعودية',
    numberOfItems: 4,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: `سعر جرام الذهب عيار 24: ${prices[24]?.gram?.toFixed(2)} ريال سعودي`, url: `${SITE_URL}/karat-24` },
      { '@type': 'ListItem', position: 2, name: `سعر جرام الذهب عيار 22: ${prices[22]?.gram?.toFixed(2)} ريال سعودي`, url: `${SITE_URL}/karat-22` },
      { '@type': 'ListItem', position: 3, name: `سعر جرام الذهب عيار 21: ${prices[21]?.gram?.toFixed(2)} ريال سعودي`, url: `${SITE_URL}/karat-21` },
      { '@type': 'ListItem', position: 4, name: `سعر جرام الذهب عيار 18: ${prices[18]?.gram?.toFixed(2)} ريال سعودي`, url: `${SITE_URL}/karat-18` },
    ],
  };
}


/* ─── Page Component ─── */
export default async function Home() {
  const { prices, updatedAt } = await getPrices();
  const formattedTime = formatRiyadhTime(updatedAt);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getPageSchema(updatedAt)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getPriceListSchema(prices)) }} />


      <Header />

      <main>
        {/* ═══ Hero Section ═══ */}
        <section className="hero" id="prices">
          <div className="container">
            <div className="badge">
              <span className="live-dot" aria-hidden="true"></span>
              <span>تحديث مباشر من البورصة العالمية</span>
            </div>

            <h1>سعر <span className="text-gold">الذهب</span> اليوم في السعودية مباشر بالريال السعودي</h1>
            <p className="hero-subtitle">
              تسعيرة الغرام محدثة لحظياً بالريال والدولار لكل العيارات — مع أدوات الحساب والزكاة وتغطية أسواق المملكة
            </p>

            {/* Main Price Box */}
            <div className="main-price-box">
              <div className="main-price-label">تسعيرة الغرام عيار ٢١ الآن بالريال</div>
              <div className="main-price-value">
                <span>{fmt(prices[21]?.gram)}</span>
                <span className="main-price-currency">ر.س</span>
              </div>
              <div className="last-update">آخر تحديث: {formattedTime}</div>
            </div>

            {/* Price Cards */}
            <PriceCards prices={prices} highlightKarat={21} />

            {/* Internal Links */}
            <InternalLinks links={homeLinks} />
          </div>
        </section>

        {/* ═══ Server-rendered natural keyword text layer ═══ */}
        <HomeSsrKeywordTextLayer />

        {/* ═══ Price Table ═══ */}
        <section className="section" id="table">
          <div className="container">
            <h2 className="section-title">سعر جرام الذهب اليوم حسب العيار</h2>
            <PriceTable prices={prices} />
          </div>
        </section>

        {/* Secondary tables (bullion / buy-sell / history) → HomeSecondaryClient (CSR) */}

        {/* ═══ Calculators ═══ */}
        <section className="section" id="calc">
          <div className="container">
            <h2 className="section-title">حاسبة الذهب وحاسبة زكاة الذهب</h2>
            <div className="calc-grid">
              <GoldCalculator prices={prices} />
              <ZakatCalculator prices={prices} />
            </div>
          </div>
        </section>

        {/* Markets / city cards / blog CTA → HomeSecondaryClient (CSR) below */}

        {/* ═══ FAQ ═══ */}
        <section className="section">
          <div className="container">
            <h2 className="section-title">الأسئلة الشائعة</h2>
            <FAQ items={homeFAQ} />
          </div>
        </section>

        {/* ═══ Disclaimer ═══ */}
        <section className="section">
          <div className="container">
            <Disclaimer />
          </div>
        </section>
      </main>

      {/* ═══ Client-only blocks (ssr:false): secondary content, deep prose, footer ═══ */}
      <HomeSecondaryClient prices={prices} />
      <HomeSeoDetailsClient />
      <FooterClient />
    </>
  );
}
