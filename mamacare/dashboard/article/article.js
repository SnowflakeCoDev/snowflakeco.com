(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const controller = window.DashboardImportArticleController;
  const isDetail = document.body.dataset.page === 'detail';
  const parameters = new URLSearchParams(location.search);
  const selectedId = parameters.get('id');
  const pageValue = parameters.get('page') || '1';
  const initialPage = /^[1-9]\d*$/.test(pageValue) ? Number(pageValue) : NaN;
  const en = {};
  document.querySelectorAll('[data-i18n]').forEach(el => { en[el.dataset.i18n] = el.textContent; });
  Object.assign(en, {
    articles:'Articles', articleDetails:'Article details', intro:'Browse your articles and open one to read its content.',
    detailIntro:'Article information and related content.', openMenu:'Open menu', closeMenu:'Close menu', displayLanguage:'Display language',
    loading:'Loading articles…', loadingDetail:'Loading article…', loadingDescription:'Getting the latest articles from your dashboard.',
    empty:'No articles yet', emptyDescription:'Import an article to see it here.', noMatches:'No matching articles on this page',
    noMatchesDescription:'Try another topic or category, or move to another page.', errorTitle:'Articles could not be loaded',
    detailError:'This article could not be loaded', controllerUnavailable:'The article service is unavailable. Refresh the page or try again.',
    invalidRequest:'This page link is invalid. Return to Articles and try again.', networkError:'Could not load articles. Check your connection and try again.',
    languageUnavailable:'No enabled language matches your selection. Check the dashboard languages.',
    notFound:'This article or page is no longer available. Return to Articles and select another.',
    requestFailed:'The request could not be completed.', timeout:'The request timed out. Please try again.',
    invalidResponse:'The service returned an unexpected response. Please try again.',
    results:'{shown} of {loaded} articles on this page', pageCount:'Page {page} of {total} · {count} articles',
    searchPlaceholder:'Search by topic, category, or ID', viewDetails:'View details', articleTitle:'Article {id}',
    pagination:'Article pages', keyName:'Key name', createdDate:'Created date', noInformation:'No information available.',
    id:'ID', topic:'Topic', category:'Category', subcategory:'Subcategory', updatedDate:'Updated date', action:'Action',
    targetAudienceList:'Target audience', contentObjectiveList:'Content objectives', educationContentList:'Educational content',
    problemSolutionContentList:'Problem and solution', relatableContentList:'Relatable content', interactiveContentList:'Interactive content',
    storyContentList:'Story content', tipQuoteList:'Tips and quotes', checklistList:'Checklist', appActionsList:'App actions', contentSafetyList:'Content safety',
    socialMediaList:'Social media', appContentList:'App content', imageTextList:'Image text', hashtagList:'Hashtags',
    whatYouShouldKnowList:'What you should know', possibleCauseList:'Possible causes', recommendedSolutionList:'Recommended solutions',
    optionList:'Options', itemList:'Items', relatedAppFeatureList:'Related app features', actionButtonList:'Action buttons',
    relatedContentList:'Related content', warningSignList:'Warning signs', additionalNoteList:'Additional notes',
    title:'Title', text:'Text', description:'Description', introduction:'Introduction', importantNote:'Important note',
    postTitle:'Post title', caption:'Caption', cta:'Call to action', problemDescription:'Problem description',
    whenToSeekMedicalHelp:'When to seek medical help', message:'Message', supportiveAdvice:'Supportive advice', quote:'Quote',
    interactionType:'Interaction type', question:'Question', correctAnswer:'Correct answer', explanation:'Explanation', imageText:'Image text',
    storyTitle:'Story title', storyOpening:'Story opening', storyDevelopment:'Story development', storyResolution:'Story resolution',
    story:'Story', keyTakeaway:'Key takeaway', tipTitle:'Tip title', tip:'Tip', tipExplanation:'Tip explanation', type:'Type',
    isCompleted:'Completed', yes:'Yes', no:'No', label:'Label', destination:'Destination', referenceKey:'Reference key',
    whenToSeekHelp:'When to seek help', medicalDisclaimer:'Medical disclaimer',
    viewAsPost:'View as post', showFields:'Show fields', socialMediaPost:'Social media post',
  });
  const ar = {
    skip:'انتقل إلى المحتوى', adminWorkspace:'مساحة الإدارة', workspace:'مساحة العمل', language:'اللغة', importProducts:'استيراد المنتجات',
    pregnancyWeeks:'أسابيع الحمل', importArticle:'استيراد مقال', articles:'المقالات', careTitle:'قليل من الرعاية، وأثر كبير.',
    careText:'صُمّم بعناية لكل خطوة في رحلة الأمومة.', admin:'مدير المتجر', dashboard:'لوحة التحكم', footer:'صُنع بعناية، لمن يمنحون الرعاية.',
    eyebrow:'معرفة، بكل عناية', intro:'تصفح مقالاتك واختر مقالًا لقراءة محتواه.', detailIntro:'معلومات المقال والمحتوى المرتبط به.',
    allArticles:'جميع المقالات', articleDetails:'تفاصيل المقال', listHint:'اختر مقالًا لعرض تفاصيله.', backToList:'العودة إلى المقالات',
    refresh:'تحديث', search:'البحث في هذه الصفحة', searchPlaceholder:'ابحث بالموضوع أو الفئة أو المعرّف', tryAgain:'إعادة المحاولة',
    id:'المعرّف', topic:'الموضوع', category:'الفئة', subcategory:'الفئة الفرعية', updatedDate:'تاريخ التحديث', createdDate:'تاريخ الإنشاء',
    action:'الإجراء', keyName:'الاسم المرجعي', previous:'السابق', next:'التالي', pagination:'صفحات المقالات', viewDetails:'عرض التفاصيل',
    articleTitle:'مقال {id}', loading:'جارٍ تحميل المقالات…', loadingDetail:'جارٍ تحميل المقال…', loadingDescription:'جارٍ جلب أحدث المقالات من لوحة التحكم.',
    empty:'لا توجد مقالات بعد', emptyDescription:'استورد مقالًا ليظهر هنا.', noMatches:'لا توجد مقالات مطابقة في هذه الصفحة',
    noMatchesDescription:'جرّب موضوعًا أو فئة أخرى أو انتقل إلى صفحة أخرى.', errorTitle:'تعذر تحميل المقالات', detailError:'تعذر تحميل هذا المقال',
    controllerUnavailable:'خدمة المقالات غير متاحة. حدّث الصفحة أو حاول مجددًا.', invalidRequest:'رابط الصفحة غير صالح. عد إلى المقالات وحاول مجددًا.',
    networkError:'تعذر تحميل المقالات. تحقق من الاتصال وحاول مجددًا.', languageUnavailable:'لا توجد لغة مفعّلة تطابق اختيارك. تحقق من لغات لوحة التحكم.',
    notFound:'هذا المقال أو الصفحة لم يعد متاحًا. عد إلى المقالات واختر غيره.', requestFailed:'تعذر إكمال الطلب.',
    timeout:'انتهت مهلة الطلب. حاول مجددًا.', invalidResponse:'أعادت الخدمة استجابة غير متوقعة. حاول مجددًا.',
    results:'{shown} من {loaded} مقال في هذه الصفحة', pageCount:'الصفحة {page} من {total} · {count} مقال',
    noContent:'لا يوجد محتوى مرتبط بهذا المقال.', noInformation:'لا توجد معلومات متاحة.', targetAudienceList:'الجمهور المستهدف',
    contentObjectiveList:'أهداف المحتوى', educationContentList:'المحتوى التعليمي', problemSolutionContentList:'المشكلة والحل',
    relatableContentList:'المحتوى القريب منك', interactiveContentList:'المحتوى التفاعلي', storyContentList:'المحتوى القصصي',
    tipQuoteList:'النصائح والاقتباسات', checklistList:'قائمة المتابعة', appActionsList:'إجراءات التطبيق', contentSafetyList:'سلامة المحتوى',
    socialMediaList:'وسائل التواصل', appContentList:'محتوى التطبيق', imageTextList:'نصوص الصور', hashtagList:'الوسوم',
    whatYouShouldKnowList:'ما يجب معرفته', possibleCauseList:'الأسباب المحتملة', recommendedSolutionList:'الحلول المقترحة',
    optionList:'الخيارات', itemList:'العناصر', relatedAppFeatureList:'ميزات التطبيق المرتبطة', actionButtonList:'أزرار الإجراءات',
    relatedContentList:'المحتوى المرتبط', warningSignList:'علامات التحذير', additionalNoteList:'ملاحظات إضافية',
    title:'العنوان', text:'النص', description:'الوصف', introduction:'المقدمة', importantNote:'ملاحظة مهمة', postTitle:'عنوان المنشور',
    caption:'نص المنشور', cta:'دعوة لاتخاذ إجراء', problemDescription:'وصف المشكلة', whenToSeekMedicalHelp:'متى تطلب المساعدة الطبية',
    message:'الرسالة', supportiveAdvice:'نصيحة داعمة', quote:'الاقتباس', interactionType:'نوع التفاعل', question:'السؤال',
    correctAnswer:'الإجابة الصحيحة', explanation:'التوضيح', imageText:'نص الصورة', storyTitle:'عنوان القصة', storyOpening:'بداية القصة',
    storyDevelopment:'تطور القصة', storyResolution:'نهاية القصة', story:'القصة', keyTakeaway:'الفكرة الرئيسية', tipTitle:'عنوان النصيحة',
    tip:'النصيحة', tipExplanation:'توضيح النصيحة', type:'النوع', isCompleted:'مكتمل', yes:'نعم', no:'لا', label:'التسمية',
    destination:'الوجهة', referenceKey:'المفتاح المرجعي', whenToSeekHelp:'متى تطلب المساعدة', medicalDisclaimer:'تنويه طبي',
    viewAsPost:'عرض كمنشور', showFields:'عرض الحقول', socialMediaPost:'منشور وسائل التواصل',
  };
  const relatedFields = ['targetAudienceList','contentObjectiveList','educationContentList','problemSolutionContentList','relatableContentList','interactiveContentList','storyContentList','tipQuoteList','checklistList','appActionsList','contentSafetyList'];
  let locale = 'en', records = [], article = null, status = 'loading', lastError = null, requestController = null;
  let currentPage = Number.isSafeInteger(initialPage) && initialPage > 0 ? initialPage : 1, totalPages = 0, count = 0;
  let requestedPage = currentPage;
  const t = key => (locale === 'ar' ? ar[key] : en[key]) || en[key] || key;
  const number = value => new Intl.NumberFormat(locale, { useGrouping:false }).format(value);
  const title = record => typeof record?.topic === 'string' && record.topic.trim() ? record.topic : t('articleTitle').replace('{id}', number(record.id));
  const text = value => typeof value === 'string' && value.trim() ? value : '—';
  function date(value) {
    if (!value) return '—';
    const parsed = new Date(value);
    return Number.isNaN(parsed.valueOf()) ? '—' : new Intl.DateTimeFormat(locale, { dateStyle:'medium', timeStyle:'short' }).format(parsed);
  }
  function errorDetails(value) {
    if (Array.isArray(value)) return value.map(errorDetails).filter(Boolean).join(' ');
    if (value && typeof value === 'object') return Object.entries(value).map(([key, detail]) => `${key}: ${errorDetails(detail)}`).join('\n');
    return typeof value === 'string' ? value : '';
  }
  function render() {
    const ready = status === 'ready', loading = status === 'loading';
    $('main').setAttribute('aria-busy', String(loading));
    $('refresh').disabled = loading;
    $('page-title').textContent = isDetail ? (ready ? title(article) : t('articleDetails')) : t('articles');
    $('page-intro').textContent = t(isDetail ? 'detailIntro' : 'intro');
    document.title = `${$('page-title').textContent} · MamaCare Hub`;
    let shown = 0;
    if (isDetail) {
      $('article-detail').hidden = !ready;
      $('back-link').href = `index.html?page=${currentPage}`;
      if (ready) renderDetail();
    } else {
      $('search').disabled = !ready;
      const query = $('search').value.trim().toLocaleLowerCase();
      const filtered = records.filter(record => [record.id,record.topic,record.category,record.subcategory,record.keyName].some(value => String(value ?? '').toLocaleLowerCase().includes(query)));
      shown = filtered.length;
      $('table-wrap').hidden = !ready || !shown;
      $('result-count').textContent = ready ? t('results').replace('{shown}', number(shown)).replace('{loaded}', number(records.length)) : '';
      $('pagination').hidden = !ready || totalPages <= 1;
      $('previous').disabled = loading || currentPage <= 1;
      $('next').disabled = loading || currentPage >= totalPages;
      $('page-count').textContent = t('pageCount').replace('{page}', number(currentPage)).replace('{total}', number(Math.max(1,totalPages))).replace('{count}', number(count));
      $('article-rows').replaceChildren();
      if (ready) {
        const fragment = document.createDocumentFragment();
        for (const record of filtered) {
          const row = document.createElement('tr'), href = `detail.html?id=${record.id}&page=${currentPage}`;
          const values = { id:number(record.id), topic:title(record), category:text(record.category), subcategory:text(record.subcategory), updatedDate:date(record.updatedDate) };
          for (const [key, value] of Object.entries(values)) {
            const cell = document.createElement('td'), content = document.createElement(key === 'topic' ? 'a' : 'span');
            cell.dataset.label = t(key); content.textContent = value;
            if (key === 'topic') { content.href = href; content.className = 'article-link'; }
            cell.append(content); row.append(cell);
          }
          const cell = document.createElement('td'), link = document.createElement('a');
          cell.dataset.label = t('action'); link.href = href; link.className = 'button edit-button';
          link.textContent = t('viewDetails'); link.setAttribute('aria-label', `${t('viewDetails')}: ${title(record)}`);
          cell.append(link); row.append(cell); fragment.append(row);
        }
        $('article-rows').append(fragment);
      }
    }
    $('page-state').hidden = ready && (isDetail || shown > 0);
    $('retry').hidden = status !== 'error';
    let heading = isDetail ? 'loadingDetail' : 'loading', description = t('loadingDescription');
    if (status === 'error') {
      heading = isDetail ? 'detailError' : 'errorTitle';
      description = [t(lastError?.code || 'networkError'), errorDetails(lastError?.fields)].filter(Boolean).join('\n');
    } else if (ready) {
      heading = records.length ? 'noMatches' : 'empty';
      description = t(records.length ? 'noMatchesDescription' : 'emptyDescription');
    }
    $('state-title').textContent = t(heading); $('state-description').textContent = description;
  }
  let postViewSequence = 0;
  function socialPostText(record) {
    if (typeof record === 'string') return record.trim();
    if (!record || typeof record !== 'object') return '';
    const parts = [];
    for (const [key, value] of Object.entries(record)) {
      if (key === 'id' || key === 'keyName' || key.endsWith('Id')) continue;
      if (Array.isArray(value)) {
        const items = value.map(socialPostText).filter(Boolean);
        if (items.length) parts.push(items.join(key === 'hashtagList' ? ' ' : '\n'));
      } else if (typeof value === 'string' && value.trim()) {
        parts.push(value.trim());
      }
    }
    return parts.join('\n\n');
  }
  function addPostSwitch(body, records) {
    const sequence = ++postViewSequence;
    const toolbar = document.createElement('div'), toggle = document.createElement('button'), fields = document.createElement('div');
    const post = document.createElement('div'), label = document.createElement('label'), input = document.createElement('textarea');
    toolbar.className = 'post-view-toolbar'; toggle.type = 'button'; toggle.className = 'button'; toggle.textContent = t('viewAsPost');
    fields.id = `social-fields-${sequence}`; fields.append(...Array.from(body.childNodes));
    post.id = `social-post-view-${sequence}`; post.className = 'social-post-view'; post.hidden = true;
    input.id = `social-post-${sequence}`; input.className = 'social-post-text'; input.rows = 18; input.readOnly = true; input.dir = 'auto';
    input.value = records.map(socialPostText).filter(Boolean).join('\n\n\n') || t('noInformation');
    label.htmlFor = input.id; label.textContent = t('socialMediaPost');
    toggle.setAttribute('aria-controls', `${fields.id} ${post.id}`); toggle.setAttribute('aria-pressed', 'false');
    toggle.addEventListener('click', () => {
      const showPost = post.hidden;
      fields.hidden = showPost; post.hidden = !showPost;
      toggle.textContent = t(showPost ? 'showFields' : 'viewAsPost'); toggle.setAttribute('aria-pressed', String(showPost));
      if (showPost) input.focus({ preventScroll:true });
    });
    toolbar.append(toggle); post.append(label, input); body.append(toolbar, fields, post);
  }
  function renderFields(parent, record) {
    if (!record || typeof record !== 'object' || Array.isArray(record)) return;
    for (const [key, value] of Object.entries(record)) {
      if (key === 'id' || key.endsWith('Id') || value == null || (typeof value === 'string' && !value.trim())) continue;
      if (Array.isArray(value)) {
        if (!value.length) continue;
        const group = document.createElement('details'), summary = document.createElement('summary'), body = document.createElement('div');
        group.className = 'content-group'; group.open = key !== 'socialMediaList'; summary.textContent = t(key); body.className = 'content-nested';
        for (const item of value) {
          const container = document.createElement('div'); container.className = 'content-record'; renderFields(container, item);
          if (container.childElementCount) body.append(container);
        }
        if (body.childElementCount) {
          if (key === 'socialMediaList') addPostSwitch(body, value);
          group.append(summary, body); parent.append(group);
        }
      } else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        const field = document.createElement('div'), label = document.createElement('h3'), content = document.createElement('p');
        field.className = 'content-field'; label.textContent = t(key);
        content.textContent = typeof value === 'boolean' ? t(value ? 'yes' : 'no') : String(value);
        field.append(label, content); parent.append(field);
      }
    }
  }
  function renderDetail() {
    postViewSequence = 0;
    $('article-metadata').replaceChildren(); $('article-sections').replaceChildren();
    const metadata = { id:number(article.id), keyName:text(article.keyName), category:text(article.category), subcategory:text(article.subcategory), createdDate:date(article.createdDate), updatedDate:date(article.updatedDate) };
    for (const [key, value] of Object.entries(metadata)) {
      const group = document.createElement('div'), label = document.createElement('dt'), content = document.createElement('dd');
      label.textContent = t(key); content.textContent = value; group.append(label, content); $('article-metadata').append(group);
    }
    for (const key of relatedFields) {
      const records = article[key];
      if (!Array.isArray(records) || !records.length) continue;
      const panel = document.createElement('section'), header = document.createElement('div'), heading = document.createElement('h2'), body = document.createElement('div');
      panel.className = 'panel'; header.className = 'panel-head'; body.className = 'content-body';
      heading.textContent = t(key); heading.id = `section-${key}`; panel.setAttribute('aria-labelledby', heading.id);
      for (const record of records) {
        const container = document.createElement('div'); container.className = 'content-record'; renderFields(container, record);
        if (container.childElementCount) body.append(container);
      }
      if (!body.childElementCount) { const empty = document.createElement('p'); empty.className = 'detail-empty'; empty.textContent = t('noInformation'); body.append(empty); }
      header.append(heading); panel.append(header, body); $('article-sections').append(panel);
    }
    $('no-content').hidden = $('article-sections').childElementCount > 0;
  }
  async function loadArticles(page = currentPage) {
    if (Number.isSafeInteger(page) && page > 0) requestedPage = page;
    requestController?.abort();
    const request = new AbortController(); requestController = request;
    status = 'loading'; lastError = null; article = null; records = []; render();
    try {
      if (!Number.isSafeInteger(page) || page < 1 || (isDetail && (!/^[1-9]\d*$/.test(selectedId || '') || !Number.isSafeInteger(Number(selectedId))))) throw { code:'invalidRequest' };
      const result = isDetail ? await controller.detail(Number(selectedId), locale, request.signal) : await controller.list(locale, page, request.signal);
      if (request !== requestController) return;
      if (isDetail) {
        if (!result || result.id !== Number(selectedId)) throw { code:'invalidResponse' };
        article = result;
      } else {
        if (!result || !Array.isArray(result.results) || result.results.some(item => !item || !Number.isSafeInteger(item.id) || item.id < 1) ||
            !Number.isSafeInteger(result.count) || result.count < 0 || result.page !== page || !Number.isSafeInteger(result.totalPages) || result.totalPages < 0) throw { code:'invalidResponse' };
        records = result.results; count = result.count; currentPage = result.page; totalPages = result.totalPages;
        const url = new URL(location.href); url.searchParams.set('page', currentPage); history.replaceState(null, '', url);
      }
      status = 'ready';
    } catch (error) {
      if (request !== requestController || error?.name === 'AbortError') return;
      lastError = error; status = 'error';
    }
    render();
  }
  $('refresh').addEventListener('click', () => loadArticles(requestedPage));
  $('retry').addEventListener('click', () => loadArticles(requestedPage));
  if (!isDetail) {
    $('search').addEventListener('input', render);
    $('previous').addEventListener('click', () => { $('search').value = ''; loadArticles(currentPage - 1); });
    $('next').addEventListener('click', () => { $('search').value = ''; loadArticles(currentPage + 1); });
  }
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
  function setLocale(value, initial = false) {
    locale = value === 'ar' ? 'ar' : 'en'; document.documentElement.lang = locale; document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-label]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.label)); });
    document.querySelectorAll('[data-placeholder]').forEach(el => { el.placeholder = t(el.dataset.placeholder); });
    $('drawer').setAttribute('aria-label', t('workspace')); $('language-select').value = locale;
    try { localStorage.setItem('mamacare-dashboard-language', locale); } catch (_) {}
    loadArticles(initial ? initialPage : isDetail ? currentPage : 1);
  }
  $('language-select').addEventListener('change', event => setLocale(event.target.value));
  $('year').textContent = new Date().getFullYear();
  let savedLocale = 'en'; try { savedLocale = localStorage.getItem('mamacare-dashboard-language') || 'en'; } catch (_) {}
  setLocale(savedLocale, true); setDrawer(false, false);
})();
