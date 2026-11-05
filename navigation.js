// Keep native anchor fallbacks while scrolling without changing the URL.
function getScrollTarget(fragment) {
  if (fragment === "#") return document.body;

  try {
    return document.getElementById(decodeURIComponent(fragment.slice(1)));
  } catch {
    return null;
  }
}

function clearHash() {
  if (window.location.href.includes("#")) {
    window.history.replaceState(window.history.state, "", window.location.href.split("#")[0]);
  }
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[href^='#']");
  if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  const target = getScrollTarget(link.getAttribute("href"));
  if (!target) return;

  event.preventDefault();
  clearHash();
  // Move keyboard focus along with the scroll, including the skip link.
  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
  target.scrollIntoView({ block: "start" });
});

// Honor previously shared section links, then leave a clean URL.
if (window.location.href.includes("#")) {
  const target = getScrollTarget(window.location.hash || "#");
  clearHash();
  if (target) requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
}
