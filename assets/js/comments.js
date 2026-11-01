(() => {
  const containers = document.querySelectorAll("[data-giscus]");
  if (!containers.length) return;
  const config = window.GISCUS_CONFIG || {};
  const required = ["repo", "repoId", "category", "categoryId"];
  const missing = required.filter(key => !String(config[key] || "").trim());
  if (missing.length) {
    containers.forEach(container => {
      const note = document.createElement("div");
      note.className = "comment-setup-note";
      note.innerHTML = '<strong>评论区即将开放</strong><p>评论系统采用 Giscus + GitHub Discussions。站点管理员完成一次仓库配置后，访客即可使用 GitHub 账号留言。</p><a href="https://giscus.app/zh-CN" target="_blank" rel="noopener noreferrer">打开 Giscus 配置页面 →</a>';
      container.replaceChildren(note);
    });
    return;
  }
  containers.forEach(container => {
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", config.repo);
    script.setAttribute("data-repo-id", config.repoId);
    script.setAttribute("data-category", config.category);
    script.setAttribute("data-category-id", config.categoryId);
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "dark");
    script.setAttribute("data-lang", "zh-CN");
    container.appendChild(script);
  });
})();