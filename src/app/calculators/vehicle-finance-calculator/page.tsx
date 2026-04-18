'use client';

import { useState } from 'react';
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

  const handleCalculate = () => {
    if (inputs.vehiclePrice <= 0 || inputs.loanTermMonths <= 0) return;
    setResult(calculateVehicleFinance(inputs));
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

          <div>
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

      {/* SEO Content */}
      <Section className="bg-accent/30">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            How Vehicle Finance Works in South Africa
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Understanding the Interest Rate</h3>
              <p className="text-muted-foreground mb-4">
                The{' '}
                <a href="https://www.resbank.co.za/en/home/what-we-do/statistics/key-statistics/current-market-rates" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">prime lending rate</a>{' '}
                published by the South African Reserve Bank (SARB) typically dictates the baseline interest for car loans in SA. Your personalized interest rate will depend on your credit score, affordability, and the size of your deposit. An interest rate below prime is excellent, while a rate higher than prime is more typical for high-risk profiles.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3">The Power of a Deposit</h3>
              <p className="text-muted-foreground mb-4">
                Putting down a deposit accomplishes two things: it reduces your monthly installment directly by lowering the principal amount financed, and it often secures you a better interest rate from the bank because it lowers their risk. A common deposit is between 10% and 20% of the vehicle&apos;s price.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">What is a Balloon Payment?</h3>
              <p className="text-muted-foreground mb-4">
                A balloon payment is an artificially inflated final installment placed at the end of the loan term. It is calculated as a percentage of the purchase price and reduces your monthly installments. However, you still pay interest on the balloon amount over the life of the loan, and you must pay that large lump sum off at the end in order to take full ownership of the vehicle.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3">Loan Terms</h3>
              <p className="text-muted-foreground mb-4">
                Car loans in South Africa usually range from 12 to 72 months (1 to 6 years). While a longer term reduces your monthly payment, it significantly increases the total interest you pay over the life of the loan. Aiming for a 60-month term is often the sweet spot between affordability and lower total interest.
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 rounded-xl dark:bg-slate-800/50 bg-slate-100 border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-3">Important Costs to Remember</h3>
            <p className="text-muted-foreground mb-3">
              Remember that when buying a car, the monthly installment is just one part of the cost. The{' '}
              <a href="https://www.ncr.org.za/" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">National Credit Regulator (NCR)</a>{' '}
              regulates the maximum fees lenders may charge under the{' '}
              <a href="https://www.ncr.org.za/documents/pages/guidelines/Maximum-rate-interest-and-fees.pdf" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">National Credit Act</a>.
              Always account for:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex justify-between">
                <span>Initiation Fee (once-off)</span>
                <span className="text-foreground text-right">Up to R1,207.50 incl. VAT</span>
              </li>
              <li className="flex justify-between">
                <span>Monthly Service Fee</span>
                <span className="text-foreground text-right">Up to R69.00/month</span>
              </li>
              <li className="flex justify-between">
                <span>Comprehensive Insurance</span>
                <span className="text-foreground">Required by law for financed vehicles</span>
              </li>
              <li className="flex justify-between">
                <span>Fuel and Toll Gates</span>
                <span className="text-foreground">Daily running costs</span>
              </li>
              <li className="flex justify-between">
                <span>Maintenance and Servicing</span>
                <span className="text-foreground">Tyres, brakes, standard intervals</span>
              </li>
            </ul>
            <p className="text-xs text-muted-foreground mt-3">
              Fee caps sourced from the{' '}
              <a href="https://www.ncr.org.za/documents/pages/guidelines/Maximum-rate-interest-and-fees.pdf" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">NCR maximum rates &amp; fees schedule</a>.
            </p>
          </div>
        </div>
      </Section>

      <CalculatorFaq
        faqs={vehicleFinanceFaqs}
        title="Vehicle finance: frequently asked questions"
        subtitle="Deposits, balloon payments, interest rates, and the real cost of financing a car in South Africa."
      />
    </>
  );
}
