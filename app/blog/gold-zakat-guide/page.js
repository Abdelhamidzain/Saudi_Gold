import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Breadcrumb from '../../components/Breadcrumb';
import InternalLinks from '../../components/InternalLinks';
import { getArticleSchema } from '../../lib/schema';

export const metadata = {
  title: 'زكاة الذهب | دليل شامل للحساب مع أمثلة عملية وحاسبة تلقائية',
  description: 'كيف تحسب زكاة الذهب؟ النصاب، الشروط، طريقة الحساب الصحيحة لجميع العيارات مع أمثلة عملية وحاسبة زكاة تلقائية.',
  keywords: ['زكاة الذهب', 'حساب زكاة الذهب', 'نصاب زكاة الذهب', 'هل الذهب الملبوس عليه زكاة', 'حاسبة زكاة الذهب'],
  alternates: { canonical: 'https://saudi-gold.com/blog/gold-zakat-guide' },
  openGraph: {
    title: 'زكاة الذهب - دليل شامل لحساب الزكاة على الذهب في السعودية',
    description: 'كيف تحسب زكاة الذهب؟ النصاب، الشروط، طريقة الحساب الصحيحة لجميع العيارات مع أمثلة عملية وحاسبة زكاة تلقائية.',
  },
};

const articleSchema = getArticleSchema({
  title: 'زكاة الذهب - دليل شامل لحساب الزكاة على الذهب في السعودية',
  description: 'كيف تحسب زكاة الذهب؟ النصاب، الشروط، طريقة الحساب الصحيحة لجميع العيارات مع أمثلة عملية وحاسبة زكاة تلقائية.',
  url: '/blog/gold-zakat-guide',
  datePublished: '2025-08-15',
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
          { name: 'زكاة الذهب - دليل شامل لحساب الزكاة على ...' },
        ]} />

        <article className="article-content">
          <div className="article-header">
            <span className="article-category">🕌 شرعي</span>
            <h1>زكاة الذهب - دليل شامل لحساب الزكاة على الذهب في السعودية</h1>
            <p className="article-meta">{new Date('2025-08-15').toLocaleDateString('ar-SA')} · 5 دقائق قراءة</p>
          </div>

          <div className="article-body">

            <h2>شروط وجوب زكاة الذهب</h2>
            <p>تجب الزكاة على الذهب بشرطين: أن يبلغ النصاب وهو 85 جراماً من الذهب الخالص (عيار 24)، وأن يمر عليه حول هجري كامل (سنة). نسبة الزكاة هي 2.5% من قيمة الذهب. ملاحظة: النصاب يُحسب بالذهب الخالص، فإذا كان ذهبك عيار 21، يُحسب المقدار الصافي (الوزن × 0.875).</p>

            <h2>كيف تحسب زكاة الذهب خطوة بخطوة</h2>
            <p>الخطوة 1: حدد وزن الذهب الذي تملكه بالجرام. الخطوة 2: حوّله لذهب خالص (اضرب في نسبة النقاوة). مثال: 100 جرام عيار 21 = 100 × 0.875 = 87.5 جرام ذهب خالص. الخطوة 3: قارن بالنصاب (85 جرام). في مثالنا 87.5 > 85 فتجب الزكاة. الخطوة 4: احسب 2.5% من القيمة الإجمالية. الخطوة 5: استخدم حاسبة الزكاة على موقعنا للحساب التلقائي.</p>

            <h2>أمثلة عملية</h2>
            <p>مثال 1: سيدة تملك 120 جرام ذهب عيار 21. الذهب الخالص = 120 × 0.875 = 105 جرام (أعلى من النصاب). قيمة الذهب = 120 × سعر الجرام عيار 21. الزكاة = القيمة × 2.5%. مثال 2: شخص يملك 80 جرام ذهب عيار 24. الذهب الخالص = 80 جرام (أقل من 85 جرام). لا تجب عليه الزكاة.</p>

            <h2>هل الذهب الملبوس عليه زكاة؟</h2>
            <p>اختلف العلماء في هذه المسألة. جمهور العلماء (المالكية والشافعية والحنابلة) يرون أن الذهب المُعد للاستعمال والزينة المعتادة لا زكاة فيه. المذهب الحنفي يرى وجوب الزكاة على كل ذهب بلغ النصاب سواء ملبوس أو مُدخر. ننصح باستشارة عالم دين موثوق في بلدك. واحتساب الزكاة أحوط وأسلم.</p>

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
