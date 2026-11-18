import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { SectionHeading } from './section-heading';
import { PointerFx } from './motion/pointer-fx';
import { reveal } from './motion/motion-props';

const KEYS = ['booking', 'sms', 'panel', 'payments'] as const;

const ICONS: Record<(typeof KEYS)[number], ReactNode> = {
  booking: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  sms: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 6a2 2 0 012-2h12a2 2 0 012 2v9a2 2 0 01-2 2h-8l-4 4v-4H6a2 2 0 01-2-2V6z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
  panel: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 10h18M9 4v16" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  payments: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="6" width="20" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 11h20" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

/// Lope Style feature grid: four cards that stagger in, each with a
/// step number, an icon tile and a large watermark icon that drifts on
/// hover. Spotlight + ring follow the cursor across the grid.
export function StyleFeatures() {
  const t = useTranslations('style.features');
  const nav = useTranslations('nav');

  return (
    <section className="container-page py-20 sm:py-28">
      <SectionHeading eyebrow={nav('style')} title={t('title')} />

      <PointerFx group className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2">
        {KEYS.map((key, i) => (
          <div key={key} {...reveal(i * 90)}>
            <article data-fx="" className="card group relative h-full overflow-hidden p-6 sm:p-8">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-4 right-4 block origin-bottom-right scale-[3.6] text-white/[0.045] transition-transform duration-700 [transition-timing-function:var(--ease-out)] group-hover:-translate-x-2 group-hover:-translate-y-2 group-hover:rotate-[-8deg]"
              >
                {ICONS[key]}
              </span>
              <div className="flex items-center justify-between">
                <span className="icon-tile">{ICONS[key]}</span>
                <span aria-hidden="true" className="font-mono text-xs text-[color:var(--fg-faint)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-6 font-title text-lg font-semibold tracking-tight text-[color:var(--fg)] sm:text-xl">
                {t(`items.${key}.title`)}
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-[color:var(--fg-soft)]">
                {t(`items.${key}.body`)}
              </p>
            </article>
          </div>
        ))}
      </PointerFx>
    </section>
  );
}
