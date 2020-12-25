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
        class="flex-fill"
        :style="{
          marginLeft: gap,
          marginRight: gap,
        }"
      >
        {{ title }}
      </span>
      <i
        v-if="!hideExtendIcon && extendIcons && extendIcons[0] && isExtend"
        :class="extendIcons[0]"
      ></i>
      <i
        v-if="!hideExtendIcon && extendIcons && extendIcons[1] && !isExtend"
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
    hideExtendIcon: {
      type: Boolean,
      default() {
        return false;
      },
    },
    disabled: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  methods: {
    handleClick() {
      if (this.disabled) return;
      this.isExtend = !this.isExtend;
      this.setExtend(this.isExtend);
    },
    setExtend(flag) {
      if (this.$isServer) return;
      if (flag) {
        this.$refs.box.style.height = this.$refs.box.scrollHeight + "px";
        setTimeout(() => {
          this.$refs.box.style.height = "auto";
        }, 16);
      } else {
        this.$refs.box.style.height = this.$refs.box.scrollHeight + "px";
        setTimeout(() => {
          this.$refs.box.style.height = "0";
        }, 16);
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
    user-select none
  .j-container-box
    overflow hidden
    transition height 0.2s
</style>