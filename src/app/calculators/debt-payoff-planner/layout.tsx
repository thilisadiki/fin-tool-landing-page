import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Debt Payoff Planner South Africa',
  description:
    'Compare snowball vs avalanche debt payoff strategies. See your debt-free date, total interest, and how much extra payments save you.',
  keywords: [
    'debt payoff calculator',
    'debt snowball calculator',
    'debt avalanche calculator',
    'debt free planner',
    'debt repayment south africa',
  ],
  alternates: {
    canonical: '/calculators/debt-payoff-planner',
  },
  openGraph: {
    title: 'Free Debt Payoff Planner South Africa',
    description:
      'Compare snowball vs avalanche, see your payoff date and total interest saved.',
    url: '/calculators/debt-payoff-planner',
    type: 'website',
  },
};

export default function DebtPayoffPlannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
