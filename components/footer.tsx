import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Logo } from './brand-mark';
import { FlagUz } from './flags';
import { ArrowUpIcon, ExternalIcon, InstagramIcon, TelegramIcon } from './icons';
import { reveal } from './motion/motion-props';

// Seller identification for "LOPE" MChJ: e-commerce rules, the payment
// providers (Payme, CLICK) and Meta business verification expect the legal
// name, STIR and legal address on the company's website. STIR is public
// registry data. The address is a legal identifier, so it is not translated.
const COMPANY_TIN = '313294861';
const COMPANY_LEGAL_ADDRESS =
  "Namangan viloyati, Namangan tumani, Nurafshon, Beshkapa MFY, Paxtaobod ko'chasi, 326-uy";
const COMPANY_PHONE = '+998 94 272 07 05';
const COMPANY_PHONE_RAW = '+998942720705';
const COMPANY_EMAIL = 'hello@lope.uz';

// The Privacy Policy and Terms of Use of "LOPE" MChJ are published on
// lopestyle.uz; lope.uz has no pages of its own for them (the old relative
// /privacy and /terms links returned 404).
const PRIVACY_URL = 'https://lopestyle.uz/privacy';
const TERMS_URL = 'https://lopestyle.uz/terms';

type InternalHref = '/about' | '/contact' | '/style' | '/store';

/// Site footer: brand column (mark + tagline + socials) and 3 link groups
/// (Company, Products, Legal), then the company's legal details panel,
/// the copyright row and an oversized fading wordmark.
export function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const ui = useTranslations('ui');
  const contact = useTranslations('contact');

  return (
    <footer className="relative mt-12 overflow-hidden border-t border-[color:var(--border)] bg-[color:var(--bg-soft)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--accent-ink)] to-transparent opacity-70"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[64rem] max-w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,102,255,0.16),transparent)]"
      />

      <div className="container-page relative pt-16 sm:pt-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-5 lg:pr-10">
            <Link href="/" className="inline-flex rounded-full py-1 pr-2 transition-opacity hover:opacity-90" aria-label="Lope">
              <Logo size="md" />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-[color:var(--fg-soft)]">{t('tagline')}</p>
            <div className="mt-6 flex gap-2">
              <SocialLink href="https://instagram.com/lope.uz" label="Instagram">
                <InstagramIcon size={16} />
              </SocialLink>
              <SocialLink href="https://t.me/lopeuz" label="Telegram">
                <TelegramIcon size={16} />
              </SocialLink>
            </div>
          </div>

          {/* Company */}
          <FooterColumn title={t('sections.company')} className="lg:col-span-2">
            <FooterLink href="/about">{nav('about')}</FooterLink>
            <FooterLink href="/contact">{nav('contact')}</FooterLink>
          </FooterColumn>

          {/* Products */}
          <FooterColumn title={t('sections.products')} className="lg:col-span-2">
            <FooterLink href="/style">{nav('style')}</FooterLink>
            <FooterLink href="/store">{nav('store')}</FooterLink>
          </FooterColumn>

          {/* Legal */}
          <FooterColumn title={t('sections.legal')} className="col-span-2 sm:col-span-1 lg:col-span-3">
            <ExternalFooterLink href={PRIVACY_URL}>{t('links.privacy')}</ExternalFooterLink>
            <ExternalFooterLink href={TERMS_URL}>{t('links.terms')}</ExternalFooterLink>
          </FooterColumn>
        </div>

        {/* Legal details — must stay visible (Meta business verification,
            Payme / CLICK merchant requirements). */}
        <section
          aria-labelledby="legal-details"
          className="mt-14 rounded-3xl border border-[color:var(--border)] bg-[color:var(--bg)]/60 p-5 sm:p-7"
        >
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <h2 id="legal-details" className="text-sm font-semibold text-[color:var(--fg)]">
              {t('legal.name')}
            </h2>
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--fg-muted)]">
              {t('legal.heading')}
            </span>
          </div>
          <dl className="mt-5 grid grid-cols-1 gap-x-8 gap-y-4 text-sm sm:grid-cols-2 lg:grid-cols-[auto_minmax(0,1fr)_auto_auto]">
            <LegalItem label={t('legal.tin')}>
              <span className="font-mono tabular-nums tracking-wide text-[color:var(--fg)]">{COMPANY_TIN}</span>
            </LegalItem>
            <LegalItem label={t('legal.address')} className="sm:col-span-2 lg:col-span-1">
              {COMPANY_LEGAL_ADDRESS}
            </LegalItem>
            <LegalItem label={t('legal.phone')}>
              <a
                href={`tel:${COMPANY_PHONE_RAW}`}
                className="whitespace-nowrap transition-colors hover:text-[color:var(--fg)]"
              >
                {COMPANY_PHONE}
              </a>
            </LegalItem>
            <LegalItem label={contact('labels.email')}>
              <a href={`mailto:${COMPANY_EMAIL}`} className="transition-colors hover:text-[color:var(--fg)]">
                {COMPANY_EMAIL}
              </a>
            </LegalItem>
          </dl>
        </section>

        <div className="mt-8 flex flex-col gap-4 border-t border-[color:var(--border)] pt-6 text-xs text-[color:var(--fg-muted)] sm:flex-row sm:items-center sm:justify-between">
          <span>{t('copyright')}</span>
          <div className="flex items-center justify-between gap-6 sm:justify-end">
            <span className="inline-flex items-center gap-2 uppercase tracking-wider">
              <FlagUz className="h-2.5 w-auto rounded-[2px]" />
              Made in Uzbekistan
            </span>
            <a
              href="#top"
              className="group inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] px-3 py-1.5 font-medium text-[color:var(--fg-soft)] transition-colors hover:border-[color:var(--border-strong)] hover:text-[color:var(--fg)]"
            >
              {ui('backToTop')}
              <ArrowUpIcon size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="relative mt-6 select-none overflow-hidden">
        <div
          {...reveal(0, 'blur')}
          className="footer-wordmark -mb-[0.16em] text-center text-[clamp(7rem,30vw,24rem)]"
        >
          Lope
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  className = '',
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--fg-muted)]">
        {title}
      </h2>
      <ul className="space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: InternalHref; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="group inline-flex items-center gap-1.5 text-sm text-[color:var(--fg-soft)] transition-colors hover:text-[color:var(--fg)]"
      >
        <span className="h-px w-0 bg-[color:var(--accent-ink)] transition-all duration-300 group-hover:w-3" aria-hidden="true" />
        {children}
      </Link>
    </li>
  );
}

function ExternalFooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-1.5 text-sm text-[color:var(--fg-soft)] transition-colors hover:text-[color:var(--fg)]"
      >
        {children}
        <ExternalIcon
          size={13}
          className="opacity-50 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
        />
      </a>
    </li>
  );
}

function LegalItem({
  label,
  className = '',
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <dt className="text-xs text-[color:var(--fg-muted)]">{label}</dt>
      <dd className="mt-1 leading-relaxed text-[color:var(--fg-soft)]">{children}</dd>
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border)] text-[color:var(--fg-soft)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--accent)] hover:bg-[color:var(--accent-soft)] hover:text-[color:var(--accent-ink)] hover:shadow-[0_10px_30px_-10px_var(--accent-glow)]"
    >
      {children}
    </a>
  );
}
