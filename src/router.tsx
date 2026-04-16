import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import HomePage from '@/pages/HomePage';

const SarsIncomeTaxCalculator = lazy(
  () => import('@/pages/calculators/SarsIncomeTaxCalculator'),
);

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/calculators/sars-income-tax-calculator',
    element: (
      <Suspense fallback={<PageLoader />}>
        <SarsIncomeTaxCalculator />
      </Suspense>
    ),
  },
]);
