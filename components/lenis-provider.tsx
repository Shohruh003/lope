'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/// Wraps the page tree in a Lenis smooth-scroll instance.
///
/// The `wrapper: window` + `content: document.documentElement` combo
/// works well with Next.js server-rendered pages — no need to shim
/// the scroll container. `duration: 1.15` gives us Apple-like ease
/// without feeling sluggish. `smoothWheel` handles trackpad + mouse
/// wheel; touch is left untouched so mobile still feels native.
export function LenisProvider() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
