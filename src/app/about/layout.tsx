import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Quick Money Tool: a personal finance guide for South Africans with free calculators and research-based guides, all reviewed by qualified tax professionals.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Us | Quick Money Tool',
    description:
      'A personal finance guide for South Africans with free calculators and professionally reviewed money guides.',
    url: '/about',
    type: 'website',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
