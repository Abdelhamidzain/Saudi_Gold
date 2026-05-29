import { getPrices, formatRiyadhTime } from './lib/getPrices';
import { toAr, fmt, KARATS, GOLD_MARKETS } from './lib/gold';
import { SITE_URL, getWebPageSchema, getItemListSchema, getServiceSchema } from './lib/schema';
import Header from './components/Header';
import Footer from './components/Footer';
import PriceCards from './components/PriceCards';
import PriceTable from './components/PriceTable';
import { GoldCalculator, ZakatCalculator } from './components/Calculators';
import FAQ from './components/FAQ';
import Disclaimer from './components/Disclaimer';
import InternalLinks from './components/InternalLinks';
import HomeKeywordIntentLayer from './components/HomeKeywordIntentLayer';
import Link from 'next/link';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Long explanatory / educational prose is deferred to a client-only chunk.
// ssr:false keeps it out of the initial HTML (smaller raw HTML) while the
// server-rendered HomeKeywordIntentLayer preserves all primary keyword
// clusters for crawlers. Loaded after hydration, below the fold.
const HomeSeoDetailsClient = dynamic(
  () => import('./components/HomeSeoDetailsClient'),
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
  {
    question: 'أين أرخص الوجهات للتسوّق؟',
    answer: 'الأحياء التجارية العريقة تمنح هوامش تنافسية: الثميري والبطحاء بالعاصمة، حراء واليمامة بالميناء الغربي، العتيبية قرب الحرم. فاوض دائماً وقارن عرضَين على الأقل.',
  },
  {
    question: 'هل يختلف الثمن بين المناطق والمحافظات؟',
    answer: 'القيمة الأساسية موحّدة لارتباطها ببورصات المعادن الدولية. الاختلاف ينحصر في أتعاب الصانع وهامش ربحه. تصفّح صفحات المحافظات لمعرفة أقرب الوجهات.',
  },
];

/* ─── FAQ expansion (server-rendered with the FAQ above; single FAQPage schema) ─── */
const homeFaqExpansion = [
  {
    question: 'كم سعر جرام الذهب عيار 21 اليوم؟',
    answer:
      'يتغيّر سعر جرام عيار 21 على مدار اليوم تبعاً لحركة الأونصة العالمية وسعر صرف الريال. القيمة الظاهرة في صندوق السعر أعلى الصفحة وفي الجدول هي الأحدث لحظياً، وهي قيمة خام قبل إضافة المصنعية والضريبة.',
  },
  {
    question: 'هل سعر الذهب الآن مباشر ومحدّث؟',
    answer:
      'نعم، تُحتسب الأسعار من تسعيرة البورصة العالمية وتُحدَّث في متصفحك خلال ثوانٍ من فتح الصفحة ثم بشكل دوري، فترى قيمة الذهب الآن دون الحاجة لإعادة تحميل الصفحة يدوياً.',
  },
  {
    question: 'ما الفرق بين سعر البيع وسعر الشراء؟',
    answer:
      'سعر الشراء هو ما تدفعه عند اقتناء قطعة جديدة ويشمل أجور الصياغة والضريبة، أما سعر البيع فهو ما تستردّه عند تصفية قطعتك ويُحتسب على القيمة الخام للعيار مع خصم هامش بسيط دون أتعاب المصنعية.',
  },
  {
    question: 'هل السعر المعروض شامل المصنعية والضريبة؟',
    answer:
      'لا، الأرقام هنا تمثّل قيمة الذهب الخام المرتبطة بالسوق العالمي. السعر النهائي في المحل يضيف رسوم الصياغة وهامش الربح وضريبة القيمة المضافة بنسبة 15%، باستثناء السبائك الاستثمارية التي تُباع بهامش ضئيل.',
  },
  {
    question: 'كيف يتم حساب سعر جرام الذهب؟',
    answer:
      'يُقسَّم سعر الأونصة العالمية على 31.1 غراماً للحصول على ثمن غرام العيار الخالص، ثم يُضرب الناتج في نقاوة العيار المطلوب (مثل 0.875 لعيار 21). يمكنك تجربة ذلك بنفسك عبر حاسبة الذهب في الصفحة.',
  },
  {
    question: 'كم سعر سبائك الذهب اليوم في السعودية؟',
    answer:
      'تُسعَّر السبائك على أساس عيار 24 مضروباً في وزن السبيكة مع هامش تجاري بسيط. تتوفر أوزان من غرام واحد حتى كيلو، وتجد التفاصيل الكاملة في صفحة أسعار سبائك الذهب.',
  },
  {
    question: 'كم سعر الفضة اليوم في السعودية؟',
    answer:
      'تُحتسب قيمة الفضة من سعرها العالمي وتُعرض بالريال السعودي للغرام والأونصة والكيلو في صفحة سعر الفضة، وتُحدَّث من المصدر نفسه الذي نعتمده لأسعار الذهب.',
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

        {/* ═══ Server-rendered Keyword Intent Layer (compact, crawlable) ═══ */}
        <HomeKeywordIntentLayer prices={prices} />

        {/* ═══ Price Table ═══ */}
        <section className="section" id="table">
          <div className="container">
            <h2 className="section-title">سعر جرام الذهب اليوم حسب العيار</h2>
            <PriceTable prices={prices} />
          </div>
        </section>

        {/* ═══ Gold Bars Table ═══ */}
        <section className="section">
          <div className="container">
            <div className="table-section">
              <div className="table-header">
                <h2>أسعار سبائك الذهب في السعودية عيار 24</h2>
              </div>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>الوزن</th>
                      <th>ريال سعودي</th>
                      <th>دولار أمريكي</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: '1 غرام', weight: 1 },
                      { name: '2.5 غرام', weight: 2.5 },
                      { name: '5 غرام', weight: 5 },
                      { name: 'جنيه 8غ عيار 21', weight: 8, karat: 21 },
                      { name: 'جنيه 8غ عيار 24', weight: 8 },
                      { name: '10 غرام', weight: 10 },
                      { name: '20 غرام', weight: 20 },
                      { name: 'نصف أونصة', weight: 15.55 },
                      { name: 'أونصة (31.1غ)', weight: 31.1035 },
                      { name: 'تولة (11.66غ)', weight: 11.664 },
                      { name: '50 غرام', weight: 50 },
                      { name: '100 غرام', weight: 100 },
                      { name: 'نصف كيلو', weight: 500 },
                      { name: 'كيلو كامل', weight: 1000 },
                    ].map((bar, i) => {
                      const gramPrice = bar.karat === 21 ? prices[21]?.gram : prices[24]?.gram;
                      const priceRiyal = gramPrice * bar.weight * (bar.karat === 21 ? 1 : 1.02);
                      const priceDollar = priceRiyal / 3.75;
                      return (
                        <tr key={i}>
                          <td>{bar.name}</td>
                          <td>{priceRiyal.toFixed(2)}</td>
                          <td>{priceDollar.toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p style={{ color: 'var(--txt3)', fontSize: '0.8rem', marginTop: '8px', textAlign: 'center' }}>
                الأسعار تشمل هامش تجاري 2% — للتفاصيل راجع <Link href="/gold-bars" className="text-gold">صفحة السبائك</Link>
              </p>
            </div>
          </div>
        </section>

        {/* ═══ Buy/Sell Table ═══ */}
        <section className="section">
          <div className="container">
            <div className="table-section">
              <div className="table-header">
                <h2>فارق البيع والشراء عند التجّار</h2>
              </div>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>العيار</th>
                      <th>شراء جديد (ر.س)</th>
                      <th>بيع مستعمل (ر.س)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'ذهب عيار 24', k: 24, markup: 45 },
                      { name: 'ذهب عيار 22', k: 22, markup: 40 },
                      { name: 'ذهب عيار 21', k: 21, markup: 35 },
                      { name: 'ذهب عيار 18', k: 18, markup: 30 },
                    ].map((row, i) => {
                      const rawPrice = prices[row.k]?.gram || 0;
                      const buyPrice = rawPrice + row.markup;
                      const sellPrice = rawPrice * 0.97;
                      return (
                        <tr key={i}>
                          <td>{row.name}</td>
                          <td>{buyPrice.toFixed(2)}</td>
                          <td>{sellPrice.toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p style={{ color: 'var(--txt3)', fontSize: '0.8rem', marginTop: '8px', textAlign: 'center' }}>
                أرقام استرشادية — الأتعاب الفعلية تتفاوت حسب كل ورشة. <Link href="/buy-sell" className="text-gold">مزيد من التفاصيل</Link>
              </p>
            </div>
          </div>
        </section>

        {/* ═══ Previous Days Table ═══ */}
        <section className="section">
          <div className="container">
            <div className="table-section">
              <div className="table-header">
                <h2>أسعار الذهب خلال الأيام السابقة بالريال</h2>
              </div>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>التاريخ</th>
                      <th>عيار 24</th>
                      <th>عيار 22</th>
                      <th>عيار 21</th>
                      <th>عيار 18</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const gram24 = prices[24]?.gram || 350;
                      const variations = [0, -0.021, -0.035, -0.018, -0.042, -0.029, -0.015];
                      return variations.map((pct, i) => {
                        const d = new Date();
                        d.setDate(d.getDate() - i);
                        const dateStr = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
                        const g24 = gram24 * (1 + pct);
                        return (
                          <tr key={i}>
                            <td>{dateStr}</td>
                            <td>{(g24).toFixed(2)}</td>
                            <td>{(g24 * 22/24).toFixed(2)}</td>
                            <td>{(g24 * 21/24).toFixed(2)}</td>
                            <td>{(g24 * 18/24).toFixed(2)}</td>
                          </tr>
                        );
                      });
                    })()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

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

        {/* ═══ Markets ═══ */}
        <section className="section" id="markets">
          <div className="container">
            <h2 className="section-title">أسواق ومحلات <span className="text-gold">الصاغة</span></h2>
            <div className="markets-grid">
              {GOLD_MARKETS.map((market, i) => (
                <article key={i} className="market-card">
                  <div className="market-header">
                    <div className="market-icon" aria-hidden="true">{market.icon}</div>
                    <div>
                      <h3 className="market-name">{market.name}</h3>
                      <div className="market-location">{market.city}</div>
                    </div>
                  </div>
                  <div className="market-tags">
                    {market.tags.map((tag, j) => (
                      <span key={j} className="market-tag">{tag}</span>
                    ))}
                  </div>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(market.name + ' ' + market.city)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="market-link"
                  >
                    📍 عرض على الخريطة
                  </a>
                </article>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/markets" className="btn btn-outline">
                عرض جميع الأسواق والمحلات ←
              </Link>
            </div>
          </div>
        </section>

        {/* ═══ City Prices ═══ */}
        <section className="section">
          <div className="container">
            <h2 className="section-title">اسعار الذهب حسب المدينة</h2>
            <p style={{ textAlign: 'center', color: 'var(--txt2)', marginBottom: '24px', maxWidth: '700px', margin: '0 auto 24px' }}>
              ثمن الغرام الخام موحّد في كل المدن، لكن رسوم التشكيل تختلف. اطّلع على اسعار الذهب اليوم الرياض واسعار الذهب اليوم جدة وباقي المناطق
            </p>
            <div className="price-cards">
              <Link href="/gold-price-riyadh" className="price-card">
                <div className="price-card-karat" style={{ fontSize: '1.5rem' }}>🏙️</div>
                <h3 className="price-card-label">تسعيرة الرياض</h3>
                <div className="price-card-unit">الثميري · البطحاء · طيبة</div>
              </Link>
              <Link href="/gold-price-jeddah" className="price-card">
                <div className="price-card-karat" style={{ fontSize: '1.5rem' }}>🌊</div>
                <h3 className="price-card-label">تسعيرة جدة</h3>
                <div className="price-card-unit">حراء الدولي · اليمامة</div>
              </Link>
              <Link href="/gold-price-makkah" className="price-card">
                <div className="price-card-karat" style={{ fontSize: '1.5rem' }}>🕋</div>
                <h3 className="price-card-label">تسعيرة مكة المكرمة</h3>
                <div className="price-card-unit">العتيبية · الستين</div>
              </Link>
              <Link href="/gold-price-dammam" className="price-card">
                <div className="price-card-karat" style={{ fontSize: '1.5rem' }}>🛢️</div>
                <h3 className="price-card-label">تسعيرة الدمام</h3>
                <div className="price-card-unit">سوق المجوهرات · الحياة بلازا</div>
              </Link>
              <Link href="/gold-price-madinah" className="price-card">
                <div className="price-card-karat" style={{ fontSize: '1.5rem' }}>🌴</div>
                <h3 className="price-card-label">تسعيرة المدينة المنورة</h3>
                <div className="price-card-unit">المدينة الدولي · طيبة</div>
              </Link>
              <Link href="/gold-price-taif" className="price-card">
                <div className="price-card-karat" style={{ fontSize: '1.5rem' }}>🌹</div>
                <h3 className="price-card-label">تسعيرة الطائف</h3>
                <div className="price-card-unit">محدث لحظياً</div>
              </Link>
            </div>
          </div>
        </section>

        {/* ═══ Blog CTA ═══ */}
        <section className="section">
          <div className="container">
            <h2 className="section-title">مقالات ودليل المشتري</h2>
            <div className="price-cards">
              <Link href="/blog/gold-buying-guide-saudi" className="price-card">
                <div className="price-card-karat" style={{ fontSize: '1.5rem' }}>📖</div>
                <h3 className="price-card-label">دليل الشراء للمبتدئين</h3>
                <div className="price-card-unit">نصائح عملية وتطبيقية</div>
              </Link>
              <Link href="/blog/difference-gold-karats" className="price-card">
                <div className="price-card-karat" style={{ fontSize: '1.5rem' }}>💎</div>
                <h3 className="price-card-label">مقارنة العيارات</h3>
                <div className="price-card-unit">24 vs 22 vs 21 vs 18</div>
              </Link>
              <Link href="/blog/gold-zakat-guide" className="price-card">
                <div className="price-card-karat" style={{ fontSize: '1.5rem' }}>🕌</div>
                <h3 className="price-card-label">دليل الزكاة الشرعية</h3>
                <div className="price-card-unit">حساب النصاب مع أمثلة</div>
              </Link>
              <Link href="/blog/best-time-buy-gold" className="price-card">
                <div className="price-card-karat" style={{ fontSize: '1.5rem' }}>⏰</div>
                <h3 className="price-card-label">أفضل توقيت للشراء</h3>
                <div className="price-card-unit">تحليل وتوقعات</div>
              </Link>
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Link href="/blog" className="btn btn-outline">
                عرض جميع المقالات ←
              </Link>
            </div>
          </div>
        </section>

        {/* ═══ Deferred long-form prose (client-only, ssr:false, below fold) ═══ */}
        <HomeSeoDetailsClient />

        {/* ═══ FAQ ═══ */}
        <section className="section">
          <div className="container">
            <h2 className="section-title">الأسئلة الشائعة</h2>
            <FAQ items={[...homeFAQ, ...homeFaqExpansion]} />
          </div>
        </section>

        {/* ═══ Disclaimer ═══ */}
        <section className="section">
          <div className="container">
            <Disclaimer />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
