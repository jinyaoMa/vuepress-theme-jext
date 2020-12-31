<template>
  <j-container :title="j$Locale.comment" disabled hide-extend-icon>
    <div class="Comment">
      <CommentPlugin
        :title="$title"
        :options="{
          locale: this.j$Lang,
        }"
      />
    </div>
  </j-container>
</template>

<script>
import { Comment } from "@vuepress/plugin-blog/lib/client/components";

export default {
  name: "Comment",
  components: {
    CommentPlugin: Comment,
  },
};
</script>

<style lang="stylus" scoped>
.Comment
  padding 40px

>>> .vssue
  .vssue-comment-avatar
    border-radius 50%
    overflow hidden
    a
      &:before
        display none
  .vssue-pagination-select
    background-color white
</style>