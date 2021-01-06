<template>
  <j-container hide-title :title="j$Locale.page" disabled hide-extend-icon>
    <div class="Page">
      <div class="meta">
        <div class="meta-title">
          {{
            $frontmatter[`title_${j$Lang}`] || $frontmatter.title || $page.title
          }}
        </div>
        <div class="meta-info flex flex-horizontal flex-wrap flex-">
          <div class="info-updated">
            <i class="fas fa-calendar-check fa-fw" />
            {{ $frontmatter.lastUpdated.substr(0, 10) }}
          </div>
          <div class="info-wordcount">
            <i class="fas fa-file-word fa-fw" />
            {{ addK($frontmatter.wordcount) }}
          </div>
          <div class="info-wordcount">
            <i class="fas fa-stopwatch fa-fw" />
            {{ min2Read($frontmatter.min2read) }}
          </div>
        </div>
      </div>
      <Content class="markdown-body" />
      <div class="tail">
        <div class="ending">
          <span v-html="j$Locale.article.ending.left"></span>
          <i class="far fa-dot-circle fa-fw"></i>
          <span v-html="j$Locale.article.ending.right"></span>
        </div>
        <div class="share">
          <SocialShare />
        </div>
        <div class="license">
          <div class="frame">
            <div>
              <span v-html="j$Locale.article.license.author"></span>
              <a
                target="_blank"
                :href="$withBase('/')"
                v-html="$themeConfig.license"
              ></a>
            </div>
            <div>
              <span v-html="j$Locale.article.license.link"></span>
              <a target="_blank" :href="permalink" v-html="permalink"></a>
            </div>
            <div>
              <span v-html="j$Locale.article.license.copyright"></span>
              <span v-html="license"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </j-container>
</template>

<script>
export default {
  name: "Page",
  computed: {
    min2Read() {
      return function (min) {
        return this.j$Locale.article.minuteUnit.replace("[:time:]", min);
      };
    },
    permalink() {
      if (typeof window === "undefined") return this.$withBase("/");
      return window.location.href;
    },
    license() {
      return this.j$Locale.article.license.notice.text.replace(
        "[:license:]",
        `<a target="_blank" href="${CC_LICENSE_LINK}" title="${this.j$Locale.footer.license}">${this.j$Locale.article.license.notice.name}</a>`
      );
    },
  },
  methods: {
    addK(num) {
      if (num >= 1000) {
        num = Math.round(num / 100) / 10 + "k";
      }
      return num;
    },
  },
};
</script>

<style lang="stylus" scoped>
.Page
  padding 60px

.markdown-body
  >>> a:before
    display none

.meta
  text-align center
  margin-bottom 60px

.meta-title
  font-size 3em
  line-height 1.2
  word-break break-word

.meta-info
  padding 1em 0
  font-size 0.88em
  justify-content center
  > div
    display inline-block
    opacity 0.6
    transition opacity 0.2s
    &:hover
      opacity 1
    &:not(:last-child)
      margin-right 1em

.tail
  user-select none
  margin-top 60px

.ending
  color #e1e2e3
  border-top 0.5em dashed
  display grid
  grid-template-columns auto 2em auto
  font-size 1.25em
  justify-content center
  justify-items center
  line-height 2.5
  padding 0 60px
  margin 0 -60px
  i
    line-height 2.5

.share
  text-align center
  margin 1em 0

.license
  width 100%
  background #ff330011
  overflow-y hidden
  overflow-x auto
  margin 1em 0
  font-size 0.95em

>>> .frame
  line-height 2
  padding 0.5em 0.25em 0.5em 0.75em
  white-space nowrap
  border-left 0.25em solid #ff3300
  span
    display inline-block
    &:first-child
      margin-right 0.25em
      font-weight bold

>>> div[class*='language-']
  border-radius 0
  margin 0 -60px
  > pre
    padding 1.5em 60px
  &:before
    top 0
    right 0
    text-align center
    min-width 60px
    padding 2px 0.5em
    margin-right 60px
    border-radius 0 0 4px 4px
    background #00ccff99
    color #ffffff
    pointer-events none
</style>