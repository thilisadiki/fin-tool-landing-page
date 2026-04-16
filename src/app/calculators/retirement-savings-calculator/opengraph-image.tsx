import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

export const alt = 'Free Retirement Savings Calculator South Africa';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OgImage() {
  return renderOgImage({
    eyebrow: 'Retirement Calculator',
    title: 'Project your retirement annuity growth',
    subtitle:
      'Compound growth, inflation, and the 4% rule. See if you are on track.',
    accentFrom: '#a855f7',
    accentTo: '#ec4899',
  });
}
