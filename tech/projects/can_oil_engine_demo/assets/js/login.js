document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  form?.addEventListener("submit", event => {
    event.preventDefault();
    const role = document.getElementById("login-role").value;
    const msg = document.getElementById("login-message");
    msg.textContent = App.t("openingDemo");
    msg.classList.remove("hide");
    setTimeout(() => { location.href = `dashboard.html?role=${role}&lang=${App.lang}`; }, 650);
  });
});
