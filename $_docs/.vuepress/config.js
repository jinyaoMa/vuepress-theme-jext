module.exports = {
  // https://www.vuepress.cn/zh/config/

  theme: require.resolve("../../$theme/"),

  base: "/test/",

  title: "耀 | jinyaoMa",

  description: "",

  themeConfig: {
    title: {
      zh: `耀 の <strong>私人空间</strong>`,
      en: `Mark's <strong>SPACE</strong>`
    },
    playlistApi: `https://api.i-meto.com/meting/api?server=netease&type=playlist&id=4989572738&r=${Math.random()}`,
    avatar: "/assets/img/avatar.png",
    author: {
      zh: `耀`,
      en: `Mark`
    },
    signature: {
      zh: `问题, 方法, 程序, 标准, 解决`,
      en: `issue, func, flow, std, solve`
    },
    brandButtons: [
      {
        icon: "fab fa-github",
        link: "https://github.com/jinyaoMa"
      },
      {
        icon: "fas fa-envelope",
        link: "mailto://jinyao.ma@outlook.com"
      },
      {
        icon: "fab fa-qq",
        link: "tencent://Message/?uin=907881445"
      }
    ],
    navMenu: [],
    blogMenu: [],
    recentPostOffset: 3, // number of recent posts each time click on 'more post'
    // clustrmaps setting
    clustrmaps: {
      id: "clustrmaps", // clstr_globe / clustrmaps
      src:
        "//cdn.clustrmaps.com/map_v2.js?cl=333333&w=a&t=t&d=kuCCiVvtASTqmAMxPSTLcjxs-p8j6ht3LUi9z9Q-OKc&co=ffffff&cmo=3acc3a&cmn=ff5353&ct=333333"
    },
    comment: {
      // https://vuepress-plugin-blog.ulivz.com/guide/getting-started.html#comment
      service: "vssue",
      owner: "jinyaoMa",
      repo: "vuepress-theme-jext",
      prefix: "[Blog Comment]: ",
      labels: [":point_right:Blog_Comment:point_left:"],
      clientId: "2da9973c24e3d7e3430a",
      clientSecret: "050434610d8f2b9a907fdb1f9b97cb672b2a7b8a"
    },
    hitokoto: {
      enable: true,
      customs: [
        /*{ // format; if customs exist, API will be ignored, and customs will be in use
                word: 'https://developer.hitokoto.cn',
                from: '一言开发者中心'
              }*/
      ],
      type: "i" // https://developer.hitokoto.cn/sentence/#请求参数
    },
    gallery: [
      /*{ format; these gallery items will be appended to /gallery/ page
            name: 'test image from baidu',
            url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596063652971&di=8b659ee5cd46f4006d082b626eb3bd0d&imgtype=0&src=http%3A%2F%2Fpicture.ik123.com%2Fuploads%2Fallimg%2F180330%2F4-1P330160644.jpg'
          }*/
    ],
    socialShare: {
      // https://sns.goyfe.com/guide/
      networks: [
        "qq",
        "weibo",
        "douban",
        "email",
        "whatsapp",
        "facebook",
        "reddit",
        "telegram",
        "line"
      ],
      email: "jinyao.ma@outlook.com",
      fallbackImage: "/assets/img/avatar.png",
      noGlobalSocialShare: true
    },
    license: "jinyaoMa",
    copyright: `© 2019 - ${new Date().getFullYear()} jinyaoMa`,
    portals: [
      {
        text: {
          zh: "博客 Hexo 版 (Mustom)",
          en: "Blog ver. Hexo (Mustom)"
        },
        link: "https://jinyaoma.github.io/my-hexo-site/"
      },
      {
        text: {
          zh: "博客 VuePress 版 (Mustom)",
          en: "Blog ver. VuePress (Mustom)"
        },
        link: "https://jinyaoma.github.io/vuepress-theme-mustom/"
      },
      {
        text: {
          zh: "耀 UI 模板",
          en: "Yao UI Template"
        },
        link: "https://jinyaoma.github.io/yao-ui/"
      },
      {
        text: {
          zh: "主题色提取",
          en: "Palette"
        },
        link: "https://jinyaoma.github.io/Palette/"
      },
      {
        text: {
          zh: "MPlayer",
          en: "MPlayer"
        },
        link: "https://jinyaoma.github.io/MPlayer/"
      },
      {
        text: {
          zh: "求职信仓库",
          en: "Cover Letter Library"
        },
        link: "https://jinyaoma.github.io/cover-letter-lib/"
      }
    ],
    qrcodes: [
      {
        text: {
          zh: "QQ 群",
          en: "QQ Group"
        },
        image: "/assets/img/qq.group.png"
      },
      {
        text: {
          zh: "QQ",
          en: "QQ"
        },
        image: "/assets/img/qq.png"
      },
      {
        text: {
          zh: "微信",
          en: "WeChat"
        },
        image: "/assets/img/wechat.png"
      }
    ]
  },

  evergreen: true, // using old browser ?

  markdown: {
    extendMarkdown: (md) => {
      md.set({ breaks: true });
      md.use(require("markdown-it-footnote"));
    }
  }
};
