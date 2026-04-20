'use client';

import { useRef, useState } from 'react';
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
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleCalculate = () => {
    if (inputs.loanAmount <= 0 || inputs.loanTermMonths <= 0) return;
    setResult(calculatePersonalLoan(inputs));
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches) {
      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
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
      <section className="px-6 py-16 bg-gradient-to-br dark:from-[#070f1a] dark:via-[#0F2744] dark:to-[#070f1a] from-slate-50 via-[#eef2f7] to-[#e6ecf4]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-16 h-16 bg-gradient-to-r from-[#B8943E] to-[#9A7A32] rounded-xl flex items-center justify-center mx-auto mb-6">
              <Landmark className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Personal Loan Calculator
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Use the Quick Money Tool personal loan calculator to work out your monthly repayments, see how much interest you&apos;ll pay, and understand the full cost of your loan before you commit.
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

          <div ref={resultsRef} className="scroll-mt-24">
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

      {/* Guide content wrapper with tighter spacing */}
      <div className="px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="p-6 rounded-xl dark:bg-slate-800/50 bg-slate-100 border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-4">In this guide</h2>
            <nav>
              <ul className="grid md:grid-cols-2 gap-2 text-sm">
                <li><a href="#what-is-personal-loan-calculator" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">1. What is a personal loan calculator?</a></li>
                <li><a href="#how-to-use" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">2. How to use this calculator</a></li>
                <li><a href="#how-loans-work" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">3. How personal loans work in SA</a></li>
                <li><a href="#factors-affecting-repayments" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">4. Factors that affect repayments</a></li>
                <li><a href="#typical-rates" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">5. Typical interest rates in SA</a></li>
                <li><a href="#fixed-vs-variable" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">6. Fixed vs variable rates</a></li>
                <li><a href="#can-you-afford" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">7. Can you afford a personal loan?</a></li>
                <li><a href="#common-uses" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">8. Common uses for personal loans</a></li>
                <li><a href="#reduce-loan-costs" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">9. How to reduce loan costs</a></li>
                <li><a href="#true-cost" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">10. The true cost of a loan</a></li>
                <li><a href="#debt-consolidation" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">11. Debt consolidation</a></li>
                <li><a href="#common-mistakes" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">12. Common mistakes to avoid</a></li>
                <li><a href="#interest-rate-impact" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">13. Impact of interest rates</a></li>
                <li><a href="#personal-loan-faq" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">14. Frequently asked questions</a></li>
              </ul>
            </nav>
          </div>

          {/* Section 1: What is a personal loan calculator */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="what-is-personal-loan-calculator">
            <h2 className="text-3xl font-bold text-foreground mb-4">What Is a Personal Loan Calculator?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A personal loan calculator is a financial tool that helps you estimate your monthly loan repayments, total interest, and overall cost of borrowing. By entering your loan amount, interest rate, and repayment term, you can quickly understand what your loan will cost you over time.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Instead of relying on lender estimates alone, the Quick Money Tool personal loan calculator gives you an independent and transparent way to plan your finances before applying for a loan.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              In South Africa, personal loans are widely used for expenses such as emergencies, home improvements, education, and debt consolidation. However, because these loans are typically unsecured, they often come with higher interest rates. Understanding your repayment obligations upfront is essential to avoid financial strain.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This tool is designed to help you make informed borrowing decisions and stay in control of your finances.
            </p>
          </div>

          {/* Section 2: How to Use */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="how-to-use">
            <h2 className="text-3xl font-bold text-foreground mb-4">How to Use This Personal Loan Calculator</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Using the calculator is simple, but accuracy depends on entering realistic values. Follow these steps:
            </p>

            <div className="not-prose space-y-3">
              {[
                { step: '1', title: 'Enter the loan amount', desc: 'This is the total amount you want to borrow.' },
                { step: '2', title: 'Input the interest rate', desc: 'This is the annual rate charged by the lender.' },
                { step: '3', title: 'Select the loan term', desc: 'Choose how long you want to repay the loan (e.g. 12 to 72 months).' },
                { step: '4', title: 'Review your results', desc: 'The calculator will estimate your monthly repayment, total interest paid, and total repayment amount.' },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 p-4 rounded-xl dark:bg-slate-800/50 bg-white border border-border">
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

            <p className="text-muted-foreground leading-relaxed mt-4">
              You can adjust these values to compare different scenarios and find a loan structure that fits your budget.
            </p>
          </div>

          {/* Section 3: How loans work */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="how-loans-work">
            <h2 className="text-3xl font-bold text-foreground mb-4">How Personal Loans Work in South Africa</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A personal loan is a type of credit that allows you to borrow money without providing collateral. You repay the loan in fixed monthly instalments over an agreed period.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Because personal loans are unsecured, lenders take on more risk. As a result, interest rates are generally higher than secured loans like vehicle finance or home loans.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              According to the{' '}
              <a href="https://www.ncr.org.za/" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">National Credit Regulator</a>,
              consumers should fully understand the cost of credit before entering into any agreement. This includes not just the monthly repayment, but also fees, interest, and the total repayment amount.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3">Key components of a personal loan</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><strong className="text-foreground">Loan amount (principal):</strong> the amount you borrow.</li>
              <li><strong className="text-foreground">Interest rate:</strong> the cost of borrowing money.</li>
              <li><strong className="text-foreground">Loan term:</strong> the repayment period.</li>
              <li><strong className="text-foreground">Monthly repayment:</strong> the fixed instalment paid each month.</li>
              <li><strong className="text-foreground">Total cost of credit:</strong> the total amount repaid including interest and fees.</li>
            </ul>
          </div>

          {/* Section 4: Factors */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="factors-affecting-repayments">
            <h2 className="text-3xl font-bold text-foreground mb-4">Factors That Affect Your Loan Repayments</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Your monthly repayment is influenced by several important factors.
            </p>

            <div className="grid md:grid-cols-2 gap-6 not-prose">
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-slate-100 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">1. Loan amount</h3>
                <p className="text-sm text-muted-foreground">The more you borrow, the higher your monthly repayment and total interest paid.</p>
              </div>
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-slate-100 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">2. Interest rate</h3>
                <p className="text-sm text-muted-foreground">Rates vary with your credit score, income, and lender policies. Even a small difference can significantly affect your total repayment.</p>
              </div>
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-slate-100 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">3. Loan term</h3>
                <p className="text-sm text-muted-foreground">Longer terms lower your monthly repayment but increase the total interest paid over time.</p>
              </div>
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-slate-100 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">4. Credit profile</h3>
                <p className="text-sm text-muted-foreground">Your credit score plays a major role in determining the rate you are offered. A stronger profile usually results in better loan terms.</p>
              </div>
            </div>
          </div>

          {/* Section 5: Typical Rates */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="typical-rates">
            <h2 className="text-3xl font-bold text-foreground mb-4">Typical Personal Loan Interest Rates in South Africa</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Interest rates for personal loans vary widely depending on the borrower&apos;s risk profile and market conditions.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Rates are influenced by the repo rate set by the{' '}
              <a href="https://www.resbank.co.za" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">South African Reserve Bank</a>,
              which affects how banks price their loans. The{' '}
              <a href="https://www.ncr.org.za/documents/pages/guidelines/Maximum-rate-interest-and-fees.pdf" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">National Credit Act caps unsecured lending rates</a>{' '}
              at the repo rate × 2.2 + 20% per annum.
            </p>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li>Low-risk borrowers receive lower interest rates.</li>
              <li>Higher-risk borrowers pay higher rates.</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              This is why it is important to compare multiple lenders before choosing a loan.
            </p>
          </div>

          {/* Section 6: Fixed vs Variable */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="fixed-vs-variable">
            <h2 className="text-3xl font-bold text-foreground mb-4">Fixed vs Variable Interest Rates</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              When taking out a personal loan, you may encounter two types of interest rates.
            </p>

            <div className="grid md:grid-cols-2 gap-6 not-prose mb-4">
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-white border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-3">Fixed interest rate</h3>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li>Monthly repayment remains constant</li>
                  <li>Easier to budget</li>
                  <li>Protection against rising interest rates</li>
                </ul>
              </div>
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-white border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-3">Variable interest rate</h3>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li>Repayments may change over time</li>
                  <li>Linked to market conditions</li>
                  <li>Can be lower initially but carries risk</li>
                </ul>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Most personal loans in South Africa are offered at fixed rates, making them more predictable for budgeting purposes.
            </p>
          </div>

          {/* Section 7: Afford */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="can-you-afford">
            <h2 className="text-3xl font-bold text-foreground mb-4">How to Know If You Can Afford a Personal Loan</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Before taking a loan, it is important to assess affordability carefully.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A general guideline is that your total debt repayments should not exceed 30%–40% of your monthly income. However, this depends on your individual financial situation.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To determine affordability:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground mb-4">
              <li>Calculate your net monthly income.</li>
              <li>Subtract essential expenses (rent, food, transport).</li>
              <li>Allocate a portion of the remaining amount to loan repayments.</li>
            </ol>
            <p className="text-muted-foreground leading-relaxed">
              You can use the{' '}
              <a href="/calculators/budget-calculator" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">budget calculator</a>{' '}
              to assess your monthly expenses and the{' '}
              <a href="/calculators/sars-income-tax-calculator" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">SARS income tax calculator</a>{' '}
              to estimate your take-home pay. This ensures that your loan fits comfortably within your financial limits.
            </p>
          </div>

          {/* Section 8: Common Uses */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="common-uses">
            <h2 className="text-3xl font-bold text-foreground mb-4">Common Uses for Personal Loans</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Personal loans are flexible and can be used for a variety of purposes:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li>Debt consolidation</li>
              <li>Emergency expenses</li>
              <li>Home improvements</li>
              <li>Medical bills</li>
              <li>Education and courses</li>
              <li>Business startup costs</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              However, it is important to borrow responsibly and only for necessary expenses.
            </p>
          </div>

          {/* Section 9: Reduce Costs */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="reduce-loan-costs">
            <h2 className="text-3xl font-bold text-foreground mb-4">How to Reduce Your Loan Costs</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              If you want to minimise the cost of your loan, consider the following strategies.
            </p>

            <div className="not-prose space-y-4">
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-white border border-border">
                <h3 className="font-semibold text-foreground mb-2">1. Borrow only what you need</h3>
                <p className="text-sm text-muted-foreground">Avoid taking a larger loan than necessary, as this increases both your monthly repayment and total interest.</p>
              </div>
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-white border border-border">
                <h3 className="font-semibold text-foreground mb-2">2. Choose a shorter loan term</h3>
                <p className="text-sm text-muted-foreground">While monthly payments may be higher, you will pay less interest overall.</p>
              </div>
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-white border border-border">
                <h3 className="font-semibold text-foreground mb-2">3. Improve your credit score</h3>
                <p className="text-sm text-muted-foreground">Paying bills on time and reducing existing debt can help you qualify for better interest rates.</p>
              </div>
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-white border border-border">
                <h3 className="font-semibold text-foreground mb-2">4. Compare lenders</h3>
                <p className="text-sm text-muted-foreground">Different lenders offer different rates and terms. Shopping around can save you money.</p>
              </div>
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-white border border-border">
                <h3 className="font-semibold text-foreground mb-2">5. Avoid unnecessary fees</h3>
                <p className="text-sm text-muted-foreground">Check for initiation fees, service fees, and early settlement penalties before committing.</p>
              </div>
            </div>
          </div>

          {/* Section 10: True Cost */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="true-cost">
            <h2 className="text-3xl font-bold text-foreground mb-4">The True Cost of a Personal Loan</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Many borrowers focus only on the monthly repayment, but the total cost of a loan includes:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li>Interest charges</li>
              <li>Initiation fees</li>
              <li>Monthly service fees</li>
              <li>Insurance (if required)</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Over time, these costs can add up significantly. That&apos;s why it&apos;s important to look beyond the monthly instalment and consider the total repayment amount.
            </p>
          </div>

          {/* NCR fees callout */}
          <div className="p-6 rounded-xl dark:bg-slate-800/50 bg-slate-100 border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-3">Fees regulated by the NCR</h3>
            <p className="text-muted-foreground mb-3">
              The{' '}
              <a href="https://www.ncr.org.za/" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">National Credit Regulator (NCR)</a>{' '}
              sets maximum fees lenders may charge under the National Credit Act. These caps are published in the{' '}
              <a href="https://www.ncr.org.za/documents/pages/guidelines/Maximum-rate-interest-and-fees.pdf" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">NCR maximum rates &amp; fees schedule</a>.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex justify-between gap-4">
                <span>Initiation fee</span>
                <span className="text-foreground text-right">One-time, up to R1,207.50 incl. VAT</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Monthly service fee</span>
                <span className="text-foreground text-right">Up to R69.00 per month</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Credit life insurance</span>
                <span className="text-foreground text-right">Optional, but often bundled</span>
              </li>
            </ul>
          </div>

          {/* Section 11: Debt Consolidation */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="debt-consolidation">
            <h2 className="text-3xl font-bold text-foreground mb-4">Debt Consolidation: A Smart Use of Personal Loans</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              One of the most common uses of personal loans is debt consolidation.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              This involves combining multiple debts into a single loan with one monthly payment. Benefits include:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li>Simplified repayments</li>
              <li>Potentially lower interest rates</li>
              <li>Better financial management</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              However, consolidation only works if you avoid accumulating new debt.
            </p>
          </div>

          {/* Section 12: Common Mistakes */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="common-mistakes">
            <h2 className="text-3xl font-bold text-foreground mb-4">Common Mistakes to Avoid</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Many people make avoidable mistakes when taking personal loans:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li>Borrowing more than they can afford</li>
              <li>Ignoring the total cost of the loan</li>
              <li>Choosing long repayment terms unnecessarily</li>
              <li>Not comparing lenders</li>
              <li>Failing to budget properly</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Avoiding these mistakes can save you significant money over time.
            </p>
          </div>

          {/* Section 13: Interest Rate Impact */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="interest-rate-impact">
            <h2 className="text-3xl font-bold text-foreground mb-4">The Impact of Interest Rates on Your Loan</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Interest rates are one of the biggest factors affecting your loan cost.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              When the repo rate changes, lenders adjust their rates accordingly. This can influence:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li>Monthly repayments</li>
              <li>Total interest paid</li>
              <li>Loan affordability</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Staying informed about economic updates from the{' '}
              <a href="https://www.resbank.co.za" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">South African Reserve Bank</a>{' '}
              can help you time your borrowing decisions more effectively.
            </p>
          </div>

          {/* Final Thoughts */}
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold text-foreground mb-4">Final Thoughts</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A personal loan calculator is an essential tool for anyone considering borrowing money. It helps you understand your financial commitments, compare loan options, and avoid costly mistakes.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Before applying for a loan, take the time to assess your affordability, compare different lenders, and understand the full cost of credit.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You can also use related Quick Money Tool calculators: the{' '}
              <a href="/calculators/budget-calculator" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">budget calculator</a>{' '}
              to track monthly affordability, the{' '}
              <a href="/calculators/retirement-savings-calculator" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">retirement savings calculator</a>{' '}
              for long-term goals, and the{' '}
              <a href="/calculators/vehicle-finance-calculator" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">vehicle finance calculator</a>{' '}
              if you are weighing a car purchase.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              By combining careful planning with the right tools and guidance from trusted organisations like the National Credit Regulator and the South African Reserve Bank, you can make smarter financial decisions and maintain long-term financial stability.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div id="personal-loan-faq">
        <CalculatorFaq
          faqs={personalLoanFaqs}
          title="Personal loans: frequently asked questions"
          subtitle="Interest vs APR, early settlement, consolidation, and the rules set by the National Credit Act."
        />
      </div>
    </>
  );
}
