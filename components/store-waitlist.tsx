'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/// Client-only waitlist form. No backend yet — logs to console and shows
/// success state. When Store launches, POST to /api/waitlist or a Formspree
/// endpoint (whichever is cheaper to run on Netlify).
export function StoreWaitlist() {
  const t = useTranslations('store.waitlist');
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'success' | 'error'>('idle');

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
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state !== 'idle') setState('idle');
          }}
          placeholder={t('placeholder')}
          className="flex-1 h-12 px-4 rounded-full bg-[color:var(--bg-soft)] border border-[color:var(--border)] text-sm text-[color:var(--fg)] placeholder:text-[color:var(--fg-muted)] focus:outline-none focus:border-[color:var(--fg)] transition-colors"
          aria-label={t('placeholder')}
        />
        <button
          type="submit"
          className="h-12 px-6 rounded-full bg-[color:var(--fg)] text-[color:var(--bg)] text-sm font-semibold hover:bg-[color:var(--fg-soft)] transition-colors whitespace-nowrap"
        >
          {t('button')}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {state === 'success' && (
          <motion.p
            key="success"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-3 text-sm text-green-400"
          >
            {t('success')}
          </motion.p>
        )}
        {state === 'error' && (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-3 text-sm text-red-400"
          >
            {t('error')}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
