document.addEventListener("DOMContentLoaded",()=>{
  const lines=document.getElementById("invoice-lines"); if(!lines)return;
  let serial=0, confirmed=false;
  function lineTemplate(){
    serial++;const row=document.createElement("div");row.className="invoice-line";row.dataset.line=serial;
    row.innerHTML=`<div class="field"><label data-i18n="product">${App.t("product")}</label><select data-product>${demoProducts.filter(p=>p.active&&p.quantity>0).map(p=>`<option value="${p.id}">${App.productName(p)}</option>`).join("")}</select></div>
      <div class="field"><label data-i18n="unit">${App.t("unit")}</label><input data-unit readonly></div>
      <div class="field"><label data-i18n="availableStock">${App.t("availableStock")}</label><input data-stock readonly></div>
      <div class="field"><label data-i18n="quantity">${App.t("quantity")}</label><input data-qty type="number" min=".001" step=".001" value="${serial===1?"1.750":"1"}"></div>
      <div class="field"><label data-i18n="unitPrice">${App.t("unitPrice")}</label><input data-price type="number" min="0" step=".01"></div>
      <button class="btn btn-danger btn-icon" type="button" data-remove aria-label="${App.t("remove")}">×</button>
      <div class="line-preview"><span><i data-i18n="remainingStock" style="font-style:normal">${App.t("remainingStock")}</i>: <strong data-remaining></strong></span><span><i data-i18n="lineTotal" style="font-style:normal">${App.t("lineTotal")}</i>: <strong data-line-total></strong></span><span class="owner-only"><i data-i18n="cost" style="font-style:normal">${App.t("cost")}</i>: <strong data-line-cost></strong></span><span class="owner-only"><i data-i18n="profit" style="font-style:normal">${App.t("profit")}</i>: <strong data-line-profit></strong></span></div>`;
    const select=row.querySelector("[data-product]");
    if(serial===1)select.value="1";
    function setProduct(){
      const p=demoProducts.find(x=>x.id===Number(select.value));row.querySelector("[data-unit]").value=App.t(p.unit);row.querySelector("[data-stock]").value=App.quantity(p.quantity,p.unit);row.querySelector("[data-price]").value=(p.price/100).toFixed(2);
      if(p.unit==="litre"){row.querySelector("[data-qty]").step=".001"}else{row.querySelector("[data-qty]").step="1";if(Number(row.querySelector("[data-qty]").value)%1)row.querySelector("[data-qty]").value="1"} calculate();
    }
    select.addEventListener("change",setProduct);row.querySelectorAll("[data-qty],[data-price]").forEach(i=>i.addEventListener("input",calculate));
    row.querySelector("[data-remove]").addEventListener("click",()=>{if(lines.children.length>1)row.remove();else App.toast(App.t("invoiceItems"),"warning");calculate()});
    lines.appendChild(row);setProduct();
  }
  function lineValues(row){
    const p=demoProducts.find(x=>x.id===Number(row.querySelector("[data-product]").value));
    const rawQty=Number(row.querySelector("[data-qty]").value||0);
    const scaledQty=p.unit==="litre"?Math.round(rawQty*1000):Math.round(rawQty);
    const divisor=p.unit==="litre"?1000:1;
    const price=Math.round(Number(row.querySelector("[data-price]").value||0)*100);
    const revenue=Math.round(scaledQty*price/divisor);
    const cost=Math.round(scaledQty*p.cost/divisor);
    return {p,scaledQty,revenue,cost,profit:revenue-cost,remaining:p.quantity-scaledQty};
  }
  function calculate(){
    let subtotal=0,cost=0;
    [...lines.children].forEach(row=>{const x=lineValues(row);subtotal+=x.revenue;cost+=x.cost;row.querySelector("[data-remaining]").textContent=App.quantity(x.remaining,x.p.unit);row.querySelector("[data-line-total]").textContent=App.currency(x.revenue,2);row.querySelector("[data-line-cost]").textContent=App.currency(x.cost,2);row.querySelector("[data-line-profit]").textContent=App.currency(x.profit,2);row.querySelector("[data-remaining]").style.color=x.remaining<0?"var(--danger)":"";});
    const discount=Math.round(Number(document.getElementById("discount").value||0)*100),final=Math.max(0,subtotal-discount);
    document.getElementById("sum-subtotal").textContent=App.currency(subtotal,2);document.getElementById("sum-discount").textContent=App.currency(discount,2);document.getElementById("sum-total").textContent=App.currency(final,2);document.getElementById("sum-cost").textContent=App.currency(cost,2);document.getElementById("sum-profit").textContent=App.currency(final-cost,2);
    App.applyRole(App.role,false);
  }
  document.querySelector("[data-add-line]").addEventListener("click",lineTemplate);
  document.getElementById("discount").addEventListener("input",calculate);
  document.getElementById("invoice-form").addEventListener("submit",e=>{e.preventDefault();App.openModal("confirm-modal")});
  document.querySelector("[data-save-draft]").addEventListener("click",()=>App.toast(App.t("savedDemo")));
  document.querySelector("[data-final-confirm]").addEventListener("click",()=>{confirmed=true;App.closeModal("confirm-modal");App.toast(App.t("invoiceConfirmed"));document.getElementById("confirmed-preview").classList.remove("hide");calculate()});
  lineTemplate();
  document.addEventListener("app:language",()=>{[...lines.children].forEach(r=>{const p=demoProducts.find(x=>x.id===Number(r.querySelector("[data-product]").value));[...r.querySelector("[data-product]").options].forEach(o=>{const op=demoProducts.find(x=>x.id===Number(o.value));o.textContent=App.productName(op)});r.querySelector("[data-unit]").value=App.t(p.unit);r.querySelector("[data-stock]").value=App.quantity(p.quantity,p.unit)});App.translate(lines);calculate()});
  document.addEventListener("app:role",calculate);
});
