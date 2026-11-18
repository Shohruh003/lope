import type { CSSProperties } from 'react';

export type RevealVariant = 'up' | 'fade' | 'scale' | 'left' | 'right' | 'blur' | 'unmask';
export type IntroVariant = 'up' | 'fade' | 'down' | 'scale' | 'blur';

/// Props for a scroll-revealed element (see RevealObserver). `delay` in ms
/// staggers siblings that enter the viewport together.
export function reveal(delay = 0, variant: RevealVariant = 'up') {
  return {
    'data-reveal': variant,
    style: { '--reveal-delay': `${delay}ms` } as CSSProperties,
  };
}

/// Props for an above-the-fold element that animates in with pure CSS as
/// soon as it is painted (no JavaScript involved).
export function intro(delay = 0, variant: IntroVariant = 'up') {
  return {
    'data-intro': variant,
    style: { '--intro-delay': `${delay}ms` } as CSSProperties,
  };
}

/// Picks `intro` for page-top content and `reveal` for everything else.
export function entrance(isIntro: boolean, delay = 0, variant: RevealVariant & IntroVariant = 'up') {
  return isIntro ? intro(delay, variant) : reveal(delay, variant);
}
