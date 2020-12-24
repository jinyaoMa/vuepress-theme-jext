<template>
  <div
    class="j-container"
    :style="{
      borderRadius: round && '4px',
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "j-container",
  props: {
    round: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
};
</script>

<style lang="stylus">
.j-container
  position relative
</style>