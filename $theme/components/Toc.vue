<template>
  <j-container :title="j$Locale.toc" disabled hide-extend-icon>
    <ul class="Toc" v-if="$page.headers">
      <router-link
        tag="li"
        v-for="(item, i) in $page.headers"
        :key="i"
        :to="`${$page.path}#${item.slug}`"
        v-html="item.title"
      ></router-link>
    </ul>
  </j-container>
</template>

<script>
export default {
  name: "Toc",
};
</script>

<style lang="stylus" scoped>
.Toc
  margin 0
  padding 0
  list-style-type none
  li
    cursor pointer
    padding-left 20px
    padding-right 4px
    white-space nowrap
    text-overflow ellipsis
    overflow hidden
    line-height 2
    &:hover
      transition color 0.2s
      color #cc66ff
    &.router-link-exact-active
      color #cc66ff
      border-left 10px solid
</style>