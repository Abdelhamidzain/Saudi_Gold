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
        {/* ═══ SSR: H1 + unique intro copy ═══ */}
        <section className="hero" id="prices">
          <div className="container">
            <h1>سعر <span className="text-gold">الذهب</span> اليوم في السعودية</h1>
            <p className="hero-subtitle">
              نرصد لك سعر الذهب اليوم في السعودية لحظةً بلحظة بالريال السعودي، انطلاقاً من تسعيرة الأوقية في بورصتَي لندن ونيويورك ثم تحويلها محلياً وفق سعر الصرف الثابت. تتبدّل القيمة مرات عديدة خلال جلسة التداول الواحدة، لذا نُعيد ضبط الأرقام آلياً كل دقيقة كي تطّلع على رقم دقيق قبل أي قرار شراء أو بيع.
            </p>
            <div className="info-section" style={{ textAlign: 'right', maxWidth: '820px', margin: '20px auto 0' }}>
              <p>
                يبحث المقتنون والمستثمرون عن مرجع موثوق يجمع تسعيرة المعدن الأصفر بكامل درجات نقائه في مكان واحد. هذه الصفحة تؤدي ذلك الدور: تعرض قيمة الغرام للعيارات الأربعة والعشرين والاثنين والعشرين والواحد والعشرين والثامن عشر، إضافةً إلى الأوقية والكيلوغرام، بعملتَي الريال والدولار جنباً إلى جنب. وبهذا يصبح معرفة سعر الذهب في السعودية اليوم خطوةً واضحة لا تحتاج إلى مقارنة مصادر متفرقة.
              </p>
              <p>
                تذكّر أن ما يظهر في الجدول هو الثمن الخام للمعدن قبل أن يضيف الصائغ أجور الصياغة وضريبة القيمة المضافة. الفارق بين سبيكة استثمارية وقطعة حُلي منقوشة يعود غالباً إلى كلفة التشكيل والربح، لا إلى جوهر المادة الثمينة ذاتها. ومراقبة المؤشر يومياً تكشف اتجاه الموجة الصاعدة أو الهابطة، فتلتقط لحظة التراجع المناسبة للاقتناء قبل أن ترتد القيمة من جديد.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ CSR (slot A): price box + cards + internal links + intro ═══ */}
        <HomeHeroCSR prices={prices} formattedTime={formattedTime} />

        {/* ═══ SSR: main karat price table + unique copy ═══ */}
        <section className="section" id="table">
          <div className="container">
            <h2 className="section-title">سعر الذهب اليوم في السعودية حسب العيار</h2>
            <div className="info-section" style={{ marginBottom: '24px' }}>
              <p>
                يوضّح الجدول أدناه سعر الذهب اليوم في السعودية حسب العيار بصورة مبسطة: لكل درجة نقاء صفٌّ مستقل يضم قيمة الوحدة بالريال يليها مقابلها بالدولار. صُمِّم العرض ليناسب من يريد إجابةً فورية عن سؤال "كم يساوي غرامي الآن؟" دون الدخول في حسابات معقّدة. ولأن البيانات تُجلب مباشرة من منصّات التسعير العالمية، فإن أي تحرّك في الأوقية ينعكس على الأرقام خلال ثوانٍ معدودة.
              </p>
            </div>
            <PriceTable prices={prices} />
            <div className="info-section" style={{ marginTop: '24px' }}>
              <p>
                يميل كثير من المشترين في المملكة إلى العيار الواحد والعشرين لأنه يوازن بين صلابة القطعة وارتفاع نسبة المعدن النفيس فيها، ما يجعله الخيار الأشهر للأطقم والمناسبات. أما من يتطلّع إلى الادخار طويل الأمد فيتجه نحو العيار الرابع والعشرين بصورته السبائكية، إذ يقترب ثمنه من قيمة البورصة ويسهل تسييله لاحقاً. وبين هذا وذاك يبقى العياران الثاني والعشرون والثامن عشر حاضرَين في مشغولات بعينها.
              </p>
              <p>
                ننصح بقراءة الرقم في سياقه: قارن قيمة اليوم بمتوسط الأسبوع الماضي قبل الإقدام على صفقة، واسأل أكثر من محل عن أجرة الصياغة لأنها تتباين كثيراً بين ورشة وأخرى. وإذا كنت تتابع سعر الذهب في السعودية اليوم بهدف البيع، فاحتسب أن التاجر يخصم نسبة بسيطة من القيمة الأساسية ولا يدفع لك مقابل المصنعية. هذا الوعي البسيط يوفّر عليك فروقاً ملموسة عند كل عملية.
              </p>
              <p>
                تتأثر التسعيرة بعوامل متشابكة تتجاوز حدود المملكة: مشتريات المصارف المركزية الآسيوية، منسوب التضخّم العالمي، تذبذب أسعار الفائدة الأمريكية، والاضطرابات الجيوسياسية التي تدفع المدّخرين نحو الملاذات الآمنة. متى ارتفعت حدّة المخاطر، تصاعد الإقبال على المعدن النفيس فقفزت أوقيته، والعكس صحيح حين تهدأ الأسواق وتستعيد العملات الورقية بريقها. إدراك هذه الخلفية يحوّل متابعتك من مجرد رصد رقمٍ عابر إلى قراءة واعية تُنضج قرارك الاستثماري.
              </p>
            </div>
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
