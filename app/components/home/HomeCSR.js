'use client';

import dynamic from 'next/dynamic';

// كل قسم من الأقسام الثلاثة يتحمّل client-side فقط (ssr:false) فلا يظهر في الـ HTML الخام،
// بينما تبقى أقسام الـ SSR (H1 + جدول العيارات + لينكات المدن) في أماكنها الأصلية بينها.
const placeholder = (minHeight) => function Loading() {
  return <div style={{ minHeight }} aria-hidden="true" />;
};

const Hero = dynamic(() => import('./HomeHero'), { ssr: false, loading: placeholder('320px') });
const Middle = dynamic(() => import('./HomeMiddle'), { ssr: false, loading: placeholder('400px') });
const End = dynamic(() => import('./HomeEnd'), { ssr: false, loading: placeholder('300px') });

export function HomeHeroCSR(props) {
  return <Hero {...props} />;
}

export function HomeMiddleCSR(props) {
  return <Middle {...props} />;
}

export function HomeEndCSR(props) {
  return <End {...props} />;
}
