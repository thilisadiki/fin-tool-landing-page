import { Button } from '@/components/ui/button';
import type { PersonalLoanInputs } from '@/lib/calculators/loanCalculator';

interface LoanFormProps {
  inputs: PersonalLoanInputs;
  onChange: (inputs: PersonalLoanInputs) => void;
  onCalculate: () => void;
}

const TERM_OPTIONS = [12, 24, 36, 48, 60, 72, 84];

export default function LoanForm({ inputs, onChange, onCalculate }: LoanFormProps) {
  const update = (partial: Partial<PersonalLoanInputs>) => onChange({ ...inputs, ...partial });

  const handleNumberChange = (field: keyof PersonalLoanInputs) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    update({ [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Loan Amount */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Loan Amount (R)</label>
        <input
          type="number"
          min={0}
          value={inputs.loanAmount || ''}
          onChange={handleNumberChange('loanAmount')}
          placeholder="e.g. 100000"
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
          placeholder="e.g. 15.5"
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
                  ? 'border-orange-500 bg-orange-500 text-white'
                  : 'border-input bg-background text-muted-foreground hover:bg-accent'
              }`}
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Monthly Service Fee */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Monthly Service Fee (R)</label>
        <input
          type="number"
          min={0}
          value={inputs.monthlyFee || ''}
          onChange={handleNumberChange('monthlyFee')}
          placeholder="e.g. 69"
          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <p className="text-xs text-muted-foreground mt-2">
          Most banks charge a monthly administration fee (typically R57–R69). Check your loan agreement for the exact amount.
        </p>
      </div>

      <Button
        size="lg"
        className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-lg py-6"
        onClick={onCalculate}
      >
        Calculate Loan
      </Button>
    </div>
  );
}
