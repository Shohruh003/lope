'use client';

import { useEffect } from 'react';

/// Scroll reveal for server-rendered markup.
///
/// Elements opt in with `data-reveal` (optionally `="fade" | "scale" |
/// "left" | "right" | "blur" | "unmask"`) and a `--reveal-delay` style for
/// staggering. When this boots it only *hides* elements that are still
/// below the fold (`data-reveal-state="pending"`) and reveals them as they
/// scroll in. Anything already on screen is left alone, so there is no
/// flash after hydration and nothing stays invisible if JavaScript never
/// runs. Above-the-fold entrances use pure CSS (`data-intro`) instead.
///
/// A MutationObserver picks up content inserted by client-side navigation
/// and language switches without needing a pathname dependency.
export function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.dataset.revealState = 'shown';
          io.unobserve(el);
        }
      },
      // A small fixed bottom margin (not a %) so elements at the very end
      // of the page can still cross it at maximum scroll.
      { rootMargin: '0px 0px -40px 0px', threshold: 0.01 },
    );

    const prime = () => {
      const fold = window.innerHeight * 0.94;
      document
        .querySelectorAll<HTMLElement>('[data-reveal]:not([data-reveal-state])')
        .forEach((el) => {
          const rect = el.getBoundingClientRect();
          // On screen (or above it, e.g. restored scroll): never hide.
          if (rect.top < fold) {
            el.dataset.revealState = 'static';
            return;
          }
          el.dataset.revealState = 'pending';
          io.observe(el);
        });
    };

    let frame = 0;
    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        prime();
      });
    };

    prime();
    const mo = new MutationObserver(schedule);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      mo.disconnect();
      io.disconnect();
    };
  }, []);

  return null;
}
