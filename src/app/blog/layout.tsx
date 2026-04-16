import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Blog',
    template: '%s | Quick Money Tool',
  },
  description:
    'Finance, tax, and money guides for South Africans. Learn how to budget, save, invest, and plan with Quick Money Tool.',
  alternates: { canonical: '/blog' },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  openGraph: {
    type: 'website',
    title: 'Blog | Quick Money Tool',
    description:
      'Finance, tax, and money guides for South Africans. Learn how to budget, save, invest, and plan with Quick Money Tool.',
    url: '/blog',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
