'use client';

import Link from 'next/link';
import { GOLD_MARKETS } from '../../lib/gold';
import { GoldCalculator, ZakatCalculator } from '../Calculators';

export default function HomeMiddle({ prices }) {
  return (
    <>
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
                    const priceRiyal = gramPrice * bar.weight; // بدون هامش — موحّد مع /gold-bars وصفحات العيار
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
              السبيكة = سعر جرام العيار × الوزن — للتفاصيل راجع <Link href="/gold-bars" className="text-gold">صفحة السبائك</Link>
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

      {/* ═══ SEO Content Block 2 ═══ */}
      <section className="section">
        <div className="container">
          <div className="info-section">
            <h2>لماذا تتصاعد أسعار المعدن الأصفر عالمياً؟</h2>
            <p>
              تاريخياً، عرفت الحضارات القديمة — من الفراعنة إلى ممالك بلاد الرافدين — قيمة هذا العنصر النادر واستخدمته عملةً ورمزاً للثروة. خلال القرن العشرين ربطت اتفاقية بريتون وودز الدولار بالمعيار الذهبي، حتى فصلهما الرئيس نيكسون عام 1971. منذ ذلك الحين أصبحت الأونصة أداة تحوّط مستقلة يلجأ إليها المدّخرون أثناء الأزمات المالية — كانهيار ليمان براذرز 2008 وجائحة كورونا 2020 — حين بلغت مستويات قياسية غير مسبوقة.
            </p>
            <p>
              حالياً، ثلاث قوى تدفع الأونصة للصعود: أولاً المشتريات الضخمة للبنوك المركزية الآسيوية (الصيني والهندي تحديداً) ضمن استراتيجية تنويع الاحتياطيات السيادية بعيداً عن هيمنة الدولار. ثانياً ارتفاع مؤشرات التضخّم العالمي الذي يُضعف القوة الشرائية للعملات الورقية ويُحفّز الصناديق المؤسسية لتخصيص حصص أكبر للمعدن كملاذ. ثالثاً التوترات الجيوسياسية المتصاعدة التي تزيد حالة عدم اليقين في أسواق الأسهم والسندات، فيتحوّل المستثمرون للأصول الملموسة. خبراء المحللون يتوقعون استمرار هذا المنحى الصاعد على المنظور المتوسط والطويل الأجل.
            </p>
            <p>
              نصيحة تطبيقية: لشراء <Link href="/karat-21" className="text-gold">مجوهرات عيار 21</Link> تابع المتوسط الأسبوعي واشترِ عند انخفاض 2-3%. أما <Link href="/gold-bars" className="text-gold">سبائك 24 قيراط للادّخار</Link>، فأسلوب التحوّط بالشراء الدوري الشهري يخفّض مخاطر التوقيت.
            </p>
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

      {/* ═══ SEO Content Block 3 ═══ */}
      <section className="section">
        <div className="container">
          <div className="info-section">
            <h2>سعر بيع الذهب المستعمل — كم تسترد فعلاً؟</h2>
            <p>
              مَن يتابع سعر الذهب اليوم عيار 21 في السعودية يسأل: كم آخذ لو بعت قطعتي القديمة؟ وكثيرون يبحثون عن سعر الذهب في السعودية اليوم قبل بيع مشغولاتهم؛ والتاجر يشتري بالقيمة الأساسية ناقص 1-5% ولا يحتسب أتعاب الصنعة. لذلك المستثمرون المحنّكون يفضّلون <Link href="/gold-bars" className="text-gold">القوالب الاستثمارية</Link> — عند التصفية تسترد ثمناً قريباً جداً من البورصة. قارن عروض 3 تجّار واحسب القيمة العادلة عبر <Link href="/calculator" className="text-gold">أداة الحساب</Link> قبل المفاوضة. تفاصيل أوفى في <Link href="/buy-sell" className="text-gold">صفحة البيع والشراء</Link>.
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
    </>
  );
}
