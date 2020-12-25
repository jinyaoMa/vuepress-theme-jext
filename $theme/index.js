const zhCN = require("./locales/zh-CN");
const enUS = require("./locales/en-US");

module.exports = (themeConfig, _) => {
  const name = "@jinyaoma/vuepress-theme-jext";

  themeConfig._j$Blog = {
    links: {
      archive: "/posts/",
      category: "/categories/",
      tag: "/tags/"
    }
  };

  const plugins = [
    [
      // https://vuepress-plugin-blog.ulivz.com/
      "@vuepress/blog",
      {
        directories: [
          {
            id: "post",
            dirname: "_posts",
            path: "/posts/",
            title: `${zhCN.archive} | ${enUS.archive}`,
            layout: "Archive",
            frontmatter: {
              title_zh: zhCN.archive,
              title_en: enUS.archive
            },
            itemLayout: "Post",
            pagination: {
              lengthPerPage: Infinity
            }
          }
        ],
        frontmatters: [
          {
            id: "category",
            keys: ["category", "categories"],
            path: "/categories/",
            title: `${zhCN.category} | ${enUS.category}`,
            scopeLayout: "Archive"
          },
          {
            id: "tag",
            keys: ["tag", "tags"],
            path: "/tags/",
            title: `${zhCN.tag} | ${enUS.tag}`,
            scopeLayout: "Archive"
          }
        ],
        sitemap: {
          hostname: "https://ma-jinyao.cn"
        }
      }
    ],
    [
      // https://vuepress.vuejs.org/plugin/official/plugin-nprogress.html#install
      "@vuepress/nprogress"
    ]
  ];

  const define = () => {
    return {
      VUEPRESS_OFFICIAL_SITE: "//vuepress.vuejs.org/",
      THEME_REPO_URL: "//github.com/jinyaoMa/vuepress-theme-jext",
      THEME_NAME: "vuepress-theme-jext",
      THEME_SHORTNAME: "j.Ext",
      THEME_AUTHOR: "jinyaoMa",
      THEME_AUTHOR_LINK: "//github.com/jinyaoMa",
      CC_LICENSE_LINK: "//creativecommons.org/licenses/by-nc-sa/4.0/"
    };
  };

  const additionalPages = [
    {
      path: "/",
      frontmatter: {
        layout: "Home",
        title: `${zhCN.home} | ${enUS.home}`
      }
    }
  ];

  const extendPageData = ($page) => {
    const {
      _filePath, // file's absolute path
      _computed, // access the client global computed mixins at build time, e.g _computed.$localePath.
      _content, // file's raw content string
      _strippedContent, // file's content string without frontmatter
      key, // page's unique hash key
      frontmatter, // page's frontmatter object
      regularPath, // current page's default link (follow the file hierarchy)
      path // current page's real link (use regularPath when permalink does not exist)
    } = $page;

    // change _posts link
    if (typeof regularPath === "string" && regularPath.startsWith("/_posts/")) {
      frontmatter.permalink = `/posts/${key.substr(2)}/`;
    }

    // pangu
    if (_strippedContent) {
      const pangu = require("pangu");
      frontmatter.title = $page.title = pangu.spacing($page.title || "");
      $page.excerpt = pangu.spacing($page.excerpt || "");
    }

    // word count && read time
    if (_strippedContent) {
      const zh = (_strippedContent.match(/[\u4E00-\u9FA5]/g) || []).length;
      const en = (
        _strippedContent
          .replace(/[\u4E00-\u9FA5]/g, "")
          .match(
            /[a-zA-Z0-9_\u0392-\u03c9\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|[\u00E4\u00C4\u00E5\u00C5\u00F6\u00D6]+|\w+/g
          ) || []
      ).length;
      const min2read = zh / 150 + en / 100;
      frontmatter.wordcount = zh + en;
      $page.frontmatter.min2read = min2read < 1 ? "1" : parseInt(min2read, 10);
    } else {
      frontmatter.wordcount = 0;
      frontmatter.min2read = 0;
    }
  };

  const extendMarkdown = (md) => {
    md.use(require("markdown-it-pangu"));
  };

  return {
    name,
    plugins,
    define,
    additionalPages,
    extendPageData,
    extendMarkdown
  };
};
