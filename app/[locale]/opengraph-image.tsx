import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';

/// OG image (1200x630) generated per-locale at build time. Rendered
/// when Lope links get shared to Telegram / WhatsApp / Twitter /
/// LinkedIn. Kept intentionally minimal: brand mark on the left,
/// tagline on the right, subtle grid + accent glow for depth.
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Lope — IT company from Uzbekistan';

export default async function OGImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0a0a0a',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Subtle grid overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            display: 'flex',
          }}
        />

        {/* Accent glow */}
        <div
          style={{
            position: 'absolute',
            top: -200,
            right: -200,
            width: 700,
            height: 700,
            borderRadius: 999,
            background: 'radial-gradient(circle, rgba(0,102,255,0.35), transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Top row — brand mark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, zIndex: 1 }}>
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 999,
              background: '#0066ff',
              boxShadow: '0 0 32px #0066ff',
              display: 'flex',
            }}
          />
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: '#fafafa',
              letterSpacing: '-0.03em',
              display: 'flex',
            }}
          >
            Lope
          </div>
        </div>

        {/* Bottom — tagline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, zIndex: 1 }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              color: '#fafafa',
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              maxWidth: 900,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>{t('titleLine1')}</span>
            <span style={{ color: 'rgba(250,250,250,0.55)' }}>{t('titleLine2')}</span>
          </div>
          <div
            style={{
              fontSize: 28,
              color: 'rgba(250,250,250,0.65)',
              display: 'flex',
            }}
          >
            {t('eyebrow')}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
