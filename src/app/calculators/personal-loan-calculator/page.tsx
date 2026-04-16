'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Landmark } from 'lucide-react';
import Section from '@/components/ui/Section';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ReviewedBy from '@/components/ui/ReviewedBy';
import { ndulamiso } from '@/data/authors';
import LoanForm from '@/components/calculators/loan/LoanForm';
import LoanResultsPanel from '@/components/calculators/loan/LoanResultsPanel';
import LoanAmortizationTable from '@/components/calculators/loan/LoanAmortizationTable';
import { calculatePersonalLoan, type PersonalLoanInputs, type PersonalLoanResult } from '@/lib/calculators/loanCalculator';
import { buildPersonalLoanCalculatorSchema, buildBreadcrumbSchema, buildPersonalLoanHowToSchema, getCalculatorDateModified } from '@/data/calculatorSchemaData';
import CalculatorFaq from '@/components/sections/CalculatorFaq';
import { personalLoanFaqs } from '@/data/calculatorFaqs';

const DEFAULT_INPUTS: PersonalLoanInputs = {
  loanAmount: 100000,
  interestRate: 15.5,
  loanTermMonths: 60,
  monthlyFee: 69,
};

const loanCalcSchema = buildPersonalLoanCalculatorSchema();
const loanHowToSchema = buildPersonalLoanHowToSchema();
const reviewedOn = getCalculatorDateModified('personal-loan-calculator');
const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'Calculators', url: '/calculators' },
  { name: 'Personal Loan Calculator', url: '/calculators/personal-loan-calculator' },
];
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

export default function PersonalLoanCalculatorPage() {
  const [inputs, setInputs] = useState<PersonalLoanInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<PersonalLoanResult | null>(null);

  const handleCalculate = () => {
    if (inputs.loanAmount <= 0 || inputs.loanTermMonths <= 0) return;
    setResult(calculatePersonalLoan(inputs));
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(loanCalcSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(loanHowToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Breadcrumbs items={breadcrumbItems} />

      {/* Hero */}
      <section className="px-6 py-16 bg-gradient-to-br dark:from-slate-900 dark:via-amber-950 dark:to-orange-950 from-slate-50 via-amber-50 to-orange-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Landmark className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Personal Loan Calculator
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculate your monthly personal loan repayments, see how much interest you&apos;ll pay, and understand the full cost of your loan before you commit.
            </p>
          </motion.div>
        </div>
      </section>

      <ReviewedBy author={ndulamiso} dateReviewed={reviewedOn} />

      {/* Calculator */}
      <Section maxWidth="max-w-4xl">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Loan Details</h2>
            <LoanForm
              inputs={inputs}
              onChange={setInputs}
              onCalculate={handleCalculate}
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Results</h2>
            {result ? (
              <div className="space-y-6">
                <LoanResultsPanel result={result} />
                <LoanAmortizationTable result={result} />
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 rounded-xl border border-dashed border-border px-6">
                <p className="text-muted-foreground text-center">
                  Enter your loan amount, interest rate, and term, then click<br />&quot;Calculate Loan&quot; to see your results.
                </p>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* SEO Content */}
      <Section className="bg-accent/30">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Understanding Personal Loans in South Africa
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">How Personal Loans Work</h3>
              <p className="text-muted-foreground mb-4">
                A personal loan is an unsecured credit agreement where a bank or financial institution lends you a fixed amount of money that you repay in equal monthly installments over a set period. Unlike vehicle or home loans, personal loans are not tied to an asset, which means the interest rate is typically higher due to the increased risk for the lender.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3">Interest Rate Factors</h3>
              <p className="text-muted-foreground mb-4">
                Your interest rate is highly dependent on your credit score and affordability profile. In South Africa, personal loan rates can range from the{' '}
                <a href="https://www.resbank.co.za/en/home/what-we-do/statistics/key-statistics/current-market-rates" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 underline hover:text-emerald-500">prime lending rate</a>{' '}
                (currently around 11.75%) to well above 20% for higher-risk applicants. The{' '}
                <a href="https://www.ncr.org.za/documents/pages/guidelines/Maximum-rate-interest-and-fees.pdf" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 underline hover:text-emerald-500">National Credit Act caps unsecured lending rates</a>{' '}
                at the repo rate × 2.2 + 20% per annum. Always compare offers from multiple lenders before committing.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Total Cost of Credit</h3>
              <p className="text-muted-foreground mb-4">
                The{' '}
                <a href="https://www.ncr.org.za/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 underline hover:text-emerald-500">National Credit Act (NCA)</a>{' '}
                requires lenders to disclose the total cost of credit, which includes all interest and fees over the life of the loan. Our calculator shows you this figure upfront, helping you understand exactly what you&apos;ll pay. A longer term means lower monthly payments but significantly more interest over time.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3">When to Consider a Personal Loan</h3>
              <p className="text-muted-foreground mb-4">
                Personal loans are commonly used for debt consolidation, home improvements, medical expenses, or large planned purchases. They offer fixed repayment terms and predictable monthly installments, making them easier to budget for compared to revolving credit like credit cards.
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 rounded-xl dark:bg-slate-800/50 bg-slate-100 border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-3">Fees You Should Know About</h3>
            <p className="text-muted-foreground mb-3">
              The{' '}
              <a href="https://www.ncr.org.za/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 underline hover:text-emerald-500">National Credit Regulator (NCR)</a>{' '}
              sets maximum fees lenders may charge under the National Credit Act. These caps are published in the{' '}
              <a href="https://www.ncr.org.za/documents/pages/guidelines/Maximum-rate-interest-and-fees.pdf" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 underline hover:text-emerald-500">NCR maximum rates & fees schedule</a>.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex justify-between">
                <span>Initiation Fee</span>
                <span className="text-foreground">One-time, up to R1,207.50 (incl. VAT)</span>
              </li>
              <li className="flex justify-between">
                <span>Monthly Service Fee</span>
                <span className="text-foreground">Up to R69.00 per month</span>
              </li>
              <li className="flex justify-between">
                <span>Credit Life Insurance</span>
                <span className="text-foreground">Optional, but often bundled</span>
              </li>
            </ul>
            <p className="text-xs text-muted-foreground mt-3">
              Fee caps sourced from the{' '}
              <a href="https://www.ncr.org.za/documents/pages/guidelines/Maximum-rate-interest-and-fees.pdf" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 underline hover:text-emerald-500">NCR maximum rates &amp; fees schedule</a>.
            </p>
          </div>
        </div>
      </Section>

      <CalculatorFaq
        faqs={personalLoanFaqs}
        title="Personal loans: frequently asked questions"
        subtitle="Interest vs APR, early settlement, consolidation, and the rules set by the National Credit Act."
      />
    </>
  );
}
