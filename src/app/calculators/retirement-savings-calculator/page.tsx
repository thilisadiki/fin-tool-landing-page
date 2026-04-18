'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PiggyBank } from 'lucide-react';
import Section from '@/components/ui/Section';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ReviewedBy from '@/components/ui/ReviewedBy';
import { ndulamiso } from '@/data/authors';
import RetirementForm from '@/components/calculators/retirement/RetirementForm';
import RetirementResultsPanel from '@/components/calculators/retirement/RetirementResultsPanel';
import RetirementProjectionTable from '@/components/calculators/retirement/RetirementProjectionTable';
import { calculateRetirement, type RetirementInputs, type RetirementResult } from '@/lib/calculators/retirementCalculator';
import { buildRetirementCalculatorSchema, buildBreadcrumbSchema, buildRetirementHowToSchema, getCalculatorDateModified } from '@/data/calculatorSchemaData';
import CalculatorFaq from '@/components/sections/CalculatorFaq';
import { retirementSavingsFaqs } from '@/data/calculatorFaqs';

const DEFAULT_INPUTS: RetirementInputs = {
  currentAge: 30,
  retirementAge: 65,
  currentSavings: 100000,
  monthlyContribution: 3000,
  annualReturnRate: 9,
  annualInflationRate: 5,
  retirementGoal: 5000000,
};

const retirementSchema = buildRetirementCalculatorSchema();
const retirementHowToSchema = buildRetirementHowToSchema();
const reviewedOn = getCalculatorDateModified('retirement-savings-calculator');
const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'Calculators', url: '/calculators' },
  { name: 'Retirement Savings Calculator', url: '/calculators/retirement-savings-calculator' },
];
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

export default function RetirementSavingsCalculatorPage() {
  const [inputs, setInputs] = useState<RetirementInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<RetirementResult | null>(null);

  const handleCalculate = () => {
    if (inputs.currentAge >= inputs.retirementAge) return;
    if (inputs.monthlyContribution <= 0 && inputs.currentSavings <= 0) return;
    setResult(calculateRetirement(inputs));
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(retirementSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(retirementHowToSchema) }}
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
            <div className="w-16 h-16 bg-gradient-to-r from-[#0F2744] to-[#C9A84C] rounded-xl flex items-center justify-center mx-auto mb-6">
              <PiggyBank className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Retirement Savings Calculator
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Use the Quick Money Tool retirement calculator to project your savings growth, see if you&apos;re on track to meet your goal, and estimate your monthly retirement income using the 4% Rule.
            </p>
          </motion.div>
        </div>
      </section>

      <ReviewedBy author={ndulamiso} dateReviewed={reviewedOn} />

      {/* Calculator */}
      <Section maxWidth="max-w-4xl">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Your Retirement Plan</h2>
            <RetirementForm
              inputs={inputs}
              onChange={setInputs}
              onCalculate={handleCalculate}
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Projection</h2>
            {result ? (
              <div className="space-y-6">
                <RetirementResultsPanel result={result} />
                <RetirementProjectionTable result={result} />
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 rounded-xl border border-dashed border-border px-6">
                <p className="text-muted-foreground text-center">
                  Enter your savings details, expected return rate, and retirement goal, then click<br />&quot;Project My Retirement&quot; to see your projection.
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
                <li><a href="#what-is-retirement-calculator" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">1. What is a retirement calculator?</a></li>
                <li><a href="#how-to-use" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">2. How to use this calculator</a></li>
                <li><a href="#why-retirement-planning-matters" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">3. Why retirement planning matters in SA</a></li>
                <li><a href="#how-much-you-need" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">4. How much do you need to retire?</a></li>
                <li><a href="#compound-interest" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">5. The power of compound interest</a></li>
                <li><a href="#key-factors" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">6. Key factors that affect your savings</a></li>
                <li><a href="#retirement-options" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">7. Retirement savings options in SA</a></li>
                <li><a href="#inflation-impact" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">8. How inflation impacts retirement</a></li>
                <li><a href="#improve-savings" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">9. How to improve your savings</a></li>
                <li><a href="#planning-and-income" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">10. Retirement planning and your income</a></li>
                <li><a href="#common-mistakes" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">11. Common mistakes to avoid</a></li>
                <li><a href="#retirement-faq" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">12. Frequently asked questions</a></li>
              </ul>
            </nav>
          </div>

          {/* Section 1: What is a retirement calculator */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="what-is-retirement-calculator">
            <h2 className="text-3xl font-bold text-foreground mb-4">What Is a Retirement Savings Calculator?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A retirement savings calculator is a financial planning tool that helps you estimate how much money you need to save today to achieve a comfortable retirement in the future. By factoring in your current savings, monthly contributions, expected returns, and retirement age, the Quick Money Tool retirement calculator gives you a clear projection of your future financial position.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Planning for retirement is one of the most important long-term financial decisions you will make. Without a structured plan, it becomes difficult to maintain your lifestyle once you stop earning a regular income.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              In South Africa, retirement planning is especially important due to rising living costs, inflation, and increasing life expectancy. Using a retirement calculator helps you take control of your future by turning uncertainty into a measurable financial goal.
            </p>
          </div>

          {/* Section 2: How to Use */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="how-to-use">
            <h2 className="text-3xl font-bold text-foreground mb-4">How to Use This Retirement Savings Calculator</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              This calculator is designed to be simple, but the results depend on accurate inputs. Follow these steps:
            </p>

            <div className="not-prose space-y-3">
              {[
                { step: '1', title: 'Enter your current age', desc: 'This is the starting point for your investment horizon.' },
                { step: '2', title: 'Select your desired retirement age', desc: 'A later age gives your investments more time to grow.' },
                { step: '3', title: 'Input your current savings', desc: 'Include your existing retirement fund balance and any other long-term savings.' },
                { step: '4', title: 'Add your monthly contribution', desc: 'This is the amount you plan to save each month going forward.' },
                { step: '5', title: 'Estimate your expected annual return', desc: 'A balanced SA retirement fund has historically returned around 8%–10% a year before inflation.' },
                { step: '6', title: 'Review your projection', desc: 'The calculator estimates your total savings at retirement, investment growth over time, and the impact of compound interest.' },
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
              You can adjust different variables to see how changes in contributions or retirement age affect your final outcome.
            </p>
          </div>

          {/* Section 3: Why retirement planning is important */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="why-retirement-planning-matters">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Retirement Planning Is Important in South Africa</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Many South Africans underestimate how much money they will need in retirement. Without proper planning, you may rely solely on limited income sources such as government support or family assistance.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              According to the{' '}
              <a href="https://www.treasury.gov.za" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">National Treasury</a>,
              individuals are encouraged to take personal responsibility for their retirement savings due to increasing pressure on public resources.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3">A solid retirement plan helps you:</h3>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li>Maintain your lifestyle after retirement</li>
              <li>Avoid financial dependence on others</li>
              <li>Cover healthcare and living expenses</li>
              <li>Protect against inflation</li>
              <li>Achieve long-term financial security</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Starting early gives your investments more time to grow, making a significant difference in your final savings.
            </p>
          </div>

          {/* Section 4: How much you need */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="how-much-you-need">
            <h2 className="text-3xl font-bold text-foreground mb-4">How Much Do You Need to Retire Comfortably?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A common rule of thumb is that you need approximately 70% to 80% of your pre-retirement income to maintain your lifestyle after retirement.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              However, the exact amount depends on:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-6">
              <li>Your lifestyle expectations</li>
              <li>Healthcare costs</li>
              <li>Inflation rates</li>
              <li>Life expectancy</li>
              <li>Existing savings and assets</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3">The 4% rule as a benchmark</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The 4% rule is a widely used guideline for retirement income. It suggests you can safely withdraw 4% of your total retirement portfolio in your first year of retirement, and adjust for inflation each year after. Using this rule, a R5 million portfolio would provide approximately R200,000 per year (about R16,667 per month) as a starting income. It is a useful benchmark, but your actual rate should depend on your personal circumstances and life expectancy.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The{' '}
              <a href="https://www.statssa.gov.za" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">Statistics South Africa</a>{' '}
              CPI releases show how the cost of living increases over time, which is why you need to plan for future expenses, not just current ones.
            </p>
          </div>

          {/* Section 5: Compound Interest */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="compound-interest">
            <h2 className="text-3xl font-bold text-foreground mb-4">The Power of Compound Interest</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              One of the most important concepts in retirement planning is compound interest.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Compound interest allows your investments to grow exponentially over time because you earn returns not only on your initial investment but also on the accumulated interest. When you stay invested, those returns themselves earn returns in the next period.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3">For example:</h3>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li>If you invest consistently over 20 to 30 years, your savings can grow significantly.</li>
              <li>The earlier you start, the less you need to contribute each month.</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              This is why starting early is often more important than contributing large amounts later in life. Even a small monthly contribution at age 25 can outperform a much larger contribution starting at 45, purely because of the extra compounding years.
            </p>
          </div>

          {/* Section 6: Key Factors */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="key-factors">
            <h2 className="text-3xl font-bold text-foreground mb-4">Key Factors That Affect Your Retirement Savings</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Your retirement outcome depends on several important variables.
            </p>

            <div className="grid md:grid-cols-2 gap-6 not-prose">
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-slate-100 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">1. Time (investment horizon)</h3>
                <p className="text-sm text-muted-foreground">The longer your money is invested, the more it can grow. Starting early gives you a major advantage.</p>
              </div>
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-slate-100 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">2. Monthly contributions</h3>
                <p className="text-sm text-muted-foreground">Regular contributions help build your retirement fund steadily over time.</p>
              </div>
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-slate-100 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">3. Investment returns</h3>
                <p className="text-sm text-muted-foreground">Higher returns can significantly increase your final savings, but they often come with higher risk.</p>
              </div>
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-slate-100 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">4. Inflation</h3>
                <p className="text-sm text-muted-foreground">Inflation reduces the purchasing power of your savings over time, making it essential to invest in assets that outperform inflation.</p>
              </div>
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-slate-100 border border-border md:col-span-2">
                <h3 className="text-lg font-semibold text-foreground mb-2">5. Retirement age</h3>
                <p className="text-sm text-muted-foreground">Retiring later gives your investments more time to grow and reduces the number of years you need to rely on your savings.</p>
              </div>
            </div>
          </div>

          {/* Section 7: Retirement Options */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="retirement-options">
            <h2 className="text-3xl font-bold text-foreground mb-4">Types of Retirement Savings Options in South Africa</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              There are several ways to save for retirement in South Africa. Contributions to a retirement annuity, pension, or provident fund are tax-deductible up to 27.5% of your taxable income, capped at R350,000 per year, as outlined in the{' '}
              <a href="https://www.sars.gov.za/tax-rates/income-tax/retirement-lump-sum-benefits/" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">SARS retirement fund guide</a>.
            </p>

            <div className="grid md:grid-cols-2 gap-6 not-prose">
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-white border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-3">Retirement Annuities (RAs)</h3>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li>Tax-efficient investment vehicles</li>
                  <li>Contributions may be tax-deductible</li>
                  <li>Long-term growth potential</li>
                </ul>
              </div>
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-white border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-3">Pension Funds</h3>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li>Employer-sponsored retirement plans</li>
                  <li>Contributions shared between employee and employer</li>
                </ul>
              </div>
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-white border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-3">Provident Funds</h3>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li>Similar to pension funds but with different withdrawal rules</li>
                </ul>
              </div>
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-white border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-3">Tax-Free Savings Accounts (TFSAs)</h3>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li>Allow tax-free growth on investments</li>
                  <li>Flexible contribution options</li>
                </ul>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mt-6">
              Each option has its own benefits and limitations, so it is important to choose the right mix based on your financial goals.
            </p>
          </div>

          {/* Key SA Retirement Terms callout */}
          <div className="p-6 rounded-xl dark:bg-slate-800/50 bg-slate-100 border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-3">Key SA retirement terms</h3>
            <p className="text-muted-foreground mb-3">
              Understanding these terms will help you make better retirement planning decisions:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex justify-between gap-4">
                <span>Retirement Annuity (RA)</span>
                <span className="text-foreground text-right">Private pension with tax-deductible contributions</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Preservation Fund</span>
                <span className="text-foreground text-right">Preserves savings when changing employers</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Living Annuity</span>
                <span className="text-foreground text-right">Flexible income (2.5%–17.5% p.a.) at retirement, <a href="https://www.sars.gov.za/tax-rates/income-tax/retirement-lump-sum-benefits/" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">see SARS guide</a></span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Life Annuity</span>
                <span className="text-foreground text-right">Guaranteed income for life (no flexibility)</span>
              </li>
            </ul>
          </div>

          {/* Section 8: Inflation Impact */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="inflation-impact">
            <h2 className="text-3xl font-bold text-foreground mb-4">How Inflation Impacts Your Retirement</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Inflation is one of the biggest risks to your retirement savings. Over time, the cost of goods and services increases, reducing the value of your money.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3">For example:</h3>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li>R1,000 today will not have the same purchasing power in 20 years.</li>
              <li>Healthcare and living costs tend to rise faster than general inflation.</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-4">
              South African inflation has historically averaged around 5% per year. When projecting your retirement savings, think in "real returns", which is your investment return minus inflation. If your RA earns 9% annually and inflation is 5%, your real return is only 4%. This calculator lets you factor in inflation so your projection reflects actual purchasing power.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Tracking inflation trends from the{' '}
              <a href="https://www.resbank.co.za" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">South African Reserve Bank</a>{' '}
              can help you make better investment decisions.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3">To protect your savings:</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Invest in assets that outperform inflation</li>
              <li>Increase contributions over time</li>
              <li>Review your plan regularly</li>
            </ul>
          </div>

          {/* Section 9: Improve Savings */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="improve-savings">
            <h2 className="text-3xl font-bold text-foreground mb-4">How to Improve Your Retirement Savings</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              If your projected savings are not enough, consider these strategies.
            </p>

            <div className="not-prose space-y-4">
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-white border border-border">
                <h3 className="font-semibold text-foreground mb-2">1. Start early</h3>
                <p className="text-sm text-muted-foreground">Even small contributions can grow significantly over time.</p>
              </div>
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-white border border-border">
                <h3 className="font-semibold text-foreground mb-2">2. Increase contributions gradually</h3>
                <p className="text-sm text-muted-foreground">Increase your monthly savings as your income grows.</p>
              </div>
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-white border border-border">
                <h3 className="font-semibold text-foreground mb-2">3. Reduce unnecessary expenses</h3>
                <p className="text-sm text-muted-foreground">
                  Use the{' '}
                  <a href="/calculators/budget-calculator" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">budget calculator</a>{' '}
                  to identify areas where you can save more.
                </p>
              </div>
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-white border border-border">
                <h3 className="font-semibold text-foreground mb-2">4. Maximise tax benefits</h3>
                <p className="text-sm text-muted-foreground">Take advantage of tax-efficient investment options like retirement annuities, which allow contributions of up to 27.5% of taxable income (capped at R350,000 per year) to be deducted.</p>
              </div>
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-white border border-border">
                <h3 className="font-semibold text-foreground mb-2">5. Diversify your investments</h3>
                <p className="text-sm text-muted-foreground">Spread your investments across different asset classes to manage risk.</p>
              </div>
            </div>
          </div>

          {/* Section 10: Planning and Income */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="planning-and-income">
            <h2 className="text-3xl font-bold text-foreground mb-4">Retirement Planning and Your Income</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Understanding your net income is crucial when planning for retirement.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You can use the{' '}
              <a href="/calculators/sars-income-tax-calculator" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">SARS income tax calculator</a>{' '}
              to estimate your take-home pay and the{' '}
              <a href="/calculators/personal-loan-calculator" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">personal loan calculator</a>{' '}
              to manage debt before increasing savings.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Balancing debt repayment and savings is key to long-term financial stability.
            </p>
          </div>

          {/* Section 11: Common Mistakes */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="common-mistakes">
            <h2 className="text-3xl font-bold text-foreground mb-4">Common Mistakes to Avoid</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Many people make avoidable mistakes when planning for retirement:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li>Starting too late</li>
              <li>Underestimating future expenses</li>
              <li>Not accounting for inflation</li>
              <li>Withdrawing retirement savings early</li>
              <li>Relying on a single income source</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Avoiding these mistakes can significantly improve your financial future.
            </p>
          </div>

          {/* Final Thoughts */}
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold text-foreground mb-4">Final Thoughts</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A retirement savings calculator is a powerful tool for planning your financial future. It helps you understand how much you need to save, how your investments will grow, and whether you are on track to meet your goals.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Retirement planning is not something to delay. The earlier you start, the more flexibility and security you will have later in life.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              By combining the Quick Money Tool retirement calculator with other tools like the{' '}
              <a href="/calculators/budget-calculator" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">budget calculator</a>,
              the{' '}
              <a href="/calculators/sars-income-tax-calculator" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">SARS income tax calculator</a>,
              and the{' '}
              <a href="/calculators/personal-loan-calculator" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">personal loan calculator</a>,
              and staying informed through trusted institutions like the National Treasury and the South African Reserve Bank, you can build a strong and sustainable retirement plan.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Taking action today ensures financial independence and peace of mind in the future.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div id="retirement-faq">
        <CalculatorFaq
          faqs={retirementSavingsFaqs}
          title="Retirement planning: frequently asked questions"
          subtitle="The 4% rule, RA tax deductions, inflation, and how much is actually enough to retire in South Africa."
        />
      </div>
    </>
  );
}
