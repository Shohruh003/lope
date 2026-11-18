import type { LegalDocuments } from './types';

/// Terms of Use of lope.uz. The site is informational (no accounts, no
/// sales), so these terms cover only using the website: who runs it,
/// that it is not a public offer, intellectual property, acceptable use,
/// external links, liability and governing law. Each product has its own
/// terms (Lope Style: lopestyle.uz/terms).
export const TERMS: LegalDocuments = {
  uz: {
    title: 'Foydalanish shartlari',
    description: 'lope.uz saytidan foydalanish qoidalari.',
    sections: [
      {
        id: 'general',
        title: '1. Umumiy qoidalar',
        blocks: [
          `Ushbu shartlar "LOPE" mas'uliyati cheklangan jamiyati (STIR 313294861; keyingi o'rinlarda — «Kompaniya» yoki «biz») yuritadigan lope.uz veb-saytidan (keyingi o'rinlarda — «Sayt») foydalanish tartibini belgilaydi.`,
          `Saytdan foydalanish orqali siz ushbu shartlarga rozilik bildirasiz. Agar rozi bo'lmasangiz, iltimos, Saytdan foydalanmang.`,
        ],
      },
      {
        id: 'purpose',
        title: '2. Saytning maqsadi',
        blocks: [
          `Sayt Kompaniya va uning mahsulotlari (Lope Style, Lope Store va boshqalar) haqida ma'lumot beradi. Saytdagi ma'lumotlar ommaviy oferta hisoblanmaydi.`,
          `Mahsulotlarimizdan foydalanish ularning alohida shartlari bilan tartibga solinadi. Masalan, Lope Style ilovasi uchun: [lopestyle.uz/terms](https://lopestyle.uz/terms).`,
        ],
      },
      {
        id: 'ip',
        title: '3. Intellektual mulk',
        blocks: [
          `Saytdagi matnlar, dizayn, grafika, fotosuratlar, «Lope» va «Lope Style» nomlari hamda logotiplari Kompaniyaga tegishli yoki qonuniy asosda foydalaniladi.`,
          `Hamkorlarning nomlari va logotiplari (masalan, Payme, CLICK) ularning egalariga tegishli va faqat hamkorlikni ko'rsatish uchun joylashtirilgan.`,
          `Sayt materiallaridan manbaga havola bergan holda shaxsiy va notijorat maqsadlarda iqtibos keltirishingiz mumkin. Boshqa har qanday foydalanish uchun Kompaniyaning yozma roziligi kerak.`,
        ],
      },
      {
        id: 'obligations',
        title: '4. Foydalanuvchining majburiyatlari',
        blocks: [
          'Saytdan foydalanganda quyidagilar taqiqlanadi:',
          {
            list: [
              "Saytning ishlashiga xalaqit berish, uni buzishga yoki himoya choralarini chetlab o'tishga urinish;",
              'aloqa formasi orqali spam, reklama, zararli havola yoki fayllar yuborish;',
              "boshqa shaxs nomidan yoki yolg'on ma'lumotlar bilan murojaat qilish;",
              "O'zbekiston Respublikasi qonunchiligini buzadigan har qanday harakat.",
            ],
          },
        ],
      },
      {
        id: 'links',
        title: '5. Tashqi havolalar',
        blocks: [
          `Saytda App Store, Google Play, Instagram, Telegram va boshqa tashqi resurslarga havolalar bor. Ular o'z egalarining qoidalari asosida ishlaydi. Ularning mazmuni va ishlashi uchun Kompaniya javob bermaydi.`,
        ],
      },
      {
        id: 'liability',
        title: '6. Javobgarlikni cheklash',
        blocks: [
          `Saytdagi ma'lumotlar to'g'ri va dolzarb bo'lishiga harakat qilamiz, biroq ular «boricha» taqdim etiladi va oldindan ogohlantirmasdan o'zgarishi mumkin.`,
          `Qonunchilikda ruxsat etilgan doirada Kompaniya Saytdan foydalanish yoki undan foydalana olmaslik natijasida yuzaga kelgan bilvosita zararlar uchun javobgar emas.`,
          `Texnik ishlar yoki bizga bog'liq bo'lmagan sabablar tufayli Sayt vaqtincha ishlamay qolishi mumkin.`,
        ],
      },
      {
        id: 'personal-data',
        title: "7. Shaxsga doir ma'lumotlar",
        blocks: [
          `Aloqa formasi orqali yuborgan ma'lumotlaringiz [Maxfiylik siyosati](/privacy)ga muvofiq qayta ishlanadi.`,
        ],
      },
      {
        id: 'changes',
        title: "8. Shartlarning o'zgarishi",
        blocks: [
          `Ushbu shartlarni yangilashimiz mumkin. Yangi tahrir shu sahifada e'lon qilingan paytdan kuchga kiradi. Sahifa boshidagi sana oxirgi tahrir sanasini ko'rsatadi.`,
        ],
      },
      {
        id: 'law',
        title: "9. Qo'llaniladigan huquq va nizolar",
        blocks: [
          `Ushbu shartlar O'zbekiston Respublikasi qonunchiligi bilan tartibga solinadi. Nizolar avvalo muzokaralar yo'li bilan hal qilinadi. Kelishuvga erishilmasa, nizo O'zbekiston Respublikasi qonunchiligida belgilangan tartibda sudda ko'rib chiqiladi.`,
        ],
      },
      {
        id: 'contact',
        title: '10. Aloqa',
        blocks: ['Shartlar bo\'yicha savollar uchun: hello@lope.uz, +998 94 272 07 05.'],
      },
    ],
  },

  ru: {
    title: 'Условия использования',
    description: 'Правила использования сайта lope.uz.',
    sections: [
      {
        id: 'general',
        title: '1. Общие положения',
        blocks: [
          'Настоящие Условия определяют порядок использования сайта lope.uz (далее — «Сайт»), который ведёт Общество с ограниченной ответственностью «LOPE» (ИНН 313294861; далее — «Компания» или «мы»).',
          'Пользуясь Сайтом, вы соглашаетесь с настоящими Условиями. Если вы не согласны, пожалуйста, не пользуйтесь Сайтом.',
        ],
      },
      {
        id: 'purpose',
        title: '2. Назначение Сайта',
        blocks: [
          'Сайт содержит информацию о Компании и её продуктах (Lope Style, Lope Store и других). Информация на Сайте не является публичной офертой.',
          'Использование наших продуктов регулируется их отдельными условиями. Например, для приложения Lope Style: [lopestyle.uz/terms](https://lopestyle.uz/terms).',
        ],
      },
      {
        id: 'ip',
        title: '3. Интеллектуальная собственность',
        blocks: [
          'Тексты, дизайн, графика, фотографии, названия и логотипы «Lope» и «Lope Style» на Сайте принадлежат Компании или используются на законных основаниях.',
          'Названия и логотипы партнёров (например, Payme, CLICK) принадлежат их правообладателям и размещены только для указания на сотрудничество.',
          'Вы можете цитировать материалы Сайта в личных некоммерческих целях со ссылкой на источник. Для любого другого использования требуется письменное согласие Компании.',
        ],
      },
      {
        id: 'obligations',
        title: '4. Обязанности пользователя',
        blocks: [
          'При использовании Сайта запрещается:',
          {
            list: [
              'мешать работе Сайта, пытаться взломать его или обойти меры защиты;',
              'отправлять через форму обратной связи спам, рекламу, вредоносные ссылки или файлы;',
              'обращаться от имени другого лица или указывать ложные сведения;',
              'совершать любые действия, нарушающие законодательство Республики Узбекистан.',
            ],
          },
        ],
      },
      {
        id: 'links',
        title: '5. Внешние ссылки',
        blocks: [
          'На Сайте есть ссылки на App Store, Google Play, Instagram, Telegram и другие внешние ресурсы. Они работают по правилам своих владельцев. Компания не отвечает за их содержание и работу.',
        ],
      },
      {
        id: 'liability',
        title: '6. Ограничение ответственности',
        blocks: [
          'Мы стараемся, чтобы информация на Сайте была точной и актуальной, но она предоставляется «как есть» и может меняться без предварительного уведомления.',
          'В пределах, допускаемых законодательством, Компания не несёт ответственности за косвенные убытки, возникшие в связи с использованием Сайта или невозможностью его использования.',
          'Сайт может быть временно недоступен из-за технических работ или по причинам, не зависящим от нас.',
        ],
      },
      {
        id: 'personal-data',
        title: '7. Персональные данные',
        blocks: [
          'Данные, которые вы отправляете через форму обратной связи, обрабатываются в соответствии с [Политикой конфиденциальности](/privacy).',
        ],
      },
      {
        id: 'changes',
        title: '8. Изменение Условий',
        blocks: [
          'Мы можем обновлять настоящие Условия. Новая редакция вступает в силу с момента её публикации на этой странице. Дата в начале страницы указывает дату последней редакции.',
        ],
      },
      {
        id: 'law',
        title: '9. Применимое право и споры',
        blocks: [
          'Настоящие Условия регулируются законодательством Республики Узбекистан. Споры решаются путём переговоров, а если согласие не достигнуто — в суде в порядке, установленном законодательством Республики Узбекистан.',
        ],
      },
      {
        id: 'contact',
        title: '10. Контакты',
        blocks: ['По вопросам об Условиях: hello@lope.uz, +998 94 272 07 05.'],
      },
    ],
  },

  en: {
    title: 'Terms of Use',
    description: 'Rules for using the lope.uz website.',
    sections: [
      {
        id: 'general',
        title: '1. General',
        blocks: [
          'These Terms govern the use of the lope.uz website ("the Site"), run by "LOPE" Limited Liability Company (TIN 313294861; "the Company", "we").',
          'By using the Site you agree to these Terms. If you do not agree, please do not use the Site.',
        ],
      },
      {
        id: 'purpose',
        title: '2. Purpose of the Site',
        blocks: [
          'The Site provides information about the Company and its products (Lope Style, Lope Store and others). Nothing on the Site is a public offer.',
          'Our products are governed by their own terms. For example, for the Lope Style app: [lopestyle.uz/terms](https://lopestyle.uz/terms).',
        ],
      },
      {
        id: 'ip',
        title: '3. Intellectual property',
        blocks: [
          'The texts, design, graphics, photos, and the "Lope" and "Lope Style" names and logos on the Site belong to the Company or are used lawfully.',
          'Partner names and logos (for example, Payme and CLICK) belong to their owners and are shown only to indicate the partnership.',
          "You may quote Site materials for personal, non-commercial purposes with a link to the source. Any other use requires the Company's written consent.",
        ],
      },
      {
        id: 'obligations',
        title: '4. Your obligations',
        blocks: [
          'When using the Site you must not:',
          {
            list: [
              'interfere with the Site, try to break into it or get around its security measures;',
              'send spam, advertising, malicious links or files through the contact form;',
              "contact us in someone else's name or give false information;",
              'do anything that breaks the laws of the Republic of Uzbekistan.',
            ],
          },
        ],
      },
      {
        id: 'links',
        title: '5. External links',
        blocks: [
          "The Site links to the App Store, Google Play, Instagram, Telegram and other external resources. They operate under their owners' rules. The Company is not responsible for their content or availability.",
        ],
      },
      {
        id: 'liability',
        title: '6. Limitation of liability',
        blocks: [
          'We try to keep the information on the Site accurate and up to date, but it is provided "as is" and may change without notice.',
          'To the extent permitted by law, the Company is not liable for indirect losses arising from the use of, or inability to use, the Site.',
          'The Site may be temporarily unavailable because of maintenance or for reasons beyond our control.',
        ],
      },
      {
        id: 'personal-data',
        title: '7. Personal data',
        blocks: [
          'Data you send through the contact form is processed in accordance with our [Privacy Policy](/privacy).',
        ],
      },
      {
        id: 'changes',
        title: '8. Changes to these Terms',
        blocks: [
          'We may update these Terms. A new version takes effect when it is published on this page. The date at the top shows when it was last updated.',
        ],
      },
      {
        id: 'law',
        title: '9. Governing law and disputes',
        blocks: [
          'These Terms are governed by the laws of the Republic of Uzbekistan. Disputes are settled by negotiation first and, if no agreement is reached, in court in the manner established by the laws of the Republic of Uzbekistan.',
        ],
      },
      {
        id: 'contact',
        title: '10. Contact',
        blocks: ['Questions about these Terms: hello@lope.uz, +998 94 272 07 05.'],
      },
    ],
  },
};
