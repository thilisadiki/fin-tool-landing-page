import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free SARS Income Tax Calculator 2026/2027',
  description:
    'Free SARS income tax calculator for South Africa (2026/2027). Calculate your PAYE, rebates, medical credits, and take-home pay. Includes guides on tax thresholds, provisional tax, foreign income exemption, and what is taxable.',
  keywords: [
    'sars income tax calculator',
    'paye calculator',
    'south africa tax calculator',
    'tax rebates',
    'medical tax credits',
    '2026 2027 tax brackets',
    'provisional tax south africa',
    'tax free threshold',
    'foreign income exemption',
    'rental income tax south africa',
    'crypto tax south africa',
  ],
  alternates: {
    canonical: '/calculators/sars-income-tax-calculator',
  },
  openGraph: {
    title: 'Free SARS Income Tax Calculator 2026/2027',
    description:
      'Calculate your South African income tax, rebates, and net pay for free.',
    url: '/calculators/sars-income-tax-calculator',
    type: 'website',
  },
};

export default function SarsIncomeTaxCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
