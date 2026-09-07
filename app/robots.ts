import type { MetadataRoute } from 'next';

const SITE = 'https://lope.uz';

/**
 * robots.txt — search engine crawler policy.
 *
 * Ko'p bot uchun alohida qoida:
 *  - Umumiy botlar (Googlebot, Bingbot, YandexBot, ...) — ruxsat
 *  - AI training crawler'lari (GPTBot, ClaudeBot, CCBot, Google-Extended,
 *    PerplexityBot) — hozirchalik ruxsat, chunki content copyright emas
 *    (marketing site) va AI search platformalarda ko'rinish yaxshi.
 *    Agar keyin ruxsat bermoqchi bo'lmasangiz, disallow: '/' qo'ying.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
