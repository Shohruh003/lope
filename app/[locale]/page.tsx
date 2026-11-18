import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/hero';
import { Marquee } from '@/components/marquee';
import { AboutSection } from '@/components/about-section';
import { ValuesSection } from '@/components/values-section';
import { ProjectsSection } from '@/components/projects-section';
import { PartnersSection } from '@/components/partners-section';
import { CertificatesSection } from '@/components/certificates-section';
import { CtaBand } from '@/components/cta-band';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const nav = await getTranslations({ locale, namespace: 'nav' });
  const values = await getTranslations({ locale, namespace: 'values.items' });
  const ui = await getTranslations({ locale, namespace: 'ui' });

  // Products interleaved with the company values — all existing copy.
  const ticker = [
    nav('style'),
    values('innovation.title'),
    nav('store'),
    values('reliability.title'),
    values('local.title'),
    values('design.title'),
  ];

  return (
    <>
      <Hero />
      <Marquee items={ticker} pauseLabel={ui('pauseAnimation')} />
      <AboutSection />
      <ValuesSection />
      <ProjectsSection />
      <PartnersSection />
      <CertificatesSection variant="compact" />
      <CtaBand />
    </>
  );
}
