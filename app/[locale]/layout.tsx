import '../globals.css';

import { Inter, Space_Grotesk } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { routing } from '@/i18n/routing';
import { LenisProvider } from '@/components/lenis-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('title'),
    description: t('description'),
    metadataBase: new URL('https://lope.uz'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: 'https://lope.uz',
      siteName: 'Lope',
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    alternates: {
      canonical: `https://lope.uz${locale === routing.defaultLocale ? '' : `/${locale}`}`,
      languages: {
        uz: 'https://lope.uz',
        ru: 'https://lope.uz/ru',
        en: 'https://lope.uz/en',
      },
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
