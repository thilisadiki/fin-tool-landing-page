import { Button } from '@/components/ui/button';
import type { VehicleFinanceInputs } from '@/lib/calculators/vehicleCalculator';

interface VehicleFinanceFormProps {
  inputs: VehicleFinanceInputs;
  onChange: (inputs: VehicleFinanceInputs) => void;
  onCalculate: () => void;
}

const TERM_OPTIONS = [12, 24, 36, 48, 60, 72, 84];

export default function VehicleFinanceForm({ inputs, onChange, onCalculate }: VehicleFinanceFormProps) {
  const update = (partial: Partial<VehicleFinanceInputs>) => onChange({ ...inputs, ...partial });

  const handleNumberChange = (field: keyof VehicleFinanceInputs) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    update({ [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Vehicle Price */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Vehicle Price (ZAR)</label>
        <input
          type="number"
          min={0}
          value={inputs.vehiclePrice || ''}
          onChange={handleNumberChange('vehiclePrice')}
          placeholder="e.g. 350000"
          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Deposit */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Deposit Amount (ZAR)</label>
        <input
          type="number"
          min={0}
          value={inputs.deposit || ''}
          onChange={handleNumberChange('deposit')}
          placeholder="e.g. 35000"
          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Interest Rate */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Interest Rate (%)</label>
        <input
          type="number"
          step="0.25"
          min={0}
          value={inputs.interestRate || ''}
          onChange={handleNumberChange('interestRate')}
          placeholder="e.g. 11.75"
          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Loan Term */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Loan Term (Months)</label>
        <div className="flex flex-wrap gap-2">
          {TERM_OPTIONS.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => update({ loanTermMonths: term })}
              className={`flex-1 min-w-[3rem] rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                inputs.loanTermMonths === term
                  ? 'border-indigo-500 bg-indigo-500 text-white'
                  : 'border-input bg-background text-muted-foreground hover:bg-accent'
              }`}
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Balloon Payment */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Balloon Payment (%)</label>
        <input
          type="number"
          min={0}
          max={100}
          value={inputs.balloonPercentage || ''}
          onChange={handleNumberChange('balloonPercentage')}
          placeholder="e.g. 20"
          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <p className="text-xs text-muted-foreground mt-2">
          A balloon payment reduces your monthly installments but requires a lump sum payment at the end of the term.
        </p>
      </div>

      <Button
        size="lg"
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-lg py-6"
        onClick={onCalculate}
      >
        Calculate Finance
      </Button>
    </div>
  );
}
