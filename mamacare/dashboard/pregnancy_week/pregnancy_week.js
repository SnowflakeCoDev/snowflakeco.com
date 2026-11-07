(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const controller = window.DashboardPregnancyWeekController;
  const selectedId = new URLSearchParams(location.search).get('id');
  const isDetail = selectedId !== null;
  const en = {};
  document.querySelectorAll('[data-i18n]').forEach(el => { en[el.dataset.i18n] = el.textContent; });
  Object.assign(en, {
    intro:'Browse pregnancy weeks and open a week to view its details.', detailIntro:'Pregnancy information for this week.',
    openMenu:'Open menu', closeMenu:'Close menu', displayLanguage:'Display language', searchPlaceholder:'Search by week or name',
    loadingTitle:'Loading pregnancy weeks…', loadingDetail:'Loading week details…', loadingDescription:'Getting the latest information from your dashboard.',
    emptyTitle:'No pregnancy weeks yet', emptyDescription:'Pregnancy weeks will appear here when they are available.',
    noMatches:'No matching weeks', noMatchesDescription:'Try another week number or name.',
    errorTitle:'Pregnancy weeks could not be loaded', detailError:'This week could not be loaded',
    controllerUnavailable:'The pregnancy week service is unavailable. Refresh the page or try again.',
    networkError:'Could not load pregnancy information. Check your connection and try again.',
    languageUnavailable:'Pregnancy information is not available in this language. Choose another display language.',
    invalidRequest:'This week link is invalid. Return to the list and select a week.',
    notFound:'This week is no longer available. Return to the list and select another week.',
    requestFailed:'The request could not be completed. Please try again.', timeout:'The request timed out. Please try again.',
    invalidResponse:'The service returned an unexpected response. Please try again.',
    results:'{shown} of {total} weeks', weekTitle:'Week {number}', viewDetails:'View details',
    createdDate:'Created date', fetalDevelopment:'Fetal development', babySize:'Baby size', symptoms:'Symptoms',
    nutrition:'Nutrition', checklist:'Checklist', monthlyTip:'Monthly tips', monthNumber:'Month {number}',
    noInformation:'No information available.', copyText:'Copy text', copied:'Copied!', copyFailed:'Could not copy. Select the text and copy it manually.',
  });
  const ar = {
    articles:'المقالات',
    importArticle:'استيراد مقال',
    skip:'انتقل إلى المحتوى', adminWorkspace:'مساحة الإدارة', workspace:'مساحة العمل', language:'اللغة', importProducts:'استيراد المنتجات',
    careTitle:'قليل من الرعاية، وأثر كبير.', careText:'صُمّم بعناية لكل خطوة في رحلة الأمومة.', admin:'مدير المتجر', dashboard:'لوحة التحكم',
    pregnancyWeeks:'أسابيع الحمل', eyebrow:'رعاية أسبوعًا بأسبوع', intro:'تصفّح أسابيع الحمل واختر أسبوعًا لعرض تفاصيله.', detailIntro:'معلومات الحمل لهذا الأسبوع.',
    backToList:'العودة إلى الأسابيع', allWeeks:'جميع أسابيع الحمل', listHint:'اختر أسبوعًا لعرض معلومات الحمل الخاصة به.',
    refresh:'تحديث', search:'البحث عن أسبوع', searchPlaceholder:'ابحث برقم الأسبوع أو الاسم', tryAgain:'إعادة المحاولة',
    id:'المعرّف', weekNumber:'الأسبوع', keyName:'الاسم', trimester:'ثلث الحمل', updatedDate:'تاريخ التحديث', createdDate:'تاريخ الإنشاء', action:'الإجراء',
    weekDetails:'تفاصيل الأسبوع', footer:'صُنع بعناية، لمن يمنحون الرعاية.', openMenu:'فتح القائمة', closeMenu:'إغلاق القائمة', displayLanguage:'لغة العرض',
    loadingTitle:'جارٍ تحميل أسابيع الحمل…', loadingDetail:'جارٍ تحميل تفاصيل الأسبوع…', loadingDescription:'جارٍ جلب أحدث المعلومات من لوحة التحكم.',
    emptyTitle:'لا توجد أسابيع حمل بعد', emptyDescription:'ستظهر أسابيع الحمل هنا عند توفرها.', noMatches:'لا توجد أسابيع مطابقة', noMatchesDescription:'جرّب رقم أسبوع أو اسمًا آخر.',
    errorTitle:'تعذر تحميل أسابيع الحمل', detailError:'تعذر تحميل هذا الأسبوع', controllerUnavailable:'خدمة أسابيع الحمل غير متاحة. حدّث الصفحة أو حاول مجددًا.',
    networkError:'تعذر تحميل معلومات الحمل. تحقق من الاتصال وحاول مجددًا.', languageUnavailable:'معلومات الحمل غير متاحة بهذه اللغة. اختر لغة عرض أخرى.',
    invalidRequest:'رابط الأسبوع غير صالح. عد إلى القائمة واختر أسبوعًا.', notFound:'هذا الأسبوع لم يعد متاحًا. عد إلى القائمة واختر أسبوعًا آخر.',
    requestFailed:'تعذر إكمال الطلب. حاول مجددًا.', timeout:'انتهت مهلة الطلب. حاول مجددًا.', invalidResponse:'أعادت الخدمة استجابة غير متوقعة. حاول مجددًا.',
    results:'{shown} من {total} أسبوع', weekTitle:'الأسبوع {number}', viewDetails:'عرض التفاصيل', fetalDevelopment:'نمو الجنين', babySize:'حجم الجنين',
    symptoms:'الأعراض', nutrition:'التغذية', checklist:'قائمة المتابعة', monthlyTip:'نصائح الشهر', monthNumber:'الشهر {number}', noInformation:'لا توجد معلومات متاحة.',
    copyText:'نسخ النص', copied:'تم النسخ!', copyFailed:'تعذر النسخ. حدد النص وانسخه يدويًا.',
  };
  let locale = 'en', records = [], week = null, status = 'loading', lastError = null, loadController = null;
  let copyFeedbackTimer = null;
  const t = key => (locale === 'ar' ? ar[key] : en[key]) || en[key] || key;
  const number = value => value == null ? '—' : new Intl.NumberFormat(locale, { useGrouping:false }).format(value);
  const weekTitle = record => t('weekTitle').replace('{number}', number(record.weekNumber));
  const text = value => typeof value === 'string' && value.trim() ? value : '—';
  function formatDate(value) {
    if (!value) return '—';
    const date = new Date(value);
    return Number.isNaN(date.valueOf()) ? '—' : new Intl.DateTimeFormat(locale, { dateStyle:'medium', timeStyle:'short' }).format(date);
  }
  function render() {
    const ready = status === 'ready';
    $('main').setAttribute('aria-busy', String(status === 'loading'));
    $('back-link').hidden = !isDetail;
    $('week-list').hidden = isDetail;
    $('week-detail').hidden = !isDetail || !ready;
    $('page-title').textContent = isDetail ? (ready ? weekTitle(week) : t('weekDetails')) : t('pregnancyWeeks');
    $('page-intro').textContent = t(isDetail ? 'detailIntro' : 'intro');
    document.title = `${$('page-title').textContent} · MamaCare Hub`;
    $('refresh').disabled = status === 'loading';
    $('refresh-detail').disabled = status === 'loading';
    $('search').disabled = !ready;
    const query = $('search').value.trim().toLocaleLowerCase();
    const filtered = records.filter(item => [item.weekNumber, number(item.weekNumber), item.keyName, weekTitle(item)].some(value => String(value ?? '').toLocaleLowerCase().includes(query)));
    $('result-count').textContent = ready ? t('results').replace('{shown}', number(filtered.length)).replace('{total}', number(records.length)) : '';
    $('table-wrap').hidden = isDetail || !ready || !filtered.length;
    $('list-state').hidden = ready && (isDetail || filtered.length > 0);
    $('retry').hidden = status !== 'error';
    let title = isDetail ? 'loadingDetail' : 'loadingTitle', description = 'loadingDescription';
    if (status === 'error') title = isDetail ? 'detailError' : 'errorTitle';
    if (ready && !isDetail) {
      title = records.length ? 'noMatches' : 'emptyTitle';
      description = records.length ? 'noMatchesDescription' : 'emptyDescription';
    }
    $('state-title').textContent = t(title);
    $('state-description').textContent = status === 'error' ? t(lastError?.code || 'networkError') : t(description);
    $('week-rows').replaceChildren();
    if (!ready) return;
    if (isDetail) { renderDetail(); return; }
    const fragment = document.createDocumentFragment();
    filtered.forEach(record => {
      const row = document.createElement('tr');
      const href = `index.html?id=${encodeURIComponent(record.id)}`;
      const values = { id:number(record.id), weekNumber:weekTitle(record), keyName:text(record.keyName), trimester:number(record.trimester), updatedDate:formatDate(record.updatedDate) };
      Object.entries(values).forEach(([key, value]) => {
        const cell = document.createElement('td'), content = document.createElement(key === 'weekNumber' ? 'a' : 'span');
        cell.dataset.label = t(key); content.textContent = value;
        if (key === 'weekNumber') { content.href = href; content.className = 'week-link'; }
        cell.append(content); row.append(cell);
      });
      const action = document.createElement('td'), link = document.createElement('a');
      action.dataset.label = t('action'); link.className = 'button edit-button'; link.href = href;
      link.textContent = t('viewDetails'); link.setAttribute('aria-label', `${t('viewDetails')}: ${weekTitle(record)}`);
      action.append(link); row.append(action);
      row.addEventListener('click', event => {
        if (!event.target.closest('a') && !window.getSelection()?.toString()) location.assign(href);
      });
      fragment.append(row);
    });
    $('week-rows').append(fragment);
  }
  function setImage(image, value, alt) {
    image.hidden = true; image.removeAttribute('src'); image.alt = alt;
    if (typeof value !== 'string' || !value.trim()) return;
    let url; try { url = new URL(value); } catch (_) { return; }
    if (!['http:', 'https:'].includes(url.protocol)) return;
    image.onerror = () => { image.hidden = true; };
    image.src = url.href; image.hidden = false;
  }
  function section(key) {
    const panel = document.createElement('section'), heading = document.createElement('h2'), header = document.createElement('div'), body = document.createElement('div');
    panel.className = 'panel'; header.className = 'panel-head'; body.className = 'detail-body';
    heading.textContent = t(key); heading.id = `section-${key}`; panel.setAttribute('aria-labelledby', heading.id);
    header.append(heading); panel.append(header, body); $('detail-sections').append(panel);
    return body;
  }
  async function copyToClipboard(value) {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return;
    }
    // Support dashboard previews served over HTTP without the Clipboard API.
    const input = document.createElement('textarea'), focused = document.activeElement;
    input.value = value; input.readOnly = true;
    input.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none';
    document.body.append(input);
    try {
      input.select(); input.setSelectionRange(0, value.length);
      if (!document.execCommand('copy')) throw new Error('copyFailed');
    } finally {
      input.remove(); focused?.focus({ preventScroll:true });
    }
  }
  function copyText(parent, value) {
    const wrapper = document.createElement('span'), content = document.createElement('span'), button = document.createElement('button');
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg'), use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    wrapper.className = 'copy-text'; content.className = 'copy-value'; content.textContent = value;
    button.type = 'button'; button.className = 'copy-button'; button.title = t('copyText'); button.setAttribute('aria-label', t('copyText'));
    icon.setAttribute('class', 'icon'); icon.setAttribute('aria-hidden', 'true'); use.setAttribute('href', '#icon-copy');
    icon.append(use); button.append(icon); wrapper.append(content, button); parent.replaceChildren(wrapper);
    let resetTimer = null;
    button.addEventListener('click', async () => {
      button.disabled = true; clearTimeout(resetTimer); clearTimeout(copyFeedbackTimer); $('copy-feedback').textContent = '';
      try {
        await copyToClipboard(value);
        use.setAttribute('href', '#icon-copied'); button.classList.add('copied');
        button.title = t('copied'); button.setAttribute('aria-label', t('copied'));
        $('copy-feedback').textContent = t('copied');
      } catch (_) {
        $('copy-feedback').textContent = t('copyFailed');
      } finally {
        button.disabled = false;
        resetTimer = setTimeout(() => {
          use.setAttribute('href', '#icon-copy'); button.classList.remove('copied');
          button.title = t('copyText'); button.setAttribute('aria-label', t('copyText'));
        }, 2000);
        copyFeedbackTimer = setTimeout(() => { $('copy-feedback').textContent = ''; }, 4000);
      }
    });
  }
  function paragraph(parent, value) {
    if (typeof value !== 'string' || !value.trim()) return;
    const item = document.createElement('p'); copyText(item, value); parent.append(item);
  }
  function emptyIfNeeded(parent) {
    if (parent.childElementCount) return;
    const item = document.createElement('p'); item.textContent = t('noInformation'); item.className = 'detail-empty'; parent.append(item);
  }
  function descriptionList(parent, values) {
    const list = document.createElement('ul');
    (values || []).forEach(value => {
      if (typeof value?.description !== 'string' || !value.description.trim()) return;
      const item = document.createElement('li'); copyText(item, value.description); list.append(item);
    });
    if (list.childElementCount) parent.append(list);
  }
  function renderDetail() {
    $('week-metadata').replaceChildren(); $('detail-sections').replaceChildren();
    copyText($('page-title'), weekTitle(week));
    setImage($('week-image'), week.image, weekTitle(week));
    const metadata = { id:number(week.id), weekNumber:number(week.weekNumber), keyName:text(week.keyName), trimester:number(week.trimester), createdDate:formatDate(week.createdDate), updatedDate:formatDate(week.updatedDate) };
    Object.entries(metadata).forEach(([key, value]) => {
      const group = document.createElement('div'), label = document.createElement('dt'), content = document.createElement('dd');
      label.textContent = t(key);
      if (value === '—') content.textContent = value; else copyText(content, value);
      group.append(label, content); $('week-metadata').append(group);
    });
    const development = section('fetalDevelopment'); paragraph(development, week.fetalDevelopment); emptyIfNeeded(development);
    const size = section('babySize');
    if (week.babySize) {
      const image = document.createElement('img'); image.className = 'detail-image';
      setImage(image, week.babySize.image, t('babySize')); if (!image.hidden) size.append(image);
      paragraph(size, week.babySize.keyName); paragraph(size, week.babySize.description);
    }
    emptyIfNeeded(size);
    [['symptoms','symptomList'], ['nutrition','nutritionList'], ['checklist','checkList']].forEach(([key, field]) => {
      const body = section(key); descriptionList(body, week[field]); emptyIfNeeded(body);
    });
    const tips = section('monthlyTip'), monthly = week.monthlyTip;
    if (monthly) {
      if (monthly.monthNumber) paragraph(tips, t('monthNumber').replace('{number}', number(monthly.monthNumber)));
      if (monthly.title) { const title = document.createElement('h3'); copyText(title, monthly.title); tips.append(title); }
      paragraph(tips, monthly.description); paragraph(tips, monthly.inspiration); descriptionList(tips, monthly.tipList);
    }
    emptyIfNeeded(tips);
  }
  async function loadWeeks() {
    loadController?.abort();
    const request = new AbortController(); loadController = request;
    status = 'loading'; lastError = null; week = null; records = []; render();
    clearTimeout(copyFeedbackTimer); $('copy-feedback').textContent = '';
    try {
      if (isDetail && (!/^[1-9]\d*$/.test(selectedId) || !Number.isSafeInteger(Number(selectedId)))) throw { code:'invalidRequest' };
      const result = isDetail ? await controller.detail(Number(selectedId), locale, request.signal) : await controller.list(locale, request.signal);
      if (request !== loadController) return;
      if (isDetail) {
        if (!result || result.id !== Number(selectedId)) throw { code:'invalidResponse' };
        week = result;
      } else {
        if (!Array.isArray(result) || result.some(item => !item || !Number.isSafeInteger(item.id) || item.id < 1)) throw { code:'invalidResponse' };
        records = result.sort((a, b) => (a.weekNumber ?? 0) - (b.weekNumber ?? 0) || a.id - b.id);
      }
      status = 'ready';
    } catch (error) {
      if (request !== loadController || error.name === 'AbortError') return;
      lastError = error; status = 'error';
    }
    render();
  }
  ['refresh','refresh-detail','retry'].forEach(id => $(id).addEventListener('click', loadWeeks));
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
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-label]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.label)); });
    document.querySelectorAll('[data-placeholder]').forEach(el => { el.placeholder = t(el.dataset.placeholder); });
    $('drawer').setAttribute('aria-label', t('workspace')); $('language-select').value = locale;
    try { localStorage.setItem('mamacare-dashboard-language', locale); } catch (_) {}
    loadWeeks();
  }
  $('language-select').addEventListener('change', event => setLocale(event.target.value));
  $('year').textContent = new Date().getFullYear();
  let savedLocale = 'en'; try { savedLocale = localStorage.getItem('mamacare-dashboard-language') || 'en'; } catch (_) {}
  setLocale(savedLocale); setDrawer(false, false);
})();
