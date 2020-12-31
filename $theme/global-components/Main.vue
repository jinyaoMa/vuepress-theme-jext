<template>
  <div class="Main flex flex-vertical">
    <transition-group name="fade" tag="div">
      <Hitokoto
        v-if="
          $themeConfig.hitokoto &&
          $themeConfig.hitokoto.enable &&
          (layout === 'Home' || layout === 'NotFound')
        "
        key="hitokoto"
      ></Hitokoto>
      <slot></slot>
      <Comment v-if="$frontmatter.comment !== false" key="comment"></Comment>
    </transition-group>
  </div>
</template>

<script>
import Hitokoto from "../components/Hitokoto";
import Comment from "../components/Comment";

export default {
  name: "Main",
  components: {
    Hitokoto,
    Comment,
  },
  props: {
    layout: {
      type: String,
      default() {
        return "Layout";
      },
    },
  },
};
</script>

<style lang="stylus" scoped>
.Main
  > div > .j-container:not(:first-child)
    margin-top 40px
</style>