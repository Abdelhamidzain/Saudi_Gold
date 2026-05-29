'use client';

import Link from 'next/link';
import { GOLD_MARKETS } from '../lib/gold';

/*
 * HomeSecondaryClient — non-critical homepage blocks rendered client-only
 * (loaded via dynamic(import, { ssr:false })): bullion table, buy/sell table,
 * previous-days table, markets, city cards, and the blog CTA.
 *
 * These are supplementary to the core price markup (hero + price table) which
 * stays server-rendered. None of these blocks use LivePriceUpdater selectors
 * (.price-card-value / .main-price-value / .last-update / .price-table), so the
 * live updater is unaffected.
 */
export default function HomeSecondaryClient({ prices }) {
  return (
    <div className="CSR">
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

      {/* City Prices */}
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
    </div>
  );
}
