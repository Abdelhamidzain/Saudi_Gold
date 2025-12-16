import { getPrices, formatRiyadhTime } from '../lib/getPrices';
import { toAr, fmt } from '../lib/gold';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import { GoldCalculator } from '../components/Calculators';
import FAQ from '../components/FAQ';
import Disclaimer from '../components/Disclaimer';
import InternalLinks from '../components/InternalLinks';
import Link from 'next/link';

export const revalidate = 60;

export const metadata = {
  title: 'سعر الذهب عيار 21 اليوم في السعودية | سعر الجرام والأونصة',
  description: 'سعر الذهب عيار 21 اليوم في السعودية محدث لحظياً. سعر الجرام والأونصة والكيلو مع أسعار البيع والشراء بالريال السعودي.',
  keywords: ['سعر الذهب عيار 21', 'سعر جرام الذهب عيار 21', 'ذهب عيار 21', 'سعر الذهب اليوم عيار 21'],
  openGraph: {
    title: 'سعر الذهب عيار 21 اليوم في السعودية',
    description: 'سعر جرام الذهب عيار 21 محدث لحظياً بالريال السعودي',
  },
};

const karat21FAQ = [
  {
    question: 'كم سعر جرام الذهب عيار 21 اليوم؟',
    answer: 'سعر جرام الذهب عيار 21 اليوم يتغير حسب البورصة العالمية. راجع السعر المحدث أعلاه بالريال السعودي.',
  },
  {
    question: 'لماذا عيار 21 هو الأكثر شيوعاً في السعودية؟',
    answer: 'عيار 21 يوفر توازناً مثالياً بين النقاوة (87.5% ذهب خالص) والمتانة، مما يجعله مناسباً للمجوهرات اليومية دون أن يكون لينًا جداً.',
  },
  {
    question: 'ما الفرق بين عيار 21 و عيار 24؟',
    answer: 'عيار 24 هو ذهب خالص 99.9%، بينما عيار 21 يحتوي على 87.5% ذهب. عيار 21 أكثر متانة ومناسب للمجوهرات، وعيار 24 للسبائك والاستثمار.',
  },
  {
    question: 'كم سعر بيع الذهب المستعمل عيار 21؟',
    answer: 'سعر بيع الذهب المستعمل عيار 21 عادة يكون أقل من سعر الشراء بنسبة 5-15% حسب حالة القطعة والمحل.',
  },
  {
    question: 'هل عيار 21 مناسب للاستثمار؟',
    answer: 'للاستثمار طويل المدى، يُفضل عيار 24 أو السبائك لأن قيمتها مرتبطة مباشرة بسعر الذهب العالمي دون تكلفة مصنعية.',
  },
  {
    question: 'كيف أعرف أن الذهب عيار 21 أصلي؟',
    answer: 'ابحث عن ختم 21K أو 875 على القطعة، واطلب فاتورة رسمية. يمكن أيضاً فحصها عند صائغ موثوق.',
  },
  {
    question: 'كم مصنعية عيار 21 في السعودية؟',
    answer: 'تتراوح المصنعية بين 20-40 ريال للجرام حسب نوع المشغولات ودرجة تعقيدها.',
  },
  {
    question: 'هل تجب الزكاة على ذهب عيار 21؟',
    answer: 'نعم، تجب الزكاة إذا بلغ الذهب النصاب (حوالي 97 جرام لعيار 21) ومر عليه حول كامل.',
  },
];

const links = [
  { href: '/', label: 'سعر الذهب اليوم', icon: '🪙' },
  { href: '/عيار-24', label: 'سعر الذهب عيار 24', icon: '💎' },
  { href: '/بيع-وشراء-الذهب', label: 'بيع وشراء الذهب', icon: '💰' },
  { href: '/حاسبة-الذهب', label: 'حاسبة الذهب', icon: '🧮' },
];

export default async function Karat21Page() {
  const { prices, updatedAt } = await getPrices();
  const formattedTime = formatRiyadhTime(updatedAt);
  const price21 = prices[21];

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'سعر الذهب عيار 21 اليوم في السعودية',
    description: 'سعر جرام الذهب عيار 21 محدث لحظياً',
    url: 'https://saudi-gold.vercel.app/عيار-21',
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
            { name: 'سعر الذهب عيار 21' },
          ]} />
        </div>

        {/* Hero */}
        <section className="hero">
          <div className="container">
            <div className="badge">
              <span className="live-dot"></span>
              <span>سعر محدث لحظياً</span>
            </div>

            <h1>سعر الذهب <span className="text-gold">عيار ٢١</span> اليوم في السعودية</h1>
            <p className="hero-subtitle">
              سعر جرام الذهب عيار 21 اليوم في السعودية هو الأكثر بحثاً لكونه العيار الأشهر للمجوهرات
            </p>

            <div className="main-price-box">
              <div className="main-price-label">سعر جرام الذهب عيار ٢١</div>
              <div className="main-price-value">
                <span>{fmt(price21?.gram)}</span>
                <span className="main-price-currency">ر.س</span>
              </div>
              <div className="last-update">آخر تحديث: {formattedTime}</div>
            </div>
          </div>
        </section>

        {/* Price Table */}
        <section className="section">
          <div className="container">
            <div className="table-section">
              <div className="table-header">
                <h2>📊 جدول أسعار الذهب عيار 21</h2>
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
                      <td>سعر جرام الذهب عيار 21</td>
                      <td>{fmt(price21?.gram)}</td>
                      <td>{fmt(price21?.gram / 3.75)}</td>
                    </tr>
                    <tr>
                      <td>سعر 5 جرام عيار 21</td>
                      <td>{fmt(price21?.gram * 5)}</td>
                      <td>{fmt((price21?.gram * 5) / 3.75)}</td>
                    </tr>
                    <tr>
                      <td>سعر 10 جرام عيار 21</td>
                      <td>{fmt(price21?.gram * 10)}</td>
                      <td>{fmt((price21?.gram * 10) / 3.75)}</td>
                    </tr>
                    <tr>
                      <td>سعر 20 جرام عيار 21</td>
                      <td>{fmt(price21?.gram * 20)}</td>
                      <td>{fmt((price21?.gram * 20) / 3.75)}</td>
                    </tr>
                    <tr>
                      <td>سعر 50 جرام عيار 21</td>
                      <td>{fmt(price21?.gram * 50)}</td>
                      <td>{fmt((price21?.gram * 50) / 3.75)}</td>
                    </tr>
                    <tr>
                      <td>سعر أونصة الذهب عيار 21</td>
                      <td>{fmt(price21?.ounce)}</td>
                      <td>{fmt(price21?.ounce / 3.75)}</td>
                    </tr>
                    <tr>
                      <td>سعر كيلو الذهب عيار 21</td>
                      <td>{fmt(price21?.kilo)}</td>
                      <td>{fmt(price21?.kilo / 3.75)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator */}
        <section className="section">
          <div className="container">
            <h2 className="section-title">🧮 حاسبة الذهب عيار ٢١</h2>
            <div style={{ maxWidth: '500px', margin: '0 auto' }}>
              <GoldCalculator prices={prices} />
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="section">
          <div className="container">
            <div className="content-section">
              <h2>سعر الذهب عيار 21 اليوم</h2>
              <p>
                سعر الذهب عيار 21 اليوم في السعودية يُعد من أكثر الأسعار بحثاً نظراً لشعبية 
                هذا العيار في سوق المجوهرات السعودي. يتميز عيار 21 بنقاوة 87.5% من الذهب الخالص، 
                مما يمنحه توازناً مثالياً بين اللمعان والمتانة.
              </p>

              <h2>لماذا عيار 21 هو الأكثر شيوعاً؟</h2>
              <p>
                يفضل السعوديون عيار 21 للمجوهرات لعدة أسباب: المتانة العالية التي تحمي المجوهرات 
                من الخدوش والتشوه، اللون الذهبي الجذاب، والسعر المعقول مقارنة بعيار 24. 
                كما أنه مناسب للارتداء اليومي دون قلق من التلف.
              </p>

              <h3>مقارنة عيار 21 بالعيارات الأخرى</h3>
              <ul>
                <li><strong>عيار 24:</strong> ذهب خالص، لين جداً، يُستخدم للسبائك</li>
                <li><strong>عيار 22:</strong> نقاوة 91.6%، شائع في الخليج والهند</li>
                <li><strong>عيار 21:</strong> نقاوة 87.5%، الأكثر شيوعاً في السعودية</li>
                <li><strong>عيار 18:</strong> نقاوة 75%، للمجوهرات المرصعة بالأحجار</li>
              </ul>

              <h2>سعر بيع وشراء الذهب عيار 21</h2>
              <p>
                عند شراء الذهب عيار 21، يُضاف على سعر الجرام تكلفة المصنعية وضريبة القيمة المضافة. 
                أما عند البيع، فعادة يكون السعر أقل من سعر الشراء بنسبة 5-15% حسب المحل وحالة القطعة.
              </p>

              <InternalLinks links={links} />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section">
          <div className="container">
            <FAQ items={karat21FAQ} />
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
