import { ImageResponse } from 'next/og';

// Favicon — generated at build time so we ship exactly one visual
// source of truth for the Lope brand mark. Black background with the
// electric-blue accent dot; contrasts cleanly against both light
// (Chrome / Safari) and dark (macOS Sonoma) tab strips.
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0a0a0a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 6,
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: 999,
            background: '#0066ff',
            boxShadow: '0 0 12px #0066ff',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
