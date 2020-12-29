<template>
  <div
    class="j-cloud-list flex flex-horizontal flex-wrap flex-align-center"
    :style="{
      paddingLeft: padding,
      paddingRight: padding,
      paddingTop: gap,
    }"
  >
    <router-link
      v-for="item in options"
      :key="item.name"
      :title="item.name"
      :to="item.path"
      :style="{
        marginRight: gap,
        marginBottom: gap,
        fontSize: fontSize(item.count),
        opacity: opacity(item.count),
      }"
    >
      {{ item.name }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: "j-cloud-list",
  props: {
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    padding: {
      type: String,
      default() {
        return "20px";
      },
    },
    gap: {
      type: String,
      default() {
        return "12px";
      },
    },
    multiple: {
      type: Number,
      default() {
        return 0.5;
      },
    },
  },
  watch: {
    options: {
      handler(value) {
        this.max = 0;
        this.min = Infinity;
        value.forEach((item) => {
          if (item.count > this.max) {
            this.max = item.count;
          }
          if (item.count < this.min) {
            this.min = item.count;
          }
        });
      },
      immediate: true,
    },
  },
  computed: {
    fontSize() {
      return function (count) {
        return (
          1 +
          ((count - this.min) / (this.max - this.min)) * this.multiple +
          "em"
        );
      };
    },
    opacity() {
      return function (count) {
        return 0.6 + ((count - this.min) / (this.max - this.min)) * 0.4;
      };
    },
  },
  data() {
    return {
      max: 0,
      min: Infinity,
    };
  },
};
</script>

<style lang="stylus">
.j-cloud-list
  position relative
  user-select none
  a
    transition opacity 0.2s
    &:hover
      opacity 1 !important
    &.router-link-exact-active
      opacity 1 !important
</style>