import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import FAQ from '../components/FAQ';
import Disclaimer from '../components/Disclaimer';
import InternalLinks from '../components/InternalLinks';
import Link from 'next/link';

export const metadata = {
  title: 'أسواق الذهب في السعودية | دليل شامل لأفضل أسواق الذهب',
  description: 'دليل شامل لأسواق الذهب في السعودية: الرياض، جدة، مكة، المدينة، الدمام. أفضل الأماكن للشراء مع النصائح والعناوين.',
  alternates: {
    canonical: 'https://saudi-gold.com/markets',
  },
  keywords: ['أسواق الذهب', 'سوق الذهب الرياض', 'سوق الذهب جدة', 'محلات الذهب', 'أين أشتري ذهب'],
};

// أسواق مفصلة
const markets = [
  {
    city: 'الرياض',
    markets: [
      {
        name: 'سوق الثميري',
        area: 'حي البطحاء',
        description: 'أكبر وأشهر سوق ذهب في الرياض، يضم مئات المحلات بأسعار تنافسية.',
        features: ['تشكيلات متنوعة', 'أسعار تنافسية', 'قابل للتفاوض', 'مواقف سيارات'],
        tips: 'أفضل وقت للزيارة صباحاً لتجنب الازدحام. تفاوض دائماً على المصنعية.',
      },
      {
        name: 'سوق البطحاء',
        area: 'البطحاء',
        description: 'سوق شعبي بأسعار منافسة جداً، يقصده الباحثون عن أفضل الأسعار.',
        features: ['أرخص الأسعار', 'تشكيلة واسعة', 'قابل للتفاوض'],
        tips: 'قارن الأسعار في عدة محلات قبل الشراء.',
      },
      {
        name: 'طيبة مول',
        area: 'طريق الملك عبدالله',
        description: 'مول حديث يضم محلات ذهب راقية من ماركات عالمية ومحلية.',
        features: ['ماركات عالمية', 'بيئة مكيفة', 'مواقف مجانية'],
        tips: 'الأسعار أعلى لكن الجودة مضمونة.',
      },
    ],
  },
  {
    city: 'جدة',
    markets: [
      {
        name: 'سوق الذهب - حي البلد',
        area: 'جدة التاريخية',
        description: 'أقدم وأشهر سوق ذهب في جدة، في قلب المنطقة التاريخية.',
        features: ['تراث عريق', 'محلات كثيرة', 'تصاميم متنوعة', 'قابل للتفاوض'],
        tips: 'زيارة مسائية ممتعة مع أجواء جدة القديمة.',
      },
      {
        name: 'سوق الصيرفي',
        area: 'شارع قابل',
        description: 'يضم مجموعة كبيرة من محلات الصرافة والذهب.',
        features: ['صرافة وذهب', 'موقع مركزي', 'أسعار جيدة'],
        tips: 'يمكنك الصرافة وشراء الذهب في مكان واحد.',
      },
      {
        name: 'رد سي مول',
        area: 'شارع فلسطين',
        description: 'مول راقي يضم محلات ذهب عالمية ومحلية.',
        features: ['ماركات عالمية', 'بيئة فاخرة', 'تصاميم حصرية'],
        tips: 'للباحثين عن الماركات العالمية.',
      },
    ],
  },
  {
    city: 'مكة المكرمة',
    markets: [
      {
        name: 'سوق العتيبية',
        area: 'العتيبية',
        description: 'سوق ذهب شهير قريب من الحرم، يخدم الحجاج والمعتمرين.',
        features: ['قريب من الحرم', 'أسعار منافسة', 'تشكيلات متنوعة'],
        tips: 'تجنب أوقات الذروة في مواسم الحج والعمرة.',
      },
      {
        name: 'أبراج البيت',
        area: 'المنطقة المركزية',
        description: 'محلات ذهب فاخرة في أبراج البيت المطلة على الحرم.',
        features: ['موقع مميز', 'ماركات فاخرة', 'خدمة ممتازة'],
        tips: 'الأسعار مرتفعة نسبياً بسبب الموقع.',
      },
    ],
  },
  {
    city: 'المدينة المنورة',
    markets: [
      {
        name: 'سوق المدينة الدولي',
        area: 'المنطقة المركزية',
        description: 'سوق حديث يضم محلات ذهب متنوعة قريبة من الحرم النبوي.',
        features: ['قريب من الحرم', 'ماركات عالمية', 'تصاميم حديثة'],
        tips: 'يمكنك زيارته بعد الصلاة في الحرم.',
      },
      {
        name: 'سوق قباء',
        area: 'طريق قباء',
        description: 'سوق شعبي بأسعار معقولة ومحلات ذهب متعددة.',
        features: ['أسعار معقولة', 'سهولة الوصول', 'تنوع المحلات'],
        tips: 'خيار جيد للباحثين عن أسعار أفضل.',
      },
    ],
  },
  {
    city: 'الدمام',
    markets: [
      {
        name: 'سوق الذهب - الفيصلية',
        area: 'حي الفيصلية',
        description: 'أشهر سوق ذهب في المنطقة الشرقية.',
        features: ['أسعار تنافسية', 'خدمة ممتازة', 'تشكيلات متنوعة'],
        tips: 'السوق مزدحم في عطلة نهاية الأسبوع.',
      },
      {
        name: 'الراشد مول',
        area: 'طريق الملك فهد',
        description: 'محلات ذهب في أكبر مولات الدمام.',
        features: ['بيئة مكيفة', 'ماركات معروفة', 'سهولة الوصول'],
        tips: 'خيار مريح للعائلات.',
      },
    ],
  },
];

const marketsFAQ = [
  {
    question: 'أين أجد أرخص أسعار الذهب في السعودية؟',
    answer: 'الأسواق الشعبية مثل سوق الثميري والبطحاء بالرياض وسوق البلد بجدة تقدم أسعاراً أقل من المولات.',
  },
  {
    question: 'هل الأسعار موحدة في جميع المحلات؟',
    answer: 'سعر الجرام الخام متقارب، لكن المصنعية تختلف بشكل كبير بين المحلات.',
  },
  {
    question: 'هل يمكن التفاوض على سعر الذهب؟',
    answer: 'نعم، يمكن التفاوض على المصنعية في معظم المحلات، خاصة في الأسواق الشعبية.',
  },
  {
    question: 'ما أفضل وقت لشراء الذهب؟',
    answer: 'صباحاً أيام الأسبوع لتجنب الازدحام. تجنب مواسم الأعياد والمناسبات حيث ترتفع الأسعار.',
  },
  {
    question: 'هل جميع المحلات موثوقة؟',
    answer: 'معظمها موثوق. اشترِ من محلات معروفة واطلب فاتورة رسمية وتحقق من الختم.',
  },
  {
    question: 'هل يوجد ضمان على الذهب؟',
    answer: 'الذهب لا يحتاج ضماناً على المعدن نفسه، لكن بعض المحلات تقدم ضماناً على التصنيع.',
  },
  {
    question: 'كيف أتأكد من صحة العيار؟',
    answer: 'تحقق من ختم العيار على القطعة (21K, 18K, إلخ) واطلب فحصها إذا شككت.',
  },
  {
    question: 'هل يمكن استبدال الذهب؟',
    answer: 'نعم، معظم المحلات تقبل استبدال الذهب القديم بجديد مع دفع فرق المصنعية.',
  },
];

const links = [
  { href: '/', label: 'سعر الذهب اليوم', icon: '🪙' },
  { href: '/buy-sell', label: 'بيع وشراء الذهب', icon: '💰' },
  { href: '/workmanship', label: 'المصنعية', icon: '🔧' },
];

export default function MarketsPage() {
  return (
    <>
      <Header />

      <main>
        <div className="container">
          <Breadcrumb items={[
            { name: 'الرئيسية', href: '/' },
            { name: 'أسواق الذهب' },
          ]} />
        </div>

        <section className="hero">
          <div className="container">
            <h1>أسواق <span className="text-gold">الذهب</span> في السعودية</h1>
            <p className="hero-subtitle">
              دليل شامل لأسواق الذهب في السعودية مع أفضل النصائح للشراء
            </p>
          </div>
        </section>

        {/* Markets by City */}
        {markets.map((city, cityIndex) => (
          <section key={cityIndex} className="section">
            <div className="container">
              <h2 className="section-title">🏙️ أسواق الذهب في {city.city}</h2>
              <div className="markets-grid">
                {city.markets.map((market, marketIndex) => (
                  <article key={marketIndex} className="market-card">
                    <div className="market-header">
                      <div className="market-icon">🪙</div>
                      <div>
                        <h3 className="market-name">{market.name}</h3>
                        <div className="market-location">{market.area}</div>
                      </div>
                    </div>
                    <p style={{ color: 'var(--txt2)', fontSize: '0.9rem', marginBottom: '12px' }}>
                      {market.description}
                    </p>
                    <div className="market-tags">
                      {market.features.map((feature, i) => (
                        <span key={i} className="market-tag">{feature}</span>
                      ))}
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--txt3)', marginTop: '12px' }}>
                      💡 {market.tips}
                    </p>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(market.name + ' ' + city.city)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="market-link"
                      style={{ marginTop: '12px' }}
                    >
                      📍 عرض على الخريطة
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Tips Section */}
        <section className="section">
          <div className="container">
            <div className="content-section">
              <h2>نصائح الشراء من أسواق الذهب</h2>
              
              <h3>قبل الشراء</h3>
              <ol>
                <li>تابع سعر الذهب اليوم قبل الذهاب للسوق</li>
                <li>حدد ميزانيتك والقطع التي تريدها</li>
                <li>زر عدة محلات للمقارنة</li>
              </ol>

              <h3>أثناء الشراء</h3>
              <ol>
                <li>تأكد من ختم العيار على القطعة</li>
                <li>اطلب وزن القطعة أمامك</li>
                <li>اسأل عن المصنعية بشكل منفصل</li>
                <li>تفاوض على المصنعية (خاصة في الأسواق الشعبية)</li>
                <li>اطلب فاتورة رسمية</li>
              </ol>

              <h3>بعد الشراء</h3>
              <ol>
                <li>احتفظ بالفاتورة للاستبدال أو البيع مستقبلاً</li>
                <li>خزّن الذهب في مكان آمن</li>
                <li>تجنب المواد الكيميائية للحفاظ على اللمعان</li>
              </ol>

              <InternalLinks links={links} />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <FAQ items={marketsFAQ} />
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
