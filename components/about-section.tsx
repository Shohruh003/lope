import type { CSSProperties, ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { SectionHeading } from './section-heading';
import { CountUp } from './count-up';
import { FlagUz } from './flags';
import { Logo } from './brand-mark';
import { LayersIcon, PinIcon, UsersIcon } from './icons';
import { entrance } from './motion/motion-props';

/// About block. Left = heading + body copy + 3 stat cards (numbers count
/// up with CSS). Right = an "ecosystem" orbit: the Lope core with its
/// products circling it — a picture of "one brand, many possibilities".
/// On the About page it is the page title (`as="h1"`, `intro`).
export function AboutSection({
  as = 'h2',
  intro = false,
}: {
  as?: 'h1' | 'h2';
  intro?: boolean;
}) {
  const t = useTranslations('about');
  const base = intro ? 280 : 0;

  const stats: { key: string; icon: ReactNode; value: ReactNode }[] = [
    {
      key: 'products',
      icon: <LayersIcon size={16} />,
      value: <CountUp value={2} suffix="+" delay={base + 350} />,
    },
    {
      key: 'users',
      icon: <UsersIcon size={16} />,
      value: <CountUp value={100} suffix="+" delay={base + 450} />,
    },
    {
      key: 'country',
      icon: <PinIcon size={16} />,
      value: (
        <FlagUz
          title={t('stats.countryValue')}
          className="inline-block h-[0.7em] w-auto rounded-[4px] shadow-[0_0_0_1px_rgba(255,255,255,0.15)]"
        />
      ),
    },
  ];

  return (
    <section id="about" className="container-page relative overflow-x-clip py-20 sm:py-28">
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <SectionHeading eyebrow={t('eyebrow')} title={t('title')} as={as} intro={intro} />
          <p
            {...entrance(intro, base)}
            className="mt-6 max-w-2xl text-base leading-relaxed text-[color:var(--fg-soft)] text-pretty sm:text-lg"
          >
            {t('body')}
          </p>

          <dl className="mt-10 grid grid-cols-3 gap-2.5 sm:gap-4">
            {stats.map((s, i) => (
              // DOM order is dt → dd (valid <dl>); flex `order` shows the
              // number first. The icon lives in the dt, pinned top-right.
              <div
                key={s.key}
                {...entrance(intro, base + 80 + i * 90)}
                className="card flex flex-col p-4 pt-5 sm:p-6 sm:pt-16"
              >
                <dt className="order-2 mt-2.5 text-[11px] leading-snug text-[color:var(--fg-muted)] sm:text-sm">
                  <span
                    aria-hidden="true"
                    className="absolute left-6 top-5 hidden h-8 w-8 items-center justify-center rounded-lg border border-[color:var(--border)] text-[color:var(--accent-ink)] sm:inline-flex"
                  >
                    {s.icon}
                  </span>
                  {t(`stats.${s.key}`)}
                </dt>
                <dd className="order-1 font-title text-[clamp(1.75rem,4.4vw,3rem)] font-semibold leading-none tracking-tight">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-5" {...entrance(intro, base + 120, 'scale')}>
          <EcosystemOrbit />
        </div>
      </div>
    </section>
  );
}

/// Decorative orbit. Product labels repeat the nav copy, so the whole
/// figure is hidden from assistive tech.
function EcosystemOrbit() {
  const nav = useTranslations('nav');
  const track = (inset: string, dur: string, start: string) =>
    ({ inset, '--dur': dur, '--start': start }) as CSSProperties;

  return (
    <div aria-hidden="true" className="orbit isolate">
      <div className="orbit-ring orbit-ring-dashed" style={{ inset: '2%' }} />
      <div className="orbit-ring" style={{ inset: '12%' }} />
      <div className="orbit-ring" style={{ inset: '22%' }} />
      <div className="orbit-ring" style={{ inset: '32%' }} />
      <div className="absolute inset-[22%] rounded-full bg-[radial-gradient(closest-side,rgba(0,102,255,0.28),transparent)]" />

      <div className="orbit-core absolute left-1/2 top-1/2 flex h-[24%] w-[24%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[color:var(--border-strong)] bg-[color:var(--bg-soft)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_60px_-20px_rgba(0,102,255,0.8)]">
        <Logo size="sm" />
      </div>

      <div className="orbit-track" style={track('12%', '46s', '-38deg')}>
        <span className="orbit-node">
          <span className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[color:var(--border-strong)] bg-[color:var(--bg-elevated)] px-3 py-1.5 text-[11px] font-semibold text-[color:var(--fg)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.9)] sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--success)] shadow-[0_0_8px_var(--success)]" />
            {nav('style')}
          </span>
        </span>
      </div>
      <div className="orbit-track" style={track('22%', '34s', '140deg')}>
        <span className="orbit-node">
          <span className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[rgba(216,180,254,0.3)] bg-[color:var(--bg-elevated)] px-3 py-1.5 text-[11px] font-semibold text-[color:var(--store-ink)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.9)] sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--store)]" />
            {nav('store')}
          </span>
        </span>
      </div>
      <div className="orbit-track" style={track('32%', '24s', '250deg')}>
        <span className="orbit-node">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-dashed border-[color:var(--border-strong)] bg-[color:var(--bg)] text-sm text-[color:var(--fg-muted)]">
            +
          </span>
        </span>
      </div>
      <div className="orbit-track" style={track('2%', '70s', '200deg')}>
        <span className="orbit-node">
          <span className="block h-2 w-2 rounded-full bg-[color:var(--accent-ink)] shadow-[0_0_12px_var(--accent)]" />
        </span>
      </div>
    </div>
  );
}
