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
      <section className="px-6 py-16 bg-gradient-to-br dark:from-slate-900 dark:via-lime-950 dark:to-green-950 from-slate-50 via-lime-50 to-green-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-16 h-16 bg-gradient-to-r from-lime-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Wallet className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Monthly Budget Calculator
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Track your income and expenses. Evaluate your spending habits and find out if your budget is balanced using the popular 50/30/20 rule.
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

      {/* SEO Content */}
      <Section className="bg-accent/30">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Mastering Your Money with the 50/30/20 Rule
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">What is the 50/30/20 Rule?</h3>
              <p className="text-muted-foreground mb-4">
                The 50/30/20 rule is a simple, intuitive budgeting framework introduced by{' '}
                <a href="https://en.wikipedia.org/wiki/Elizabeth_Warren" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 underline hover:text-emerald-500">Senator Elizabeth Warren</a>{' '}
                in her book{' '}
                <a href="https://www.simonandschuster.com/books/All-Your-Worth/Elizabeth-Warren/9780743269889" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 underline hover:text-emerald-500"><em>All Your Worth: The Ultimate Lifetime Money Plan</em></a>.
                It suggests dividing your after-tax income (your net salary) into three main categories: 50% for Needs, 30% for Wants, and 20% for Savings and Investments. It provides a solid baseline for anyone looking to structure their finances without getting bogged down in complex spreadsheets.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3">50% Needs & Essentials</h3>
              <p className="text-muted-foreground mb-4">
                Half of your income should ideally cover your absolute essentials. These are the bills and expenses you absolutely must pay and things necessary for survival. This includes rent or bond payments, car installments, groceries, utilities, medical aid, and minimum debt repayments. If your needs exceed 50%, you may need to reconsider your living situation or aggressive debt reduction strategies.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">30% Wants & Lifestyle</h3>
              <p className="text-muted-foreground mb-4">
                Budgeting shouldn&apos;t mean stripping all the joy from your life. The 30% allocation is for your wants, the "fun" part of your budget. This includes eating out, entertainment, hobbies, new clothes, Netflix subscriptions, or vacations. By explicitly allocating budget to these areas, you can spend guilt-free knowing your essentials and future are already covered.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3">20% Savings & Debt Reduction</h3>
              <p className="text-muted-foreground mb-4">
                The final 20% is dedicated to your future self. This category is for building an emergency fund, investing in the stock market (like ETFs), contributing extra to your retirement annuity, or making additional payments to clear high-interest debt faster than the minimum required. Consistent 20% savings is the key to building long-term wealth in South Africa.
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 rounded-xl dark:bg-slate-800/50 bg-slate-100 border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-3">Budgeting Tips for South Africans</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-lime-500 mt-1">•</span>
                <span><strong>Account for Annual Bills:</strong> Don't forget expenses that only happen once a year, like car license renewals or TV licenses. Divide them by 12 and add them to your monthly needs.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lime-500 mt-1">•</span>
                <span><strong>Review Subscriptions:</strong> Many people pay for subscriptions they no longer use. Do a quarterly audit of your bank statements to catch these direct debits.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lime-500 mt-1">•</span>
                <span><strong>Pay Yourself First:</strong> Automate your 20% savings so that it leaves your account on the same day you get paid. If you wait until the end of the month, you likely won't save anything.</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
