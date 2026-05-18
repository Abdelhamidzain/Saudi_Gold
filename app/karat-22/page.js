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
  title: 'سعر الذهب عيار 22 اليوم في السعودية | سعر الجرام والأونصة',
  description: 'سعر الذهب عيار 22 اليوم في السعودية محدث لحظياً. سعر الجرام والأونصة بالريال السعودي مع حاسبة الذهب.',
  alternates: {
    canonical: 'https://saudi-gold.com/karat-22',
  },
  keywords: ['سعر الذهب عيار 22', 'سعر جرام الذهب عيار 22', 'ذهب عيار 22', 'سعر الذهب اليوم عيار 22'],
};

const karat22FAQ = [
  {
    question: 'كم سعر جرام الذهب عيار 22 اليوم؟',
    answer: 'سعر جرام الذهب عيار 22 يتغير لحظياً. راجع السعر المحدث أعلاه بالريال السعودي.',
  },
  {
    question: 'لماذا عيار 22 ليس شائعاً في السعودية؟',
    answer: 'عيار 21 هو الأكثر شيوعاً في السعودية للمجوهرات. عيار 22 أكثر شيوعاً في الهند والإمارات والكويت.',
  },
  {
    question: 'ما الفرق بين عيار 22 وعيار 21؟',
    answer: 'عيار 22 يحتوي 91.6% ذهب (أعلى)، بينما عيار 21 يحتوي 87.5%. عيار 22 أغلى قليلاً لكنه ألين.',
  },
  {
    question: 'هل عيار 22 أفضل من عيار 21؟',
    answer: 'يعتمد على الاستخدام. عيار 22 أنقى لكن عيار 21 أكثر متانة ومناسب للارتداء اليومي.',
  },
  {
    question: 'أين أجد ذهب عيار 22 في السعودية؟',
    answer: 'يتوفر في بعض محلات الذهب، خاصة المتخصصة في المشغولات الهندية والخليجية.',
  },
  {
    question: 'كيف أعرف أن الذهب عيار 22 أصلي؟',
    answer: 'ابحث عن ختم 22K أو 916 على القطعة، واطلب فاتورة رسمية من المحل.',
  },
  {
    question: 'هل تجب الزكاة على ذهب عيار 22؟',
    answer: 'نعم، تجب الزكاة إذا بلغ النصاب (حوالي 93 جرام لعيار 22) ومر عليه حول كامل.',
  },
  {
    question: 'ما هو ختم عيار 22؟',
    answer: 'ختم عيار 22 هو "22K" أو "916" (يعني 916 جزء من 1000 ذهب خالص).',
  },
];

const links = [
  { href: '/', label: 'سعر الذهب اليوم', icon: '🪙' },
  { href: '/karat-21', label: 'سعر عيار 21', icon: '🥇' },
  { href: '/karat-24', label: 'سعر عيار 24', icon: '💎' },
  { href: '/calculator', label: 'حاسبة الذهب', icon: '🧮' },
];

export default async function Karat22Page() {
  const { prices, updatedAt } = await getPrices();
  const formattedTime = formatRiyadhTime(updatedAt);
  const price22 = prices[22];

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'سعر الذهب عيار 22 اليوم في السعودية',
    url: 'https://saudi-gold.com/karat-22',
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
            { name: 'سعر الذهب عيار 22' },
          ]} />
        </div>

        <section className="hero">
          <div className="container">
            <div className="badge">
              <span className="live-dot"></span>
              <span>سعر محدث لحظياً</span>
            </div>

            <h1>سعر الذهب <span className="text-gold">عيار ٢٢</span> اليوم في السعودية</h1>
            <p className="hero-subtitle">
              سعر الذهب عيار 22 اليوم في السعودية بنقاوة 91.6% - شائع في الخليج والهند
            </p>

            <div className="main-price-box">
              <div className="main-price-label">سعر جرام الذهب عيار ٢٢</div>
              <div className="main-price-value">
                <span>{fmt(price22?.gram)}</span>
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
                <h2>📊 جدول أسعار الذهب عيار 22</h2>
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
                      <td>سعر جرام الذهب عيار 22</td>
                      <td>{fmt(price22?.gram)}</td>
                      <td>{fmt(price22?.gram / 3.75)}</td>
                    </tr>
                    <tr>
                      <td>سعر 5 جرام عيار 22</td>
                      <td>{fmt(price22?.gram * 5)}</td>
                      <td>{fmt((price22?.gram * 5) / 3.75)}</td>
                    </tr>
                    <tr>
                      <td>سعر 10 جرام عيار 22</td>
                      <td>{fmt(price22?.gram * 10)}</td>
                      <td>{fmt((price22?.gram * 10) / 3.75)}</td>
                    </tr>
                    <tr>
                      <td>سعر 20 جرام عيار 22</td>
                      <td>{fmt(price22?.gram * 20)}</td>
                      <td>{fmt((price22?.gram * 20) / 3.75)}</td>
                    </tr>
                    <tr>
                      <td>سعر أونصة الذهب عيار 22</td>
                      <td>{fmt(price22?.ounce)}</td>
                      <td>{fmt(price22?.ounce / 3.75)}</td>
                    </tr>
                    <tr>
                      <td>سعر كيلو الذهب عيار 22</td>
                      <td>{fmt(price22?.kilo)}</td>
                      <td>{fmt(price22?.kilo / 3.75)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">🧮 حاسبة الذهب عيار ٢٢</h2>
            <div style={{ maxWidth: '500px', margin: '0 auto' }}>
              <GoldCalculator prices={prices} />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="content-section">
              <h2>سعر الذهب عيار 22 اليوم</h2>
              <p>
                سعر الذهب عيار 22 اليوم في السعودية يتميز بنقاوة 91.6% من الذهب الخالص. 
                هذا العيار شائع في دول الخليج والهند وبعض الدول العربية، ويُعرف بختم "916".
              </p>

              <h2>مقارنة عيار 22 بالعيارات الأخرى</h2>
              <ul>
                <li><strong>عيار 24:</strong> 99.9% ذهب - أغلى وألين</li>
                <li><strong>عيار 22:</strong> 91.6% ذهب - توازن جيد</li>
                <li><strong>عيار 21:</strong> 87.5% ذهب - الأشهر في السعودية</li>
                <li><strong>عيار 18:</strong> 75% ذهب - الأكثر متانة</li>
              </ul>

              <h2>متى يُفضل عيار 22؟</h2>
              <p>
                يُفضل عيار 22 عند الرغبة في نقاوة أعلى من عيار 21 مع الحفاظ على متانة 
                معقولة. كما أنه مناسب لمن يبحثون عن مشغولات بأسلوب هندي أو خليجي تقليدي.
              </p>

              <h2>توفر عيار 22 في السعودية</h2>
              <p>
                عيار 22 متوفر في السعودية لكنه أقل شيوعاً من عيار 21. يمكن إيجاده في:
              </p>
              <ul>
                <li>محلات الذهب المتخصصة في المشغولات الهندية</li>
                <li>الأسواق الشعبية الكبرى</li>
                <li>بعض العلامات التجارية الخليجية</li>
              </ul>

              <InternalLinks links={links} />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <FAQ items={karat22FAQ} />
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
