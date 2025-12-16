import LivePrices from './components/LivePrices';
import Calculators from './components/Calculators';

// ISR - تحديث كل 60 ثانية
export const revalidate = 60;

// الأرقام العربية
const AR = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
const toAr = n => String(n).replace(/[0-9]/g, d => AR[d]);
const fmt = (n, d = 2) => {
  if (typeof n !== 'number' || isNaN(n)) return '٠';
  const p = n.toFixed(d).split('.');
  p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, '٬');
  return toAr(p.join('٫'));
};

// العيارات
const KARATS = { 24: 1, 22: 0.9167, 21: 0.875, 18: 0.75, 14: 0.5833 };
const MARKUP = 1.02;
const OUNCE = 31.1035;

// جلب الأسعار من الخادم
async function getGoldPrices() {
  try {
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    const res = await fetch(`${baseUrl}/api/prices`, {
      next: { revalidate: 60 },
      cache: 'force-cache'
    });
    
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.rates?.SAR) {
        const gram24 = (data.rates.SAR / OUNCE) * MARKUP;
        const prices = {};
        for (const [k, p] of Object.entries(KARATS)) {
          prices[k] = { gram: gram24 * p, ounce: gram24 * p * OUNCE };
        }
        return { prices, updatedAt: data.updatedAt };
      }
    }
  } catch (e) {
    console.error('Failed to fetch prices:', e);
  }
  
  // قيم افتراضية
  const defaultGram24 = 530;
  const prices = {};
  for (const [k, p] of Object.entries(KARATS)) {
    prices[k] = { gram: defaultGram24 * p, ounce: defaultGram24 * p * OUNCE };
  }
  return { prices, updatedAt: null };
}

export default async function Home() {
  const { prices, updatedAt } = await getGoldPrices();
  
  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-inner">
            <a href="/" className="logo" aria-label="الصفحة الرئيسية">
              <span className="logo-icon" aria-hidden="true">🪙</span>
              <span className="text-gold">سعودي قولد</span>
            </a>
            <nav className="nav" role="navigation">
              <a href="#prices" className="nav-link">الأسعار</a>
              <a href="#table" className="nav-link">الجدول</a>
              <a href="#calc" className="nav-link">الحاسبة</a>
              <a href="#markets" className="nav-link">الأسواق</a>
            </nav>
          </div>
        </div>
      </header>

      <main>
        {/* Hero - يظهر فوراً مع أسعار ثابتة */}
        <section className="hero" id="prices">
          <div className="container">
            <div className="badge">
              <span className="live-dot" aria-hidden="true"></span>
              <span>أسعار محدثة من البورصة</span>
            </div>
            
            <h1>سعر <span className="text-gold">الذهب</span> اليوم في السعودية</h1>
            <p className="hero-subtitle">سعر جرام الذهب عيار ٢١ اليوم في السعودية محدث لحظياً بالريال السعودي</p>

            {/* السعر الرئيسي - ثابت من الخادم */}
            <div className="main-price-box">
              <div className="main-price-label">سعر جرام الذهب عيار ٢١ في السعودية</div>
              <div className="main-price-value">
                <span>{fmt(prices[21].gram)}</span>
                <span className="main-price-currency">ر.س</span>
              </div>
              <div className="last-update">
                {updatedAt ? `آخر تحديث: ${new Date(updatedAt).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}` : 'جاري التحديث...'}
              </div>
            </div>

            {/* بطاقات الأسعار - ثابتة من الخادم */}
            <div className="price-cards">
              {[24, 22, 21, 18, 14].map(k => (
                <article key={k} className={`price-card ${k === 21 ? 'highlight' : ''}`}>
                  <div className="price-card-karat" aria-hidden="true">{toAr(k)}</div>
                  <h2 className="price-card-label">سعر جرام عيار {toAr(k)}</h2>
                  <div className="price-card-value">{fmt(prices[k].gram)}</div>
                  <div className="price-card-unit">ر.س / جرام</div>
                </article>
              ))}
            </div>
            
            {/* مكون التحديث المباشر */}
            <LivePrices initialPrices={prices} />
          </div>
        </section>

        {/* Table */}
        <section className="section" id="table">
          <div className="container">
            <div className="table-section">
              <div className="table-header">
                <h2>📊 جدول أسعار الذهب اليوم في السعودية</h2>
              </div>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>الوحدة</th>
                      <th>السعر (ر.س)</th>
                      <th>السعر ($)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'سعر جرام الذهب عيار 24', k: 24, type: 'gram' },
                      { name: 'سعر جرام الذهب عيار 22', k: 22, type: 'gram' },
                      { name: 'سعر جرام الذهب عيار 21', k: 21, type: 'gram' },
                      { name: 'سعر جرام الذهب عيار 18', k: 18, type: 'gram' },
                      { name: 'سعر جرام الذهب عيار 14', k: 14, type: 'gram' },
                      { name: 'سعر أونصة الذهب عيار 24', k: 24, type: 'ounce' },
                    ].map((row, i) => (
                      <tr key={i}>
                        <td>
                          <span className="unit-name">
                            <span className="karat-badge">{toAr(row.k)}K</span>
                            {row.name}
                          </span>
                        </td>
                        <td>{fmt(prices[row.k][row.type])}</td>
                        <td>{fmt(prices[row.k][row.type] / 3.75)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Calculators - Client Component */}
        <section className="section" id="calc">
          <div className="container">
            <h2 className="section-title">🧮 أدوات حساب <span className="text-gold">الذهب</span></h2>
            <Calculators initialPrices={prices} />
          </div>
        </section>

        {/* Markets */}
        <section className="section" id="markets">
          <div className="container">
            <h2 className="section-title">🏪 أسواق <span className="text-gold">الذهب</span> في السعودية</h2>
            <div className="markets-grid">
              {[
                { icon: '🏙️', name: 'سوق الثميري', city: 'الرياض', tags: ['تشكيلات متنوعة', 'أسعار تنافسية'] },
                { icon: '🌊', name: 'سوق اليمامة', city: 'جدة', tags: ['محلات كثيرة', 'قابل للتفاوض'] },
                { icon: '🕋', name: 'سوق العتيبية', city: 'مكة المكرمة', tags: ['أرخص الأسعار', 'قابل للمفاوضة'] },
                { icon: '🌴', name: 'سوق المدينة الدولي', city: 'المدينة المنورة', tags: ['ماركات عديدة', 'تصاميم حديثة'] },
                { icon: '🛢️', name: 'سوق الذهب', city: 'الدمام', tags: ['أسعار تنافسية', 'تشكيلات متنوعة'] },
                { icon: '💎', name: 'سوق البطحاء', city: 'الرياض', tags: ['أرخص الأسعار', 'قابل للمفاوضة'] },
              ].map((m, i) => (
                <article key={i} className="market-card">
                  <div className="market-header">
                    <div className="market-icon" aria-hidden="true">{m.icon}</div>
                    <div>
                      <h3 className="market-name">{m.name}</h3>
                      <div className="market-location">{m.city}</div>
                    </div>
                  </div>
                  <div className="market-tags">
                    {m.tags.map((t, j) => <span key={j} className="market-tag">{t}</span>)}
                  </div>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(m.name + ' ' + m.city)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="market-link"
                  >
                    📍 عرض على الخريطة
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Info */}
        <section className="section">
          <div className="container">
            <div className="info-section">
              <h2>ℹ️ عن أسعار الذهب في السعودية</h2>
              <p>
                يُعد موقع <strong className="text-gold">سعودي قولد</strong> منصتك الموثوقة لمتابعة سعر الذهب اليوم في السعودية. 
                نوفر لك سعر جرام الذهب عيار 21 وجميع العيارات الأخرى (24، 22، 18، 14) محدثة لحظياً بالريال السعودي.
              </p>
              <p>
                يتأثر سعر الذهب بعدة عوامل منها: سعر الذهب العالمي، سعر صرف الدولار مقابل الريال، 
                العرض والطلب المحلي، والأحداث الاقتصادية العالمية.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="/" className="logo">
                <span className="logo-icon" aria-hidden="true">🪙</span>
                <span className="text-gold">سعودي قولد</span>
              </a>
              <p>منصتك الموثوقة لمتابعة سعر الذهب اليوم في السعودية.</p>
            </div>
            <nav>
              <h3 className="footer-title">روابط سريعة</h3>
              <ul className="footer-links">
                <li><a href="#prices">أسعار الذهب اليوم</a></li>
                <li><a href="#calc">حاسبة سعر الذهب</a></li>
                <li><a href="#markets">أسواق الذهب</a></li>
              </ul>
            </nav>
            <nav>
              <h3 className="footer-title">العيارات</h3>
              <ul className="footer-links">
                <li><a href="#prices">سعر جرام الذهب عيار 24</a></li>
                <li><a href="#prices">سعر جرام الذهب عيار 22</a></li>
                <li><a href="#prices">سعر جرام الذهب عيار 21</a></li>
                <li><a href="#prices">سعر جرام الذهب عيار 18</a></li>
              </ul>
            </nav>
            <nav>
              <h3 className="footer-title">المدن</h3>
              <ul className="footer-links">
                <li><a href="#markets">سعر الذهب في الرياض</a></li>
                <li><a href="#markets">سعر الذهب في جدة</a></li>
                <li><a href="#markets">سعر الذهب في مكة</a></li>
                <li><a href="#markets">سعر الذهب في المدينة</a></li>
              </ul>
            </nav>
          </div>
          <div className="footer-bottom">
            <p className="footer-copyright">© ٢٠٢٥ سعودي قولد - جميع الحقوق محفوظة</p>
          </div>
        </div>
      </footer>
    </>
  );
}
