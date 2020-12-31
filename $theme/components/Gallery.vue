<template>
  <div class="Gallery">
    <j-container
      v-for="(item, i) in $themeConfig._j$Blog.gallery"
      :key="i"
      :title="item.name"
      disabled
      hide-extend-icon
    >
      <a target="_blank" :href="item.url" :title="item.name">
        <img :src="item.url" />
      </a>
    </j-container>
  </div>
</template>

<script>
export default {
  name: "Gallery",
};
</script>

<style lang="stylus" scoped>
.Gallery
  > .j-container:not(:first-child)
    margin-top 40px

a
  display block
  margin 20px
  &:before
    display none

img
  max-width 100%
  display block
  margin 0 auto
  border-radius $borderRadius
</style>