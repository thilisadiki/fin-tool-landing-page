import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Read the Quick Money Tool privacy policy. Learn how we handle your data: all calculations are processed in your browser and we do not store personal financial information.',
  alternates: {
    canonical: '/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy | Quick Money Tool',
    description: 'How Quick Money Tool protects your privacy.',
    url: '/privacy-policy',
    type: 'website',
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
