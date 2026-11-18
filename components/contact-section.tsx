'use client';

import { useState, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SectionHeading } from './section-heading';
import { Aurora } from './aurora';
import { ArrowRightIcon, CheckIcon, MailIcon, PhoneIcon, PinIcon } from './icons';
import { intro } from './motion/motion-props';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RAW = '+998942720705';

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
    // Netlify Forms: POST url-encoded body to the static `/__forms.html`
    // registry page. POSTing to `/` gets swallowed by next-intl's proxy
    // (rewrites into the /uz locale) before Netlify's form handler can
    // intercept it — the static-file path skips the proxy entirely and
    // hands the request straight to Netlify's forms edge worker.
    // Submissions land in the Netlify UI under Forms → contact. Locally
    // this 404s — expected; the form only works on the deployed site.
    const body = new URLSearchParams({
      'form-name': 'contact',
      'bot-field': '',
      name,
      email,
      message,
    }).toString();
    try {
      const res = await fetch('/__forms.html', {
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

  const resetStatus = () => {
    if (state !== 'idle') setState('idle');
  };

  return (
    <section className="relative isolate -mt-16 overflow-hidden pt-16 sm:-mt-20 sm:pt-20">
      <Aurora variant="soft" className="-z-10 opacity-80" />
      <div className="container-page py-20 sm:py-28">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
          align="center"
          as="h1"
          intro
        />

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-5 lg:grid-cols-5 lg:gap-6">
          {/* Info panel */}
          <div className="flex flex-col gap-3 lg:col-span-2">
            <ContactItem
              delay={260}
              label={t('labels.email')}
              value={t('email')}
              href={`mailto:${t('email')}`}
              icon={<MailIcon size={18} />}
            />
            <ContactItem
              delay={340}
              label={t('labels.phone')}
              value={t('phone')}
              href={`tel:${PHONE_RAW}`}
              icon={<PhoneIcon size={18} />}
            />
            <ContactItem
              delay={420}
              label={t('labels.address')}
              value={t('address')}
              icon={<PinIcon size={18} />}
            />
          </div>

          {/* Form */}
          <form
            onSubmit={onSubmit}
            {...intro(360, 'scale')}
            className="card relative space-y-5 p-6 sm:p-8 lg:col-span-3"
          >
            <Field label={tForm('name')} htmlFor="contact-name">
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  resetStatus();
                }}
                aria-invalid={state === 'error' && !name.trim() ? true : undefined}
                className="field h-12 px-4"
              />
            </Field>
            <Field label={tForm('email')} htmlFor="contact-email">
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  resetStatus();
                }}
                aria-invalid={state === 'error' && !EMAIL_RE.test(email) ? true : undefined}
                className="field h-12 px-4"
              />
            </Field>
            <Field label={tForm('message')} htmlFor="contact-message">
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  resetStatus();
                }}
                aria-invalid={state === 'error' && message.trim().length < 5 ? true : undefined}
                className="field resize-none px-4 py-3"
              />
            </Field>

            <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={state === 'submitting'}
                aria-busy={state === 'submitting'}
                className="btn btn-primary h-12 px-7 disabled:cursor-progress disabled:opacity-70"
              >
                {state === 'submitting' ? (
                  <span
                    aria-hidden="true"
                    className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                  />
                ) : null}
                {tForm('submit')}
                {state !== 'submitting' && <ArrowRightIcon size={16} className="btn-arrow" />}
              </button>

              <p role="status" aria-live="polite" className="min-h-5 text-sm">
                {state === 'success' && (
                  <span key="success" data-intro="fade" className="inline-flex items-center gap-2 text-[color:var(--success)]">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[color:var(--success)]/15">
                      <CheckIcon size={12} />
                    </span>
                    {tForm('success')}
                  </span>
                )}
                {state === 'error' && (
                  <span key="error" data-intro="fade" className="text-[color:var(--danger)]">
                    {tForm('error')}
                  </span>
                )}
              </p>
            </div>

            {/* Consent notice: sending the form is consent to processing
                under the Privacy Policy (Law ZRU-547). */}
            <p className="text-xs leading-relaxed text-[color:var(--fg-muted)]">
              {tForm.rich('consent', {
                link: (chunks) => (
                  <Link
                    href="/privacy"
                    className="underline decoration-[color:var(--border-strong)] underline-offset-4 transition-colors hover:text-[color:var(--fg)] hover:decoration-[color:var(--accent-ink)]"
                  >
                    {chunks}
                  </Link>
                ),
              })}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function ContactItem({
  label,
  value,
  href,
  icon,
  delay,
}: {
  label: string;
  value: string;
  href?: string;
  icon: ReactNode;
  delay: number;
}) {
  const inner = (
    <>
      <span className="icon-tile shrink-0">{icon}</span>
      <span className="min-w-0">
        <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--fg-muted)]">
          {label}
        </span>
        <span className="mt-1 block break-words text-base text-[color:var(--fg)]">{value}</span>
      </span>
      {href && (
        <ArrowRightIcon
          size={16}
          className="ml-auto shrink-0 text-[color:var(--fg-faint)] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[color:var(--accent-ink)]"
        />
      )}
    </>
  );
  const className = 'card lift group flex items-center gap-4 p-5';
  return (
    <div {...intro(delay)}>
      {href ? (
        <a href={href} className={className}>
          {inner}
        </a>
      ) : (
        <div className={className}>{inner}</div>
      )}
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--fg-muted)]"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
