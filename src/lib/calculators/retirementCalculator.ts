export interface RetirementInputs {
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  monthlyContribution: number;
  annualReturnRate: number;
  annualInflationRate: number;
  retirementGoal: number;
}

export interface YearlyProjection {
  year: number;
  age: number;
  startBalance: number;
  contributions: number;
  growth: number;
  endBalance: number;
}

export interface RetirementResult {
  projectedSavings: number;
  totalContributions: number;
  totalGrowth: number;
  retirementGoal: number;
  shortfall: number;
  onTrack: boolean;
  yearsToRetirement: number;
  realReturnRate: number;
  projectedMonthlyIncome4Pct: number;
  yearlyProjections: YearlyProjection[];
}

export function calculateRetirement(inputs: RetirementInputs): RetirementResult {
  const {
    currentAge,
    retirementAge,
    currentSavings,
    monthlyContribution,
    annualReturnRate,
    annualInflationRate,
    retirementGoal,
  } = inputs;

  const yearsToRetirement = Math.max(0, retirementAge - currentAge);
  const realReturnRate = annualReturnRate - annualInflationRate;
  const monthlyRate = annualReturnRate / 100 / 12;

  const yearlyProjections: YearlyProjection[] = [];
  let balance = currentSavings;
  let totalContributions = currentSavings;

  for (let y = 1; y <= yearsToRetirement; y++) {
    const startBalance = balance;
    const annualContribution = monthlyContribution * 12;
    let yearGrowth = 0;

    // Month-by-month compounding within each year
    for (let m = 0; m < 12; m++) {
      const monthGrowth = balance * monthlyRate;
      yearGrowth += monthGrowth;
      balance += monthGrowth + monthlyContribution;
    }

    totalContributions += annualContribution;

    yearlyProjections.push({
      year: y,
      age: currentAge + y,
      startBalance,
      contributions: annualContribution,
      growth: yearGrowth,
      endBalance: balance,
    });
  }

  const projectedSavings = balance;
  const totalGrowth = projectedSavings - totalContributions;
  const shortfall = Math.max(0, retirementGoal - projectedSavings);
  const onTrack = projectedSavings >= retirementGoal;
  const projectedMonthlyIncome4Pct = (projectedSavings * 0.04) / 12;

  return {
    projectedSavings,
    totalContributions,
    totalGrowth,
    retirementGoal,
    shortfall,
    onTrack,
    yearsToRetirement,
    realReturnRate,
    projectedMonthlyIncome4Pct,
    yearlyProjections,
  };
}
