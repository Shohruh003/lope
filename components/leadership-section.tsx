import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { SectionHeading } from './section-heading';
import { PointerFx } from './motion/pointer-fx';
import { reveal } from './motion/motion-props';

/// "Rahbariyat" / Leadership — a single founder card on the About page.
/// The studio portrait (white background) sits in a framed panel that
/// unmasks from the top when scrolled into view.
export function LeadershipSection() {
  const t = useTranslations('leadership');

  return (
    <section id="leadership" className="container-page py-20 sm:py-28">
      <SectionHeading eyebrow={t('eyebrow')} title={t('title')} />

      <PointerFx group className="mt-14">
        <div {...reveal(0, 'scale')}>
          <article
            data-fx=""
            className="card group grid grid-cols-1 overflow-hidden md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
          >
            <div
              {...reveal(120, 'unmask')}
              className="relative aspect-[4/5] overflow-hidden md:aspect-auto md:min-h-[480px]"
            >
              <div className="unmask-inner absolute inset-0">
                <Image
                  src="/team/shoxruxbek-azimov.webp"
                  alt={t('person.photoAlt')}
                  fill
                  sizes="(min-width: 1280px) 480px, (min-width: 768px) 40vw, 100vw"
                  className="object-cover object-[50%_18%] transition-transform duration-[1.4s] [transition-timing-function:var(--ease-out)] group-hover:scale-[1.035]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_62%,rgba(10,10,10,0.45))] md:bg-none"
                />
              </div>
            </div>

            <div className="relative flex flex-col justify-center p-7 sm:p-10 lg:p-14">
              <svg
                aria-hidden="true"
                viewBox="0 0 48 36"
                className="absolute right-8 top-8 hidden h-10 w-auto text-[color:var(--accent)] opacity-25 sm:block"
              >
                <path
                  fill="currentColor"
                  d="M0 36V22.5C0 9.9 6.6 2.4 19.8 0l2 4.7C14.3 6.8 10.6 10.9 10.2 17H20v19H0zm27 0V22.5C27 9.9 33.6 2.4 46.8 0l2 4.7C41.3 6.8 37.6 10.9 37.2 17H47v19H27z"
                />
              </svg>
              <span className="eyebrow self-start">
                <span className="eyebrow-dot" aria-hidden="true" />
                {t('person.role')}
              </span>
              <h3 className="mt-5 font-title text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] tracking-tight">
                <span className="text-gradient-soft">{t('person.name')}</span>
              </h3>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-[color:var(--fg-soft)] text-pretty sm:text-lg">
                {t('person.bio')}
              </p>
              <div aria-hidden="true" className="mt-8 h-px w-24 bg-gradient-to-r from-[color:var(--accent-ink)] to-transparent" />
            </div>
          </article>
        </div>
      </PointerFx>
    </section>
  );
}
