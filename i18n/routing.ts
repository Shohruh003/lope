import { defineRouting } from 'next-intl/routing';

// Supported locales — order matters for the language switcher UI.
// `uz` is the default because the primary market is Uzbekistan;
// `ru` for the sizable Russian-speaking audience; `en` for global
// investors, press and cross-border partners.
export const routing = defineRouting({
  locales: ['uz', 'ru', 'en'],
  defaultLocale: 'uz',
  // Show the locale prefix on non-default paths only. `/` serves
  // Uzbek, `/ru`, `/en` serve the translated versions. Clean SEO
  // shape for the primary market.
  localePrefix: 'as-needed',
  // Force Uzbek as the landing language regardless of the browser's
  // Accept-Language. Auto-detection would flip the primary market to
  // English/Russian for anyone whose browser advertises a non-uz locale.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
