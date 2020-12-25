module.exports = {
  // https://www.vuepress.cn/zh/config/

  theme: require.resolve("../../$theme/"),

  base: "/",

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
    blogMenu: [],
    navMenu: [
      {
        text: {
          zh: "博客",
          en: "Blog"
        },
        icon: "fas fa-blog",
        to: "/"
      }
    ],
    copyright: `© 2019 - ${new Date().getFullYear()} jinyaoMa`,
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

  evergreen: true // using old browser ?
};
