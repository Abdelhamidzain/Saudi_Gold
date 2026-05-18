import { getPrices, formatRiyadhTime } from '../lib/getPrices';
import { fmt, OUNCE } from '../lib/gold';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import FAQ from '../components/FAQ';
import Disclaimer from '../components/Disclaimer';
import InternalLinks from '../components/InternalLinks';

export const revalidate = 3600;

export const metadata = {
  title: 'سعر الفضة اليوم في السعودية | سعر جرام الفضة بالريال',
  description: 'سعر الفضة اليوم في السعودية محدث. سعر جرام الفضة والأونصة بالريال السعودي مع مقارنة بسعر الذهب.',
  alternates: {
    canonical: 'https://saudi-gold.com/silver',
  },
  keywords: ['سعر الفضة', 'سعر الفضة اليوم', 'سعر جرام الفضة', 'فضة'],
};

const silverFAQ = [
  {
    question: 'كم سعر جرام الفضة اليوم؟',
    answer: 'سعر جرام الفضة يتغير يومياً. راجع السعر المحدث أعلاه بالريال السعودي.',
  },
  {
    question: 'ما نسبة سعر الفضة للذهب؟',
    answer: 'تاريخياً، نسبة الذهب للفضة تتراوح بين 60:1 و 80:1. حالياً حوالي 80:1 تقريباً.',
  },
  {
    question: 'هل الفضة استثمار جيد؟',
    answer: 'الفضة استثمار جيد للتنويع. أرخص من الذهب لكن أكثر تذبذباً. مناسبة للمستثمرين الصغار.',
  },
  {
    question: 'ما أفضل طريقة لشراء الفضة؟',
    answer: 'سبائك الفضة للاستثمار، أو مجوهرات الفضة عيار 925 للزينة.',
  },
  {
    question: 'هل تجب الزكاة على الفضة؟',
    answer: 'نعم، نصاب الفضة 595 جرام. إذا بلغت الفضة النصاب ومر عليها حول، تجب الزكاة 2.5%.',
  },
  {
    question: 'ما هو عيار الفضة المستخدم للمجوهرات؟',
    answer: 'عيار 925 (Sterling Silver) هو الأكثر شيوعاً، ويعني 92.5% فضة خالصة.',
  },
  {
    question: 'أين أشتري الفضة في السعودية؟',
    answer: 'محلات الذهب الكبرى، بعض البنوك، ومتاجر المجوهرات المتخصصة.',
  },
  {
    question: 'كيف أحافظ على لمعان الفضة؟',
    answer: 'احفظها بعيداً عن الرطوبة، نظفها بقماش ناعم، وتجنب الكيماويات.',
  },
];

const links = [
  { href: '/', label: 'سعر الذهب اليوم', icon: '🪙' },
  { href: '/ounce', label: 'سعر الأونصة', icon: '⚖️' },
  { href: '/zakat', label: 'حاسبة الزكاة', icon: '🕌' },
];

export default async function SilverPage() {
  const { prices, updatedAt } = await getPrices();
  const formattedTime = formatRiyadhTime(updatedAt);
  
  // سعر الفضة التقريبي (نسبة الذهب للفضة حوالي 80:1)
  const goldOunce = prices[24]?.ounce || 10000;
  const silverOunce = goldOunce / 80;
  const silverGram = silverOunce / OUNCE;

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'سعر الفضة اليوم في السعودية',
    url: 'https://saudi-gold.com/silver',
    dateModified: updatedAt || new Date().toISOString(),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      
      <Header />

      <main>
        <div className="container">
          <Breadcrumb items={[
            { name: 'الرئيسية', href: '/' },
            { name: 'سعر الفضة' },
          ]} />
        </div>

        <section className="hero">
          <div className="container">
            <div className="badge">
              <span className="live-dot"></span>
              <span>سعر تقريبي محدث</span>
            </div>

            <h1>سعر <span className="text-gold">الفضة</span> اليوم في السعودية</h1>
            <p className="hero-subtitle">
              سعر الفضة اليوم في السعودية محدث بناءً على الأسعار العالمية
            </p>

            <div className="main-price-box">
              <div className="main-price-label">سعر جرام الفضة الخالصة</div>
              <div className="main-price-value">
                <span>{fmt(silverGram)}</span>
                <span className="main-price-currency">ر.س</span>
              </div>
              <div className="last-update">آخر تحديث: {formattedTime}</div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="table-section">
              <div className="table-header">
                <h2>📊 أسعار الفضة اليوم</h2>
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
                    <tr>
                      <td>سعر جرام الفضة الخالصة</td>
                      <td>{fmt(silverGram)}</td>
                      <td>{fmt(silverGram / 3.75)}</td>
                    </tr>
                    <tr>
                      <td>سعر جرام الفضة عيار 925</td>
                      <td>{fmt(silverGram * 0.925)}</td>
                      <td>{fmt((silverGram * 0.925) / 3.75)}</td>
                    </tr>
                    <tr>
                      <td>سعر أونصة الفضة</td>
                      <td>{fmt(silverOunce)}</td>
                      <td>{fmt(silverOunce / 3.75)}</td>
                    </tr>
                    <tr>
                      <td>سعر كيلو الفضة</td>
                      <td>{fmt(silverGram * 1000, 0)}</td>
                      <td>{fmt((silverGram * 1000) / 3.75, 0)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Gold vs Silver Comparison */}
        <section className="section">
          <div className="container">
            <div className="info-section">
              <h2>⚖️ مقارنة الذهب والفضة</h2>
              <div className="table-wrapper" style={{ marginTop: '20px' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>المعدن</th>
                      <th>سعر الجرام</th>
                      <th>سعر الأونصة</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>🥇 الذهب عيار 24</td>
                      <td>{fmt(prices[24]?.gram)} ر.س</td>
                      <td>{fmt(prices[24]?.ounce, 0)} ر.س</td>
                    </tr>
                    <tr>
                      <td>🥈 الفضة الخالصة</td>
                      <td>{fmt(silverGram)} ر.س</td>
                      <td>{fmt(silverOunce)} ر.س</td>
                    </tr>
                    <tr>
                      <td colSpan="3" style={{ textAlign: 'center', color: 'var(--txt2)' }}>
                        نسبة الذهب للفضة: {Math.round(prices[24]?.gram / silverGram)}:1
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="content-section">
              <h2>سعر الفضة في السعودية</h2>
              <p>
                سعر الفضة اليوم في السعودية يتحدد بناءً على السعر العالمي للفضة وسعر صرف الريال 
                مقابل الدولار. الفضة معدن ثمين يُستخدم في المجوهرات والصناعة والاستثمار.
              </p>

              <h2>عيارات الفضة</h2>
              <ul>
                <li><strong>فضة 999:</strong> فضة خالصة 99.9%، للسبائك والاستثمار</li>
                <li><strong>فضة 925 (Sterling):</strong> 92.5% فضة، الأشهر للمجوهرات</li>
                <li><strong>فضة 900:</strong> 90% فضة، تُستخدم في العملات</li>
              </ul>

              <h2>الاستثمار في الفضة</h2>
              <h3>مميزات الفضة للاستثمار</h3>
              <ul>
                <li>أرخص من الذهب - مناسبة للمستثمرين الصغار</li>
                <li>طلب صناعي متزايد (إلكترونيات، طاقة شمسية)</li>
                <li>ملاذ آمن في أوقات الأزمات</li>
              </ul>

              <h3>عيوب الاستثمار في الفضة</h3>
              <ul>
                <li>أكثر تذبذباً من الذهب</li>
                <li>تحتاج مساحة تخزين أكبر لنفس القيمة</li>
                <li>أقل سيولة من الذهب في السوق السعودي</li>
              </ul>

              <h2>زكاة الفضة</h2>
              <p>
                نصاب الفضة 595 جرام (200 درهم شرعي). إذا بلغت الفضة النصاب ومر عليها 
                حول هجري كامل، تجب الزكاة بنسبة 2.5% من قيمتها.
              </p>

              <InternalLinks links={links} />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <FAQ items={silverFAQ} />
          </div>
        </section>

        <section className="section">
          <div className="container">
            <Disclaimer />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
