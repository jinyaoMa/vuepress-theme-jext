<template>
  <j-container :title="j$Locale.menu" disabled hide-extend-icon>
    <j-menu
      class="BlogMenu"
      direction="vertical"
      size="3em"
      padding="4px"
      active-color="#00ccff"
      active-text-color="#ffffff"
      active-background-color="#333333"
      exact
      :links="blogMenu"
      :lang-key="j$Lang"
    ></j-menu>
  </j-container>
</template>

<script>
export default {
  name: "BlogMenu",
  computed: {
    blogMenu() {
      return this.$themeConfig._j$Blog.blogMenu;
    },
  },
};
</script>

<style lang="stylus" scoped></style>