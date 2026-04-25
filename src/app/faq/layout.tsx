import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Answers to common questions about Quick Money Tool, our South African finance calculators, privacy, review process, and how the site works.',
  keywords: [
    'quick money tool faq',
    'south africa finance calculator faq',
    'financial calculator questions',
    'quick money tool help',
  ],
  alternates: {
    canonical: '/faq',
  },
  openGraph: {
    title: 'Quick Money Tool FAQ',
    description:
      'Answers to common questions about our South African calculators, privacy, and review process.',
    url: '/faq',
    type: 'website',
  },
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
