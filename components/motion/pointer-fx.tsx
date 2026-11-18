'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/// Pointer-driven card effects for fine pointers (mouse / trackpad):
///
/// - writes `--mx` / `--my` (cursor position in %) so `.card` can paint
///   its spotlight + gradient ring under the cursor;
/// - with `tilt`, also writes `--rx` / `--ry` for a 3D tilt (`.lift`).
///
/// `group` mode puts one listener on a grid and targets whichever
/// `[data-fx]` child is under the pointer. Touch devices and
/// reduced-motion visitors get no tilt; content is server-rendered and
/// passed through as children.
export function PointerFx({
  children,
  className,
  tilt = 0,
  group = false,
}: {
  children: ReactNode;
  className?: string;
  tilt?: number;
  group?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const allowTilt =
      tilt > 0 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let frame = 0;
    let target: HTMLElement | null = null;
    let x = 0;
    let y = 0;

    const reset = (el: HTMLElement) => {
      el.style.removeProperty('--rx');
      el.style.removeProperty('--ry');
    };

    const apply = () => {
      frame = 0;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const px = (x - rect.left) / rect.width;
      const py = (y - rect.top) / rect.height;
      target.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
      target.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
      if (allowTilt) {
        target.style.setProperty('--rx', `${((0.5 - py) * tilt).toFixed(2)}deg`);
        target.style.setProperty('--ry', `${((px - 0.5) * tilt).toFixed(2)}deg`);
      }
    };

    const onMove = (event: PointerEvent) => {
      let next: HTMLElement | null = root;
      if (group) {
        const hit = (event.target as Element | null)?.closest<HTMLElement>('[data-fx]') ?? null;
        next = hit && root.contains(hit) ? hit : null;
      }
      if (target && next !== target) reset(target);
      target = next;
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      if (target) reset(target);
      target = null;
    };

    root.addEventListener('pointermove', onMove, { passive: true });
    root.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', onLeave);
    };
  }, [tilt, group]);

  return (
    <div ref={ref} className={className} data-fx={group ? undefined : ''}>
      {children}
    </div>
  );
}
