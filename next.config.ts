import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  // React strict mode surfaces effects that run twice in dev, so
  // subtle animation / scroll listener leaks show up early.
  reactStrictMode: true,
  devIndicators: false,
};

export default withNextIntl(nextConfig);
