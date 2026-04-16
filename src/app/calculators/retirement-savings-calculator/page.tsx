'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PiggyBank } from 'lucide-react';
import Section from '@/components/ui/Section';
import RetirementForm from '@/components/calculators/retirement/RetirementForm';
import RetirementResultsPanel from '@/components/calculators/retirement/RetirementResultsPanel';
import RetirementProjectionTable from '@/components/calculators/retirement/RetirementProjectionTable';
import { calculateRetirement, type RetirementInputs, type RetirementResult } from '@/lib/calculators/retirementCalculator';
import { buildRetirementCalculatorSchema, buildBreadcrumbSchema } from '@/data/calculatorSchemaData';
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
const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Calculators', url: '/calculators' },
  { name: 'Retirement Savings Calculator', url: '/calculators/retirement-savings-calculator' },
]);

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="px-6 py-16 bg-gradient-to-br dark:from-slate-900 dark:via-purple-950 dark:to-pink-950 from-slate-50 via-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-6">
              <PiggyBank className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Retirement Savings Calculator
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Project your retirement savings growth, see if you&apos;re on track to meet your goal, and estimate your monthly retirement income using the 4% Rule.
            </p>
          </motion.div>
        </div>
      </section>

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

      {/* SEO Content */}
      <Section className="bg-accent/30">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            How Retirement Savings Works in South Africa
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">The Power of Compound Interest</h3>
              <p className="text-muted-foreground mb-4">
                Compound interest is the single most powerful force behind building retirement wealth. When your investment earns returns, those returns themselves earn returns in subsequent periods. Starting early, even with a small monthly contribution, can result in dramatically more wealth than starting later with a larger amount, purely because of the extra compounding years.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3">Retirement Annuities (RAs)</h3>
              <p className="text-muted-foreground mb-4">
                A Retirement Annuity is a private pension plan in South Africa that offers significant tax benefits. Contributions to an RA are tax-deductible up to 27.5% of your taxable income (capped at R350,000 per year). This means your investment grows more efficiently because you&apos;re investing pre-tax money. RAs are available through most financial service providers.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">The 4% Rule Explained</h3>
              <p className="text-muted-foreground mb-4">
                The 4% Rule is a widely used guideline for retirement income. It suggests you can safely withdraw 4% of your total retirement portfolio in your first year of retirement, and adjust for inflation each year after. Using this rule, a R5 million portfolio would provide approximately R200,000 per year (about R16,667 per month) as a starting income. It&apos;s a useful benchmark, but your actual rate should depend on your personal circumstances and life expectancy.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3">Accounting for Inflation</h3>
              <p className="text-muted-foreground mb-4">
                South African inflation has historically averaged around 5% per year. When projecting your retirement savings, you should think in &quot;real returns&quot;, which is your investment return minus inflation. For example, if your RA earns 9% annually and inflation is 5%, your real return is only 4%. This calculator allows you to factor in inflation so your projection reflects actual purchasing power.
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 rounded-xl dark:bg-slate-800/50 bg-slate-100 border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-3">Key SA Retirement Terms</h3>
            <p className="text-muted-foreground mb-3">
              Understanding these terms will help you make better retirement planning decisions:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex justify-between">
                <span>Retirement Annuity (RA)</span>
                <span className="text-foreground">Private pension with tax-deductible contributions</span>
              </li>
              <li className="flex justify-between">
                <span>Preservation Fund</span>
                <span className="text-foreground">Preserves savings when changing employers</span>
              </li>
              <li className="flex justify-between">
                <span>Living Annuity</span>
                <span className="text-foreground">Flexible income (2.5%–17.5% p.a.) at retirement</span>
              </li>
              <li className="flex justify-between">
                <span>Life Annuity</span>
                <span className="text-foreground">Guaranteed income for life (no flexibility)</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <CalculatorFaq
        faqs={retirementSavingsFaqs}
        title="Retirement planning: frequently asked questions"
        subtitle="The 4% rule, RA tax deductions, inflation, and how much is actually enough to retire in South Africa."
      />
    </>
  );
}
