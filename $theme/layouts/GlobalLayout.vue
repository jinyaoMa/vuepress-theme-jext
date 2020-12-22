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
      <template v-slot:header>
        <div class="header flex flex-horizontal">
          <div class="title" v-html="$themeConfig.title[j$Lang]"></div>
          <div class="flex flex-horizontal">
            <j-audio
              class="audio"
              v-if="playlist.length"
              :playlist="playlist"
            ></j-audio>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="footer flex flex-horizontal"></div>
      </template>
    </j-layout>
    <component :is="layout" />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "GlobalLayout",
  computed: {
    layout() {
      if (this.$page.path) {
        const layout = this.$frontmatter.layout;
        if (
          layout &&
          (this.$vuepress.getLayoutAsyncComponent(layout) ||
            this.$vuepress.getVueComponent(layout))
        ) {
          return layout;
        }
        return "Layout";
      }
      return "NotFound";
    },
  },
  methods: {
    setupPlaylist() {
      if (this.$themeConfig.playlistApi) {
        axios.get(this.$themeConfig.playlistApi).then((res) => {
          this.playlist = res.data;
        });
      }
    },
  },
  data() {
    return {
      layoutColumn: 3,
      playlist: [],
    };
  },
  mounted() {
    this.setupPlaylist();
  },
};
</script>

<style lang="stylus" scoped>
.GlobalLayout
  letter-spacing 0.1em

.header, .footer
  height 100%
  justify-content space-between

.title
  font-size 22px
  font-weight bold
  line-height 80px
  padding-bottom 0.2em
  >>> strong
    display inline-block
    line-height 22px
    margin 10px
    position relative
    color #ffffff
    &:before
      content ''
      position absolute
      top -10px
      left -10px
      height calc(100% + 20px)
      width calc(100% + 20px)
      background-color #ff3300
      border-radius 10px
      z-index -1

.audio
  padding 10px 0
</style>