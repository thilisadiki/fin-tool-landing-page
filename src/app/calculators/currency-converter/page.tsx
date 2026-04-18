'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import Section from '@/components/ui/Section';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ReviewedBy from '@/components/ui/ReviewedBy';
import { ndulamiso } from '@/data/authors';
import CurrencyForm from '@/components/calculators/currency/CurrencyForm';
import CurrencyResults from '@/components/calculators/currency/CurrencyResults';
import CurrencyChart from '@/components/calculators/currency/CurrencyChart';
import { fetchSupportedCurrencies, fetchExchangeRates, type CurrencyRatesResponse, FALLBACK_CURRENCIES } from '@/lib/calculators/currencyApi';
import { buildCurrencyConverterSchema, buildBreadcrumbSchema, buildCurrencyConverterHowToSchema, getCalculatorDateModified } from '@/data/calculatorSchemaData';
import CalculatorFaq from '@/components/sections/CalculatorFaq';
import { currencyConverterFaqs } from '@/data/calculatorFaqs';

const currencySchema = buildCurrencyConverterSchema();
const currencyHowToSchema = buildCurrencyConverterHowToSchema();
const reviewedOn = getCalculatorDateModified('currency-converter');
const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'Calculators', url: '/calculators' },
  { name: 'Currency Converter', url: '/calculators/currency-converter' },
];
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

export default function CurrencyConverterPage() {
  const [currencies, setCurrencies] = useState<Record<string, string>>(FALLBACK_CURRENCIES);
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('ZAR');
  
  const [ratesData, setRatesData] = useState<CurrencyRatesResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load currencies on mount
  useEffect(() => {
    let active = true;
    fetchSupportedCurrencies().then((data) => {
      if (active) setCurrencies(data);
    });
    return () => { active = false; };
  }, []);

  // Fetch rates when base currency changes
  useEffect(() => {
    let active = true;
    setIsLoading(true);
    
    fetchExchangeRates(fromCurrency).then((data) => {
      if (active) {
        setRatesData(data);
        setIsLoading(false);
      }
    });
    
    return () => { active = false; };
  }, [fromCurrency]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(currencySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(currencyHowToSchema) }}
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
            <div className="w-16 h-16 bg-gradient-to-r from-[#1E3A5F] to-[#C9A84C] rounded-xl flex items-center justify-center mx-auto mb-6">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Currency Converter
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The Quick Money Tool currency converter gives you real-time exchange rates for global currencies. Convert money securely and track historical trends.
            </p>
          </motion.div>
        </div>
      </section>

      <ReviewedBy author={ndulamiso} dateReviewed={reviewedOn} />

      {/* Main Converter */}
      <Section maxWidth="max-w-4xl">
        <div className="bg-background rounded-3xl border border-border overflow-hidden shadow-sm">
          <div className="p-6 sm:p-8">
            <CurrencyForm
              amount={amount}
              fromCurrency={fromCurrency}
              toCurrency={toCurrency}
              currencies={currencies}
              onAmountChange={setAmount}
              onFromChange={setFromCurrency}
              onToChange={setToCurrency}
              onSwap={handleSwap}
            />
            
            <CurrencyResults
              amount={amount}
              fromCurrency={fromCurrency}
              toCurrency={toCurrency}
              ratesData={ratesData}
              isLoading={isLoading}
            />

            <CurrencyChart
              fromCurrency={fromCurrency}
              toCurrency={toCurrency}
            />
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
                <li><a href="#what-is-currency-converter" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">1. What is a currency converter?</a></li>
                <li><a href="#how-it-works" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">2. How our currency converter works</a></li>
                <li><a href="#why-rates-change" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">3. Why exchange rates change</a></li>
                <li><a href="#real-world-uses" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">4. Real-world uses</a></li>
                <li><a href="#key-features" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">5. Key features</a></li>
                <li><a href="#simple-example" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">6. A simple example</a></li>
                <li><a href="#mid-market-vs-bank" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">7. Mid-market rate vs bank rate</a></li>
                <li><a href="#best-exchange-tips" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">8. Tips to get the best value</a></li>
                <li><a href="#benefits" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">9. Benefits of online converters</a></li>
                <li><a href="#digital-age" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">10. Currency conversion in the digital age</a></li>
                <li><a href="#currency-converter-faq" className="text-[#C9A84C] dark:text-[#D4B96A] hover:underline">11. Frequently asked questions</a></li>
              </ul>
            </nav>
          </div>

          {/* Section 1: What is a currency converter */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="what-is-currency-converter">
            <h2 className="text-3xl font-bold text-foreground mb-4">What Is a Currency Converter?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Money moves across borders every second. Whether you are shopping online, travelling abroad, sending money internationally, or running a business, understanding currency values is essential. The Quick Money Tool currency converter lets you quickly convert one currency into another using up-to-date exchange rates, so you know exactly how much your money is worth anywhere in the world.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A currency converter is a digital tool that calculates the value of one currency in terms of another. It uses real-time (or near real-time) exchange rates to give accurate conversions instantly. For example, if you want to convert South African Rand (ZAR) to US Dollars (USD), the converter applies the latest exchange rate and displays the equivalent value.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              At its core, a currency converter simplifies a basic formula: <strong>Converted Amount = Amount × Exchange Rate</strong>. That simple calculation powers global trade, travel, and financial transactions every day.
            </p>
          </div>

          {/* Section 2: How it works */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="how-it-works">
            <h2 className="text-3xl font-bold text-foreground mb-4">How Our Currency Converter Works</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our converter pulls current exchange rate data and applies it instantly to your input amount. The process is fast, accurate, and requires no calculations on your part:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground mb-4">
              <li>Enter the amount you want to convert.</li>
              <li>Select the currency you are converting from.</li>
              <li>Choose the currency you want to convert to.</li>
              <li>Instantly view the converted result.</li>
            </ol>
            <p className="text-muted-foreground leading-relaxed">
              Because exchange rates constantly change with market conditions, the tool always gives you relevant and updated values.
            </p>
          </div>

          {/* Section 3: Why rates change */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="why-rates-change">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Exchange Rates Change</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Exchange rates are not fixed. They fluctuate throughout the day because currencies are traded in the global foreign exchange (forex) market, the largest financial market in the world. Several factors influence them:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li><strong>Supply and demand:</strong> currencies rise in value when demand is high and fall when demand is low.</li>
              <li><strong>Interest rates:</strong> higher rates often attract foreign investors, strengthening a country&apos;s currency. In South Africa the repo rate is set by the{' '}
                <a href="https://www.resbank.co.za" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">South African Reserve Bank (SARB)</a>.
              </li>
              <li><strong>Inflation:</strong> countries with lower inflation tend to have stronger currencies over time.</li>
              <li><strong>Economic stability:</strong> stable economies generally have stronger and more reliable currencies.</li>
              <li><strong>Global events:</strong> political changes, economic reports, and global crises can all move currency values.</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Because South Africa is an emerging market, the Rand can be especially volatile during periods of global uncertainty as investors move to &quot;safe haven&quot; currencies like the USD. Local drivers also matter: commodity prices (especially gold and platinum), domestic political stability, inflation versus trading partners, and SARB interest rate decisions.
            </p>
          </div>

          {/* Section 4: Real-world uses */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="real-world-uses">
            <h2 className="text-3xl font-bold text-foreground mb-4">Real-World Uses of a Currency Converter</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A currency converter is more than just a calculator. It is a practical tool used in everyday life:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li><strong>Travel planning:</strong> know how much your money is worth in the local currency so you can budget, compare prices, and avoid overspending.</li>
              <li><strong>Online shopping:</strong> understand the true cost of items bought from international stores before checkout.</li>
              <li><strong>Freelancing and remote work:</strong> if you earn in a foreign currency, calculate your earnings in Rand instantly.</li>
              <li><strong>International business:</strong> price products, manage costs, and handle cross-border transactions with confidence.</li>
              <li><strong>Money transfers:</strong> estimate how much a recipient will actually receive before you send money abroad.</li>
            </ul>
          </div>

          {/* Section 5: Key features */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="key-features">
            <h2 className="text-3xl font-bold text-foreground mb-4">Key Features of Our Currency Converter</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The tool is designed for speed, accuracy, and simplicity:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li><strong>Real-time exchange rates</strong> based on global market data.</li>
              <li><strong>Wide currency coverage,</strong> including USD, EUR, GBP, ZAR, and many more.</li>
              <li><strong>User-friendly interface:</strong> no complex inputs, just enter your amount and select currencies.</li>
              <li><strong>Instant results</strong> with no waiting.</li>
              <li><strong>Completely free</strong> with no sign-ups, subscriptions, or hidden fees.</li>
            </ul>
          </div>

          {/* Section 6: Simple example */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="simple-example">
            <h2 className="text-3xl font-bold text-foreground mb-4">Understanding Exchange Rates: A Simple Example</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Say the exchange rate is 1 USD = 18.50 ZAR. If you convert $100:
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong>100 × 18.50 = R1,850</strong>
            </p>
            <p className="text-muted-foreground leading-relaxed">
              That means $100 is equivalent to R1,850 at the quoted rate. In practice, banks and financial institutions may offer slightly different rates because of fees or markups, which is why the amount you actually receive can differ from the converter&apos;s result.
            </p>
          </div>

          {/* Section 7: Mid-market vs bank */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="mid-market-vs-bank">
            <h2 className="text-3xl font-bold text-foreground mb-4">Mid-Market Rate vs Bank Rate</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              When you use a currency converter, you usually see the mid-market rate (also known as the interbank rate). This is the &quot;real&quot; exchange rate used between banks. But when you actually exchange money, the rate you get is almost always worse:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li>Banks may add a markup of 2–5% on retail forex transactions.</li>
              <li>Currency exchange kiosks (especially at airports) often charge even higher fees.</li>
              <li>Money transfer services may include additional charges on top of the spread.</li>
            </ul>
            <div className="p-5 rounded-xl dark:bg-slate-800/50 bg-white border border-border not-prose">
              <p className="text-muted-foreground leading-relaxed">
                <strong>Bottom line:</strong> use the Quick Money Tool converter as a baseline to understand the true value of your money. When comparing providers, always check the total amount of foreign currency you receive, not just the advertised rate.
              </p>
            </div>
          </div>

          {/* Section 8: Best exchange tips */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="best-exchange-tips">
            <h2 className="text-3xl font-bold text-foreground mb-4">Tips to Get the Best Exchange Value</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A few practical habits can make a real difference to how much foreign currency you end up with:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li><strong>Avoid airport exchange counters.</strong> They consistently offer the worst rates and highest fees.</li>
              <li><strong>Compare providers.</strong> Check banks, fintech apps, and transfer services before committing.</li>
              <li><strong>Use digital payment options.</strong> Cards and fintech apps (Wise, Shyft, Investec forex, FNB Global Account) often beat cash exchanges.</li>
              <li><strong>Convert larger amounts wisely.</strong> Small differences in rates have a big impact on big sums.</li>
              <li><strong>Monitor trends.</strong> If you are not in a hurry, waiting for a favourable rate can save meaningful amounts.</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              South African tax residents also have a R1 million single discretionary allowance (SDA) per calendar year for travel, gifts, maintenance, investment, or online purchases without needing SARS approval, and up to R10 million per year with a SARS tax compliance status (TCS) PIN.
            </p>
          </div>

          {/* Section 9: Benefits */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="benefits">
            <h2 className="text-3xl font-bold text-foreground mb-4">Benefits of Using an Online Currency Converter</h2>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li><strong>Saves time:</strong> no need to calculate manually or call your bank.</li>
              <li><strong>Improves accuracy:</strong> reduces the risk of conversion errors.</li>
              <li><strong>Enhances financial planning:</strong> helps you budget for travel, purchases, and investments.</li>
              <li><strong>Provides transparency:</strong> shows the real exchange rate before fees are applied, so you can judge if a provider is fair.</li>
            </ul>
          </div>

          {/* Section 10: Digital age */}
          <div className="prose prose-slate dark:prose-invert max-w-none" id="digital-age">
            <h2 className="text-3xl font-bold text-foreground mb-4">Currency Conversion in the Digital Age</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Currency conversion has evolved significantly. In the past, people relied on banks or physical exchange offices. Today, online tools provide instant access to global exchange rates.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Modern converters use data from financial institutions, forex markets, and central banks like the{' '}
              <a href="https://www.resbank.co.za" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">South African Reserve Bank</a>{' '}
              to ensure accuracy, so you can access reliable currency information anytime, anywhere, whether you are at home, at work, or travelling.
            </p>
          </div>

          {/* Final Thoughts */}
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold text-foreground mb-4">Final Thoughts</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The Quick Money Tool currency converter is built to deliver fast, reliable results, help you make informed financial decisions, and simplify cross-border transactions. Whether you are converting rands to dollars, euros to pounds, or any other pair, the tool gives you the clarity you need without sign-ups or hidden costs.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Pair the converter with related Quick Money Tool calculators: the{' '}
              <a href="/calculators/budget-calculator" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">budget calculator</a>{' '}
              to plan spending in Rand, the{' '}
              <a href="/calculators/sars-income-tax-calculator" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">SARS income tax calculator</a>{' '}
              if you earn foreign income, and the{' '}
              <a href="/calculators/personal-loan-calculator" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">personal loan calculator</a>{' '}
              when weighing big purchases.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Currency conversion does not have to be complicated. Use the tool above any time you need a quick, transparent answer on what your money is worth.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div id="currency-converter-faq">
        <CalculatorFaq
          faqs={currencyConverterFaqs}
          title="Currency converter: frequently asked questions"
          subtitle="Mid-market rates, bank markups, SARB rules, and SARS forex allowances explained."
        />
      </div>
    </>
  );
}
