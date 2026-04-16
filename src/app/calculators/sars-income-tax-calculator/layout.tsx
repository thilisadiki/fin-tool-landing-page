import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free SARS Income Tax Calculator 2026/2027',
  description:
    'Free SARS income tax calculator for South Africa (2026/2027). Calculate your PAYE, tax rebates, medical credits, and take-home pay instantly.',
  keywords: [
    'sars income tax calculator',
    'paye calculator',
    'south africa tax calculator',
    'tax rebates',
    'medical tax credits',
    '2026 2027 tax brackets',
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
