import { getPrices, formatRiyadhTime } from '../lib/getPrices';
import { toAr, fmt } from '../lib/gold';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import { GoldCalculator } from '../components/Calculators';
import FAQ from '../components/FAQ';
import Disclaimer from '../components/Disclaimer';
import InternalLinks from '../components/InternalLinks';

export const revalidate = 60;

export const metadata = {
  title: 'سعر الذهب عيار 18 اليوم في السعودية | للمجوهرات الفاخرة',
  description: 'سعر الذهب عيار 18 اليوم في السعودية محدث لحظياً. العيار المفضل للمجوهرات المرصعة والماركات العالمية.',
  alternates: {
    canonical: 'https://saudi-gold.com/karat-18',
  },
  keywords: ['سعر الذهب عيار 18', 'سعر جرام الذهب عيار 18', 'ذهب عيار 18', 'سعر الذهب اليوم عيار 18'],
};

const karat18FAQ = [
  {
    question: 'كم سعر جرام الذهب عيار 18 اليوم؟',
    answer: 'سعر جرام الذهب عيار 18 يتغير لحظياً. راجع السعر المحدث أعلاه بالريال السعودي.',
  },
  {
    question: 'لماذا عيار 18 للمجوهرات الفاخرة؟',
    answer: 'عيار 18 يوفر متانة عالية تسمح بتثبيت الأحجار الكريمة بإحكام، كما يتيح ألواناً متنوعة مثل الذهب الأبيض والوردي.',
  },
  {
    question: 'ما الفرق بين عيار 18 وعيار 21؟',
    answer: 'عيار 18 يحتوي 75% ذهب وهو أكثر متانة، بينما عيار 21 يحتوي 87.5% ذهب وأعلى قيمة.',
  },
  {
    question: 'هل عيار 18 أقل جودة من عيار 21؟',
    answer: 'ليس بالضرورة. عيار 18 أكثر متانة ومناسب للمجوهرات اليومية والمرصعة. الجودة تعتمد على الاستخدام.',
  },
  {
    question: 'لماذا الماركات العالمية تستخدم عيار 18؟',
    answer: 'لأنه يوفر صلابة لتثبيت الأحجار، ويتيح ألواناً متعددة، ومقاوم للخدش للارتداء اليومي.',
  },
  {
    question: 'ما هي ألوان الذهب عيار 18؟',
    answer: 'يتوفر بالذهب الأصفر، الأبيض (مخلوط بالبلاديوم)، والوردي (مخلوط بالنحاس).',
  },
  {
    question: 'كيف أعرف أن الذهب عيار 18 أصلي؟',
    answer: 'ابحث عن ختم 18K أو 750 على القطعة. الرقم 750 يعني 750 جزء من 1000 ذهب.',
  },
  {
    question: 'هل عيار 18 مناسب للاستثمار؟',
    answer: 'للاستثمار، يُفضل عيار 24 أو 21. عيار 18 مصنعيته أعلى وقيمة إعادة البيع أقل.',
  },
];

const links = [
  { href: '/', label: 'سعر الذهب اليوم', icon: '🪙' },
  { href: '/karat-21', label: 'سعر عيار 21', icon: '🥇' },
  { href: '/workmanship', label: 'المصنعية', icon: '🔧' },
  { href: '/calculator', label: 'حاسبة الذهب', icon: '🧮' },
];

export default async function Karat18Page() {
  const { prices, updatedAt } = await getPrices();
  const formattedTime = formatRiyadhTime(updatedAt);
  const price18 = prices[18];

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'سعر الذهب عيار 18 اليوم في السعودية',
    url: 'https://saudi-gold.com/karat-18',
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
            { name: 'سعر الذهب عيار 18' },
          ]} />
        </div>

        <section className="hero">
          <div className="container">
            <div className="badge">
              <span className="live-dot"></span>
              <span>سعر محدث لحظياً</span>
            </div>

            <h1>سعر الذهب <span className="text-gold">عيار ١٨</span> اليوم في السعودية</h1>
            <p className="hero-subtitle">
              سعر الذهب عيار 18 اليوم - العيار المفضل للمجوهرات الفاخرة والماركات العالمية بنقاوة 75%
            </p>

            <div className="main-price-box">
              <div className="main-price-label">سعر جرام الذهب عيار ١٨</div>
              <div className="main-price-value">
                <span>{fmt(price18?.gram)}</span>
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
                <h2>📊 جدول أسعار الذهب عيار 18</h2>
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
                      <td>سعر جرام الذهب عيار 18</td>
                      <td>{fmt(price18?.gram)}</td>
                      <td>{fmt(price18?.gram / 3.75)}</td>
                    </tr>
                    <tr>
                      <td>سعر 5 جرام عيار 18</td>
                      <td>{fmt(price18?.gram * 5)}</td>
                      <td>{fmt((price18?.gram * 5) / 3.75)}</td>
                    </tr>
                    <tr>
                      <td>سعر 10 جرام عيار 18</td>
                      <td>{fmt(price18?.gram * 10)}</td>
                      <td>{fmt((price18?.gram * 10) / 3.75)}</td>
                    </tr>
                    <tr>
                      <td>سعر 20 جرام عيار 18</td>
                      <td>{fmt(price18?.gram * 20)}</td>
                      <td>{fmt((price18?.gram * 20) / 3.75)}</td>
                    </tr>
                    <tr>
                      <td>سعر أونصة الذهب عيار 18</td>
                      <td>{fmt(price18?.ounce)}</td>
                      <td>{fmt(price18?.ounce / 3.75)}</td>
                    </tr>
                    <tr>
                      <td>سعر كيلو الذهب عيار 18</td>
                      <td>{fmt(price18?.kilo)}</td>
                      <td>{fmt(price18?.kilo / 3.75)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">🧮 حاسبة الذهب عيار ١٨</h2>
            <div style={{ maxWidth: '500px', margin: '0 auto' }}>
              <GoldCalculator prices={prices} />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="content-section">
              <h2>سعر الذهب عيار 18 اليوم</h2>
              <p>
                سعر الذهب عيار 18 اليوم في السعودية يعكس قيمة الذهب بنقاوة 75%. 
                هذا العيار هو الخيار المفضل للماركات العالمية والمجوهرات المرصعة بالأحجار الكريمة 
                نظراً لمتانته العالية.
              </p>

              <h2>مميزات الذهب عيار 18</h2>
              <h3>المتانة العالية</h3>
              <p>
                بفضل نسبة المعادن المضافة (25%)، يتميز عيار 18 بصلابة تجعله مقاوماً 
                للخدوش والتشوه، مثالي للارتداء اليومي.
              </p>

              <h3>ألوان متعددة</h3>
              <p>
                يتوفر عيار 18 بألوان متنوعة:
              </p>
              <ul>
                <li><strong>الذهب الأصفر:</strong> اللون التقليدي</li>
                <li><strong>الذهب الأبيض:</strong> مخلوط بالبلاديوم أو النيكل</li>
                <li><strong>الذهب الوردي:</strong> مخلوط بنسبة أعلى من النحاس</li>
              </ul>

              <h3>مثالي للأحجار الكريمة</h3>
              <p>
                صلابة عيار 18 تسمح بتثبيت الألماس والأحجار الكريمة بإحكام دون خوف من تلفها.
              </p>

              <h2>عيار 18 في الماركات العالمية</h2>
              <p>
                معظم الماركات العالمية الفاخرة مثل كارتييه، تيفاني، بولغاري، وفان كليف 
                تستخدم عيار 18 في مجوهراتها لأنه يوفر التوازن المثالي بين الجودة والمتانة.
              </p>

              <InternalLinks links={links} />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <FAQ items={karat18FAQ} />
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
