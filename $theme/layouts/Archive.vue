<template>
  <div class="Archive">
    <Timeline></Timeline>
  </div>
</template>

<script>
import Timeline from "../components/Timeline";

export default {
  name: "Archive",
  components: {
    Timeline,
  },
};
</script>

<style lang="stylus" scoped>
.Archive
  > .j-container:not(:first-child)
    margin-top 40px
</style>