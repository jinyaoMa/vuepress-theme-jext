<template>
  <div class="Drawer flex flex-vertical">
    <Sidebar v-if="$frontmatter.isNotBlog"></Sidebar>
    <Brand></Brand>
    <BlogMenu v-if="!$frontmatter.isNotBlog"></BlogMenu>
    <Skin></Skin>
    <Settings></Settings>
  </div>
</template>

<script>
import Brand from "../components/Brand";
import BlogMenu from "../components/BlogMenu";
import Settings from "../components/Settings";
import Skin from "../components/Skin";
import Sidebar from "../components/Sidebar";

export default {
  name: "Drawer",
  components: {
    Brand,
    BlogMenu,
    Settings,
    Skin,
    Sidebar,
  },
};
</script>

<style lang="stylus" scoped>
.Drawer
  > .j-container:not(:first-child)
    margin-top 40px
</style>