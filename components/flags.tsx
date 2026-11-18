/// Inline SVG flags. Emoji flags (🇺🇿) render as plain letters on
/// Windows, so the language switcher and the HQ stat use these instead.
/// Decorative unless a `title` is passed.

type FlagProps = { className?: string; title?: string };

function a11y(title?: string) {
  return title ? { role: 'img' as const, 'aria-label': title } : { 'aria-hidden': true as const };
}

export function FlagUz({ className, title }: FlagProps) {
  // 12 stars in rows of 3, 4 and 5, right of the crescent.
  const stars: [number, number][] = [
    [96, 9], [112, 9], [128, 9],
    [80, 21], [96, 21], [112, 21], [128, 21],
    [64, 33], [80, 33], [96, 33], [112, 33], [128, 33],
  ];
  return (
    <svg viewBox="0 0 250 125" className={className} focusable="false" {...a11y(title)}>
      <rect width="250" height="125" fill="#1eb53a" />
      <rect width="250" height="41" fill="#0099b5" />
      <rect y="41" width="250" height="43" fill="#ce1126" />
      <rect y="44" width="250" height="37" fill="#ffffff" />
      <circle cx="34" cy="20.5" r="14" fill="#ffffff" />
      <circle cx="39.5" cy="20.5" r="12" fill="#0099b5" />
      {stars.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.4" fill="#ffffff" />
      ))}
    </svg>
  );
}

export function FlagRu({ className, title }: FlagProps) {
  return (
    <svg viewBox="0 0 9 6" className={className} focusable="false" {...a11y(title)}>
      <rect width="9" height="6" fill="#ffffff" />
      <rect y="2" width="9" height="4" fill="#0039a6" />
      <rect y="4" width="9" height="2" fill="#d52b1e" />
    </svg>
  );
}

export function FlagGb({ className, title }: FlagProps) {
  return (
    <svg viewBox="0 0 60 30" className={className} focusable="false" {...a11y(title)}>
      <rect width="60" height="30" fill="#012169" />
      <path d="M0 0l60 30M60 0L0 30" stroke="#ffffff" strokeWidth="6" />
      <path d="M0 0l60 30M60 0L0 30" stroke="#c8102e" strokeWidth="2.4" />
      <path d="M30 0v30M0 15h60" stroke="#ffffff" strokeWidth="10" />
      <path d="M30 0v30M0 15h60" stroke="#c8102e" strokeWidth="6" />
    </svg>
  );
}

export const FLAGS = { uz: FlagUz, ru: FlagRu, en: FlagGb } as const;
