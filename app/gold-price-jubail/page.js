import CityPage from '../components/CityPage';

export const revalidate = 3600;

export const metadata = {
  title: 'سعر الذهب اليوم في الجبيل | أسعار جميع العيارات محدثة',
  description: 'سعر الذهب اليوم في الجبيل محدث لحظياً بالريال السعودي. أسعار جرام الذهب عيار 21 و 24 و 22 و 18 مع أفضل أسواق ومحلات الذهب في الجبيل.',
  keywords: ['سعر الذهب في الجبيل', 'سعر الذهب اليوم في الجبيل', 'اسعار الذهب الجبيل', 'سوق الذهب الجبيل', 'محلات الذهب الجبيل'],
  alternates: {
    canonical: 'https://saudi-gold.com/gold-price-jubail',
  },
  openGraph: {
    title: 'سعر الذهب اليوم في الجبيل | محدث لحظياً',
    description: 'سعر جرام الذهب عيار 21 في الجبيل محدث لحظياً بالريال السعودي مع أسعار جميع العيارات',
  },
};

export default function JubailGoldPage() {
  return <CityPage citySlug="gold-price-jubail" />;
}
