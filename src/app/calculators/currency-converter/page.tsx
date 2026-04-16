'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import Section from '@/components/ui/Section';
import CurrencyForm from '@/components/calculators/currency/CurrencyForm';
import CurrencyResults from '@/components/calculators/currency/CurrencyResults';
import CurrencyChart from '@/components/calculators/currency/CurrencyChart';
import { fetchSupportedCurrencies, fetchExchangeRates, type CurrencyRatesResponse, FALLBACK_CURRENCIES } from '@/lib/calculators/currencyApi';
import { buildCurrencyConverterSchema, buildBreadcrumbSchema } from '@/data/calculatorSchemaData';

const currencySchema = buildCurrencyConverterSchema();
const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Calculators', url: '/calculators' },
  { name: 'Currency Converter', url: '/calculators/currency-converter' },
]);

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="px-6 py-16 bg-gradient-to-br dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950 from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/20">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Currency Converter
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real-time exchange rates for global currencies. Convert money securely and track historical trends. 
            </p>
          </motion.div>
        </div>
      </section>

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

      {/* Educational SEO Content */}
      <Section className="bg-accent/30 pt-0">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Understanding Exchange Rates
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">How are Exchange Rates Determined?</h3>
              <p className="text-muted-foreground mb-4">
                Exchange rates are determined in the foreign exchange market, which is open to a wide range of different types of buyers and sellers where currency trading occurs 24 hours a day. Floating exchange rates are determined by the market forces of supply and demand. If demand for a currency is high, its value will increase, and if demand is low, it will decrease.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3">What Influences the South African Rand (ZAR)?</h3>
              <p className="text-muted-foreground mb-4">
                The Rand is often influenced by global commodity prices (especially gold and platinum), domestic political stability, inflation rates compared to trading partners, and changes in interest rates by the South African Reserve Bank (SARB). Because South Africa is an emerging market, the ZAR can sometimes be volatile during periods of global economic uncertainty as investors move to "safe haven" currencies like the USD.
              </p>
            </div>

            <div>
               <div className="p-6 rounded-xl dark:bg-slate-800/50 bg-white border border-border h-full flex flex-col justify-center">
                  <h3 className="text-xl font-semibold text-foreground mb-3">Is this the rate I get at the bank?</h3>
                  <p className="text-muted-foreground mb-4">
                    <strong>No.</strong> The rates shown on our calculator are the "mid-market" or interbank rates. This is the true exchange rate that banks use to trade with one another.
                  </p>
                  <p className="text-muted-foreground mb-0">
                    When you exchange money at a commercial bank, foreign exchange bureau, or through PayPal, they typically take the mid-market rate and add a markup or "spread" so they can make a profit on the transaction. You should use our calculator as a baseline to understand the true value of your money.
                  </p>
               </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
