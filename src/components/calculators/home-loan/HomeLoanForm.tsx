import { Button } from '@/components/ui/button';
import type { HomeLoanInputs } from '@/lib/calculators/homeLoanCalculator';

interface HomeLoanFormProps {
  inputs: HomeLoanInputs;
  onChange: (inputs: HomeLoanInputs) => void;
  onCalculate: () => void;
}

const TERM_OPTIONS = [120, 180, 240, 300, 360];

export default function HomeLoanForm({
  inputs,
  onChange,
  onCalculate,
}: HomeLoanFormProps) {
  const update = (partial: Partial<HomeLoanInputs>) => onChange({ ...inputs, ...partial });

  const handleNumberChange =
    (field: keyof HomeLoanInputs) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value) || 0;
      update({ [field]: value });
    };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Property Price (R)
        </label>
        <input
          type="number"
          min={0}
          value={inputs.propertyPrice || ''}
          onChange={handleNumberChange('propertyPrice')}
          placeholder="e.g. 1850000"
          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Deposit Amount (R)
        </label>
        <input
          type="number"
          min={0}
          value={inputs.deposit || ''}
          onChange={handleNumberChange('deposit')}
          placeholder="e.g. 185000"
          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Interest Rate (%)
        </label>
        <input
          type="number"
          step="0.25"
          min={0}
          value={inputs.interestRate || ''}
          onChange={handleNumberChange('interestRate')}
          placeholder="e.g. 10.25"
          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <p className="text-xs text-muted-foreground mt-2">
          Use the rate your bank quoted you. Bond pricing usually moves around prime,
          but your actual rate depends on credit profile, deposit, and the bank.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Bond Term (Months)
        </label>
        <div className="flex flex-wrap gap-2">
          {TERM_OPTIONS.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => update({ loanTermMonths: term })}
              className={`flex-1 min-w-[4rem] rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                inputs.loanTermMonths === term
                  ? 'border-[#0F2744] bg-[#0F2744] text-white'
                  : 'border-input bg-background text-muted-foreground hover:bg-accent'
              }`}
            >
              {term / 12}y
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Monthly Rates (R)
          </label>
          <input
            type="number"
            min={0}
            value={inputs.monthlyRates || ''}
            onChange={handleNumberChange('monthlyRates')}
            placeholder="e.g. 1800"
            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Monthly Levies (R)
          </label>
          <input
            type="number"
            min={0}
            value={inputs.monthlyLevies || ''}
            onChange={handleNumberChange('monthlyLevies')}
            placeholder="e.g. 1200"
            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <Button
        size="lg"
        className="w-full bg-gradient-to-r from-[#0F2744] to-[#1E3A5F] hover:from-[#1E3A5F] hover:to-[#0F2744] text-white text-lg py-6"
        onClick={onCalculate}
      >
        Calculate Bond
      </Button>
    </div>
  );
}
