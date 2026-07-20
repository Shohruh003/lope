'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { StoreWaitlist } from './store-waitlist';

export function StoreHero() {
  const t = useTranslations('store.hero');

  return (
    <section className="relative overflow-hidden container-page pt-32 sm:pt-40 pb-24 sm:pb-32">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-pink-500/10 blur-3xl" />

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-purple-500/15 text-purple-300 border border-purple-500/30"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          {t('eyebrow')}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 font-[family-name:var(--font-display)] font-bold tracking-tight leading-[1.05] text-[clamp(2.5rem,8vw,5.5rem)]"
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
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 max-w-md mx-auto"
        >
          <StoreWaitlist />
        </motion.div>
      </div>
    </section>
  );
}
