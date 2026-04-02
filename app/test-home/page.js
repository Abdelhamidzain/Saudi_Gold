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
                سعر الذهب اليوم في السعودية يمر بفترة تقلّبات حادة. من واقع رصدنا اليومي خلال الأشهر الأخيرة — سعر غرام المعدن النفيس تأرجح بين الصعود والهبوط بمعدّل 8-15 ريال يومياً، وهذا يعني أن مَن يشتري عيار 21 وزن 30 غرام (شبكة عروس متوسطة مثلاً) قد يوفّر أو يدفع فرق يتجاوز 450 ريال سعودي بين يوم وآخر. لهذا يتم تحديث الأسعار لدينا بشكل لحظي كل دقيقة لمتابعة أحدث التغيرات.
              </p>
              <p>
                آلية تحديد سعر الذهب بالريال السعودي تمر بثلاث خطوات: أولاً، يتم رصد سعر الأوقية (اونصة الذهب) عالمياً في بورصة لندن ونيويورك بالدولار الأمريكي. ثانياً، يُقسم سعر الأوقية على 31.1035 (وزن الاونصة بالغرام) للحصول على سعر غرام الذهب الخالص عيار 24 قيراط. ثالثاً، يُضرب الناتج في سعر صرف الدولار مقابل الريال (ثابت عند 3.75). النتيجة هي سعر جرام الذهب في المملكة العربية السعودية بالريال — وهو ما نعرضه في الجدول أعلاه.
              </p>
              <p>
                ملاحظة مهمة: الأسعار المعروضة هنا هي اسعار الذهب الخام (سبوت) وليست اسعار الذهب في محلات الصاغة بالسعودية. المحلات تضيف <Link href="/workmanship" className="text-gold">رسوم المصنعية</Link> وضريبة القيمة المضافة 15% — وبالتالي السعر النهائي في المحل يكون أعلى بمبلغ يتراوح بين 20 إلى 70 ريال لكل غرام حسب درجة تعقيد التصميم. احصل على سعر المصنعية الدقيق من صفحة <Link href="/workmanship" className="text-gold">أسعار المصنعية</Link>.
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
              <h2>سعر الذهب في السعودية — العوامل اللي تحرّك السوق يومياً</h2>
              <p>
                ليش سعر الذهب اليوم في السعودية يختلف عن أمس؟ السؤال بسيط لكن الجواب فيه تفاصيل تهمّك كمشتري. أونصة الذهب تُتداول في بورصة COMEX بنيويورك ولندن 23 ساعة يومياً — يعني حرفياً كل ساعة تمر ممكن يتغير السعر. في العادة، أعلى التقلّبات تصير وقت افتتاح البورصة الأمريكية (الساعة 4:30 عصراً بتوقيت السعودية) — لو تبي تشتري وتحصل سعر مستقر، الصباح الباكر أفضل توقيت.
              </p>
              <p>
                ثلاثة محرّكات رئيسية تحدد اتجاه اسعار الذهب اليوم في السعودية: الأول هو قرارات الفيدرالي الأمريكي بخصوص الفائدة — رفع الفائدة يسحب السيولة من الذهب والعكس صحيح. الثاني هو مؤشر الدولار (DXY) — بما أن الريال مربوط بالدولار، فعلاقتنا بالذهب مباشرة: دولار قوي يعني ذهب أرخص بالريال. الثالث هو الطلب الفيزيائي من البنوك المركزية — في 2024 و 2025 اشترت بنوك الصين والهند وتركيا كميات ضخمة رفعت الأونصة لمستويات تاريخية.
              </p>
              <p>
                نصيحة من واقع السوق: لو تشتري <Link href="/karat-21" className="text-gold">ذهب عيار 21 للمجوهرات</Link> — لا تنتظر "أقل سعر" لأنه مستحيل تتوقعه. بدل كذا، تابع السعر أسبوع وحدد متوسطه، ولو نزل عن المتوسط 2-3% اشترِ مباشرة. أما <Link href="/gold-bars" className="text-gold">سبائك الذهب عيار 24 للاستثمار</Link>، فأسلوب الشراء الدوري (كل شهر مبلغ ثابت) يقلّل مخاطر التوقيت.
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
              <h2>سعر بيع الذهب المستعمل اليوم في السعودية — كم تخسر عند البيع؟</h2>
              <p>
                هذا السؤال يسأله كل مَن يبيع ذهب قديم: كم أخذ فعلاً؟ الإجابة المختصرة — المحل يشتري منك بسعر جرام الذهب الخام ناقص 1-5% حسب الكمية والمحل. يعني لو سعر جرام عيار 21 اليوم 240 ريال، المحل يشتريه منك بحوالي 230-238 ريال. المصنعية اللي دفعتها وقت الشراء؟ خلاص راحت ولن تُحسب.
              </p>
              <p>
                لهذا تحديداً، المستثمرين الأذكياء في السعودية يشترون سبائك ذهب بدل المشغولات — السبيكة مصنعيتها شبه معدومة (5-15 ريال فقط للجرام مقابل 25-60 ريال للمشغولات)، وعند البيع تحصل على سعر قريب جداً من سعر الذهب في البورصة. لمعرفة الفرق الدقيق بين سعر البيع والشراء حسب العيار، استخدم صفحة <Link href="/buy-sell" className="text-gold">بيع وشراء الذهب في السعودية</Link>.
              </p>
              <p>
                حيلة يعرفها أصحاب الخبرة: لو تبيع كمية كبيرة (أكثر من 50 جرام)، لا تبيع في أول محل — خذ عروض من 3 محلات على الأقل. الفرق بين محل وآخر في سعر بيع الذهب المستعمل قد يوصل 5-8 ريال للجرام. واستخدم <Link href="/calculator" className="text-gold">حاسبة اسعار الذهب</Link> عشان تعرف القيمة الحقيقية لقطعتك قبل ما تروح المحل.
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
              <h2>سعر جرام الذهب في السعودية حسب العيار — أيهم يناسبك؟</h2>
              <p>
                ترا الفرق بين العيارات مو بس في السعر. <Link href="/karat-24" className="text-gold">سعر جرام الذهب عيار 24</Link> هو الأغلى لأنه ذهب صافي 99.9% — لكنه ليّن ما يتحمّل الاستخدام اليومي، عشان كذا يُصنع منه السبائك والجنيهات الذهبية فقط. أما <Link href="/karat-21" className="text-gold">سعر جرام الذهب عيار 21</Link> فهو أرخص بحوالي 12.5% من عيار 24 — لأن ربع وزنه معادن أخرى (نحاس وفضة) تعطيه صلابة المجوهرات.
              </p>
              <p>
                معلومة يغفل عنها كثيرين: <Link href="/karat-22" className="text-gold">سعر جرام الذهب عيار 22</Link> ما ينتشر في المحلات السعودية الحديثة بكثرة — تلقاه أكثر في المشغولات الهندية والخليجية التراثية. في المقابل، <Link href="/karat-18" className="text-gold">سعر الذهب عيار 18</Link> هو المفضّل عند الماركات العالمية مثل كارتييه وبولغاري لأنه يتحمّل ترصيع الألماس وتصاميمه أدق.
              </p>
              <p>
                القاعدة الذهبية: لو تشتري ذهب للبس اليومي والمناسبات — عيار 21 هو اختيارك. لو تشتري للادّخار وحفظ القيمة — عيار 24 سبائك. لو تبي تصاميم عالمية فاخرة — عيار 18. ولو تبي تقارن التكلفة الفعلية بين العيارات مع المصنعية، جرّب <Link href="/calculator" className="text-gold">حاسبة الذهب</Link> وحط الوزن والعيار وشوف الفرق.
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

        {/* ═══ SEO Closing Block ═══ */}
        <section className="section">
          <div className="container">
            <div className="info-section">
              <h2>أسعار الذهب في السعودية مباشر — ليش سعودي قولد؟</h2>
              <p>
                سعودي قولد يختلف عن بقية مواقع أسعار الذهب في السعودية بثلاث نقاط: أولاً، التحديث كل 10 دقائق وليس كل ساعة — يعني سعر الذهب اليوم في السعودية اللي تشوفه عندنا هو أقرب سعر للبورصة العالمية الآن. ثانياً، نعرض سعر جرام الذهب لكل العيارات (21، 24، 22، 18) بالريال السعودي بدون تعقيد. ثالثاً، عندنا أدوات عملية ما تلقاها عند غيرنا — حاسبة تحسب لك قيمة القطعة مع المصنعية، وحاسبة زكاة الذهب الشرعية.
              </p>
              <p>
                سواء تبي تعرف سعر الذهب الان في السعودية عشان تشتري شبكة، أو تبي تبيع ذهب مستعمل وتعرف القيمة العادلة، أو حتى تبي تتابع اتجاه سوق الذهب السعودي يوم بيوم — كل هذا متوفر مجاناً. تابع اسعار الذهب اليوم في السعودية عبر سعودي قولد واتخذ قرارك بثقة. أسعارنا مأخوذة مباشرة من البورصة العالمية بدون تأخير يُذكر، وبدون أي تلاعب أو أسعار وهمية.
              </p>
              <p>
                روابط سريعة: <Link href="/karat-21" className="text-gold">سعر الذهب عيار 21 في السعودية</Link> — <Link href="/gold-bars" className="text-gold">سعر سبائك الذهب في السعودية اليوم</Link> — <Link href="/gold-price-riyadh" className="text-gold">سعر الذهب اليوم في الرياض</Link> — <Link href="/gold-price-jeddah" className="text-gold">سعر الذهب اليوم في جدة</Link> — <Link href="/silver" className="text-gold">سعر الفضة اليوم في السعودية</Link> — <Link href="/buy-sell" className="text-gold">سعر بيع الذهب المستعمل اليوم في السعودية</Link>
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
