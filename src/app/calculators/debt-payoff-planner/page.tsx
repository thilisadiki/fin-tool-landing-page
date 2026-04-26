'use client';

import { useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingDown } from 'lucide-react';
import Section from '@/components/ui/Section';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ReviewedBy from '@/components/ui/ReviewedBy';
import { ndulamiso } from '@/data/authors';
import DebtPayoffForm from '@/components/calculators/debt-payoff/DebtPayoffForm';
import DebtPayoffResultsPanel from '@/components/calculators/debt-payoff/DebtPayoffResultsPanel';
import DebtPayoffSchedule from '@/components/calculators/debt-payoff/DebtPayoffSchedule';
import {
  calculateDebtPayoff,
  type Debt,
  type DebtPayoffResult,
} from '@/lib/calculators/debtPayoffCalculator';
import {
  buildDebtPayoffCalculatorSchema,
  buildBreadcrumbSchema,
  buildDebtPayoffHowToSchema,
  getCalculatorDateModified,
} from '@/data/calculatorSchemaData';
import CalculatorFaq from '@/components/sections/CalculatorFaq';
import { debtPayoffFaqs } from '@/data/calculatorFaqs';

const DEFAULT_DEBTS: Debt[] = [
  { id: 'seed-1', name: 'Credit card', balance: 38000, apr: 24, minPayment: 1300 },
  { id: 'seed-2', name: 'Store account', balance: 7500, apr: 18, minPayment: 400 },
  { id: 'seed-3', name: 'Personal loan', balance: 55000, apr: 21, minPayment: 1700 },
];

const DEFAULT_EXTRA = 1500;

const debtPayoffSchema = buildDebtPayoffCalculatorSchema();
const debtPayoffHowToSchema = buildDebtPayoffHowToSchema();
const reviewedOn = getCalculatorDateModified('debt-payoff-planner');
const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'Calculators', url: '/calculators' },
  { name: 'Debt Payoff Planner', url: '/calculators/debt-payoff-planner' },
];
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

export default function DebtPayoffPlannerPage() {
  const [debts, setDebts] = useState<Debt[]>(DEFAULT_DEBTS);
  const [extraMonthly, setExtraMonthly] = useState<number>(DEFAULT_EXTRA);
  const [result, setResult] = useState<DebtPayoffResult | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const startDate = useMemo(() => new Date(), []);

  const handleCalculate = () => {
    const validDebts = debts.filter((d) => d.balance > 0);
    if (validDebts.length === 0) return;

    setResult(
      calculateDebtPayoff({
        debts,
        extraMonthly,
        startDate,
      }),
    );

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(debtPayoffSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(debtPayoffHowToSchema) }}
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
              <TrendingDown className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Debt Payoff Planner
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Compare the snowball and avalanche methods side by side. See your
              debt-free date, total interest, and how much extra payments save you.
            </p>
          </motion.div>
        </div>
      </section>

      <ReviewedBy author={ndulamiso} dateReviewed={reviewedOn} />

      <Section maxWidth="max-w-5xl">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Your Debts</h2>
            <DebtPayoffForm
              debts={debts}
              extraMonthly={extraMonthly}
              onDebtsChange={setDebts}
              onExtraChange={setExtraMonthly}
              onCalculate={handleCalculate}
            />
          </div>

          <div ref={resultsRef} className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6">Results</h2>
            {result ? (
              <div className="space-y-6">
                <DebtPayoffResultsPanel result={result} />
                <DebtPayoffSchedule result={result} />
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 rounded-xl border border-dashed border-border px-6">
                <p className="text-muted-foreground text-center">
                  Add your debts and any extra monthly payment, then click
                  <br />
                  &quot;Compare Strategies&quot; to see your payoff plan.
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
                    href="#what-is-debt-payoff-planner"
                    className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline"
                  >
                    1. What is a debt payoff planner?
                  </a>
                </li>
                <li>
                  <a
                    href="#snowball-vs-avalanche"
                    className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline"
                  >
                    2. Snowball vs avalanche
                  </a>
                </li>
                <li>
                  <a
                    href="#how-to-use"
                    className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline"
                  >
                    3. How to use this calculator
                  </a>
                </li>
                <li>
                  <a
                    href="#extra-payments"
                    className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline"
                  >
                    4. Why extra payments compound
                  </a>
                </li>
                <li>
                  <a
                    href="#south-africa-context"
                    className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline"
                  >
                    5. Debt context for South Africa
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
                    href="#debt-payoff-faq"
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
            id="what-is-debt-payoff-planner"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What Is a Debt Payoff Planner?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A debt payoff planner takes your real debt list, accounts for the interest
              each one charges, and works out exactly when you can be debt-free. It
              also tells you which order to attack the debts in to either pay the least
              interest or stay motivated long enough to actually finish.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The planner runs two strategies for you in parallel. The snowball method
              clears the smallest balance first to give you quick wins. The avalanche
              method clears the highest interest rate first to save you the most money.
              You get a clear comparison of both, including the payoff date and total
              interest under each approach.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The numbers update around your real situation: minimum payments stay in
              place on every debt, and any extra you can spare gets directed at one
              target debt at a time.
            </p>
          </div>

          <div
            className="prose prose-slate dark:prose-invert max-w-none"
            id="snowball-vs-avalanche"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Snowball vs Avalanche
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Both strategies pay the minimums on every debt. The difference is where
              the extra money goes each month.
            </p>

            <div className="grid md:grid-cols-2 gap-6 not-prose">
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-slate-100 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Snowball method
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Throw every extra rand at the debt with the smallest balance, no
                  matter the interest rate. When that one is gone, roll its payment
                  into the next-smallest balance.
                </p>
                <p className="text-sm text-muted-foreground">
                  Strength: quick wins early on. Closing a whole account in the first
                  few months keeps people committed when motivation matters most.
                </p>
              </div>
              <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-slate-100 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Avalanche method
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Throw every extra rand at the debt with the highest interest rate,
                  regardless of balance. When that one is gone, move to the next
                  highest rate.
                </p>
                <p className="text-sm text-muted-foreground">
                  Strength: pays the least interest in total. Best when your highest-
                  rate debt is also a meaningful chunk of what you owe.
                </p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mt-6">
              When the difference between the two methods is small in rands, pick
              snowball. The behavioural lift of clearing accounts is worth more than a
              minor interest saving. When avalanche saves a meaningful amount, it
              usually means one of your debts is at a much higher rate than the rest,
              and that one deserves the focus.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none" id="how-to-use">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              How to Use This Debt Payoff Planner
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              You only need three numbers per debt: the current balance, the interest
              rate, and the minimum monthly payment. Pull these from your most recent
              statements.
            </p>

            <div className="not-prose space-y-3">
              {[
                {
                  step: '1',
                  title: 'List every debt with a balance',
                  desc: 'Credit cards, store accounts, personal loans, vehicle finance, overdrafts. Anything charging interest belongs on the list.',
                },
                {
                  step: '2',
                  title: 'Enter the current balance',
                  desc: 'Use the most recent statement balance. Small day-to-day variation does not change the strategy.',
                },
                {
                  step: '3',
                  title: 'Add the interest rate (APR)',
                  desc: 'This is on every statement. South African unsecured rates often sit between 18% and 28% under NCA caps.',
                },
                {
                  step: '4',
                  title: 'Add the minimum payment',
                  desc: 'The minimum the lender requires each month. The calculator always pays at least this much per debt.',
                },
                {
                  step: '5',
                  title: 'Add any extra you can put toward debt',
                  desc: 'Any extra rand goes to the target debt. Even R500 per month dramatically shortens the payoff timeline.',
                },
                {
                  step: '6',
                  title: 'Compare strategies',
                  desc: 'Click Compare Strategies. The calculator runs the snowball and avalanche methods side by side and tells you which finishes sooner and which costs less.',
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
            id="extra-payments"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Extra Payments Compound
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The reason a debt payoff plan works so well is that interest only
              accrues on the remaining balance. Every rand of extra payment shrinks
              that balance, which shrinks every future month of interest, which lets
              even more of the next payment go to principal.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              An extra R1,000 per month against a 22% credit card balance does not
              just save R1,000 over the life of the loan. It can save several times
              that, because the interest you would have paid on that R1,000 every
              future month never accrues in the first place.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The same logic explains why dragging out the term is so expensive.
              Paying the minimum on a high-rate account stretches the principal across
              more months of interest charges, which is exactly the dynamic the
              calculator visualises in the &quot;total interest&quot; line.
            </p>
          </div>

          <div
            className="prose prose-slate dark:prose-invert max-w-none"
            id="south-africa-context"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Debt Context for South Africa
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The National Credit Act caps interest rates on different categories of
              credit. Unsecured personal loans, credit facilities, and short-term
              credit each have their own ceilings, all linked to the repo rate. As of
              early 2026, unsecured loan rates can run as high as 27.75% per year
              under the NCA framework.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              That matters for strategy choice. With rates that high on a meaningful
              balance, the avalanche method usually saves a lot in interest. The
              difference often runs into thousands of rand and several months sooner
              to debt-free, even if your minimums and extra payments stay the same.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              If you genuinely cannot make your minimums, debt review under the NCA
              is a formal route worth considering. A debt counsellor restructures your
              repayments and protects you from legal action while the plan is in
              place. The calculator on this page assumes you can keep paying the
              minimums and want to optimise from there.
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
              <li>Spreading the extra payment across every debt instead of one target debt at a time.</li>
              <li>Stopping the minimums on other debts to free up cash, which triggers fees and damages your credit profile.</li>
              <li>Adding new debt to the same accounts you are paying down.</li>
              <li>Ignoring high-rate store accounts because the balances feel small.</li>
              <li>Picking a strategy on a spreadsheet but never actually starting the extra payment.</li>
            </ul>

            <p className="text-muted-foreground leading-relaxed mt-4">
              The best plan is the one you stick to. If avalanche saves you a small
              amount but you know the early wins of snowball will keep you going,
              snowball is the right answer for you. The calculator gives you the
              numbers so the choice is informed, not the other way around.
            </p>
          </div>
        </div>
      </div>

      <div id="debt-payoff-faq">
        <CalculatorFaq
          faqs={debtPayoffFaqs}
          title="Debt payoff FAQ"
          subtitle="Snowball, avalanche, extra payments, and the NCA context behind South African debt."
        />
      </div>
    </>
  );
}
