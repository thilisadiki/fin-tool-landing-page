import { Button } from '@/components/ui/button';
import type { TaxInputs } from '@/lib/calculators/taxCalculator';
import type { AgeCategory } from '@/data/taxData';

interface TaxCalculatorFormProps {
  inputs: TaxInputs;
  onChange: (inputs: TaxInputs) => void;
  onCalculate: () => void;
}

const AGE_OPTIONS: { value: AgeCategory; label: string }[] = [
  { value: 'under65', label: 'Under 65' },
  { value: '65to74', label: '65 – 74' },
  { value: '75plus', label: '75+' },
];

export default function TaxCalculatorForm({ inputs, onChange, onCalculate }: TaxCalculatorFormProps) {
  const update = (partial: Partial<TaxInputs>) => onChange({ ...inputs, ...partial });

  const handleNumberChange = (field: keyof TaxInputs) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    update({ [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Income */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Gross Income (R)</label>
        <div className="flex gap-2">
          <input
            type="number"
            min={0}
            value={inputs.grossIncome || ''}
            onChange={handleNumberChange('grossIncome')}
            placeholder="e.g. 30000"
            className="flex-1 rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <div className="flex rounded-lg border border-input overflow-hidden">
            <button
              type="button"
              onClick={() => update({ incomeFrequency: 'monthly' })}
              className={`px-4 py-3 text-sm font-medium transition-colors ${
                inputs.incomeFrequency === 'monthly'
                  ? 'bg-[#0F2744] text-white'
                  : 'bg-background text-muted-foreground hover:bg-accent'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => update({ incomeFrequency: 'annual' })}
              className={`px-4 py-3 text-sm font-medium transition-colors ${
                inputs.incomeFrequency === 'annual'
                  ? 'bg-[#0F2744] text-white'
                  : 'bg-background text-muted-foreground hover:bg-accent'
              }`}
            >
              Annual
            </button>
          </div>
        </div>
      </div>

      {/* Other Income */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Other Annual Income (R)</label>
        <input
          type="number"
          min={0}
          value={inputs.otherIncome || ''}
          onChange={handleNumberChange('otherIncome')}
          placeholder="e.g. rental income, freelance"
          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Age Category */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Age Category</label>
        <div className="flex gap-2">
          {AGE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => update({ ageCategory: opt.value })}
              className={`flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                inputs.ageCategory === opt.value
                  ? 'border-[#0F2744] bg-[#0F2744] text-white'
                  : 'border-input bg-background text-muted-foreground hover:bg-accent'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Medical Aid Members */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Medical Aid Members (including yourself)</label>
        <input
          type="number"
          min={0}
          max={20}
          value={inputs.medicalAidMembers || ''}
          onChange={handleNumberChange('medicalAidMembers')}
          placeholder="0"
          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Retirement Contribution */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Annual Retirement Fund Contribution (R)</label>
        <input
          type="number"
          min={0}
          value={inputs.retirementContribution || ''}
          onChange={handleNumberChange('retirementContribution')}
          placeholder="e.g. pension, RA, provident fund"
          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* UIF Toggle */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="includeUIF"
          checked={inputs.includeUIF}
          onChange={(e) => update({ includeUIF: e.target.checked })}
          className="w-5 h-5 rounded border-input text-[#C9A84C] focus:ring-[#C9A84C]"
        />
        <label htmlFor="includeUIF" className="text-sm font-medium text-foreground cursor-pointer">
          Include UIF contribution (1% capped at R177.12/m)
        </label>
      </div>

      <Button
        size="lg"
        className="w-full bg-gradient-to-r from-[#0F2744] to-[#1E3A5F] hover:from-[#1E3A5F] hover:to-[#0F2744] text-white text-lg py-6"
        onClick={onCalculate}
      >
        Calculate Tax
      </Button>
    </div>
  );
}
