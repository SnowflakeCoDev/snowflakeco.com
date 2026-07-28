document.addEventListener("DOMContentLoaded", () => {
  const setCopy = () => App.translate();
  document.addEventListener("app:language", setCopy);
});
