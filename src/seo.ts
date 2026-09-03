export const site = {
  name: 'Саня Груз',
  legalName: 'Саня Груз',
  url: 'https://sanya-gruz.ua',
  locale: 'uk_UA',
  language: 'uk',
  description:
    'Транспортно-експедиційна компанія: вантажні перевезення Україною та до Європи. FTL, збірні вантажі, крос-докінг, страхування та митне оформлення.',
  keywords: [
    'вантажні перевезення Україна',
    'міжнародна експедиція',
    'FTL',
    'збірні вантажі',
    'митне оформлення',
    'транспортно-експедиційна компанія',
    'перевезення в Європу',
  ],
  phone: '+380969502755',
  phoneDisplay: '+38 096 950 27 55',
  email: 'hello@sanya-gruz.ua',
  telegram: 'https://t.me/sanyagruz',
  telegramHandle: '@sanyagruz',
  address: 'Україна, працюємо по всій країні',
  hours: 'Офіс: Пн–Пт 08:00–20:00. Диспетчер: 24/7',
  geo: { country: 'UA', areaServed: ['UA', 'EU'] },
} as const

export const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'ProfessionalService'],
      '@id': `${site.url}/#business`,
      name: site.name,
      legalName: site.legalName,
      url: site.url,
      image: `${site.url}/og.svg`,
      description: site.description,
      telephone: site.phone,
      email: site.email,
      priceRange: '$$',
      currenciesAccepted: 'UAH, EUR, USD',
      areaServed: site.geo.areaServed.map((code) => ({
        '@type': 'Country',
        name: code,
      })),
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'UA',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '20:00',
        },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Послуги експедиції',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Внутрішні вантажні перевезення FTL/PTL' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Міжнародні перевезення та консолідація вантажів' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Митно-брокерське обслуговування' } },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      url: site.url,
      name: site.name,
      inLanguage: 'uk',
      publisher: { '@id': `${site.url}/#business` },
    },
  ],
}
