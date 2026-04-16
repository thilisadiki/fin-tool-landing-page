import { tools } from '@/data/landingPageData';

const BASE_URL = 'https://www.quickmoneytool.com';
const ORG_ID = `${BASE_URL}/#organization`;

type CalcSlug =
  | 'sars-income-tax-calculator'
  | 'vehicle-finance-calculator'
  | 'retirement-savings-calculator'
  | 'personal-loan-calculator'
  | 'budget-calculator'
  | 'currency-converter';

interface CalcMeta {
  datePublished: string;
  dateModified: string;
  softwareVersion: string;
}

const CALCULATOR_META: Record<CalcSlug, CalcMeta> = {
  'sars-income-tax-calculator': {
    datePublished: '2025-03-01',
    dateModified: '2026-03-01',
    softwareVersion: '2026.1.0',
  },
  'vehicle-finance-calculator': {
    datePublished: '2025-03-01',
    dateModified: '2026-01-15',
    softwareVersion: '1.4.0',
  },
  'retirement-savings-calculator': {
    datePublished: '2025-04-10',
    dateModified: '2026-02-01',
    softwareVersion: '1.3.0',
  },
  'personal-loan-calculator': {
    datePublished: '2025-05-01',
    dateModified: '2026-01-10',
    softwareVersion: '1.2.0',
  },
  'budget-calculator': {
    datePublished: '2025-06-15',
    dateModified: '2026-01-20',
    softwareVersion: '1.2.0',
  },
  'currency-converter': {
    datePublished: '2025-08-01',
    dateModified: '2026-03-05',
    softwareVersion: '1.1.0',
  },
};

function featureListFor(slug: CalcSlug): string[] {
  const tool = tools.find((t) => t.url === `/calculators/${slug}`);
  return tool?.features ?? [];
}

function buildCalculatorSchema({
  slug,
  name,
  description,
}: {
  slug: CalcSlug;
  name: string;
  description: string;
}) {
  const meta = CALCULATOR_META[slug];
  const url = `${BASE_URL}/calculators/${slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${url}#software`,
    name,
    url,
    description,
    applicationCategory: 'FinanceApplication',
    applicationSubCategory: 'Calculator',
    operatingSystem: 'Web',
    browserRequirements: 'Requires JavaScript. Works in all modern browsers.',
    inLanguage: 'en-ZA',
    isAccessibleForFree: true,
    featureList: featureListFor(slug),
    softwareVersion: meta.softwareVersion,
    datePublished: meta.datePublished,
    dateModified: meta.dateModified,
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    creator: { '@id': ORG_ID },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'ZAR',
      availability: 'https://schema.org/InStock',
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

export function buildTaxCalculatorSchema() {
  return buildCalculatorSchema({
    slug: 'sars-income-tax-calculator',
    name: 'SARS Income Tax Calculator 2026/2027',
    description:
      'Free SARS income tax calculator for South Africa. Calculate your PAYE, tax rebates, medical credits, and net income for the 2026/2027 tax year.',
  });
}

export function buildVehicleCalculatorSchema() {
  return buildCalculatorSchema({
    slug: 'vehicle-finance-calculator',
    name: 'Vehicle Finance Calculator',
    description:
      'Free vehicle finance calculator for South Africa. Calculate your monthly car installments, interest, and balloon payments instantly.',
  });
}

export function buildRetirementCalculatorSchema() {
  return buildCalculatorSchema({
    slug: 'retirement-savings-calculator',
    name: 'Retirement Savings Calculator',
    description:
      'Free retirement savings calculator for South Africa. Project your retirement annuity growth, estimate monthly income with the 4% Rule, and check if you are on track.',
  });
}

export function buildPersonalLoanCalculatorSchema() {
  return buildCalculatorSchema({
    slug: 'personal-loan-calculator',
    name: 'Personal Loan Calculator',
    description:
      'Free personal loan calculator for South Africa. Calculate your monthly repayments, total interest, and total cost of credit instantly.',
  });
}

export function buildBudgetCalculatorSchema() {
  return buildCalculatorSchema({
    slug: 'budget-calculator',
    name: 'Personal Budget Calculator',
    description:
      'Free personal budget calculator for South Africa. Track your income and expenses, and check if your budget aligns with the 50/30/20 rule.',
  });
}

export function buildCurrencyConverterSchema() {
  return buildCalculatorSchema({
    slug: 'currency-converter',
    name: 'Currency Converter',
    description:
      'Free real-time currency converter supporting international exchange rates and historical trends.',
  });
}
