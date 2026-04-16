import { CURRENT_TAX_YEAR, type AgeCategory, type TaxYearConfig } from '@/data/taxData';

export interface TaxInputs {
  grossIncome: number;
  incomeFrequency: 'monthly' | 'annual';
  otherIncome: number;
  ageCategory: AgeCategory;
  medicalAidMembers: number;
  retirementContribution: number;
}

export interface BracketResult {
  bracketMin: number;
  bracketMax: number;
  rate: number;
  taxableInBracket: number;
  taxForBracket: number;
}

export interface TaxResult {
  annualGrossIncome: number;
  annualTaxableIncome: number;
  annualRetirementDeduction: number;
  annualTaxBeforeRebates: number;
  annualRebates: number;
  annualMedicalCredits: number;
  annualTaxPayable: number;
  monthlyTax: number;
  monthlyGross: number;
  monthlyNet: number;
  effectiveTaxRate: number;
  bracketBreakdown: BracketResult[];
}

export function calculateTax(
  inputs: TaxInputs,
  config: TaxYearConfig = CURRENT_TAX_YEAR,
): TaxResult {
  const annualGross =
    inputs.incomeFrequency === 'monthly'
      ? inputs.grossIncome * 12
      : inputs.grossIncome;
  const annualGrossIncome = annualGross + inputs.otherIncome;

  // Retirement deduction: 27.5% of remuneration, capped at R350,000
  const retirementDeduction = Math.min(
    inputs.retirementContribution,
    annualGrossIncome * config.retirementDeductionRate,
    config.retirementDeductionCap,
  );

  const annualTaxableIncome = Math.max(0, annualGrossIncome - retirementDeduction);

  // Walk through brackets
  const bracketBreakdown: BracketResult[] = [];
  let annualTaxBeforeRebates = 0;

  for (const bracket of config.brackets) {
    if (annualTaxableIncome <= bracket.min) break;

    const taxableInBracket = Math.min(
      annualTaxableIncome - bracket.min,
      (bracket.max === Infinity ? Infinity : bracket.max - bracket.min + 1),
    );
    const taxForBracket = taxableInBracket * bracket.rate;

    bracketBreakdown.push({
      bracketMin: bracket.min,
      bracketMax: bracket.max,
      rate: bracket.rate,
      taxableInBracket,
      taxForBracket,
    });
  }

  // Use the baseTax approach for accuracy (matches SARS tables)
  if (annualTaxableIncome > 0) {
    const applicableBracket = [...config.brackets]
      .reverse()
      .find((b) => annualTaxableIncome >= b.min);

    if (applicableBracket) {
      annualTaxBeforeRebates =
        applicableBracket.baseTax +
        (annualTaxableIncome - applicableBracket.min) * applicableBracket.rate;
    }
  }

  // Rebates based on age
  let annualRebates = config.rebates.primary;
  if (inputs.ageCategory === '65to74') {
    annualRebates += config.rebates.secondary;
  } else if (inputs.ageCategory === '75plus') {
    annualRebates += config.rebates.secondary + config.rebates.tertiary;
  }

  // Medical tax credits
  let monthlyMedicalCredits = 0;
  if (inputs.medicalAidMembers >= 1) {
    monthlyMedicalCredits += config.medicalCredits.mainMember;
  }
  if (inputs.medicalAidMembers >= 2) {
    monthlyMedicalCredits += config.medicalCredits.firstDependent;
  }
  if (inputs.medicalAidMembers > 2) {
    monthlyMedicalCredits += (inputs.medicalAidMembers - 2) * config.medicalCredits.additional;
  }
  const annualMedicalCredits = monthlyMedicalCredits * 12;

  // Final tax
  const annualTaxPayable = Math.max(
    0,
    annualTaxBeforeRebates - annualRebates - annualMedicalCredits,
  );

  const monthlyGross = annualGrossIncome / 12;
  const monthlyTax = annualTaxPayable / 12;
  const monthlyNet = monthlyGross - monthlyTax;
  const effectiveTaxRate =
    annualGrossIncome > 0 ? (annualTaxPayable / annualGrossIncome) * 100 : 0;

  return {
    annualGrossIncome,
    annualTaxableIncome,
    annualRetirementDeduction: retirementDeduction,
    annualTaxBeforeRebates,
    annualRebates,
    annualMedicalCredits,
    annualTaxPayable,
    monthlyTax,
    monthlyGross,
    monthlyNet,
    effectiveTaxRate,
    bracketBreakdown,
  };
}
