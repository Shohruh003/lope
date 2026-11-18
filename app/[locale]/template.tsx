import { ViewTransition } from 'react';

/// Page transitions. A template remounts on every navigation between
/// pages, so React's <ViewTransition> sees the old page exit and the new
/// one enter and hands both to the browser's View Transitions API
/// (enabled via `experimental.viewTransition` in next.config.ts). The
/// keyframes live in globals.css (`.page-exit` / `.page-enter`); the
/// header is pinned with its own view-transition-name so it never moves.
/// Browsers without the API simply swap pages, and reduced motion turns
/// the animation off. `default="none"` keeps unrelated updates static.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
