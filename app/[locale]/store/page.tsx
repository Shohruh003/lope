import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { StoreHero } from '@/components/store-hero';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'store.hero' });
  return { title: `${t('title')} — Lope` };
}

export default async function StorePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <StoreHero />;
}
