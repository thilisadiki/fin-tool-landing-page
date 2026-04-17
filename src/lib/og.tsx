import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

export interface OgParams {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  accentFrom?: string;
  accentTo?: string;
}

export function renderOgImage({
  eyebrow = 'Quick Money Tool',
  title,
  subtitle,
  accentFrom = '#C9A84C',
  accentTo = '#0F2744',
}: OgParams) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background:
            'linear-gradient(135deg, #070f1a 0%, #0F2744 60%, #070f1a 100%)',
          color: '#f8fafc',
          fontFamily:
            'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -160,
            right: -160,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: `linear-gradient(135deg, ${accentFrom}, ${accentTo})`,
            opacity: 0.35,
            filter: 'blur(40px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -180,
            left: -120,
            width: 420,
            height: 420,
            borderRadius: 9999,
            background: `linear-gradient(135deg, ${accentTo}, ${accentFrom})`,
            opacity: 0.25,
            filter: 'blur(40px)',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: `linear-gradient(135deg, ${accentFrom}, ${accentTo})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
              fontWeight: 700,
              color: '#fff',
            }}
          >
            Q
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 600,
              letterSpacing: -0.2,
              color: '#e2e8f0',
            }}
          >
            {eyebrow}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                fontSize: 30,
                color: '#cbd5e1',
                lineHeight: 1.3,
                maxWidth: 960,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 22,
            color: '#94a3b8',
          }}
        >
          <div>quickmoneytool.com</div>
          <div
            style={{
              padding: '10px 20px',
              borderRadius: 9999,
              background: 'rgba(16, 185, 129, 0.15)',
              color: '#6ee7b7',
              fontWeight: 600,
            }}
          >
            Free South African Finance Tools
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
