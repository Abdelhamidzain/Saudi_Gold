'use client';

import { useState } from 'react';
import { toAr, fmt, KARATS, NISAB } from '../lib/gold';

export function GoldCalculator({ prices }) {
  const [weight, setWeight] = useState('');
  const [karat, setKarat] = useState(21);
  const [result, setResult] = useState(null);

  const calculate = () => {
    const w = parseFloat(weight) || 0;
    if (w <= 0 || !prices?.[karat]) return;
    setResult(w * prices[karat].gram);
  };

  return (
    <div className="calc-card">
      <div className="calc-header">
        <div className="calc-icon" aria-hidden="true">💰</div>
        <div>
          <h3>حاسبة سعر الذهب</h3>
          <p>احسب قيمة الذهب بالريال السعودي</p>
        </div>
      </div>
      <div className="calc-body">
        <div className="form-group">
          <label className="form-label" htmlFor="calc-weight">الوزن (جرام)</label>
          <input
            type="number"
            id="calc-weight"
            className="form-input"
            placeholder="أدخل الوزن بالجرام"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            inputMode="decimal"
            min="0"
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="calc-karat">العيار</label>
          <select
            id="calc-karat"
            className="form-select"
            value={karat}
            onChange={(e) => setKarat(parseInt(e.target.value))}
          >
            {Object.entries(KARATS).map(([k, data]) => (
              <option key={k} value={k}>{data.name}</option>
            ))}
          </select>
        </div>
        <button className="btn btn-gold" onClick={calculate} type="button">
          حساب القيمة
        </button>
        <div className="calc-result">
          <div className="result-label">القيمة التقديرية</div>
          <div className="result-value">
            {result ? fmt(result) : '٠'} <small>ر.س</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ZakatCalculator({ prices }) {
  const [weight, setWeight] = useState('');
  const [karat, setKarat] = useState(21);
  const [result, setResult] = useState(null);

  const calculate = () => {
    const w = parseFloat(weight) || 0;
    if (w <= 0 || !prices?.[24]) return;

    const purity = KARATS[karat]?.purity || 0.875;
    const pureGold = w * purity;

    if (pureGold < NISAB) {
      setResult({ type: 'low', pureGold });
      return;
    }

    const value = pureGold * prices[24].gram;
    const zakat = value * 0.025;
    setResult({ type: 'zakat', zakat, value, pureGold });
  };

  return (
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
          <label className="form-label" htmlFor="zakat-weight">وزن الذهب (جرام)</label>
          <input
            type="number"
            id="zakat-weight"
            className="form-input"
            placeholder="أدخل الوزن بالجرام"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            inputMode="decimal"
            min="0"
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="zakat-karat">العيار</label>
          <select
            id="zakat-karat"
            className="form-select"
            value={karat}
            onChange={(e) => setKarat(parseInt(e.target.value))}
          >
            <option value="24">عيار ٢٤</option>
            <option value="22">عيار ٢٢</option>
            <option value="21">عيار ٢١</option>
            <option value="18">عيار ١٨</option>
          </select>
        </div>
        <button className="btn btn-gold" onClick={calculate} type="button">
          حساب الزكاة
        </button>
        <div className="calc-result">
          <div className="result-label">مبلغ الزكاة المستحقة</div>
          <div className="result-value">
            {result?.type === 'zakat' ? (
              <>{fmt(result.zakat)} <small>ر.س</small></>
            ) : result?.type === 'low' ? (
              <span className="nisab-note">
                لم يبلغ النصاب<br />
                الذهب الخالص: {fmt(result.pureGold)} جرام
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
  );
}
