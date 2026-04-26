export type DebtStrategy = 'snowball' | 'avalanche';

export interface Debt {
  id: string;
  name: string;
  balance: number;
  apr: number;
  minPayment: number;
}

export interface DebtPayoffInputs {
  debts: Debt[];
  extraMonthly: number;
  startDate: Date;
}

export interface DebtPayoffMonthRow {
  month: number;
  totalBalance: number;
  totalPaid: number;
  totalInterest: number;
}

export interface DebtPayoffEvent {
  debtId: string;
  debtName: string;
  month: number;
  payoffDate: Date;
  interestPaid: number;
}

export interface StrategyResult {
  strategy: DebtStrategy;
  months: number;
  payoffDate: Date | null;
  totalInterest: number;
  totalPaid: number;
  startingBalance: number;
  schedule: DebtPayoffMonthRow[];
  payoffOrder: DebtPayoffEvent[];
  cannotPayOff: boolean;
}

export interface DebtPayoffResult {
  snowball: StrategyResult;
  avalanche: StrategyResult;
  interestSaved: number;
  monthsSaved: number;
  recommended: DebtStrategy;
  totalMinimumPayments: number;
  totalMonthlyPayment: number;
}

const MAX_MONTHS = 600;

interface SimulationDebt {
  id: string;
  name: string;
  balance: number;
  monthlyRate: number;
  minPayment: number;
  paidOffMonth: number | null;
  interestPaid: number;
}

function pickTarget(
  debts: SimulationDebt[],
  strategy: DebtStrategy,
): SimulationDebt | null {
  const active = debts.filter((d) => d.balance > 0.005);
  if (active.length === 0) return null;

  if (strategy === 'snowball') {
    return active.reduce((best, d) => (d.balance < best.balance ? d : best), active[0]);
  }

  return active.reduce((best, d) => {
    if (d.monthlyRate > best.monthlyRate) return d;
    if (d.monthlyRate === best.monthlyRate && d.balance < best.balance) return d;
    return best;
  }, active[0]);
}

function addMonths(date: Date, months: number): Date {
  const result = new Date(date.getTime());
  result.setMonth(result.getMonth() + months);
  return result;
}

function simulate(
  inputs: DebtPayoffInputs,
  strategy: DebtStrategy,
): StrategyResult {
  const debts: SimulationDebt[] = inputs.debts
    .filter((d) => d.balance > 0)
    .map((d) => ({
      id: d.id,
      name: d.name,
      balance: d.balance,
      monthlyRate: Math.max(0, d.apr) / 100 / 12,
      minPayment: Math.max(0, d.minPayment),
      paidOffMonth: null,
      interestPaid: 0,
    }));

  const startingBalance = debts.reduce((sum, d) => sum + d.balance, 0);
  const extraMonthly = Math.max(0, inputs.extraMonthly);

  const schedule: DebtPayoffMonthRow[] = [];
  const payoffOrder: DebtPayoffEvent[] = [];

  if (debts.length === 0) {
    return {
      strategy,
      months: 0,
      payoffDate: null,
      totalInterest: 0,
      totalPaid: 0,
      startingBalance: 0,
      schedule: [],
      payoffOrder: [],
      cannotPayOff: false,
    };
  }

  let totalPaid = 0;
  let totalInterest = 0;
  let month = 0;
  let cannotPayOff = false;

  while (month < MAX_MONTHS) {
    const remaining = debts.filter((d) => d.balance > 0.005);
    if (remaining.length === 0) break;

    month += 1;

    let monthInterest = 0;
    for (const debt of debts) {
      if (debt.balance <= 0.005) continue;
      const interest = debt.balance * debt.monthlyRate;
      debt.balance += interest;
      debt.interestPaid += interest;
      monthInterest += interest;
    }

    let pool = extraMonthly;
    let monthPayments = 0;

    for (const debt of debts) {
      if (debt.balance <= 0.005) continue;
      const payment = Math.min(debt.minPayment, debt.balance);
      debt.balance -= payment;
      monthPayments += payment;
      const slack = debt.minPayment - payment;
      if (slack > 0) pool += slack;
    }

    while (pool > 0.005) {
      const target = pickTarget(debts, strategy);
      if (!target) break;
      const apply = Math.min(pool, target.balance);
      target.balance -= apply;
      pool -= apply;
      monthPayments += apply;
      if (apply <= 0) break;
    }

    for (const debt of debts) {
      if (debt.balance <= 0.005 && debt.paidOffMonth === null) {
        debt.balance = 0;
        debt.paidOffMonth = month;
        payoffOrder.push({
          debtId: debt.id,
          debtName: debt.name,
          month,
          payoffDate: addMonths(inputs.startDate, month),
          interestPaid: debt.interestPaid,
        });
      }
    }

    totalPaid += monthPayments;
    totalInterest += monthInterest;

    schedule.push({
      month,
      totalBalance: debts.reduce((sum, d) => sum + d.balance, 0),
      totalPaid,
      totalInterest,
    });

    const totalMinPlusExtra =
      debts
        .filter((d) => d.balance > 0.005)
        .reduce((sum, d) => sum + d.minPayment, 0) + extraMonthly;

    if (
      totalMinPlusExtra <= monthInterest - 0.01 &&
      debts.some((d) => d.balance > 0.005)
    ) {
      cannotPayOff = true;
      break;
    }
  }

  if (debts.some((d) => d.balance > 0.005)) {
    cannotPayOff = true;
  }

  return {
    strategy,
    months: month,
    payoffDate: cannotPayOff ? null : addMonths(inputs.startDate, month),
    totalInterest,
    totalPaid,
    startingBalance,
    schedule,
    payoffOrder,
    cannotPayOff,
  };
}

export function calculateDebtPayoff(inputs: DebtPayoffInputs): DebtPayoffResult {
  const snowball = simulate(inputs, 'snowball');
  const avalanche = simulate(inputs, 'avalanche');

  const interestSaved = Math.max(0, snowball.totalInterest - avalanche.totalInterest);
  const monthsSaved = Math.max(0, snowball.months - avalanche.months);

  const recommended: DebtStrategy =
    avalanche.totalInterest <= snowball.totalInterest ? 'avalanche' : 'snowball';

  const totalMinimumPayments = inputs.debts
    .filter((d) => d.balance > 0)
    .reduce((sum, d) => sum + Math.max(0, d.minPayment), 0);

  return {
    snowball,
    avalanche,
    interestSaved,
    monthsSaved,
    recommended,
    totalMinimumPayments,
    totalMonthlyPayment: totalMinimumPayments + Math.max(0, inputs.extraMonthly),
  };
}
