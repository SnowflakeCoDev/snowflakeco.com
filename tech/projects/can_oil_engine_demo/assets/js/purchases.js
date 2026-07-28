document.addEventListener("DOMContentLoaded",()=>{
  const list=document.getElementById("purchases-root"),form=document.getElementById("purchase-form");
  function listRender(){
    if(!list)return;
    list.innerHTML=`<div class="actions-row" style="margin:0 0 18px"><a class="btn btn-primary" href="purchase-form.html?role=${App.role}&lang=${App.lang}">＋ ${App.t("newPurchase")}</a></div>
    <div class="table-wrap"><table><thead><tr><th>${App.t("purchaseNo")}</th><th>${App.t("supplier")}</th><th>${App.t("date")}</th><th>${App.t("productCount")}</th><th>${App.t("totalCost")}</th><th>${App.t("status")}</th><th>${App.t("createdBy")}</th><th>${App.t("actions")}</th></tr></thead><tbody>
    ${demoPurchases.map(p=>{const s=demoSuppliers.find(x=>x.id===p.supplier);return`<tr><td><code>${p.no}</code></td><td>${App.lang==="ar"?s.nameAr:s.nameEn}</td><td>${p.date}</td><td>${p.count}</td><td>${App.currency(p.total,2)}</td><td>${App.statusBadge(p.status)}</td><td>${p.user}</td><td><button class="btn btn-sm btn-secondary" data-demo>${App.t("view")}</button></td></tr>`}).join("")}</tbody></table></div>`;
    list.querySelectorAll("[data-demo]").forEach(b=>b.addEventListener("click",()=>App.toast(App.t("demoWorkflow"),"warning")));
  }
  let rowId=0;
  function newRow(){
    rowId++; const tr=document.createElement("div");tr.className="invoice-line purchase-line";tr.dataset.row=rowId;
    tr.innerHTML=`<div class="field"><label data-i18n="product">${App.t("product")}</label><select data-product>${demoProducts.map(p=>`<option value="${p.id}" data-cost="${p.cost}">${App.productName(p)}</option>`).join("")}</select></div>
    <div class="field"><label data-i18n="quantity">${App.t("quantity")}</label><input data-qty type="number" value="1" min=".001" step=".001"></div>
    <div class="field"><label data-i18n="unitCost">${App.t("unitCost")}</label><input data-cost type="number" value="${(demoProducts[0].cost/100).toFixed(2)}" min="0" step=".01"></div>
    <div class="field"><label data-i18n="lineTotal">${App.t("lineTotal")}</label><input data-line readonly></div>
    <button class="btn btn-danger btn-icon" type="button" data-remove aria-label="${App.t("remove")}">×</button>`;
    tr.querySelector("[data-product]").addEventListener("change",e=>{tr.querySelector("[data-cost]").value=(demoProducts.find(p=>p.id===Number(e.target.value)).cost/100).toFixed(2);calc()});
    tr.querySelectorAll("input").forEach(i=>i.addEventListener("input",calc));
    tr.querySelector("[data-remove]").addEventListener("click",()=>{tr.remove();calc()});
    document.getElementById("purchase-lines").appendChild(tr);calc();
  }
  function calc(){
    let total=0;document.querySelectorAll(".purchase-line").forEach(r=>{const qty=Math.round(Number(r.querySelector("[data-qty]").value||0)*1000);const cost=Math.round(Number(r.querySelector("[data-cost]").value||0)*100);const line=Math.round(qty*cost/1000);r.querySelector("[data-line]").value=App.currency(line,2);total+=line;});
    const el=document.getElementById("purchase-total");if(el)el.textContent=App.currency(total,2);
  }
  if(form){
    document.querySelector("[data-add-row]").addEventListener("click",newRow);
    form.addEventListener("submit",e=>{e.preventDefault();App.toast(App.t("demoWorkflow"));});
    newRow();
  }
  listRender();document.addEventListener("app:language",()=>{listRender();if(form){document.querySelectorAll(".purchase-line").forEach(r=>{[...r.querySelector("[data-product]").options].forEach(o=>{const p=demoProducts.find(x=>x.id===Number(o.value));o.textContent=App.productName(p)})});App.translate(form);calc()}});
});
