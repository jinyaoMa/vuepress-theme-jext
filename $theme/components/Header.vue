<template>
  <div class="Header flex flex-horizontal">
    <div class="title" v-html="$themeConfig.title[j$Lang]"></div>
    <div class="flex flex-horizontal">
      <j-menu
        v-if="$themeConfig.navMenu"
        :links="$themeConfig.navMenu"
        :lang-key="j$Lang"
      ></j-menu>
      <j-audio
        class="audio"
        v-if="playlist.length"
        :playlist="playlist"
      ></j-audio>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Header",
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
      playlist: [],
    };
  },
  mounted() {
    this.setupPlaylist();
  },
};
</script>

<style lang="stylus" scoped>
.Header
  height 100%
  justify-content space-between

.title
  font-size 24px
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