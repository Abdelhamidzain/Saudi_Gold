'use client';

import Link from 'next/link';
import { fmt } from '../../lib/gold';
import PriceCards from '../PriceCards';
import InternalLinks from '../InternalLinks';

const homeLinks = [
  { href: '/karat-21', label: 'عيار 21 اليوم', icon: '🥇' },
  { href: '/karat-24', label: 'عيار 24 الآن', icon: '💎' },
  { href: '/karat-22', label: 'عيار 22', icon: '✨' },
  { href: '/karat-18', label: 'عيار 18', icon: '🔶' },
  { href: '/gold-bars', label: 'أسعار السبائك', icon: '🧱' },
  { href: '/silver', label: 'الفضة اليوم', icon: '🥈' },
  { href: '/workmanship', label: 'رسوم المصنعية', icon: '🔧' },
  { href: '/buy-sell', label: 'بيع وشراء', icon: '💰' },
  { href: '/markets', label: 'الأسواق والمحلات', icon: '🏪' },
  { href: '/gold-price-riyadh', label: 'الرياض', icon: '🏙️' },
  { href: '/gold-price-jeddah', label: 'جدة', icon: '🌊' },
  { href: '/calculator', label: 'الحاسبة', icon: '🧮' },
];

export default function HomeHero({ prices, formattedTime }) {
  return (
    <>
      {/* Hero rest: badge + subtitle + price box + cards + internal links */}
      <section className="hero" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="badge">
            <span className="live-dot" aria-hidden="true"></span>
            <span>تحديث مباشر من البورصة العالمية</span>
          </div>
          <p className="hero-subtitle">
            تابع سعر الذهب اليوم في السعودية بالريال السعودي محدّثاً لحظياً لكل العيارات، واعرف سعر الذهب في السعودية اليوم بيعاً وشراءً مع الأونصة والسبائك وأدوات الحساب والزكاة.
          </p>

          <div className="main-price-box">
            <div className="main-price-label">تسعيرة الغرام عيار ٢١ الآن بالريال</div>
            <div className="main-price-value">
              <span>{fmt(prices[21]?.gram)}</span>
              <span className="main-price-currency">ر.س</span>
            </div>
            <div className="last-update">آخر تحديث: {formattedTime}</div>
          </div>

          <PriceCards prices={prices} highlightKarat={21} />

          <InternalLinks links={homeLinks} />
        </div>
      </section>

      {/* SEO Content Block 1 */}
      <section className="section">
        <div className="container">
          <div className="info-section">
            <h2>سعر الذهب في السعودية — كيف يُحسب وكيف تتابعه؟</h2>
            <p>
              سعر الذهب اليوم في السعودية يتحدد وفقاً لقيمة الأوقية عالمياً في بورصتَي لندن ونيويورك بالدولار، ثم يُحوَّل للريال بالصرف الثابت 3.75. يهتم الزائر بمعرفة سعر جرام الذهب في السعودية اليوم لاتخاذ قرار الشراء أو البيع — لذلك نحدّث الأرقام كل دقيقة لتعكس أحدث تحركات البورصة. ولمعرفة سعر الذهب في السعودية اليوم لحظة اتخاذ القرار، يكفي متابعة الجدول أدناه المحدّث آنياً.
            </p>
            <p>
              ما تراه هنا هو ثمن الجرام النقي (سبوت) قبل إضافات الصائغ. ورش الحُلي تحمّل <Link href="/workmanship" className="text-gold">أجور الصنعة</Link> وضريبة 15%. كما نوفر سعر سبائك الذهب في السعودية اليوم عبر صفحة <Link href="/gold-bars" className="text-gold">أسعار سبائك الذهب في السعودية</Link>، و<Link href="/silver" className="text-gold">سعر الفضة اليوم في السعودية</Link>، و<Link href="/zakat" className="text-gold">حاسبة زكاة الذهب</Link> الشرعية.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
