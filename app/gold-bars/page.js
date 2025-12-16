import { getPrices, formatRiyadhTime } from '../lib/getPrices';
import { toAr, fmt, BAR_WEIGHTS } from '../lib/gold';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import FAQ from '../components/FAQ';
import Disclaimer from '../components/Disclaimer';
import InternalLinks from '../components/InternalLinks';

export const revalidate = 60;

export const metadata = {
  title: 'أسعار سبائك الذهب في السعودية اليوم | من 1 جرام إلى 1 كيلو',
  description: 'أسعار سبائك الذهب في السعودية محدثة يومياً. جدول أسعار السبائك من 1 جرام حتى 1 كيلو بالريال السعودي مع أفضل أماكن الشراء.',
  keywords: ['سبائك الذهب', 'سعر سبيكة الذهب', 'سعر سبائك الذهب في السعودية', 'سبيكة ذهب 100 جرام'],
};

const barsFAQ = [
  {
    question: 'كم سعر سبيكة الذهب 100 جرام في السعودية؟',
    answer: 'سعر سبيكة 100 جرام = سعر جرام عيار 24 × 100 + هامش ربح صغير (1-3%). راجع الجدول أعلاه للسعر المحدث.',
  },
  {
    question: 'ما أفضل وزن للاستثمار في السبائك؟',
    answer: 'السبائك الأكبر (100 جرام فأكثر) لها هامش ربح أقل، لكن السبائك الصغيرة (10-50 جرام) أسهل في البيع والتسييل.',
  },
  {
    question: 'أين أشتري سبائك الذهب في السعودية؟',
    answer: 'يمكن شراء السبائك من البنوك السعودية (الراجحي، الأهلي)، محلات الذهب المعتمدة، أو شركات الذهب المرخصة.',
  },
  {
    question: 'هل سبائك الذهب عليها ضريبة؟',
    answer: 'نعم، تُطبق ضريبة القيمة المضافة 15% على سبائك الذهب في السعودية.',
  },
  {
    question: 'ما الفرق بين سبائك PAMP والسبائك المحلية؟',
    answer: 'سبائك PAMP السويسرية معترف بها عالمياً وسهلة البيع في أي مكان. السبائك المحلية قد تكون أرخص لكن أقل سيولة.',
  },
  {
    question: 'كيف أتأكد من أصالة السبيكة؟',
    answer: 'السبائك الأصلية تحمل ختم المصنع ورقم تسلسلي وشهادة. اشترِ من مصادر موثوقة واحتفظ بالفاتورة.',
  },
  {
    question: 'هل السبائك أفضل من المجوهرات للاستثمار؟',
    answer: 'نعم، السبائك أفضل للاستثمار لأنها خالية من تكلفة المصنعية العالية وسعرها مرتبط مباشرة بسعر الذهب العالمي.',
  },
  {
    question: 'كم تبلغ زكاة سبائك الذهب؟',
    answer: 'إذا بلغت السبائك 85 جرام فأكثر ومر عليها حول، تجب الزكاة بنسبة 2.5% من قيمتها السوقية.',
  },
];

const links = [
  { href: '/', label: 'سعر الذهب اليوم', icon: '🪙' },
  { href: '/karat-24', label: 'سعر الذهب عيار 24', icon: '💎' },
  { href: '/ounce', label: 'سعر الأونصة', icon: '⚖️' },
  { href: '/zakat', label: 'حاسبة الزكاة', icon: '🕌' },
];

export default async function BarsPage() {
  const { prices, updatedAt } = await getPrices();
  const formattedTime = formatRiyadhTime(updatedAt);
  const gram24 = prices[24]?.gram || 0;

  // حساب أسعار السبائك مع هامش الربح (يجب أن يكون قبل الـ Schema)
  const barPrices = BAR_WEIGHTS.map(weight => {
    let premium = 0.05; // 5% للسبائك الصغيرة
    if (weight >= 100) premium = 0.015;
    else if (weight >= 50) premium = 0.02;
    else if (weight >= 10) premium = 0.03;
    
    const basePrice = gram24 * weight;
    const finalPrice = basePrice * (1 + premium);
    
    return { weight, basePrice, premium, finalPrice };
  });

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'أسعار سبائك الذهب في السعودية',
    url: 'https://saudi-gold.com/gold-bars',
    dateModified: updatedAt || new Date().toISOString(),
  };

  // ItemList Schema للسبائك
  const barsListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'أسعار سبائك الذهب في السعودية',
    description: 'قائمة أسعار سبائك الذهب بجميع الأوزان',
    numberOfItems: barPrices.length,
    itemListElement: barPrices.map((bar, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `سبيكة ذهب ${bar.weight >= 1000 ? (bar.weight / 1000) + ' كيلو' : bar.weight + ' جرام'}`,
      description: `سعر سبيكة الذهب ${bar.weight} جرام: ${bar.finalPrice.toFixed(0)} ريال`,
    })),
  };

  // Product Schema للسبيكة الأشهر (100 جرام)
  const bar100Schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'سبيكة ذهب 100 جرام',
    description: 'سبيكة ذهب خالص عيار 24 وزن 100 جرام - الأكثر شيوعاً للاستثمار',
    brand: { '@type': 'Brand', name: 'PAMP' },
    category: 'سبائك ذهب',
    material: 'Gold 24K',
    weight: { '@type': 'QuantitativeValue', value: '100', unitCode: 'GRM' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'SAR',
      price: (gram24 * 100 * 1.015).toFixed(2),
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(barsListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bar100Schema) }}
      />
      
      <Header />

      <main>
        <div className="container">
          <Breadcrumb items={[
            { name: 'الرئيسية', href: '/' },
            { name: 'سبائك الذهب' },
          ]} />
        </div>

        {/* Hero */}
        <section className="hero">
          <div className="container">
            <div className="badge">
              <span className="live-dot"></span>
              <span>أسعار محدثة يومياً</span>
            </div>

            <h1>أسعار <span className="text-gold">سبائك الذهب</span> في السعودية اليوم</h1>
            <p className="hero-subtitle">
              أسعار سبائك الذهب في السعودية من 1 جرام حتى 1 كيلو محدثة بالريال السعودي
            </p>

            <div className="main-price-box">
              <div className="main-price-label">سعر جرام الذهب الخالص (عيار 24)</div>
              <div className="main-price-value">
                <span>{fmt(gram24)}</span>
                <span className="main-price-currency">ر.س</span>
              </div>
              <div className="last-update">آخر تحديث: {formattedTime}</div>
            </div>
          </div>
        </section>

        {/* Bar Prices Table */}
        <section className="section">
          <div className="container">
            <div className="table-section">
              <div className="table-header">
                <h2>📊 جدول أسعار سبائك الذهب</h2>
              </div>
              <div className="table-wrapper">
                <table className="data-table bar-table">
                  <thead>
                    <tr>
                      <th>الوزن</th>
                      <th>السعر التقريبي (ر.س)</th>
                      <th>السعر ($)</th>
                      <th>الهامش</th>
                    </tr>
                  </thead>
                  <tbody>
                    {barPrices.map((bar) => (
                      <tr key={bar.weight}>
                        <td className="bar-weight">
                          {bar.weight >= 1000 
                            ? `${toAr(bar.weight / 1000)} كيلو`
                            : `${toAr(bar.weight)} جرام`
                          }
                        </td>
                        <td>{fmt(bar.finalPrice, 0)}</td>
                        <td>{fmt(bar.finalPrice / 3.75, 0)}</td>
                        <td>{toAr((bar.premium * 100).toFixed(1))}٪</td>
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
              <h2>سبائك الذهب في السعودية</h2>
              <p>
                سبائك الذهب في السعودية هي الخيار الأمثل للاستثمار في المعدن الأصفر. 
                تتميز السبائك بنقاوة 99.99% (عيار 24) وخلوها من تكلفة المصنعية المرتفعة 
                المرتبطة بالمجوهرات، مما يجعلها استثماراً أكثر كفاءة.
              </p>

              <h2>أنواع سبائك الذهب المتوفرة</h2>
              <h3>سبائك PAMP السويسرية</h3>
              <p>
                تُعد سبائك PAMP من أشهر السبائك عالمياً، وتتميز بالاعتراف الدولي 
                وسهولة البيع في أي مكان في العالم. تأتي مع شهادة أصالة ورقم تسلسلي فريد.
              </p>

              <h3>سبائك البنوك السعودية</h3>
              <p>
                يوفر البنك الأهلي ومصرف الراجحي سبائك ذهب بأوزان مختلفة. 
                تتميز بالموثوقية والفاتورة الرسمية، لكن قد تكون أسعارها أعلى قليلاً.
              </p>

              <h2>أفضل أوزان السبائك للاستثمار</h2>
              <ul>
                <li><strong>سبيكة 1 جرام:</strong> للمبتدئين والهدايا، هامش ربح مرتفع</li>
                <li><strong>سبيكة 10 جرام:</strong> توازن جيد بين السعر والسيولة</li>
                <li><strong>سبيكة 50 جرام:</strong> خيار ممتاز للاستثمار المتوسط</li>
                <li><strong>سبيكة 100 جرام:</strong> الأكثر شيوعاً للاستثمار، هامش منخفض</li>
                <li><strong>سبيكة 1 كيلو:</strong> للاستثمار الكبير، أقل هامش ربح</li>
              </ul>

              <h2>نصائح لشراء السبائك</h2>
              <ol>
                <li>اشترِ من مصدر موثوق (بنك أو شركة مرخصة)</li>
                <li>تحقق من ختم المصنع ورقم التسلسل</li>
                <li>احتفظ بالفاتورة والشهادة</li>
                <li>خزّن السبائك في مكان آمن (خزنة أو صندوق أمانات)</li>
                <li>قارن الأسعار بين عدة مصادر قبل الشراء</li>
              </ol>

              <InternalLinks links={links} />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section">
          <div className="container">
            <FAQ items={barsFAQ} />
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
