'use client';

import Link from 'next/link';

/*
 * FooterClient — client-only footer used ONLY on the homepage, loaded via
 * dynamic(import, { ssr:false }). Other pages keep the server-rendered Footer.
 *
 * NOTE (SEO): because this is client-only on the homepage, its internal links
 * are NOT in the homepage's raw HTML. This is an intentional, reversible
 * experiment choice. Other routes still expose these links server-side.
 */
export default function FooterClient() {
  return (
    <footer className="footer CSR">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo">
              <span className="logo-icon" aria-hidden="true">🪙</span>
              <span className="text-gold">سعودي قولد</span>
            </Link>
            <p>
              منصتك الموثوقة لمتابعة سعر الذهب اليوم في السعودية.
              أسعار جرام الذهب عيار 21 و 24 وجميع العيارات محدثة لحظياً بالريال السعودي.
            </p>
          </div>

          <nav aria-label="أسعار الذهب">
            <span className="footer-title" role="heading" aria-level="2">أسعار الذهب</span>
            <ul className="footer-links">
              <li><Link href="/">سعر الذهب اليوم</Link></li>
              <li><Link href="/karat-21">سعر الذهب عيار 21</Link></li>
              <li><Link href="/karat-24">سعر الذهب عيار 24</Link></li>
              <li><Link href="/karat-22">سعر الذهب عيار 22</Link></li>
              <li><Link href="/gold-bars">سبائك الذهب</Link></li>
              <li><Link href="/ounce">سعر الأونصة</Link></li>
            </ul>
          </nav>

          <nav aria-label="أدوات">
            <span className="footer-title" role="heading" aria-level="2">أدوات</span>
            <ul className="footer-links">
              <li><Link href="/calculator">حاسبة الذهب</Link></li>
              <li><Link href="/zakat">حاسبة الزكاة</Link></li>
              <li><Link href="/history">الرسم البياني</Link></li>
              <li><Link href="/buy-sell">بيع وشراء</Link></li>
            </ul>
          </nav>

          <nav aria-label="معلومات">
            <span className="footer-title" role="heading" aria-level="2">معلومات</span>
            <ul className="footer-links">
              <li><Link href="/workmanship">مصنعية الذهب</Link></li>
              <li><Link href="/markets">أسواق الذهب</Link></li>
              <li><Link href="/silver">سعر الفضة</Link></li>
              <li><Link href="/blog">المدونة</Link></li>
            </ul>
          </nav>

          <nav aria-label="أسعار الذهب حسب المدينة">
            <span className="footer-title" role="heading" aria-level="2">أسعار حسب المدينة</span>
            <ul className="footer-links">
              <li><Link href="/gold-price-riyadh">سعر الذهب في الرياض</Link></li>
              <li><Link href="/gold-price-jeddah">سعر الذهب في جدة</Link></li>
              <li><Link href="/gold-price-makkah">سعر الذهب في مكة</Link></li>
              <li><Link href="/gold-price-madinah">سعر الذهب في المدينة</Link></li>
              <li><Link href="/gold-price-dammam">سعر الذهب في الدمام</Link></li>
            </ul>
          </nav>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2025-2026 سعودي قولد - جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
}
