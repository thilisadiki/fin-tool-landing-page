'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import Section from '@/components/ui/Section';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ReviewedBy from '@/components/ui/ReviewedBy';
import { ndulamiso } from '@/data/authors';
import TaxCalculatorForm from '@/components/calculators/tax/TaxCalculatorForm';
import TaxResultsPanel from '@/components/calculators/tax/TaxResultsPanel';
import TaxBreakdownTable from '@/components/calculators/tax/TaxBreakdownTable';
import { calculateTax, type TaxInputs, type TaxResult } from '@/lib/calculators/taxCalculator';
import { CURRENT_TAX_YEAR } from '@/data/taxData';
import { buildTaxCalculatorSchema, buildBreadcrumbSchema, buildTaxHowToSchema, getCalculatorDateModified } from '@/data/calculatorSchemaData';
import { formatZAR } from '@/lib/formatters';
import CalculatorFaq from '@/components/sections/CalculatorFaq';
import { sarsTaxFaqs } from '@/data/calculatorFaqs';

const DEFAULT_INPUTS: TaxInputs = {
  grossIncome: 0,
  incomeFrequency: 'monthly',
  otherIncome: 0,
  ageCategory: 'under65',
  medicalAidMembers: 0,
  retirementContribution: 0,
  includeUIF: true,
};

const taxCalcSchema = buildTaxCalculatorSchema();
const taxHowToSchema = buildTaxHowToSchema();
const reviewedOn = getCalculatorDateModified('sars-income-tax-calculator');
const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'Calculators', url: '/calculators' },
  { name: 'SARS Income Tax Calculator', url: '/calculators/sars-income-tax-calculator' },
];
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

export default function SarsIncomeTaxCalculatorPage() {
  const [inputs, setInputs] = useState<TaxInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<TaxResult | null>(null);

  const handleCalculate = () => {
    if (inputs.grossIncome <= 0) return;
    setResult(calculateTax(inputs));
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(taxCalcSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(taxHowToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Breadcrumbs items={breadcrumbItems} />

      {/* Hero */}
      <section className="px-6 py-16 bg-gradient-to-br dark:from-slate-900 dark:via-emerald-950 dark:to-teal-950 from-slate-50 via-emerald-50 to-teal-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              SARS Income Tax Calculator
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculate your South African income tax for the {CURRENT_TAX_YEAR.year} tax year.
              Get instant results for PAYE, rebates, medical credits, and your take-home pay.
            </p>
          </motion.div>
        </div>
      </section>

      <ReviewedBy author={ndulamiso} dateReviewed={reviewedOn} />

      {/* Calculator */}
      <Section maxWidth="max-w-4xl">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Your Details</h2>
            <TaxCalculatorForm
              inputs={inputs}
              onChange={setInputs}
              onCalculate={handleCalculate}
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Results</h2>
            {result ? (
              <div className="space-y-6">
                <TaxResultsPanel result={result} />
                <TaxBreakdownTable result={result} />
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 rounded-xl border border-dashed border-border">
                <p className="text-muted-foreground text-center">
                  Enter your income details and click<br />&quot;Calculate Tax&quot; to see your results.
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
            How South African Income Tax Works ({CURRENT_TAX_YEAR.year})
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Progressive Tax Brackets</h3>
              <p className="text-muted-foreground mb-4">
                South Africa uses a progressive tax system where higher earners pay a higher percentage of tax.
                For the {CURRENT_TAX_YEAR.year} tax year, rates range from 18% on the first R245,100 up to 45%
                on income above R1,878,600.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3">Tax Rebates</h3>
              <p className="text-muted-foreground mb-4">
                All taxpayers receive a primary rebate of {formatZAR(CURRENT_TAX_YEAR.rebates.primary)}.
                Taxpayers aged 65–74 receive an additional secondary rebate of {formatZAR(CURRENT_TAX_YEAR.rebates.secondary)},
                and those 75 and older receive a further tertiary rebate of {formatZAR(CURRENT_TAX_YEAR.rebates.tertiary)}.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Medical Tax Credits</h3>
              <p className="text-muted-foreground mb-4">
                If you contribute to a medical aid, you qualify for monthly tax credits:
                {' '}{formatZAR(CURRENT_TAX_YEAR.medicalCredits.mainMember)} for yourself,
                {' '}{formatZAR(CURRENT_TAX_YEAR.medicalCredits.firstDependent)} for the first dependent,
                and {formatZAR(CURRENT_TAX_YEAR.medicalCredits.additional)} for each additional dependent.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3">Retirement Fund Deductions</h3>
              <p className="text-muted-foreground mb-4">
                Contributions to approved retirement funds (pension, provident, or retirement annuity) are deductible
                up to 27.5% of your remuneration, with an annual cap of {formatZAR(CURRENT_TAX_YEAR.retirementDeductionCap)}.
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 rounded-xl dark:bg-slate-800/50 bg-slate-100 border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-3">Tax Thresholds ({CURRENT_TAX_YEAR.year})</h3>
            <p className="text-muted-foreground mb-3">
              You are not required to pay income tax if your annual taxable income is below these thresholds:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex justify-between">
                <span>Under 65 years</span>
                <span className="font-medium text-foreground">{formatZAR(CURRENT_TAX_YEAR.thresholds.under65)}</span>
              </li>
              <li className="flex justify-between">
                <span>65 to 74 years</span>
                <span className="font-medium text-foreground">{formatZAR(CURRENT_TAX_YEAR.thresholds['65to74'])}</span>
              </li>
              <li className="flex justify-between">
                <span>75 years and older</span>
                <span className="font-medium text-foreground">{formatZAR(CURRENT_TAX_YEAR.thresholds['75plus'])}</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <CalculatorFaq
        faqs={sarsTaxFaqs}
        title="SARS income tax: frequently asked questions"
        subtitle="Common questions about PAYE, filing deadlines, provisional tax, and the 2026/2027 tax tables."
      />
    </>
  );
}
