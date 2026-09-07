import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { AboutSection } from '@/components/about-section';
import { ValuesSection } from '@/components/values-section';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  // 'about' namespace ida `subtitle` yo'q, `body` bor — description
  // uchun body dan foydalanamiz (birinchi 155 char — Google search
  // snippet limit).
  const body = t('body');
  const description = body.length > 155 ? body.slice(0, 152).trimEnd() + '…' : body;
  return buildPageMetadata({
    path: '/about',
    locale,
    title: t('title'),
    description,
  });
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
