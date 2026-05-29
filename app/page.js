import { getPrices, formatRiyadhTime } from './lib/getPrices';
import { SITE_URL } from './lib/schema';
import Header from './components/Header';
import PriceTable from './components/PriceTable';
import { HomeHeroCSR, HomeMiddleCSR, HomeEndCSR } from './components/home/HomeCSR';

export const revalidate = 1800;

/* ─── SEO Metadata (Optimized) ─── */
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

/* ─── FAQ data (used for SSR FAQPage schema; UI is rendered client-side) ─── */
const homeFAQ = [
  { question: 'كم سعر الذهب اليوم في السعودية بالريال السعودي؟', answer: 'يتحدد وفقاً لتسعيرة الأونصة عالمياً مع احتساب صرف الدولار مقابل الريال. راجع الجدول أعلاه لمعرفة القيمة الآنية لكل درجات النقاء.' },
  { question: 'ما الفرق بين الثمن الصافي والثمن بالمصنعية؟', answer: 'الخام يعني تكلفة الوحدة مجرّدة من إضافات. المتاجر ترفع الرقم بأجور التصنيع (15-50 ريال للغرام) وضريبة 15%. القوالب الاستثمارية 24 قيراط معفاة كلياً.' },
  { question: 'أي عيار أنسب للاقتناء؟', answer: 'للحُلي والمناسبات: درجة 21 تجمع النقاء (87.5%) والمتانة. للتحوّط والادّخار: صبّات 24 تُباع بهامش ضئيل فوق البورصة.' },
  { question: 'كيف أحسب تكلفة قطعة مع أتعاب الصائغ؟', answer: 'المعادلة: (الوزن × ثمن الوحدة) + (الوزن × أتعاب الحرفة) + 15% ضريبة. مثال: خاتم 5 غرام بأتعاب 30 ريال. جرّب أداتنا التفاعلية للنتيجة الفورية.' },
  { question: 'متى تجب الزكاة الشرعية؟', answer: 'عند بلوغ النصاب (85 غرام خالص) ومرور حول هجري كامل. النسبة 2.5% من القيمة السوقية وقت الإخراج.' },
  { question: 'أين أرخص الوجهات للتسوّق؟', answer: 'الأحياء التجارية العريقة تمنح هوامش تنافسية: الثميري والبطحاء بالعاصمة، حراء واليمامة بالميناء الغربي، العتيبية قرب الحرم. فاوض دائماً وقارن عرضَين على الأقل.' },
  { question: 'هل يختلف الثمن بين المناطق والمحافظات؟', answer: 'القيمة الأساسية موحّدة لارتباطها ببورصات المعادن الدولية. الاختلاف ينحصر في أتعاب الصانع وهامش ربحه. تصفّح صفحات المحافظات لمعرفة أقرب الوجهات.' },
];

/* ─── Schemas (kept server-rendered) ─── */
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

function getFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homeFAQ.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqSchema()) }} />

      <Header />

      <main>
        {/* ═══ SSR: H1 only ═══ */}
        <section className="hero" id="prices">
          <div className="container">
            <h1>سعر <span className="text-gold">الذهب</span> اليوم في السعودية</h1>
          </div>
        </section>

        {/* ═══ CSR (slot A): price box + cards + internal links + intro ═══ */}
        <HomeHeroCSR prices={prices} formattedTime={formattedTime} />

        {/* ═══ SSR: main karat price table ═══ */}
        <section className="section" id="table">
          <div className="container">
            <h2 className="section-title">أسعار الذهب لكل عيار اليوم بالمملكة</h2>
            <PriceTable prices={prices} />
          </div>
        </section>

        {/* ═══ CSR (slot B): bullion + buy/sell + history + calculators + markets ═══ */}
        <HomeMiddleCSR prices={prices} />

        {/* ═══ CSR (slot C): city links + comparison + chart + blog + FAQ + disclaimer + footer ═══ */}
        <HomeEndCSR />
      </main>
    </>
  );
}
