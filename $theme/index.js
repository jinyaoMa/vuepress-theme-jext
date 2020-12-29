const zhCN = require("./locales/zh-CN");
const enUS = require("./locales/en-US");
const path = require("path");
const fs = require("fs");

const generateGallery = (context) => {
  let result = {
    page: {},
    list: []
  };
  let projectPath = "./";
  const regex = /^.+\.(bmp|png|jpeg|jpg|gif|svg|webp)$/;
  if (process.argv.length === 4 && /(dev|build)/.test(process.argv[2])) {
    const projectName = process.argv[3];
    projectPath = path.resolve(
      process.cwd(),
      projectName,
      ".vuepress/public/gallery"
    );
  } else if (process.argv.length === 3 && /(dev|build)/.test(process.argv[2])) {
    projectPath = path.resolve(process.cwd(), ".vuepress/public/gallery");
  }
  if (fs.existsSync(projectPath) && fs.statSync(projectPath).isDirectory()) {
    const ls = fs.readdirSync(projectPath);
    if (ls && ls.length) {
      ls.forEach((filename) => {
        regex.test(filename) &&
          result.list.push({
            name: filename,
            url: context.base + "gallery/" + filename
          });
      });
      result.page = {
        path: "/gallery/",
        frontmatter: {
          layout: "Layout",
          title: `${zhCN.gallery} | ${enUS.gallery}`,
          gallery: {
            enabled: true
          }
        }
      };
    }
  }
  return result;
};

module.exports = (themeConfig, context) => {
  const name = "@jinyaoma/vuepress-theme-jext";

  const gallery = generateGallery(context);

  themeConfig._j$Blog = {
    links: {
      archive: "/posts/",
      category: "/categories/",
      tag: "/tags/"
    },
    navMenu: [
      {
        text: {
          zh: zhCN.blog,
          en: enUS.blog
        },
        icon: "fas fa-blog",
        to: "/"
      },
      ...(themeConfig.navMenu instanceof Array ? themeConfig.navMenu : [])
    ],
    blogMenu: [
      {
        text: {
          zh: zhCN.archive,
          en: enUS.archive
        },
        icon: "fas fa-archive fa-fw",
        to: "/posts/"
      },
      {
        text: {
          zh: zhCN.gallery,
          en: enUS.gallery
        },
        icon: "fas fa-images fa-fw",
        to: "/gallery/"
      },
      ...(themeConfig.blogMenu instanceof Array ? themeConfig.blogMenu : [])
    ],
    settings: [
      {
        id: "nightshift",
        text: {
          zh: zhCN.nightshift,
          en: enUS.nightshift
        },
        icon: "fas fa-adjust fa-fw"
      },
      {
        id: "language",
        text: {
          zh: zhCN.language,
          en: enUS.language
        },
        icon: "fas fa-language fa-fw"
      }
    ],
    skins: [
      {
        id: "default",
        text: {
          zh: zhCN.default,
          en: enUS.default
        },
        skin: "linear-gradient(120deg, #ff3300, #cc66ff, #00ccff)",
        color: "#ffffff"
      },
      {
        id: "black",
        text: {
          zh: zhCN.black,
          en: enUS.black
        },
        skin: "#666666",
        color: "#ffffff"
      }
    ],
    gallery: [
      ...gallery.list,
      ...(themeConfig.gallery instanceof Array ? themeConfig.gallery : [])
    ]
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
    },
    gallery.page
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

      // extract posts as blog page
      if (frontmatter.extract === true) {
        themeConfig._j$Blog.blogMenu.push({
          text: {
            zh: frontmatter.title_zh || "",
            en: frontmatter.title_en || ""
          },
          icon: frontmatter.icon || false,
          to: frontmatter.permalink
        });
      }
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
