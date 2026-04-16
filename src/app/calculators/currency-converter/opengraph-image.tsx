import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

export const alt = 'Free Currency Converter & Live Exchange Rates';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OgImage() {
  return renderOgImage({
    eyebrow: 'Currency Converter',
    title: 'Live ZAR exchange rates for every trip',
    subtitle:
      'Convert 30+ currencies with real-time rates and historical trend charts.',
    accentFrom: '#06b6d4',
    accentTo: '#0ea5e9',
  });
}
