<template>
  <div class="Drawer flex flex-vertical">
    <Brand></Brand>
    <BlogMenu></BlogMenu>
    <Skin></Skin>
    <Settings></Settings>
  </div>
</template>

<script>
import Brand from "../components/Brand";
import BlogMenu from "../components/BlogMenu";
import Settings from "../components/Settings";
import Skin from "../components/Skin";

export default {
  name: "Drawer",
  components: {
    Brand,
    BlogMenu,
    Settings,
    Skin,
  },
};
</script>

<style lang="stylus" scoped>
.Drawer
  > .j-container:not(:first-child)
    margin-top 40px
</style>