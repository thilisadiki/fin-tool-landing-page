const BASE_URL = 'https://www.quickmoneytool.com';

export function buildTaxCalculatorSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'SARS Income Tax Calculator 2026/2027',
    url: `${BASE_URL}/calculators/sars-income-tax-calculator`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    description:
      'Free SARS income tax calculator for South Africa. Calculate your PAYE, tax rebates, medical credits, and net income for the 2026/2027 tax year.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'ZAR',
    },
  };
}

export function buildBreadcrumbSchema(
  items: { name: string; url: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };
}
