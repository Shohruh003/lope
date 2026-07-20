'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

const KEYS = ['booking', 'sms', 'panel', 'payments'] as const;

const ICONS: Record<(typeof KEYS)[number], ReactNode> = {
  booking: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  sms: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 6a2 2 0 012-2h12a2 2 0 012 2v9a2 2 0 01-2 2h-8l-4 4v-4H6a2 2 0 01-2-2V6z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
  panel: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 10h18M9 4v16" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  payments: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="6" width="20" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 11h20" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

export function StyleFeatures() {
  const t = useTranslations('style.features');

  return (
    <section className="container-page py-24 sm:py-32">
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl font-[family-name:var(--font-display)] font-bold tracking-tight text-[clamp(1.75rem,4vw,3rem)] leading-[1.1]"
      >
        {t('title')}
      </motion.h2>

      <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {KEYS.map((key, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group relative overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-soft)] p-6 sm:p-8 hover:border-[color:var(--border-strong)] transition-colors"
          >
            <div className="w-11 h-11 rounded-xl bg-[color:var(--accent)]/10 text-[color:var(--accent)] flex items-center justify-center">
              {ICONS[key]}
            </div>
            <h3 className="mt-5 font-[family-name:var(--font-display)] font-semibold text-lg sm:text-xl text-[color:var(--fg)]">
              {t(`items.${key}.title`)}
            </h3>
            <p className="mt-2 text-sm text-[color:var(--fg-muted)] leading-relaxed">
              {t(`items.${key}.body`)}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
