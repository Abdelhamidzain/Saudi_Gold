import { getPrices, formatRiyadhTime } from '../lib/getPrices';
import { toAr, fmt, KARATS, GOLD_MARKETS } from '../lib/gold';
import { SITE_URL, getWebPageSchema, getItemListSchema, getServiceSchema } from '../lib/schema';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PriceCards from '../components/PriceCards';
import PriceTable from '../components/PriceTable';
import { GoldCalculator, ZakatCalculator } from '../components/Calculators';
import FAQ from '../components/FAQ';
import Disclaimer from '../components/Disclaimer';
import InternalLinks from '../components/InternalLinks';
import Link from 'next/link';
import { Suspense } from 'react';

export const revalidate = 60;

/* ─── SEO Metadata (Optimized) ─── */
const days = ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
const todayName = days[new Date().getDay()];

export const metadata = {
  title: `سعر الذهب اليوم في السعودية | أسعار الذهب بالريال السعودي تحديث مباشر`,
  description: `سعر الذهب اليوم ${todayName} في السعودية بالريال السعودي ✓ تحديث مباشر لأسعار جرام الذهب عيار 21 و 24 و 22 و 18 مع أسعار البيع والشراء والمصنعية وحاسبة الذهب`,
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
    answer: 'سعر الذهب اليوم في السعودية يتحدد لحظياً وفقاً لسعر الأونصة في البورصة العالمية مع احتساب سعر صرف الدولار مقابل الريال. الجدول أعلاه يوضح سعر جرام الذهب لكل العيارات (21 و 24 و 22 و 18) بتحديث كل 10 دقائق.',
  },
  {
    question: 'ما الفرق بين سعر الذهب الخام وسعر الذهب بالمصنعية في السعودية؟',
    answer: 'سعر الذهب الخام هو سعر الجرام بدون إضافات. أما السعر في المحلات فيشمل المصنعية (15-50 ريال/جرام حسب التصميم) بالإضافة لضريبة القيمة المضافة 15%. السبائك عيار 24 معفاة من ضريبة القيمة المضافة في السعودية.',
  },
  {
    question: 'ما هو أفضل عيار ذهب للشراء في السعودية؟',
    answer: 'يعتمد على هدفك. عيار 21 هو الخيار الأول للمجوهرات في السعودية — يجمع بين النقاوة (87.5% ذهب) والصلابة. أما للاستثمار والادخار فعيار 24 والسبائك هي الأنسب لأنها تُباع بسعر قريب من السعر العالمي.',
  },
  {
    question: 'كيف أحسب سعر قطعة ذهب في السعودية؟',
    answer: 'المعادلة: (وزن القطعة بالجرام × سعر الجرام للعيار) + (الوزن × المصنعية) + ضريبة 15%. مثال: خاتم 5 جرام عيار 21 بمصنعية 30 ريال = (5 × سعر الجرام) + (5 × 30) + الضريبة. استخدم حاسبة الذهب أعلاه للحساب الفوري.',
  },
  {
    question: 'هل سعر الذهب موحّد في جميع محلات الذهب بالسعودية؟',
    answer: 'سعر الجرام الخام (بدون مصنعية) شبه موحّد لأنه مرتبط بالبورصة العالمية. الاختلاف يكون في المصنعية وهامش الربح. محلات الأسواق الشعبية (مثل سوق الثميري بالرياض وحراء الدولي بجدة) عادةً أرخص من المولات والماركات العالمية.',
  },
  {
    question: 'متى تجب زكاة الذهب في السعودية؟',
    answer: 'تجب الزكاة إذا بلغ الذهب النصاب الشرعي (85 جرام ذهب خالص عيار 24) ومرّ عليه حول هجري كامل. نسبة الزكاة 2.5% من القيمة السوقية وقت الإخراج. الذهب المُعدّ للزينة فيه خلاف فقهي — راجع صفحة حاسبة زكاة الذهب.',
  },
  {
    question: 'كم سعر سبيكة ذهب 100 جرام في السعودية اليوم؟',
    answer: 'سعر السبيكة = سعر جرام الذهب عيار 24 × 100 + هامش ربح المحل (1-3%). سعر سبيكة 100 جرام يتغير يومياً مع البورصة. راجع صفحة أسعار سبائك الذهب لجميع الأحجام (5، 10، 50، 100 جرام، كيلو).',
  },
  {
    question: 'أين أجد أرخص أسعار ذهب في السعودية؟',
    answer: 'أسواق الذهب الشعبية تقدم أفضل الأسعار: سوق الثميري والبطحاء في الرياض، سوق حراء وسوق اليمامة في جدة، وسوق العتيبية في مكة. نصيحة: تفاوض دائماً على المصنعية ولا تتردد بالمقارنة بين 2-3 محلات قبل الشراء.',
  },
  {
    question: 'كيف أعرف سعر الذهب لحظة بلحظة في السعودية؟',
    answer: 'موقع سعودي قولد يوفر تحديث مباشر لأسعار الذهب في السعودية كل 10 دقائق على مدار الساعة. الأسعار تُحسب من سعر الأونصة العالمي بالدولار ثم تُحوّل للريال السعودي تلقائياً.',
  },
  {
    question: 'هل سعر الذهب في الرياض يختلف عن جدة أو مكة؟',
    answer: 'سعر الجرام الخام واحد في كل مدن السعودية لأنه مربوط بالسعر العالمي. الاختلاف يكون فقط في المصنعية وهامش الربح بين المحلات. تصفّح أسعار الذهب حسب المدينة لمعرفة أفضل أسواق الذهب القريبة منك.',
  },
];

/* ─── Internal Links ─── */
const homeLinks = [
  { href: '/karat-21', label: 'سعر الذهب عيار 21', icon: '🥇' },
  { href: '/karat-24', label: 'سعر الذهب عيار 24', icon: '💎' },
  { href: '/karat-22', label: 'سعر الذهب عيار 22', icon: '✨' },
  { href: '/karat-18', label: 'سعر الذهب عيار 18', icon: '🔶' },
  { href: '/gold-bars', label: 'أسعار سبائك الذهب', icon: '🧱' },
  { href: '/silver', label: 'سعر الفضة اليوم', icon: '🥈' },
  { href: '/workmanship', label: 'أسعار المصنعية', icon: '🔧' },
  { href: '/buy-sell', label: 'بيع وشراء الذهب', icon: '💰' },
  { href: '/markets', label: 'أسواق الذهب', icon: '🏪' },
  { href: '/gold-price-riyadh', label: 'الذهب في الرياض', icon: '🏙️' },
  { href: '/gold-price-jeddah', label: 'الذهب في جدة', icon: '🌊' },
  { href: '/calculator', label: 'حاسبة الذهب', icon: '🧮' },
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

/* ─── FAQ Schema ─── */
function getFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homeFAQ.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

/* ─── Page Component ─── */
export default async function TestHome() {
  const { prices, updatedAt } = await getPrices();
  const formattedTime = formatRiyadhTime(updatedAt);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getPageSchema(updatedAt)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getPriceListSchema(prices)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQSchema()) }} />

      <Header />

      <main>
        {/* ═══ Hero Section ═══ */}
        <section className="hero" id="prices">
          <div className="container">
            <div className="badge">
              <span className="live-dot" aria-hidden="true"></span>
              <span>تحديث مباشر من البورصة العالمية</span>
            </div>

            <h1>سعر <span className="text-gold">الذهب</span> اليوم في السعودية</h1>
            <p className="hero-subtitle">
              أسعار جرام الذهب في السعودية محدثة لحظياً بالريال السعودي لعيار ٢١ و ٢٤ و ٢٢ و ١٨ — مع أسعار السبائك والبيع والشراء والمصنعية
            </p>

            {/* Main Price Box */}
            <div className="main-price-box">
              <div className="main-price-label">سعر جرام الذهب عيار ٢١ اليوم في السعودية</div>
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

        {/* ═══ SEO Content Block 1: أسعار الذهب في السعودية ═══ */}
        <section className="section">
          <div className="container">
            <div className="info-section">
              <h2>أسعار الذهب اليوم في السعودية بالريال السعودي</h2>
              <p>
                يتابع آلاف المستثمرين والمقبلين على الزواج في السعودية سعر الذهب بشكل يومي — وهذا طبيعي، فالذهب ليس مجرد معدن ثمين بل هو أداة ادخار واستثمار وزينة في آنٍ واحد. سعر الذهب اليوم في السعودية يتحدد بناءً على عاملين رئيسيين: سعر أونصة الذهب في البورصة العالمية (المقوّم بالدولار الأمريكي)، وسعر صرف الدولار مقابل الريال السعودي.
              </p>
              <p>
                الأسعار التي نعرضها في سعودي قولد هي أسعار الذهب الخام (سعر السبوت) — أي سعر الجرام قبل إضافة المصنعية. في المحلات، يُضاف على هذا السعر تكلفة التصنيع (المصنعية) وهامش ربح المحل وضريبة القيمة المضافة 15%. لذلك ستجد فرقاً بين السعر هنا وسعر <Link href="/workmanship" className="text-gold">الذهب بالمصنعية</Link> في محلات الصاغة.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ Price Table ═══ */}
        <section className="section" id="table">
          <div className="container">
            <h2 className="section-title">سعر جرام الذهب في السعودية لجميع العيارات</h2>
            <PriceTable prices={prices} />
          </div>
        </section>

        {/* ═══ SEO Content Block 2: عوامل التسعير ═══ */}
        <section className="section">
          <div className="container">
            <div className="info-section">
              <h2>ما الذي يحرّك أسعار الذهب في السعودية؟</h2>
              <p>
                كثير من الناس يسأل: ليش سعر الذهب يتغير كل يوم؟ الإجابة المختصرة — البورصة العالمية. الذهب يُتداول في بورصات لندن ونيويورك على مدار الساعة، وأي تحرّك في سعر الأونصة ينعكس مباشرة على سعر الجرام في محلات الرياض وجدة والدمام وكل مدن المملكة.
              </p>
              <p>
                العوامل الرئيسية: قرارات الفائدة الأمريكية (ارتفاع الفائدة يضغط على الذهب)، معدلات التضخم العالمية (التضخم يدفع المستثمرين للذهب كملاذ آمن)، التوترات الجيوسياسية، وحركة الدولار الأمريكي. بما أن الريال السعودي مربوط بالدولار، فالتأثير الأكبر يأتي من سعر الأونصة نفسه وليس من تقلبات العملة.
              </p>
              <p>
                نصيحة عملية: إذا كنت تخطط لشراء ذهب سواء <Link href="/karat-21" className="text-gold">عيار 21 للمجوهرات</Link> أو <Link href="/gold-bars" className="text-gold">سبائك عيار 24 للاستثمار</Link>، تابع الأسعار لمدة أسبوع أو أسبوعين قبل الشراء. الأسعار تتذبذب يومياً وقد توفّر عشرات الريالات على كل جرام لو اخترت التوقيت المناسب.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ Calculators ═══ */}
        <section className="section" id="calc">
          <div className="container">
            <h2 className="section-title">حاسبة الذهب وحاسبة <span className="text-gold">زكاة الذهب</span></h2>
            <div className="calc-grid">
              <GoldCalculator prices={prices} />
              <ZakatCalculator prices={prices} />
            </div>
          </div>
        </section>

        {/* ═══ SEO Content Block 3: بيع وشراء ═══ */}
        <section className="section">
          <div className="container">
            <div className="info-section">
              <h2>سعر بيع وشراء الذهب في السعودية اليوم</h2>
              <p>
                عند شراء الذهب من المحلات في السعودية، تدفع سعر الجرام + المصنعية + الضريبة. لكن عند البيع — خاصة الذهب المستعمل — المحل يشتري منك بسعر الجرام الخام فقط بدون المصنعية، وأحياناً بخصم بسيط (1-3%). هذا يعني إنك تخسر قيمة المصنعية عند إعادة البيع.
              </p>
              <p>
                لهذا السبب، السبائك والجنيه الذهب أفضل للاستثمار — مصنعيتها منخفضة جداً مقارنة بالمشغولات. لمعرفة سعر بيع الذهب المستعمل اليوم بالتفصيل، راجع صفحة <Link href="/buy-sell" className="text-gold">بيع وشراء الذهب</Link>. ولحساب قيمة قطعتك بدقة، استخدم <Link href="/calculator" className="text-gold">حاسبة أسعار الذهب</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ Markets ═══ */}
        <section className="section" id="markets">
          <div className="container">
            <h2 className="section-title">أسواق <span className="text-gold">الذهب</span> في السعودية</h2>
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
                عرض جميع أسواق الذهب في السعودية ←
              </Link>
            </div>
          </div>
        </section>

        {/* ═══ City Prices ═══ */}
        <section className="section">
          <div className="container">
            <h2 className="section-title">أسعار الذهب اليوم حسب المدينة في السعودية</h2>
            <p style={{ textAlign: 'center', color: 'var(--txt2)', marginBottom: '24px', maxWidth: '700px', margin: '0 auto 24px' }}>
              سعر جرام الذهب الخام واحد في كل المدن السعودية، لكن المصنعية وتوفر المحلات تختلف. اختر مدينتك لمعرفة أقرب أسواق الذهب وأفضل المحلات
            </p>
            <div className="price-cards">
              <Link href="/gold-price-riyadh" className="price-card">
                <div className="price-card-karat" style={{ fontSize: '1.5rem' }}>🏙️</div>
                <h3 className="price-card-label">سعر الذهب اليوم في الرياض</h3>
                <div className="price-card-unit">أسواق الثميري · البطحاء · طيبة</div>
              </Link>
              <Link href="/gold-price-jeddah" className="price-card">
                <div className="price-card-karat" style={{ fontSize: '1.5rem' }}>🌊</div>
                <h3 className="price-card-label">سعر الذهب اليوم في جدة</h3>
                <div className="price-card-unit">حراء الدولي · سوق اليمامة</div>
              </Link>
              <Link href="/gold-price-makkah" className="price-card">
                <div className="price-card-karat" style={{ fontSize: '1.5rem' }}>🕋</div>
                <h3 className="price-card-label">سعر الذهب اليوم في مكة</h3>
                <div className="price-card-unit">سوق العتيبية · الستين</div>
              </Link>
              <Link href="/gold-price-dammam" className="price-card">
                <div className="price-card-karat" style={{ fontSize: '1.5rem' }}>🛢️</div>
                <h3 className="price-card-label">سعر الذهب اليوم في الدمام</h3>
                <div className="price-card-unit">سوق الذهب · الحياة بلازا</div>
              </Link>
              <Link href="/gold-price-madinah" className="price-card">
                <div className="price-card-karat" style={{ fontSize: '1.5rem' }}>🌴</div>
                <h3 className="price-card-label">سعر الذهب في المدينة المنورة</h3>
                <div className="price-card-unit">سوق المدينة الدولي · طيبة</div>
              </Link>
              <Link href="/gold-price-taif" className="price-card">
                <div className="price-card-karat" style={{ fontSize: '1.5rem' }}>🌹</div>
                <h3 className="price-card-label">سعر الذهب اليوم في الطائف</h3>
                <div className="price-card-unit">عيار 21 · محدث لحظياً</div>
              </Link>
            </div>
          </div>
        </section>

        {/* ═══ SEO Content Block 4: العيارات ═══ */}
        <section className="section">
          <div className="container">
            <div className="info-section">
              <h2>دليل عيارات الذهب في السعودية</h2>
              <p>
                العيار يعني نسبة الذهب الخالص في القطعة. <Link href="/karat-24" className="text-gold">عيار 24</Link> هو ذهب خالص بنسبة 99.9% — يُستخدم في السبائك والعملات الذهبية ولا يصلح للمجوهرات لأنه ليّن. <Link href="/karat-21" className="text-gold">عيار 21</Link> يحتوي 87.5% ذهب والباقي نحاس أو فضة تمنحه الصلابة اللازمة — وهو الأكثر مبيعاً في محلات المملكة.
              </p>
              <p>
                <Link href="/karat-22" className="text-gold">عيار 22</Link> (91.6% ذهب) منتشر في المشغولات الخليجية التقليدية. أما <Link href="/karat-18" className="text-gold">عيار 18</Link> (75% ذهب) فيُفضّل في تصاميم المجوهرات العالمية لأنه أصلب ويتحمل الترصيع بالأحجار. كل عيار له سعره المختلف — تحقق من الأسعار أعلاه أو استخدم <Link href="/calculator" className="text-gold">حاسبة الذهب</Link> لمقارنة التكلفة.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ Blog CTA ═══ */}
        <section className="section">
          <div className="container">
            <h2 className="section-title">مقالات ونصائح عن الذهب في السعودية</h2>
            <div className="price-cards">
              <Link href="/blog/gold-buying-guide-saudi" className="price-card">
                <div className="price-card-karat" style={{ fontSize: '1.5rem' }}>📖</div>
                <h3 className="price-card-label">دليل شراء الذهب في السعودية</h3>
                <div className="price-card-unit">نصائح عملية للمبتدئين</div>
              </Link>
              <Link href="/blog/difference-gold-karats" className="price-card">
                <div className="price-card-karat" style={{ fontSize: '1.5rem' }}>💎</div>
                <h3 className="price-card-label">الفرق بين عيارات الذهب</h3>
                <div className="price-card-unit">24 vs 22 vs 21 vs 18</div>
              </Link>
              <Link href="/blog/gold-zakat-guide" className="price-card">
                <div className="price-card-karat" style={{ fontSize: '1.5rem' }}>🕌</div>
                <h3 className="price-card-label">دليل زكاة الذهب الشامل</h3>
                <div className="price-card-unit">حساب الزكاة مع أمثلة عملية</div>
              </Link>
              <Link href="/blog/best-time-buy-gold" className="price-card">
                <div className="price-card-karat" style={{ fontSize: '1.5rem' }}>⏰</div>
                <h3 className="price-card-label">أفضل وقت لشراء الذهب</h3>
                <div className="price-card-unit">تحليل وتوقعات الخبراء</div>
              </Link>
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Link href="/blog" className="btn btn-outline">
                عرض جميع المقالات ←
              </Link>
            </div>
          </div>
        </section>

        {/* ═══ FAQ ═══ */}
        <section className="section">
          <div className="container">
            <h2 className="section-title">أسئلة شائعة عن أسعار الذهب في السعودية</h2>
            <FAQ items={homeFAQ} />
          </div>
        </section>

        {/* ═══ SEO Closing Block ═══ */}
        <section className="section">
          <div className="container">
            <div className="info-section">
              <h2>سعر الذهب في السعودية — تحديث مباشر على مدار الساعة</h2>
              <p>
                موقع سعودي قولد هو منصتك الموثوقة لمتابعة سعر الذهب اليوم في السعودية بالريال السعودي. نوفر تحديث مباشر لأسعار جرام الذهب لجميع العيارات (21 و 24 و 22 و 18)، بالإضافة لأسعار السبائك والأونصة و<Link href="/silver" className="text-gold">سعر الفضة</Link>. كل الأسعار تُحسب آلياً من البورصة العالمية وتُحدّث كل 10 دقائق لضمان الدقة.
              </p>
              <p>
                سواء كنت تبحث عن سعر الذهب للاستثمار أو لشراء شبكة العروس أو لحساب زكاة الذهب — ستجد كل ما تحتاجه هنا. تابعنا يومياً لمعرفة اتجاه أسعار الذهب في السوق السعودي واتخذ قرار الشراء أو البيع بثقة.
              </p>
            </div>
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
