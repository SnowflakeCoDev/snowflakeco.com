document.addEventListener("DOMContentLoaded",()=>{
  const inv=document.getElementById("inventory-root");
  const lowRoot=document.getElementById("low-stock-root");
  const movementRoot=document.getElementById("movements-root");
  const quantities=new Map(demoProducts.map(p=>[p.id,p.quantity]));
  let invFilters={q:"",cat:"all",unit:"all",stock:"all"};
  let lowFilters={q:"",cat:"all",unit:"all",critical:false};
  const stockOf=p=>quantities.get(p.id)===0?"out":quantities.get(p.id)<=p.min?"low":"inStock";
  function invRender(){
    if(!inv)return;
    const rows=demoProducts.filter(p=>(!invFilters.q||`${p.nameAr} ${p.nameEn} ${p.sku}`.toLowerCase().includes(invFilters.q.toLowerCase()))&&(invFilters.cat==="all"||p.category===invFilters.cat)&&(invFilters.unit==="all"||p.unit===invFilters.unit)&&(invFilters.stock==="all"||stockOf(p)===invFilters.stock));
    inv.innerHTML=`<div class="toolbar">
      <div class="field search"><label>${App.t("search")}</label><input id="i-q" value="${App.escapeHTML(invFilters.q)}" placeholder="${App.t("productName")}"></div>
      <div class="field"><label>${App.t("category")}</label><select id="i-cat"><option value="all">${App.t("all")}</option>${demoCategories.map(c=>`<option value="${c.id}" ${invFilters.cat===c.id?"selected":""}>${App.lang==="ar"?c.nameAr:c.nameEn}</option>`).join("")}</select></div>
      <div class="field"><label>${App.t("unit")}</label><select id="i-unit"><option value="all">${App.t("all")}</option>${["litre","bottle","piece"].map(x=>`<option value="${x}" ${invFilters.unit===x?"selected":""}>${App.t(x)}</option>`).join("")}</select></div>
      <div class="field"><label>${App.t("stockStatus")}</label><select id="i-stock"><option value="all">${App.t("all")}</option>${["inStock","low","out"].map(x=>`<option value="${x}" ${invFilters.stock===x?"selected":""}>${App.t(x)}</option>`).join("")}</select></div>
    </div><div class="table-wrap"><table><thead><tr><th>${App.t("product")}</th><th>${App.t("category")}</th><th>${App.t("unit")}</th><th>${App.t("availableStock")}</th><th>${App.t("minStock")}</th><th>${App.t("stockStatus")}</th><th>${App.t("lastMovement")}</th><th>${App.t("actions")}</th></tr></thead><tbody>
      ${rows.map(p=>{const qty=quantities.get(p.id),ratio=Math.min(100,Math.round(qty/Math.max(p.min*2,1)*100)),s=stockOf(p);return`<tr><td><strong>${App.escapeHTML(App.productName(p))}</strong><br><small class="muted">${p.sku}</small></td><td>${App.categoryName(p.category)}</td><td>${App.t(p.unit)}</td><td>${App.quantity(qty,p.unit)}</td><td>${App.quantity(p.min,p.unit)}</td><td>${App.statusBadge(s)}<div class="stock-track ${s}"><span style="width:${ratio}%"></span></div></td><td>2026-07-${String(28-(p.id%4)).padStart(2,"0")}</td><td><button class="btn btn-sm btn-secondary" data-adjust="${p.id}">${App.t("adjustStock")}</button></td></tr>`}).join("")}
    </tbody></table></div>`;
    [["i-q","q","input"],["i-cat","cat","change"],["i-unit","unit","change"],["i-stock","stock","change"]].forEach(([id,k,ev])=>document.getElementById(id).addEventListener(ev,e=>{invFilters[k]=e.target.value;invRender()}));
    inv.querySelectorAll("[data-adjust]").forEach(b=>b.addEventListener("click",()=>{const p=demoProducts.find(x=>x.id===Number(b.dataset.adjust));document.getElementById("adjust-product").value=p.id;document.getElementById("adjust-product-name").textContent=App.productName(p);App.openModal("adjust-modal")}));
  }
  document.getElementById("adjust-form")?.addEventListener("submit",e=>{
    e.preventDefault();const id=Number(document.getElementById("adjust-product").value),p=demoProducts.find(x=>x.id===id),type=document.getElementById("adjust-type").value;
    let val=Number(document.getElementById("adjust-qty").value||0); if(p.unit==="litre")val=Math.round(val*1000); else val=Math.round(val);
    const before=quantities.get(id); quantities.set(id,type==="removeStock"?Math.max(0,before-val):type==="correction"?val:before+val);
    App.closeModal("adjust-modal");App.toast(App.t("adjustmentDone"));e.target.reset();invRender();
  });
  function movementsRender(){
    if(!movementRoot)return;
    movementRoot.innerHTML=`<div class="toolbar"><div class="field"><label>${App.t("date")}</label><input type="date" value="2026-07-28"></div><div class="field"><label>${App.t("product")}</label><select><option>${App.t("all")}</option>${demoProducts.slice(0,8).map(p=>`<option>${App.productName(p)}</option>`).join("")}</select></div><div class="field"><label>${App.t("movementType")}</label><select><option>${App.t("all")}</option>${["openingBalance","purchase","sale","adjustmentIn","adjustmentOut","invoiceCancellation"].map(x=>`<option>${App.t(x)}</option>`).join("")}</select></div><div class="field"><label>${App.t("user")}</label><select><option>${App.t("all")}</option><option>محمود</option><option>كريم</option></select></div></div>
      <div class="table-wrap"><table><thead><tr><th>${App.t("date")}</th><th>${App.t("product")}</th><th>${App.t("movementType")}</th><th>${App.t("quantity")}</th><th>${App.t("before")}</th><th>${App.t("after")}</th><th>${App.t("reference")}</th><th>${App.t("user")}</th><th>${App.t("notes")}</th></tr></thead><tbody>
      ${demoMovements.map(m=>{const p=demoProducts.find(x=>x.id===m.product);return`<tr><td>${m.date}</td><td>${App.productName(p)}</td><td>${App.statusBadge(m.type==="sale"||m.type==="adjustmentOut"?"cancelled":m.type==="purchase"?"confirmed":"pending")} ${App.t(m.type)}</td><td>${m.qty>0?"+":""}${App.quantity(m.qty,p.unit)}</td><td>${App.quantity(m.before,p.unit)}</td><td>${App.quantity(m.after,p.unit)}</td><td><code>${m.ref}</code></td><td>${m.user}</td><td>${m.notes}</td></tr>`}).join("")}</tbody></table></div>`;
  }
  function lowRender(){
    if(!lowRoot)return;const rows=demoProducts.filter(p=>p.quantity<=p.min).filter(p=>(!lowFilters.q||`${p.nameAr} ${p.nameEn} ${p.sku}`.toLowerCase().includes(lowFilters.q.toLowerCase()))&&(lowFilters.cat==="all"||p.category===lowFilters.cat)&&(lowFilters.unit==="all"||p.unit===lowFilters.unit)&&(!lowFilters.critical||p.quantity===0||p.quantity<=p.min/2));
    lowRoot.innerHTML=`<div class="toolbar"><div class="field search"><label>${App.t("search")}</label><input id="low-q" value="${App.escapeHTML(lowFilters.q)}" placeholder="${App.t("productName")}"></div><div class="field"><label>${App.t("category")}</label><select id="low-cat"><option value="all">${App.t("all")}</option>${demoCategories.map(c=>`<option value="${c.id}" ${lowFilters.cat===c.id?"selected":""}>${App.lang==="ar"?c.nameAr:c.nameEn}</option>`).join("")}</select></div><div class="field"><label>${App.t("unit")}</label><select id="low-unit"><option value="all">${App.t("all")}</option>${["litre","bottle","piece"].map(x=>`<option value="${x}" ${lowFilters.unit===x?"selected":""}>${App.t(x)}</option>`).join("")}</select></div><label class="checkbox"><input id="low-critical" type="checkbox" ${lowFilters.critical?"checked":""}> ${App.t("criticalOnly")}</label></div>
    <div class="table-wrap"><table><thead><tr><th>${App.t("product")}</th><th>${App.t("category")}</th><th>${App.t("unit")}</th><th>${App.t("availableStock")}</th><th>${App.t("minStock")}</th><th>${App.t("shortage")}</th><th>${App.t("supplier")}</th><th>${App.t("suggestedReorder")}</th><th>${App.t("actions")}</th></tr></thead><tbody>
    ${rows.map((p,i)=>`<tr><td><strong>${App.productName(p)}</strong></td><td>${App.categoryName(p.category)}</td><td>${App.t(p.unit)}</td><td>${App.quantity(p.quantity,p.unit)}</td><td>${App.quantity(p.min,p.unit)}</td><td>${App.quantity(Math.max(0,p.min-p.quantity),p.unit)}</td><td>${App.lang==="ar"?demoSuppliers[i%3].nameAr:demoSuppliers[i%3].nameEn}</td><td>${App.quantity(p.min*2-p.quantity,p.unit)}</td><td><button class="btn btn-sm btn-primary" data-reorder>${App.t("reorder")}</button></td></tr>`).join("")||`<tr><td colspan="9" class="empty-state">${App.t("noResults")}</td></tr>`}</tbody></table></div>`;
    lowRoot.querySelectorAll("[data-reorder]").forEach(b=>b.addEventListener("click",()=>App.openModal("reorder-modal")));
    document.getElementById("low-q").addEventListener("input",e=>{lowFilters.q=e.target.value;lowRender()});
    document.getElementById("low-cat").addEventListener("change",e=>{lowFilters.cat=e.target.value;lowRender()});
    document.getElementById("low-unit").addEventListener("change",e=>{lowFilters.unit=e.target.value;lowRender()});
    document.getElementById("low-critical").addEventListener("change",e=>{lowFilters.critical=e.target.checked;lowRender()});
  }
  invRender();movementsRender();lowRender();
  document.addEventListener("app:language",()=>{invRender();movementsRender();lowRender()});
});
