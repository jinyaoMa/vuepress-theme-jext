<template>
  <j-container
    :title="`${j$Locale.timeline} - ${
      $frontmatter[`title_${j$Lang}`]
    }${branch}`"
    disabled
    hide-extend-icon
  >
    <div class="Timeline">
      <div v-for="(yearPost, i) in postsInYears" :key="i">
        <div class="list-year">
          <div class="year-flag">{{ yearPost.year }}</div>
          <div
            class="year-total"
            v-html="yearTotal(yearPost.posts.length)"
          ></div>
        </div>
        <div class="list-item" v-for="(post, j) in yearPost.posts" :key="j">
          <div class="item-date">{{ post.frontmatter.date.substr(0, 10) }}</div>
          <div class="item-content">
            <div class="content-title">
              <router-link :to="post.path">{{ post.title }}</router-link>
            </div>
            <div class="content-excerpt" v-html="post.excerpt"></div>
          </div>
        </div>
      </div>
    </div>
  </j-container>
</template>

<script>
export default {
  name: "Timeline",
  computed: {
    branch() {
      if (this.$currentCategory) {
        return " / " + [this.$currentCategory.key].flat(Infinity).join(", ");
      } else if (this.$currentTag) {
        return " / " + [this.$currentTag.key].flat(Infinity).join(", ");
      }
      return "";
    },
    postsInYears() {
      let result = [];
      let temp = {};
      let targetPosts = this.j$SitePosts;
      if (this.$currentCategory) {
        targetPosts = this.$currentCategory.pages;
      } else if (this.$currentTag) {
        targetPosts = this.$currentTag.pages;
      }
      targetPosts.forEach((post) => {
        let year = post.frontmatter.date.substr(0, 4);
        if (!temp.hasOwnProperty(year)) {
          temp[year] = [];
        }
        temp[year].push(post);
      });
      for (const y in temp) {
        result.push({
          year: y,
          posts: temp[y],
        });
      }
      return result.sort((a, b) => {
        if (a.year < b.year) {
          return 1;
        } else if (a.year > b.year) {
          return -1;
        }
        return 0;
      });
    },
    yearTotal() {
      return function (length) {
        return this.j$Locale.yearTotal.replace(
          "[:total:]",
          `<strong>${length}</strong>`
        );
      };
    },
  },
};
</script>

<style lang="stylus" scoped>
.Timeline
  margin 40px
  div, a, :before, :after
    box-sizing border-box

.list-year, .list-item
  display grid
  grid-template-columns 8.25rem auto

.list-year
  line-height 5rem
  user-select none

.year-flag
  text-align center
  background #f1f2f3
  font-size 2rem

.year-total
  font-size 0.88rem
  line-height 5.24rem
  height 5rem

.item-date
  line-height 2rem
  text-align right
  padding 1.25rem 1.5rem 0 0
  border-right 0.5rem solid #f1f2f3

.year-total, .item-content
  padding-left 1.5rem

.item-content
  padding-top 1.25rem
  padding-right 1rem
  position relative
  &:after
    content ''
    height 2rem
    width @height
    background #333333
    border 0.5rem solid #f1f2f3
    border-radius 50%
    position absolute
    top 1.25rem
    left -1.25rem

.content-title
  line-height 2rem
  font-size 1.25rem
  margin-bottom 0.5rem
  a
    color #ff33cc
    &:before
      display none
    &:hover
      text-decoration underline
</style>