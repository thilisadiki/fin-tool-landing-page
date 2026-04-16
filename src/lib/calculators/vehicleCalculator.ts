export interface VehicleFinanceInputs {
  vehiclePrice: number;
  deposit: number;
  interestRate: number;
  loanTermMonths: number;
  balloonPercentage: number;
}

export interface AmortizationRow {
  month: number;
  payment: number;
  principalPayment: number;
  interestPayment: number;
  remainingBalance: number;
}

export interface VehicleFinanceResult {
  monthlyPayment: number;
  totalInterest: number;
  totalAmountPaid: number;
  principalFinanced: number;
  balloonAmount: number;
  initiationFee: number;
  monthlyServiceFee: number;
  amortizationSchedule: AmortizationRow[];
}

export function calculateVehicleFinance(inputs: VehicleFinanceInputs): VehicleFinanceResult {
  const { vehiclePrice, deposit, interestRate, loanTermMonths, balloonPercentage } = inputs;
  
  const INITIATION_FEE = 1207.50;
  const MONTHLY_SERVICE_FEE = 69.00;

  const purePrincipal = Math.max(0, vehiclePrice - deposit);
  const principalFinanced = purePrincipal > 0 ? purePrincipal + INITIATION_FEE : 0;
  const balloonAmount = (vehiclePrice * balloonPercentage) / 100;
  
  let baseMonthlyPayment = 0;
  let monthlyPayment = 0;
  let totalInterest = 0;
  let totalAmountPaid = 0;
  const amortizationSchedule: AmortizationRow[] = [];

  const monthlyRate = interestRate / 100 / 12;

  if (principalFinanced <= 0 || loanTermMonths <= 0) {
    return {
      monthlyPayment: 0,
      totalInterest: 0,
      totalAmountPaid: deposit,
      principalFinanced: 0,
      balloonAmount: 0,
      initiationFee: INITIATION_FEE,
      monthlyServiceFee: MONTHLY_SERVICE_FEE,
      amortizationSchedule: []
    };
  }

  if (monthlyRate === 0) {
    baseMonthlyPayment = (principalFinanced - balloonAmount) / loanTermMonths;
    monthlyPayment = baseMonthlyPayment + MONTHLY_SERVICE_FEE;
    totalInterest = 0;
    
    let currentBalance = principalFinanced;
    for (let i = 1; i <= loanTermMonths; i++) {
        let paymentForAmortization = baseMonthlyPayment;
        let totalPaymentThisMonth = monthlyPayment;
        
        if (i === loanTermMonths) {
            paymentForAmortization += balloonAmount;
            totalPaymentThisMonth += balloonAmount;
        }
        currentBalance -= paymentForAmortization;
        
        amortizationSchedule.push({
            month: i,
            payment: totalPaymentThisMonth,
            principalPayment: paymentForAmortization,
            interestPayment: 0,
            remainingBalance: Math.max(0, currentBalance),
        });
    }
  } else {
    // PMT = (PV - B * (1+r)^-n) / ((1 - (1+r)^-n) / r)
    const factor = Math.pow(1 + monthlyRate, -loanTermMonths);
    const num = principalFinanced - balloonAmount * factor;
    const den = (1 - factor) / monthlyRate;
    
    baseMonthlyPayment = num / den;
    monthlyPayment = baseMonthlyPayment + MONTHLY_SERVICE_FEE;
    
    let currentBalance = principalFinanced;
    for (let i = 1; i <= loanTermMonths; i++) {
        const interestForMonth = currentBalance * monthlyRate;
        let principalForMonth = baseMonthlyPayment - interestForMonth;
        let paymentForAmortization = baseMonthlyPayment;
        let totalPaymentThisMonth = monthlyPayment;
        
        // Final month includes balloon payment
        if (i === loanTermMonths) {
            paymentForAmortization += balloonAmount;
            principalForMonth += balloonAmount;
            totalPaymentThisMonth += balloonAmount;
        }
        
        currentBalance -= principalForMonth;
        
        amortizationSchedule.push({
            month: i,
            payment: totalPaymentThisMonth,
            principalPayment: principalForMonth,
            interestPayment: interestForMonth,
            remainingBalance: Math.max(0, currentBalance),
        });
        
        totalInterest += interestForMonth;
    }
  }
  
  totalAmountPaid = deposit + (monthlyPayment * loanTermMonths) + balloonAmount;

  return {
    monthlyPayment,
    totalInterest,
    totalAmountPaid,
    principalFinanced,
    balloonAmount,
    initiationFee: INITIATION_FEE,
    monthlyServiceFee: MONTHLY_SERVICE_FEE,
    amortizationSchedule
  };
}
