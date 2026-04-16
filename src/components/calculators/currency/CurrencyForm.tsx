import { ArrowRightLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CurrencyFormProps {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
  currencies: Record<string, string>;
  onAmountChange: (amount: number) => void;
  onFromChange: (currency: string) => void;
  onToChange: (currency: string) => void;
  onSwap: () => void;
}

export default function CurrencyForm({
  amount,
  fromCurrency,
  toCurrency,
  currencies,
  onAmountChange,
  onFromChange,
  onToChange,
  onSwap
}: CurrencyFormProps) {
  
  const currencyOptions = Object.entries(currencies).map(([code, name]) => (
    <option key={code} value={code}>
      {code} - {name}
    </option>
  ));

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Amount</label>
        <input
          type="number"
          min={0}
          value={amount || ''}
          onChange={(e) => onAmountChange(parseFloat(e.target.value) || 0)}
          placeholder="e.g. 1000"
          className="w-full rounded-lg border border-input bg-background px-4 py-4 text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">From</label>
          <select
            value={fromCurrency}
            onChange={(e) => onFromChange(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-4 py-4 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {currencyOptions}
          </select>
        </div>

        <div className="pb-1">
          <Button
            variant="outline"
            size="icon"
            onClick={onSwap}
            className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border-none shrink-0"
            aria-label="Swap currencies"
          >
            <ArrowRightLeft className="w-5 h-5 text-foreground" />
          </Button>
        </div>

        <div>
           <label className="block text-sm font-medium text-foreground mb-2">To</label>
          <select
            value={toCurrency}
            onChange={(e) => onToChange(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-4 py-4 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {currencyOptions}
          </select>
        </div>
      </div>
    </div>
  );
}
