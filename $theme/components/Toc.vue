<template>
  <j-container :title="j$Locale.toc" disabled hide-extend-icon>
    <ul class="Toc" v-if="$page.headers">
      <router-link
        tag="li"
        v-for="(item, i) in $page.headers"
        :key="i"
        :to="`${$page.path}#${item.slug}`"
        v-html="item.title"
      ></router-link>
    </ul>
  </j-container>
</template>

<script>
export default {
  name: "Toc",
};
</script>

<style lang="stylus" scoped></style>