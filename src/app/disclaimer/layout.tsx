import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description:
    'Read the Quick Money Tool disclaimer. Our calculators provide estimates for informational purposes only and are not a substitute for professional financial advice.',
  alternates: {
    canonical: '/disclaimer',
  },
  openGraph: {
    title: 'Disclaimer | Quick Money Tool',
    description:
      'Quick Money Tool calculators provide estimates for informational purposes only.',
    url: '/disclaimer',
    type: 'website',
  },
};

export default function DisclaimerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
