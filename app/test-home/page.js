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
    answer: 'يتحدد لحظياً وفقاً لتسعيرة الأونصة عالمياً مع احتساب صرف الدولار مقابل الريال. الجدول أعلاه يعرض تكلفة الغرام لكل العيارات بتحديث كل عشر دقائق.',
  },
  {
    question: 'ما الفرق بين الثمن الخام والثمن بالمصنعية؟',
    answer: 'الخام هو تسعيرة الغرام مجرّدة من أي إضافة. المحلات ترفع الرقم بإضافة رسوم التشكيل (15-50 ريال/غرام) وضريبة القيمة المضافة 15%. السبائك الاستثمارية عيار 24 معفاة كلياً من الضريبة.',
  },
  {
    question: 'أي عيار أنسب للشراء في المملكة؟',
    answer: 'للمجوهرات والمناسبات: عيار 21 يجمع بين النقاء (87.5%) والمتانة. للتحوّط والادّخار: سبائك 24 قيراط تُباع بهامش ضئيل فوق البورصة.',
  },
  {
    question: 'كيف أحسب تكلفة قطعة بالمصنعية؟',
    answer: 'المعادلة: (الوزن × ثمن الغرام) + (الوزن × رسم التشكيل) + 15% ضريبة. مثال: خاتم 5 غرام عيار 21 برسوم 30 ريال = (5 × ثمن الغرام) + 150 + الضريبة. جرّب الحاسبة التفاعلية أعلاه.',
  },
  {
    question: 'متى تجب الزكاة الشرعية؟',
    answer: 'عند بلوغ النصاب (85 غرام خالص) ومرور حول هجري كامل. النسبة 2.5% من القيمة السوقية وقت الإخراج.',
  },
  {
    question: 'أين أرخص محلات في المملكة؟',
    answer: 'الأسواق الشعبية تمنح هوامش تنافسية: الثميري والبطحاء بالرياض، حراء الدولي واليمامة بجدة، العتيبية بمكة. فاوض دائماً على رسم التشكيل وقارن بين 2-3 تجّار.',
  },
  {
    question: 'هل التسعيرة تختلف بين الرياض وجدة والدمام؟',
    answer: 'ثمن الغرام الخام موحّد لارتباطه بالبورصة الدولية. الاختلاف ينحصر في رسوم التشكيل وهامش ربح كل تاجر. تصفّح صفحات المدن لمعرفة أقرب الأسواق إليك.',
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
              اسعار الذهب اليوم في المملكة العربية السعودية بالريال السعودي والدولار — يتم تحديث سعر غرام الذهب بجميع العيارات كل دقيقة بشكل مباشر مع اسعار السبائك والأوقية
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
              <h2>اسعار الذهب في السعودية اليوم — تحديث لحظي بالريال والدولار</h2>
              <p>
                سعر الذهب اليوم في السعودية يتحدد وفقاً لسعر الأوقية (اونصة) عالمياً في بورصتَي لندن ونيويورك بالدولار الأمريكي، ثم يُحوَّل للريال بسعر الصرف الثابت 3.75. يتم تحديث اسعار غرام المعدن النفيس لدينا بشكل لحظي كل دقيقة — يعني الأرقام اللي تشوفها أعلاه تعكس أحدث تحركات البورصة العالمية مباشرة بدون تأخير.
              </p>
              <p>
                تنبيه للمشترين: الأسعار هنا هي تسعيرة الخام (سبوت) بدون مصنعية. محلات الصاغة في المملكة العربية السعودية تضيف <Link href="/workmanship" className="text-gold">رسوم التشكيل والتصنيع</Link> وضريبة القيمة المضافة 15% — الفارق يتراوح بين 20 إلى 70 ريال سعودي لكل غرام بحسب تعقيد القطعة وثقل الزخارف.
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
              <h2>فهم تحركات سوق الذهب في المملكة — ثلاثة محرّكات رئيسية</h2>
              <p>
                أونصة المعدن الأصفر تُتداول في بورصة COMEX بنيويورك ولندن 23 ساعة يومياً. أعلى التقلّبات تصير وقت افتتاح الجلسة الأمريكية (4:30 عصراً بتوقيت الرياض). ثلاثة عوامل تحكم الاتجاه: قرارات الفيدرالي بخصوص الفائدة، مؤشر الدولار DXY (دولار قوي يعني ثمن أقل بالريال)، والطلب الفيزيائي من البنوك المركزية الآسيوية اللي اشترت كميات استثنائية خلال 2024-2025.
              </p>
              <p>
                نصيحة تطبيقية: لشراء <Link href="/karat-21" className="text-gold">مجوهرات عيار 21</Link> تابع المتوسط الأسبوعي واشترِ عند انخفاض 2-3%. أما <Link href="/gold-bars" className="text-gold">سبائك 24 قيراط للادّخار</Link>، فأسلوب التحوّط بالشراء الدوري الشهري يخفّض مخاطر التوقيت ويُراكم الحيازة تدريجياً.
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
              <h2>سعر بيع الذهب المستعمل اليوم — كم تسترد فعلاً؟</h2>
              <p>
                التاجر يشتري منك بتسعيرة الخام ناقص 1-5% ولا يحتسب المصنعية نهائياً. مثال: لو الغرام عيار 21 حالياً 240 ريال، تسترد 230-238 تقريباً. لذلك المستثمرون المحنّكون يفضّلون <Link href="/gold-bars" className="text-gold">السبائك</Link> — رسوم تشكيلها زهيدة (5-15 ريال/غرام) مقابل 25-60 للمشغولات، وعند التصفية تحصل على ثمن قريب جداً من البورصة.
              </p>
              <p>
                استراتيجية ذكية: قارن عروض 3 تجّار على الأقل قبل إتمام البيع — الفارق يبلغ 5-8 ريالات للغرام أحياناً. واحسب القيمة العادلة لقطعتك مسبقاً عبر <Link href="/calculator" className="text-gold">حاسبة اسعار الذهب</Link> لتدخل المفاوضة بموقف أقوى. تفاصيل أوفى في صفحة <Link href="/buy-sell" className="text-gold">بيع وشراء الذهب</Link>.
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
              <h2>مقارنة اسعار الذهب حسب العيار — أيهم يلائم احتياجك؟</h2>
              <p>
                <Link href="/karat-24" className="text-gold">عيار 24</Link> (99.9% نقاوة، 24 قيراط) للسبائك والجنيهات الذهبية حصراً — ليّن لا يصلح للحُلي. <Link href="/karat-21" className="text-gold">عيار 21</Link> (87.5% نقاء) الأكثر رواجاً محلياً للشبكات والأطقم والمناسبات. <Link href="/karat-22" className="text-gold">عيار 22</Link> (91.6%) شائع في المشغولات الهندية والخليجية التراثية. <Link href="/karat-18" className="text-gold">عيار 18</Link> (75%) المفضّل لدى كارتييه وبولغاري لترصيع الألماس والأحجار الكريمة. قارن الثمن الفعلي لكل واحد باستخدام <Link href="/calculator" className="text-gold">أداة الحساب التفاعلية</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ Chart Reference Section (missing H2) ═══ */}
        <section className="section">
          <div className="container">
            <div className="info-section">
              <h2>الرسم البياني لأسعار الذهب التاريخية في السعودية</h2>
              <p>
                تتبّع حركة المعدن النفيس عبر الرسوم البيانية يساعدك على فهم سوق الذهب في المملكة العربية السعودية بشكل أعمق. خلال آخر فترة، سجّلت أسعار الذهب في السعودية ارتفاعات متتالية دفعت سعر الأوقية لمستويات تاريخية عالمياً. والبيانات والتحليلات تشير إلى أن التوجه الصاعد للذهب مستمر مع تزايد الطلب من البنوك المركزية حول العالم.
              </p>
              <p>
                للاطلاع على الرسوم البيانية التفصيلية وأسعار الذهب التاريخية خلال آخر سنة بالريال السعودي والدولار الأمريكي، تفضّل بزيارة صفحة <Link href="/history" className="text-gold">تاريخ أسعار الذهب في السعودية</Link>. ستجد هناك التحليل الفني ومقارنة الأسعار حسب كل فترة زمنية.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ Why Us Section (missing H2) ═══ */}
        <section className="section">
          <div className="container">
            <div className="info-section">
              <h2>لماذا تتابع أسعار الذهب في السعودية معنا؟</h2>
              <p>
                احصل على أحدث اسعار الذهب في المملكة العربية السعودية لحظياً — يتم تحديثها كل دقيقة بشكل مباشر من البورصة العالمية بدون أي تأخير يُذكر. نوفر لك اسعار غرام الذهب بجميع العيارات (عيار 24 قيراط وعيار 22 وعيار 21 وعيار 18) بالريال السعودي والدولار، مع التحديثات المباشرة لسعر اونصة الذهب (الأوقية) وأسعار سبائك الذهب لجميع الأحجام.
              </p>
              <p>
                ما يميّز سعودي قولد: حاسبة ذهب تفاعلية تحسب لك القيمة مع المصنعية، حاسبة زكاة الذهب الشرعية، أسعار الذهب حسب المدينة (الرياض، جدة، مكة، الدمام وغيرها)، وسعر بيع الذهب المستعمل يومياً. كل هذا مجاناً وبدون تسجيل.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ Saudi Gold Regulations ═══ */}
        <section className="section">
          <div className="container">
            <div className="info-section">
              <h2>أنظمة تجارة الذهب في المملكة العربية السعودية</h2>
              <p>
                وزارة التجارة تُلزم كل صائغ مرخّص بدمغ القطع بختم النقاء الرسمي: &ldquo;750&rdquo; لعيار 18، &ldquo;875&rdquo; لعيار 21، &ldquo;916&rdquo; لعيار 22، و&ldquo;999&rdquo; لعيار 24. طالب بفاتورة مفصّلة تحتوي الوزن والمصنعية منفصلَين والضريبة. هيئة المعادن الثمينة تجري فحوصات مخبرية دورية — لو شكّيت بالنقاوة بلّغ عبر تطبيق &ldquo;بلاغ تجاري&rdquo;. سبائك 24 بنقاء 99%+ معفاة من ضريبة القيمة المضافة بقرار هيئة الزكاة والجمارك — توفير 15% مقارنة بالمشغولات.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ Practical Jewelry Tips ═══ */}
        <section className="section">
          <div className="container">
            <div className="info-section">
              <h2>إرشادات شراء المجوهرات من محلات الصاغة</h2>
              <p>
                قبل الزيارة راجع التسعيرة الحالية هنا. في المحل: اطلب الوزن أمامك بالميزان الإلكتروني الحساس، وتحقّق من ختم الدمغة والعيار. فاوض على المصنعية الإجمالية للطقم الكامل — التجّار يمنحون حسومات أفضل مقارنة بالقطعة المنفردة. المشغولات الإيطالية خفيفة مجوّفة (وزن أقل لكن رسوم تشكيل مرتفعة)، التركية متينة وثقيلة، والبحرينية تراثية مثالية للشبكات والهدايا.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ Investment Comparison ═══ */}
        <section className="section">
          <div className="container">
            <div className="info-section">
              <h2>الادّخار بالمعدن الأصفر مقابل البدائل الاستثمارية</h2>
              <p>
                السبيكة تتميّز بسيولة فورية — تبيعها نقداً خلال ساعة بعكس العقارات اللي تحتاج أسابيع. أسهم تداول تعطي عوائد أعلى أحياناً لكن تذبذبها عنيف (خسارة 10-20% في أسبوع واردة). المعدن النفيس أبطأ صعوداً لكنه أثبت: متوسط ارتفاع 8-12% سنوياً عالمياً خلال العقد الماضي. التوصية المهنية: خصّص 15-25% من محفظتك كتحوّط ضد التضخم. بديل متقدّم: صناديق المؤشرات المتداولة ETF المرتبطة بالأونصة والمتاحة عبر منصّات وساطة مرخّصة — بدون حاجة لخزنة أو تأمين فيزيائي.
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
            <h2 className="section-title">الأسئلة الشائعة حول سعر <span className="text-gold">الذهب</span> في السعودية</h2>
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

      <Footer />
    </>
  );
}
