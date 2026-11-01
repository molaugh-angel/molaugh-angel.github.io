import { readFile, writeFile } from "node:fs/promises";

const site = "https://molaugh-angel.github.io";
const posts = JSON.parse(await readFile("posts/posts.json", "utf8"));
const escapeXml = value => String(value ?? "").replace(/[<>&'"]/g, char => ({
  "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;"
}[char]));
const toDate = value => {
  const date = new Date(value || "");
  return Number.isNaN(date.getTime()) ? new Date(0) : date;
};
const sorted = [...posts].sort((a, b) => toDate(b.date).getTime() - toDate(a.date).getTime());
const items = sorted.map(post => {
  const url = post.url
    ? new URL(post.url, site).href
    : post.slug
      ? new URL(`/posts/${encodeURIComponent(post.slug)}/`, site).href
      : site + "/";
  const description = post.content || post.summary || "";
  return `  <item>
    <title>${escapeXml(post.title || "未命名文章")}</title>
    <link>${escapeXml(url)}</link>
    <guid isPermaLink="true">${escapeXml(url)}</guid>
    <description>${escapeXml(description)}</description>
    <category>${escapeXml(post.category || "随笔")}</category>
    <pubDate>${toDate(post.date).toUTCString()}</pubDate>
  </item>`;
}).join("\n");
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>莫笑の科技小屋</title>
  <link>${site}/</link>
  <description>数码科技、产品体验与极客生活</description>
  <language>zh-cn</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
</channel>
</rss>
`;
await writeFile("rss.xml", xml, "utf8");
console.log(`Generated RSS with ${sorted.length} posts.`);