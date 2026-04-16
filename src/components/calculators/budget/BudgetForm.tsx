import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { BudgetInputs, BudgetIncome, BudgetExpenses } from '@/lib/calculators/budgetCalculator';

interface BudgetFormProps {
  inputs: BudgetInputs;
  onChange: (inputs: BudgetInputs) => void;
  onCalculate: () => void;
}

export default function BudgetForm({ inputs, onChange, onCalculate }: BudgetFormProps) {
  const [expandedSection, setExpandedSection] = useState<'income' | 'needs' | 'wants' | 'savings'>('income');

  const updateIncome = (field: keyof BudgetIncome, value: number) => {
    onChange({
      ...inputs,
      income: { ...inputs.income, [field]: value }
    });
  };

  const updateExpense = (field: keyof BudgetExpenses, value: number) => {
    onChange({
      ...inputs,
      expenses: { ...inputs.expenses, [field]: value }
    });
  };

  const handleIncomeChange = (field: keyof BudgetIncome) => (e: React.ChangeEvent<HTMLInputElement>) => {
    updateIncome(field, parseFloat(e.target.value) || 0);
  };
  
  const handleExpenseChange = (field: keyof BudgetExpenses) => (e: React.ChangeEvent<HTMLInputElement>) => {
    updateExpense(field, parseFloat(e.target.value) || 0);
  };

  const toggleSection = (section: 'income' | 'needs' | 'wants' | 'savings') => {
    setExpandedSection(expandedSection === section ? 'income' : section);
  };

  const SectionHeader = ({ title, section, amount }: { title: string, section: any, amount?: number }) => (
    <button 
      type="button" 
      onClick={() => toggleSection(section)}
      className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-border"
    >
      <div className="flex flex-col items-start gap-1">
        <span className="font-semibold text-foreground">{title}</span>
        {amount !== undefined && <span className="text-sm font-medium text-muted-foreground">Total: R {amount.toLocaleString('en-ZA')}</span>}
      </div>
      {expandedSection === section ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
    </button>
  );

  return (
    <div className="space-y-4">
      {/* Income Section */}
      <div className="space-y-4">
        <SectionHeader title="Monthly Income" section="income" amount={inputs.income.salary + inputs.income.otherIncome} />
        {expandedSection === 'income' && (
          <div className="p-4 space-y-4 border border-border rounded-lg animate-in fade-in slide-in-from-top-2">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Net Salary (After Tax) (R)</label>
              <input
                type="number"
                min={0}
                value={inputs.income.salary || ''}
                onChange={handleIncomeChange('salary')}
                placeholder="e.g. 25000"
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Other Income (Side Hustle, Rental) (R)</label>
              <input
                type="number"
                min={0}
                value={inputs.income.otherIncome || ''}
                onChange={handleIncomeChange('otherIncome')}
                placeholder="e.g. 3000"
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        )}
      </div>

      {/* Needs Section */}
      <div className="space-y-4">
        <SectionHeader 
            title="Needs & Essentials (50%)" 
            section="needs" 
            amount={inputs.expenses.housing + inputs.expenses.groceries + inputs.expenses.transport + inputs.expenses.utilities + inputs.expenses.medical + inputs.expenses.schoolFees + inputs.expenses.debtRepayments} 
        />
        {expandedSection === 'needs' && (
          <div className="p-4 space-y-4 border border-border rounded-lg animate-in fade-in slide-in-from-top-2">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Housing (Rent/Bond) (R)</label>
              <input
                type="number" min={0} value={inputs.expenses.housing || ''} onChange={handleExpenseChange('housing')} placeholder="e.g. 8000"
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Groceries & Food (R)</label>
              <input
                type="number" min={0} value={inputs.expenses.groceries || ''} onChange={handleExpenseChange('groceries')} placeholder="e.g. 4000"
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Transport (Car, Fuel, Uber) (R)</label>
              <input
                type="number" min={0} value={inputs.expenses.transport || ''} onChange={handleExpenseChange('transport')} placeholder="e.g. 2500"
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Utilities (Water, Lights, Internet) (R)</label>
              <input
                type="number" min={0} value={inputs.expenses.utilities || ''} onChange={handleExpenseChange('utilities')} placeholder="e.g. 1500"
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Medical & Insurance (R)</label>
              <input
                type="number" min={0} value={inputs.expenses.medical || ''} onChange={handleExpenseChange('medical')} placeholder="e.g. 2000"
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">School Fees / Education (R)</label>
              <input
                type="number" min={0} value={inputs.expenses.schoolFees || ''} onChange={handleExpenseChange('schoolFees')} placeholder="e.g. 3000"
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Minimum Debt Repayments (R)</label>
              <input
                type="number" min={0} value={inputs.expenses.debtRepayments || ''} onChange={handleExpenseChange('debtRepayments')} placeholder="e.g. 1500"
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        )}
      </div>

      {/* Wants Section */}
      <div className="space-y-4">
        <SectionHeader 
            title="Wants & Lifestyle (30%)" 
            section="wants" 
            amount={inputs.expenses.entertainment + inputs.expenses.shopping + inputs.expenses.subscriptions}
        />
        {expandedSection === 'wants' && (
          <div className="p-4 space-y-4 border border-border rounded-lg animate-in fade-in slide-in-from-top-2">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Entertainment & Eating Out (R)</label>
              <input
                type="number" min={0} value={inputs.expenses.entertainment || ''} onChange={handleExpenseChange('entertainment')} placeholder="e.g. 2000"
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Shopping & Hobbies (R)</label>
              <input
                type="number" min={0} value={inputs.expenses.shopping || ''} onChange={handleExpenseChange('shopping')} placeholder="e.g. 1500"
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Subscriptions (Netflix, Gym, etc) (R)</label>
              <input
                type="number" min={0} value={inputs.expenses.subscriptions || ''} onChange={handleExpenseChange('subscriptions')} placeholder="e.g. 800"
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        )}
      </div>

      {/* Savings Section */}
      <div className="space-y-4">
        <SectionHeader 
            title="Savings & Investments (20%)" 
            section="savings" 
            amount={inputs.expenses.savings + inputs.expenses.investments}
        />
        {expandedSection === 'savings' && (
          <div className="p-4 space-y-4 border border-border rounded-lg animate-in fade-in slide-in-from-top-2">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Savings & Emergency Fund (R)</label>
              <input
                type="number" min={0} value={inputs.expenses.savings || ''} onChange={handleExpenseChange('savings')} placeholder="e.g. 2000"
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Investments & Retirement (R)</label>
              <input
                type="number" min={0} value={inputs.expenses.investments || ''} onChange={handleExpenseChange('investments')} placeholder="e.g. 1500"
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        )}
      </div>

      <Button
        size="lg"
        className="w-full mt-8 bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 text-white text-lg py-6"
        onClick={onCalculate}
      >
        Analyze My Budget
      </Button>
    </div>
  );
}
