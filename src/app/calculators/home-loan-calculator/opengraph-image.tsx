import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

export const alt = 'Free Home Loan Calculator South Africa';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OgImage() {
  return renderOgImage({
    eyebrow: 'Home Loan Calculator',
    title: 'Plan your bond before you buy',
    subtitle:
      'Monthly bond repayment, transfer duty, and upfront cash for South African property buyers.',
    accentFrom: '#0f766e',
    accentTo: '#eab308',
  });
}
