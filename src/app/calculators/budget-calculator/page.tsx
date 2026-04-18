'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';
import Section from '@/components/ui/Section';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ReviewedBy from '@/components/ui/ReviewedBy';
import { ndulamiso } from '@/data/authors';
import BudgetForm from '@/components/calculators/budget/BudgetForm';
import BudgetResultsPanel from '@/components/calculators/budget/BudgetResultsPanel';
import BudgetBreakdown from '@/components/calculators/budget/BudgetBreakdown';
import { calculateBudget, type BudgetInputs, type BudgetResult } from '@/lib/calculators/budgetCalculator';
import { buildBudgetCalculatorSchema, buildBreadcrumbSchema, buildBudgetHowToSchema, getCalculatorDateModified } from '@/data/calculatorSchemaData';
import CalculatorFaq from '@/components/sections/CalculatorFaq';
import { budgetFaqs } from '@/data/calculatorFaqs';

const DEFAULT_INPUTS: BudgetInputs = {
  income: {
    salary: 0,
    otherIncome: 0,
  },
  expenses: {
    housing: 0,
    groceries: 0,
    transport: 0,
    utilities: 0,
    medical: 0,
    schoolFees: 0,
    debtRepayments: 0,
    entertainment: 0,
    shopping: 0,
    subscriptions: 0,
    savings: 0,
    investments: 0,
  }
};

const budgetCalcSchema = buildBudgetCalculatorSchema();
const budgetHowToSchema = buildBudgetHowToSchema();
const reviewedOn = getCalculatorDateModified('budget-calculator');
const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'Calculators', url: '/calculators' },
  { name: 'Budget Calculator', url: '/calculators/budget-calculator' },
];
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

export default function BudgetCalculatorPage() {
  const [inputs, setInputs] = useState<BudgetInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<BudgetResult | null>(null);

  const handleCalculate = () => {
    setResult(calculateBudget(inputs));
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(budgetCalcSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(budgetHowToSchema) }}
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
              <Wallet className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Monthly Budget Calculator
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Track your income and expenses with the Quick Money Tool budget calculator. Evaluate your spending habits and find out if your budget is balanced using the popular 50/30/20 rule.
            </p>
          </motion.div>
        </div>
      </section>

      <ReviewedBy author={ndulamiso} dateReviewed={reviewedOn} />

      {/* Calculator */}
      <Section maxWidth="max-w-4xl">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Budget Entries</h2>
            <BudgetForm
              inputs={inputs}
              onChange={setInputs}
              onCalculate={handleCalculate}
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Budget Summary</h2>
            {result ? (
              <div className="space-y-6">
                <BudgetResultsPanel result={result} />
                <BudgetBreakdown result={result} />
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 rounded-xl border border-dashed border-border px-6">
                <p className="text-muted-foreground text-center">
                  Fill out your income and expenses, then click<br />&quot;Analyze My Budget&quot; to see your complete breakdown.
                </p>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* Guide content wrapper — tighter spacing */}
      <div className="px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
        <div className="p-6 rounded-xl dark:bg-slate-800/50 bg-slate-100 border border-border">
          <h2 className="text-2xl font-bold text-foreground mb-4">In this guide</h2>
          <nav>
            <ul className="grid md:grid-cols-2 gap-2 text-sm">
              <li>
                <a href="#what-is-budget-calculator" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">1. What is a budget calculator?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">2. How to use this calculator</a>
              </li>
              <li>
                <a href="#why-budgeting-matters" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">3. Why budgeting matters in South Africa</a>
              </li>
              <li>
                <a href="#budget-categories" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">4. Key budget categories</a>
              </li>
              <li>
                <a href="#50-30-20-rule" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">5. The 50/30/20 rule explained</a>
              </li>
              <li>
                <a href="#save-more-money" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">6. How to save more money</a>
              </li>
              <li>
                <a href="#inflation-impact" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">7. The impact of inflation</a>
              </li>
              <li>
                <a href="#life-stages" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">8. Budgeting for different life stages</a>
              </li>
              <li>
                <a href="#common-mistakes" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">9. Common budgeting mistakes</a>
              </li>
              <li>
                <a href="#budget-faq" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">10. Frequently asked questions</a>
              </li>
            </ul>
          </nav>
        </div>


          {/* Section 1: What Is a Budget Calculator */}
        <div className="prose prose-slate dark:prose-invert max-w-none" id="what-is-budget-calculator">
          <h2 className="text-3xl font-bold text-foreground mb-4">What Is a Budget Calculator?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            A budget calculator is a financial planning tool that helps you understand how your income is allocated
            across different expenses, savings, and financial goals. By entering your monthly earnings and categorising
            your spending, you can quickly determine whether you are living within your means or overspending.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            In practical terms, a budget calculator answers one critical question: <strong className="text-foreground">where is your money going?</strong>
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            For many individuals in South Africa, managing money effectively has become increasingly important due to
            rising living costs, inflation, and interest rate changes. According to the{' '}
            <a href="https://www.resbank.co.za" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">South African Reserve Bank</a>,
            inflation and repo rate adjustments directly impact household expenses, making budgeting a necessary
            financial habit rather than an optional one.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            This calculator is designed to give you a clear, structured overview of your finances so you can make
            informed decisions and improve your financial stability.
          </p>
        </div>


          {/* Section 2: How to Use */}
        <div className="prose prose-slate dark:prose-invert max-w-none" id="how-to-use">
          <h2 className="text-3xl font-bold text-foreground mb-4">How to Use This Budget Calculator</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Using the budget calculator is simple and requires only a few inputs. However, accuracy depends on how
            honest and detailed you are with your numbers.
          </p>

          <div className="not-prose space-y-3">
            {[
              { step: '1', title: 'Enter your total monthly income', desc: 'This should include your salary, side income, and any additional earnings after tax.' },
              { step: '2', title: 'Add your fixed expenses', desc: 'These are recurring costs that remain relatively constant each month, such as rent, insurance, and loan repayments.' },
              { step: '3', title: 'Include your variable expenses', desc: 'These fluctuate monthly and may include groceries, transport, entertainment, and personal spending.' },
              { step: '4', title: 'Input your savings and investments', desc: 'Include contributions toward emergency funds, retirement, or any other savings goals.' },
              { step: '5', title: 'Review your results', desc: 'The calculator will show whether you have a surplus (money left over) or a deficit (overspending).' },
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
            If your expenses exceed your income, this indicates a need to adjust your spending habits or increase
            your income streams.
          </p>
        </div>


          {/* Section 3: Why Budgeting Matters */}
        <div className="prose prose-slate dark:prose-invert max-w-none" id="why-budgeting-matters">
          <h2 className="text-3xl font-bold text-foreground mb-4">Why Budgeting Is Important in South Africa</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Budgeting plays a critical role in financial well-being, especially in an economy where the cost of living
            continues to rise. Many South Africans face challenges such as high debt levels, limited savings, and
            unexpected financial emergencies.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            According to the{' '}
            <a href="https://www.treasury.gov.za" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">National Treasury</a>,
            improving financial literacy and budgeting habits is essential for long-term economic stability at both
            individual and national levels.
          </p>

          <div className="grid md:grid-cols-2 gap-6 not-prose">
            <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-slate-100 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-2">Helps you avoid debt</h3>
              <p className="text-sm text-muted-foreground">
                Without a budget, it is easy to spend more than you earn, leading to reliance on credit cards or
                personal loans. A structured budget ensures that your expenses remain within your income limits.
              </p>
            </div>
            <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-slate-100 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-2">Builds financial awareness</h3>
              <p className="text-sm text-muted-foreground">
                Budgeting forces you to track every rand, helping you identify unnecessary spending and areas where
                you can cut back.
              </p>
            </div>
            <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-slate-100 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-2">Supports financial goals</h3>
              <p className="text-sm text-muted-foreground">
                Whether you want to buy a house, start a business, or build an emergency fund, budgeting provides
                a roadmap to achieve those goals.
              </p>
            </div>
            <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-slate-100 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-2">Reduces financial stress</h3>
              <p className="text-sm text-muted-foreground">
                Knowing exactly where your money is going reduces uncertainty and gives you greater control over
                your financial future.
              </p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mt-6">
            To get a complete picture of your finances, you can also use our{' '}
            <a href="/calculators/sars-income-tax-calculator" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">SARS income tax calculator</a>{' '}
            to estimate your take-home income, our{' '}
            <a href="/calculators/retirement-savings-calculator" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">retirement savings calculator</a>{' '}
            to project future savings growth, and our{' '}
            <a href="/calculators/personal-loan-calculator" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">personal loan calculator</a>{' '}
            to understand debt repayments.
          </p>
        </div>


          {/* Section 4: Key Budget Categories */}
        <div className="prose prose-slate dark:prose-invert max-w-none" id="budget-categories">
          <h2 className="text-3xl font-bold text-foreground mb-4">Key Budget Categories You Should Include</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            A realistic budget includes all major expense categories. Missing even small expenses can distort your
            financial picture.
          </p>

          <div className="grid md:grid-cols-3 gap-6 not-prose">
            <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-white border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-3">Fixed expenses (Needs)</h3>
              <p className="text-xs text-muted-foreground mb-3">Essential and usually non-negotiable:</p>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li>Rent or bond repayments</li>
                <li>Utilities (electricity, water, internet)</li>
                <li>Insurance (medical aid, car insurance)</li>
                <li>School fees</li>
                <li>Debt repayments</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-white border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-3">Variable expenses (Wants)</h3>
              <p className="text-xs text-muted-foreground mb-3">Can fluctuate and where overspending often occurs:</p>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li>Groceries</li>
                <li>Transport (fuel, taxis, ride-hailing)</li>
                <li>Entertainment and streaming</li>
                <li>Dining out and takeaways</li>
                <li>Shopping and personal care</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-white border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-3">Financial priorities (Savings)</h3>
              <p className="text-xs text-muted-foreground mb-3">Critical for long-term financial security:</p>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li>Emergency fund contributions</li>
                <li>Retirement savings</li>
                <li>Investments (stocks, ETFs, unit trusts)</li>
              </ul>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mt-4">
            Tracking all three categories ensures your budget reflects your actual lifestyle and financial priorities.
          </p>
        </div>


          {/* Section 5: 50/30/20 Rule */}
        <div className="prose prose-slate dark:prose-invert max-w-none" id="50-30-20-rule">
          <h2 className="text-3xl font-bold text-foreground mb-4">The 50/30/20 Budget Rule Explained</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            One of the most widely recommended budgeting frameworks is the 50/30/20 rule. It provides a simple
            guideline for allocating your income:
          </p>

          <div className="grid md:grid-cols-3 gap-6 not-prose mb-6">
            <div className="p-5 rounded-xl border border-border text-center">
              <div className="text-4xl font-bold text-[#C9A84C] mb-2">50%</div>
              <h3 className="font-semibold text-foreground mb-1">Needs</h3>
              <p className="text-sm text-muted-foreground">Essential expenses like rent, groceries, utilities, medical aid, and minimum debt repayments.</p>
            </div>
            <div className="p-5 rounded-xl border border-border text-center">
              <div className="text-4xl font-bold text-[#C9A84C] mb-2">30%</div>
              <h3 className="font-semibold text-foreground mb-1">Wants</h3>
              <p className="text-sm text-muted-foreground">Lifestyle and discretionary spending like entertainment, dining out, and subscriptions.</p>
            </div>
            <div className="p-5 rounded-xl border border-border text-center">
              <div className="text-4xl font-bold text-[#C9A84C] mb-2">20%</div>
              <h3 className="font-semibold text-foreground mb-1">Savings</h3>
              <p className="text-sm text-muted-foreground">Savings, investments, and extra debt repayment for long-term financial security.</p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">
            While this rule is a useful starting point, it may need adjustment depending on your income level and
            cost of living in South Africa. For example, housing costs in major cities like Johannesburg and Cape Town
            may require allocating more than 50% toward essentials.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The key idea is balance: ensuring that you are not neglecting savings while still maintaining a reasonable
            quality of life.
          </p>
        </div>


          {/* Section 6: How to Save More */}
        <div className="prose prose-slate dark:prose-invert max-w-none" id="save-more-money">
          <h2 className="text-3xl font-bold text-foreground mb-4">How to Improve Your Budget and Save More Money</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            If your budget shows that you are spending more than you earn, the next step is optimisation. Even small
            changes can significantly improve your financial situation over time.
          </p>

          <div className="not-prose space-y-4">
            <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-white border border-border">
              <h3 className="font-semibold text-foreground mb-2">1. Identify unnecessary expenses</h3>
              <p className="text-sm text-muted-foreground">
                Review your bank statements and look for unused subscriptions, impulse purchases, and frequent
                takeaways. Cutting just R30 to R50 per day can save over R1,000 per month.
              </p>
            </div>
            <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-white border border-border">
              <h3 className="font-semibold text-foreground mb-2">2. Reduce fixed costs where possible</h3>
              <p className="text-sm text-muted-foreground">
                Negotiate better insurance rates, switch to more affordable service providers, and consider
                refinancing high-interest debt.
              </p>
            </div>
            <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-white border border-border">
              <h3 className="font-semibold text-foreground mb-2">3. Automate your savings</h3>
              <p className="text-sm text-muted-foreground">
                Treat savings like a fixed expense by setting up automatic transfers to your savings account on
                payday. If you wait until the end of the month, the money is usually gone.
              </p>
            </div>
            <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-white border border-border">
              <h3 className="font-semibold text-foreground mb-2">4. Track your spending regularly</h3>
              <p className="text-sm text-muted-foreground">
                Budgeting is not a once-off activity. Reviewing your budget weekly or monthly ensures you stay on
                track and can catch overspending early.
              </p>
            </div>
            <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-white border border-border">
              <h3 className="font-semibold text-foreground mb-2">5. Increase your income</h3>
              <p className="text-sm text-muted-foreground">
                If cutting expenses is not enough, consider freelancing, side businesses, or upskilling for
                higher-paying opportunities.
              </p>
            </div>
          </div>
        </div>


          {/* Section 7: Inflation Impact */}
        <div className="prose prose-slate dark:prose-invert max-w-none" id="inflation-impact">
          <h2 className="text-3xl font-bold text-foreground mb-4">The Impact of Inflation on Your Budget</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Inflation reduces your purchasing power, meaning your money buys less over time. This makes budgeting
            even more important.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The{' '}
            <a href="https://www.resbank.co.za" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">South African Reserve Bank</a>{' '}
            regularly adjusts interest rates to control inflation, which can affect:
          </p>
          <ul className="space-y-2 text-muted-foreground mb-4">
            <li>Loan and bond repayments</li>
            <li>Credit card interest</li>
            <li>Housing and rental costs</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mb-4">
            For example, a small increase in interest rates can significantly increase your monthly bond or loan
            repayments. A 0.5% rate hike on a R1 million home loan over 20 years adds roughly R300 to your
            monthly instalment.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            To stay financially stable, review your budget regularly, adjust for rising costs, and prioritise savings
            and debt reduction.
          </p>
        </div>


          {/* Section 8: Life Stages */}
        <div className="prose prose-slate dark:prose-invert max-w-none" id="life-stages">
          <h2 className="text-3xl font-bold text-foreground mb-4">Budgeting for Different Life Stages</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Your budgeting strategy should evolve as your life changes. What works for a university student will not
            work for a parent with school fees and a bond to pay.
          </p>

          <div className="grid md:grid-cols-2 gap-6 not-prose">
            <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-white border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-2">Students and early career</h3>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li>Focus on controlling expenses</li>
                <li>Avoid unnecessary debt</li>
                <li>Start building a small emergency fund</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-white border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-2">Working professionals</h3>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li>Balance lifestyle and savings</li>
                <li>Invest for long-term growth</li>
                <li>Plan for major expenses (car, home)</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-white border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-2">Families</h3>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li>Prioritise education and healthcare</li>
                <li>Build a larger emergency fund</li>
                <li>Plan for long-term financial security</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-white border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-2">Pre-retirement</h3>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li>Reduce debt</li>
                <li>Maximise retirement contributions</li>
                <li>Focus on preserving wealth</li>
              </ul>
            </div>
          </div>
        </div>


          {/* Section 9: Common Mistakes */}
        <div className="prose prose-slate dark:prose-invert max-w-none" id="common-mistakes">
          <h2 className="text-3xl font-bold text-foreground mb-4">Common Budgeting Mistakes to Avoid</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Even with the right tools, many people struggle with budgeting due to common mistakes:
          </p>
          <ul className="space-y-2 text-muted-foreground mb-4">
            <li><strong className="text-foreground">Underestimating expenses:</strong> rounding down or forgetting small recurring costs adds up quickly.</li>
            <li><strong className="text-foreground">Ignoring irregular costs:</strong> car repairs, medical bills, and annual fees catch you off guard if they are not budgeted monthly.</li>
            <li><strong className="text-foreground">Not tracking small daily spending:</strong> a R50 coffee every workday is over R1,000 per month.</li>
            <li><strong className="text-foreground">Failing to adjust over time:</strong> your budget from two years ago does not reflect today&apos;s prices or your current lifestyle.</li>
            <li><strong className="text-foreground">Not setting clear financial goals:</strong> without a target, budgeting feels like restriction rather than progress.</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            Avoiding these mistakes can significantly improve your financial outcomes. The key is consistency:
            the more regularly you review and adjust your budget, the more effective it becomes.
          </p>
        </div>

        </div>
      </div>

      {/* FAQ */}
      <div id="budget-faq">
        <CalculatorFaq
          faqs={budgetFaqs}
          title="Budget calculator: frequently asked questions"
          subtitle="Common questions about budgeting, saving, debt, and managing your money in South Africa."
        />
      </div>
    </>
  );
}
