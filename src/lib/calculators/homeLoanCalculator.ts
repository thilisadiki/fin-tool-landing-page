export interface HomeLoanInputs {
  propertyPrice: number;
  deposit: number;
  interestRate: number;
  loanTermMonths: number;
  monthlyRates: number;
  monthlyLevies: number;
}

export interface HomeLoanAmortizationRow {
  month: number;
  payment: number;
  principalPayment: number;
  interestPayment: number;
  remainingBalance: number;
}

export interface HomeLoanResult {
  monthlyBondPayment: number;
  totalInterest: number;
  totalBondRepayment: number;
  principalBorrowed: number;
  estimatedTransferDuty: number;
  upfrontCashNeeded: number;
  totalMonthlyHousingCost: number;
  monthlyRatesAndLevies: number;
  loanToValueRatio: number;
  amortizationSchedule: HomeLoanAmortizationRow[];
}

interface TransferDutyBracket {
  min: number;
  max: number | null;
  baseDuty: number;
  rate: number;
  threshold: number;
}

// SARS transfer duty rates effective 1 April 2026.
// Source: https://www.sars.gov.za/tax-rates/transfer-duty/
const TRANSFER_DUTY_BRACKETS: TransferDutyBracket[] = [
  { min: 0, max: 1210000, baseDuty: 0, rate: 0, threshold: 0 },
  { min: 1210001, max: 1663800, baseDuty: 0, rate: 0.03, threshold: 1210000 },
  { min: 1663801, max: 2329300, baseDuty: 13614, rate: 0.06, threshold: 1663800 },
  { min: 2329301, max: 2994800, baseDuty: 53544, rate: 0.08, threshold: 2329300 },
  { min: 2994801, max: 13310000, baseDuty: 106784, rate: 0.11, threshold: 2994800 },
  { min: 13310001, max: null, baseDuty: 1241456, rate: 0.13, threshold: 13310000 },
];

export function calculateTransferDuty(propertyPrice: number): number {
  if (propertyPrice <= 0) return 0;

  const bracket = TRANSFER_DUTY_BRACKETS.find(
    ({ min, max }) => propertyPrice >= min && (max === null || propertyPrice <= max),
  );

  if (!bracket) return 0;
  if (bracket.rate === 0) return 0;

  return bracket.baseDuty + (propertyPrice - bracket.threshold) * bracket.rate;
}

export function calculateHomeLoan(inputs: HomeLoanInputs): HomeLoanResult {
  const propertyPrice = Math.max(0, inputs.propertyPrice);
  const deposit = Math.max(0, Math.min(inputs.deposit, propertyPrice));
  const interestRate = Math.max(0, inputs.interestRate);
  const loanTermMonths = Math.max(0, inputs.loanTermMonths);
  const monthlyRates = Math.max(0, inputs.monthlyRates);
  const monthlyLevies = Math.max(0, inputs.monthlyLevies);

  const principalBorrowed = Math.max(0, propertyPrice - deposit);
  const estimatedTransferDuty = calculateTransferDuty(propertyPrice);
  const upfrontCashNeeded = deposit + estimatedTransferDuty;
  const monthlyRatesAndLevies = monthlyRates + monthlyLevies;
  const loanToValueRatio =
    propertyPrice > 0 ? (principalBorrowed / propertyPrice) * 100 : 0;

  if (principalBorrowed <= 0 || loanTermMonths <= 0) {
    return {
      monthlyBondPayment: 0,
      totalInterest: 0,
      totalBondRepayment: 0,
      principalBorrowed,
      estimatedTransferDuty,
      upfrontCashNeeded,
      totalMonthlyHousingCost: monthlyRatesAndLevies,
      monthlyRatesAndLevies,
      loanToValueRatio,
      amortizationSchedule: [],
    };
  }

  const monthlyRate = interestRate / 100 / 12;
  const amortizationSchedule: HomeLoanAmortizationRow[] = [];
  let monthlyBondPayment = 0;
  let totalInterest = 0;

  if (monthlyRate === 0) {
    monthlyBondPayment = principalBorrowed / loanTermMonths;
    let currentBalance = principalBorrowed;

    for (let month = 1; month <= loanTermMonths; month += 1) {
      currentBalance -= monthlyBondPayment;
      amortizationSchedule.push({
        month,
        payment: monthlyBondPayment,
        principalPayment: monthlyBondPayment,
        interestPayment: 0,
        remainingBalance: Math.max(0, currentBalance),
      });
    }
  } else {
    const factor = Math.pow(1 + monthlyRate, -loanTermMonths);
    monthlyBondPayment = (principalBorrowed * monthlyRate) / (1 - factor);

    let currentBalance = principalBorrowed;
    for (let month = 1; month <= loanTermMonths; month += 1) {
      const interestPayment = currentBalance * monthlyRate;
      const principalPayment = monthlyBondPayment - interestPayment;

      currentBalance -= principalPayment;
      totalInterest += interestPayment;

      amortizationSchedule.push({
        month,
        payment: monthlyBondPayment,
        principalPayment,
        interestPayment,
        remainingBalance: Math.max(0, currentBalance),
      });
    }
  }

  const totalBondRepayment = monthlyBondPayment * loanTermMonths;

  return {
    monthlyBondPayment,
    totalInterest,
    totalBondRepayment,
    principalBorrowed,
    estimatedTransferDuty,
    upfrontCashNeeded,
    totalMonthlyHousingCost: monthlyBondPayment + monthlyRatesAndLevies,
    monthlyRatesAndLevies,
    loanToValueRatio,
    amortizationSchedule,
  };
}
