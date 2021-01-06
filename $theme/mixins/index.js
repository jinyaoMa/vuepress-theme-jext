import jsonp from "../utils/jsonp";
import axios from "axios";

export default (Vuex) => {
  return {
    data() {
      return {
        j$Busuanzi: {
          pv: "∞",
          uv: "∞"
        },
        j$Hitokoto: {
          word: "Loading...",
          from: "Loading..."
        }
      };
    },
    methods: {
      ...Vuex.mapActions({
        j$SwapLang: "swapLang",
        j$Nightshift: "nightshift"
      }),
      j$InitBusuanzi() {
        jsonp(
          "//busuanzi.ibruce.info/busuanzi",
          {
            jsonpCallback:
              "BusuanziCallback_" + Math.floor(1099511627776 * Math.random())
          },
          (result) => {
            this.j$Busuanzi.pv = result.site_pv;
            this.j$Busuanzi.uv = result.site_uv;
          },
          true
        );
      },
      j$InitHitokoto() {
        let that = this;
        if (
          that.$themeConfig._j$Blog.hitokoto.customs &&
          that.$themeConfig._j$Blog.hitokoto.customs.length
        ) {
          const rand = Math.floor(
            Math.random() * that.$themeConfig._j$Blog.hitokoto.customs.length
          );
          that.j$Hitokoto.word = customs[rand].word;
          that.j$Hitokoto.from = customs[rand].from;
        } else {
          axios
            .get(that.$themeConfig._j$Blog.hitokoto.api, {
              params: {
                c: that.$themeConfig._j$Blog.hitokoto.type
              }
            })
            .then((result) => {
              result = result.data;
              if (
                typeof result.hitokoto === "string" &&
                result.hitokoto.trim().length > 0
              ) {
                that.j$Hitokoto.word = result.hitokoto.trim();
              }
              if (
                typeof result.from_who === "string" &&
                result.from_who.trim().length > 0
              ) {
                that.j$Hitokoto.from = result.from_who.trim();
              } else if (
                typeof result.from === "string" &&
                result.from.trim().length > 0
              ) {
                that.j$Hitokoto.from = result.from.trim();
              }
            });
        }
      }
    },
    computed: {
      ...Vuex.mapGetters({
        j$Lang: "lang",
        j$Locale: "locale",
        j$IsNight: "isNight"
      }),
      j$SiteTotalWords() {
        let result = 0;
        this.$site.pages
          .filter((p) => !!p.title)
          .forEach((page) => {
            result += page.frontmatter.wordcount;
          });
        if (result >= 1000) {
          result = Math.round(result / 100) / 10 + "k";
        }
        return result;
      },
      j$SiteTotalPosts() {
        return this.$site.pages.filter((p) => p.id === "post").length;
      },
      j$SiteTotalCategories() {
        return this.$category.length;
      },
      j$SiteTotalTags() {
        return this.$tag.length;
      },
      j$SiteExtractPosts() {
        return this.$site.pages.filter(
          (p) => p.id === "post" && p.frontmatter.extract
        );
      },
      j$SitePosts() {
        return this.$site.pages
          .filter((p) => p.id === "post" && !p.frontmatter.extract)
          .sort((a, b) => {
            if (a.frontmatter.date < b.frontmatter.date) {
              return 1;
            } else if (a.frontmatter.date > b.frontmatter.date) {
              return -1;
            }
            return 0;
          });
      },
      j$SitePostsNewest() {
        return this.$site.pages
          .filter((p) => p.id === "post" && !p.frontmatter.extract)
          .sort((a, b) => {
            if (a.frontmatter.updated < b.frontmatter.updated) {
              return 1;
            } else if (a.frontmatter.updated > b.frontmatter.updated) {
              return -1;
            }
            return 0;
          });
      },
      j$Sidebar() {
        return function(path) {
          return this.$themeConfig._j$Blog.sidebar
            .filter((item) => item.to.startsWith(path))
            .sort((a, b) => a.to.localeCompare(b.to));
        };
      }
    }
  };
};
