'use client';

import { useState } from 'react';

// الأرقام العربية
const AR = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
const toAr = n => String(n).replace(/[0-9]/g, d => AR[d]);
const fmt = (n, d = 2) => {
  if (typeof n !== 'number' || isNaN(n)) return '٠';
  const p = n.toFixed(d).split('.');
  p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, '٬');
  return toAr(p.join('٫'));
};

const KARATS = { 24: 1, 22: 0.9167, 21: 0.875, 18: 0.75, 14: 0.5833 };
const NISAB = 85;

export default function Calculators({ initialPrices }) {
  const [calcWeight, setCalcWeight] = useState('');
  const [calcKarat, setCalcKarat] = useState(21);
  const [calcResult, setCalcResult] = useState(null);

  const [zakatWeight, setZakatWeight] = useState('');
  const [zakatKarat, setZakatKarat] = useState(21);
  const [zakatResult, setZakatResult] = useState(null);

  const handleCalcGold = () => {
    const w = parseFloat(calcWeight) || 0;
    if (w <= 0 || !initialPrices) return;
    setCalcResult(w * initialPrices[calcKarat].gram);
  };

  const handleCalcZakat = () => {
    const w = parseFloat(zakatWeight) || 0;
    if (w <= 0 || !initialPrices) return;

    const pure = w * KARATS[zakatKarat];
    if (pure < NISAB) {
      setZakatResult({ type: 'low', pure });
      return;
    }

    const value = pure * initialPrices[24].gram;
    setZakatResult({ type: 'zakat', zakat: value * 0.025, value, pure });
  };

  return (
    <div className="calc-grid">
      {/* Gold Calculator */}
      <div className="calc-card">
        <div className="calc-header">
          <div className="calc-icon" aria-hidden="true">💰</div>
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
              inputMode="decimal"
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
          <button className="btn btn-gold" onClick={handleCalcGold} type="button">
            حساب القيمة
          </button>
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
          <div className="calc-icon" aria-hidden="true">🕌</div>
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
              inputMode="decimal"
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
          <button className="btn btn-gold" onClick={handleCalcZakat} type="button">
            حساب الزكاة
          </button>
          <div className="calc-result">
            <div className="result-label">مبلغ الزكاة</div>
            <div className="result-value">
              {zakatResult?.type === 'zakat' ? (
                <>{fmt(zakatResult.zakat)} <small>ر.س</small></>
              ) : zakatResult?.type === 'low' ? (
                <span className="nisab-note">
                  لم يبلغ النصاب<br />وزنك: {fmt(zakatResult.pure)} جرام
                </span>
              ) : (
                <>٠ <small>ر.س</small></>
              )}
            </div>
          </div>
          <p className="zakat-note">
            النصاب: ٨٥ جرام ذهب خالص | الزكاة: ٢٫٥٪
          </p>
        </div>
      </div>
    </div>
  );
}
