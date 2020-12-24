module.exports = {
  // https://www.vuepress.cn/zh/config/

  theme: require.resolve("../../$theme/"),

  base: "/",

  title: "耀 | jinyaoMa",

  description: "",

  themeConfig: {
    title: {
      zh: `耀 の <strong>私人空间</strong>`,
      en: `Jinyao's <strong>SPACE</strong>`
    },
    playlistApi: `https://api.i-meto.com/meting/api?server=netease&type=playlist&id=4989572738&r=${Math.random()}`,
    copyright: `© 2019 - ${new Date().getFullYear()} jinyaoMa`,
    qrcodes: [
      {
        text: {
          zh: "QQ群",
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
    ],
    navMenu: [
      {
        text: {
          zh: "博客",
          en: "Blog"
        },
        icon: "fas fa-blog",
        to: "/"
      }
    ]
  },

  evergreen: true // using old browser ?
};
