import type { CSSProperties } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Aurora } from './aurora';
import { ArrowRightIcon } from './icons';
import { intro } from './motion/motion-props';

// Light beams fall along grid lines. The 64px grid is centred, so its
// lines sit at 50% − 32px ± n·64px.
const BEAMS = [
  { left: 'calc(50% - 416px)', dur: '7.5s', delay: '0.6s' },
  { left: 'calc(50% - 160px)', dur: '9s', delay: '2.8s' },
  { left: 'calc(50% + 96px)', dur: '6.8s', delay: '1.4s' },
  { left: 'calc(50% + 352px)', dur: '8.4s', delay: '3.6s' },
];

/// Full-viewport hero section. Server component: the whole entrance
/// (eyebrow drop, masked line rise, gradient sweep, CTA fade) is CSS,
/// so it plays at first paint without waiting for JavaScript. The
/// backdrop is aurora + masked grid + falling beams + a glowing horizon,
/// all decorative and transform/opacity-only.
export function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="bg-noise relative isolate -mt-16 flex min-h-[100svh] items-center overflow-hidden pt-16 sm:-mt-20 sm:pt-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <Aurora />
        <div className="hero-grid" />
        {BEAMS.map((b) => (
          <span
            key={b.left}
            className="beam hidden sm:block"
            style={{ left: b.left, '--dur': b.dur, '--delay': b.delay } as CSSProperties}
          />
        ))}
        <div className="horizon" />
      </div>

      <div className="container-page relative z-10 pb-32 pt-10 text-center sm:pb-40 sm:pt-14">
        {/* Eyebrow */}
        <div {...intro(0, 'down')} className="flex justify-center">
          <span className="beam-border relative inline-flex items-center gap-2.5 rounded-full border border-[color:var(--border-strong)] bg-[color:var(--bg-soft)]/60 px-4 py-1.5 backdrop-blur">
            <span aria-hidden="true" className="ping relative h-2 w-2 rounded-full bg-[color:var(--accent)]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--fg-soft)]">
              {t('eyebrow')}
            </span>
          </span>
        </div>

        {/* Title — each line rises out of its own mask */}
        <h1 className="mx-auto mt-8 max-w-6xl font-title font-semibold leading-[0.95] tracking-[-0.045em] text-[clamp(2.75rem,9vw,7rem)] text-balance">
          <span className="line-mask">
            <span className="line" style={{ '--intro-delay': '120ms' } as CSSProperties}>
              {t('titleLine1')}
            </span>
          </span>{' '}
          <span className="line-mask">
            <span className="line" style={{ '--intro-delay': '260ms' } as CSSProperties}>
              <span className="text-gradient hero-sweep">{t('titleLine2')}</span>
              <span
                aria-hidden="true"
                className="hero-dash ml-[0.18em] inline-block h-[0.085em] w-[0.42em] rounded-full bg-[color:var(--accent)] align-middle shadow-[0_0_24px_var(--accent-glow)]"
              />
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p
          {...intro(520)}
          className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-[color:var(--fg-soft)] text-pretty sm:text-lg"
        >
          {t('subtitle')}
        </p>

        {/* CTAs */}
        <div
          {...intro(660)}
          className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
        >
          <Link href="/projects" className="btn btn-primary h-12 px-7">
            {t('ctaPrimary')}
            <ArrowRightIcon size={16} className="btn-arrow" />
          </Link>
          <Link href="/about" className="btn btn-secondary h-12 px-7">
            {t('ctaSecondary')}
          </Link>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        aria-hidden="true"
        {...intro(1300, 'fade')}
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 [@media(min-height:720px)]:block"
      >
        <div className="flex h-9 w-6 justify-center rounded-full border border-white/25 pt-1.5">
          <span className="scroll-wheel h-2 w-0.5 rounded-full bg-white/60" />
        </div>
      </div>
    </section>
  );
}
