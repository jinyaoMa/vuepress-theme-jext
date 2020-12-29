<template>
  <div class="Main flex flex-vertical">
    <transition name="fade">
      <template v-if="layout === 'Home'">
        <Hitokoto></Hitokoto>
        <slot></slot>
      </template>
    </transition>
  </div>
</template>

<script>
import Hitokoto from "../components/Hitokoto";

export default {
  name: "Main",
  components: {
    Hitokoto,
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
  > .j-container:not(:first-child)
    margin-top 40px
</style>