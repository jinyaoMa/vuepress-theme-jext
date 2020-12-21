module.exports = (themeConfig, context) => {
  const name = "@jinyaoma/vuepress-theme-jext";

  const plugins = [];

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

  return {
    name,
    plugins,
    alias,
    additionalPages
  };
};
