import { motion } from 'framer-motion';
import { DollarSign, TrendingDown, Wallet, Percent } from 'lucide-react';
import { formatZAR, formatPercent } from '@/lib/formatters';
import type { TaxResult } from '@/lib/calculators/taxCalculator';

interface TaxResultsPanelProps {
  result: TaxResult;
}

const RESULT_CARDS = [
  {
    key: 'gross',
    label: 'Gross Monthly Income',
    icon: DollarSign,
    color: 'from-blue-500 to-indigo-600',
    getValue: (r: TaxResult) => formatZAR(r.monthlyGross),
  },
  {
    key: 'tax',
    label: 'Monthly Tax',
    icon: TrendingDown,
    color: 'from-red-500 to-rose-600',
    getValue: (r: TaxResult) => formatZAR(r.monthlyTax),
  },
  {
    key: 'net',
    label: 'Net Monthly Income',
    icon: Wallet,
    color: 'from-emerald-500 to-teal-600',
    getValue: (r: TaxResult) => formatZAR(r.monthlyNet),
  },
  {
    key: 'rate',
    label: 'Effective Tax Rate',
    icon: Percent,
    color: 'from-purple-500 to-pink-600',
    getValue: (r: TaxResult) => formatPercent(r.effectiveTaxRate),
  },
] as const;

export default function TaxResultsPanel({ result }: TaxResultsPanelProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {RESULT_CARDS.map((card, index) => (
        <motion.div
          key={card.key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="dark:bg-slate-800/50 bg-slate-100 rounded-xl p-6 border border-border"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 bg-gradient-to-r ${card.color} rounded-lg flex items-center justify-center`}>
              <card.icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm text-muted-foreground">{card.label}</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{card.getValue(result)}</p>
        </motion.div>
      ))}
    </div>
  );
}
