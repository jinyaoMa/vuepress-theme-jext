<template>
  <div class="NotFound">
    <j-container title="404" disabled hide-extend-icon>
      <div class="inner" v-html="content"></div>
    </j-container>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  computed: {
    content() {
      if (typeof window === "undefined") return "";
      return this.j$Locale.notFound.replace(
        "[:path:]",
        window.location.pathname
      );
    },
  },
};
</script>

<style lang="stylus" scoped>
.NotFound
  > .j-container
    margin-top 40px

.inner
  padding 40px
  >>> span
    display inline-block
    &:first-child
      font-weight bold
</style>