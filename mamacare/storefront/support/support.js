(() => {
  'use strict';
  // Support content matches the existing Flutter ARB translations.
  const copy = {
    "en": {
        "our_support": "Our Support",
        "support_message_one": "If you ever need help while using Mama Care Hub, we’re here to make your experience smooth and stress-free.",
        "support_message_two": "Whether it’s a question, an issue, or feedback, our team is ready to assist.",
        "contact_us": "Contact Us",
        "email": "Email",
        "response": "Response",
        "within_24_48_hours": "within 24–48 hours",
        "availability": "Availability",
        "monday_saturday": "Monday–Saturday",
        "skip": "Skip to support",
        "home": "Home",
        "eyebrow": "MAMACARE HUB",
        "backTop": "Back to top ↑",
        "backHome": "Back to home",
        "switchLanguage": "Switch to Arabic"
    },
    "ar": {
        "our_support": "الدعم",
        "support_message_one": "إذا احتجتِ إلى المساعدة أثناء استخدام ماما كير هَب، فنحن هنا لنجعل تجربتكِ سهلة وخالية من التوتر.",
        "support_message_two": "سواء كان لديكِ سؤال أو مشكلة أو ملاحظة، فإن فريقنا مستعد لمساعدتكِ.",
        "contact_us": "تواصلي معنا",
        "email": "البريد الإلكتروني",
        "response": "وقت الرد",
        "within_24_48_hours": "خلال 24–48 ساعة",
        "availability": "التوفر",
        "monday_saturday": "من الاثنين إلى السبت",
        "skip": "انتقل إلى الدعم",
        "home": "الرئيسية",
        "eyebrow": "ماما كير هَب",
        "backTop": "العودة إلى الأعلى ↑",
        "backHome": "العودة إلى الرئيسية",
        "switchLanguage": "Switch to English"
    }
};
  let locale = new URLSearchParams(location.search).get('lang') === 'ar' ? 'ar' : 'en';
  const languageButton = document.getElementById('language');

  function translate() {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(node => {
      node.textContent = copy[locale][node.dataset.i18n];
    });
    languageButton.textContent = locale === 'ar' ? 'English' : 'العربية';
    languageButton.lang = locale === 'ar' ? 'en' : 'ar';
    languageButton.setAttribute('aria-label', copy[locale].switchLanguage);
    document.querySelectorAll('[data-home-link]').forEach(link => {
      link.href = '../../index.html?lang=' + locale;
    });
    document.title = `${copy[locale].our_support} · MamaCare Hub`;
  }

  languageButton.addEventListener('click', () => {
    locale = locale === 'en' ? 'ar' : 'en';
    const url = new URL(location.href);
    url.searchParams.set('lang', locale);
    history.replaceState(null, '', url);
    translate();
  });
  document.getElementById('year').textContent = new Date().getFullYear();
  translate();
})();
