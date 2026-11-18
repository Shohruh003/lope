'use client';

import { useId, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowRightIcon, CheckIcon } from './icons';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/// Client-only waitlist form. No backend yet — logs to console and shows
/// success state. When Store launches, POST to /api/waitlist or a Formspree
/// endpoint (whichever is cheaper to run on Netlify).
export function StoreWaitlist() {
  const t = useTranslations('store.waitlist');
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'success' | 'error'>('idle');
  const statusId = useId();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setState('error');
      return;
    }
    setState('success');
    console.info('[waitlist] captured', email);
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div
        className="beam-border relative flex flex-col gap-2 rounded-[28px] border border-[rgba(216,180,254,0.18)] bg-[rgba(14,10,18,0.75)] p-2 shadow-[0_30px_80px_-30px_rgba(192,132,252,0.55)] backdrop-blur transition-[border-color,box-shadow] focus-within:border-[rgba(216,180,254,0.55)] focus-within:ring-2 focus-within:ring-[rgba(216,180,254,0.45)] sm:flex-row sm:rounded-full"
        style={{ '--beam': 'var(--store-ink)' } as React.CSSProperties}
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state !== 'idle') setState('idle');
          }}
          placeholder={t('placeholder')}
          aria-label={t('placeholder')}
          aria-describedby={statusId}
          aria-invalid={state === 'error' ? true : undefined}
          autoComplete="email"
          className="h-12 flex-1 rounded-full bg-transparent px-5 text-sm text-[color:var(--fg)] placeholder:text-[color:var(--fg-muted)] focus:outline-none"
        />
        <button
          type="submit"
          className="btn h-12 bg-[color:var(--fg)] px-6 text-[color:var(--bg)] hover:bg-white"
        >
          {state === 'success' ? <CheckIcon size={16} /> : null}
          {t('button')}
          {state !== 'success' && <ArrowRightIcon size={16} className="btn-arrow" />}
        </button>
      </div>

      <p id={statusId} role="status" aria-live="polite" className="mt-3 min-h-5 text-sm">
        {state === 'success' && (
          <span key="success" data-intro="fade" className="text-[color:var(--success)]">
            {t('success')}
          </span>
        )}
        {state === 'error' && (
          <span key="error" data-intro="fade" className="text-[color:var(--danger)]">
            {t('error')}
          </span>
        )}
      </p>
    </form>
  );
}
