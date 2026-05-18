import { getPrices, formatRiyadhTime } from '../lib/getPrices';
import { fmt } from '../lib/gold';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import FAQ from '../components/FAQ';
import Disclaimer from '../components/Disclaimer';
import InternalLinks from '../components/InternalLinks';

export const revalidate = 86400;

export const metadata = {
  title: 'تاريخ أسعار الذهب في السعودية | الرسم البياني والتحليل',
  description: 'تاريخ أسعار الذهب في السعودية. تعرف على تطور أسعار الذهب عبر السنوات والعوامل المؤثرة في السعر.',
  alternates: {
    canonical: 'https://saudi-gold.com/history',
  },
  keywords: ['تاريخ أسعار الذهب', 'رسم بياني الذهب', 'تطور سعر الذهب', 'أسعار الذهب التاريخية'],
};

// بيانات تاريخية تقريبية (سعر الجرام عيار 21 بالريال)
const historicalData = [
  { year: 2015, price: 120, event: 'استقرار نسبي' },
  { year: 2016, price: 135, event: 'ارتفاع طفيف' },
  { year: 2017, price: 145, event: 'تعافي الأسواق' },
  { year: 2018, price: 150, event: 'حرب تجارية أمريكا-الصين' },
  { year: 2019, price: 175, event: 'توترات جيوسياسية' },
  { year: 2020, price: 230, event: 'جائحة كورونا' },
  { year: 2021, price: 210, event: 'تراجع من الذروة' },
  { year: 2022, price: 220, event: 'حرب أوكرانيا' },
  { year: 2023, price: 250, event: 'أزمات مصرفية' },
  { year: 2024, price: 290, event: 'ارتفاعات قياسية' },
];

const historyFAQ = [
  {
    question: 'كم كان سعر الذهب قبل 10 سنوات؟',
    answer: 'في 2015، كان سعر جرام الذهب عيار 21 حوالي 120 ريال، أي أقل من نصف السعر الحالي.',
  },
  {
    question: 'متى وصل الذهب لأعلى سعر تاريخياً؟',
    answer: 'في 2024، وصل الذهب لأعلى أسعاره تاريخياً متجاوزاً 2400 دولار للأونصة.',
  },
  {
    question: 'ما العوامل التي ترفع سعر الذهب؟',
    answer: 'الأزمات الاقتصادية، التضخم، انخفاض الدولار، عدم الاستقرار السياسي، وزيادة طلب البنوك المركزية.',
  },
  {
    question: 'هل الذهب يحافظ على قيمته؟',
    answer: 'نعم، تاريخياً الذهب يحافظ على القوة الشرائية على المدى الطويل ويُعد تحوطاً ضد التضخم.',
  },
  {
    question: 'كيف أتوقع اتجاه أسعار الذهب؟',
    answer: 'تابع: سعر الدولار، أسعار الفائدة الأمريكية، التضخم العالمي، والأحداث الجيوسياسية.',
  },
  {
    question: 'هل الذهب استثمار آمن على المدى الطويل؟',
    answer: 'نعم، الذهب يُعد ملاذاً آمناً. خلال الـ 20 سنة الماضية، ارتفع بأكثر من 500%.',
  },
  {
    question: 'متى أفضل وقت لشراء الذهب؟',
    answer: 'عند انخفاض الأسعار أو استقرارها. تجنب الشراء في ذروة الأزمات عندما تكون الأسعار مرتفعة جداً.',
  },
  {
    question: 'هل سيستمر ارتفاع الذهب؟',
    answer: 'لا أحد يعرف المستقبل بدقة، لكن العوامل الحالية (تضخم، توترات) تدعم بقاء الأسعار مرتفعة.',
  },
];

const links = [
  { href: '/', label: 'سعر الذهب اليوم', icon: '🪙' },
  { href: '/ounce', label: 'سعر الأونصة', icon: '⚖️' },
  { href: '/gold-bars', label: 'سبائك الذهب', icon: '🧱' },
];

export default async function HistoryPage() {
  const { prices, updatedAt } = await getPrices();
  const formattedTime = formatRiyadhTime(updatedAt);
  const currentPrice = prices[21]?.gram;

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'تاريخ أسعار الذهب في السعودية',
    url: 'https://saudi-gold.com/history',
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
            { name: 'تاريخ أسعار الذهب' },
          ]} />
        </div>

        <section className="hero">
          <div className="container">
            <h1>تاريخ أسعار <span className="text-gold">الذهب</span> في السعودية</h1>
            <p className="hero-subtitle">
              تطور أسعار الذهب عبر السنوات والأحداث المؤثرة في السعر
            </p>
          </div>
        </section>

        {/* Historical Data Table */}
        <section className="section">
          <div className="container">
            <div className="table-section">
              <div className="table-header">
                <h2>📊 تطور سعر جرام الذهب عيار 21 (بالريال)</h2>
              </div>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>السنة</th>
                      <th>السعر التقريبي</th>
                      <th>التغير</th>
                      <th>الحدث الرئيسي</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historicalData.map((row, index) => {
                      const prevPrice = index > 0 ? historicalData[index - 1].price : row.price;
                      const change = ((row.price - prevPrice) / prevPrice * 100).toFixed(1);
                      return (
                        <tr key={row.year}>
                          <td>{row.year}</td>
                          <td>{row.price} ر.س</td>
                          <td style={{ 
                            color: parseFloat(change) >= 0 ? 'var(--green)' : 'var(--red)' 
                          }}>
                            {parseFloat(change) >= 0 ? '+' : ''}{change}%
                          </td>
                          <td style={{ fontSize: '0.85rem', color: 'var(--txt2)' }}>{row.event}</td>
                        </tr>
                      );
                    })}
                    <tr style={{ background: 'rgba(212, 175, 55, 0.1)' }}>
                      <td><strong>2025</strong></td>
                      <td><strong>{fmt(currentPrice, 0)} ر.س</strong></td>
                      <td style={{ color: 'var(--g)' }}>الآن</td>
                      <td style={{ fontSize: '0.85rem' }}>السعر الحالي</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Growth Stats */}
        <section className="section">
          <div className="container">
            <div className="info-section">
              <h2>📈 إحصائيات النمو</h2>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '20px', 
                marginTop: '20px' 
              }}>
                <div className="calc-result">
                  <div className="result-label">النمو خلال 10 سنوات</div>
                  <div className="result-value" style={{ fontSize: '1.5rem' }}>
                    +{Math.round((currentPrice - 120) / 120 * 100)}%
                  </div>
                </div>
                <div className="calc-result">
                  <div className="result-label">النمو خلال 5 سنوات</div>
                  <div className="result-value" style={{ fontSize: '1.5rem' }}>
                    +{Math.round((currentPrice - 175) / 175 * 100)}%
                  </div>
                </div>
                <div className="calc-result">
                  <div className="result-label">النمو منذ جائحة كورونا</div>
                  <div className="result-value" style={{ fontSize: '1.5rem' }}>
                    +{Math.round((currentPrice - 230) / 230 * 100)}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="content-section">
              <h2>تاريخ أسعار الذهب عالمياً</h2>
              <p>
                تاريخ أسعار الذهب يعكس الأحداث الاقتصادية والسياسية الكبرى. 
                منذ تحرير سعر الذهب عام 1971، شهد المعدن الأصفر تقلبات كبيرة 
                لكنه حافظ على اتجاه صاعد على المدى الطويل.
              </p>

              <h2>أهم المحطات في تاريخ الذهب</h2>
              
              <h3>السبعينيات - نهاية نظام بريتون وودز</h3>
              <p>
                عام 1971، فك الرئيس نيكسون ارتباط الدولار بالذهب. 
                ارتفع سعر الأونصة من 35$ إلى 850$ بحلول 1980 بسبب التضخم والأزمات النفطية.
              </p>

              <h3>2008 - الأزمة المالية العالمية</h3>
              <p>
                انهيار البنوك والأسواق دفع المستثمرين للذهب كملاذ آمن. 
                ارتفع السعر من 700$ إلى 1900$ بحلول 2011.
              </p>

              <h3>2020 - جائحة كورونا</h3>
              <p>
                الإغلاقات العالمية وطباعة النقود رفعت الذهب لمستويات قياسية 
                تجاوزت 2000$ للأونصة لأول مرة.
              </p>

              <h3>2024 - أرقام قياسية جديدة</h3>
              <p>
                التضخم المستمر، توترات الشرق الأوسط، ومشتريات البنوك المركزية 
                دفعت الذهب لتجاوز 2400$ للأونصة.
              </p>

              <h2>العوامل المؤثرة في سعر الذهب</h2>
              <ul>
                <li><strong>الدولار الأمريكي:</strong> علاقة عكسية - ضعف الدولار يرفع الذهب</li>
                <li><strong>أسعار الفائدة:</strong> رفع الفائدة يضعف جاذبية الذهب</li>
                <li><strong>التضخم:</strong> ارتفاع التضخم يزيد الطلب على الذهب</li>
                <li><strong>الجيوسياسة:</strong> الحروب والأزمات ترفع الطلب</li>
                <li><strong>البنوك المركزية:</strong> مشترياتها تؤثر بشكل كبير</li>
              </ul>

              <h2>توقعات مستقبل الذهب</h2>
              <p>
                بينما لا أحد يستطيع التنبؤ بدقة، تشير معظم التحليلات إلى:
              </p>
              <ul>
                <li>استمرار الاتجاه الصاعد على المدى الطويل</li>
                <li>تقلبات قصيرة المدى مرتبطة بالأحداث</li>
                <li>دعم من مشتريات البنوك المركزية</li>
                <li>طلب قوي من الأسواق الناشئة</li>
              </ul>

              <InternalLinks links={links} />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <FAQ items={historyFAQ} />
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
