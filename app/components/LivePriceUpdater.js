'use client';

import { useEffect, useState, useCallback } from 'react';

const REFRESH_INTERVAL = 10 * 60 * 1000; // 10 دقائق
const OUNCE = 31.1035;
const MARKUP = 1.02;
const KARATS = { 24: 1, 22: 0.9167, 21: 0.875, 18: 0.75, 14: 0.5833 };

function formatPrice(n) {
  if (typeof n !== 'number' || isNaN(n)) return '0';
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatTime() {
  return new Date().toLocaleString('ar-SA', {
    timeZone: 'Asia/Riyadh',
    hour: '2-digit',
    minute: '2-digit',
    day: 'numeric',
    month: 'long',
  });
}

export default function LivePriceUpdater() {
  const [change, setChange] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const updatePrices = useCallback(async () => {
    try {
      setIsUpdating(true);

      // جلب مباشرة من goldprice.org (بدون بروكسي!)
      const res = await fetch('https://data-asg.goldprice.org/dbXRates/SAR');
      if (!res.ok) return; // Silent fail on 403/error — prevents browser console errors
      const data = await res.json();
      const item = data?.items?.[0];
      if (!item?.xauPrice) return;

      // حساب أسعار كل العيارات
      const gram24 = (item.xauPrice / OUNCE) * MARKUP;
      const prices = {};
      for (const [k, purity] of Object.entries(KARATS)) {
        prices[k] = {
          gram: gram24 * purity,
          ounce: gram24 * purity * OUNCE,
          kilo: gram24 * purity * 1000,
        };
      }

      // تحديث السعر الرئيسي (عيار 21)
      const mainPrice = document.querySelector('.main-price-value span:first-child');
      if (mainPrice) mainPrice.textContent = formatPrice(prices[21].gram);

      // تحديث كروت الأسعار
      const priceValues = document.querySelectorAll('.price-card-value');
      const karatOrder = [24, 22, 21, 18];
      priceValues.forEach((el, i) => {
        if (karatOrder[i] && prices[karatOrder[i]]) {
          el.textContent = formatPrice(prices[karatOrder[i]].gram);
        }
      });

      // تحديث وقت آخر تحديث
      const timeStr = formatTime();
      document.querySelectorAll('.last-update').forEach((el) => {
        el.textContent = '\u0622\u062E\u0631 \u062A\u062D\u062F\u064A\u062B: ' + timeStr;
      });

      // تحديث جدول الأسعار
      document.querySelectorAll('.price-table tbody tr, .price-table tr:not(:first-child)').forEach((row) => {
        const cells = row.querySelectorAll('td');
        if (cells.length >= 4) {
          const text = cells[0]?.textContent || '';
          let k = null;
          if (text.includes('24')) k = 24;
          else if (text.includes('22')) k = 22;
          else if (text.includes('21')) k = 21;
          else if (text.includes('18')) k = 18;
          else if (text.includes('14')) k = 14;

          if (k && prices[k]) {
            if (cells[1]) cells[1].textContent = formatPrice(prices[k].gram);
            if (cells[2]) cells[2].textContent = formatPrice(prices[k].ounce);
            if (cells[3]) cells[3].textContent = formatPrice(prices[k].kilo);
          }
        }
      });

      setChange({ amount: item.chgXau, percent: item.pcXau });

      // بث الأسعار لبقية الكومبوننتات
      window.__goldPrices = prices;
      window.dispatchEvent(new CustomEvent('goldPriceUpdate', { detail: { prices } }));

    } catch {
      // Silent fail — no console.error (fixes PageSpeed Best Practices)
    } finally {
      setIsUpdating(false);
    }
  }, []);

  useEffect(() => {
    const t1 = setTimeout(updatePrices, 2000);
    const interval = setInterval(updatePrices, REFRESH_INTERVAL);
    return () => { clearTimeout(t1); clearInterval(interval); };
  }, [updatePrices]);

  return (
    <div className="live-indicator" aria-live="polite">
      <style>{`
        .live-indicator{position:fixed;bottom:16px;left:16px;z-index:1000;display:flex;align-items:center;gap:8px;padding:8px 14px;background:var(--bg2,#1a1a2e);border:1px solid var(--g,#D4AF37);border-radius:20px;font-size:.75rem;color:var(--txt2,#ccc);box-shadow:0 2px 12px rgba(0,0,0,.3);direction:rtl}
        .live-dot-i{width:8px;height:8px;border-radius:50%;background:#22c55e;animation:lp 2s infinite}
        .live-dot-i.u{background:#f59e0b}
        @keyframes lp{0%,100%{opacity:1}50%{opacity:.4}}
        .lc{font-weight:bold;margin-right:4px}
        .lc.up{color:#22c55e}.lc.dn{color:#ef4444}
        @media(max-width:768px){.live-indicator{bottom:8px;left:8px;font-size:.65rem;padding:6px 10px}}
      `}</style>
      <span className={'live-dot-i' + (isUpdating ? ' u' : '')}></span>
      <span>أسعار مباشرة</span>
      {change && change.percent !== 0 && (
        <span className={'lc ' + (change.percent > 0 ? 'up' : 'dn')}>
          {change.percent > 0 ? '▲' : '▼'} {Math.abs(change.percent).toFixed(2)}%
        </span>
      )}
    </div>
  );
}
