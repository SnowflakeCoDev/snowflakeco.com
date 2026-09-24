(() => {
  'use strict';
  const copy = {
    en: {
      skip:'Skip to terms', home:'Home', eyebrow:'MAMACARE HUB', title:'Terms of Use',
      intro:'Please take a moment to read the terms for using MamaCare Hub.', contents:'On this page',
      retry:'Try again', backTop:'Back to top ↑', backHome:'Back to home', loading:'Loading terms…',
      empty:'No terms are available in this language yet.', updated:'Last updated',
      error:'We couldn’t load the terms. Please try again.',
      languageUnavailable:'Terms are not available in this language. Please choose another language.',
      section:'Section', switchLanguage:'Switch to Arabic',
    },
    ar: {
      skip:'انتقل إلى الشروط', home:'الرئيسية', eyebrow:'ماما كير هَب', title:'شروط الاستخدام',
      intro:'يرجى تخصيص لحظة لقراءة شروط استخدام ماما كير هَب.', contents:'في هذه الصفحة',
      retry:'حاول مرة أخرى', backTop:'العودة إلى الأعلى ↑', backHome:'العودة إلى الرئيسية', loading:'جارٍ تحميل الشروط…',
      empty:'لا توجد شروط متاحة بهذه اللغة حالياً.', updated:'آخر تحديث',
      error:'تعذّر تحميل الشروط. يرجى المحاولة مرة أخرى.',
      languageUnavailable:'الشروط غير متاحة بهذه اللغة. يرجى اختيار لغة أخرى.',
      section:'القسم', switchLanguage:'Switch to English',
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
    element('terms').setAttribute('aria-busy', String(loading));
  }

  function render(data) {
    // Treat API content as text, matching the original Flutter Terms view.
    const sections = (data?.sections || []).filter(section =>
      section.description?.trim() || section.contents?.some(text => text.trim()));
    if (!sections.length) {
      showStatus(copy[locale].empty, false, true);
      return;
    }
    if (data.title?.trim()) {
      element('title').textContent = data.title;
      document.title = `${data.title} · MamaCare Hub`;
    }
    const date = data.updatedDate ? new Date(data.updatedDate) : null;
    if (date && !Number.isNaN(date.getTime())) {
      element('updated').textContent = `${copy[locale].updated}: ${new Intl.DateTimeFormat(locale, { dateStyle:'long' }).format(date)}`;
      element('updated').hidden = false;
    }
    sections.forEach((section, index) => {
      const block = document.createElement('section');
      block.id = `section-${index + 1}`;
      block.tabIndex = -1;
      const heading = document.createElement('h2');
      const label = section.description?.trim() || `${copy[locale].section} ${index + 1}`;
      heading.textContent = section.keyName ? `${section.keyName}. ${label}` : label;
      block.append(heading);
      for (const text of section.contents || []) {
        if (!text.trim()) continue;
        const paragraph = document.createElement('p');
        paragraph.textContent = text;
        block.append(paragraph);
      }
      element('terms').append(block);
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${block.id}`;
      link.textContent = heading.textContent;
      item.append(link);
      element('section-links').append(item);
    });
    element('terms').hidden = false;
    element('terms').setAttribute('aria-busy', 'false');
    element('contents').hidden = false;
    element('status').hidden = true;
  }

  async function load() {
    const request = ++generation;
    currentRequest?.abort();
    currentRequest = new AbortController();
    translate();
    element('terms').replaceChildren();
    element('section-links').replaceChildren();
    element('terms').hidden = true;
    element('contents').hidden = true;
    element('updated').hidden = true;
    showStatus(copy[locale].loading, true);
    try {
      const data = await window.StorefrontTermsController.read(locale, currentRequest.signal);
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
