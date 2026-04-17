import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Personal Budget Calculator South Africa',
  description:
    'Free South African budget calculator with a complete budgeting guide. Track income and expenses, apply the 50/30/20 rule, and learn how to save more money in South Africa.',
  keywords: [
    'budget calculator',
    'monthly budget planner',
    'expense tracker',
    '50 30 20 rule',
    'budgeting south africa',
    'how to budget south africa',
    'save money south africa',
    'budget guide',
    'personal finance south africa',
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
