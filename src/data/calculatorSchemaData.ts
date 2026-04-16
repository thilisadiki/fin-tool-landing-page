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

export function buildVehicleCalculatorSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Vehicle Finance Calculator',
    url: `${BASE_URL}/calculators/vehicle-finance-calculator`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    description:
      'Free vehicle finance calculator for South Africa. Calculate your monthly car installments, interest, and balloon payments instantly.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'ZAR',
    },
  };
}

export function buildRetirementCalculatorSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Retirement Savings Calculator',
    url: `${BASE_URL}/calculators/retirement-savings-calculator`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    description:
      'Free retirement savings calculator for South Africa. Project your retirement annuity growth, estimate monthly income with the 4% Rule, and check if you are on track.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'ZAR',
    },
  };
}

export function buildPersonalLoanCalculatorSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Personal Loan Calculator',
    url: `${BASE_URL}/calculators/personal-loan-calculator`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    description:
      'Free personal loan calculator for South Africa. Calculate your monthly repayments, total interest, and total cost of credit instantly.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'ZAR',
    },
  };
}

export function buildBudgetCalculatorSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Personal Budget Calculator',
    url: `${BASE_URL}/calculators/budget-calculator`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    description:
      'Free personal budget calculator for South Africa. Track your income and expenses, and check if your budget aligns with the 50/30/20 rule.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'ZAR',
    },
  };
}

export function buildCurrencyConverterSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Currency Converter',
    url: `${BASE_URL}/calculators/currency-converter`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    description:
      'Free real-time currency converter supporting international exchange rates and historical trends.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'ZAR',
    },
  };
}

