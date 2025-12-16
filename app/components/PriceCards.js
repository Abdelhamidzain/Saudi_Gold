import Link from 'next/link';
import { toAr, fmt, KARATS } from '../lib/gold';

export default function PriceCards({ prices, highlightKarat = 21 }) {
  // فقط العيارات التي لها صفحات
  const karatOrder = [24, 22, 21, 18];
  
  return (
    <div className="price-cards">
      {karatOrder.map((k) => (
        <Link 
          key={k} 
          href={`/عيار-${k}`}
          className={`price-card ${k === highlightKarat ? 'highlight' : ''}`}
          prefetch={false}
        >
          <div className="price-card-karat" aria-hidden="true">{toAr(k)}</div>
          <h2 className="price-card-label">سعر جرام عيار {toAr(k)}</h2>
          <div className="price-card-value">{fmt(prices[k]?.gram)}</div>
          <div className="price-card-unit">ر.س / جرام</div>
        </Link>
      ))}
    </div>
  );
}
