<template>
  <j-container title="Clustrmaps" disabled hide-extend-icon>
    <div class="Clustrmaps">
      <script
        v-if="isIt"
        :id="$themeConfig.clustrmaps.id"
        ref="script"
      ></script>
    </div>
  </j-container>
</template>

<script>
export default {
  name: "Clustrmaps",
  computed: {
    isIt() {
      return (
        this.$themeConfig.clustrmaps &&
        this.$themeConfig.clustrmaps.id &&
        this.$themeConfig.clustrmaps.src
      );
    },
  },
  mounted() {
    if (this.isIt) {
      this.$refs.script.src = this.$themeConfig.clustrmaps.src;
    }
  },
};
</script>

<style lang="stylus" scoped>
.Clustrmaps
  padding-top 10px
  >>> a:before
    display none
</style>