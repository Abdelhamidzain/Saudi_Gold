import CityPage from '../components/CityPage';

export const revalidate = 60;

export const metadata = {
  title: 'سعر الذهب اليوم في مكة المكرمة | أسعار جميع العيارات محدثة',
  description: 'سعر الذهب اليوم في مكة المكرمة محدث لحظياً بالريال السعودي. أسعار جرام الذهب عيار 21 و 24 و 22 و 18 مع أفضل أسواق ومحلات الذهب في مكة المكرمة.',
  keywords: ['سعر الذهب في مكة المكرمة', 'سعر الذهب اليوم في مكة المكرمة', 'اسعار الذهب مكة المكرمة', 'سوق الذهب مكة المكرمة', 'محلات الذهب مكة المكرمة'],
  alternates: {
    canonical: 'https://saudi-gold.com/gold-price-makkah',
  },
  openGraph: {
    title: 'سعر الذهب اليوم في مكة المكرمة | محدث لحظياً',
    description: 'سعر جرام الذهب عيار 21 في مكة المكرمة محدث لحظياً بالريال السعودي مع أسعار جميع العيارات',
  },
};

export default function MakkahGoldPage() {
  return <CityPage citySlug="gold-price-makkah" />;
}
