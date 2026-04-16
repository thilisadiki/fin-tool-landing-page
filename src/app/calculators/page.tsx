import type { Metadata } from 'next';
import Link from 'next/link';
import { Calculator } from 'lucide-react';
import Section from '@/components/ui/Section';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import CalculatorHubFilter from '@/components/sections/CalculatorHubFilter';
import { tools } from '@/data/landingPageData';
import { buildBreadcrumbSchema } from '@/data/calculatorSchemaData';

const BASE_URL = 'https://www.quickmoneytool.com';

export const metadata: Metadata = {
  title: 'South African Finance Calculators: Free & Updated',
  description:
    'A hub of free South African finance calculators: SARS tax, vehicle finance, personal loans, retirement savings, monthly budgets, and currency conversion.',
  alternates: { canonical: '/calculators' },
  openGraph: {
    type: 'website',
    title: 'Finance Calculators for South Africans | Quick Money Tool',
    description:
      'Browse every free calculator on Quick Money Tool. Filter by goal: borrowing, saving, tax, or daily money decisions.',
    url: '/calculators',
  },
};

const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'Calculators', url: '/calculators' },
];
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'South African Finance Calculators',
  url: `${BASE_URL}/calculators`,
  description:
    'A complete hub of free finance calculators for South Africans covering tax, borrowing, saving, and daily money tools.',
  hasPart: tools.map((tool) => ({
    '@type': 'WebApplication',
    name: tool.title,
    url: `${BASE_URL}${tool.url}`,
    description: tool.description,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
  })),
};

export default function CalculatorsHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <Breadcrumbs items={breadcrumbItems} />

      <section className="px-6 py-20 bg-gradient-to-br dark:from-slate-900 dark:via-emerald-950 dark:to-teal-950 from-slate-50 via-emerald-50 to-teal-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-6">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Finance calculators for South Africans
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Every tool on this site in one place. Free, private, and built around
            South African tax brackets, interest rates, and currency pairs. Pick
            a goal below and get an answer in under a minute.
          </p>
        </div>
      </section>

      <Section>
        <CalculatorHubFilter />
      </Section>

      <Section className="bg-accent/30" maxWidth="max-w-4xl">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Which calculator should I use?
          </h2>
          <p className="text-muted-foreground mb-10">
            Most money questions fall into one of four buckets. Use the filter
            above to narrow the list, or read the summaries below to find the
            right tool for the decision you're making today.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Planning to borrow
              </h3>
              <p className="text-muted-foreground mb-4">
                Before you sign a car finance agreement or a personal loan, run
                the numbers yourself. The{' '}
                <Link
                  href="/calculators/vehicle-finance-calculator"
                  className="text-emerald-600 dark:text-emerald-400 underline"
                >
                  vehicle finance calculator
                </Link>{' '}
                handles balloon payments, deposits, and the true total cost of a
                car over the full term. The{' '}
                <Link
                  href="/calculators/personal-loan-calculator"
                  className="text-emerald-600 dark:text-emerald-400 underline"
                >
                  personal loan calculator
                </Link>{' '}
                lets you compare interest rates and loan terms side-by-side so
                you can spot the offers that are actually worth taking.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3">
                Saving for the future
              </h3>
              <p className="text-muted-foreground mb-4">
                Compound growth is hard to picture without seeing it on paper.
                The{' '}
                <Link
                  href="/calculators/retirement-savings-calculator"
                  className="text-emerald-600 dark:text-emerald-400 underline"
                >
                  retirement savings calculator
                </Link>{' '}
                projects your retirement annuity forward year by year, with
                inflation baked in, so you know whether your monthly contribution
                is actually on track for the lifestyle you want.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Sorting out tax
              </h3>
              <p className="text-muted-foreground mb-4">
                The{' '}
                <Link
                  href="/calculators/sars-income-tax-calculator"
                  className="text-emerald-600 dark:text-emerald-400 underline"
                >
                  SARS income tax calculator
                </Link>{' '}
                uses the current 2026/2027 tax tables to estimate PAYE,
                provisional tax, medical aid credits, and retirement fund
                deductions. It is a useful second opinion before you file, or
                when your salary structure changes mid-year.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3">
                Daily money
              </h3>
              <p className="text-muted-foreground mb-4">
                The everyday tools: the{' '}
                <Link
                  href="/calculators/budget-calculator"
                  className="text-emerald-600 dark:text-emerald-400 underline"
                >
                  budget calculator
                </Link>{' '}
                applies the 50/30/20 rule to your actual income and expenses, and
                the{' '}
                <Link
                  href="/calculators/currency-converter"
                  className="text-emerald-600 dark:text-emerald-400 underline"
                >
                  currency converter
                </Link>{' '}
                gives you live ZAR rates when you're travelling, shopping
                online, or paying an invoice in dollars or pounds.
              </p>
            </div>
          </div>

          <div className="mt-10 p-6 rounded-xl dark:bg-slate-800/50 bg-slate-100 border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Why trust these calculators?
            </h3>
            <p className="text-muted-foreground">
              Every calculation runs entirely in your browser. Nothing you type
              is sent to our servers, and nothing is stored. Tax tables,
              interest-rate formulas, and amortisation schedules are reviewed
              whenever SARS, the SARB, or major lenders update their numbers.
              The tools are free, with no sign-up, no paywall, and no newsletter
              nag.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
