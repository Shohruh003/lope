import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { StyleHero } from '@/components/style-hero';
import { StyleFeatures } from '@/components/style-features';
import { Marquee } from '@/components/marquee';
import { CtaBand } from '@/components/cta-band';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'style.hero' });
  return buildPageMetadata({
    path: '/style',
    locale,
    title: t('title'),
    description: t('subtitle'),
  });
}

export default async function StylePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const features = await getTranslations({ locale, namespace: 'style.features.items' });
  const ui = await getTranslations({ locale, namespace: 'ui' });
  const ticker = ['booking', 'sms', 'panel', 'payments'].map((key) => features(`${key}.title`));

  return (
    <>
      <StyleHero />
      <Marquee items={ticker} pauseLabel={ui('pauseAnimation')} reverse duration={30} />
      <StyleFeatures />
      <CtaBand />
    </>
  );
}
