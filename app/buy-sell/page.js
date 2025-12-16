import { getPrices, formatRiyadhTime } from '../lib/getPrices';
import { fmt } from '../lib/gold';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import FAQ from '../components/FAQ';
import Disclaimer from '../components/Disclaimer';
import InternalLinks from '../components/InternalLinks';

export const revalidate = 60;

export const metadata = {
  title: 'بيع وشراء الذهب في السعودية | دليل شامل للأسعار والنصائح',
  description: 'دليل شامل لبيع وشراء الذهب في السعودية. أسعار الشراء والبيع، أفضل الأماكن، ونصائح للحصول على أفضل سعر.',
  keywords: ['بيع الذهب', 'شراء الذهب', 'سعر بيع الذهب', 'سعر شراء الذهب', 'بيع ذهب مستعمل'],
};

const buySellFAQ = [
  {
    question: 'كم سعر بيع الذهب المستعمل؟',
    answer: 'سعر بيع الذهب المستعمل عادة أقل من سعر الشراء بـ 5-15% حسب المحل وحالة القطعة.',
  },
  {
    question: 'هل أبيع الذهب للمحل أم للصائغ؟',
    answer: 'كلاهما خيار جيد. قارن الأسعار في عدة أماكن واختر الأعلى. المحلات الكبيرة عادة تقدم أسعاراً أفضل.',
  },
  {
    question: 'هل يمكن بيع الذهب المكسور؟',
    answer: 'نعم، الذهب المكسور يُباع بسعر الجرام الخام حسب العيار. لا تخسر شيئاً من قيمة المعدن.',
  },
  {
    question: 'ما المستندات المطلوبة لبيع الذهب؟',
    answer: 'هوية سارية المفعول. الفاتورة الأصلية ليست ضرورية لكنها قد تساعد في التحقق من العيار.',
  },
  {
    question: 'هل يمكن استرداد المصنعية عند البيع؟',
    answer: 'لا، المصنعية لا تُسترد. لذلك يُفضل شراء قطع بمصنعية معقولة إذا كنت تنوي البيع مستقبلاً.',
  },
  {
    question: 'أفضل وقت لبيع الذهب؟',
    answer: 'عندما يكون سعر الذهب العالمي مرتفعاً. تابع الأسعار وبع عندما ترتفع الأسعار بشكل ملحوظ.',
  },
  {
    question: 'هل البيع للبنوك أفضل؟',
    answer: 'البنوك تشتري السبائك فقط عادة وليس المجوهرات. لبيع المجوهرات، توجه لمحلات الذهب.',
  },
  {
    question: 'كم يستغرق بيع الذهب؟',
    answer: 'البيع فوري. يُوزن الذهب، يُحدد العيار، ويُدفع لك نقداً أو تحويلاً فوراً.',
  },
];

const links = [
  { href: '/', label: 'سعر الذهب اليوم', icon: '🪙' },
  { href: '/markets', label: 'أسواق الذهب', icon: '🏪' },
  { href: '/workmanship', label: 'المصنعية', icon: '🔧' },
  { href: '/calculator', label: 'حاسبة الذهب', icon: '🧮' },
];

export default async function BuySellPage() {
  const { prices, updatedAt } = await getPrices();
  const formattedTime = formatRiyadhTime(updatedAt);

  // أسعار البيع (تقديرية - أقل بـ 5-10%)
  const sellPrices = {
    24: prices[24]?.gram * 0.95,
    22: prices[22]?.gram * 0.95,
    21: prices[21]?.gram * 0.95,
    18: prices[18]?.gram * 0.95,
  };

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'بيع وشراء الذهب في السعودية',
    url: 'https://saudi-gold.com/buy-sell',
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
            { name: 'بيع وشراء الذهب' },
          ]} />
        </div>

        <section className="hero">
          <div className="container">
            <h1>بيع وشراء <span className="text-gold">الذهب</span> في السعودية</h1>
            <p className="hero-subtitle">
              دليلك الشامل لبيع وشراء الذهب في السعودية مع أسعار الشراء والبيع المحدثة
            </p>
            <p className="last-update">آخر تحديث للأسعار: {formattedTime}</p>
          </div>
        </section>

        {/* Buy vs Sell Prices */}
        <section className="section">
          <div className="container">
            <div className="table-section">
              <div className="table-header">
                <h2>📊 مقارنة أسعار الشراء والبيع</h2>
              </div>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>العيار</th>
                      <th>سعر الشراء (ر.س)</th>
                      <th>سعر البيع التقريبي (ر.س)</th>
                      <th>الفرق</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[24, 22, 21, 18].map((k) => (
                      <tr key={k}>
                        <td>
                          <span className="karat-badge">{k}K</span>
                          عيار {k}
                        </td>
                        <td>{fmt(prices[k]?.gram)}</td>
                        <td>{fmt(sellPrices[k])}</td>
                        <td style={{ color: 'var(--red)' }}>-{fmt(prices[k]?.gram - sellPrices[k])}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-center mt-4" style={{ color: 'var(--txt3)', fontSize: '0.85rem' }}>
              * أسعار البيع تقريبية وتختلف بين المحلات. السعر الفعلي قد يكون أعلى أو أقل بـ 2-5%.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="section">
          <div className="container">
            <div className="content-section">
              <h2>بيع وشراء الذهب في السعودية</h2>
              <p>
                سوق الذهب في السعودية من أكبر الأسواق في المنطقة. سواء كنت تريد شراء مجوهرات 
                جديدة أو بيع ذهب قديم، هذا الدليل سيساعدك في الحصول على أفضل صفقة.
              </p>

              <h2>شراء الذهب - نصائح مهمة</h2>
              
              <h3>اختيار المحل المناسب</h3>
              <ul>
                <li>اختر محلات معروفة ولها سمعة جيدة</li>
                <li>الأسواق الشعبية أرخص لكن المولات أكثر راحة</li>
                <li>قارن الأسعار في 3-4 محلات على الأقل</li>
              </ul>

              <h3>التأكد من الجودة</h3>
              <ul>
                <li>تحقق من ختم العيار (21K, 18K, إلخ)</li>
                <li>اطلب وزن القطعة أمامك</li>
                <li>تأكد من وضوح الختم وقراءته</li>
              </ul>

              <h3>التفاوض على السعر</h3>
              <ul>
                <li>سعر الجرام ثابت تقريباً، تفاوض على المصنعية</li>
                <li>اطلب خصماً عند شراء قطع متعددة</li>
                <li>في الأسواق الشعبية، التفاوض متوقع ومقبول</li>
              </ul>

              <h2>بيع الذهب - دليل شامل</h2>

              <h3>تحضير الذهب للبيع</h3>
              <ul>
                <li>نظّف القطع للحصول على مظهر أفضل</li>
                <li>جهّز الفواتير الأصلية إن وجدت</li>
                <li>افصل القطع حسب العيار</li>
              </ul>

              <h3>اختيار مكان البيع</h3>
              <ul>
                <li>زر عدة محلات للحصول على أفضل سعر</li>
                <li>المحلات الكبيرة عادة تقدم أسعاراً أفضل</li>
                <li>تجنب البيع في أوقات انخفاض الأسعار</li>
              </ul>

              <h3>عملية البيع</h3>
              <ol>
                <li>يفحص الصائغ القطعة ويحدد العيار</li>
                <li>يُوزن الذهب بميزان دقيق</li>
                <li>يُحسب السعر بناءً على سعر اليوم</li>
                <li>يُدفع لك المبلغ نقداً أو تحويلاً</li>
              </ol>

              <h2>الفرق بين سعر الشراء والبيع</h2>
              <p>
                عند الشراء، تدفع: سعر الجرام + المصنعية + الضريبة (15%)
                <br />
                عند البيع، تحصل على: سعر الجرام الخام فقط (ناقص 5-10%)
              </p>
              <p>
                لذلك، المصنعية والضريبة هي خسارة عند إعادة البيع. كلما كانت المصنعية أقل، 
                كلما كان الفرق بين سعر الشراء والبيع أقل.
              </p>

              <h2>متى تبيع الذهب؟</h2>
              <ul>
                <li><strong>عند ارتفاع الأسعار:</strong> تابع سعر الذهب العالمي وبع عندما يرتفع</li>
                <li><strong>عند الحاجة للسيولة:</strong> الذهب سهل التسييل ويباع فوراً</li>
                <li><strong>لتجديد المجوهرات:</strong> بع القديم واشترِ جديداً</li>
              </ul>

              <InternalLinks links={links} />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <FAQ items={buySellFAQ} />
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
