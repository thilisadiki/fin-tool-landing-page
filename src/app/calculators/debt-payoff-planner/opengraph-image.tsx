import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

export const alt = 'Free Debt Payoff Planner South Africa';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OgImage() {
  return renderOgImage({
    eyebrow: 'Debt Payoff Planner',
    title: 'Snowball vs avalanche, side by side',
    subtitle:
      'See your debt-free date and how much interest you save with the right strategy.',
    accentFrom: '#0f2744',
    accentTo: '#c9a84c',
  });
}
