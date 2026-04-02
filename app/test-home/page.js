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

        {/* ═══ SEO Content Block 1: أسعار الذهب في السعودية ═══ */}
        <section className="section">
          <div className="container">
            <div className="info-section">
              <h2>تسعيرة المعدن النفيس — كيف تُحسب وكيف تتابعها؟</h2>
              <p>
                سعر الذهب اليوم في السعودية يتحدد وفقاً لتسعيرة الأوقية (اونصة) عالمياً في بورصتَي لندن ونيويورك بالدولار الأمريكي، ثم يُحوَّل للريال بالصرف الثابت 3.75. نحدّث الأرقام لحظياً كل دقيقة لتعكس أحدث تحركات البورصة مباشرة.
              </p>
              <p>
                تنبيه للمشترين: ما تراه أعلاه هو تسعيرة الخام (سبوت) بدون مصنعية. محلات الصاغة تضيف <Link href="/workmanship" className="text-gold">رسوم التشكيل</Link> وضريبة 15% — الفارق يتراوح بين 20 إلى 70 ريال لكل غرام بحسب تعقيد القطعة وثقل الزخارف.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ Price Table ═══ */}
        <section className="section" id="table">
          <div className="container">
            <h2 className="section-title">تسعيرة الغرام حسب العيار في المملكة</h2>
            <PriceTable prices={prices} />
          </div>
        </section>

        {/* ═══ SEO Content Block 2: عوامل التسعير ═══ */}
        <section className="section">
          <div className="container">
            <div className="info-section">
              <h2>ثلاثة محرّكات تحكم السوق يومياً</h2>
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
            <h2 className="section-title">أدوات الحساب والزكاة الشرعية</h2>
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
              <h2>ثمن البيع للمستعمل — كم تسترد فعلاً؟</h2>
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
            <h2 className="section-title">التسعيرة حسب المدينة في المملكة</h2>
            <p style={{ textAlign: 'center', color: 'var(--txt2)', marginBottom: '24px', maxWidth: '700px', margin: '0 auto 24px' }}>
              ثمن الغرام الخام موحّد في كل المدن، لكن رسوم التشكيل وتوفر المحلات تختلف. اختر مدينتك لمعرفة أقرب الأسواق
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

        {/* ═══ SEO Content Block 4: العيارات ═══ */}
        <section className="section">
          <div className="container">
            <div className="info-section">
              <h2>مقارنة العيارات — أيهم يلائم احتياجك؟</h2>
              <p>
                <Link href="/karat-24" className="text-gold">عيار 24</Link> (99.9% نقاوة) للسبائك والجنيهات حصراً — ليّن لا يصلح للحُلي. <Link href="/karat-21" className="text-gold">عيار 21</Link> (87.5% نقاء) الأكثر رواجاً محلياً للشبكات والأطقم. <Link href="/karat-22" className="text-gold">عيار 22</Link> (91.6%) شائع في المشغولات التراثية. <Link href="/karat-18" className="text-gold">عيار 18</Link> (75%) المفضّل لدى كارتييه وبولغاري لترصيع الألماس. قارن الثمن باستخدام <Link href="/calculator" className="text-gold">أداة الحساب</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ Chart + Why Us (merged) ═══ */}
        <section className="section">
          <div className="container">
            <div className="info-section">
              <h2>الرسم البياني والتحليل الفني</h2>
              <p>
                تتبّع حركة المعدن الثمين عبر الرسوم البيانية يكشف أنماط السوق المحلي. والبيانات والتحليلات تشير لاستمرار الاتجاه الصاعد مع تزايد الطلب المركزي الآسيوي. احصل على الشارت التفصيلي بالريال والدولار من صفحة <Link href="/history" className="text-gold">التاريخ والتحليل الفني</Link>. نوفر لك أيضاً: حاسبة تفاعلية بالمصنعية، أداة الزكاة الشرعية، تغطية حسب المدينة، وتسعيرة المستعمل يومياً — مجاناً بدون تسجيل.
              </p>
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

      <Footer />
    </>
  );
}
