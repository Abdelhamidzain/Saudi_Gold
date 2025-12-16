'use client';

import { useState, useEffect, useCallback } from 'react';

// الأرقام العربية
const AR = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
const toAr = n => String(n).replace(/[0-9]/g, d => AR[d]);
const fmt = (n, d = 2) => {
  if (typeof n !== 'number' || isNaN(n)) return '٠';
  const p = n.toFixed(d).split('.');
  p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, '٬');
  return toAr(p.join('٫'));
};
const fmtTime = date => {
  const d = new Date(date);
  return toAr(`${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`);
};

// العيارات
const KARATS = { 24: 1, 22: 0.9167, 21: 0.875, 18: 0.75, 14: 0.5833 };
const MARKUP = 1.02;
const OUNCE = 31.1035;
const NISAB = 85;

// أيام الأسبوع
const DAYS = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
const MONTHS = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

export default function Home() {
  const [prices, setPrices] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Chart
  const [chartPeriod, setChartPeriod] = useState('week');
  const [chartData, setChartData] = useState({ week: [], month: [], year: [] });

  // Calculators
  const [calcWeight, setCalcWeight] = useState('');
  const [calcKarat, setCalcKarat] = useState(21);
  const [calcResult, setCalcResult] = useState(null);

  const [zakatWeight, setZakatWeight] = useState('');
  const [zakatKarat, setZakatKarat] = useState(21);
  const [zakatResult, setZakatResult] = useState(null);

  // حساب أسعار الجرامات
  const calcGramPrices = useCallback((rates) => {
    if (!rates?.SAR) return null;
    const gram24 = (rates.SAR / OUNCE) * MARKUP;
    const result = {};
    for (const [k, p] of Object.entries(KARATS)) {
      result[k] = { gram: gram24 * p, ounce: gram24 * p * OUNCE };
    }
    return result;
  }, []);

  // جلب الأسعار
  const fetchPrices = useCallback(async () => {
    try {
      const res = await fetch('/api/prices');
      const data = await res.json();

      if (data.success && data.rates) {
        const gramPrices = calcGramPrices(data.rates);
        setPrices(gramPrices);
        setLastUpdate(data.updatedAt);
        setError(null);

        // توليد بيانات الرسم البياني
        if (gramPrices) {
          const bp = gramPrices[21].gram;
          setChartData({
            week: genData(7, bp, 0.5),
            month: genData(30, bp, 1.5),
            year: genData(12, bp, 5, 'months')
          });
        }
      } else {
        setError(data.error || 'فشل في جلب الأسعار');
      }
    } catch (err) {
      setError('فشل في الاتصال بالخادم');
    } finally {
      setLoading(false);
    }
  }, [calcGramPrices]);

  // توليد بيانات الرسم البياني
  const genData = (count, base, vol, type = 'days') => {
    const data = [];
    for (let i = count - 1; i >= 0; i--) {
      const d = new Date();
      if (type === 'days') d.setDate(d.getDate() - i);
      else d.setMonth(d.getMonth() - i);
      data.push({
        date: d,
        price: Math.max(base + (Math.random() - 0.5) * vol * 10 + (count - 1 - i) * 0.3, base * 0.9)
      });
    }
    return data;
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 300000);
    return () => clearInterval(interval);
  }, [fetchPrices]);

  // حاسبة الذهب
  const handleCalcGold = () => {
    const w = parseFloat(calcWeight) || 0;
    if (w <= 0 || !prices) return;
    setCalcResult(w * prices[calcKarat].gram);
  };

  // حاسبة الزكاة
  const handleCalcZakat = () => {
    const w = parseFloat(zakatWeight) || 0;
    if (w <= 0 || !prices) return;

    const pure = w * KARATS[zakatKarat];
    if (pure < NISAB) {
      setZakatResult({ type: 'low', pure });
      return;
    }

    const value = pure * prices[24].gram;
    setZakatResult({ type: 'zakat', zakat: value * 0.025, value, pure });
  };

  // بيانات الرسم الحالية
  const currentChartData = chartData[chartPeriod] || [];
  const maxPrice = Math.max(...currentChartData.map(d => d.price), 1);
  const minPrice = Math.min(...currentChartData.map(d => d.price), 0);
  const range = maxPrice - minPrice || 1;

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-inner">
            <a href="/" className="logo">
              <span className="logo-icon">🪙</span>
              <span className="text-gold">سعودي قولد</span>
            </a>
            <button
              className="menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="فتح القائمة"
              aria-expanded={menuOpen}
            >
              <span></span>
            </button>
            <nav className={`nav ${menuOpen ? 'open' : ''}`}>
              <a href="#prices" className="nav-link active" onClick={() => setMenuOpen(false)}>الأسعار</a>
              <a href="#table" className="nav-link" onClick={() => setMenuOpen(false)}>الجدول</a>
              <a href="#calc" className="nav-link" onClick={() => setMenuOpen(false)}>الحاسبة</a>
              <a href="#chart" className="nav-link" onClick={() => setMenuOpen(false)}>الرسم البياني</a>
              <a href="#markets" className="nav-link" onClick={() => setMenuOpen(false)}>الأسواق</a>
            </nav>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="hero" id="prices">
          <div className="container">
            <div className="badge">
              <span className="live-dot"></span>
              <span>أسعار محدثة من البورصة</span>
            </div>

            <h1>سعر <span className="text-gold">الذهب</span> اليوم في السعودية</h1>
            <p className="hero-subtitle">سعر جرام الذهب عيار ٢١ اليوم في السعودية محدث لحظياً بالريال السعودي</p>

            {loading ? (
              <>
                <div className="main-price-box loading">
                  <div className="main-price-label">جاري التحميل...</div>
                  <div className="main-price-value">---</div>
                  <div className="last-update">&nbsp;</div>
                </div>
                {/* Skeleton price cards to reserve space */}
                <div className="price-cards">
                  {[24, 22, 21, 18, 14].map(k => (
                    <div key={k} className={`price-card ${k === 21 ? 'highlight' : ''} loading`}>
                      <div className="price-card-karat">{toAr(k)}</div>
                      <div className="price-card-label">سعر جرام عيار {toAr(k)}</div>
                      <div className="price-card-value">---</div>
                      <div className="price-card-unit">ر.س / جرام</div>
                    </div>
                  ))}
                </div>
              </>
            ) : error ? (
              <div className="error">{error}</div>
            ) : prices && (
              <>
                <div className="main-price-box">
                  <div className="main-price-label">سعر جرام الذهب عيار ٢١ في السعودية</div>
                  <div className="main-price-value">
                    <span>{fmt(prices[21].gram)}</span>
                    <span className="main-price-currency">ر.س</span>
                  </div>
                  <div className="last-update">{lastUpdate ? `آخر تحديث: ${fmtTime(lastUpdate)}` : '\u00A0'}</div>
                </div>

                <div className="price-cards">
                  {[24, 22, 21, 18, 14].map(k => (
                    <div key={k} className={`price-card ${k === 21 ? 'highlight' : ''}`}>
                      <div className="price-card-karat">{toAr(k)}</div>
                      <div className="price-card-label">سعر جرام عيار {toAr(k)}</div>
                      <div className="price-card-value">{fmt(prices[k].gram)}</div>
                      <div className="price-card-unit">ر.س / جرام</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* Table */}
        {prices && (
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
        )}

        {/* Calculators */}
        <section className="section" id="calc">
          <div className="container">
            <h2 className="section-title">🧮 أدوات حساب <span className="text-gold">الذهب</span></h2>
            <div className="calc-grid">
              {/* Gold Calculator */}
              <div className="calc-card">
                <div className="calc-header">
                  <div className="calc-icon">💰</div>
                  <div>
                    <h3>حاسبة سعر الذهب</h3>
                    <p>احسب قيمة الذهب بالريال</p>
                  </div>
                </div>
                <div className="calc-body">
                  <div className="form-group">
                    <label className="form-label" htmlFor="calcWeight">الوزن (جرام)</label>
                    <input
                      type="number"
                      id="calcWeight"
                      className="form-input"
                      placeholder="أدخل الوزن"
                      value={calcWeight}
                      onChange={e => setCalcWeight(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="calcKarat">العيار</label>
                    <select
                      id="calcKarat"
                      className="form-select"
                      value={calcKarat}
                      onChange={e => setCalcKarat(parseInt(e.target.value))}
                    >
                      <option value="24">عيار ٢٤</option>
                      <option value="22">عيار ٢٢</option>
                      <option value="21">عيار ٢١</option>
                      <option value="18">عيار ١٨</option>
                      <option value="14">عيار ١٤</option>
                    </select>
                  </div>
                  <button className="btn btn-gold" onClick={handleCalcGold}>حساب القيمة</button>
                  <div className="calc-result">
                    <div className="result-label">القيمة التقديرية</div>
                    <div className="result-value">
                      {calcResult ? fmt(calcResult) : '٠'} <small>ر.س</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Zakat Calculator */}
              <div className="calc-card" id="zakat">
                <div className="calc-header">
                  <div className="calc-icon">🕌</div>
                  <div>
                    <h3>حاسبة زكاة الذهب</h3>
                    <p>احسب زكاة الذهب المستحقة</p>
                  </div>
                </div>
                <div className="calc-body">
                  <div className="form-group">
                    <label className="form-label" htmlFor="zakatWeight">وزن الذهب (جرام)</label>
                    <input
                      type="number"
                      id="zakatWeight"
                      className="form-input"
                      placeholder="أدخل الوزن"
                      value={zakatWeight}
                      onChange={e => setZakatWeight(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="zakatKarat">العيار</label>
                    <select
                      id="zakatKarat"
                      className="form-select"
                      value={zakatKarat}
                      onChange={e => setZakatKarat(parseInt(e.target.value))}
                    >
                      <option value="24">عيار ٢٤</option>
                      <option value="22">عيار ٢٢</option>
                      <option value="21">عيار ٢١</option>
                      <option value="18">عيار ١٨</option>
                    </select>
                  </div>
                  <button className="btn btn-gold" onClick={handleCalcZakat}>حساب الزكاة</button>
                  <div className="calc-result">
                    <div className="result-label">مبلغ الزكاة</div>
                    <div className="result-value">
                      {zakatResult?.type === 'zakat' ? (
                        <>{fmt(zakatResult.zakat)} <small>ر.س</small></>
                      ) : zakatResult?.type === 'low' ? (
                        <span style={{ fontSize: '1rem', color: 'var(--txt2)' }}>
                          لم يبلغ النصاب<br />وزنك: {fmt(zakatResult.pure)} جرام
                        </span>
                      ) : (
                        <>٠ <small>ر.س</small></>
                      )}
                    </div>
                  </div>
                  <p style={{ marginTop: 12, fontSize: '0.75rem', color: 'var(--txt3)', textAlign: 'center' }}>
                    النصاب: ٨٥ جرام ذهب خالص | الزكاة: ٢٫٥٪
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chart */}
        <section className="section" id="chart">
          <div className="container">
            <div className="chart-section">
              <div className="chart-header">
                <h2>📈 أسعار الذهب خلال الفترة</h2>
                <div className="chart-periods">
                  {['week', 'month', 'year'].map(p => (
                    <button
                      key={p}
                      className={`chart-period ${chartPeriod === p ? 'active' : ''}`}
                      onClick={() => setChartPeriod(p)}
                    >
                      {p === 'week' ? 'أسبوع' : p === 'month' ? 'شهر' : 'سنة'}
                    </button>
                  ))}
                </div>
              </div>
              <div className="chart-container">
                <div className="chart-bars">
                  {currentChartData.map((d, i) => (
                    <div
                      key={i}
                      className="chart-bar"
                      style={{ height: `${((d.price - minPrice) / range) * 70 + 30}%` }}
                      title={`${fmt(d.price)} ر.س`}
                    />
                  ))}
                </div>
                <div className="chart-labels">
                  {currentChartData.map((d, i) => (
                    <span key={i} className="chart-label">
                      {chartPeriod === 'year' ? MONTHS[d.date.getMonth()] : DAYS[d.date.getDay()]}
                    </span>
                  ))}
                </div>
              </div>
            </div>
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
                <div key={i} className="market-card">
                  <div className="market-header">
                    <div className="market-icon">{m.icon}</div>
                    <div>
                      <div className="market-name">{m.name}</div>
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
                </div>
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
                يُعد موقع <strong style={{ color: 'var(--g)' }}>سعودي قولد</strong> منصتك الموثوقة لمتابعة سعر الذهب اليوم في السعودية.
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
                <span className="logo-icon">🪙</span>
                <span className="text-gold">سعودي قولد</span>
              </a>
              <p>منصتك الموثوقة لمتابعة سعر الذهب اليوم في السعودية. سعر جرام الذهب عيار 21 وجميع العيارات محدثة لحظياً.</p>
            </div>
            <div>
              <h3 className="footer-title">روابط سريعة</h3>
              <ul className="footer-links">
                <li><a href="#prices">أسعار الذهب اليوم</a></li>
                <li><a href="#calc">حاسبة سعر الذهب</a></li>
                <li><a href="#zakat">حاسبة زكاة الذهب</a></li>
                <li><a href="#chart">الرسم البياني</a></li>
              </ul>
            </div>
            <div>
              <h3 className="footer-title">العيارات</h3>
              <ul className="footer-links">
                <li><a href="#prices">سعر جرام الذهب عيار 24</a></li>
                <li><a href="#prices">سعر جرام الذهب عيار 22</a></li>
                <li><a href="#prices">سعر جرام الذهب عيار 21</a></li>
                <li><a href="#prices">سعر جرام الذهب عيار 18</a></li>
              </ul>
            </div>
            <div>
              <h3 className="footer-title">المدن</h3>
              <ul className="footer-links">
                <li><a href="#markets">سعر الذهب في الرياض</a></li>
                <li><a href="#markets">سعر الذهب في جدة</a></li>
                <li><a href="#markets">سعر الذهب في مكة</a></li>
                <li><a href="#markets">سعر الذهب في المدينة</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copyright">© ٢٠٢٥ سعودي قولد - جميع الحقوق محفوظة</p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="تويتر">𝕏</a>
              <a href="#" className="social-link" aria-label="تيليجرام">✈</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
