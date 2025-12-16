import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
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
            </ul>
          </nav>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2025 سعودي قولد - جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
}
