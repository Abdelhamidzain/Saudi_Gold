import Link from 'next/link';
import { getPrices, formatRiyadhTime } from '../lib/getPrices';
import { toAr, fmt, KARATS, SAUDI_CITIES } from '../lib/gold';
import { getCityGoldSchema, getBreadcrumbSchema, SITE_URL } from '../lib/schema';
import Header from './Header';
import Footer from './Footer';
import Breadcrumb from './Breadcrumb';
import { GoldCalculator } from './Calculators';
import FAQ from './FAQ';
import Disclaimer from './Disclaimer';
import InternalLinks from './InternalLinks';

export default async function CityPage({ citySlug }) {
  const city = SAUDI_CITIES.find(c => c.slug === citySlug);
  if (!city) return <div>المدينة غير موجودة</div>;

  const data = await getPrices();
  const sarPerOunce = data?.sarPerOunce || 0;
  const usdPerOunce = data?.usdPerOunce || 0;
  const gram24SAR = sarPerOunce > 0 ? (sarPerOunce / 31.1035) * 1.02 : 0;

  const prices = {};
  for (const [k, info] of Object.entries(KARATS)) {
    prices[k] = {
      gram: gram24SAR * info.purity,
      ounce: gram24SAR * info.purity * 31.1035,
      kilo: gram24SAR * info.purity * 1000,
    };
  }

  const citySchema = getCityGoldSchema({
    cityNameAr: city.nameAr,
    cityNameEn: city.nameEn,
    url: `/${city.slug}`,
  });

  const breadcrumbItems = [
    { name: 'الرئيسية', href: '/' },
    { name: `سعر الذهب في ${city.nameAr}` },
  ];

  const faqItems = [
    {
      question: `كم سعر الذهب اليوم في ${city.nameAr}؟`,
      answer: `سعر الذهب اليوم في ${city.nameAr} هو نفس السعر العالمي المحول بالريال السعودي. سعر جرام عيار 21 يتغير لحظياً حسب البورصة. راجع الجدول أعلاه للأسعار المحدثة.`,
    },
    {
      question: `أين أفضل مكان لشراء الذهب في ${city.nameAr}؟`,
      answer: `أفضل أماكن شراء الذهب في ${city.nameAr} تشمل: ${city.markets.join('، ')}. ننصح بمقارنة المصنعية بين المحلات.`,
    },
    {
      question: `هل أسعار الذهب في ${city.nameAr} تختلف عن باقي المدن؟`,
      answer: `سعر جرام الذهب الخام موحد في جميع مدن المملكة لأنه مرتبط بالسعر العالمي. الفرق يكون في المصنعية وهامش الربح الذي يختلف من محل لآخر ومن مدينة لأخرى.`,
    },
    {
      question: `كم مصنعية الذهب في ${city.nameAr}؟`,
      answer: `تتراوح مصنعية الذهب في ${city.nameAr} بين 15-50 ريال للجرام حسب نوع المشغولات ودرجة تعقيد التصميم والعلامة التجارية. الأسواق الشعبية عادة أقل مصنعية من المولات.`,
    },
  ];

  const internalLinks = [
    { href: '/karat-21', label: 'سعر الذهب عيار 21', icon: '🥇' },
    { href: '/karat-24', label: 'سعر الذهب عيار 24', icon: '💎' },
    { href: '/gold-bars', label: 'أسعار سبائك الذهب', icon: '🧱' },
    { href: '/calculator', label: 'حاسبة الذهب', icon: '🧮' },
    { href: '/zakat', label: 'حاسبة الزكاة', icon: '🕌' },
    { href: '/markets', label: 'أسواق الذهب', icon: '🏪' },
  ];

  // Other cities for internal linking
  const otherCities = SAUDI_CITIES.filter(c => c.slug !== citySlug).slice(0, 6);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(citySchema) }}
      />
      <Header />
      <main className="container">
        <Breadcrumb items={breadcrumbItems} />

        {/* Hero */}
        <section className="hero">
          <div className="badge">
            <span className="live-dot" />
            أسعار محدثة لحظياً
          </div>
          <h1>سعر الذهب اليوم في {city.nameAr}</h1>
          <p className="hero-subtitle">
            سعر جرام الذهب عيار ٢١ اليوم في {city.nameAr} محدث لحظياً بالريال السعودي مع أسعار جميع العيارات
          </p>
          <div className="main-price-box">
            <div className="main-price-label">سعر جرام الذهب عيار ٢١ في {city.nameAr}</div>
            <div className="main-price-value">
              <span>{fmt(prices[21]?.gram)}</span>
              <span className="main-price-currency">ر.س</span>
            </div>
            <div className="last-update">آخر تحديث: {formatRiyadhTime()}</div>
          </div>
        </section>

        {/* Price Cards */}
        <section className="section">
          <h2 className="section-title">📊 أسعار الذهب في {city.nameAr} لجميع العيارات</h2>
          <div className="price-cards">
            {[24, 22, 21, 18].map(k => (
              <Link key={k} href={`/karat-${k}`} className={`price-card ${k === 21 ? 'highlight' : ''}`}>
                <div className="price-card-karat">{k}</div>
                <h3 className="price-card-label">سعر جرام عيار {k}</h3>
                <div className="price-card-value">{fmt(prices[k]?.gram)}</div>
                <div className="price-card-unit">ر.س / جرام</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Price Table */}
        <section className="section">
          <h2 className="section-title">جدول أسعار الذهب اليوم في {city.nameAr}</h2>
          <div className="table-responsive">
            <table className="price-table">
              <thead>
                <tr>
                  <th>الوحدة</th>
                  <th>السعر (ر.س)</th>
                  <th>السعر ($)</th>
                </tr>
              </thead>
              <tbody>
                {[24, 22, 21, 18].map(k => (
                  <tr key={k}>
                    <td><strong>سعر جرام الذهب عيار {k}</strong></td>
                    <td className="text-gold">{fmt(prices[k]?.gram)}</td>
                    <td>{fmt(prices[k]?.gram / 3.75)}</td>
                  </tr>
                ))}
                <tr>
                  <td><strong>سعر أونصة الذهب</strong></td>
                  <td className="text-gold">{fmt(prices[24]?.ounce)}</td>
                  <td>{fmt(usdPerOunce)}</td>
                </tr>
                <tr>
                  <td><strong>سعر كيلو الذهب عيار 24</strong></td>
                  <td className="text-gold">{fmt(prices[24]?.kilo)}</td>
                  <td>{fmt(prices[24]?.kilo / 3.75)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* City Info */}
        <section className="section">
          <h2 className="section-title">🏙️ سوق الذهب في {city.nameAr}</h2>
          <div className="content-block">
            <p>{city.description}</p>
          </div>

          {/* Markets */}
          <h3 className="sub-title">🏪 أشهر أسواق ومحلات الذهب في {city.nameAr}</h3>
          <div className="markets-grid">
            {city.markets.map((market, i) => (
              <div key={i} className="market-card">
                <span className="market-icon">💎</span>
                <span className="market-name">{market}</span>
              </div>
            ))}
          </div>

          {/* Tips */}
          <h3 className="sub-title">💡 نصائح شراء الذهب في {city.nameAr}</h3>
          <div className="tips-list">
            {city.tips.map((tip, i) => (
              <div key={i} className="tip-item">
                <span className="tip-icon">✅</span>
                <p>{tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Calculator */}
        <section className="section">
          <h2 className="section-title">🧮 حاسبة الذهب في {city.nameAr}</h2>
          <GoldCalculator prices={prices} />
        </section>

        {/* Other Cities */}
        <section className="section">
          <h2 className="section-title">🏙️ أسعار الذهب في مدن أخرى</h2>
          <div className="price-cards">
            {otherCities.map(c => (
              <Link key={c.slug} href={`/${c.slug}`} className="price-card">
                <div className="price-card-karat" style={{ fontSize: '1.5rem' }}>🏙️</div>
                <h3 className="price-card-label">سعر الذهب في {c.nameAr}</h3>
                <div className="price-card-value">{fmt(prices[21]?.gram)}</div>
                <div className="price-card-unit">ر.س / جرام عيار 21</div>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <FAQ items={faqItems} />

        {/* Internal Links */}
        <InternalLinks links={internalLinks} />

        {/* Disclaimer */}
        <Disclaimer />
      </main>
      <Footer />
    </>
  );
}
