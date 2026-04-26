import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Debt } from '@/lib/calculators/debtPayoffCalculator';

interface DebtPayoffFormProps {
  debts: Debt[];
  extraMonthly: number;
  onDebtsChange: (debts: Debt[]) => void;
  onExtraChange: (value: number) => void;
  onCalculate: () => void;
}

const MAX_DEBTS = 10;

let nextId = 0;
function makeId() {
  nextId += 1;
  return `debt-${Date.now()}-${nextId}`;
}

export default function DebtPayoffForm({
  debts,
  extraMonthly,
  onDebtsChange,
  onExtraChange,
  onCalculate,
}: DebtPayoffFormProps) {
  const updateDebt = (id: string, partial: Partial<Debt>) => {
    onDebtsChange(debts.map((d) => (d.id === id ? { ...d, ...partial } : d)));
  };

  const removeDebt = (id: string) => {
    if (debts.length <= 1) return;
    onDebtsChange(debts.filter((d) => d.id !== id));
  };

  const addDebt = () => {
    if (debts.length >= MAX_DEBTS) return;
    onDebtsChange([
      ...debts,
      {
        id: makeId(),
        name: `Debt ${debts.length + 1}`,
        balance: 0,
        apr: 0,
        minPayment: 0,
      },
    ]);
  };

  const handleNumber =
    (id: string, field: 'balance' | 'apr' | 'minPayment') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value) || 0;
      updateDebt(id, { [field]: value });
    };

  return (
    <div className="space-y-5">
      <div className="space-y-4">
        {debts.map((debt, index) => (
          <div
            key={debt.id}
            className="rounded-xl border border-border dark:bg-slate-800/50 bg-white p-4 space-y-3"
          >
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={debt.name}
                onChange={(e) => updateDebt(debt.id, { name: e.target.value })}
                placeholder={`Debt ${index + 1}`}
                className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                type="button"
                onClick={() => removeDebt(debt.id)}
                disabled={debts.length <= 1}
                aria-label={`Remove ${debt.name || `debt ${index + 1}`}`}
                className="p-2 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-500/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  Balance (R)
                </label>
                <input
                  type="number"
                  min={0}
                  value={debt.balance || ''}
                  onChange={handleNumber(debt.id, 'balance')}
                  placeholder="25000"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  APR (%)
                </label>
                <input
                  type="number"
                  min={0}
                  step="0.1"
                  value={debt.apr || ''}
                  onChange={handleNumber(debt.id, 'apr')}
                  placeholder="22.5"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  Min / month (R)
                </label>
                <input
                  type="number"
                  min={0}
                  value={debt.minPayment || ''}
                  onChange={handleNumber(debt.id, 'minPayment')}
                  placeholder="800"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addDebt}
        disabled={debts.length >= MAX_DEBTS}
        className="w-full flex items-center justify-center gap-2 rounded-lg border border-dashed border-input bg-background px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <Plus className="w-4 h-4" />
        Add another debt {debts.length >= MAX_DEBTS ? '(max 10)' : ''}
      </button>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Extra Monthly Payment (R)
        </label>
        <input
          type="number"
          min={0}
          value={extraMonthly || ''}
          onChange={(e) => onExtraChange(parseFloat(e.target.value) || 0)}
          placeholder="e.g. 1000"
          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <p className="text-xs text-muted-foreground mt-2">
          Any extra cash on top of the minimums. This is the amount that gets funneled
          into the target debt each month and creates the difference between the two
          strategies.
        </p>
      </div>

      <Button
        size="lg"
        className="w-full bg-gradient-to-r from-[#0F2744] to-[#1E3A5F] hover:from-[#1E3A5F] hover:to-[#0F2744] text-white text-lg py-6"
        onClick={onCalculate}
      >
        Compare Strategies
      </Button>
    </div>
  );
}
