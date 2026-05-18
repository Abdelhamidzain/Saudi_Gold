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
  title: 'مصنعية الذهب في السعودية | كم تكلفة المصنعية؟',
  description: 'دليل شامل عن مصنعية الذهب في السعودية. تعرف على متوسط تكلفة المصنعية وكيف تحسب سعر المشغولات الذهبية.',
  alternates: {
    canonical: 'https://saudi-gold.com/workmanship',
  },
  keywords: ['مصنعية الذهب', 'مصنعية الذهب في السعودية', 'كم مصنعية الذهب', 'تكلفة المصنعية'],
};

const workmanshipFAQ = [
  {
    question: 'كم مصنعية الذهب في السعودية؟',
    answer: 'تتراوح مصنعية الذهب في السعودية بين 15-50 ريال للجرام حسب نوع المشغولات ودرجة تعقيدها والعلامة التجارية.',
  },
  {
    question: 'هل المصنعية قابلة للتفاوض؟',
    answer: 'نعم، المصنعية قابلة للتفاوض في معظم المحلات، خاصة عند شراء كميات كبيرة أو في الأسواق الشعبية.',
  },
  {
    question: 'لماذا تختلف المصنعية بين المحلات؟',
    answer: 'تختلف المصنعية حسب: نوع القطعة، درجة التعقيد، العلامة التجارية، موقع المحل، وهامش الربح.',
  },
  {
    question: 'هل يمكن استرداد المصنعية عند البيع؟',
    answer: 'لا، المصنعية لا تُسترد عند البيع. يشتري المحل الذهب بسعر الجرام الخام فقط.',
  },
  {
    question: 'أي نوع من المجوهرات له أعلى مصنعية؟',
    answer: 'المجوهرات المرصعة بالأحجار الكريمة والتصاميم المعقدة والماركات العالمية لها أعلى مصنعية.',
  },
  {
    question: 'كيف أتجنب المصنعية العالية؟',
    answer: 'اختر التصاميم البسيطة، تسوق من الأسواق الشعبية، تفاوض على السعر، أو استثمر في السبائك بدلاً من المجوهرات.',
  },
  {
    question: 'هل تشمل المصنعية ضريبة القيمة المضافة؟',
    answer: 'عادة لا. يُضاف 15% ضريبة على السعر الإجمالي (الذهب + المصنعية).',
  },
  {
    question: 'ما الفرق بين المصنعية الإيطالية والسعودية؟',
    answer: 'الذهب الإيطالي عادة له مصنعية أعلى بسبب الماكينات المتقدمة والتصاميم المعقدة.',
  },
];

const links = [
  { href: '/', label: 'سعر الذهب اليوم', icon: '🪙' },
  { href: '/markets', label: 'أسواق الذهب', icon: '🏪' },
  { href: '/buy-sell', label: 'بيع وشراء الذهب', icon: '💰' },
  { href: '/calculator', label: 'حاسبة الذهب', icon: '🧮' },
];

// جدول المصنعية التقريبي
const workmanshipTable = [
  { type: 'خواتم بسيطة', range: '15-25', notes: 'بدون أحجار' },
  { type: 'سلاسل عادية', range: '20-30', notes: 'حسب التصميم' },
  { type: 'أساور', range: '25-35', notes: 'حسب العرض والتعقيد' },
  { type: 'أطقم كاملة', range: '30-40', notes: 'عقد + حلق + سوار + خاتم' },
  { type: 'مجوهرات مرصعة', range: '40-60', notes: 'مع أحجار كريمة' },
  { type: 'ماركات عالمية', range: '50-100+', notes: 'كارتييه، بولغاري، إلخ' },
  { type: 'تصاميم خاصة', range: '60-100+', notes: 'حسب التعقيد' },
];

export default async function WorkmanshipPage() {
  const { prices, updatedAt } = await getPrices();
  const formattedTime = formatRiyadhTime(updatedAt);

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'مصنعية الذهب في السعودية',
    url: 'https://saudi-gold.com/workmanship',
    dateModified: updatedAt || new Date().toISOString(),
  };

  // HowTo Schema لحساب سعر الذهب مع المصنعية
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'كيفية حساب سعر قطعة ذهب مع المصنعية',
    description: 'خطوات حساب السعر النهائي لقطعة ذهب في السعودية',
    totalTime: 'PT3M',
    step: [
      { '@type': 'HowToStep', position: 1, name: 'معرفة سعر الجرام', text: 'تحقق من سعر جرام الذهب للعيار المطلوب' },
      { '@type': 'HowToStep', position: 2, name: 'حساب سعر الذهب الخام', text: 'اضرب وزن القطعة في سعر الجرام' },
      { '@type': 'HowToStep', position: 3, name: 'إضافة المصنعية', text: 'أضف تكلفة المصنعية (15-50 ريال/جرام)' },
      { '@type': 'HowToStep', position: 4, name: 'حساب الضريبة', text: 'أضف 15% ضريبة القيمة المضافة' },
      { '@type': 'HowToStep', position: 5, name: 'السعر النهائي', text: 'الناتج هو السعر النهائي للقطعة' },
    ],
  };

  // Table Schema لجدول المصنعية
  const tableSchema = {
    '@context': 'https://schema.org',
    '@type': 'Table',
    name: 'جدول مصنعية الذهب في السعودية',
    description: 'متوسط تكلفة المصنعية حسب نوع المشغولات الذهبية',
    about: { '@type': 'Thing', name: 'مصنعية الذهب' },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tableSchema) }}
      />
      
      <Header />

      <main>
        <div className="container">
          <Breadcrumb items={[
            { name: 'الرئيسية', href: '/' },
            { name: 'مصنعية الذهب' },
          ]} />
        </div>

        {/* Hero */}
        <section className="hero">
          <div className="container">
            <h1><span className="text-gold">مصنعية الذهب</span> في السعودية</h1>
            <p className="hero-subtitle">
              مصنعية الذهب في السعودية هي تكلفة التصنيع والتشكيل المضافة على سعر جرام الذهب الخام
            </p>
          </div>
        </section>

        {/* Workmanship Table */}
        <section className="section">
          <div className="container">
            <div className="table-section">
              <div className="table-header">
                <h2>📊 جدول مصنعية الذهب التقريبي</h2>
              </div>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>نوع المشغولات</th>
                      <th>المصنعية (ر.س/جرام)</th>
                      <th>ملاحظات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workmanshipTable.map((row, i) => (
                      <tr key={i}>
                        <td>{row.type}</td>
                        <td className="text-gold">{row.range}</td>
                        <td>{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Example */}
        <section className="section">
          <div className="container">
            <div className="info-section">
              <h2>🧮 مثال على حساب سعر قطعة ذهب</h2>
              <p>لنفترض شراء سوار ذهب عيار 21 وزن 15 جرام:</p>
              <ul>
                <li><strong>سعر الجرام عيار 21:</strong> {fmt(prices[21]?.gram)} ر.س</li>
                <li><strong>سعر الذهب الخام:</strong> 15 × {fmt(prices[21]?.gram)} = {fmt(prices[21]?.gram * 15)} ر.س</li>
                <li><strong>المصنعية (30 ر.س/جرام):</strong> 15 × 30 = 450 ر.س</li>
                <li><strong>الإجمالي قبل الضريبة:</strong> {fmt(prices[21]?.gram * 15 + 450)} ر.س</li>
                <li><strong>ضريبة 15%:</strong> {fmt((prices[21]?.gram * 15 + 450) * 0.15)} ر.س</li>
                <li><strong className="text-gold">السعر النهائي:</strong> {fmt((prices[21]?.gram * 15 + 450) * 1.15)} ر.س</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="section">
          <div className="container">
            <div className="content-section">
              <h2>ما هي مصنعية الذهب؟</h2>
              <p>
                مصنعية الذهب في السعودية هي تكلفة التصنيع والتشكيل التي يضيفها الصائغ على سعر 
                جرام الذهب الخام. تختلف المصنعية بشكل كبير حسب نوع القطعة ودرجة تعقيد التصميم 
                ومستوى المحل والعلامة التجارية.
              </p>

              <h2>العوامل المؤثرة في المصنعية</h2>
              <h3>نوع القطعة</h3>
              <p>
                القطع البسيطة كالخواتم الملساء والسلاسل العادية لها مصنعية أقل، 
                بينما الأطقم الكاملة والمجوهرات المعقدة لها مصنعية أعلى.
              </p>

              <h3>درجة التعقيد</h3>
              <p>
                التصاميم المحفورة والمزخرفة والمرصعة بالأحجار تحتاج وقتاً ومهارة أكبر، 
                وبالتالي مصنعية أعلى.
              </p>

              <h3>العلامة التجارية</h3>
              <p>
                الماركات العالمية مثل كارتييه وبولغاري وتيفاني لها مصنعية مرتفعة جداً 
                بسبب قيمة العلامة التجارية والجودة العالية.
              </p>

              <h3>موقع المحل</h3>
              <p>
                محلات المولات والمناطق الراقية عادة أسعارها أعلى من الأسواق الشعبية.
              </p>

              <h2>نصائح للحصول على أفضل سعر</h2>
              <ol>
                <li><strong>قارن الأسعار:</strong> زر عدة محلات قبل الشراء</li>
                <li><strong>تفاوض:</strong> المصنعية قابلة للتفاوض في معظم الأحيان</li>
                <li><strong>اختر التصاميم البسيطة:</strong> مصنعيتها أقل</li>
                <li><strong>تجنب المواسم:</strong> الأعياد والمناسبات ترتفع فيها الأسعار</li>
                <li><strong>اسأل عن المصنعية بوضوح:</strong> بعض المحلات لا تفصلها</li>
              </ol>

              <h2>المصنعية عند البيع</h2>
              <p>
                عند بيع الذهب، لا يمكن استرداد المصنعية. يشتري المحل الذهب بسعر الجرام الخام 
                فقط (وقد يخصم 5-10% إضافية). لذلك، اختر قطعاً بمصنعية معقولة إذا كنت تفكر 
                في البيع مستقبلاً.
              </p>

              <InternalLinks links={links} />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section">
          <div className="container">
            <FAQ items={workmanshipFAQ} />
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
