import type { CSSProperties, ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Aurora } from './aurora';
import { StoreWaitlist } from './store-waitlist';
import { intro } from './motion/motion-props';

// Decorative fashion glyphs drifting around the hero.
const GLYPHS: { className: string; dur: string; delay: string; icon: ReactNode }[] = [
  {
    className: 'left-[6%] top-[18%] hidden sm:flex',
    dur: '7s',
    delay: '0s',
    icon: (
      <path d="M5 8h14l-1 12a1.5 1.5 0 01-1.5 1.4h-9A1.5 1.5 0 016 20L5 8zM9 10V6.5a3 3 0 016 0V10" />
    ),
  },
  {
    className: 'right-[7%] top-[22%] hidden sm:flex',
    dur: '8.5s',
    delay: '-3s',
    icon: <path d="M12 4a2 2 0 00-1 3.7V9L3 15.5A1 1 0 003.6 17h16.8a1 1 0 00.6-1.5L13 9" />,
  },
  {
    className: 'left-[12%] bottom-[16%] hidden md:flex',
    dur: '6.5s',
    delay: '-1.5s',
    icon: (
      <path d="M3 12V4h8l9 9-8 8-9-9zM7.5 7.5h.01" />
    ),
  },
  {
    className: 'right-[12%] bottom-[20%] hidden md:flex',
    dur: '7.8s',
    delay: '-4.5s',
    icon: <path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3z" />,
  },
];

/// Lope Store "coming soon" landing: purple/pink aurora, drifting fashion
/// glyphs, a gradient title and the waitlist form inside a glowing frame.
export function StoreHero() {
  const t = useTranslations('store.hero');

  return (
    <section className="relative isolate -mt-16 flex min-h-[100svh] items-center overflow-hidden pt-16 sm:-mt-20 sm:pt-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <Aurora variant="store" />
        <div className="hero-grid" />
        {GLYPHS.map((g, i) => (
          <div
            key={i}
            className={`float-y absolute h-16 w-16 items-center justify-center rounded-2xl border border-[rgba(216,180,254,0.2)] bg-[rgba(20,14,26,0.6)] text-[color:var(--store-ink)] shadow-[0_20px_50px_-20px_rgba(192,132,252,0.6)] backdrop-blur ${g.className}`}
            style={{ '--dur': g.dur, '--delay': g.delay } as CSSProperties}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              {g.icon}
            </svg>
          </div>
        ))}
      </div>

      <div className="container-page relative py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <div {...intro(0, 'down')} className="flex justify-center">
            <span className="eyebrow eyebrow-store">
              <span className="eyebrow-dot ping" aria-hidden="true" />
              {t('eyebrow')}
            </span>
          </div>

          <h1 className="mt-7 font-title font-semibold leading-[0.95] tracking-[-0.045em] text-[clamp(3.25rem,11vw,7.5rem)]">
            <span className="line-mask">
              <span className="line" style={{ '--intro-delay': '120ms' } as CSSProperties}>
                <span className="store-gradient hero-sweep">{t('title')}</span>
              </span>
            </span>
          </h1>

          <p
            {...intro(380)}
            className="mx-auto mt-7 max-w-2xl text-lg text-[color:var(--fg-soft)] text-pretty sm:text-xl"
          >
            {t('subtitle')}
          </p>

          <div {...intro(540, 'scale')} className="mx-auto mt-12 max-w-lg">
            <p className="mb-4 text-sm font-medium text-[color:var(--store-ink)]">{t('cta')}</p>
            <StoreWaitlist />
          </div>
        </div>
      </div>
    </section>
  );
}
