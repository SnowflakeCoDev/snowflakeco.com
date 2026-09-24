(() => {
  'use strict';
  const copy = {
    en: {
      skip:'Skip to FAQs', home:'Home', eyebrow:'MAMACARE HUB', title:'Frequently Asked Questions',
      intro:'Find answers to common questions about MamaCare Hub.', contents:'On this page',
      retry:'Try again', backTop:'Back to top ↑', backHome:'Back to home', loading:'Loading FAQs…',
      empty:'FAQs are not available in this language yet.',
      error:'We couldn’t load the FAQs. Please try again.',
      languageUnavailable:'FAQs are not available in this language. Please choose another language.',
      category:'Category', question:'Question', switchLanguage:'Switch to Arabic',
    },
    ar: {
      skip:'انتقل إلى الأسئلة الشائعة', home:'الرئيسية', eyebrow:'ماما كير هَب', title:'الأسئلة الشائعة',
      intro:'اعثر على إجابات للأسئلة الشائعة حول ماما كير هَب.', contents:'في هذه الصفحة',
      retry:'حاول مرة أخرى', backTop:'العودة إلى الأعلى ↑', backHome:'العودة إلى الرئيسية', loading:'جارٍ تحميل الأسئلة الشائعة…',
      empty:'الأسئلة الشائعة غير متاحة بهذه اللغة حالياً.',
      error:'تعذّر تحميل الأسئلة الشائعة. يرجى المحاولة مرة أخرى.',
      languageUnavailable:'الأسئلة الشائعة غير متاحة بهذه اللغة. يرجى اختيار لغة أخرى.',
      category:'الفئة', question:'السؤال', switchLanguage:'Switch to English',
    },
  };
  const element = id => document.getElementById(id);
  let locale = new URLSearchParams(location.search).get('lang') === 'ar' ? 'ar' : 'en';
  let currentRequest = null;
  let generation = 0;

  function translate() {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(node => { node.textContent = copy[locale][node.dataset.i18n]; });
    element('language').textContent = locale === 'ar' ? 'English' : 'العربية';
    element('language').lang = locale === 'ar' ? 'en' : 'ar';
    element('language').setAttribute('aria-label', copy[locale].switchLanguage);
    document.querySelectorAll('[data-home-link]').forEach(link => {
      link.href = '../../index.html?lang=' + locale;
    });
    document.title = `${copy[locale].title} · MamaCare Hub`;
  }

  function showStatus(message, loading = false, retry = false) {
    element('status').hidden = false;
    element('status-message').textContent = message;
    element('status').querySelector('.spinner').hidden = !loading;
    element('retry').hidden = !retry;
    element('faq').setAttribute('aria-busy', String(loading));
  }

  function render(data) {
    // Render translated API content as text, as in the original Flutter view.
    const categories = (data?.categories || []).map(category => ({
      ...category,
      questions:(category.questions || []).filter(faq => faq.question?.trim() || faq.answer?.trim()),
    })).filter(category => category.questions.length);
    if (!categories.length) {
      showStatus(copy[locale].empty, false, true);
      return;
    }
    categories.forEach((category, index) => {
      const block = document.createElement('section');
      block.id = `category-${index + 1}`;
      block.tabIndex = -1;
      const heading = document.createElement('h2');
      heading.textContent = `${index + 1}. ${category.title?.trim() || copy[locale].category}`;
      block.append(heading);
      category.questions.forEach((faq, questionIndex) => {
        const question = document.createElement('h3');
        question.textContent = `${index + 1}.${questionIndex + 1}. ${faq.question?.trim() || copy[locale].question}`;
        const answer = document.createElement('p');
        answer.textContent = faq.answer || '';
        block.append(question, answer);
      });
      element('faq').append(block);
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${block.id}`;
      link.textContent = heading.textContent;
      item.append(link);
      element('section-links').append(item);
    });
    element('faq').hidden = false;
    element('faq').setAttribute('aria-busy', 'false');
    element('contents').hidden = false;
    element('status').hidden = true;
  }

  async function load() {
    const request = ++generation;
    currentRequest?.abort();
    currentRequest = new AbortController();
    translate();
    element('faq').replaceChildren();
    element('section-links').replaceChildren();
    element('faq').hidden = true;
    element('contents').hidden = true;
    showStatus(copy[locale].loading, true);
    try {
      const data = await window.StorefrontFAQController.read(locale, currentRequest.signal);
      if (request === generation) render(data);
    } catch (error) {
      if (request !== generation || error.name === 'AbortError') return;
      showStatus(error.code === 'languageUnavailable' ? copy[locale].languageUnavailable : copy[locale].error, false, true);
    }
  }

  element('language').addEventListener('click', () => {
    locale = locale === 'en' ? 'ar' : 'en';
    const url = new URL(location.href);
    url.searchParams.set('lang', locale);
    url.hash = '';
    history.replaceState(null, '', url);
    load();
  });
  element('retry').addEventListener('click', load);
  element('year').textContent = new Date().getFullYear();
  load();
})();
