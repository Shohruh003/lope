import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { AboutSection } from '@/components/about-section';
import { ValuesSection } from '@/components/values-section';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return { title: `${t('title')} — Lope` };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <AboutSection />
      <ValuesSection />
    </>
  );
}
