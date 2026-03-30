import CityPage from '../components/CityPage';

export const revalidate = 60;

export const metadata = {
  title: 'سعر الذهب اليوم في تبوك | أسعار جميع العيارات محدثة',
  description: 'سعر الذهب اليوم في تبوك محدث لحظياً بالريال السعودي. أسعار جرام الذهب عيار 21 و 24 و 22 و 18 مع أفضل أسواق ومحلات الذهب في تبوك.',
  keywords: ['سعر الذهب في تبوك', 'سعر الذهب اليوم في تبوك', 'اسعار الذهب تبوك', 'سوق الذهب تبوك', 'محلات الذهب تبوك'],
  alternates: {
    canonical: 'https://saudi-gold.com/gold-price-tabuk',
  },
  openGraph: {
    title: 'سعر الذهب اليوم في تبوك | محدث لحظياً',
    description: 'سعر جرام الذهب عيار 21 في تبوك محدث لحظياً بالريال السعودي مع أسعار جميع العيارات',
  },
};

export default function TabukGoldPage() {
  return <CityPage citySlug="gold-price-tabuk" />;
}
