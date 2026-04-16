import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

export const alt =
  'Quick Money Tool: free finance calculators for South Africans';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OgImage() {
  return renderOgImage({
    title: 'Free finance calculators for South Africans',
    subtitle:
      'SARS tax, vehicle finance, retirement, personal loans, budgeting, and live currency rates.',
  });
}
