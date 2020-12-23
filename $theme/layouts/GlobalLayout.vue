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
    </j-layout>
    <component :is="layout" />
  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";

export default {
  name: "GlobalLayout",
  components: {
    Header,
    Footer,
  },
  computed: {
    layout() {
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

<style lang="stylus" scoped>
.GlobalLayout
  letter-spacing 0.1em
</style>