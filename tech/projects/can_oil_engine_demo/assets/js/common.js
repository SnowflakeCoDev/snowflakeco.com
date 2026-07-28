(function () {
  const page = document.body.dataset.page || "";
  const params = new URLSearchParams(location.search);
  let lang = params.get("lang") === "en" ? "en" : "ar";
  let role = params.get("role") === "employee" ? "employee" : "owner";
  const pageKeys = {
    dashboard:["dashboard","pageDescriptionDashboard"],products:["products","pageDescriptionProducts"],
    "product-form":["addProduct","pageDescriptionProducts"],inventory:["inventory","pageDescriptionInventory"],
    "stock-movements":["stockMovements","pageDescriptionMovements"],purchases:["purchases","pageDescriptionPurchases"],
    "purchase-form":["newPurchase","pageDescriptionPurchases"],invoices:["invoices","pageDescriptionInvoices"],
    "invoice-form":["newInvoice","pageDescriptionNewInvoice"],"invoice-detail":["invoiceDetails","pageDescriptionInvoices"],
    "invoice-upload":["uploadInvoice","pageDescriptionUpload"],reports:["reports","pageDescriptionReports"],
    "low-stock":["lowStock","pageDescriptionLowStock"],settings:["settings","pageDescriptionSettings"],profile:["profile","pageDescriptionProfile"]
  };
  const nav = [
    ["dashboard.html","dashboard","dashboard","▦"],["products.html","products","products","◫"],["inventory.html","inventory","inventory","▥"],
    ["stock-movements.html","stock-movements","stockMovements","⇄"],["purchases.html","purchases","purchases","↓"],
    ["invoices.html","invoices","invoices","▤"],["invoice-form.html","invoice-form","newInvoice","＋"],
    ["invoice-upload.html","invoice-upload","uploadInvoice","⇧"],["reports.html","reports","reports","◒"],
    ["low-stock.html","low-stock","lowStock","!"],["settings.html","settings","settings","⚙"],["profile.html","profile","profile","●"]
  ];
  const t = key => (translations[lang] && translations[lang][key]) || translations.en[key] || key;
  const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[ch]));
  function buildShell() {
    const main = document.querySelector("main");
    if (!main || document.body.classList.contains("public-page")) return;
    const keyPair = pageKeys[page] || ["dashboard","pageDescriptionDashboard"];
    const shell = document.createElement("div");
    shell.className = "app-shell";
    shell.innerHTML = `
      <a class="skip-link btn btn-primary" href="#main-content">Skip</a>
      <div class="demo-strip" data-i18n="demoNotice"></div>
      <aside class="sidebar" id="sidebar" aria-label="Main navigation">
        <a class="sidebar-brand" href="dashboard.html">
          <img src="assets/images/logo-icon.svg" alt="">
          <span class="brand-copy"><strong data-i18n="appName"></strong><small>Oil Engine System</small></span>
        </a>
        <nav class="sidebar-nav">
          <div class="nav-label" data-i18n="operations"></div>
          ${nav.map(([href,id,key,icon])=>`<a class="nav-link ${page===id?"active":""}" href="${href}" data-nav><span class="nav-icon">${icon}</span><span data-i18n="${key}"></span></a>`).join("")}
          <div class="nav-label" data-i18n="account"></div>
          <button class="nav-link" style="width:100%;border:0;text-align:start;cursor:pointer" type="button" data-action="switch-language"><span class="nav-icon">文</span><span></span></button>
          <a class="nav-link" href="login.html" data-nav><span class="nav-icon">↪</span><span data-i18n="logout"></span></a>
        </nav>
      </aside>
      <div class="sidebar-overlay" data-action="close-sidebar"></div>
      <div class="main-wrap">
        <header class="app-header">
          <div class="header-start">
            <button class="btn btn-icon btn-secondary menu-button" type="button" data-action="toggle-sidebar" aria-label="${t("menu")}">☰</button>
            <h2 class="page-heading" data-i18n="${keyPair[0]}"></h2>
          </div>
          <div class="header-actions">
            <span class="role-chip" data-role-label></span>
            <select class="role-select" aria-label="${t("role")}" style="width:auto;min-height:39px">
              <option value="owner" data-i18n="owner"></option><option value="employee" data-i18n="employee"></option>
            </select>
            <button class="btn btn-secondary btn-sm" type="button" data-action="switch-language"></button>
            <a class="btn btn-icon btn-secondary" href="profile.html" data-nav aria-label="${t("profile")}">👤</a>
          </div>
        </header>
        <div class="page-content">
          <div class="page-intro no-print">
            <div><div class="breadcrumb"><a href="dashboard.html" data-nav data-i18n="home"></a><span>/</span><span data-i18n="${keyPair[0]}"></span></div>
            <h1 data-i18n="${keyPair[0]}"></h1><p class="muted" data-i18n="${keyPair[1]}"></p></div>
          </div>
          <div id="main-content"></div>
          <p class="footer-note" data-i18n="demoNotice"></p>
        </div>
      </div>
      <div class="toast-region" aria-live="polite" aria-atomic="true"></div>`;
    const original = main.innerHTML;
    main.replaceWith(shell);
    shell.querySelector("#main-content").innerHTML = original;
  }
  function translate(root=document) {
    root.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
    root.querySelectorAll("[data-i18n-placeholder]").forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
    root.querySelectorAll("[data-i18n-title]").forEach(el => { el.title = t(el.dataset.i18nTitle); });
  }
  function updateLinks() {
    document.querySelectorAll('a[href$=".html"],a[href*=".html?"]').forEach(a => {
      const raw = a.getAttribute("href"); if (!raw || raw.startsWith("http")) return;
      const [path, query=""] = raw.split("?");
      const p = new URLSearchParams(query);
      p.set("lang",lang);
      if (!["index.html","login.html"].includes(path)) p.set("role",role);
      a.setAttribute("href",`${path}?${p.toString()}`);
    });
  }
  function applyLanguage(next, emit=true) {
    lang = next === "en" ? "en" : "ar";
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("lang-ar",lang==="ar");
    document.body.classList.toggle("lang-en",lang==="en");
    translate();
    document.querySelectorAll('[data-action="switch-language"]').forEach(b => b.textContent = lang === "ar" ? "English" : "العربية");
    updateLinks();
    if (history.replaceState) { const p=new URLSearchParams(location.search); p.set("lang",lang); history.replaceState(null,"",`${location.pathname}?${p}`); }
    if (emit) document.dispatchEvent(new CustomEvent("app:language",{detail:{lang}}));
  }
  function applyRole(next, emit=true) {
    role = next === "employee" ? "employee" : "owner";
    document.body.classList.toggle("role-owner",role==="owner");
    document.body.classList.toggle("role-employee",role==="employee");
    document.querySelectorAll(".owner-only").forEach(el=>el.classList.toggle("restricted",role==="employee"));
    document.querySelectorAll(".role-select").forEach(s=>s.value=role);
    document.querySelectorAll("[data-role-label]").forEach(el=>el.textContent=t(role));
    updateLinks();
    if (history.replaceState && !document.body.classList.contains("public-page")) { const p=new URLSearchParams(location.search); p.set("role",role); p.set("lang",lang); history.replaceState(null,"",`${location.pathname}?${p}`); }
    if (emit) document.dispatchEvent(new CustomEvent("app:role",{detail:{role}}));
  }
  function currency(piastres, decimals=0) {
    const val = Number(piastres || 0) / 100;
    return `${new Intl.NumberFormat(lang==="ar"?"ar-EG":"en-EG",{minimumFractionDigits:decimals,maximumFractionDigits:decimals}).format(val)} ${t("currency")}`;
  }
  function quantity(value, unit, decimals) {
    const isLitre = unit === "litre";
    const val = isLitre ? Number(value||0)/1000 : Number(value||0);
    const d = decimals ?? (isLitre?3:0);
    return `${new Intl.NumberFormat(lang==="ar"?"ar-EG":"en-EG",{minimumFractionDigits:d,maximumFractionDigits:d,useGrouping:true}).format(val)} ${t(unit)}`;
  }
  function productName(product) { return lang==="ar"?product.nameAr:product.nameEn; }
  function categoryName(id) { const c=demoCategories.find(x=>x.id===id); return c ? (lang==="ar"?c.nameAr:c.nameEn) : id; }
  function statusBadge(status) {
    const cls={confirmed:"success",active:"success",inStock:"success",pending:"warning",draft:"neutral",low:"warning",cancelled:"danger",out:"danger",inactive:"neutral"}[status]||"info";
    return `<span class="badge badge-${cls}" data-i18n="${status}">${escapeHTML(t(status))}</span>`;
  }
  function toast(message, type="success") {
    const region=document.querySelector(".toast-region")||document.body.appendChild(Object.assign(document.createElement("div"),{className:"toast-region"}));
    const el=document.createElement("div"); el.className="toast"; el.style.borderInlineStartColor=`var(--${type})`; el.textContent=message; region.appendChild(el);
    setTimeout(()=>el.remove(),3300);
  }
  function openModal(id) { const el=document.getElementById(id); if(el){el.classList.add("open"); el.setAttribute("aria-hidden","false"); el.querySelector("input,select,button")?.focus();} }
  function closeModal(target) { const el=typeof target==="string"?document.getElementById(target):target.closest(".modal"); if(el){el.classList.remove("open");el.setAttribute("aria-hidden","true");} }
  buildShell();
  document.addEventListener("click",e=>{
    const action=e.target.closest("[data-action]")?.dataset.action;
    if(action==="switch-language") applyLanguage(lang==="ar"?"en":"ar");
    if(action==="toggle-sidebar") { document.getElementById("sidebar")?.classList.toggle("open"); document.querySelector(".sidebar-overlay")?.classList.toggle("open"); }
    if(action==="close-sidebar") { document.getElementById("sidebar")?.classList.remove("open"); document.querySelector(".sidebar-overlay")?.classList.remove("open"); }
    if(action==="close-modal") closeModal(e.target);
  });
  document.addEventListener("change",e=>{ if(e.target.matches(".role-select")) applyRole(e.target.value); });
  document.addEventListener("keydown",e=>{if(e.key==="Escape")document.querySelectorAll(".modal.open").forEach(closeModal);});
  applyLanguage(lang,false); applyRole(role,false);
  window.App={t,escapeHTML,translate,applyLanguage,applyRole,get lang(){return lang},get role(){return role},currency,quantity,productName,categoryName,statusBadge,toast,openModal,closeModal};
  document.dispatchEvent(new CustomEvent("app:ready"));
})();
