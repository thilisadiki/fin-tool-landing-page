import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

export const alt = 'Free Personal Loan Calculator South Africa';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OgImage() {
  return renderOgImage({
    eyebrow: 'Personal Loan Calculator',
    title: 'Compare loan offers before you sign',
    subtitle:
      'Monthly repayments, total interest, and the true cost of a personal loan.',
    accentFrom: '#f59e0b',
    accentTo: '#f97316',
  });
}
