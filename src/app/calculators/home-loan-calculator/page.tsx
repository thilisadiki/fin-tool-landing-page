'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import Section from '@/components/ui/Section';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ReviewedBy from '@/components/ui/ReviewedBy';
import { ndulamiso } from '@/data/authors';
import HomeLoanForm from '@/components/calculators/home-loan/HomeLoanForm';
import HomeLoanResultsPanel from '@/components/calculators/home-loan/HomeLoanResultsPanel';
import HomeLoanAmortizationTable from '@/components/calculators/home-loan/HomeLoanAmortizationTable';
import {
  calculateHomeLoan,
  type HomeLoanInputs,
  type HomeLoanResult,
} from '@/lib/calculators/homeLoanCalculator';
import {
  buildHomeLoanCalculatorSchema,
  buildBreadcrumbSchema,
  buildHomeLoanHowToSchema,
  getCalculatorDateModified,
} from '@/data/calculatorSchemaData';
import CalculatorFaq from '@/components/sections/CalculatorFaq';
import { homeLoanFaqs } from '@/data/calculatorFaqs';
import { formatZAR } from '@/lib/formatters';

const DEFAULT_INPUTS: HomeLoanInputs = {
  propertyPrice: 1850000,
  deposit: 185000,
  interestRate: 10.25,
  loanTermMonths: 240,
  monthlyRates: 1800,
  monthlyLevies: 0,
};

const homeLoanSchema = buildHomeLoanCalculatorSchema();
const homeLoanHowToSchema = buildHomeLoanHowToSchema();
const reviewedOn = getCalculatorDateModified('home-loan-calculator');
const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'Calculators', url: '/calculators' },
  { name: 'Home Loan Calculator', url: '/calculators/home-loan-calculator' },
];
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

export default function HomeLoanCalculatorPage() {
  const [inputs, setInputs] = useState<HomeLoanInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<HomeLoanResult | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleCalculate = () => {
    if (inputs.propertyPrice <= 0 || inputs.loanTermMonths <= 0) return;
    setResult(calculateHomeLoan(inputs));

    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 767px)').matches
    ) {
      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeLoanSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeLoanHowToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Breadcrumbs items={breadcrumbItems} />

      <section className="px-6 py-16 bg-gradient-to-br dark:from-[#070f1a] dark:via-[#0F2744] dark:to-[#070f1a] from-slate-50 via-[#eef2f7] to-[#e6ecf4]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-16 h-16 bg-gradient-to-r from-[#0F2744] to-[#C9A84C] rounded-xl flex items-center justify-center mx-auto mb-6">
              <Home className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Home Loan Calculator
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Estimate your monthly bond repayment, transfer duty, and total monthly
              housing cost before you buy property in South Africa.
            </p>
          </motion.div>
        </div>
      </section>

      <ReviewedBy author={ndulamiso} dateReviewed={reviewedOn} />

      <Section maxWidth="max-w-4xl">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Property Details</h2>
            <HomeLoanForm
              inputs={inputs}
              onChange={setInputs}
              onCalculate={handleCalculate}
            />
          </div>

          <div ref={resultsRef} className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6">Results</h2>
            {result ? (
              <div className="space-y-6">
                <HomeLoanResultsPanel result={result} />
                <HomeLoanAmortizationTable result={result} deposit={inputs.deposit} />
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 rounded-xl border border-dashed border-border px-6">
                <p className="text-muted-foreground text-center">
                  Enter your property details, then click
                  <br />
                  &quot;Calculate Bond&quot; to see your results.
                </p>
              </div>
            )}
          </div>
        </div>
      </Section>

      <div className="px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="p-6 rounded-xl dark:bg-slate-800/50 bg-slate-100 border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-4">In this guide</h2>
            <nav>
              <ul className="grid md:grid-cols-2 gap-2 text-sm">
                <li>
                  <a
                    href="#what-is-home-loan-calculator"
                    className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline"
                  >
                    1. What is a home loan calculator?
                  </a>
                </li>
                <li>
                  <a
                    href="#how-to-use"
                    className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline"
                  >
                    2. How to use this calculator
                  </a>
                </li>
                <li>
                  <a
                    href="#what-affects-your-bond"
                    className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline"
                  >
                    3. What affects your monthly bond payment
                  </a>
                </li>
                <li>
                  <a
                    href="#deposit-transfer-duty"
                    className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline"
                  >
                    4. Deposit, transfer duty, and cash up front
                  </a>
                </li>
                <li>
                  <a
                    href="#prime-rates"
                    className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline"
                  >
                    5. Prime-linked rates in South Africa
                  </a>
                </li>
                <li>
                  <a
                    href="#common-mistakes"
                    className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline"
                  >
                    6. Common mistakes to avoid
                  </a>
                </li>
                <li>
                  <a
                    href="#home-loan-faq"
                    className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline"
                  >
                    7. Frequently asked questions
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div
            className="prose prose-slate dark:prose-invert max-w-none"
            id="what-is-home-loan-calculator"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What Is a Home Loan Calculator?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A home loan calculator helps you estimate what a property purchase will
              feel like in real money each month. You enter the purchase price, your
              deposit, the interest rate, and the bond term, and the calculator works
              out the monthly repayment on the loan.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              This version goes a step further than a generic mortgage calculator. It
              also estimates transfer duty using current SARS rates and lets you add
              monthly rates and levies, so you can see the full housing cost instead of
              just the bond instalment.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              That matters because South African property affordability is rarely about
              the bond alone. Municipal charges, levies, and once-off transaction costs
              often make the difference between a deal that looks comfortable on paper
              and one that squeezes your budget.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none" id="how-to-use">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              How to Use This Home Loan Calculator
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Start with the numbers you already know, then tighten the estimate as your
              bank or broker gives you actual pricing.
            </p>

            <div className="not-prose space-y-3">
              {[
                {
                  step: '1',
                  title: 'Enter the property price',
                  desc: 'Use the agreed purchase price or the target price range you are shopping in.',
                },
                {
                  step: '2',
                  title: 'Add your deposit',
                  desc: 'A bigger deposit reduces the amount borrowed and often improves the rate a bank will offer you.',
                },
                {
                  step: '3',
                  title: 'Use a realistic interest rate',
                  desc: 'If you have a quote, use it. If not, start near the market reference rate and adjust once you get bank pricing.',
                },
                {
                  step: '4',
                  title: 'Choose the term',
                  desc: 'Twenty years is common. Thirty years improves monthly affordability but increases total interest materially.',
                },
                {
                  step: '5',
                  title: 'Add rates and levies',
                  desc: 'These are real monthly housing costs and should be included before you decide the property is affordable.',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex gap-4 p-4 rounded-xl dark:bg-slate-800/50 bg-white border border-border"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-[#0F2744] to-[#1E3A5F] rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="prose prose-slate dark:prose-invert max-w-none"
            id="what-affects-your-bond"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What Affects Your Monthly Bond Payment
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Four variables drive the repayment more than anything else.
            </p>

            <div className="grid md:grid-cols-2 gap-6 not-prose">
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-slate-100 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">Property price</h3>
                <p className="text-sm text-muted-foreground">
                  The higher the purchase price, the more capital you need to borrow.
                </p>
              </div>
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-slate-100 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">Deposit size</h3>
                <p className="text-sm text-muted-foreground">
                  A bigger deposit lowers the principal, improves your loan-to-value
                  ratio, and often helps on rate negotiations.
                </p>
              </div>
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-slate-100 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">Interest rate</h3>
                <p className="text-sm text-muted-foreground">
                  Even a 0.5% rate change has a large impact on a 20- or 30-year loan.
                </p>
              </div>
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-slate-100 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">Bond term</h3>
                <p className="text-sm text-muted-foreground">
                  Longer terms reduce the instalment but increase the total interest
                  paid over the life of the bond.
                </p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mt-6">
              The calculator shows both the bond repayment and the broader monthly
              housing cost. That second number is often the more useful one when you are
              stress-testing your budget.
            </p>
          </div>

          <div
            className="prose prose-slate dark:prose-invert max-w-none"
            id="deposit-transfer-duty"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Deposit, Transfer Duty, and Cash Up Front
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Buying property in South Africa usually requires more upfront cash than
              just the deposit. For transfer-duty transactions, SARS applies a sliding
              scale based on the value of the property.
            </p>

            <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-slate-100 border border-border not-prose">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Transfer duty check
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                For acquisitions from 1 April 2026, SARS charges 0% transfer duty up to{' '}
                <span className="font-medium text-foreground">{formatZAR(1210000)}</span>,
                then steps up on a sliding scale above that threshold.
              </p>
              <p className="text-sm text-muted-foreground">
                Source:{' '}
                <a
                  href="https://www.sars.gov.za/tax-rates/transfer-duty/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]"
                >
                  SARS transfer duty rates
                </a>
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed mt-4">
              This estimate is useful, but it is not the full closing-cost picture.
              Attorney fees, deeds office charges, bond registration costs, insurance,
              and moving expenses are separate. A good rule is to keep a buffer above
              the bare minimum the calculator shows.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none" id="prime-rates">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Prime-Linked Rates in South Africa
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Home loans in South Africa are commonly quoted relative to prime. That is
              why a bank offer might be framed as prime less 0.5% or prime plus 1%.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              In the South African Reserve Bank&apos;s March 2026 MPC statement, the
              policy rate was held at 6.75%. In an April 2026 consultation paper, SARB
              notes that prime has functioned as a fixed spread of 350 basis points
              above the policy rate since 2001. That implies a reference prime around
              10.25% in late April 2026.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Your actual bond rate can still be better or worse than that reference
              depending on your deposit, credit profile, income stability, and which
              bank wins your application.
            </p>
          </div>

          <div
            className="prose prose-slate dark:prose-invert max-w-none"
            id="common-mistakes"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Common Mistakes to Avoid
            </h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>Focusing only on the bond instalment and ignoring rates, levies, and maintenance.</li>
              <li>Using the bank&apos;s maximum approval amount as your target budget.</li>
              <li>Taking the longest term available without comparing the total interest bill.</li>
              <li>Underestimating upfront costs and leaving no cash buffer after transfer.</li>
              <li>Failing to compare multiple lenders or a broker&apos;s negotiated offers.</li>
            </ul>

            <p className="text-muted-foreground leading-relaxed mt-4">
              The best use of a bond calculator is not to prove you can technically buy
              a property. It is to find the price level and loan structure that still
              feels calm and sustainable after the excitement of the purchase wears off.
            </p>
          </div>
        </div>
      </div>

      <div id="home-loan-faq">
        <CalculatorFaq
          faqs={homeLoanFaqs}
          title="Home loan FAQ"
          subtitle="Bond repayments, deposits, transfer duty, and the real monthly cost of owning property."
        />
      </div>
    </>
  );
}
