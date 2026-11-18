import { useTranslations } from 'next-intl';
import { SectionHeading } from './section-heading';
import { PointerFx } from './motion/pointer-fx';
import { reveal } from './motion/motion-props';

const ICONS = {
  innovation: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
      <path d="M18 15l.75 2.25L21 18l-2.25.75L18 21l-.75-2.25L15 18l2.25-.75L18 15z" />
    </svg>
  ),
  reliability: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l8 4v6c0 5-3.5 9.5-8 10-4.5-.5-8-5-8-10V6l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  local: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2c3 3 4.5 6.5 4.5 10s-1.5 7-4.5 10c-3-3-4.5-6.5-4.5-10S9 5 12 2z" />
    </svg>
  ),
  design: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l2.5 6 6.5.5-5 4.5 1.5 6.5L12 16l-5.5 3.5L8 13l-5-4.5L9.5 8 12 2z" />
    </svg>
  ),
};

const KEYS = ['innovation', 'reliability', 'local', 'design'] as const;

/// Values grid — 4 value cards. Each card: index, icon, title, body.
/// Cards stagger in on scroll; on hover a cursor-following spotlight and
/// gradient ring light up and the icon tile tips over.
export function ValuesSection() {
  const t = useTranslations('values');

  return (
    <section id="values" className="container-page py-20 sm:py-28">
      <SectionHeading eyebrow={t('eyebrow')} title={t('title')} align="center" />
      <PointerFx group className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {KEYS.map((key, i) => (
          <div key={key} {...reveal(i * 90)}>
            <article data-fx="" className="card group h-full p-6 sm:p-7">
              <div className="flex items-start justify-between">
                <span className="icon-tile">
                  <span className="block h-5 w-5" aria-hidden="true">
                    {ICONS[key]}
                  </span>
                </span>
                <span aria-hidden="true" className="font-mono text-xs text-[color:var(--fg-faint)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-7 font-title text-lg font-semibold tracking-tight text-[color:var(--fg)]">
                {t(`items.${key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--fg-soft)]">
                {t(`items.${key}.body`)}
              </p>
            </article>
          </div>
        ))}
      </PointerFx>
    </section>
  );
}
