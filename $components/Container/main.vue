<template>
  <div
    class="j-container"
    :style="{
      borderRadius: round && '4px',
      padding: round && '4px 0',
      backgroundColor,
    }"
  >
    <div
      v-if="!hideTitle"
      class="j-container-title flex flex-horizontal"
      :style="{
        borderRadius: round && '4px',
        padding: gap,
        backgroundColor,
      }"
      @click="handleClick"
    >
      <i v-if="icon" :class="icon"></i>
      <span
        v-html="title"
        class="flex-fill"
        :style="{
          marginLeft: gap,
          marginRight: gap,
        }"
      ></span>
      <i
        v-if="!hideExtendIcons && extendIcons && extendIcons[0] && isExtend"
        :class="extendIcons[0]"
      ></i>
      <i
        v-if="!hideExtendIcons && extendIcons && extendIcons[1] && !isExtend"
        :class="extendIcons[1]"
      ></i>
    </div>
    <div ref="box" class="j-container-box">
      <slot>
        <div
          :style="{
            height: '300px',
            backgroundColor: '#f1f2f3',
          }"
        ></div>
      </slot>
    </div>
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
    gap: {
      type: String,
      default() {
        return "10px";
      },
    },
    icon: {
      type: String,
      default() {
        return "fas fa-circle-notch";
      },
    },
    title: {
      type: String,
      default() {
        return "Title";
      },
    },
    hideTitle: {
      type: Boolean,
      default() {
        return false;
      },
    },
    backgroundColor: {
      type: String,
      default() {
        return "#ffffff";
      },
    },
    extend: {
      type: Boolean,
      default() {
        return true;
      },
    },
    extendIcons: {
      type: Array,
      default() {
        return ["fas fa-minus", "fas fa-plus"];
      },
    },
    hideExtendIcons: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  methods: {
    handleClick() {
      this.isExtend = !this.isExtend;
      this.setExtend(this.isExtend);
    },
    setExtend(flag) {
      if (flag) {
        this.$refs.box.style.height = this.$refs.box.scrollHeight + "px";
      } else {
        this.$refs.box.style.height = "0";
      }
    },
  },
  watch: {
    extend(flag) {
      this.setExtend(flag);
    },
  },
  data() {
    return {
      isExtend: this.extend,
    };
  },
  mounted() {
    this.setExtend(this.isExtend);
  },
};
</script>

<style lang="stylus">
.j-container
  position relative
  overflow hidden
  .j-container-title
    font-size 0.8em
    align-items baseline
  .j-container-box
    overflow hidden
    transition height 0.2s
</style>