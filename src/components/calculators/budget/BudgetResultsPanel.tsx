import { motion } from 'framer-motion';
import { DollarSign, Wallet, TrendingDown, PiggyBank, Smile, AlertCircle } from 'lucide-react';
import { formatZAR } from '@/lib/formatters';
import type { BudgetResult } from '@/lib/calculators/budgetCalculator';

interface BudgetResultsPanelProps {
  result: BudgetResult;
}

export default function BudgetResultsPanel({ result }: BudgetResultsPanelProps) {
  const isDeficit = result.netIncome < 0;

  const RESULT_CARDS = [
    {
      key: 'income',
      label: 'Total Net Income',
      icon: DollarSign,
      color: 'from-[#0F2744] to-[#1E3A5F]',
      getValue: (r: BudgetResult) => formatZAR(r.totalIncome),
    },
    {
      key: 'expenses',
      label: 'Total Expenses',
      icon: TrendingDown,
      color: 'from-red-500 to-rose-600',
      getValue: (r: BudgetResult) => formatZAR(r.totalExpenses),
    },
    {
      key: 'net',
      label: 'Leftover (Net Income)',
      icon: Wallet,
      color: isDeficit ? 'from-red-500 to-rose-600' : 'from-[#C9A84C] to-[#B8943E]',
      getValue: (r: BudgetResult) => formatZAR(r.netIncome),
    },
    {
      key: 'savings',
      label: 'Total Savings',
      icon: PiggyBank,
      color: 'from-[#1E3A5F] to-[#C9A84C]',
      getValue: (r: BudgetResult) => formatZAR(r.totalSavings),
    },
  ];

  return (
    <div className="space-y-6">
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={`p-6 rounded-xl border ${
          isDeficit 
            ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900' 
            : result.isHealthy 
              ? 'bg-[#C9A84C]/5 dark:bg-[#C9A84C]/10 border-[#C9A84C]/20 dark:border-[#C9A84C]/20'
              : 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900'
        }`}
      >
        <div className="flex items-start gap-4">
          <div className="mt-1">
            {isDeficit ? (
              <AlertCircle className="w-6 h-6 text-rose-500" />
            ) : result.isHealthy ? (
              <Smile className="w-6 h-6 text-[#C9A84C]" />
            ) : (
              <AlertCircle className="w-6 h-6 text-amber-500" />
            )}
          </div>
          <div>
            <h3 className={`text-lg font-bold mb-1 ${
              isDeficit ? 'text-rose-700 dark:text-rose-400' 
              : result.isHealthy ? 'text-[#B8943E] dark:text-[#D4B96A]'
              : 'text-amber-700 dark:text-amber-400'
            }`}>
              {isDeficit ? 'Budget Deficit Alert' : result.isHealthy ? 'Excellent Budget!' : 'Room for Improvement'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isDeficit 
                ? 'You are spending more than you earn. Review your "Wants" and try to cut back to bring your budget out of the red.'
                : result.isHealthy 
                  ? 'Your budget follows a healthy structure. You are balancing your needs, enjoying your wants, and saving for the future.'
                  : 'You have a positive net income, but your allocation may be skewed. Aim for the 50/30/20 rule: 50% Needs, 30% Wants, and 20% Savings.'}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
