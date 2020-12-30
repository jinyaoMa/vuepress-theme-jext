<template>
  <j-container
    :title="`${j$Locale.timeline} - ${$frontmatter[`title_${j$Lang}`]}`"
    disabled
    hide-extend-icon
  >
    <div class="Timeline"></div>
  </j-container>
</template>

<script>
export default {
  name: "Timeline",
};
</script>

<style lang="stylus" scoped></style>