document.addEventListener("DOMContentLoaded", () => {
  const root=document.getElementById("dashboard-root"); if(!root)return;
  function render(){
    const d=demoDashboard;
    const metrics=[
      ["todaysSales",App.currency(d.todaySales),"↗",true],["todaysProfit",App.currency(d.todayProfit),"◆",true],
      ["monthlySales",App.currency(d.monthSales),"▥",true],["monthlyProfit",App.currency(d.monthProfit),"●",true],
      ["litresToday",App.quantity(d.litres,"litre",2),"◔",false],["invoiceCount",String(d.invoices),"▤",false],
      ["lowStockProducts",String(d.lowStock),"! ",false],["pendingReviews",String(d.pending),"⌛",false]
    ];
    root.innerHTML=`
      <section class="metric-grid">${metrics.map(([k,v,icon,sensitive])=>`<article class="card metric-card ${sensitive&&k.includes("Profit")?"owner-only":""}">
        <div class="metric-top"><span data-i18n="${k}">${App.t(k)}</span><span class="metric-icon">${icon}</span></div>
        <strong class="metric-value">${v}</strong><small class="metric-note" data-i18n="versusYesterday">${App.t("versusYesterday")}</small>
      </article>`).join("")}</section>
      <div class="employee-guard restricted-card"><strong>${App.t("ownerOnly")}</strong><p class="muted">${App.t("demoNotice")}</p></div>
      <section class="content-grid">
        <article class="card"><div class="card-header"><div><h2>${App.t("monthlyOverview")}</h2><small class="muted">${App.t("monthlySales")} · 2026</small></div><span class="badge badge-success">+14.8%</span></div>
          <div class="chart-box" aria-label="${App.t("monthlyOverview")}">${[55,63,48,72,80,94].map((h,i)=>`<div class="chart-bar" style="height:${h}%"><span>${App.lang==="ar"?["فبر","مار","أبر","مايو","يون","يول"][i]:["Feb","Mar","Apr","May","Jun","Jul"][i]}</span></div>`).join("")}</div>
        </article>
        <article class="card"><div class="card-header"><h2>${App.t("lowStock")}</h2><a class="btn btn-sm btn-secondary" href="low-stock.html?role=${App.role}&lang=${App.lang}">${App.t("view")}</a></div>
          <div class="list">${demoProducts.filter(p=>p.quantity<=p.min).slice(0,5).map(p=>`<div class="list-item"><div class="list-main"><strong>${App.escapeHTML(App.productName(p))}</strong><small>${App.quantity(p.quantity,p.unit)}</small></div>${App.statusBadge(p.quantity===0?"out":"low")}</div>`).join("")}</div>
        </article>
      </section>
      <section class="content-grid equal">
        <article class="card"><div class="card-header"><h2>${App.t("recentInvoices")}</h2><a href="invoices.html?role=${App.role}&lang=${App.lang}" class="btn btn-sm btn-secondary">${App.t("view")}</a></div>
          <div class="list">${demoInvoices.slice(0,4).map(i=>`<div class="list-item"><div class="list-main"><strong>${i.no} · ${App.lang==="ar"?i.customerAr:i.customerEn}</strong><small>${i.date}</small></div><div><strong>${App.currency(i.total)}</strong>${App.statusBadge(i.status)}</div></div>`).join("")}</div>
        </article>
        <article class="card"><div class="card-header"><h2>${App.t("bestSellers")}</h2></div><div class="list">
          ${[[1,"12.5"],[9,"18"],[4,"11"],[11,"9"]].map(([id,sold],idx)=>{const p=demoProducts.find(x=>x.id===id);return`<div class="list-item"><div class="list-main"><strong>${idx+1}. ${App.escapeHTML(App.productName(p))}</strong><small>${sold} ${App.t(p.unit)}</small></div><span class="gold">●</span></div>`}).join("")}
        </div></article>
      </section>
      <section class="card"><div class="card-header"><h2>${App.t("quickActions")}</h2></div><div class="quick-grid">
        ${[["invoice-form.html","＋","newInvoice"],["product-form.html","◫","addProduct"],["purchase-form.html","↓","addPurchase"],["invoice-upload.html","⇧","uploadInvoice"],["reports.html","◒","viewReports"]].map(([href,icon,k])=>`<a class="quick-action ${k==="viewReports"?"owner-only":""}" href="${href}?role=${App.role}&lang=${App.lang}"><span>${icon}</span><span>${App.t(k)}</span></a>`).join("")}
      </div></section>`;
    App.applyRole(App.role,false);
  }
  render();
  document.addEventListener("app:language",render);
  document.addEventListener("app:role",render);
});
