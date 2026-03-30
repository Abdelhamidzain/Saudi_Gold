// Schema helpers for SEO - Fixed & Improved
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
    publisher: {
      '@type': 'Organization',
      name: 'سعودي قولد',
      url: SITE_URL,
    },
  };
}

// PriceSpecification Schema for gold prices (replaces misleading Product schema)
export function getGoldPriceSchema({ name, description, karat, priceSAR, priceUSD, url }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}${url}#webpage`,
    name,
    description,
    url: `${SITE_URL}${url}`,
    mainEntity: {
      '@type': 'ExchangeRateSpecification',
      currency: 'XAU',
      currentExchangeRate: {
        '@type': 'UnitPriceSpecification',
        price: priceSAR?.toFixed(2) || '0',
        priceCurrency: 'SAR',
        unitText: 'gram',
        name: `سعر جرام الذهب عيار ${karat}`,
      },
    },
    dateModified: new Date().toISOString(),
    inLanguage: 'ar',
  };
}

// Service Schema for calculators
export function getServiceSchema({ name, description, url, serviceType }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url: `${SITE_URL}${url}`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'SAR',
    },
    provider: {
      '@type': 'Organization',
      name: 'سعودي قولد',
      url: SITE_URL,
    },
    featureList: serviceType,
    inLanguage: 'ar',
  };
}

// HowTo Schema
export function getHowToSchema({ name, description, steps, totalTime }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    totalTime: totalTime || 'PT5M',
    inLanguage: 'ar',
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

// ItemList Schema
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

// LocalBusiness Schema for gold markets
export function getLocalBusinessSchema({ name, city, area, lat, lng }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'JewelryStore',
    name,
    address: {
      '@type': 'PostalAddress',
      addressLocality: city,
      addressRegion: area,
      addressCountry: 'SA',
    },
    priceRange: '$$',
    currenciesAccepted: 'SAR',
  };
  if (lat && lng) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: lat,
      longitude: lng,
    };
  }
  return schema;
}

// Article Schema for blog posts
export function getArticleSchema({ title, description, url, datePublished, dateModified, image }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `${SITE_URL}${url}`,
    datePublished,
    dateModified: dateModified || datePublished,
    inLanguage: 'ar',
    author: {
      '@type': 'Organization',
      name: 'سعودي قولد',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'سعودي قولد',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    image: image || `${SITE_URL}/og-image.png`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}${url}`,
    },
  };
}

// City page Schema
export function getCityGoldSchema({ cityNameAr, cityNameEn, url }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `سعر الذهب اليوم في ${cityNameAr}`,
    description: `سعر الذهب اليوم في ${cityNameAr} محدث لحظياً بالريال السعودي لجميع العيارات`,
    url: `${SITE_URL}${url}`,
    about: {
      '@type': 'Thing',
      name: `أسعار الذهب في ${cityNameAr}`,
    },
    dateModified: new Date().toISOString(),
    inLanguage: 'ar',
    isPartOf: {
      '@type': 'WebSite',
      name: 'سعودي قولد',
      url: SITE_URL,
    },
  };
}

// BreadcrumbList Schema helper
export function getBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.href ? `${SITE_URL}${item.href}` : undefined,
    })),
  };
}
