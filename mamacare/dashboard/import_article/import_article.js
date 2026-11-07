(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const maxBytes = 5 * 1024 * 1024;
  const en = {};
  document.querySelectorAll('[data-i18n]').forEach(el => { en[el.dataset.i18n] = el.textContent; });
  Object.assign(en, {
    openMenu:'Open menu', closeMenu:'Close menu', displayLanguage:'Display language',
    invalidFile:'Choose one .json file no larger than 5 MB.', tooLarge:'Use JSON no larger than 5 MB.',
    readError:'The file could not be opened. Please choose it again.', reading:'Reading your JSON file…',
    emptyJson:'Drop a JSON file or write or paste JSON in the text field.',
    invalidJson:'This JSON could not be read. Check the quotes, commas, and brackets, then try again.',
    invalidStructure:'Use an article JSON object with a non-empty content_information object.',
    checked:'Your JSON is valid. Review the article overview below.', untitled:'Untitled article',
    educational_content:'Educational content', problem_solution_content:'Problem and solution',
    relatable_content:'Relatable content', interactive_content:'Interactive content', story_content:'Story content',
    tip_quote:'Tips and quotes', checklist:'Checklist', app_actions:'App actions', content_safety:'Content safety',
    importing:'Importing article…', added:'Article added successfully.', updated:'Article updated successfully.', articleId:'Article ID',
    controllerUnavailable:'The article import service is unavailable. Refresh the page or try again.',
    invalidRequest:'The import request could not be completed. Check your JSON and try again.',
    requestFailed:'The article could not be imported. Review the details below.',
    saveUncertain:'The import could not be confirmed. Check the article records before trying again.',
  });
  const ar = {
    articles:'المقالات',
    skip:'انتقل إلى المحتوى', adminWorkspace:'مساحة الإدارة', workspace:'مساحة العمل', language:'اللغة',
    importProducts:'استيراد المنتجات', pregnancyWeeks:'أسابيع الحمل', importArticle:'استيراد مقال',
    careTitle:'قليل من الرعاية، وأثر كبير.', careText:'صُمّم بعناية لكل خطوة في رحلة الأمومة.',
    admin:'مدير المتجر', dashboard:'لوحة التحكم', footer:'صُنع بعناية، لمن يمنحون الرعاية.',
    openMenu:'فتح القائمة', closeMenu:'إغلاق القائمة', displayLanguage:'لغة العرض',
    eyebrow:'مقالك القادم يبدأ هنا', intro:'اسحب ملف JSON وأفلته أو الصق محتوى المقال أدناه.',
    articleJson:'ملف JSON للمقال', inputHint:'اختر إحدى الطريقتين. سيظهر محتوى الملف في حقل النص.',
    jsonOnly:'JSON فقط', dropTitle:'اسحب ملف JSON وأفلته هنا', dropSubtitle:'أو اختر ملفًا من جهازك',
    browseFiles:'اختيار ملف JSON', fileHint:'ملف .json واحد · حتى ٥ ميجابايت', orPaste:'أو الصق JSON',
    jsonContent:'محتوى JSON', jsonHint:'اكتب أو الصق محتوى JSON الكامل للمقال، بما فيه content_information.',
    clear:'مسح', format:'تنسيق JSON', checkJson:'فحص JSON',
    localNote:'راجع JSON ثم اختر استيراد مقال لحفظه. تُحدّث المقالات الموجودة تلقائيًا.',
    articlePreview:'معاينة المقال', previewHint:'نظرة سريعة على محتوى JSON.', validJson:'JSON صالح',
    noSections:'لم تتم إضافة أقسام للمحتوى.', untitled:'مقال بلا عنوان',
    invalidFile:'اختر ملف .json واحدًا لا يزيد حجمه عن ٥ ميجابايت.', tooLarge:'استخدم JSON لا يزيد حجمه عن ٥ ميجابايت.',
    readError:'تعذر فتح الملف. يرجى اختياره مجددًا.', reading:'جارٍ قراءة ملف JSON…',
    emptyJson:'اسحب ملف JSON وأفلته أو اكتب أو الصق JSON في حقل النص.',
    invalidJson:'تعذرت قراءة JSON. راجع علامات الاقتباس والفواصل والأقواس ثم حاول مجددًا.',
    invalidStructure:'استخدم كائن JSON لمقال يحتوي على كائن content_information غير فارغ.',
    checked:'JSON صالح. راجع نظرة المقال أدناه.',
    educational_content:'المحتوى التعليمي', problem_solution_content:'المشكلة والحل', relatable_content:'المحتوى القريب منك',
    interactive_content:'المحتوى التفاعلي', story_content:'المحتوى القصصي', tip_quote:'النصائح والاقتباسات',
    checklist:'قائمة المتابعة', app_actions:'إجراءات التطبيق', content_safety:'سلامة المحتوى',
    importing:'جارٍ استيراد المقال…', added:'تمت إضافة المقال بنجاح.', updated:'تم تحديث المقال بنجاح.', articleId:'معرّف المقال',
    controllerUnavailable:'خدمة استيراد المقالات غير متاحة. حدّث الصفحة أو حاول مجددًا.',
    invalidRequest:'تعذر إكمال طلب الاستيراد. راجع JSON وحاول مجددًا.',
    requestFailed:'تعذر استيراد المقال. راجع التفاصيل أدناه.',
    saveUncertain:'تعذر تأكيد الاستيراد. تحقق من سجلات المقالات قبل المحاولة مجددًا.',
  };
  const sections = ['educational_content','problem_solution_content','relatable_content','interactive_content','story_content','tip_quote','checklist','app_actions','content_safety'];
  let locale = 'en', parsed = null, feedbackKey = '', feedbackError = false, reading = false, readVersion = 0;
  let saving = false, importResult = null, importError = null;
  const t = key => (locale === 'ar' ? ar[key] : en[key]) || en[key] || key;
  const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);

  function setFeedback(key = '', error = false) {
    feedbackKey = key; feedbackError = error;
    $('feedback').hidden = !key;
    $('feedback').textContent = key ? t(key) : '';
    $('feedback').classList.toggle('error', error);
  }
  function updateControls() {
    $('clear-json').disabled = saving || (!reading && !$('json-text').value && !feedbackKey);
    $('validate-json').disabled = saving || reading || !$('json-text').value.trim();
    $('format-json').disabled = saving || reading || !parsed;
    $('import-json').disabled = saving || reading || !parsed || !!importResult;
    $('import-json').textContent = t(saving ? 'importing' : 'importArticle');
    $('json-text').disabled = saving;
    $('browse-files').disabled = saving;
    $('json-file').disabled = saving;
    $('json-form').setAttribute('aria-busy', String(reading || saving));
  }
  function errorDetails(value) {
    if (Array.isArray(value)) return value.map(errorDetails).filter(Boolean).join(' ');
    if (object(value)) return Object.entries(value).map(([key, detail]) => `${key}: ${errorDetails(detail)}`).join(' ');
    return typeof value === 'string' ? value : '';
  }
  function renderImportResult() {
    const feedback = $('import-result');
    feedback.hidden = !saving && !importResult && !importError;
    feedback.classList.toggle('error', !!importError);
    feedback.classList.toggle('success', !!importResult);
    feedback.setAttribute('role', importError ? 'alert' : 'status');
    if (saving) feedback.textContent = t('importing');
    else if (importResult) feedback.textContent = `${t(importResult.isCreated ? 'added' : 'updated')} ${t('articleId')}: ${new Intl.NumberFormat(locale, { useGrouping:false }).format(importResult.id)}`;
    else if (importError) feedback.textContent = [t(importError.code || 'requestFailed'), errorDetails(importError.fields)].filter(Boolean).join(' ');
    else feedback.textContent = '';
  }
  function invalidate() {
    parsed = null; importResult = null; importError = null; renderImportResult();
    $('preview').hidden = true;
    $('json-text').removeAttribute('aria-invalid');
    setFeedback(); updateControls();
  }
  function localized(value) {
    if (!object(value)) return '';
    const items = Object.entries(value).filter(([, text]) => typeof text === 'string' && text.trim());
    return items.find(([code]) => code.toLowerCase().split(/[_-]/)[0] === locale)?.[1] || items[0]?.[1] || '';
  }
  function renderPreview() {
    $('preview').hidden = !parsed;
    if (!parsed) return;
    const info = parsed.content_information;
    $('article-topic').textContent = localized(info.topic) || t('untitled');
    const category = [info.category, info.subcategory].map(value => localized(value?.title || value)).filter(Boolean).join(' · ');
    $('article-category').textContent = category; $('article-category').hidden = !category;
    const fragment = document.createDocumentFragment();
    for (const key of sections) {
      const value = parsed[key];
      const count = Array.isArray(value) ? value.filter(object).length : object(value) ? 1 : 0;
      if (!count) continue;
      const item = document.createElement('li'), label = document.createElement('span'), badge = document.createElement('strong');
      label.textContent = t(key); badge.className = 'section-count';
      badge.textContent = new Intl.NumberFormat(locale).format(count);
      item.append(label, badge); fragment.append(item);
    }
    $('section-list').replaceChildren(fragment);
    $('no-sections').hidden = $('section-list').childElementCount > 0;
  }
  function validate() {
    invalidate();
    const text = $('json-text').value.replace(/^\uFEFF/, '');
    let error = '';
    if (!text.trim()) error = 'emptyJson';
    else if (new Blob([text]).size > maxBytes) error = 'tooLarge';
    else {
      try {
        const data = JSON.parse(text);
        if (!object(data) || !object(data.content_information) || !Object.keys(data.content_information).length) error = 'invalidStructure';
        else parsed = data;
      } catch (_) { error = 'invalidJson'; }
    }
    if (error) {
      $('json-text').setAttribute('aria-invalid', 'true'); setFeedback(error, true);
    } else {
      setFeedback('checked'); renderPreview();
    }
    updateControls();
    return !error;
  }
  async function loadFile(files) {
    if (saving) return;
    const version = ++readVersion;
    reading = false; invalidate();
    const file = files?.[0];
    if (files?.length !== 1 || !file || !/\.json$/i.test(file.name) || file.size > maxBytes) {
      setFeedback('invalidFile', true); updateControls(); return;
    }
    reading = true; setFeedback('reading'); updateControls();
    try {
      const text = await file.text();
      if (version !== readVersion) return;
      reading = false;
      $('json-text').value = text.replace(/^\uFEFF/, '');
      $('file-name').textContent = file.name; $('file-name').hidden = false;
      validate();
    } catch (_) {
      if (version !== readVersion) return;
      reading = false; setFeedback('readError', true); updateControls();
    }
  }
  $('json-form').addEventListener('submit', event => { event.preventDefault(); if (!reading && !saving) validate(); });
  $('import-json').addEventListener('click', async () => {
    if (saving || reading || importResult || !validate()) return;
    saving = true; importError = null; setFeedback(); renderImportResult(); updateControls();
    try {
      const result = await window.DashboardImportArticleController.importArticle(parsed);
      if (!object(result) || !Number.isInteger(result.id) || result.id < 1 || typeof result.isCreated !== 'boolean') {
        throw { code:'saveUncertain' };
      }
      importResult = result;
    } catch (error) {
      importError = { code:error?.code || 'saveUncertain', fields:error?.fields || {} };
    } finally {
      saving = false; renderImportResult(); updateControls();
    }
  });
  $('json-text').addEventListener('input', () => {
    ++readVersion; reading = false; $('file-name').hidden = true; $('json-file').value = ''; invalidate();
  });
  $('browse-files').addEventListener('click', () => $('json-file').click());
  $('json-file').addEventListener('change', event => {
    const files = Array.from(event.target.files); event.target.value = '';
    if (files.length) loadFile(files);
  });
  $('format-json').addEventListener('click', () => {
    if (!parsed || saving) return;
    $('json-text').value = JSON.stringify(parsed, null, 2); $('json-text').focus();
  });
  $('clear-json').addEventListener('click', () => {
    ++readVersion; reading = false; $('json-text').value = ''; $('json-file').value = '';
    $('file-name').textContent = ''; $('file-name').hidden = true; invalidate(); $('json-text').focus();
  });
  const dropZone = $('drop-zone');
  let dragDepth = 0;
  const draggingFiles = event => Array.from(event.dataTransfer?.types || []).includes('Files');
  dropZone.addEventListener('dragenter', event => {
    if (!draggingFiles(event)) return;
    event.preventDefault(); ++dragDepth; dropZone.classList.add('dragging');
  });
  dropZone.addEventListener('dragover', event => {
    if (!draggingFiles(event)) return;
    event.preventDefault(); event.dataTransfer.dropEffect = 'copy';
  });
  dropZone.addEventListener('dragleave', () => {
    dragDepth = Math.max(0, dragDepth - 1); if (!dragDepth) dropZone.classList.remove('dragging');
  });
  dropZone.addEventListener('drop', event => {
    event.preventDefault(); dragDepth = 0; dropZone.classList.remove('dragging'); loadFile(event.dataTransfer.files);
  });
  ['dragover','drop'].forEach(type => document.addEventListener(type, event => {
    if (draggingFiles(event)) event.preventDefault();
    if (type === 'drop') { dragDepth = 0; dropZone.classList.remove('dragging'); }
  }));

  const mobile = matchMedia('(max-width:760px)');
  function setDrawer(open, focus = true) {
    const visible = open && mobile.matches;
    $('drawer').classList.toggle('open', visible); $('backdrop').classList.toggle('open', visible);
    document.body.classList.toggle('drawer-open', visible); $('open-drawer').setAttribute('aria-expanded', String(visible));
    $('drawer').inert = mobile.matches && !visible; $('workspace').inert = visible;
    if (visible) $('close-drawer').focus(); else if (focus && mobile.matches) $('open-drawer').focus();
  }
  $('open-drawer').addEventListener('click', () => setDrawer(true));
  $('close-drawer').addEventListener('click', () => setDrawer(false));
  $('backdrop').addEventListener('click', () => setDrawer(false));
  mobile.addEventListener('change', () => setDrawer(false, false));
  document.addEventListener('keydown', event => {
    if (!$('drawer').classList.contains('open')) return;
    if (event.key === 'Escape') setDrawer(false);
    if (event.key === 'Tab') {
      const items = $('drawer').querySelectorAll('button,a[href]'), first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  function setLocale(value) {
    locale = value === 'ar' ? 'ar' : 'en'; document.documentElement.lang = locale; document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.title = `${t('importArticle')} · MamaCare Hub`;
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-label]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.label)); });
    $('drawer').setAttribute('aria-label', t('workspace')); $('language-select').value = locale;
    try { localStorage.setItem('mamacare-dashboard-language', locale); } catch (_) {}
    setFeedback(feedbackKey, feedbackError); renderPreview(); renderImportResult(); updateControls();
  }
  $('language-select').addEventListener('change', event => setLocale(event.target.value));
  $('year').textContent = new Date().getFullYear();
  let savedLocale = 'en'; try { savedLocale = localStorage.getItem('mamacare-dashboard-language') || 'en'; } catch (_) {}
  setLocale(savedLocale); setDrawer(false, false); updateControls();
})();
