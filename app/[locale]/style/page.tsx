import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { StyleHero } from '@/components/style-hero';
import { StyleFeatures } from '@/components/style-features';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'style.hero' });
  return { title: `${t('title')} — Lope` };
}

export default async function StylePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <StyleHero />
      <StyleFeatures />
    </>
  );
}
