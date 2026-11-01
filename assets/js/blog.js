(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
  const list = document.getElementById("post-list");
  if (!list) return;
  fetch("/posts/posts.json")
    .then(response => { if (!response.ok) throw new Error("文章列表暂不可用"); return response.json(); })
    .then(posts => {
      if (!Array.isArray(posts) || posts.length === 0) return;
      list.innerHTML = posts.slice(0, 6).map(post => {
        const title = escapeHtml(post.title || "未命名文章");
        const summary = escapeHtml(post.summary || "");
        const date = escapeHtml(post.date || "");
        const category = escapeHtml(post.category || "随笔");
        return '<article class="post-card"><p class="eyebrow">' + category + '</p><h3>' + title + '</h3><p>' + summary + '</p><div class="post-meta">' + date + '</div></article>';
      }).join("");
    }).catch(() => {});
  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, char => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[char]));
  }
})();