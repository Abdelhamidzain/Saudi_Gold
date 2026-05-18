import CityPage from '../components/CityPage';

export const revalidate = 3600;

export const metadata = {
  title: 'سعر الذهب اليوم في جدة | أسعار جميع العيارات محدثة',
  description: 'سعر الذهب اليوم في جدة محدث لحظياً بالريال السعودي. أسعار جرام الذهب عيار 21 و 24 و 22 و 18 مع أفضل أسواق ومحلات الذهب في جدة.',
  keywords: ['سعر الذهب في جدة', 'سعر الذهب اليوم في جدة', 'اسعار الذهب جدة', 'سوق الذهب جدة', 'محلات الذهب جدة'],
  alternates: {
    canonical: 'https://saudi-gold.com/gold-price-jeddah',
  },
  openGraph: {
    title: 'سعر الذهب اليوم في جدة | محدث لحظياً',
    description: 'سعر جرام الذهب عيار 21 في جدة محدث لحظياً بالريال السعودي مع أسعار جميع العيارات',
  },
};

export default function JeddahGoldPage() {
  return <CityPage citySlug="gold-price-jeddah" />;
}
