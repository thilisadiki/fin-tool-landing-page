import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Personal Loan Calculator South Africa',
  description:
    'Calculate your monthly personal loan repayments, total interest, and cost of credit with our free South African personal loan calculator.',
  keywords: [
    'personal loan calculator',
    'loan repayment calculator',
    'loan calculator south africa',
    'debt consolidation calculator',
    'monthly loan payment',
  ],
  alternates: {
    canonical: '/calculators/personal-loan-calculator',
  },
  openGraph: {
    title: 'Free Personal Loan Calculator South Africa',
    description:
      'Calculate your personal loan repayments, interest, and total cost of credit for free.',
    url: '/calculators/personal-loan-calculator',
    type: 'website',
  },
};

export default function PersonalLoanCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
