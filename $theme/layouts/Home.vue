<template>
  <div class="Home">
    <RecentPosts></RecentPosts>
  </div>
</template>

<script>
import RecentPosts from "../components/RecentPosts";

export default {
  name: "Home",
  components: {
    RecentPosts,
  },
};
</script>

<style lang="stylus" scoped>
.Home
  > .j-container
    margin-top 40px
</style>