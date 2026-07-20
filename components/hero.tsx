'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

/// Full-viewport hero section. Big split-line title, subtle grid
/// background, animated brand dot + text reveal, two CTAs. Reads
/// premium on both a 320dp phone and a 4K monitor via
/// clamp()-based typography.
export function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-[calc(100svh-64px)] sm:min-h-[calc(100svh-80px)] flex items-center overflow-hidden bg-noise">
      {/* Layered background — grid + accent glow */}
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vmin] h-[80vmin] rounded-full bg-[color:var(--accent)] opacity-[0.08] blur-[120px] pointer-events-none" />

      <div className="container-page relative z-10 py-16 sm:py-24">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 rounded-full border border-[color:var(--border-strong)] bg-[color:var(--bg-soft)]/50 backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[color:var(--accent)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[color:var(--accent)]" />
          </span>
          <span className="text-xs uppercase tracking-widest text-[color:var(--fg-soft)]">
            {t('eyebrow')}
          </span>
        </motion.div>

        {/* Title */}
        <h1 className="font-[family-name:var(--font-display)] font-bold tracking-tighter leading-[0.9]">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.5rem,10vw,7.5rem)] text-[color:var(--fg)]"
          >
            {t('titleLine1')}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.5rem,10vw,7.5rem)] text-[color:var(--fg-soft)]"
          >
            {t('titleLine2')}
            <motion.span
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="inline-block w-[0.4em] h-[0.09em] ml-3 align-middle bg-[color:var(--accent)] origin-left"
            />
          </motion.div>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-2xl text-base sm:text-lg text-[color:var(--fg-soft)] leading-relaxed"
        >
          {t('subtitle')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col sm:flex-row gap-3"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[color:var(--accent)] text-white text-sm font-semibold hover:bg-[color:var(--accent-hover)] hover:shadow-[0_0_30px_var(--accent-glow)] transition-all"
          >
            {t('ctaPrimary')}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform group-hover:translate-x-0.5"
            >
              <path
                d="M6 3l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-full border border-[color:var(--border-strong)] text-sm font-semibold hover:bg-[color:var(--bg-elevated)] transition-all"
          >
            {t('ctaSecondary')}
          </Link>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[color:var(--fg-faint)] pointer-events-none"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-9 border border-[color:var(--fg-faint)] rounded-full flex items-start justify-center pt-1.5"
          >
            <div className="w-0.5 h-2 bg-[color:var(--fg-faint)] rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
