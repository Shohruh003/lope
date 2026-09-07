import '../globals.css';

import { Inter, Space_Grotesk } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata, Viewport } from 'next';

import { routing } from '@/i18n/routing';
import { LenisProvider } from '@/components/lenis-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { buildAlternates, organizationJsonLd, websiteJsonLd, SITE_URL, SITE_NAME } from '@/lib/seo';

// Body copy — modern grotesque with excellent Cyrillic + Latin
// coverage so uz/ru/en all share one weightful family.
const bodyFont = Inter({
  subsets: ['latin', 'cyrillic', 'latin-ext'],
  variable: '--font-sans',
  display: 'swap',
});

// Display face for hero + section titles. Bolder, tighter tracking.
const displayFont = Space_Grotesk({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

// Generate static params for each locale so Next builds all three
// language versions at build time (fast first paint on Netlify).
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Next.js 14+ da viewport, themeColor va colorScheme alohida export.
// Chrome/Safari brauzer chrome (yuqori panel) rangi shu qiymatga qarab
// olinadi — mobil PWA vazyati brendga uyg'un ko'rinadi.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  colorScheme: 'light dark',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const alternates = buildAlternates('/', locale);
  return {
    title: {
      default: t('title'),
      template: `%s — ${SITE_NAME}`,
    },
    description: t('description'),
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    // Google Search Console va Yandex Webmaster tokenlarini sitangizni
    // tekshirtirgach shu yerga qo'yasiz — https://search.google.com va
    // https://webmaster.yandex.com dan olinadi.
    verification: {
      // google: 'YOUR_GOOGLE_VERIFICATION_TOKEN',
      // yandex: 'YOUR_YANDEX_VERIFICATION_TOKEN',
      // yahoo: 'YOUR_BING_VERIFICATION_TOKEN',
    },
    // Har sub-page o'zini o'zi override qiladi; bu default.
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: alternates.canonical,
      siteName: SITE_NAME,
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    alternates,
    icons: {
      icon: '/icon',
      apple: '/icon',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Enable static rendering for this locale — required when using
  // generateStaticParams + next-intl.
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${bodyFont.variable} ${displayFont.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-[color:var(--bg)] text-[color:var(--fg)]">
        {/*
          JSON-LD structured data — Organization + WebSite. Google/Yandex/Bing
          shu ma'lumot bilan Knowledge Panel + sitelinks searchbox chizadi.
          &lt;script&gt; xotirasiz — server-render bo'ladi va crawler ni sekinlashtirmaydi.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd()),
          }}
        />
        <NextIntlClientProvider messages={messages} locale={locale}>
          <LenisProvider />
          <Header />
          <main className="flex-1 pt-16 sm:pt-20">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
