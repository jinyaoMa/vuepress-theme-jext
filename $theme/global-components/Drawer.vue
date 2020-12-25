<template>
  <div class="Drawer flex flex-vertical">
    <Brand></Brand>
    <BlogMenu></BlogMenu>
    <Settings></Settings>
  </div>
</template>

<script>
import Brand from "../components/Brand";
import BlogMenu from "../components/BlogMenu";
import Settings from "../components/Settings";

export default {
  name: "Drawer",
  components: {
    Brand,
    BlogMenu,
    Settings,
  },
};
</script>

<style lang="stylus" scoped>
.Drawer
  > .j-container:not(:first-child)
    margin-top 40px
</style>