import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Aurora } from './aurora';
import { ArrowRightIcon, MailIcon } from './icons';
import { reveal } from './motion/motion-props';

const EMAIL = 'support@lopestyle.uz';

/// Closing call-to-action panel. Reuses the existing contact copy
/// (title + subtitle) so no new marketing text is introduced.
export function CtaBand() {
  const t = useTranslations('contact');
  const nav = useTranslations('nav');

  return (
    <section className="container-page py-20 sm:py-28">
      <div
        {...reveal(0, 'scale')}
        className="relative isolate overflow-hidden rounded-[32px] border border-[color:var(--border)] bg-[color:var(--bg-soft)] px-6 py-14 text-center sm:px-12 sm:py-20"
      >
        <Aurora variant="soft" />
        <div className="hero-grid opacity-60" aria-hidden="true" />
        <div className="relative">
          <span className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            {t('eyebrow')}
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl font-title font-semibold tracking-tight text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.05] text-balance">
            <span className="text-gradient-soft">{t('title')}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base sm:text-lg text-[color:var(--fg-soft)] text-pretty">
            {t('subtitle')}
          </p>
          <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link href="/contact" className="btn btn-primary">
              {nav('contact')}
              <ArrowRightIcon size={16} className="btn-arrow" />
            </Link>
            <a href={`mailto:${EMAIL}`} className="btn btn-secondary">
              <MailIcon size={16} />
              {EMAIL}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
