import { motion } from 'framer-motion';
import { DollarSign, Wallet, Banknote, TrendingUp, Receipt, Percent } from 'lucide-react';
import { formatZAR } from '@/lib/formatters';
import type { PersonalLoanResult } from '@/lib/calculators/loanCalculator';

interface LoanResultsPanelProps {
  result: PersonalLoanResult;
}

const RESULT_CARDS = [
  {
    key: 'monthly',
    label: 'Monthly Payment',
    icon: DollarSign,
    color: 'from-amber-500 to-orange-600',
    getValue: (r: PersonalLoanResult) => formatZAR(r.monthlyPayment),
  },
  {
    key: 'interest',
    label: 'Total Interest',
    icon: Banknote,
    color: 'from-red-500 to-rose-600',
    getValue: (r: PersonalLoanResult) => formatZAR(r.totalInterest),
  },
  {
    key: 'total',
    label: 'Total Amount Paid',
    icon: Wallet,
    color: 'from-purple-500 to-pink-600',
    getValue: (r: PersonalLoanResult) => formatZAR(r.totalAmountPaid),
  },
  {
    key: 'fees',
    label: 'Total Fees Paid',
    icon: Receipt,
    color: 'from-slate-500 to-gray-600',
    getValue: (r: PersonalLoanResult) => formatZAR(r.totalFeesPaid),
  },
  {
    key: 'effective',
    label: 'Effective Annual Rate',
    icon: Percent,
    color: 'from-teal-500 to-cyan-600',
    getValue: (r: PersonalLoanResult) => `${r.effectiveRate.toFixed(2)}%`,
  },
  {
    key: 'costOfCredit',
    label: 'Total Cost of Credit',
    icon: TrendingUp,
    color: 'from-emerald-500 to-teal-600',
    getValue: (r: PersonalLoanResult) => formatZAR(r.totalInterest + r.totalFeesPaid),
  },
] as const;

export default function LoanResultsPanel({ result }: LoanResultsPanelProps) {
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
