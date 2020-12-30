<template>
  <j-container :title="j$Locale.recentPosts" disabled hide-extend-icon>
    <div class="RecentPosts">
      <j-post-card
        v-for="(item, i) in posts.slice(0, offset)"
        :key="i"
        :options="item"
      ></j-post-card>
      <div class="text-align-center">
        <span
          class="more"
          @click="incrementOffset"
          v-if="offset < j$SitePostsNewest.length"
          v-html="j$Locale.more"
        ></span>
      </div>
    </div>
  </j-container>
</template>

<script>
export default {
  name: "RecentPosts",
  computed: {
    posts() {
      return this.j$SitePostsNewest.map((post) => {
        const categories = [];
        post.frontmatter.categories.forEach((cates) => {
          this.setCate(categories, this.$category._metaMap, cates);
        });

        return {
          date: post.frontmatter.date.substr(0, 10),
          updated: post.frontmatter.updated.substr(0, 10),
          excerpt: post.excerpt,
          categories: categories,
          cover: post.frontmatter.cover || "",
          title: post.title,
          path: post.path,
        };
      });
    },
    offset() {
      return parseInt(this.$themeConfig.recentPostOffset || 3) + this.increment;
    },
  },
  methods: {
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
    incrementOffset() {
      this.increment += parseInt(this.$themeConfig.recentPostOffset) || 3;
    },
  },
  data() {
    return {
      increment: 0,
    };
  },
};
</script>

<style lang="stylus" scoped>
.RecentPosts
  > div
    margin 40px 40px 0
  > div:last-child
    margin-bottom 40px

.text-align-center
  text-align center

.more
  text-align center
  cursor pointer
  opacity 0.6
  transition color 0.2s
  &:hover
    opacity 1
    color #00ccff
</style>