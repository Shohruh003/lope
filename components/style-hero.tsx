import type { CSSProperties } from 'react';
import { useTranslations } from 'next-intl';
import { Aurora } from './aurora';
import { AppleIcon, CalendarIcon, CheckIcon, ExternalIcon, PlayStoreIcon } from './icons';
import { intro } from './motion/motion-props';

/// Lope Style product hero: copy + store buttons on the left, an animated
/// phone mock-up of the booking flow on the right. Server component; the
/// entrance is CSS-only.
export function StyleHero() {
  const t = useTranslations('style.hero');
  const title = t('title');
  // "Lope Style — …" in every locale: highlight the product name.
  const dash = title.indexOf(' — ');
  const [name, rest] = dash > 0 ? [title.slice(0, dash), title.slice(dash)] : [title, ''];

  return (
    <section className="relative isolate -mt-16 overflow-hidden pt-16 sm:-mt-20 sm:pt-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <Aurora />
        <div className="hero-grid" />
      </div>

      <div className="container-page grid grid-cols-1 items-center gap-14 pb-20 pt-14 sm:pb-28 sm:pt-20 lg:grid-cols-12 lg:gap-8">
        <div className="text-center lg:col-span-7 lg:text-left">
          <div {...intro(0, 'down')} className="flex justify-center lg:justify-start">
            <span className="eyebrow">
              <span className="eyebrow-dot ping" aria-hidden="true" />
              {t('eyebrow')}
            </span>
          </div>

          <h1 className="mt-6 font-title font-semibold leading-[1.02] tracking-[-0.035em] text-[clamp(2.4rem,6.4vw,4.75rem)] text-balance">
            <span className="line-mask">
              <span className="line" style={{ '--intro-delay': '120ms' } as CSSProperties}>
                <span className="text-gradient hero-sweep">{name}</span>
                {rest && <span className="text-gradient-soft">{rest}</span>}
              </span>
            </span>
          </h1>

          <p
            {...intro(380)}
            className="mx-auto mt-6 max-w-xl text-lg text-[color:var(--fg-soft)] text-pretty sm:text-xl lg:mx-0"
          >
            {t('subtitle')}
          </p>

          <div
            {...intro(520)}
            className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start"
          >
            <a
              href="https://play.google.com/store/apps/details?id=uz.barberbook.mobile"
              target="_blank"
              rel="noreferrer"
              className="btn btn-light h-12 px-6"
            >
              <PlayStoreIcon size={17} />
              {t('downloadAndroid')}
            </a>
            <a
              href="https://apps.apple.com/us/app/lopestyle/id6761615021"
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary h-12 px-6"
            >
              <AppleIcon size={17} />
              {t('downloadIos')}
            </a>
            <a
              href="https://lopestyle.uz"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-[color:var(--fg-soft)] transition-colors hover:text-[color:var(--fg)]"
            >
              {t('website')}
              <ExternalIcon
                size={14}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </div>

        <div {...intro(300, 'scale')} className="lg:col-span-5">
          <PhoneMock />
        </div>
      </div>
    </section>
  );
}

/// Decorative phone running a booking flow: a time slot gets picked, the
/// confirm button glows and an SMS confirmation pops in — on a loop.
/// Language-neutral: times, digits and skeleton lines only.
function PhoneMock() {
  const days = [12, 13, 14, 15, 16];
  const slots = ['09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '14:00', '15:30', '16:00'];

  return (
    <div aria-hidden="true" className="relative mx-auto w-[min(300px,82vw)] select-none">
      <div className="absolute inset-[-12%] -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(0,102,255,0.45),transparent)]" />

      <div className="float-y" style={{ '--dur': '7s' } as CSSProperties}>
        <div className="rounded-[46px] border border-white/15 bg-[#06070a] p-2.5 shadow-[0_50px_120px_-40px_rgba(0,0,0,1),inset_0_1px_0_rgba(255,255,255,0.08)]">
          <div className="relative overflow-hidden rounded-[38px] bg-[#0b0d12] px-4 pb-5 pt-3">
            <div className="mx-auto h-6 w-24 rounded-full bg-black" />

            <div className="mt-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[color:var(--accent)] shadow-[0_0_10px_var(--accent-glow)]" />
              <span className="h-2 w-16 rounded-full bg-white/20" />
              <span className="ml-auto h-7 w-7 rounded-full bg-gradient-to-br from-[#5c9dff] to-[#7b61ff]" />
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] p-3">
              <span className="h-11 w-11 shrink-0 rounded-xl bg-gradient-to-br from-[#2a3550] to-[#141a28]" />
              <span className="flex-1">
                <span className="block h-2 w-24 rounded-full bg-white/25" />
                <span className="mt-2 block h-1.5 w-16 rounded-full bg-white/10" />
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[color:var(--accent-soft)] text-[color:var(--accent-ink)]">
                <CalendarIcon size={14} />
              </span>
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
                  className={`slot py-2 text-center text-[11px] font-medium text-[color:var(--fg-soft)] ${
                    i === 4 ? 'slot-pick' : ''
                  } ${i === 1 || i === 6 ? 'opacity-35 line-through' : ''}`}
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-4 flex h-11 items-center justify-center gap-2 rounded-2xl bg-[color:var(--accent)] text-white shadow-[0_14px_34px_-12px_rgba(0,102,255,1)]">
              <CheckIcon size={16} />
              <span className="h-1.5 w-20 rounded-full bg-white/70" />
            </div>
            <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-white/25" />
          </div>
        </div>
      </div>

      {/* SMS confirmation toast */}
      <div className="toast-pop absolute -left-6 top-[38%] w-52 rounded-2xl border border-white/10 bg-[#11141b]/95 p-3 shadow-[0_24px_60px_-20px_rgba(0,0,0,1)] backdrop-blur sm:-left-16">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[color:var(--success)]/15 text-[color:var(--success)]">
            <CheckIcon size={14} />
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[color:var(--fg-muted)]">SMS</span>
          <span className="ml-auto text-[10px] tabular-nums text-[color:var(--fg-faint)]">11:30</span>
        </div>
        <span className="mt-2.5 block h-1.5 w-full rounded-full bg-white/15" />
        <span className="mt-1.5 block h-1.5 w-2/3 rounded-full bg-white/10" />
      </div>

      {/* Revenue chip */}
      <div
        className="float-y absolute -right-4 bottom-[16%] rounded-2xl border border-white/10 bg-[#11141b]/95 p-3 shadow-[0_24px_60px_-20px_rgba(0,0,0,1)] backdrop-blur sm:-right-12"
        style={{ '--dur': '5.5s', '--delay': '-2s' } as CSSProperties}
      >
        <div className="flex h-10 items-end gap-1">
          {[40, 65, 50, 80, 95].map((h, i) => (
            <span
              key={i}
              className="w-2.5 rounded-sm bg-gradient-to-t from-[color:var(--accent)] to-[#7fb2ff]"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
