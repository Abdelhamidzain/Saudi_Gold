import { getPrices, formatRiyadhTime } from './lib/getPrices';
import { fmt } from './lib/gold';
import { SITE_URL } from './lib/schema';
import Header from './components/Header';
import PriceCards from './components/PriceCards';
import PriceTable from './components/PriceTable';
import FooterCityLinksSSR from './components/FooterCityLinksSSR';
import dynamic from 'next/dynamic';

// Everything except the SEO-critical top content is client-only (ssr:false):
// it loads after hydration and stays out of the initial HTML. The footer's
// other links also live here; only the 5 city links are kept server-rendered
// (FooterCityLinksSSR) for crawl discovery.
const HomeClientContent = dynamic(
  () => import('./components/HomeClientContent'),
  { ssr: false }
);
const FooterClient = dynamic(
  () => import('./components/FooterClient'),
  { ssr: false }
);

export const revalidate = 1800;

/* ─── SEO Metadata ─── */
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

/* ─── Schemas (price/webpage only — no FAQPage on the homepage) ─── */
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
        {/* ═══ Hero (SSR): H1, live price box, price cards ═══ */}
        <section className="hero" id="prices">
          <div className="container">
            <div className="badge">
              <span className="live-dot" aria-hidden="true"></span>
              <span>تحديث مباشر من البورصة العالمية</span>
            </div>

            <h1>سعر الذهب اليوم في السعودية</h1>
            <p className="hero-subtitle">
              تسعيرة جرام الذهب محدثة لحظياً بالريال السعودي لكل العيارات
            </p>

            {/* Main Price Box */}
            <div className="main-price-box">
              <div className="main-price-label">سعر جرام الذهب عيار ٢١ الآن بالريال</div>
              <div className="main-price-value">
                <span>{fmt(prices[21]?.gram)}</span>
                <span className="main-price-currency">ر.س</span>
              </div>
              <div className="last-update">آخر تحديث: {formattedTime}</div>
            </div>

            {/* Price Cards */}
            <PriceCards prices={prices} highlightKarat={21} />
          </div>
        </section>

        {/* ═══ SEO Block 1 (SSR): how the price is set ═══ */}
        <section className="section">
          <div className="container">
            <div className="info-section">
              <h2>سعر الذهب في السعودية — كيف يُحسب وكيف تتابعه؟</h2>
              <p>
                سعر الذهب اليوم في السعودية يتحدد وفقاً لقيمة الأوقية عالمياً في بورصتَي لندن
                ونيويورك بالدولار، ثم يُحوَّل للريال بالصرف الثابت 3.75. يهتم الزائر بمعرفة سعر
                جرام الذهب في السعودية اليوم لاتخاذ قرار الشراء أو البيع — لذلك نحدّث الأرقام كل
                دقيقة لتعكس أحدث تحركات البورصة.
              </p>
              <p>
                ما تراه هنا هو ثمن الجرام النقي قبل إضافات الصائغ. ورش الحُلي تحمّل أجور الصنعة
                وضريبة 15%. كما نوفر سعر سبائك الذهب في السعودية اليوم، وسعر الفضة اليوم في
                السعودية، وحاسبة زكاة الذهب الشرعية.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ Main gold price table (SSR) ═══ */}
        <section className="section" id="table">
          <div className="container">
            <h2 className="section-title">سعر جرام الذهب اليوم حسب العيار</h2>
            <PriceTable prices={prices} />
          </div>
        </section>

        {/* ═══ Everything else is client-only (ssr:false) ═══ */}
        <HomeClientContent prices={prices} />
      </main>

      {/* ═══ Footer: 5 city links SSR (crawlable) + rest client-only ═══ */}
      <FooterCityLinksSSR />
      <FooterClient />
    </>
  );
}
