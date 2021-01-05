<template>
  <div
    class="Footer flex flex-horizontal flex-wrap"
    :style="{
      padding: gap,
    }"
  >
    <div
      class="info flex flex-vertical flex-fill"
      :style="{
        paddingRight: gap,
      }"
    >
      <div v-html="$themeConfig.copyright"></div>
      <div v-html="powered"></div>
      <div v-html="themed"></div>
      <div class="flex flex-horizontal flex-wrap">
        <div class="count" :title="j$Locale.footer.pv">
          <i class="fas fa-eye" />
          {{ j$Busuanzi.pv }}
        </div>
        <div class="count" :title="j$Locale.footer.uv">
          <i class="fas fa-user-tie" />
          {{ j$Busuanzi.uv }}
        </div>
        <div class="count" :title="j$Locale.footer.wd">
          <i class="fas fa-file-word" />
          {{ j$SiteTotalWords }}
        </div>
      </div>
      <div class="license flex" v-html="license"></div>
    </div>
    <div
      class="flex flex-horizontal flex-wrap"
      :style="{
        paddingRight: gap,
      }"
    >
      <div
        class="qrcode flex flex-vertical"
        v-for="(qrcode, i) in $themeConfig.qrcodes || []"
        :key="i"
        :style="{
          marginLeft: i !== 0 && gap,
        }"
      >
        <div v-html="qrcode.text[j$Lang]"></div>
        <img :src="qrcode.image" />
      </div>
    </div>
    <div v-if="$themeConfig.portals" class="portal flex flex-vertical">
      <div v-html="j$Locale.portal"></div>
      <div class="flex flex-vertical flex-wrap">
        <a
          target="_blank"
          v-for="(p, i) in $themeConfig.portals"
          :key="i"
          :href="p.link"
          :title="p.text[j$Lang]"
          v-html="p.text[j$Lang]"
        ></a>
      </div>
    </div>
  </div>
</template>

<script>
import BY_NC_SA from "../statics/by-nc-sa.svg";

export default {
  name: "Footer",
  props: {
    gap: {
      type: String,
      default() {
        return "40px";
      },
    },
  },
  computed: {
    powered() {
      let result = this.j$Locale.footer.powered.replace(
        "[:vuepress:]",
        `<a target="_blank" href="${VUEPRESS_OFFICIAL_SITE}" title="VuePress">VuePress</a>`
      );
      if (typeof __VUEPRESS__ !== "undefined") {
        result = this.j$Locale.footer.powered.replace(
          "[:vuepress:]",
          `<a target="_blank" href="${VUEPRESS_OFFICIAL_SITE}" title="VuePress v${
            __VUEPRESS__ ? __VUEPRESS__.version : "?"
          }">VuePress</a>`
        );
      }
      return result;
    },
    themed() {
      return this.j$Locale.footer.themed
        .replace(
          "[:theme:]",
          `<a target="_blank" href="${THEME_REPO_URL}" title="${THEME_NAME}">${THEME_SHORTNAME}</a>`
        )
        .replace(
          "[:author:]",
          `<a target="_blank" href="${THEME_AUTHOR_LINK}" title="${THEME_AUTHOR}">${THEME_AUTHOR}</a>`
        );
    },
    license() {
      return `<a target="_blank" href="${CC_LICENSE_LINK}" title="${this.j$Locale.footer.license}"><img src="${BY_NC_SA}"></a>`;
    },
  },
  watch: {
    $route() {
      this.j$InitBusuanzi();
    },
  },
  mounted() {
    this.j$InitBusuanzi();
  },
};
</script>

<style lang="stylus" scoped>
.Footer
  height 100%
  user-select none
  >>> a
    color #ff3300
    &:before
      background-color #00ccff

.info
  > div
    margin 8px 0
  > div:last-child
    margin 8px 0 0

.portal
  margin-top 8px
  > div:first-child
    margin 8px 0
  a
    width fit-content
    color #666666
    opacity 0.8
    transition opacity 0.2s
    &:hover
      opacity 1
    &:before
      display none

.count
  margin-right 1em

.license
  >>> a
    line-height 1
    margin-top 0.25em
    &:before
      display none
    > img
      max-height 2em

.qrcode
  margin-top 8px
  > div
    margin 8px 8px 0 0
  > img
    max-height 150px
    margin 8px 8px 0 0
</style>