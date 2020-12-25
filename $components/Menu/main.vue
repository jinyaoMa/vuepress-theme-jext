<template>
  <div
    class="j-menu flex"
    :class="{
      'flex-horizontal': direction === 'horizontal',
      'flex-vertical': direction === 'vertical',
    }"
    :style="{
      paddingLeft: direction === 'horizontal' && padding,
      paddingRight: direction === 'horizontal' && padding,
      paddingTop: direction === 'vertical' && padding,
      paddingBottom: direction === 'vertical' && padding,
      height: direction === 'horizontal' && size,
      fontSize:
        (direction === 'horizontal' && `calc(${size} / 4)`) ||
        (direction === 'vertical' && `calc(${size} / 3)`),
    }"
  >
    <div
      class="j-menu-item"
      v-for="(link, i) in links"
      :key="i"
      :style="{
        lineHeight: size,
        color: textColorVertical(link.to),
      }"
      :class="{
        'is-active': isActive(link.to),
      }"
      @click="$router.push(link.to)"
    >
      <i v-if="link.icon" :class="link.icon"></i>
      <span>{{ link.text[langKey] }}</span>
      <div
        class="j-menu-item-hover"
        :style="{
          backgroundColor: hoverBackgroundColor,
        }"
      ></div>
      <div
        class="j-menu-item-active-background"
        :style="{
          backgroundColor: activeBackgroundColor,
        }"
      ></div>
      <div
        class="j-menu-item-active"
        :style="{
          backgroundColor: activeColor,
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
    exact: {
      type: Boolean,
      default() {
        return true;
      },
    },
    activeColor: {
      type: String,
      default() {
        return "#cc66ff";
      },
    },
    activeTextColor: {
      type: String,
      default() {
        return "#ffffff";
      },
    },
    activeBackgroundColor: {
      type: String,
      default() {
        return "#ffffff";
      },
    },
    hoverBackgroundColor: {
      type: String,
      default() {
        return "#f1f2f3";
      },
    },
  },
  computed: {
    isActive() {
      return function (to) {
        return this.exact
          ? this.$route.path === to
          : this.$route.path.startsWith(to);
      };
    },
    textColorVertical() {
      return function (to) {
        if (this.direction === "vertical") {
          const flag = this.exact
            ? this.$route.path === to
            : this.$route.path.startsWith(to);
          if (flag) {
            return this.activeTextColor;
          }
        }
        return "";
      };
    },
  },
};
</script>

<style lang="stylus">
.j-menu
  position relative
  user-select none
  .j-menu-item
    position relative
    cursor pointer
    padding 0 1em
    transition background-color 0.2s
    > i, > span
      position relative
      z-index 1
    &:hover
      .j-menu-item-hover
        opacity 1
    &.is-active
      .j-menu-item-active-background
        opacity 1
  .j-menu-item-hover
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    opacity 0
    transition opacty 0.2s
  .j-menu-item-active, .j-menu-item-active-background
    position absolute
  .j-menu-item-active-background
    top 0
    left 0
    height 100%
    width 100%
    opacity 0
    transition opacity 0.2s
  &.flex-horizontal
    .j-menu-item-active
      bottom 0
      left 0
      width 100%
      height 0
      transition height 0.2s
    .j-menu-item
      > i
        margin-right 0.25em
      &.is-active
        .j-menu-item-active
          height 0.2em
  &.flex-vertical
    .j-menu-item-active
      width 0.8em
      height 0.8em
      right 1em
      top calc(50% - 0.4em)
      border-radius 50%
      opacity 0
      transition opacity 0.2s
    .j-menu-item
      > i
        margin-right 0.5em
      &.is-active
        .j-menu-item-active
          opacity 1
</style>