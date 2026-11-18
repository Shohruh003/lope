'use client';

import Image from 'next/image';
import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { COMPANY_DOCUMENTS } from '@/lib/company-documents';
import { lockScroll, unlockScroll } from '@/lib/scroll-lock';
import { reveal } from './motion/motion-props';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BuildingIcon,
  CalendarIcon,
  CloseIcon,
  FitIcon,
  HashIcon,
  ZoomInIcon,
} from './icons';

const FOCUSABLE =
  'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/// Company documents as thumbnail cards plus an accessible lightbox.
///
/// - `full`: document cards (About page);
/// - `compact`: a fanned pair of papers (home teaser).
///
/// The lightbox is a native modal <dialog>: the rest of the page becomes
/// inert, Esc closes it, Tab is wrapped inside it, focus returns to the
/// card that opened it. Click the scan (or the zoom button, or +/-) to
/// switch between fit-to-screen and a scrollable full-size view; ←/→
/// switch documents when not zoomed.
export function CertificateGallery({ variant }: { variant: 'full' | 'compact' }) {
  const t = useTranslations('certificates');
  const locale = useLocale();
  const titleId = useId();

  const docs = COMPANY_DOCUMENTS.map((doc) => ({
    ...doc,
    title: t(`items.${doc.id}.title`),
    issuer: doc.hasIssuer ? t(`items.${doc.id}.issuer`) : undefined,
    // In Uzbek the translated title *is* the official one.
    showOfficial: locale !== 'uz',
  }));

  const [active, setActive] = useState<number | null>(null);
  const [zoom, setZoom] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const lockedRef = useRef(false);
  const focusPoint = useRef({ x: 0.5, y: 0.25 });

  const current = active === null ? null : docs[active];

  // Open the native dialog once a document is selected.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || active === null || dialog.open) return;
    dialog.showModal();
    if (!lockedRef.current) {
      lockScroll();
      lockedRef.current = true;
    }
    closeRef.current?.focus();
  }, [active]);

  // Release the scroll lock if we unmount while open (e.g. navigation).
  useEffect(
    () => () => {
      if (lockedRef.current) {
        unlockScroll();
        lockedRef.current = false;
      }
    },
    [],
  );

  // Keep the clicked spot under the cursor when zooming in.
  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage || !zoom) return;
    stage.scrollLeft = focusPoint.current.x * stage.scrollWidth - stage.clientWidth / 2;
    stage.scrollTop = focusPoint.current.y * stage.scrollHeight - stage.clientHeight / 2;
  }, [zoom, active]);

  const open = (index: number, opener: HTMLElement) => {
    openerRef.current = opener;
    focusPoint.current = { x: 0.5, y: 0.25 };
    setZoom(false);
    setActive(index);
  };

  const close = () => dialogRef.current?.close();

  const onDialogClose = () => {
    setActive(null);
    setZoom(false);
    if (lockedRef.current) {
      unlockScroll();
      lockedRef.current = false;
    }
    openerRef.current?.focus();
  };

  const step = (delta: number) => {
    setZoom(false);
    setActive((i) => (i === null ? i : (i + delta + docs.length) % docs.length));
  };

  const toggleZoom = (point?: { x: number; y: number }) => {
    focusPoint.current = point ?? { x: 0.5, y: 0.25 };
    setZoom((z) => !z);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'Tab') {
      const items = Array.from(
        event.currentTarget.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null || el === document.activeElement);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
      return;
    }
    if (event.key === '+' || event.key === '=') {
      event.preventDefault();
      if (!zoom) toggleZoom();
    } else if (event.key === '-') {
      event.preventDefault();
      if (zoom) toggleZoom();
    } else if (!zoom && event.key === 'ArrowRight' && docs.length > 1) {
      event.preventDefault();
      step(1);
    } else if (!zoom && event.key === 'ArrowLeft' && docs.length > 1) {
      event.preventDefault();
      step(-1);
    }
  };

  const onStageClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.tagName === 'IMG') {
      const rect = target.getBoundingClientRect();
      toggleZoom({
        x: (event.clientX - rect.left) / rect.width,
        y: (event.clientY - rect.top) / rect.height,
      });
    } else if (!zoom) {
      // Click on the empty area around the scan closes, like a backdrop.
      close();
    }
  };

  return (
    <>
      {variant === 'full' ? (
        <ul className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {docs.map((doc, i) => (
            <li key={doc.id} {...reveal(i * 120, 'scale')}>
              <article className="doc-card card group relative flex h-full flex-col gap-6 p-5 sm:flex-row sm:p-6">
                <div
                  className="paper w-[150px] shrink-0 self-center sm:w-[170px] sm:self-start"
                  style={{ aspectRatio: `${doc.thumb.width} / ${doc.thumb.height}` }}
                >
                  <Image
                    src={doc.thumb.src}
                    alt=""
                    width={doc.thumb.width}
                    height={doc.thumb.height}
                    sizes="(min-width: 640px) 170px, 150px"
                    className="h-full w-full object-cover"
                  />
                  <span
                    aria-hidden="true"
                    className="doc-zoom absolute inset-0 flex items-center justify-center bg-[rgba(10,10,10,0.35)]"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--accent)] text-white shadow-[0_10px_30px_-8px_rgba(0,102,255,1)]">
                      <ZoomInIcon size={20} />
                    </span>
                  </span>
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                  <h3 className="font-title text-lg font-semibold leading-snug tracking-tight text-[color:var(--fg)] text-balance sm:text-xl">
                    <button
                      type="button"
                      aria-haspopup="dialog"
                      onClick={(e) => open(i, e.currentTarget)}
                      className="doc-open text-left after:absolute after:inset-0 after:z-[1] after:rounded-[28px] after:content-['']"
                    >
                      {doc.title}
                    </button>
                  </h3>
                  {doc.showOfficial && (
                    <p lang="uz" className="mt-2 text-sm leading-relaxed text-[color:var(--fg-muted)]">
                      {doc.officialTitle}
                    </p>
                  )}
                  {doc.issuer && (
                    <p className="mt-3 flex items-start gap-2 text-sm text-[color:var(--fg-soft)]">
                      <BuildingIcon size={16} className="mt-0.5 shrink-0 text-[color:var(--accent-ink)]" />
                      <span>
                        <span className="sr-only">{t('meta.issuer')}: </span>
                        {doc.issuer}
                      </span>
                    </p>
                  )}
                  <dl className="mt-4 flex flex-wrap gap-2">
                    <div className="chip">
                      <CalendarIcon size={13} className="text-[color:var(--accent-ink)]" />
                      <dt className="text-[color:var(--fg-muted)]">{t('meta.date')}</dt>
                      <dd>
                        <time dateTime={doc.date}>{doc.dateLabel}</time>
                      </dd>
                    </div>
                    {doc.number && (
                      <div className="chip">
                        <HashIcon size={13} className="text-[color:var(--accent-ink)]" />
                        <dt className="text-[color:var(--fg-muted)]">{t('meta.number')}</dt>
                        <dd className="tabular-nums">{doc.number}</dd>
                      </div>
                    )}
                  </dl>
                  <span
                    aria-hidden="true"
                    className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-[color:var(--accent-ink)]"
                  >
                    <ZoomInIcon size={16} />
                    {t('open')}
                  </span>
                </div>
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <div className="fan relative mx-auto flex h-[300px] w-full max-w-[440px] items-center justify-center sm:h-[360px]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-[10%] rounded-full bg-[radial-gradient(closest-side,rgba(0,102,255,0.3),transparent)]"
          />
          {docs.map((doc, i) => (
            <button
              key={doc.id}
              type="button"
              aria-haspopup="dialog"
              onClick={(e) => open(i, e.currentTarget)}
              className={`doc-card absolute rounded-[10px] ${i === 0 ? 'fan-left' : 'fan-right'}`}
            >
              <span
                className="paper block w-[150px] sm:w-[210px]"
                style={{ aspectRatio: `${doc.thumb.width} / ${doc.thumb.height}` }}
              >
                <Image
                  src={doc.thumb.src}
                  alt=""
                  width={doc.thumb.width}
                  height={doc.thumb.height}
                  sizes="(min-width: 640px) 210px, 150px"
                  className="h-full w-full object-cover"
                />
                <span
                  aria-hidden="true"
                  className="doc-zoom absolute inset-0 flex items-center justify-center bg-[rgba(10,10,10,0.3)]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--accent)] text-white">
                    <ZoomInIcon size={20} />
                  </span>
                </span>
              </span>
              <span className="sr-only">{doc.title}</span>
            </button>
          ))}
        </div>
      )}

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-labelledby={titleId}
        onClose={onDialogClose}
        onKeyDown={onKeyDown}
      >
        {current && (
          <>
            <div className="flex items-center gap-2 border-b border-[color:var(--border)] bg-[color:var(--bg)]/80 px-3 py-2.5 backdrop-blur sm:gap-3 sm:px-5">
              <div className="min-w-0 flex-1">
                <h2 id={titleId} aria-live="polite" className="truncate text-sm font-semibold text-[color:var(--fg)]">
                  {current.title}
                </h2>
                <p className="truncate text-xs text-[color:var(--fg-muted)]">
                  {current.showOfficial ? <span lang="uz">{current.officialTitle}</span> : current.issuer}
                  {!current.showOfficial && !current.issuer && current.number && `№ ${current.number}`}
                  {' · '}
                  <time dateTime={current.date}>{current.dateLabel}</time>
                </p>
              </div>
              {docs.length > 1 && (
                <>
                  <span aria-hidden="true" className="hidden px-1 text-xs tabular-nums text-[color:var(--fg-muted)] sm:inline">
                    {(active ?? 0) + 1} / {docs.length}
                  </span>
                  <ToolButton label={t('lightbox.prev')} onClick={() => step(-1)}>
                    <ArrowLeftIcon size={18} />
                  </ToolButton>
                  <ToolButton label={t('lightbox.next')} onClick={() => step(1)}>
                    <ArrowRightIcon size={18} />
                  </ToolButton>
                </>
              )}
              <ToolButton
                label={t('lightbox.zoomIn')}
                title={zoom ? t('lightbox.fit') : t('lightbox.zoomIn')}
                pressed={zoom}
                onClick={() => toggleZoom()}
              >
                {zoom ? <FitIcon size={18} /> : <ZoomInIcon size={18} />}
              </ToolButton>
              <ToolButton ref={closeRef} label={t('lightbox.close')} onClick={close}>
                <CloseIcon size={18} />
              </ToolButton>
            </div>

            <div
              ref={stageRef}
              data-zoom={zoom}
              data-lenis-prevent=""
              tabIndex={zoom ? 0 : -1}
              aria-label={zoom ? current.title : undefined}
              role={zoom ? 'group' : undefined}
              onClick={onStageClick}
              className="lightbox-stage relative min-h-0 flex-1 overflow-auto overscroll-contain"
            >
              <div
                className={`flex min-h-full min-w-full p-4 sm:p-8 ${zoom ? 'w-max' : 'items-center justify-center'}`}
              >
                <figure
                  key={current.id}
                  className="lightbox-figure m-auto overflow-hidden rounded-lg bg-white shadow-[0_40px_120px_-30px_rgba(0,0,0,1)]"
                >
                  <Image
                    src={current.image.src}
                    alt={current.title}
                    width={current.image.width}
                    height={current.image.height}
                    unoptimized
                    loading="eager"
                    draggable={false}
                    className={zoom ? 'block h-auto max-w-none' : 'lightbox-fit block h-auto w-auto'}
                    style={zoom ? { width: `max(${current.image.width}px, 120vw)` } : undefined}
                  />
                </figure>
              </div>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}

function ToolButton({
  label,
  title,
  pressed,
  onClick,
  children,
  ref,
}: {
  label: string;
  title?: string;
  pressed?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  ref?: React.Ref<HTMLButtonElement>;
}) {
  return (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      title={title ?? label}
      onClick={onClick}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[color:var(--border)] bg-white/[0.03] text-[color:var(--fg-soft)] transition-colors hover:border-[color:var(--border-strong)] hover:bg-white/[0.08] hover:text-[color:var(--fg)] aria-pressed:border-[rgba(92,157,255,0.6)] aria-pressed:text-[color:var(--accent-ink)]"
    >
      {children}
    </button>
  );
}
