<template>
  <j-container :title="j$Locale.post" disabled hide-extend-icon>
    <div class="Post">
      <div class="meta">
        <div class="meta-title">
          {{ $page.title || $page.frontmatter.title }}
        </div>
        <div class="meta-info flex flex-horizontal flex-wrap flex-">
          <div class="info-date">
            <i class="fas fa-calendar-alt fa-fw" />
            {{ $page.frontmatter.date.substr(0, 10) }}
          </div>
          <div class="info-updated">
            <i class="fas fa-calendar-check fa-fw" />
            {{ $page.frontmatter.updated.substr(0, 10) }}
          </div>
          <div class="info-categories" v-if="$page.frontmatter.categories">
            <i class="fas fa-folder-open fa-fw" />
            <span v-for="(item, i) in categories" :key="i">
              <span v-if="i !== 0">, </span>
              <router-link :to="item.path" :title="item.name">{{
                item.name
              }}</router-link>
            </span>
          </div>
          <div class="info-wordcount">
            <i class="fas fa-file-word fa-fw" />
            {{ addK($page.frontmatter.wordcount) }}
          </div>
          <div class="info-wordcount">
            <i class="fas fa-stopwatch fa-fw" />
            {{ min2Read($page.frontmatter.min2read) }}
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
        <div class="tags" v-if="$page.frontmatter.tags">
          <router-link
            v-for="(tag, i) in $page.frontmatter.tags.flat(Infinity)"
            :key="i"
            :to="$tag.map[tag].path"
          >
            # {{ tag }}
          </router-link>
        </div>
        <div class="pn" v-if="!$page.frontmatter.extract">
          <router-link
            class="prev"
            v-if="prevIndex >= 0"
            :to="getPage(prevIndex).path || '#'"
            :title="j$Locale.article.prev + getPage(prevIndex).title"
          >
            {{ getPage(prevIndex).title }}
          </router-link>
          <router-link
            class="next"
            v-if="nextIndex < j$SitePosts.length"
            :to="getPage(nextIndex).path || '#'"
            :title="j$Locale.article.next + getPage(nextIndex).title"
          >
            {{ getPage(nextIndex).title }}
          </router-link>
        </div>
      </div>
    </div>
  </j-container>
</template>

<script>
export default {
  name: "Post",
  data() {
    return {
      prevIndex: -1,
      nextIndex: -1,
    };
  },
  mounted() {
    this.doPrevNext();
  },
  updated() {
    this.doPrevNext();
  },
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
    categories() {
      const result = [];
      if (this.$page.frontmatter.categories) {
        this.$page.frontmatter.categories.forEach((cates) => {
          this.setCate(result, this.$category._metaMap, cates);
        });
      }
      return result;
    },
  },
  methods: {
    getPage(index) {
      return this.j$SitePosts[index] || {};
    },
    doPrevNext() {
      for (let i = 0; i < this.j$SitePosts.length; i++) {
        const page = this.j$SitePosts[i];
        if (page.path === this.$page.path) {
          this.prevIndex = i - 1;
          this.nextIndex = i + 1;
          break;
        }
      }
    },
    addK(num) {
      if (num >= 1000) {
        num = Math.round(num / 100) / 10 + "k";
      }
      return num;
    },
    setCate(cates, map, key, parent = "") {
      if (typeof key === "string") {
        cates.push({
          name: key,
          path: map[parent === "" ? key : `${parent},${key}`].path,
        });
      } else if (key instanceof Array && key.length > 0) {
        const _parent = parent === "" ? key[0] : `${parent},${key[0]}`;
        cates.push({
          name: key[0],
          path: map[_parent].path,
        });
        this.setCate(cates, map, key[1], _parent);
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.Post
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

.tags
  display flex
  flex-direction row
  flex-wrap wrap
  justify-content center
  line-height 1.5
  margin-top 1.25em
  margin-bottom 1em
  > a
    margin 0.5em
    margin-top 0

.pn
  display grid
  grid-template-columns repeat(2, calc(50% - 0.5em))
  grid-template-areas 'prev next'
  gap 1em
  .prev
    grid-area prev
  .next
    grid-area next
    text-align right
    &:before
      left auto
      right 0

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