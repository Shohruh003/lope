/// Official documents of "LOPE" MChJ shown on the site (About page +
/// home teaser). Scans live in public/certificates (EXIF-stripped WebP).
/// `officialTitle` is the title exactly as printed on the document and is
/// always shown in Uzbek; translated titles live in messages/*.json under
/// `certificates.items.<id>`.

export type CompanyDocumentId = 'registration' | 'businessRegistration';

export type CompanyDocument = {
  id: CompanyDocumentId;
  officialTitle: string;
  image: { src: string; width: number; height: number };
  thumb: { src: string; width: number; height: number };
  /** ISO date for <time dateTime>. */
  date: string;
  /** Date as printed on the document. */
  dateLabel: string;
  number?: string;
  /** Whether `certificates.items.<id>.issuer` exists in the messages. */
  hasIssuer: boolean;
};

export const COMPANY_DOCUMENTS: CompanyDocument[] = [
  {
    id: 'registration',
    officialTitle: "Yuridik shaxsni davlat ro'yxatidan o'tkazilganligi to'g'risidagi guvohnoma",
    image: { src: '/certificates/davlat-royxati-guvohnoma.webp', width: 1053, height: 1490 },
    thumb: { src: '/certificates/davlat-royxati-guvohnoma-thumb.webp', width: 636, height: 900 },
    date: '2026-08-28',
    dateLabel: '28.08.2026',
    number: '3334377',
    hasIssuer: false,
  },
  {
    id: 'businessRegistration',
    officialTitle: '"Biznesni ro\'yxatga olish – 2026" sertifikati',
    image: { src: '/certificates/biznesni-royxatga-olish-2026.webp', width: 1405, height: 1988 },
    thumb: { src: '/certificates/biznesni-royxatga-olish-2026-thumb.webp', width: 636, height: 900 },
    date: '2026-10-29',
    dateLabel: '29.10.2026',
    hasIssuer: true,
  },
];
