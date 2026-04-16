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

export const TAX_2026_2027: TaxYearConfig = {
  year: '2026/2027',
  brackets: [
    { min: 0, max: 245_100, rate: 0.18, baseTax: 0 },
    { min: 245_101, max: 383_100, rate: 0.26, baseTax: 44_118 },
    { min: 383_101, max: 530_200, rate: 0.31, baseTax: 79_998 },
    { min: 530_201, max: 695_800, rate: 0.36, baseTax: 125_599 },
    { min: 695_801, max: 887_000, rate: 0.39, baseTax: 185_215 },
    { min: 887_001, max: 1_878_600, rate: 0.41, baseTax: 259_783 },
    { min: 1_878_601, max: Infinity, rate: 0.45, baseTax: 666_339 },
  ],
  rebates: {
    primary: 17_820,
    secondary: 9_765,
    tertiary: 3_249,
  },
  thresholds: {
    under65: 99_000,
    '65to74': 153_250,
    '75plus': 171_300,
  },
  medicalCredits: {
    mainMember: 376,
    firstDependent: 376,
    additional: 254,
  },
  retirementDeductionRate: 0.275,
  retirementDeductionCap: 350_000,
};

export const CURRENT_TAX_YEAR = TAX_2026_2027;
