<template>
  <div class="Layout">
    <Gallery
      v-if="$frontmatter.gallery && $frontmatter.gallery.enable"
    ></Gallery>
    <Page v-else></Page>
  </div>
</template>

<script>
import Gallery from "../components/Gallery";
import Page from "../components/Page";

export default {
  name: "Layout",
  components: {
    Gallery,
    Page,
  },
};
</script>

<style lang="stylus" scoped>
.Layout
  > .j-container:not(:first-child)
    margin-top 40px
</style>