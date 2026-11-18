import type { Locale } from '@/i18n/routing';

/// Date of the current edition of the lope.uz Privacy Policy and Terms of
/// Use. Update it whenever either text changes; the pages show it.
export const LEGAL_UPDATED = '2026-11-18';

/// A paragraph, or a bulleted list. Text may contain links:
/// `[label](/privacy)` for a page on this site, `[label](https://...)` for
/// an external page; email addresses and the company phone number become
/// links on their own.
export type LegalBlock = string | { list: string[] };

export type LegalSection = {
  /// Anchor id, the same in every language so links keep working.
  id: string;
  title: string;
  blocks: LegalBlock[];
};

export type LegalDocument = {
  title: string;
  /// Page subtitle and meta description.
  description: string;
  sections: LegalSection[];
};

export type LegalDocuments = Record<Locale, LegalDocument>;
