export interface TaxBracket {
  min: number;
  max: number;
  rate: number;
  baseTax: number;
}

export type AgeCategory = 'under65' | '65to74' | '75plus';

export interface TaxYearConfig {
  year: string;
  brackets: TaxBracket[];
  rebates: {
    primary: number;
    secondary: number;
    tertiary: number;
  };
  thresholds: Record<AgeCategory, number>;
  medicalCredits: {
    mainMember: number;
    firstDependent: number;
    additional: number;
  };
  retirementDeductionRate: number;
  retirementDeductionCap: number;
}

export const TAX_2024_2025: TaxYearConfig = {
  year: '2024/2025',
  brackets: [
    { min: 0, max: 237_100, rate: 0.18, baseTax: 0 },
    { min: 237_101, max: 370_500, rate: 0.26, baseTax: 42_678 },
    { min: 370_501, max: 512_800, rate: 0.31, baseTax: 77_362 },
    { min: 512_801, max: 673_000, rate: 0.36, baseTax: 121_475 },
    { min: 673_001, max: 857_900, rate: 0.39, baseTax: 179_147 },
    { min: 857_901, max: 1_817_000, rate: 0.41, baseTax: 251_258 },
    { min: 1_817_001, max: Infinity, rate: 0.45, baseTax: 644_489 },
  ],
  rebates: {
    primary: 17_235,
    secondary: 9_444,
    tertiary: 3_145,
  },
  thresholds: {
    under65: 95_750,
    '65to74': 148_217,
    '75plus': 165_689,
  },
  medicalCredits: {
    mainMember: 364,
    firstDependent: 364,
    additional: 246,
  },
  retirementDeductionRate: 0.275,
  retirementDeductionCap: 350_000,
};

export const CURRENT_TAX_YEAR = TAX_2024_2025;
