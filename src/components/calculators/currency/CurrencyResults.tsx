import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { CurrencyRatesResponse } from '@/lib/calculators/currencyApi';

interface CurrencyResultsProps {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
  ratesData: CurrencyRatesResponse | null;
  isLoading: boolean;
}

export default function CurrencyResults({
  amount,
  fromCurrency,
  toCurrency,
  ratesData,
  isLoading
}: CurrencyResultsProps) {
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-border mt-6">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-muted-foreground">Fetching latest live rates...</p>
        </div>
      </div>
    );
  }

  if (!ratesData && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-rose-50 dark:bg-rose-950/30 rounded-2xl border border-rose-200 dark:border-rose-900 mt-6 text-center">
        <p className="text-rose-600 font-medium tracking-wide">Failed to fetch exchange rates.</p>
        <p className="text-sm text-rose-500/80 mt-1">Please try again later.</p>
      </div>
    );
  }

  // Frankfurter base represents "from", and rates map to "to"
  const rate = ratesData?.rates[toCurrency] || 1;
  const convertedAmount = amount * rate;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${amount}-${fromCurrency}-${toCurrency}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="mt-6 p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl relative overflow-hidden group"
      >
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none group-hover:bg-blue-500/20 transition-colors duration-700" />
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <p className="text-slate-400 font-medium mb-2">
            {amount.toLocaleString('en-US')} {fromCurrency} equals
          </p>
          <div className="flex flex-wrap justify-center items-end gap-3 mb-6">
            <span className="text-5xl md:text-6xl font-bold text-white tracking-tight">
              {convertedAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-2xl md:text-3xl font-semibold text-blue-400 pb-1">
              {toCurrency}
            </span>
          </div>

          <div className="flex flex-col items-center gap-1">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300">
               <span>1 {fromCurrency}</span>
               <ArrowRight className="w-4 h-4 text-blue-400" />
               <span className="font-medium text-white">{rate.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {toCurrency}</span>
             </div>
             
             <p className="text-xs text-slate-500 mt-4">
               Real-time data provided by Frankfurter (ECB Reference Rates).<br/>
               Last updated: {new Date(ratesData?.date || '').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
             </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
