import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Vehicle Finance Calculator South Africa',
  description:
    'Calculate your monthly car installments, interest payments, and explore balloon payment options with our free South African vehicle finance calculator.',
  keywords: [
    'vehicle finance calculator',
    'car installment calculator',
    'car loan south africa',
    'balloon payment calculator',
  ],
  alternates: {
    canonical: '/calculators/vehicle-finance-calculator',
  },
  openGraph: {
    title: 'Free Vehicle Finance Calculator South Africa',
    description:
      'Calculate your car installments, interest, and explore balloon payment options for free.',
    url: '/calculators/vehicle-finance-calculator',
    type: 'website',
  },
};

export default function VehicleFinanceCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
