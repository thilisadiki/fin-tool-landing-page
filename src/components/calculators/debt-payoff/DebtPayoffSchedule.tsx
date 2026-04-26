import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { formatZAR } from '@/lib/formatters';
import type {
  DebtPayoffResult,
  DebtStrategy,
  StrategyResult,
} from '@/lib/calculators/debtPayoffCalculator';

interface DebtPayoffScheduleProps {
  result: DebtPayoffResult;
}

const STRATEGY_LABELS: Record<DebtStrategy, string> = {
  snowball: 'Snowball',
  avalanche: 'Avalanche',
};

function formatMonth(date: Date): string {
  return date.toLocaleDateString('en-ZA', { year: 'numeric', month: 'short' });
}

export default function DebtPayoffSchedule({ result }: DebtPayoffScheduleProps) {
  const [view, setView] = useState<DebtStrategy>(result.recommended);
  const [expanded, setExpanded] = useState(false);

  const strategyResult: StrategyResult =
    view === 'snowball' ? result.snowball : result.avalanche;

  if (strategyResult.payoffOrder.length === 0) return null;

  return (
    <div className="rounded-xl border border-border dark:bg-slate-800/50 bg-slate-100 overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-accent/30 transition-colors"
      >
        <div>
          <h3 className="font-semibold text-foreground">Payoff order</h3>
          <p className="text-xs text-muted-foreground">
            See which debt clears in which month under the {STRATEGY_LABELS[view]} method.
          </p>
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {expanded && (
        <div className="border-t border-border">
          <div className="flex gap-2 p-3 border-b border-border">
            {(['snowball', 'avalanche'] as DebtStrategy[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setView(s)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  view === s
                    ? 'bg-[#0F2744] text-white'
                    : 'bg-background text-muted-foreground hover:bg-accent'
                }`}
              >
                {STRATEGY_LABELS[s]}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-muted-foreground border-b border-border">
                  <th className="px-4 py-2 font-medium">#</th>
                  <th className="px-4 py-2 font-medium">Debt</th>
                  <th className="px-4 py-2 font-medium">Cleared in</th>
                  <th className="px-4 py-2 font-medium">Date</th>
                  <th className="px-4 py-2 font-medium text-right">Interest</th>
                </tr>
              </thead>
              <tbody>
                {strategyResult.payoffOrder.map((event, index) => (
                  <tr
                    key={event.debtId}
                    className="border-b border-border/50 last:border-b-0"
                  >
                    <td className="px-4 py-3 text-muted-foreground">{index + 1}</td>
                    <td className="px-4 py-3 font-medium text-foreground">
                      {event.debtName}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      Month {event.month}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {formatMonth(event.payoffDate)}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-foreground">
                      {formatZAR(event.interestPaid)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
