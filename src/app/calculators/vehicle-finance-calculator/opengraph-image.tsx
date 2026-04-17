import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

export const alt = 'Free Vehicle Finance Calculator South Africa';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OgImage() {
  return renderOgImage({
    eyebrow: 'Vehicle Finance Calculator',
    title: 'Work out your real monthly car payment',
    subtitle:
      'Monthly installments, balloon payments, and total cost of credit for any car loan.',
    accentFrom: '#C9A84C',
    accentTo: '#0F2744',
  });
}
