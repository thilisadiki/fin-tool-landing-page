import { motion } from 'framer-motion';
import {
  AlertTriangle,
  CalendarCheck,
  Snowflake,
  TrendingDown,
  Trophy,
} from 'lucide-react';
import { formatZAR } from '@/lib/formatters';
import type {
  DebtPayoffResult,
  DebtStrategy,
  StrategyResult,
} from '@/lib/calculators/debtPayoffCalculator';

interface DebtPayoffResultsPanelProps {
  result: DebtPayoffResult;
}

function formatMonths(months: number): string {
  if (months <= 0) return '0 months';
  const years = Math.floor(months / 12);
  const remainder = months % 12;
  if (years === 0) return `${months} month${months === 1 ? '' : 's'}`;
  if (remainder === 0) return `${years} year${years === 1 ? '' : 's'}`;
  return `${years}y ${remainder}m`;
}

function formatPayoffDate(date: Date | null): string {
  if (!date) return 'Not reachable';
  return date.toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
  });
}

function StrategyCard({
  title,
  subtitle,
  icon: Icon,
  accent,
  result,
  isRecommended,
}: {
  title: string;
  subtitle: string;
  icon: typeof Snowflake;
  accent: string;
  result: StrategyResult;
  isRecommended: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative rounded-xl border p-6 dark:bg-slate-800/50 bg-slate-100 ${
        isRecommended ? 'border-[#C9A84C]' : 'border-border'
      }`}
    >
      {isRecommended && (
        <span className="absolute -top-2 right-4 text-[10px] font-semibold tracking-wide uppercase text-white bg-[#C9A84C] px-2 py-0.5 rounded-md shadow-sm">
          Recommended
        </span>
      )}
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-10 h-10 bg-gradient-to-r ${accent} rounded-lg flex items-center justify-center shrink-0`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      {result.cannotPayOff ? (
        <div className="flex items-start gap-2 text-sm text-amber-600 dark:text-amber-400">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>
            With these minimums, the debts grow faster than they shrink. Add extra
            monthly payments or raise the minimums to make the plan workable.
          </span>
        </div>
      ) : (
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Time to debt-free</span>
            <span className="font-semibold text-foreground">
              {formatMonths(result.months)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Payoff date</span>
            <span className="font-semibold text-foreground">
              {formatPayoffDate(result.payoffDate)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total interest</span>
            <span className="font-semibold text-foreground">
              {formatZAR(result.totalInterest)}
            </span>
          </div>
          <div className="flex justify-between border-t border-border pt-3">
            <span className="text-muted-foreground">Total paid</span>
            <span className="font-bold text-foreground">
              {formatZAR(result.totalPaid)}
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function DebtPayoffResultsPanel({
  result,
}: DebtPayoffResultsPanelProps) {
  const { snowball, avalanche, interestSaved, monthsSaved, recommended } = result;

  const recommendedLabel: Record<DebtStrategy, string> = {
    snowball: 'Snowball method',
    avalanche: 'Avalanche method',
  };

  const showSavingsCallout =
    !snowball.cannotPayOff &&
    !avalanche.cannotPayOff &&
    (interestSaved > 1 || monthsSaved > 0);

  return (
    <div className="space-y-5">
      {showSavingsCallout && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl p-5 bg-gradient-to-r from-[#0F2744] to-[#1E3A5F] text-white border border-[#C9A84C]/30"
        >
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-5 h-5 text-[#C9A84C]" />
            <h3 className="font-semibold">
              Avalanche saves you {formatZAR(interestSaved)}
            </h3>
          </div>
          <p className="text-sm text-white/80">
            Compared to the snowball method, paying highest-rate debt first finishes{' '}
            {monthsSaved > 0
              ? `${formatMonths(monthsSaved)} earlier and `
              : ''}
            costs {formatZAR(interestSaved)} less in interest. Recommended:{' '}
            <span className="font-semibold text-[#C9A84C]">
              {recommendedLabel[recommended]}
            </span>
            .
          </p>
        </motion.div>
      )}

      {!showSavingsCallout &&
        !snowball.cannotPayOff &&
        !avalanche.cannotPayOff && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl p-5 dark:bg-slate-800/50 bg-slate-100 border border-border"
          >
            <div className="flex items-center gap-3 mb-2">
              <CalendarCheck className="w-5 h-5 text-[#C9A84C]" />
              <h3 className="font-semibold text-foreground">
                Both strategies finish at the same time
              </h3>
            </div>
            <p className="text-sm text-muted-foreground">
              With your current debts and rates, the snowball and avalanche methods
              produce essentially the same outcome. Pick the one that feels easiest to
              stick with.
            </p>
          </motion.div>
        )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StrategyCard
          title="Snowball"
          subtitle="Smallest balance first"
          icon={Snowflake}
          accent="from-sky-500 to-blue-600"
          result={snowball}
          isRecommended={recommended === 'snowball'}
        />
        <StrategyCard
          title="Avalanche"
          subtitle="Highest interest rate first"
          icon={TrendingDown}
          accent="from-rose-500 to-red-600"
          result={avalanche}
          isRecommended={recommended === 'avalanche'}
        />
      </div>
    </div>
  );
}
