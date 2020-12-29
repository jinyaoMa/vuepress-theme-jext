<template>
  <j-container :title="j$Locale.skin" disabled hide-extend-icon>
    <j-skin-panel
      :options="skinOptions"
      :lang-key="j$Lang"
      active-key="id"
      :active-option="activeOption"
      :column="4"
      @click="handleClick"
    ></j-skin-panel>
  </j-container>
</template>

<script>
export default {
  name: "Skin",
  data() {
    return {
      activeOption: "default",
    };
  },
  computed: {
    skinOptions() {
      return this.$themeConfig._j$Blog.skins;
    },
  },
  methods: {
    handleClick(option) {
      this.activeOption = option;
    },
  },
};
</script>

<style lang="stylus" scoped></style>