'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Car } from 'lucide-react';
import Section from '@/components/ui/Section';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ReviewedBy from '@/components/ui/ReviewedBy';
import { ndulamiso } from '@/data/authors';
import VehicleFinanceForm from '@/components/calculators/vehicle/VehicleFinanceForm';
import VehicleResultsPanel from '@/components/calculators/vehicle/VehicleResultsPanel';
import VehicleAmortizationTable from '@/components/calculators/vehicle/VehicleAmortizationTable';
import { calculateVehicleFinance, type VehicleFinanceInputs, type VehicleFinanceResult } from '@/lib/calculators/vehicleCalculator';
import { buildVehicleCalculatorSchema, buildBreadcrumbSchema, buildVehicleHowToSchema, getCalculatorDateModified } from '@/data/calculatorSchemaData';
import CalculatorFaq from '@/components/sections/CalculatorFaq';
import { vehicleFinanceFaqs } from '@/data/calculatorFaqs';

const DEFAULT_INPUTS: VehicleFinanceInputs = {
  vehiclePrice: 300000,
  deposit: 30000,
  interestRate: 11.75,
  loanTermMonths: 72,
  balloonPercentage: 0,
};

const vehicleCalcSchema = buildVehicleCalculatorSchema();
const vehicleHowToSchema = buildVehicleHowToSchema();
const reviewedOn = getCalculatorDateModified('vehicle-finance-calculator');
const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'Calculators', url: '/calculators' },
  { name: 'Vehicle Finance Calculator', url: '/calculators/vehicle-finance-calculator' },
];
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

export default function VehicleFinanceCalculatorPage() {
  const [inputs, setInputs] = useState<VehicleFinanceInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<VehicleFinanceResult | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleCalculate = () => {
    if (inputs.vehiclePrice <= 0 || inputs.loanTermMonths <= 0) return;
    setResult(calculateVehicleFinance(inputs));
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleCalcSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleHowToSchema) }}
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
            <div className="w-16 h-16 bg-gradient-to-r from-[#C9A84C] to-[#B8943E] rounded-xl flex items-center justify-center mx-auto mb-6">
              <Car className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Vehicle Finance Calculator
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Use the Quick Money Tool vehicle finance calculator to work out your monthly car payments, total interest, and evaluate whether a balloon payment makes sense for your budget.
            </p>
          </motion.div>
        </div>
      </section>

      <ReviewedBy author={ndulamiso} dateReviewed={reviewedOn} />

      {/* Calculator */}
      <Section maxWidth="max-w-4xl">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Finance Details</h2>
            <VehicleFinanceForm
              inputs={inputs}
              onChange={setInputs}
              onCalculate={handleCalculate}
            />
          </div>

          <div ref={resultsRef} className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6">Results</h2>
            {result ? (
              <div className="space-y-6">
                <VehicleResultsPanel result={result} />
                <VehicleAmortizationTable result={result} />
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 rounded-xl border border-dashed border-border px-6">
                <p className="text-muted-foreground text-center">
                  Enter your vehicle details, interest rate, and term, then click<br />&quot;Calculate Finance&quot; to see your results.
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
                <li><a href="#what-is-vehicle-finance-calculator" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">1. What is a vehicle finance calculator?</a></li>
                <li><a href="#how-to-use" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">2. How to use this calculator</a></li>
                <li><a href="#how-finance-works" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">3. How vehicle finance works in SA</a></li>
                <li><a href="#factors-affecting-repayment" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">4. Factors that affect your repayment</a></li>
                <li><a href="#fixed-vs-variable" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">5. Fixed vs variable interest rates</a></li>
                <li><a href="#true-cost" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">6. The true cost of buying a car</a></li>
                <li><a href="#how-much-can-you-afford" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">7. How much car can you afford?</a></li>
                <li><a href="#tips-to-reduce-costs" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">8. Tips to reduce finance costs</a></li>
                <li><a href="#interest-rate-impact" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">9. The impact of interest rates</a></li>
                <li><a href="#common-mistakes" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">10. Common mistakes to avoid</a></li>
                <li><a href="#new-vs-used" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">11. Buying new vs used</a></li>
                <li><a href="#vehicle-finance-faq" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">12. Frequently asked questions</a></li>
              </ul>
            </nav>
          </div>

          {/* Section 1: What is a vehicle finance calculator */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="what-is-vehicle-finance-calculator">
            <h2 className="text-3xl font-bold text-foreground mb-4">What Is a Vehicle Finance Calculator?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A vehicle finance calculator is a tool that helps you estimate your monthly car repayments based on the vehicle price, deposit, interest rate, and loan term. It allows you to understand the true cost of financing a car before committing to a purchase.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Instead of relying solely on dealership quotes, the Quick Money Tool vehicle finance calculator gives you an independent estimate so you can make informed financial decisions.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              In South Africa, where vehicle financing is commonly used to purchase cars, understanding your monthly repayment obligations is critical. Interest rates, influenced by the{' '}
              <a href="https://www.resbank.co.za" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">South African Reserve Bank</a>,
              can significantly impact how much you end up paying over time.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This tool helps you plan ahead and avoid taking on unaffordable debt.
            </p>
          </div>

          {/* Section 2: How to Use */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="how-to-use">
            <h2 className="text-3xl font-bold text-foreground mb-4">How to Use This Vehicle Finance Calculator</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Using the calculator is straightforward, but accuracy depends on entering realistic values. Follow these steps:
            </p>

            <div className="not-prose space-y-3">
              {[
                { step: '1', title: 'Enter the vehicle price', desc: 'This is the total cost of the car you intend to purchase.' },
                { step: '2', title: 'Add your deposit', desc: 'A larger deposit reduces the amount you need to finance and lowers your monthly repayments.' },
                { step: '3', title: 'Input the interest rate', desc: 'This is typically provided by your bank or dealership and depends on your credit profile.' },
                { step: '4', title: 'Choose the loan term', desc: 'Common terms range from 12 to 72 months.' },
                { step: '5', title: 'Include any balloon payment (if applicable)', desc: 'A balloon payment reduces monthly instalments but increases the final payment at the end of the term.' },
                { step: '6', title: 'Review your results', desc: 'The calculator will estimate your monthly repayment and total repayment over the loan period.' },
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
          </div>

          {/* Section 3: How Finance Works */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="how-finance-works">
            <h2 className="text-3xl font-bold text-foreground mb-4">How Vehicle Finance Works in South Africa</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Vehicle finance is essentially a loan that allows you to purchase a car and repay it over time with interest. Most banks and financial institutions offer vehicle financing options tailored to different income levels and credit profiles.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              According to the{' '}
              <a href="https://www.ncr.org.za/" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">National Credit Regulator</a>,
              consumers should fully understand the terms of their credit agreements before signing, including interest rates, fees, and repayment schedules.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3">Key components of vehicle finance</h3>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li><strong className="text-foreground">Principal amount:</strong> the amount you borrow after your deposit.</li>
              <li><strong className="text-foreground">Interest rate:</strong> the cost of borrowing money.</li>
              <li><strong className="text-foreground">Loan term:</strong> the duration over which you repay the loan.</li>
              <li><strong className="text-foreground">Monthly repayment:</strong> the amount you pay each month.</li>
              <li><strong className="text-foreground">Total cost of credit:</strong> the total amount paid, including interest and fees.</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Understanding these components helps you evaluate whether a vehicle is truly affordable.
            </p>
          </div>

          {/* Section 4: Factors */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="factors-affecting-repayment">
            <h2 className="text-3xl font-bold text-foreground mb-4">Factors That Affect Your Monthly Car Repayment</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Several variables influence how much you will pay each month.
            </p>

            <div className="grid md:grid-cols-2 gap-6 not-prose">
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-slate-100 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">1. Vehicle price</h3>
                <p className="text-sm text-muted-foreground">The higher the price of the car, the higher your monthly repayments.</p>
              </div>
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-slate-100 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">2. Deposit amount</h3>
                <p className="text-sm text-muted-foreground">A larger deposit reduces the loan amount, which lowers both monthly repayments and total interest paid.</p>
              </div>
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-slate-100 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">3. Interest rate</h3>
                <p className="text-sm text-muted-foreground">Interest rates vary depending on your credit score and market conditions. Even a small difference can significantly affect your repayments.</p>
              </div>
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-slate-100 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">4. Loan term</h3>
                <p className="text-sm text-muted-foreground">Longer loan terms result in lower monthly payments but higher total interest paid over time.</p>
              </div>
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-slate-100 border border-border md:col-span-2">
                <h3 className="text-lg font-semibold text-foreground mb-2">5. Balloon payment</h3>
                <p className="text-sm text-muted-foreground">A balloon payment reduces monthly instalments but requires a large final payment. Use it carefully, as it can create financial pressure at the end of the loan term.</p>
              </div>
            </div>
          </div>

          {/* Section 5: Fixed vs Variable */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="fixed-vs-variable">
            <h2 className="text-3xl font-bold text-foreground mb-4">Fixed vs Variable Interest Rates</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              When financing a vehicle, you may be offered a fixed or variable interest rate.
            </p>

            <div className="grid md:grid-cols-2 gap-6 not-prose">
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-white border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-3">Fixed interest rate</h3>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li>Your monthly repayment remains the same</li>
                  <li>Easier to budget</li>
                  <li>Protects you from interest rate increases</li>
                </ul>
              </div>
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-white border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-3">Variable interest rate</h3>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li>Your repayment can increase or decrease</li>
                  <li>Linked to changes in the repo rate set by the{' '}
                    <a href="https://www.resbank.co.za" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">South African Reserve Bank</a></li>
                  <li>Can be cheaper initially but carries risk</li>
                </ul>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mt-4">
              Choosing between these options depends on your risk tolerance and financial stability.
            </p>
          </div>

          {/* Section 6: True Cost */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="true-cost">
            <h2 className="text-3xl font-bold text-foreground mb-4">The True Cost of Buying a Car</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Many buyers focus only on the monthly repayment, but the total cost of owning a vehicle includes much more.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3">Additional costs to consider</h3>
            <ul className="space-y-2 text-muted-foreground mb-6">
              <li>Insurance premiums</li>
              <li>Fuel and maintenance</li>
              <li>Licensing and registration</li>
              <li>Service and repairs</li>
              <li>Tracking devices (often required by insurers)</li>
            </ul>

            <p className="text-muted-foreground leading-relaxed mb-4">
              A car that seems affordable on paper may become expensive when these additional costs are included. To manage your finances effectively, consider using the{' '}
              <a href="/calculators/budget-calculator" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">budget calculator</a>{' '}
              to track your monthly affordability, the{' '}
              <a href="/calculators/retirement-savings-calculator" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">retirement savings calculator</a>{' '}
              to keep long-term goals on track, and the{' '}
              <a href="/calculators/personal-loan-calculator" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">personal loan calculator</a>{' '}
              to compare financing scenarios.
            </p>
          </div>

          {/* Section 7: How Much Can You Afford */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="how-much-can-you-afford">
            <h2 className="text-3xl font-bold text-foreground mb-4">How Much Car Can You Afford?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A common guideline is that your car repayment should not exceed 15%–20% of your monthly income. However, this depends on your overall financial situation.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To determine affordability:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground mb-4">
              <li>Calculate your net monthly income.</li>
              <li>Subtract your essential expenses.</li>
              <li>Allocate a portion of the remaining amount to vehicle costs.</li>
            </ol>
            <p className="text-muted-foreground leading-relaxed">
              You should also maintain a buffer for emergencies and unexpected expenses.
            </p>
          </div>

          {/* Section 8: Tips to Reduce Costs */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="tips-to-reduce-costs">
            <h2 className="text-3xl font-bold text-foreground mb-4">Tips to Reduce Your Car Finance Costs</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              If you want to save money on vehicle finance, consider the following strategies.
            </p>

            <div className="not-prose space-y-4">
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-white border border-border">
                <h3 className="font-semibold text-foreground mb-2">1. Increase your deposit</h3>
                <p className="text-sm text-muted-foreground">A higher deposit reduces the loan amount and total interest paid.</p>
              </div>
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-white border border-border">
                <h3 className="font-semibold text-foreground mb-2">2. Choose a shorter loan term</h3>
                <p className="text-sm text-muted-foreground">Although monthly payments may be higher, you will pay less interest overall.</p>
              </div>
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-white border border-border">
                <h3 className="font-semibold text-foreground mb-2">3. Improve your credit score</h3>
                <p className="text-sm text-muted-foreground">A better credit score can help you secure a lower interest rate.</p>
              </div>
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-white border border-border">
                <h3 className="font-semibold text-foreground mb-2">4. Avoid large balloon payments</h3>
                <p className="text-sm text-muted-foreground">While they reduce monthly instalments, they can lead to financial strain later.</p>
              </div>
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-white border border-border">
                <h3 className="font-semibold text-foreground mb-2">5. Shop around for the best deal</h3>
                <p className="text-sm text-muted-foreground">Different banks offer different rates. Compare offers before committing.</p>
              </div>
            </div>
          </div>

          {/* Section 9: Interest Rate Impact */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="interest-rate-impact">
            <h2 className="text-3xl font-bold text-foreground mb-4">The Impact of Interest Rates on Car Finance</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Interest rates play a major role in determining your repayment amount. When the repo rate changes, banks adjust their lending rates accordingly.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              For example:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li>If interest rates increase, your monthly repayment may rise (for variable rates).</li>
              <li>If rates decrease, your repayment may become more affordable.</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Staying informed about interest rate trends from the{' '}
              <a href="https://www.resbank.co.za" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">South African Reserve Bank</a>{' '}
              can help you make better financing decisions.
            </p>
          </div>

          {/* Section 10: Common Mistakes */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="common-mistakes">
            <h2 className="text-3xl font-bold text-foreground mb-4">Common Vehicle Finance Mistakes to Avoid</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Many buyers make avoidable mistakes when financing a car:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li>Focusing only on monthly repayments</li>
              <li>Ignoring the total cost of the loan</li>
              <li>Choosing long loan terms unnecessarily</li>
              <li>Not budgeting for additional vehicle expenses</li>
              <li>Accepting the first financing offer without comparison</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Avoiding these mistakes can save you thousands of rand over the life of your loan.
            </p>
          </div>

          {/* Section 11: New vs Used */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="new-vs-used">
            <h2 className="text-3xl font-bold text-foreground mb-4">Buying a New vs Used Car</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Your financing decision may also depend on whether you buy a new or used car.
            </p>

            <div className="grid md:grid-cols-2 gap-6 not-prose mb-6">
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-white border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-3">New cars</h3>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li>Higher purchase price</li>
                  <li>Lower maintenance costs initially</li>
                  <li>Faster depreciation</li>
                </ul>
              </div>
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-white border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-3">Used cars</h3>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li>Lower purchase price</li>
                  <li>Slower depreciation</li>
                  <li>Potentially higher maintenance costs</li>
                </ul>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              A used car can often provide better value, especially if you are working with a limited budget.
            </p>
          </div>

          {/* NCR fee reference */}
          <div className="p-6 rounded-xl dark:bg-slate-800/50 bg-slate-100 border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-3">Important fees regulated by the NCR</h3>
            <p className="text-muted-foreground mb-3">
              The{' '}
              <a href="https://www.ncr.org.za/" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">National Credit Regulator (NCR)</a>{' '}
              caps the fees lenders may charge under the{' '}
              <a href="https://www.ncr.org.za/documents/pages/guidelines/Maximum-rate-interest-and-fees.pdf" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">National Credit Act</a>.
              Always account for:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex justify-between gap-4">
                <span>Initiation fee (once-off)</span>
                <span className="text-foreground text-right">Up to R1,207.50 incl. VAT</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Monthly service fee</span>
                <span className="text-foreground text-right">Up to R69.00/month</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Comprehensive insurance</span>
                <span className="text-foreground text-right">Required by law for financed vehicles</span>
              </li>
            </ul>
          </div>

          {/* Final Thoughts */}
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold text-foreground mb-4">Final Thoughts</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A vehicle finance calculator is an essential tool for anyone planning to buy a car. It helps you understand your monthly obligations, compare financing options, and avoid costly mistakes.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Before committing to a vehicle purchase, take the time to evaluate your budget, consider the total cost of ownership, and explore different financing scenarios.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              By combining the Quick Money Tool vehicle finance calculator with our other financial calculators and staying informed through trusted organisations like the National Credit Regulator and the South African Reserve Bank, you can make smarter, more confident financial decisions.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Ultimately, the goal is not just to afford a car, but to afford it comfortably without compromising your overall financial health.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div id="vehicle-finance-faq">
        <CalculatorFaq
          faqs={vehicleFinanceFaqs}
          title="Vehicle finance: frequently asked questions"
          subtitle="Deposits, balloon payments, interest rates, and the real cost of financing a car in South Africa."
        />
      </div>
    </>
  );
}
