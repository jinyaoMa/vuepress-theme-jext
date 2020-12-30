<template>
  <j-container
    :title="j$Locale.hitokoto"
    icon="fas fa-circle-notch fa-fw"
    disabled
    hide-extend-icon
  >
    <div class="Hitokoto">
      <div class="before"></div>
      <div class="word" v-html="j$Hitokoto.word"></div>
      <div class="from" v-html="j$Hitokoto.from"></div>
      <div class="after"></div>
    </div>
  </j-container>
</template>

<script>
export default {
  name: "Hitokoto",
  mounted() {
    this.j$InitHitokoto();
  },
};
</script>

<style lang="stylus" scoped>
.Hitokoto
  line-height 1.5
  position relative
  border-bottom 4px solid #f1f2f3
  padding-bottom $hitokotoImgHeight * 0.66
  @media (max-width $smallestWidth)
    padding-bottom $hitokotoImgHeight * 0.33
  text-align center
  .before, .after
    position absolute
    bottom 0
    height $hitokotoImgHeight * 0.66
    width $hitokotoImgWidth * 0.66
    background-size cover
    @media (max-width $smallestWidth)
      height $hitokotoImgHeight * 0.33
      width $hitokotoImgWidth * 0.33
  .before
    left 0
    background-image url('../statics/hitokoto.left.png')
  .after
    right 0
    background-image url('../statics/hitokoto.right.png')

.word
  padding 2rem
  position relative
  font-size 1.25rem
  &:before
    content '『'
    position absolute
    left 0.5rem
    top 1rem
  &:after
    content '』'
    position absolute
    right 0.5rem
    bottom 1rem
  @media (max-width $smallestWidth)
    padding 1rem
    font-size 1rem
    &:before, &:after
      display none

.from
  position absolute
  width 100%
  padding 1rem 0
  z-index 1
  @media (max-width $smallestWidth)
    position relative
    padding 0
  &:before, &:after
    content ' — '
</style>