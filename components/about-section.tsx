'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { SectionHeading } from './section-heading';

/// About block. Left = heading + body copy. Right = 3 stat cards.
/// Stat numbers are content-driven strings so we can render "2+"
/// / "100+" / "🇺🇿" without wiring up a number counter animation.
export function AboutSection() {
  const t = useTranslations('about');
  const stats = [
    { label: t('stats.products'), value: '2+' },
    { label: t('stats.users'), value: '100+' },
    { label: t('stats.country'), value: '🇺🇿' },
  ];

  return (
    <section id="about" className="container-page py-24 sm:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div className="lg:col-span-7">
          <SectionHeading eyebrow={t('eyebrow')} title={t('title')} />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-base sm:text-lg text-[color:var(--fg-soft)] leading-relaxed max-w-2xl"
          >
            {t('body')}
          </motion.p>
        </div>

        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-soft)] p-6 hover:border-[color:var(--border-strong)] transition-colors"
            >
              <div className="text-3xl sm:text-4xl font-[family-name:var(--font-display)] font-bold text-[color:var(--fg)]">
                {s.value}
              </div>
              <div className="mt-2 text-sm text-[color:var(--fg-muted)]">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
