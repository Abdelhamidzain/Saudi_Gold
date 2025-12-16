'use client';

import { useState, useEffect, useCallback } from 'react';

// Arabic numerals
const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
const toArabic = (num) => String(num).replace(/[0-9]/g, d => arabicNumerals[d]);

// Format number with Arabic numerals
const formatNumber = (num, decimals = 2) => {
  if (typeof num !== 'number' || isNaN(num)) return '٠';
  const parts = num.toFixed(decimals).split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '٬');
  return toArabic(parts.join('٫'));
};

// Format time
const formatTime = (date) => {
  const d = new Date(date);
  const h = d.getHours().toString().padStart(2, '0');
  const m = d.getMinutes().toString().padStart(2, '0');
  return toArabic(`${h}:${m}`);
};

// Karat purities
const KARATS = { 24: 1, 22: 0.9167, 21: 0.875, 18: 0.75, 14: 0.5833 };
const MARKUP = 1.02;
const OUNCE_TO_GRAM = 31.1035;
const NISAB = 85;

export default function GoldPricesClient({ initialPrices }) {
  const [prices, setPrices] = useState(null);
  const [loading, setLoading] = useState(!initialPrices);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  // Calculate gram prices from ounce price
  const calculateGramPrices = useCallback((rates) => {
    if (!rates?.SAR) return null;
    
    const ounceSAR = rates.SAR;
    const gram24 = (ounceSAR / OUNCE_TO_GRAM) * MARKUP;
    
    const gramPrices = {};
    for (const [karat, purity] of Object.entries(KARATS)) {
      gramPrices[karat] = {
        gram: gram24 * purity,
        ounce: gram24 * purity * OUNCE_TO_GRAM
      };
    }
    
    return gramPrices;
  }, []);

  // Fetch prices from our cached API
  const fetchPrices = useCallback(async () => {
    try {
      const res = await fetch('/api/prices');
      const data = await res.json();
      
      if (data.success && data.rates) {
        const gramPrices = calculateGramPrices(data.rates);
        setPrices(gramPrices);
        setLastUpdate(data.updatedAt);
        setError(null);
      } else {
        setError(data.error || 'Failed to fetch prices');
      }
    } catch (err) {
      setError('فشل في الاتصال');
    } finally {
      setLoading(false);
    }
  }, [calculateGramPrices]);

  // Initialize from server-side props
  useEffect(() => {
    if (initialPrices?.success && initialPrices?.rates) {
      const gramPrices = calculateGramPrices(initialPrices.rates);
      setPrices(gramPrices);
      setLastUpdate(initialPrices.updatedAt);
      setLoading(false);
    } else {
      fetchPrices();
    }
  }, [initialPrices, calculateGramPrices, fetchPrices]);

  // Refresh every 5 minutes (client-side only)
  useEffect(() => {
    const interval = setInterval(fetchPrices, 300000);
    return () => clearInterval(interval);
  }, [fetchPrices]);

  // Calculator state
  const [calcWeight, setCalcWeight] = useState('');
  const [calcKarat, setCalcKarat] = useState(21);
  const [calcResult, setCalcResult] = useState(null);
  
  const [zakatWeight, setZakatWeight] = useState('');
  const [zakatKarat, setZakatKarat] = useState(21);
  const [zakatResult, setZakatResult] = useState(null);

  const calculateGold = () => {
    const weight = parseFloat(calcWeight) || 0;
    if (weight <= 0 || !prices) return;
    const total = weight * prices[calcKarat].gram;
    setCalcResult(total);
  };

  const calculateZakat = () => {
    const weight = parseFloat(zakatWeight) || 0;
    if (weight <= 0 || !prices) return;
    
    const purity = KARATS[zakatKarat];
    const pureGold = weight * purity;
    
    if (pureGold < NISAB) {
      setZakatResult({ type: 'low', pureGold });
      return;
    }
    
    const value = pureGold * prices[24].gram;
    const zakat = value * 0.025;
    setZakatResult({ type: 'zakat', zakat, value, pureGold });
  };

  return (
    <>
      <style jsx global>{`
        :root{--g:#F59E0B;--bg:#0A0A0F;--card:#1A1A24;--txt:#FFF;--txt2:#A0A0B0;--green:#22C55E;--border:rgba(255,255,255,.08);--gold:linear-gradient(135deg,#D4AF37,#F5D061,#D4AF37)}
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:system-ui,-apple-system,sans-serif;background:var(--bg);color:var(--txt);line-height:1.6;direction:rtl}
        a{color:inherit;text-decoration:none}
        .c{max-width:1280px;margin:0 auto;padding:0 16px}
        .hd{position:sticky;top:0;z-index:100;background:rgba(10,10,15,.95);backdrop-filter:blur(10px);border-bottom:1px solid var(--border)}
        .hd-in{display:flex;align-items:center;justify-content:space-between;padding:12px 0}
        .logo{display:flex;align-items:center;gap:8px;font-size:1.3rem;font-weight:700}
        .logo-i{width:36px;height:36px;background:var(--gold);border-radius:10px;display:flex;align-items:center;justify-content:center}
        .tg{background:var(--gold);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .nav{display:flex;gap:4px}
        .nav a{padding:8px 14px;border-radius:20px;font-size:.85rem;color:var(--txt2)}
        .nav a:hover,.nav a.on{color:var(--txt);background:rgba(255,255,255,.08)}
        .hero{padding:24px 0;text-align:center}
        .badge{display:inline-flex;align-items:center;gap:6px;padding:6px 16px;background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.3);border-radius:20px;font-size:.8rem;color:var(--green);margin-bottom:16px}
        .dot{width:8px;height:8px;background:var(--green);border-radius:50%;animation:blink 1s infinite}
        @keyframes blink{50%{opacity:.3}}
        h1{font-size:clamp(1.5rem,5vw,2.2rem);margin-bottom:12px}
        .sub{color:var(--txt2);font-size:1rem;max-width:500px;margin:0 auto 20px}
        .mpd{background:var(--card);border:1px solid var(--border);border-radius:20px;padding:24px;max-width:480px;margin:0 auto 24px;position:relative}
        .mpd::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--gold);border-radius:20px 20px 0 0}
        .mpl{font-size:1rem;color:var(--txt2);margin-bottom:8px}
        .mpv{font-size:clamp(2.2rem,8vw,3.5rem);font-weight:700;background:var(--gold);-webkit-background-clip:text;-webkit-text-fill-color:transparent;display:flex;align-items:baseline;justify-content:center;gap:8px}
        .mpc{font-size:1.2rem}
        .upd{font-size:.8rem;color:#6B6B7B;margin-top:12px}
        .cards{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-bottom:32px}
        @media(max-width:900px){.cards{grid-template-columns:repeat(3,1fr)}}
        @media(max-width:600px){.cards{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:400px){.cards{grid-template-columns:1fr}}
        .pcard{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:16px;text-align:center;transition:transform .2s,border-color .2s}
        .pcard:hover{transform:translateY(-3px);border-color:rgba(212,175,55,.3)}
        .pcard.hl{border-color:rgba(212,175,55,.4);box-shadow:0 4px 20px rgba(212,175,55,.15)}
        .pk{display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;background:rgba(212,175,55,.1);border:1px solid rgba(212,175,55,.3);border-radius:10px;font-weight:700;color:var(--g);margin-bottom:10px}
        .pcard.hl .pk{background:var(--gold);color:#000;border:none}
        .pcl{font-size:.85rem;color:var(--txt2);margin-bottom:4px}
        .pcv{font-size:1.3rem;font-weight:700}
        .pcs{font-size:.8rem;color:var(--g);margin-top:4px}
        .sec{padding:32px 0}
        .calc-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
        @media(max-width:700px){.calc-grid{grid-template-columns:1fr}}
        .calc{background:var(--card);border:1px solid var(--border);border-radius:20px;overflow:hidden}
        .calc-hd{padding:16px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px}
        .calc-i{width:44px;height:44px;background:var(--gold);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.3rem}
        .calc-bd{padding:16px}
        .fg{margin-bottom:14px}
        .fl{display:block;font-size:.8rem;color:var(--txt2);margin-bottom:6px}
        .fi,.fs{width:100%;padding:10px 12px;background:#12121A;border:1px solid var(--border);border-radius:8px;color:var(--txt);font-size:1rem;font-family:inherit}
        .fi:focus,.fs:focus{border-color:var(--g);outline:none}
        .fs{cursor:pointer}
        .btn{display:inline-flex;align-items:center;justify-content:center;padding:10px 20px;border-radius:8px;font-weight:600;font-size:.9rem;border:none;cursor:pointer;font-family:inherit;width:100%}
        .btn-g{background:var(--gold);color:#000}
        .btn-g:hover{opacity:.9}
        .res{margin-top:14px;padding:14px;background:rgba(212,175,55,.1);border:1px solid rgba(212,175,55,.3);border-radius:8px;text-align:center}
        .res-l{font-size:.8rem;color:var(--txt2);margin-bottom:4px}
        .res-v{font-size:1.8rem;font-weight:700;color:var(--g)}
        .res-v small{font-size:.9rem;opacity:.7}
        .ft{background:#12121A;border-top:1px solid var(--border);padding:24px 0;text-align:center;margin-top:40px}
        .ft-copy{color:#6B6B7B;font-size:.85rem}
        .tc{text-align:center}
        .mb3{margin-bottom:24px}
        .loading{opacity:.5}
        .error{color:#EF4444;text-align:center;padding:20px}
      `}</style>

      <header className="hd">
        <div className="c">
          <div className="hd-in">
            <a href="/" className="logo">
              <span className="logo-i">🪙</span>
              <span className="tg">سعودي قولد</span>
            </a>
            <nav className="nav">
              <a href="#prices" className="on">الأسعار</a>
              <a href="#calc">الحاسبة</a>
              <a href="#zakat">الزكاة</a>
            </nav>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="c">
            <div className="badge">
              <span className="dot"></span>
              <span>أسعار محدثة من البورصة</span>
            </div>
            
            <h1>سعر <span className="tg">الذهب</span> اليوم في السعودية</h1>
            <p className="sub">سعر جرام الذهب عيار 21 اليوم في السعودية محدث لحظياً بالريال السعودي</p>

            {loading ? (
              <div className="mpd loading">
                <div className="mpl">جاري التحميل...</div>
                <div className="mpv">---</div>
              </div>
            ) : error ? (
              <div className="error">{error}</div>
            ) : prices && (
              <>
                <div className="mpd">
                  <div className="mpl">سعر جرام الذهب عيار ٢١ في السعودية</div>
                  <div className="mpv">
                    <span>{formatNumber(prices[21].gram)}</span>
                    <span className="mpc">ر.س</span>
                  </div>
                  {lastUpdate && (
                    <div className="upd">آخر تحديث: {formatTime(lastUpdate)}</div>
                  )}
                </div>

                <div className="cards" id="prices">
                  {[24, 22, 21, 18, 14].map(k => (
                    <div key={k} className={`pcard ${k === 21 ? 'hl' : ''}`}>
                      <div className="pk">{toArabic(k)}</div>
                      <div className="pcl">سعر جرام عيار {toArabic(k)}</div>
                      <div className="pcv">{formatNumber(prices[k].gram)}</div>
                      <div className="pcs">ر.س / جرام</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        <section className="sec" id="calc">
          <div className="c">
            <h2 className="tc mb3">🧮 أدوات حساب <span className="tg">الذهب</span></h2>
            <div className="calc-grid">
              <div className="calc">
                <div className="calc-hd">
                  <div className="calc-i">💰</div>
                  <div>
                    <h3>حاسبة سعر الذهب</h3>
                    <p style={{color: 'var(--txt2)', fontSize: '.8rem'}}>احسب قيمة الذهب بالريال</p>
                  </div>
                </div>
                <div className="calc-bd">
                  <div className="fg">
                    <label className="fl">الوزن (جرام)</label>
                    <input 
                      type="number" 
                      className="fi" 
                      placeholder="أدخل الوزن"
                      value={calcWeight}
                      onChange={(e) => setCalcWeight(e.target.value)}
                    />
                  </div>
                  <div className="fg">
                    <label className="fl">العيار</label>
                    <select 
                      className="fs"
                      value={calcKarat}
                      onChange={(e) => setCalcKarat(parseInt(e.target.value))}
                    >
                      <option value="24">عيار ٢٤</option>
                      <option value="22">عيار ٢٢</option>
                      <option value="21">عيار ٢١</option>
                      <option value="18">عيار ١٨</option>
                      <option value="14">عيار ١٤</option>
                    </select>
                  </div>
                  <button className="btn btn-g" onClick={calculateGold}>حساب القيمة</button>
                  <div className="res">
                    <div className="res-l">القيمة التقديرية</div>
                    <div className="res-v">
                      {calcResult ? formatNumber(calcResult) : '٠'} <small>ر.س</small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="calc" id="zakat">
                <div className="calc-hd">
                  <div className="calc-i">🕌</div>
                  <div>
                    <h3>حاسبة زكاة الذهب</h3>
                    <p style={{color: 'var(--txt2)', fontSize: '.8rem'}}>احسب زكاة الذهب المستحقة</p>
                  </div>
                </div>
                <div className="calc-bd">
                  <div className="fg">
                    <label className="fl">وزن الذهب (جرام)</label>
                    <input 
                      type="number" 
                      className="fi" 
                      placeholder="أدخل الوزن"
                      value={zakatWeight}
                      onChange={(e) => setZakatWeight(e.target.value)}
                    />
                  </div>
                  <div className="fg">
                    <label className="fl">العيار</label>
                    <select 
                      className="fs"
                      value={zakatKarat}
                      onChange={(e) => setZakatKarat(parseInt(e.target.value))}
                    >
                      <option value="24">عيار ٢٤</option>
                      <option value="22">عيار ٢٢</option>
                      <option value="21">عيار ٢١</option>
                      <option value="18">عيار ١٨</option>
                    </select>
                  </div>
                  <button className="btn btn-g" onClick={calculateZakat}>حساب الزكاة</button>
                  <div className="res">
                    <div className="res-l">مبلغ الزكاة</div>
                    <div className="res-v">
                      {zakatResult?.type === 'zakat' 
                        ? <>{formatNumber(zakatResult.zakat)} <small>ر.س</small></>
                        : zakatResult?.type === 'low'
                        ? <span style={{fontSize: '1rem', color: 'var(--txt2)'}}>لم يبلغ النصاب<br/>وزنك: {formatNumber(zakatResult.pureGold)} جرام</span>
                        : <>٠ <small>ر.س</small></>
                      }
                    </div>
                  </div>
                  <p style={{marginTop: '10px', fontSize: '.7rem', color: '#6B6B7B', textAlign: 'center'}}>
                    النصاب: ٨٥ جرام ذهب خالص | الزكاة: ٢٫٥٪
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="ft">
        <div className="c">
          <p className="ft-copy">© ٢٠٢٥ سعودي قولد - جميع الحقوق محفوظة</p>
        </div>
      </footer>
    </>
  );
}
