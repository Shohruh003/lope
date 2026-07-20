import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { BrandMark } from './brand-mark';

/// Site footer with 4 columns on desktop, stacked on mobile.
/// Brand column (mark + tagline + socials) plus 3 link groups
/// (Company, Products, Legal).
export function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');

  return (
    <footer className="mt-32 border-t border-[color:var(--border)] bg-[color:var(--bg-soft)]">
      <div className="container-page py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1 sm:col-span-2 lg:pr-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity"
            >
              <div className="w-2 h-2 rounded-full bg-[color:var(--accent)]" />
              <BrandMark size="md" />
            </Link>
            <p className="text-sm text-[color:var(--fg-soft)] max-w-xs">
              {t('tagline')}
            </p>
            <div className="flex gap-2 mt-6">
              <SocialLink
                href="https://instagram.com/lope.uz"
                label="Instagram"
              >
                <InstagramIcon />
              </SocialLink>
              <SocialLink href="https://t.me/lopeuz" label="Telegram">
                <TelegramIcon />
              </SocialLink>
            </div>
          </div>

          {/* Company */}
          <FooterColumn title={t('sections.company')}>
            <FooterLink href="/about">{nav('about')}</FooterLink>
            <FooterLink href="/contact">{nav('contact')}</FooterLink>
          </FooterColumn>

          {/* Products */}
          <FooterColumn title={t('sections.products')}>
            <FooterLink href="/style">{nav('style')}</FooterLink>
            <FooterLink href="/store">{nav('store')}</FooterLink>
          </FooterColumn>

          {/* Legal */}
          <FooterColumn title={t('sections.legal')}>
            <FooterLink href="/privacy">{t('links.privacy')}</FooterLink>
            <FooterLink href="/terms">{t('links.terms')}</FooterLink>
          </FooterColumn>
        </div>

        <div className="mt-16 pt-8 border-t border-[color:var(--border)] flex flex-col sm:flex-row justify-between gap-3 text-xs text-[color:var(--fg-muted)]">
          <span>{t('copyright')}</span>
          <span className="tracking-wider uppercase">Made in Uzbekistan</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-xs uppercase tracking-widest text-[color:var(--fg-muted)] mb-4">
        {title}
      </h3>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const HrefLink: any = Link;
  return (
    <li>
      <HrefLink
        href={href}
        className="text-sm text-[color:var(--fg-soft)] hover:text-[color:var(--fg)] transition-colors"
      >
        {children}
      </HrefLink>
    </li>
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
      className="w-9 h-9 flex items-center justify-center rounded-md border border-[color:var(--border)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] hover:bg-[color:var(--accent-soft)] transition-all"
    >
      {children}
    </a>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm3.94 7.28L7.7 12.49c-.56.22-.56.55-.1.7l2.1.66 4.87-3.07c.23-.14.44-.06.27.09l-3.94 3.56-.15 2.27c.22 0 .32-.1.44-.22l1.06-1.03 2.2 1.62c.4.22.7.11.8-.38l1.44-6.77c.15-.6-.22-.88-.65-.66z" />
    </svg>
  );
}
