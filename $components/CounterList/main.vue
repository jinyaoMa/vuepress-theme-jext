<template>
  <div
    class="j-counter-list"
    :style="{
      paddingTop: padding,
      paddingBottom: padding,
    }"
  >
    <j-counter-list-item
      :options="options"
      :gap="gap"
      :countColor="countColor"
    ></j-counter-list-item>
  </div>
</template>

<script>
import item from "./item";

export default {
  name: "j-counter-list",
  props: {
    options: {
      type: Object,
      default() {
        return {};
      },
    },
    gap: {
      type: String,
      default() {
        return "20px";
      },
    },
    padding: {
      type: String,
      default() {
        return "4px";
      },
    },
    countColor: {
      type: String,
      default() {
        return "#cc66ff";
      },
    },
  },
  components: {
    "j-counter-list-item": item,
  },
  methods: {},
};
</script>

<style lang="stylus">
.j-counter-list
  position relative
  user-select none
  ul
    list-style-type none
    margin 0
    padding-left 0
  .j-counter-list-item
    line-height 2
    sup
      font-weight bold
    a
      opacity 0.8
      transition opacity 0.2s
      &:hover
        opacity 1
      &.link-active
        opacity 1
</style>