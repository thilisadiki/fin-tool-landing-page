import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Personal Budget Calculator South Africa',
  description:
    'Track your income, needs, wants, and savings with our free South African budget calculator. See if your spending aligns with the 50/30/20 rule.',
  keywords: [
    'budget calculator',
    'monthly budget planner',
    'expense tracker',
    '50 30 20 rule',
    'budgeting south africa',
  ],
  alternates: {
    canonical: '/calculators/budget-calculator',
  },
  openGraph: {
    title: 'Free Personal Budget Calculator South Africa',
    description:
      'Track your income and expenses, and check if your budget aligns with the 50/30/20 rule for free.',
    url: '/calculators/budget-calculator',
    type: 'website',
  },
};

export default function BudgetCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
