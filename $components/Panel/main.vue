<template>
  <div
    class="j-panel flex flex-vertical"
    :style="{
      paddingTop: padding,
      paddingBottom: padding,
      fontSize: `calc(${size} / 3)`,
    }"
  >
    <div
      class="j-panel-item flex flex-horizontal flex-align-center"
      v-for="option in options"
      :key="option[activeKey]"
      :style="{
        lineHeight: size,
      }"
      :class="{
        'is-active': activeOption.indexOf(option[activeKey]) !== -1,
      }"
      @click="handleClick(option)"
    >
      <i v-if="option.icon" :class="option.icon"></i>
      <span class="flex-fill">{{ option.text[langKey] }}</span>
      <div
        class="j-panel-item-hover"
        :style="{
          backgroundColor: hoverBackgroundColor,
        }"
      ></div>
      <div class="j-panel-item-switch">
        <div
          class="j-panel-item-switch-off"
          :style="{
            backgroundColor: switchColors && switchColors[0],
          }"
        ></div>
        <div
          class="j-panel-item-switch-on"
          :style="{
            backgroundColor: switchColors && switchColors[1],
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "j-panel",
  props: {
    padding: {
      type: String,
      default() {
        return "4px";
      },
    },
    size: {
      type: String,
      default() {
        return "3em";
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
      type: Array,
      default() {
        return ["test"];
      },
    },
    options: {
      type: Array,
      default() {
        return [
          {
            id: "test",
            text: {
              en: "Test",
            },
            icon: "",
          },
        ];
      },
    },
    hoverBackgroundColor: {
      type: String,
      default() {
        return "#f1f2f3";
      },
    },
    switchColors: {
      type: Array,
      default() {
        return ["#00ccff", "#ffffff"];
      },
    },
  },
  methods: {
    handleClick(option) {
      const key = option[this.activeKey];
      const index = this.activeOption.indexOf(key);
      this.$emit("click", {
        key,
        index,
        flag: index < 0,
      });
    },
  },
};
</script>

<style lang="stylus">
.j-panel
  position relative
  user-select none
  .j-panel-item
    position relative
    cursor pointer
    padding 0 1em
    transition background-color 0.2s
    white-space nowrap
    > i, > span
      position relative
      z-index 1
    > i
      margin-right 0.5em
    &:hover
      .j-panel-item-hover
        opacity 1
    &.is-active
      .j-panel-item-switch
        filter contrast(1)
      .j-panel-item-switch-off
        transform scale(3.5)
      .j-panel-item-switch-on
        transform scale(0.5)
        z-index 2
  .j-panel-item-hover
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    opacity 0
    transition opacity 0.2s
  .j-panel-item-switch
    position relative
    width 2.4em
    height 1.2em
    overflow hidden
    border-radius 0.6em
    transition filter 0.2s
    filter contrast(0.8)
  .j-panel-item-switch-off
    position absolute
    top 0
    left 0
    height 1.2em
    width 1.2em
    border-radius 0.6em
    transition transform 0.2s, background-color 0.6s
    transform scale(0.5)
    z-index 2
  .j-panel-item-switch-on
    position absolute
    top 0
    right 0
    height 1.2em
    width 1.2em
    border-radius 0.6em
    transition transform 0.2s, background-color 0.6s
    transform scale(3.5)
    z-index 1
</style>