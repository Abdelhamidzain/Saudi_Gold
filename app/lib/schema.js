// Schema helpers for SEO
export const SITE_URL = 'https://saudi-gold.com';

// WebPage Schema
export function getWebPageSchema({ title, description, url, dateModified }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: `${SITE_URL}${url}`,
    dateModified: dateModified || new Date().toISOString(),
    inLanguage: 'ar',
    isPartOf: {
      '@type': 'WebSite',
      name: 'سعودي قولد',
      url: SITE_URL,
    },
  };
}

// Product Schema للذهب
export function getGoldProductSchema({ name, description, karat, price, url }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    brand: {
      '@type': 'Brand',
      name: 'ذهب سعودي',
    },
    category: `ذهب عيار ${karat}`,
    material: 'Gold',
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}${url}`,
      priceCurrency: 'SAR',
      price: price?.toFixed(2) || '0',
      priceValidUntil: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'سعودي قولد',
      },
    },
  };
}

// Service Schema للحاسبات
export function getServiceSchema({ name, description, url, serviceType }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `${SITE_URL}${url}`,
    serviceType,
    provider: {
      '@type': 'Organization',
      name: 'سعودي قولد',
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'Country',
      name: 'المملكة العربية السعودية',
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${SITE_URL}${url}`,
      serviceType: 'Online',
    },
  };
}

// HowTo Schema لصفحات الإرشادات
export function getHowToSchema({ name, description, steps, totalTime }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    totalTime: totalTime || 'PT5M',
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

// ItemList Schema لقوائم الأسعار
export function getItemListSchema({ name, items }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url ? `${SITE_URL}${item.url}` : undefined,
    })),
  };
}

// LocalBusiness Schema لأسواق الذهب
export function getLocalBusinessSchema({ name, city, area }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JewelryStore',
    name,
    address: {
      '@type': 'PostalAddress',
      addressLocality: city,
      addressRegion: area,
      addressCountry: 'SA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      addressCountry: 'SA',
    },
    priceRange: '$$',
    currenciesAccepted: 'SAR',
  };
}

// Table Schema للجداول
export function getTableSchema({ name, description, columns, rows }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Table',
    name,
    description,
    about: {
      '@type': 'Thing',
      name: 'أسعار الذهب في السعودية',
    },
  };
}

// FinancialProduct Schema للسبائك
export function getFinancialProductSchema({ name, description, price, weight }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: 'سعودي قولد',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'SAR',
      price: price?.toFixed(2) || '0',
    },
  };
}

// SoftwareApplication Schema للحاسبات
export function getCalculatorSchema({ name, description, url }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url: `${SITE_URL}${url}`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'SAR',
    },
  };
}
