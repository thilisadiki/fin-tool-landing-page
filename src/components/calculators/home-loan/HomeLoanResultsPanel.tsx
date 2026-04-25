import { motion } from 'framer-motion';
import {
  Banknote,
  Building2,
  Home,
  Landmark,
  Percent,
  Receipt,
} from 'lucide-react';
import { formatPercent, formatZAR } from '@/lib/formatters';
import type { HomeLoanResult } from '@/lib/calculators/homeLoanCalculator';

interface HomeLoanResultsPanelProps {
  result: HomeLoanResult;
}

const RESULT_CARDS = [
  {
    key: 'bond',
    label: 'Monthly Bond Payment',
    icon: Landmark,
    color: 'from-[#0F2744] to-[#1E3A5F]',
    getValue: (r: HomeLoanResult) => formatZAR(r.monthlyBondPayment),
  },
  {
    key: 'housing',
    label: 'Total Monthly Housing Cost',
    icon: Home,
    color: 'from-[#1E3A5F] to-[#C9A84C]',
    getValue: (r: HomeLoanResult) => formatZAR(r.totalMonthlyHousingCost),
  },
  {
    key: 'principal',
    label: 'Principal Borrowed',
    icon: Building2,
    color: 'from-[#C9A84C] to-[#B8943E]',
    getValue: (r: HomeLoanResult) => formatZAR(r.principalBorrowed),
  },
  {
    key: 'ltv',
    label: 'Loan-to-Value Ratio',
    icon: Percent,
    color: 'from-[#B8943E] to-[#9A7A32]',
    getValue: (r: HomeLoanResult) => formatPercent(r.loanToValueRatio),
  },
  {
    key: 'duty',
    label: 'Estimated Transfer Duty',
    icon: Receipt,
    color: 'from-slate-500 to-gray-600',
    getValue: (r: HomeLoanResult) => formatZAR(r.estimatedTransferDuty),
  },
  {
    key: 'interest',
    label: 'Total Interest',
    icon: Banknote,
    color: 'from-red-500 to-rose-600',
    getValue: (r: HomeLoanResult) => formatZAR(r.totalInterest),
  },
] as const;

export default function HomeLoanResultsPanel({ result }: HomeLoanResultsPanelProps) {
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
            <div
              className={`w-10 h-10 bg-gradient-to-r ${card.color} rounded-lg flex items-center justify-center`}
            >
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
