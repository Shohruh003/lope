import type { ReactNode } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SectionHeading } from './section-heading';
import { PointerFx } from './motion/pointer-fx';
import { reveal } from './motion/motion-props';
import { ArrowRightIcon, HandshakeIcon, PaymentIcon } from './icons';

type PartnerRole = 'payment';

type PartnerLogo = {
  /** Variant for dark backgrounds — the site is dark-only, so this is the one rendered. */
  src: string;
  /** Variant for light backgrounds, kept for a future light theme. */
  srcOnLight?: string;
  /** Intrinsic SVG size (from its viewBox), used for the aspect ratio. */
  width: number;
  height: number;
  /** Rendered height in px (28–36 keeps different marks visually balanced). */
  displayHeight: number;
};

type Partner = {
  id: string;
  name: string;
  role: PartnerRole;
  /** Optional: partners without a logo file render as a clean text card. */
  logo?: PartnerLogo;
};

/// Partners of "LOPE" MChJ. LOPE has signed merchant agreements with both
/// payment systems. Logo files are the official marks from the partners'
/// own servers (public/partners). To add a partner: append an entry here
/// (logo optional) and, if it has a new role, add `partners.roles.<role>`
/// to all three message files.
const PARTNERS: Partner[] = [
  {
    id: 'payme',
    name: 'Payme',
    role: 'payment',
    logo: { src: '/partners/payme.svg', width: 58, height: 20, displayHeight: 30 },
  },
  {
    id: 'click',
    name: 'CLICK',
    role: 'payment',
    logo: {
      src: '/partners/click-on-dark.svg',
      srcOnLight: '/partners/click-on-light.svg',
      width: 157,
      height: 40,
      displayHeight: 32,
    },
  },
];

const ROLE_ICONS: Record<PartnerRole, ReactNode> = {
  payment: <PaymentIcon size={18} />,
};

export function PartnersSection() {
  const t = useTranslations('partners');
  const nav = useTranslations('nav');

  return (
    <section id="partners" className="container-page py-20 sm:py-28">
      <SectionHeading
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        align="center"
      />

      <PointerFx group className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PARTNERS.map((p, i) => (
          <div key={p.id} {...reveal(i * 100, 'scale')}>
            <article data-fx="" className="card lift group flex h-full flex-col p-6 sm:p-7">
              <div className="relative flex h-28 items-center justify-center overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[linear-gradient(160deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))]">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_120%,rgba(0,102,255,0.22),transparent)] opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                />
                {p.logo ? (
                  <Image
                    src={p.logo.src}
                    alt={p.name}
                    width={p.logo.width}
                    height={p.logo.height}
                    unoptimized
                    className="relative transition-transform duration-500 [transition-timing-function:var(--ease-spring)] group-hover:scale-110"
                    style={{ height: p.logo.displayHeight, width: 'auto' }}
                  />
                ) : (
                  <span className="relative font-title text-3xl font-semibold tracking-tight">{p.name}</span>
                )}
              </div>
              <div className="mt-5 flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-title text-lg font-semibold tracking-tight text-[color:var(--fg)]">{p.name}</h3>
                  <p className="mt-0.5 text-sm text-[color:var(--fg-muted)]">{t(`roles.${p.role}`)}</p>
                </div>
                <span className="icon-tile h-10 w-10 rounded-xl">{ROLE_ICONS[p.role]}</span>
              </div>
            </article>
          </div>
        ))}

        {/* Invitation card */}
        <div {...reveal(PARTNERS.length * 100, 'scale')} className="sm:col-span-2 lg:col-span-1">
          <Link
            href="/contact"
            data-fx=""
            className="card lift group flex h-full min-h-[220px] flex-col justify-between border-dashed bg-transparent p-6 sm:p-7"
          >
            <span className="icon-tile">
              <HandshakeIcon size={20} />
            </span>
            <div className="mt-6">
              <h3 className="font-title text-lg font-semibold tracking-tight text-[color:var(--fg)]">{t('cta.title')}</h3>
              <p className="mt-1 text-sm text-[color:var(--fg-muted)]">{t('cta.body')}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--accent-ink)]">
                {nav('contact')}
                <ArrowRightIcon size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </div>
      </PointerFx>
    </section>
  );
}
