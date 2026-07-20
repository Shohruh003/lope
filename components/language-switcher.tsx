'use client';

import { useState, useTransition, useRef, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { motion, AnimatePresence } from 'framer-motion';

const LABELS: Record<string, { name: string; flag: string }> = {
  uz: { name: "O'zbekcha", flag: '🇺🇿' },
  ru: { name: 'Русский', flag: '🇷🇺' },
  en: { name: 'English', flag: '🇬🇧' },
};

/// Language picker used in the header (`variant="dropdown"`) and in
/// the mobile menu sheet (`variant="inline"` — renders as a row of
/// pills so users don't have to open a nested menu).
export function LanguageSwitcher({
  variant = 'dropdown',
}: {
  variant?: 'dropdown' | 'inline';
}) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const change = (next: string) => {
    if (next === locale) {
      setOpen(false);
      return;
    }
    startTransition(() => {
      // next-intl's typed router keeps the current pathname and
      // just swaps the locale prefix — no need to hand-craft URLs.
      router.replace(pathname, { locale: next as (typeof routing.locales)[number] });
      setOpen(false);
    });
  };

  if (variant === 'inline') {
    return (
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-[color:var(--fg-muted)] mr-2 self-center">
          {t('language')}:
        </span>
        {routing.locales.map((l) => {
          const active = l === locale;
          return (
            <button
              key={l}
              onClick={() => change(l)}
              disabled={isPending}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                active
                  ? 'bg-[color:var(--accent)] border-[color:var(--accent)] text-white'
                  : 'border-[color:var(--border)] text-[color:var(--fg-soft)] hover:border-[color:var(--border-strong)] hover:text-[color:var(--fg)]'
              }`}
            >
              <span className="mr-1.5">{LABELS[l].flag}</span>
              {LABELS[l].name}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 h-9 rounded-md border border-[color:var(--border)] hover:border-[color:var(--border-strong)] hover:bg-[color:var(--bg-elevated)] transition-all text-sm font-medium"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{LABELS[locale].flag}</span>
        <span className="uppercase tracking-wide text-xs">{locale}</span>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <path
            d="M1 1l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 mt-2 min-w-[180px] rounded-lg border border-[color:var(--border-strong)] bg-[color:var(--bg-soft)] backdrop-blur-xl shadow-2xl overflow-hidden"
            role="listbox"
          >
            {routing.locales.map((l) => {
              const active = l === locale;
              return (
                <button
                  key={l}
                  onClick={() => change(l)}
                  disabled={isPending}
                  role="option"
                  aria-selected={active}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                    active
                      ? 'bg-[color:var(--accent-soft)] text-[color:var(--accent)] font-semibold'
                      : 'text-[color:var(--fg-soft)] hover:bg-[color:var(--bg-elevated)] hover:text-[color:var(--fg)]'
                  }`}
                >
                  <span className="text-base">{LABELS[l].flag}</span>
                  <span className="flex-1 text-left">{LABELS[l].name}</span>
                  {active && (
                    <svg width="14" height="14" viewBox="0 0 14 14">
                      <path
                        d="M3 7l3 3 5-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
