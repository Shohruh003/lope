import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const SITE = 'https://lope.uz';
const PATHS = ['', '/about', '/projects', '/style', '/store', '/contact', '/privacy', '/terms'] as const;
const LEGAL_PATHS: ReadonlySet<string> = new Set(['/privacy', '/terms']);

/// Build a full sitemap that covers every path in every locale, plus
/// hreflang alternates so Google shows the right language to each user.
/// The default locale (uz) lives at the bare path — `as-needed` prefix.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return PATHS.flatMap((path) =>
    routing.locales.map((locale) => {
      const url =
        locale === routing.defaultLocale
          ? `${SITE}${path}`
          : `${SITE}/${locale}${path}`;

      const languages = Object.fromEntries(
        routing.locales.map((l) => [
          l,
          l === routing.defaultLocale ? `${SITE}${path}` : `${SITE}/${l}${path}`,
        ])
      );

      return {
        url,
        lastModified: now,
        changeFrequency: LEGAL_PATHS.has(path) ? ('yearly' as const) : ('monthly' as const),
        priority: path === '' ? 1.0 : LEGAL_PATHS.has(path) ? 0.3 : 0.7,
        alternates: { languages },
      };
    })
  );
}
