import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

export const alt = 'South African Finance Calculators: Free & Updated';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OgImage() {
  return renderOgImage({
    eyebrow: 'Calculators Hub',
    title: 'Every free SA finance calculator in one place',
    subtitle:
      'Filter by goal: borrowing, saving, tax, or daily money. Built for South Africa.',
  });
}
