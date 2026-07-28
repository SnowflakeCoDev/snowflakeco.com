document.addEventListener("DOMContentLoaded",()=>{
  const zone=document.getElementById("upload-zone"),input=document.getElementById("invoice-image");if(!zone||!input)return;
  const valid=["image/jpeg","image/png","image/webp"];
  function choose(file){
    if(!file)return;if(!valid.includes(file.type)){App.toast(App.t("unsupportedFile"),"danger");return}if(file.size>8*1024*1024){App.toast(App.t("fileTooLarge"),"danger");return}
    const reader=new FileReader();reader.onload=e=>{document.getElementById("image-preview").src=e.target.result;document.getElementById("upload-empty").classList.add("hide");document.getElementById("upload-preview").classList.remove("hide");document.getElementById("file-name").textContent=file.name;document.getElementById("file-size").textContent=`${(file.size/1024/1024).toFixed(2)} MB`;process()};reader.readAsDataURL(file);
  }
  function process(){document.getElementById("processing").classList.remove("hide");document.getElementById("extracted").classList.add("hide");document.getElementById("extracted-empty").classList.add("hide");setTimeout(()=>{document.getElementById("processing").classList.add("hide");document.getElementById("extracted").classList.remove("hide");App.toast(App.t("ocrDone"))},1000)}
  zone.addEventListener("dragover",e=>{e.preventDefault();zone.classList.add("dragging")});zone.addEventListener("dragleave",()=>zone.classList.remove("dragging"));zone.addEventListener("drop",e=>{e.preventDefault();zone.classList.remove("dragging");choose(e.dataTransfer.files[0])});
  input.addEventListener("change",()=>choose(input.files[0]));
  document.querySelector("[data-remove-image]").addEventListener("click",()=>{input.value="";document.getElementById("upload-empty").classList.remove("hide");document.getElementById("upload-preview").classList.add("hide");document.getElementById("extracted").classList.add("hide");document.getElementById("extracted-empty").classList.remove("hide")});
  document.querySelector("[data-confirm-review]").addEventListener("click",()=>App.toast(App.t("demoNotice")));
});
