import { getPrices, formatRiyadhTime } from '../lib/getPrices';
import { toAr, fmt, KARATS, NISAB } from '../lib/gold';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import { ZakatCalculator } from '../components/Calculators';
import FAQ from '../components/FAQ';
import Disclaimer from '../components/Disclaimer';
import InternalLinks from '../components/InternalLinks';

export const revalidate = 60;

export const metadata = {
  title: 'حاسبة زكاة الذهب | احسب زكاة ذهبك بسهولة',
  description: 'حاسبة زكاة الذهب السعودية. أدخل وزن ذهبك لحساب الزكاة المستحقة. النصاب 85 جرام ذهب خالص والزكاة 2.5%.',
  keywords: ['زكاة الذهب', 'حاسبة زكاة الذهب', 'حساب زكاة الذهب', 'نصاب الذهب'],
};

const zakatFAQ = [
  {
    question: 'ما هو نصاب زكاة الذهب؟',
    answer: 'نصاب زكاة الذهب هو 85 جرام من الذهب الخالص (عيار 24). إذا كان ذهبك من عيار آخر، يُحسب النصاب بناءً على الذهب الصافي فيه.',
  },
  {
    question: 'كم نسبة زكاة الذهب؟',
    answer: 'نسبة زكاة الذهب هي 2.5% من قيمة الذهب السوقية إذا بلغ النصاب ومر عليه حول هجري كامل.',
  },
  {
    question: 'هل تجب الزكاة على ذهب الزينة؟',
    answer: 'اختلف الفقهاء في ذلك. جمهور الفقهاء يرون عدم وجوب الزكاة على الحلي المعدة للاستعمال، بينما يرى الحنفية وجوبها. الأحوط إخراجها.',
  },
  {
    question: 'متى يجب إخراج زكاة الذهب؟',
    answer: 'تجب الزكاة بعد مرور سنة هجرية كاملة (حول) على امتلاك الذهب البالغ للنصاب.',
  },
  {
    question: 'كيف أحسب زكاة ذهب متعدد العيارات؟',
    answer: 'احسب الوزن الصافي لكل عيار (الوزن × نسبة النقاوة)، ثم اجمع الأوزان الصافية. إذا بلغ المجموع 85 جرام فأكثر، تجب الزكاة.',
  },
  {
    question: 'هل تُحسب الزكاة على الذهب المكسور؟',
    answer: 'نعم، الذهب المكسور أو غير الصالح للاستعمال تجب فيه الزكاة إذا بلغ النصاب ومر عليه الحول.',
  },
  {
    question: 'هل يجوز إخراج زكاة الذهب ذهباً؟',
    answer: 'يجوز إخراج الزكاة ذهباً أو نقداً (قيمة الذهب). إخراجها نقداً أسهل للمستحقين في الغالب.',
  },
  {
    question: 'ما حكم تأخير زكاة الذهب؟',
    answer: 'لا يجوز تأخير الزكاة بعد وجوبها إلا لعذر. يجب المبادرة بإخراجها عند تمام الحول.',
  },
];

const links = [
  { href: '/', label: 'سعر الذهب اليوم', icon: '🪙' },
  { href: '/calculator', label: 'حاسبة سعر الذهب', icon: '🧮' },
  { href: '/karat-24', label: 'سعر الذهب عيار 24', icon: '💎' },
];

export default async function ZakatPage() {
  const { prices, updatedAt } = await getPrices();
  const formattedTime = formatRiyadhTime(updatedAt);
  const gram24 = prices[24]?.gram || 0;
  const nisabValue = NISAB * gram24;

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'حاسبة زكاة الذهب',
    url: 'https://saudi-gold.com/zakat',
    dateModified: updatedAt || new Date().toISOString(),
  };

  // SoftwareApplication Schema للحاسبة
  const calculatorSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'حاسبة زكاة الذهب',
    description: 'أداة إلكترونية لحساب زكاة الذهب المستحقة بناءً على الوزن والعيار والأسعار الحالية',
    url: 'https://saudi-gold.com/zakat',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web Browser',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'SAR' },
    featureList: ['حساب الزكاة لجميع العيارات', 'التحقق من بلوغ النصاب', 'أسعار محدثة لحظياً'],
  };

  // HowTo Schema لكيفية حساب الزكاة
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'كيفية حساب زكاة الذهب',
    description: 'خطوات حساب زكاة الذهب الواجبة شرعاً',
    totalTime: 'PT2M',
    step: [
      { '@type': 'HowToStep', position: 1, name: 'وزن الذهب', text: 'قم بوزن الذهب الذي تملكه بالجرامات' },
      { '@type': 'HowToStep', position: 2, name: 'تحديد العيار', text: 'حدد عيار الذهب (21، 22، 24، 18)' },
      { '@type': 'HowToStep', position: 3, name: 'حساب الذهب الخالص', text: 'احسب وزن الذهب الخالص بضرب الوزن في نسبة النقاوة' },
      { '@type': 'HowToStep', position: 4, name: 'التحقق من النصاب', text: 'تأكد أن الذهب الخالص يبلغ 85 جرام أو أكثر' },
      { '@type': 'HowToStep', position: 5, name: 'حساب الزكاة', text: 'اضرب القيمة في 2.5% للحصول على مبلغ الزكاة' },
    ],
  };

  // حساب نصاب كل عيار
  const nisabByKarat = {
    24: 85,
    22: Math.ceil(85 / 0.9167),
    21: Math.ceil(85 / 0.875),
    18: Math.ceil(85 / 0.75),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      
      <Header />

      <main>
        <div className="container">
          <Breadcrumb items={[
            { name: 'الرئيسية', href: '/' },
            { name: 'زكاة الذهب' },
          ]} />
        </div>

        {/* Hero */}
        <section className="hero">
          <div className="container">
            <h1>حاسبة <span className="text-gold">زكاة الذهب</span></h1>
            <p className="hero-subtitle">
              حاسبة زكاة الذهب تساعدك في حساب الزكاة المستحقة على ذهبك بناءً على الأسعار الحالية
            </p>

            <div className="main-price-box">
              <div className="main-price-label">قيمة النصاب اليوم (85 جرام ذهب خالص)</div>
              <div className="main-price-value">
                <span>{fmt(nisabValue, 0)}</span>
                <span className="main-price-currency">ر.س</span>
              </div>
              <div className="last-update">بناءً على سعر الذهب: {formattedTime}</div>
            </div>
          </div>
        </section>

        {/* Calculator */}
        <section className="section">
          <div className="container">
            <h2 className="section-title">🕌 احسب زكاة ذهبك</h2>
            <div style={{ maxWidth: '500px', margin: '0 auto' }}>
              <ZakatCalculator prices={prices} />
            </div>
          </div>
        </section>

        {/* Nisab Table */}
        <section className="section">
          <div className="container">
            <div className="table-section">
              <div className="table-header">
                <h2>📊 نصاب الذهب لكل عيار</h2>
              </div>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>العيار</th>
                      <th>النصاب (جرام)</th>
                      <th>قيمة النصاب (ر.س)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(nisabByKarat).map(([karat, nisab]) => (
                      <tr key={karat}>
                        <td>
                          <span className="karat-badge">{toAr(karat)}K</span>
                          عيار {toAr(karat)}
                        </td>
                        <td>{toAr(nisab)} جرام</td>
                        <td>{fmt(nisab * prices[karat]?.gram, 0)} ر.س</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="section">
          <div className="container">
            <div className="content-section">
              <h2>زكاة الذهب في الإسلام</h2>
              <p>
                زكاة الذهب فريضة على كل مسلم يملك نصاب الذهب وحال عليه الحول. 
                النصاب هو 85 جرام من الذهب الخالص (عيار 24)، ونسبة الزكاة 2.5% 
                من قيمة الذهب السوقية.
              </p>

              <h2>شروط وجوب زكاة الذهب</h2>
              <ol>
                <li><strong>بلوغ النصاب:</strong> أن يبلغ الذهب 85 جرام ذهب خالص أو ما يعادله</li>
                <li><strong>مرور الحول:</strong> أن يمر على ملكية الذهب سنة هجرية كاملة</li>
                <li><strong>الملكية التامة:</strong> أن يكون الذهب مملوكاً ملكاً تاماً</li>
                <li><strong>الفضل عن الحاجات الأساسية:</strong> أن يكون الذهب فائضاً عن الحاجة</li>
              </ol>

              <h2>كيفية حساب زكاة الذهب</h2>
              <h3>الخطوة الأولى: حساب الوزن الصافي</h3>
              <p>
                إذا كان ذهبك من عيار غير 24، احسب الوزن الصافي بضرب الوزن في نسبة النقاوة:
              </p>
              <ul>
                <li>عيار 21: الوزن × 0.875</li>
                <li>عيار 22: الوزن × 0.9167</li>
                <li>عيار 18: الوزن × 0.75</li>
              </ul>

              <h3>الخطوة الثانية: التحقق من النصاب</h3>
              <p>
                إذا كان الوزن الصافي 85 جرام أو أكثر، تجب الزكاة.
              </p>

              <h3>الخطوة الثالثة: حساب مبلغ الزكاة</h3>
              <p>
                الزكاة = الوزن الصافي × سعر جرام عيار 24 × 2.5%
              </p>

              <h2>مسائل مهمة في زكاة الذهب</h2>
              <h3>زكاة ذهب الزينة</h3>
              <p>
                اختلف الفقهاء في زكاة الحلي المعدة للاستعمال. الجمهور (المالكية والشافعية والحنابلة) 
                يرون عدم وجوب الزكاة فيها، بينما يرى الحنفية وجوبها. الأحوط والأفضل إخراجها.
              </p>

              <h3>الذهب المختلط بغيره</h3>
              <p>
                إذا كان الذهب مختلطاً بمعادن أخرى (كالمجوهرات المرصعة)، 
                تُحسب الزكاة على وزن الذهب الصافي فقط دون الأحجار والمعادن الأخرى.
              </p>

              <InternalLinks links={links} />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section">
          <div className="container">
            <FAQ items={zakatFAQ} />
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
