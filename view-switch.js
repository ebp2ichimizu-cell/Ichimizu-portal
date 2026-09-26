(() => {
  const PORTAL_URL = "https://ebp2ichimizu-cell.github.io/Ichimizu-portal/";
  const VISUAL_URL = "https://ebp2ichimizu-cell.github.io/ichimizu-site-intro-pages/";
  const KEY = "ichimizu-portal-view";
  const path = window.location.pathname.toLowerCase();
  const isVisual = path.includes("/ichimizu-site-intro-pages");
  const isPortalHome =
    path === "/ichimizu-portal/" ||
    path === "/ichimizu-portal/index.html";

  // PWAを通常ポータルから起動した場合、前回がビジュアル表示ならそちらへ戻す。
  if (isPortalHome && localStorage.getItem(KEY) === "visual") {
    window.location.replace(VISUAL_URL);
    return;
  }

  const button = document.createElement("button");
  button.type = "button";
  button.className = "ichimizu-view-switch";
  button.setAttribute(
    "aria-label",
    isVisual ? "通常表示に切り替える" : "ビジュアル表示に切り替える"
  );
  button.textContent = isVisual ? "通常表示" : "ビジュアル表示";

  const style = document.createElement("style");
  style.textContent = `
    .ichimizu-view-switch {
      position: fixed;
      top: max(12px, env(safe-area-inset-top));
      right: 12px;
      z-index: 99999;
      border: 1px solid rgba(255,255,255,.28);
      border-radius: 999px;
      padding: 9px 13px;
      font: 700 12px/1 -apple-system,BlinkMacSystemFont,"Hiragino Kaku Gothic ProN","Yu Gothic",sans-serif;
      letter-spacing: .02em;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      box-shadow: 0 3px 14px rgba(0,0,0,.16);
    }
    body:not(.selecting) .ichimizu-view-switch {
      background: rgba(52,52,46,.88);
      color: #fff;
    }
    @media (max-width: 420px) {
      .ichimizu-view-switch {
        top: max(9px, env(safe-area-inset-top));
        right: 9px;
        padding: 8px 11px;
        font-size: 11px;
      }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(button);

  button.addEventListener("click", () => {
    if (isVisual) {
      localStorage.setItem(KEY, "portal");
      window.location.href = PORTAL_URL;
    } else {
      localStorage.setItem(KEY, "visual");
      window.location.href = VISUAL_URL;
    }
  });
})();