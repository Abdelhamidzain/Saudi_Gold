import CityPage from '../components/CityPage';

export const revalidate = 3600;

export const metadata = {
  title: 'سعر الذهب اليوم في حائل | أسعار جميع العيارات محدثة',
  description: 'سعر الذهب اليوم في حائل محدث لحظياً بالريال السعودي. أسعار جرام الذهب عيار 21 و 24 و 22 و 18 مع أفضل أسواق ومحلات الذهب في حائل.',
  keywords: ['سعر الذهب في حائل', 'سعر الذهب اليوم في حائل', 'اسعار الذهب حائل', 'سوق الذهب حائل', 'محلات الذهب حائل'],
  alternates: {
    canonical: 'https://saudi-gold.com/gold-price-hail',
  },
  openGraph: {
    title: 'سعر الذهب اليوم في حائل | محدث لحظياً',
    description: 'سعر جرام الذهب عيار 21 في حائل محدث لحظياً بالريال السعودي مع أسعار جميع العيارات',
  },
};

export default function HailGoldPage() {
  return <CityPage citySlug="gold-price-hail" />;
}
