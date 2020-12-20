<template>
  <div
    class="j-layout flex-vertical"
    :style="{ height: options.layout.height }"
  >
    <div class="header">
      <div
        class="header-inner flex-horizontal"
        :style="{
          height: options.header.height,
          padding: `${options.header.gap} ${options.layout.gap}`,
        }"
      >
        <slot name="header">header</slot>
      </div>
    </div>
    <div
      class="frame flex-vertical flex-fill"
      :style="{
        borderWidth: options.layout.bar.size,
        borderColor: options.layout.bar.color,
      }"
    >
      <div class="flex-horizontal flex-fill">
        <div
          class="nav"
          :style="{
            width: options.nav.width,
            padding: `0 ${options.layout.gap}`,
          }"
        >
          <div
            class="nav-inner flex-vertical"
            :style="{
              width: `calc(${options.nav.width} - ${options.layout.gap} - ${options.layout.gap})`,
              height: `calc(100vh - 10px - ${options.header.height} - ${options.layout.gap})`,
              padding: options.nav.gap,
            }"
          >
            <slot name="nav">
              nav
              <div :style="{ paddingTop: '150vh' }"></div>
            </slot>
          </div>
        </div>
        <div
          class="main flex-vertical flex-fill"
          :style="{
            paddingTop: options.layout.gap,
          }"
        >
          <div
            class="main-inner flex-vertical flex-fill"
            :style="{
              padding: options.main.gap,
            }"
          >
            <slot name="main"
              >main
              <div :style="{ paddingTop: '150vh' }"></div
            ></slot>
          </div>
        </div>
        <div
          class="aside flex-vertical"
          :style="{
            width: options.aside.width,
            padding: `${options.layout.gap} ${options.layout.gap} 0`,
          }"
        >
          <div class="aside-inner flex-vertical flex-fill">
            <slot name="aside">aside</slot>
          </div>
        </div>
      </div>
      <div class="flex-horizontal">
        <div
          :style="{
            width: `calc(${options.nav.width} - ${options.layout.gap} / 4)`,
          }"
        ></div>
        <div
          class="footer flex-vertical flex-fill"
          :style="{
            minHeight: options.footer.minHeight,
            borderWidth: options.layout.bar.size,
            borderColor: options.layout.bar.color,
          }"
        >
          <div
            class="footer-inner flex-vertical flex-fill"
            :style="{
              padding: options.footer.gap,
              width: `calc(100% - ${options.layout.gap} / 2)`,
            }"
          >
            <slot name="footer">footer</slot>
          </div>
        </div>
        <div
          :style="{
            width: `calc(${options.aside.width} - ${options.layout.gap} / 4)`,
          }"
        ></div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "j-layout",
  props: {
    options: {
      type: Object,
      default() {
        return {
          layout: {
            height: "100vh",
            gap: "40px",
            bar: {
              color: "#666666",
              size: "5px",
            },
          },
          header: {
            height: "80px",
            gap: "10px",
          },
          nav: {
            width: "360px",
            gap: "10px",
          },
          aside: {
            width: "360px",
          },
          main: {
            gap: "10px",
          },
          footer: {
            minHeight: "1rem",
            gap: "10px",
          },
        };
      },
    },
  },
};
</script>

<style lang="stylus" scoped>
div
  box-sizing border-box

.j-layout
  background-color #ffffff

.flex-vertical
  display flex
  flex-flow column
  flex-shrink 1

.flex-horizontal
  display flex
  flex-flow row
  flex-shrink 1

.flex-fill
  flex-grow 1

.frame
  border-top-style solid
  background-color #f1f2f3
  overflow-x hidden
  overflow-y scroll

.nav-inner
  background-color #ffffff
  height 100%
  box-shadow 0 1px 1px #999999, 0 3px 3px #666666
  position fixed
  overflow-x hidden
  overflow-y scroll

.footer
  border-bottom-style solid
  padding-bottom 1px
  align-items center
  overflow hidden

.footer-inner
  border-top 3px dashed #999999
  background-color #ffffff
  box-shadow 0 1px 1px #999999, 0 3px 3px #666666

.main-inner
  background-color #ffffff
  box-shadow 0 0 1px #999999, 0 0 3px #666666
</style>