import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Retirement Savings Calculator South Africa',
  description:
    'Free retirement savings calculator for South Africa. Project your retirement annuity growth, estimate your monthly retirement income with the 4% Rule, and check if you are on track to meet your goal.',
  keywords: [
    'retirement calculator south africa',
    'retirement annuity calculator',
    'retirement savings projection',
    'compound interest calculator',
    '4 percent rule',
    'RA calculator',
  ],
  alternates: {
    canonical: '/calculators/retirement-savings-calculator',
  },
  openGraph: {
    title: 'Free Retirement Savings Calculator South Africa',
    description:
      'Project your retirement savings, estimate your monthly income, and check if you are on track.',
    url: '/calculators/retirement-savings-calculator',
    type: 'website',
  },
};

export default function RetirementSavingsCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
