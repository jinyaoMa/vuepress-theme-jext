<template>
  <j-container :title="j$Locale.category" disabled hide-extend-icon>
    <j-counter-list
      class="Categories"
      :options="CateOptions"
      count-color="#00ccff"
    ></j-counter-list>
  </j-container>
</template>

<script>
export default {
  name: "Categories",
  computed: {
    CateOptions() {
      const result = {};
      for (const key in this.$category.map) {
        const item = this.$category.map[key];
        this.setCate(result, item.key, item, 0);
      }
      return result;
    },
  },
  methods: {
    setCate(result, key, item, level) {
      level += 1;
      if (typeof key === "string") {
        result[key] = {
          ...(result[key] || {}),
          path: item.path,
          count: item.pages.length,
          children: {},
          level,
        };
      } else if (key instanceof Array && key.length > 0) {
        const parent = key[0];
        const self = key[1];
        if (typeof result[parent] !== "object") {
          result[parent] = {
            count: 0,
            children: {},
            level,
          };
        }
        this.setCate(result[parent].children, self, item, level);
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
>>> a
  &:before
    background-color #cc66ff
  &.router-link-exact-active:before
    width 100%
</style>