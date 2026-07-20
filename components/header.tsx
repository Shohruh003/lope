'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { BrandMark } from './brand-mark';
import { LanguageSwitcher } from './language-switcher';

/// Sticky glassy top header. Fades a subtle background in once the
/// user scrolls > 12px so the hero can breathe at the top. Mobile
/// nav is a slide-down sheet triggered by the hamburger.
export function Header() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/projects', label: t('projects') },
    { href: '/contact', label: t('contact') },
  ] as const;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-[color:var(--bg)]/70 backdrop-blur-xl border-b border-[color:var(--border)]'
          : 'bg-transparent'
      }`}
    >
      <div className="container-page flex items-center justify-between h-16 sm:h-20">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          aria-label="Lope"
        >
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-[color:var(--accent)] shadow-[0_0_16px_var(--accent-glow)]" />
          </div>
          <BrandMark size="sm" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink key={l.href} href={l.href}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden w-10 h-10 rounded-md border border-[color:var(--border)] flex items-center justify-center hover:bg-[color:var(--bg-elevated)] transition-colors"
          aria-label="Menu"
          aria-expanded={mobileOpen}
        >
          <div className="w-4 flex flex-col gap-[3px]">
            <span
              className={`h-[1.5px] bg-[color:var(--fg)] transition-transform ${
                mobileOpen ? 'rotate-45 translate-y-[4.5px]' : ''
              }`}
            />
            <span
              className={`h-[1.5px] bg-[color:var(--fg)] transition-opacity ${
                mobileOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`h-[1.5px] bg-[color:var(--fg)] transition-transform ${
                mobileOpen ? '-rotate-45 -translate-y-[4.5px]' : ''
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden border-t border-[color:var(--border)] bg-[color:var(--bg-soft)]"
          >
            <div className="container-page py-6 flex flex-col gap-1">
              {links.map((l) => (
                <MobileNavLink
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </MobileNavLink>
              ))}
              <div className="mt-4 pt-4 border-t border-[color:var(--border)]">
                <LanguageSwitcher variant="inline" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: '/' | '/about' | '/projects' | '/contact';
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-md ${
        active
          ? 'text-[color:var(--fg)]'
          : 'text-[color:var(--fg-soft)] hover:text-[color:var(--fg)]'
      }`}
    >
      {children}
      {active && (
        <motion.span
          layoutId="nav-underline"
          className="absolute left-3 right-3 -bottom-0.5 h-[2px] bg-[color:var(--accent)] rounded-full"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}
    </Link>
  );
}

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: '/' | '/about' | '/projects' | '/contact';
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center justify-between py-3 border-b border-[color:var(--border)] last:border-0 text-lg font-medium text-[color:var(--fg)] hover:text-[color:var(--accent)] transition-colors"
    >
      {children}
      <span className="text-[color:var(--fg-faint)]">→</span>
    </Link>
  );
}
