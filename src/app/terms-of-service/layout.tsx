import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Read the Quick Money Tool terms of service. Understand the conditions of using our free South African financial calculators.',
  alternates: {
    canonical: '/terms-of-service',
  },
  openGraph: {
    title: 'Terms of Service | Quick Money Tool',
    description: 'Terms and conditions for using Quick Money Tool.',
    url: '/terms-of-service',
    type: 'website',
  },
};

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
