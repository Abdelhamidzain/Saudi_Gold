'use client';

import { useEffect, useState, useCallback } from 'react';

const REFRESH_INTERVAL = 10 * 60 * 1000; // 10 دقائق

function formatPrice(n) {
  if (typeof n !== 'number' || isNaN(n)) return '0';
  return n.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatTime(isoString) {
  if (!isoString) return '';
  return new Date(isoString).toLocaleString('ar-SA', {
    timeZone: 'Asia/Riyadh',
    hour: '2-digit',
    minute: '2-digit',
    day: 'numeric',
    month: 'long',
  });
}

export default function LivePriceUpdater() {
  const [lastUpdate, setLastUpdate] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [change, setChange] = useState(null);

  const updatePrices = useCallback(async () => {
    try {
      setIsUpdating(true);
      const res = await fetch('/api/live-gold');
      const data = await res.json();

      if (!data.success || !data.prices) return;

      // تحديث كروت الأسعار
      const priceValues = document.querySelectorAll('.price-card-value');
      const karatOrder = [24, 22, 21, 18];
      priceValues.forEach((el, i) => {
        if (karatOrder[i] && data.prices[karatOrder[i]]) {
          el.textContent = formatPrice(data.prices[karatOrder[i]].gram);
        }
      });

      // تحديث السعر الرئيسي (عيار 21)
      const mainPrice = document.querySelector('.main-price-value span:first-child');
      if (mainPrice && data.prices[21]) {
        mainPrice.textContent = formatPrice(data.prices[21].gram);
      }

      // تحديث وقت آخر تحديث
      const updateTimeEls = document.querySelectorAll('.last-update');
      const timeStr = formatTime(data.updatedAt);
      updateTimeEls.forEach((el) => {
        el.textContent = `آخر تحديث: ${timeStr}`;
      });

      // تحديث جدول الأسعار
      const tableRows = document.querySelectorAll('.price-table tbody tr, .price-table tr:not(:first-child)');
      tableRows.forEach((row) => {
        const cells = row.querySelectorAll('td');
        if (cells.length >= 4) {
          // محاولة تحديد العيار من النص
          const karatText = cells[0]?.textContent || '';
          let karat = null;
          if (karatText.includes('24')) karat = 24;
          else if (karatText.includes('22')) karat = 22;
          else if (karatText.includes('21')) karat = 21;
          else if (karatText.includes('18')) karat = 18;
          else if (karatText.includes('14')) karat = 14;

          if (karat && data.prices[karat]) {
            if (cells[1]) cells[1].textContent = formatPrice(data.prices[karat].gram);
            if (cells[2]) cells[2].textContent = formatPrice(data.prices[karat].ounce);
            if (cells[3]) cells[3].textContent = formatPrice(data.prices[karat].kilo);
          }
        }
      });

      // حفظ بيانات التغيير
      setChange(data.change);
      setLastUpdate(data.updatedAt);

      // إرسال event للكالكيوليتور وباقي الكومبوننتات
      window.dispatchEvent(
        new CustomEvent('goldPriceUpdate', {
          detail: { prices: data.prices, updatedAt: data.updatedAt },
        })
      );
    } catch (err) {
      console.error('Failed to update prices:', err);
    } finally {
      setIsUpdating(false);
    }
  }, []);

  useEffect(() => {
    // تحديث فوري عند تحميل الصفحة
    const initialDelay = setTimeout(updatePrices, 3000);

    // تحديث كل 10 دقائق
    const interval = setInterval(updatePrices, REFRESH_INTERVAL);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, [updatePrices]);

  // مؤشر التحديث المباشر
  return (
    <div className="live-indicator" aria-live="polite">
      <style>{`
        .live-indicator {
          position: fixed;
          bottom: 16px;
          left: 16px;
          z-index: 1000;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          background: var(--bg2, #1a1a2e);
          border: 1px solid var(--gold, #D4AF37);
          border-radius: 20px;
          font-size: 0.75rem;
          color: var(--text2, #ccc);
          box-shadow: 0 2px 12px rgba(0,0,0,0.3);
          direction: rtl;
          transition: opacity 0.3s;
        }
        .live-indicator:hover {
          opacity: 1 !important;
        }
        .live-dot-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #22c55e;
          animation: livePulse 2s infinite;
        }
        .live-dot-indicator.updating {
          background: #f59e0b;
        }
        @keyframes livePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .live-change {
          font-weight: bold;
          margin-right: 4px;
        }
        .live-change.up { color: #22c55e; }
        .live-change.down { color: #ef4444; }
        @media (max-width: 768px) {
          .live-indicator {
            bottom: 8px;
            left: 8px;
            font-size: 0.65rem;
            padding: 6px 10px;
          }
        }
      `}</style>
      <span className={`live-dot-indicator ${isUpdating ? 'updating' : ''}`}></span>
      <span>أسعار مباشرة</span>
      {change && change.percent !== 0 && (
        <span className={`live-change ${change.percent > 0 ? 'up' : 'down'}`}>
          {change.percent > 0 ? '▲' : '▼'} {Math.abs(change.percent).toFixed(2)}%
        </span>
      )}
    </div>
  );
}
