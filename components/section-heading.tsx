import type { ReactNode } from 'react';
import { entrance } from './motion/motion-props';

/// Shared "eyebrow + title + optional subtitle" heading block used
/// at the top of every content section. Mid-page headings reveal on
/// scroll; `intro` headings (the first block of a page) animate in with
/// CSS on load. `as="h1"` is used where the section is the page title.
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  as: Tag = 'h2',
  intro = false,
  id,
  tone = 'brand',
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
  intro?: boolean;
  id?: string;
  tone?: 'brand' | 'store';
}) {
  const centered = align === 'center';
  return (
    <div className={`max-w-3xl ${centered ? 'mx-auto text-center' : 'text-left'}`}>
      <div {...entrance(intro, 0)} className={centered ? 'flex justify-center' : 'flex'}>
        <span className={`eyebrow ${tone === 'store' ? 'eyebrow-store' : ''}`}>
          <span className="eyebrow-dot" aria-hidden="true" />
          {eyebrow}
        </span>
      </div>
      <Tag
        id={id}
        {...entrance(intro, 90)}
        className="mt-5 font-title font-semibold tracking-tight text-[clamp(2.1rem,5vw,3.75rem)] leading-[1.04] text-balance"
      >
        <span className="text-gradient-soft">{title}</span>
      </Tag>
      {subtitle && (
        <p
          {...entrance(intro, 180)}
          className={`mt-5 text-base sm:text-lg text-[color:var(--fg-soft)] leading-relaxed text-pretty ${
            centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
