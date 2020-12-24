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
    </j-layout>
    <component :is="layout" />
  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
import Drawer from "../components/Drawer";

export default {
  name: "GlobalLayout",
  components: {
    Header,
    Footer,
    Drawer,
  },
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