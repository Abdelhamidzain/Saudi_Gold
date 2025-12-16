import { getPrices, formatRiyadhTime } from '../lib/getPrices';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import { GoldCalculator, ZakatCalculator } from '../components/Calculators';
import FAQ from '../components/FAQ';
import Disclaimer from '../components/Disclaimer';
import InternalLinks from '../components/InternalLinks';

export const revalidate = 60;

export const metadata = {
  title: 'حاسبة سعر الذهب بالريال السعودي | احسب قيمة ذهبك',
  description: 'حاسبة سعر الذهب السعودية. احسب قيمة ذهبك بالريال السعودي لجميع العيارات (21، 22، 24، 18) بناءً على الأسعار المحدثة.',
  keywords: ['حاسبة الذهب', 'حساب سعر الذهب', 'حاسبة سعر الذهب', 'حساب قيمة الذهب'],
};

const calculatorFAQ = [
  {
    question: 'كيف تعمل حاسبة الذهب؟',
    answer: 'تحسب الحاسبة قيمة الذهب بضرب الوزن في سعر الجرام للعيار المحدد. السعر يُحدث لحظياً من البورصة العالمية.',
  },
  {
    question: 'هل الحاسبة تشمل المصنعية؟',
    answer: 'لا، الحاسبة تحسب قيمة الذهب الخام فقط. لحساب السعر الكامل، أضف المصنعية وضريبة 15%.',
  },
  {
    question: 'لماذا السعر يختلف عن المحل؟',
    answer: 'سعر الحاسبة هو سعر الذهب الخام. المحلات تضيف المصنعية (15-50 ر.س/جرام) والضريبة (15%).',
  },
  {
    question: 'أي عيار أستخدم لحساب مجوهراتي؟',
    answer: 'ابحث عن الختم على القطعة (21K, 22K, 18K, إلخ). إذا لم تجده، استشر صائغاً لفحصها.',
  },
  {
    question: 'هل يمكن حساب قيمة ذهب متعدد العيارات؟',
    answer: 'نعم، احسب كل عيار على حدة ثم اجمع النتائج.',
  },
  {
    question: 'كم دقة أسعار الحاسبة؟',
    answer: 'الأسعار دقيقة جداً ومحدثة من البورصة العالمية. لكن السعر النهائي يعتمد على المحل والمصنعية.',
  },
  {
    question: 'هل يمكن استخدام الحاسبة لبيع الذهب؟',
    answer: 'نعم، لكن تذكر أن سعر البيع عادة أقل 5-15% من السعر المعروض.',
  },
  {
    question: 'كيف أحسب سعر طقم كامل؟',
    answer: 'اجمع أوزان جميع القطع (بنفس العيار) وأدخل الوزن الإجمالي في الحاسبة.',
  },
];

const links = [
  { href: '/', label: 'سعر الذهب اليوم', icon: '🪙' },
  { href: '/zakat', label: 'حاسبة الزكاة', icon: '🕌' },
  { href: '/workmanship', label: 'المصنعية', icon: '🔧' },
  { href: '/buy-sell', label: 'بيع وشراء', icon: '💰' },
];

export default async function CalculatorPage() {
  const { prices, updatedAt } = await getPrices();
  const formattedTime = formatRiyadhTime(updatedAt);

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'حاسبة سعر الذهب',
    url: 'https://saudi-gold.com/calculator',
    dateModified: updatedAt || new Date().toISOString(),
  };

  // SoftwareApplication Schema للحاسبة
  const calculatorSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'حاسبة سعر الذهب بالريال السعودي',
    description: 'أداة إلكترونية لحساب قيمة الذهب بالريال السعودي لجميع العيارات بناءً على الأسعار المحدثة',
    url: 'https://saudi-gold.com/calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web Browser',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'SAR' },
    featureList: ['حساب قيمة الذهب لجميع العيارات', 'أسعار محدثة لحظياً', 'دعم جميع الأوزان'],
  };

  // Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'خدمة حساب سعر الذهب',
    description: 'خدمة مجانية لحساب قيمة الذهب بالريال السعودي',
    serviceType: 'Gold Calculator',
    provider: { '@type': 'Organization', name: 'سعودي قولد' },
    areaServed: { '@type': 'Country', name: 'المملكة العربية السعودية' },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      
      <Header />

      <main>
        <div className="container">
          <Breadcrumb items={[
            { name: 'الرئيسية', href: '/' },
            { name: 'حاسبة الذهب' },
          ]} />
        </div>

        {/* Hero */}
        <section className="hero">
          <div className="container">
            <h1>حاسبة <span className="text-gold">سعر الذهب</span></h1>
            <p className="hero-subtitle">
              حاسبة سعر الذهب بالريال السعودي لحساب قيمة ذهبك بناءً على الأسعار المحدثة لحظياً
            </p>
            <p className="last-update">آخر تحديث للأسعار: {formattedTime}</p>
          </div>
        </section>

        {/* Calculators */}
        <section className="section">
          <div className="container">
            <div className="calc-grid">
              <GoldCalculator prices={prices} />
              <ZakatCalculator prices={prices} />
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="section">
          <div className="container">
            <div className="content-section">
              <h2>كيفية استخدام حاسبة الذهب</h2>
              <p>
                حاسبة سعر الذهب تساعدك في معرفة قيمة ذهبك بالريال السعودي بناءً على الأسعار 
                المحدثة من البورصة العالمية. اتبع الخطوات التالية:
              </p>
              <ol>
                <li>أدخل وزن الذهب بالجرام</li>
                <li>اختر العيار (21، 22، 24، 18، 14)</li>
                <li>اضغط على "حساب القيمة"</li>
              </ol>

              <h2>فهم نتيجة الحاسبة</h2>
              <p>
                القيمة المعروضة هي سعر الذهب الخام فقط. عند الشراء من المحل، يُضاف:
              </p>
              <ul>
                <li><strong>المصنعية:</strong> 15-50 ر.س للجرام حسب نوع المشغولات</li>
                <li><strong>ضريبة القيمة المضافة:</strong> 15% على الإجمالي</li>
              </ul>

              <h2>نصائح لحساب قيمة ذهبك</h2>
              <ul>
                <li>تأكد من معرفة العيار الصحيح (ابحث عن الختم على القطعة)</li>
                <li>استخدم ميزان دقيق للحصول على الوزن الصحيح</li>
                <li>للمجوهرات المرصعة بالأحجار، احسب وزن الذهب فقط</li>
                <li>قارن النتيجة مع عروض المحلات</li>
              </ul>

              <InternalLinks links={links} />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section">
          <div className="container">
            <FAQ items={calculatorFAQ} />
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
