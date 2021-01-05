<template>
  <div class="Aside flex flex-vertical">
    <Toc v-if="$page.id === 'post'"></Toc>
    <Categories></Categories>
    <Tags></Tags>
    <Clustrmaps></Clustrmaps>
  </div>
</template>

<script>
import Categories from "../components/Categories";
import Tags from "../components/Tags";
import Clustrmaps from "../components/Clustrmaps";
import Toc from "../components/Toc";

export default {
  name: "Aside",
  components: {
    Categories,
    Tags,
    Clustrmaps,
    Toc,
  },
};
</script>

<style lang="stylus" scoped>
.Aside
  > .j-container:not(:first-child)
    margin-top 40px
</style>