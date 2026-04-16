'use client';

import { motion } from 'framer-motion';
import { TrendingUp, PiggyBank, Target, Wallet, CalendarDays, Percent } from 'lucide-react';
import { formatZAR, formatPercent } from '@/lib/formatters';
import type { RetirementResult } from '@/lib/calculators/retirementCalculator';

interface RetirementResultsPanelProps {
  result: RetirementResult;
}

export default function RetirementResultsPanel({ result }: RetirementResultsPanelProps) {
  const cards = [
    {
      key: 'projected',
      label: 'Projected Savings',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-600',
      value: formatZAR(result.projectedSavings),
    },
    {
      key: 'goal',
      label: 'Retirement Goal',
      icon: Target,
      color: result.onTrack ? 'from-emerald-500 to-teal-600' : 'from-red-500 to-rose-600',
      value: formatZAR(result.retirementGoal),
    },
    {
      key: 'income',
      label: 'Est. Monthly Income (4% Rule)',
      icon: Wallet,
      color: 'from-blue-500 to-indigo-600',
      value: formatZAR(result.projectedMonthlyIncome4Pct),
    },
    {
      key: 'years',
      label: 'Years to Retirement',
      icon: CalendarDays,
      color: 'from-amber-500 to-orange-600',
      value: `${result.yearsToRetirement} years`,
    },
    {
      key: 'contributions',
      label: 'Total Contributions',
      icon: PiggyBank,
      color: 'from-teal-500 to-cyan-600',
      value: formatZAR(result.totalContributions),
    },
    {
      key: 'growth',
      label: 'Total Investment Growth',
      icon: Percent,
      color: 'from-lime-500 to-green-600',
      value: formatZAR(result.totalGrowth),
    },
  ];

  return (
    <div className="space-y-4">
      {/* On Track / Shortfall Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`rounded-xl p-4 text-center border ${
          result.onTrack
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
            : 'bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400'
        }`}
      >
        <p className="text-lg font-bold">
          {result.onTrack
            ? '✅ You are on track to meet your retirement goal!'
            : `⚠️ Shortfall of ${formatZAR(result.shortfall)}. Consider increasing contributions.`}
        </p>
      </motion.div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((card, index) => (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="dark:bg-slate-800/50 bg-slate-100 rounded-xl p-5 border border-border"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 bg-gradient-to-r ${card.color} rounded-lg flex items-center justify-center`}>
                <card.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm text-muted-foreground">{card.label}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{card.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
