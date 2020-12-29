<template>
  <j-container hide-title :title="j$Locale.overview" hide-extend-icon>
    <div class="Brand flex flex-vertical">
      <div
        class="avatar"
        :style="{
          backgroundImage: `url('${$themeConfig.avatar || ''}')`,
        }"
      ></div>
      <div class="author" v-html="$themeConfig.author[j$Lang]"></div>
      <div class="signature" v-html="$themeConfig.signature[j$Lang]"></div>
      <div class="count flex flex-horizontal">
        <div
          class="flex flex-vertical"
          @click="handleClick($themeConfig._j$Blog.links.archive)"
        >
          <div class="count-number" v-html="j$SiteTotalPosts"></div>
          <div
            class="count-unit"
            v-html="
              j$SiteTotalPosts === 1
                ? j$Locale.unit.post[1]
                : j$Locale.unit.post[0]
            "
          ></div>
        </div>
        <div
          class="flex flex-vertical"
          @click="handleClick($themeConfig._j$Blog.links.category)"
        >
          <div class="count-number" v-html="j$SiteTotalCategories"></div>
          <div
            class="count-unit"
            v-html="
              j$SiteTotalCategories === 1
                ? j$Locale.unit.category[1]
                : j$Locale.unit.category[0]
            "
          ></div>
        </div>
        <div
          class="flex flex-vertical"
          @click="handleClick($themeConfig._j$Blog.links.tag)"
        >
          <div class="count-number" v-html="j$SiteTotalTags"></div>
          <div
            class="count-unit"
            v-html="
              j$SiteTotalTags === 1
                ? j$Locale.unit.tag[1]
                : j$Locale.unit.tag[0]
            "
          ></div>
        </div>
      </div>
      <div
        v-if="
          $themeConfig.brandButtons instanceof Array &&
          $themeConfig.brandButtons.length > 0
        "
        class="links flex flex-horizontal"
      >
        <a
          class="links-button"
          v-for="(button, i) in $themeConfig.brandButtons"
          :key="i"
          :href="button.link"
          :title="button.link"
          target="_blank"
        >
          <i :class="button.icon"></i>
        </a>
      </div>
    </div>
  </j-container>
</template>

<script>
export default {
  name: "Brand",
  methods: {
    handleClick(to) {
      this.$router.push(to);
    },
  },
};
</script>

<style lang="stylus" scoped>
.Brand
  padding 20px
  align-items center
  text-align center

.avatar
  width 120px
  height 120px
  margin 0.5em auto 0
  border-radius 50%
  background-color #f1f2f3
  background-repeat no-repeat
  background-size cover
  box-shadow 0 0 2px

.author
  font-weight bold
  font-size 1.25em
  line-height 1
  margin-top 1em
  margin-bottom 0.5em

.signature
  opacity 0.8

.count
  margin-top 20px
  user-select none
  > div
    cursor pointer
    &:nth-child(2)
      margin 0 20px
    &:hover
      .count-number
        color #00ccff
  .count-number
    font-weight bold
    transition color 0.2s
  .count-unit
    opacity 0.8

.links
  margin-top 20px
  font-size 1.1em
  .links-button
    color inherit
    width 2em
    line-height 2em
    transition color 0.2s, background-color 0.2s
    &:before
      display none
    &:hover
      color #00ccff
      background-color #f1f2f3
</style>