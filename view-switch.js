(() => {
  const VISUAL_URL = "https://ebp2ichimizu-cell.github.io/ichimizu-site-intro-pages/";
  const KEY = "ichimizu-portal-view";
  const path = window.location.pathname.toLowerCase();
  const isPortalHome =
    path === "/ichimizu-portal/" ||
    path === "/ichimizu-portal/index.html";

  if (isPortalHome && localStorage.getItem(KEY) === "visual") {
    window.location.replace(VISUAL_URL);
    return;
  }

  const logo = document.querySelector(".app-logo");
  if (!logo) return;

  logo.setAttribute("role", "button");
  logo.setAttribute("tabindex", "0");
  logo.setAttribute("aria-label", "ビジュアル表示に切り替える");
  logo.style.cursor = "pointer";
  logo.style.webkitTapHighlightColor = "transparent";

  const goVisual = () => {
    localStorage.setItem(KEY, "visual");
    window.location.href = VISUAL_URL;
  };

  logo.addEventListener("click", goVisual);
  logo.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      goVisual();
    }
  });
})();