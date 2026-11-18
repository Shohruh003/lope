import type { CSSProperties } from 'react';
import { SparkleIcon } from './icons';

/// Infinite marquee band (CSS only). Two identical groups translate by
/// their own width for a seamless loop. The words repeat copy that is
/// already on the page, so the moving band is hidden from assistive
/// tech; a real checkbox (keyboard + screen-reader operable, works
/// without JS) pauses it, as do hover and focus (WCAG 2.2.2).
export function Marquee({
  items,
  pauseLabel,
  reverse = false,
  duration = 38,
}: {
  items: string[];
  pauseLabel: string;
  reverse?: boolean;
  duration?: number;
}) {
  const group = (copy: number) => (
    <div className="marquee-group" style={{ '--duration': `${duration}s` } as CSSProperties} key={copy}>
      {items.map((item, i) => (
        <span key={`${copy}-${i}`} className="flex items-center gap-[var(--gap)]">
          <span
            className={`font-title font-semibold tracking-tight whitespace-nowrap text-[clamp(1.6rem,4.2vw,3.1rem)] leading-none ${
              i % 2 === 1 ? 'text-outline' : 'text-[color:var(--fg-soft)]'
            }`}
          >
            {item}
          </span>
          <SparkleIcon size={22} className="marquee-star shrink-0 text-[color:var(--accent-ink)]" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee-wrap relative border-y border-[color:var(--border)] bg-[color:var(--bg-soft)]/60 py-6 sm:py-8">
      <div className="marquee" data-reverse={reverse || undefined} aria-hidden="true">
        {group(0)}
        {group(1)}
      </div>
      <label className="marquee-toggle absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--bg)]/80 text-[color:var(--fg-muted)] backdrop-blur transition-colors hover:text-[color:var(--fg)] sm:right-5">
        <input type="checkbox" className="sr-only" />
        <span className="sr-only">{pauseLabel}</span>
        <svg className="icon-pause" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
          <rect x="2" y="1.5" width="2.5" height="9" rx="1" fill="currentColor" />
          <rect x="7.5" y="1.5" width="2.5" height="9" rx="1" fill="currentColor" />
        </svg>
        <svg className="icon-play" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
          <path d="M3 1.8v8.4a.6.6 0 00.9.5l6.6-4.2a.6.6 0 000-1L3.9 1.3a.6.6 0 00-.9.5z" fill="currentColor" />
        </svg>
      </label>
    </div>
  );
}
