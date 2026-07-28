document.addEventListener("DOMContentLoaded",()=>{
  document.querySelectorAll("[data-demo-form]").forEach(form=>form.addEventListener("submit",e=>{e.preventDefault();App.toast(App.t(form.dataset.message||"settingsSaved"))}));
  document.querySelectorAll("[data-password-preview]").forEach(b=>b.addEventListener("click",()=>App.toast(App.t("passwordPreview"),"warning")));
  function renderProfile(){
    if(!document.getElementById("profile-heading"))return;
    const user=demoUsers.find(u=>u.role===App.role)||demoUsers[0],display=App.lang==="ar"?user.nameAr:user.nameEn;
    document.getElementById("profile-avatar").textContent=user.nameEn.split(" ").map(x=>x[0]).join("");
    document.getElementById("profile-heading").textContent=`${display} · ${App.t(user.role)}`;
    document.getElementById("profile-contact").textContent=`${user.email} · ${user.phone}`;
    document.getElementById("profile-name").value=display;
    document.getElementById("profile-role").value=App.t(user.role);
    document.getElementById("profile-phone").value=user.phone;
    document.getElementById("profile-email").value=user.email;
  }
  renderProfile();document.addEventListener("app:language",renderProfile);document.addEventListener("app:role",renderProfile);
});
