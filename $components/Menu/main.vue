<template>
  <div
    class="j-menu flex flex-horizontal"
    :style="{
      paddingLeft: direction === 'horizontal' && padding,
      paddingRight: direction === 'horizontal' && padding,
      height: direction === 'horizontal' && size,
      fontSize: direction === 'horizontal' && `calc(${size} / 4)`,
    }"
  >
    <div
      class="j-menu-item"
      v-for="(link, i) in links"
      :key="i"
      :style="{
        lineHeight: direction === 'horizontal' && size,
      }"
      :class="{
        'is-active': $route.path === link.to,
      }"
      @click="$router.push(link.to)"
    >
      <i v-if="link.icon" :class="link.icon"></i>
      {{ link.text[langKey] }}
      <div
        class="j-menu-item-underline"
        :style="{
          backgroundColor: barColor,
        }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "j-menu",
  props: {
    direction: {
      type: String,
      default() {
        return "horizontal";
      },
      validator(value) {
        return ["vertical", "horizontal"].indexOf(value) !== -1;
      },
    },
    padding: {
      type: String,
      default() {
        return "40px";
      },
    },
    size: {
      type: String,
      default() {
        return "80px";
      },
    },
    langKey: {
      type: String,
      default() {
        return "en";
      },
    },
    links: {
      type: Array,
      default() {
        return [
          {
            text: {
              en: "Test",
            },
            to: "/",
          },
        ];
      },
    },
    barColor: {
      type: String,
      default() {
        return "#cc66ff";
      },
    },
  },
};
</script>

<style lang="stylus">
.j-menu
  position relative
  user-select none
  &.flex-horizontal
    .j-menu-item
      padding 0 1em
      &:hover
        .j-menu-item-underline
          height 0.2em
      &.is-active
        .j-menu-item-underline
          height 0.2em
  .j-menu-item
    position relative
    cursor pointer
  .j-menu-item-underline
    content ''
    position absolute
    bottom 0
    left 0
    width 100%
    height 0
    transition height 0.2s
</style>