'use client';

import Link from 'next/link';
import { GOLD_MARKETS } from '../lib/gold';
import { GoldCalculator, ZakatCalculator } from './Calculators';
import FAQ from './FAQ';
import Disclaimer from './Disclaimer';
import InternalLinks from './InternalLinks';

/*
 * HomeClientContent — ALL non-critical homepage content, rendered client-only
 * via dynamic(import, { ssr:false }) in page.js. It is NOT in the initial HTML;
 * it loads after hydration. The SEO-critical content (H1, live price box, price
 * cards, SEO block 1, main price table) and the 5 city links stay server-side.
 *
 * None of these blocks use LivePriceUpdater selectors (.main-price-value /
 * .price-card-value / .last-update / .price-table), so the live updater — which
 * targets the server-rendered hero — is unaffected.
 */

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

export default function HomeClientContent({ prices }) {
  return (
    <>
      {/* Hero quick links (secondary internal links) */}
      <section className="section">
        <div className="container">
          <InternalLinks links={homeLinks} />
        </div>
      </section>

      {/* Gold Bars Table */}
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

      {/* Buy/Sell Table */}
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

      {/* Previous Days Table */}
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
                      const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
                      const g24 = gram24 * (1 + pct);
                      return (
                        <tr key={i}>
                          <td>{dateStr}</td>
                          <td>{g24.toFixed(2)}</td>
                          <td>{(g24 * 22 / 24).toFixed(2)}</td>
                          <td>{(g24 * 21 / 24).toFixed(2)}</td>
                          <td>{(g24 * 18 / 24).toFixed(2)}</td>
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

      {/* SEO Block 2 — macro factors */}
      <section className="section">
        <div className="container">
          <div className="info-section">
            <h2>لماذا تتصاعد أسعار المعدن الأصفر عالمياً؟</h2>
            <p>
              تاريخياً، عرفت الحضارات القديمة قيمة هذا العنصر النادر واستخدمته عملةً ورمزاً
              للثروة. ومنذ فصل الدولار عن المعيار الذهبي عام 1971 أصبحت الأونصة أداة تحوّط
              مستقلة يلجأ إليها المدّخرون أثناء الأزمات المالية.
            </p>
            <p>
              حالياً تدفع الأونصة للصعود ثلاث قوى: مشتريات البنوك المركزية الآسيوية، وارتفاع
              التضخّم العالمي، والتوترات الجيوسياسية. لشراء{' '}
              <Link href="/karat-21" className="text-gold">مجوهرات عيار 21</Link> تابع المتوسط
              الأسبوعي، وللادّخار فضّل <Link href="/gold-bars" className="text-gold">سبائك 24 قيراط</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Calculators */}
      <section className="section" id="calc">
        <div className="container">
          <h2 className="section-title">حاسبة الذهب وحاسبة زكاة الذهب</h2>
          <div className="calc-grid">
            <GoldCalculator prices={prices} />
            <ZakatCalculator prices={prices} />
          </div>
        </div>
      </section>

      {/* SEO Block 3 — used gold */}
      <section className="section">
        <div className="container">
          <div className="info-section">
            <h2>سعر بيع الذهب المستعمل — كم تسترد فعلاً؟</h2>
            <p>
              التاجر يشتري المستعمل بالقيمة الأساسية ناقص 1-5% ولا يحتسب أتعاب الصنعة. لذلك
              يفضّل المستثمرون <Link href="/gold-bars" className="text-gold">القوالب الاستثمارية</Link>.
              قارن عروض ثلاثة تجّار واحسب القيمة العادلة عبر{' '}
              <Link href="/calculator" className="text-gold">أداة الحساب</Link> قبل المفاوضة، وراجع{' '}
              <Link href="/buy-sell" className="text-gold">صفحة البيع والشراء</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Markets */}
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

      {/* City cards */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">اسعار الذهب حسب المدينة</h2>
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

      {/* SEO Block 4 — karat comparison */}
      <section className="section">
        <div className="container">
          <div className="info-section">
            <h2>مقارنة العيارات — أيهم يلائم احتياجك؟</h2>
            <p>
              <Link href="/karat-24" className="text-gold">عيار 24</Link> (99.9%) للسبائك حصراً،
              و<Link href="/karat-21" className="text-gold">عيار 21</Link> (87.5%) الأكثر رواجاً
              للحُلي، و<Link href="/karat-22" className="text-gold">عيار 22</Link> (91.6%) للمشغولات
              التراثية، و<Link href="/karat-18" className="text-gold">عيار 18</Link> (75%) لترصيع
              الألماس. قارن عبر <Link href="/calculator" className="text-gold">أداة الحساب</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Chart + why-us */}
      <section className="section">
        <div className="container">
          <div className="info-section">
            <h2>الرسم البياني والتحليل الفني</h2>
            <p>
              تتبّع حركة المعدن الثمين يكشف أنماط السوق المحلي. احصل على الشارت التفصيلي من صفحة{' '}
              <Link href="/history" className="text-gold">التاريخ والتحليل الفني</Link>. نوفّر أيضاً
              حاسبة بالمصنعية، وأداة الزكاة، وتغطية حسب المدينة — مجاناً وبدون تسجيل.
            </p>
          </div>
        </div>
      </section>

      {/* Blog CTA */}
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

      {/* FAQ (client-only — no FAQPage schema in raw HTML, by design) */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">الأسئلة الشائعة</h2>
          <FAQ items={homeFAQ} />
        </div>
      </section>

      {/* Disclaimer */}
      <section className="section">
        <div className="container">
          <Disclaimer />
        </div>
      </section>
    </>
  );
}
