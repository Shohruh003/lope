import type Lenis from 'lenis';

/// Shared handle to the page's Lenis instance so overlays (mobile menu,
/// document lightbox) can pause smooth scrolling while they are open.
let lenis: Lenis | null = null;
let locks = 0;

export function registerLenis(instance: Lenis | null) {
  lenis = instance;
}

/// Locks page scroll (Lenis + native). Calls are counted so two overlays
/// can't unlock each other. `scrollbar-gutter: stable` on <html> keeps the
/// layout from jumping when the scrollbar disappears.
export function lockScroll() {
  locks += 1;
  if (locks > 1) return;
  lenis?.stop();
  document.documentElement.style.overflow = 'hidden';
}

export function unlockScroll() {
  if (locks === 0) return;
  locks -= 1;
  if (locks > 0) return;
  lenis?.start();
  document.documentElement.style.overflow = '';
}
