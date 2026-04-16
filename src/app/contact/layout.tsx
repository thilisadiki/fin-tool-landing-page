import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with the Quick Money Tool team. We welcome your feedback, suggestions, and questions about our free South African financial calculators.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Us | Quick Money Tool',
    description: 'Get in touch with the Quick Money Tool team.',
    url: '/contact',
    type: 'website',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
