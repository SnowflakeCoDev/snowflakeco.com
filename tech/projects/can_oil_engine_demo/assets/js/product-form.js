document.addEventListener("DOMContentLoaded",()=>{
  const form=document.getElementById("product-form"); if(!form)return;
  const unit=document.getElementById("stock-unit"), container=document.getElementById("container-field"), guide=document.getElementById("litre-guide"), bulk=document.getElementById("bulk-oil");
  function unitUI(){
    const val=unit.value;
    container.classList.toggle("hide",val!=="bottle");
    guide.classList.toggle("hide",val!=="litre");
    bulk.closest(".field").classList.toggle("hide",val!=="litre");
  }
  function margin(){
    const buy=Math.round(Number(document.getElementById("purchase-price").value||0)*100);
    const sell=Math.round(Number(document.getElementById("selling-price").value||0)*100);
    document.getElementById("margin-preview").textContent=App.currency(Math.max(0,sell-buy),2);
  }
  unit.addEventListener("change",unitUI);
  ["purchase-price","selling-price"].forEach(id=>document.getElementById(id).addEventListener("input",margin));
  form.addEventListener("submit",e=>{
    e.preventDefault(); let ok=true;
    form.querySelectorAll("[required]").forEach(input=>{const err=input.closest(".field")?.querySelector(".error-text"); const bad=!input.value.trim(); input.setAttribute("aria-invalid",String(bad)); if(err)err.textContent=bad?App.t("required"):""; if(bad)ok=false;});
    if(ok)App.toast(App.t("savedDemo"));
  });
  unitUI();margin();
  document.addEventListener("app:language",()=>{unitUI();margin();});
});
