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
      <section className="px-6 py-16 bg-gradient-to-br dark:from-[#070f1a] dark:via-[#0F2744] dark:to-[#070f1a] from-slate-50 via-[#eef2f7] to-[#e6ecf4]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-16 h-16 bg-gradient-to-r from-[#0F2744] to-[#1E3A5F] rounded-xl flex items-center justify-center mx-auto mb-6 border border-[#C9A84C]/30">
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

      {/* Guide content wrapper — tighter spacing than default Section py-20 */}
      <div className="px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-12">

          {/* Table of Contents */}
        <div className="p-6 rounded-xl dark:bg-slate-800/50 bg-slate-100 border border-border">
          <h2 className="text-2xl font-bold text-foreground mb-4">In this guide</h2>
          <nav>
            <ul className="grid md:grid-cols-2 gap-2 text-sm">
              <li>
                <a href="#tax-free-threshold" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">1. Tax-free threshold explained</a>
              </li>
              <li>
                <a href="#how-paye-works" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">2. How PAYE is deducted monthly</a>
              </li>
              <li>
                <a href="#provisional-tax-vs-paye" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">3. Provisional tax vs PAYE</a>
              </li>
              <li>
                <a href="#foreign-income-exemption" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">4. Foreign income exemption</a>
              </li>
              <li>
                <a href="#what-is-taxable" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">5. What is taxable in South Africa</a>
              </li>
              <li>
                <a href="#when-you-dont-need-to-file" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">6. When you don&apos;t need to file a return</a>
              </li>
              <li>
                <a href="#tax-brackets" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">7. Tax brackets, rebates &amp; credits</a>
              </li>
              <li>
                <a href="#tax-faq" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">8. Frequently asked questions</a>
              </li>
            </ul>
          </nav>
        </div>

          {/* Section 1: Tax-Free Threshold */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="tax-free-threshold">
          <h2 className="text-3xl font-bold text-foreground mb-4">Tax-Free Threshold Explained</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Not everyone who earns an income in South Africa needs to pay tax. SARS sets a minimum annual income
            level called the <strong className="text-foreground">tax-free threshold</strong> (also known as the tax threshold). If your
            total taxable income for the year falls below this amount, you owe zero income tax.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The threshold exists because of the <strong className="text-foreground">primary rebate</strong>, a fixed credit that SARS
            subtracts from every individual&apos;s tax liability. For the {CURRENT_TAX_YEAR.year} tax year, the primary
            rebate is {formatZAR(CURRENT_TAX_YEAR.rebates.primary)}. When you work backwards from that rebate using the 18%
            starting tax rate, the amount of income that produces exactly {formatZAR(CURRENT_TAX_YEAR.rebates.primary)} in
            tax is {formatZAR(CURRENT_TAX_YEAR.thresholds.under65)}. That is where the under-65 threshold comes from.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Older taxpayers get additional rebates on top of the primary one. Taxpayers aged 65 to 74 receive the
            secondary rebate of {formatZAR(CURRENT_TAX_YEAR.rebates.secondary)}, which lifts their threshold
            to {formatZAR(CURRENT_TAX_YEAR.thresholds['65to74'])}. Those 75 and older also receive the tertiary rebate
            of {formatZAR(CURRENT_TAX_YEAR.rebates.tertiary)}, pushing their threshold
            to {formatZAR(CURRENT_TAX_YEAR.thresholds['75plus'])}.
          </p>

          <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-slate-100 border border-border not-prose">
            <h3 className="text-lg font-semibold text-foreground mb-3">Tax Thresholds ({CURRENT_TAX_YEAR.year})</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Source:{' '}
              <a href="https://www.sars.gov.za/tax-rates/income-tax/rates-of-tax-for-individuals/" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">SARS, Rates of tax for individuals</a>.
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

          <p className="text-muted-foreground leading-relaxed mt-4">
            <strong className="text-foreground">Important:</strong> the threshold applies to your total annual taxable income, not
            your monthly salary. If you earn below the threshold for part of the year but above it overall, you still owe tax
            on the full amount above R0, less the rebates.
          </p>
        </div>

          {/* Section 2: How PAYE Works */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="how-paye-works">
          <h2 className="text-3xl font-bold text-foreground mb-4">How PAYE Is Deducted Monthly</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            PAYE stands for Pay-As-You-Earn. It is the system your employer uses to deduct income tax from your salary
            every month and pay it over to SARS on your behalf. The goal is to spread your annual tax bill evenly across
            12 months so that you are not hit with one large payment at the end of the year.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Your employer calculates PAYE by taking your monthly salary, multiplying it by 12 to get an estimated annual
            income, applying the progressive tax brackets to work out the annual tax, subtracting your rebates and any
            medical tax credits, and then dividing the result by 12. That monthly figure is what gets withheld from your payslip.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            If your income is steady throughout the year, the total PAYE deducted over 12 months should closely match your
            actual annual tax liability. However, bonuses, overtime, commission, and salary increases during the year can
            cause mismatches. That is why your year-end tax return (or IRP5 reconciliation) exists: it compares what was
            deducted via PAYE against what you actually owe based on your full annual income.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Employers must pay PAYE over to SARS by the 7th of the month following the deduction (for example, January
            PAYE is due by 7 February). As an employee, you do not need to do anything during the year. Your employer
            handles the payments, and SARS receives an IRP5 certificate at year-end showing exactly what was earned and
            deducted.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            If too much PAYE was deducted (for example, because you had additional deductions like retirement contributions
            that were not fully accounted for), you will get a refund after filing your return. If too little was deducted, you
            will owe SARS the difference.
          </p>
        </div>

          {/* Section 3: Provisional Tax vs PAYE */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="provisional-tax-vs-paye">
          <h2 className="text-3xl font-bold text-foreground mb-4">Provisional Tax vs PAYE</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            PAYE and provisional tax are two different ways of paying income tax during the year. They serve the same
            purpose (preventing a large year-end bill) but apply to different types of income.
          </p>

          <div className="grid md:grid-cols-2 gap-6 not-prose">
            <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-slate-100 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-3">PAYE (employees)</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Deducted automatically by your employer each month</li>
                <li>Based on your salary, bonuses, and benefits</li>
                <li>You do not need to make any manual payments</li>
                <li>Reconciled at year-end via your tax return</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-slate-100 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-3">Provisional tax (self-employed / extra income)</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>You estimate and pay your own tax twice a year</li>
                <li>First payment due by end of August, second by end of February</li>
                <li>Applies if you earn income not covered by PAYE</li>
                <li>Includes rental income, freelance work, business profits, and investment income above R30,000 in interest</li>
              </ul>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mt-4 mb-4">
            Many South Africans fall into both categories. If you have a salaried job (PAYE) and also earn rental income
            or freelance on the side, you are a provisional taxpayer for that additional income. Your employer handles
            PAYE on your salary, but you are responsible for estimating and paying provisional tax on everything else.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Getting your provisional tax estimate wrong can result in penalties. If you underestimate your taxable income
            by more than the allowed margin, SARS may charge an underestimation penalty. It is better to slightly
            overestimate and receive a refund than to underestimate and face additional charges.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            You can use the calculator above to estimate your total annual tax liability across all income sources,
            which makes filling in your provisional tax return (IRP6) much easier.
          </p>
        </div>

          {/* Section 4: Foreign Income Exemption */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="foreign-income-exemption">
          <h2 className="text-3xl font-bold text-foreground mb-4">Section 10(1)(o)(ii): Foreign Income Exemption</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            South Africa taxes residents on their worldwide income. However, if you work abroad for an extended period,
            you may qualify for a partial exemption under section 10(1)(o)(ii) of the Income Tax Act. This is commonly
            known as the <strong className="text-foreground">foreign employment income exemption</strong>.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            To qualify, you must meet all of the following requirements:
          </p>
          <ul className="space-y-2 text-muted-foreground mb-4">
            <li>You must be a South African tax resident.</li>
            <li>The income must be from employment services rendered outside South Africa.</li>
            <li>You must spend more than 183 days outside South Africa in any 12-month period starting or ending during the tax year.</li>
            <li>Of those 183+ days, at least 60 must be consecutive.</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mb-4">
            If you meet these conditions, the first R1.25 million of your foreign employment income is exempt from
            South African tax. Any amount above R1.25 million is taxable in South Africa, although you may claim a
            credit for tax already paid in the foreign country under a double taxation agreement (DTA).
          </p>
          <p className="text-muted-foreground leading-relaxed">
            This exemption does not apply to freelancers, business owners, or passive income like dividends and rental income.
            It only covers employment income (salary, bonuses, and allowances) from services physically performed outside South Africa.
            For the full legislation, see the{' '}
            <a href="https://www.sars.gov.za/types-of-tax/personal-income-tax/" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">SARS personal income tax guide</a>.
          </p>
        </div>

          {/* Section 5: What Is Taxable */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="what-is-taxable">
          <h2 className="text-3xl font-bold text-foreground mb-4">What Is Taxable in South Africa</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            South Africa operates on a <strong className="text-foreground">residence-based</strong> tax system. If you are a South African
            tax resident, you are taxed on your worldwide income from all sources. Here are some of the most common income
            types that people overlook.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Rental income</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            If you rent out a property (or even a room on platforms like Airbnb), the rental income is taxable. You can
            deduct expenses directly related to earning that income, such as bond interest (not the capital portion),
            rates and levies, insurance, repairs, and agent fees. The net profit after deductions is added to your
            other income and taxed at your marginal rate. You must declare rental income even if it results in a loss,
            as the loss can reduce your taxable income from other sources.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Side hustles and freelance income</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Any income you earn from freelance work, consulting, tutoring, driving for ride-hailing services, or selling
            goods online is taxable. This includes cash payments, bank transfers, and payments in kind. If you earn
            regularly from a side hustle, SARS considers you to be carrying on a trade, which means you should register
            as a provisional taxpayer and make estimated payments twice a year. You can deduct business expenses like
            data costs, equipment, and travel directly related to earning that income.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Cryptocurrency</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            SARS treats cryptocurrency as an intangible asset, not as currency. If you trade crypto frequently (buying
            and selling for profit), SARS views this as revenue, and your profits are taxed as income at your marginal
            tax rate. If you hold crypto as a long-term investment and sell it occasionally, the profit may be treated
            as a capital gain, in which case only 40% of the gain is included in your taxable income (for individuals).
            The classification depends on your intention, frequency of trading, and the period of holding.
            SARS has published a{' '}
            <a href="https://www.sars.gov.za/types-of-tax/personal-income-tax/" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">crypto asset guide</a>{' '}
            that outlines how they distinguish between revenue and capital treatment.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Interest and investment income</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Interest earned from savings accounts, fixed deposits, and money market funds is taxable, but there is an
            annual exemption. For the {CURRENT_TAX_YEAR.year} tax year, taxpayers under 65 can earn up to R23,800 in
            interest tax-free, while those 65 and older can earn up to R34,500. Interest above these thresholds is
            added to your taxable income. South African dividends from local companies are generally taxed at 20%
            dividends withholding tax, which is deducted at source, and are not included in your income tax return.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Capital gains</h3>
          <p className="text-muted-foreground leading-relaxed">
            When you sell an asset (property, shares, crypto held as an investment) for more than you paid, the profit
            is a capital gain. Individuals receive an annual exclusion of R40,000 on capital gains. After the exclusion,
            40% of the remaining gain is added to your taxable income and taxed at your marginal rate. For example, if
            you sell a second property at a R500,000 profit, R460,000 is included after the exclusion, and R184,000
            (40% of R460,000) is added to your taxable income for the year.
          </p>
        </div>

          {/* Section 6: When You Don't Need to File */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="when-you-dont-need-to-file">
          <h2 className="text-3xl font-bold text-foreground mb-4">When You Don&apos;t Need to Submit a Tax Return</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Not every South African taxpayer needs to file an annual return. SARS runs an{' '}
            <strong className="text-foreground">auto-assessment</strong> process where they use data from your employer (IRP5),
            banks (interest certificates), and medical aids to calculate your tax automatically. If the auto-assessment
            shows that you do not owe anything extra and are not due a refund, you may not need to file.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            You generally do <strong className="text-foreground">not</strong> need to submit a return if all of the following apply:
          </p>
          <ul className="space-y-2 text-muted-foreground mb-4">
            <li>Your total employment income for the year is below R500,000.</li>
            <li>You only have one employer for the full tax year.</li>
            <li>You have no other income (no rental income, freelance work, or business profits).</li>
            <li>You have no additional deductions to claim (such as retirement annuity contributions not reported on your IRP5, travel allowance claims, or home office deductions).</li>
            <li>You have no capital gains from selling assets.</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mb-4">
            If SARS auto-assesses you and the result is correct, you can simply accept it on eFiling or the SARS MobiApp.
            However, if you know the auto-assessment is wrong (for example, it missed a deduction), you should file a
            return to correct it.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">When you must file:</strong> you must submit a return if you are a
            provisional taxpayer, if your income exceeds R500,000, if you have more than one employer, if you earn any
            non-salary income (rental, freelance, business), or if you want to claim deductions that were not captured
            in your IRP5. When in doubt, file. There is no penalty for submitting a return you did not strictly need to.
          </p>
        </div>

          {/* Section 7: Tax Brackets, Rebates & Credits */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="tax-brackets">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Tax Brackets, Rebates &amp; Credits ({CURRENT_TAX_YEAR.year})
          </h2>

          <div className="grid md:grid-cols-2 gap-8 not-prose">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Progressive Tax Brackets</h3>
              <p className="text-muted-foreground mb-4">
                South Africa uses a progressive tax system where higher earners pay a higher percentage of tax.
                For the {CURRENT_TAX_YEAR.year} tax year, rates range from 18% on the first R245,100 up to 45%
                on income above R1,878,600. These brackets are published annually by the{' '}
                <a href="https://www.sars.gov.za/tax-rates/income-tax/rates-of-tax-for-individuals/" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">South African Revenue Service (SARS)</a>.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3">Tax Rebates</h3>
              <p className="text-muted-foreground mb-4">
                All taxpayers receive a primary rebate of {formatZAR(CURRENT_TAX_YEAR.rebates.primary)}.
                Taxpayers aged 65 to 74 receive an additional secondary rebate of {formatZAR(CURRENT_TAX_YEAR.rebates.secondary)},
                and those 75 and older receive a further tertiary rebate of {formatZAR(CURRENT_TAX_YEAR.rebates.tertiary)}.
                Rebate amounts are set by{' '}
                <a href="https://www.sars.gov.za/tax-rates/income-tax/rates-of-tax-for-individuals/" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">SARS</a>{' '}
                and adjust periodically with the annual Budget Speech.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Medical Tax Credits</h3>
              <p className="text-muted-foreground mb-4">
                If you contribute to a medical aid, you qualify for monthly tax credits:
                {' '}{formatZAR(CURRENT_TAX_YEAR.medicalCredits.mainMember)} for yourself,
                {' '}{formatZAR(CURRENT_TAX_YEAR.medicalCredits.firstDependent)} for the first dependent,
                and {formatZAR(CURRENT_TAX_YEAR.medicalCredits.additional)} for each additional dependent.
                Credit amounts are specified in the{' '}
                <a href="https://www.sars.gov.za/types-of-tax/personal-income-tax/medical-credits/" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">SARS medical tax credit schedule</a>.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3">Retirement Fund Deductions</h3>
              <p className="text-muted-foreground mb-4">
                Contributions to approved retirement funds (pension, provident, or retirement annuity) are deductible
                up to 27.5% of your remuneration, with an annual cap of {formatZAR(CURRENT_TAX_YEAR.retirementDeductionCap)}.
                This deduction is governed by section 11F of the Income Tax Act. See the{' '}
                <a href="https://www.sars.gov.za/tax-rates/income-tax/retirement-lump-sum-benefits/" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">SARS retirement fund guide</a>{' '}
                for full details.
              </p>
            </div>
          </div>
        </div>

        </div>
      </div>

      {/* FAQ */}
      <div id="tax-faq">
        <CalculatorFaq
          faqs={sarsTaxFaqs}
          title="SARS income tax: frequently asked questions"
          subtitle="Common questions about PAYE, filing deadlines, provisional tax, and the 2026/2027 tax tables."
        />
      </div>
    </>
  );
}
