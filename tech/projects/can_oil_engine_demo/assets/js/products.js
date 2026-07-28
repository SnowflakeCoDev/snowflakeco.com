document.addEventListener("DOMContentLoaded",()=>{
  const root=document.getElementById("products-root"); if(!root)return;
  let filters={q:"",category:"all",unit:"all",stock:"all",active:"all"};
  const stockOf=p=>p.quantity===0?"out":p.quantity<=p.min?"low":"inStock";
  function controls(){
    return `<div class="toolbar">
      <div class="field search"><label>${App.t("search")}</label><input id="p-search" value="${App.escapeHTML(filters.q)}" placeholder="${App.t("productName")} / ${App.t("sku")}"></div>
      <div class="field"><label>${App.t("category")}</label><select id="p-category"><option value="all">${App.t("all")}</option>${demoCategories.map(c=>`<option value="${c.id}" ${filters.category===c.id?"selected":""}>${App.lang==="ar"?c.nameAr:c.nameEn}</option>`).join("")}</select></div>
      <div class="field"><label>${App.t("unit")}</label><select id="p-unit"><option value="all">${App.t("all")}</option>${["litre","bottle","piece"].map(x=>`<option value="${x}" ${filters.unit===x?"selected":""}>${App.t(x)}</option>`).join("")}</select></div>
      <div class="field"><label>${App.t("stockStatus")}</label><select id="p-stock"><option value="all">${App.t("all")}</option>${["inStock","low","out"].map(x=>`<option value="${x}" ${filters.stock===x?"selected":""}>${App.t(x)}</option>`).join("")}</select></div>
      <div class="field"><label>${App.t("activeStatus")}</label><select id="p-active"><option value="all" ${filters.active==="all"?"selected":""}>${App.t("all")}</option><option value="true" ${filters.active==="true"?"selected":""}>${App.t("active")}</option><option value="false" ${filters.active==="false"?"selected":""}>${App.t("inactive")}</option></select></div>
      <a class="btn btn-primary" href="product-form.html?role=${App.role}&lang=${App.lang}">＋ ${App.t("addProduct")}</a>
    </div>`;
  }
  function render(){
    const q=filters.q.toLowerCase();
    const rows=demoProducts.filter(p=>(!q||`${p.nameAr} ${p.nameEn} ${p.sku} ${p.brand}`.toLowerCase().includes(q))&&(filters.category==="all"||p.category===filters.category)&&(filters.unit==="all"||p.unit===filters.unit)&&(filters.stock==="all"||stockOf(p)===filters.stock)&&(filters.active==="all"||String(p.active)===filters.active));
    root.innerHTML=controls()+`<div class="table-wrap"><table><thead><tr><th>${App.t("sku")}</th><th>${App.t("product")}</th><th>${App.t("category")}</th><th>${App.t("brand")}</th><th>${App.t("unit")}</th><th>${App.t("availableStock")}</th><th class="owner-only">${App.t("purchasePrice")}</th><th>${App.t("sellingPrice")}</th><th class="owner-only">${App.t("margin")}</th><th>${App.t("status")}</th><th>${App.t("actions")}</th></tr></thead>
      <tbody>${rows.map(p=>`<tr><td><code>${p.sku}</code></td><td><strong>${App.escapeHTML(App.productName(p))}</strong><br><small class="muted">${p.viscosity||""}</small></td><td>${App.categoryName(p.category)}</td><td>${p.brand}</td><td>${App.t(p.unit)}</td><td>${App.quantity(p.quantity,p.unit)}</td><td class="owner-only">${App.currency(p.cost,2)}</td><td>${App.currency(p.price,2)}</td><td class="owner-only">${App.currency(p.price-p.cost,2)}</td><td>${App.statusBadge(stockOf(p))}<br>${!p.active?App.statusBadge("inactive"):""}</td><td><div class="table-actions"><button class="btn btn-sm btn-secondary" data-demo>${App.t("view")}</button><a class="btn btn-sm btn-secondary" href="product-form.html?id=${p.id}&role=${App.role}&lang=${App.lang}">${App.t("edit")}</a><button class="btn btn-sm btn-ghost" data-demo>${App.t("duplicate")}</button></div></td></tr>`).join("")||`<tr><td colspan="11" class="empty-state">${App.t("noResults")}</td></tr>`}</tbody></table></div>`;
    App.applyRole(App.role,false); bind();
  }
  function bind(){
    [["p-search","q","input"],["p-category","category","change"],["p-unit","unit","change"],["p-stock","stock","change"],["p-active","active","change"]].forEach(([id,k,ev])=>document.getElementById(id)?.addEventListener(ev,e=>{filters[k]=e.target.value;render()}));
    root.querySelectorAll("[data-demo]").forEach(b=>b.addEventListener("click",()=>App.toast(App.t("demoNotice"),"warning")));
  }
  render(); document.addEventListener("app:language",render); document.addEventListener("app:role",render);
});
