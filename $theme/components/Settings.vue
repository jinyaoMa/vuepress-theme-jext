<template>
  <j-container :title="j$Locale.settings" disabled hide-extend-icon>
    <j-panel
      :options="settingOptions"
      :lang-key="j$Lang"
      active-key="id"
      :switch-colors="['#cc66ff', '#ffffff']"
      :active-option="_activeOption"
      @click="handleClick"
    ></j-panel>
  </j-container>
</template>

<script>
export default {
  name: "Settings",
  data() {
    return {
      activeOption: [],
    };
  },
  computed: {
    settingOptions() {
      return this.$themeConfig._j$Blog.settings;
    },
    _activeOption() {
      const result = [];
      if (this.j$Lang.startsWith("en")) {
        result.push("language");
      }
      if (this.j$IsNight) {
        result.push("nightshift");
      }
      return result;
    },
  },
  methods: {
    handleClick({ key, index, flag }) {
      /*
      if (flag) {
        this.activeOption.push(key);
      } else {
        this.activeOption = this.activeOption
          .slice(0, index)
          .concat(this.activeOption.slice(index + 1, this.activeOption.length));
      }
      */
      if (key === "language") {
        this.j$SwapLang();
      } else if (key === "nightshift") {
        this.j$Nightshift();
      }
    },
  },
};
</script>

<style lang="stylus" scoped></style>