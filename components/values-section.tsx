'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { SectionHeading } from './section-heading';

const ICONS = {
  innovation: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
      <path d="M18 15l.75 2.25L21 18l-2.25.75L18 21l-.75-2.25L15 18l2.25-.75L18 15z" />
    </svg>
  ),
  reliability: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l8 4v6c0 5-3.5 9.5-8 10-4.5-.5-8-5-8-10V6l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  local: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2c3 3 4.5 6.5 4.5 10s-1.5 7-4.5 10c-3-3-4.5-6.5-4.5-10S9 5 12 2z" />
    </svg>
  ),
  design: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l2.5 6 6.5.5-5 4.5 1.5 6.5L12 16l-5.5 3.5L8 13l-5-4.5L9.5 8 12 2z" />
    </svg>
  ),
};

/// Values grid — 4 value cards. Each card: icon + title + body.
/// Hover state adds a subtle accent glow so mouse users get a
/// tactile sense of interactivity even though cards are non-linked.
export function ValuesSection() {
  const t = useTranslations('values');
  const items: {
    key: keyof typeof ICONS;
  }[] = [
    { key: 'innovation' },
    { key: 'reliability' },
    { key: 'local' },
    { key: 'design' },
  ];

  return (
    <section id="values" className="container-page py-24 sm:py-32">
      <SectionHeading
        eyebrow={t('eyebrow')}
        title={t('title')}
        align="center"
      />
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item, i) => (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              duration: 0.6,
              delay: i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="group relative overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-soft)] p-6 hover:border-[color:var(--accent)]/50 hover:bg-[color:var(--bg-elevated)] transition-all"
          >
            {/* Accent glow on hover */}
            <div className="pointer-events-none absolute -top-24 -right-24 w-48 h-48 bg-[color:var(--accent)] opacity-0 blur-3xl group-hover:opacity-30 transition-opacity duration-500" />

            <div className="relative">
              <div className="w-11 h-11 rounded-xl bg-[color:var(--accent-soft)] text-[color:var(--accent)] flex items-center justify-center mb-4">
                <div className="w-5 h-5">{ICONS[item.key]}</div>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {t(`items.${item.key}.title`)}
              </h3>
              <p className="text-sm text-[color:var(--fg-soft)] leading-relaxed">
                {t(`items.${item.key}.body`)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
