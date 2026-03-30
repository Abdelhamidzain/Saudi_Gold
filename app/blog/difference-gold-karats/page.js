import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Breadcrumb from '../../components/Breadcrumb';
import InternalLinks from '../../components/InternalLinks';
import { getArticleSchema } from '../../lib/schema';

export const metadata = {
  title: 'الفرق بين عيارات الذهب 24 و 22 و 21 و 18 | مقارنة شاملة',
  description: 'شرح مفصل للفرق بين عيارات الذهب المختلفة من حيث النقاوة والسعر والاستخدام والمتانة. أيهم أفضل للمجوهرات وأيهم للاستثمار.',
  keywords: ['الفرق بين عيارات الذهب', 'عيار 21 vs عيار 24', 'أفضل عيار ذهب', 'عيارات الذهب', 'نقاوة الذهب'],
  alternates: { canonical: 'https://saudi-gold.com/blog/difference-gold-karats' },
  openGraph: {
    title: 'الفرق بين عيارات الذهب 24 و 22 و 21 و 18 - أيهم أفضل؟',
    description: 'شرح مفصل للفرق بين عيارات الذهب المختلفة من حيث النقاوة والسعر والاستخدام والمتانة. أيهم أفضل للمجوهرات وأيهم للاستثمار.',
  },
};

const articleSchema = getArticleSchema({
  title: 'الفرق بين عيارات الذهب 24 و 22 و 21 و 18 - أيهم أفضل؟',
  description: 'شرح مفصل للفرق بين عيارات الذهب المختلفة من حيث النقاوة والسعر والاستخدام والمتانة. أيهم أفضل للمجوهرات وأيهم للاستثمار.',
  url: '/blog/difference-gold-karats',
  datePublished: '2025-10-10',
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
          { name: 'الفرق بين عيارات الذهب 24 و 22 و 21 و 18...' },
        ]} />

        <article className="article-content">
          <div className="article-header">
            <span className="article-category">💎 تعليم</span>
            <h1>الفرق بين عيارات الذهب 24 و 22 و 21 و 18 - أيهم أفضل؟</h1>
            <p className="article-meta">{new Date('2025-10-10').toLocaleDateString('ar-SA')} · 6 دقائق قراءة</p>
          </div>

          <div className="article-body">

            <h2>ما هو عيار الذهب؟</h2>
            <p>العيار هو مقياس نقاوة الذهب ويُقاس من 24 جزء. عيار 24 يعني 24/24 = 100% ذهب خالص. عيار 21 يعني 21/24 = 87.5% ذهب والباقي معادن أخرى (نحاس، فضة، زنك) تُضاف لتحسين الصلابة واللون. كلما زاد العيار، زادت النقاوة وارتفع السعر، لكن قلّت المتانة.</p>

            <h2>مقارنة تفصيلية بين العيارات</h2>
            <p>عيار 24: نقاوة 99.9%، لونه أصفر لامع جداً، لين ويتخدش بسهولة، الأفضل للسبائك والاستثمار. عيار 22: نقاوة 91.6%، شائع في الخليج والهند، متوازن بين النقاوة والمتانة. عيار 21: نقاوة 87.5%، الأكثر شيوعاً في السعودية للمجوهرات، خيار ممتاز يجمع بين القيمة والمتانة. عيار 18: نقاوة 75%، الأكثر صلابة، مناسب للتصاميم الدقيقة والماركات العالمية، لكن قيمة الذهب فيه أقل.</p>

            <h2>أيهم أفضل لك؟</h2>
            <p>إذا كنت تريد الاستثمار: اختر عيار 24 (سبائك) لأنه يحتفظ بقيمته كاملة. إذا كنت تريد مجوهرات يومية: عيار 21 هو الأفضل في السعودية لتوازنه المثالي. إذا كنت تريد تصاميم عصرية دقيقة: عيار 18 أفضل لأنه أكثر صلابة. إذا كنت تريد هدية زفاف تقليدية: عيار 21 أو 22 هو المعتاد في السعودية.</p>

            <h2>كيف تتعرف على العيار؟</h2>
            <p>كل قطعة ذهب أصلية عليها ختم يبين العيار. ختم 999 أو 24K = عيار 24. ختم 916 أو 22K = عيار 22. ختم 875 أو 21K = عيار 21. ختم 750 أو 18K = عيار 18. إذا لم تجد ختماً، لا تشترِ القطعة. يمكنك أيضاً طلب فحصها بجهاز فحص الذهب المتوفر في معظم المحلات.</p>

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
