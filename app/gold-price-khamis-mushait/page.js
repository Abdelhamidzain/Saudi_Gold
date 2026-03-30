import CityPage from '../components/CityPage';

export const revalidate = 60;

export const metadata = {
  title: 'سعر الذهب اليوم في خميس مشيط | أسعار جميع العيارات محدثة',
  description: 'سعر الذهب اليوم في خميس مشيط محدث لحظياً بالريال السعودي. أسعار جرام الذهب عيار 21 و 24 و 22 و 18 مع أفضل أسواق ومحلات الذهب في خميس مشيط.',
  keywords: ['سعر الذهب في خميس مشيط', 'سعر الذهب اليوم في خميس مشيط', 'اسعار الذهب خميس مشيط', 'سوق الذهب خميس مشيط', 'محلات الذهب خميس مشيط'],
  alternates: {
    canonical: 'https://saudi-gold.com/gold-price-khamis-mushait',
  },
  openGraph: {
    title: 'سعر الذهب اليوم في خميس مشيط | محدث لحظياً',
    description: 'سعر جرام الذهب عيار 21 في خميس مشيط محدث لحظياً بالريال السعودي مع أسعار جميع العيارات',
  },
};

export default function KhamisMushaitGoldPage() {
  return <CityPage citySlug="gold-price-khamis-mushait" />;
}
