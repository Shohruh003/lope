import type { CSSProperties } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SectionHeading } from './section-heading';
import { PointerFx } from './motion/pointer-fx';
import { entrance } from './motion/motion-props';
import { ArrowRightIcon, CheckIcon, PlusIcon, SparkleIcon } from './icons';

/// Projects showcase — bento grid of the Lope family: Style (live, wide
/// card with an animated booking mock), Store (coming soon, purple) and a
/// placeholder for the next product. Product cards lift, tilt toward the
/// cursor and light up with a spotlight + gradient ring.
export function ProjectsSection({
  as = 'h2',
  intro = false,
}: {
  as?: 'h1' | 'h2';
  intro?: boolean;
}) {
  const t = useTranslations('projects');
  const base = intro ? 300 : 0;

  return (
    <section id="projects" className="container-page py-20 sm:py-28">
      <SectionHeading
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        align="center"
        as={as}
        intro={intro}
      />

      <PointerFx group tilt={4} className="mt-16 grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Lope Style — live */}
        <div {...entrance(intro, base, 'scale')} className="lg:col-span-7">
          <Link
            href="/style"
            data-fx=""
            className="card lift group relative flex h-full min-h-[500px] flex-col overflow-hidden p-7 sm:min-h-[540px] sm:p-10"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgba(0,102,255,0.35),transparent)] transition-transform duration-700 group-hover:scale-125"
            />
            <div className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-25" aria-hidden="true" />

            <div className="relative sm:max-w-[52%]">
              <span className="chip chip-live">
                <span className="ping relative h-1.5 w-1.5 rounded-full bg-[color:var(--success)]" aria-hidden="true" />
                {t('style.tag')}
              </span>
              <h3 className="mt-6 font-title text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.02] tracking-tight">
                {t('style.title')}
              </h3>
              <p className="mt-3 text-base text-[color:var(--fg-soft)] sm:text-lg">{t('style.subtitle')}</p>
            </div>

            <div className="relative mt-8 sm:mt-auto sm:max-w-[48%]">
              <p className="text-sm leading-relaxed text-[color:var(--fg-muted)]">{t('style.description')}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--fg)] transition-colors group-hover:text-[color:var(--accent-ink)]">
                {t('style.cta')}
                <ArrowRightIcon size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>

            <BookingMock />
          </Link>
        </div>

        {/* Lope Store — coming soon */}
        <div {...entrance(intro, base + 120, 'scale')} className="lg:col-span-5">
          <Link
            href="/store"
            data-fx=""
            className="card card-store lift group relative flex h-full min-h-[460px] flex-col overflow-hidden p-7 sm:min-h-[540px] sm:p-10"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-28 -right-20 -z-10 h-96 w-96 rounded-full bg-[radial-gradient(closest-side,rgba(192,132,252,0.32),transparent)] transition-transform duration-700 group-hover:scale-125"
            />
            <div className="relative">
              <span className="chip chip-soon">
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--store)]" aria-hidden="true" />
                {t('store.tag')}
              </span>
              <h3 className="mt-6 font-title text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.02] tracking-tight">
                {t('store.title')}
              </h3>
              <p className="mt-3 text-base text-[color:var(--fg-soft)] sm:text-lg">{t('store.subtitle')}</p>
            </div>

            <StoreMock />

            <div className="relative mt-auto">
              <p className="max-w-sm text-sm leading-relaxed text-[color:var(--fg-muted)]">
                {t('store.description')}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--fg)] transition-colors group-hover:text-[color:var(--store-ink)]">
                {t('store.cta')}
                <ArrowRightIcon size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </div>

        {/* Next project — placeholder */}
        <div {...entrance(intro, base + 200)} className="lg:col-span-12">
          <article
            data-fx=""
            className="card group relative flex min-h-[200px] flex-col gap-6 overflow-hidden border-transparent bg-[color:var(--bg-soft)]/40 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-10"
          >
            <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
              <rect
                width="100%"
                height="100%"
                rx="28"
                fill="none"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="2"
                strokeDasharray="6 6"
                className="dash-march"
              />
            </svg>
            <div className="relative">
              <span className="chip chip-plan">{t('future.tag')}</span>
              <h3 className="mt-4 font-title text-2xl font-semibold tracking-tight text-[color:var(--fg)] sm:text-3xl">
                {t('future.title')} · <span className="text-[color:var(--fg-muted)]">{t('future.subtitle')}</span>
              </h3>
              <p className="mt-2 max-w-2xl text-sm text-[color:var(--fg-muted)]">{t('future.description')}</p>
            </div>
            <div
              aria-hidden="true"
              className="relative flex h-16 w-16 flex-none items-center justify-center rounded-2xl border border-[color:var(--border-strong)] bg-[color:var(--bg)] text-[color:var(--fg-soft)] transition-transform duration-700 [transition-timing-function:var(--ease-spring)] group-hover:rotate-90"
            >
              <PlusIcon size={24} />
            </div>
          </article>
        </div>
      </PointerFx>
    </section>
  );
}

/// Decorative booking widget: date chips, time slots (one gets picked on
/// a loop) and an SMS confirmation toast. Language-neutral on purpose:
/// only times, numbers and skeleton lines.
function BookingMock() {
  const days = [12, 13, 14, 15, 16];
  const slots = ['09:30', '10:00', '10:30', '11:00', '11:30', '12:00'];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative -mb-16 mt-10 select-none sm:absolute sm:bottom-0 sm:right-0 sm:mb-0 sm:mt-0 sm:w-[min(330px,44%)] sm:translate-x-[6%] sm:translate-y-[8%] lg:w-[min(330px,46%)]"
    >
      <div className="rounded-[24px] border border-white/10 bg-[#0c0e13]/95 p-4 shadow-[0_30px_80px_-30px_rgba(0,0,0,1),0_0_0_1px_rgba(92,157,255,0.08)] transition-transform duration-700 group-hover:-translate-y-2 sm:p-5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[color:var(--accent)] shadow-[0_0_10px_var(--accent-glow)]" />
          <span className="h-2 w-20 rounded-full bg-white/15" />
          <span className="ml-auto h-6 w-6 rounded-full bg-gradient-to-br from-[#5c9dff] to-[#7b61ff] opacity-80" />
        </div>
        <div className="mt-4 grid grid-cols-5 gap-1.5">
          {days.map((d) => (
            <span
              key={d}
              className={`flex flex-col items-center rounded-xl border py-2 text-xs font-semibold tabular-nums ${
                d === 14
                  ? 'border-[rgba(92,157,255,0.6)] bg-[color:var(--accent-soft)] text-white'
                  : 'border-white/8 text-[color:var(--fg-muted)]'
              }`}
            >
              <span className="mb-1 h-1 w-3 rounded-full bg-current opacity-40" />
              {d}
            </span>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {slots.map((s, i) => (
            <span
              key={s}
              className={`slot py-2 text-center text-xs font-medium text-[color:var(--fg-soft)] ${i === 4 ? 'slot-pick' : ''} ${
                i === 1 ? 'opacity-40 line-through' : ''
              }`}
            >
              {s}
            </span>
          ))}
        </div>
        <div className="mt-4 flex h-10 items-center justify-center gap-2 rounded-xl bg-[color:var(--accent)] text-white shadow-[0_12px_30px_-12px_rgba(0,102,255,1)]">
          <CheckIcon size={16} />
          <span className="h-1.5 w-16 rounded-full bg-white/70" />
        </div>
      </div>

      <div className="toast-pop absolute -left-4 top-24 w-48 rounded-2xl border border-white/10 bg-[#11141b]/95 p-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,1)] backdrop-blur sm:-left-16">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--success)]/15 text-[color:var(--success)]">
            <CheckIcon size={13} />
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[color:var(--fg-muted)]">SMS</span>
          <span className="ml-auto text-[10px] tabular-nums text-[color:var(--fg-faint)]">11:30</span>
        </div>
        <span className="mt-2 block h-1.5 w-full rounded-full bg-white/15" />
        <span className="mt-1.5 block h-1.5 w-2/3 rounded-full bg-white/10" />
      </div>
    </div>
  );
}

/// Decorative "fashion" cluster for Lope Store: floating price tags and a
/// bag tile drifting at different rhythms.
function StoreMock() {
  const tags = [
    { className: 'left-[4%] top-[18%]', dur: '6s', delay: '0s', w: 'w-24' },
    { className: 'right-[2%] top-[6%]', dur: '7.5s', delay: '-2s', w: 'w-20' },
    { className: 'right-[10%] bottom-[8%]', dur: '6.8s', delay: '-4s', w: 'w-28' },
  ];
  return (
    <div aria-hidden="true" className="pointer-events-none relative my-8 h-44 select-none sm:h-52">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className="float-y flex h-24 w-24 items-center justify-center rounded-[28px] border border-[rgba(216,180,254,0.35)] bg-gradient-to-br from-[rgba(192,132,252,0.35)] to-[rgba(244,114,182,0.18)] text-[color:var(--store-ink)] shadow-[0_25px_60px_-20px_rgba(192,132,252,0.8)] transition-transform duration-700 group-hover:scale-110"
          style={{ '--dur': '5.5s' } as CSSProperties}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 8h14l-1 12a1.5 1.5 0 01-1.5 1.4h-9A1.5 1.5 0 016 20L5 8z" />
            <path d="M9 10V6.5a3 3 0 016 0V10" />
          </svg>
        </div>
      </div>
      {tags.map((tag, i) => (
        <div
          key={i}
          className={`float-y absolute ${tag.className}`}
          style={{ '--dur': tag.dur, '--delay': tag.delay } as CSSProperties}
        >
          <div className={`${tag.w} rounded-xl border border-white/10 bg-[#141018]/90 p-2.5 shadow-[0_15px_40px_-15px_rgba(0,0,0,1)]`}>
            <div className="flex items-center gap-1.5">
              <SparkleIcon size={12} className="text-[color:var(--store-ink)]" />
              <span className="h-1.5 flex-1 rounded-full bg-white/15" />
            </div>
            <span className="mt-2 block h-1.5 w-2/3 rounded-full bg-[rgba(216,180,254,0.35)]" />
          </div>
        </div>
      ))}
    </div>
  );
}
