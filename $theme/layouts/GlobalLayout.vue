<template>
  <div
    class="GlobalLayout"
    :style="{
      filter: j$IsNight ? 'brightness(0.5)' : 'brightness(1)',
    }"
  >
    <j-layout
      :column="layoutColumn"
      :background-image="backgroundImage"
      :scroll-control="{
        color: '#ffffff',
        backgroundColor: '#666666ff',
      }"
      :scrollbar="{
        color: '#333',
      }"
      @scroll="handleScroll"
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
    headerOffsets() {
      const result = [];
      if (this.$page.headers && typeof document === "object") {
        this.$page.headers.forEach((h) => {
          const hash = "#" + h.slug;
          const el = document.querySelector(hash);
          if (el) {
            result.push({
              hash,
              el,
              offset: el.offsetTop || 0,
            });
          }
        });
      }
      return result;
    },
    backgroundImage() {
      return this.j$SkinConfig[this.j$Skin].backgroundImage;
    },
  },
  methods: {
    handleScroll(frame) {
      if (this.headerOffsets.length === 0) return;
      let index = 0;
      this.headerOffsets.forEach((h, i) => {
        if (frame.scrollTop > h.offset) {
          index = i;
        }
      });
      if (this.$route.hash !== this.headerOffsets[index].hash) {
        window.clearTimeout(this.scrollWaiter);
        this.scrollWaiter = window.setTimeout(() => {
          this.$vuepress.$set("disableScrollBehavior", true);
          this.$router.replace(
            {
              hash: this.headerOffsets[index].hash,
            },
            () => {
              this.$nextTick(() => {
                this.$vuepress.$set("disableScrollBehavior", false);
              });
            }
          );
        }, 1000);
      }
    },
    onResize() {
      if (window.innerWidth > 1414) {
        this.layoutColumn = 3;
      } else if (window.innerWidth > 1024) {
        this.layoutColumn = 2;
      } else if (window.innerWidth > 320) {
        this.layoutColumn = 1;
      }
    },
  },
  data() {
    return {
      layoutColumn: 3,
      scrollWaiter: null,
    };
  },
  mounted() {
    this.onResize();
    window && window.addEventListener("resize", this.onResize);
  },
  destroyed() {
    window && window.removeEventListener("resize", this.onResize);
  },
};
</script>

<style lang="stylus">
.GlobalLayout
  transition filter 0.6s

.markdown-body
  blockquote, dl, ol, p, pre, table, ul
    margin-bottom 1.5em
  img
    display block
    + em
      display block
      font-size 0.88em
      line-height 2
      padding 4px 1em
      color #24292e
      background #f1f2f3

a.header-anchor
  text-decoration none !important
</style>