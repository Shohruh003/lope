'use client';

import { useEffect, useId, useRef, useState, useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { FLAGS } from './flags';

type AppLocale = (typeof routing.locales)[number];

const LABELS: Record<AppLocale, string> = {
  uz: "O'zbekcha",
  ru: 'Русский',
  en: 'English',
};

/// Language picker used in the header (`variant="dropdown"`) and in
/// the mobile menu sheet (`variant="inline"` — renders as a row of
/// pills so users don't have to open a nested menu). Flags are inline
/// SVGs because emoji flags render as letters on Windows.
export function LanguageSwitcher({
  variant = 'dropdown',
}: {
  variant?: 'dropdown' | 'inline';
}) {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const change = (next: AppLocale) => {
    if (next === locale) {
      setOpen(false);
      return;
    }
    startTransition(() => {
      // next-intl's typed router keeps the current pathname and
      // just swaps the locale prefix — no need to hand-craft URLs.
      router.replace(pathname, { locale: next });
      setOpen(false);
    });
  };

  if (variant === 'inline') {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 text-sm text-[color:var(--fg-muted)]">{t('language')}:</span>
        {routing.locales.map((l) => {
          const active = l === locale;
          const Flag = FLAGS[l];
          return (
            <button
              key={l}
              type="button"
              onClick={() => change(l)}
              disabled={isPending}
              aria-current={active ? 'true' : undefined}
              lang={l}
              className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors ${
                active
                  ? 'border-[color:var(--accent)] bg-[color:var(--accent)] text-white'
                  : 'border-[color:var(--border)] text-[color:var(--fg-soft)] hover:border-[color:var(--border-strong)] hover:text-[color:var(--fg)]'
              }`}
            >
              <Flag className="h-3 w-[18px] rounded-[2px]" />
              {LABELS[l]}
            </button>
          );
        })}
      </div>
    );
  }

  const CurrentFlag = FLAGS[locale];

  return (
    <div className="relative" ref={ref}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 items-center gap-2 rounded-full border border-[color:var(--border)] bg-white/[0.03] px-3 text-sm font-medium transition-colors hover:border-[color:var(--border-strong)] hover:bg-[color:var(--bg-elevated)]"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`${t('language')}: ${LABELS[locale]}`}
      >
        <CurrentFlag className="h-3 w-[18px] rounded-[2px]" />
        <span className="text-xs uppercase tracking-wide">{locale}</span>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          aria-hidden="true"
          className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
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

      <div
        id={panelId}
        className="lang-panel absolute right-0 mt-2 min-w-[190px] overflow-hidden rounded-2xl border border-[color:var(--border-strong)] bg-[color:var(--bg-soft)]/95 p-1.5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl"
        data-open={open}
        inert={!open}
      >
        <ul>
          {routing.locales.map((l) => {
            const active = l === locale;
            const Flag = FLAGS[l];
            return (
              <li key={l}>
                <button
                  type="button"
                  onClick={() => change(l)}
                  disabled={isPending}
                  aria-current={active ? 'true' : undefined}
                  lang={l}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                    active
                      ? 'bg-[color:var(--accent-soft)] font-semibold text-[color:var(--accent-ink)]'
                      : 'text-[color:var(--fg-soft)] hover:bg-[color:var(--bg-elevated)] hover:text-[color:var(--fg)]'
                  }`}
                >
                  <Flag className="h-3.5 w-[21px] rounded-[2px]" />
                  <span className="flex-1 text-left">{LABELS[l]}</span>
                  {active && (
                    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
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
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
