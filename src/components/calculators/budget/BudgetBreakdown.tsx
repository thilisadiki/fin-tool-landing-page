import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { formatZAR, formatPercent } from '@/lib/formatters';
import type { BudgetResult } from '@/lib/calculators/budgetCalculator';

interface BudgetBreakdownProps {
  result: BudgetResult;
}

export default function BudgetBreakdown({ result }: BudgetBreakdownProps) {
  if (result.totalExpenses === 0) return null;

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="budget-breakdown">
        <AccordionTrigger className="text-lg">Allocation Breakdown (50/30/20 Rule)</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-6 mt-2">
            
            <p className="text-sm text-muted-foreground">
              The Popular 50/30/20 rule suggests allocating roughly 50% of your income to Needs, 30% to Wants, and 20% to Savings. Here is how your budget compares:
            </p>

            <div className="space-y-5">
              {result.categories.map((category) => (
                <div key={category.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-foreground">{category.name}</span>
                    <span className="text-muted-foreground">{formatZAR(category.amount)}</span>
                  </div>
                  
                  <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                    <div 
                      className={`h-full ${category.color} transition-all duration-1000 ease-out`}
                      style={{ width: `${Math.min(100, category.percentageOfIncome)}%` }}
                    />
                  </div>
                  
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{formatPercent(category.percentageOfIncome)} of Income</span>
                    {category.percentageOfIncome > 100 && (
                      <span className="text-rose-500 font-medium">Exceeds Income!</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col space-y-3 text-sm p-4 rounded-xl border border-border/50 bg-accent/20">
               <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Total Income</span>
                  <span className="font-medium text-foreground">{formatZAR(result.totalIncome)}</span>
               </div>
               <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Total Expenses</span>
                  <span className="font-medium text-amber-500">{formatZAR(result.totalExpenses)}</span>
               </div>
               <div className="flex justify-between font-bold pt-1">
                  <span className="text-foreground">Remaining Budget</span>
                  <span className={result.netIncome < 0 ? 'text-rose-500' : 'text-[#C9A84C]'}>
                    {formatZAR(result.netIncome)}
                  </span>
               </div>
            </div>

          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
