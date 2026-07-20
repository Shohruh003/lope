import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/hero';
import { AboutSection } from '@/components/about-section';
import { ValuesSection } from '@/components/values-section';
import { ProjectsSection } from '@/components/projects-section';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <AboutSection />
      <ValuesSection />
      <ProjectsSection />
    </>
  );
}
