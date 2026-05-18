import { getPrices, formatRiyadhTime } from '../lib/getPrices';
import { toAr, fmt, OUNCE } from '../lib/gold';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import FAQ from '../components/FAQ';
import Disclaimer from '../components/Disclaimer';
import InternalLinks from '../components/InternalLinks';

export const revalidate = 3600;

export const metadata = {
  title: 'سعر أونصة الذهب اليوم في السعودية | سعر الأونصة بالريال',
  description: 'سعر أونصة الذهب اليوم في السعودية محدث لحظياً بالريال السعودي والدولار. الأونصة تساوي 31.1 جرام.',
  alternates: {
    canonical: 'https://saudi-gold.com/ounce',
  },
  keywords: ['سعر أونصة الذهب', 'سعر الأونصة', 'أونصة الذهب', 'سعر اونصة الذهب اليوم'],
};

const ounceFAQ = [
  {
    question: 'كم جرام في أونصة الذهب؟',
    answer: 'أونصة الذهب (أونصة تروي) تساوي 31.1035 جرام، وهي الوحدة المستخدمة في تسعير الذهب عالمياً.',
  },
  {
    question: 'كم سعر أونصة الذهب اليوم؟',
    answer: 'راجع السعر المحدث أعلاه. سعر الأونصة يتغير لحظياً حسب البورصة العالمية.',
  },
  {
    question: 'لماذا يُسعّر الذهب بالأونصة عالمياً؟',
    answer: 'الأونصة هي المعيار التاريخي للمعادن الثمينة، وتُستخدم في جميع البورصات العالمية لتوحيد التسعير.',
  },
  {
    question: 'ما الفرق بين الأونصة العادية وأونصة تروي؟',
    answer: 'أونصة تروي (للذهب) = 31.1 جرام، بينما الأونصة العادية = 28.3 جرام. الذهب يُسعّر بأونصة تروي.',
  },
  {
    question: 'هل يمكن شراء أونصة ذهب في السعودية؟',
    answer: 'نعم، تتوفر سبائك بوزن أونصة (31.1 جرام) في البنوك ومحلات الذهب الكبرى.',
  },
  {
    question: 'أيهما أفضل للاستثمار: الأونصة أم الجرامات؟',
    answer: 'كلاهما جيد. الأونصات والسبائك الكبيرة لها هامش ربح أقل، لكن الجرامات أسهل في التسييل.',
  },
  {
    question: 'كيف يتحدد سعر الأونصة؟',
    answer: 'يتحدد في بورصات عالمية (لندن، نيويورك) بناءً على العرض والطلب العالمي.',
  },
  {
    question: 'ما العلاقة بين سعر الأونصة وسعر الجرام؟',
    answer: 'سعر الجرام = سعر الأونصة ÷ 31.1035. سعر الجرام مشتق من سعر الأونصة العالمي.',
  },
];

const links = [
  { href: '/', label: 'سعر الذهب اليوم', icon: '🪙' },
  { href: '/gold-bars', label: 'سبائك الذهب', icon: '🧱' },
  { href: '/karat-24', label: 'سعر عيار 24', icon: '💎' },
];

export default async function OuncePage() {
  const { prices, rates, updatedAt } = await getPrices();
  const formattedTime = formatRiyadhTime(updatedAt);
  
  // سعر الأونصة بالريال
  const ounceSAR = rates?.SAR || (prices[24]?.gram * OUNCE);
  const ounceUSD = ounceSAR / 3.75;

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'سعر أونصة الذهب اليوم',
    url: 'https://saudi-gold.com/ounce',
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
            { name: 'سعر أونصة الذهب' },
          ]} />
        </div>

        <section className="hero">
          <div className="container">
            <div className="badge">
              <span className="live-dot"></span>
              <span>سعر محدث من البورصة العالمية</span>
            </div>

            <h1>سعر <span className="text-gold">أونصة الذهب</span> اليوم</h1>
            <p className="hero-subtitle">
              سعر أونصة الذهب اليوم (31.1 جرام) محدث لحظياً بالريال السعودي والدولار الأمريكي
            </p>

            <div className="main-price-box">
              <div className="main-price-label">سعر أونصة الذهب بالريال السعودي</div>
              <div className="main-price-value">
                <span>{fmt(ounceSAR, 0)}</span>
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
                <h2>📊 سعر أونصة الذهب بالعملات</h2>
              </div>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>العملة</th>
                      <th>سعر الأونصة</th>
                      <th>سعر الجرام</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>🇸🇦 الريال السعودي (SAR)</td>
                      <td>{fmt(ounceSAR, 0)}</td>
                      <td>{fmt(ounceSAR / OUNCE)}</td>
                    </tr>
                    <tr>
                      <td>🇺🇸 الدولار الأمريكي (USD)</td>
                      <td>{fmt(ounceUSD, 0)}</td>
                      <td>{fmt(ounceUSD / OUNCE)}</td>
                    </tr>
                    <tr>
                      <td>🇪🇺 اليورو (EUR)</td>
                      <td>{fmt(ounceUSD * 0.92, 0)}</td>
                      <td>{fmt((ounceUSD * 0.92) / OUNCE)}</td>
                    </tr>
                    <tr>
                      <td>🇬🇧 الجنيه الإسترليني (GBP)</td>
                      <td>{fmt(ounceUSD * 0.79, 0)}</td>
                      <td>{fmt((ounceUSD * 0.79) / OUNCE)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="info-section">
              <h2>⚖️ تحويل الأونصة للجرام</h2>
              <p style={{ fontSize: '1.2rem', textAlign: 'center' }}>
                <strong>١ أونصة = ٣١٫١٠٣٥ جرام</strong>
              </p>
              <div className="table-wrapper" style={{ marginTop: '20px' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>الأونصات</th>
                      <th>الجرامات</th>
                      <th>السعر (ر.س)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[0.25, 0.5, 1, 2, 5, 10].map((oz) => (
                      <tr key={oz}>
                        <td>{toAr(oz)} أونصة</td>
                        <td>{fmt(oz * OUNCE, 1)} جرام</td>
                        <td>{fmt(ounceSAR * oz, 0)} ر.س</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="content-section">
              <h2>ما هي أونصة الذهب؟</h2>
              <p>
                أونصة الذهب (أونصة تروي) هي وحدة القياس المعتمدة عالمياً لتسعير الذهب والمعادن الثمينة. 
                تساوي الأونصة 31.1035 جرام، وهي تختلف عن الأونصة العادية (28.35 جرام) المستخدمة 
                لقياس الأوزان الأخرى.
              </p>

              <h2>لماذا يُسعّر الذهب بالأونصة؟</h2>
              <p>
                تاريخياً، استُخدمت أونصة تروي في تجارة المعادن الثمينة منذ العصور الوسطى. 
                اليوم، جميع البورصات العالمية (لندن، نيويورك، شنغهاي) تسعّر الذهب بالأونصة 
                لتوحيد المعيار العالمي.
              </p>

              <h2>كيف يتحدد سعر الأونصة؟</h2>
              <p>
                يتحدد سعر أونصة الذهب في البورصات العالمية من خلال:
              </p>
              <ul>
                <li><strong>العرض والطلب:</strong> الطلب على الذهب كملاذ آمن ومجوهرات</li>
                <li><strong>سعر الدولار:</strong> علاقة عكسية مع قوة الدولار</li>
                <li><strong>أسعار الفائدة:</strong> ارتفاع الفائدة يضعف جاذبية الذهب</li>
                <li><strong>الأحداث الجيوسياسية:</strong> الأزمات ترفع الطلب على الذهب</li>
              </ul>

              <h2>سبائك الأونصة</h2>
              <p>
                سبائك الأونصة (31.1 جرام) من أشهر أوزان السبائك للاستثمار. تتوفر من منتجين 
                عالميين مثل PAMP و Perth Mint و Credit Suisse، وتباع في البنوك السعودية 
                ومحلات الذهب الكبرى.
              </p>

              <InternalLinks links={links} />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <FAQ items={ounceFAQ} />
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
