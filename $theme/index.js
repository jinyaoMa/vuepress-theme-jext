const name = "@jinyaoma/vuepress-theme-jext";

const plugins = [];

const additionalPages = [
  {
    path: "/",
    frontmatter: {
      layout: "Home"
    }
  }
];

module.exports = (themeConfig, context) => {
  return {
    name,
    plugins,
    additionalPages
  };
};
