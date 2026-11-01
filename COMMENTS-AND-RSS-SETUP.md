# 评论系统与 RSS 说明

## 评论系统（Giscus）

站点已加入 Giscus 前端挂载点，配置文件为 `assets/js/comments-config.js`。Giscus 使用 GitHub Discussions 保存评论，不需要自建数据库。

首次启用需要仓库管理员完成以下操作：

1. 打开仓库 Settings → General → Features，启用 Discussions。
2. 安装 Giscus GitHub App，并仅授权仓库 `molaugh-angel/molaugh-angel.github.io`。
3. 打开 https://giscus.app/zh-CN ，仓库填写 `molaugh-angel/molaugh-angel.github.io`。
4. 选择一个 Discussion 分类（建议新建 `Blog Comments`，类型选 Discussion）。
5. 将配置页面生成的 `data-repo-id`、`data-category`、`data-category-id` 分别填入 `assets/js/comments-config.js` 的 `repoId`、`category`、`categoryId`。
6. 提交该配置文件到 main。完成后首页和数码评测页会显示评论区。

当前配置中的 ID 留空是有意为之：这些值必须由 GitHub/Giscus 根据实际仓库和分类生成，不能猜测。未配置时页面会显示评论区启用提示，不会出现失效的空白嵌入框。

## RSS 自动更新

文章元数据统一维护在 `posts/posts.json`。每次该文件在 main 分支发生变更，GitHub Actions 会运行 `scripts/generate-rss.mjs` 并自动更新根目录 `rss.xml`。

新增文章时建议至少提供：
- `title`：文章标题
- `date`：发布日期（ISO 日期格式，如 `2026-11-01`）
- `summary`：摘要
- `category`：分类
- `slug` 或 `url`：文章链接（有独立文章页时填写）

RSS 地址： https://molaugh-angel.github.io/rss.xml

首次合并后，请在 GitHub 仓库 Settings → Actions → General 检查 Actions permissions，允许工作流运行；工作流仅请求 `contents: write`，用于提交自动生成的 `rss.xml`。
