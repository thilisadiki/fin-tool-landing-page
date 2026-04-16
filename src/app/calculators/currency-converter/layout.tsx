import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Currency Converter & Exchange Rates',
  description:
    'Real-time currency converter supporting 30+ major currencies with live exchange rates and historical trend charts.',
  keywords: [
    'currency converter',
    'exchange rates',
    'foreign exchange',
    'historical exchange rates',
    'zar to usd',
  ],
  alternates: {
    canonical: '/calculators/currency-converter',
  },
  openGraph: {
    title: 'Free Currency Converter & Live Exchange Rates',
    description:
      'Real-time currency converter supporting international currencies with historical trend charts.',
    url: '/calculators/currency-converter',
    type: 'website',
  },
};

export default function CurrencyConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
