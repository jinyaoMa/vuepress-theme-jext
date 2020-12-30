<template>
  <div
    class="j-post-card flex"
    :class="{
      'flex-horizontal': direction === 'horizontal',
      'flex-vertical': direction === 'vertical',
    }"
    :style="{
      borderRadius: round && '4px',
      boxShadow: shadow && `0 2px 2px ${coverColor}, 0 0 0 1px ${coverColor}`,
      height: direction === 'horizontal' && height,
    }"
  >
    <router-link
      class="j-post-card-cover"
      :style="{
        height,
        minWidth: direction === 'horizontal' && maxWidth,
        backgroundColor: coverColor,
        backgroundImage: `url('${options.cover}')`,
      }"
      :to="options.path"
      :title="options.title"
      tag="div"
    ></router-link>
    <div
      class="flex-fill flex flex-vertical"
      :style="{
        padding: gap,
        backgroundColor,
      }"
    >
      <router-link
        tag="div"
        class="j-post-card-title"
        :to="options.path"
        :style="{
          paddingBottom: gap,
        }"
      >
        {{ options.title }}
      </router-link>
      <div
        class="flex flex-horizontal flex-wrap"
        :style="{
          marginBottom: gap,
        }"
      >
        <div class="j-post-card-date">
          <i class="fas fa-calendar fa-fw"></i>
          {{ options.date }}
        </div>
        <div class="j-post-card-updated">
          <i class="fas fa-calendar-check fa-fw"></i>
          {{ options.updated }}
        </div>
      </div>
      <div
        class="j-post-card-exceprt"
        :style="{
          height: `calc(100% - ${gap} * 3 - 3.4em)`,
        }"
      >
        <div v-html="options.excerpt"></div>
        <div
          v-if="direction === 'horizontal'"
          class="j-post-card-exceprt-after"
          :style="{
            background: `linear-gradient(0deg, ${backgroundColor}, transparent)`,
          }"
        ></div>
      </div>
      <div
        class="flex flex-horizontal flex-wrap flex-justify-between flex-align-center"
        :style="{
          marginTop: gap,
        }"
      >
        <div class="j-post-card-categories">
          <i class="fas fa-folder-open fa-fw"></i>
          <span v-for="(item, i) in options.categories" :key="i">
            <span v-if="i !== 0">, </span>
            <router-link :to="item.path" :title="item.name">{{
              item.name
            }}</router-link>
          </span>
        </div>
        <div>
          <router-link class="j-post-card-more" :to="options.path" tag="div">{{
            textMore
          }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "j-post-card",
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
    height: {
      type: String,
      default() {
        return "240px";
      },
    },
    gap: {
      type: String,
      default() {
        return "20px";
      },
    },
    maxWidth: {
      type: String,
      default() {
        return "320px";
      },
    },
    coverColor: {
      type: String,
      default() {
        return "#e1e2e3";
      },
    },
    backgroundColor: {
      type: String,
      default() {
        return "#ffffff";
      },
    },
    round: {
      type: Boolean,
      default() {
        return false;
      },
    },
    shadow: {
      type: Boolean,
      default() {
        return false;
      },
    },
    textMore: {
      type: String,
      default() {
        return "MORE";
      },
    },
    options: {
      type: Object,
      default() {
        return {
          date: "2020-02-22",
          updated: "2020-12-22",
          excerpt: "<p>Test</p>",
          categories: [
            {
              name: "test",
              path: "#",
            },
          ],
          cover: "",
          title: "Test",
          path: "#",
        };
      },
    },
  },
};
</script>

<style lang="stylus">
.j-post-card
  position relative
  overflow hidden
  > div
    box-sizing border-box
  .j-post-card-cover, .j-post-card-more
    cursor pointer
    user-select none
  .j-post-card-cover
    background-repeat no-repeat
    background-position center center
    background-size cover
  .j-post-card-title
    font-size 1.5em
    line-height 1.2
    font-weight 600
    cursor pointer
    width fit-content
  .j-post-card-date
    margin-right 1em
  .j-post-card-date, .j-post-card-updated, .j-post-card-categories, .j-post-card-more
    width fit-content
    white-space nowrap
    font-size 0.8em
    line-height 1
    opacity 0.6
    transition opacity 0.2s
    &:hover
      opacity 1
  .j-post-card-exceprt
    position relative
    overflow hidden
    *
      margin 0
  .j-post-card-exceprt-after
    position absolute
    bottom 0
    width 100%
    height 1.25em
</style>