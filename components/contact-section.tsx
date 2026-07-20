'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { SectionHeading } from './section-heading';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactSection() {
  const t = useTranslations('contact');
  const tForm = useTranslations('contact.form');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [state, setState] = useState<'idle' | 'success' | 'error' | 'submitting'>('idle');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !EMAIL_RE.test(email) || message.trim().length < 5) {
      setState('error');
      return;
    }
    setState('submitting');
    // Netlify Forms: POST url-encoded body to `/` with `form-name` set
    // to the schema declared in `public/__forms.html`. Submissions land
    // in the Netlify UI under Forms → contact. Locally this 404s — that
    // is expected; the form only works on the deployed site.
    const body = new URLSearchParams({
      'form-name': 'contact',
      'bot-field': '',
      name,
      email,
      message,
    }).toString();
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      setState('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error('[contact] submit failed', err);
      setState('error');
    }
  }

  return (
    <section className="container-page py-24 sm:py-32">
      <SectionHeading
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        align="center"
      />

      <div className="mt-14 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 max-w-5xl mx-auto">
        {/* Info panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 flex flex-col gap-6"
        >
          <ContactItem
            label="Email"
            value={t('email')}
            href={`mailto:${t('email')}`}
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            }
          />
          <ContactItem
            label="Phone"
            value={t('phone')}
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
          <ContactItem
            label="Address"
            value={t('address')}
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 22s-7-7-7-13a7 7 0 0114 0c0 6-7 13-7 13z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            }
          />
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-soft)] p-6 sm:p-8 space-y-4"
        >
          <Field label={tForm('name')}>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (state !== 'idle') setState('idle');
              }}
              className="w-full h-11 px-4 rounded-lg bg-[color:var(--bg)] border border-[color:var(--border)] text-sm text-[color:var(--fg)] focus:outline-none focus:border-[color:var(--fg)] transition-colors"
            />
          </Field>
          <Field label={tForm('email')}>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (state !== 'idle') setState('idle');
              }}
              className="w-full h-11 px-4 rounded-lg bg-[color:var(--bg)] border border-[color:var(--border)] text-sm text-[color:var(--fg)] focus:outline-none focus:border-[color:var(--fg)] transition-colors"
            />
          </Field>
          <Field label={tForm('message')}>
            <textarea
              rows={5}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (state !== 'idle') setState('idle');
              }}
              className="w-full px-4 py-3 rounded-lg bg-[color:var(--bg)] border border-[color:var(--border)] text-sm text-[color:var(--fg)] focus:outline-none focus:border-[color:var(--fg)] transition-colors resize-none"
            />
          </Field>

          <div className="flex items-center gap-4 pt-2">
            <button
              type="submit"
              disabled={state === 'submitting'}
              className="h-11 px-6 rounded-full bg-[color:var(--fg)] text-[color:var(--bg)] text-sm font-semibold hover:bg-[color:var(--fg-soft)] transition-colors disabled:opacity-60"
            >
              {state === 'submitting' ? '…' : tForm('submit')}
            </button>

            <AnimatePresence mode="wait">
              {state === 'success' && (
                <motion.span
                  key="success"
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-green-400"
                >
                  {tForm('success')}
                </motion.span>
              )}
              {state === 'error' && (
                <motion.span
                  key="error"
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-red-400"
                >
                  {tForm('error')}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

function ContactItem({
  label,
  value,
  href,
  icon,
}: {
  label: string;
  value: string;
  href?: string;
  icon: React.ReactNode;
}) {
  const inner = (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 w-9 h-9 rounded-lg bg-[color:var(--bg-soft)] border border-[color:var(--border)] flex items-center justify-center text-[color:var(--fg-soft)]">
        {icon}
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-widest text-[color:var(--fg-muted)] font-semibold">
          {label}
        </div>
        <div className="mt-1 text-base text-[color:var(--fg)]">{value}</div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="hover:opacity-80 transition-opacity">
      {inner}
    </a>
  ) : (
    inner
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-widest text-[color:var(--fg-muted)] mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}
