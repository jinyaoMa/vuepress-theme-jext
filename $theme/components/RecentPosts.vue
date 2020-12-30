<template>
  <j-container
    :title="j$Locale.recentPosts"
    icon="fas fa-clock fa-fw"
    disabled
    hide-extend-icon
  >
    <div class="RecentPosts">
      <j-post-card
        v-for="(item, i) in posts"
        :key="i"
        :options="item"
      ></j-post-card>
    </div>
  </j-container>
</template>

<script>
export default {
  name: "RecentPosts",
  computed: {
    posts() {
      const newest = this.j$SitePostsNewest.map((post) => {
        const categories = [];
        this.setCate(
          categories,
          post.frontmatter.categories,
          "",
          this.$category._metaMap
        );
        console.log(categories);

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
    setCate(cates, key, parent, map) {
      if (typeof key === "string") {
        cates.push({
          name: key,
          //path: map[parent === "" ? key : `${parent},${key}`].path,
        });
      } else if (key instanceof Array && key.length > 0) {
        const _parent = parent === "" ? key[0] : `${parent},${key[0]}`;
        const _key = key[1];
        cates.push({
          name: _parent,
          //path: map[_parent].path,
        });
        this.setCate(cates, _key, _parent, map);
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
  > .j-post-card
    margin 40px
</style>