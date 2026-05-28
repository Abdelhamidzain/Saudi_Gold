import Link from 'next/link';
import { fmt, SAUDI_CITIES } from '../lib/gold';

/*
 * HomeSeoContent — fully server-rendered topical content block for the
 * homepage. It is intentionally a Server Component (no 'use client'): every
 * paragraph, heading and link below ships inside the initial HTML, so the page
 * is crawlable and readable with JavaScript disabled.
 *
 * It does NOT use any of the class names LivePriceUpdater mutates
 * (.main-price-value, .price-card-value, .last-update, .price-table tr) so the
 * live client-side price refresh keeps working untouched. Dynamic prices in the
 * prose are rendered once at request/revalidate time inside <strong class="seo-price">
 * and phrased as approximate ("نحو/حوالي") so they read naturally even between
 * revalidations.
 */

/* Generic topical section wrapper — reuses the existing .info-section card. */
function HomeTopicSection({ id, title, children }) {
  return (
    <section className="section" id={id}>
      <div className="container">
        <div className="info-section">
          <h2>{title}</h2>
          {children}
        </div>
      </div>
    </section>
  );
}

/* Inline keyword-rich internal link row — reuses .internal-links design. */
function HomeKeywordLinks({ links }) {
  return (
    <div className="internal-links" style={{ marginTop: '20px' }}>
      {links.map((l) => (
        <Link key={l.href} href={l.href} className="internal-link" prefetch={false}>
          {l.icon && <span aria-hidden="true">{l.icon}</span>}
          {l.label}
        </Link>
      ))}
    </div>
  );
}

/* City links — natural "سعر الذهب اليوم في {city}" anchor text. */
function HomeCityLinks() {
  // Keep the five highest-intent metros first, then the rest for coverage.
  const primary = ['gold-price-riyadh', 'gold-price-jeddah', 'gold-price-makkah', 'gold-price-madinah', 'gold-price-dammam'];
  const ordered = [
    ...primary.map((s) => SAUDI_CITIES.find((c) => c.slug === s)).filter(Boolean),
    ...SAUDI_CITIES.filter((c) => !primary.includes(c.slug)),
  ];

  return (
    <div className="internal-links" style={{ marginTop: '20px' }}>
      {ordered.map((c) => (
        <Link key={c.slug} href={`/${c.slug}`} className="internal-link" prefetch={false}>
          <span aria-hidden="true">📍</span>
          {`سعر الذهب اليوم في ${c.nameAr}`}
        </Link>
      ))}
    </div>
  );
}

export default function HomeSeoContent({ prices }) {
  const gram24 = prices?.[24]?.gram;
  const gram22 = prices?.[22]?.gram;
  const gram21 = prices?.[21]?.gram;
  const gram18 = prices?.[18]?.gram;
  const ounce24 = prices?.[24]?.ounce;
  const kilo24 = prices?.[24]?.kilo;

  const P = ({ v }) =>
    typeof v === 'number' && !isNaN(v) ? (
      <strong className="seo-price">{fmt(v)} ر.س</strong>
    ) : (
      <strong className="seo-price">يُحدّث لحظياً</strong>
    );

  return (
    <>
      {/* B — Live summary of today's gold prices */}
      <HomeTopicSection id="seo-summary" title="ملخص أسعار الذهب اليوم في السعودية">
        <p>
          تعرض هذه الصفحة قيمة المعدن الأصفر في السوق السعودي بشكل لحظي لكل
          العيارات المتداولة: عيار 24 و22 و21 و18 و14، بالريال السعودي وبما
          يعادلها بالدولار. متابعة <Link href="/karat-24" className="text-gold">الذهب اليوم</Link> صارت
          أسهل، إذ يُحتسب السعر مباشرةً من تسعيرة الأونصة العالمية لحظة بلحظة،
          فتحصل على الرقم الآن دون انتظار.
        </p>
        <p>
          يبلغ سعر جرام عيار 24 حالياً نحو <P v={gram24} />، وعيار 22 بنحو{' '}
          <P v={gram22} />، فيما يستقر عيار 18 عند <P v={gram18} /> تقريباً. هذه
          التحديثات المباشرة تساعدك على معرفة قيمة الجرام قبل أي قرار بيع أو
          شراء، مع جدول تفصيلي وأدوات حساب أدناه.
        </p>
      </HomeTopicSection>

      {/* C — Gram pricing & how it derives from the ounce */}
      <HomeTopicSection id="seo-gram" title="سعر جرام الذهب في السعودية وكيف يُحسب">
        <p>
          ينشغل أغلب المتسوّقين بمعرفة قيمة الغرام الواحد لأنه وحدة البيع
          الأساسية في محلات الصاغة. تُشتق هذه القيمة من سعر الأونصة الدولية
          مقسومةً على 31.1 غراماً، ثم تُضرب في نقاوة العيار. لذلك يختلف ثمن
          الغرام من عيار لآخر رغم ارتباطه بالمصدر العالمي نفسه.
        </p>
        <p>
          عملياً، يقترب سعر الجرام عيار 21 — وهو الأكثر طلباً للحُلي — من{' '}
          <P v={gram21} />، بينما يُمثّل عيار 24 الخام مرجع التسعير لباقي
          الدرجات. يمكنك تقدير قيمة أي وزن فوراً عبر{' '}
          <Link href="/calculator" className="text-gold">حاسبة الذهب</Link>، أو
          مراجعة تفاصيل كل عيار في صفحاته المخصصة.
        </p>
        <HomeKeywordLinks
          links={[
            { href: '/karat-24', label: 'جرام عيار 24', icon: '💎' },
            { href: '/karat-22', label: 'جرام عيار 22', icon: '✨' },
            { href: '/karat-21', label: 'جرام عيار 21', icon: '🥇' },
            { href: '/karat-18', label: 'جرام عيار 18', icon: '🔶' },
            { href: '/calculator', label: 'احسب قيمة الوزن', icon: '🧮' },
          ]}
        />
      </HomeTopicSection>

      {/* D — 21K focus */}
      <HomeTopicSection id="seo-21k" title="سعر الذهب عيار 21 اليوم">
        <p>
          يحتل عيار 21 مكانة خاصة لدى الأسر السعودية لأنه يوازن بين نقاوة عالية
          (87.5%) ومتانة تتحمّل الاستعمال اليومي، فهو الخيار الأول للشبكة
          والأطقم والهدايا. تجد قيمته الآن بنحو <P v={gram21} /> للغرام، وهي رقم
          يتحرّك صعوداً وهبوطاً تبعاً للبورصة العالمية على مدار الجلسة.
        </p>
        <p>
          للاطلاع على تسعيرة البيع والشراء التفصيلية لهذا العيار، بما في ذلك
          قيمة القطع المستعملة، تابع صفحة{' '}
          <Link href="/karat-21" className="text-gold">سعر الذهب عيار 21</Link> المحدّثة
          باستمرار.
        </p>
      </HomeTopicSection>

      {/* E — Buy/sell, used gold, workmanship */}
      <HomeTopicSection id="seo-buysell" title="سعر بيع الذهب اليوم والذهب المستعمل">
        <p>
          يفرّق التاجر بين سعرين: سعر الشراء الذي تدفعه عند اقتناء قطعة جديدة —
          ويشمل أجور الصياغة وضريبة القيمة المضافة — وسعر البيع الذي تستردّه عند
          التصفية. عند بيع الذهب المستعمل يحتسب الصائغ القيمة الخام للعيار ويخصم
          هامشاً صغيراً ولا يعيد لك أتعاب المصنعية، لذا يقلّ المبلغ المسترد عن
          ثمن الشراء.
        </p>
        <p>
          فهم هذا الفارق يحميك من المفاجآت ويساعدك على التفاوض. اطّلع على
          تفاصيل الفروقات في صفحة{' '}
          <Link href="/buy-sell" className="text-gold">بيع وشراء الذهب</Link>،
          وعلى متوسط رسوم الصياغة حسب نوع القطعة في صفحة{' '}
          <Link href="/workmanship" className="text-gold">مصنعية الذهب</Link>.
        </p>
      </HomeTopicSection>

      {/* F — Bullion / investment */}
      <HomeTopicSection id="seo-bullion" title="أسعار سبائك الذهب في السعودية">
        <p>
          تختلف السبيكة عن المشغولات بأنها ذهب استثماري عيار 24 يُباع بهامش ضئيل
          فوق سعر السوق وبلا أجور صياغة تقريباً، ما يجعلها أقرب أدوات الادّخار
          إلى القيمة العادلة عند إعادة البيع. تتوفر السبائك بأوزان متدرّجة من
          غرام واحد وحتى الكيلو الكامل لتناسب مختلف الميزانيات.
        </p>
        <p>
          لمعرفة سعر سبيكة الذهب اليوم بمختلف أوزانها وكيفية اختيار الوزن
          المناسب لهدفك الاستثماري، تابع صفحة{' '}
          <Link href="/gold-bars" className="text-gold">أسعار سبائك الذهب</Link>،
          ويمكنك حساب زكاتها عبر{' '}
          <Link href="/zakat" className="text-gold">حاسبة الزكاة</Link>.
        </p>
      </HomeTopicSection>

      {/* G — Ounce, gram, kilo */}
      <HomeTopicSection id="seo-ounce" title="سعر أونصة الذهب وكيلو الذهب">
        <p>
          الأونصة هي وحدة التداول العالمية وتساوي 31.1 غراماً، وعليها يُبنى كل
          حساب لاحق. تبلغ قيمة أونصة عيار 24 حالياً نحو <P v={ounce24} />، بينما
          يصل الكيلو الكامل إلى <P v={kilo24} /> تقريباً، وهو ما يهمّ المستثمر
          الذي يتعامل بكميات كبيرة أكثر من المشتري الفردي.
        </p>
        <p>
          إذا أردت فهم العلاقة بين الأونصة والغرام والكيلو وتحويل الأسعار بينها،
          فصفحة <Link href="/ounce" className="text-gold">سعر أونصة الذهب</Link> تشرح
          ذلك بالتفصيل مع القيم المحدّثة.
        </p>
      </HomeTopicSection>

      {/* H — Silver (kept short to preserve gold intent) */}
      <HomeTopicSection id="seo-silver" title="سعر الفضة اليوم في السعودية">
        <p>
          إلى جانب الذهب، يتابع كثيرون قيمة الفضة كخيار استثماري أقل تكلفة. نوفّر
          سعر الفضة اليوم في السعودية بالريال للغرام والأونصة والكيلو، محدّثاً من
          المصدر العالمي نفسه. للتفاصيل الكاملة زر صفحة{' '}
          <Link href="/silver" className="text-gold">سعر الفضة</Link>.
        </p>
      </HomeTopicSection>

      {/* I — City coverage with keyword-rich internal links */}
      <HomeTopicSection id="seo-cities" title="أسعار الذهب اليوم في مدن السعودية">
        <p>
          قيمة الجرام الخام موحّدة في جميع مناطق المملكة لارتباطها بالبورصة
          الدولية، والاختلاف الوحيد بين مدينة وأخرى ينحصر في رسوم الصياغة وهامش
          المحل. خصّصنا صفحة لكل مدينة تعرض السعر المحلي وأبرز الأسواق ونصائح
          الشراء، بدءاً من الرياض وجدة ومكة والمدينة والدمام.
        </p>
        <HomeCityLinks />
        <HomeKeywordLinks
          links={[
            { href: '/markets', label: 'أسواق ومحلات الذهب', icon: '🏪' },
            { href: '/buy-sell', label: 'سعر البيع والشراء', icon: '💰' },
            { href: '/workmanship', label: 'رسوم المصنعية', icon: '🔧' },
          ]}
        />
      </HomeTopicSection>
    </>
  );
}

/*
 * HomeFaqExpansion — extra server-rendered Q&A merged into the homepage FAQ
 * array in page.js. Merging (instead of rendering a second <FAQ/>) keeps a
 * single FAQPage JSON-LD block on the page, matching the existing schema setup.
 */
export const homeFaqExpansion = [
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
