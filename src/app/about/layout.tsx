import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Quick Money Tool: free, accurate financial calculators built for South Africans. Our mission is to make financial planning accessible to everyone.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Us | Quick Money Tool',
    description:
      'Free, accurate financial calculators built for South Africans.',
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
