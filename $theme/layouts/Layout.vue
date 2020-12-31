<template>
  <div class="Layout">
    <Gallery v-if="$frontmatter.gallery.enable"></Gallery>
  </div>
</template>

<script>
import Gallery from "../components/Gallery";

export default {
  name: "Layout",
  components: {
    Gallery,
  },
};
</script>

<style lang="stylus" scoped></style>