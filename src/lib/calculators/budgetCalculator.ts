export interface BudgetIncome {
  salary: number;
  otherIncome: number;
}

export interface BudgetExpenses {
  // Needs
  housing: number;
  groceries: number;
  transport: number;
  utilities: number;
  medical: number;
  schoolFees: number;
  debtRepayments: number;
  
  // Wants
  entertainment: number;
  shopping: number;
  subscriptions: number;
  
  // Savings
  savings: number;
  investments: number;
}

export interface BudgetInputs {
  income: BudgetIncome;
  expenses: BudgetExpenses;
}

export interface BudgetCategorySummary {
  name: string;
  amount: number;
  percentageOfIncome: number;
  percentageOfExpenses: number;
  color: string;
}

export interface BudgetResult {
  totalIncome: number;
  totalExpenses: number;
  netIncome: number; // Leftover
  
  totalNeeds: number;
  totalWants: number;
  totalSavings: number;
  
  needsPercentage: number;
  wantsPercentage: number;
  savingsPercentage: number;
  
  // Simplified 50/30/20 comparison
  isHealthy: boolean;
  
  categories: BudgetCategorySummary[];
}

export function calculateBudget(inputs: BudgetInputs): BudgetResult {
  const { income, expenses } = inputs;
  
  const totalIncome = income.salary + income.otherIncome;
  
  const totalNeeds = 
    expenses.housing + 
    expenses.groceries + 
    expenses.transport + 
    expenses.utilities + 
    expenses.medical + 
    expenses.schoolFees + 
    expenses.debtRepayments;
    
  const totalWants = 
    expenses.entertainment + 
    expenses.shopping + 
    expenses.subscriptions;
    
  const totalSavings = 
    expenses.savings + 
    expenses.investments;
    
  const totalExpenses = totalNeeds + totalWants + totalSavings;
  const netIncome = totalIncome - totalExpenses;
  
  const needsPercentage = totalIncome > 0 ? (totalNeeds / totalIncome) * 100 : 0;
  const wantsPercentage = totalIncome > 0 ? (totalWants / totalIncome) * 100 : 0;
  const savingsPercentage = totalIncome > 0 ? (totalSavings / totalIncome) * 100 : 0;
  
  const isHealthy = netIncome >= 0 && needsPercentage <= 60 && savingsPercentage >= 10;
  
  const categories: BudgetCategorySummary[] = [
    {
      name: 'Needs (Housing, Food, Transport)',
      amount: totalNeeds,
      percentageOfIncome: needsPercentage,
      percentageOfExpenses: totalExpenses > 0 ? (totalNeeds / totalExpenses) * 100 : 0,
      color: 'bg-rose-500',
    },
    {
      name: 'Wants (Entertainment, Shopping)',
      amount: totalWants,
      percentageOfIncome: wantsPercentage,
      percentageOfExpenses: totalExpenses > 0 ? (totalWants / totalExpenses) * 100 : 0,
      color: 'bg-amber-500',
    },
    {
      name: 'Savings & Investments',
      amount: totalSavings,
      percentageOfIncome: savingsPercentage,
      percentageOfExpenses: totalExpenses > 0 ? (totalSavings / totalExpenses) * 100 : 0,
      color: 'bg-emerald-500',
    }
  ];
  
  return {
    totalIncome,
    totalExpenses,
    netIncome,
    totalNeeds,
    totalWants,
    totalSavings,
    needsPercentage,
    wantsPercentage,
    savingsPercentage,
    isHealthy,
    categories
  };
}
