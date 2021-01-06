<template>
  <j-container hide-title :title="j$Locale.menu" disabled hide-extend-icon>
    <div class="Sidebar flex flex-vertical">
      <router-link
        tag="div"
        v-for="(item, i) in j$Sidebar(currentPath)"
        :key="i"
        :to="item.isEmpty ? '' : item.to"
        :exact-active-class="item.isEmpty ? '' : 'link-exact-active'"
        v-html="item.text[j$Lang]"
        :style="{
          paddingLeft: `calc(1em * ${count(item.to)})`,
          cursor: !item.isEmpty && 'pointer',
          fontWeight: item.isRoot && 'bold',
        }"
        :class="{
          disable: item.isEmpty,
          link: !item.isEmpty,
        }"
      ></router-link>
    </div>
  </j-container>
</template>

<script>
export default {
  name: "Sidebar",
  computed: {
    currentPath() {
      const result = /^(\/[^\/]+\/)/.exec(this.$route.path);
      if (result && result.length === 2) {
        return result[1];
      }
      return "_";
    },
    count() {
      return function (path) {
        const result = path.match(/(\/[^\/]+)/g);
        if (result) {
          return result.length;
        }
        return "_";
      };
    },
  },
};
</script>

<style lang="stylus" scoped>
.Sidebar
  font-size 0.88em
  line-height 2
  user-select none
  padding 20px 0

.link
  transition color 0.2s, background-color 0.2s
  position relative
  &:hover
    color #3eaf7c
    background-color #3eaf7c11
  &:before
    content ''
    position absolute
    left 0
    top 0
    height 100%
    width 0
    transition width 0.2s
    background-color #3eaf7c

.link-exact-active
  color #3eaf7c
  &:before
    width 0.5em

.disable
  opacity 0.8
</style>