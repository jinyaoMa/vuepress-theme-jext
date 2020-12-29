<template>
  <div
    class="j-skin-panel flex flex-horizontal flex-wrap"
    :style="{
      paddingTop: padding,
      paddingLeft: padding,
      paddingRight: padding,
    }"
  >
    <div
      class="j-skin-panel-item"
      v-for="option in options"
      :key="option[activeKey]"
      :style="{
        width: `calc((100% - ${column + 1} * ${gap}) / ${column})`,
        marginLeft: gap,
        marginBottom: padding,
        background: option.skin,
        borderRadius: round && '4px',
      }"
      :title="option.text[langKey]"
      :class="{
        'is-active': option[activeKey] === activeOption,
      }"
      @click="handleClick(option)"
    >
      <i
        v-if="option[activeKey] === activeOption"
        class="fas fa-check-circle"
        :style="{
          color: option.color,
        }"
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "j-skin-panel",
  props: {
    padding: {
      type: String,
      default() {
        return "8px";
      },
    },
    gap: {
      type: String,
      default() {
        return "12px";
      },
    },
    column: {
      type: Number,
      default() {
        return 5;
      },
    },
    round: {
      type: Boolean,
      default() {
        return true;
      },
    },
    langKey: {
      type: String,
      default() {
        return "en";
      },
    },
    activeKey: {
      type: String,
      default() {
        return "id";
      },
    },
    activeOption: {
      type: String,
      default() {
        return "test";
      },
    },
    options: {
      type: Array,
      default() {
        return [
          {
            id: "test",
            text: {
              zh: "测试",
              en: "test",
            },
            skin: "#666666",
            color: "#ffffff",
          },
        ];
      },
    },
  },
  methods: {
    handleClick(option) {
      const key = option[this.activeKey];
      this.$emit("click", key);
    },
  },
};
</script>

<style lang="stylus">
.j-skin-panel
  position relative
  user-select none
  .j-skin-panel-item
    position relative
    overflow hidden
    cursor pointer
    transition filter 0.2s
    box-shadow 0 0 2px
    background-attachment fixed !important
    background-repeat no-repeat !important
    i
      position absolute
      right 3px
      bottom 4px
      font-size 0.8em
    &.is-active
      filter drop-shadow(0 0 2px)
    &:before
      content ''
      display block
      padding-top 100%
</style>