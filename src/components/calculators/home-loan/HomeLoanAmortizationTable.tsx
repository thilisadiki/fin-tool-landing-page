import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { formatZAR } from '@/lib/formatters';
import type { HomeLoanResult } from '@/lib/calculators/homeLoanCalculator';

interface HomeLoanAmortizationTableProps {
  result: HomeLoanResult;
  deposit: number;
}

export default function HomeLoanAmortizationTable({
  result,
  deposit,
}: HomeLoanAmortizationTableProps) {
  if (result.amortizationSchedule.length === 0) return null;

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="bond-amortization-schedule">
        <AccordionTrigger className="text-lg">Bond Amortization Schedule</AccordionTrigger>
        <AccordionContent>
          <div className="overflow-x-auto max-h-[400px] overflow-y-auto outline outline-1 outline-border rounded-xl">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 dark:bg-slate-800 sticky top-0 shadow-sm z-10">
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="py-3 px-4">Month</th>
                  <th className="py-3 px-4 text-right">Payment</th>
                  <th className="py-3 px-4 text-right">Principal</th>
                  <th className="py-3 px-4 text-right">Interest</th>
                  <th className="py-3 px-4 text-right">Balance</th>
                </tr>
              </thead>
              <tbody>
                {result.amortizationSchedule.map((row) => (
                  <tr
                    key={row.month}
                    className="border-b border-border/20 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <td className="py-3 px-4 text-foreground font-medium">{row.month}</td>
                    <td className="py-3 px-4 text-right text-foreground">
                      {formatZAR(row.payment)}
                    </td>
                    <td className="py-3 px-4 text-right text-[#C9A84C]">
                      {formatZAR(row.principalPayment)}
                    </td>
                    <td className="py-3 px-4 text-right text-amber-500">
                      {formatZAR(row.interestPayment)}
                    </td>
                    <td className="py-3 px-4 text-right text-foreground">
                      {formatZAR(row.remainingBalance)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-col space-y-3 text-sm p-4 rounded-xl border border-border/50 bg-accent/20">
            <div className="flex justify-between border-b border-border/50 pb-2">
              <span className="text-muted-foreground">Cash Deposit</span>
              <span className="font-medium text-foreground">{formatZAR(deposit)}</span>
            </div>
            <div className="flex justify-between border-b border-border/50 pb-2">
              <span className="text-muted-foreground">Estimated Transfer Duty</span>
              <span className="font-medium text-foreground">
                {formatZAR(result.estimatedTransferDuty)}
              </span>
            </div>
            <div className="flex justify-between border-b border-border/50 pb-2">
              <span className="text-muted-foreground">Upfront Cash Needed</span>
              <span className="font-medium text-foreground">
                {formatZAR(result.upfrontCashNeeded)}
              </span>
            </div>
            <div className="flex justify-between border-b border-border/50 pb-2">
              <span className="text-muted-foreground">Total Interest Paid</span>
              <span className="font-medium text-amber-500">
                {formatZAR(result.totalInterest)}
              </span>
            </div>
            <div className="flex justify-between font-bold pt-1">
              <span className="text-foreground">Total Bond Repayment</span>
              <span className="text-foreground">{formatZAR(result.totalBondRepayment)}</span>
            </div>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Transfer duty is estimated using current SARS rates. Bond registration fees,
            conveyancing fees, insurance, and maintenance are not included here.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
