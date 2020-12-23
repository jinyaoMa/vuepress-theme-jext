import zhCN from "./locales/zh-CN";
import enUS from "./locales/en-US";
import md5 from "md5";

module.exports = (themeConfig, context) => {
  const name = "@jinyaoma/vuepress-theme-jext";

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
            itemLayout: "Post"
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

  const alias = () => {
    return {
      "@theme": context.themeAPI.themePath
    };
  };

  const additionalPages = [
    {
      path: "/",
      frontmatter: {
        layout: "Home"
      }
    }
  ];

  const extendPageData = ($page) => {
    console.log($page._filePath);
    // change post link
    if (typeof $page.regularPath !== "undefined") {
      const matches = $page.regularPath.match(/\/_posts\/(.+)(\.html)/);
      if (matches && matches.length === 3) {
        const pathArr = md5(matches[1].toString());
        $page.frontmatter.permalink = "/posts/" + pathArr;
      }
    }
  };

  return {
    name,
    plugins,
    alias,
    additionalPages,
    extendPageData
  };
};
