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
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${url}`);
    }
    return response.json();
  }

  async function loadLiveDailyBriefRecommendations() {
    try {
      const index = await fetchJson(`${DAILY_BRIEF_BASE}data/index.json`);
      const entries = Array.isArray(index.entries)
        ? [...index.entries]
            .filter(entry => entry && entry.date && entry.file)
            .sort((a, b) => b.date.localeCompare(a.date))
            .slice(0, 5)
        : [];

      const briefs = await Promise.all(
        entries.map(async entry => {
          const url = new URL(entry.file, DAILY_BRIEF_BASE).href;
          return fetchJson(url);
        })
      );

      liveDailyBriefItems = briefs.flatMap(brief => {
        if (!brief || !brief.date || !Array.isArray(brief.articles)) {
          return [];
        }
        return brief.articles.map(article => {
          const articleId = String(article.id || "").trim();
          const directUrl = articleId
            ? `${DAILY_BRIEF_BASE}?article=${encodeURIComponent(articleId)}`
            : DAILY_BRIEF_BASE;
          const title = String(article.title || "");
          const summary = String(article.summary || "");
          return {
            id: articleId ? `daily-${articleId}` : `daily-${brief.date}-${title}`,
            date: brief.date,
            title_ja: title,
            title_en: title,
            summary_ja: summary,
            summary_en: summary,
            url_ja: directUrl,
            url_en: directUrl,
            active: true
          };
        });
      });
      liveDailyLoaded = true;
      if (typeof renderRecommendations === "function") {
        renderRecommendations();
      }
    } catch (error) {
      console.error("Daily Brief recommendation load failed:", error);
      liveDailyBriefItems = [];
      liveDailyLoaded = true;
      if (typeof renderRecommendations === "function") {
        renderRecommendations();
      }
    }
  }

  // recommendations.jsonからではなく、Daily Brief本体の最新5掲載日を使用する。
  if (typeof getRecentDailyBriefItems === "function") {
    getRecentDailyBriefItems = function() {
      return liveDailyLoaded ? liveDailyBriefItems : [];
    };
  }

  // ビジュアル表示との切り替えは従来のPortal Siteロゴで行う。
  const path = window.location.pathname.toLowerCase();
  const isPortalHome =
    path === "/ichimizu-portal/" ||
    path === "/ichimizu-portal/index.html";

  if (isPortalHome && localStorage.getItem(KEY) === "visual") {
    window.location.replace(VISUAL_URL);
    return;
  }

  const logo = document.querySelector(".app-logo");
  if (logo) {
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
  }

  // トップのキャッチコピーと「目的から選ぶ」見出しの表示。
  const purposeTexts = {
    ichimizu: { ja: "いちみず会を知る", en: "About Ichimizu-kai" },
    "research-hub": { ja: "国内研究を探す", en: "Find Japanese research" },
    "international-ebp-search": { ja: "海外のエビデンスを調べる", en: "Explore overseas evidence" },
    "daily-brief": { ja: "新しい情報を追う", en: "Follow new developments" },
    "stat-training": { ja: "統計を学ぶ", en: "Learn statistics" },
    "ebp-design-support": { ja: "施策を設計する", en: "Design interventions" }
  };

  const portalCopy = {
    ja: {
      heading: "EBP・犯罪予防を\n「知る・調べる・学ぶ・実践する」\nための入口",
      detail: "国内外の研究や実務情報、学習教材、施策の設計支援をまとめています。",
      sitesIntro: "やりたいことから選ぶ",
      glossary: "分からない用語の意味を調べる"
    },
    en: {
      heading: "Your gateway to evidence-based policing and crime prevention:\nDiscover, Explore, Learn, Apply",
      detail: "Explore research, practical resources, training materials, and intervention design support.",
      sitesIntro: "Choose what you want to do",
      glossary: "Look up EBP-related terms"
    }
  };

  const extraStyle = document.createElement("style");
  extraStyle.id = "portal-purpose-design";
  extraStyle.textContent = `
    #app-description {
      margin-top: 14px;
      font-size: clamp(16px, 4.2vw, 19px);
      line-height: 1.65;
      font-weight: 700;
      color: var(--dark);
      white-space: pre-line;
      text-wrap: balance;
    }
    .portal-purpose-detail {
      color: var(--muted);
      margin: 8px auto 0;
      font-size: 13px;
      line-height: 1.7;
      max-width: 520px;
    }
    .portal-sites-intro {
      margin: -6px 4px 13px;
      font-size: 13px;
      color: var(--muted);
      font-weight: 500;
    }
    .site-card .site-purpose {
      color: var(--site-accent, var(--dark));
      font-weight: 700;
      font-size: 17px;
      line-height: 1.5;
      margin-bottom: 6px;
      overflow-wrap: anywhere;
    }
    .site-card .card-title {
      font-size: 14px;
      font-weight: 650;
      line-height: 1.55;
      margin-bottom: 6px;
    }
    .glossary-button .glossary-note {
      display: block;
      margin-top: 4px;
      font-size: 12px;
      line-height: 1.5;
      font-weight: 400;
      color: #eeeae2;
    }
    @media (max-width: 380px) {
      .site-card .site-purpose { font-size: 16px; }
      .site-card .card-title { font-size: 13px; }
    }
  `;
  document.head.append(extraStyle);

  const heading = document.getElementById("app-description");
  const detail = document.createElement("div");
  detail.className = "portal-purpose-detail";
  detail.id = "portal-purpose-detail";
  if (heading) heading.insertAdjacentElement("afterend", detail);

  const sitesTitle = document.getElementById("main-sites-title");
  const sitesIntro = document.createElement("div");
  sitesIntro.className = "portal-sites-intro";
  sitesIntro.id = "portal-sites-intro";
  if (sitesTitle) sitesTitle.insertAdjacentElement("afterend", sitesIntro);

  const glossaryButton = document.querySelector(".glossary-button");
  const glossaryNote = document.createElement("span");
  glossaryNote.className = "glossary-note";
  if (glossaryButton) glossaryButton.append(glossaryNote);

  // 既存のサイトデータ、並び順、ロゴ、カード色、リンク先は変更しない。
  function addPurposeLabels() {
    const nodes = document.querySelectorAll("#sites-grid .site-card");
    nodes.forEach((node, index) => {
      const site = Array.isArray(sitesData) ? sitesData[index] : null;
      const localized = site && purposeTexts[site.id];
      const main = node.querySelector(".site-card-main");
      if (!localized || !main) return;
      let purpose = main.querySelector(".site-purpose");
      if (!purpose) {
        purpose = document.createElement("div");
        purpose.className = "site-purpose";
        main.insertAdjacentElement("afterbegin", purpose);
      }
      purpose.textContent = localized[currentLanguage] || localized.ja;
    });
  }

  if (typeof renderSites === "function") {
    const originalRenderSites = renderSites;
    renderSites = function(...args) {
      originalRenderSites.apply(this, args);
      addPurposeLabels();
    };
  }

  if (typeof setLanguage === "function" && typeof translations === "object") {
    for (const lang of ["ja", "en"]) {
      translations[lang].description = portalCopy[lang].heading;
    }
    const originalSetLanguage = setLanguage;
    setLanguage = function(lang) {
      originalSetLanguage(lang);
      const copy = portalCopy[lang] || portalCopy.ja;
      if (detail) detail.textContent = copy.detail;
      if (sitesIntro) sitesIntro.textContent = copy.sitesIntro;
      if (glossaryNote) glossaryNote.textContent = copy.glossary;
      addPurposeLabels();
    };
    setLanguage(currentLanguage);
  }

  loadLiveDailyBriefRecommendations();
})();
