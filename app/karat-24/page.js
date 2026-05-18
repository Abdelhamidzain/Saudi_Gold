import { getPrices, formatRiyadhTime } from '../lib/getPrices';
import { toAr, fmt } from '../lib/gold';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import { GoldCalculator } from '../components/Calculators';
import FAQ from '../components/FAQ';
import Disclaimer from '../components/Disclaimer';
import InternalLinks from '../components/InternalLinks';

export const revalidate = 3600;

export const metadata = {
  title: 'سعر الذهب عيار 24 اليوم في السعودية | سعر الذهب الخالص',
  description: 'سعر الذهب عيار 24 اليوم في السعودية محدث لحظياً. سعر الجرام والأونصة والكيلو للذهب الخالص بالريال السعودي.',
  alternates: {
    canonical: 'https://saudi-gold.com/karat-24',
  },
  keywords: ['سعر الذهب عيار 24', 'سعر جرام الذهب عيار 24', 'ذهب خالص', 'سعر الذهب الخالص'],
};

const karat24FAQ = [
  {
    question: 'كم سعر جرام الذهب عيار 24 اليوم؟',
    answer: 'سعر جرام الذهب عيار 24 يتغير لحظياً. راجع السعر المحدث أعلاه بالريال السعودي.',
  },
  {
    question: 'ما الفرق بين عيار 24 وعيار 21؟',
    answer: 'عيار 24 هو ذهب خالص 99.9%، بينما عيار 21 يحتوي على 87.5% ذهب. عيار 24 أغلى لكنه لين جداً للمجوهرات.',
  },
  {
    question: 'لماذا عيار 24 ليس شائعاً للمجوهرات؟',
    answer: 'لأنه لين جداً وسهل الخدش والتشوه. يُستخدم أساساً للسبائك والعملات الذهبية.',
  },
  {
    question: 'هل عيار 24 أفضل للاستثمار؟',
    answer: 'نعم، عيار 24 والسبائك هما الأفضل للاستثمار لأن قيمتها مرتبطة مباشرة بسعر الذهب العالمي.',
  },
  {
    question: 'كيف أعرف أن الذهب عيار 24 أصلي؟',
    answer: 'ابحث عن ختم 24K أو 999 على القطعة. السبائك الأصلية تحمل رقم تسلسلي وشهادة.',
  },
  {
    question: 'أين أجد ذهب عيار 24 في السعودية؟',
    answer: 'يتوفر في محلات الذهب الكبرى والبنوك السعودية على شكل سبائك وعملات ذهبية.',
  },
  {
    question: 'هل يوجد مجوهرات عيار 24؟',
    answer: 'نادراً جداً. بعض المجوهرات الهندية والتايلاندية تصنع من عيار 24 لكنها هشة وتحتاج عناية خاصة.',
  },
  {
    question: 'ما سعر أونصة الذهب عيار 24؟',
    answer: 'الأونصة تساوي 31.1 جرام. راجع جدول الأسعار أعلاه لسعر الأونصة المحدث.',
  },
];

const links = [
  { href: '/', label: 'سعر الذهب اليوم', icon: '🪙' },
  { href: '/gold-bars', label: 'سبائك الذهب', icon: '🧱' },
  { href: '/ounce', label: 'سعر الأونصة', icon: '⚖️' },
  { href: '/karat-21', label: 'سعر عيار 21', icon: '🥇' },
];

export default async function Karat24Page() {
  const { prices, updatedAt } = await getPrices();
  const formattedTime = formatRiyadhTime(updatedAt);
  const price24 = prices[24];

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'سعر الذهب عيار 24 اليوم في السعودية',
    url: 'https://saudi-gold.com/karat-24',
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
            { name: 'سعر الذهب عيار 24' },
          ]} />
        </div>

        <section className="hero">
          <div className="container">
            <div className="badge">
              <span className="live-dot"></span>
              <span>سعر محدث لحظياً</span>
            </div>

            <h1>سعر الذهب <span className="text-gold">عيار ٢٤</span> اليوم في السعودية</h1>
            <p className="hero-subtitle">
              سعر الذهب عيار 24 اليوم هو سعر الذهب الخالص (نقاوة 99.9%) المستخدم للسبائك والاستثمار
            </p>

            <div className="main-price-box">
              <div className="main-price-label">سعر جرام الذهب الخالص عيار ٢٤</div>
              <div className="main-price-value">
                <span>{fmt(price24?.gram)}</span>
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
                <h2>📊 جدول أسعار الذهب عيار 24</h2>
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
                      <td>سعر جرام الذهب عيار 24</td>
                      <td>{fmt(price24?.gram)}</td>
                      <td>{fmt(price24?.gram / 3.75)}</td>
                    </tr>
                    <tr>
                      <td>سعر 10 جرام عيار 24</td>
                      <td>{fmt(price24?.gram * 10)}</td>
                      <td>{fmt((price24?.gram * 10) / 3.75)}</td>
                    </tr>
                    <tr>
                      <td>سعر 50 جرام عيار 24</td>
                      <td>{fmt(price24?.gram * 50)}</td>
                      <td>{fmt((price24?.gram * 50) / 3.75)}</td>
                    </tr>
                    <tr>
                      <td>سعر 100 جرام عيار 24</td>
                      <td>{fmt(price24?.gram * 100)}</td>
                      <td>{fmt((price24?.gram * 100) / 3.75)}</td>
                    </tr>
                    <tr>
                      <td>سعر أونصة الذهب عيار 24</td>
                      <td>{fmt(price24?.ounce)}</td>
                      <td>{fmt(price24?.ounce / 3.75)}</td>
                    </tr>
                    <tr>
                      <td>سعر كيلو الذهب عيار 24</td>
                      <td>{fmt(price24?.kilo)}</td>
                      <td>{fmt(price24?.kilo / 3.75)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">🧮 حاسبة الذهب عيار ٢٤</h2>
            <div style={{ maxWidth: '500px', margin: '0 auto' }}>
              <GoldCalculator prices={prices} />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="content-section">
              <h2>سعر الذهب عيار 24 اليوم</h2>
              <p>
                سعر الذهب عيار 24 اليوم في السعودية يمثل سعر الذهب الخالص بنقاوة 99.9%. 
                هذا العيار هو المرجع الأساسي لجميع العيارات الأخرى، حيث تُحسب أسعارها 
                كنسبة من سعر عيار 24.
              </p>

              <h2>استخدامات الذهب عيار 24</h2>
              <h3>السبائك الذهبية</h3>
              <p>
                الاستخدام الأساسي لعيار 24 هو السبائك الذهبية بمختلف أحجامها من 1 جرام 
                حتى 1 كيلو. السبائك هي الخيار الأمثل للاستثمار في الذهب.
              </p>

              <h3>العملات الذهبية</h3>
              <p>
                العملات الذهبية الاستثمارية مثل الجنيه الذهب والكروجراند والمابل ليف 
                تُسك من عيار 24 أو قريب منه.
              </p>

              <h3>الاحتياطيات المركزية</h3>
              <p>
                البنوك المركزية حول العالم تحتفظ باحتياطياتها من الذهب الخالص عيار 24.
              </p>

              <h2>لماذا عيار 24 ليس للمجوهرات؟</h2>
              <p>
                الذهب الخالص لين جداً ويسهل خدشه وتشويهه. لذلك يُخلط مع معادن أخرى 
                (كالنحاس والفضة) لتصنيع المجوهرات بعيارات 21 و 22 و 18 التي توفر 
                المتانة المطلوبة مع الحفاظ على الجمال.
              </p>

              <InternalLinks links={links} />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <FAQ items={karat24FAQ} />
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
