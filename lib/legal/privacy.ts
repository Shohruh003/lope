import type { LegalDocuments } from './types';

/// Privacy Policy of lope.uz (the "LOPE" MChJ company website).
///
/// It describes what this site actually does. Keep it in sync with the code:
/// - the only personal data comes from the contact form (name, email,
///   message), sent to Netlify Forms (components/contact-section.tsx);
/// - the Lope Store waitlist sends nothing anywhere yet. If it gets a
///   backend, add it to sections 2 and 6;
/// - no cookies (i18n/routing.ts sets `localeCookie: false`), no analytics,
///   no pixels; fonts are self-hosted (app/fonts.css).
/// The Lope Style app has its own policy at lopestyle.uz/privacy.
export const PRIVACY: LegalDocuments = {
  uz: {
    title: 'Maxfiylik siyosati',
    description:
      "lope.uz saytida qanday ma'lumotlar yig'iladi, ular nima uchun ishlatiladi va bu borada qanday huquqlaringiz bor.",
    sections: [
      {
        id: 'general',
        title: '1. Umumiy qoidalar',
        blocks: [
          `Ushbu Maxfiylik siyosati "LOPE" mas'uliyati cheklangan jamiyati (STIR 313294861; keyingi o'rinlarda — «Kompaniya» yoki «biz») lope.uz veb-saytiga (keyingi o'rinlarda — «Sayt») tashrif buyuruvchilarning shaxsga doir ma'lumotlarini qanday qayta ishlashini tushuntiradi.`,
          `Siyosat O'zbekiston Respublikasining 2019-yil 2-iyuldagi O'RQ-547-son «Shaxsga doir ma'lumotlar to'g'risida»gi Qonuni va boshqa qonun hujjatlariga muvofiq tuzilgan.`,
          `Siyosat faqat lope.uz saytiga taalluqli. Lope Style ilovasi va lopestyle.uz xizmati uchun alohida maxfiylik siyosati amal qiladi: [lopestyle.uz/privacy](https://lopestyle.uz/privacy).`,
        ],
      },
      {
        id: 'data',
        title: "2. Qanday ma'lumotlarni yig'amiz",
        blocks: [
          `Aloqa formasi orqali o'zingiz yuborgan ma'lumotlar: ismingiz, elektron pochta manzilingiz va xabaringiz matni (xabarga o'zingiz yozgan boshqa ma'lumotlar bilan birga).`,
          `Saytga kirganingizda avtomatik qayd etiladigan texnik ma'lumotlar: IP-manzil, brauzer va qurilma turi, ochilgan sahifa, so'rov sanasi va vaqti. Ularni Sayt joylashtirilgan hosting-provayder serverlari Saytning ishlashi va xavfsizligi uchun qayd etadi.`,
          `Biz ro'yxatdan o'tishni talab qilmaymiz, to'lov ma'lumotlarini yig'maymiz va maxsus toifadagi ma'lumotlarni (sog'liq, e'tiqod va h.k.) so'ramaymiz.`,
        ],
      },
      {
        id: 'purposes',
        title: "3. Ma'lumotlardan foydalanish maqsadlari",
        blocks: [
          {
            list: [
              'murojaatingizga javob berish va yozishmani davom ettirish;',
              "hamkorlik va boshqa takliflarni ko'rib chiqish;",
              "Saytning barqaror va xavfsiz ishlashini ta'minlash, suiiste'mol va spamning oldini olish;",
              'qonun hujjatlarida belgilangan majburiyatlarni bajarish.',
            ],
          },
          "Ma'lumotlaringizni reklama maqsadida ishlatmaymiz va sotmaymiz.",
        ],
      },
      {
        id: 'legal-basis',
        title: '4. Qayta ishlashning huquqiy asosi',
        blocks: [
          `Aloqa formasini yuborish orqali siz ma'lumotlaringiz ushbu Siyosatda ko'rsatilgan maqsadlarda qayta ishlanishiga rozilik bildirasiz. Texnik ma'lumotlar Saytning ishlashi va himoyasi uchun zarur bo'lgani sababli qayta ishlanadi.`,
          `Rozilikni istalgan vaqtda support@lopestyle.uz manziliga yozib qaytarib olishingiz mumkin. Bu rozilik qaytarib olingunga qadar amalga oshirilgan qayta ishlashning qonuniyligiga ta'sir qilmaydi.`,
        ],
      },
      {
        id: 'cookies',
        title: '5. Cookie fayllar va analitika',
        blocks: [
          `Sayt cookie fayllar, piksellar va shunga o'xshash kuzatuv vositalaridan foydalanmaydi va tashrif buyuruvchilar statistikasini yig'maydi.`,
          `Shriftlar va rasmlar Saytning o'z serveridan yuklanadi: sahifani ochganingizda Google Fonts kabi tashqi xizmatlarga so'rov yuborilmaydi.`,
        ],
      },
      {
        id: 'sharing',
        title: "6. Ma'lumotlarni kimlarga beramiz",
        blocks: [
          `Ma'lumotlaringizni faqat murojaatlarni ko'rib chiqadigan Kompaniya xodimlari ko'radi.`,
          `Sayt Netlify, Inc. (AQSh) platformasida joylashtirilgan. Aloqa formasi orqali yuborilgan xabarlar va server jurnallari Netlify serverlarida saqlanadi, ya'ni ma'lumotlar O'zbekistondan tashqariga uzatiladi. Formani yuborish orqali siz bunday transchegaraviy uzatishga ham rozilik bildirasiz.`,
          `Qonunda nazarda tutilgan hollarda ma'lumotlar vakolatli davlat organlariga ularning qonuniy so'roviga binoan taqdim etilishi mumkin.`,
          `Boshqa uchinchi shaxslarga ma'lumotlaringizni bermaymiz va sotmaymiz.`,
        ],
      },
      {
        id: 'retention',
        title: '7. Saqlash muddati va himoya',
        blocks: [
          `Murojaatlar ularni ko'rib chiqish va yozishmani yakunlash uchun zarur bo'lgan muddat davomida saqlanadi, so'ng o'chiriladi (agar qonunda boshqa muddat belgilanmagan bo'lsa).`,
          `Server jurnallari hosting-provayder belgilagan standart muddatlarda saqlanadi.`,
          `Ma'lumotlarni ruxsatsiz kirish, o'zgartirish va yo'qolishdan himoya qilish uchun tashkiliy va texnik choralar ko'ramiz: Saytga ulanish HTTPS orqali shifrlanadi, murojaatlarga kirish huquqi cheklangan.`,
        ],
      },
      {
        id: 'rights',
        title: '8. Sizning huquqlaringiz',
        blocks: [
          'Qonunga muvofiq siz quyidagi huquqlarga egasiz:',
          {
            list: [
              "ma'lumotlaringiz qayta ishlanayotgani va ularning tarkibi haqida ma'lumot olish;",
              "noto'g'ri yoki eskirgan ma'lumotlarni tuzatishni talab qilish;",
              "ma'lumotlaringizni o'chirishni yoki ularni qayta ishlashni to'xtatishni talab qilish;",
              'rozilikni qaytarib olish;',
              'huquqlaringiz buzilgan deb hisoblasangiz, vakolatli davlat organiga yoki sudga shikoyat qilish.',
            ],
          },
          "So'rovlaringizni support@lopestyle.uz manziliga yuboring. Qonunda belgilangan muddatlarda javob beramiz.",
        ],
      },
      {
        id: 'changes',
        title: "9. Siyosatdagi o'zgarishlar",
        blocks: [
          `Siyosatni yangilashimiz mumkin. Yangi tahrir shu sahifada e'lon qilingan paytdan kuchga kiradi. Sahifa boshidagi sana oxirgi tahrir sanasini ko'rsatadi.`,
        ],
      },
      {
        id: 'contact',
        title: '10. Aloqa',
        blocks: [
          `Shaxsga doir ma'lumotlar bo'yicha savol va so'rovlar uchun: support@lopestyle.uz, +998 94 272 07 05.`,
        ],
      },
    ],
  },

  ru: {
    title: 'Политика конфиденциальности',
    description:
      'Какие данные собирает сайт lope.uz, зачем они нужны и какие права у вас есть.',
    sections: [
      {
        id: 'general',
        title: '1. Общие положения',
        blocks: [
          'Настоящая Политика конфиденциальности объясняет, как Общество с ограниченной ответственностью «LOPE» (ИНН 313294861; далее — «Компания» или «мы») обрабатывает персональные данные посетителей сайта lope.uz (далее — «Сайт»).',
          'Политика составлена в соответствии с Законом Республики Узбекистан «О персональных данных» от 2 июля 2019 года № ЗРУ-547 и иными актами законодательства.',
          'Политика действует только для сайта lope.uz. Для приложения Lope Style и сервиса lopestyle.uz действует отдельная политика конфиденциальности: [lopestyle.uz/privacy](https://lopestyle.uz/privacy).',
        ],
      },
      {
        id: 'data',
        title: '2. Какие данные мы собираем',
        blocks: [
          'Данные, которые вы сами отправляете через форму обратной связи: имя, адрес электронной почты и текст сообщения (вместе с любыми сведениями, которые вы укажете в нём).',
          'Технические данные, которые фиксируются автоматически при посещении Сайта: IP-адрес, тип браузера и устройства, открытая страница, дата и время запроса. Их записывают серверы хостинг-провайдера Сайта для обеспечения его работы и безопасности.',
          'Мы не требуем регистрации, не собираем платёжные данные и не запрашиваем специальные категории данных (о здоровье, убеждениях и т. п.).',
        ],
      },
      {
        id: 'purposes',
        title: '3. Цели обработки',
        blocks: [
          {
            list: [
              'ответить на ваше обращение и продолжить переписку;',
              'рассмотреть предложения о сотрудничестве и другие предложения;',
              'обеспечить стабильную и безопасную работу Сайта, предотвратить злоупотребления и спам;',
              'выполнить обязанности, установленные законодательством.',
            ],
          },
          'Мы не используем ваши данные в рекламных целях и не продаём их.',
        ],
      },
      {
        id: 'legal-basis',
        title: '4. Правовые основания',
        blocks: [
          'Отправляя форму обратной связи, вы даёте согласие на обработку ваших данных в целях, указанных в настоящей Политике. Технические данные обрабатываются, поскольку это необходимо для работы и защиты Сайта.',
          'Вы можете в любой момент отозвать согласие, написав на support@lopestyle.uz. Отзыв согласия не влияет на законность обработки, выполненной до его отзыва.',
        ],
      },
      {
        id: 'cookies',
        title: '5. Cookie и аналитика',
        blocks: [
          'Сайт не использует cookie, пиксели и аналогичные средства отслеживания и не собирает статистику посещений.',
          'Шрифты и изображения загружаются с собственного сервера Сайта: при открытии страниц запросы к внешним сервисам, таким как Google Fonts, не отправляются.',
        ],
      },
      {
        id: 'sharing',
        title: '6. Кому мы передаём данные',
        blocks: [
          'Ваши данные видят только сотрудники Компании, которые рассматривают обращения.',
          'Сайт размещён на платформе Netlify, Inc. (США). Сообщения из формы обратной связи и журналы сервера хранятся на серверах Netlify, то есть данные передаются за пределы Узбекистана. Отправляя форму, вы соглашаетесь и на такую трансграничную передачу.',
          'В случаях, предусмотренных законом, данные могут быть предоставлены уполномоченным государственным органам по их законному запросу.',
          'Иным третьим лицам мы ваши данные не передаём и не продаём.',
        ],
      },
      {
        id: 'retention',
        title: '7. Срок хранения и защита',
        blocks: [
          'Обращения хранятся столько, сколько нужно для их рассмотрения и завершения переписки, после чего удаляются (если законодательство не устанавливает иной срок).',
          'Журналы сервера хранятся в течение стандартных сроков хостинг-провайдера.',
          'Мы принимаем организационные и технические меры для защиты данных от несанкционированного доступа, изменения и утраты: соединение с Сайтом шифруется по HTTPS, доступ к обращениям ограничен.',
        ],
      },
      {
        id: 'rights',
        title: '8. Ваши права',
        blocks: [
          'В соответствии с законом вы вправе:',
          {
            list: [
              'получать сведения о том, обрабатываются ли ваши данные, и об их составе;',
              'требовать исправления неточных или устаревших данных;',
              'требовать удаления данных или прекращения их обработки;',
              'отозвать согласие;',
              'обжаловать действия Компании в уполномоченном государственном органе или в суде, если считаете, что ваши права нарушены.',
            ],
          },
          'Направляйте запросы на support@lopestyle.uz. Мы ответим в сроки, установленные законодательством.',
        ],
      },
      {
        id: 'changes',
        title: '9. Изменения Политики',
        blocks: [
          'Мы можем обновлять Политику. Новая редакция вступает в силу с момента её публикации на этой странице. Дата в начале страницы указывает дату последней редакции.',
        ],
      },
      {
        id: 'contact',
        title: '10. Контакты',
        blocks: ['По вопросам, связанным с персональными данными: support@lopestyle.uz, +998 94 272 07 05.'],
      },
    ],
  },

  en: {
    title: 'Privacy Policy',
    description: 'What data lope.uz collects, why we use it and what rights you have.',
    sections: [
      {
        id: 'general',
        title: '1. General',
        blocks: [
          'This Privacy Policy explains how "LOPE" Limited Liability Company (TIN 313294861; "the Company", "we") processes the personal data of visitors to the lope.uz website ("the Site").',
          'It is prepared in accordance with the Law of the Republic of Uzbekistan "On Personal Data" No. ZRU-547 of 2 July 2019 and other applicable legislation.',
          'This Policy covers the lope.uz website only. The Lope Style app and the lopestyle.uz service have their own privacy policy: [lopestyle.uz/privacy](https://lopestyle.uz/privacy).',
        ],
      },
      {
        id: 'data',
        title: '2. Data we collect',
        blocks: [
          'Data you send us through the contact form: your name, your email address and the text of your message (including anything else you choose to write in it).',
          "Technical data recorded automatically when you visit the Site: IP address, browser and device type, the page requested, and the date and time of the request. The servers of the Site's hosting provider record it to run and protect the Site.",
          'We do not require registration, do not collect payment details and do not ask for special categories of data (health, beliefs and the like).',
        ],
      },
      {
        id: 'purposes',
        title: '3. Why we use it',
        blocks: [
          {
            list: [
              'to reply to your message and continue the conversation;',
              'to consider partnership and other proposals;',
              'to keep the Site stable and secure and to prevent abuse and spam;',
              'to meet our obligations under the law.',
            ],
          },
          'We do not use your data for advertising and we do not sell it.',
        ],
      },
      {
        id: 'legal-basis',
        title: '4. Legal basis',
        blocks: [
          'By sending the contact form you consent to the processing of your data for the purposes described in this Policy. Technical data is processed because it is necessary to run and protect the Site.',
          'You can withdraw your consent at any time by writing to support@lopestyle.uz. Withdrawal does not affect processing carried out before it.',
        ],
      },
      {
        id: 'cookies',
        title: '5. Cookies and analytics',
        blocks: [
          'The Site does not use cookies, pixels or similar tracking tools and does not collect visitor statistics.',
          "Fonts and images are served from the Site's own server: opening a page does not send requests to outside services such as Google Fonts.",
        ],
      },
      {
        id: 'sharing',
        title: '6. Who we share data with',
        blocks: [
          "Only the Company's staff who handle enquiries see your data.",
          "The Site is hosted on Netlify, Inc. (USA). Contact form messages and server logs are stored on Netlify's servers, which means the data is transferred outside Uzbekistan. By sending the form you also consent to this cross-border transfer.",
          'Where the law requires it, data may be provided to competent state authorities upon their lawful request.',
          'We do not share your data with anyone else and we do not sell it.',
        ],
      },
      {
        id: 'retention',
        title: '7. Retention and security',
        blocks: [
          'Enquiries are kept for as long as needed to handle them and finish the conversation, and are then deleted (unless the law requires a different period).',
          "Server logs are kept for the hosting provider's standard periods.",
          'We take organisational and technical measures to protect data from unauthorised access, alteration and loss: connections to the Site are encrypted with HTTPS and access to enquiries is restricted.',
        ],
      },
      {
        id: 'rights',
        title: '8. Your rights',
        blocks: [
          'Under the law you have the right to:',
          {
            list: [
              'find out whether your data is processed and what it contains;',
              'have inaccurate or outdated data corrected;',
              'have your data deleted or its processing stopped;',
              'withdraw your consent;',
              'complain to the competent state authority or to a court if you believe your rights have been violated.',
            ],
          },
          'Send requests to support@lopestyle.uz. We will reply within the time limits set by law.',
        ],
      },
      {
        id: 'changes',
        title: '9. Changes to this Policy',
        blocks: [
          'We may update this Policy. A new version takes effect when it is published on this page. The date at the top shows when it was last updated.',
        ],
      },
      {
        id: 'contact',
        title: '10. Contact',
        blocks: ['For questions about personal data: support@lopestyle.uz, +998 94 272 07 05.'],
      },
    ],
  },
};
