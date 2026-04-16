export interface PersonalLoanInputs {
  loanAmount: number;
  interestRate: number;
  loanTermMonths: number;
  monthlyFee: number;
}

export interface LoanAmortizationRow {
  month: number;
  payment: number;
  principalPayment: number;
  interestPayment: number;
  remainingBalance: number;
}

export interface PersonalLoanResult {
  monthlyPayment: number;
  totalInterest: number;
  totalAmountPaid: number;
  totalFeesPaid: number;
  effectiveRate: number;
  amortizationSchedule: LoanAmortizationRow[];
}

export function calculatePersonalLoan(inputs: PersonalLoanInputs): PersonalLoanResult {
  const { loanAmount, interestRate, loanTermMonths, monthlyFee } = inputs;

  let baseMonthlyPayment = 0;
  let totalInterest = 0;
  const amortizationSchedule: LoanAmortizationRow[] = [];

  const monthlyRate = interestRate / 100 / 12;

  if (loanAmount <= 0 || loanTermMonths <= 0) {
    return {
      monthlyPayment: 0,
      totalInterest: 0,
      totalAmountPaid: 0,
      totalFeesPaid: 0,
      effectiveRate: 0,
      amortizationSchedule: [],
    };
  }

  if (monthlyRate === 0) {
    // Zero interest
    baseMonthlyPayment = loanAmount / loanTermMonths;
    totalInterest = 0;

    let currentBalance = loanAmount;
    for (let i = 1; i <= loanTermMonths; i++) {
      currentBalance -= baseMonthlyPayment;
      amortizationSchedule.push({
        month: i,
        payment: baseMonthlyPayment + monthlyFee,
        principalPayment: baseMonthlyPayment,
        interestPayment: 0,
        remainingBalance: Math.max(0, currentBalance),
      });
    }
  } else {
    // Standard PMT formula: PMT = PV * r / (1 - (1+r)^-n)
    const factor = Math.pow(1 + monthlyRate, -loanTermMonths);
    baseMonthlyPayment = (loanAmount * monthlyRate) / (1 - factor);

    let currentBalance = loanAmount;
    for (let i = 1; i <= loanTermMonths; i++) {
      const interestForMonth = currentBalance * monthlyRate;
      const principalForMonth = baseMonthlyPayment - interestForMonth;

      currentBalance -= principalForMonth;

      amortizationSchedule.push({
        month: i,
        payment: baseMonthlyPayment + monthlyFee,
        principalPayment: principalForMonth,
        interestPayment: interestForMonth,
        remainingBalance: Math.max(0, currentBalance),
      });

      totalInterest += interestForMonth;
    }
  }

  const monthlyPayment = baseMonthlyPayment + monthlyFee;
  const totalFeesPaid = monthlyFee * loanTermMonths;
  const totalAmountPaid = monthlyPayment * loanTermMonths;

  // Effective annual rate (includes fees)
  const totalCostOfCredit = totalInterest + totalFeesPaid;
  const effectiveRate =
    loanAmount > 0 ? (totalCostOfCredit / loanAmount / (loanTermMonths / 12)) * 100 : 0;

  return {
    monthlyPayment,
    totalInterest,
    totalAmountPaid,
    totalFeesPaid,
    effectiveRate,
    amortizationSchedule,
  };
}
