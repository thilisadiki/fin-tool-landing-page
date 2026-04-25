import { tools } from '@/data/landingPageData';
import { ndulamiso, buildPersonSchema } from '@/data/authors';

const BASE_URL = 'https://www.quickmoneytool.com';
const ORG_ID = `${BASE_URL}/#organization`;
const reviewerPerson = buildPersonSchema(ndulamiso);

type CalcSlug =
  | 'sars-income-tax-calculator'
  | 'vehicle-finance-calculator'
  | 'retirement-savings-calculator'
  | 'personal-loan-calculator'
  | 'home-loan-calculator'
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
  'home-loan-calculator': {
    datePublished: '2026-04-25',
    dateModified: '2026-04-25',
    softwareVersion: '1.0.0',
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

export function getCalculatorDateModified(slug: CalcSlug): string {
  return CALCULATOR_META[slug].dateModified;
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
    author: reviewerPerson,
    publisher: { '@id': ORG_ID },
    creator: { '@id': ORG_ID },
    contributor: reviewerPerson,
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

export function buildHomeLoanCalculatorSchema() {
  return buildCalculatorSchema({
    slug: 'home-loan-calculator',
    name: 'Home Loan Calculator',
    description:
      'Free home loan calculator for South Africa. Estimate your monthly bond repayment, transfer duty, and total monthly housing cost before you buy.',
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

interface HowToStepData {
  name: string;
  text: string;
}

interface HowToMeta {
  name: string;
  description: string;
  totalTime: string;
  steps: HowToStepData[];
}

const HOWTO_META: Record<CalcSlug, HowToMeta> = {
  'sars-income-tax-calculator': {
    name: 'How to calculate your South African income tax (PAYE) for 2026/2027',
    description:
      'Estimate your SARS PAYE, rebates, medical tax credits, UIF, and monthly take-home pay for the 2026/2027 tax year.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Enter your gross income',
        text: 'Type your salary into the gross income field and choose whether it is paid monthly or annually.',
      },
      {
        name: 'Select your age category',
        text: 'Choose under 65, 65 to 74, or 75 and older so the correct SARS rebate is applied.',
      },
      {
        name: 'Add medical aid dependants',
        text: 'Enter the total number of medical aid members (including yourself) to apply the monthly medical tax credit.',
      },
      {
        name: 'Add retirement fund contributions',
        text: 'Enter your monthly contributions to a pension, provident fund, or retirement annuity so they are deducted before tax.',
      },
      {
        name: 'Include UIF if applicable',
        text: 'Leave UIF checked if you contribute. UIF is 1% of gross, capped at R177.12 per month.',
      },
      {
        name: 'Calculate and review your results',
        text: 'Click Calculate Tax to see your annual PAYE, effective tax rate, and monthly net take-home pay.',
      },
    ],
  },
  'vehicle-finance-calculator': {
    name: 'How to calculate your South African vehicle finance repayment',
    description:
      'Work out the monthly instalment, total interest, and total cost of a car loan in South Africa, with optional balloon payment.',
    totalTime: 'PT1M',
    steps: [
      {
        name: 'Enter the vehicle price',
        text: 'Type the full on-the-road price of the vehicle in Rands into the vehicle price field.',
      },
      {
        name: 'Add your deposit',
        text: 'Enter the deposit amount you plan to pay upfront. A 10%–20% deposit usually gets a better interest rate.',
      },
      {
        name: 'Enter the interest rate',
        text: 'Use the rate quoted by your bank. If unsure, start with the current prime lending rate (around 11.75%).',
      },
      {
        name: 'Choose a loan term',
        text: 'Pick a term between 12 and 72 months. Shorter terms cost more monthly but less in total interest.',
      },
      {
        name: 'Add a balloon percentage (optional)',
        text: 'Enter a balloon percentage to reduce monthly instalments. Remember you must pay the balloon as a lump sum at the end.',
      },
      {
        name: 'Calculate and review',
        text: 'Click Calculate Finance to see your monthly instalment, total interest paid, and total cost of the vehicle.',
      },
    ],
  },
  'retirement-savings-calculator': {
    name: 'How to project your South African retirement savings',
    description:
      'Project how your retirement annuity will grow and estimate your monthly retirement income using the 4% safe withdrawal rule.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Enter your current age',
        text: 'Type your current age so the calculator knows how many years of compounding you have.',
      },
      {
        name: 'Set your retirement age',
        text: 'Enter the age at which you plan to stop working (typically 60, 65, or later in South Africa).',
      },
      {
        name: 'Enter your current savings',
        text: 'Add the total value of your retirement annuity, pension, preservation fund, and any other retirement savings.',
      },
      {
        name: 'Add your monthly contribution',
        text: 'Enter how much you contribute to retirement each month, including any employer match.',
      },
      {
        name: 'Set expected return and inflation',
        text: 'Use a realistic annual return (around 9% for a balanced fund) and inflation (around 5% in South Africa).',
      },
      {
        name: 'Enter your retirement goal',
        text: 'Type the total amount in Rands you believe you need to retire comfortably.',
      },
      {
        name: 'Project and review',
        text: 'Click Project My Retirement to see your projected balance, inflation-adjusted value, and estimated monthly income using the 4% rule.',
      },
    ],
  },
  'personal-loan-calculator': {
    name: 'How to calculate your South African personal loan repayment',
    description:
      'Estimate the monthly instalment, total interest, and total cost of credit on a South African personal loan governed by the NCA.',
    totalTime: 'PT1M',
    steps: [
      {
        name: 'Enter the loan amount',
        text: 'Type the Rand value you want to borrow (unsecured personal loans in South Africa are capped at R350,000 under the NCA).',
      },
      {
        name: 'Enter the interest rate',
        text: 'Use the rate quoted by the lender. Personal loan rates in South Africa typically range from 15% to above 25%.',
      },
      {
        name: 'Choose the loan term',
        text: 'Enter the repayment period in months (commonly 24 to 72 months). Longer terms lower instalments but raise total interest.',
      },
      {
        name: 'Add the monthly service fee',
        text: 'Enter the monthly admin fee. The NCA caps this at R69.00 per month for most lenders.',
      },
      {
        name: 'Calculate and compare',
        text: 'Click Calculate Loan to see the monthly instalment, total interest, and total cost of credit so you can compare offers.',
      },
    ],
  },
  'home-loan-calculator': {
    name: 'How to calculate your South African home loan repayment',
    description:
      'Estimate your monthly bond repayment, transfer duty, and upfront cash needed when buying property in South Africa.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Enter the property price',
        text: 'Type the agreed purchase price of the home in Rands.',
      },
      {
        name: 'Add your deposit',
        text: 'Enter the cash deposit you plan to pay upfront. A larger deposit usually lowers your interest rate and monthly repayment.',
      },
      {
        name: 'Enter the interest rate',
        text: 'Use the rate quoted by the bank or broker. South African bonds are usually priced relative to prime.',
      },
      {
        name: 'Choose the bond term',
        text: 'Select a repayment term, typically 20 to 30 years. Longer terms lower the instalment but increase total interest.',
      },
      {
        name: 'Add monthly rates and levies',
        text: 'Include municipal rates and body corporate or estate levies so you can see the full monthly housing cost.',
      },
      {
        name: 'Calculate and review',
        text: 'Click Calculate Bond to see your estimated monthly repayment, total interest, transfer duty, and upfront cash required.',
      },
    ],
  },
  'budget-calculator': {
    name: 'How to build a South African monthly budget using the 50/30/20 rule',
    description:
      'Create a monthly budget, split your spending into needs, wants and savings, and check whether you are aligned with the 50/30/20 rule.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Enter your monthly income',
        text: 'Type your net salary (after PAYE, UIF and medical aid) plus any side income or freelance earnings.',
      },
      {
        name: 'List your essential expenses',
        text: 'Enter housing, groceries, transport, utilities, medical aid, school fees, and minimum debt repayments. These count toward the 50% needs bucket.',
      },
      {
        name: 'List your lifestyle spending',
        text: 'Enter entertainment, shopping, takeaways, and subscriptions. These count toward the 30% wants bucket.',
      },
      {
        name: 'List your savings and investments',
        text: 'Enter retirement contributions, emergency fund transfers, tax-free savings account deposits, and any extra debt payments. These count toward the 20% savings bucket.',
      },
      {
        name: 'Analyze and adjust',
        text: 'Click Analyze My Budget to see your needs/wants/savings split versus 50/30/20 and identify categories to cut.',
      },
    ],
  },
  'currency-converter': {
    name: 'How to convert currencies using live exchange rates',
    description:
      'Convert Rands (ZAR) and major world currencies at the live mid-market rate and review 30-day trends.',
    totalTime: 'PT30S',
    steps: [
      {
        name: 'Select the source currency',
        text: 'Pick the currency you are converting from (for example, USD, GBP, or EUR).',
      },
      {
        name: 'Select the target currency',
        text: 'Pick the currency you want the result in (typically ZAR for South African users).',
      },
      {
        name: 'Enter the amount',
        text: 'Type the amount to convert. The result updates automatically at the live mid-market rate.',
      },
      {
        name: 'Review the 30-day chart',
        text: 'Check the chart to see whether the rate has strengthened or weakened recently before you transact.',
      },
      {
        name: 'Compare with your bank',
        text: 'Remember banks and bureaux add a spread. Use this mid-market rate as your baseline when comparing quotes.',
      },
    ],
  },
};

function buildHowToSchema(slug: CalcSlug) {
  const url = `${BASE_URL}/calculators/${slug}`;
  const meta = HOWTO_META[slug];

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${url}#howto`,
    name: meta.name,
    description: meta.description,
    inLanguage: 'en-ZA',
    author: reviewerPerson,
    publisher: { '@id': ORG_ID },
    totalTime: meta.totalTime,
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'ZAR',
      value: '0',
    },
    tool: [
      {
        '@type': 'HowToTool',
        name: 'Quick Money Tool calculator',
      },
    ],
    step: meta.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      url: `${url}#step-${index + 1}`,
    })),
  };
}

export function buildTaxHowToSchema() {
  return buildHowToSchema('sars-income-tax-calculator');
}

export function buildVehicleHowToSchema() {
  return buildHowToSchema('vehicle-finance-calculator');
}

export function buildRetirementHowToSchema() {
  return buildHowToSchema('retirement-savings-calculator');
}

export function buildPersonalLoanHowToSchema() {
  return buildHowToSchema('personal-loan-calculator');
}

export function buildBudgetHowToSchema() {
  return buildHowToSchema('budget-calculator');
}

export function buildHomeLoanHowToSchema() {
  return buildHowToSchema('home-loan-calculator');
}

export function buildCurrencyConverterHowToSchema() {
  return buildHowToSchema('currency-converter');
}
