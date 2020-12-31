<template>
  <j-container :title="j$Locale.tag" disabled hide-extend-icon>
    <j-cloud-list class="Tags" :options="tagOptions"></j-cloud-list>
  </j-container>
</template>

<script>
export default {
  name: "Tags",
  computed: {
    tagOptions() {
      return this.$tag.list.map((item) => {
        return {
          name: item.name,
          count: item.pages.length,
          path: item.path,
        };
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
.Tags
  font-size 0.8em

>>> a
  color #333333
  &:before
    display none
    bottom -2px
  &.router-link-exact-active:before
    display block
    width 100%
</style>