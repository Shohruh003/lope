import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Detect locale from Accept-Language, cookie or URL and either
// rewrite (for the default locale) or redirect to the prefixed
// route. `/` -> Uzbek; `/ru`, `/en` -> Russian, English.
export default createMiddleware(routing);

export const config = {
  // Skip API routes, static assets, and Next internals so
  // middleware only fires on real page navigations. `icon$` skips exactly
  // /icon (app/icon.tsx, the favicon and Apple touch icon), which has no
  // file extension and was otherwise rewritten to /uz/icon (404).
  matcher: ['/((?!api|_next|_vercel|icon$|.*\\..*).*)'],
};
