import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SectionHeading } from './section-heading';
import { CertificateGallery } from './certificate-gallery';
import { ArrowRightIcon, ShieldCheckIcon } from './icons';
import { reveal } from './motion/motion-props';

/// "Sertifikatlar va hujjatlar" — company documents.
/// `full` (About page): heading + document cards with lightbox.
/// `compact` (home): a short teaser with a fanned pair of documents that
/// open the same lightbox, plus a link to the full section.
export function CertificatesSection({ variant = 'full' }: { variant?: 'full' | 'compact' }) {
  const t = useTranslations('certificates');

  if (variant === 'compact') {
    return (
      <section id="documents" aria-labelledby="documents-title" className="container-page py-20 sm:py-28">
        <div
          {...reveal(0, 'scale')}
          className="card relative grid grid-cols-1 items-center gap-10 overflow-hidden p-7 sm:p-10 lg:grid-cols-2 lg:p-14"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-32 -top-32 -z-10 h-96 w-96 rounded-full bg-[radial-gradient(closest-side,rgba(0,102,255,0.22),transparent)]"
          />
          <div>
            <span className="eyebrow">
              <ShieldCheckIcon size={14} />
              {t('eyebrow')}
            </span>
            <h2
              id="documents-title"
              className="mt-5 font-title text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.05] tracking-tight text-balance"
            >
              <span className="text-gradient-soft">{t('title')}</span>
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[color:var(--fg-soft)] text-pretty sm:text-lg">
              {t('teaser')}
            </p>
            <Link href="/about#certificates" className="btn btn-secondary mt-8">
              {t('viewAll')}
              <ArrowRightIcon size={16} className="btn-arrow" />
            </Link>
          </div>
          <CertificateGallery variant="compact" />
        </div>
      </section>
    );
  }

  return (
    <section id="certificates" className="container-page scroll-mt-24 py-20 sm:py-28">
      <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
      <div className="mt-14">
        <CertificateGallery variant="full" />
      </div>
    </section>
  );
}
