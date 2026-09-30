(() => {
  const VISUAL_URL =
    "https://ebp2ichimizu-cell.github.io/ichimizu-site-intro-pages/";

  const DAILY_BRIEF_BASE =
    "https://ebp2ichimizu-cell.github.io/ebp-daily-brief/";

  const KEY =
    "ichimizu-portal-view";

  let liveDailyBriefItems = [];
  let liveDailyLoaded = false;

  async function fetchJson(url) {
    const response = await fetch(
      url,
      {
        cache: "no-store"
      }
    );

    if (!response.ok) {
      throw new Error(
        `HTTP ${response.status}: ${url}`
      );
    }

    return response.json();
  }

  async function loadLiveDailyBriefRecommendations() {
    try {
      const index =
        await fetchJson(
          `${DAILY_BRIEF_BASE}data/index.json`
        );

      const entries =
        Array.isArray(index.entries)
          ? [...index.entries]
              .filter(
                entry =>
                  entry &&
                  entry.date &&
                  entry.file
              )
              .sort(
                (a, b) =>
                  b.date.localeCompare(a.date)
              )
              .slice(0, 5)
          : [];

      const briefs =
        await Promise.all(
          entries.map(
            async entry => {
              const url =
                new URL(
                  entry.file,
                  DAILY_BRIEF_BASE
                ).href;

              return fetchJson(url);
            }
          )
        );

      liveDailyBriefItems =
        briefs.flatMap(
          brief => {
            if (
              !brief ||
              !brief.date ||
              !Array.isArray(brief.articles)
            ) {
              return [];
            }

            return brief.articles.map(
              article => {
                const articleId =
                  String(
                    article.id || ""
                  ).trim();

                const directUrl =
                  articleId
                    ? `${DAILY_BRIEF_BASE}?article=${encodeURIComponent(articleId)}`
                    : DAILY_BRIEF_BASE;

                const title =
                  String(
                    article.title || ""
                  );

                const summary =
                  String(
                    article.summary || ""
                  );

                return {
                  id:
                    articleId
                      ? `daily-${articleId}`
                      : `daily-${brief.date}-${title}`,
                  date: brief.date,
                  title_ja: title,
                  title_en: title,
                  summary_ja: summary,
                  summary_en: summary,
                  url_ja: directUrl,
                  url_en: directUrl,
                  active: true
                };
              }
            );
          }
        );

      liveDailyLoaded = true;

      if (
        typeof renderRecommendations ===
        "function"
      ) {
        renderRecommendations();
      }

    } catch (error) {
      console.error(
        "Daily Brief recommendation load failed:",
        error
      );

      liveDailyBriefItems = [];
      liveDailyLoaded = true;

      if (
        typeof renderRecommendations ===
        "function"
      ) {
        renderRecommendations();
      }
    }
  }

  /*
    通常ポータル本体の renderRecommendations() は
    getRecentDailyBriefItems() を通して候補を受け取る。
    ここを「Daily Brief本体の最新5掲載日」へ差し替える。
    recommendations.json 内の daily_brief は今後参照しない。
  */
  if (
    typeof getRecentDailyBriefItems ===
    "function"
  ) {
    getRecentDailyBriefItems =
      function() {
        return liveDailyLoaded
          ? liveDailyBriefItems
          : [];
      };
  }

  /*
    Portal Siteロゴによる
    通常表示 → ビジュアル表示の切替機能は維持。
  */
  const path =
    window.location.pathname.toLowerCase();

  const isPortalHome =
    path === "/ichimizu-portal/" ||
    path === "/ichimizu-portal/index.html";

  if (
    isPortalHome &&
    localStorage.getItem(KEY) === "visual"
  ) {
    window.location.replace(
      VISUAL_URL
    );
    return;
  }

  const logo =
    document.querySelector(
      ".app-logo"
    );

  if (logo) {
    logo.setAttribute(
      "role",
      "button"
    );

    logo.setAttribute(
      "tabindex",
      "0"
    );

    logo.setAttribute(
      "aria-label",
      "ビジュアル表示に切り替える"
    );

    logo.style.cursor =
      "pointer";

    logo.style.webkitTapHighlightColor =
      "transparent";

    const goVisual = () => {
      localStorage.setItem(
        KEY,
        "visual"
      );

      window.location.href =
        VISUAL_URL;
    };

    logo.addEventListener(
      "click",
      goVisual
    );

    logo.addEventListener(
      "keydown",
      event => {
        if (
          event.key === "Enter" ||
          event.key === " "
        ) {
          event.preventDefault();
          goVisual();
        }
      }
    );
  }

  loadLiveDailyBriefRecommendations();
})();