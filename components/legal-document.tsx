import type { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import {
  COMPANY_EMAIL,
  COMPANY_LEGAL_ADDRESS,
  COMPANY_PHONE,
  COMPANY_PHONE_RAW,
  COMPANY_TIN,
} from '@/lib/company';
import { LEGAL_UPDATED, type LegalBlock, type LegalDocument } from '@/lib/legal/types';
import { Aurora } from './aurora';
import { ArrowRightIcon, BuildingIcon, CalendarIcon } from './icons';
import { intro } from './motion/motion-props';

const LINK_CLASS =
  'font-medium text-[color:var(--fg)] underline decoration-[color:var(--border-strong)] underline-offset-4 transition-colors hover:decoration-[color:var(--accent-ink)]';

/// Inline links inside legal text: `[label](href)`, an email address, or a
/// "+998 XX XXX XX XX" phone number.
const INLINE_RE = /\[([^\]]+)\]\(([^)\s]+)\)|([\w.+-]+@[\w-]+(?:\.[\w-]+)+)|(\+998 \d{2} \d{3} \d{2} \d{2})/g;

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let cursor = 0;
  for (const match of text.matchAll(INLINE_RE)) {
    const start = match.index ?? 0;
    if (start > cursor) nodes.push(text.slice(cursor, start));
    const [whole, label, href, email, phone] = match;
    if (label !== undefined && href !== undefined) {
      nodes.push(
        href.startsWith('/') ? (
          <Link key={start} href={href} className={LINK_CLASS}>
            {label}
          </Link>
        ) : (
          <a key={start} href={href} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
            {label}
          </a>
        ),
      );
    } else if (email !== undefined) {
      nodes.push(
        <a key={start} href={`mailto:${email}`} className={LINK_CLASS}>
          {email}
        </a>,
      );
    } else if (phone !== undefined) {
      nodes.push(
        <a key={start} href={`tel:${phone.replace(/\s+/g, '')}`} className={`${LINK_CLASS} whitespace-nowrap`}>
          {phone}
        </a>,
      );
    }
    cursor = start + whole.length;
  }
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

function Block({ block }: { block: LegalBlock }) {
  if (typeof block === 'string') return <p>{renderInline(block)}</p>;
  return (
    // role="list" keeps list semantics in Safari, which drops them when
    // list-style is none.
    <ul role="list" className="space-y-2.5">
      {block.list.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            aria-hidden="true"
            className="mt-[0.68em] h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent-ink)]"
          />
          <span>{renderInline(item)}</span>
        </li>
      ))}
    </ul>
  );
}

/// Full page for a lope.uz legal document (Privacy Policy, Terms of Use):
/// title block with the edition date, a table of contents (sticky on
/// desktop), the numbered sections, the company's legal details and a
/// link to the other document.
export async function LegalDocumentView({
  doc,
  locale,
  related,
}: {
  doc: LegalDocument;
  locale: string;
  related: 'privacy' | 'terms';
}) {
  const t = await getTranslations({ locale, namespace: 'legal' });
  const footer = await getTranslations({ locale, namespace: 'footer' });
  const contact = await getTranslations({ locale, namespace: 'contact' });

  const updated = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Tashkent',
  }).format(new Date(`${LEGAL_UPDATED}T12:00:00+05:00`));

  return (
    <article className="relative isolate -mt-16 overflow-hidden pt-16 sm:-mt-20 sm:pt-20">
      <Aurora variant="soft" className="-z-10 opacity-60" />
      <div className="container-page pb-20 pt-14 sm:pb-28 sm:pt-24">
        <header className="max-w-3xl">
          <div {...intro(0)} className="flex">
            <span className="eyebrow">
              <span className="eyebrow-dot" aria-hidden="true" />
              {t('eyebrow')}
            </span>
          </div>
          <h1
            {...intro(90)}
            className="mt-5 font-title font-semibold tracking-tight text-[clamp(1.85rem,4.4vw,3.25rem)] leading-[1.08] text-balance [overflow-wrap:anywhere]"
          >
            <span className="text-gradient-soft">{doc.title}</span>
          </h1>
          <p
            {...intro(180)}
            className="mt-5 max-w-2xl text-base leading-relaxed text-pretty text-[color:var(--fg-soft)] sm:text-lg"
          >
            {doc.description}
          </p>
          <p {...intro(240)} className="mt-6 inline-flex items-center gap-2 text-sm text-[color:var(--fg-muted)]">
            <CalendarIcon size={15} />
            <span>
              {t('updated')}: <time dateTime={LEGAL_UPDATED}>{updated}</time>
            </span>
          </p>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
          <nav aria-labelledby="legal-contents" className="lg:sticky lg:top-28 lg:self-start">
            <h2
              id="legal-contents"
              className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--fg-muted)]"
            >
              {t('contents')}
            </h2>
            <ol className="mt-4 space-y-1 border-l border-[color:var(--border)] text-sm">
              {doc.sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="-ml-px block border-l border-transparent py-1 pl-4 text-[color:var(--fg-soft)] transition-colors hover:border-[color:var(--accent-ink)] hover:text-[color:var(--fg)]"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="min-w-0 max-w-3xl">
            {doc.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-title`}
                className="scroll-mt-28 border-t border-[color:var(--border)] py-8 first:border-t-0 first:pt-0"
              >
                <h2
                  id={`${section.id}-title`}
                  className="font-title text-xl font-semibold tracking-tight text-[color:var(--fg)] sm:text-2xl"
                >
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[color:var(--fg-soft)] sm:text-base">
                  {section.blocks.map((block, index) => (
                    <Block key={index} block={block} />
                  ))}
                </div>
              </section>
            ))}

            {/* The operator's legal details, as in the footer. */}
            <section aria-labelledby="legal-company" className="card mt-4 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="icon-tile shrink-0">
                  <BuildingIcon size={18} />
                </span>
                <h2 id="legal-company" className="text-sm font-semibold text-[color:var(--fg)] sm:text-base">
                  {footer('legal.name')}
                </h2>
              </div>
              <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 text-sm sm:grid-cols-2">
                <DetailItem label={footer('legal.tin')}>
                  <span className="font-mono tabular-nums tracking-wide text-[color:var(--fg)]">{COMPANY_TIN}</span>
                </DetailItem>
                <DetailItem label={footer('legal.phone')}>
                  <a href={`tel:${COMPANY_PHONE_RAW}`} className={`${LINK_CLASS} whitespace-nowrap`}>
                    {COMPANY_PHONE}
                  </a>
                </DetailItem>
                <DetailItem label={footer('legal.address')} className="sm:col-span-2">
                  {COMPANY_LEGAL_ADDRESS}
                </DetailItem>
                <DetailItem label={contact('labels.email')}>
                  <a href={`mailto:${COMPANY_EMAIL}`} className={LINK_CLASS}>
                    {COMPANY_EMAIL}
                  </a>
                </DetailItem>
              </dl>
            </section>

            <Link
              href={related === 'privacy' ? '/privacy' : '/terms'}
              className="group mt-4 flex items-center justify-between gap-4 rounded-3xl border border-[color:var(--border)] p-5 transition-colors hover:border-[color:var(--border-strong)] sm:p-6"
            >
              <span>
                <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--fg-muted)]">
                  {t('related')}
                </span>
                <span className="mt-1 block font-medium text-[color:var(--fg)]">
                  {footer(related === 'privacy' ? 'links.privacy' : 'links.terms')}
                </span>
              </span>
              <ArrowRightIcon
                size={18}
                className="shrink-0 text-[color:var(--fg-soft)] transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function DetailItem({
  label,
  className = '',
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <dt className="text-xs text-[color:var(--fg-muted)]">{label}</dt>
      <dd className="mt-1 leading-relaxed text-[color:var(--fg-soft)]">{children}</dd>
    </div>
  );
}
