'use client';

import { Button } from '@/components/ui/button';
import type { RetirementInputs } from '@/lib/calculators/retirementCalculator';

interface RetirementFormProps {
  inputs: RetirementInputs;
  onChange: (inputs: RetirementInputs) => void;
  onCalculate: () => void;
}

export default function RetirementForm({ inputs, onChange, onCalculate }: RetirementFormProps) {
  const update = (partial: Partial<RetirementInputs>) => onChange({ ...inputs, ...partial });

  const handleNumberChange = (field: keyof RetirementInputs) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    update({ [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Current Age */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Current Age</label>
          <input
            type="number"
            min={18}
            max={80}
            value={inputs.currentAge || ''}
            onChange={handleNumberChange('currentAge')}
            placeholder="e.g. 30"
            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Retirement Age</label>
          <input
            type="number"
            min={inputs.currentAge + 1}
            max={85}
            value={inputs.retirementAge || ''}
            onChange={handleNumberChange('retirementAge')}
            placeholder="e.g. 65"
            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Current Savings */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Current Retirement Savings (ZAR)</label>
        <input
          type="number"
          min={0}
          value={inputs.currentSavings || ''}
          onChange={handleNumberChange('currentSavings')}
          placeholder="e.g. 250000"
          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Monthly Contribution */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Monthly Contribution (ZAR)</label>
        <input
          type="number"
          min={0}
          value={inputs.monthlyContribution || ''}
          onChange={handleNumberChange('monthlyContribution')}
          placeholder="e.g. 3000"
          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Return & Inflation Rates */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Expected Annual Return (%)</label>
          <input
            type="number"
            step="0.5"
            min={0}
            value={inputs.annualReturnRate || ''}
            onChange={handleNumberChange('annualReturnRate')}
            placeholder="e.g. 9"
            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Annual Inflation (%)</label>
          <input
            type="number"
            step="0.5"
            min={0}
            value={inputs.annualInflationRate || ''}
            onChange={handleNumberChange('annualInflationRate')}
            placeholder="e.g. 5"
            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Retirement Goal */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Retirement Goal (ZAR)</label>
        <input
          type="number"
          min={0}
          value={inputs.retirementGoal || ''}
          onChange={handleNumberChange('retirementGoal')}
          placeholder="e.g. 5000000"
          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <p className="text-xs text-muted-foreground mt-2">
          Not sure? Use the 4% Rule: multiply your desired monthly retirement income by 300.
        </p>
      </div>

      <Button
        size="lg"
        className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white text-lg py-6"
        onClick={onCalculate}
      >
        Project My Retirement
      </Button>
    </div>
  );
}
