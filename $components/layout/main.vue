<template>
  <div
    class="j-layout flex flex-vertical background-image-fix"
    :style="{
      height: column !== 1 && height,
      backgroundColor,
      backgroundImage,
      overflowY: column === 1 && 'auto',
    }"
  >
    <slot name="background"></slot>
    <div
      class="j-layout-header background-image-fix"
      :style="{
        height: column !== 1 && (header.height || '80px'),
        minHeight: column === 1 && (header.height || '80px'),
        backgroundColor: header.backgroundColor || '#ffffff',
        backgroundImage: header.backgroundImage || '',
        paddingLeft: gap,
        paddingRight: gap,
      }"
    >
      <slot name="header"></slot>
    </div>
    <div
      class="j-layout-inner"
      :style="{
        marginTop: header.height || '80px',
        height: `calc(100% - ${header.height || '80px'})`,
      }"
    >
      <div
        class="j-layout-frame flex flex-vertical"
        ref="frame"
        :style="{
          height: column !== 1 && '100%',
        }"
      >
        <div
          class="flex flex-fill"
          :class="{
            'flex-horizontal': column !== 1,
            'flex-vertical': column === 1,
          }"
        >
          <div
            class="j-layout-drawer"
            :style="{
              width:
                column !== 1 && `calc(${drawer.width || '300px'} + ${gap} * 2)`,
              paddingLeft: gap,
              paddingRight: gap,
            }"
          >
            <div
              class="j-layout-drawer-inner"
              :style="{
                width: column !== 1 && (drawer.width || '300px'),
                paddingTop: gap,
                paddingBottom: gap,
              }"
            >
              <slot name="drawer"></slot>
            </div>
          </div>
          <div
            class="flex flex-fill"
            :class="{
              'flex-horizontal': column === 3,
              'flex-vertical': column !== 3,
            }"
            :style="{
              width:
                column !== 1 &&
                `calc(100% - ${drawer.width || '300px'} - ${gap} * 2)`,
            }"
          >
            <div
              class="j-layout-main flex-fill"
              :style="{
                paddingRight: column !== 3 && gap,
                paddingLeft: column === 1 && gap,
                width:
                  column === 3 &&
                  `calc(100% - ${aside.width || '300px'} - ${gap} * 2)`,
              }"
            >
              <div
                class="j-layout-main-inner"
                :style="{
                  paddingTop: column !== 1 && gap,
                  paddingBottom: column === 3 && gap,
                }"
              >
                <slot name="main"></slot>
              </div>
            </div>
            <div
              class="j-layout-aside"
              :style="{
                width:
                  column === 3 &&
                  `calc(${aside.width || '300px'} + ${gap} * 2)`,
                paddingLeft: column !== 2 && gap,
                paddingRight: gap,
              }"
            >
              <div
                class="j-layout-aside-inner"
                :style="{
                  width: column === 3 && (aside.width || '300px'),
                  paddingTop: gap,
                  paddingBottom: gap,
                }"
              >
                <slot name="aside"></slot>
              </div>
            </div>
          </div>
        </div>
        <div
          class="j-layout-footer"
          :style="{
            paddingLeft: gap,
            paddingRight: gap,
          }"
        >
          <div
            class="background-image-fix"
            :style="{
              backgroundColor: footer.backgroundColor || '#ffffff',
              backgroundImage: footer.backgroundImage || '',
              borderRadius: footer.round && '4px 4px 0 0',
              padding: footer.round && '0 4px',
              paddingBottom: scrollControl.size || '14px',
            }"
          >
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
      <div
        class="j-layout-goingto flex flex-horizontal"
        :class="{ 'j-layout-noScroll': column === 1 || noScroll }"
        :style="{
          fontSize: scrollControl.size || '14px',
          left: `calc(50% - ${scrollControl.size || '14px'} * 2)`,
        }"
      >
        <div
          class="j-layout-goingto-button"
          :style="{
            width: `calc(${scrollControl.size || '14px'} * 2)`,
            color: scrollControl.color || '#000000',
            backgroundColor: scrollControl.backgroundColor || '#66666666',
          }"
          @click="goingtoBottom"
        >
          <i :class="`${scrollControl.iconDown || 'fas fa-angle-down'}`"></i>
        </div>
        <div
          class="j-layout-goingto-button"
          :style="{
            width: `calc(${scrollControl.size || '14px'} * 2)`,
            color: scrollControl.color || '#000000',
            backgroundColor: scrollControl.backgroundColor || '#66666666',
          }"
          @click="goingtoTop"
        >
          <i :class="`${scrollControl.iconUp || 'fas fa-angle-up'}`"></i>
        </div>
      </div>
      <div
        class="j-layout-scrollbar"
        ref="scrollbar"
        :class="{ 'j-layout-noScroll': column === 1 || noScroll }"
        :style="{
          bottom: `calc(${scrollbar.size || '6px'} / 3 * 2)`,
          top: `calc(${scrollbar.size || '6px'} / 3 * 2)`,
          right: `calc(${scrollbar.size || '6px'} / 3 * 2)`,
        }"
      >
        <div
          class="j-layout-scrollbar-thumb"
          :style="{
            width: scrollbar.size || '6px',
            backgroundColor: scrollbar.color || '#66666666',
            borderRadius: `calc(${scrollbar.size || '6px'} / 2)`,
            height: thumbHeight + 'px',
            transform: `translateY(${thumbTransfrom}px)`,
          }"
          ref="thumb"
        ></div>
      </div>
    </div>
    <slot name="foreground"></slot>
  </div>
</template>

<script>
export default {
  name: "j-layout",
  props: {
    column: {
      type: Number,
      default() {
        return 3; // 1,2,3
      },
    },
    height: {
      type: String,
      default() {
        return "100vh";
      },
    },
    gap: {
      type: String,
      default() {
        return "40px";
      },
    },
    backgroundColor: {
      type: String,
      default() {
        return "#ffffff";
      },
    },
    backgroundImage: {
      type: String,
      default() {
        return "";
      },
    },
    scrollControl: {
      type: Object,
      default() {
        return {
          size: "14px",
          color: "#000000",
          backgroundColor: "#66666666",
          iconDown: "fas fa-angle-down",
          iconUp: "fas fa-angle-up",
        };
      },
    },
    scrollbar: {
      type: Object,
      default() {
        return {
          size: "6px",
          color: "#66666666",
        };
      },
    },
    header: {
      type: Object,
      default() {
        return {
          height: "80px",
          backgroundColor: "#ffffff",
          backgroundImage: "",
        };
      },
    },
    drawer: {
      type: Object,
      default() {
        return {
          width: "280px",
        };
      },
    },
    aside: {
      type: Object,
      default() {
        return {
          width: "280px",
        };
      },
    },
    footer: {
      type: Object,
      default() {
        return {
          backgroundColor: "#ffffff",
          backgroundImage: "",
          round: true,
        };
      },
    },
  },
  computed: {
    currentPath() {
      return this.$route.path;
    },
  },
  watch: {
    currentPath: {
      handler() {
        if (typeof window === "undefined") return;
        const waiter = window.setInterval(() => {
          if (this.$refs.scrollbar) {
            this.initThumb();
            window.clearInterval(waiter);
          }
        }, 600);
      },
      immediate: true,
    },
  },
  methods: {
    destroyScroll() {
      if (typeof window != "undefined") {
        window.removeEventListener("resize", this.onResize);
      }
      if (typeof this.$refs.frame != "undefined") {
        this.$refs.frame.removeEventListener("scroll", this.onScroll);
      }
      if (typeof this.$refs.thumb != "undefined") {
        this.$refs.thumb.removeEventListener(
          "mousedown",
          this.onThumbMousedown
        );
      }
      if (typeof document != "undefined") {
        document.removeEventListener("mousemove", this.onThumbMousemove);
        document.removeEventListener("mouseup", this.onThumbMouseup);
      }
    },
    initScroll() {
      this.initThumb();
      this.onResize = window.addEventListener("resize", this.initThumb);
      this.onScroll = this.$refs.frame.addEventListener(
        "scroll",
        this.setThumbTransform
      );
      this.onThumbMousedown = this.$refs.thumb.addEventListener(
        "mousedown",
        (e) => {
          this.$refs.frame.removeEventListener("scroll", this.onScroll);
          this.thumbMouseStart = e.y;
          this.$refs.thumb.classList.add("j-layout-scrollbar-thumb--show");
        }
      );
      this.onThumbMousemove = document.addEventListener("mousemove", (e) => {
        if (this.thumbMouseStart > 0) {
          const offset = e.y - this.thumbMouseStart;
          this.thumbMouseStart = e.y;
          this.thumbTransfrom += offset;
          this.$refs.frame.scrollTop =
            (this.thumbTransfrom / this.limitThumbTranslate) *
            this.thumbDistance;
          if (this.thumbTransfrom < 0) {
            this.thumbTransfrom = 0;
          } else if (this.thumbTransfrom > this.limitThumbTranslate) {
            this.thumbTransfrom = this.limitThumbTranslate;
          }
        }
      });
      this.onThumbMouseup = document.addEventListener("mouseup", (e) => {
        this.thumbMouseStart = 0;
        this.$refs.thumb &&
          this.$refs.thumb.classList.remove("j-layout-scrollbar-thumb--show");
        if (this.$refs.frame) {
          this.onScroll = this.$refs.frame.addEventListener(
            "scroll",
            this.setThumbTransform
          );
        }
      });
    },
    initThumb() {
      if (!this.$refs.frame) return;
      this.currentScrollHeight = this.$refs.frame.scrollHeight;
      this.thumbDistance =
        this.currentScrollHeight - this.$refs.frame.offsetHeight;
      this.noScroll = this.thumbDistance <= 0;
      this.thumbHeight =
        (this.$refs.frame.offsetHeight / this.currentScrollHeight) *
        this.$refs.scrollbar.offsetHeight;
      this.limitThumbTranslate =
        this.$refs.scrollbar.offsetHeight - this.thumbHeight;
      this.thumbTransfrom =
        (this.$refs.frame.scrollTop / this.thumbDistance) *
        this.limitThumbTranslate;
    },
    setThumbTransform() {
      if (this.$refs.frame.scrollHeight !== this.currentScrollHeight) {
        this.initThumb();
      }
      this.thumbTransfrom =
        (this.$refs.frame.scrollTop / this.thumbDistance) *
        this.limitThumbTranslate;
    },
    goingtoTop() {
      this.$refs.frame.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    goingtoBottom() {
      this.$refs.frame.scrollTo({
        top: this.$refs.frame.scrollHeight,
        behavior: "smooth",
      });
    },
  },
  data() {
    return {
      onResize: null,
      onScroll: null,
      noScroll: true,
      thumbDistance: 0,
      thumbHeight: 0,
      limitThumbTranslate: 0,
      thumbTransfrom: 0,
      thumbMouseStart: 0,
      onThumbMousedown: null,
      onThumbMousemove: null,
      onThumbMouseup: null,
      currentScrollHeight: 0,
    };
  },
  mounted() {
    this.initScroll();
  },
  destroyed() {
    this.destroyScroll();
  },
};
</script>

<style lang="stylus">
.j-layout
  position relative
  overflow hidden
  transition color 0.6s, background 0.6s
  .j-layout-inner
    width 100%
    position relative
    &:hover
      .j-layout-scrollbar-thumb
        opacity 0.6
      .j-layout-goingto-button
        opacity 0.6
  .j-layout-goingto
    position absolute
    bottom 0
    width auto
    pointer-events none
    &.j-layout-noScroll
      opacity 0
      .j-layout-goingto-button
        pointer-events none
  .j-layout-goingto-button
    text-align center
    cursor pointer
    pointer-events auto
    transition opacity 0.2s
    opacity 0
    &:hover
      opacity 1 !important
    &:first-child
      border-radius 4px 0 0 0
    &:last-child
      border-radius 0 4px 0 0
    i
      display block
      margin-left 0.1em
  .j-layout-scrollbar
    position absolute
    z-index 1
    pointer-events none
    user-select none
    transition opacity 0.2s
    &.j-layout-noScroll
      opacity 0 !important
  .j-layout-scrollbar-thumb
    position relative
    pointer-events auto
    user-select none
    cursor pointer
    transition opacity 0.2s, height 0.2s
    opacity 0
    &:hover
      opacity 1 !important
  .j-layout-scrollbar-thumb--show
    opacity 1
  .j-layout-header
    position absolute
    width 100%
    z-index 1
    box-shadow 0 -2px 4px
    box-sizing border-box
  .j-layout-frame
    height 100%
    overflow-x hidden
    overflow-y scroll
    // Hide scrollbar for IE, Edge and Firefox
    -ms-overflow-style none // IE and Edge
    scrollbar-width none // Firefox
    // Hide scrollbar for Chrome, Safari and Opera
    &::-webkit-scrollbar
      display none
  .j-layout-drawer, .j-layout-drawer-inner, .j-layout-main, .j-layout-aside, .j-layout-aside-inner, .j-layout-footer
    box-sizing border-box
  .j-layout-drawer-inner, .j-layout-aside-inner, .j-layout-main-inner
    position sticky
    top 0
    overflow hidden
</style>