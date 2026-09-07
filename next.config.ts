import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  // React strict mode surfaces effects that run twice in dev, so
  // subtle animation / scroll listener leaks show up early.
  reactStrictMode: true,
  devIndicators: false,
  // R2-fe-hardening-01: xavfsizlik headers. Marketing site kam
  // xavfli — lekin clickjacking / MIME sniffing / referrer leak
  // klassik defense-in-depth hardening.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
