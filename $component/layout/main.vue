<template>
  <div class="j-layout">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "j-layout",
};
</script>

<style lang="stylus" scoped>
.j-layout
  box-sizing border-box
</style>