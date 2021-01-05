<template>
  <div class="GlobalLayout">
    <j-layout
      :column="layoutColumn"
      background-image="linear-gradient(120deg, #ff3300, #cc66ff, #00ccff)"
      :scroll-control="{
        color: '#ffffff',
        backgroundColor: '#666666ff',
      }"
      :scrollbar="{
        color: '#333',
      }"
    >
      <Header slot="header"></Header>
      <Footer slot="footer"></Footer>
      <Drawer slot="drawer"></Drawer>
      <Aside slot="aside"></Aside>
      <Main slot="main" :layout="layout">
        <component :is="layout" :key="layout" />
      </Main>
    </j-layout>
  </div>
</template>

<script>
export default {
  name: "GlobalLayout",
  computed: {
    layout() {
      console.log(this);
      if (this.$page.path) {
        const _layout = this.$frontmatter.layout;
        if (
          _layout &&
          (this.$vuepress.getLayoutAsyncComponent(_layout) ||
            this.$vuepress.getVueComponent(_layout))
        ) {
          return _layout;
        }
        return "Layout";
      }
      return "NotFound";
    },
  },
  data() {
    return {
      layoutColumn: 3,
    };
  },
};
</script>

<style lang="stylus">
.markdown-body blockquote, .markdown-body dl, .markdown-body ol, .markdown-body p, .markdown-body pre, .markdown-body table, .markdown-body ul
  margin-bottom 1.5em

a.header-anchor
  text-decoration none !important
</style>