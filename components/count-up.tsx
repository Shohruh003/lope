import type { CSSProperties } from 'react';

/// Animated stat number with zero JavaScript: a registered `--num`
/// custom property counts from 0 to `value` (see `.countup-num` in
/// globals.css). The real value stays in the DOM as text for screen
/// readers, crawlers and browsers without @property support. Inside a
/// scroll-revealed block it restarts when the block is revealed.
export function CountUp({
  value,
  suffix = '',
  delay = 150,
}: {
  value: number;
  suffix?: string;
  delay?: number;
}) {
  return (
    <span className="relative inline-block">
      <span className="sr-only">
        {value}
        {suffix}
      </span>
      <span
        aria-hidden="true"
        className="countup-num"
        data-suffix={suffix}
        style={{ '--to': value, '--count-delay': `${delay}ms` } as CSSProperties}
      />
    </span>
  );
}
