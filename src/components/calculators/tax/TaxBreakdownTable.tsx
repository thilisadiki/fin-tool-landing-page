import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { formatZAR, formatPercent } from '@/lib/formatters';
import type { TaxResult } from '@/lib/calculators/taxCalculator';

interface TaxBreakdownTableProps {
  result: TaxResult;
}

export default function TaxBreakdownTable({ result }: TaxBreakdownTableProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="bracket-breakdown">
        <AccordionTrigger className="text-lg">Tax Bracket Breakdown</AccordionTrigger>
        <AccordionContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="pb-3 pr-4">Bracket</th>
                  <th className="pb-3 pr-4">Rate</th>
                  <th className="pb-3 pr-4 text-right">Taxable Amount</th>
                  <th className="pb-3 text-right">Tax</th>
                </tr>
              </thead>
              <tbody>
                {result.bracketBreakdown.map((bracket, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-3 pr-4 text-foreground">
                      {formatZAR(bracket.bracketMin)} – {bracket.bracketMax === Infinity ? '...' : formatZAR(bracket.bracketMax)}
                    </td>
                    <td className="py-3 pr-4 text-foreground">{formatPercent(bracket.rate * 100)}</td>
                    <td className="py-3 pr-4 text-right text-foreground">{formatZAR(bracket.taxableInBracket)}</td>
                    <td className="py-3 text-right text-foreground">{formatZAR(bracket.taxForBracket)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Tax before rebates</span>
              <span className="font-medium text-foreground">{formatZAR(result.annualTaxBeforeRebates)}</span>
            </div>
            {result.annualRetirementDeduction > 0 && (
              <div className="flex justify-between py-2 border-b border-border/50">
                <span className="text-muted-foreground">Retirement deduction</span>
                <span className="font-medium text-[#C9A84C]">-{formatZAR(result.annualRetirementDeduction)}</span>
              </div>
            )}
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Tax rebates</span>
              <span className="font-medium text-[#C9A84C]">-{formatZAR(result.annualRebates)}</span>
            </div>
            {result.annualMedicalCredits > 0 && (
              <div className="flex justify-between py-2 border-b border-border/50">
                <span className="text-muted-foreground">Medical tax credits</span>
                <span className="font-medium text-[#C9A84C]">-{formatZAR(result.annualMedicalCredits)}</span>
              </div>
            )}
            <div className="flex justify-between py-2 font-bold border-b border-border/50">
              <span className="text-foreground">Annual tax payable</span>
              <span className="text-foreground">{formatZAR(result.annualTaxPayable)}</span>
            </div>
            {result.annualUIF > 0 && (
              <div className="flex justify-between py-2 border-b border-border/50">
                <span className="text-muted-foreground">Annual UIF Contribution</span>
                <span className="font-medium text-amber-500">{formatZAR(result.annualUIF)}</span>
              </div>
            )}
            <div className="flex justify-between py-2 font-bold">
              <span className="text-foreground">Total Annual Deductions (Tax + UIF)</span>
              <span className="text-foreground">{formatZAR(result.annualTaxPayable + result.annualUIF)}</span>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
