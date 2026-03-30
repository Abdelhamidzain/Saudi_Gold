import CityPage from '../components/CityPage';

export const revalidate = 60;

export const metadata = {
  title: 'سعر الذهب اليوم في بريدة | أسعار جميع العيارات محدثة',
  description: 'سعر الذهب اليوم في بريدة محدث لحظياً بالريال السعودي. أسعار جرام الذهب عيار 21 و 24 و 22 و 18 مع أفضل أسواق ومحلات الذهب في بريدة.',
  keywords: ['سعر الذهب في بريدة', 'سعر الذهب اليوم في بريدة', 'اسعار الذهب بريدة', 'سوق الذهب بريدة', 'محلات الذهب بريدة'],
  alternates: {
    canonical: 'https://saudi-gold.com/gold-price-buraidah',
  },
  openGraph: {
    title: 'سعر الذهب اليوم في بريدة | محدث لحظياً',
    description: 'سعر جرام الذهب عيار 21 في بريدة محدث لحظياً بالريال السعودي مع أسعار جميع العيارات',
  },
};

export default function BuraidahGoldPage() {
  return <CityPage citySlug="gold-price-buraidah" />;
}
