<template>
  <a
    class="j-link"
    :target="target"
    :href="to"
    :title="title"
    @click="handleClick"
    :style="{
      color,
    }"
  >
    <slot></slot>
    <div
      class="j-link-underline"
      :style="{
        backgroundColor: colorUnderline,
      }"
    ></div>
  </a>
</template>

<script>
export default {
  name: "j-link",
  props: {
    target: {
      type: String,
      default() {
        return "_self";
      },
    },
    to: {
      type: String,
      default() {
        return "#";
      },
    },
    title: {
      type: String,
      default() {
        return "";
      },
    },
    color: {
      type: String,
      default() {
        return "#ff3300";
      },
    },
    colorUnderline: {
      type: String,
      default() {
        return "#00ccff";
      },
    },
  },
  methods: {
    handleClick(e) {
      if (target.includes("_self")) {
        this.$router.push(this.to);
        e.preventDefault();
      }
      this.$emit("click", e);
    },
  },
};
</script>

<style lang="stylus">
.j-link
  position relative
  .j-link-underline
    position absolute
    bottom -0.1em
    left 0
    width 0
    height 0.1em
    background-color #00ccff
    transition width 0.2s
  &:hover
    .j-link-underline
      width 100%
</style>