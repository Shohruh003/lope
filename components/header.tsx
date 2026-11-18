'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from 'react';
import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Logo } from './brand-mark';
import { LanguageSwitcher } from './language-switcher';
import { lockScroll, unlockScroll } from '@/lib/scroll-lock';

type NavHref = '/' | '/about' | '/projects' | '/contact';

// Scroll position as an external store: no effect + setState needed, and
// the server snapshot keeps SSR markup stable ("not scrolled").
function subscribeScroll(onChange: () => void) {
  window.addEventListener('scroll', onChange, { passive: true });
  return () => window.removeEventListener('scroll', onChange);
}
const getScrolled = () => window.scrollY > 12;
const getServerScrolled = () => false;

/// Fixed header. At the top of the page it is transparent; once the page
/// scrolls a glass "capsule" fades in behind it (opacity/transform only,
/// so the bar never changes size). A thin CSS scroll-driven progress bar
/// tracks reading position. On mobile, a full-screen sheet with staggered
/// links; while it is open the page behind is inert and scroll-locked.
export function Header() {
  const t = useTranslations('nav');
  const ui = useTranslations('ui');
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(subscribeScroll, getScrolled, getServerScrolled);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const links: { href: NavHref; label: string }[] = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/projects', label: t('projects') },
    { href: '/contact', label: t('contact') },
  ];

  const closeMenu = useCallback((restoreFocus: boolean) => {
    setMenuOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // While the sheet is open: lock scroll, make the page behind it inert,
  // close on Escape or when the viewport grows past the mobile breakpoint.
  useEffect(() => {
    if (!menuOpen) return;
    lockScroll();
    const background = [document.getElementById('main-content'), document.querySelector('footer')];
    background.forEach((el) => el?.setAttribute('inert', ''));

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu(true);
    };
    const desktop = window.matchMedia('(min-width: 768px)');
    const onResize = () => {
      if (desktop.matches) closeMenu(false);
    };
    document.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onResize);

    return () => {
      unlockScroll();
      background.forEach((el) => el?.removeAttribute('inert'));
      document.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onResize);
    };
  }, [menuOpen, closeMenu]);

  return (
    <header
      className="site-header fixed inset-x-0 top-0 z-50"
      data-scrolled={scrolled}
      data-menu={menuOpen ? 'open' : 'closed'}
    >
      <div className="header-surface" aria-hidden="true" />
      <div className="scroll-progress" aria-hidden="true" />

      <div className="header-bar container-page relative flex h-16 items-center justify-between sm:h-20">
        <Link
          href="/"
          className="rounded-full py-2 pr-2 transition-opacity hover:opacity-90"
          aria-label="Lope"
          onClick={() => closeMenu(false)}
        >
          <Logo size="sm" />
        </Link>

        {/* Desktop nav */}
        <nav aria-label={ui('mainNav')} className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="nav-link"
              aria-current={pathname === l.href ? 'page' : undefined}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
        </div>

        {/* Mobile toggle */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="burger relative h-10 w-10 rounded-full border border-[color:var(--border)] bg-white/[0.03] transition-colors hover:bg-[color:var(--bg-elevated)] md:hidden"
          aria-label={menuOpen ? ui('menuClose') : ui('menuOpen')}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>

      {/* Mobile menu sheet */}
      <div
        id="mobile-menu"
        className="mobile-menu md:hidden"
        data-open={menuOpen}
        inert={!menuOpen}
      >
        <nav aria-label={ui('mainNav')} className="container-page flex min-h-full flex-col pb-10">
          <ul className="flex flex-col">
            {links.map((l, i) => (
              <li key={l.href} className="menu-item" style={{ '--i': i } as CSSProperties}>
                <Link
                  href={l.href}
                  onClick={() => closeMenu(false)}
                  aria-current={pathname === l.href ? 'page' : undefined}
                  className="group flex items-center justify-between border-b border-[color:var(--border)] py-5 font-title text-3xl font-semibold tracking-tight text-[color:var(--fg)] aria-[current=page]:text-[color:var(--accent-ink)]"
                >
                  {l.label}
                  <span
                    aria-hidden="true"
                    className="text-xl text-[color:var(--fg-faint)] transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="menu-item mt-8" style={{ '--i': links.length } as CSSProperties}>
            <LanguageSwitcher variant="inline" />
          </div>
        </nav>
      </div>
    </header>
  );
}
