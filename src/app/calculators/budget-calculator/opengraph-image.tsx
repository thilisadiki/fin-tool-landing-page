import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

export const alt = 'Free Personal Budget Calculator South Africa';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OgImage() {
  return renderOgImage({
    eyebrow: 'Budget Calculator',
    title: 'Balance your month with the 50/30/20 rule',
    subtitle:
      'Track income, needs, wants, and savings. Find out where your money actually goes.',
    accentFrom: '#84cc16',
    accentTo: '#22c55e',
  });
}
