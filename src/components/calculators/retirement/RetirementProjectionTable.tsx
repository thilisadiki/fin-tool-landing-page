'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { formatZAR } from '@/lib/formatters';
import type { RetirementResult } from '@/lib/calculators/retirementCalculator';

interface RetirementProjectionTableProps {
  result: RetirementResult;
}

export default function RetirementProjectionTable({ result }: RetirementProjectionTableProps) {
  if (result.yearlyProjections.length === 0) return null;

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="projection-schedule">
        <AccordionTrigger className="text-lg">Year-by-Year Projection</AccordionTrigger>
        <AccordionContent>
          <div className="overflow-x-auto max-h-[400px] overflow-y-auto outline outline-1 outline-border rounded-xl">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 dark:bg-slate-800 sticky top-0 shadow-sm z-10">
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="py-3 px-4">Year</th>
                  <th className="py-3 px-4 text-right">Age</th>
                  <th className="py-3 px-4 text-right">Start Balance</th>
                  <th className="py-3 px-4 text-right">Contributions</th>
                  <th className="py-3 px-4 text-right">Growth</th>
                  <th className="py-3 px-4 text-right">End Balance</th>
                </tr>
              </thead>
              <tbody>
                {result.yearlyProjections.map((row) => (
                  <tr key={row.year} className="border-b border-border/20 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-3 px-4 text-foreground font-medium">{row.year}</td>
                    <td className="py-3 px-4 text-right text-foreground">{row.age}</td>
                    <td className="py-3 px-4 text-right text-foreground">{formatZAR(row.startBalance)}</td>
                    <td className="py-3 px-4 text-right text-purple-500">{formatZAR(row.contributions)}</td>
                    <td className="py-3 px-4 text-right text-emerald-500">{formatZAR(row.growth)}</td>
                    <td className="py-3 px-4 text-right text-foreground font-medium">{formatZAR(row.endBalance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-col space-y-3 text-sm p-4 rounded-xl border border-border/50 bg-accent/20">
            <div className="flex justify-between border-b border-border/50 pb-2">
              <span className="text-muted-foreground">Total Contributions</span>
              <span className="font-medium text-purple-500">{formatZAR(result.totalContributions)}</span>
            </div>
            <div className="flex justify-between border-b border-border/50 pb-2">
              <span className="text-muted-foreground">Total Investment Growth</span>
              <span className="font-medium text-emerald-500">{formatZAR(result.totalGrowth)}</span>
            </div>
            <div className="flex justify-between font-bold pt-1">
              <span className="text-foreground">Projected Total at Retirement</span>
              <span className="text-foreground">{formatZAR(result.projectedSavings)}</span>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
