import Link from 'next/link';

/*
 * FooterCityLinksSSR — the ONLY server-rendered part of the footer.
 * Keeps the 5 important city links in the initial HTML for crawl discovery,
 * while the rest of the footer is client-only (FooterClient). Visible, natural
 * footer nav — no hidden text.
 */
const CITY_LINKS = [
  { href: '/gold-price-riyadh', label: 'سعر الذهب اليوم في الرياض' },
  { href: '/gold-price-jeddah', label: 'سعر الذهب اليوم في جدة' },
  { href: '/gold-price-makkah', label: 'سعر الذهب اليوم في مكة' },
  { href: '/gold-price-madinah', label: 'سعر الذهب اليوم في المدينة' },
  { href: '/gold-price-dammam', label: 'سعر الذهب اليوم في الدمام' },
];

export default function FooterCityLinksSSR() {
  return (
    <nav className="footer-city-ssr" aria-label="أسعار الذهب حسب المدينة">
      <div className="container">
        <span className="footer-title" role="heading" aria-level="2">أسعار الذهب حسب المدينة</span>
        <ul className="footer-links">
          {CITY_LINKS.map((c) => (
            <li key={c.href}>
              <Link href={c.href}>{c.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
