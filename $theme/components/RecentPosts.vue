<template>
  <j-container
    :title="j$Locale.recentPosts"
    icon="fas fa-clock fa-fw"
    disabled
    hide-extend-icon
  >
    <div class="RecentPosts">
      <j-post-card></j-post-card>
    </div>
  </j-container>
</template>

<script>
export default {
  name: "RecentPosts",
};
</script>

<style lang="stylus" scoped></style>