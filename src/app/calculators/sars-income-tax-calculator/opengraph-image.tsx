import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

export const alt = 'Free SARS Income Tax Calculator 2026/2027';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OgImage() {
  return renderOgImage({
    eyebrow: 'SARS Tax Calculator',
    title: 'Estimate your 2026/2027 SARS tax',
    subtitle:
      'PAYE, rebates, medical credits, and retirement deductions calculated instantly.',
    accentFrom: '#10b981',
    accentTo: '#14b8a6',
  });
}
