<template>
  <div class="Aside flex flex-vertical">
    <Categories></Categories>
    <Tags></Tags>
  </div>
</template>

<script>
import Categories from "../components/Categories";
import Tags from "../components/Tags";

export default {
  name: "Aside",
  components: {
    Categories,
    Tags,
  },
};
</script>

<style lang="stylus" scoped>
.Aside
  > .j-container:not(:first-child)
    margin-top 40px
</style>