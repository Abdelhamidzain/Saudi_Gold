import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Breadcrumb from '../../components/Breadcrumb';
import InternalLinks from '../../components/InternalLinks';
import { getArticleSchema } from '../../lib/schema';

export const metadata = {
  title: 'الاستثمار في الذهب في السعودية 2026 | دليل شامل للمبتدئين',
  description: 'تعرف على أفضل طرق الاستثمار في الذهب بالمملكة العربية السعودية. سبائك، عملات، صناديق ETF، ومقارنة بين الخيارات المتاحة.',
  keywords: ['استثمار الذهب', 'استثمار الذهب السعودية', 'سبائك ذهب استثمارية', 'صناديق الذهب', 'شراء سبائك ذهب'],
  alternates: { canonical: 'https://saudi-gold.com/blog/gold-investment-saudi-2026' },
  openGraph: {
    title: 'الاستثمار في الذهب في السعودية 2026 - دليل المبتدئين',
    description: 'تعرف على أفضل طرق الاستثمار في الذهب بالمملكة العربية السعودية. سبائك، عملات، صناديق ETF، ومقارنة بين الخيارات المتاحة.',
  },
};

const articleSchema = getArticleSchema({
  title: 'الاستثمار في الذهب في السعودية 2026 - دليل المبتدئين',
  description: 'تعرف على أفضل طرق الاستثمار في الذهب بالمملكة العربية السعودية. سبائك، عملات، صناديق ETF، ومقارنة بين الخيارات المتاحة.',
  url: '/blog/gold-investment-saudi-2026',
  datePublished: '2025-11-20',
});

export default function ArticlePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Header />
      <main className="container">
        <Breadcrumb items={[
          { name: 'الرئيسية', href: '/' },
          { name: 'المدونة', href: '/blog' },
          { name: 'الاستثمار في الذهب في السعودية 2026 - دل...' },
        ]} />

        <article className="article-content">
          <div className="article-header">
            <span className="article-category">📈 استثمار</span>
            <h1>الاستثمار في الذهب في السعودية 2026 - دليل المبتدئين</h1>
            <p className="article-meta">{new Date('2025-11-20').toLocaleDateString('ar-SA')} · 10 دقائق قراءة</p>
          </div>

          <div className="article-body">

            <h2>لماذا الاستثمار في الذهب؟</h2>
            <p>الذهب يُعتبر ملاذاً آمناً في أوقات التضخم والأزمات الاقتصادية. في السعودية، يحظى الذهب بأهمية ثقافية واقتصادية كبيرة. تاريخياً، حقق الذهب عوائد متوسطة 8-10% سنوياً على المدى الطويل، متفوقاً على التضخم. مع ربط الريال بالدولار، يوفر الذهب تنويعاً للمحفظة الاستثمارية.</p>

            <h2>طرق الاستثمار في الذهب بالسعودية</h2>
            <p>هناك عدة طرق: السبائك الذهبية وهي الأكثر شيوعاً (متوفرة بأوزان من 1 جرام إلى 1 كيلو)، العملات الذهبية (مثل الجنيه الذهب)، صناديق الذهب المتداولة ETF (متاحة في تداول)، وحسابات الذهب في بعض البنوك السعودية. لكل طريقة مميزاتها وعيوبها من حيث السيولة والتخزين والعوائد.</p>

            <h2>السبائك vs المجوهرات: أيهما أفضل للاستثمار؟</h2>
            <p>السبائك أفضل للاستثمار لعدة أسباب: لا تحمل مصنعية عالية (هامش 1-3% فقط)، سهلة البيع والتسييل، ومعيارية القيمة عالمياً. المجوهرات تخسر المصنعية عند البيع (15-50 ريال/جرام)، مما يعني خسارة 10-20% من القيمة فوراً. إذا كان هدفك الاستثمار، اختر سبائك عيار 24 من مصافي معتمدة عالمياً.</p>

            <h2>نصائح للمستثمر المبتدئ</h2>
            <p>ابدأ بمبالغ صغيرة وتعلم السوق أولاً. اشترِ عند انخفاض الأسعار وليس عند ارتفاعها. استثمر على المدى الطويل (3+ سنوات). خزّن السبائك في مكان آمن (خزنة بنكية أو منزلية). تابع أسعار الذهب يومياً عبر موقعنا. لا تضع كل مدخراتك في الذهب — خصص 10-20% من محفظتك.</p>

          </div>
        </article>

        <InternalLinks links={[
          { href: '/', label: 'سعر الذهب اليوم', icon: '🪙' },
          { href: '/calculator', label: 'حاسبة الذهب', icon: '🧮' },
          { href: '/zakat', label: 'حاسبة الزكاة', icon: '🕌' },
          { href: '/gold-bars', label: 'سبائك الذهب', icon: '🧱' },
          { href: '/blog', label: 'المدونة', icon: '📖' },
        ]} />
      </main>
      <Footer />
    </>
  );
}
