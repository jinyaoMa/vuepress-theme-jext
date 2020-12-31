<template>
  <j-container :title="j$Locale.post" disabled hide-extend-icon>
    <div class="Post">
      <div class="meta">
        <div class="meta-title">
          {{ $page.title || $page.frontmatter.title }}
        </div>
        <div class="meta-info">
          <div class="info-date">
            <i class="fas fa-calendar-alt fa-fw" />
            {{ $page.frontmatter.date.substr(0, 10) }}
          </div>
          <div class="info-updated">
            <i class="fas fa-calendar-check fa-fw" />
            {{ $page.frontmatter.updated.substr(0, 10) }}
          </div>
          <div class="info-categories">
            <i class="fas fa-folder-open fa-fw" />
            <span
              v-for="(cate, i) in $page.frontmatter.categories.flat(Infinity)"
              :key="i"
            >
              <span v-if="i !== 0">&nbsp;,</span>
              <router-link :to="$category.map[cate].path">{{
                cate
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
                v-html="$themeConfig.author"
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
        <div class="tags">
          <router-link
            v-for="(tag, i) in $page.frontmatter.tags.flat(Infinity)"
            :key="i"
            :to="$tag.map[tag].path"
          >
            # {{ tag }}
          </router-link>
        </div>
        <div class="pn">
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
        `<a target="_blank" href="${CC_LICENSE_LINK}">${this.j$Locale.article.license.notice.name}</a>`
      );
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
  },
};
</script>

<style lang="stylus" scoped>
.Post
  max-width 100%

.meta
  text-align center
  margin-bottom 2rem

.meta-title
  font-size 3rem
  line-height 1.5
  padding-bottom 1rem
  border-bottom 0.25rem solid #f1f2f3

.meta-info
  line-height 2
  padding-top 0.5rem
  user-select none
  > div
    display inline-block
    margin 0 0.5rem

.tail
  user-select none
  margin-top 2rem

.ending
  color #e1e2e3
  border-top 0.5rem dashed
  display grid
  grid-template-columns auto 2rem auto
  font-size 1.25rem
  justify-content center
  justify-items center
  line-height 2.5
  padding 0 1rem
  margin 0 -1rem
  i
    line-height 2.5

.share
  text-align center

.license
  width 100%
  background #ff330011
  overflow-y hidden
  overflow-x auto
  margin 1rem 0
  font-size 0.95rem

>>> .frame
  line-height 2
  padding 0.5rem 0.25rem 0.5rem 0.75rem
  white-space nowrap
  border-left 0.25rem solid #ff3300
  span
    display inline-block
    &:first-child
      margin-right 0.25rem
      font-weight bold

.tags
  display flex
  flex-direction row
  flex-wrap wrap
  justify-content center
  line-height 1.5
  margin-top 1.25rem
  margin-bottom 1rem
  > a
    margin 0.5rem
    margin-top 0

.pn
  display grid
  grid-template-columns repeat(2, calc(50% - 0.5rem))
  grid-template-areas 'prev next'
  gap 1rem
  .prev
    grid-area prev
  .next
    grid-area next
    text-align right
    &:before
      left auto
      right 0
</style>