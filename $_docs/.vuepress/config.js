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
    playlistApi: `https://api.i-meto.com/meting/api?server=netease&type=playlist&id=4989572738&r=${Math.random()}`
  }
};
