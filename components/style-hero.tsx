'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function StyleHero() {
  const t = useTranslations('style.hero');

  return (
    <section className="relative overflow-hidden container-page pt-32 sm:pt-40 pb-20 sm:pb-28">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[720px] rounded-full bg-[color:var(--accent)]/10 blur-3xl" />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-[color:var(--accent)]/10 text-[color:var(--accent)] border border-[color:var(--accent)]/30"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--accent)] animate-pulse" />
          {t('eyebrow')}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 font-[family-name:var(--font-display)] font-bold tracking-tight leading-[1.05] text-[clamp(2.25rem,6vw,4.5rem)]"
        >
          {t('title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-lg sm:text-xl text-[color:var(--fg-soft)] max-w-2xl mx-auto"
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="https://play.google.com/store/apps/details?id=uz.barberbook.mobile"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 h-12 rounded-full bg-[color:var(--fg)] text-[color:var(--bg)] text-sm font-semibold hover:bg-[color:var(--fg-soft)] transition-colors w-full sm:w-auto"
          >
            <svg width="18" height="20" viewBox="0 0 18 20" fill="currentColor">
              <path d="M1.5.5C1 .8.7 1.4.7 2v16c0 .6.3 1.2.8 1.5L10 10 1.5.5zm11.6 5.3L3.4 0l9.7 10-9.7 10 9.7-5.8 3.5-2c1.1-.6 1.1-2.4 0-3l-3.5-2.4z" />
            </svg>
            {t('downloadAndroid')}
          </a>
          <a
            href="https://apps.apple.com/app/id0000000000"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 h-12 rounded-full bg-[color:var(--bg-soft)] text-[color:var(--fg)] text-sm font-semibold border border-[color:var(--border)] hover:border-[color:var(--border-strong)] transition-colors w-full sm:w-auto"
          >
            <svg width="18" height="20" viewBox="0 0 18 20" fill="currentColor">
              <path d="M14.5 10.6c0-2.5 2-3.7 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.2.9-4 2.4-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3.1 2.4 1.2 0 1.7-.8 3.2-.8s1.9.8 3.2.8c1.3 0 2.2-1.2 3-2.3.9-1.3 1.3-2.6 1.4-2.7-.1 0-2.8-1.1-2.8-4.1zM12.1 3.5c.7-.8 1.1-2 1-3.1-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.6 2.9-1.4z" />
            </svg>
            {t('downloadIos')}
          </a>
          <a
            href="https://lopestyle.uz"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 h-12 rounded-full text-sm font-semibold text-[color:var(--fg-soft)] hover:text-[color:var(--fg)] transition-colors w-full sm:w-auto"
          >
            {t('website')}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M5 3h6v6M11 3L3 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
