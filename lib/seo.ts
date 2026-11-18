/**
 * SEO helpers — canonical URLs, hreflang alternates, JSON-LD structured
 * data. Har page shu funksiyalarni ishlatib to'g'ri metadata generatsiya
 * qiladi. Eski kod har sub-page uchun canonical va hreflang ni root'ga
 * ishora qildirar edi — Google buni duplicate content deb belgilaydi
 * va reyting pastroq bo'ladi.
 */
import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import {
  COMPANY_EMAIL,
  COMPANY_INSTAGRAM,
  COMPANY_PHONE_RAW,
  COMPANY_TELEGRAM,
  COMPANY_TIN,
} from '@/lib/company';

export const SITE_URL = 'https://lope.uz';
export const SITE_NAME = 'Lope';
export const BRAND_TWITTER = '@lope_uz'; // agar Twitter/X akkount bo'lsa

/**
 * Given a page path (e.g. '/about') and the current locale, build:
 *   - canonical: locale-prefixed URL for THIS page
 *   - languages: hreflang alternates for ALL locales pointing to THIS page
 *   - x-default: uz variant (asosiy tili)
 *
 * `as-needed` locale prefix qoidasi: default locale (uz) URL da / prefix siz,
 * boshqa lokallar /ru/... yoki /en/... shaklida.
 */
export function buildAlternates(path: string, locale: string) {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const trimmed = cleanPath === '/' ? '' : cleanPath;

  const urlFor = (lc: string) => {
    if (lc === routing.defaultLocale) return `${SITE_URL}${trimmed}`;
    return `${SITE_URL}/${lc}${trimmed}`;
  };

  const languages: Record<string, string> = {};
  for (const lc of routing.locales) {
    languages[lc] = urlFor(lc);
  }
  // x-default — Google default fallback (til bilinmagan userlar uchun).
  languages['x-default'] = urlFor(routing.defaultLocale);

  return {
    canonical: urlFor(locale),
    languages,
  };
}

/**
 * Sub-page uchun to'liq metadata. Har sahifa o'zining title, description,
 * OG image (ixtiyoriy) va path ini beradi — biz canonical/hreflang/OG url
 * ni to'g'ri qurib beramiz.
 */
export function buildPageMetadata(opts: {
  path: string;
  locale: string;
  title: string;
  description: string;
  ogImage?: string;
  noIndex?: boolean;
}): Metadata {
  const { path, locale, title, description, ogImage, noIndex } = opts;
  const alternates = buildAlternates(path, locale);
  const pageUrl = alternates.canonical;

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: SITE_NAME,
      locale,
      type: 'website',
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630, alt: title }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

/**
 * JSON-LD Organization schema — Google, Yandex, Bing sizning
 * kompaniya haqida boy ma'lumot ko'rsatishga imkon beradi (Knowledge
 * Panel). Uzbek IT proyekti uchun struktura.
 */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    legalName: '"LOPE" MChJ',
    taxID: COMPANY_TIN,
    url: SITE_URL,
    logo: `${SITE_URL}/icon`,
    sameAs: [COMPANY_INSTAGRAM, COMPANY_TELEGRAM],
    // Legal address from the registration certificate (lib/company.ts).
    address: {
      '@type': 'PostalAddress',
      streetAddress: "Beshkapa MFY, Paxtaobod ko'chasi, 326-uy",
      addressLocality: 'Nurafshon, Namangan tumani',
      addressRegion: 'Namangan viloyati',
      addressCountry: 'UZ',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        telephone: COMPANY_PHONE_RAW,
        email: COMPANY_EMAIL,
        availableLanguage: ['uz', 'ru', 'en'],
      },
    ],
  };
}

/**
 * JSON-LD WebSite schema — Google search box (sitelinks searchbox)
 * uchun. Foydalanuvchi Google dan qidirsa "lope.uz — qidirish qatori
 * bilan" ko'rsatiladi.
 */
export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: ['uz', 'ru', 'en'],
  };
}
