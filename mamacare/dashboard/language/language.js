(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const controller = window.DashboardLanguageController;
  const en = {};
  document.querySelectorAll('[data-i18n]').forEach(el => { en[el.dataset.i18n] = el.textContent; });
  Object.assign(en, {
    controllerUnavailable:'The language service is unavailable. Please refresh the page or try again.', validationError:'Check the highlighted fields.', invalidRequest:'This action could not be completed. Refresh and try again.', openMenu:'Open menu', closeMenu:'Close menu', close:'Close', displayLanguage:'Display language',
    searchPlaceholder:'Search by name or code', loadingTitle:'Loading languages…', loadingDescription:'Getting the latest languages from your dashboard.',
    emptyTitle:'Your first language starts here', emptyDescription:'Add a language to make it available in your app.',
    noMatches:'No matching languages', noMatchesDescription:'Try another name, country code, or language code.',
    errorTitle:'Languages could not be loaded', tryAgain:'Try again', edit:'Edit', editLanguage:'Edit language',
    saveChanges:'Save changes', saving:'Saving…', saved:'Language saved successfully.', added:'Language added successfully.',
    savedRefreshFailed:'Your language was saved, but the latest list could not be fetched. Refresh to try again.',
    required:'This field is required.', tooLong:'Use no more than 10 characters.',
    notFound:'This language is no longer available. Refresh the list and try again.',
    invalidResponse:'The API returned an unexpected response. Check the API URL and try again.',
    serverError:'The server could not complete the request. Please try again.', requestFailed:'The request was rejected. Review the details and try again.',
    timeout:'The request timed out. Please try again.',
    networkError:'Could not load languages. Check your connection and try again.',
    saveUncertain:'The save could not be confirmed. Close this form and refresh the list before trying again to avoid adding the same language twice.',
    results:'{shown} of {total} languages',
  });
  const ar = {
    skip:'انتقل إلى المحتوى', adminWorkspace:'مساحة الإدارة', workspace:'مساحة العمل', language:'اللغة', importProducts:'استيراد المنتجات',
    careTitle:'قليل من الرعاية، وأثر كبير.', careText:'صُمّم بعناية لكل خطوة في رحلة الأمومة.', admin:'مدير المتجر', dashboard:'لوحة التحكم',
    languages:'اللغات', eyebrow:'تطبيقك بكل اللغات', intro:'إدارة اللغات المتاحة في ماما كير هَب.', addLanguage:'إضافة لغة', totalLanguages:'إجمالي اللغات', enabled:'مفعّلة', disabled:'غير مفعّلة',
    allLanguages:'جميع اللغات', listHint:'حدّث أسماء اللغات ورموزها وحالة إتاحتها.', refresh:'تحديث', search:'البحث عن لغة', searchPlaceholder:'ابحث بالاسم أو الرمز', tryAgain:'إعادة المحاولة',
    id:'المعرّف', name:'الاسم', countryCode:'رمز الدولة', languageCode:'رمز اللغة', status:'الحالة', createdDate:'تاريخ الإنشاء', updatedDate:'تاريخ التحديث', action:'الإجراء',
    footer:'صُنع بعناية، لمن يمنحون الرعاية.', languageDetails:'تفاصيل اللغة', formIntro:'أدخل اسم اللغة ورموز اللغة والدولة المستخدمة في تطبيقك.', enableLanguage:'تفعيل هذه اللغة', enableHint:'إتاحة هذه اللغة في التطبيق.', cancel:'إلغاء',
    controllerUnavailable:'خدمة اللغات غير متاحة. حدّث الصفحة أو حاول مجددًا.', validationError:'راجع الحقول المحددة.', invalidRequest:'تعذر إكمال الإجراء. حدّث الصفحة وحاول مجددًا.', openMenu:'فتح القائمة', closeMenu:'إغلاق القائمة', close:'إغلاق', displayLanguage:'لغة العرض', loadingTitle:'جارٍ تحميل اللغات…', loadingDescription:'جارٍ جلب أحدث اللغات من لوحة التحكم.',
    emptyTitle:'ابدأ بإضافة أول لغة', emptyDescription:'أضف لغة لإتاحتها في تطبيقك.', noMatches:'لا توجد لغات مطابقة', noMatchesDescription:'جرّب اسمًا أو رمز دولة أو لغة آخر.',
    errorTitle:'تعذر تحميل اللغات', edit:'تعديل', editLanguage:'تعديل اللغة', saveChanges:'حفظ التغييرات', saving:'جارٍ الحفظ…', saved:'تم حفظ اللغة بنجاح.', added:'تمت إضافة اللغة بنجاح.',
    savedRefreshFailed:'تم حفظ اللغة، لكن تعذر جلب القائمة المحدثة. أعد التحديث للمحاولة مجددًا.', required:'هذا الحقل مطلوب.', tooLong:'استخدم ١٠ أحرف كحد أقصى.',
    notFound:'هذه اللغة لم تعد متاحة. حدّث القائمة وحاول مجددًا.', invalidResponse:'أعادت واجهة API استجابة غير متوقعة. تحقق من الرابط وحاول مجددًا.',
    serverError:'تعذر على الخادم إكمال الطلب. حاول مجددًا.', requestFailed:'تم رفض الطلب. راجع التفاصيل وحاول مجددًا.', timeout:'انتهت مهلة الطلب. حاول مجددًا.',
    networkError:'تعذر تحميل اللغات. تحقق من الاتصال وحاول مجددًا.',
    saveUncertain:'تعذر تأكيد الحفظ. أغلق النموذج وحدّث القائمة قبل المحاولة مجددًا لتجنب إضافة اللغة مرتين.', results:'{shown} من {total} لغة',
  };
  let locale = 'en', records = [], status = 'loading', editing = null, saving = false;
  let loadController = null, lastError = null, feedbackKey = '', formError = null;
  const t = key => (locale === 'ar' ? ar[key] : en[key]) || en[key] || key;
  const fieldText = value => Array.isArray(value) ? value.map(fieldText).join(' ') : typeof value === 'string' ? t(value) : '';
  const errorMessage = error => [t(error.code || 'serverError'), ...Object.values(error.fields || {}).map(fieldText)].filter(Boolean).join(' ');
  const fieldInputs = { name:'name', countryCode:'country-code', languageCode:'language-code' };

  function formatDate(value) {
    if (!value) return '—';
    const date = new Date(value);
    return Number.isNaN(date.valueOf()) ? '—' : new Intl.DateTimeFormat(locale, { dateStyle:'medium', timeStyle:'short' }).format(date);
  }
  function setFeedback(key) {
    feedbackKey = key;
    $('feedback').hidden = !key;
    $('feedback').textContent = key ? t(key) : '';
  }
  function render() {
    const ready = status === 'ready';
    $('language-list').setAttribute('aria-busy', String(status === 'loading'));
    $('add-language').disabled = !ready;
    $('refresh').disabled = status === 'loading';
    $('search').disabled = !ready;
    $('total-count').textContent = ready ? records.length : '—';
    $('enabled-count').textContent = ready ? records.filter(item => item.isEnabled).length : '—';
    $('disabled-count').textContent = ready ? records.filter(item => !item.isEnabled).length : '—';
    const query = $('search').value.trim().toLocaleLowerCase();
    const filtered = records.filter(item => [item.name,item.countryCode,item.languageCode].some(value => value.toLocaleLowerCase().includes(query)));
    $('result-count').textContent = ready ? t('results').replace('{shown}', filtered.length).replace('{total}', records.length) : '';
    $('table-wrap').hidden = !ready || !filtered.length;
    $('list-state').hidden = ready && filtered.length > 0;
    $('retry').hidden = status !== 'error';
    let title = 'loadingTitle', description = 'loadingDescription';
    if (status === 'loading') { title = 'loadingTitle'; description = 'loadingDescription'; }
    if (status === 'error') { title = 'errorTitle'; }
    if (ready) { title = records.length ? 'noMatches' : 'emptyTitle'; description = records.length ? 'noMatchesDescription' : 'emptyDescription'; }
    $('state-title').textContent = t(title);
    $('state-description').textContent = status === 'error' ? errorMessage(lastError) : t(description);
    $('language-rows').replaceChildren();
    if (!ready) return;
    const fragment = document.createDocumentFragment();
    filtered.forEach(record => {
      const row = document.createElement('tr');
      const values = { id:record.id, name:record.name, countryCode:record.countryCode, languageCode:record.languageCode, status:t(record.isEnabled ? 'enabled' : 'disabled'), createdDate:formatDate(record.createdDate), updatedDate:formatDate(record.updatedDate) };
      Object.entries(values).forEach(([key, value]) => {
        const cell = document.createElement('td'), span = document.createElement('span');
        cell.dataset.label = t(key); span.textContent = value;
        if (key === 'status') span.className = `status-badge${record.isEnabled ? ' enabled' : ''}`;
        cell.append(span); row.append(cell);
      });
      const action = document.createElement('td'), button = document.createElement('button');
      action.dataset.label = t('action'); button.className = 'button edit-button'; button.type = 'button';
      button.textContent = t('edit'); button.setAttribute('aria-label', `${t('editLanguage')}: ${record.name}`);
      button.addEventListener('click', () => openForm(record)); action.append(button); row.append(action); fragment.append(row);
    });
    $('language-rows').append(fragment);
  }
  async function loadLanguages({ afterSave = false } = {}) {
    loadController?.abort();
    const controller = new AbortController(); loadController = controller;
    status = 'loading'; lastError = null; render();
    try {
      const list = await window.DashboardLanguageController.list(controller.signal);
      if (controller !== loadController) return;
      records = list; status = 'ready';
    } catch (error) {
      if (controller !== loadController || error.name === 'AbortError') return;
      lastError = error;
      if (afterSave) { status = 'ready'; setFeedback('savedRefreshFailed'); }
      else { records = []; status = 'error'; }
    }
    render();
  }
  function renderFormLabels() {
    $('form-heading').textContent = t(editing ? 'editLanguage' : 'addLanguage');
    $('save-language').textContent = t(saving ? 'saving' : editing ? 'saveChanges' : 'addLanguage');
    if (editing) { $('created-date').value = formatDate(editing.createdDate); $('updated-date').value = formatDate(editing.updatedDate); }
    if (formError) $('form-error').textContent = errorMessage(formError);
  }
  function clearFieldErrors() {
    for (const [key, id] of Object.entries(fieldInputs)) {
      $(id).removeAttribute('aria-invalid'); $(id).removeAttribute('aria-describedby');
      $(`${key}-error`).hidden = true; $(`${key}-error`).textContent = '';
    }
    formError = null; $('form-error').hidden = true; $('form-error').textContent = '';
  }
  function fieldError(key, message) {
    const id = fieldInputs[key];
    $(id).setAttribute('aria-invalid', 'true'); $(id).setAttribute('aria-describedby', `${key}-error`);
    $(`${key}-error`).textContent = message; $(`${key}-error`).hidden = false;
  }
  function openForm(record = null) {
    editing = record ? { ...record } : null;
    $('language-form').reset(); clearFieldErrors();
    $('name').value = record?.name || ''; $('country-code').value = record?.countryCode || ''; $('language-code').value = record?.languageCode || '';
    $('is-enabled').checked = record?.isEnabled || false;
    $('date-fields').hidden = !record;
    renderFormLabels(); $('language-dialog').showModal(); $('name').focus();
  }
  function closeForm() {
    if (saving) return;
    $('language-dialog').close(); editing = null;
  }
  function setSaving(value) {
    saving = value; $('form-fields').disabled = value;
    ['save-language','close-form','cancel-form'].forEach(id => { $(id).disabled = value; });
    $('language-form').setAttribute('aria-busy', String(value)); renderFormLabels();
  }
  $('language-form').addEventListener('submit', async event => {
    event.preventDefault(); if (saving) return;
    clearFieldErrors();
    const values = { name:$('name').value.trim(), countryCode:$('country-code').value.trim(), languageCode:$('language-code').value.trim(), isEnabled:$('is-enabled').checked };
    let invalid = false;
    for (const key of Object.keys(fieldInputs)) {
      if (!values[key]) { fieldError(key, t('required')); invalid = true; }
      else if (key !== 'name' && values[key].length > 10) { fieldError(key, t('tooLong')); invalid = true; }
    }
    if (invalid) { $('language-form').querySelector('[aria-invalid="true"]').focus(); return; }
    const wasEditing = Boolean(editing);
    setSaving(true);
    try {
      const saved = await controller.save(editing, values);
      const index = records.findIndex(item => item.id === saved.id);
      if (index >= 0) records[index] = saved; else records.push(saved);
      setSaving(false); closeForm(); $('search').value = ''; status = 'ready';
      setFeedback(wasEditing ? 'saved' : 'added'); render(); $('add-language').focus();
      await loadLanguages({ afterSave:true });
    } catch (error) {
      setSaving(false); formError = error;
      $('form-error').textContent = errorMessage(error); $('form-error').hidden = false;
      for (const key of Object.keys(fieldInputs)) {
        const detail = error.fields?.[key];
        if (detail) fieldError(key, fieldText(detail));
      }
      $('language-form').querySelector('[aria-invalid="true"]')?.focus();
    }
  });
  $('language-dialog').addEventListener('cancel', event => { if (saving) event.preventDefault(); });
  $('add-language').addEventListener('click', () => openForm());
  $('close-form').addEventListener('click', closeForm); $('cancel-form').addEventListener('click', closeForm);
  $('refresh').addEventListener('click', () => loadLanguages()); $('retry').addEventListener('click', () => loadLanguages());
  $('search').addEventListener('input', render);

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
    document.title = `${t('languages')} · MamaCare Hub`;
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-label]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.label)); });
    document.querySelectorAll('[data-placeholder]').forEach(el => { el.placeholder = t(el.dataset.placeholder); });
    $('drawer').setAttribute('aria-label', t('workspace')); $('language-select').value = locale;
    try { localStorage.setItem('mamacare-dashboard-language', locale); } catch (_) {}
    setFeedback(feedbackKey); render(); renderFormLabels();
  }
  $('language-select').addEventListener('change', event => setLocale(event.target.value));
  $('year').textContent = new Date().getFullYear();
  let savedLocale = 'en'; try { savedLocale = localStorage.getItem('mamacare-dashboard-language') || 'en'; } catch (_) {}
  setLocale(savedLocale); setDrawer(false, false);
  loadLanguages();
})();
