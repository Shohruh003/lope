'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

/// Shared "eyebrow + title + optional subtitle" heading block used
/// at the top of every content section. Reveals on scroll via
/// `whileInView`. Consistent typography across the site.
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  align?: 'left' | 'center';
}) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';
  return (
    <div className={`max-w-3xl ${alignClass}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`inline-flex items-center gap-2 mb-5 ${align === 'center' ? 'mx-auto' : ''}`}
      >
        <div className="h-px w-8 bg-[color:var(--accent)]" />
        <span className="text-xs uppercase tracking-widest text-[color:var(--accent)] font-semibold">
          {eyebrow}
        </span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        className="font-[family-name:var(--font-display)] font-bold tracking-tight text-[clamp(2rem,5vw,3.75rem)] leading-[1.05]"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 text-base sm:text-lg text-[color:var(--fg-soft)] leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
