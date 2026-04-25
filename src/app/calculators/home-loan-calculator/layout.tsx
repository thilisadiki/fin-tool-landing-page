import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Home Loan Calculator South Africa',
  description:
    'Estimate your monthly bond repayment, transfer duty, and upfront cash needed with our free South African home loan calculator.',
  keywords: [
    'home loan calculator',
    'bond calculator south africa',
    'mortgage calculator south africa',
    'bond repayment calculator',
    'transfer duty calculator',
  ],
  alternates: {
    canonical: '/calculators/home-loan-calculator',
  },
  openGraph: {
    title: 'Free Home Loan Calculator South Africa',
    description:
      'Estimate your monthly bond repayment, transfer duty, and total monthly housing cost for free.',
    url: '/calculators/home-loan-calculator',
    type: 'website',
  },
};

export default function HomeLoanCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
