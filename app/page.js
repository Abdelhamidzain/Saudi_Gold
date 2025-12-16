import { getPrices, formatRiyadhTime } from './lib/getPrices';
import { toAr, fmt, KARATS, GOLD_MARKETS } from './lib/gold';
import Header from './components/Header';
import Footer from './components/Footer';
import PriceCards from './components/PriceCards';
import PriceTable from './components/PriceTable';
import { GoldCalculator, ZakatCalculator } from './components/Calculators';
import FAQ from './components/FAQ';
import Disclaimer from './components/Disclaimer';
import InternalLinks from './components/InternalLinks';
import Link from 'next/link';

export const revalidate = 60;

// Homepage FAQ
const homeFAQ = [
  {
    question: 'كم سعر الذهب اليوم في السعودية؟',
    answer: 'سعر الذهب اليوم في السعودية يتغير لحظياً حسب البورصة العالمية. راجع الجدول أعلاه للأسعار المحدثة لجميع العيارات بالريال السعودي.',
  },
  {
    question: 'ما هو أفضل عيار ذهب للشراء في السعودية؟',
    answer: 'عيار 21 هو الأكثر شيوعاً في السعودية للمجوهرات لتوازنه بين النقاوة والمتانة. أما للاستثمار، فعيار 24 أو السبائك هي الخيار الأفضل.',
  },
  {
    question: 'كم مصنعية الذهب في السعودية؟',
    answer: 'تتراوح مصنعية الذهب في السعودية بين 15-50 ريال للجرام حسب نوع المشغولات ودرجة تعقيدها والعلامة التجارية.',
  },
  {
    question: 'كيف أحسب سعر قطعة ذهب؟',
    answer: 'السعر = (الوزن × سعر الجرام) + (الوزن × المصنعية) + ضريبة 15%. استخدم حاسبة الذهب أعلاه للحساب التلقائي.',
  },
  {
    question: 'متى تجب زكاة الذهب؟',
    answer: 'تجب زكاة الذهب إذا بلغ النصاب (85 جرام ذهب خالص) ومر عليه حول هجري كامل. نسبة الزكاة 2.5% من قيمة الذهب.',
  },
  {
    question: 'هل سعر الذهب موحد في جميع المحلات؟',
    answer: 'سعر الجرام الخام متقارب بين المحلات، لكن السعر النهائي يختلف بسبب اختلاف المصنعية وهامش الربح. ننصح بمقارنة الأسعار قبل الشراء.',
  },
  {
    question: 'كم سعر سبيكة ذهب 100 جرام في السعودية؟',
    answer: 'سعر سبيكة 100 جرام = سعر جرام عيار 24 × 100 + هامش ربح (1-3%). راجع صفحة سبائك الذهب للأسعار المحدثة.',
  },
  {
    question: 'أين أجد أرخص أسعار الذهب في السعودية؟',
    answer: 'الأسواق الشعبية مثل سوق الثميري بالرياض وسوق البلد بجدة تقدم أسعاراً تنافسية. تفاوض دائماً على المصنعية للحصول على أفضل سعر.',
  },
];

// Internal Links
const homeLinks = [
  { href: '/عيار-21', label: 'سعر الذهب عيار 21', icon: '🥇' },
  { href: '/عيار-24', label: 'سعر الذهب عيار 24', icon: '💎' },
  { href: '/سبائك-الذهب', label: 'أسعار سبائك الذهب', icon: '🧱' },
  { href: '/مصنعية-الذهب', label: 'مصنعية الذهب', icon: '🔧' },
  { href: '/اسواق-الذهب', label: 'أسواق الذهب', icon: '🏪' },
];

// WebPage Schema
function getPageSchema(updatedAt) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'سعر الذهب اليوم في السعودية',
    description: 'سعر الذهب اليوم في السعودية محدث لحظياً بالريال السعودي',
    url: 'https://saudi-gold.vercel.app/',
    dateModified: updatedAt || new Date().toISOString(),
    inLanguage: 'ar',
    isPartOf: {
      '@type': 'WebSite',
      name: 'سعودي قولد',
      url: 'https://saudi-gold.vercel.app/',
    },
  };
}

export default async function Home() {
  const { prices, updatedAt } = await getPrices();
  const formattedTime = formatRiyadhTime(updatedAt);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getPageSchema(updatedAt)) }}
      />
      
      <Header />

      <main>
        {/* Hero Section */}
        <section className="hero" id="prices">
          <div className="container">
            <div className="badge">
              <span className="live-dot" aria-hidden="true"></span>
              <span>أسعار محدثة من البورصة العالمية</span>
            </div>

            <h1>سعر <span className="text-gold">الذهب</span> اليوم في السعودية</h1>
            <p className="hero-subtitle">
              سعر جرام الذهب عيار ٢١ اليوم في السعودية محدث لحظياً بالريال السعودي مع حاسبة الذهب وحاسبة الزكاة
            </p>

            {/* Main Price Box */}
            <div className="main-price-box">
              <div className="main-price-label">سعر جرام الذهب عيار ٢١ في السعودية</div>
              <div className="main-price-value">
                <span>{fmt(prices[21]?.gram)}</span>
                <span className="main-price-currency">ر.س</span>
              </div>
              <div className="last-update">آخر تحديث: {formattedTime}</div>
            </div>

            {/* Price Cards */}
            <PriceCards prices={prices} highlightKarat={21} />

            {/* Internal Links */}
            <InternalLinks links={homeLinks} />
          </div>
        </section>

        {/* Price Table */}
        <section className="section" id="table">
          <div className="container">
            <PriceTable prices={prices} />
          </div>
        </section>

        {/* Calculators */}
        <section className="section" id="calc">
          <div className="container">
            <h2 className="section-title">🧮 أدوات حساب <span className="text-gold">الذهب</span></h2>
            <div className="calc-grid">
              <GoldCalculator prices={prices} />
              <ZakatCalculator prices={prices} />
            </div>
          </div>
        </section>

        {/* Markets */}
        <section className="section" id="markets">
          <div className="container">
            <h2 className="section-title">🏪 أسواق <span className="text-gold">الذهب</span> في السعودية</h2>
            <div className="markets-grid">
              {GOLD_MARKETS.map((market, i) => (
                <article key={i} className="market-card">
                  <div className="market-header">
                    <div className="market-icon" aria-hidden="true">{market.icon}</div>
                    <div>
                      <h3 className="market-name">{market.name}</h3>
                      <div className="market-location">{market.city}</div>
                    </div>
                  </div>
                  <div className="market-tags">
                    {market.tags.map((tag, j) => (
                      <span key={j} className="market-tag">{tag}</span>
                    ))}
                  </div>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(market.name + ' ' + market.city)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="market-link"
                  >
                    📍 عرض على الخريطة
                  </a>
                </article>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/اسواق-الذهب" className="btn btn-outline">
                عرض جميع الأسواق ←
              </Link>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="section">
          <div className="container">
            <div className="info-section">
              <h2>ℹ️ عن أسعار الذهب في السعودية</h2>
              <p>
                سعر الذهب اليوم في السعودية يتحدد بناءً على السعر العالمي للأونصة 
                مضافاً إليه سعر صرف الدولار مقابل الريال السعودي. الأسعار المعروضة 
                هي أسعار السبوت (Spot Price) وقد يختلف السعر الفعلي في المحلات 
                بإضافة المصنعية وضريبة القيمة المضافة.
              </p>
              <p>
                يتأثر سعر الذهب بعدة عوامل منها: الطلب العالمي على الذهب، 
                أسعار الفائدة، التضخم، الأحداث الجيوسياسية، وحركة الدولار الأمريكي.
                عيار 21 هو الأكثر شيوعاً في السعودية للمجوهرات، بينما عيار 24 
                يُستخدم للسبائك والاستثمار.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section">
          <div className="container">
            <FAQ items={homeFAQ} />
          </div>
        </section>

        {/* Disclaimer */}
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
