'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SectionHeading } from './section-heading';

/// Projects showcase — 3 cards (Style, Store, Future placeholder).
/// Different sizes on desktop to give visual rhythm (Style = 8 cols
/// hero card, Store + Future = 4 cols each stacked). Mobile stacks
/// all three at full width.
export function ProjectsSection() {
  const t = useTranslations('projects');

  return (
    <section id="projects" className="container-page py-24 sm:py-32">
      <SectionHeading
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        align="center"
      />

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Style — hero card (spans 8 cols on desktop) */}
        <ProjectCard
          href="/style"
          tag={t('style.tag')}
          tagVariant="live"
          title={t('style.title')}
          subtitle={t('style.subtitle')}
          description={t('style.description')}
          cta={t('style.cta')}
          className="lg:col-span-8 min-h-[420px] sm:min-h-[480px]"
          gradient="from-[color:var(--accent)]/20 via-[color:var(--accent)]/5 to-transparent"
        />

        {/* Store — coming soon (spans 4 cols) */}
        <ProjectCard
          href="/store"
          tag={t('store.tag')}
          tagVariant="soon"
          title={t('store.title')}
          subtitle={t('store.subtitle')}
          description={t('store.description')}
          cta={t('store.cta')}
          className="lg:col-span-4 min-h-[420px] sm:min-h-[480px]"
          gradient="from-purple-500/20 via-purple-500/5 to-transparent"
        />

        {/* Future placeholder — spans full width on desktop */}
        <FuturePlaceholder
          tag={t('future.tag')}
          title={t('future.title')}
          subtitle={t('future.subtitle')}
          description={t('future.description')}
        />
      </div>
    </section>
  );
}

function ProjectCard({
  href,
  tag,
  tagVariant,
  title,
  subtitle,
  description,
  cta,
  className,
  gradient,
}: {
  href: '/style' | '/store';
  tag: string;
  tagVariant: 'live' | 'soon';
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  className?: string;
  gradient: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      <Link
        href={href}
        className="group relative flex flex-col justify-between h-full overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-soft)] p-8 sm:p-10 hover:border-[color:var(--border-strong)] transition-all"
      >
        {/* Colored gradient wash */}
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${gradient} opacity-70 group-hover:opacity-100 transition-opacity duration-500`}
        />

        {/* Grid pattern */}
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />

        <div className="relative">
          {/* Tag */}
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest ${
              tagVariant === 'live'
                ? 'bg-green-500/15 text-green-400 border border-green-500/30'
                : 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
            }`}
          >
            {tagVariant === 'live' && (
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            )}
            {tag}
          </span>

          <h3 className="mt-6 font-[family-name:var(--font-display)] font-bold tracking-tight text-[clamp(1.75rem,4vw,3rem)] leading-[1.05]">
            {title}
          </h3>
          <p className="mt-2 text-base sm:text-lg text-[color:var(--fg-soft)]">
            {subtitle}
          </p>
        </div>

        <div className="relative mt-8">
          <p className="text-sm text-[color:var(--fg-muted)] max-w-md leading-relaxed">
            {description}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--fg)] group-hover:text-[color:var(--accent)] transition-colors">
            {cta}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform group-hover:translate-x-1"
            >
              <path
                d="M6 3l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function FuturePlaceholder({
  tag,
  title,
  subtitle,
  description,
}: {
  tag: string;
  title: string;
  subtitle: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="lg:col-span-12 min-h-[200px] relative overflow-hidden rounded-2xl border border-dashed border-[color:var(--border-strong)] bg-[color:var(--bg-soft)]/40 p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      <div>
        <span className="inline-flex px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest bg-[color:var(--bg-elevated)] text-[color:var(--fg-muted)] border border-[color:var(--border)]">
          {tag}
        </span>
        <h3 className="mt-4 font-[family-name:var(--font-display)] font-bold text-2xl sm:text-3xl tracking-tight text-[color:var(--fg)]">
          {title} · <span className="text-[color:var(--fg-muted)]">{subtitle}</span>
        </h3>
        <p className="mt-2 text-sm text-[color:var(--fg-muted)] max-w-2xl">
          {description}
        </p>
      </div>
      <div className="flex-shrink-0 w-16 h-16 rounded-2xl border border-[color:var(--border-strong)] bg-[color:var(--bg)] flex items-center justify-center">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 5v14M5 12h14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </motion.div>
  );
}
