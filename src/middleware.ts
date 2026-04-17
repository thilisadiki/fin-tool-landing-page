import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SUBDOMAIN_REDIRECTS: Record<string, string> = {
  'taxcalc': '/calculators/sars-income-tax-calculator',
  'budget': '/calculators/budget-calculator',
};

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const subdomain = hostname.split('.')[0];

  const redirectPath = SUBDOMAIN_REDIRECTS[subdomain];
  if (redirectPath) {
    return NextResponse.redirect(
      `https://www.quickmoneytool.com${redirectPath}`,
      301
    );
  }

  return NextResponse.next();
}
